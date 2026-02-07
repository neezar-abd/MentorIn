import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="text-center">
                <FileQuestion className="text-muted-foreground mx-auto size-16" />
                <h1 className="mt-6 font-serif text-5xl font-medium">404</h1>
                <p className="text-muted-foreground mt-3 text-lg">Halaman yang kamu cari tidak ditemukan.</p>
                <p className="text-muted-foreground mt-1 text-sm">Mungkin halaman ini sudah dipindah atau dihapus.</p>
                <div className="mt-8 flex items-center justify-center gap-3">
                    <Button asChild variant="outline">
                        <Link href="/">Kembali ke Beranda</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
