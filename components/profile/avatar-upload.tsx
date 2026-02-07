'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Camera, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { uploadAvatar } from '@/lib/actions/upload'
import { toast } from 'sonner'

export default function AvatarUpload({ name, avatarUrl }: { name: string; avatarUrl?: string | null }) {
    const [preview, setPreview] = useState<string | null>(avatarUrl || null)
    const [isUploading, setIsUploading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const initials = name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        // Preview
        const reader = new FileReader()
        reader.onloadend = () => setPreview(reader.result as string)
        reader.readAsDataURL(file)

        // Upload
        setIsUploading(true)
        const formData = new FormData()
        formData.append('avatar', file)

        const result = await uploadAvatar(formData)
        setIsUploading(false)

        if (result.success) {
            toast.success('Foto profil berhasil diupdate!')
            if (result.url) setPreview(result.url)
        } else {
            toast.error(result.error || 'Gagal mengupload foto')
            setPreview(avatarUrl || null)
        }

        // Reset input
        if (inputRef.current) inputRef.current.value = ''
    }

    return (
        <div className="flex items-center gap-4">
            <div className="relative">
                <Avatar className="size-16">
                    <AvatarImage src={preview || undefined} alt={name} />
                    <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>
                {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                        <Loader2 className="size-5 animate-spin text-white" />
                    </div>
                )}
            </div>
            <div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isUploading}
                    onClick={() => inputRef.current?.click()}>
                    <Camera className="size-4" />
                    {isUploading ? 'Mengupload...' : 'Ganti Foto'}
                </Button>
                <p className="text-muted-foreground mt-1 text-xs">JPG, PNG, WebP. Maks 2MB.</p>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    )
}
