export type User = {
  id: string
  email: string
  name: string
  role: 'STUDENT' | 'TUTOR' | 'ADMIN'
  class?: string | null
  avatarUrl?: string | null
}

export type TutorProfile = {
  id: string
  userId: string
  subjects: string[]
  bio?: string | null
  availability: Record<string, string[]>
  isVerified: boolean
  rating: number
  totalSessions: number
}

export type Request = {
  id: string
  studentId: string
  tutorId: string
  subject: string
  topic: string
  mode: 'ONLINE' | 'OFFLINE'
  location?: string | null
  scheduledAt: Date
  duration: number
  notes?: string | null
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED'
}

export type Review = {
  id: string
  requestId: string
  studentId: string
  tutorId: string
  rating: number
  comment?: string | null
}
