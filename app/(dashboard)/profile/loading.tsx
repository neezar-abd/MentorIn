import { Skeleton } from '@/components/ui/skeleton'

export default function ProfileLoading() {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <Skeleton className="h-9 w-32" />
                <Skeleton className="mt-2 h-5 w-56" />
            </div>

            {/* Profile Card */}
            <div className="rounded-(--radius) border p-6 md:p-8">
                <div className="flex items-center gap-4">
                    <Skeleton className="size-16 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
            </div>

            {/* Edit Profile Form */}
            <div className="rounded-(--radius) border p-6 md:p-8 space-y-6">
                <div>
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="mt-1 h-4 w-48" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="rounded-(--radius) border p-6 md:p-8 space-y-6">
                <div>
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="mt-1 h-4 w-48" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
}
