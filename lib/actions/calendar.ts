'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function getCalendarSessions(year: number, month: number) {
    const session = await auth()
    if (!session?.user) return []

    const startDate = new Date(year, month, 1)
    const endDate = new Date(year, month + 1, 0, 23, 59, 59)

    const userId = session.user.id
    const role = session.user.role

    // Get approved + completed sessions relevant to this user
    const where: any = {
        status: { in: ['APPROVED', 'COMPLETED'] },
        scheduledAt: { gte: startDate, lte: endDate },
    }

    if (role === 'TUTOR') {
        // Get tutor profile
        const tp = await prisma.tutorProfile.findUnique({ where: { userId }, select: { id: true } })
        if (tp) {
            where.OR = [{ studentId: userId }, { tutorId: tp.id }]
        } else {
            where.studentId = userId
        }
    } else if (role === 'ADMIN') {
        // Admin sees all
        delete where.studentId
    } else {
        where.studentId = userId
    }

    return prisma.request.findMany({
        where,
        include: {
            student: { select: { name: true } },
            tutor: { include: { user: { select: { name: true } } } },
        },
        orderBy: { scheduledAt: 'asc' },
    })
}
