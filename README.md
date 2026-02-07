# MentorIn - Peer Tutoring Platform

<div align="center">

![MentorIn](https://img.shields.io/badge/MentorIn-Platform-2563eb?style=for-the-badge)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.3.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-316192?style=for-the-badge&logo=postgresql)](https://supabase.com/)

**Platform bimbingan belajar peer-to-peer yang menghubungkan siswa pintar dengan siswa yang membutuhkan bantuan.**

[Demo](#) · [Dokumentasi](./KONTEKS.md) · [Report Bug](https://github.com/neezar-abd/MentorIn/issues) · [Request Feature](https://github.com/neezar-abd/MentorIn/issues)

</div>

---

## 📌 Tentang MentorIn

MentorIn adalah platform modern yang memfasilitasi pembelajaran peer-to-peer di lingkungan sekolah. Siswa yang lemah di mata pelajaran tertentu seringkali malu bertanya ke guru, padahal teman sebayanya yang pintar bisa membantu. MentorIn menjembatani gap ini dengan sistem yang terstruktur.

### 🎯 Masalah yang Diselesaikan

- ❌ Siswa malu bertanya langsung ke guru
- ❌ Tidak ada sistem formal untuk peer tutoring
- ❌ Sulit menemukan tutor yang tepat
- ❌ Tidak ada tracking dan evaluasi

### ✅ Solusi MentorIn

- ✅ Platform aman & terstruktur untuk peer tutoring
- ✅ Browse & filter tutor berdasarkan mata pelajaran
- ✅ System request & approval untuk jadwal bimbingan
- ✅ Rating & review untuk quality control
- ✅ Dashboard analytics untuk monitoring progres

---

## ⚡ Fitur Utama

### **Phase 1: MVP (Core Features)**
- 🔐 **Authentication System** - Login/Register dengan NextAuth v5
- 👤 **User Management** - Profile management dengan avatar upload
- 🎓 **Tutor Registration** - Pendaftaran tutor dengan admin verification
- 🔍 **Browse Tutors** - Filter by subject, lihat rating & reviews
- 📝 **Request System** - Request bimbingan ke tutor
- 📊 **Request Management** - Track status (pending, approved, completed)
- ⭐ **Rating & Review** - Berikan feedback setelah sesi selesai

### **Phase 2: Enhancements**
- 📧 **Email Notifications** - Resend integration untuk notif via email
- 🔔 **Real-time Notifications** - Pusher untuk notif real-time
- 📅 **Calendar View** - Lihat jadwal dalam bentuk calendar interaktif
- 📄 **Export PDF** - Export laporan aktivitas & sertifikat
- 📈 **Admin Analytics** - Dashboard dengan charts untuk monitoring

### **Polish Features**
- 🎨 Toast notifications (Sonner)
- ⏳ Loading skeletons untuk UX
- 🚨 Error pages (404, 500, unauthorized, forbidden)
- 🔍 Search & debounce
- 📄 Pagination
- ✅ Confirmation dialogs

---

## 🛠️ Tech Stack

### **Core**
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components, Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/) (Supabase)
- **ORM:** [Prisma 7](https://www.prisma.io/)

### **Libraries**
- **Auth:** NextAuth.js v5
- **Validation:** Zod v4
- **Forms:** React Hook Form
- **Email:** Resend
- **Real-time:** Pusher
- **PDF:** jsPDF
- **Charts:** Recharts
- **UI:** Radix UI + shadcn/ui
- **Notifications:** Sonner

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+ 
npm/yarn/pnpm
PostgreSQL database (Supabase/Neon)
```

### Installation

1. **Clone repository:**
```bash
git clone https://github.com/neezar-abd/MentorIn.git
cd MentorIn
```

2. **Install dependencies:**
```bash
npm install
```

3. **Setup environment variables:**

Create `.env.local` file:

```env
# Database
DIRECT_DATABASE_URL="postgresql://..."
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Resend (Email)
RESEND_API_KEY="re_xxxxx"
RESEND_FROM_EMAIL="MentorIn <noreply@yourdomain.com>"

# Pusher (Real-time)
NEXT_PUBLIC_PUSHER_KEY="xxxxx"
NEXT_PUBLIC_PUSHER_CLUSTER="ap1"
PUSHER_APP_ID="xxxxx"
PUSHER_SECRET="xxxxx"
```

4. **Setup database:**
```bash
npx prisma generate
npx prisma db push
npx prisma db seed  # Optional: seed with test data
```

5. **Run development server:**
```bash
npm run dev
```

6. **Open browser:**
```
http://localhost:3000
```

### Test Accounts (Seeded Data)

- **Admin:** `admin@school.id` / `password123`
- **Student:** `ahmad@school.id` / `password123`
- **Tutor:** `aisyah@school.id` / `password123`

---

## 📁 Project Structure

```
mentorin/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth pages (login, register)
│   ├── (dashboard)/         # Protected dashboard pages
│   ├── api/                 # API routes (NextAuth)
│   └── about/               # Public pages
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── layouts/             # Navbar, Footer
│   ├── admin/               # Admin components
│   ├── calendar/            # Calendar view
│   └── export/              # PDF export buttons
├── lib/
│   ├── actions/             # Server Actions
│   ├── auth.ts              # NextAuth config
│   ├── prisma.ts            # Prisma client
│   ├── emails.ts            # Email templates
│   ├── pdf.ts               # PDF generation
│   └── pusher-*.ts          # Pusher config
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Seed data
└── types/                   # TypeScript types
```

---

## 🗄️ Database Schema

### Core Models

- **User** - Siswa, Tutor, Admin
- **TutorProfile** - Profile khusus untuk tutor
- **Request** - Permintaan bimbingan
- **Review** - Rating & feedback
- **Notification** - Sistem notifikasi

[Lihat schema lengkap →](./prisma/schema.prisma)

---

## 📸 Screenshots

> *Screenshots akan ditambahkan setelah deployment*

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/neezar-abd/MentorIn)

### Environment Variables (Production)

Pastikan semua env vars dari `.env.local` sudah di-set di Vercel dashboard.

---

## 🤝 Contributing

Contributions are welcome! Silakan buka issue atau pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Neezar**
- GitHub: [@neezar-abd](https://github.com/neezar-abd)
- Email: noreply@neezar.tech

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)
- [Supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Resend](https://resend.com/)
- [Pusher](https://pusher.com/)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Neezar](https://github.com/neezar-abd)

</div>

Platform bimbingan belajar peer-to-peer untuk siswa sekolah. Sistem ini memfasilitasi siswa yang mahir dalam mata pelajaran tertentu untuk membantu teman sebayanya yang membutuhkan bantuan.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js v5
- **Form Handling:** React Hook Form + Zod
- **Icons:** Lucide React

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

Buat database PostgreSQL (bisa pakai [Supabase](https://supabase.com) atau [Neon](https://neon.tech) - gratis).

Update `.env.local`:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Generate Prisma Client & Migrate Database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Fitur Utama

### MVP (Phase 1)
- ✅ Authentication (Register, Login, Logout)
- ✅ Registrasi Tutor (siswa bisa daftar jadi tutor)
- ✅ Browse Tutor (filter by mata pelajaran)
- ✅ Request Bimbingan (online/offline)
- ✅ Approve/Reject Request
- ✅ Rating & Review System

### Enhancement (Phase 2)
- Dashboard Analytics
- Real-time Notifications
- Calendar View
- Admin Panel

## Database Schema

Lihat detail di `prisma/schema.prisma`:

- **User** - Data siswa/tutor
- **TutorProfile** - Profil tutor (subjects, availability, rating)
- **Request** - Permintaan bimbingan
- **Review** - Rating & review setelah sesi

## Project Structure

```
tutor-sebaya/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (login, register)
│   ├── (dashboard)/       # Protected routes
│   ├── api/               # API endpoints
│   └── page.tsx           # Landing page
├── components/            # React components
├── lib/                   # Utilities & Prisma client
├── prisma/                # Database schema
└── types/                 # TypeScript types
```

## Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Prisma commands
npx prisma studio          # Open Prisma Studio (DB GUI)
npx prisma generate        # Generate Prisma Client
npx prisma db push         # Push schema to database
npx prisma migrate dev     # Create migration
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

