# KONTEKS PROJECT - TUTOR SEBAYA

## 📌 OVERVIEW
**Nama Project:** Tutor Sebaya  
**Deskripsi:** Platform bimbingan belajar peer-to-peer untuk siswa sekolah  
**Problem:** Siswa yang lemah di mata pelajaran tertentu malu bertanya ke guru, padahal teman sebayanya yang pintar bisa membantu  
**Solution:** Sistem yang memfasilitasi siswa pintar menjadi tutor untuk membantu teman-temannya  

**Big Impact:**
- Siswa lebih berani bertanya ke teman sebaya
- Tutor mendapat pengalaman mengajar & leadership
- Meningkatkan solidaritas & prestasi kelas
- Guru terbantu karena tidak perlu mengajar ulang satu-satu

---

## 🛠️ TECH STACK

### Core
- **Framework:** Next.js 16 (App Router, Server Components, Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Supabase/Neon)
- **ORM:** Prisma

### Libraries
- **Authentication:** NextAuth.js v5 (Auth.js)
- **Password Hashing:** bcryptjs
- **Validation:** Zod
- **Form Handling:** React Hook Form + @hookform/resolvers
- **Date Formatting:** date-fns
- **Icons:** Lucide React
- **Utilities:** clsx, tailwind-merge
- **Notifications:** Sonner (toast), Resend (email), Pusher (real-time)
- **PDF Generation:** jsPDF
- **Charts:** Recharts
- **Search Params:** nuqs

---

## 🗄️ DATABASE SCHEMA

### **User**
```prisma
- id: String (cuid)
- email: String (unique)
- name: String
- password: String (hashed)
- role: Enum (STUDENT, TUTOR, ADMIN)
- class: String? (contoh: "11 IPA 1")
- avatarUrl: String?
- createdAt: DateTime
- updatedAt: DateTime

Relations:
- tutorProfile (one-to-one)
- requests (one-to-many)
- reviews (one-to-many)
- notifications (one-to-many)
```

### **TutorProfile**
```prisma
- id: String (cuid)
- userId: String (foreign key ke User)
- subjects: String[] (mata pelajaran: ["Matematika", "Fisika"])
- bio: String?
- availability: Json (jadwal: {senin: ["15:00-17:00"], selasa: ["19:00-21:00"]})
- isVerified: Boolean (admin approve dulu)
- rating: Float (rata-rata rating)
- totalSessions: Int (jumlah sesi yang sudah dilakukan)
- createdAt: DateTime
- updatedAt: DateTime

Relations:
- user (belongs to User)
- requests (one-to-many)
- reviews (one-to-many)
```

### **Request**
```prisma
- id: String (cuid)
- studentId: String (foreign key ke User)
- tutorId: String (foreign key ke TutorProfile)
- subject: String (mata pelajaran)
- topic: String (topik spesifik: "Integral Tentu")
- mode: Enum (ONLINE, OFFLINE)
- location: String? ("Perpustakaan" atau "Zoom")
- scheduledAt: DateTime
- duration: Int (dalam menit, default 60)
- notes: String? (catatan tambahan)
- status: Enum (PENDING, APPROVED, REJECTED, COMPLETED, CANCELLED)
- createdAt: DateTime
- updatedAt: DateTime

Relations:
- student (belongs to User)
- tutor (belongs to TutorProfile)
- review (one-to-one)
```

### **Review**
```prisma
- id: String (cuid)
- requestId: String (foreign key ke Request)
- studentId: String (foreign key ke User)
- tutorId: String (foreign key ke TutorProfile)
- rating: Int (1-5 bintang)
- comment: String?
- createdAt: DateTime

Relations:
- request (belongs to Request)
- student (belongs to User)
- tutor (belongs to TutorProfile)
```

### **Notification**
```prisma
- id: String (cuid)
- userId: String (foreign key ke User)
- type: Enum (REQUEST_NEW, REQUEST_APPROVED, REQUEST_REJECTED, REQUEST_COMPLETED, REQUEST_CANCELLED, REVIEW_RECEIVED, TUTOR_VERIFIED, TUTOR_REJECTED)
- title: String
- message: String
- link: String?
- isRead: Boolean (default false)
- createdAt: DateTime

Relations:
- user (belongs to User)

Indexes:
- [userId, isRead] - untuk query unread notifications
- [userId, createdAt] - untuk sorting by date
```

---

## 📁 PROJECT STRUCTURE

