import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function TestimonialSection() {
    const testimonials = [
        {
            name: 'Firman Ibnu Shobirin',
            role: 'Siswa Kelas XI RPL 1',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Firman',
            content: 'Platform MentorIn sangat membantu proses belajar saya. Tutor-nya kompeten dan cara ngajarnya mudah dipahami. Highly recommended untuk teman-teman yang butuh bimbingan!',
        },
        {
            name: 'Achmad Dzaky Habibullah Al Azhar',
            role: 'Siswa Kelas XI RPL 1',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dzaky',
            content: 'Sistem request dan jadwalnya fleksibel banget. Bisa belajar kapan aja sesuai waktu luang. Interface-nya juga user-friendly, gampang dipake.',
        },
        {
            name: 'Dzahabi Khalaf',
            role: 'Siswa Kelas XI RPL 1',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dzahabi',
            content: 'MentorIn bikin belajar jadi lebih asik! Tutor-nya ramah dan sabar jelasinnya. Rating system-nya juga membantu milih tutor yang tepat. Great platform!',
        },
    ]

    return (
        <section>
            <div className="bg-muted py-24">
                <div className="@container mx-auto w-full max-w-5xl px-6">
                    <div className="mb-12">
                        <h2 className="text-foreground text-4xl font-medium">Kata Mereka</h2>
                        <p className="text-muted-foreground my-4 text-balance text-lg">Dengar langsung dari siswa yang sudah merasakan manfaat belajar bersama tutor sebaya di MentorIn.</p>
                    </div>
                    <div className="@lg:grid-cols-2 @3xl:grid-cols-3 grid gap-6">
                        {testimonials.map((testimonial, index) => (
                            <div key={index}>
                                <div className="bg-background ring-foreground/10 rounded-2xl rounded-bl border border-transparent px-4 py-3 ring-1">
                                    <p className="text-foreground">{testimonial.content}</p>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <Avatar className="ring-foreground/10 size-6 border border-transparent shadow ring-1">
                                        <AvatarImage
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                        />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-foreground text-sm font-medium">{testimonial.name}</div>
                                    <span
                                        aria-hidden
                                        className="bg-foreground/25 size-1 rounded-full"></span>
                                    <span className="text-muted-foreground text-sm">{testimonial.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
