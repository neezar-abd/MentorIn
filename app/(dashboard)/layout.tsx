import Navbar from '@/components/layouts/navbar'
import Footer from '@/components/layouts/footer'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if (!session?.user) redirect('/login')

    const user = {
        id: session.user.id,
        name: session.user.name ?? '',
        email: session.user.email ?? '',
        role: session.user.role,
        avatarUrl: session.user.avatarUrl,
    }

    return (
        <>
            <Navbar user={user} />
            <main className="min-h-screen pt-32 pb-16">
                <div className="mx-auto max-w-5xl px-6">{children}</div>
            </main>
            <Footer />
        </>
    )
}
