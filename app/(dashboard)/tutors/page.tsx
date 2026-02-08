import TutorCard from '@/components/tutor/tutor-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SearchInput from '@/components/ui/search-input'
import Pagination from '@/components/ui/pagination'
import { Search } from 'lucide-react'
import { getVerifiedTutors } from '@/lib/actions/tutor'
import Link from 'next/link'
import type { TutorListItem } from '@/types/dashboard'

const subjects = ['Semua', 'Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Inggris', 'Bahasa Indonesia', 'Sejarah', 'Ekonomi', 'Sosiologi', 'Geografi']

export default async function TutorsPage({ searchParams }: { searchParams: Promise<{ subject?: string; search?: string; page?: string }> }) {
    const params = await searchParams
    const selectedSubject = params.subject || 'Semua'
    const search = params.search || ''
    const page = Number(params.page) || 1
    const { tutors, total, totalPages } = await getVerifiedTutors({ subject: selectedSubject, search, page })

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-balance font-serif text-3xl font-medium">Cari Tutor</h1>
                <p className="text-muted-foreground mt-2">Temukan mentor terbaik yang cocok untuk kamu.</p>
            </div>

            {/* Search + Subject Filter */}
            <div className="space-y-4">
                <SearchInput placeholder="Cari tutor berdasarkan nama, bio, atau mata pelajaran..." />
                <div className="flex flex-wrap gap-2">
                    {subjects.map((subject) => (
                        <Button
                            key={subject}
                            asChild
                            variant={subject === selectedSubject ? 'default' : 'outline'}
                            size="sm"
                            className="h-8 text-xs">
                            <Link href={subject === 'Semua' ? `/tutors${search ? `?search=${encodeURIComponent(search)}` : ''}` : `/tutors?subject=${encodeURIComponent(subject)}${search ? `&search=${encodeURIComponent(search)}` : ''}`}>
                                {subject}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div>
                <p className="text-muted-foreground mb-4 text-sm">
                    {total} tutor ditemukan
                    {search && <span> untuk &ldquo;{search}&rdquo;</span>}
                </p>

                {tutors.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {tutors.map((tutor: TutorListItem) => (
                            <TutorCard key={tutor.id} tutor={tutor} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-(--radius) border py-12 text-center">
                        <Search className="text-muted-foreground mx-auto size-8" />
                        <p className="text-muted-foreground mt-3 text-sm">
                            {search ? `Tidak ada tutor yang cocok dengan "${search}"` : 'Belum ada tutor yang terdaftar.'}
                        </p>
                    </div>
                )}

                {/* Pagination */}
                <div className="mt-8">
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        baseUrl="/tutors"
                        searchParams={{ subject: selectedSubject !== 'Semua' ? selectedSubject : undefined, search: search || undefined }}
                    />
                </div>
            </div>
        </div>
    )
}
