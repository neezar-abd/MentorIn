import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'

export default NextAuth(authConfig).auth

export const config = {
    matcher: ['/dashboard/:path*', '/tutors/:path*', '/requests/:path*', '/sessions/:path*', '/profile/:path*', '/settings/:path*', '/tutor/:path*', '/admin/:path*', '/calendar/:path*', '/login', '/register', '/forgot-password'],
}
