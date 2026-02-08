export default function StatsSection() {
    return (
        <section className="py-12 md:py-16">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-medium lg:text-5xl">Kelebihan MentorIn</h2>
                    <p>Platform yang terus berkembang dengan ribuan siswa yang terbantu dan ratusan tutor berpengalaman yang siap membantu.</p>
                </div>

                <div className="grid gap-0.5 *:text-center md:grid-cols-4">
                    <div className="rounded-(--radius) space-y-4 border py-12">
                        <div className="text-5xl font-semibold">100+</div>
                        <p>Tutor Aktif</p>
                    </div>
                    <div className="rounded-(--radius) space-y-4 border py-12">
                        <div className="text-5xl font-semibold">500+</div>
                        <p>Siswa Terbantu</p>
                    </div>
                    <div className="rounded-(--radius) space-y-4 border py-12">
                        <div className="text-5xl font-semibold">15+</div>
                        <p>Mata Pelajaran</p>
                    </div>
                    <div className="rounded-(--radius) space-y-4 border py-12">
                        <div className="text-5xl font-semibold">4.8/5</div>
                        <p>Rating Rata-rata</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
