'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronRight } from 'lucide-react'
import { changePassword, type ActionResult } from '@/lib/actions/profile'
import { useActionState, useRef, useEffect } from 'react'
import { toast } from 'sonner'

const initialState: ActionResult = { success: false }

export default function ChangePasswordForm() {
    const formRef = useRef<HTMLFormElement>(null)
    const [state, formAction, isPending] = useActionState(
        async (_prev: ActionResult, formData: FormData) => {
            const result = await changePassword(formData)
            if (result.success) formRef.current?.reset()
            return result
        },
        initialState
    )

    useEffect(() => {
        if (state.success) toast.success('Password berhasil diubah!')
        if (state.error) toast.error(state.error)
    }, [state])

    return (
        <div className="rounded-(--radius) border p-6 md:p-8">
            <h2 className="font-medium">Ubah Password</h2>
            <p className="text-muted-foreground mt-1 text-sm">Pastikan password baru kamu aman.</p>

            {state.error && (
                <div className="mt-4 rounded-(--radius) border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {state.error}
                </div>
            )}
            {state.success && (
                <div className="mt-4 rounded-(--radius) border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                    Password berhasil diubah!
                </div>
            )}

            <form ref={formRef} action={formAction} className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Password Saat Ini</Label>
                        <Input id="currentPassword" name="currentPassword" type="password" placeholder="Password saat ini" />
                    </div>
                    <div />
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">Password Baru</Label>
                        <Input id="newPassword" name="newPassword" type="password" placeholder="Password baru" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Ulangi password baru" />
                    </div>
                </div>

                <div className="flex justify-end border-t pt-6">
                    <Button variant="outline" className="pr-1.5" disabled={isPending}>
                        <span>{isPending ? 'Mengubah...' : 'Ubah Password'}</span>
                        <ChevronRight className="opacity-50" />
                    </Button>
                </div>
            </form>
        </div>
    )
}
