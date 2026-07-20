import 'server-only'

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { getDefaultSiteContent } from '@/data/contentDefaults'
import { normalizeLanguage, type SupportedLanguage } from '@/lib/i18n'
import type {
  AchievementItem,
  AcademicExtracurricularItem,
  AcademicExtracurriculars,
  AcademicLevelKey,
  AlumniDestination,
  CareerOpening,
  ContactInfo,
  FacilityItem,
  GalleryItem,
  NewsArticle,
  SocialPost,
  SiteContent,
  TestimonialItem,
  AcademicPageContent,
  PageKey,
  PageConfig,
  FooterConfig,
  GlobalConfig,
} from '@/types/siteContent'

const contentDirectory = path.join(process.cwd(), 'content')
const contentFile = path.join(contentDirectory, 'site-content.json')

const galleryCategories = new Set<GalleryItem['category']>([
  'Academics',
  'Events',
  'Sports',
  'Campus',
])
const socialPlatforms = new Set(['Instagram', 'YouTube', 'TikTok'])
const academicLevels: AcademicLevelKey[] = ['preschool', 'primary', 'secondary']
const pageKeys: PageKey[] = ['home', 'about', 'admission', 'career', 'facilities', 'gallery', 'news', 'achievements', 'social', 'contact', 'terms']

function cloneDefaults(lang: SupportedLanguage = 'id') {
  return getCachedDefaults(lang)
}

function asText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeArticle(value: unknown, index: number): NewsArticle | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const article = value as Partial<NewsArticle>
  const title = asText(article.title)
  const excerpt = asText(article.excerpt)
  const category = asText(article.category)
  const date = asText(article.date)
  const author = asText(article.author)
  const image = asText(article.image)

  if (!title || !excerpt || !category || !date || !author || !image) {
    return null
  }

  return {
    id: asText(article.id) || `article-${index + 1}`,
    title,
    excerpt,
    category,
    date,
    author,
    image,
    featured: Boolean(article.featured),
  }
}

function normalizeGalleryItem(value: unknown, index: number): GalleryItem | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const item = value as Partial<GalleryItem>
  const title = asText(item.title)
  const src = asText(item.src)
  const category = asText(item.category) as GalleryItem['category']
  const aspect = asText(item.aspect)

  const images = Array.isArray(item.images)
    ? item.images.map(asText).filter(Boolean)
    : []

  if (!title || (!src && images.length === 0) || !galleryCategories.has(category)) {
    return null
  }

  return {
    id: asText(item.id) || `gallery-${index + 1}`,
    src: src || images[0] || '',
    images: images.length > 0 ? images : undefined,
    category,
    title,
    aspect: aspect || 'aspect-[4/3]',
  }
}

function normalizeAcademicExtracurricularItem(value: unknown, level: AcademicLevelKey, index: number): AcademicExtracurricularItem | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const item = value as Partial<AcademicExtracurricularItem>
  const name = asText(item.name)
  const desc = asText(item.desc)
  const image = asText(item.image)

  if (!name || !desc || !image) {
    return null
  }

  return {
    id: asText(item.id) || `${level}-extracurricular-${index + 1}`,
    name,
    desc,
    image,
  }
}

function normalizeAcademicExtracurriculars(value: unknown, lang: SupportedLanguage): AcademicExtracurriculars {
  const defaults = cloneDefaults(lang).academicExtracurriculars
  const result = { ...defaults }

  if (!value || typeof value !== 'object') {
    return result
  }

  const input = value as Partial<AcademicExtracurriculars>

  for (const level of academicLevels) {
    const items = input[level]
    const normalized = Array.isArray(items)
      ? items.map((item, index) => normalizeAcademicExtracurricularItem(item, level, index)).filter((item): item is AcademicExtracurricularItem => Boolean(item))
      : []

    result[level] = normalized.length > 0 ? normalized : defaults[level]
  }

  return result
}

function normalizePageConfig(value: unknown, key: PageKey, lang: SupportedLanguage): PageConfig {
  const defaults = cloneDefaults(lang).pages[key]
  if (!value || typeof value !== 'object') {
    return defaults
  }

  const page = value as Partial<PageConfig>
  const heroBgImage = asText(page.heroBgImage) || defaults.heroBgImage
  const heroBgImages = Array.isArray(page.heroBgImages)
    ? page.heroBgImages.map(asText).filter(Boolean)
    : []

  return {
    ...defaults,
    ...page,
    id: asText(page.id) || defaults.id,
    heroTitle: asText(page.heroTitle) || defaults.heroTitle,
    heroSubtitle: asText(page.heroSubtitle) || defaults.heroSubtitle,
    heroBgImage,
    heroBgImages: heroBgImages.length > 0 ? heroBgImages : defaults.heroBgImages || [heroBgImage],
    heroVideo: asText(page.heroVideo) || defaults.heroVideo || undefined,
    introText: asText(page.introText) || defaults.introText,
    legalContent: asText(page.legalContent) || defaults.legalContent,
  }
}

