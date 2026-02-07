'use client'

import { Button } from '@/components/ui/button'
import { updateRequestStatus } from '@/lib/actions/request'
import { useTransition } from 'react'
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function CancelButton({ requestId }: { requestId: string }) {
    const [isPending, startTransition] = useTransition()

    function handleCancel() {
        startTransition(async () => {
            const result = await updateRequestStatus(requestId, 'CANCELLED')
            if (result.success) {
                toast.success('Request berhasil dibatalkan')
            } else {
                toast.error(result.error || 'Gagal membatalkan request')
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-600"
                    disabled={isPending}>
                    {isPending ? 'Membatalkan...' : 'Batalkan'}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Batalkan Request?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Request bimbingan ini akan dibatalkan. Tindakan ini tidak bisa diurungkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Kembali</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancel} className="bg-red-600 hover:bg-red-700">
                        Ya, Batalkan
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
