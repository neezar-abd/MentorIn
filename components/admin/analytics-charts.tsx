'use client'

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend,
} from 'recharts'
import type { PieLabelRenderProps } from 'recharts'

const COLORS = ['#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626', '#6366f1']

// ---------- Request Trend (Line) ----------

export function RequestTrendChart({
    data,
}: {
    data: { month: string; total: number; completed: number }[]
}) {
    return (
        <div className="rounded-(--radius) border p-5">
            <h3 className="mb-4 text-sm font-medium">Tren Request (6 Bulan)</h3>
            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                    <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e4e4e7',
                            fontSize: '12px',
                        }}
                    />
                    <Legend iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                    <Line
                        type="monotone"
                        dataKey="total"
                        name="Total Request"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="completed"
                        name="Selesai"
                        stroke="#059669"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

// ---------- Users Registration (Bar) ----------

export function UserRegistrationChart({
    data,
}: {
    data: { month: string; count: number }[]
}) {
    return (
        <div className="rounded-(--radius) border p-5">
            <h3 className="mb-4 text-sm font-medium">Registrasi User (6 Bulan)</h3>
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                    <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e4e4e7',
                            fontSize: '12px',
                        }}
                    />
                    <Bar dataKey="count" name="User Baru" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

// ---------- Users per Role (Pie) ----------

export function UsersPerRoleChart({
    data,
}: {
    data: { role: string; count: number }[]
}) {
    return (
        <div className="rounded-(--radius) border p-5">
            <h3 className="mb-4 text-sm font-medium">Distribusi Role</h3>
            <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="count"
                        nameKey="role"
                        label={(props: PieLabelRenderProps) => `${(props as PieLabelRenderProps & { role: string }).role}: ${(props as PieLabelRenderProps & { count: number }).count}`}
                        labelLine={false}
                        fontSize={11}>
                        {data.map((_: { role: string; count: number }, i: number) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e4e4e7',
                            fontSize: '12px',
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

// ---------- Request Status (Pie) ----------

export function RequestStatusChart({
    data,
}: {
    data: { status: string; count: number }[]
}) {
    const statusColors: Record<string, string> = {
        Menunggu: '#d97706',
        Disetujui: '#2563eb',
        Ditolak: '#dc2626',
        Selesai: '#059669',
        Dibatalkan: '#71717a',
    }

    return (
        <div className="rounded-(--radius) border p-5">
            <h3 className="mb-4 text-sm font-medium">Status Request</h3>
            <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="count"
                        nameKey="status"
                        label={(props: PieLabelRenderProps) => `${(props as PieLabelRenderProps & { status: string }).status}: ${(props as PieLabelRenderProps & { count: number }).count}`}
                        labelLine={false}
                        fontSize={11}>
                        {data.map((entry: { status: string; count: number }, i: number) => (
                            <Cell key={i} fill={statusColors[entry.status] || COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e4e4e7',
                            fontSize: '12px',
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

// ---------- Top Subjects (Horizontal Bar) ----------

export function TopSubjectsChart({
    data,
}: {
    data: { subject: string; count: number }[]
}) {
    return (
        <div className="rounded-(--radius) border p-5">
            <h3 className="mb-4 text-sm font-medium">Mata Pelajaran Populer</h3>
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" horizontal={false} />
                    <XAxis type="number" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <YAxis type="category" dataKey="subject" fontSize={11} tickLine={false} axisLine={false} width={100} />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e4e4e7',
                            fontSize: '12px',
                        }}
                    />
                    <Bar dataKey="count" name="Request" fill="#7c3aed" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
