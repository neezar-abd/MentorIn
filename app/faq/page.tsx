import { HeroHeader } from '@/components/header'
import Footer from '@/components/layouts/footer'

const faqs = [
    {
        q: 'Apa itu MentorIn?',
        a: 'MentorIn adalah platform bimbingan belajar peer-to-peer yang menghubungkan siswa pintar dengan siswa yang membutuhkan bantuan belajar. Siswa bisa menjadi tutor sekaligus belajar dari tutor lain.',
    },
    {
        q: 'Apakah Tutor Sebaya gratis?',
        a: 'Ya, platform ini sepenuhnya gratis untuk semua siswa. Tidak ada biaya pendaftaran maupun biaya per sesi.',
    },
    {
        q: 'Bagaimana cara menjadi tutor?',
        a: 'Setelah mendaftar sebagai siswa, kamu bisa klik "Jadi Tutor" di dashboard. Isi mata pelajaran yang dikuasai, bio, dan jadwal tersedia. Setelah diverifikasi admin, kamu bisa mulai menerima request.',
    },
    {
        q: 'Berapa lama proses verifikasi tutor?',
        a: 'Proses verifikasi memakan waktu 1-2 hari kerja. Kamu akan mendapat notifikasi ketika profil sudah disetujui atau ditolak.',
    },
    {
        q: 'Bisa bimbingan online atau offline?',
        a: 'Keduanya bisa. Saat membuat request, kamu bisa pilih mode Online (via Google Meet/Zoom) atau Offline (tatap muka di lokasi yang disepakati).',
    },
    {
        q: 'Bagaimana sistem rating bekerja?',
        a: 'Setelah sesi bimbingan selesai, siswa bisa memberikan rating 1-5 bintang dan komentar. Rating ini akan ditampilkan di profil tutor dan membantu siswa lain memilih tutor.',
    },
    {
        q: 'Apa yang terjadi jika tutor menolak request saya?',
        a: 'Tutor bisa menolak request jika jadwal bentrok atau ada alasan lain. Kamu bisa mencari tutor lain atau mengajukan request dengan jadwal berbeda.',
    },
    {
        q: 'Bisakah saya menjadi tutor dan siswa sekaligus?',
        a: 'Ya, tentu saja. Kamu bisa menjadi tutor di mata pelajaran yang kamu kuasai sambil tetap belajar dari tutor lain di mata pelajaran yang kamu butuhkan.',
    },
    {
        q: 'Mata pelajaran apa saja yang tersedia?',
        a: 'Saat ini tersedia Matematika, Fisika, Kimia, Biologi, Bahasa Inggris, Bahasa Indonesia, Sejarah, Ekonomi, Sosiologi, dan Geografi. Daftar ini akan terus bertambah.',
    },
    {
        q: 'Bagaimana jika saya punya masalah teknis?',
        a: 'Kamu bisa menghubungi kami melalui halaman Kontak atau email ke info@tutorsebaya.com. Tim kami akan membantu secepatnya.',
    },
]

export default function FAQPage() {
    return (
        <>
            <HeroHeader />
            <main className="pt-32 pb-16">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="space-y-10">
                        {/* Header */}
                        <div className="max-w-2xl">
                            <h1 className="text-balance font-serif text-4xl font-medium">Pertanyaan Umum</h1>
                            <p className="text-muted-foreground mt-4">Jawaban untuk pertanyaan yang sering ditanyakan tentang Tutor Sebaya.</p>
                        </div>

                        {/* FAQ List */}
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className="rounded-(--radius) border p-5">
                                    <h3 className="font-medium">{faq.q}</h3>
                                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
