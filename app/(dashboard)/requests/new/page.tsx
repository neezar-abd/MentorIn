import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getTutorById } from '@/lib/actions/tutor'
import { redirect } from 'next/navigation'
import { RequestForm } from '@/components/request/request-form'

function getInitials(name: string) {
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
}

export default async function NewRequestPage({ searchParams }: { searchParams: Promise<{ tutorId?: string }> }) {
    const params = await searchParams
    if (!params.tutorId) redirect('/tutors')

    const tutor = await getTutorById(params.tutorId)
    if (!tutor) redirect('/tutors')

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-balance font-serif text-3xl font-medium">Buat Request Bimbingan</h1>
                <p className="text-muted-foreground mt-2">Isi form di bawah untuk mengajukan request bimbingan ke tutor.</p>
            </div>

            {/* Selected Tutor */}
            <div className="rounded-(--radius) border p-5">
                <p className="text-muted-foreground mb-3 text-sm">Tutor yang dipilih</p>
                <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                        <AvatarFallback className="text-sm">{getInitials(tutor.user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{tutor.user.name}</span>
                            <span className="text-muted-foreground text-sm">· {tutor.rating} rating</span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                            <span className="text-muted-foreground text-sm">Kelas {tutor.user.class}</span>
                            <span className="text-muted-foreground text-sm">·</span>
                            {tutor.subjects.map((s: string) => (
                                <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <RequestForm tutorId={tutor.id} tutorSubjects={tutor.subjects} />
        </div>
    )
}
