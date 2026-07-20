export type NewsArticle = {
  id: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  image: string
  featured: boolean
}

export type GalleryItem = {
  id: string
  src: string
  images?: string[]
  category: 'Academics' | 'Events' | 'Sports' | 'Campus'
  title: string
  aspect: string
}

export type SiteContent = {
  pages: Record<PageKey, PageConfig>
  news: NewsArticle[]
  gallery: GalleryItem[]
  academicPages: Record<AcademicLevelKey, AcademicPageContent>
  academicExtracurriculars: AcademicExtracurriculars
  achievements: AchievementItem[]
  facilities: FacilityItem[]
  careerOpenings: CareerOpening[]
  socialPosts: SocialPost[]
  testimonials: TestimonialItem[]
  alumniDestinations: AlumniDestination[]
  contactInfo: ContactInfo
  footer: FooterConfig
  globalConfig: GlobalConfig
  updatedAt: string
}

export type AcademicLevelKey = 'preschool' | 'primary' | 'secondary'

export type PageKey = 'home' | 'about' | 'admission' | 'career' | 'facilities' | 'gallery' | 'news' | 'achievements' | 'social' | 'contact' | 'terms'

export type PageConfig = {
  id: string
  heroTitle: string
  heroSubtitle: string
  heroBgImage: string
  heroBgImages?: string[]
  heroVideo?: string
  introText: string
  legalContent?: string
  
  // --- Home Sections ---
  coreValues?: {
    title: string
    subtitle: string
    items: { letter: string; word: string; desc: string }[]
  }
  curriculum?: {
    label: string
    title: string
    desc: string
    images?: string[]
    cards: { title: string; desc: string }[]
  }
  cta?: {
    title: string
    desc: string
    buttonText: string
    buttonLink?: string
    phoneText?: string
  }
  testimonialsSection?: {
    label: string
    title: string
    desc: string
    videos?: { url: string; thumbnail?: string }[]
  }
  alumniSection?: {
    label: string
    title: string
    desc: string
  }

  // --- About Sections ---
  sambutan?: {
    image: string
    quote: string
    descParagraphs: string[]
    name: string
    role: string
  }
  visionMission?: {
    visionLabel: string
    visionTitle: string
    visionDesc: string
    missionLabel: string
    missionTitle: string
    missionItems: string[]
  }
  timelineSection?: {
    label: string
    title: string
    desc: string
    items: { year: string; title: string; desc: string }[]
  }

  // --- Admission Sections ---
  programsSection?: {
    label: string
    title: string
    desc: string
    items: { id: string; name: string; age: string; fee: string; period: string; icon: string }[]
  }
  timelineAdmission?: {
    label: string
    title: string
    desc: string
    items: { phase: string; date: string; status: string }[]
  }
  requirementsSection?: {
    label: string
    title: string
    desc: string
    items: string[]
  }

  // --- Career Sections ---
  valuesSection?: {
    items: { icon: string; title: string; text: string }[]
  }
  openingsSection?: {
    label: string
    title: string
    desc: string
  }
}

export type AcademicExtracurricularItem = {
  id: string
  name: string
  desc: string
  image: string
}

export type AcademicExtracurriculars = Record<AcademicLevelKey, AcademicExtracurricularItem[]>

export type AcademicPageContent = {
  id: string
  name: string
  title: string
  desc: string
  age: string
  principalName: string
  principalRole: string
  principalMessage: string
  principalImage: string
  bgImage: string
  bgImages?: string[]
  highlightImage: string
  focusDesc?: string
  highlights?: { icon: string; text: string }[]
  philosophySections?: { title: string; desc: string; image: string }[]
  secondaryPrograms?: { id: string; title: string; desc: string; points: string[]; icon: string }[]
}

export type AchievementItem = {
  id: string
  title: string
  year: number
  category: string
  student: string
  class: string
  level: string
  medal: string
  desc: string
  image: string
  featured: boolean
  featuredLabel: string
  featuredTeam: string
  featuredMentor: string
  studentImage: string
}

export type FacilityItem = {
  id: string
  title: string
  zone?: string
  image: string
  images?: string[]
  video?: string
  description?: string
}

export type CareerOpening = {
  id: string
  title: string
  team: string
  type: string
  postedDate?: string
  deadlineDate?: string
  description?: string
  requirements?: string[]
  responsibilities?: string[]
  applyEmail?: string
  applyAddress?: string
}

export type SocialPlatform = 'Instagram' | 'YouTube' | 'TikTok'

export type SocialPost = {
  id: string
  sourceUrl: string
  platform: SocialPlatform
  type: string
  title: string
  excerpt: string
  date: string
  image: string
  video: string
  objectPosition: string
  metric: string
  comments: string
}

export type TestimonialItem = {
  id: string
  text: string
  author: string
  role: string
  photo: string
}

export type AlumniDestination = {
  id: string
  name: string
  image: string
}

export type ContactInfo = {
  address: string
  phone: string
  email: string
  hours: string
  facebookUrl: string
  instagramUrl: string
  linkedinUrl: string
  youtubeUrl: string
  mapEmbedUrl: string
}

export type FooterConfig = {
  description: string
}

export type GlobalConfig = {
  headerLogo: string
  footerLogo: string
  activeMenus?: Record<string, boolean>
}
