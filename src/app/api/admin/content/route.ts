import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getAdminKey, getAdminKeyStatus, isAdminRequestAuthorized } from '@/lib/adminAuth'
import { readSiteContent, writeSiteContent } from '@/lib/contentStore'
import { normalizeLanguage } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

function missingKeyResponse() {
  return NextResponse.json(
    { message: 'Set ADMIN_CONTENT_KEY before using admin content updates in production.' },
    { status: 503 },
  )
}

function unauthorizedResponse() {
  return NextResponse.json({ message: 'Kunci admin tidak cocok.' }, { status: 401 })
}

export async function GET(request: Request) {
  if (!getAdminKey()) {
    return missingKeyResponse()
  }

  if (!isAdminRequestAuthorized(request)) {
    return unauthorizedResponse()
  }

  const { searchParams } = new URL(request.url)
  const lang = normalizeLanguage(searchParams.get('lang'))

  return NextResponse.json({
    content: await readSiteContent(lang),
    keyStatus: getAdminKeyStatus(),
  })
}

export async function PUT(request: Request) {
  if (!getAdminKey()) {
    return missingKeyResponse()
  }

  if (!isAdminRequestAuthorized(request)) {
    return unauthorizedResponse()
  }

  const { searchParams } = new URL(request.url)
  const lang = normalizeLanguage(searchParams.get('lang'))

  try {
    const content = await writeSiteContent(lang, await request.json())
    revalidatePath('/', 'layout')
    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ message: 'Konten tidak dapat disimpan.' }, { status: 400 })
  }
}
