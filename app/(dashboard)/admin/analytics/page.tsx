import { BarChart3, BookOpen, MessageSquare, Star, Trophy, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import StatCard from '@/components/dashboard/stat-card'
import { getAnalyticsData } from '@/lib/actions/analytics'
import { redirect } from 'next/navigation'
import {
    RequestTrendChart,
    UserRegistrationChart,
    UsersPerRoleChart,
    RequestStatusChart,
    TopSubjectsChart,
} from '@/components/admin/analytics-charts'

export default async function AdminAnalyticsPage() {
    const data = await getAnalyticsData()
    if (!data) redirect('/dashboard')

    const { overview, usersPerRole, requestsPerStatus, requestsByMonth, usersByMonth, topSubjects, topTutors } = data

    const stats = [
        { title: 'Total User', value: overview.totalUsers, icon: Users },
        { title: 'Tutor Aktif', value: overview.totalTutors, icon: BookOpen },
        { title: 'Total Request', value: overview.totalRequests, icon: MessageSquare },
        { title: 'Rata-rata Rating', value: `${overview.avgRating}/5`, icon: Star },
    ]

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2">
                    <BarChart3 className="size-6" />
                    <h1 className="text-balance font-serif text-3xl font-medium">Analytics</h1>
                    <Badge variant="outline">Admin</Badge>
                </div>
                <p className="text-muted-foreground mt-2">Dashboard analitik platform MentorIn.</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                    <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
                ))}
            </div>

            {/* Charts Row 1: Trend + Registration */}
            <div className="grid gap-4 md:grid-cols-2">
                <RequestTrendChart data={requestsByMonth} />
                <UserRegistrationChart data={usersByMonth} />
            </div>

            {/* Charts Row 2: Pie Charts */}
            <div className="grid gap-4 md:grid-cols-2">
                <UsersPerRoleChart data={usersPerRole} />
                <RequestStatusChart data={requestsPerStatus} />
            </div>

            {/* Charts Row 3: Subjects + Top Tutors */}
            <div className="grid gap-4 md:grid-cols-2">
                <TopSubjectsChart data={topSubjects} />

                {/* Top Tutors */}
                <div className="rounded-(--radius) border p-5">
                    <h3 className="mb-4 text-sm font-medium">Tutor Terbaik</h3>
                    {topTutors.length > 0 ? (
                        <div className="space-y-3">
                            {topTutors.map((tutor, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-muted-foreground flex size-6 items-center justify-center text-xs font-medium">
                                            {i === 0 ? <Trophy className="size-4 text-yellow-500" /> : `${i + 1}`}
                                        </span>
                                        <span className="text-sm font-medium">{tutor.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="text-muted-foreground">{tutor.sessions} sesi</span>
                                        <span className="flex items-center gap-1">
                                            <Star className="size-3 fill-yellow-400 text-yellow-400" />
                                            {tutor.rating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground py-8 text-center text-sm">Belum ada data tutor.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
