import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { User } from '@/types'
import { cn } from '@/lib/utils'

interface ProfileCardProps {
    user: {
        name: string
        email: string
        role: User['role']
        class?: string | null
        avatarUrl?: string | null
    }
    className?: string
}

export default function ProfileCard({ user, className }: ProfileCardProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const getRoleLabel = (role: User['role']) => {
        const labels = { STUDENT: 'Siswa', TUTOR: 'Tutor', ADMIN: 'Admin' }
        return labels[role]
    }

    return (
        <div className={cn('rounded-(--radius) border p-6', className)}>
            <div className="flex items-start gap-4">
                <Avatar className="size-14">
                    <AvatarImage src={user.avatarUrl || undefined} />
                    <AvatarFallback className="text-sm">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="truncate font-medium">{user.name}</h3>
                        <Badge variant="outline">{getRoleLabel(user.role)}</Badge>
                    </div>
                    <p className="text-muted-foreground truncate text-sm">{user.email}</p>
                    {user.class && <p className="text-muted-foreground text-sm">Kelas {user.class}</p>}
                </div>
            </div>
        </div>
    )
}
