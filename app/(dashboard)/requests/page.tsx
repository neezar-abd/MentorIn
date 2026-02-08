import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import EmptyState from '@/components/ui/empty-state'
import Pagination from '@/components/ui/pagination'
import CancelButton from '@/components/request/cancel-button'
import { Calendar, ChevronRight, Clock, FileText, MapPin, Plus, Users } from 'lucide-react'
import Link from 'next/link'
import { getMyRequests } from '@/lib/actions/request'
import type { RequestItem } from '@/types/dashboard'

const statusColors: Record<string, string> = {
    PENDING: 'text-yellow-700 bg-yellow-50 border-yellow-200 dark:text-yellow-400 dark:bg-yellow-950/30 dark:border-yellow-900',
    APPROVED: 'text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/30 dark:border-blue-900',
    COMPLETED: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/30 dark:border-emerald-900',
    REJECTED: 'text-red-700 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/30 dark:border-red-900',
    CANCELLED: 'text-zinc-700 bg-zinc-50 border-zinc-200 dark:text-zinc-400 dark:bg-zinc-950/30 dark:border-zinc-800',
}

const statusLabels: Record<string, string> = {
    PENDING: 'Menunggu',
    APPROVED: 'Disetujui',
    COMPLETED: 'Selesai',
    REJECTED: 'Ditolak',
    CANCELLED: 'Dibatalkan',
}

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

function formatTime(date: Date | string) {
    return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export default async function RequestsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const params = await searchParams
    const page = Number(params.page) || 1
    const { requests, totalPages } = await getMyRequests({ page })

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-balance font-serif text-3xl font-medium">Request Bimbingan</h1>
                    <p className="text-muted-foreground mt-2">Kelola semua request bimbingan belajar kamu.</p>
                </div>
                <Button asChild className="w-fit pr-1.5">
                    <Link href="/requests/new">
                        <Plus className="size-4" />
                        <span>Buat Request</span>
                        <ChevronRight className="opacity-50" />
                    </Link>
                </Button>
            </div>

            {/* Request Cards */}
            {requests.length > 0 ? (
                <div className="space-y-4">
                    {requests.map((request: RequestItem) => (
                        <div
                            key={request.id}
                            className="rounded-(--radius) border p-5 duration-200 hover:shadow-md hover:shadow-zinc-950/5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="font-medium">{request.subject}</h3>
                                        <span className="text-muted-foreground text-sm">·</span>
                                        <span className="text-muted-foreground text-sm">{request.topic}</span>
                                    </div>

                                    <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="size-3.5" />
                                            <span>{request.tutor.user.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="size-3.5" />
                                            <span>{formatDate(request.scheduledAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="size-3.5" />
                                            <span>{formatTime(request.scheduledAt)} ({request.duration} menit)</span>
                                        </div>
                                    </div>

                                    <div className="text-muted-foreground flex items-center gap-4 text-sm">
                                        {request.location && (
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="size-3.5" />
                                                <span>{request.location}</span>
                                            </div>
                                        )}
                                        <Badge variant="outline">{request.mode === 'ONLINE' ? 'Online' : 'Offline'}</Badge>
                                    </div>

                                    {request.notes && (
                                        <p className="text-muted-foreground text-sm">
                                            <FileText className="mr-1.5 inline size-3.5" />
                                            {request.notes}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className={`inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[request.status]}`}>
                                        {statusLabels[request.status]}
                                    </span>
                                    {request.status === 'COMPLETED' && !request.review && (
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/sessions/${request.id}`}>Beri Review</Link>
                                        </Button>
                                    )}
                                    {(request.status === 'PENDING' || request.status === 'APPROVED') && (
                                        <CancelButton requestId={request.id} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState
                    icon={FileText}
                    title="Belum ada request"
                    description="Kamu belum membuat request bimbingan. Cari tutor dan buat request pertama kamu!"
                    action={{ label: 'Cari Tutor', href: '/tutors' }}
                />
            )}

            {/* Pagination */}
            <Pagination currentPage={page} totalPages={totalPages} baseUrl="/requests" />
        </div>
    )
}