function normalizePages(value: unknown, lang: SupportedLanguage): Record<PageKey, PageConfig> {
  const defaults = cloneDefaults(lang).pages
  const result = { ...defaults }

  if (!value || typeof value !== 'object') {
    return result
  }

  const input = value as Record<string, unknown>
  for (const key of pageKeys) {
    result[key] = normalizePageConfig(input[key], key, lang)
  }

  return result
}

function normalizeAcademicPageContent(value: unknown, level: AcademicLevelKey, lang: SupportedLanguage): AcademicPageContent {
  const defaults = cloneDefaults(lang).academicPages[level]
  if (!value || typeof value !== 'object') {
    return defaults
  }

  const page = value as Partial<AcademicPageContent>
  const bgImage = asText(page.bgImage) || defaults.bgImage
  const bgImages = Array.isArray(page.bgImages)
    ? page.bgImages.map(asText).filter(Boolean)
    : []
  const secondaryPrograms = Array.isArray(page.secondaryPrograms)
    ? page.secondaryPrograms.map((program, index) => ({
        id: asText(program?.id) || `secondary-program-${index + 1}`,
        title: asText(program?.title),
        desc: asText(program?.desc),
        points: Array.isArray(program?.points) ? program.points.map(asText).filter(Boolean) : [],
        icon: asText(program?.icon) || 'BookOpen',
      })).filter((program) => program.title && program.desc)
    : []
  const philosophySections = Array.isArray(page.philosophySections)
    ? page.philosophySections.map((section, index) => {
        const defaultSection = defaults.philosophySections?.[index]
        return {
          title: asText(section?.title) || defaultSection?.title || '',
          desc: asText(section?.desc) || defaultSection?.desc || '',
          image: asText(section?.image) || defaultSection?.image || defaults.highlightImage,
        }
      }).filter((section) => section.title && section.desc && section.image)
    : []

  const normalizedPage: AcademicPageContent = {
    id: asText(page.id) || defaults.id,
    name: asText(page.name) || defaults.name,
    title: asText(page.title) || defaults.title,
    desc: asText(page.desc) || defaults.desc,
    age: asText(page.age) || defaults.age,
    principalName: asText(page.principalName) || defaults.principalName,
    principalRole: asText(page.principalRole) || defaults.principalRole,
    principalMessage: asText(page.principalMessage) || defaults.principalMessage,
    principalImage: asText(page.principalImage) || defaults.principalImage,
    bgImage,
    bgImages: bgImages.length > 0 ? bgImages : defaults.bgImages || [bgImage],
    highlightImage: asText(page.highlightImage) || defaults.highlightImage,
    focusDesc: asText(page.focusDesc) || defaults.focusDesc,
    highlights: Array.isArray(page.highlights) 
      ? page.highlights.map(h => ({
          icon: asText(h?.icon) || 'Star',
          text: asText(h?.text) || ''
        })).filter(h => h.text)
      : defaults.highlights || [],
    philosophySections: philosophySections.length > 0 ? philosophySections : defaults.philosophySections || [],
  }

  if (secondaryPrograms.length > 0) {
    normalizedPage.secondaryPrograms = secondaryPrograms
  }

  return normalizedPage
}

function normalizeAcademicPages(value: unknown, lang: SupportedLanguage): Record<AcademicLevelKey, AcademicPageContent> {
  const defaults = cloneDefaults(lang).academicPages
  const result = { ...defaults }

  if (!value || typeof value !== 'object') {
    return result
  }

  const input = value as Record<string, unknown>
  for (const level of academicLevels) {
    result[level] = normalizeAcademicPageContent(input[level], level, lang)
  }

  return result
}

function normalizeAchievement(value: unknown, index: number): AchievementItem | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const achievement = value as Partial<AchievementItem>
  const title = asText(achievement.title)
  const category = asText(achievement.category)
  const student = asText(achievement.student)
  const studentClass = asText(achievement.class)
  const level = asText(achievement.level)
  const desc = asText(achievement.desc)
  const image = asText(achievement.image)
  const year = Number(achievement.year)

  if (!title || !category || !student || !studentClass || !level || !desc || !image || !Number.isInteger(year)) {
    return null
  }

  return {
    id: asText(achievement.id) || `achievement-${index + 1}`,
    title,
    year,
    category,
    student,
    class: studentClass,
    level,
    medal: asText(achievement.medal) || 'gold',
    desc,
    image,
    featured: Boolean(achievement.featured),
    featuredLabel: asText(achievement.featuredLabel),
    featuredTeam: asText(achievement.featuredTeam),
    featuredMentor: asText(achievement.featuredMentor),
    studentImage: asText(achievement.studentImage),
  }
}

