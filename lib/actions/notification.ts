'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import type { NotificationType } from '@prisma/client'

// ---------- helpers ----------

/** Send email safely (non-blocking, won't crash if Resend key is missing) */
async function sendEmailSafe(to: string, emailData: { subject: string; html: string }) {
    try {
        if (!process.env.RESEND_API_KEY) return
        const { resend, FROM_EMAIL } = await import('@/lib/resend')
        await resend.emails.send({
            from: FROM_EMAIL,
            to,
            subject: emailData.subject,
            html: emailData.html,
        })
    } catch (e) {
        console.error('[Email Error]', e)
    }
}

/** Trigger Pusher event safely (non-blocking) */
async function triggerPusherSafe(channel: string, event: string, data: unknown) {
    try {
        if (!process.env.PUSHER_APP_ID) return
        const { pusherServer } = await import('@/lib/pusher-server')
        await pusherServer.trigger(channel, event, data)
    } catch (e) {
        console.error('[Pusher Error]', e)
    }
}

// ---------- CRUD ----------

export async function getNotifications() {
    const session = await auth()
    if (!session?.user) return []

    return prisma.notification.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        take: 20,
    })
}

export async function getUnreadCount() {
    const session = await auth()
    if (!session?.user) return 0

    return prisma.notification.count({
        where: { userId: session.user.id, isRead: false },
    })
}

export async function markAsRead(notificationId: string) {
    const session = await auth()
    if (!session?.user) return

    await prisma.notification.update({
        where: { id: notificationId, userId: session.user.id },
        data: { isRead: true },
    })
    revalidatePath('/', 'layout')
}

export async function markAllAsRead() {
    const session = await auth()
    if (!session?.user) return

    await prisma.notification.updateMany({
        where: { userId: session.user.id, isRead: false },
        data: { isRead: true },
    })
    revalidatePath('/', 'layout')
}

// ---------- create + email + pusher helpers ----------

export async function createNotification(data: {
    userId: string
    type: NotificationType
    title: string
    message: string
    link?: string
    email?: { to: string; emailData: { subject: string; html: string } }
}) {
    const notification = await prisma.notification.create({
        data: {
            userId: data.userId,
            type: data.type,
            title: data.title,
            message: data.message,
            link: data.link,
        },
    })

    // Fire-and-forget Pusher + Email (non-blocking)
    triggerPusherSafe(`user-${data.userId}`, 'new-notification', {
        id: notification.id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        link: notification.link,
        createdAt: notification.createdAt,
    })

    if (data.email) {
        sendEmailSafe(data.email.to, data.email.emailData)
    }

    return notification
}

// ---------- high-level notification triggers ----------

function fmtDate(date: Date) {
    return new Date(date).toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    })
}

/** Called when student creates a request → notify tutor */
export async function notifyNewRequest(request: {
    id: string
    subject: string
    topic: string
    mode: string
    scheduledAt: Date
    studentName: string
    tutorUserId: string
    tutorEmail: string
    tutorName: string
}) {
    const { newRequestEmail } = await import('@/lib/emails')
    await createNotification({
        userId: request.tutorUserId,
        type: 'REQUEST_NEW',
        title: 'Request Baru',
        message: `${request.studentName} mengajukan bimbingan ${request.subject} - ${request.topic}`,
        link: '/tutor/dashboard',
        email: {
            to: request.tutorEmail,
            emailData: newRequestEmail({
                tutorName: request.tutorName,
                studentName: request.studentName,
                subject: request.subject,
                topic: request.topic,
                scheduledAt: fmtDate(request.scheduledAt),
                mode: request.mode,
            }),
        },
    })
}

/** Called when tutor approves → notify student */
export async function notifyRequestApproved(request: {
    id: string
    subject: string
    topic: string
    scheduledAt: Date
    studentId: string
    studentEmail: string
    studentName: string
    tutorName: string
}) {
    const { requestApprovedEmail } = await import('@/lib/emails')
    await createNotification({
        userId: request.studentId,
        type: 'REQUEST_APPROVED',
        title: 'Request Disetujui',
        message: `${request.tutorName} menyetujui request ${request.subject} kamu`,
        link: '/sessions',
        email: {
            to: request.studentEmail,
            emailData: requestApprovedEmail({
                studentName: request.studentName,
                tutorName: request.tutorName,
                subject: request.subject,
                topic: request.topic,
                scheduledAt: fmtDate(request.scheduledAt),
            }),
        },
    })
}

