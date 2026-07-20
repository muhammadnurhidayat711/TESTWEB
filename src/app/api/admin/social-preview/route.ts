import { NextResponse } from 'next/server'
import { getAdminKey, isAdminRequestAuthorized } from '@/lib/adminAuth'
import { fetchSocialMetadata } from '@/lib/socialMetadata'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  if (!getAdminKey()) {
    return NextResponse.json(
      { message: 'Set ADMIN_CONTENT_KEY before reading social metadata in production.' },
      { status: 503 },
    )
  }

  if (!isAdminRequestAuthorized(request)) {
    return NextResponse.json({ message: 'Kunci admin tidak cocok.' }, { status: 401 })
  }

  try {
    const body = await request.json() as { input?: string; url?: string }
    const metadata = await fetchSocialMetadata((body.input ?? body.url ?? '').trim())

    return NextResponse.json({ metadata })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Metadata media sosial gagal dibaca.' },
      { status: 400 },
    )
  }
}
