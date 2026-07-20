import { NextResponse } from 'next/server'
import { readSiteContent } from '@/lib/contentStore'
import { normalizeLanguage } from '@/lib/i18n'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = normalizeLanguage(searchParams.get('lang'))
  const content = await readSiteContent(lang)

  return NextResponse.json(content, {
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=300',
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'ngrok-skip-browser-warning, Bypass-Tunnel-Reminder',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
