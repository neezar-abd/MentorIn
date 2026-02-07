import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HeroHeader } from './header'
import { AudioLines, ChevronRight, MessageCircle, Mic2, Plus } from 'lucide-react'

export default function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <section className="bg-background">
                    <div className="py-20 md:py-28">
                        <div className="mx-auto w-full max-w-5xl sm:pl-6">
                            <div className="flex items-center justify-between max-md:flex-col">
                                <div className="max-w-md max-sm:px-6">
                                    <h1 className="text-balance font-serif text-4xl font-medium sm:text-5xl">Belajar Jadi Lebih Mudah dengan Teman Sebaya</h1>
                                    <p className="text-muted-foreground mt-4 text-balance">Platform bimbingan belajar peer-to-peer yang menghubungkan siswa pintar dengan siswa yang membutuhkan bantuan.</p>

                                    <Button
                                        asChild
                                        className="mt-6 pr-1.5">
                                        <Link href="/register">
                                            <span className="text-nowrap">Mulai Belajar</span>
                                            <ChevronRight className="opacity-50" />
                                        </Link>
                                    </Button>
                                </div>
                                <div
                                    aria-hidden
                                    className="mask-y-from-50% relative max-md:mx-auto max-md:*:scale-90">
                                    {[
                                        'Bisa bantu jelasin materi Integral Tentu?',
                                        'Gimana cara ngerjain soal Fisika gerak parabola?',
                                        'Ada tutor Kimia yang bisa bantu besok?',
                                        'Mau les Bahasa Inggris TOEFL preparation',
                                        'Butuh bantuan buat persiapan Ujian Matematika',
                                        'Ada yang bisa ajarin Biologi metabolisme?',
                                        'Cari tutor Ekonomi untuk bahas inflasi',
                                        'Bisa jelasin materi Sejarah Revolusi Industri?',
                                        'Mau belajar coding Python dari dasar',
                                        'Ada tutor yang bisa ajarin essay writing?',
                                        'Butuh les persiapan masuk PTN',
                                        'Cari tutor untuk olimpiade Matematika',
                                    ].map((prompt, index) => (
                                        <div
                                            key={index}
                                            className="text-muted-foreground flex items-center gap-2 px-14 py-2 text-sm">
                                            <MessageCircle className="size-3.5 opacity-50" />
                                            <span className="text-nowrap">{prompt}</span>
                                        </div>
                                    ))}
                                    <div className="bg-card min-w-sm ring-border shadow-foreground/6.5 dark:shadow-black/6.5 absolute inset-0 m-auto mt-auto flex h-fit justify-between gap-3 rounded-full p-2 shadow-xl ring-1 sm:inset-2">
                                        <div className="flex items-center gap-2">
                                            <div className="hover:bg-muted flex size-9 cursor-pointer rounded-full *:m-auto *:size-4">
                                                <Plus />
                                            </div>
                                            <div className="text-muted-foreground text-sm">Tanya apa aja...</div>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <div className="hover:bg-muted flex size-9 cursor-pointer rounded-full *:m-auto *:size-4">
                                                <Mic2 />
                                            </div>
                                            <div className="bg-foreground text-background flex size-9 cursor-pointer rounded-full *:m-auto *:size-4 hover:brightness-110">
                                                <AudioLines />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}
