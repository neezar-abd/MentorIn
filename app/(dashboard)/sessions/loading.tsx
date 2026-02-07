import { Skeleton } from '@/components/ui/skeleton'

export default function SessionsLoading() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <Skeleton className="h-9 w-44" />
                <Skeleton className="mt-2 h-5 w-64" />
            </div>

            {/* Upcoming Sessions */}
            <section className="space-y-4">
                <Skeleton className="h-5 w-44" />
                <div className="space-y-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="rounded-(--radius) border p-5 space-y-3">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-4 w-36" />
                                <Skeleton className="h-5 w-14 rounded-full" />
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Completed Sessions */}
            <section className="space-y-4">
                <Skeleton className="h-5 w-40" />
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="rounded-(--radius) border p-5 space-y-3">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-28" />
                                <Skeleton className="h-4 w-36" />
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
