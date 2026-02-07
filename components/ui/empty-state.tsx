import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import Link from 'next/link'

interface EmptyStateProps {
    icon: LucideIcon
    title: string
    description: string
    action?: {
        label: string
        onClick?: () => void
        href?: string
    }
    className?: string
}

const Decorator = ({ children }: { children: ReactNode }) => (
    <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)]">
        <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
        />
        <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">{children}</div>
    </div>
)

export default function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
            <Decorator>
                <Icon
                    className="size-6"
                    aria-hidden
                />
            </Decorator>

            <h3 className="mt-6 font-medium">{title}</h3>
            <p className="text-muted-foreground mt-2 max-w-sm text-sm">{description}</p>

            {action && (
                action.href ? (
                    <Button asChild className="mt-6 pr-1.5">
                        <Link href={action.href}>
                            <span>{action.label}</span>
                            <ChevronRight className="opacity-50" />
                        </Link>
                    </Button>
                ) : (
                    <Button
                        onClick={action.onClick}
                        className="mt-6 pr-1.5">
                        <span>{action.label}</span>
                        <ChevronRight className="opacity-50" />
                    </Button>
                )
            )}
        </div>
    )
}
