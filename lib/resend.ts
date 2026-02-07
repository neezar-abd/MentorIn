import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

// Domain pengirim - ganti sesuai domain kamu di Resend
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Tutor Sebaya <noreply@tutorsebaya.com>'
