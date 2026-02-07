'use client'

import { Button } from '@/components/ui/button'
import { Download, FileText, Loader2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { getExportData, getCertificateData } from '@/lib/actions/export'
import { generateReportPDF, generateCertificatePDF } from '@/lib/pdf'

export function ExportReportButton() {
    const [isPending, startTransition] = useTransition()

    const handleExport = () => {
        startTransition(async () => {
            const data = await getExportData()
            if (!data) {
                toast.error('Gagal mengambil data laporan')
                return
            }
            if (data.sessions.length === 0) {
                toast.error('Belum ada sesi yang selesai untuk diexport')
                return
            }

            const doc = generateReportPDF(data as any)
            doc.save(`laporan-tutor-sebaya-${data.user.name.replace(/\s+/g, '-').toLowerCase()}.pdf`)
            toast.success('Laporan berhasil didownload!')
        })
    }

    return (
        <Button onClick={handleExport} disabled={isPending} variant="outline">
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <FileText className="size-4" />}
            <span>{isPending ? 'Membuat PDF...' : 'Download Laporan'}</span>
        </Button>
    )
}

export function ExportCertificateButton({ sessionId }: { sessionId: string }) {
    const [isPending, startTransition] = useTransition()

    const handleExport = () => {
        startTransition(async () => {
            const data = await getCertificateData(sessionId)
            if (!data) {
                toast.error('Gagal mengambil data sertifikat')
                return
            }

            const doc = generateCertificatePDF(data as any)
            doc.save(`sertifikat-${data.subject.replace(/\s+/g, '-').toLowerCase()}-${data.studentName.replace(/\s+/g, '-').toLowerCase()}.pdf`)
            toast.success('Sertifikat berhasil didownload!')
        })
    }

    return (
        <Button onClick={handleExport} disabled={isPending} variant="outline" size="sm">
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
            <span>{isPending ? 'Membuat...' : 'Sertifikat'}</span>
        </Button>
    )
}
