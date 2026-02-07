import Link from 'next/link'
import { Logo } from '@/components/logo'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t py-12 md:py-16">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Brand */}
                    <div className="col-span-1">
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex items-center space-x-2">
                            <Logo />
                        </Link>
                        <p className="text-muted-foreground mt-4 text-sm">
                            Platform bimbingan belajar peer-to-peer untuk siswa Indonesia.
                        </p>
                    </div>

                    {/* Navigasi */}
                    <div>
                        <h3 className="font-medium font-sans">Navigasi</h3>
                        <ul className="text-muted-foreground mt-4 space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/login"
                                    className="hover:text-accent-foreground duration-150">
                                    Masuk
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="hover:text-accent-foreground duration-150">
                                    Daftar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tutors"
                                    className="hover:text-accent-foreground duration-150">
                                    Cari Tutor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tutor/register"
                                    className="hover:text-accent-foreground duration-150">
                                    Jadi Tutor
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h3 className="font-medium font-sans">Tentang</h3>
                        <p className="text-muted-foreground mt-4 text-sm">
                            MentorIn menghubungkan siswa dengan tutor sebaya yang kompeten untuk belajar lebih efektif dan menyenangkan.
                        </p>
                        <p className="text-muted-foreground mt-4 text-sm">
                            Email: <a href="mailto:nizarabdurr@gmail.com" className="hover:text-accent-foreground">nizarabdurr@gmail.com</a>
                        </p>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Web: <a href="https://neezar.tech" target="_blank" rel="noopener noreferrer" className="hover:text-accent-foreground">neezar.tech</a>
                        </p>
                        <p className="text-muted-foreground mt-2 text-sm">
                            IG: <a href="https://instagram.com/neezar_abd" target="_blank" rel="noopener noreferrer" className="hover:text-accent-foreground">@neezar_abd</a>
                        </p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="text-muted-foreground mt-12 flex flex-col items-center justify-between gap-2 border-t pt-8 text-sm md:flex-row">
                    <p>&copy; {currentYear} MentorIn. All rights reserved.</p>
                    <p>Made for Indonesian Students</p>
                </div>
            </div>
        </footer>
    )
}
