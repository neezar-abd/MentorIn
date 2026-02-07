import { HeroHeader } from '@/components/header'
import Footer from '@/components/layouts/footer'
import { BookOpen, GraduationCap, Heart, Users } from 'lucide-react'
import { ReactNode } from 'react'

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative size-20 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />
        <div className="bg-background absolute inset-0 m-auto flex size-10 items-center justify-center border-l border-t">{children}</div>
    </div>
)

const values = [
    {
        icon: Users,
        title: 'Peer-to-Peer',
        desc: 'Belajar dari teman sebaya yang mengerti kesulitanmu karena mereka pernah ada di posisi yang sama.',
    },
    {
        icon: GraduationCap,
        title: 'Akses untuk Semua',
        desc: 'Setiap siswa berhak mendapat bantuan belajar. Platform ini gratis dan terbuka untuk seluruh siswa.',
    },
    {
        icon: Heart,
        title: 'Solidaritas',
        desc: 'Membangun budaya saling membantu di lingkungan sekolah dan meningkatkan prestasi bersama.',
    },
    {
        icon: BookOpen,
        title: 'Pengalaman Berharga',
        desc: 'Tutor mendapat pengalaman mengajar, leadership, dan skill komunikasi yang tidak didapat di kelas.',
    },
]

export default function AboutPage() {
    return (
        <>
            <HeroHeader />
            <main className="pt-32 pb-16">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="space-y-16">
                        {/* Header */}
                        <div className="max-w-2xl">
                            <h1 className="text-balance font-serif text-4xl font-medium">Tentang MentorIn</h1>
                            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
                                MentorIn adalah platform bimbingan belajar peer-to-peer yang menghubungkan siswa pintar dengan siswa yang membutuhkan bantuan. Kami percaya bahwa belajar dari teman sebaya bisa lebih efektif karena tidak ada rasa canggung atau malu.
                            </p>
                        </div>

                        {/* Problem */}
                        <section className="space-y-4">
                            <h2 className="font-serif text-2xl font-medium">Masalah yang Kami Selesaikan</h2>
                            <div className="rounded-(--radius) border p-6 md:p-8">
                                <p className="text-muted-foreground leading-relaxed">
                                    Banyak siswa yang kesulitan di mata pelajaran tertentu merasa malu untuk bertanya ke guru. Padahal, teman sekelas mereka yang pintar sebenarnya bisa membantu. Sayangnya, tidak ada sistem yang memfasilitasi ini secara terstruktur. MentorIn hadir untuk menjembatani gap tersebut.
                                </p>
                            </div>
                        </section>

                        {/* Values */}
                        <section className="space-y-6">
                            <h2 className="font-serif text-2xl font-medium">Nilai-Nilai Kami</h2>
                            <div className="grid gap-6 sm:grid-cols-2">
                                {values.map((value) => (
                                    <div
                                        key={value.title}
                                        className="rounded-(--radius) space-y-4 border p-6">
                                        <CardDecorator>
                                            <value.icon
                                                className="size-5"
                                                aria-hidden
                                            />
                                        </CardDecorator>
                                        <h3 className="font-medium">{value.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* How It Works */}
                        <section className="space-y-6">
                            <h2 className="font-serif text-2xl font-medium">Cara Kerja</h2>
                            <div className="space-y-4">
                                {[
                                    { step: '01', title: 'Daftar', desc: 'Buat akun sebagai siswa. Gratis dan cuma butuh email sekolah.' },
                                    { step: '02', title: 'Cari Tutor', desc: 'Browse tutor berdasarkan mata pelajaran, lihat rating dan review dari siswa lain.' },
                                    { step: '03', title: 'Request Bimbingan', desc: 'Kirim request ke tutor yang kamu pilih dengan topik, jadwal, dan mode (online/offline).' },
                                    { step: '04', title: 'Belajar Bersama', desc: 'Setelah tutor menyetujui, sesi bimbingan dimulai sesuai jadwal yang disepakati.' },
                                    { step: '05', title: 'Beri Review', desc: 'Setelah sesi selesai, berikan rating dan review untuk membantu tutor dan siswa lainnya.' },
                                ].map((item) => (
                                    <div
                                        key={item.step}
                                        className="flex gap-6 rounded-(--radius) border p-5">
                                        <span className="text-muted-foreground text-2xl font-bold">{item.step}</span>
                                        <div>
                                            <h3 className="font-medium">{item.title}</h3>
                                            <p className="text-muted-foreground mt-1 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
