import { Search, CalendarCheck, GraduationCap, Star } from 'lucide-react'

export default function HowItWorks() {
    const steps = [
        {
            icon: Search,
            number: '01',
            title: 'Pilih Tutor',
            description: 'Browse dan filter tutor berdasarkan mata pelajaran yang kamu butuhkan. Lihat profil, rating, dan jadwal tersedia.',
        },
        {
            icon: CalendarCheck,
            number: '02',
            title: 'Request Bimbingan',
            description: 'Isi form request dengan topik yang ingin dipelajari, pilih jadwal yang cocok, dan tentukan mode (online/offline).',
        },
        {
            icon: GraduationCap,
            number: '03',
            title: 'Belajar Bersama',
            description: 'Sesi bimbingan dimulai sesuai jadwal. Tanyakan semua yang kamu belum paham, tutor siap membantu.',
        },
        {
            icon: Star,
            number: '04',
            title: 'Beri Rating',
            description: 'Setelah sesi selesai, berikan rating dan review untuk tutor agar siswa lain tahu kualitas pengajarannya.',
        },
    ]

    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-5xl px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-medium lg:text-5xl">Cara Kerjanya</h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Proses belajar bersama tutor sebaya di MentorIn sangat mudah dan simpel. Hanya 4 langkah!
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div key={index} className="relative text-center group">
                            {/* Connector Line - hidden on mobile and last item */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-border -z-10" />
                            )}

                            {/* Icon Container */}
                            <div className="relative mx-auto mb-6 w-32 h-32 flex items-center justify-center">
                                {/* Background Grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:16px_16px] rounded-full opacity-50" />
                                
                                {/* Number Badge */}
                                <div className="absolute -top-2 -right-2 w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center text-sm font-bold z-10">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className="relative z-10 bg-background border-2 border-border rounded-full w-20 h-20 flex items-center justify-center group-hover:border-foreground transition-colors">
                                    <step.icon className="w-8 h-8" />
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-medium font-sans mb-3">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
