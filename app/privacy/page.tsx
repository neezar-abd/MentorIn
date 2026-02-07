import { HeroHeader } from '@/components/header'
import Footer from '@/components/layouts/footer'

const sections = [
    {
        title: '1. Informasi yang Kami Kumpulkan',
        content:
            'Kami mengumpulkan informasi yang kamu berikan saat mendaftar, termasuk nama, email, dan kelas. Informasi ini digunakan untuk membuat akun dan menghubungkan kamu dengan tutor atau siswa lain.',
    },
    {
        title: '2. Penggunaan Informasi',
        content:
            'Informasi yang dikumpulkan digunakan untuk menjalankan layanan platform, menampilkan profil tutor, memfasilitasi request bimbingan, dan mengirimkan notifikasi terkait aktivitas akun kamu.',
    },
    {
        title: '3. Keamanan Data',
        content:
            'Kami menggunakan enkripsi password (bcrypt) dan koneksi aman (HTTPS) untuk melindungi data kamu. Password tidak pernah disimpan dalam bentuk teks biasa.',
    },
    {
        title: '4. Pembagian Data',
        content:
            'Kami tidak menjual atau membagikan data pribadi kamu ke pihak ketiga. Informasi profil tutor (nama, mata pelajaran, rating) ditampilkan secara publik di platform agar siswa lain bisa menemukan tutor.',
    },
    {
        title: '5. Hak Pengguna',
        content:
            'Kamu memiliki hak untuk mengakses, memperbarui, atau menghapus data pribadi kamu kapan saja melalui halaman Pengaturan. Jika ingin menghapus akun secara permanen, hubungi kami melalui halaman Kontak.',
    },
    {
        title: '6. Cookie',
        content:
            'Kami menggunakan cookie untuk menjaga sesi login kamu tetap aktif. Tidak ada cookie pelacakan pihak ketiga yang digunakan.',
    },
    {
        title: '7. Perubahan Kebijakan',
        content:
            'Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan signifikan akan diinformasikan melalui notifikasi di platform.',
    },
]

export default function PrivacyPage() {
    return (
        <>
            <HeroHeader />
            <main className="pt-32 pb-16">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="space-y-10">
                        <div className="max-w-2xl">
                            <h1 className="text-balance font-serif text-4xl font-medium">Kebijakan Privasi</h1>
                            <p className="text-muted-foreground mt-4">Terakhir diperbarui: 6 Februari 2026</p>
                        </div>

                        <div className="rounded-(--radius) border p-6 md:p-8">
                            <p className="text-muted-foreground leading-relaxed">
                                Kebijakan privasi ini menjelaskan bagaimana Tutor Sebaya mengumpulkan, menggunakan, dan melindungi informasi pribadi kamu saat menggunakan platform kami.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {sections.map((section) => (
                                <div
                                    key={section.title}
                                    className="rounded-(--radius) border p-6">
                                    <h2 className="font-medium">{section.title}</h2>
                                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{section.content}</p>
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
