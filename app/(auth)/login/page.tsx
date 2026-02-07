import Login from "@/components/login-1"

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ registered?: string; callbackUrl?: string }> }) {
  const params = await searchParams
  return <Login registered={params.registered} callbackUrl={params.callbackUrl} />
}
