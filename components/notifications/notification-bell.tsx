'use client'

import { useEffect, useState, useTransition } from 'react'
import { Bell, Check, CheckCheck } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getNotifications, getUnreadCount, markAsRead, markAllAsRead } from '@/lib/actions/notification'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'

type Notification = {
    id: string
    type: string
    title: string
    message: string
    link: string | null
    isRead: boolean
    createdAt: Date
}

const typeIcons: Record<string, string> = {
    REQUEST_NEW: '📩',
    REQUEST_APPROVED: '✅',
    REQUEST_REJECTED: '❌',
    REQUEST_COMPLETED: '🎉',
    REQUEST_CANCELLED: '🚫',
    REVIEW_RECEIVED: '⭐',
    TUTOR_VERIFIED: '🎓',
    TUTOR_REJECTED: '😔',
}

export default function NotificationBell() {
    const router = useRouter()
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)

    // Fetch notifications when dropdown opens
    useEffect(() => {
        if (open) {
            getNotifications().then(setNotifications)
        }
    }, [open])

    // Fetch unread count on mount + poll every 30s
    useEffect(() => {
        getUnreadCount().then(setUnreadCount)
        const interval = setInterval(() => {
            getUnreadCount().then(setUnreadCount)
        }, 30000)
        return () => clearInterval(interval)
    }, [])

    // Listen for Pusher events (real-time)
    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_PUSHER_KEY) return

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let channel: any

        import('@/lib/pusher-client').then(({ getPusherClient }) => {
            const pusher = getPusherClient()
            // We need the userId - get from a data attr or fetch
            const userEl = document.querySelector('[data-user-id]')
            const userId = userEl?.getAttribute('data-user-id')
            if (!userId) return

            channel = pusher.subscribe(`user-${userId}`)
            channel.bind('new-notification', (data: Notification) => {
                setNotifications((prev) => [data, ...prev].slice(0, 20))
                setUnreadCount((prev) => prev + 1)
            })
        })

        return () => {
            channel?.unbind_all()
        }
    }, [])

    const handleClick = (notif: Notification) => {
        if (!notif.isRead) {
            startTransition(async () => {
                await markAsRead(notif.id)
                setNotifications((prev) => prev.map((n: Notification) => (n.id === notif.id ? { ...n, isRead: true } : n)))
                setUnreadCount((prev) => Math.max(0, prev - 1))
            })
        }
        if (notif.link) {
            setOpen(false)
            router.push(notif.link)
        }
    }

    const handleMarkAllRead = () => {
        startTransition(async () => {
            await markAllAsRead()
            setNotifications((prev) => prev.map((n: Notification) => ({ ...n, isRead: true })))
            setUnreadCount(0)
        })
    }

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button className="hover:bg-muted relative flex size-9 cursor-pointer items-center justify-center rounded-full duration-200">
                    <Bell className="size-4" />
                    {unreadCount > 0 && (
                        <span className="bg-foreground text-background absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-2">
                    <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllRead}
                            disabled={isPending}
                            className="text-muted-foreground hover:text-foreground flex items-center gap-1 px-2 py-1 text-xs duration-150">
                            <CheckCheck className="size-3" />
                            Tandai semua dibaca
                        </button>
                    )}
                </div>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notif: Notification) => (
                            <DropdownMenuItem
                                key={notif.id}
                                onClick={() => handleClick(notif)}
                                className={`flex cursor-pointer flex-col items-start py-3 ${!notif.isRead ? 'bg-muted/50' : ''}`}>
                                <div className="flex w-full items-start gap-2">
                                    <span className="mt-0.5 text-sm">{typeIcons[notif.type] || '🔔'}</span>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{notif.title}</span>
                                            {!notif.isRead && <span className="bg-primary size-1.5 shrink-0 rounded-full" />}
                                        </div>
                                        <span className="text-muted-foreground line-clamp-2 text-sm">{notif.message}</span>
                                        <span className="text-muted-foreground mt-1 text-xs">
                                            {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true, locale: idLocale })}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <div className="py-8 text-center">
                            <Bell className="text-muted-foreground mx-auto size-6" />
                            <p className="text-muted-foreground mt-2 text-sm">Belum ada notifikasi</p>
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
