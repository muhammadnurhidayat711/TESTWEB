import { notFound } from 'next/navigation'
import AcademicLevelClient from './AcademicLevelClient'
import { readSiteContent } from '@/lib/contentStore'
import { normalizeLanguage } from '@/lib/i18n'

const levels = ['preschool', 'primary', 'secondary'] as const

export const dynamic = 'force-dynamic'
export const dynamicParams = false

export function generateStaticParams() {
  return levels.map((level) => ({ level }))
}

export default async function AcademicLevelPage({
  params,
}: {
  params: Promise<{ level: string, lang: string }>
}) {
  const { level, lang } = await params
  const currentLang = normalizeLanguage(lang)

  if (!levels.includes(level as (typeof levels)[number])) {
    notFound()
  }

  const content = await readSiteContent(currentLang)

  return <AcademicLevelClient level={level} academicExtracurriculars={content.academicExtracurriculars} academicPages={content.academicPages} />
}
