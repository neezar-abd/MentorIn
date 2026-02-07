import { cn } from '@/lib/utils'

export const Logo = ({ className }: { className?: string; uniColor?: boolean }) => {
    return (
        <span className={cn('text-2xl font-serif font-medium text-foreground', className)}>
            MentorIn
        </span>
    )
}

export const LogoIcon = ({ className }: { className?: string; uniColor?: boolean }) => {
    return (
        <span className={cn('text-xl font-serif font-medium text-foreground', className)}>
            M
        </span>
    )
}

export const LogoSVG = ({ className }: { className?: string; uniColor?: boolean }) => {
    return (
        <svg className={className}>
            <defs>
                <linearGradient
                    id="paint_logo"
                    x1="90"
                    y1="0"
                    x2="90"
                    y2="220"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9B99FE" />
                    <stop
                        offset="1"
                        stopColor="#2BC8B7"
                    />
                </linearGradient>
            </defs>
        </svg>
    )
}
