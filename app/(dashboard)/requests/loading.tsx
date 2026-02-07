import { Skeleton } from '@/components/ui/skeleton'

export default function RequestsLoading() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <Skeleton className="h-9 w-56" />
                    <Skeleton className="mt-2 h-5 w-72" />
                </div>
                <Skeleton className="h-9 w-36" />
            </div>

            {/* Request Cards */}
            <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-(--radius) border p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-5 w-24" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-4 w-36" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-5 w-14 rounded-full" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-20 rounded-full" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
