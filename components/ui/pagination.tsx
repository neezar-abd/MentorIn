import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface PaginationProps {
    currentPage: number
    totalPages: number
    baseUrl: string
    searchParams?: Record<string, string | undefined>
}

export default function Pagination({ currentPage, totalPages, baseUrl, searchParams = {} }: PaginationProps) {
    if (totalPages <= 1) return null

    function buildUrl(page: number) {
        const params = new URLSearchParams()
        Object.entries(searchParams).forEach(([key, value]) => {
            if (value) params.set(key, value)
        })
        params.set('page', String(page))
        return `${baseUrl}?${params.toString()}`
    }

    // Generate page numbers to show
    const pages: (number | 'ellipsis')[] = []
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
        pages.push(1)
        if (currentPage > 3) pages.push('ellipsis')
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pages.push(i)
        }
        if (currentPage < totalPages - 2) pages.push('ellipsis')
        pages.push(totalPages)
    }

    return (
        <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
            <Button
                variant="outline"
                size="sm"
                className="size-8 p-0"
                asChild={currentPage > 1}
                disabled={currentPage <= 1}>
                {currentPage > 1 ? (
                    <Link href={buildUrl(currentPage - 1)}>
                        <ChevronLeft className="size-4" />
                    </Link>
                ) : (
                    <span><ChevronLeft className="size-4" /></span>
                )}
            </Button>

            {pages.map((page, i) =>
                page === 'ellipsis' ? (
                    <span key={`ellipsis-${i}`} className="text-muted-foreground px-2 text-sm">...</span>
                ) : (
                    <Button
                        key={page}
                        variant={page === currentPage ? 'default' : 'outline'}
                        size="sm"
                        className="size-8 p-0 text-xs"
                        asChild={page !== currentPage}>
                        {page !== currentPage ? (
                            <Link href={buildUrl(page)}>{page}</Link>
                        ) : (
                            <span>{page}</span>
                        )}
                    </Button>
                )
            )}

            <Button
                variant="outline"
                size="sm"
                className="size-8 p-0"
                asChild={currentPage < totalPages}
                disabled={currentPage >= totalPages}>
                {currentPage < totalPages ? (
                    <Link href={buildUrl(currentPage + 1)}>
                        <ChevronRight className="size-4" />
                    </Link>
                ) : (
                    <span><ChevronRight className="size-4" /></span>
                )}
            </Button>
        </nav>
    )
}
