'use server'

import { auth, signOut } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { tutorRegisterSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type ActionResult = {
    success: boolean
    error?: string
}

export async function registerAsTutor(formData: FormData): Promise<ActionResult> {
    const session = await auth()
    if (!session?.user) return { success: false, error: 'Unauthorized' }

    // Check if already a tutor
    const existing = await prisma.tutorProfile.findUnique({
        where: { userId: session.user.id },
    })
    if (existing) return { success: false, error: 'Kamu sudah terdaftar sebagai tutor' }

    const subjectsRaw = formData.getAll('subjects') as string[]
    const bio = formData.get('bio') as string

    // Parse availability from form data
    const availability: Record<string, string[]> = {}
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    for (const day of days) {
        const time = formData.get(`availability_${day}`) as string
        if (time) {
            availability[day] = [time]
        }
    }

    const parsed = tutorRegisterSchema.safeParse({
        subjects: subjectsRaw,
        bio,
        availability,
    })

    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    await prisma.tutorProfile.create({
        data: {
            userId: session.user.id,
            subjects: parsed.data.subjects,
            bio: parsed.data.bio,
            availability: parsed.data.availability,
            isVerified: false,
        },
    })

    // Update user role to TUTOR
    await prisma.user.update({
        where: { id: session.user.id },
        data: { role: 'TUTOR' },
    })

    // Sign out to clear old session (role has changed)
    // User needs to login again to get updated role in session
    await signOut({ redirectTo: '/login?registered=tutor' })
}

export async function getVerifiedTutors(options?: { subject?: string; search?: string; page?: number; perPage?: number }) {
    const { subject, search, page = 1, perPage = 9 } = options || {}
    const where: any = { isVerified: true }

    if (subject && subject !== 'Semua') {
        where.subjects = { has: subject }
    }

    if (search && search.trim()) {
        where.OR = [
            { user: { name: { contains: search.trim(), mode: 'insensitive' } } },
            { bio: { contains: search.trim(), mode: 'insensitive' } },
            { subjects: { hasSome: [search.trim()] } },
        ]
    }

    const [tutors, total] = await Promise.all([
        prisma.tutorProfile.findMany({
            where,
            include: {
                user: { select: { id: true, name: true, email: true, class: true, avatarUrl: true } },
                _count: { select: { reviews: true } },
            },
            orderBy: { rating: 'desc' },
            skip: (page - 1) * perPage,
            take: perPage,
        }),
        prisma.tutorProfile.count({ where }),
    ])

    return { tutors, total, totalPages: Math.ceil(total / perPage), page }
}

export async function getTutorById(tutorProfileId: string) {
    return prisma.tutorProfile.findUnique({
        where: { id: tutorProfileId },
        include: {
            user: { select: { id: true, name: true, email: true, class: true, avatarUrl: true } },
            reviews: {
                include: { student: { select: { name: true, avatarUrl: true } } },
                orderBy: { createdAt: 'desc' },
                take: 10,
            },
            _count: { select: { reviews: true, requests: true } },
        },
    })
}

export async function getTutorDashboardData() {
    const session = await auth()
    if (!session?.user) return null

    const tutorProfile = await prisma.tutorProfile.findUnique({
        where: { userId: session.user.id },
        include: {
            requests: {
                include: {
                    student: { select: { name: true, class: true, avatarUrl: true } },
                },
                orderBy: { createdAt: 'desc' },
            },
        },
    })

    if (!tutorProfile) return null

    const pendingRequests = tutorProfile.requests.filter((r) => r.status === 'PENDING')
    const upcomingSessions = tutorProfile.requests.filter((r) => r.status === 'APPROVED' && r.scheduledAt > new Date())
    const completedSessions = tutorProfile.requests.filter((r) => r.status === 'COMPLETED')

    return {
        tutorProfile,
        pendingRequests,
        upcomingSessions,
        completedSessions,
        stats: {
            totalSessions: tutorProfile.totalSessions,
            rating: tutorProfile.rating,
            pending: pendingRequests.length,
            upcoming: upcomingSessions.length,
        },
    }
}
