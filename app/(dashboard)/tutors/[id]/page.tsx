import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import RatingStars from '@/components/ui/rating-stars'
import { BookOpen, Calendar, CheckCircle2, ChevronRight, Clock, MapPin, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { getTutorById } from '@/lib/actions/tutor'
import { notFound } from 'next/navigation'
import type { TutorDetail } from '@/types/dashboard'

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getInitials(name: string) {
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
}

export default async function TutorDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const tutor = await getTutorById(id)
    if (!tutor) notFound()

    const availability = (tutor.availability as Record<string, string[]>) || {}

    return (
        <div className="space-y-10">
            {/* Profile Header */}
            <div className="rounded-(--radius) border p-6 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                    <Avatar className="size-20 md:size-24">
                        <AvatarImage src={tutor.user.avatarUrl || undefined} />
                        <AvatarFallback className="text-xl">{getInitials(tutor.user.name)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="font-serif text-2xl font-medium md:text-3xl">{tutor.user.name}</h1>
                                {tutor.isVerified && <CheckCircle2 className="text-foreground size-5" />}
                            </div>
                            <p className="text-muted-foreground mt-1">Kelas {tutor.user.class}</p>
                        </div>

                        {/* Stats Row */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-2">
                                <RatingStars rating={tutor.rating} size="sm" />
                                <span className="text-sm font-medium">{tutor.rating}</span>
                                <span className="text-muted-foreground text-sm">({tutor._count.reviews} ulasan)</span>
                            </div>
                            <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                                <BookOpen className="size-3.5" />
                                <span>{tutor.totalSessions} sesi selesai</span>
                            </div>
                        </div>

                        {/* Subjects */}
                        <div className="flex flex-wrap gap-1.5">
                            {tutor.subjects.map((subject: string) => (
                                <Badge key={subject} variant="outline">{subject}</Badge>
                            ))}
                        </div>

                        {/* Bio */}
                        {tutor.bio && <p className="text-muted-foreground text-sm leading-relaxed">{tutor.bio}</p>}

                        {/* CTA */}
                        <Button asChild className="pr-1.5">
                            <Link href={`/requests/new?tutorId=${tutor.id}`}>
                                <span>Request Bimbingan</span>
                                <ChevronRight className="opacity-50" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Availability */}
            {Object.keys(availability).length > 0 && (
                <section className="space-y-4">
                    <h2 className="font-medium">Jadwal Tersedia</h2>
                    <div className="rounded-(--radius) border">
                        <div className="divide-y">
                            {Object.entries(availability).map(([day, slots]: [string, unknown]) => (
                                <div key={day} className="flex items-center gap-4 px-5 py-3">
                                    <span className="w-20 font-medium">{day}</span>
                                    <div className="flex flex-wrap gap-2">
                                        {(slots as string[]).map((slot: string) => (
                                            <div key={slot} className="text-muted-foreground flex items-center gap-1.5 text-sm">
                                                <Clock className="size-3.5" />
                                                <span>{slot}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Reviews */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">Ulasan ({tutor.reviews.length})</h2>
                </div>
                {tutor.reviews.length > 0 ? (
                    <div className="space-y-4">
                        {tutor.reviews.map((review: TutorDetail['reviews'][number]) => (
                            <div key={review.id} className="rounded-(--radius) border p-5">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-9">
                                            <AvatarFallback className="text-xs">{getInitials(review.student.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <span className="text-sm font-medium">{review.student.name}</span>
                                            <RatingStars rating={review.rating} size="sm" className="mt-0.5" />
                                        </div>
                                    </div>
                                    <span className="text-muted-foreground text-xs">{formatDate(review.createdAt)}</span>
                                </div>
                                {review.comment && <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{review.comment}</p>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">Belum ada ulasan.</p>
                )}
            </section>
        </div>
    )
}
