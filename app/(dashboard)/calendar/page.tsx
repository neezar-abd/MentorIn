import { CalendarDays } from 'lucide-react'
import CalendarPageClient from '@/components/calendar/calendar-page-client'
import { getCalendarSessions } from '@/lib/actions/calendar'

export default async function CalendarPage() {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()

    const sessions = await getCalendarSessions(year, month)

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2">
                    <CalendarDays className="size-6" />
                    <h1 className="text-balance font-serif text-3xl font-medium">Kalender</h1>
                </div>
                <p className="text-muted-foreground mt-2">Lihat jadwal sesi bimbingan dalam tampilan kalender.</p>
            </div>

            <CalendarPageClient
                initialSessions={JSON.parse(JSON.stringify(sessions))}
                initialYear={year}
                initialMonth={month}
            />
        </div>
    )
}
