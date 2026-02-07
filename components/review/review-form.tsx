'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import RatingStars from '@/components/ui/rating-stars'
import { ChevronRight, Send } from 'lucide-react'
import { submitReview, type ActionResult } from '@/lib/actions/review'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export default function ReviewForm({ requestId }: { requestId: string }) {
    const [rating, setRating] = useState(0)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    async function handleSubmit(formData: FormData) {
        formData.set('requestId', requestId)
        formData.set('rating', String(rating))

        startTransition(async () => {
            const result = await submitReview(formData)
            if (result.error) {
                setError(result.error)
                toast.error(result.error)
            } else {
                setSuccess(true)
                toast.success('Review berhasil dikirim!')
            }
        })
    }

    if (success) {
        return (
            <div className="text-center py-6">
                <p className="font-medium text-emerald-600">Review berhasil dikirim!</p>
                <p className="text-muted-foreground text-sm mt-1">Terima kasih atas feedback kamu.</p>
            </div>
        )
    }

    return (
        <div>
            <h2 className="font-medium">Beri Review</h2>
            <p className="text-muted-foreground mt-1 text-sm">Bagaimana pengalaman bimbingan kamu? Review kamu membantu tutor dan siswa lainnya.</p>

            {error && (
                <div className="mt-4 rounded-(--radius) border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
                    {error}
                </div>
            )}

            <form action={handleSubmit} className="mt-6 space-y-6">
                <div className="space-y-2">
                    <Label>Rating *</Label>
                    <RatingStars
                        rating={rating}
                        size="lg"
                        interactive
                        onChange={setRating}
                    />
                    {rating > 0 && (
                        <p className="text-muted-foreground text-sm">
                            {rating === 5 && 'Luar biasa!'}
                            {rating === 4 && 'Bagus!'}
                            {rating === 3 && 'Cukup baik'}
                            {rating === 2 && 'Kurang memuaskan'}
                            {rating === 1 && 'Perlu perbaikan'}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="comment">Komentar</Label>
                    <Textarea
                        id="comment"
                        name="comment"
                        placeholder="Ceritakan pengalaman belajar kamu dengan tutor ini..."
                        rows={4}
                    />
                </div>

                <div className="flex justify-end border-t pt-6">
                    <Button type="submit" className="pr-1.5" disabled={rating === 0 || isPending}>
                        <Send className="size-4" />
                        <span>{isPending ? 'Mengirim...' : 'Kirim Review'}</span>
                        <ChevronRight className="opacity-50" />
                    </Button>
                </div>
            </form>
        </div>
    )
}