function normalizeFacility(value: unknown, index: number): FacilityItem | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const facility = value as Partial<FacilityItem>
  const title = asText(facility.title)
  const zone = asText(facility.zone)
  const image = asText(facility.image)
  const rawImages = Array.isArray(facility.images)
    ? facility.images.map(asText).filter(Boolean)
    : []
  const images = Array.from(new Set([image, ...rawImages].filter(Boolean)))

  if (!title || (!image && images.length === 0)) {
    return null
  }

  return {
    id: asText(facility.id) || `facility-${index + 1}`,
    title,
    zone: zone || undefined,
    image: images[0] || '',
    images: images.length > 0 ? images : undefined,
    video: asText(facility.video) || undefined,
    description: asText(facility.description) || undefined,
  }
}

function normalizeCareerOpening(value: unknown, index: number): CareerOpening | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const opening = value as Partial<CareerOpening>
  const title = asText(opening.title)
  const team = asText(opening.team)
  const type = asText(opening.type)

  if (!title || !team || !type) {
    return null
  }

  return {
    id: asText(opening.id) || `opening-${index + 1}`,
    title,
    team,
    type,
    postedDate: asText(opening.postedDate),
    deadlineDate: asText(opening.deadlineDate),
    description: asText(opening.description),
    requirements: Array.isArray(opening.requirements) ? opening.requirements.map(asText) : [],
    responsibilities: Array.isArray(opening.responsibilities) ? opening.responsibilities.map(asText) : [],
    applyEmail: asText(opening.applyEmail),
    applyAddress: asText(opening.applyAddress),
  }
}

function normalizeSocialPost(value: unknown, index: number): SocialPost | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const post = value as Partial<SocialPost>
  const platform = asText(post.platform) as SocialPost['platform']
  const type = asText(post.type)
  const title = asText(post.title)
  const excerpt = asText(post.excerpt)
  const date = asText(post.date)
  const image = asText(post.image)
  const video = asText(post.video)
  const sourceUrl = asText(post.sourceUrl) || video

  if (!sourceUrl || !socialPlatforms.has(platform) || !type || !title || !excerpt || !date || !image || !video) {
    return null
  }

  return {
    id: asText(post.id) || `social-${index + 1}`,
    sourceUrl,
    platform,
    type,
    title,
    excerpt,
    date,
    image,
    video,
    objectPosition: asText(post.objectPosition) || 'center',
    metric: asText(post.metric),
    comments: asText(post.comments),
  }
}

function normalizeTestimonial(value: unknown, index: number): TestimonialItem | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const testimonial = value as Partial<TestimonialItem>
  const text = asText(testimonial.text)
  const author = asText(testimonial.author)
  const role = asText(testimonial.role)

  if (!text || !author || !role) {
    return null
  }

  return {
    id: asText(testimonial.id) || `testimonial-${index + 1}`,
    text,
    author,
    role,
    photo: asText(testimonial.photo),
  }
}

function normalizeAlumniDestination(value: unknown, index: number): AlumniDestination | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const destination = value as Partial<AlumniDestination>
  const name = asText(destination.name)

  if (!name) {
    return null
  }

  return {
    id: asText(destination.id) || `alumni-destination-${index + 1}`,
    name,
    image: asText(destination.image),
  }
}

