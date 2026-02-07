'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle2, ChevronRight, X } from 'lucide-react'
import { updateRequestStatus, type ActionResult } from '@/lib/actions/request'
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

export function ApproveButton({ requestId }: { requestId: string }) {
    const [isPending, startTransition] = useTransition()

    function handleApprove() {
        startTransition(async () => {
            const result = await updateRequestStatus(requestId, 'APPROVED')
            if (result.success) {
                toast.success('Request bimbingan disetujui!')
            } else {
                toast.error(result.error || 'Gagal menyetujui request')
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" className="pr-1.5" disabled={isPending}>
                    <CheckCircle2 className="size-4" />
                    {isPending ? 'Menyetujui...' : 'Setujui'}
                    <ChevronRight className="opacity-50" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Setujui Request?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Kamu akan menyetujui request bimbingan ini. Pastikan jadwal kamu tersedia.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Kembali</AlertDialogCancel>
                    <AlertDialogAction onClick={handleApprove}>Ya, Setujui</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function RejectButton({ requestId }: { requestId: string }) {
    const [isPending, startTransition] = useTransition()

    function handleReject() {
        startTransition(async () => {
            const result = await updateRequestStatus(requestId, 'REJECTED')
            if (result.success) {
                toast.success('Request bimbingan ditolak')
            } else {
                toast.error(result.error || 'Gagal menolak request')
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-600" disabled={isPending}>
                    <X className="size-4" />
                    {isPending ? 'Menolak...' : 'Tolak'}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tolak Request?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Request bimbingan ini akan ditolak. Siswa akan menerima notifikasi penolakan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Kembali</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReject} className="bg-red-600 hover:bg-red-700">
                        Ya, Tolak
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function CompleteButton({ requestId }: { requestId: string }) {
    const [isPending, startTransition] = useTransition()

    function handleComplete() {
        startTransition(async () => {
            const result = await updateRequestStatus(requestId, 'COMPLETED')
            if (result.success) {
                toast.success('Sesi bimbingan ditandai selesai!')
            } else {
                toast.error(result.error || 'Gagal menyelesaikan sesi')
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" className="pr-1.5" disabled={isPending}>
                    <CheckCircle2 className="size-4" />
                    {isPending ? 'Menyelesaikan...' : 'Selesaikan'}
                    <ChevronRight className="opacity-50" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Selesaikan Sesi?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tandai sesi bimbingan ini sebagai selesai. Siswa akan diminta memberikan review.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Kembali</AlertDialogCancel>
                    <AlertDialogAction onClick={handleComplete}>Ya, Selesaikan</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
