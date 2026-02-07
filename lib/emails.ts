// Reusable email templates for MentorIn

const baseStyle = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 560px;
  margin: 0 auto;
  padding: 40px 24px;
  color: #18181b;
`

const buttonStyle = `
  display: inline-block;
  padding: 10px 24px;
  background-color: #2563eb;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
`

function layout(content: string) {
    return `
    <div style="${baseStyle}">
      <div style="margin-bottom: 24px;">
        <strong style="font-size: 18px;">📚 MentorIn</strong>
      </div>
      ${content}
      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e4e4e7; font-size: 12px; color: #71717a;">
        <p>Email ini dikirim otomatis oleh MentorIn. Jangan membalas email ini.</p>
      </div>
    </div>
  `
}

export function newRequestEmail(data: {
    tutorName: string
    studentName: string
    subject: string
    topic: string
    scheduledAt: string
    mode: string
}) {
    return {
        subject: `Request Baru dari ${data.studentName} - ${data.subject}`,
        html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 8px;">Request Bimbingan Baru</h2>
      <p style="color: #52525b; margin: 0 0 24px;">Hai ${data.tutorName}, ada request masuk!</p>
      
      <div style="background: #f4f4f5; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px;"><strong>Siswa:</strong> ${data.studentName}</p>
        <p style="margin: 0 0 8px;"><strong>Mata Pelajaran:</strong> ${data.subject}</p>
        <p style="margin: 0 0 8px;"><strong>Topik:</strong> ${data.topic}</p>
        <p style="margin: 0 0 8px;"><strong>Jadwal:</strong> ${data.scheduledAt}</p>
        <p style="margin: 0;"><strong>Mode:</strong> ${data.mode === 'ONLINE' ? 'Online' : 'Offline'}</p>
      </div>
      
      <a href="${process.env.NEXTAUTH_URL}/tutor/dashboard" style="${buttonStyle}">Lihat Request</a>
    `),
    }
}

export function requestApprovedEmail(data: {
    studentName: string
    tutorName: string
    subject: string
    topic: string
    scheduledAt: string
}) {
    return {
        subject: `Request ${data.subject} Disetujui!`,
        html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 8px;">Request Disetujui! ✅</h2>
      <p style="color: #52525b; margin: 0 0 24px;">Hai ${data.studentName}, request bimbingan kamu sudah disetujui.</p>
      
      <div style="background: #f0fdf4; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px;"><strong>Tutor:</strong> ${data.tutorName}</p>
        <p style="margin: 0 0 8px;"><strong>Mata Pelajaran:</strong> ${data.subject}</p>
        <p style="margin: 0 0 8px;"><strong>Topik:</strong> ${data.topic}</p>
        <p style="margin: 0;"><strong>Jadwal:</strong> ${data.scheduledAt}</p>
      </div>
      
      <a href="${process.env.NEXTAUTH_URL}/sessions" style="${buttonStyle}">Lihat Sesi</a>
    `),
    }
}

export function requestRejectedEmail(data: {
    studentName: string
    tutorName: string
    subject: string
}) {
    return {
        subject: `Request ${data.subject} Ditolak`,
        html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 8px;">Request Ditolak</h2>
      <p style="color: #52525b; margin: 0 0 24px;">Hai ${data.studentName}, maaf request bimbingan kamu ke ${data.tutorName} ditolak.</p>
      
      <p style="color: #52525b;">Jangan menyerah! Kamu bisa mencoba tutor lain atau mengajukan ulang di waktu yang berbeda.</p>
      
      <a href="${process.env.NEXTAUTH_URL}/tutors" style="${buttonStyle}">Cari Tutor Lain</a>
    `),
    }
}

export function sessionCompletedEmail(data: {
    studentName: string
    tutorName: string
    subject: string
    topic: string
    sessionId: string
}) {
    return {
        subject: `Sesi ${data.subject} Selesai - Beri Review!`,
        html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 8px;">Sesi Selesai! 🎉</h2>
      <p style="color: #52525b; margin: 0 0 24px;">Hai ${data.studentName}, sesi bimbingan kamu sudah selesai.</p>
      
      <div style="background: #f4f4f5; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px;"><strong>Tutor:</strong> ${data.tutorName}</p>
        <p style="margin: 0 0 8px;"><strong>Mata Pelajaran:</strong> ${data.subject}</p>
        <p style="margin: 0;"><strong>Topik:</strong> ${data.topic}</p>
      </div>
      
      <p style="color: #52525b; margin-bottom: 16px;">Yuk beri review untuk membantu tutor dan siswa lainnya!</p>
      
      <a href="${process.env.NEXTAUTH_URL}/sessions/${data.sessionId}" style="${buttonStyle}">Beri Review</a>
    `),
    }
}

export function newReviewEmail(data: {
    tutorName: string
    studentName: string
    rating: number
    comment?: string
    subject: string
}) {
    const stars = '⭐'.repeat(data.rating)
    return {
        subject: `Review Baru dari ${data.studentName} - ${stars}`,
        html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 8px;">Review Baru! ${stars}</h2>
      <p style="color: #52525b; margin: 0 0 24px;">Hai ${data.tutorName}, kamu mendapat review baru.</p>
      
      <div style="background: #fefce8; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0 0 8px;"><strong>Dari:</strong> ${data.studentName}</p>
        <p style="margin: 0 0 8px;"><strong>Mata Pelajaran:</strong> ${data.subject}</p>
        <p style="margin: 0 0 8px;"><strong>Rating:</strong> ${data.rating}/5 ${stars}</p>
        ${data.comment ? `<p style="margin: 0;"><strong>Komentar:</strong> "${data.comment}"</p>` : ''}
      </div>
      
      <a href="${process.env.NEXTAUTH_URL}/tutor/dashboard" style="${buttonStyle}">Lihat Dashboard</a>
    `),
    }
}

export function tutorVerifiedEmail(data: { tutorName: string }) {
    return {
        subject: 'Profil Tutor Diverifikasi! ✅',
        html: layout(`
      <h2 style="font-size: 20px; margin: 0 0 8px;">Selamat, Profil Diverifikasi! 🎉</h2>
      <p style="color: #52525b; margin: 0 0 24px;">Hai ${data.tutorName}, profil tutor kamu sudah diverifikasi oleh admin.</p>
      
      <p style="color: #52525b; margin-bottom: 24px;">Sekarang kamu sudah tampil di daftar tutor dan bisa menerima request bimbingan dari siswa lain.</p>
      
      <a href="${process.env.NEXTAUTH_URL}/tutor/dashboard" style="${buttonStyle}">Lihat Dashboard Tutor</a>
    `),
    }
}
