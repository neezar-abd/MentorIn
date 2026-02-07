import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import EmptyState from '@/components/ui/empty-state'
import { Calendar, CheckCircle2, ChevronRight, Clock, MapPin, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { getMyRequests } from '@/lib/actions/request'

const statusConfig: Record<string, { label: string; className: string }> = {
    APPROVED: {
        label: 'Akan Datang',
        className: 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-900',
    },
    COMPLETED: {
        label: 'Selesai',
        className: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900',
    },
}

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

function formatTime(date: Date | string) {
    return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export default async function SessionsPage() {
    const { requests: allRequests } = await getMyRequests({ perPage: 100 })
    // Sessions = approved (upcoming) + completed
    const upcomingSessions = allRequests.filter((r) => r.status === 'APPROVED')
    const completedSessions = allRequests.filter((r) => r.status === 'COMPLETED')

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-balance font-serif text-3xl font-medium">Sesi Bimbingan</h1>
                <p className="text-muted-foreground mt-2">Daftar semua sesi bimbingan belajar kamu.</p>
            </div>

            {/* Upcoming Sessions */}
            <section className="space-y-4">
                <h2 className="flex items-center gap-2 font-medium">
                    <Calendar className="size-4" />
                    Sesi Mendatang ({upcomingSessions.length})
                </h2>

                {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingSessions.map((session) => (
                            <Link
                                key={session.id}
                                href={`/sessions/${session.id}`}
                                className="block rounded-(--radius) border p-5 duration-200 hover:shadow-md hover:shadow-zinc-950/5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-medium">{session.subject}</h3>
                                            <span className="text-muted-foreground text-sm">·</span>
                                            <span className="text-muted-foreground text-sm">{session.topic}</span>
                                            <Badge variant="outline">{session.mode === 'ONLINE' ? 'Online' : 'Offline'}</Badge>
                                        </div>
                                        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1.5">
                                                <Users className="size-3.5" />
                                                <span>{session.tutor.user.name}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="size-3.5" />
                                                <span>{formatDate(session.scheduledAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="size-3.5" />
                                                <span>{formatTime(session.scheduledAt)} ({session.duration} menit)</span>
                                            </div>
                                            {session.location && (
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="size-3.5" />
                                                    <span>{session.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusConfig.APPROVED.className}`}>
                                        {statusConfig.APPROVED.label}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={Calendar}
                        title="Belum ada sesi mendatang"
                        description="Cari tutor dan buat request bimbingan untuk menjadwalkan sesi."
                        action={{ label: 'Cari Tutor', href: '/tutors' }}
                    />
                )}
            </section>

            {/* Completed Sessions */}
            <section className="space-y-4">
                <h2 className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="size-4" />
                    Sesi Selesai ({completedSessions.length})
                </h2>

                {completedSessions.length > 0 ? (
                    <div className="space-y-4">
                        {completedSessions.map((session) => (
                            <Link
                                key={session.id}
                                href={`/sessions/${session.id}`}
                                className="block rounded-(--radius) border p-5 duration-200 hover:shadow-md hover:shadow-zinc-950/5">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="space-y-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="font-medium">{session.subject}</h3>
                                            <span className="text-muted-foreground text-sm">·</span>
                                            <span className="text-muted-foreground text-sm">{session.topic}</span>
                                        </div>
                                        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1.5">
                                                <Users className="size-3.5" />
                                                <span>{session.tutor.user.name}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="size-3.5" />
                                                <span>{formatDate(session.scheduledAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="size-3.5" />
                                                <span>{session.duration} menit</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusConfig.COMPLETED.className}`}>
                                            {statusConfig.COMPLETED.label}
                                        </span>
                                        {!session.review && (
                                            <Badge variant="outline" className="shrink-0 text-[10px]">
                                                <Star className="mr-1 size-3" />
                                                Beri Review
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">Belum ada sesi yang selesai.</p>
                )}
            </section>
        </div>
    )
}
