import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import StatCard from '@/components/dashboard/stat-card'
import { BarChart3, BookOpen, CheckCircle2, Shield, Users } from 'lucide-react'
import { getAdminDashboardData } from '@/lib/actions/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { VerifyButton, RejectTutorButton } from '@/components/admin/verify-buttons'

const roleLabels: Record<string, string> = { STUDENT: 'Siswa', TUTOR: 'Tutor', ADMIN: 'Admin' }

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function AdminPage() {
    const data = await getAdminDashboardData()
    if (!data) redirect('/dashboard')

    const { stats, pendingTutors, recentUsers } = data

    const adminStats = [
        { title: 'Total User', value: stats.totalUsers, icon: Users },
        { title: 'Total Tutor', value: stats.totalTutors, icon: BookOpen },
        { title: 'Total Sesi', value: stats.totalRequests, icon: CheckCircle2 },
        { title: 'Menunggu Verifikasi', value: stats.pendingVerifications, icon: Shield },
    ]
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-balance font-serif text-3xl font-medium">Admin Panel</h1>
                        <Badge variant="outline">Admin</Badge>
                    </div>
                    <p className="text-muted-foreground mt-2">Kelola pengguna, tutor, dan request di platform.</p>
                </div>
                <Link
                    href="/admin/analytics"
                    className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-2 rounded-(--radius) border px-4 py-2 text-sm font-medium transition-colors">
                    <BarChart3 className="size-4" />
                    Lihat Analitik
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {adminStats.map((stat) => (
                    <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                    />
                ))}
            </div>

            {/* Pending Tutor Verifications */}
            <section className="space-y-4">
                <h2 className="flex items-center gap-2 font-medium">
                    <Shield className="size-4" />
                    Menunggu Verifikasi ({pendingTutors.length})
                </h2>

                <div className="space-y-4">
                    {pendingTutors.map((tutor) => (
                        <div
                            key={tutor.id}
                            className="rounded-(--radius) border p-5">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-9">
                                            <AvatarFallback className="text-xs">
                                                {tutor.user.name
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <span className="font-medium">{tutor.user.name}</span>
                                            <span className="text-muted-foreground text-sm"> - Kelas {tutor.user.class}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {tutor.subjects.map((s) => (
                                            <Badge
                                                key={s}
                                                variant="outline">
                                                {s}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground text-sm">{tutor.bio}</p>
                                    <p className="text-muted-foreground text-xs">Mendaftar: {formatDate(tutor.createdAt)}</p>
                                </div>
                                <div className="flex shrink-0 items-center gap-2">
                                    <RejectTutorButton tutorProfileId={tutor.id} />
                                    <VerifyButton tutorProfileId={tutor.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Users Table */}
            <section className="space-y-4">
                <h2 className="flex items-center gap-2 font-medium">
                    <Users className="size-4" />
                    Pengguna Terbaru
                </h2>

                <div className="rounded-(--radius) border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left font-medium">Nama</th>
                                    <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Email</th>
                                    <th className="px-4 py-3 text-left font-medium">Role</th>
                                    <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Kelas</th>
                                    <th className="hidden px-4 py-3 text-left font-medium md:table-cell">Bergabung</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="border-b last:border-0">
                                        <td className="px-4 py-3 font-medium">{user.name}</td>
                                        <td className="text-muted-foreground hidden px-4 py-3 md:table-cell">{user.email}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant="outline">{roleLabels[user.role]}</Badge>
                                        </td>
                                        <td className="text-muted-foreground hidden px-4 py-3 md:table-cell">{user.class || '-'}</td>
                                        <td className="text-muted-foreground hidden px-4 py-3 md:table-cell">{formatDate(user.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}
