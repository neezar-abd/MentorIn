import { Skeleton } from '@/components/ui/skeleton'

export default function CalendarLoading() {
    return (
        <div className="space-y-8">
            <div>
                <Skeleton className="h-9 w-48" />
                <Skeleton className="mt-2 h-5 w-80" />
            </div>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-7 w-40" />
                    <Skeleton className="h-8 w-20" />
                </div>
                <Skeleton className="h-[480px] w-full rounded-(--radius)" />
            </div>
        </div>
    )
}
