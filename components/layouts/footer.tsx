import Link from 'next/link'
import { Logo } from '@/components/logo'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t py-12 md:py-16">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
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
                        <h3 className="font-medium">Navigasi</h3>
                        <ul className="text-muted-foreground mt-4 space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-accent-foreground duration-150">
                                    Tentang Kami
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

                    {/* Bantuan */}
                    <div>
                        <h3 className="font-medium">Bantuan</h3>
                        <ul className="text-muted-foreground mt-4 space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/faq"
                                    className="hover:text-accent-foreground duration-150">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-accent-foreground duration-150">
                                    Hubungi Kami
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-accent-foreground duration-150">
                                    Kebijakan Privasi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="hover:text-accent-foreground duration-150">
                                    Syarat & Ketentuan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h3 className="font-medium">Kontak</h3>
                        <ul className="text-muted-foreground mt-4 space-y-3 text-sm">
                            <li>
                                <a
                                    href="mailto:info@tutorsebaya.com"
                                    className="hover:text-accent-foreground duration-150">
                                    info@tutorsebaya.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent-foreground duration-150">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-accent-foreground duration-150">
                                    Twitter
                                </a>
                            </li>
                        </ul>
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
