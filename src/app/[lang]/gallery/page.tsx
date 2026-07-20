import GalleryClient from './GalleryClient'
import { readSiteContent } from '@/lib/contentStore'

export const dynamic = 'force-dynamic'

export default async function GalleryPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params
  const lang = (resolvedParams.lang || 'id') as 'id' | 'en'
  const initialContent = await readSiteContent(lang)

  return <GalleryClient initialContent={initialContent} />
}
