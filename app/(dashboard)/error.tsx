'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="space-y-10">
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertTriangle className="size-12 text-red-500" />
                <h2 className="mt-4 font-serif text-2xl font-medium">Terjadi Kesalahan</h2>
                <p className="text-muted-foreground mt-2 text-sm max-w-md">
                    Maaf, terjadi kesalahan saat memuat halaman ini. Silakan coba lagi atau kembali ke dashboard.
                </p>
                {error.digest && (
                    <p className="text-muted-foreground mt-2 font-mono text-xs">Error ID: {error.digest}</p>
                )}
                <div className="mt-6 flex items-center gap-3">
                    <Button variant="outline" onClick={reset}>Coba Lagi</Button>
                    <Button asChild><a href="/dashboard">Dashboard</a></Button>
                </div>
            </div>
        </div>
    )
}
