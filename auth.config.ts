import type { NextAuthConfig } from 'next-auth'

// Edge-compatible auth config (no Node.js imports)
export const authConfig = {
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role
                token.class = (user as any).class
                token.avatarUrl = (user as any).avatarUrl
                token.tutorProfileId = (user as any).tutorProfileId
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                ;(session.user as any).role = token.role
                ;(session.user as any).class = token.class
                ;(session.user as any).avatarUrl = token.avatarUrl
                ;(session.user as any).tutorProfileId = token.tutorProfileId
            }
            return session
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const role = auth?.user?.role

            const isAuthPage = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register') || nextUrl.pathname.startsWith('/forgot-password')
            const isDashboardPage = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/tutors') || nextUrl.pathname.startsWith('/requests') || nextUrl.pathname.startsWith('/sessions') || nextUrl.pathname.startsWith('/profile') || nextUrl.pathname.startsWith('/settings') || nextUrl.pathname.startsWith('/tutor') || nextUrl.pathname.startsWith('/calendar')
            const isAdminPage = nextUrl.pathname.startsWith('/admin')

            // Redirect logged-in users away from auth pages
            if (isAuthPage && isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }

            // Require login for dashboard pages
            if (isDashboardPage && !isLoggedIn) {
                return false // Will redirect to login
            }

            // Admin-only routes
            if (isAdminPage && role !== 'ADMIN') {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }

            return true
        },
    },
    providers: [], // Providers will be added in auth.ts
} satisfies NextAuthConfig
