import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import RatingStars from '@/components/ui/rating-stars'
import ReviewForm from '@/components/review/review-form'
import { ExportCertificateButton } from '@/components/export/export-buttons'
import { Calendar, CheckCircle2, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getRequestById } from '@/lib/actions/request'
import { auth } from '@/lib/auth'
import { CompleteButton } from '@/components/tutor/action-buttons'

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

function formatTime(date: Date | string) {
    return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export default async function SessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const [session, authSession] = await Promise.all([getRequestById(id), auth()])

    if (!session || !authSession?.user) notFound()

    const isCompleted = session.status === 'COMPLETED'
    const isStudent = session.studentId === authSession.user.id
    const isTutor = session.tutor.userId === authSession.user.id
    const isPastSession = new Date(session.scheduledAt) <= new Date()
    const tutorName = session.tutor.user.name
    const tutorInitials = tutorName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <Link
                    href="/sessions"
                    className="text-muted-foreground hover:text-accent-foreground text-sm duration-150">
                    ← Kembali ke Sesi
                </Link>
                <h1 className="mt-4 text-balance font-serif text-3xl font-medium">Detail Sesi</h1>
            </div>

            {/* Session Info */}
            <div className="rounded-(--radius) border p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-xl font-medium">{session.subject}</h2>
                            <Badge variant="outline">{session.mode === 'ONLINE' ? 'Online' : 'Offline'}</Badge>
                            <span
                                className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${isCompleted
                                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400'
                                    : 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-400'
                                    }`}>
                                {isCompleted ? 'Selesai' : 'Akan Datang'}
                            </span>
                        </div>
                        <p className="text-muted-foreground mt-1">{session.topic}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {isCompleted && (
                            <ExportCertificateButton sessionId={session.id} />
                        )}
                        {!isCompleted && isTutor && session.status === 'APPROVED' && isPastSession && (
                            <CompleteButton requestId={session.id} />
                        )}
                    </div>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {/* Tutor */}
                    <div className="space-y-3">
                        <p className="text-muted-foreground text-sm">Tutor</p>
                        <div className="flex items-center gap-3">
                            <Avatar className="size-10">
                                <AvatarFallback className="text-sm">{tutorInitials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <Link
                                    href={`/tutors/${session.tutorId}`}
                                    className="font-medium hover:underline">
                                    {tutorName}
                                </Link>
                                <p className="text-muted-foreground text-sm">Kelas {session.tutor.user.class}</p>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                        <p className="text-muted-foreground text-sm">Detail</p>
                        <div className="text-muted-foreground space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Calendar className="size-4" />
                                <span>{formatDate(session.scheduledAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="size-4" />
                                <span>
                                    {formatTime(session.scheduledAt)} · {session.duration} menit
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="size-4" />
                                <span>{session.location || (session.mode === 'ONLINE' ? 'Online' : '-')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                {session.notes && (
                    <div className="mt-6 border-t pt-6">
                        <p className="text-muted-foreground text-sm">Catatan</p>
                        <p className="mt-2 text-sm leading-relaxed">{session.notes}</p>
                    </div>
                )}
            </div>

            {/* Review Section */}
            {isCompleted && isStudent && (
                <div className="rounded-(--radius) border p-6 md:p-8">
                    {session.review ? (
                        /* Existing Review */
                        <div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-emerald-600 size-5" />
                                <h2 className="font-medium">Review Kamu</h2>
                            </div>
                            <div className="mt-4 space-y-3">
                                <RatingStars
                                    rating={session.review.rating}
                                    size="md"
                                />
                                {session.review.comment && (
                                    <p className="text-muted-foreground text-sm">{session.review.comment}</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <ReviewForm requestId={session.id} />
                    )}
                </div>
            )}
        </div>
    )
}