function normalizeContactInfo(value: unknown, lang: SupportedLanguage): ContactInfo {
  const defaults = cloneDefaults(lang).contactInfo

  if (!value || typeof value !== 'object') {
    return defaults
  }

  const contact = value as Partial<ContactInfo>
  const optionalText = (field: keyof ContactInfo) => typeof contact[field] === 'string'
    ? contact[field].trim()
    : defaults[field]
  const mapEmbedInput = asText(contact.mapEmbedUrl)
  const iframeSource = mapEmbedInput.match(/src=(["'])(.*?)\1/i)?.[2]
  const mapEmbedUrl = (iframeSource || mapEmbedInput).replaceAll('&amp;', '&').trim()

  return {
    address: asText(contact.address) || defaults.address,
    phone: asText(contact.phone) || defaults.phone,
    email: asText(contact.email) || defaults.email,
    hours: asText(contact.hours) || defaults.hours,
    facebookUrl: optionalText('facebookUrl'),
    instagramUrl: optionalText('instagramUrl'),
    linkedinUrl: optionalText('linkedinUrl'),
    youtubeUrl: optionalText('youtubeUrl'),
    mapEmbedUrl: mapEmbedUrl || defaults.mapEmbedUrl,
  }
}

function normalizeFooterConfig(value: unknown, lang: SupportedLanguage): FooterConfig {
  const defaults = cloneDefaults(lang).footer
  if (!value || typeof value !== 'object') {
    return defaults
  }
  const config = value as Partial<FooterConfig>
  return {
    description: asText(config.description) || defaults.description,
  }
}

function normalizeGlobalConfig(value: unknown, lang: SupportedLanguage): GlobalConfig {
  const defaults = cloneDefaults(lang).globalConfig
  if (!value || typeof value !== 'object') {
    return defaults
  }
  const config = value as Partial<GlobalConfig>
  return {
    headerLogo: asText(config.headerLogo) || defaults.headerLogo,
    footerLogo: asText(config.footerLogo) || defaults.footerLogo,
    activeMenus: config.activeMenus && typeof config.activeMenus === 'object' ? config.activeMenus : defaults.activeMenus,
  }
}

export function normalizeSiteContent(value: unknown, rawLang: SupportedLanguage = 'id'): SiteContent {
  const lang = normalizeLanguage(rawLang)

  if (!value || typeof value !== 'object') {
    return cloneDefaults(lang)
  }

  const content = value as Partial<SiteContent>
  const news = Array.isArray(content.news)
    ? content.news.map(normalizeArticle).filter((item): item is NewsArticle => Boolean(item))
    : []
  const gallery = Array.isArray(content.gallery)
    ? content.gallery.map(normalizeGalleryItem).filter((item): item is GalleryItem => Boolean(item))
    : []
  const academicPages = normalizeAcademicPages(content.academicPages, lang)
  const academicExtracurriculars = normalizeAcademicExtracurriculars(content.academicExtracurriculars, lang)
  const achievements = Array.isArray(content.achievements)
    ? content.achievements.map(normalizeAchievement).filter((item): item is AchievementItem => Boolean(item))
    : []
  const facilities = Array.isArray(content.facilities)
    ? content.facilities.map(normalizeFacility).filter((item): item is FacilityItem => Boolean(item))
    : []
  const careerOpenings = Array.isArray(content.careerOpenings)
    ? content.careerOpenings.map(normalizeCareerOpening).filter((item): item is CareerOpening => Boolean(item))
    : []
  const socialPosts = Array.isArray(content.socialPosts)
    ? content.socialPosts.map(normalizeSocialPost).filter((item): item is SocialPost => Boolean(item))
    : []
  const testimonials = Array.isArray(content.testimonials)
    ? content.testimonials.map(normalizeTestimonial).filter((item): item is TestimonialItem => Boolean(item))
    : []
  const alumniDestinations = Array.isArray(content.alumniDestinations)
    ? content.alumniDestinations.map(normalizeAlumniDestination).filter((item): item is AlumniDestination => Boolean(item))
    : []

  const pages = normalizePages(content.pages, lang)

  return {
    pages,
    news: Array.isArray(content.news) ? news : cloneDefaults(lang).news,
    gallery: Array.isArray(content.gallery) ? gallery : cloneDefaults(lang).gallery,
    academicPages,
    academicExtracurriculars,
    achievements: Array.isArray(content.achievements) ? achievements : cloneDefaults(lang).achievements,
    facilities: Array.isArray(content.facilities) ? facilities : cloneDefaults(lang).facilities,
    careerOpenings: Array.isArray(content.careerOpenings) ? careerOpenings : cloneDefaults(lang).careerOpenings,
    socialPosts: Array.isArray(content.socialPosts) ? socialPosts : cloneDefaults(lang).socialPosts,
    testimonials: Array.isArray(content.testimonials) ? testimonials : cloneDefaults(lang).testimonials,
    alumniDestinations: Array.isArray(content.alumniDestinations) ? alumniDestinations : cloneDefaults(lang).alumniDestinations,
    contactInfo: normalizeContactInfo(content.contactInfo, lang),
    footer: normalizeFooterConfig(content.footer, lang),
    globalConfig: normalizeGlobalConfig(content.globalConfig, lang),
    updatedAt: asText(content.updatedAt) || new Date().toISOString(),
  }
}

// In-memory cache with longer TTL — content rarely changes during a session
const contentCache = new Map<string, { data: SiteContent; timestamp: number }>()
const CACHE_TTL_MS = 60_000 // 60 seconds — avoids redundant disk reads + JSON parse on every request

// Cache the parsed raw JSON too, so we don't re-parse the 97KB file on every request
const rawJsonCache = new Map<string, { parsed: any; timestamp: number }>()
const RAW_CACHE_TTL_MS = 30_000 // 30 seconds for raw JSON cache

// Cache defaults objects so we don't deep-clone on every normalize call
const defaultsCache = new Map<string, SiteContent>()

function getCachedDefaults(lang: SupportedLanguage): SiteContent {
  const cached = defaultsCache.get(lang)
  if (cached) return cached
  const defaults = getDefaultSiteContent(lang)
  defaultsCache.set(lang, defaults)
  return defaults
}

export async function readSiteContent(rawLang: SupportedLanguage = 'id') {
  const lang = normalizeLanguage(rawLang)
  const cached = contentCache.get(lang)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data
  }

  try {
    // Use cached raw JSON if available and fresh
    let parsed: any
    const rawCached = rawJsonCache.get('content')
    if (rawCached && Date.now() - rawCached.timestamp < RAW_CACHE_TTL_MS) {
      parsed = rawCached.parsed
    } else {
      const rawContent = await readFile(contentFile, 'utf8')
      parsed = JSON.parse(rawContent)
      rawJsonCache.set('content', { parsed, timestamp: Date.now() })
    }
    
    // Auto-migrate if old structure (no 'id' property or missing bilingual structure)
    let result: SiteContent
    if (!parsed.id || !parsed.id.pages) {
      result = normalizeSiteContent(parsed, lang)
    } else {
      result = normalizeSiteContent(parsed[lang] || parsed.id, lang)
    }

    contentCache.set(lang, { data: result, timestamp: Date.now() })
    return result
  } catch {
    return getCachedDefaults(lang)
  }
}

/** Clear all caches after content write */
function invalidateCache() {
  contentCache.clear()
  rawJsonCache.clear()
  defaultsCache.clear()
}

export async function writeSiteContent(rawLang: SupportedLanguage, value: unknown) {
  const lang = normalizeLanguage(rawLang)
  const content = normalizeSiteContent(value, lang)
  const nextContent = {
    ...content,
    updatedAt: new Date().toISOString(),
  }

  let parsed: any = {}
  try {
    const rawContent = await readFile(contentFile, 'utf8')
    parsed = JSON.parse(rawContent)
    
    // Migrate to new bilingual structure if old structure is detected
    if (!parsed.id || !parsed.id.pages) {
      parsed = {
        id: parsed,
        en: cloneDefaults('en')
      }
    }
  } catch {
    parsed = {
      id: cloneDefaults('id'),
      en: cloneDefaults('en')
    }
  }

  parsed[lang] = nextContent

  // SINKRONISASI DUA ARAH (Bidirectional Structural Sync)
  // Patokan struktur (array length, penambahan/penghapusan) selalu di ID.
  // Tapi perubahan gambar/metadata struktural dari EN akan tersinkron ke ID ("begitu juga sebaliknya").
  if (parsed.id && parsed.en) {
    const syncCollections = [
      'news', 'gallery', 'achievements', 'facilities',
      'careerOpenings', 'socialPosts', 'testimonials', 'alumniDestinations'
    ]
    const localizedFieldsByCollection: Record<string, string[]> = {
      news: ['title', 'excerpt', 'category', 'author'],
      gallery: ['title'],
      achievements: ['title', 'category', 'student', 'class', 'level', 'desc', 'featuredLabel', 'featuredTeam', 'featuredMentor'],
      facilities: ['title'],
      careerOpenings: ['title', 'team', 'type', 'description', 'requirements', 'responsibilities', 'postedDate', 'deadlineDate'],
      socialPosts: ['type', 'title', 'excerpt', 'date', 'metric', 'comments'],
      testimonials: ['text', 'author', 'role'],
      alumniDestinations: [],
    }
    
    for (const key of syncCollections) {
      const idArray = parsed.id[key] || []
      const enArray = parsed.en[key] || []
      
      const idMap = new Map(idArray.map((i: any) => [i.id, i]))
      const enMap = new Map(enArray.map((i: any) => [i.id, i]))
      
      const idIds = idArray.map((i: any) => i.id)
      const enIds = enArray.map((i: any) => i.id)
      const masterIds = lang === 'en'
        ? Array.from(new Set([...idIds, ...enIds]))
        : idIds
      const localizedFields = localizedFieldsByCollection[key] || []
      
      parsed.id[key] = masterIds.map((id: string) => {
        const idItem: any = idMap.get(id) || {}
        const enItem: any = enMap.get(id) || {}
        // Struct base: if saved from EN, take EN's structural updates (like image). Else, take ID.
        const structBase = lang === 'en' ? { ...idItem, ...enItem } : { ...idItem }
        
        for (const field of localizedFields) {
          if (idItem[field] !== undefined) structBase[field] = idItem[field]
        }
        return structBase
      })
      
      parsed.en[key] = masterIds.map((id: string) => {
        const idItem: any = idMap.get(id) || {}
        const enItem: any = enMap.get(id) || {}
        const structBase: any = lang === 'en' ? { ...idItem, ...enItem } : { ...idItem }
        
        for (const field of localizedFields) {
          structBase[field] = (enItem[field] !== undefined && enItem[field] !== '') 
            ? enItem[field] 
            : (idItem[field] !== undefined ? idItem[field] : structBase[field])
        }
        return structBase
      })
    }

    // Sinkronisasi Extracurriculars
    if (!parsed.id.academicExtracurriculars) parsed.id.academicExtracurriculars = {}
    if (!parsed.en.academicExtracurriculars) parsed.en.academicExtracurriculars = {}
    
    for (const level of ['preschool', 'primary', 'secondary']) {
      const idArr = parsed.id.academicExtracurriculars[level] || []
      const enArr = parsed.en.academicExtracurriculars[level] || []
      
      const idMap = new Map(idArr.map((i: any) => [i.id, i]))
      const enMap = new Map(enArr.map((i: any) => [i.id, i]))
      const masterIds = idArr.map((i: any) => i.id)
      
      parsed.id.academicExtracurriculars[level] = masterIds.map((id: string) => {
        const idItem: any = idMap.get(id) || {}
        const enItem: any = enMap.get(id) || {}
        const structBase: any = lang === 'en' ? { ...idItem, ...enItem } : { ...idItem }
        if (idItem.name !== undefined) structBase.name = idItem.name
        if (idItem.desc !== undefined) structBase.desc = idItem.desc
        return structBase
      })
      
      parsed.en.academicExtracurriculars[level] = masterIds.map((id: string) => {
        const idItem: any = idMap.get(id) || {}
        const enItem: any = enMap.get(id) || {}
        const structBase: any = lang === 'en' ? { ...idItem, ...enItem } : { ...idItem }
        structBase.name = (enItem.name !== undefined && enItem.name !== '') ? enItem.name : (idItem.name || '')
        structBase.desc = (enItem.desc !== undefined && enItem.desc !== '') ? enItem.desc : (idItem.desc || '')
        return structBase
      })
    }

    // Sinkronisasi Objek Tunggal (Pages, AcademicPages, GlobalConfig)
    // 1. Pages (seperti heroBgImage)
    const pageKeys = ['home', 'about', 'admission', 'career', 'facilities', 'gallery', 'news', 'achievements', 'social', 'contact', 'terms']
    const pageLocalizedFields = [
      'heroTitle', 'heroSubtitle', 'introText', 'legalContent',
      'title', 'subtitle', 'desc', 'label', 'buttonText', 'phoneText',
      'quote', 'name', 'role',
      'visionLabel', 'visionTitle', 'visionDesc',
      'missionLabel', 'missionTitle', 'missionItems',
      'descParagraphs',
      'text', 'word', 'age', 'fee', 'period', 'phase', 'status', 'date',
    ]

    const localizedValue = (enValue: any, idValue: any, currentValue: any) => {
      if (Array.isArray(enValue)) return enValue.length > 0 ? enValue : (Array.isArray(idValue) ? idValue : currentValue)
      return enValue !== undefined && enValue !== '' ? enValue : (idValue !== undefined ? idValue : currentValue)
    }
    
    if (!parsed.id.pages) parsed.id.pages = {}
    if (!parsed.en.pages) parsed.en.pages = {}
    
    for (const pKey of pageKeys) {
      const pageKey = pKey as PageKey
      const idPage: any = parsed.id.pages[pKey] || cloneDefaults('id').pages[pageKey] || {}
      const enPage: any = parsed.en.pages[pKey] || cloneDefaults('en').pages[pageKey] || {}
      
      // Sinkronisasi Level 1 (Hero Image)
      const structBase: any = lang === 'en' ? { ...idPage, ...enPage } : { ...idPage }
      const newIdPage: any = { ...structBase }
      const newEnPage: any = { ...structBase }
      
      for (const f of pageLocalizedFields) {
        if (idPage[f] !== undefined) newIdPage[f] = idPage[f]
        newEnPage[f] = localizedValue(enPage[f], idPage[f], newEnPage[f])
      }
      
      // Sinkronisasi Level 2 (Sub-sections)
      const subSections = [
        'coreValues', 'curriculum', 'cta', 'testimonialsSection', 'alumniSection',
        'sambutan', 'visionMission', 'timelineSection',
        'programsSection', 'timelineAdmission', 'requirementsSection',
        'valuesSection', 'openingsSection',
      ]
      for (const section of subSections) {
        if (idPage[section] || enPage[section]) {
           const idSec: any = idPage[section] || {}
           const enSec: any = enPage[section] || {}
           const secStruct: any = lang === 'en' ? { ...idSec, ...enSec } : { ...idSec }
           const newIdSec: any = { ...secStruct }
           const newEnSec: any = { ...secStruct }
           
           for (const f of pageLocalizedFields) {
             if (idSec[f] !== undefined) newIdSec[f] = idSec[f]
             newEnSec[f] = localizedValue(enSec[f], idSec[f], newEnSec[f])
           }
           
           // Khusus items di dalam sub-sections (seperti coreValues.items)
           if (idSec.items) {
             newIdSec.items = idSec.items.map((item: any, idx: number) => {
                const eItem = enSec.items?.[idx] || {}
                if (!item || typeof item !== 'object') {
                  return item
                }
                const itemStruct = lang === 'en' ? { ...item, ...eItem } : { ...item }
                for (const f of pageLocalizedFields) {
                  if (item[f] !== undefined) itemStruct[f] = item[f]
                }
                return itemStruct
             })
             
             newEnSec.items = idSec.items.map((item: any, idx: number) => {
                const eItem = enSec.items?.[idx] || {}
                if (!item || typeof item !== 'object') {
                  return eItem !== undefined && eItem !== '' ? eItem : item
                }
                const itemStruct = lang === 'en' ? { ...item, ...eItem } : { ...item }
                for (const f of pageLocalizedFields) {
                  itemStruct[f] = localizedValue(eItem[f], item[f], itemStruct[f])
                }
                return itemStruct
             })
           }

           // Khusus videos di dalam testimonialsSection
           if (idSec.videos) {
             newIdSec.videos = idSec.videos.map((item: any, idx: number) => {
                const eItem = enSec.videos?.[idx] || {}
                return lang === 'en' ? { ...item, ...eItem } : { ...item }
             })
             newEnSec.videos = idSec.videos.map((item: any, idx: number) => {
                const eItem = enSec.videos?.[idx] || {}
                return lang === 'en' ? { ...item, ...eItem } : { ...item }
             })
           }
           
           if (idPage[section] || enPage[section]) newIdPage[section] = newIdSec
           if (idPage[section] || enPage[section]) newEnPage[section] = newEnSec
        }
      }
      
      parsed.id.pages[pKey] = newIdPage
      parsed.en.pages[pKey] = newEnPage
    }
    
    // 2. Academic Pages (bgImage, principalImage, highlightImage)
    const academicPageLocalizedFields = ['name', 'title', 'desc', 'age', 'principalName', 'principalRole', 'principalMessage', 'focusDesc']
    if (!parsed.id.academicPages) parsed.id.academicPages = {}
    if (!parsed.en.academicPages) parsed.en.academicPages = {}
    
    for (const level of ['preschool', 'primary', 'secondary']) {
      const idPage: any = parsed.id.academicPages[level] || {}
      const enPage: any = parsed.en.academicPages[level] || {}
      
      const structBase: any = lang === 'en' ? { ...idPage, ...enPage } : { ...idPage }
      const newIdPage: any = { ...structBase }
      const newEnPage: any = { ...structBase }
      
      for (const f of academicPageLocalizedFields) {
        if (idPage[f] !== undefined) newIdPage[f] = idPage[f]
        newEnPage[f] = (enPage[f] !== undefined && enPage[f] !== '') ? enPage[f] : (idPage[f] !== undefined ? idPage[f] : newEnPage[f])
      }
      
      // Highlights
      if (idPage.highlights) {
         newIdPage.highlights = idPage.highlights.map((item: any, idx: number) => {
            const eItem = enPage.highlights?.[idx] || {}
            const itemStruct = lang === 'en' ? { ...item, ...eItem } : { ...item }
            if (item.text !== undefined) itemStruct.text = item.text
            return itemStruct
         })
         newEnPage.highlights = idPage.highlights.map((item: any, idx: number) => {
            const eItem = enPage.highlights?.[idx] || {}
            const itemStruct = lang === 'en' ? { ...item, ...eItem } : { ...item }
            itemStruct.text = (eItem.text !== undefined && eItem.text !== '') ? eItem.text : (item.text || '')
            return itemStruct
         })
      }

      // Philosophy sections
      if (idPage.philosophySections || enPage.philosophySections) {
         const masterPhilosophySections = idPage.philosophySections || enPage.philosophySections || []
         newIdPage.philosophySections = masterPhilosophySections.map((item: any, idx: number) => {
            const eItem = enPage.philosophySections?.[idx] || {}
            const itemStruct = lang === 'en' ? { ...item, ...eItem } : { ...item }
            if (item.title !== undefined) itemStruct.title = item.title
            if (item.desc !== undefined) itemStruct.desc = item.desc
            return itemStruct
         })
         newEnPage.philosophySections = masterPhilosophySections.map((item: any, idx: number) => {
            const eItem = enPage.philosophySections?.[idx] || {}
            const itemStruct = lang === 'en' ? { ...item, ...eItem } : { ...item }
            itemStruct.title = (eItem.title !== undefined && eItem.title !== '') ? eItem.title : (item.title || '')
            itemStruct.desc = (eItem.desc !== undefined && eItem.desc !== '') ? eItem.desc : (item.desc || '')
            return itemStruct
         })
      }

      // Secondary programs
      if (idPage.secondaryPrograms) {
         newIdPage.secondaryPrograms = idPage.secondaryPrograms.map((item: any, idx: number) => {
            const eItem = enPage.secondaryPrograms?.[idx] || {}
            const itemStruct = lang === 'en' ? { ...item, ...eItem } : { ...item }
            if (item.title !== undefined) itemStruct.title = item.title
            if (item.desc !== undefined) itemStruct.desc = item.desc
            if (item.points !== undefined) itemStruct.points = item.points
            return itemStruct
         })
         newEnPage.secondaryPrograms = idPage.secondaryPrograms.map((item: any, idx: number) => {
            const eItem = enPage.secondaryPrograms?.[idx] || {}
            const itemStruct = lang === 'en' ? { ...item, ...eItem } : { ...item }
            itemStruct.title = (eItem.title !== undefined && eItem.title !== '') ? eItem.title : (item.title || '')
            itemStruct.desc = (eItem.desc !== undefined && eItem.desc !== '') ? eItem.desc : (item.desc || '')
            itemStruct.points = Array.isArray(eItem.points) && eItem.points.length > 0 ? eItem.points : (item.points || [])
            return itemStruct
         })
      }
      
      parsed.id.academicPages[level] = newIdPage
      parsed.en.academicPages[level] = newEnPage
    }

    // 3. GlobalConfig (headerLogo, footerLogo)
    if (!parsed.id.globalConfig) parsed.id.globalConfig = {}
    if (!parsed.en.globalConfig) parsed.en.globalConfig = {}
    const idGC = parsed.id.globalConfig
    const enGC = parsed.en.globalConfig
    parsed.id.globalConfig = lang === 'en' ? { ...idGC, ...enGC } : { ...idGC }
    parsed.en.globalConfig = lang === 'en' ? { ...idGC, ...enGC } : { ...idGC }

    // 4. ContactInfo
    // Map URL, phone, email, and social links are structural contact data and
    // should stay identical across ID/EN. Address and hours can remain localized.
    if (!parsed.id.contactInfo) parsed.id.contactInfo = {}
    if (!parsed.en.contactInfo) parsed.en.contactInfo = {}

    const idContact = parsed.id.contactInfo
    const enContact = parsed.en.contactInfo
    const contactStruct = lang === 'en' ? { ...idContact, ...enContact } : { ...idContact }
    const contactLocalizedFields = ['address', 'hours']
    const contactStructuralFields = [
      'phone',
      'email',
      'facebookUrl',
      'instagramUrl',
      'linkedinUrl',
      'youtubeUrl',
      'mapEmbedUrl',
    ]
    const newIdContact: any = { ...contactStruct }
    const newEnContact: any = { ...contactStruct }

    for (const field of contactStructuralFields) {
      const sourceValue = lang === 'en' ? enContact[field] : idContact[field]
      const fallbackValue = lang === 'en' ? idContact[field] : enContact[field]
      const value = sourceValue !== undefined && sourceValue !== '' ? sourceValue : fallbackValue
      if (value !== undefined) {
        newIdContact[field] = value
        newEnContact[field] = value
      }
    }

    for (const field of contactLocalizedFields) {
      if (idContact[field] !== undefined) newIdContact[field] = idContact[field]
      newEnContact[field] = (enContact[field] !== undefined && enContact[field] !== '')
        ? enContact[field]
        : (idContact[field] !== undefined ? idContact[field] : newEnContact[field])
    }

    parsed.id.contactInfo = newIdContact
    parsed.en.contactInfo = newEnContact
  }

  await mkdir(contentDirectory, { recursive: true })
  await writeFile(contentFile, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8')
  invalidateCache()

  return nextContent
}
