'use client'

import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import Link from 'next/link'

type CalendarSession = {
    id: string
    subject: string
    topic: string
    mode: string
    location: string | null
    scheduledAt: string | Date
    duration: number
    status: string
    student: { name: string }
    tutor: { user: { name: string } }
}

const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']
const MONTHS = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1 // Convert: Sunday=6, Monday=0
}

function formatTime(date: Date | string) {
    return new Date(date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export default function CalendarView({
    sessions: initialSessions,
    initialYear,
    initialMonth,
    onMonthChange,
}: {
    sessions: CalendarSession[]
    initialYear: number
    initialMonth: number
    onMonthChange: (year: number, month: number) => void
}) {
    const [year, setYear] = useState(initialYear)
    const [month, setMonth] = useState(initialMonth)
    const [selectedDate, setSelectedDate] = useState<number | null>(null)

    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const today = new Date()
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month

    // Group sessions by day
    const sessionsByDay: Record<number, CalendarSession[]> = {}
    initialSessions.forEach((s) => {
        const day = new Date(s.scheduledAt).getDate()
        if (!sessionsByDay[day]) sessionsByDay[day] = []
        sessionsByDay[day].push(s)
    })

    const navigate = (dir: -1 | 1) => {
        let newMonth = month + dir
        let newYear = year
        if (newMonth < 0) { newMonth = 11; newYear-- }
        if (newMonth > 11) { newMonth = 0; newYear++ }
        setMonth(newMonth)
        setYear(newYear)
        setSelectedDate(null)
        onMonthChange(newYear, newMonth)
    }

    const goToToday = () => {
        const now = new Date()
        setYear(now.getFullYear())
        setMonth(now.getMonth())
        setSelectedDate(now.getDate())
        onMonthChange(now.getFullYear(), now.getMonth())
    }

    const selectedSessions = selectedDate ? (sessionsByDay[selectedDate] || []) : []

    return (
        <div className="space-y-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-medium">
                        {MONTHS[month]} {year}
                    </h2>
                    <Button variant="outline" size="sm" onClick={goToToday}>
                        Hari Ini
                    </Button>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="size-8" onClick={() => navigate(-1)}>
                        <ChevronLeft className="size-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8" onClick={() => navigate(1)}>
                        <ChevronRight className="size-4" />
                    </Button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="rounded-(--radius) border">
                {/* Day names */}
                <div className="grid grid-cols-7 border-b">
                    {DAYS.map((day) => (
                        <div key={day} className="text-muted-foreground px-2 py-2 text-center text-xs font-medium">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: firstDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="min-h-20 border-b border-r p-1.5 last:border-r-0" />
                    ))}

                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1
                        const isToday = isCurrentMonth && today.getDate() === day
                        const hasSessions = !!sessionsByDay[day]
                        const isSelected = selectedDate === day
                        const cellIndex = firstDay + i

                        return (
                            <button
                                type="button"
                                key={day}
                                onClick={() => setSelectedDate(isSelected ? null : day)}
                                className={cn(
                                    'min-h-20 border-b border-r p-1.5 text-left transition-colors',
                                    cellIndex % 7 === 6 && 'border-r-0',
                                    isSelected && 'bg-primary/5',
                                    !isSelected && hasSessions && 'hover:bg-muted/50',
                                    !isSelected && !hasSessions && 'hover:bg-muted/30',
                                )}>
                                <span
                                    className={cn(
                                        'inline-flex size-6 items-center justify-center rounded-full text-xs',
                                        isToday && 'bg-primary text-primary-foreground font-bold',
                                    )}>
                                    {day}
                                </span>
                                {hasSessions && (
                                    <div className="mt-0.5 space-y-0.5">
                                        {sessionsByDay[day].slice(0, 2).map((s) => (
                                            <div
                                                key={s.id}
                                                className={cn(
                                                    'truncate rounded px-1 py-0.5 text-[10px] font-medium leading-tight',
                                                    s.status === 'COMPLETED'
                                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                                                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
                                                )}>
                                                {formatTime(s.scheduledAt)} {s.subject}
                                            </div>
                                        ))}
                                        {sessionsByDay[day].length > 2 && (
                                            <span className="text-muted-foreground px-1 text-[10px]">
                                                +{sessionsByDay[day].length - 2} lagi
                                            </span>
                                        )}
                                    </div>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Selected Day Detail */}
            {selectedDate !== null && (
                <div className="space-y-3">
                    <h3 className="text-sm font-medium">
                        {selectedDate} {MONTHS[month]} {year}
                        {selectedSessions.length > 0 && (
                            <span className="text-muted-foreground ml-2 font-normal">
                                ({selectedSessions.length} sesi)
                            </span>
                        )}
                    </h3>

                    {selectedSessions.length > 0 ? (
                        <div className="space-y-2">
                            {selectedSessions.map((s) => (
                                <Link
                                    key={s.id}
                                    href={`/sessions/${s.id}`}
                                    className="flex items-start gap-3 rounded-(--radius) border p-4 transition-shadow hover:shadow-md hover:shadow-zinc-950/5">
                                    <div
                                        className={cn(
                                            'mt-0.5 size-2 shrink-0 rounded-full',
                                            s.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-blue-500',
                                        )}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{s.subject}</span>
                                            <span className="text-muted-foreground text-sm">·</span>
                                            <span className="text-muted-foreground truncate text-sm">{s.topic}</span>
                                        </div>
                                        <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-3 text-sm">
                                            <span className="flex items-center gap-1">
                                                <Clock className="size-3" />
                                                {formatTime(s.scheduledAt)} ({s.duration} menit)
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="size-3" />
                                                {s.tutor.user.name}
                                            </span>
                                            {s.location && (
                                                <span className="flex items-center gap-1">
                                                    <MapPin className="size-3" />
                                                    {s.location}
                                                </span>
                                            )}
                                            <Badge variant="outline" className="text-[10px]">
                                                {s.mode === 'ONLINE' ? 'Online' : 'Offline'}
                                            </Badge>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-sm">Tidak ada sesi di tanggal ini.</p>
                    )}
                </div>
            )}
        </div>
    )
}
