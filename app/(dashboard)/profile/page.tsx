import ProfileCard from '@/components/profile/profile-card'
import EditProfileForm from '@/components/profile/edit-profile-form'
import ChangePasswordForm from '@/components/profile/change-password-form'
import AvatarUpload from '@/components/profile/avatar-upload'
import { ExportReportButton } from '@/components/export/export-buttons'
import { getMyProfile } from '@/lib/actions/profile'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
    const user = await getMyProfile()
    if (!user) redirect('/login')

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-balance font-serif text-3xl font-medium">Profil Saya</h1>
                    <p className="text-muted-foreground mt-2">Kelola informasi pribadi kamu.</p>
                </div>
                <ExportReportButton />
            </div>

            {/* Avatar Upload */}
            <div className="rounded-(--radius) border p-6 md:p-8">
                <h2 className="mb-4 font-medium">Foto Profil</h2>
                <AvatarUpload name={user.name} avatarUrl={user.avatarUrl} />
            </div>

            {/* Current Profile */}
            <ProfileCard user={user} />

            {/* Edit Form */}
            <EditProfileForm user={{ name: user.name, email: user.email, class: user.class }} />

            {/* Change Password */}
            <ChangePasswordForm />
        </div>
    )
}
