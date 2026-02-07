'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { supabaseAdmin } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export type UploadResult = {
    success: boolean
    error?: string
    url?: string
}

export async function uploadAvatar(formData: FormData): Promise<UploadResult> {
    const session = await auth()
    if (!session?.user) return { success: false, error: 'Unauthorized' }

    const file = formData.get('avatar') as File
    if (!file || file.size === 0) return { success: false, error: 'Pilih file gambar terlebih dahulu' }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
        return { success: false, error: 'Format file harus JPEG, PNG, atau WebP' }
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
        return { success: false, error: 'Ukuran file maksimal 2MB' }
    }

    const ext = file.name.split('.').pop()
    const fileName = `${session.user.id}-${Date.now()}.${ext}`
    const filePath = `avatars/${fileName}`

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
        .from('avatars')
        .upload(filePath, buffer, {
            contentType: file.type,
            upsert: true,
        })

    if (uploadError) {
        console.error('Upload error:', uploadError)
        return { success: false, error: 'Gagal mengupload gambar. Pastikan bucket "avatars" sudah dibuat di Supabase Storage.' }
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
        .from('avatars')
        .getPublicUrl(filePath)

    // Delete old avatar if exists
    const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { avatarUrl: true } })
    if (user?.avatarUrl && user.avatarUrl.includes('avatars/')) {
        const oldPath = user.avatarUrl.split('avatars/').pop()
        if (oldPath) {
            await supabaseAdmin.storage.from('avatars').remove([`avatars/${oldPath}`])
        }
    }

    // Update user avatar URL
    await prisma.user.update({
        where: { id: session.user.id },
        data: { avatarUrl: publicUrl },
    })

    revalidatePath('/profile')
    revalidatePath('/dashboard')
    return { success: true, url: publicUrl }
}
