'use client'

import Link from 'next/link'
import { BookOpen, LogOut, Menu, Settings, User, X } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/utils'
import { logoutAction } from '@/lib/actions/auth'
import NotificationBell from '@/components/notifications/notification-bell'

interface NavbarProps {
    user?: {
        id?: string
        name: string
        email: string
        role: 'STUDENT' | 'TUTOR' | 'ADMIN'
        avatarUrl?: string | null
    } | null
}

export default function Navbar({ user }: NavbarProps) {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    // Dynamic nav links based on user role
    const navLinks = React.useMemo(() => {
        if (!user) return []
        
        const baseLinks = [
            { href: '/dashboard', label: 'Dashboard' },
            { href: '/tutors', label: 'Cari Tutor' },
            { href: '/calendar', label: 'Kalender' },
        ]

        if (user.role === 'STUDENT') {
            return [...baseLinks, { href: '/requests', label: 'Request' }]
        } else if (user.role === 'TUTOR') {
            return [...baseLinks, { href: '/tutor/dashboard', label: 'Dashboard Tutor' }]
        } else if (user.role === 'ADMIN') {
            return [...baseLinks, { href: '/admin', label: 'Admin' }]
        }

        return baseLinks
    }, [user])

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    const getRoleBadge = (role: string) => {
        const labels = { STUDENT: 'Siswa', TUTOR: 'Tutor', ADMIN: 'Admin' }
        return <Badge variant="outline">{labels[role as keyof typeof labels]}</Badge>
    }

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn('fixed z-20 w-full transition-all duration-300', isScrolled && 'bg-background/75 border-b border-black/5 backdrop-blur-lg')}>
                <div className="mx-auto max-w-5xl px-6">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-6 lg:gap-0">
                        <div className="flex w-full justify-between gap-6 lg:w-auto">
                            <Link
                                href={user ? '/dashboard' : '/'}
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        {/* Desktop Nav Links */}
                        {user && (
                            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                                <ul className="flex gap-1">
                                    {navLinks.map((item, index) => (
                                        <li key={index}>
                                            <Button
                                                asChild
                                                variant="ghost"
                                                size="sm">
                                                <Link href={item.href}>
                                                    <span>{item.label}</span>
                                                </Link>
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Right Section */}
                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-3 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            {/* Mobile nav links */}
                            {user && (
                                <div className="lg:hidden">
                                    <ul className="space-y-6 text-base">
                                        {navLinks.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.href}
                                                    onClick={() => setMenuState(false)}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {user ? (
                                <div className="flex w-full items-center gap-2 sm:w-fit" data-user-id={user.id}>
                                    {/* Notification Bell */}
                                    <NotificationBell />

                                    {/* User Menu */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="hover:bg-muted flex size-9 cursor-pointer items-center justify-center rounded-full duration-200">
                                                <Avatar className="size-7">
                                                    <AvatarImage src={user.avatarUrl || undefined} />
                                                    <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
                                                </Avatar>
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuLabel>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{user.name}</span>
                                                        {getRoleBadge(user.role)}
                                                    </div>
                                                    <span className="text-muted-foreground text-sm font-normal">{user.email}</span>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href="/profile">
                                                    <User className="mr-2 size-4" />
                                                    Profil Saya
                                                </Link>
                                            </DropdownMenuItem>
                                            {user.role === 'STUDENT' && (
                                                <DropdownMenuItem asChild>
                                                    <Link href="/tutor/register">
                                                        <BookOpen className="mr-2 size-4" />
                                                        Jadi Tutor
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                            {user.role === 'TUTOR' && (
                                                <DropdownMenuItem asChild>
                                                    <Link href="/tutor/dashboard">
                                                        <BookOpen className="mr-2 size-4" />
                                                        Dashboard Tutor
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                            {user.role === 'ADMIN' && (
                                                <DropdownMenuItem asChild>
                                                    <Link href="/admin">
                                                        <Settings className="mr-2 size-4" />
                                                        Admin Panel
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem asChild>
                                                <Link href="/settings">
                                                    <Settings className="mr-2 size-4" />
                                                    Pengaturan
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => logoutAction()}
                                                className="text-red-600 focus:text-red-600">
                                                <LogOut className="mr-2 size-4" />
                                                Keluar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className={cn(isScrolled && 'lg:hidden')}>
                                        <Link href="/login">
                                            <span>Masuk</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="sm"
                                        className={cn(isScrolled && 'lg:hidden')}>
                                        <Link href="/register">
                                            <span>Daftar</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="sm"
                                        className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                        <Link href="/register">
                                            <span>Mulai Sekarang</span>
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
