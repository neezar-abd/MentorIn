import { Skeleton } from '@/components/ui/skeleton'

export default function AnalyticsLoading() {
    return (
        <div className="space-y-10">
            <div>
                <Skeleton className="h-9 w-48" />
                <Skeleton className="mt-2 h-5 w-80" />
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-(--radius)" />
                ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-72 rounded-(--radius)" />
                <Skeleton className="h-72 rounded-(--radius)" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-72 rounded-(--radius)" />
                <Skeleton className="h-72 rounded-(--radius)" />
            </div>
        </div>
    )
}