```
tutor-sebaya/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Route group untuk auth (no navbar)
│   │   ├── layout.tsx           # Auth layout (centered, gradient bg)
│   │   ├── login/               # [TODO] Login page
│   │   └── register/            # [TODO] Register page
│   ├── (dashboard)/             # [TODO] Route group dengan protected layout
│   │   ├── dashboard/           # Dashboard siswa
│   │   ├── tutors/              # Browse & filter tutor
│   │   ├── requests/            # Manage request bimbingan
│   │   └── profile/             # User profile & tutor settings
│   ├── admin/                   # [TODO] Admin panel
│   ├── api/                     # [TODO] API Routes
│   │   ├── auth/[...nextauth]/  # NextAuth endpoints
│   │   ├── tutors/              # CRUD tutor
│   │   ├── requests/            # CRUD requests
│   │   └── reviews/             # CRUD reviews
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # ✅ Landing page (sudah jadi)
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # ✅ Reusable UI (Button, Card, Input, etc)
│   ├── forms/                   # ✅ Form components
│   ├── layouts/                 # ✅ Layout components (Navbar, Sidebar)
│   ├── dashboard/               # ✅ Dashboard components (StatCard, etc)
│   ├── tutors/                  # ✅ Tutor list & filter
│   ├── requests/                # ✅ Request cards & filters
│   ├── admin/                   # ✅ Admin components (VerifyButtons, AnalyticsCharts)
│   ├── notifications/           # ✅ NotificationBell
│   ├── calendar/                # ✅ CalendarView
│   └── export/                  # ✅ Export buttons (PDF)
├── lib/
│   ├── prisma.ts                # ✅ Prisma client singleton
│   ├── auth.ts                  # ✅ Auth utilities & config
│   ├── utils.ts                 # ✅ Utilities (cn, formatDate, calculateRating)
│   ├── resend.ts                # ✅ Resend email client
│   ├── emails.ts                # ✅ Email templates
│   ├── pusher-server.ts         # ✅ Pusher server instance
│   ├── pusher-client.ts         # ✅ Pusher client instance
│   ├── pdf.ts                   # ✅ PDF generation utilities
│   └── actions/                 # ✅ Server actions
│       ├── auth.ts              # Login, register, logout
│       ├── user.ts              # User CRUD
│       ├── tutor.ts             # Tutor CRUD
│       ├── request.ts           # Request CRUD
│       ├── review.ts            # Review CRUD
│       ├── admin.ts             # Admin actions
│       ├── notification.ts      # Notification CRUD + triggers
│       ├── calendar.ts          # Calendar data fetching
│       ├── export.ts            # Export data fetching
│       └── analytics.ts         # Analytics data fetching
├── types/
│   └── index.ts                 # ✅ TypeScript types
├── prisma/
│   ├── schema.prisma            # ✅ Database schema (complete)
│   └── seed.ts                  # [TODO] Seed data untuk testing
├── public/                       # Static assets
├── .env.local                    # ✅ Environment variables (template)
├── .env                          # [IGNORE] Prisma auto-generated
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
└── README.md                     # ✅ Project documentation
```

---

## 🎯 FITUR YANG AKAN DIBANGUN

### **Phase 1: MVP (Core Features)**
Status: 🔄 In Progress

1. [ ] **Authentication**
   - [ ] Register (Student/Tutor)
   - [ ] Login dengan email + password
   - [ ] Logout
   - [ ] Protected routes
   - [ ] Session management

2. [ ] **User Management**
   - [ ] Profile page (view & edit)
   - [ ] Upload avatar (optional)
   - [ ] Update info (nama, kelas, dll)

3. [ ] **Tutor Registration**
   - [ ] Form daftar jadi tutor
   - [ ] Input: subjects, bio, availability
   - [ ] Menunggu verifikasi admin
   - [ ] Notifikasi status approval

4. [ ] **Browse Tutors**
   - [ ] List semua tutor yang verified
   - [ ] Filter by mata pelajaran
   - [ ] Lihat profil detail tutor
   - [ ] Lihat rating & review tutor

5. [ ] **Request Bimbingan**
   - [ ] Form request ke tutor
   - [ ] Input: subject, topic, mode (online/offline), jadwal, lokasi, notes
   - [ ] Notifikasi ke tutor
   - [ ] Tutor bisa approve/reject

6. [ ] **Manage Requests**
   - [ ] Dashboard request (untuk student & tutor)
   - [ ] Status tracking (pending, approved, rejected, completed, cancelled)
   - [ ] Cancel request
   - [ ] Mark as completed

7. [ ] **Rating & Review**
   - [ ] Kasih rating (1-5 bintang) setelah sesi selesai
   - [ ] Tulis komentar
   - [ ] Tampil di profil tutor
   - [ ] Update average rating tutor

### **Phase 2: Enhancement**
Status: ✅ Completed (Feb 7, 2026)

8. [x] **Email notifications** - Resend integration dengan 6 email templates
9. [x] **Real-time notifications** - Pusher + NotificationBell component
10. [x] **Calendar view** - Interactive calendar dengan month navigation
11. [x] **Export laporan/sertifikat** - PDF generation dengan jsPDF
12. [x] **Admin analytics dashboard** - Charts dengan Recharts (5 chart types)

