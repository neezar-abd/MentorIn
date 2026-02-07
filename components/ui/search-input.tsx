'use client'

import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useTransition } from 'react'

export default function SearchInput({ placeholder = 'Cari...' }: { placeholder?: string }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [isPending, startTransition] = useTransition()
    const [query, setQuery] = useState(searchParams.get('search') || '')
    const isFirstRender = useRef(true)
    const prevSearch = useRef(query)

    useEffect(() => {
        // Skip on first render to avoid unnecessary navigation
        if (isFirstRender.current) {
            isFirstRender.current = false
            return
        }

        // Skip if value hasn't actually changed (prevents loop)
        if (prevSearch.current === query) return

        const timer = setTimeout(() => {
            prevSearch.current = query
            const params = new URLSearchParams(searchParams.toString())
            if (query) {
                params.set('search', query)
                params.delete('page')
            } else {
                params.delete('search')
            }
            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`)
            })
        }, 500)

        return () => clearTimeout(timer)
        // Intentionally only depend on query to prevent re-trigger loops
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    const handleClear = () => {
        setQuery('')
        prevSearch.current = ''
        const params = new URLSearchParams(searchParams.toString())
        params.delete('search')
        params.delete('page')
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`)
        })
    }

    return (
        <div className="relative max-w-sm">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className={`pl-9 pr-8 ${isPending ? 'opacity-70' : ''}`}
            />
            {query && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2.5 -translate-y-1/2">
                    <X className="size-3.5" />
                </button>
            )}
        </div>
    )
}
