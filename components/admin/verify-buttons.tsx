'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle2, ChevronRight, XCircle } from 'lucide-react'
import { verifyTutor, type ActionResult } from '@/lib/actions/admin'
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

export function VerifyButton({ tutorProfileId }: { tutorProfileId: string }) {
    const [isPending, startTransition] = useTransition()

    function handleVerify() {
        startTransition(async () => {
            const result = await verifyTutor(tutorProfileId, 'VERIFY')
            if (result.success) {
                toast.success('Tutor berhasil diverifikasi!')
            } else {
                toast.error(result.error || 'Gagal memverifikasi tutor')
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="sm" className="pr-1.5" disabled={isPending}>
                    <CheckCircle2 className="size-4" />
                    {isPending ? 'Memverifikasi...' : 'Verifikasi'}
                    <ChevronRight className="opacity-50" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Verifikasi Tutor?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Tutor ini akan diverifikasi dan bisa menerima request bimbingan dari siswa.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Kembali</AlertDialogCancel>
                    <AlertDialogAction onClick={handleVerify}>Ya, Verifikasi</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export function RejectTutorButton({ tutorProfileId }: { tutorProfileId: string }) {
    const [isPending, startTransition] = useTransition()

    function handleReject() {
        startTransition(async () => {
            const result = await verifyTutor(tutorProfileId, 'REJECT')
            if (result.success) {
                toast.success('Pendaftaran tutor ditolak')
            } else {
                toast.error(result.error || 'Gagal menolak tutor')
            }
        })
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-600" disabled={isPending}>
                    <XCircle className="size-4" />
                    {isPending ? 'Menolak...' : 'Tolak'}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tolak Pendaftaran Tutor?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Pendaftaran tutor ini akan ditolak. Pengguna harus mendaftar ulang.
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