### **Phase 3: Polish**
Status: 💡 Ideas / Backlog

13. [ ] **Gamification**
    - [ ] Poin untuk tutor setiap selesai sesi
    - [ ] Leaderboard tutor terbaik
    - [ ] Badge/achievement

14. [ ] **Advanced Features**
    - [ ] Chat in-app (tutor & student)
    - [ ] Video call integration (Zoom/Google Meet)
    - [ ] Payment/donation system
    - [ ] Google Calendar integration
    - [ ] Mobile app (React Native)

---

## 🔄 USER FLOW

### **Flow 1: Siswa Request Bimbingan**
1. Siswa login → browse tutor by mata pelajaran
2. Pilih tutor → lihat profil, rating, jadwal tersedia
3. Klik "Request Bimbingan" → isi form (topic, mode, jadwal, dll)
4. Submit → notif ke tutor
5. Tutor approve → jadwal terkonfirmasi
6. Sesi bimbingan berlangsung (online/offline)
7. Setelah selesai → siswa kasih rating & review
8. Rating masuk ke profil tutor

### **Flow 2: Siswa Jadi Tutor**
1. Siswa login → klik "Jadi Tutor"
2. Isi form: subjects, bio, availability
3. Submit → status "Menunggu Verifikasi"
4. Admin approve → status jadi "Verified"
5. Nama muncul di daftar tutor
6. Mulai terima request dari siswa lain

### **Flow 3: Tutor Manage Request**
1. Tutor terima notif ada request masuk
2. Lihat detail request (topic, jadwal, dll)
3. Approve (jadwal cocok) atau Reject (jadwal bentrok/alasan lain)
4. Jika approve → siswa dapat notif konfirmasi
5. Setelah sesi selesai → klik "Mark as Completed"
6. Tunggu review dari siswa

---

## ⚙️ SETUP INSTRUCTIONS

### **Prerequisites**
- Node.js 18+ 
- npm/yarn/pnpm
- PostgreSQL database (Supabase/Neon/local)

### **Installation Steps**

1. **Install dependencies:**
```bash
cd tutor-sebaya
npm install
```

