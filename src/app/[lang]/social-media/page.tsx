import { readSiteContent } from '@/lib/contentStore'
import { normalizeLanguage } from '@/lib/i18n'
import SocialMediaClient from './SocialMediaClient'

export const dynamic = 'force-dynamic'

export default async function SocialMediaPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params
  const lang = normalizeLanguage(resolvedParams.lang)
  const content = await readSiteContent(lang)

  return <SocialMediaClient initialContent={content} />
}
