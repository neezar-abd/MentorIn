'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ChevronRight, Send } from 'lucide-react'
import Link from 'next/link'
import { createRequest, type ActionResult } from '@/lib/actions/request'
import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type RequestFormProps = {
    tutorId: string
    tutorSubjects: string[]
}

export function RequestForm({ tutorId, tutorSubjects }: RequestFormProps) {
    const router = useRouter()
    const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
        async (_prev, formData) => {
            const result = await createRequest(formData)
            return result
        },
        null
    )

    useEffect(() => {
        if (state?.success) {
            toast.success('Request bimbingan berhasil dikirim!')
            router.push('/requests')
        } else if (state?.error) {
            toast.error(state.error)
        }
    }, [state, router])

    return (
        <div className="rounded-(--radius) border p-6 md:p-8">
            {state?.error && (
                <div className="mb-6 rounded-(--radius) border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {state.error}
                </div>
            )}
            
            <form action={formAction} className="space-y-6">
                <input type="hidden" name="tutorId" value={tutorId} />

                {/* Subject & Topic */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="subject">Mata Pelajaran *</Label>
                        <select
                            id="subject"
                            name="subject"
                            required
                            disabled={isPending}
                            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="">Pilih mata pelajaran</option>
                            {tutorSubjects.map((subject: string) => (
                                <option key={subject} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="topic">Topik Spesifik *</Label>
                        <Input id="topic" name="topic" placeholder="Contoh: Integral Tentu, Gerak Parabola" required disabled={isPending} />
                    </div>
                </div>

                {/* Mode */}
                <div className="space-y-2">
                    <Label>Mode Bimbingan *</Label>
                    <div className="flex gap-4">
                        <label className="flex cursor-pointer items-center gap-2">
                            <input type="radio" name="mode" value="OFFLINE" defaultChecked disabled={isPending} className="accent-foreground size-4" />
                            <span className="text-sm">Offline (Tatap Muka)</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2">
                            <input type="radio" name="mode" value="ONLINE" disabled={isPending} className="accent-foreground size-4" />
                            <span className="text-sm">Online (Video Call)</span>
                        </label>
                    </div>
                </div>

                {/* Schedule & Duration */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="scheduledAt">Tanggal & Waktu *</Label>
                        <Input id="scheduledAt" name="scheduledAt" type="datetime-local" required disabled={isPending} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration">Durasi (menit)</Label>
                        <select
                            id="duration"
                            name="duration"
                            defaultValue="60"
                            disabled={isPending}
                            className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="30">30 menit</option>
                            <option value="60">60 menit</option>
                            <option value="90">90 menit</option>
                            <option value="120">120 menit</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <Input id="location" name="location" placeholder="Contoh: Perpustakaan Lt. 2, atau link Google Meet" disabled={isPending} />
                    <p className="text-muted-foreground text-xs">Isi lokasi tatap muka atau link meeting jika online.</p>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                    <Label htmlFor="notes">Catatan Tambahan</Label>
                    <Textarea id="notes" name="notes" placeholder="Apa yang ingin kamu pelajari? Bagian mana yang sulit? Ada soal tertentu?" rows={4} disabled={isPending} />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 border-t pt-6">
                    <Button type="button" variant="outline" asChild disabled={isPending}>
                        <Link href="/requests">Batal</Link>
                    </Button>
                    <Button type="submit" className="pr-1.5" disabled={isPending}>
                        <Send className="size-4" />
                        <span>{isPending ? 'Mengirim...' : 'Kirim Request'}</span>
                        <ChevronRight className="opacity-50" />
                    </Button>
                </div>
            </form>
        </div>
    )
}
