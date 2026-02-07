'use client'

import CalendarView from '@/components/calendar/calendar-view'
import { getCalendarSessions } from '@/lib/actions/calendar'
import { useEffect, useState, useTransition } from 'react'

type CalendarSession = Awaited<ReturnType<typeof getCalendarSessions>>[number]

export default function CalendarPageClient({
    initialSessions,
    initialYear,
    initialMonth,
}: {
    initialSessions: CalendarSession[]
    initialYear: number
    initialMonth: number
}) {
    const [sessions, setSessions] = useState(initialSessions)
    const [isPending, startTransition] = useTransition()

    const handleMonthChange = (year: number, month: number) => {
        startTransition(async () => {
            const data = await getCalendarSessions(year, month)
            setSessions(data)
        })
    }

    return (
        <div className={isPending ? 'opacity-60 transition-opacity' : ''}>
            <CalendarView
                sessions={JSON.parse(JSON.stringify(sessions))}
                initialYear={initialYear}
                initialMonth={initialMonth}
                onMonthChange={handleMonthChange}
            />
        </div>
    )
}
