'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export type ActionResult = {
    success: boolean
    error?: string
}

export async function getAdminDashboardData() {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') return null

    const [totalUsers, totalTutors, totalRequests, pendingTutors, recentUsers] = await Promise.all([
        prisma.user.count(),
        prisma.tutorProfile.count({ where: { isVerified: true } }),
        prisma.request.count(),
        prisma.tutorProfile.findMany({
            where: { isVerified: false },
            include: { user: { select: { name: true, email: true, class: true, avatarUrl: true } } },
            orderBy: { createdAt: 'desc' },
        }),
        prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20,
            select: { id: true, name: true, email: true, role: true, class: true, createdAt: true },
        }),
    ])

    return {
        stats: {
            totalUsers,
            totalTutors,
            totalRequests,
            pendingVerifications: pendingTutors.length,
        },
        pendingTutors,
        recentUsers,
    }
}

export async function verifyTutor(tutorProfileId: string, action: 'VERIFY' | 'REJECT'): Promise<ActionResult> {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
        return { success: false, error: 'Unauthorized' }
    }

    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: { id: tutorProfileId },
    })

    if (!tutorProfile) return { success: false, error: 'Tutor profile tidak ditemukan' }

    if (action === 'VERIFY') {
        await prisma.tutorProfile.update({
            where: { id: tutorProfileId },
            data: { isVerified: true },
        })
        // Notify tutor
        const user = await prisma.user.findUnique({ where: { id: tutorProfile.userId }, select: { name: true, email: true } })
        if (user) {
            const { notifyTutorVerified } = await import('@/lib/actions/notification')
            notifyTutorVerified({
                tutorUserId: tutorProfile.userId,
                tutorEmail: user.email,
                tutorName: user.name,
            }).catch(console.error)
        }
    } else {
        // Reject: delete the profile and revert user role
        const { notifyTutorRejected } = await import('@/lib/actions/notification')
        notifyTutorRejected({
            tutorUserId: tutorProfile.userId,
            tutorName: '',
        }).catch(console.error)

        await prisma.tutorProfile.delete({
            where: { id: tutorProfileId },
        })
        await prisma.user.update({
            where: { id: tutorProfile.userId },
            data: { role: 'STUDENT' },
        })
    }

    revalidatePath('/admin')
    return { success: true }
}
