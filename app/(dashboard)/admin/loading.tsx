import { Skeleton } from '@/components/ui/skeleton'

export default function AdminLoading() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-36" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                </div>
                <Skeleton className="mt-2 h-5 w-72" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-(--radius) border p-5">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="mt-2 h-8 w-12" />
                    </div>
                ))}
            </div>

            {/* Pending Verifications */}
            <section className="space-y-4">
                <Skeleton className="h-5 w-52" />
                <div className="space-y-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="rounded-(--radius) border p-5">
                            <div className="flex items-start justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="size-9 rounded-full" />
                                        <Skeleton className="h-4 w-36" />
                                    </div>
                                    <div className="flex gap-1.5">
                                        <Skeleton className="h-5 w-20 rounded-full" />
                                        <Skeleton className="h-5 w-16 rounded-full" />
                                    </div>
                                    <Skeleton className="h-4 w-64" />
                                </div>
                                <div className="flex gap-2">
                                    <Skeleton className="h-8 w-16" />
                                    <Skeleton className="h-8 w-24" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Users Table */}
            <section className="space-y-4">
                <Skeleton className="h-5 w-40" />
                <div className="rounded-(--radius) border">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-4 border-b px-4 py-3 last:border-0">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="hidden h-4 w-40 md:block" />
                            <Skeleton className="h-5 w-14 rounded-full" />
                            <Skeleton className="hidden h-4 w-20 md:block" />
                            <Skeleton className="hidden h-4 w-24 md:block" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
