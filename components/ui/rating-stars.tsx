'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface RatingStarsProps {
    rating: number
    maxRating?: number
    size?: 'sm' | 'md' | 'lg'
    interactive?: boolean
    onChange?: (rating: number) => void
    showValue?: boolean
    className?: string
}

export default function RatingStars({ rating, maxRating = 5, size = 'md', interactive = false, onChange, showValue = false, className }: RatingStarsProps) {
    const [hoverRating, setHoverRating] = useState(0)

    const sizeClasses = {
        sm: 'size-3.5',
        md: 'size-4',
        lg: 'size-5',
    }

    const handleClick = (value: number) => {
        if (interactive && onChange) {
            onChange(value)
        }
    }

    const handleMouseEnter = (value: number) => {
        if (interactive) {
            setHoverRating(value)
        }
    }

    const handleMouseLeave = () => {
        if (interactive) {
            setHoverRating(0)
        }
    }

    const displayRating = hoverRating || rating

    return (
        <div className={cn('flex items-center gap-0.5', className)}>
            <div className="flex items-center">
                {Array.from({ length: maxRating }, (_, i) => {
                    const starValue = i + 1
                    const isFilled = starValue <= displayRating
                    const isPartial = starValue > Math.floor(displayRating) && starValue <= Math.ceil(displayRating)

                    return (
                        <button
                            key={i}
                            type="button"
                            disabled={!interactive}
                            onClick={() => handleClick(starValue)}
                            onMouseEnter={() => handleMouseEnter(starValue)}
                            onMouseLeave={handleMouseLeave}
                            className={cn('relative duration-200', interactive && 'cursor-pointer hover:scale-110', !interactive && 'cursor-default')}>
                            {isPartial && !hoverRating ? (
                                <div className="relative">
                                    <Star
                                        className={cn(sizeClasses[size], 'text-zinc-200 dark:text-zinc-700')}
                                        fill="currentColor"
                                    />
                                    <div
                                        className="absolute inset-0 overflow-hidden"
                                        style={{ width: `${(displayRating % 1) * 100}%` }}>
                                        <Star
                                            className={cn(sizeClasses[size], 'text-zinc-900 dark:text-zinc-100')}
                                            fill="currentColor"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <Star
                                    className={cn(sizeClasses[size], isFilled ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-200 dark:text-zinc-700')}
                                    fill="currentColor"
                                />
                            )}
                        </button>
                    )
                })}
            </div>
            {showValue && <span className="text-muted-foreground ml-1 text-sm">{rating.toFixed(1)}</span>}
        </div>
    )
}
