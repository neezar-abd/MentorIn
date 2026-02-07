import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function StatsSection() {
    return (
        <section>
            <div className="py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div>
                            <h2 className="text-foreground text-balance text-3xl font-medium lg:text-4xl">Siap Mulai Belajar?</h2>
                            <p className="text-muted-foreground mt-2">Bergabung dengan ribuan siswa yang sudah belajar lebih efektif bersama tutor sebaya.</p>
                        </div>
                        <div className="flex justify-end gap-3">
                            <Button
                                asChild
                                variant="outline"
                                size="lg">
                                <Link href="/tutor/register">Jadi Tutor</Link>
                            </Button>
                            <Button
                                asChild
                                size="lg">
                                <Link href="/register">Mulai Belajar</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
