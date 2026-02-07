import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronRight, Lock, Moon, Sun, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const roleLabels: Record<string, string> = { STUDENT: 'Siswa', TUTOR: 'Tutor', ADMIN: 'Admin' }

export default async function SettingsPage() {
    const session = await auth()
    if (!session?.user) redirect('/login')

    const user = session.user
    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-balance font-serif text-3xl font-medium">Pengaturan</h1>
                <p className="text-muted-foreground mt-2">Kelola preferensi akun kamu.</p>
            </div>

            {/* Account Settings */}
            <div className="rounded-(--radius) border p-6 md:p-8">
                <div className="flex items-center gap-2">
                    <User className="size-4" />
                    <h2 className="font-medium">Akun</h2>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">Pengaturan dasar akun kamu.</p>

                <div className="mt-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Email</p>
                            <p className="text-muted-foreground text-sm">{user.email}</p>
                        </div>
                        <Badge variant="outline">Terverifikasi</Badge>
                    </div>

                    <div className="border-t" />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Role</p>
                            <p className="text-muted-foreground text-sm">Peran kamu di platform.</p>
                        </div>
                        <Badge variant="outline">{roleLabels[user.role ?? 'STUDENT']}</Badge>
                    </div>

                    <div className="border-t" />

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Hapus Akun</p>
                            <p className="text-muted-foreground text-sm">Hapus akun dan semua data terkait secara permanen.</p>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-600">
                            Hapus Akun
                        </Button>
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="rounded-(--radius) border p-6 md:p-8">
                <div className="flex items-center gap-2">
                    <Lock className="size-4" />
                    <h2 className="font-medium">Keamanan</h2>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">Jaga keamanan akun kamu.</p>

                <div className="mt-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Password</p>
                            <p className="text-muted-foreground text-sm">Terakhir diubah 30 hari yang lalu.</p>
                        </div>
                        <Link href="/profile">
                            <Button
                                variant="outline"
                                size="sm">
                                Ubah Password
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Appearance */}
            <div className="rounded-(--radius) border p-6 md:p-8">
                <div className="flex items-center gap-2">
                    <Sun className="size-4" />
                    <h2 className="font-medium">Tampilan</h2>
                </div>
                <p className="text-muted-foreground mt-1 text-sm">Sesuaikan tampilan platform.</p>

                <div className="mt-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Tema</p>
                            <p className="text-muted-foreground text-sm">Pilih tema terang atau gelap.</p>
                        </div>
                        <div className="flex gap-2">
                            {['Terang', 'Gelap', 'Sistem'].map((theme) => (
                                <Button
                                    key={theme}
                                    variant={theme === 'Terang' ? 'default' : 'outline'}
                                    size="sm"
                                    className="h-8 text-xs">
                                    {theme}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="rounded-(--radius) border p-6 md:p-8">
                <h2 className="font-medium">Notifikasi</h2>
                <p className="text-muted-foreground mt-1 text-sm">Atur notifikasi yang kamu terima.</p>

                <div className="mt-6 space-y-4">
                    {[
                        { label: 'Request masuk', desc: 'Notifikasi saat ada request bimbingan baru.' },
                        { label: 'Request disetujui/ditolak', desc: 'Notifikasi saat request kamu direspons tutor.' },
                        { label: 'Pengingat sesi', desc: 'Pengingat sebelum sesi bimbingan dimulai.' },
                        { label: 'Review baru', desc: 'Notifikasi saat ada review masuk ke profil tutor kamu.' },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">{item.label}</p>
                                <p className="text-muted-foreground text-xs">{item.desc}</p>
                            </div>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    defaultChecked
                                    className="peer sr-only"
                                />
                                <div className="bg-muted peer-checked:bg-foreground h-5 w-9 rounded-full after:absolute after:left-[2px] after:top-[2px] after:size-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full" />
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
