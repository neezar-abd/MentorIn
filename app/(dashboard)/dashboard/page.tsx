import { BookOpen, Calendar, Clock, ChevronRight, GraduationCap, MapPin, Star, Users } from 'lucide-react'
import StatCard from '@/components/dashboard/stat-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getDashboardData } from '@/lib/actions/dashboard'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import type { SessionItem } from '@/types/dashboard'

const statusColors: Record<string, string> = {
    PENDING: 'text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/30 dark:border-yellow-900',
    APPROVED: 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-900',
    COMPLETED: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900',
    REJECTED: 'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-900',
    CANCELLED: 'text-zinc-700 bg-zinc-50 border-zinc-200 dark:text-zinc-400 dark:bg-zinc-950/30 dark:border-zinc-800',
}

const statusLabels: Record<string, string> = {
    PENDING: 'Menunggu',
    APPROVED: 'Disetujui',
    COMPLETED: 'Selesai',
    REJECTED: 'Ditolak',
    CANCELLED: 'Dibatalkan',
}

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })
}

function formatTime(date: Date | string) {
    return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export default async function DashboardPage() {
    const session = await auth()
    if (!session?.user) redirect('/login')

    const data = await getDashboardData()
    if (!data) redirect('/login')

    const { stats, upcomingSessions, recentRequests } = data

    const statCards = [
        { title: 'Total Sesi', value: stats.totalSessions, icon: BookOpen },
        { title: 'Tutor Favorit', value: stats.uniqueTutors, icon: Star },
        { title: 'Sesi Bulan Ini', value: stats.sessionsThisMonth, icon: Calendar },
        { title: 'Jam Belajar', value: `${stats.totalHours}h`, icon: Clock },
    ]

    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <h1 className="text-balance font-serif text-3xl font-medium">Dashboard</h1>
                <p className="text-muted-foreground mt-2">Selamat datang kembali, {session.user.name?.split(' ')[0]}.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {statCards.map((stat) => (
                    <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>

            {/* Upcoming Sessions */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">Sesi Mendatang</h2>
                    <Button
                        asChild
                        variant="ghost"
                        size="sm">
                        <Link href="/sessions">
                            Lihat Semua
                            <ChevronRight className="ml-1 size-4 opacity-50" />
                        </Link>
                    </Button>
                </div>

                {upcomingSessions.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {upcomingSessions.map((s: SessionItem) => (
                            <Link
                                key={s.id}
                                href={`/sessions/${s.id}`}
                                className="rounded-(--radius) border p-5 duration-200 hover:shadow-md hover:shadow-zinc-950/5">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-medium">{s.subject}</h3>
                                            <Badge variant="outline">{s.mode === 'ONLINE' ? 'Online' : 'Offline'}</Badge>
                                        </div>
                                        <p className="text-muted-foreground text-sm">{s.topic}</p>
                                    </div>
                                </div>
                                <div className="text-muted-foreground mt-4 flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5">
                                        <Users className="size-3.5" />
                                        <span>{s.tutor.user.name}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="size-3.5" />
                                        <span>{formatDate(s.scheduledAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="size-3.5" />
                                        <span>{formatTime(s.scheduledAt)}</span>
                                    </div>
                                </div>
                                {s.location && (
                                    <div className="text-muted-foreground mt-2 flex items-center gap-1.5 text-sm"><MapPin className="size-3.5" /><span>{s.location}</span></div>
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-(--radius) border py-12 text-center">
                        <GraduationCap className="text-muted-foreground mx-auto size-8" />
                        <p className="text-muted-foreground mt-3 text-sm">Belum ada sesi mendatang</p>
                        <Button
                            asChild
                            className="mt-4 pr-1.5"
                            size="sm">
                            <Link href="/tutors">
                                Cari Tutor
                                <ChevronRight className="opacity-50" />
                            </Link>
                        </Button>
                    </div>
                )}
            </section>

            {/* Recent Requests */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">Request Terbaru</h2>
                    <Button
                        asChild
                        variant="ghost"
                        size="sm">
                        <Link href="/requests">
                            Lihat Semua
                            <ChevronRight className="ml-1 size-4 opacity-50" />
                        </Link>
                    </Button>
                </div>

                <div className="rounded-(--radius) border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left font-medium">Mata Pelajaran</th>
                                    <th className="px-4 py-3 text-left font-medium">Topik</th>
                                    <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Tutor</th>
                                    <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Jadwal</th>
                                    <th className="px-4 py-3 text-left font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRequests.map((request: SessionItem) => (
                                    <tr
                                        key={request.id}
                                        className="border-b last:border-0">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{request.subject}</span>
                                                <Badge variant="outline" className="text-[10px]">
                                                    {request.mode === 'ONLINE' ? 'Online' : 'Offline'}
                                                </Badge>
                                            </div>
                                        </td>
                                        <td className="text-muted-foreground px-4 py-3">{request.topic}</td>
                                        <td className="text-muted-foreground hidden px-4 py-3 md:table-cell">{request.tutor.user.name}</td>
                                        <td className="text-muted-foreground hidden px-4 py-3 md:table-cell">
                                            {formatDate(request.scheduledAt)} · {formatTime(request.scheduledAt)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[request.status]}`}>
                                                {statusLabels[request.status]}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="space-y-4">
                <h2 className="font-medium">Aksi Cepat</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    <Link
                        href="/tutors"
                        className="rounded-(--radius) border p-5 text-center duration-200 hover:shadow-md hover:shadow-zinc-950/5">
                        <Users className="mx-auto size-6" />
                        <h3 className="mt-3 font-medium">Cari Tutor</h3>
                        <p className="text-muted-foreground mt-1 text-sm">Temukan tutor yang cocok</p>
                    </Link>
                    <Link
                        href="/requests/new"
                        className="rounded-(--radius) border p-5 text-center duration-200 hover:shadow-md hover:shadow-zinc-950/5">
                        <BookOpen className="mx-auto size-6" />
                        <h3 className="mt-3 font-medium">Buat Request</h3>
                        <p className="text-muted-foreground mt-1 text-sm">Ajukan bimbingan belajar</p>
                    </Link>
                    <Link
                        href="/tutor/register"
                        className="rounded-(--radius) border p-5 text-center duration-200 hover:shadow-md hover:shadow-zinc-950/5">
                        <GraduationCap className="mx-auto size-6" />
                        <h3 className="mt-3 font-medium">Jadi Tutor</h3>
                        <p className="text-muted-foreground mt-1 text-sm">Bantu teman belajar</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}
