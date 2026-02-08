'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function getExportData() {
    const session = await auth()
    if (!session?.user) return null

    const userId = session.user.id
    const role = session.user.role

    // Get user info
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true, class: true, role: true },
    })

    if (!user) return null

    // Get completed sessions
    if (role === 'TUTOR') {
        const tp = await prisma.tutorProfile.findUnique({ where: { userId }, select: { id: true, rating: true, totalSessions: true, subjects: true } })
        if (!tp) return null

        const completedSessions = await prisma.request.findMany({
            where: { tutorId: tp.id, status: 'COMPLETED' },
            include: {
                student: { select: { name: true, class: true } },
                review: { select: { rating: true, comment: true } },
            },
            orderBy: { scheduledAt: 'desc' },
        })

        return {
            user,
            role: 'TUTOR' as const,
            tutorProfile: tp,
            sessions: completedSessions.map((s: typeof completedSessions[number]) => ({
                id: s.id,
                subject: s.subject,
                topic: s.topic,
                studentName: s.student.name,
                studentClass: s.student.class,
                scheduledAt: s.scheduledAt.toISOString(),
                duration: s.duration,
                mode: s.mode,
                rating: s.review?.rating ?? null,
                comment: s.review?.comment ?? null,
            })),
        }
    } else {
        const completedSessions = await prisma.request.findMany({
            where: { studentId: userId, status: 'COMPLETED' },
            include: {
                tutor: { include: { user: { select: { name: true } } } },
                review: { select: { rating: true } },
            },
            orderBy: { scheduledAt: 'desc' },
        })

        return {
            user,
            role: 'STUDENT' as const,
            sessions: completedSessions.map((s: typeof completedSessions[number]) => ({
                id: s.id,
                subject: s.subject,
                topic: s.topic,
                tutorName: s.tutor.user.name,
                scheduledAt: s.scheduledAt.toISOString(),
                duration: s.duration,
                mode: s.mode,
                rating: s.review?.rating ?? null,
            })),
        }
    }
}

export async function getCertificateData(sessionId: string) {
    const session = await auth()
    if (!session?.user) return null

    const request = await prisma.request.findUnique({
        where: { id: sessionId, status: 'COMPLETED' },
        include: {
            student: { select: { name: true, class: true } },
            tutor: { include: { user: { select: { name: true } } } },
        },
    })

    if (!request) return null

    // Only the student or tutor involved can get the certificate
    const tp = await prisma.tutorProfile.findUnique({ where: { userId: session.user.id }, select: { id: true } })
    if (request.studentId !== session.user.id && tp?.id !== request.tutorId) return null

    return {
        studentName: request.student.name,
        studentClass: request.student.class,
        tutorName: request.tutor.user.name,
        subject: request.subject,
        topic: request.topic,
        duration: request.duration,
        completedAt: request.updatedAt.toISOString(),
        scheduledAt: request.scheduledAt.toISOString(),
    }
}
