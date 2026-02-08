'use client'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useActionState } from 'react'
import { loginAction, type ActionResult } from '@/lib/actions/auth'

export default function Login({ registered, callbackUrl }: { registered?: string; callbackUrl?: string }) {
    const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
        async (_prev, formData) => loginAction(formData),
        null
    )

    return (
        <section className="bg-background flex grid min-h-screen grid-rows-[auto_1fr] px-4">
            <div className="mx-auto w-full max-w-7xl border-b py-3">
                <Link
                    href="/"
                    aria-label="go home"
                    className="inline-block border-t-2 border-transparent py-3">
                    <Logo className="w-fit" />
                </Link>
            </div>

            <div className="m-auto w-full max-w-sm">
                <div className="text-center">
                    <h1 className="font-serif text-4xl font-medium">Selamat Datang</h1>
                    <p className="text-muted-foreground mt-2 text-sm">Masuk ke akun kamu untuk melanjutkan</p>
                </div>
                <Card
                    className="mt-6 p-8">
                    {registered === 'tutor' && (
                        <div className="mb-4 rounded-(--radius) border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400">
                            Pendaftaran sebagai tutor berhasil! Silakan login kembali untuk mengakses Dashboard Tutor.
                        </div>
                    )}
                    {state?.error && (
                        <div className="mb-4 rounded-(--radius) border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                            {state.error}
                        </div>
                    )}
                    <form
                        action={formAction}
                        className="space-y-5">
                        <div className="space-y-3">
                            <Label
                                htmlFor="email"
                                className="text-sm">
                                Email
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="kamu@school.id"
                                required
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="password"
                                    className="text-sm">
                                    Password
                                </Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-muted-foreground hover:text-foreground text-xs">
                                    Lupa password?
                                </Link>
                            </div>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                required
                            />
                        </div>

                        <Button className="w-full" disabled={isPending}>
                            {isPending ? 'Memproses...' : 'Masuk'}
                        </Button>
                    </form>
                </Card>

                <p className="text-muted-foreground mt-6 text-center text-sm">
                    Belum punya akun?{' '}
                    <Link
                        href="/register"
                        className="text-primary font-medium hover:underline">
                        Daftar
                    </Link>
                </p>
            </div>
        </section>
    )
}
