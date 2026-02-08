import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Calendar, Clock, FileText, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import StatCard from '@/components/dashboard/stat-card'
import EmptyState from '@/components/ui/empty-state'
import { BookOpen, Star } from 'lucide-react'
import { getTutorDashboardData } from '@/lib/actions/tutor'
import { redirect } from 'next/navigation'
import { ApproveButton, RejectButton } from '@/components/tutor/action-buttons'
import type { TutorPendingRequest, TutorSessionItem } from '@/types/dashboard'

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })
}

function formatTime(date: Date | string) {
    return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export default async function TutorDashboardPage() {
    const data = await getTutorDashboardData()
    if (!data) redirect('/tutor/register')

    const { tutorProfile, pendingRequests, upcomingSessions, stats } = data

    const tutorStats = [
        { title: 'Total Sesi', value: stats.totalSessions, icon: BookOpen },
        { title: 'Rating', value: tutorProfile.rating?.toFixed(1) ?? '-', icon: Star },
        { title: 'Request Masuk', value: stats.pending, icon: FileText },
        { title: 'Sesi Mendatang', value: stats.upcoming, icon: Calendar },
    ]
    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-balance font-serif text-3xl font-medium">Dashboard Tutor</h1>
                    {tutorProfile.isVerified ? (
                        <Badge variant="outline">Verified</Badge>
                    ) : (
                        <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-400">Menunggu Verifikasi</Badge>
                    )}
                </div>
                <p className="text-muted-foreground mt-2">Kelola request dan sesi bimbingan kamu.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {tutorStats.map((stat) => (
                    <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>

            {/* Incoming Requests */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 font-medium">
                        <FileText className="size-4" />
                        Request Masuk ({pendingRequests.length})
                    </h2>
                </div>

                {pendingRequests.length > 0 ? (
                    <div className="space-y-4">
                        {pendingRequests.map((request: TutorPendingRequest) => (
                            <div
                                key={request.id}
                                className="rounded-(--radius) border p-5">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="space-y-3">
                                        {/* Student Info */}
                                        <div className="flex items-center gap-3">
                                            <Avatar className="size-9">
                                                <AvatarFallback className="text-xs">
                                                    {request.student.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <span className="font-medium">{request.student.name}</span>
                                                <span className="text-muted-foreground text-sm"> - Kelas {request.student.class}</span>
                                            </div>
                                        </div>

                                        {/* Subject & Topic */}
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge variant="outline">{request.subject}</Badge>
                                            <span className="text-muted-foreground text-sm">{request.topic}</span>
                                        </div>

                                        {/* Schedule Details */}
                                        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="size-3.5" />
                                                <span>{formatDate(request.scheduledAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="size-3.5" />
                                                <span>{formatTime(request.scheduledAt)} ({request.duration} menit)</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="size-3.5" />
                                                <span>{request.location || (request.mode === 'ONLINE' ? 'Online' : '-')}</span>
                                            </div>
                                            <Badge variant="outline" className="text-[10px]">
                                                {request.mode === 'ONLINE' ? 'Online' : 'Offline'}
                                            </Badge>
                                        </div>

                                        {/* Notes */}
                                        {request.notes && <p className="text-muted-foreground text-sm">{request.notes}</p>}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex shrink-0 items-center gap-2">
                                        <RejectButton requestId={request.id} />
                                        <ApproveButton requestId={request.id} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={FileText}
                        title="Belum ada request masuk"
                        description="Belum ada siswa yang mengirim request bimbingan ke kamu."
                    />
                )}
            </section>

            {/* Upcoming Sessions */}
            <section className="space-y-4">
                <h2 className="flex items-center gap-2 font-medium">
                    <Calendar className="size-4" />
                    Sesi Mendatang ({upcomingSessions.length})
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                    {upcomingSessions.map((session: TutorSessionItem) => (
                        <Link
                            key={session.id}
                            href={`/sessions/${session.id}`}
                            className="rounded-(--radius) border p-5 duration-200 hover:shadow-md hover:shadow-zinc-950/5">
                            <div className="flex items-center gap-2">
                                <h3 className="font-medium">{session.subject}</h3>
                                <Badge variant="outline">{session.mode === 'ONLINE' ? 'Online' : 'Offline'}</Badge>
                            </div>
                            <p className="text-muted-foreground mt-1 text-sm">{session.topic}</p>
                            <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-4 text-sm">
                                <div className="flex items-center gap-1.5">
                                    <Users className="size-3.5" />
                                    <span>{session.student.name}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="size-3.5" />
                                    <span>{formatDate(session.scheduledAt)}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock className="size-3.5" />
                                    <span>{formatTime(session.scheduledAt)}</span>
                                </div>
                            </div>
                            <div className="text-muted-foreground mt-2 flex items-center gap-1.5 text-sm">
                                <MapPin className="size-3.5" />
                                <span>{session.location || (session.mode === 'ONLINE' ? 'Online' : '-')}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}
