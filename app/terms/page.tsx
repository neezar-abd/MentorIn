import { HeroHeader } from '@/components/header'
import Footer from '@/components/layouts/footer'

const sections = [
    {
        title: '1. Ketentuan Umum',
        content:
            'Dengan mendaftar dan menggunakan Tutor Sebaya, kamu menyetujui syarat dan ketentuan yang berlaku. Platform ini ditujukan untuk siswa sekolah yang ingin belajar bersama secara peer-to-peer.',
    },
    {
        title: '2. Akun Pengguna',
        content:
            'Setiap pengguna bertanggung jawab atas keamanan akun masing-masing. Gunakan email yang valid dan password yang kuat. Satu email hanya bisa digunakan untuk satu akun.',
    },
    {
        title: '3. Perilaku Pengguna',
        content:
            'Pengguna diharapkan bersikap sopan dan menghormati satu sama lain. Dilarang melakukan bullying, spam, atau tindakan yang merugikan pengguna lain. Pelanggaran dapat mengakibatkan pembekuan atau penghapusan akun.',
    },
    {
        title: '4. Tutor',
        content:
            'Calon tutor harus mendaftar dan menunggu verifikasi dari admin. Tutor bertanggung jawab memberikan bimbingan yang berkualitas sesuai dengan mata pelajaran yang didaftarkan. Tutor berhak menerima atau menolak request bimbingan.',
    },
    {
        title: '5. Request Bimbingan',
        content:
            'Siswa dapat mengajukan request bimbingan ke tutor yang tersedia. Request yang sudah disetujui bersifat mengikat. Pembatalan harus dilakukan minimal 2 jam sebelum jadwal.',
    },
    {
        title: '6. Rating dan Review',
        content:
            'Siswa dapat memberikan rating dan review setelah sesi bimbingan selesai. Review harus jujur dan konstruktif. Review yang mengandung konten tidak pantas akan dihapus.',
    },
    {
        title: '7. Hak Kekayaan Intelektual',
        content:
            'Semua konten, desain, dan kode di platform Tutor Sebaya adalah milik tim pengembang. Pengguna tidak diperkenankan menyalin atau mendistribusikan materi platform tanpa izin.',
    },
    {
        title: '8. Batasan Tanggung Jawab',
        content:
            'Tutor Sebaya menyediakan platform sebagai fasilitator. Kami tidak bertanggung jawab atas kualitas bimbingan yang diberikan oleh tutor individual maupun hasil belajar siswa.',
    },
    {
        title: '9. Perubahan Ketentuan',
        content:
            'Syarat dan ketentuan ini dapat diperbarui sewaktu-waktu. Pengguna akan diinformasikan tentang perubahan signifikan melalui notifikasi.',
    },
]

export default function TermsPage() {
    return (
        <>
            <HeroHeader />
            <main className="pt-32 pb-16">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="space-y-10">
                        <div className="max-w-2xl">
                            <h1 className="text-balance font-serif text-4xl font-medium">Syarat & Ketentuan</h1>
                            <p className="text-muted-foreground mt-4">Terakhir diperbarui: 6 Februari 2026</p>
                        </div>

                        <div className="rounded-(--radius) border p-6 md:p-8">
                            <p className="text-muted-foreground leading-relaxed">
                                Harap baca syarat dan ketentuan berikut dengan seksama sebelum menggunakan platform Tutor Sebaya. Dengan menggunakan layanan kami, kamu dianggap telah memahami dan menyetujui semua ketentuan di bawah ini.
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
