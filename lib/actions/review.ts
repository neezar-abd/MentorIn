'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { reviewSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export type ActionResult = {
    success: boolean
    error?: string
}

export async function submitReview(formData: FormData): Promise<ActionResult> {
    const session = await auth()
    if (!session?.user) return { success: false, error: 'Unauthorized' }

    const raw = {
        requestId: formData.get('requestId'),
        rating: formData.get('rating'),
        comment: formData.get('comment') || undefined,
    }

    const parsed = reviewSchema.safeParse(raw)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    // Get the request to validate
    const request = await prisma.request.findUnique({
        where: { id: parsed.data.requestId },
        include: {
            review: true,
            tutor: { include: { user: { select: { id: true, name: true, email: true } } } },
        },
    })

    if (!request) return { success: false, error: 'Request tidak ditemukan' }
    if (request.studentId !== session.user.id) return { success: false, error: 'Kamu bukan student untuk sesi ini' }
    if (request.status !== 'COMPLETED') return { success: false, error: 'Sesi belum selesai' }
    if (request.review) return { success: false, error: 'Review sudah pernah diberikan' }

    // Create review
    await prisma.review.create({
        data: {
            requestId: parsed.data.requestId,
            studentId: session.user.id,
            tutorId: request.tutorId,
            rating: parsed.data.rating,
            comment: parsed.data.comment,
        },
    })

    // Recalculate tutor average rating
    const allReviews = await prisma.review.findMany({
        where: { tutorId: request.tutorId },
        select: { rating: true },
    })
    const avgRating = allReviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / allReviews.length

    await prisma.tutorProfile.update({
        where: { id: request.tutorId },
        data: { rating: Math.round(avgRating * 10) / 10 },
    })

    revalidatePath(`/sessions/${request.id}`)
    revalidatePath('/sessions')

    // Notify tutor about new review (non-blocking)
    const { notifyNewReview } = await import('@/lib/actions/notification')
    notifyNewReview({
        subject: request.subject,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
        studentName: session.user.name || 'Siswa',
        tutorUserId: request.tutor.user.id,
        tutorEmail: request.tutor.user.email,
        tutorName: request.tutor.user.name,
    }).catch(console.error)

    return { success: true }
}
