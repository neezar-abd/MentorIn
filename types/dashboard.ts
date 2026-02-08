// Shared types for dashboard pages to avoid implicit 'any' in .map() callbacks

export type SessionItem = {
    id: string
    subject: string
    topic: string
    mode: string
    location: string | null
    scheduledAt: Date | string
    duration: number
    status: string
    notes: string | null
    studentId: string
    tutorId: string
    createdAt: Date
    tutor: {
        user: { name: string; avatarUrl: string | null }
    }
    review: { id: string; rating: number; comment: string | null } | null
}

export type RequestItem = SessionItem

export type TutorPendingRequest = {
    id: string
    subject: string
    topic: string
    mode: string
    location: string | null
    scheduledAt: Date | string
    duration: number
    status: string
    notes: string | null
    student: { name: string; class: string | null; avatarUrl: string | null }
}

export type TutorSessionItem = {
    id: string
    subject: string
    topic: string
    mode: string
    location: string | null
    scheduledAt: Date | string
    duration: number
    student: { name: string }
}

export type TutorListItem = {
    id: string
    userId: string
    subjects: string[]
    bio: string
    rating: number
    totalSessions: number
    user: {
        id: string
        name: string
        email: string
        class: string | null
        avatarUrl: string | null
    }
    _count: { reviews: number }
}

export type TutorDetail = {
    id: string
    subjects: string[]
    bio: string
    rating: number
    totalSessions: number
    user: {
        id: string
        name: string
        email: string
        class: string | null
        avatarUrl: string | null
    }
    reviews: Array<{
        id: string
        rating: number
        comment: string | null
        createdAt: Date
        student: { name: string; avatarUrl: string | null }
    }>
    _count: { reviews: number; requests: number }
}
