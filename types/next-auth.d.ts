import { DefaultSession, DefaultJWT } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            role: 'STUDENT' | 'TUTOR' | 'ADMIN'
            class?: string | null
            avatarUrl?: string | null
            tutorProfileId?: string | null
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        id: string
        role: 'STUDENT' | 'TUTOR' | 'ADMIN'
        class?: string | null
        avatarUrl?: string | null
        tutorProfileId?: string | null
    }
}