2. **Setup database:**
   - Buat database PostgreSQL di [Supabase](https://supabase.com) atau [Neon](https://neon.tech)
   - Copy connection string
   - Update `.env.local`:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/database"
   NEXTAUTH_SECRET="generate-dengan-openssl-rand-base64-32"
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Generate Prisma Client & Push Schema:**
```bash
npx prisma generate
npx prisma db push
```

4. **Run development server:**
```bash
npm run dev
```

5. **Open browser:**
```
http://localhost:3000
```

### **Useful Commands**
```bash
# Prisma Studio (GUI untuk database)
npx prisma studio

# Generate Prisma Client (setelah edit schema)
npx prisma generate

# Push schema ke database
npx prisma db push

# Create migration (production)
npx prisma migrate dev --name migration_name

# Seed database (setelah bikin seed.ts)
npx prisma db seed
```

---

## 📊 CURRENT STATUS

### ✅ **Yang Sudah Selesai:**
**Phase 1 - MVP (Complete):**
1. ✅ Authentication system (NextAuth v5)
2. ✅ User management & profiles  
3. ✅ Tutor registration & verification
4. ✅ Browse tutors dengan filter
5. ✅ Request bimbingan system
6. ✅ Manage requests (student & tutor)
7. ✅ Rating & review system

**Phase 2 - Enhancements (Complete - Feb 7, 2026):**
8. ✅ Email notifications (Resend)
9. ✅ Real-time notifications (Pusher)
10. ✅ Calendar view
11. ✅ Export PDF (laporan & sertifikat)
12. ✅ Admin analytics dashboard

**Polish Features:**
- ✅ Toast notifications (Sonner)
- ✅ Loading skeletons
- ✅ Avatar upload (client-side simulated)
- ✅ Error pages (404, 500, unauthorized, forbidden)
- ✅ Confirmation dialogs
- ✅ Search & debounce
- ✅ Pagination

### 🔄 **Sedang Dikerjakan:**
- Menunggu Pusher credentials untuk complete setup

### 📋 **Next Steps:**
1. Setup Pusher Channels app (get app_id, key, secret)
2. Update PUSHER_* env vars di .env.local
3. Test real-time notifications
4. Deploy to production (Vercel)

---

## 🎨 DESIGN GUIDELINES

### **Color Palette**
- Primary: Blue-600 (#2563eb)
- Secondary: Indigo-600
- Background: Gray-50, Blue-50
- Text: Gray-900, Gray-600
- Success: Green-500
- Warning: Yellow-500
- Error: Red-500

### **Typography**
- Font: System default (Geist Sans)
- Heading: font-bold
- Body: text-base, text-gray-600

### **Component Style**
- Border radius: rounded-lg (8px), rounded-xl (12px)
- Shadows: shadow-sm, shadow-md
- Spacing: Consistent 4/8/16/24px
- Buttons: px-6 py-2 atau px-8 py-3
- Hover states: Always include transition-colors

---

## 🔐 AUTHENTICATION FLOW

### **NextAuth.js v5 Configuration**
```typescript
// lib/auth.ts (akan dibuat)
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "./prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // Login logic di sini
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // Custom JWT logic
    },
    session: async ({ session, token }) => {
      // Custom session logic
    },
  },
})
```

### **Protected Routes**
```typescript
// middleware.ts (akan dibuat)
export { auth as middleware } from "@/lib/auth"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tutors/:path*",
    "/requests/:path*",
    "/profile/:path*",
  ],
}
```

---

## 📝 NOTES & DECISIONS

### **Kenapa Next.js 16?**
- App Router sudah stable & production-ready
- Server Components untuk performance
- Server Actions untuk form handling (no API routes needed)
- Built-in optimizations

### **Kenapa Prisma?**
- Type-safe query builder
- Auto-generate TypeScript types
- Prisma Studio untuk database GUI
- Easy migrations

### **Kenapa PostgreSQL?**
- Relational data (users, tutors, requests, reviews)
- ACID compliance
- Supabase/Neon gratis & mudah setup

### **Authentication Strategy**
- NextAuth.js v5 (Auth.js) - industry standard
- Credentials provider (email + password)
- bcryptjs untuk hash password
- JWT untuk session management

### **File Upload Strategy**
- Phase 1: Belum ada upload (pakai placeholder)
- Phase 2: Upload avatar pakai Cloudinary/UploadThing

### **Notification Strategy**
- Phase 1: In-app notification (database-based)
- Phase 2: Real-time dengan Pusher/Socket.io
- Phase 3: Email notification dengan Resend/SendGrid

---

## 🐛 KNOWN ISSUES & TODO

### **Issues:**
- npm audit: 8 moderate vulnerabilities (dari dependencies, belum critical)
- Database belum disetup (DATABASE_URL masih placeholder)

### **TODO Before Production:**
- [ ] Setup database production (Supabase/Neon)
- [ ] Generate NEXTAUTH_SECRET yang aman
- [ ] Update .gitignore (jangan commit .env.local)
- [ ] Setup error handling & logging
- [ ] Security: Rate limiting, CORS, CSP
- [ ] Testing (unit & integration)
- [ ] Performance optimization (image optimization, lazy loading)
- [ ] SEO optimization (metadata, sitemap)

---

## 📚 RESOURCES & REFERENCES

### **Documentation:**
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js v5 Docs](https://authjs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hook Form Docs](https://react-hook-form.com)
- [Zod Docs](https://zod.dev)

### **Database:**
- [Supabase](https://supabase.com) - PostgreSQL gratis
- [Neon](https://neon.tech) - Serverless PostgreSQL gratis

### **Deployment:**
- [Vercel](https://vercel.com) - Recommended (Next.js native)
- [Railway](https://railway.app) - Alternative dengan database included
- [Render](https://render.com) - Alternative gratis

---

## 💬 KONTEKS UNTUK CHAT BARU

**Copy paste ini ke chat baru:**

```
Saya sedang develop aplikasi "Tutor Sebaya" - platform bimbingan belajar peer-to-peer untuk siswa sekolah.

Tech Stack: Next.js 16, TypeScript, Tailwind CSS, Prisma, PostgreSQL, NextAuth.js v5

Current Status:
✅ Phase 1 MVP - Complete (Auth, CRUD, Rating/Review)
✅ Phase 2 Enhancements - Complete (Email, Real-time, Calendar, PDF, Analytics)
✅ Polish Features - Complete (Toast, Loading, Search, Pagination)

Features Implemented:
- Authentication system (NextAuth v5)
- User management & profiles
- Tutor registration & admin verification
- Browse & filter tutors
- Request bimbingan system
- Rating & review system
- Email notifications (Resend)
- Real-time notifications (Pusher)
- Calendar view
- PDF export (laporan & sertifikat)
- Admin analytics dashboard dengan charts

Yang mau saya kerjakan sekarang: [sebutkan fitur yang mau dikerjakan]

Lihat KONTEKS.md untuk detail lengkap project.
```

---

**Last Updated:** February 7, 2026 (Phase 2 Enhancement Complete)  
**Project Location:** `D:\Dokumen\pakshintugas\tutor-sebaya`  
**Dev Server:** http://localhost:3000  
**Status:** MVP + Enhancement Complete, Ready for Production Deploy
