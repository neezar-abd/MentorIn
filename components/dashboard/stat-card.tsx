import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface StatCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    trend?: {
        value: number
        isPositive: boolean
    }
    className?: string
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative size-20 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />
        <div className="bg-background absolute inset-0 m-auto flex size-10 items-center justify-center border-l border-t">{children}</div>
    </div>
)

export default function StatCard({ title, value, icon: Icon, description, trend, className }: StatCardProps) {
    return (
        <div className={cn('group rounded-(--radius) space-y-4 border py-8 text-center', className)}>
            <div className="mx-auto w-fit">
                <CardDecorator>
                    <Icon
                        className="size-5"
                        aria-hidden
                    />
                </CardDecorator>
            </div>

            <div className="space-y-1 px-6">
                <div className="text-4xl font-bold">{value}</div>
                <p className="text-muted-foreground text-sm">{title}</p>
                {description && <p className="text-muted-foreground text-xs">{description}</p>}
                {trend && (
                    <p className="text-sm">
                        <span className={cn('font-medium', trend.isPositive ? 'text-emerald-600' : 'text-red-600')}>
                            {trend.isPositive ? '+' : ''}
                            {trend.value}%
                        </span>
                        <span className="text-muted-foreground ml-1">dari bulan lalu</span>
                    </p>
                )}
            </div>
        </div>
    )
}
