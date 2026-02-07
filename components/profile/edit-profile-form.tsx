'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronRight, Save } from 'lucide-react'
import { updateProfile, type ActionResult } from '@/lib/actions/profile'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

const initialState: ActionResult = { success: false }

export default function EditProfileForm({ user }: { user: { name: string; email: string; class?: string | null } }) {
    const [state, formAction, isPending] = useActionState(
        async (_prev: ActionResult, formData: FormData) => {
            return await updateProfile(formData)
        },
        initialState
    )

    useEffect(() => {
        if (state.success) toast.success('Profil berhasil diperbarui!')
        if (state.error) toast.error(state.error)
    }, [state])

    return (
        <div className="rounded-(--radius) border p-6 md:p-8">
            <h2 className="font-medium">Edit Profil</h2>
            <p className="text-muted-foreground mt-1 text-sm">Perbarui informasi pribadi kamu.</p>

            {state.error && (
                <div className="mt-4 rounded-(--radius) border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {state.error}
                </div>
            )}
            {state.success && (
                <div className="mt-4 rounded-(--radius) border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                    Profil berhasil diperbarui!
                </div>
            )}

            <form action={formAction} className="mt-8 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" name="name" defaultValue={user.name} placeholder="Nama lengkap" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} placeholder="Email" disabled />
                        <p className="text-muted-foreground text-xs">Email tidak dapat diubah.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="class">Kelas</Label>
                        <Input id="class" name="class" defaultValue={user.class || ''} placeholder="Contoh: 11 IPA 1" />
                    </div>
                </div>

                <div className="flex justify-end border-t pt-6">
                    <Button className="pr-1.5" disabled={isPending}>
                        <Save className="size-4" />
                        <span>{isPending ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                        <ChevronRight className="opacity-50" />
                    </Button>
                </div>
            </form>
        </div>
    )
}
