import { z } from 'zod/v4'

// ==================== AUTH ====================

export const loginSchema = z.object({
    email: z.email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
})

export const registerSchema = z
    .object({
        name: z.string().min(2, 'Nama minimal 2 karakter').max(50, 'Nama maksimal 50 karakter'),
        email: z.email('Email tidak valid'),
        password: z.string().min(6, 'Password minimal 6 karakter'),
        confirmPassword: z.string(),
        class: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password tidak cocok',
        path: ['confirmPassword'],
    })

// ==================== TUTOR ====================

export const tutorRegisterSchema = z.object({
    subjects: z.array(z.string()).min(1, 'Pilih minimal 1 mata pelajaran'),
    bio: z.string().min(10, 'Bio minimal 10 karakter').max(500, 'Bio maksimal 500 karakter'),
    availability: z.record(z.string(), z.array(z.string())),
})

// ==================== REQUEST ====================

export const requestSchema = z.object({
    tutorId: z.string().min(1, 'Tutor harus dipilih'),
    subject: z.string().min(1, 'Mata pelajaran harus dipilih'),
    topic: z.string().min(3, 'Topik minimal 3 karakter').max(100, 'Topik maksimal 100 karakter'),
    mode: z.enum(['ONLINE', 'OFFLINE']),
    location: z.string().optional(),
    scheduledAt: z.coerce.date({ error: 'Tanggal tidak valid' }),
    duration: z.coerce.number().min(30, 'Minimal 30 menit').max(180, 'Maksimal 180 menit'),
    notes: z.string().max(500, 'Catatan maksimal 500 karakter').optional(),
})

// ==================== REVIEW ====================

export const reviewSchema = z.object({
    requestId: z.string().min(1),
    rating: z.coerce.number().min(1, 'Rating minimal 1').max(5, 'Rating maksimal 5'),
    comment: z.string().max(500, 'Komentar maksimal 500 karakter').optional(),
})

// ==================== PROFILE ====================

export const updateProfileSchema = z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter').max(50, 'Nama maksimal 50 karakter'),
    class: z.string().optional(),
})

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Password lama wajib diisi'),
        newPassword: z.string().min(6, 'Password baru minimal 6 karakter'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Password baru tidak cocok',
        path: ['confirmPassword'],
    })

// ==================== ADMIN ====================

export const verifyTutorSchema = z.object({
    tutorProfileId: z.string().min(1),
    action: z.enum(['VERIFY', 'REJECT']),
})

// ==================== INFER TYPES ====================

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type TutorRegisterInput = z.infer<typeof tutorRegisterSchema>
export type RequestInput = z.infer<typeof requestSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type VerifyTutorInput = z.infer<typeof verifyTutorSchema>
