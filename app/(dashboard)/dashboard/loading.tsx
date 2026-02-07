import { Skeleton } from '@/components/ui/skeleton'

export default function DashboardLoading() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <Skeleton className="h-9 w-48" />
                <Skeleton className="mt-2 h-5 w-72" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-(--radius) border p-5">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="mt-2 h-8 w-16" />
                    </div>
                ))}
            </div>

            {/* Upcoming Sessions */}
            <section className="space-y-4">
                <Skeleton className="h-5 w-36" />
                <div className="grid gap-4 md:grid-cols-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="rounded-(--radius) border p-5 space-y-3">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-5 w-16 rounded-full" />
                            </div>
                            <Skeleton className="h-4 w-48" />
                            <div className="flex gap-4">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Recent Requests Table */}
            <section className="space-y-4">
                <Skeleton className="h-5 w-32" />
                <div className="rounded-(--radius) border">
                    <div className="space-y-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center gap-4 border-b px-4 py-3 last:border-0">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="hidden h-4 w-24 md:block" />
                                <Skeleton className="hidden h-4 w-28 md:block" />
                                <Skeleton className="h-5 w-16 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
