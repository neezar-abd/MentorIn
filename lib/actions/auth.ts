'use server'

import { hash } from 'bcryptjs'
import { signIn, signOut } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { loginSchema, registerSchema } from '@/lib/validations'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'

export type ActionResult = {
    success: boolean
    error?: string
}

export async function registerAction(formData: FormData): Promise<ActionResult> {
    const raw = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        class: formData.get('class') || undefined,
    }

    const parsed = registerSchema.safeParse(raw)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const { name, email, password, class: kelas } = parsed.data

    // Check if email already exists
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
        return { success: false, error: 'Email sudah terdaftar' }
    }

    // Hash password & create user
    const hashedPassword = await hash(password, 12)
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            class: kelas,
        },
    })

    // Auto sign in after register
    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        })
    } catch {
        // Sign in failed, redirect to login
        redirect('/login')
    }

    redirect('/dashboard')
}

export async function loginAction(formData: FormData): Promise<ActionResult> {
    const raw = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const parsed = loginSchema.safeParse(raw)
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0].message }
    }

    const callbackUrl = formData.get('callbackUrl') as string | null

    try {
        await signIn('credentials', {
            email: parsed.data.email,
            password: parsed.data.password,
            redirect: false,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            return { success: false, error: 'Email atau password salah' }
        }
        throw error
    }

    redirect(callbackUrl || '/dashboard')
}

export async function logoutAction() {
    await signOut({ redirectTo: '/' })
}
