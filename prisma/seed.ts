import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { hash } from 'bcryptjs'
import { config } from 'dotenv'
import path from 'node:path'

// Load .env.local for DIRECT_DATABASE_URL
config({ path: path.resolve(process.cwd(), '.env.local'), override: true })

import { Pool } from 'pg'

const pool = new Pool({ connectionString: process.env.DIRECT_DATABASE_URL! })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Seeding database...')

    // Clean existing data
    await prisma.review.deleteMany()
    await prisma.request.deleteMany()
    await prisma.tutorProfile.deleteMany()
    await prisma.user.deleteMany()

    const password = await hash('password123', 12)

    // ==================== ADMIN ====================
    const admin = await prisma.user.create({
        data: {
            name: 'Pak Budi Santoso',
            email: 'admin@school.id',
            password,
            role: 'ADMIN',
            class: null,
        },
    })
    console.log('✅ Admin created:', admin.email)

    // ==================== TUTORS (with profiles) ====================
    const tutorData = [
        {
            name: 'Aisyah Putri',
            email: 'aisyah@school.id',
            class: '12 IPA 1',
            subjects: ['Matematika', 'Fisika'],
            bio: 'Juara 1 Olimpiade Matematika tingkat kota. Suka banget ngajarin temen-temen yang kesulitan di materi eksak. Kalau bingung integral atau mekanika, langsung hubungi aja!',
            availability: { Senin: ['15:00-17:00'], Rabu: ['15:00-17:00'], Jumat: ['13:00-15:00'] },
            rating: 4.8,
            totalSessions: 24,
        },
        {
            name: 'Rizky Pratama',
            email: 'rizky@school.id',
            class: '12 IPA 2',
            subjects: ['Fisika', 'Kimia'],
            bio: 'Sering bantu temen-temen belajar buat UAS dan UTBK. Metode belajar gw santai tapi efektif, dijamin paham!',
            availability: { Selasa: ['16:00-18:00'], Kamis: ['16:00-18:00'], Sabtu: ['09:00-11:00'] },
            rating: 4.6,
            totalSessions: 18,
        },
        {
            name: 'Sarah Amelia',
            email: 'sarah@school.id',
            class: '11 IPA 1',
            subjects: ['Biologi', 'Kimia'],
            bio: 'Passionate di bidang sains, terutama biologi molekuler. Sering bikin mind map buat bantu temen-temen hafal materi.',
            availability: { Senin: ['14:00-16:00'], Rabu: ['14:00-16:00'] },
            rating: 4.9,
            totalSessions: 15,
        },
        {
            name: 'Dimas Aditya',
            email: 'dimas@school.id',
            class: '12 IPS 1',
            subjects: ['Bahasa Inggris', 'Sejarah'],
            bio: 'TOEFL score 590. Love sharing English tips! Juga suka banget diskusi sejarah, especially World War era.',
            availability: { Selasa: ['15:00-17:00'], Kamis: ['15:00-17:00'], Sabtu: ['10:00-12:00'] },
            rating: 4.7,
            totalSessions: 20,
        },
        {
            name: 'Nabila Zahra',
            email: 'nabila@school.id',
            class: '11 IPS 2',
            subjects: ['Ekonomi', 'Matematika'],
            bio: 'Juara 2 Olimpiade Ekonomi. Bisa jelasin materi ekonomi mikro/makro dengan analogi yang gampang dipahami.',
            availability: { Senin: ['16:00-18:00'], Rabu: ['16:00-18:00'], Jumat: ['14:00-16:00'] },
            rating: 4.5,
            totalSessions: 12,
        },
        {
            name: 'Fajar Ramadhan',
            email: 'fajar@school.id',
            class: '12 IPA 1',
            subjects: ['Matematika', 'Bahasa Indonesia'],
            bio: 'Bisa ngajarin dari yang basic banget sampe yang advanced. Sabar dan telaten, ga bakal nge-judge kalau kamu masih bingung.',
            availability: { Selasa: ['14:00-16:00'], Kamis: ['14:00-16:00'] },
            rating: 4.4,
            totalSessions: 10,
        },
    ]

    const tutorUsers = []
    const tutorProfiles = []

    for (const t of tutorData) {
        const user = await prisma.user.create({
            data: {
                name: t.name,
                email: t.email,
                password,
                role: 'TUTOR',
                class: t.class,
            },
        })
        const profile = await prisma.tutorProfile.create({
            data: {
                userId: user.id,
                subjects: t.subjects,
                bio: t.bio,
                availability: t.availability,
                isVerified: true,
                rating: t.rating,
                totalSessions: t.totalSessions,
            },
        })
        tutorUsers.push(user)
        tutorProfiles.push(profile)
        console.log(`✅ Tutor created: ${user.name} (${t.subjects.join(', ')})`)
    }

    // Unverified tutor (waiting for admin)
    const unverifiedUser = await prisma.user.create({
        data: {
            name: 'Galih Prasetyo',
            email: 'galih@school.id',
            password,
            role: 'TUTOR',
            class: '11 IPA 2',
        },
    })
    await prisma.tutorProfile.create({
        data: {
            userId: unverifiedUser.id,
            subjects: ['Fisika', 'Matematika'],
            bio: 'Saya ingin berbagi ilmu fisika dan matematika kepada teman-teman. Sering dapat nilai tertinggi di kelas.',
            availability: { Senin: ['15:00-17:00'], Kamis: ['15:00-17:00'] },
            isVerified: false,
        },
    })
    console.log('✅ Unverified tutor created: Galih Prasetyo')

    // ==================== STUDENTS ====================
    const studentData = [
        { name: 'Ahmad Fauzi', email: 'ahmad@school.id', class: '11 IPA 1' },
        { name: 'Dewi Lestari', email: 'dewi@school.id', class: '11 IPA 2' },
        { name: 'Bima Sakti', email: 'bima@school.id', class: '10 IPA 1' },
        { name: 'Citra Permata', email: 'citra@school.id', class: '10 IPS 1' },
        { name: 'Eko Prasetyo', email: 'eko@school.id', class: '11 IPS 1' },
    ]

    const students = []
    for (const s of studentData) {
        const user = await prisma.user.create({
            data: {
                name: s.name,
                email: s.email,
                password,
                role: 'STUDENT',
                class: s.class,
            },
        })
        students.push(user)
        console.log(`✅ Student created: ${user.name}`)
    }

    // ==================== REQUESTS ====================
    const now = new Date()

    // Ahmad requests from Aisyah — completed
    const req1 = await prisma.request.create({
        data: {
            studentId: students[0].id,
            tutorId: tutorProfiles[0].id,
            subject: 'Matematika',
            topic: 'Integral Tentu',
            mode: 'OFFLINE',
            location: 'Perpustakaan Sekolah',
            scheduledAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
            duration: 60,
            notes: 'Mau belajar integral tentu buat persiapan UAS',
            status: 'COMPLETED',
        },
    })

    // Ahmad requests from Rizky — completed
    const req2 = await prisma.request.create({
        data: {
            studentId: students[0].id,
            tutorId: tutorProfiles[1].id,
            subject: 'Fisika',
            topic: 'Hukum Newton',
            mode: 'ONLINE',
            location: 'Google Meet',
            scheduledAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
            duration: 90,
            status: 'COMPLETED',
        },
    })

    // Ahmad requests from Sarah — approved (upcoming)
    await prisma.request.create({
        data: {
            studentId: students[0].id,
            tutorId: tutorProfiles[2].id,
            subject: 'Biologi',
            topic: 'Sistem Pencernaan',
            mode: 'OFFLINE',
            location: 'Ruang Kelas 11 IPA 1',
            scheduledAt: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000),
            duration: 60,
            status: 'APPROVED',
        },
    })

    // Ahmad requests from Dimas — pending
    await prisma.request.create({
        data: {
            studentId: students[0].id,
            tutorId: tutorProfiles[3].id,
            subject: 'Bahasa Inggris',
            topic: 'Essay Writing',
            mode: 'ONLINE',
            location: 'Zoom',
            scheduledAt: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
            duration: 60,
            notes: 'Mau latihan nulis essay buat UTBK',
            status: 'PENDING',
        },
    })

    // Dewi requests — various statuses
    await prisma.request.create({
        data: {
            studentId: students[1].id,
            tutorId: tutorProfiles[0].id,
            subject: 'Matematika',
            topic: 'Turunan Fungsi',
            mode: 'OFFLINE',
            location: 'Perpustakaan',
            scheduledAt: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000),
            duration: 60,
            status: 'APPROVED',
        },
    })

    await prisma.request.create({
        data: {
            studentId: students[1].id,
            tutorId: tutorProfiles[4].id,
            subject: 'Ekonomi',
            topic: 'Permintaan dan Penawaran',
            mode: 'ONLINE',
            location: 'Google Meet',
            scheduledAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
            duration: 60,
            status: 'COMPLETED',
        },
    })

    // Bima requests — rejected
    await prisma.request.create({
        data: {
            studentId: students[2].id,
            tutorId: tutorProfiles[1].id,
            subject: 'Kimia',
            topic: 'Stoikiometri',
            mode: 'OFFLINE',
            location: 'Lab Kimia',
            scheduledAt: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
            duration: 90,
            notes: 'Tolong ajarin stoikiometri dari dasar ya',
            status: 'REJECTED',
        },
    })

    console.log('✅ Requests created')

    // ==================== REVIEWS ====================
    await prisma.review.create({
        data: {
            requestId: req1.id,
            studentId: students[0].id,
            tutorId: tutorProfiles[0].id,
            rating: 5,
            comment: 'Kak Aisyah jelasinnya super clear! Integral yang tadinya bikin pusing jadi gampang banget. Makasih banyak!',
        },
    })

    await prisma.review.create({
        data: {
            requestId: req2.id,
            studentId: students[0].id,
            tutorId: tutorProfiles[1].id,
            rating: 4,
            comment: 'Bagus sih penjelasannya, tapi agak kecepetan. Overall oke banget, paham Hukum Newton sekarang.',
        },
    })

    console.log('✅ Reviews created')
    console.log('')
    console.log('🎉 Seeding selesai!')
    console.log('')
    console.log('📋 Akun untuk testing:')
    console.log('   Admin:   admin@school.id / password123')
    console.log('   Tutor:   aisyah@school.id / password123')
    console.log('   Student: ahmad@school.id / password123')
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
