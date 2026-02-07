'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, ChevronRight, Clock, GraduationCap, Info, Star, Users } from 'lucide-react'
import { ReactNode } from 'react'
import { registerAsTutor, type ActionResult } from '@/lib/actions/tutor'
import { useActionState } from 'react'

const subjectOptions = ['Matematika', 'Fisika', 'Kimia', 'Biologi', 'Bahasa Inggris', 'Bahasa Indonesia', 'Sejarah', 'Ekonomi', 'Sosiologi', 'Geografi']

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

const initialState: ActionResult = { success: false }

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-28 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)

export default function TutorRegisterPage() {
    const [state, formAction, isPending] = useActionState(
        async (_prev: ActionResult, formData: FormData) => {
            return await registerAsTutor(formData)
        },
        initialState
    )
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="text-center">
                <CardDecorator>
                    <GraduationCap className="size-6" />
                </CardDecorator>
                <h1 className="mt-6 text-balance font-serif text-3xl font-medium">Jadi Tutor Sebaya</h1>
                <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm">Bantu teman-teman kamu belajar dan dapatkan pengalaman mengajar yang berharga.</p>
            </div>

            {/* Benefits */}
            <div className="grid gap-4 sm:grid-cols-3">
                {[
                    { icon: GraduationCap, title: 'Pengalaman Mengajar', desc: 'Tingkatkan skill leadership & komunikasi' },
                    { icon: Star, title: 'Rating & Reputasi', desc: 'Bangun reputasi sebagai tutor terbaik' },
                    { icon: Users, title: 'Bantu Teman', desc: 'Berbagi ilmu dan meningkatkan solidaritas' },
                ].map((benefit) => {
                    const Icon = benefit.icon
                    return (
                    <div
                        key={benefit.title}
                        className="rounded-(--radius) border p-5 text-center">
                        <Icon className="mx-auto size-6" />
                        <h3 className="mt-3 font-medium">{benefit.title}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">{benefit.desc}</p>
                    </div>
                    )
                })}
            </div>

            {/* Info Banner */}
            <div className="rounded-(--radius) border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
                <div className="flex items-start gap-3">
                    <Info className="mt-0.5 size-4 shrink-0 text-blue-600 dark:text-blue-400" />
                    <div className="text-sm text-blue-800 dark:text-blue-300">
                        <p className="font-medium">Proses Verifikasi</p>
                        <p className="mt-1 opacity-80">Setelah mendaftar, profil kamu akan ditinjau oleh admin. Proses verifikasi memakan waktu 1-2 hari kerja. Kamu akan mendapat notifikasi ketika profil sudah disetujui.</p>
                    </div>
                </div>
            </div>

            {state.error && (
                <div className="rounded-(--radius) border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {state.error}
                </div>
            )}

            {/* Form */}
            <div className="rounded-(--radius) border p-6 md:p-8">
                <h2 className="font-medium">Isi Data Tutor</h2>
                <p className="text-muted-foreground mt-1 text-sm">Lengkapi informasi di bawah agar siswa lain bisa menemukan kamu.</p>

                <form action={formAction} className="mt-8 space-y-6">
                    {/* Subjects */}
                    <div className="space-y-2">
                        <Label>Mata Pelajaran yang Dikuasai *</Label>
                        <p className="text-muted-foreground text-xs">Pilih mata pelajaran yang ingin kamu ajarkan.</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {subjectOptions.map((subject) => (
                                <label
                                    key={subject}
                                    className="cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="subjects"
                                        value={subject}
                                        className="peer sr-only"
                                    />
                                    <Badge
                                        variant="outline"
                                        className="peer-checked:bg-foreground peer-checked:text-background cursor-pointer duration-200 peer-checked:border-transparent">
                                        {subject}
                                    </Badge>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio / Tentang Kamu *</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            placeholder="Ceritakan tentang kemampuan kamu, prestasi, dan mengapa kamu ingin jadi tutor..."
                            rows={4}
                        />
                        <p className="text-muted-foreground text-xs">Minimal 50 karakter. Tips: Ceritakan prestasi atau pengalaman belajar kamu.</p>
                    </div>

                    {/* Availability */}
                    <div className="space-y-4">
                        <div>
                            <Label>Jadwal Tersedia *</Label>
                            <p className="text-muted-foreground text-xs">Pilih hari dan waktu yang kamu bisa untuk mengajar.</p>
                        </div>
                        <div className="space-y-3">
                            {days.map((day) => (
                                <div
                                    key={day}
                                    className="flex items-center gap-4">
                                    <label className="flex w-24 cursor-pointer items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name={`day_${day}`}
                                            className="accent-foreground size-4"
                                        />
                                        <span className="text-sm">{day}</span>
                                    </label>
                                    <div className="flex flex-1 items-center gap-2">
                                        <Input
                                            type="time"
                                            name={`availability_${day}`}
                                            className="h-8 w-32 text-sm"
                                            defaultValue="15:00"
                                        />
                                        <span className="text-muted-foreground text-sm">s/d</span>
                                        <Input
                                            type="time"
                                            name={`availability_end_${day}`}
                                            className="h-8 w-32 text-sm"
                                            defaultValue="17:00"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex items-center justify-between border-t pt-6">
                        <div className="text-muted-foreground flex items-center gap-2 text-sm">
                            <Clock className="size-4" />
                            <span>Review dalam 1-2 hari kerja</span>
                        </div>
                        <Button
                            type="submit"
                            className="pr-1.5"
                            disabled={isPending}>
                            <CheckCircle2 className="size-4" />
                            <span>{isPending ? 'Mendaftar...' : 'Daftar Jadi Tutor'}</span>
                            <ChevronRight className="opacity-50" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
