# Tutor Sebaya - Peer Tutoring Platform

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

