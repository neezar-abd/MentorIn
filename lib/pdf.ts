import jsPDF from 'jspdf'

// ---------- Laporan / Report PDF ----------

type ReportData = {
    user: { name: string; email: string; class?: string | null; role: string }
    role: 'STUDENT' | 'TUTOR'
    tutorProfile?: { rating: number; totalSessions: number; subjects: string[] }
    sessions: Array<{
        subject: string
        topic: string
        scheduledAt: string
        duration: number
        mode: string
        studentName?: string
        studentClass?: string | null
        tutorName?: string
        rating: number | null
        comment?: string | null
    }>
}

function fmtDate(iso: string) {
    return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function generateReportPDF(data: ReportData) {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    let y = 20

    // Header
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Laporan Aktivitas - MentorIn', pageWidth / 2, y, { align: 'center' })
    y += 12

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100)
    doc.text(`Dicetak: ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth / 2, y, { align: 'center' })
    y += 12

    // Divider
    doc.setDrawColor(200)
    doc.line(20, y, pageWidth - 20, y)
    y += 10

    // User Info
    doc.setTextColor(0)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Informasi Pengguna', 20, y)
    y += 8

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Nama: ${data.user.name}`, 20, y); y += 6
    doc.text(`Email: ${data.user.email}`, 20, y); y += 6
    doc.text(`Role: ${data.role === 'TUTOR' ? 'Tutor' : 'Siswa'}`, 20, y); y += 6
    if (data.user.class) { doc.text(`Kelas: ${data.user.class}`, 20, y); y += 6 }

    if (data.tutorProfile) {
        doc.text(`Rating: ${data.tutorProfile.rating.toFixed(1)}/5.0`, 20, y); y += 6
        doc.text(`Total Sesi: ${data.tutorProfile.totalSessions}`, 20, y); y += 6
        doc.text(`Mata Pelajaran: ${data.tutorProfile.subjects.join(', ')}`, 20, y); y += 6
    }

    y += 6

    // Stats summary
    const totalHours = data.sessions.reduce((sum, s) => sum + s.duration, 0) / 60
    const avgRating = data.sessions.filter((s) => s.rating).reduce((sum, s) => sum + (s.rating || 0), 0) / (data.sessions.filter((s) => s.rating).length || 1)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Ringkasan', 20, y); y += 8

    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text(`Total Sesi Selesai: ${data.sessions.length}`, 20, y); y += 6
    doc.text(`Total Jam: ${totalHours.toFixed(1)} jam`, 20, y); y += 6
    doc.text(`Rata-rata Rating: ${avgRating.toFixed(1)}/5`, 20, y); y += 10

    // Sessions Table Header
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Daftar Sesi', 20, y); y += 8

    // Table header
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.setFillColor(245, 245, 245)
    doc.rect(20, y - 4, pageWidth - 40, 8, 'F')
    const cols = data.role === 'TUTOR'
        ? [{ x: 20, label: 'Tanggal' }, { x: 52, label: 'Siswa' }, { x: 90, label: 'Mata Pelajaran' }, { x: 125, label: 'Topik' }, { x: 160, label: 'Durasi' }, { x: 178, label: 'Rating' }]
        : [{ x: 20, label: 'Tanggal' }, { x: 52, label: 'Tutor' }, { x: 90, label: 'Mata Pelajaran' }, { x: 125, label: 'Topik' }, { x: 160, label: 'Durasi' }, { x: 178, label: 'Rating' }]

    cols.forEach((col) => doc.text(col.label, col.x, y))
    y += 6

    // Table rows
    doc.setFont('helvetica', 'normal')
    data.sessions.forEach((s) => {
        if (y > 270) {
            doc.addPage()
            y = 20
        }

        const name = data.role === 'TUTOR' ? (s.studentName || '-') : (s.tutorName || '-')
        doc.text(fmtDate(s.scheduledAt), 20, y)
        doc.text(name.slice(0, 18), 52, y)
        doc.text(s.subject.slice(0, 16), 90, y)
        doc.text(s.topic.slice(0, 16), 125, y)
        doc.text(`${s.duration}m`, 160, y)
        doc.text(s.rating ? `${s.rating}/5` : '-', 178, y)
        y += 6
    })

    // Footer
    y += 8
    doc.setDrawColor(200)
    doc.line(20, y, pageWidth - 20, y)
    y += 6
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text('Dokumen ini dibuat secara otomatis oleh platform MentorIn.', pageWidth / 2, y, { align: 'center' })

    return doc
}

// ---------- Sertifikat PDF ----------

type CertificateData = {
    studentName: string
    studentClass?: string | null
    tutorName: string
    subject: string
    topic: string
    duration: number
    completedAt: string
    scheduledAt: string
}

export function generateCertificatePDF(data: CertificateData) {
    const doc = new jsPDF({ orientation: 'landscape' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    // Border
    doc.setDrawColor(37, 99, 235) // blue-600
    doc.setLineWidth(2)
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20)
    doc.setLineWidth(0.5)
    doc.rect(14, 14, pageWidth - 28, pageHeight - 28)

    let y = 40

    // Header
    doc.setFontSize(14)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100)
    doc.text('MENTORIN', pageWidth / 2, y, { align: 'center' })
    y += 16

    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(37, 99, 235)
    doc.text('SERTIFIKAT', pageWidth / 2, y, { align: 'center' })
    y += 10

    doc.setFontSize(14)
    doc.setTextColor(100)
    doc.text('Bimbingan Belajar Peer-to-Peer', pageWidth / 2, y, { align: 'center' })
    y += 16

    // Divider
    doc.setDrawColor(37, 99, 235)
    doc.setLineWidth(0.5)
    doc.line(80, y, pageWidth - 80, y)
    y += 14

    // Body
    doc.setTextColor(50)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text('Diberikan kepada:', pageWidth / 2, y, { align: 'center' })
    y += 12

    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0)
    doc.text(data.studentName, pageWidth / 2, y, { align: 'center' })
    y += 8

    if (data.studentClass) {
        doc.setFontSize(12)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(100)
        doc.text(`Kelas ${data.studentClass}`, pageWidth / 2, y, { align: 'center' })
        y += 10
    }

    y += 6

    doc.setFontSize(11)
    doc.setTextColor(50)
    doc.setFont('helvetica', 'normal')
    doc.text(
        `Telah menyelesaikan sesi bimbingan belajar ${data.subject} dengan topik "${data.topic}"`,
        pageWidth / 2, y, { align: 'center', maxWidth: 200 }
    )
    y += 12

    doc.text(
        `bersama Tutor ${data.tutorName} selama ${data.duration} menit`,
        pageWidth / 2, y, { align: 'center' }
    )
    y += 10

    doc.text(
        `pada tanggal ${fmtDate(data.scheduledAt)}`,
        pageWidth / 2, y, { align: 'center' }
    )
    y += 20

    // Signature area
    doc.setDrawColor(150)
    doc.setLineWidth(0.3)
    doc.line(pageWidth / 2 - 40, y + 4, pageWidth / 2 + 40, y + 4)
    y += 10
    doc.setFontSize(10)
    doc.setTextColor(100)
    doc.text('MentorIn Platform', pageWidth / 2, y, { align: 'center' })
    y += 5
    doc.setFontSize(8)
    doc.text(`Diterbitkan: ${fmtDate(data.completedAt)}`, pageWidth / 2, y, { align: 'center' })

    return doc
}
