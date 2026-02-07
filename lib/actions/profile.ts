'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { updateProfileSchema, changePasswordSchema } from '@/lib/validations'
import { compare, hash } from 'bcryptjs'
import { revalidatePath } from 'next/cache'

export type ActionResult = {
    success: boolean
    error?: string
}

export async function updateProfile(formData: FormData): Promise<ActionResult> {
    const session = await auth()
    if (!session?.user) return { success: false, error: 'Unauthorized' }

    const raw = {
        name: formData.get('name'),
        class: formData.get('class') || undefined,
    }

    const parsed = updateProfileSchema.safeParse(raw)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            name: parsed.data.name,
            class: parsed.data.class,
        },
    })

    revalidatePath('/profile')
    return { success: true }
}

export async function changePassword(formData: FormData): Promise<ActionResult> {
    const session = await auth()
    if (!session?.user) return { success: false, error: 'Unauthorized' }

    const raw = {
        currentPassword: formData.get('currentPassword'),
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
    }

    const parsed = changePasswordSchema.safeParse(raw)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } })
    if (!user) return { success: false, error: 'User tidak ditemukan' }

    const isValid = await compare(parsed.data.currentPassword, user.password)
    if (!isValid) return { success: false, error: 'Password lama salah' }

    const hashedPassword = await hash(parsed.data.newPassword, 12)
    await prisma.user.update({
        where: { id: session.user.id },
        data: { password: hashedPassword },
    })

    return { success: true }
}

export async function getMyProfile() {
    const session = await auth()
    if (!session?.user) return null

    return prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            tutorProfile: true,
        },
    })
}