/** Called when tutor rejects → notify student */
export async function notifyRequestRejected(request: {
    subject: string
    studentId: string
    studentEmail: string
    studentName: string
    tutorName: string
}) {
    const { requestRejectedEmail } = await import('@/lib/emails')
    await createNotification({
        userId: request.studentId,
        type: 'REQUEST_REJECTED',
        title: 'Request Ditolak',
        message: `${request.tutorName} menolak request ${request.subject} kamu`,
        link: '/requests',
        email: {
            to: request.studentEmail,
            emailData: requestRejectedEmail({
                studentName: request.studentName,
                tutorName: request.tutorName,
                subject: request.subject,
            }),
        },
    })
}

/** Called when tutor marks completed → notify student */
export async function notifyRequestCompleted(request: {
    id: string
    subject: string
    topic: string
    studentId: string
    studentEmail: string
    studentName: string
    tutorName: string
}) {
    const { sessionCompletedEmail } = await import('@/lib/emails')
    await createNotification({
        userId: request.studentId,
        type: 'REQUEST_COMPLETED',
        title: 'Sesi Selesai',
        message: `Sesi ${request.subject} dengan ${request.tutorName} sudah selesai. Beri review!`,
        link: `/sessions/${request.id}`,
        email: {
            to: request.studentEmail,
            emailData: sessionCompletedEmail({
                studentName: request.studentName,
                tutorName: request.tutorName,
                subject: request.subject,
                topic: request.topic,
                sessionId: request.id,
            }),
        },
    })
}

/** Called when student cancels → notify tutor */
export async function notifyRequestCancelled(request: {
    subject: string
    studentName: string
    tutorUserId: string
}) {
    await createNotification({
        userId: request.tutorUserId,
        type: 'REQUEST_CANCELLED',
        title: 'Request Dibatalkan',
        message: `${request.studentName} membatalkan request ${request.subject}`,
        link: '/tutor/dashboard',
    })
}

/** Called when student submits review → notify tutor */
export async function notifyNewReview(data: {
    subject: string
    rating: number
    comment?: string
    studentName: string
    tutorUserId: string
    tutorEmail: string
    tutorName: string
}) {
    const { newReviewEmail } = await import('@/lib/emails')
    await createNotification({
        userId: data.tutorUserId,
        type: 'REVIEW_RECEIVED',
        title: 'Review Baru',
        message: `${data.studentName} memberi rating ${'⭐'.repeat(data.rating)} untuk ${data.subject}`,
        link: '/tutor/dashboard',
        email: {
            to: data.tutorEmail,
            emailData: newReviewEmail({
                tutorName: data.tutorName,
                studentName: data.studentName,
                rating: data.rating,
                comment: data.comment,
                subject: data.subject,
            }),
        },
    })
}

/** Called when admin verifies tutor */
export async function notifyTutorVerified(data: {
    tutorUserId: string
    tutorEmail: string
    tutorName: string
}) {
    const { tutorVerifiedEmail } = await import('@/lib/emails')
    await createNotification({
        userId: data.tutorUserId,
        type: 'TUTOR_VERIFIED',
        title: 'Profil Diverifikasi',
        message: 'Selamat! Profil tutor kamu sudah diverifikasi oleh admin.',
        link: '/tutor/dashboard',
        email: {
            to: data.tutorEmail,
            emailData: tutorVerifiedEmail({ tutorName: data.tutorName }),
        },
    })
}

/** Called when admin rejects tutor */
export async function notifyTutorRejected(data: {
    tutorUserId: string
    tutorName: string
}) {
    await createNotification({
        userId: data.tutorUserId,
        type: 'TUTOR_REJECTED',
        title: 'Pendaftaran Tutor Ditolak',
        message: 'Maaf, pendaftaran tutor kamu ditolak oleh admin.',
        link: '/dashboard',
    })
}
