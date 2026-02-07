import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import RatingStars from '@/components/ui/rating-stars'
import { BookOpen, CheckCircle2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TutorCardProps {
    tutor: {
        id: string
        user: {
            name: string
            avatarUrl?: string | null
            class?: string | null
        }
        subjects: string[]
        rating: number
        totalSessions: number
        isVerified: boolean
        bio?: string | null
    }
    className?: string
}

export default function TutorCard({ tutor, className }: TutorCardProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <div className={cn('group rounded-(--radius) border p-6 duration-200 hover:shadow-md hover:shadow-zinc-950/5', className)}>
            {/* Header */}
            <div className="flex items-start gap-4">
                <Avatar className="size-12">
                    <AvatarImage src={tutor.user.avatarUrl || undefined} />
                    <AvatarFallback className="text-sm">{getInitials(tutor.user.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="truncate font-medium">{tutor.user.name}</h3>
                        {tutor.isVerified && <CheckCircle2 className="text-foreground size-4 shrink-0" />}
                    </div>
                    {tutor.user.class && <p className="text-muted-foreground text-sm">Kelas {tutor.user.class}</p>}
                </div>
            </div>

            {/* Stats */}
            <div className="mt-4 flex items-center gap-4">
                <RatingStars
                    rating={tutor.rating}
                    size="sm"
                    showValue
                />
                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                    <BookOpen className="size-3.5" />
                    <span>{tutor.totalSessions} sesi</span>
                </div>
            </div>

            {/* Subjects */}
            <div className="mt-4 flex flex-wrap gap-1.5">
                {tutor.subjects.slice(0, 3).map((subject) => (
                    <Badge
                        key={subject}
                        variant="outline">
                        {subject}
                    </Badge>
                ))}
                {tutor.subjects.length > 3 && <Badge variant="outline">+{tutor.subjects.length - 3}</Badge>}
            </div>

            {/* Bio */}
            {tutor.bio && <p className="text-muted-foreground mt-4 line-clamp-2 text-sm">{tutor.bio}</p>}

            {/* Action */}
            <div className="mt-6">
                <Button
                    asChild
                    className="w-full pr-1.5"
                    size="sm">
                    <Link href={`/tutors/${tutor.id}`}>
                        <span>Lihat Profil</span>
                        <ChevronRight className="opacity-50" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
