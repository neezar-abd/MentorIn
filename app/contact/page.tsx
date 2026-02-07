import { HeroHeader } from '@/components/header'
import Footer from '@/components/layouts/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ChevronRight, Mail, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
    return (
        <>
            <HeroHeader />
            <main className="pt-32 pb-16">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="space-y-10">
                        {/* Header */}
                        <div className="max-w-2xl">
                            <h1 className="text-balance font-serif text-4xl font-medium">Hubungi Kami</h1>
                            <p className="text-muted-foreground mt-4">Punya pertanyaan atau masukan? Kami senang mendengar dari kamu.</p>
                        </div>

                        <div className="grid gap-10 md:grid-cols-3">
                            {/* Contact Info */}
                            <div className="space-y-6">
                                <div className="rounded-(--radius) border p-5">
                                    <Mail className="size-5" />
                                    <h3 className="mt-3 font-medium">Email</h3>
                                    <p className="text-muted-foreground mt-1 text-sm">info@tutorsebaya.com</p>
                                </div>
                                <div className="rounded-(--radius) border p-5">
                                    <MapPin className="size-5" />
                                    <h3 className="mt-3 font-medium">Lokasi</h3>
                                    <p className="text-muted-foreground mt-1 text-sm">Indonesia</p>
                                </div>
                            </div>

                            {/* Form */}
                            <div className="rounded-(--radius) border p-6 md:col-span-2 md:p-8">
                                <h2 className="font-medium">Kirim Pesan</h2>
                                <p className="text-muted-foreground mt-1 text-sm">Isi form di bawah dan kami akan merespons secepatnya.</p>

                                <form className="mt-6 space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nama</Label>
                                            <Input
                                                id="name"
                                                placeholder="Nama lengkap"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Email kamu"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subjek</Label>
                                        <Input
                                            id="subject"
                                            placeholder="Tentang apa?"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Pesan</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tulis pesan kamu..."
                                            rows={5}
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button
                                            type="submit"
                                            className="pr-1.5">
                                            <Send className="size-4" />
                                            <span>Kirim</span>
                                            <ChevronRight className="opacity-50" />
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
