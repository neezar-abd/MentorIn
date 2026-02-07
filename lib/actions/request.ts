'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { requestSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export type ActionResult = {
    success: boolean
    error?: string
}

export async function createRequest(formData: FormData): Promise<ActionResult> {
    const session = await auth()
    if (!session?.user) return { success: false, error: 'Unauthorized' }

    const raw = {
        tutorId: formData.get('tutorId'),
        subject: formData.get('subject'),
        topic: formData.get('topic'),
        mode: formData.get('mode'),
        location: formData.get('location') || undefined,
        scheduledAt: formData.get('scheduledAt'),
        duration: formData.get('duration'),
        notes: formData.get('notes') || undefined,
    }

    const parsed = requestSchema.safeParse(raw)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    // Verify tutor exists and is verified
    const tutor = await prisma.tutorProfile.findUnique({
        where: { id: parsed.data.tutorId },
        include: { user: { select: { id: true, name: true, email: true } } },
    })
    if (!tutor || !tutor.isVerified) {
        return { success: false, error: 'Tutor tidak ditemukan atau belum terverifikasi' }
    }

    const newRequest = await prisma.request.create({
        data: {
            studentId: session.user.id,
            tutorId: parsed.data.tutorId,
            subject: parsed.data.subject,
            topic: parsed.data.topic,
            mode: parsed.data.mode,
            location: parsed.data.location,
            scheduledAt: parsed.data.scheduledAt,
            duration: parsed.data.duration,
            notes: parsed.data.notes,
        },
    })

    // Notify tutor (email + push, non-blocking)
    const { notifyNewRequest } = await import('@/lib/actions/notification')
    notifyNewRequest({
        id: newRequest.id,
        subject: parsed.data.subject,
        topic: parsed.data.topic,
        mode: parsed.data.mode,
        scheduledAt: parsed.data.scheduledAt,
        studentName: session.user.name || 'Siswa',
        tutorUserId: tutor.user.id,
        tutorEmail: tutor.user.email,
        tutorName: tutor.user.name,
    }).catch(console.error)

    revalidatePath('/requests')
    return { success: true }
}

export async function getMyRequests(options?: { page?: number; perPage?: number }) {
    const session = await auth()
    if (!session?.user) return { requests: [], total: 0, totalPages: 0, page: 1 }

    const { page = 1, perPage = 10 } = options || {}

    const [requests, total] = await Promise.all([
        prisma.request.findMany({
            where: { studentId: session.user.id },
            include: {
                tutor: {
                    include: { user: { select: { name: true, avatarUrl: true } } },
                },
                review: true,
            },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * perPage,
            take: perPage,
        }),
        prisma.request.count({ where: { studentId: session.user.id } }),
    ])

    return { requests, total, totalPages: Math.ceil(total / perPage), page }
}

export async function updateRequestStatus(requestId: string, status: 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED'): Promise<ActionResult> {
    const session = await auth()
    if (!session?.user) return { success: false, error: 'Unauthorized' }

    const request = await prisma.request.findUnique({
        where: { id: requestId },
        include: {
            tutor: { include: { user: { select: { id: true, name: true, email: true } } } },
            student: { select: { id: true, name: true, email: true } },
        },
    })

    if (!request) return { success: false, error: 'Request tidak ditemukan' }

    // Tutor can approve/reject, Student can cancel
    const isTutor = request.tutor.userId === session.user.id
    const isStudent = request.studentId === session.user.id

    if (status === 'APPROVED' || status === 'REJECTED') {
        if (!isTutor) return { success: false, error: 'Hanya tutor yang bisa approve/reject' }
        if (request.status !== 'PENDING') return { success: false, error: 'Request bukan berstatus pending' }
    }

    if (status === 'CANCELLED') {
        if (!isStudent) return { success: false, error: 'Hanya student yang bisa membatalkan' }
        if (!['PENDING', 'APPROVED'].includes(request.status)) return { success: false, error: 'Request tidak bisa dibatalkan' }
    }

    if (status === 'COMPLETED') {
        if (!isTutor) return { success: false, error: 'Hanya tutor yang bisa menyelesaikan sesi' }
        if (request.status !== 'APPROVED') return { success: false, error: 'Sesi belum disetujui' }
    }

    await prisma.request.update({
        where: { id: requestId },
        data: { status },
    })

    // If completed, increment tutor's session count
    if (status === 'COMPLETED') {
        await prisma.tutorProfile.update({
            where: { id: request.tutorId },
            data: { totalSessions: { increment: 1 } },
        })
    }

    // Send notifications (non-blocking)
    const notif = await import('@/lib/actions/notification')
    if (status === 'APPROVED') {
        notif.notifyRequestApproved({
            id: request.id,
            subject: request.subject,
            topic: request.topic,
            scheduledAt: request.scheduledAt,
            studentId: request.student.id,
            studentEmail: request.student.email,
            studentName: request.student.name,
            tutorName: request.tutor.user.name,
        }).catch(console.error)
    } else if (status === 'REJECTED') {
        notif.notifyRequestRejected({
            subject: request.subject,
            studentId: request.student.id,
            studentEmail: request.student.email,
            studentName: request.student.name,
            tutorName: request.tutor.user.name,
        }).catch(console.error)
    } else if (status === 'COMPLETED') {
        notif.notifyRequestCompleted({
            id: request.id,
            subject: request.subject,
            topic: request.topic,
            studentId: request.student.id,
            studentEmail: request.student.email,
            studentName: request.student.name,
            tutorName: request.tutor.user.name,
        }).catch(console.error)
    } else if (status === 'CANCELLED') {
        notif.notifyRequestCancelled({
            subject: request.subject,
            studentName: request.student.name,
            tutorUserId: request.tutor.user.id,
        }).catch(console.error)
    }

    revalidatePath('/requests')
    revalidatePath('/tutor/dashboard')
    revalidatePath('/sessions')
    return { success: true }
}

export async function getRequestById(requestId: string) {
    const session = await auth()
    if (!session?.user) return null

    return prisma.request.findUnique({
        where: { id: requestId },
        include: {
            student: { select: { id: true, name: true, email: true, class: true, avatarUrl: true } },
            tutor: {
                include: { user: { select: { id: true, name: true, email: true, class: true, avatarUrl: true } } },
            },
            review: true,
        },
    })
}
