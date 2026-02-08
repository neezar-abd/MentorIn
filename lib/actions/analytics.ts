'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function getAnalyticsData() {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') return null

    const now = new Date()
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1)

    // Parallel queries
    const [
        totalUsers,
        totalTutors,
        totalRequests,
        totalReviews,
        usersPerRole,
        requestsPerStatus,
        requestsPerMonth,
        topSubjects,
        topTutors,
        usersPerMonth,
        avgRating,
    ] = await Promise.all([
        prisma.user.count(),
        prisma.tutorProfile.count({ where: { isVerified: true } }),
        prisma.request.count(),
        prisma.review.count(),

        // Users grouped by role
        prisma.user.groupBy({ by: ['role'], _count: true }),

        // Requests grouped by status
        prisma.request.groupBy({ by: ['status'], _count: true }),

        // Requests per month (last 6 months) - use raw query for date grouping
        prisma.request.findMany({
            where: { createdAt: { gte: sixMonthsAgo } },
            select: { createdAt: true, status: true },
        }),

        // Top subjects
        prisma.request.groupBy({
            by: ['subject'],
            _count: true,
            orderBy: { _count: { subject: 'desc' } },
            take: 8,
        }),

        // Top tutors by sessions
        prisma.tutorProfile.findMany({
            where: { isVerified: true, totalSessions: { gt: 0 } },
            include: { user: { select: { name: true } } },
            orderBy: { totalSessions: 'desc' },
            take: 5,
        }),

        // Users registered per month
        prisma.user.findMany({
            where: { createdAt: { gte: sixMonthsAgo } },
            select: { createdAt: true },
        }),

        // Average rating
        prisma.review.aggregate({ _avg: { rating: true } }),
    ])

    // Process requests per month
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des']
    const requestsByMonth: Record<string, { total: number; completed: number }> = {}
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`
        requestsByMonth[key] = { total: 0, completed: 0 }
    }
    requestsPerMonth.forEach((r: { createdAt: Date; status: string }) => {
        const d = new Date(r.createdAt)
        const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`
        if (requestsByMonth[key]) {
            requestsByMonth[key].total++
            if (r.status === 'COMPLETED') requestsByMonth[key].completed++
        }
    })

    // Process users per month
    const usersByMonth: Record<string, number> = {}
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`
        usersByMonth[key] = 0
    }
    usersPerMonth.forEach((u: { createdAt: Date }) => {
        const d = new Date(u.createdAt)
        const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().slice(2)}`
        if (usersByMonth[key] !== undefined) usersByMonth[key]++
    })

    return {
        overview: {
            totalUsers,
            totalTutors,
            totalRequests,
            totalReviews,
            avgRating: avgRating._avg.rating ? Math.round(avgRating._avg.rating * 10) / 10 : 0,
        },
        usersPerRole: usersPerRole.map((r: { role: string; _count: number }) => ({
            role: r.role === 'STUDENT' ? 'Siswa' : r.role === 'TUTOR' ? 'Tutor' : 'Admin',
            count: r._count,
        })),
        requestsPerStatus: requestsPerStatus.map((r: { status: string; _count: number }) => {
            const labels: Record<string, string> = {
                PENDING: 'Menunggu', APPROVED: 'Disetujui', REJECTED: 'Ditolak',
                COMPLETED: 'Selesai', CANCELLED: 'Dibatalkan',
            }
            return { status: labels[r.status] || r.status, count: r._count }
        }),
        requestsByMonth: Object.entries(requestsByMonth).map(([month, data]) => ({
            month,
            total: data.total,
            completed: data.completed,
        })),
        usersByMonth: Object.entries(usersByMonth).map(([month, count]) => ({
            month,
            count,
        })),
        topSubjects: topSubjects.map((s: { subject: string; _count: number }) => ({
            subject: s.subject,
            count: s._count,
        })),
        topTutors: topTutors.map((t: { user: { name: string }; totalSessions: number; rating: number }) => ({
            name: t.user.name,
            sessions: t.totalSessions,
            rating: t.rating,
        })),
    }
}
