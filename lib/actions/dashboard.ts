'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function getDashboardData() {
    const session = await auth()
    if (!session?.user) return null

    const [requests, completedCount, tutorCount] = await Promise.all([
        prisma.request.findMany({
            where: { studentId: session.user.id },
            include: {
                tutor: {
                    include: { user: { select: { name: true, avatarUrl: true } } },
                },
                review: true,
            },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.request.count({
            where: { studentId: session.user.id, status: 'COMPLETED' },
        }),
        prisma.request.groupBy({
            by: ['tutorId'],
            where: { studentId: session.user.id },
        }),
    ])

    const upcomingSessions = requests.filter((r) => r.status === 'APPROVED' && r.scheduledAt > new Date())
    const recentRequests = requests.slice(0, 5)

    // Calculate total hours from completed sessions
    const totalHours = requests.filter((r) => r.status === 'COMPLETED').reduce((sum, r) => sum + r.duration, 0) / 60

    const thisMonth = new Date()
    thisMonth.setDate(1)
    thisMonth.setHours(0, 0, 0, 0)
    const sessionsThisMonth = requests.filter((r) => r.status === 'COMPLETED' && r.createdAt >= thisMonth).length

    return {
        stats: {
            totalSessions: completedCount,
            uniqueTutors: tutorCount.length,
            sessionsThisMonth,
            totalHours: Math.round(totalHours * 10) / 10,
        },
        upcomingSessions,
        recentRequests,
    }
}
