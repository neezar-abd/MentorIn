'use client'

import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="text-center">
                <AlertTriangle className="mx-auto size-16 text-red-500" />
                <h1 className="mt-6 font-serif text-5xl font-medium">500</h1>
                <p className="text-muted-foreground mt-3 text-lg">Terjadi kesalahan pada server.</p>
                <p className="text-muted-foreground mt-1 text-sm">
                    Kami sedang memperbaiki masalah ini. Silakan coba lagi.
                </p>
                {error.digest && (
                    <p className="text-muted-foreground mt-2 font-mono text-xs">Error ID: {error.digest}</p>
                )}
                <div className="mt-8 flex items-center justify-center gap-3">
                    <Button variant="outline" onClick={reset}>
                        Coba Lagi
                    </Button>
                    <Button asChild>
                        <a href="/dashboard">Dashboard</a>
                    </Button>
                </div>
            </div>
        </div>
    )
}
