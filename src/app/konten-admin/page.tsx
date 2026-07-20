'use client'

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Contact,
  GraduationCap,
  ImagePlus,
  KeyRound,
  LayoutTemplate,
  LogOut,
  MessageSquareQuote,
  Newspaper,
  Pencil,
  Plus,
  Save,
  Share2,
  Trash2,
  Trophy,
  X,
} from 'lucide-react'
import { defaultSiteContent } from '@/data/contentDefaults'
import type {
  AchievementItem,
  AcademicExtracurricularItem,
  AcademicLevelKey,
  AcademicPageContent,
  AlumniDestination,
  CareerOpening,
  ContactInfo,
  FacilityItem,
  GalleryItem,
  NewsArticle,
  SiteContent,
  SocialPost,
  SocialPlatform,
  TestimonialItem,
  PageKey,
  PageConfig,
} from '@/types/siteContent'

const galleryCategoryOptions: GalleryItem['category'][] = [
  'Academics',
  'Events',
  'Sports',
  'Campus',
]

const academicLevelOptions: { value: AcademicLevelKey; label: string }[] = [
  { value: 'preschool', label: 'Preschool' },
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
]

const aspectOptions = [
  { value: 'aspect-[4/3]', label: 'Landscape 4:3' },
  { value: 'aspect-[16/9]', label: 'Wide 16:9' },
  { value: 'aspect-square', label: 'Square' },
  { value: 'aspect-[3/4]', label: 'Portrait 3:4' },
  { value: 'aspect-[2/3]', label: 'Portrait 2:3' },
]

const emptyNewsDraft: NewsArticle = {
  id: '',
  title: '',
  excerpt: '',
  category: 'Akademik',
  date: '',
  author: 'Tim Editorial',
  image: '',
  featured: false,
}

const emptyGalleryDraft: GalleryItem = {
  id: '',
  src: '',
  category: 'Academics',
  title: '',
  aspect: 'aspect-[4/3]',
}

const emptyAchievementDraft: AchievementItem = {
  id: '',
  title: '',
  year: new Date().getFullYear(),
  category: 'akademik',
  student: '',
  class: '',
  level: 'national',
  medal: 'gold',
  desc: '',
  image: '',
  featured: false,
  featuredLabel: '',
  featuredTeam: '',
  featuredMentor: '',
  studentImage: '',
}

const emptyFacilityDraft: FacilityItem = {
  id: '',
  title: '',
  zone: '',
  image: '',
  images: [],
  video: '',
  description: '',
}

const emptyOpeningDraft: CareerOpening = {
  id: '',
  title: '',
  team: '',
  type: 'Full Time',
  postedDate: '',
  deadlineDate: '',
  description: '',
  requirements: [],
  responsibilities: [],
  applyEmail: '',
  applyAddress: '',
}

const emptyAlumniDestinationDraft: AlumniDestination = {
  id: '',
  name: '',
  image: '',
}

const emptySocialDraft: SocialPost = {
  id: '',
  sourceUrl: '',
  platform: 'Instagram',
  type: 'Reels',
  title: '',
  excerpt: '',
  date: '',
  image: '',
  video: '',
  objectPosition: 'center',
  metric: '',
  comments: '',
}

const emptyTestimonialDraft: TestimonialItem = {
  id: '',
  text: '',
  author: '',
  role: '',
  photo: '',
}

const emptyPageDraft: PageConfig = {
  id: '',
  heroTitle: '',
  heroSubtitle: '',
  heroBgImage: '',
  heroVideo: '',
  introText: '',
  legalContent: '',
}

const emptyAcademicPageDraft: AcademicPageContent = {
  id: '',
  name: '',
  title: '',
  desc: '',
  age: '',
  principalName: '',
  principalRole: '',
  principalMessage: '',
  principalImage: '',
  bgImage: '',
  bgImages: [],
  highlightImage: '',
  philosophySections: [
    {
      title: 'Sekolah sebagai Rumah Bertumbuh',
      desc: 'Program pendidikan dirancang sebagai ekosistem yang aman, hangat, dan terarah agar setiap anak merasa dikenal, didampingi, dan percaya diri untuk bertumbuh.',
      image: '/images/hero-g.jpg',
    },
    {
      title: 'Guru sebagai Pendamping Belajar',
      desc: 'Guru hadir bukan hanya sebagai penyampai materi, tetapi sebagai fasilitator yang membaca kebutuhan siswa, membangun rasa ingin tahu, dan menuntun karakter melalui keseharian belajar.',
      image: '/images/hero-g.jpg',
    },
    {
      title: 'Tenaga Pengajar yang Saling Terhubung',
      desc: 'Setiap tenaga pengajar bekerja bersama dalam komunikasi yang konsisten sehingga perkembangan akademik, sosial, dan emosional siswa dipantau secara utuh.',
      image: '/images/hero-g.jpg',
    },
  ],
  secondaryPrograms: [
    {
      id: 'junior-high-school',
      title: 'Junior High School',
      desc: 'Membangun fondasi akademik menengah, kemandirian belajar, karakter, dan kemampuan berpikir kritis melalui pembelajaran aktif yang terarah.',
      points: ['Transisi belajar yang suportif', 'Penguatan literasi, numerasi, dan sains', 'Pembentukan karakter dan kolaborasi'],
      icon: 'BookOpen',
    },
    {
      id: 'senior-high-school',
      title: 'Senior High School',
      desc: 'Mempersiapkan siswa menuju perguruan tinggi dan masa depan global melalui pendampingan akademik, pengembangan portofolio, dan eksplorasi karier.',
      points: ['Persiapan universitas', 'Career guidance dan mentoring', 'Penguatan leadership dan global readiness'],
      icon: 'GraduationCap',
    },
  ],
}

const socialPlatformOptions: SocialPlatform[] = ['Instagram', 'YouTube', 'TikTok']
const iconOptions = ['Heart', 'Target', 'BookOpen', 'GraduationCap', 'Lightbulb', 'Globe', 'Brain', 'Users', 'Star', 'Shield', 'Award']

function newContentId(prefix: string) {
  const browserCrypto = globalThis.crypto

  if (typeof browserCrypto?.randomUUID === 'function') {
    return `${prefix}-${browserCrypto.randomUUID()}`
  }

  if (typeof browserCrypto?.getRandomValues === 'function') {
    const values = browserCrypto.getRandomValues(new Uint32Array(2))
    return `${prefix}-${Date.now().toString(36)}-${Array.from(values, (value) => value.toString(36)).join('-')}`
  }

  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

function messageFromError(value: unknown) {
  return value instanceof Error ? value.message : 'Permintaan gagal diproses.'
}

function isUploadedImage(src: string) {
  return src.startsWith('/uploads/')
}

function isVideoSource(src: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src)
}

export default function ContentAdminPage() {
  const [adminKey, setAdminKey] = useState('')
  const [keyInput, setKeyInput] = useState('')
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)
  const [newsDraft, setNewsDraft] = useState<NewsArticle>(emptyNewsDraft)
  const [galleryDraft, setGalleryDraft] = useState<GalleryItem>(emptyGalleryDraft)
  const [achievementDraft, setAchievementDraft] = useState<AchievementItem>(emptyAchievementDraft)
  const [facilityDraft, setFacilityDraft] = useState<FacilityItem>(emptyFacilityDraft)
  const [openingDraft, setOpeningDraft] = useState<CareerOpening>(emptyOpeningDraft)
  const [alumniDestinationDraft, setAlumniDestinationDraft] = useState<AlumniDestination>(emptyAlumniDestinationDraft)
  const [socialDraft, setSocialDraft] = useState<SocialPost>(emptySocialDraft)
  const [testimonialDraft, setTestimonialDraft] = useState<TestimonialItem>(emptyTestimonialDraft)
  const [academicPageDraft, setAcademicPageDraft] = useState<AcademicPageContent>(emptyAcademicPageDraft)
  const [pageDraft, setPageDraft] = useState<PageConfig>(emptyPageDraft)
  const [contactDraft, setContactDraft] = useState<ContactInfo>(defaultSiteContent.contactInfo)
  const [footerDraft, setFooterDraft] = useState(defaultSiteContent.footer || { description: '' })
  const [globalConfigDraft, setGlobalConfigDraft] = useState(defaultSiteContent.globalConfig || { headerLogo: '/images/logo.png', footerLogo: '' })
  const [activePanel, setActivePanel] = useState<'pages' | 'news' | 'gallery' | 'academic-pages' | 'academic-extracurriculars' | 'achievements' | 'facilities' | 'career' | 'social' | 'testimonials' | 'alumni' | 'contact' | 'footer'>('pages')
  const [activeAcademicLevel, setActiveAcademicLevel] = useState<AcademicLevelKey>('preschool')
  const [activePageKey, setActivePageKey] = useState<PageKey>('home')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [socialPreviewLoading, setSocialPreviewLoading] = useState(false)
  const [socialManualEntry, setSocialManualEntry] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [editLang, setEditLang] = useState<'id' | 'en'>('id')

  const featuredNews = useMemo(
    () => content.news.find((article) => article.featured),
    [content.news],
  )

  useEffect(() => {
    const storedKey = window.sessionStorage.getItem('pelita-admin-key')

    if (!storedKey) {
      setLoading(false)
      return
    }

    setAdminKey(storedKey)
    setKeyInput(storedKey)
    void loadContent(storedKey, editLang)
  }, [editLang])

  async function readResponseMessage(response: Response) {
    const body = await response.json().catch(() => null) as { message?: string } | null
    return body?.message || 'Permintaan admin gagal.'
  }

  async function loadContent(key: string, lang: 'id' | 'en' = 'id') {
    setLoading(true)
    setNotice('')

    try {
      const response = await fetch(`/api/admin/content?lang=${lang}`, {
        headers: { 'x-admin-key': key },
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error(await readResponseMessage(response))
      }

      const data = await response.json() as { content: SiteContent }
      setContent(data.content)
      setContactDraft(data.content.contactInfo)
      if (data.content.footer) setFooterDraft(data.content.footer)
      if (data.content.globalConfig) setGlobalConfigDraft(data.content.globalConfig)
      setAuthenticated(true)
      setNotice('Konten siap dikelola.')
    } catch (error) {
      window.sessionStorage.removeItem('pelita-admin-key')
      setAuthenticated(false)
      setAdminKey('')
      setNotice(messageFromError(error))
    } finally {
      setLoading(false)
    }
  }

  async function persistContent(nextContent: SiteContent, successMessage: string) {
    setBusy(true)
    setNotice('')

    try {
      const response = await fetch(`/api/admin/content?lang=${editLang}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(nextContent),
      })

      if (!response.ok) {
        throw new Error(await readResponseMessage(response))
      }

      const data = await response.json() as { content: SiteContent }
      setContent(data.content)
      setContactDraft(data.content.contactInfo)
      if (data.content.footer) setFooterDraft(data.content.footer)
      if (data.content.globalConfig) setGlobalConfigDraft(data.content.globalConfig)
      window.dispatchEvent(new CustomEvent('pelita-content-updated', { detail: data.content }))
      setNotice(successMessage)
    } catch (error) {
      setNotice(messageFromError(error))
    } finally {
      setBusy(false)
    }
  }

  async function uploadMultipleGalleryImages(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || files.length === 0) return

    setBusy(true)
    setNotice(`Mengupload ${files.length} gambar...`)

    try {
      const urls: string[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('image', file)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'x-admin-key': adminKey },
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Gagal mengupload ${file.name}`)
        }

        const data = await response.json() as { url: string }
        urls.push(data.url)
      }

      setGalleryDraft((draft) => {
        const currentImages = draft.images || (draft.src ? [draft.src] : [])
        const newImages = [...currentImages, ...urls]
        // Ensure uniqueness just in case
        const uniqueImages = Array.from(new Set(newImages))
        
        return {
          ...draft,
          images: uniqueImages,
          src: draft.src || uniqueImages[0] || '',
          title: draft.title || (files[0].name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase())),
        }
      })
      
      setNotice(`${files.length} gambar berhasil diupload. Simpan item untuk menerbitkannya.`)
      event.target.value = ''
    } catch (error) {
      setNotice(messageFromError(error))
    } finally {
      setBusy(false)
    }
  }

  async function uploadMultipleFacilityImages(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (!files || files.length === 0) return

    setBusy(true)
    setNotice(`Mengupload ${files.length} gambar fasilitas...`)

    try {
      const urls: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('image', file)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'x-admin-key': adminKey },
          body: formData,
        })

        if (!response.ok) {
          throw new Error(await readResponseMessage(response))
        }

        const data = await response.json() as { url: string }
        urls.push(data.url)
      }

      setFacilityDraft((draft) => {
        const currentImages = draft.images && draft.images.length > 0
          ? draft.images
          : draft.image
            ? [draft.image]
            : []
        const nextImages = Array.from(new Set([...currentImages, ...urls]))

        return {
          ...draft,
          image: draft.image || nextImages[0] || '',
          images: nextImages,
        }
      })

      setNotice(`${urls.length} gambar fasilitas berhasil diupload. Simpan fasilitas untuk menerbitkannya.`)
    } catch (error) {
      setNotice(messageFromError(error))
    } finally {
      event.target.value = ''
      setBusy(false)
    }
  }

  async function uploadImage(
    event: ChangeEvent<HTMLInputElement>,
    target: 'news' | 'gallery' | 'achievement' | 'achievement-student' | 'facility' | 'facility-video' | 'social' | 'testimonial' | 'alumni' | 'academic-page-bg' | 'academic-page-highlight' | 'page-bg' | 'page-sambutan' | 'page-curriculum' | 'global-header-logo' | 'global-footer-logo' | 'page-hero-video',
  ) {
    const image = event.target.files?.[0]

    if (!image) {
      return
    }

    setBusy(true)
    setNotice('')

    try {
      const formData = new FormData()
      formData.append('image', image)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-key': adminKey },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(await readResponseMessage(response))
      }

      const data = await response.json() as { url: string }

      if (target === 'news') {
        setNewsDraft((draft) => ({ ...draft, image: data.url }))
      } else if (target === 'gallery') {
        setGalleryDraft((draft) => ({ ...draft, src: data.url }))
      } else if (target === 'achievement') {
        setAchievementDraft((draft) => ({ ...draft, image: data.url }))
      } else if (target === 'achievement-student') {
        setAchievementDraft((draft) => ({ ...draft, studentImage: data.url }))
      } else if (target === 'social') {
        setSocialDraft((draft) => ({ ...draft, image: data.url }))
      } else if (target === 'testimonial') {
        setTestimonialDraft((draft) => ({ ...draft, photo: data.url }))
      } else if (target === 'alumni') {
        setAlumniDestinationDraft((draft) => ({ ...draft, image: data.url }))
      } else if (target === 'academic-page-bg') {
        setAcademicPageDraft((draft) => ({ ...draft, bgImage: data.url }))
      } else if (target === 'academic-page-highlight') {
        setAcademicPageDraft((draft) => ({ ...draft, highlightImage: data.url }))
      } else if (target === 'page-bg') {
        setPageDraft((draft) => ({ ...draft, heroBgImage: data.url }))
      } else if (target === 'page-hero-video') {
        setPageDraft((draft) => ({ ...draft, heroVideo: data.url }))
      } else if (target === 'facility-video') {
        setFacilityDraft((draft) => ({ ...draft, video: data.url }))
      } else if (target === 'page-sambutan') {
        setPageDraft((draft) => ({ ...draft, sambutan: { ...(draft.sambutan || defaultSiteContent.pages.about.sambutan!), image: data.url } }))
      } else if (target === 'page-curriculum') {
        setPageDraft((draft) => ({ ...draft, curriculum: { ...(draft.curriculum || defaultSiteContent.pages.home.curriculum!), images: [...(draft.curriculum?.images || []), data.url] } }))
      } else if (target === 'global-header-logo') {
        setGlobalConfigDraft((draft) => ({ ...draft, headerLogo: data.url }))
      } else if (target === 'global-footer-logo') {
        setGlobalConfigDraft((draft) => ({ ...draft, footerLogo: data.url }))
      } else {
        setFacilityDraft((draft) => {
          const currentImages = draft.images && draft.images.length > 0
            ? draft.images
            : draft.image
              ? [draft.image]
              : []
          const nextImages = Array.from(new Set([...currentImages, data.url]))

          return {
            ...draft,
            image: data.url,
            images: nextImages,
          }
        })
      }

      setNotice('File berhasil diupload. Simpan item untuk menerbitkannya.')
    } catch (error) {
      setNotice(messageFromError(error))
    } finally {
      event.target.value = ''
      setBusy(false)
    }
  }

  async function uploadPageHeroBackgrounds(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || [])

    if (files.length === 0) {
      return
    }

    setBusy(true)
    setNotice('')

    try {
      const uploadedUrls: string[] = []

      for (const image of files) {
        const formData = new FormData()
        formData.append('image', image)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'x-admin-key': adminKey },
          body: formData,
        })

        if (!response.ok) {
          throw new Error(await readResponseMessage(response))
        }

        const data = await response.json() as { url: string }
        uploadedUrls.push(data.url)
      }

      setPageDraft((draft) => {
        const currentImages = draft.heroBgImages && draft.heroBgImages.length > 0
          ? draft.heroBgImages
          : draft.heroBgImage
            ? [draft.heroBgImage]
            : []
        const nextImages = [...currentImages, ...uploadedUrls]

        return {
          ...draft,
          heroBgImage: nextImages[0] || draft.heroBgImage,
          heroBgImages: nextImages,
        }
      })
      setNotice(`${uploadedUrls.length} gambar background berhasil diupload. Simpan halaman untuk menerbitkannya.`)
    } catch (error) {
      setNotice(messageFromError(error))
    } finally {
      event.target.value = ''
      setBusy(false)
    }
  }

  async function uploadAcademicHeroBackgrounds(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || [])

    if (files.length === 0) {
      return
    }

    setBusy(true)
    setNotice('')

    try {
      const uploadedUrls: string[] = []

      for (const image of files) {
        const formData = new FormData()
        formData.append('image', image)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'x-admin-key': adminKey },
          body: formData,
        })

        if (!response.ok) {
          throw new Error(await readResponseMessage(response))
        }

        const data = await response.json() as { url: string }
        uploadedUrls.push(data.url)
      }

      setAcademicPageDraft((draft) => {
        const currentImages = draft.bgImages && draft.bgImages.length > 0
          ? draft.bgImages
          : draft.bgImage
            ? [draft.bgImage]
            : []
        const nextImages = [...currentImages, ...uploadedUrls]

        return {
          ...draft,
          bgImage: nextImages[0] || draft.bgImage,
          bgImages: nextImages,
        }
      })
      setNotice(`${uploadedUrls.length} gambar background akademik berhasil diupload. Simpan halaman untuk menerbitkannya.`)
    } catch (error) {
      setNotice(messageFromError(error))
    } finally {
      event.target.value = ''
      setBusy(false)
    }
  }

  async function uploadAcademicPhilosophyImage(event: ChangeEvent<HTMLInputElement>, index: number) {
    const image = event.target.files?.[0]

    if (!image) {
      return
    }

    setBusy(true)
    setNotice('')

    try {
      const formData = new FormData()
      formData.append('image', image)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-key': adminKey },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(await readResponseMessage(response))
      }

      const data = await response.json() as { url: string }
      setAcademicPageDraft((draft) => {
        const sections = [...(draft.philosophySections || emptyAcademicPageDraft.philosophySections || [])]
        const current = sections[index] || { title: '', desc: '', image: '' }
        sections[index] = { ...current, image: data.url }
        return { ...draft, philosophySections: sections }
      })
      setNotice('Gambar filosofi berhasil diupload. Simpan Info Akademik untuk menerbitkannya.')
    } catch (error) {
      setNotice(messageFromError(error))
    } finally {
      event.target.value = ''
      setBusy(false)
    }
  }

  async function uploadTestimonialVideoSection(
    event: ChangeEvent<HTMLInputElement>,
    idx: number
  ) {
    const video = event.target.files?.[0]

    if (!video) {
      return
    }

    setBusy(true)
    setNotice('')

    try {
      const formData = new FormData()
      formData.append('image', video)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-key': adminKey },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Gagal mengupload video`)
      }

      const data = await response.json()
      
      const newVideos = [...(pageDraft.testimonialsSection?.videos || [])]
      newVideos[idx] = { ...newVideos[idx], url: data.url }
      setPageDraft((d) => ({
        ...d,
        testimonialsSection: {
          ...(d.testimonialsSection || defaultSiteContent.pages.home.testimonialsSection!),
          videos: newVideos
        }
      }))

      setNotice('Video berhasil diupload. Klik Simpan Halaman untuk menerbitkan.')
    } catch (error) {
      setNotice(messageFromError(error))
    } finally {
      event.target.value = ''
      setBusy(false)
    }
  }

  async function uploadAcademicExtracurricularImage(
    event: ChangeEvent<HTMLInputElement>,
    level: AcademicLevelKey,
    itemId: string,
  ) {
    const image = event.target.files?.[0]

    if (!image) {
      return
    }

    setBusy(true)
    setNotice('')

    try {
      const formData = new FormData()
      formData.append('image', image)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-key': adminKey },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(await readResponseMessage(response))
      }

      const data = await response.json() as { url: string }
      updateAcademicExtracurricular(level, itemId, { image: data.url })
      setNotice('Gambar ekstrakurikuler berhasil diupload. Klik Simpan ekskul akademik untuk menerbitkannya.')
    } catch (error) {
      setNotice(messageFromError(error))
    } finally {
      event.target.value = ''
      setBusy(false)
    }
  }

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextKey = keyInput.trim()

    if (!nextKey) {
      setNotice('Masukkan kunci admin.')
      return
    }

    window.sessionStorage.setItem('pelita-admin-key', nextKey)
    setAdminKey(nextKey)
    void loadContent(nextKey)
  }

  function signOut() {
    window.sessionStorage.removeItem('pelita-admin-key')
    setAdminKey('')
    setKeyInput('')
    setAuthenticated(false)
    setContent(defaultSiteContent)
    setNewsDraft(emptyNewsDraft)
    setGalleryDraft(emptyGalleryDraft)
    setAchievementDraft(emptyAchievementDraft)
    setFacilityDraft(emptyFacilityDraft)
    setOpeningDraft(emptyOpeningDraft)
    setAlumniDestinationDraft(emptyAlumniDestinationDraft)
    setSocialDraft(emptySocialDraft)
    setSocialManualEntry(false)
    setTestimonialDraft(emptyTestimonialDraft)
    setAcademicPageDraft(emptyAcademicPageDraft)
    setPageDraft(emptyPageDraft)
    setContactDraft(defaultSiteContent.contactInfo)
    setFooterDraft(defaultSiteContent.footer || { description: '' })
    setGlobalConfigDraft(defaultSiteContent.globalConfig || { headerLogo: '/images/logo.png', footerLogo: '' })
    setActiveAcademicLevel('preschool')
    setActivePageKey('home')
    setNotice('Sesi admin ditutup.')
  }

  function handleStringArrayChange(value: string, key: string) {
    // split by newline and filter out empty strings
    const arrayValues = value.split('\n').map(s => s.trim()).filter(Boolean)
    const keys = key.split('.')
    setPageDraft(current => {
      const draft = { ...current }
      let target: any = draft
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i]
        if (!target[k]) target[k] = {}
        target[k] = { ...target[k] }
        target = target[k]
      }
      target[keys[keys.length - 1]] = arrayValues
      return draft
    })
  }

  function updateArrayItem(section: string, itemIndex: number, newValues: any) {
    setPageDraft(current => {
      const draft = { ...current }
      const targetSection: any = (draft as any)[section] || {}
      const items = [...(targetSection.items || [])]
      
      if (newValues === null) {
        // delete item
        items.splice(itemIndex, 1)
      } else if (itemIndex >= items.length) {
        // add item
        items.push(newValues)
      } else {
        // update item
        items[itemIndex] = { ...items[itemIndex], ...newValues }
      }

      (draft as any)[section] = {
        ...targetSection,
        items
      }
      return draft
    })
  }

  function saveNews(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !newsDraft.title.trim()
      || !newsDraft.excerpt.trim()
      || !newsDraft.category.trim()
      || !newsDraft.date.trim()
      || !newsDraft.author.trim()
      || !newsDraft.image.trim()
    ) {
      setNotice('Judul, ringkasan, kategori, tanggal, penulis, dan gambar berita wajib diisi.')
      return
    }

    const article = {
      ...newsDraft,
      id: newsDraft.id || newContentId('news'),
      title: newsDraft.title.trim(),
      excerpt: newsDraft.excerpt.trim(),
      category: newsDraft.category.trim(),
      date: newsDraft.date.trim(),
      author: newsDraft.author.trim(),
      image: newsDraft.image.trim(),
    }
    const otherNews = content.news.filter((item) => item.id !== article.id)
    const nextNews = article.featured
      ? [article, ...otherNews.map((item) => ({ ...item, featured: false }))]
      : [article, ...otherNews]

    void persistContent({ ...content, news: nextNews }, 'Berita berhasil disimpan.')
    setNewsDraft(emptyNewsDraft)
  }

  function saveGallery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!galleryDraft.title.trim() || !galleryDraft.src.trim()) {
      setNotice('Judul dan gambar galeri wajib diisi.')
      return
    }

    const item = {
      ...galleryDraft,
      id: galleryDraft.id || newContentId('gallery'),
      title: galleryDraft.title.trim(),
      src: galleryDraft.src.trim(),
    }
    const nextGallery = [
      item,
      ...content.gallery.filter((entry) => entry.id !== item.id),
    ]

    void persistContent({ ...content, gallery: nextGallery }, 'Item galeri berhasil disimpan.')
    setGalleryDraft(emptyGalleryDraft)
  }

  function updateAcademicExtracurricular(
    level: AcademicLevelKey,
    itemId: string,
    patch: Partial<AcademicExtracurricularItem>,
  ) {
    setContent((current) => ({
      ...current,
      academicExtracurriculars: {
        ...current.academicExtracurriculars,
        [level]: current.academicExtracurriculars[level].map((item) => (
          item.id === itemId ? { ...item, ...patch } : item
        )),
      },
    }))
  }

  function addAcademicExtracurricular(level: AcademicLevelKey) {
    const nextItem: AcademicExtracurricularItem = {
      id: newContentId(`${level}-ekskul`),
      name: '',
      desc: '',
      image: '',
    }

    setContent((current) => ({
      ...current,
      academicExtracurriculars: {
        ...current.academicExtracurriculars,
        [level]: [nextItem, ...current.academicExtracurriculars[level]],
      },
    }))
  }

  function deleteAcademicExtracurricular(level: AcademicLevelKey, item: AcademicExtracurricularItem) {
    if (!window.confirm(`Hapus ekstrakurikuler "${item.name || 'tanpa judul'}"?`)) {
      return
    }

    setContent((current) => ({
      ...current,
      academicExtracurriculars: {
        ...current.academicExtracurriculars,
        [level]: current.academicExtracurriculars[level].filter((entry) => entry.id !== item.id),
      },
    }))
  }

  function saveAcademicExtracurriculars(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const hasInvalidItem = academicLevelOptions.some(({ value }) => (
      content.academicExtracurriculars[value].some((item) => (
        !item.name.trim() || !item.desc.trim() || !item.image.trim()
      ))
    ))

    if (hasInvalidItem) {
      setNotice('Nama, deskripsi, dan gambar setiap ekstrakurikuler wajib diisi sebelum disimpan.')
      return
    }

    void persistContent(content, 'Ekskul akademik berhasil disimpan.')
  }

  function saveAchievement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !achievementDraft.title.trim()
      || !achievementDraft.category.trim()
      || !achievementDraft.student.trim()
      || !achievementDraft.class.trim()
      || !achievementDraft.level.trim()
      || !achievementDraft.desc.trim()
      || !achievementDraft.image.trim()
      || !Number.isInteger(achievementDraft.year)
    ) {
      setNotice('Prestasi perlu judul, tahun, kategori, siswa, kelas, level, deskripsi, dan gambar.')
      return
    }

    const achievement = {
      ...achievementDraft,
      id: achievementDraft.id || newContentId('achievement'),
      title: achievementDraft.title.trim(),
      category: achievementDraft.category.trim(),
      student: achievementDraft.student.trim(),
      class: achievementDraft.class.trim(),
      level: achievementDraft.level.trim(),
      medal: achievementDraft.medal.trim() || 'gold',
      desc: achievementDraft.desc.trim(),
      image: achievementDraft.image.trim(),
      featuredLabel: achievementDraft.featuredLabel.trim(),
      featuredTeam: achievementDraft.featuredTeam.trim(),
      featuredMentor: achievementDraft.featuredMentor.trim(),
      studentImage: achievementDraft.studentImage.trim(),
    }
    const nextAchievements = [
      achievement,
      ...content.achievements.filter((item) => item.id !== achievement.id),
    ]

    void persistContent({ ...content, achievements: nextAchievements }, 'Prestasi berhasil disimpan.')
    setAchievementDraft(emptyAchievementDraft)
  }

  function saveFacility(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const facilityImages = facilityDraft.images?.map((image) => image.trim()).filter(Boolean) || []
    const primaryFacilityImage = facilityDraft.image.trim() || facilityImages[0] || ''
    const mergedFacilityImages = Array.from(new Set([primaryFacilityImage, ...facilityImages].filter(Boolean)))

    if (!facilityDraft.title.trim() || !primaryFacilityImage) {
      setNotice('Nama dan gambar fasilitas wajib diisi.')
      return
    }

    const facility = {
      ...facilityDraft,
      id: facilityDraft.id || newContentId('facility'),
      title: facilityDraft.title.trim(),
      zone: facilityDraft.zone?.trim() || undefined,
      image: primaryFacilityImage,
      images: mergedFacilityImages,
      video: facilityDraft.video?.trim() || undefined,
      description: facilityDraft.description?.trim() || undefined,
    }
    const nextFacilities = [
      facility,
      ...content.facilities.filter((item) => item.id !== facility.id),
    ]

    void persistContent({ ...content, facilities: nextFacilities }, 'Fasilitas berhasil disimpan.')
    setFacilityDraft(emptyFacilityDraft)
  }

  function saveOpening(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!openingDraft.title.trim() || !openingDraft.team.trim() || !openingDraft.type.trim()) {
      setNotice('Judul posisi, tim, dan tipe kerja wajib diisi.')
      return
    }

    const opening = {
      ...openingDraft,
      id: openingDraft.id || newContentId('opening'),
      title: openingDraft.title.trim(),
      team: openingDraft.team.trim(),
      type: openingDraft.type.trim(),
      postedDate: openingDraft.postedDate?.trim() || '',
      deadlineDate: openingDraft.deadlineDate?.trim() || '',
      description: openingDraft.description?.trim() || '',
      requirements: typeof openingDraft.requirements === 'string'
        ? (openingDraft.requirements as string).split('\n').map(s => s.trim()).filter(Boolean)
        : (openingDraft.requirements || []),
      responsibilities: typeof openingDraft.responsibilities === 'string'
        ? (openingDraft.responsibilities as string).split('\n').map(s => s.trim()).filter(Boolean)
        : (openingDraft.responsibilities || []),
      applyEmail: openingDraft.applyEmail?.trim() || '',
      applyAddress: openingDraft.applyAddress?.trim() || '',
    }
    const nextOpenings = [
      opening,
      ...content.careerOpenings.filter((item) => item.id !== opening.id),
    ]

    void persistContent({ ...content, careerOpenings: nextOpenings }, 'Lowongan berhasil disimpan.')
    setOpeningDraft(emptyOpeningDraft)
  }

  function saveSocialPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !socialDraft.sourceUrl.trim()
      || !socialDraft.platform.trim()
      || !socialDraft.title.trim()
      || !socialDraft.excerpt.trim()
      || !socialDraft.type.trim()
      || !socialDraft.date.trim()
      || !socialDraft.image.trim()
    ) {
      setNotice('Ambil metadata dari link atau lengkapi form manual sebelum menyimpan post.')
      return
    }

    const post = {
      ...socialDraft,
      id: socialDraft.id || newContentId('social'),
      sourceUrl: socialDraft.sourceUrl.trim(),
      title: socialDraft.title.trim(),
      excerpt: socialDraft.excerpt.trim(),
      type: socialDraft.type.trim(),
      date: socialDraft.date.trim(),
      image: socialDraft.image.trim(),
      video: socialDraft.video.trim() || socialDraft.sourceUrl.trim(),
      objectPosition: socialDraft.objectPosition.trim() || 'center',
      metric: socialDraft.metric.trim(),
      comments: socialDraft.comments.trim(),
    }
    const nextSocialPosts = [
      post,
      ...content.socialPosts.filter((item) => item.id !== post.id),
    ]

    void persistContent({ ...content, socialPosts: nextSocialPosts }, 'Post media sosial berhasil disimpan.')
    setSocialDraft(emptySocialDraft)
    setSocialManualEntry(false)
  }

  function saveAlumniDestination(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!alumniDestinationDraft.name.trim()) {
      setNotice('Nama universitas tujuan alumni wajib diisi.')
      return
    }

    const destination = {
      ...alumniDestinationDraft,
      id: alumniDestinationDraft.id || newContentId('alumni'),
      name: alumniDestinationDraft.name.trim(),
      image: alumniDestinationDraft.image.trim(),
    }
    const nextDestinations = [
      destination,
      ...content.alumniDestinations.filter((item) => item.id !== destination.id),
    ]

    void persistContent({ ...content, alumniDestinations: nextDestinations }, 'Tujuan alumni berhasil disimpan.')
    setAlumniDestinationDraft(emptyAlumniDestinationDraft)
  }

  async function readSocialMetadata() {
    const sourceUrl = socialDraft.sourceUrl.trim()

    if (!sourceUrl) {
      setNotice('Masukkan link media sosial terlebih dahulu.')
      return
    }

    setSocialPreviewLoading(true)
    setNotice('')

    try {
      const response = await fetch('/api/admin/social-preview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ input: sourceUrl }),
      })

      if (!response.ok) {
        throw new Error(await readResponseMessage(response))
      }

      const data = await response.json() as { metadata: Omit<SocialPost, 'id'> }
      setSocialDraft((draft) => ({
        ...draft,
        ...data.metadata,
      }))
      setSocialManualEntry(!data.metadata.image)
      setNotice(data.metadata.image
        ? 'Metadata sumber berhasil dibaca. Periksa preview lalu simpan.'
        : 'Embed Instagram terbaca, tetapi poster tidak dikirim sumber. Lengkapi detail manual sebelum simpan.')
    } catch (error) {
      setSocialManualEntry(true)
      setNotice(`${messageFromError(error)} Link atau embed sudah diterima; isi detail post secara manual.`)
    } finally {
      setSocialPreviewLoading(false)
    }
  }

  function saveTestimonial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!testimonialDraft.text.trim() || !testimonialDraft.author.trim() || !testimonialDraft.role.trim()) {
      setNotice('Isi testimoni, nama, dan peran wajib diisi.')
      return
    }

    const testimonial = {
      ...testimonialDraft,
      id: testimonialDraft.id || newContentId('testimonial'),
      text: testimonialDraft.text.trim(),
      author: testimonialDraft.author.trim(),
      role: testimonialDraft.role.trim(),
      photo: testimonialDraft.photo.trim(),
    }
    const nextTestimonials = [
      testimonial,
      ...content.testimonials.filter((item) => item.id !== testimonial.id),
    ]

    void persistContent({ ...content, testimonials: nextTestimonials }, 'Testimoni berhasil disimpan.')
    setTestimonialDraft(emptyTestimonialDraft)
  }

  function saveContactInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!contactDraft.address.trim() || !contactDraft.phone.trim() || !contactDraft.email.trim() || !contactDraft.hours.trim()) {
      setNotice('Alamat, telepon, email, dan jam operasional wajib diisi.')
      return
    }

    const nextContactInfo = {
      address: contactDraft.address.trim(),
      phone: contactDraft.phone.trim(),
      email: contactDraft.email.trim(),
      hours: contactDraft.hours.trim(),
      facebookUrl: contactDraft.facebookUrl.trim(),
      instagramUrl: contactDraft.instagramUrl.trim(),
      linkedinUrl: contactDraft.linkedinUrl.trim(),
      youtubeUrl: contactDraft.youtubeUrl.trim(),
      mapEmbedUrl: contactDraft.mapEmbedUrl.trim(),
    }

    void persistContent({ ...content, contactInfo: nextContactInfo }, 'Informasi kontak berhasil disimpan.')
  }

  function saveFooterInfo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!footerDraft.description.trim()) {
      setNotice('Deskripsi footer wajib diisi.')
      return
    }

    const nextFooter = {
      description: footerDraft.description.trim(),
    }
    const nextGlobalConfig = {
      headerLogo: globalConfigDraft.headerLogo.trim(),
      footerLogo: globalConfigDraft.footerLogo.trim(),
      activeMenus: globalConfigDraft.activeMenus || content.globalConfig?.activeMenus || {},
    }

    void persistContent({ ...content, footer: nextFooter, globalConfig: nextGlobalConfig }, 'Pengaturan berhasil disimpan.')
  }

  function deleteNews(article: NewsArticle) {
    if (!window.confirm(`Hapus berita "${article.title}"?`)) {
      return
    }

    void persistContent(
      { ...content, news: content.news.filter((item) => item.id !== article.id) },
      'Berita berhasil dihapus.',
    )
  }

  function deleteGallery(item: GalleryItem) {
    if (!window.confirm(`Hapus item galeri "${item.title}"?`)) {
      return
    }

    void persistContent(
      { ...content, gallery: content.gallery.filter((entry) => entry.id !== item.id) },
      'Item galeri berhasil dihapus.',
    )
  }

  function deleteAchievement(item: AchievementItem) {
    if (!window.confirm(`Hapus prestasi "${item.title}"?`)) {
      return
    }

    void persistContent(
      { ...content, achievements: content.achievements.filter((entry) => entry.id !== item.id) },
      'Prestasi berhasil dihapus.',
    )
  }

  function deleteFacility(item: FacilityItem) {
    if (!window.confirm(`Hapus fasilitas "${item.title}"?`)) {
      return
    }

    void persistContent(
      { ...content, facilities: content.facilities.filter((entry) => entry.id !== item.id) },
      'Fasilitas berhasil dihapus.',
    )
  }

  function deleteOpening(item: CareerOpening) {
    if (!window.confirm(`Hapus lowongan "${item.title}"?`)) {
      return
    }

    void persistContent(
      { ...content, careerOpenings: content.careerOpenings.filter((entry) => entry.id !== item.id) },
      'Lowongan berhasil dihapus.',
    )
  }

  function deleteSocialPost(item: SocialPost) {
    if (!window.confirm(`Hapus post "${item.title}"?`)) {
      return
    }

    void persistContent(
      { ...content, socialPosts: content.socialPosts.filter((entry) => entry.id !== item.id) },
      'Post media sosial berhasil dihapus.',
    )
  }

  function deleteAlumniDestination(item: AlumniDestination) {
    if (!window.confirm(`Hapus tujuan alumni "${item.name}"?`)) {
      return
    }

    void persistContent(
      { ...content, alumniDestinations: content.alumniDestinations.filter((entry) => entry.id !== item.id) },
      'Tujuan alumni berhasil dihapus.',
    )
  }

  function deleteTestimonial(item: TestimonialItem) {
    if (!window.confirm(`Hapus testimoni dari "${item.author}"?`)) {
      return
    }

    void persistContent(
      { ...content, testimonials: content.testimonials.filter((entry) => entry.id !== item.id) },
      'Testimoni berhasil dihapus.',
    )
  }

  function saveAcademicPage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !academicPageDraft.title.trim()
      || !academicPageDraft.desc.trim()
    ) {
      setNotice('Harap lengkapi judul dan deskripsi.')
      return
    }

    const level = activeAcademicLevel
    const updatedPages = { ...content.academicPages, [level]: { ...academicPageDraft } }

    void persistContent(
      { ...content, academicPages: updatedPages },
      'Halaman akademik berhasil diperbarui.',
    )
  }

  function savePageConfig(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const hasHeroBackground = Boolean(
      pageDraft.heroBgImage.trim()
      || pageDraft.heroBgImages?.some((image) => image.trim())
    )

    if (!pageDraft.heroTitle.trim() || !hasHeroBackground) {
      setNotice('Judul utama dan background image wajib diisi.')
      return
    }

    const key = activePageKey
    const updatedPages = { ...content.pages, [key]: { ...pageDraft } }

    void persistContent(
      { ...content, pages: updatedPages },
      'Konfigurasi halaman berhasil diperbarui.',
    )
  }

  function saveFacilitiesBannerConfig(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const hasHeroBackground = Boolean(
      pageDraft.heroBgImage.trim()
      || pageDraft.heroBgImages?.some((image) => image.trim())
    )

    if (!pageDraft.heroTitle.trim() || !hasHeroBackground) {
      setNotice('Judul banner dan minimal satu gambar fallback fasilitas wajib diisi.')
      return
    }

    const updatedFacilitiesPage: PageConfig = {
      ...content.pages.facilities,
      ...pageDraft,
      id: 'facilities',
      heroBgImage: pageDraft.heroBgImage.trim(),
      heroBgImages: (pageDraft.heroBgImages || []).map((image) => image.trim()).filter(Boolean),
      heroVideo: pageDraft.heroVideo?.trim() || undefined,
    }

    void persistContent(
      { ...content, pages: { ...content.pages, facilities: updatedFacilitiesPage } },
      'Banner utama halaman fasilitas berhasil diperbarui.',
    )
  }

  useEffect(() => {
    if (activePanel === 'academic-pages') {
      setAcademicPageDraft(content.academicPages[activeAcademicLevel] || emptyAcademicPageDraft)
    }
    if (activePanel === 'pages') {
      setPageDraft(content.pages[activePageKey] || emptyPageDraft)
    }
    if (activePanel === 'facilities') {
      setPageDraft(content.pages.facilities || defaultSiteContent.pages.facilities)
    }
  }, [activeAcademicLevel, activePageKey, activePanel, content.academicPages, content.pages])

  if (loading) {
    return (
      <section className="min-h-[72vh] bg-[#F6F1E6] px-6 py-24 text-[#061B49]">
        <div className="mx-auto max-w-3xl rounded-lg border border-[#C8A35A]/25 bg-white p-8 shadow-sm">
          Memuat ruang admin...
        </div>
      </section>
    )
  }

  if (!authenticated) {
    return (
      <section className="min-h-[72vh] bg-[#F6F1E6] px-6 py-20 text-[#061B49]">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#9B741F]">
              Admin Konten
            </p>
            <h1 className="font-playfair text-4xl font-bold tracking-tight md:text-6xl">
              Kelola konten sekolah.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#516074]">
              Ruang publikasi internal Pelita Cemerlang.
            </p>
          </div>

          <form onSubmit={signIn} className="rounded-lg border border-[#C8A35A]/30 bg-white p-7 shadow-[0_22px_70px_rgba(6,27,73,0.08)]">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#164AA8]/10 text-[#164AA8]">
              <KeyRound className="h-6 w-6" />
            </div>
            <label className="block text-sm font-semibold" htmlFor="admin-key">
              Kunci admin
            </label>
            <input
              id="admin-key"
              type="password"
              value={keyInput}
              onChange={(event) => setKeyInput(event.target.value)}
              className="mt-2 w-full rounded-md border border-[#061B49]/15 px-4 py-3 outline-none transition focus:border-[#164AA8] focus:ring-2 focus:ring-[#164AA8]/15"
              placeholder="Masukkan kunci akses"
            />
            <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8]">
              Masuk
              <ArrowUpRight className="h-4 w-4" />
            </button>
            {notice && <p className="mt-4 rounded-md bg-[#FFF4D7] px-3 py-2 text-sm text-[#7A5311]">{notice}</p>}
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[#F6F1E6] px-4 py-10 text-[#061B49] md:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col justify-between gap-5 border-b border-[#061B49]/10 pb-7 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#9B741F]">
              Content Console
            </p>
            <h1 className="font-playfair text-4xl font-bold tracking-tight">Admin Konten</h1>
            <p className="mt-2 text-sm text-[#516074]">
              Terakhir disimpan {new Date(content.updatedAt).toLocaleString('id-ID')}.
            </p>
            <div className="mt-4 flex bg-white border border-[#061B49]/15 rounded-md p-1 w-max">
              <button onClick={() => setEditLang('id')} className={`px-4 py-1.5 text-sm font-semibold rounded-sm transition ${editLang === 'id' ? 'bg-[#061B49] text-white' : 'text-[#516074] hover:bg-gray-100'}`}>Bahasa Indonesia</button>
              <button onClick={() => setEditLang('en')} className={`px-4 py-1.5 text-sm font-semibold rounded-sm transition ${editLang === 'en' ? 'bg-[#061B49] text-white' : 'text-[#516074] hover:bg-gray-100'}`}>English</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/news" className="inline-flex items-center gap-2 rounded-md border border-[#061B49]/15 bg-white px-4 py-2 text-sm font-semibold hover:border-[#164AA8]">
              Lihat berita
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/gallery" className="inline-flex items-center gap-2 rounded-md border border-[#061B49]/15 bg-white px-4 py-2 text-sm font-semibold hover:border-[#164AA8]">
              Lihat galeri
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/social-media" className="inline-flex items-center gap-2 rounded-md border border-[#061B49]/15 bg-white px-4 py-2 text-sm font-semibold hover:border-[#164AA8]">
              Lihat sosial
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-md bg-[#061B49] px-4 py-2 text-sm font-semibold text-white hover:bg-[#164AA8]">
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </div>
        </header>

        <div className="mb-6 flex w-full flex-wrap gap-1 rounded-md border border-[#061B49]/10 bg-white p-1 md:w-fit">
          <button
            onClick={() => setActivePanel('pages')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'pages' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <LayoutTemplate className="h-4 w-4" />
            Halaman Utama
          </button>
          <button
            onClick={() => setActivePanel('news')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'news' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <Newspaper className="h-4 w-4" />
            Berita
          </button>
          <button
            onClick={() => setActivePanel('gallery')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'gallery' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <ImagePlus className="h-4 w-4" />
            Galeri
          </button>
          <button
            onClick={() => setActivePanel('academic-pages')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'academic-pages' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <GraduationCap className="h-4 w-4" />
            Info Akademik
          </button>
          <button
            onClick={() => setActivePanel('academic-extracurriculars')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'academic-extracurriculars' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <GraduationCap className="h-4 w-4" />
            Ekskul Akademik
          </button>
          <button
            onClick={() => setActivePanel('achievements')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'achievements' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <Trophy className="h-4 w-4" />
            Prestasi
          </button>
          <button
            onClick={() => setActivePanel('facilities')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'facilities' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <Building2 className="h-4 w-4" />
            Fasilitas
          </button>
          <button
            onClick={() => setActivePanel('career')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'career' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <BriefcaseBusiness className="h-4 w-4" />
            Karir
          </button>
          <button
            onClick={() => setActivePanel('social')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'social' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <Share2 className="h-4 w-4" />
            Sosial
          </button>
          <button
            onClick={() => setActivePanel('testimonials')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'testimonials' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <MessageSquareQuote className="h-4 w-4" />
            Testimoni
          </button>
          <button
            onClick={() => setActivePanel('alumni')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'alumni' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <GraduationCap className="h-4 w-4" />
            Berita Terbaru
          </button>
          <button
            onClick={() => setActivePanel('contact')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'contact' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <Contact className="h-4 w-4" />
            Kontak
          </button>
          <button
            onClick={() => setActivePanel('footer')}
            className={`inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold ${activePanel === 'footer' ? 'bg-[#164AA8] text-white' : 'text-[#516074]'}`}
          >
            <LayoutTemplate className="h-4 w-4" />
            Footer & Logo
          </button>
        </div>

        {notice && <p className="mb-6 rounded-md border border-[#C8A35A]/25 bg-[#FFF4D7] px-4 py-3 text-sm text-[#7A5311]">{notice}</p>}

        {activePanel === 'pages' && (
          <form onSubmit={savePageConfig} className="rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#061B49]/10 pb-5 lg:flex-row lg:items-end">
              <div>
                <h2 className="text-xl font-bold">Pengaturan Halaman Utama</h2>
                <p className="mt-1 text-sm text-[#516074]">
                  Pilih halaman, lalu buka bagian yang ingin Anda atur.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['home', 'about', 'admission', 'career', 'facilities', 'gallery', 'news', 'achievements', 'social', 'contact', 'terms'] as PageKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setActivePageKey(key)
                      setPageDraft(content.pages[key] || defaultSiteContent.pages[key])
                    }}
                    className={`rounded-md px-4 py-2 text-sm font-semibold transition capitalize ${activePageKey === key ? 'bg-[#164AA8] text-white' : 'bg-[#F6F1E6] text-[#516074] hover:text-[#164AA8]'}`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* HERO SECTION - Semua halaman punya ini */}
              <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30" open>
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">1</span>
                    Hero Section (Spanduk Atas)
                  </div>
                  <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-[#061B49]/10 p-5 grid gap-6 lg:grid-cols-2 bg-white rounded-b-lg">
                  <div className="space-y-4">
                    <AdminInput label="Judul Utama (Hero Title)" value={pageDraft.heroTitle || ''} onChange={(val) => setPageDraft((draft) => ({ ...draft, heroTitle: val }))} />
                    <AdminTextarea label="Sub Judul (Hero Subtitle)" value={pageDraft.heroSubtitle || ''} onChange={(val) => setPageDraft((draft) => ({ ...draft, heroSubtitle: val }))} />
                    <AdminTextarea label="Teks Pengantar Pendek (Opsional)" value={pageDraft.introText || ''} onChange={(val) => setPageDraft((draft) => ({ ...draft, introText: val }))} />
                  </div>
                  <div className="space-y-4">
                    <AdminTextarea
                      label="Background Images URL (satu URL per baris)"
                      value={(pageDraft.heroBgImages && pageDraft.heroBgImages.length > 0 ? pageDraft.heroBgImages : pageDraft.heroBgImage ? [pageDraft.heroBgImage] : []).join('\n')}
                      onChange={(val) => {
                        const images = val.split('\n').map((item) => item.trim()).filter(Boolean)
                        setPageDraft((draft) => ({
                          ...draft,
                          heroBgImage: images[0] || '',
                          heroBgImages: images,
                        }))
                      }}
                    />
                    <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                      Upload Banyak Gambar Background
                      <input disabled={busy} type="file" accept="image/*" multiple onChange={(event) => void uploadPageHeroBackgrounds(event)} className="mt-2 block w-full text-xs text-[#516074]" />
                    </label>
                    {(pageDraft.heroBgImages && pageDraft.heroBgImages.length > 0 ? pageDraft.heroBgImages : pageDraft.heroBgImage ? [pageDraft.heroBgImage] : []).length > 0 && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {(pageDraft.heroBgImages && pageDraft.heroBgImages.length > 0 ? pageDraft.heroBgImages : pageDraft.heroBgImage ? [pageDraft.heroBgImage] : []).map((image, idx) => (
                          <div key={`${image}-${idx}`} className="rounded-md border border-[#061B49]/10 bg-[#FFFAF0] p-3">
                            <div className="mb-2 flex items-center justify-between gap-3">
                              <span className="text-xs font-bold text-[#061B49]">Slide {idx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const currentImages = pageDraft.heroBgImages && pageDraft.heroBgImages.length > 0 ? pageDraft.heroBgImages : [pageDraft.heroBgImage]
                                  const nextImages = currentImages.filter((_, imageIdx) => imageIdx !== idx).filter(Boolean)
                                  setPageDraft((draft) => ({
                                    ...draft,
                                    heroBgImage: nextImages[0] || '',
                                    heroBgImages: nextImages,
                                  }))
                                }}
                                className="text-xs font-bold text-red-600"
                              >
                                Hapus
                              </button>
                            </div>
                            <AdminPreview src={image} alt={`${pageDraft.id || activePageKey} background ${idx + 1}`} compact />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="h-px bg-[#061B49]/10 my-4" />

                    <AdminInput
                      label="Video Banner Utama URL (Opsional, format MP4)"
                      value={pageDraft.heroVideo || ''}
                      onChange={(val) => setPageDraft((draft) => ({ ...draft, heroVideo: val }))}
                    />
                    <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                      Upload Video Banner Utama (MP4)
                      <input disabled={busy} type="file" accept="video/mp4" onChange={(event) => void uploadImage(event, 'page-hero-video')} className="mt-2 block w-full text-xs text-[#516074]" />
                    </label>
                    {pageDraft.heroVideo && (
                      <div className="rounded-md border border-[#061B49]/10 bg-[#FFFAF0] p-3">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-xs font-bold text-[#061B49]">Video Preview</span>
                          <button
                            type="button"
                            onClick={() => setPageDraft((draft) => ({ ...draft, heroVideo: '' }))}
                            className="text-xs font-bold text-red-600"
                          >
                            Hapus Video
                          </button>
                        </div>
                        <video src={pageDraft.heroVideo} controls className="max-h-40 w-full object-cover rounded" />
                      </div>
                    )}
                  </div>
                </div>
              </details>

              {/* KHUSUS HOME */}
              {activePageKey === 'home' && (
                <>
                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">2</span>Nilai Inti (Core Values)</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                      <AdminInput label="Judul Section" value={pageDraft.coreValues?.title || ''} onChange={(val) => setPageDraft((d) => ({ ...d, coreValues: { ...(d.coreValues || defaultSiteContent.pages.home.coreValues!), title: val } }))} />
                      <AdminInput label="Sub Judul" value={pageDraft.coreValues?.subtitle || ''} onChange={(val) => setPageDraft((d) => ({ ...d, coreValues: { ...(d.coreValues || defaultSiteContent.pages.home.coreValues!), subtitle: val } }))} />
                      
                      <div className="h-px bg-[#061B49]/10 my-6" />
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[#9B741F]">Daftar Nilai Inti (Maks 9 idealnya IMPACTFUL)</h3>
                        <button type="button" onClick={() => updateArrayItem('coreValues', pageDraft.coreValues?.items?.length || 0, { letter: '', word: '', desc: '' })} className="flex items-center gap-1 text-sm text-[#164AA8] font-bold"><Plus className="w-4 h-4"/> Tambah</button>
                      </div>
                      
                      <div className="space-y-4">
                        {(pageDraft.coreValues?.items || []).map((item, idx) => (
                          <div key={idx} className="p-4 border border-[#061B49]/10 rounded bg-[#F6F1E6]/20 relative">
                            <button type="button" onClick={() => updateArrayItem('coreValues', idx, null)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                            <div className="grid gap-4 mt-2 sm:grid-cols-2">
                              <AdminInput label="Huruf Besar (Contoh: I)" value={item.letter} onChange={(val) => updateArrayItem('coreValues', idx, { letter: val })} />
                              <AdminInput label="Kata (Contoh: ntegrity)" value={item.word} onChange={(val) => updateArrayItem('coreValues', idx, { word: val })} />
                              <div className="sm:col-span-2">
                                <AdminTextarea label="Deskripsi" value={item.desc} onChange={(val) => updateArrayItem('coreValues', idx, { desc: val })} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                  
                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">3</span>Kurikulum</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                      <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-4">
                          <AdminInput label="Label" value={pageDraft.curriculum?.label || ''} onChange={(val) => setPageDraft((d) => ({ ...d, curriculum: { ...(d.curriculum || defaultSiteContent.pages.home.curriculum!), label: val } }))} />
                          <AdminInput label="Judul" value={pageDraft.curriculum?.title || ''} onChange={(val) => setPageDraft((d) => ({ ...d, curriculum: { ...(d.curriculum || defaultSiteContent.pages.home.curriculum!), title: val } }))} />
                          <AdminTextarea label="Deskripsi" value={pageDraft.curriculum?.desc || ''} onChange={(val) => setPageDraft((d) => ({ ...d, curriculum: { ...(d.curriculum || defaultSiteContent.pages.home.curriculum!), desc: val } }))} />
                        </div>
                        <div className="space-y-4">
                          <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                            Upload Foto Kurikulum
                            <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadImage(event, 'page-curriculum')} className="mt-2 block w-full text-xs text-[#516074]" />
                          </label>
                          <AdminTextarea label="Daftar URL Gambar (Otomatis dari upload, bisa diedit manual dengan Enter)" value={pageDraft.curriculum?.images?.join('\n') || ''} onChange={(val) => handleStringArrayChange(val, 'curriculum.images')} />
                          {pageDraft.curriculum?.images && pageDraft.curriculum.images.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {pageDraft.curriculum.images.map((img, i) => (
                                <div key={i} className="relative">
                                  <AdminPreview src={img} alt={`Foto Kurikulum ${i+1}`} compact />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="h-px bg-[#061B49]/10 my-6" />
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[#9B741F]">Kartu Kurikulum</h3>
                        <button type="button" onClick={() => updateArrayItem('curriculum', pageDraft.curriculum?.cards?.length || 0, { title: '', desc: '' })} className="flex items-center gap-1 text-sm text-[#164AA8] font-bold"><Plus className="w-4 h-4"/> Tambah</button>
                      </div>
                      
                      <div className="space-y-4">
                        {(pageDraft.curriculum?.cards || []).map((item, idx) => (
                          <div key={idx} className="p-4 border border-[#061B49]/10 rounded bg-[#F6F1E6]/20 relative">
                            <button type="button" onClick={() => updateArrayItem('curriculum', idx, null)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                            <div className="grid gap-4 mt-2">
                              <AdminInput label="Judul Kartu" value={item.title} onChange={(val) => updateArrayItem('curriculum', idx, { title: val })} />
                              <AdminTextarea label="Deskripsi" value={item.desc} onChange={(val) => updateArrayItem('curriculum', idx, { desc: val })} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>

                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">4</span>Call To Action (CTA)</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                      <AdminInput label="Judul" value={pageDraft.cta?.title || ''} onChange={(val) => setPageDraft((d) => ({ ...d, cta: { ...(d.cta || defaultSiteContent.pages.home.cta!), title: val } }))} />
                      <AdminTextarea label="Deskripsi" value={pageDraft.cta?.desc || ''} onChange={(val) => setPageDraft((d) => ({ ...d, cta: { ...(d.cta || defaultSiteContent.pages.home.cta!), desc: val } }))} />
                      <AdminInput label="Teks Tombol" value={pageDraft.cta?.buttonText || ''} onChange={(val) => setPageDraft((d) => ({ ...d, cta: { ...(d.cta || defaultSiteContent.pages.home.cta!), buttonText: val } }))} />
                    </div>
                  </details>

                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">5</span>Header Testimoni & Alumni</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 grid gap-6 lg:grid-cols-2 bg-white rounded-b-lg">
                      <div className="space-y-4">
                        <h3 className="font-bold text-[#9B741F] mb-2">Testimoni</h3>
                        <AdminInput label="Label" value={pageDraft.testimonialsSection?.label || ''} onChange={(val) => setPageDraft((d) => ({ ...d, testimonialsSection: { ...(d.testimonialsSection || defaultSiteContent.pages.home.testimonialsSection!), label: val } }))} />
                        <AdminInput label="Judul" value={pageDraft.testimonialsSection?.title || ''} onChange={(val) => setPageDraft((d) => ({ ...d, testimonialsSection: { ...(d.testimonialsSection || defaultSiteContent.pages.home.testimonialsSection!), title: val } }))} />
                        <AdminTextarea label="Deskripsi" value={pageDraft.testimonialsSection?.desc || ''} onChange={(val) => setPageDraft((d) => ({ ...d, testimonialsSection: { ...(d.testimonialsSection || defaultSiteContent.pages.home.testimonialsSection!), desc: val } }))} />
                        
                        <h4 className="font-bold text-[#9B741F] mb-2 mt-4 text-sm">Video Testimoni MP4 (Maks 3)</h4>
                        {[0, 1, 2].map((idx) => (
                          <div key={`testimonial-video-${idx}`} className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <AdminInput
                              label={`URL Video ${idx + 1} (Otomatis dari upload atau masukkan URL MP4 eksternal)`}
                              placeholder="Contoh: /uploads/content/video.mp4"
                              value={pageDraft.testimonialsSection?.videos?.[idx]?.url || ''}
                              onChange={(val) => {
                                const newVideos = [...(pageDraft.testimonialsSection?.videos || [])]
                                newVideos[idx] = { ...newVideos[idx], url: val }
                                setPageDraft((d) => ({
                                  ...d,
                                  testimonialsSection: {
                                    ...(d.testimonialsSection || defaultSiteContent.pages.home.testimonialsSection!),
                                    videos: newVideos
                                  }
                                }))
                              }}
                            />
                            <div className="mt-3">
                              <label className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#0A3A8D] mb-1 block">Upload Video MP4 {idx + 1}</label>
                              <input 
                                disabled={busy} 
                                type="file" 
                                accept="video/mp4" 
                                onChange={(event) => void uploadTestimonialVideoSection(event, idx)} 
                                className="block w-full text-xs text-[#516074]" 
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-bold text-[#9B741F] mb-2">Alumni</h3>
                        <AdminInput label="Label" value={pageDraft.alumniSection?.label || ''} onChange={(val) => setPageDraft((d) => ({ ...d, alumniSection: { ...(d.alumniSection || defaultSiteContent.pages.home.alumniSection!), label: val } }))} />
                        <AdminInput label="Judul" value={pageDraft.alumniSection?.title || ''} onChange={(val) => setPageDraft((d) => ({ ...d, alumniSection: { ...(d.alumniSection || defaultSiteContent.pages.home.alumniSection!), title: val } }))} />
                        <AdminTextarea label="Deskripsi" value={pageDraft.alumniSection?.desc || ''} onChange={(val) => setPageDraft((d) => ({ ...d, alumniSection: { ...(d.alumniSection || defaultSiteContent.pages.home.alumniSection!), desc: val } }))} />
                      </div>
                    </div>
                  </details>
                </>
              )}

              {/* KHUSUS ABOUT */}
              {activePageKey === 'about' && (
                <>
                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">2</span>Sambutan Kepala Sekolah</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                      <div className="grid gap-6 lg:grid-cols-2">
                        <div className="space-y-4">
                          <AdminInput label="Kutipan Utama" value={pageDraft.sambutan?.quote || ''} onChange={(val) => setPageDraft((d) => ({ ...d, sambutan: { ...(d.sambutan || defaultSiteContent.pages.about.sambutan!), quote: val } }))} />
                          <AdminTextarea label="Paragraf Sambutan (Pisahkan dengan Enter)" value={pageDraft.sambutan?.descParagraphs?.join('\n') || ''} onChange={(val) => handleStringArrayChange(val, 'sambutan.descParagraphs')} />
                          <AdminInput label="Nama" value={pageDraft.sambutan?.name || ''} onChange={(val) => setPageDraft((d) => ({ ...d, sambutan: { ...(d.sambutan || defaultSiteContent.pages.about.sambutan!), name: val } }))} />
                          <AdminInput label="Jabatan" value={pageDraft.sambutan?.role || ''} onChange={(val) => setPageDraft((d) => ({ ...d, sambutan: { ...(d.sambutan || defaultSiteContent.pages.about.sambutan!), role: val } }))} />
                        </div>
                        <div className="space-y-4">
                          <AdminInput label="URL Foto Kepala Sekolah" value={pageDraft.sambutan?.image || ''} onChange={(val) => setPageDraft((d) => ({ ...d, sambutan: { ...(d.sambutan || defaultSiteContent.pages.about.sambutan!), image: val } }))} />
                          <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                            Upload Foto Kepala Sekolah
                            <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadImage(event, 'page-sambutan')} className="mt-2 block w-full text-xs text-[#516074]" />
                          </label>
                          {pageDraft.sambutan?.image && <AdminPreview src={pageDraft.sambutan.image} alt="Foto Kepala Sekolah" />}
                        </div>
                      </div>
                    </div>
                  </details>
                  
                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">3</span>Visi & Misi</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                      <h3 className="font-bold text-[#9B741F]">Visi</h3>
                      <AdminInput label="Label Visi" value={pageDraft.visionMission?.visionLabel || ''} onChange={(val) => setPageDraft((d) => ({ ...d, visionMission: { ...(d.visionMission || defaultSiteContent.pages.about.visionMission!), visionLabel: val } }))} />
                      <AdminTextarea label="Judul/Teks Visi" value={pageDraft.visionMission?.visionTitle || ''} onChange={(val) => setPageDraft((d) => ({ ...d, visionMission: { ...(d.visionMission || defaultSiteContent.pages.about.visionMission!), visionTitle: val } }))} />
                      <AdminTextarea label="Deskripsi Visi" value={pageDraft.visionMission?.visionDesc || ''} onChange={(val) => setPageDraft((d) => ({ ...d, visionMission: { ...(d.visionMission || defaultSiteContent.pages.about.visionMission!), visionDesc: val } }))} />
                      
                      <div className="h-px bg-[#061B49]/10 my-6" />
                      
                      <h3 className="font-bold text-[#9B741F]">Misi</h3>
                      <AdminInput label="Label Misi" value={pageDraft.visionMission?.missionLabel || ''} onChange={(val) => setPageDraft((d) => ({ ...d, visionMission: { ...(d.visionMission || defaultSiteContent.pages.about.visionMission!), missionLabel: val } }))} />
                      <AdminInput label="Judul Misi" value={pageDraft.visionMission?.missionTitle || ''} onChange={(val) => setPageDraft((d) => ({ ...d, visionMission: { ...(d.visionMission || defaultSiteContent.pages.about.visionMission!), missionTitle: val } }))} />
                      <AdminTextarea label="Daftar Misi (Pisahkan dengan Enter)" value={pageDraft.visionMission?.missionItems?.join('\n') || ''} onChange={(val) => handleStringArrayChange(val, 'visionMission.missionItems')} />
                    </div>
                  </details>

                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">4</span>Sejarah / Timeline</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                      <AdminInput label="Label" value={pageDraft.timelineSection?.label || ''} onChange={(val) => setPageDraft((d) => ({ ...d, timelineSection: { ...(d.timelineSection || defaultSiteContent.pages.about.timelineSection!), label: val } }))} />
                      <AdminInput label="Judul" value={pageDraft.timelineSection?.title || ''} onChange={(val) => setPageDraft((d) => ({ ...d, timelineSection: { ...(d.timelineSection || defaultSiteContent.pages.about.timelineSection!), title: val } }))} />
                      <AdminTextarea label="Deskripsi" value={pageDraft.timelineSection?.desc || ''} onChange={(val) => setPageDraft((d) => ({ ...d, timelineSection: { ...(d.timelineSection || defaultSiteContent.pages.about.timelineSection!), desc: val } }))} />
                      
                      <div className="h-px bg-[#061B49]/10 my-6" />
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[#9B741F]">Daftar Timeline</h3>
                        <button type="button" onClick={() => updateArrayItem('timelineSection', pageDraft.timelineSection?.items?.length || 0, { year: '', title: '', desc: '' })} className="flex items-center gap-1 text-sm text-[#164AA8] font-bold"><Plus className="w-4 h-4"/> Tambah</button>
                      </div>
                      
                      <div className="space-y-4">
                        {(pageDraft.timelineSection?.items || []).map((item, idx) => (
                          <div key={idx} className="p-4 border border-[#061B49]/10 rounded bg-[#F6F1E6]/20 relative">
                            <button type="button" onClick={() => updateArrayItem('timelineSection', idx, null)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                            <div className="grid gap-4 mt-2">
                              <AdminInput label="Tahun" value={item.year} onChange={(val) => updateArrayItem('timelineSection', idx, { year: val })} />
                              <AdminInput label="Judul" value={item.title} onChange={(val) => updateArrayItem('timelineSection', idx, { title: val })} />
                              <AdminTextarea label="Deskripsi" value={item.desc} onChange={(val) => updateArrayItem('timelineSection', idx, { desc: val })} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                </>
              )}

              {/* KHUSUS ADMISSION */}
              {activePageKey === 'admission' && (
                <>
                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">2</span>Program & Harga</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                      <AdminInput label="Label" value={pageDraft.programsSection?.label || ''} onChange={(val) => setPageDraft((d) => ({ ...d, programsSection: { ...(d.programsSection || defaultSiteContent.pages.admission.programsSection!), label: val } }))} />
                      <AdminInput label="Judul" value={pageDraft.programsSection?.title || ''} onChange={(val) => setPageDraft((d) => ({ ...d, programsSection: { ...(d.programsSection || defaultSiteContent.pages.admission.programsSection!), title: val } }))} />
                      <AdminTextarea label="Deskripsi" value={pageDraft.programsSection?.desc || ''} onChange={(val) => setPageDraft((d) => ({ ...d, programsSection: { ...(d.programsSection || defaultSiteContent.pages.admission.programsSection!), desc: val } }))} />

                      <div className="h-px bg-[#061B49]/10 my-6" />
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[#9B741F]">Daftar Program</h3>
                        <button type="button" onClick={() => updateArrayItem('programsSection', pageDraft.programsSection?.items?.length || 0, { id: '', name: '', age: '', fee: '', period: '', icon: '' })} className="flex items-center gap-1 text-sm text-[#164AA8] font-bold"><Plus className="w-4 h-4"/> Tambah</button>
                      </div>
                      
                      <div className="space-y-4">
                        {(pageDraft.programsSection?.items || []).map((item, idx) => (
                          <div key={idx} className="p-4 border border-[#061B49]/10 rounded bg-[#F6F1E6]/20 relative">
                            <button type="button" onClick={() => updateArrayItem('programsSection', idx, null)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                            <div className="grid gap-4 mt-2 sm:grid-cols-2">
                              <AdminInput label="ID (unik)" value={item.id} onChange={(val) => updateArrayItem('programsSection', idx, { id: val })} />
                              <AdminInput label="Nama Program" value={item.name} onChange={(val) => updateArrayItem('programsSection', idx, { name: val })} />
                              <AdminInput label="Usia" value={item.age} onChange={(val) => updateArrayItem('programsSection', idx, { age: val })} />
                              <AdminInput label="Biaya" value={item.fee} onChange={(val) => updateArrayItem('programsSection', idx, { fee: val })} />
                              <AdminInput label="Periode (misal: per semester)" value={item.period} onChange={(val) => updateArrayItem('programsSection', idx, { period: val })} />
                              <AdminInput label="Emoji Icon" value={item.icon} onChange={(val) => updateArrayItem('programsSection', idx, { icon: val })} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                  
                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">3</span>Timeline Pendaftaran</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                      <AdminInput label="Label" value={pageDraft.timelineAdmission?.label || ''} onChange={(val) => setPageDraft((d) => ({ ...d, timelineAdmission: { ...(d.timelineAdmission || defaultSiteContent.pages.admission.timelineAdmission!), label: val } }))} />
                      <AdminInput label="Judul" value={pageDraft.timelineAdmission?.title || ''} onChange={(val) => setPageDraft((d) => ({ ...d, timelineAdmission: { ...(d.timelineAdmission || defaultSiteContent.pages.admission.timelineAdmission!), title: val } }))} />
                      <AdminTextarea label="Deskripsi" value={pageDraft.timelineAdmission?.desc || ''} onChange={(val) => setPageDraft((d) => ({ ...d, timelineAdmission: { ...(d.timelineAdmission || defaultSiteContent.pages.admission.timelineAdmission!), desc: val } }))} />

                      <div className="h-px bg-[#061B49]/10 my-6" />
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[#9B741F]">Jadwal Pendaftaran</h3>
                        <button type="button" onClick={() => updateArrayItem('timelineAdmission', pageDraft.timelineAdmission?.items?.length || 0, { phase: '', date: '', status: '' })} className="flex items-center gap-1 text-sm text-[#164AA8] font-bold"><Plus className="w-4 h-4"/> Tambah</button>
                      </div>
                      
                      <div className="space-y-4">
                        {(pageDraft.timelineAdmission?.items || []).map((item, idx) => (
                          <div key={idx} className="p-4 border border-[#061B49]/10 rounded bg-[#F6F1E6]/20 relative">
                            <button type="button" onClick={() => updateArrayItem('timelineAdmission', idx, null)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                            <div className="grid gap-4 mt-2 sm:grid-cols-2">
                              <AdminInput label="Fase (Gelombang 1)" value={item.phase} onChange={(val) => updateArrayItem('timelineAdmission', idx, { phase: val })} />
                              <AdminInput label="Tanggal" value={item.date} onChange={(val) => updateArrayItem('timelineAdmission', idx, { date: val })} />
                              <div className="sm:col-span-2">
                                <AdminInput label="Status (early-bird, normal, late, announcement, registration, start)" value={item.status} onChange={(val) => updateArrayItem('timelineAdmission', idx, { status: val })} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>

                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">4</span>Persyaratan & CTA</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                      <h3 className="font-bold text-[#9B741F]">Section Persyaratan</h3>
                      <AdminInput label="Label Persyaratan" value={pageDraft.requirementsSection?.label || ''} onChange={(val) => setPageDraft((d) => ({ ...d, requirementsSection: { ...(d.requirementsSection || defaultSiteContent.pages.admission.requirementsSection!), label: val } }))} />
                      <AdminInput label="Judul Persyaratan" value={pageDraft.requirementsSection?.title || ''} onChange={(val) => setPageDraft((d) => ({ ...d, requirementsSection: { ...(d.requirementsSection || defaultSiteContent.pages.admission.requirementsSection!), title: val } }))} />
                      <AdminTextarea label="Deskripsi Persyaratan" value={pageDraft.requirementsSection?.desc || ''} onChange={(val) => setPageDraft((d) => ({ ...d, requirementsSection: { ...(d.requirementsSection || defaultSiteContent.pages.admission.requirementsSection!), desc: val } }))} />
                      <AdminTextarea label="Daftar Persyaratan (Pisahkan dengan Enter)" value={pageDraft.requirementsSection?.items?.join('\n') || ''} onChange={(val) => handleStringArrayChange(val, 'requirementsSection.items')} />
                      
                      <div className="h-px bg-[#061B49]/10 my-6" />
                      
                      <h3 className="font-bold text-[#9B741F]">Call To Action</h3>
                      <AdminInput label="Judul CTA" value={pageDraft.cta?.title || ''} onChange={(val) => setPageDraft((d) => ({ ...d, cta: { ...(d.cta || defaultSiteContent.pages.admission.cta!), title: val } }))} />
                      <AdminTextarea label="Deskripsi CTA" value={pageDraft.cta?.desc || ''} onChange={(val) => setPageDraft((d) => ({ ...d, cta: { ...(d.cta || defaultSiteContent.pages.admission.cta!), desc: val } }))} />
                      <AdminInput label="Teks Tombol Bantuan" value={pageDraft.cta?.buttonText || ''} onChange={(val) => setPageDraft((d) => ({ ...d, cta: { ...(d.cta || defaultSiteContent.pages.admission.cta!), buttonText: val } }))} />
                      <AdminInput label="Nomor Telepon Hotline" value={pageDraft.cta?.phoneText || ''} onChange={(val) => setPageDraft((d) => ({ ...d, cta: { ...(d.cta || defaultSiteContent.pages.admission.cta!), phoneText: val } }))} />
                    </div>
                  </details>
                </>
              )}

              {/* KHUSUS CAREER */}
              {activePageKey === 'career' && (
                <>
                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">2</span>Informasi Lowongan</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                      <AdminInput label="Label" value={pageDraft.openingsSection?.label || ''} onChange={(val) => setPageDraft((d) => ({ ...d, openingsSection: { ...(d.openingsSection || defaultSiteContent.pages.career.openingsSection!), label: val } }))} />
                      <AdminInput label="Judul" value={pageDraft.openingsSection?.title || ''} onChange={(val) => setPageDraft((d) => ({ ...d, openingsSection: { ...(d.openingsSection || defaultSiteContent.pages.career.openingsSection!), title: val } }))} />
                      <AdminTextarea label="Deskripsi" value={pageDraft.openingsSection?.desc || ''} onChange={(val) => setPageDraft((d) => ({ ...d, openingsSection: { ...(d.openingsSection || defaultSiteContent.pages.career.openingsSection!), desc: val } }))} />
                    </div>
                  </details>
                  
                  <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30">
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                      <div className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">3</span>Budaya Kerja (Values)</div>
                      <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[#9B741F]">Nilai Budaya Kerja</h3>
                        <button type="button" onClick={() => updateArrayItem('valuesSection', pageDraft.valuesSection?.items?.length || 0, { icon: 'Users', title: '', text: '' })} className="flex items-center gap-1 text-sm text-[#164AA8] font-bold"><Plus className="w-4 h-4"/> Tambah</button>
                      </div>
                      
                      <div className="space-y-4">
                        {(pageDraft.valuesSection?.items || []).map((item, idx) => (
                          <div key={idx} className="p-4 border border-[#061B49]/10 rounded bg-[#F6F1E6]/20 relative">
                            <button type="button" onClick={() => updateArrayItem('valuesSection', idx, null)} className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                            <div className="grid gap-4 mt-2">
                              <AdminInput label="Judul Nilai" value={item.title} onChange={(val) => updateArrayItem('valuesSection', idx, { title: val })} />
                              <AdminTextarea label="Deskripsi" value={item.text} onChange={(val) => updateArrayItem('valuesSection', idx, { text: val })} />
                              <AdminInput label="Icon (GraduationCap, Users, HeartHandshake)" value={item.icon} onChange={(val) => updateArrayItem('valuesSection', idx, { icon: val })} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                </>
              )}

              {activePageKey === 'terms' && (
                <details className="group rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/30" open>
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-bold text-[#061B49] list-none">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#061B49]/10 text-xs">2</span>
                      Konten Syarat dan Ketentuan
                    </div>
                    <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="border-t border-[#061B49]/10 p-5 space-y-4 bg-white rounded-b-lg">
                    <p className="text-sm text-[#516074]">
                      Tulis judul bagian di baris pertama, isi paragraf di bawahnya, lalu pisahkan tiap bagian dengan satu baris kosong.
                    </p>
                    <AdminTextarea
                      label="Isi Konten"
                      value={pageDraft.legalContent || ''}
                      onChange={(val) => setPageDraft((draft) => ({ ...draft, legalContent: val }))}
                      rows={18}
                    />
                  </div>
                </details>
              )}
            </div>

            <div className="mt-8 border-t border-[#061B49]/10 pt-5">
              <button disabled={busy} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60 md:w-auto">
                <Save className="h-4 w-4" />
                Simpan Halaman {activePageKey}
              </button>
            </div>
          </form>
        )}

        {activePanel === 'news' && (
          <div className="grid gap-6 xl:grid-cols-[minmax(360px,440px)_1fr]">
            <form onSubmit={saveNews} className="h-fit rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{newsDraft.id ? 'Update berita' : 'Berita baru'}</h2>
                <button
                  type="button"
                  onClick={() => setNewsDraft(emptyNewsDraft)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#164AA8]"
                >
                  <Plus className="h-4 w-4" />
                  Baru
                </button>
              </div>
              <div className="space-y-4">
                <AdminInput label="Judul" value={newsDraft.title} onChange={(title) => setNewsDraft((draft) => ({ ...draft, title }))} />
                <AdminTextarea label="Ringkasan" value={newsDraft.excerpt} onChange={(excerpt) => setNewsDraft((draft) => ({ ...draft, excerpt }))} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <AdminInput label="Kategori" value={newsDraft.category} onChange={(category) => setNewsDraft((draft) => ({ ...draft, category }))} />
                  <AdminInput label="Tanggal tampil" value={newsDraft.date} onChange={(date) => setNewsDraft((draft) => ({ ...draft, date }))} placeholder="22 Mei 2026" />
                </div>
                <AdminInput label="Penulis" value={newsDraft.author} onChange={(author) => setNewsDraft((draft) => ({ ...draft, author }))} />
                <AdminInput label="URL gambar" value={newsDraft.image} onChange={(image) => setNewsDraft((draft) => ({ ...draft, image }))} placeholder="/uploads/content/foto.jpg" />
                <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                  Upload gambar berita
                  <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadImage(event, 'news')} className="mt-2 block w-full text-xs text-[#516074]" />
                </label>
                {newsDraft.image && <AdminPreview src={newsDraft.image} alt={newsDraft.title || 'Preview berita'} />}
                <label className="flex items-center gap-3 rounded-md bg-[#F6F1E6] px-4 py-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={newsDraft.featured}
                    onChange={(event) => setNewsDraft((draft) => ({ ...draft, featured: event.target.checked }))}
                    className="h-4 w-4 accent-[#164AA8]"
                  />
                  Jadikan sorotan utama
                </label>
                <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60">
                  <Save className="h-4 w-4" />
                  Simpan berita
                </button>
              </div>
            </form>

            <ContentList title={`${content.news.length} berita`} subtitle={featuredNews ? `Sorotan: ${featuredNews.title}` : 'Belum ada sorotan utama.'}>
              {content.news.map((article) => (
                <article key={article.id} className="grid gap-4 border-b border-[#061B49]/10 py-4 last:border-b-0 md:grid-cols-[128px_1fr_auto]">
                  <AdminPreview src={article.image} alt={article.title} compact />
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9B741F]">
                      <span>{article.category}</span>
                      {article.featured && <span className="rounded bg-[#164AA8]/10 px-2 py-1 text-[#164AA8]">Sorotan</span>}
                    </div>
                    <h3 className="text-lg font-bold">{article.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#516074]">{article.excerpt}</p>
                    <p className="mt-2 text-xs font-semibold text-[#667085]">{article.date} | {article.author}</p>
                  </div>
                  <AdminActions
                    onEdit={() => setNewsDraft(article)}
                    onDelete={() => deleteNews(article)}
                  />
                </article>
              ))}
            </ContentList>
          </div>
        )}

        {activePanel === 'gallery' && (
          <div className="grid gap-6 xl:grid-cols-[minmax(360px,440px)_1fr]">
            <form onSubmit={saveGallery} className="h-fit rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{galleryDraft.id ? 'Update galeri' : 'Foto galeri baru'}</h2>
                <button
                  type="button"
                  onClick={() => setGalleryDraft(emptyGalleryDraft)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#164AA8]"
                >
                  <Plus className="h-4 w-4" />
                  Baru
                </button>
              </div>
              <div className="space-y-4">
                <AdminInput label="Judul foto" value={galleryDraft.title} onChange={(title) => setGalleryDraft((draft) => ({ ...draft, title }))} />
                <label className="block text-sm font-semibold">
                  Kategori
                  <select
                    value={galleryDraft.category}
                    onChange={(event) => setGalleryDraft((draft) => ({ ...draft, category: event.target.value as GalleryItem['category'] }))}
                    className="mt-2 w-full rounded-md border border-[#061B49]/15 bg-white px-4 py-3 outline-none focus:border-[#164AA8]"
                  >
                    {galleryCategoryOptions.map((category) => <option key={category}>{category}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-semibold">
                  Rasio kartu
                  <select
                    value={galleryDraft.aspect}
                    onChange={(event) => setGalleryDraft((draft) => ({ ...draft, aspect: event.target.value }))}
                    className="mt-2 w-full rounded-md border border-[#061B49]/15 bg-white px-4 py-3 outline-none focus:border-[#164AA8]"
                  >
                    {aspectOptions.map((aspect) => <option key={aspect.value} value={aspect.value}>{aspect.label}</option>)}
                  </select>
                </label>
                <AdminInput label="URL gambar" value={galleryDraft.src} onChange={(src) => setGalleryDraft((draft) => ({ ...draft, src }))} placeholder="/uploads/content/foto.jpg" />
                <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                  Upload gambar galeri (Bisa pilih lebih dari 1 foto)
                  <input disabled={busy} type="file" accept="image/*" multiple onChange={uploadMultipleGalleryImages} className="mt-2 block w-full text-xs text-[#516074]" />
                </label>
                {galleryDraft.images && galleryDraft.images.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {galleryDraft.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <AdminPreview src={img} alt={`Preview ${idx + 1}`} compact />
                        <button
                          type="button"
                          onClick={() => {
                            setGalleryDraft(d => {
                              const newImages = d.images?.filter((_, i) => i !== idx) || []
                              return {
                                ...d,
                                images: newImages.length > 0 ? newImages : undefined,
                                src: newImages[0] || ''
                              }
                            })
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  galleryDraft.src && <AdminPreview src={galleryDraft.src} alt={galleryDraft.title || 'Preview galeri'} />
                )}
                <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60">
                  <Save className="h-4 w-4" />
                  Simpan galeri
                </button>
              </div>
            </form>

            <ContentList title={`${content.gallery.length} item galeri`} subtitle="Item terbaru diletakkan paling depan.">
              <div className="grid gap-4 md:grid-cols-2">
                {content.gallery.map((item) => (
                  <article key={item.id} className="rounded-md border border-[#061B49]/10 p-3">
                    <AdminPreview src={item.src} alt={item.title} />
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B741F]">{item.category}</p>
                        <h3 className="mt-1 font-bold">{item.title}</h3>
                      </div>
                      <AdminActions
                        onEdit={() => setGalleryDraft(item)}
                        onDelete={() => deleteGallery(item)}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </ContentList>
          </div>
        )}

        {activePanel === 'academic-pages' && (
          <form onSubmit={saveAcademicPage} className="rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#061B49]/10 pb-5 lg:flex-row lg:items-end">
              <div>
                <h2 className="text-xl font-bold">Informasi Halaman Akademik</h2>
                <p className="mt-1 text-sm text-[#516074]">
                  Kelola judul, deskripsi, foto background, dan konten utama untuk setiap jenjang.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {academicLevelOptions.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setActiveAcademicLevel(level.value)}
                    className={`rounded-md px-4 py-2 text-sm font-semibold transition ${activeAcademicLevel === level.value ? 'bg-[#164AA8] text-white' : 'bg-[#F6F1E6] text-[#516074] hover:text-[#164AA8]'}`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-3xl">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#9B741F]">Hero Section</h3>
                <AdminInput label="Judul Halaman" value={academicPageDraft.title} onChange={(title) => setAcademicPageDraft((draft) => ({ ...draft, title }))} />
                <AdminTextarea label="Deskripsi" value={academicPageDraft.desc} onChange={(desc) => setAcademicPageDraft((draft) => ({ ...draft, desc }))} />
                <AdminInput label="Rentang Usia" value={academicPageDraft.age} onChange={(age) => setAcademicPageDraft((draft) => ({ ...draft, age }))} />
                <AdminTextarea
                  label="Background Images URL (satu URL per baris)"
                  value={(academicPageDraft.bgImages && academicPageDraft.bgImages.length > 0 ? academicPageDraft.bgImages : academicPageDraft.bgImage ? [academicPageDraft.bgImage] : []).join('\n')}
                  onChange={(val) => {
                    const images = val.split('\n').map((item) => item.trim()).filter(Boolean)
                    setAcademicPageDraft((draft) => ({
                      ...draft,
                      bgImage: images[0] || '',
                      bgImages: images,
                    }))
                  }}
                />
                <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                  Upload Banyak Gambar Background (Header)
                  <input disabled={busy} type="file" accept="image/*" multiple onChange={(event) => void uploadAcademicHeroBackgrounds(event)} className="mt-2 block w-full text-xs text-[#516074]" />
                </label>
                {(academicPageDraft.bgImages && academicPageDraft.bgImages.length > 0 ? academicPageDraft.bgImages : academicPageDraft.bgImage ? [academicPageDraft.bgImage] : []).length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {(academicPageDraft.bgImages && academicPageDraft.bgImages.length > 0 ? academicPageDraft.bgImages : academicPageDraft.bgImage ? [academicPageDraft.bgImage] : []).map((image, idx) => (
                      <div key={`${image}-${idx}`} className="rounded-md border border-[#061B49]/10 bg-[#FFFAF0] p-3">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-xs font-bold text-[#061B49]">Slide {idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => {
                              const currentImages = academicPageDraft.bgImages && academicPageDraft.bgImages.length > 0 ? academicPageDraft.bgImages : [academicPageDraft.bgImage]
                              const nextImages = currentImages.filter((_, imageIdx) => imageIdx !== idx).filter(Boolean)
                              setAcademicPageDraft((draft) => ({
                                ...draft,
                                bgImage: nextImages[0] || '',
                                bgImages: nextImages,
                              }))
                            }}
                            className="text-xs font-bold text-red-600"
                          >
                            Hapus
                          </button>
                        </div>
                        <AdminPreview src={image} alt={`Academic background ${idx + 1}`} compact />
                      </div>
                    ))}
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-[#9B741F] mt-6">Konten Utama</h3>
                <AdminInput label="Gambar Konten (Section Pembelajaran) URL" value={academicPageDraft.highlightImage} onChange={(highlightImage) => setAcademicPageDraft((draft) => ({ ...draft, highlightImage }))} />
                <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                  Upload Gambar Konten
                  <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadImage(event, 'academic-page-highlight')} className="mt-2 block w-full text-xs text-[#516074]" />
                </label>
                {academicPageDraft.highlightImage && <AdminPreview src={academicPageDraft.highlightImage} alt="Highlight Preview" />}
              </div>
            </div>

            <div className="mt-8 border-t border-[#061B49]/10 pt-6">
              <div className="mb-6 space-y-4">
                <h3 className="text-lg font-bold text-[#9B741F]">Fokus Utama Pembelajaran (Highlights)</h3>
                <AdminTextarea label="Deskripsi Pengantar Fokus" value={academicPageDraft.focusDesc || ''} onChange={(focusDesc) => setAcademicPageDraft((draft) => ({ ...draft, focusDesc }))} />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold text-[#061B49]">Poin Fokus Utama</h4>
                <button
                  type="button"
                  onClick={() => {
                    setAcademicPageDraft(draft => ({
                      ...draft,
                      highlights: [...(draft.highlights || []), { icon: 'Star', text: 'Fokus Baru' }]
                    }))
                  }}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#164AA8] bg-[#164AA8]/10 px-3 py-1.5 rounded-md hover:bg-[#164AA8]/20 transition"
                >
                  <Plus className="h-4 w-4" /> Tambah Poin
                </button>
              </div>
              
              {academicPageDraft.highlights && academicPageDraft.highlights.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {academicPageDraft.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex gap-2 p-3 border border-[#061B49]/10 rounded-md bg-neutral-50 relative group">
                      <select
                        value={highlight.icon}
                        onChange={(e) => {
                          const newHighlights = [...(academicPageDraft.highlights || [])]
                          newHighlights[idx] = { ...highlight, icon: e.target.value }
                          setAcademicPageDraft(d => ({ ...d, highlights: newHighlights }))
                        }}
                        className="rounded-md border border-[#061B49]/15 bg-white px-2 py-2 outline-none focus:border-[#164AA8] text-sm w-28 shrink-0"
                      >
                        {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                      </select>
                      <input
                        type="text"
                        value={highlight.text}
                        onChange={(e) => {
                          const newHighlights = [...(academicPageDraft.highlights || [])]
                          newHighlights[idx] = { ...highlight, text: e.target.value }
                          setAcademicPageDraft(d => ({ ...d, highlights: newHighlights }))
                        }}
                        className="w-full rounded-md border border-[#061B49]/15 bg-white px-3 py-2 outline-none focus:border-[#164AA8] text-sm"
                        placeholder="Teks fokus..."
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setAcademicPageDraft(d => ({
                            ...d,
                            highlights: d.highlights?.filter((_, i) => i !== idx)
                          }))
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm"
                        title="Hapus"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-500 italic">Belum ada poin fokus utama pembelajaran.</p>
              )}
            </div>

            <div className="mt-8 border-t border-[#061B49]/10 pt-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#9B741F]">Filosofi Program Pendidikan</h3>
                <p className="mt-1 text-sm text-[#516074]">
                  Kelola 3 section untuk menjelaskan hubungan sekolah, guru, dan tenaga pengajar dalam ekosistem belajar.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {(academicPageDraft.philosophySections || emptyAcademicPageDraft.philosophySections || []).slice(0, 3).map((section, idx) => (
                  <div key={idx} className="rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/40 p-4">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#9B741F]">
                      Section {idx + 1}
                    </p>
                    <div className="space-y-4">
                      <AdminInput
                        label="Judul"
                        value={section.title}
                        onChange={(title) => {
                          const nextSections = [...(academicPageDraft.philosophySections || emptyAcademicPageDraft.philosophySections || [])]
                          nextSections[idx] = { ...section, title }
                          setAcademicPageDraft((draft) => ({ ...draft, philosophySections: nextSections }))
                        }}
                      />
                      <AdminTextarea
                        label="Deskripsi"
                        value={section.desc}
                        onChange={(desc) => {
                          const nextSections = [...(academicPageDraft.philosophySections || emptyAcademicPageDraft.philosophySections || [])]
                          nextSections[idx] = { ...section, desc }
                          setAcademicPageDraft((draft) => ({ ...draft, philosophySections: nextSections }))
                        }}
                      />
                      <AdminInput
                        label="URL Gambar"
                        value={section.image}
                        onChange={(image) => {
                          const nextSections = [...(academicPageDraft.philosophySections || emptyAcademicPageDraft.philosophySections || [])]
                          nextSections[idx] = { ...section, image }
                          setAcademicPageDraft((draft) => ({ ...draft, philosophySections: nextSections }))
                        }}
                      />
                      <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                        Upload Gambar Filosofi
                        <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadAcademicPhilosophyImage(event, idx)} className="mt-2 block w-full text-xs text-[#516074]" />
                      </label>
                      {section.image && <AdminPreview src={section.image} alt={section.title || `Filosofi ${idx + 1}`} compact />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {activeAcademicLevel === 'secondary' && (
              <div className="mt-8 border-t border-[#061B49]/10 pt-6">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-[#9B741F]">Program Secondary</h3>
                  <p className="mt-1 text-sm text-[#516074]">
                    Konten ini tampil sebagai Junior High School dan Senior High School di header dan section halaman Secondary.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {(academicPageDraft.secondaryPrograms || emptyAcademicPageDraft.secondaryPrograms || []).map((program, idx) => (
                    <div key={program.id || idx} className="rounded-lg border border-[#061B49]/10 bg-[#F6F1E6]/40 p-4">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <h4 className="font-bold text-[#061B49]">{program.title || `Program ${idx + 1}`}</h4>
                        <select
                          value={program.icon || 'BookOpen'}
                          onChange={(event) => {
                            const nextPrograms = [...(academicPageDraft.secondaryPrograms || emptyAcademicPageDraft.secondaryPrograms || [])]
                            nextPrograms[idx] = { ...program, icon: event.target.value }
                            setAcademicPageDraft((draft) => ({ ...draft, secondaryPrograms: nextPrograms }))
                          }}
                          className="rounded-md border border-[#061B49]/15 bg-white px-2 py-2 text-sm outline-none focus:border-[#164AA8]"
                        >
                          {iconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                        </select>
                      </div>

                      <div className="space-y-4">
                        <AdminInput
                          label="Judul Program"
                          value={program.title}
                          onChange={(title) => {
                            const nextPrograms = [...(academicPageDraft.secondaryPrograms || emptyAcademicPageDraft.secondaryPrograms || [])]
                            nextPrograms[idx] = { ...program, title }
                            setAcademicPageDraft((draft) => ({ ...draft, secondaryPrograms: nextPrograms }))
                          }}
                        />
                        <AdminTextarea
                          label="Deskripsi Program"
                          value={program.desc}
                          onChange={(desc) => {
                            const nextPrograms = [...(academicPageDraft.secondaryPrograms || emptyAcademicPageDraft.secondaryPrograms || [])]
                            nextPrograms[idx] = { ...program, desc }
                            setAcademicPageDraft((draft) => ({ ...draft, secondaryPrograms: nextPrograms }))
                          }}
                        />
                        <AdminTextarea
                          label="Poin Program (satu poin per baris)"
                          value={(program.points || []).join('\n')}
                          onChange={(value) => {
                            const nextPrograms = [...(academicPageDraft.secondaryPrograms || emptyAcademicPageDraft.secondaryPrograms || [])]
                            nextPrograms[idx] = {
                              ...program,
                              points: value.split('\n').map((point) => point.trim()).filter(Boolean),
                            }
                            setAcademicPageDraft((draft) => ({ ...draft, secondaryPrograms: nextPrograms }))
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 border-t border-[#061B49]/10 pt-5">
              <button disabled={busy} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60 md:w-auto">
                <Save className="h-4 w-4" />
                Simpan Info Akademik
              </button>
            </div>
          </form>
        )}

        {activePanel === 'academic-extracurriculars' && (
          <form onSubmit={saveAcademicExtracurriculars} className="rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#061B49]/10 pb-5 lg:flex-row lg:items-end">
              <div>
                <h2 className="text-xl font-bold">Pengembangan Minat & Bakat</h2>
                <p className="mt-1 text-sm text-[#516074]">
                  Kelola kartu Ekstrakurikuler Pilihan untuk halaman Preschool, Primary, dan Secondary.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {academicLevelOptions.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setActiveAcademicLevel(level.value)}
                    className={`rounded-md px-4 py-2 text-sm font-semibold transition ${activeAcademicLevel === level.value ? 'bg-[#164AA8] text-white' : 'bg-[#F6F1E6] text-[#516074] hover:text-[#164AA8]'}`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B741F]">
                  {academicLevelOptions.find((level) => level.value === activeAcademicLevel)?.label}
                </p>
                <p className="mt-1 text-sm text-[#516074]">
                  {content.academicExtracurriculars[activeAcademicLevel].length} item ekstrakurikuler.
                </p>
              </div>
              <button
                type="button"
                onClick={() => addAcademicExtracurricular(activeAcademicLevel)}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#164AA8]/25 bg-[#164AA8]/10 px-4 py-2 text-sm font-semibold text-[#164AA8] hover:bg-[#164AA8] hover:text-white"
              >
                <Plus className="h-4 w-4" />
                Tambah item
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {content.academicExtracurriculars[activeAcademicLevel].map((item, index) => (
                <article key={item.id} className="rounded-lg border border-[#061B49]/10 bg-[#FFFAF0] p-4">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B741F]">Item {index + 1}</p>
                      <h3 className="mt-1 font-bold">{item.name || 'Ekstrakurikuler baru'}</h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteAcademicExtracurricular(activeAcademicLevel, item)}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#A12B2B]/15 text-[#A12B2B] hover:bg-[#A12B2B]/10"
                      title="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[160px_1fr]">
                    <div>
                      {item.image ? (
                        <AdminPreview src={item.image} alt={item.name || 'Preview ekskul'} />
                      ) : (
                        <div className="flex aspect-[16/10] items-center justify-center rounded-md bg-[#E8E1D3] text-xs font-semibold text-[#516074]">
                          Belum ada gambar
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <AdminInput label="Nama ekstrakurikuler" value={item.name} onChange={(name) => updateAcademicExtracurricular(activeAcademicLevel, item.id, { name })} />
                      <AdminTextarea label="Deskripsi" value={item.desc} onChange={(desc) => updateAcademicExtracurricular(activeAcademicLevel, item.id, { desc })} />
                      <AdminInput label="URL gambar" value={item.image} onChange={(image) => updateAcademicExtracurricular(activeAcademicLevel, item.id, { image })} placeholder="/uploads/content/foto.jpg" />
                      <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                        Upload gambar ekskul
                        <input
                          disabled={busy}
                          type="file"
                          accept="image/*"
                          onChange={(event) => void uploadAcademicExtracurricularImage(event, activeAcademicLevel, item.id)}
                          className="mt-2 block w-full text-xs text-[#516074]"
                        />
                      </label>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <button disabled={busy} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60 md:w-auto">
              <Save className="h-4 w-4" />
              Simpan ekskul akademik
            </button>
          </form>
        )}

        {activePanel === 'achievements' && (
          <div className="grid gap-6 xl:grid-cols-[minmax(380px,480px)_1fr]">
            <form onSubmit={saveAchievement} className="h-fit rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{achievementDraft.id ? 'Update prestasi' : 'Prestasi baru'}</h2>
                <button
                  type="button"
                  onClick={() => setAchievementDraft(emptyAchievementDraft)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#164AA8]"
                >
                  <Plus className="h-4 w-4" />
                  Baru
                </button>
              </div>
              <div className="space-y-4">
                <AdminInput label="Judul prestasi" value={achievementDraft.title} onChange={(title) => setAchievementDraft((draft) => ({ ...draft, title }))} />
                <AdminTextarea label="Deskripsi" value={achievementDraft.desc} onChange={(desc) => setAchievementDraft((draft) => ({ ...draft, desc }))} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <AdminInput label="Tahun" value={String(achievementDraft.year)} onChange={(year) => setAchievementDraft((draft) => ({ ...draft, year: Number(year) }))} placeholder="2026" />
                  <AdminInput label="Kategori" value={achievementDraft.category} onChange={(category) => setAchievementDraft((draft) => ({ ...draft, category }))} placeholder="akademik" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <AdminInput label="Siswa / tim" value={achievementDraft.student} onChange={(student) => setAchievementDraft((draft) => ({ ...draft, student }))} />
                  <AdminInput label="Kelas" value={achievementDraft.class} onChange={(studentClass) => setAchievementDraft((draft) => ({ ...draft, class: studentClass }))} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <AdminInput label="Level" value={achievementDraft.level} onChange={(level) => setAchievementDraft((draft) => ({ ...draft, level }))} placeholder="national" />
                  <label className="block text-sm font-semibold">
                    Medali
                    <input
                      list="medal-options"
                      value={achievementDraft.medal}
                      onChange={(event) => setAchievementDraft((draft) => ({ ...draft, medal: event.target.value }))}
                      className="mt-2 w-full rounded-md border border-[#061B49]/15 bg-white px-4 py-3 outline-none focus:border-[#164AA8]"
                      placeholder="Ketik atau pilih medali..."
                    />
                    <datalist id="medal-options">
                      <option value="gold" />
                      <option value="silver" />
                      <option value="bronze" />
                    </datalist>
                  </label>
                </div>
                <AdminInput label="URL gambar prestasi" value={achievementDraft.image} onChange={(image) => setAchievementDraft((draft) => ({ ...draft, image }))} />
                <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                  Upload gambar prestasi
                  <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadImage(event, 'achievement')} className="mt-2 block w-full text-xs text-[#516074]" />
                </label>
                {achievementDraft.image && <AdminPreview src={achievementDraft.image} alt={achievementDraft.title || 'Preview prestasi'} />}
                <label className="flex items-center gap-3 rounded-md bg-[#F6F1E6] px-4 py-3 text-sm font-semibold">
                  <input
                    type="checkbox"
                    checked={achievementDraft.featured}
                    onChange={(event) => setAchievementDraft((draft) => ({ ...draft, featured: event.target.checked }))}
                    className="h-4 w-4 accent-[#164AA8]"
                  />
                  Tampilkan di sorotan prestasi
                </label>
                {achievementDraft.featured && (
                  <div className="space-y-4 rounded-md border border-[#C8A35A]/25 bg-[#FFFAF0] p-4">
                    <AdminInput label="Label sorotan" value={achievementDraft.featuredLabel} onChange={(featuredLabel) => setAchievementDraft((draft) => ({ ...draft, featuredLabel }))} placeholder="Tingkat Internasional" />
                    <AdminInput label="Tim sorotan" value={achievementDraft.featuredTeam} onChange={(featuredTeam) => setAchievementDraft((draft) => ({ ...draft, featuredTeam }))} />
                    <AdminInput label="Mentor sorotan" value={achievementDraft.featuredMentor} onChange={(featuredMentor) => setAchievementDraft((draft) => ({ ...draft, featuredMentor }))} />
                    <AdminInput label="URL foto siswa/tim kecil" value={achievementDraft.studentImage} onChange={(studentImage) => setAchievementDraft((draft) => ({ ...draft, studentImage }))} />
                    <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-white px-4 py-3 text-sm font-semibold text-[#164AA8]">
                      Upload foto kecil sorotan
                      <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadImage(event, 'achievement-student')} className="mt-2 block w-full text-xs text-[#516074]" />
                    </label>
                  </div>
                )}
                <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60">
                  <Save className="h-4 w-4" />
                  Simpan prestasi
                </button>
              </div>
            </form>

            <ContentList title={`${content.achievements.length} prestasi`} subtitle={`${content.achievements.filter((item) => item.featured).length} item tampil sebagai sorotan.`}>
              {content.achievements.map((item) => (
                <article key={item.id} className="grid gap-4 border-b border-[#061B49]/10 py-4 last:border-b-0 md:grid-cols-[128px_1fr_auto]">
                  <AdminPreview src={item.image} alt={item.title} compact />
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9B741F]">
                      <span>{item.year}</span>
                      <span>{item.category}</span>
                      {item.featured && <span className="rounded bg-[#164AA8]/10 px-2 py-1 text-[#164AA8]">Sorotan</span>}
                    </div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm text-[#516074]">{item.student} | {item.class} | {item.level}</p>
                  </div>
                  <AdminActions onEdit={() => setAchievementDraft(item)} onDelete={() => deleteAchievement(item)} />
                </article>
              ))}
            </ContentList>
          </div>
        )}

        {activePanel === 'facilities' && (
          <div className="space-y-6">
            <form onSubmit={saveFacilitiesBannerConfig} className="rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm md:p-7">
              <div className="mb-5 flex flex-col justify-between gap-3 border-b border-[#061B49]/10 pb-5 md:flex-row md:items-end">
                <div>
                  <h2 className="text-xl font-bold">Banner utama halaman fasilitas</h2>
                  <p className="mt-1 text-sm text-[#516074]">
                    Media ini tampil pada spanduk besar halaman fasilitas, bukan logo atau header navigasi.
                  </p>
                </div>
                <Link href={`/${editLang}/facilities`} target="_blank" className="inline-flex items-center gap-2 text-sm font-semibold text-[#164AA8]">
                  Lihat halaman
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <AdminInput label="Judul banner fasilitas" value={pageDraft.heroTitle || ''} onChange={(heroTitle) => setPageDraft((draft) => ({ ...draft, heroTitle }))} />
                  <AdminTextarea label="Subjudul banner fasilitas" value={pageDraft.heroSubtitle || ''} onChange={(heroSubtitle) => setPageDraft((draft) => ({ ...draft, heroSubtitle }))} />
                  <AdminTextarea
                    label="Gambar fallback banner (satu URL per baris)"
                    value={(pageDraft.heroBgImages && pageDraft.heroBgImages.length > 0 ? pageDraft.heroBgImages : pageDraft.heroBgImage ? [pageDraft.heroBgImage] : []).join('\n')}
                    onChange={(value) => {
                      const images = value.split('\n').map((item) => item.trim()).filter(Boolean)
                      setPageDraft((draft) => ({ ...draft, heroBgImage: images[0] || '', heroBgImages: images }))
                    }}
                  />
                  <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                    Upload gambar banner fasilitas
                    <input disabled={busy} type="file" accept="image/*" multiple onChange={(event) => void uploadPageHeroBackgrounds(event)} className="mt-2 block w-full text-xs text-[#516074]" />
                  </label>
                </div>

                <div className="space-y-4">
                  <AdminInput
                    label="Video banner utama fasilitas URL (MP4)"
                    value={pageDraft.heroVideo || ''}
                    onChange={(heroVideo) => setPageDraft((draft) => ({ ...draft, heroVideo }))}
                    placeholder="/uploads/content/fasilitas-banner.mp4"
                  />
                  <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                    Upload video banner fasilitas
                    <input disabled={busy} type="file" accept="video/mp4" onChange={(event) => void uploadImage(event, 'page-hero-video')} className="mt-2 block w-full text-xs text-[#516074]" />
                  </label>
                  {pageDraft.heroVideo ? (
                    <div className="rounded-md border border-[#061B49]/10 bg-[#FFFAF0] p-3">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-xs font-bold text-[#061B49]">Preview video banner</span>
                        <button type="button" onClick={() => setPageDraft((draft) => ({ ...draft, heroVideo: '' }))} className="text-xs font-bold text-red-600">
                          Hapus video
                        </button>
                      </div>
                      <video src={pageDraft.heroVideo} controls className="max-h-56 w-full rounded-md object-cover" />
                    </div>
                  ) : (
                    pageDraft.heroBgImage && <AdminPreview src={pageDraft.heroBgImage} alt="Preview banner fasilitas" />
                  )}
                </div>
              </div>

              <button disabled={busy} type="submit" className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-[#061B49] px-5 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60">
                <Save className="h-4 w-4" />
                Simpan banner fasilitas
              </button>
            </form>

            <div className="grid gap-6 xl:grid-cols-[minmax(360px,440px)_1fr]">
            <form onSubmit={saveFacility} className="h-fit rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{facilityDraft.id ? 'Update fasilitas' : 'Fasilitas baru'}</h2>
                <button type="button" onClick={() => setFacilityDraft(emptyFacilityDraft)} className="inline-flex items-center gap-1 text-sm font-semibold text-[#164AA8]">
                  <Plus className="h-4 w-4" />
                  Baru
                </button>
              </div>
              <div className="space-y-4">
                <AdminInput label="Nama fasilitas" value={facilityDraft.title} onChange={(title) => setFacilityDraft((draft) => ({ ...draft, title }))} />
                <AdminTextarea label="Deskripsi singkat" value={facilityDraft.description || ''} onChange={(description) => setFacilityDraft((draft) => ({ ...draft, description }))} />
                <AdminInput label="URL gambar" value={facilityDraft.image} onChange={(image) => setFacilityDraft((draft) => ({ ...draft, image }))} />
                <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                  Upload gambar fasilitas
                  <input disabled={busy} type="file" accept="image/*" multiple onChange={(event) => void uploadMultipleFacilityImages(event)} className="mt-2 block w-full text-xs text-[#516074]" />
                </label>
                {(facilityDraft.images && facilityDraft.images.length > 0 ? facilityDraft.images : facilityDraft.image ? [facilityDraft.image] : []).length > 0 && (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {(facilityDraft.images && facilityDraft.images.length > 0 ? facilityDraft.images : facilityDraft.image ? [facilityDraft.image] : []).map((image, idx) => (
                      <div key={`${image}-${idx}`} className="rounded-md border border-[#061B49]/10 bg-[#FFFAF0] p-2">
                        <AdminPreview src={image} alt={`${facilityDraft.title || 'Preview fasilitas'} ${idx + 1}`} compact />
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => setFacilityDraft((draft) => ({ ...draft, image }))}
                            className={`text-[11px] font-bold ${facilityDraft.image === image ? 'text-[#9B741F]' : 'text-[#164AA8]'}`}
                          >
                            {facilityDraft.image === image ? 'Utama' : 'Jadikan utama'}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setFacilityDraft((draft) => {
                                const currentImages = draft.images && draft.images.length > 0 ? draft.images : draft.image ? [draft.image] : []
                                const nextImages = currentImages.filter((_, imageIndex) => imageIndex !== idx)
                                return {
                                  ...draft,
                                  image: draft.image === image ? nextImages[0] || '' : draft.image,
                                  images: nextImages,
                                }
                              })
                            }}
                            className="text-[11px] font-bold text-red-600"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <AdminInput label="URL video fasilitas (opsional, MP4)" value={facilityDraft.video || ''} onChange={(video) => setFacilityDraft((draft) => ({ ...draft, video }))} />
                <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                  Upload video fasilitas
                  <input disabled={busy} type="file" accept="video/mp4" onChange={(event) => void uploadImage(event, 'facility-video')} className="mt-2 block w-full text-xs text-[#516074]" />
                </label>
                {facilityDraft.video && (
                  <div className="rounded-md border border-[#061B49]/10 bg-[#FFFAF0] p-3">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-[#061B49]">Preview video fasilitas</span>
                      <button type="button" onClick={() => setFacilityDraft((draft) => ({ ...draft, video: '' }))} className="text-xs font-bold text-red-600">
                        Hapus video
                      </button>
                    </div>
                    <video src={facilityDraft.video} controls className="max-h-40 w-full rounded-md object-cover" />
                  </div>
                )}
                <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60">
                  <Save className="h-4 w-4" />
                  Simpan fasilitas
                </button>
              </div>
            </form>

            <ContentList title={`${content.facilities.length} fasilitas`} subtitle="Urutan terbaru muncul lebih dulu di halaman fasilitas.">
              <div className="grid gap-4 md:grid-cols-2">
                {content.facilities.map((item) => (
                  <article key={item.id} className="rounded-md border border-[#061B49]/10 p-3">
                    <AdminPreview src={item.images?.[0] || item.image} alt={item.title} />
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="mt-1 text-xs font-semibold text-[#516074]">
                          {(item.images?.length || (item.image ? 1 : 0))} gambar
                        </p>
                        {item.video && <p className="mt-1 text-xs font-semibold text-[#164AA8]">Video fasilitas aktif</p>}
                      </div>
                      <AdminActions onEdit={() => setFacilityDraft(item)} onDelete={() => deleteFacility(item)} />
                    </div>
                  </article>
                ))}
              </div>
            </ContentList>
            </div>
          </div>
        )}

        {activePanel === 'career' && (
          <div className="grid gap-6 xl:grid-cols-[minmax(340px,420px)_1fr]">
            <form onSubmit={saveOpening} className="h-fit rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{openingDraft.id ? 'Update lowongan' : 'Lowongan baru'}</h2>
                <button type="button" onClick={() => setOpeningDraft(emptyOpeningDraft)} className="inline-flex items-center gap-1 text-sm font-semibold text-[#164AA8]">
                  <Plus className="h-4 w-4" />
                  Baru
                </button>
              </div>
              <div className="space-y-4">
                <AdminInput label="Judul posisi" value={openingDraft.title} onChange={(title) => setOpeningDraft((draft) => ({ ...draft, title }))} />
                <AdminInput label="Tim" value={openingDraft.team} onChange={(team) => setOpeningDraft((draft) => ({ ...draft, team }))} />
                <AdminInput label="Tipe kerja" value={openingDraft.type} onChange={(type) => setOpeningDraft((draft) => ({ ...draft, type }))} />
                <AdminInput label="Tanggal Pembukaan (misal: 15 Mei 2026)" value={openingDraft.postedDate || ''} onChange={(postedDate) => setOpeningDraft((draft) => ({ ...draft, postedDate }))} />
                <AdminInput label="Batas Akhir / Deadline (misal: 30 Juni 2026)" value={openingDraft.deadlineDate || ''} onChange={(deadlineDate) => setOpeningDraft((draft) => ({ ...draft, deadlineDate }))} />
                <AdminTextarea label="Deskripsi Pekerjaan" value={openingDraft.description || ''} onChange={(description) => setOpeningDraft((draft) => ({ ...draft, description }))} />
                <AdminTextarea label="Kualifikasi & Persyaratan (Satu baris per persyaratan)" value={Array.isArray(openingDraft.requirements) ? openingDraft.requirements.join('\n') : (openingDraft.requirements || '')} onChange={(requirements) => setOpeningDraft((draft) => ({ ...draft, requirements: requirements as any }))} />
                <AdminTextarea label="Tanggung Jawab Utama (Satu baris per tanggung jawab)" value={Array.isArray(openingDraft.responsibilities) ? openingDraft.responsibilities.join('\n') : (openingDraft.responsibilities || '')} onChange={(responsibilities) => setOpeningDraft((draft) => ({ ...draft, responsibilities: responsibilities as any }))} />
                <AdminInput label="Email Tujuan Pelamar (opsional, contoh: career@pelitacemerlang.sch.id)" value={openingDraft.applyEmail || ''} onChange={(applyEmail) => setOpeningDraft((draft) => ({ ...draft, applyEmail }))} />
                <AdminTextarea label="Alamat Penyerahan Berkas Fisik / Walk-in (opsional)" value={openingDraft.applyAddress || ''} onChange={(applyAddress) => setOpeningDraft((draft) => ({ ...draft, applyAddress }))} />
                <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60">
                  <Save className="h-4 w-4" />
                  Simpan lowongan
                </button>
              </div>
            </form>

            <ContentList title={`${content.careerOpenings.length} posisi terbuka`} subtitle="Posisi ini tampil di halaman karir.">
              {content.careerOpenings.map((item) => (
                <article key={item.id} className="flex flex-col gap-4 border-b border-[#061B49]/10 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B741F]">
                      {item.team} | {item.type}
                      {item.postedDate && ` | Buka: ${item.postedDate}`}
                      {item.deadlineDate && ` | Batas: ${item.deadlineDate}`}
                    </p>
                    <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                  </div>
                  <AdminActions onEdit={() => setOpeningDraft(item)} onDelete={() => deleteOpening(item)} />
                </article>
              ))}
            </ContentList>
          </div>
        )}

        {activePanel === 'social' && (
          <div className="grid gap-6 xl:grid-cols-[minmax(380px,460px)_1fr]">
            <form onSubmit={saveSocialPost} className="h-fit rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{socialDraft.id ? 'Update post sosial' : 'Post sosial baru'}</h2>
                <button type="button" onClick={() => { setSocialDraft(emptySocialDraft); setSocialManualEntry(false) }} className="inline-flex items-center gap-1 text-sm font-semibold text-[#164AA8]">
                  <Plus className="h-4 w-4" />
                  Baru
                </button>
              </div>
              <div className="space-y-4">
                <AdminTextarea label="Link atau embed media sosial" value={socialDraft.sourceUrl} onChange={(sourceUrl) => setSocialDraft((draft) => ({ ...emptySocialDraft, id: draft.id, sourceUrl }))} />
                <button
                  type="button"
                  disabled={socialPreviewLoading || busy}
                  onClick={() => void readSocialMetadata()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#164AA8]/25 bg-[#164AA8]/10 px-4 py-3 font-semibold text-[#164AA8] transition hover:bg-[#164AA8] hover:text-white disabled:opacity-60"
                >
                  <Share2 className="h-4 w-4" />
                  {socialPreviewLoading ? 'Membaca sumber...' : 'Ambil metadata dari link'}
                </button>
                <button
                  type="button"
                  onClick={() => setSocialManualEntry((current) => !current)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-[#061B49]/15 px-4 py-3 font-semibold text-[#516074] transition hover:border-[#164AA8] hover:text-[#164AA8]"
                >
                  {socialManualEntry ? 'Tutup input manual' : 'Isi manual'}
                </button>
                {socialDraft.image && <AdminPreview src={socialDraft.image} alt={socialDraft.title || 'Preview media sosial'} />}
                {socialDraft.title && (
                  <div className="space-y-3 rounded-md border border-[#061B49]/10 bg-[#F6F1E6] p-4 text-sm">
                    <p className="font-bold text-[#061B49]">{socialDraft.platform} | {socialDraft.type} | {socialDraft.date}</p>
                    <AdminInput label="Judul tampil di website" value={socialDraft.title} onChange={(title) => setSocialDraft((draft) => ({ ...draft, title }))} />
                    <AdminTextarea label="Caption / deskripsi tampil di website" value={socialDraft.excerpt} onChange={(excerpt) => setSocialDraft((draft) => ({ ...draft, excerpt }))} />
                    <p className="text-xs font-semibold text-[#516074]">
                      Metrik: {socialDraft.metric || 'Tidak dikirim sumber'} | Komentar: {socialDraft.comments || 'Tidak dikirim sumber'}
                    </p>
                  </div>
                )}
                {socialManualEntry && (
                  <div className="space-y-4 rounded-md border border-[#C8A35A]/25 bg-[#FFFAF0] p-4">
                    <label className="block text-sm font-semibold">
                      Platform
                      <select
                        value={socialDraft.platform}
                        onChange={(event) => setSocialDraft((draft) => ({ ...draft, platform: event.target.value as SocialPlatform }))}
                        className="mt-2 w-full rounded-md border border-[#061B49]/15 bg-white px-4 py-3 outline-none focus:border-[#164AA8]"
                      >
                        {socialPlatformOptions.map((platform) => <option key={platform}>{platform}</option>)}
                      </select>
                    </label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <AdminInput label="Format" value={socialDraft.type} onChange={(type) => setSocialDraft((draft) => ({ ...draft, type }))} placeholder="Reels" />
                      <AdminInput label="Tanggal" value={socialDraft.date} onChange={(date) => setSocialDraft((draft) => ({ ...draft, date }))} placeholder="22 Mei 2026" />
                    </div>
                    {!socialDraft.title && <AdminInput label="Judul post" value={socialDraft.title} onChange={(title) => setSocialDraft((draft) => ({ ...draft, title }))} />}
                    {!socialDraft.excerpt && <AdminTextarea label="Ringkasan" value={socialDraft.excerpt} onChange={(excerpt) => setSocialDraft((draft) => ({ ...draft, excerpt }))} />}
                    <AdminInput label="URL poster / gambar" value={socialDraft.image} onChange={(image) => setSocialDraft((draft) => ({ ...draft, image }))} />
                    <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                      Upload poster sosial
                      <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadImage(event, 'social')} className="mt-2 block w-full text-xs text-[#516074]" />
                    </label>
                    <AdminInput label="URL video opsional" value={socialDraft.video} onChange={(video) => setSocialDraft((draft) => ({ ...draft, video }))} placeholder="Kosongkan agar link sumber dipakai" />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <AdminInput label="Metrik" value={socialDraft.metric} onChange={(metric) => setSocialDraft((draft) => ({ ...draft, metric }))} placeholder="24K views" />
                      <AdminInput label="Komentar" value={socialDraft.comments} onChange={(comments) => setSocialDraft((draft) => ({ ...draft, comments }))} placeholder="420 komentar" />
                    </div>
                    <AdminInput label="Posisi gambar" value={socialDraft.objectPosition} onChange={(objectPosition) => setSocialDraft((draft) => ({ ...draft, objectPosition }))} placeholder="center" />
                  </div>
                )}
                <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60">
                  <Save className="h-4 w-4" />
                  Simpan post
                </button>
              </div>
            </form>

            <ContentList title={`${content.socialPosts.length} post sosial`} subtitle="Post terbaru menjadi kandidat tampilan utama halaman media sosial.">
              {content.socialPosts.map((item) => (
                <article key={item.id} className="grid gap-4 border-b border-[#061B49]/10 py-4 last:border-b-0 md:grid-cols-[128px_1fr_auto]">
                  <AdminPreview src={item.image} alt={item.title} compact />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B741F]">{item.platform} | {item.type} | {item.date}</p>
                    <h3 className="mt-1 text-lg font-bold">{item.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#516074]">{item.excerpt}</p>
                  </div>
                  <AdminActions onEdit={() => { setSocialDraft(item); setSocialManualEntry(true) }} onDelete={() => deleteSocialPost(item)} />
                </article>
              ))}
            </ContentList>
          </div>
        )}

        {activePanel === 'testimonials' && (
          <div className="grid gap-6 xl:grid-cols-[minmax(340px,420px)_1fr]">
            <form onSubmit={saveTestimonial} className="h-fit rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{testimonialDraft.id ? 'Update testimoni' : 'Testimoni baru'}</h2>
                <button type="button" onClick={() => setTestimonialDraft(emptyTestimonialDraft)} className="inline-flex items-center gap-1 text-sm font-semibold text-[#164AA8]">
                  <Plus className="h-4 w-4" />
                  Baru
                </button>
              </div>
              <div className="space-y-4">
                <AdminTextarea label="Isi testimoni" value={testimonialDraft.text} onChange={(text) => setTestimonialDraft((draft) => ({ ...draft, text }))} />
                <AdminInput label="Nama" value={testimonialDraft.author} onChange={(author) => setTestimonialDraft((draft) => ({ ...draft, author }))} />
                <AdminInput label="Peran" value={testimonialDraft.role} onChange={(role) => setTestimonialDraft((draft) => ({ ...draft, role }))} />
                <AdminInput label="URL foto profil" value={testimonialDraft.photo} onChange={(photo) => setTestimonialDraft((draft) => ({ ...draft, photo }))} placeholder="/uploads/content/profil.jpg" />
                <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                  Upload foto profil
                  <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadImage(event, 'testimonial')} className="mt-2 block w-full text-xs text-[#516074]" />
                </label>
                {testimonialDraft.photo && <AdminPreview src={testimonialDraft.photo} alt={testimonialDraft.author || 'Preview foto profil'} compact />}
                <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60">
                  <Save className="h-4 w-4" />
                  Simpan testimoni
                </button>
              </div>
            </form>

            <ContentList title={`${content.testimonials.length} testimoni`} subtitle="Testimoni ini berputar di halaman depan.">
              {content.testimonials.map((item) => (
                <article key={item.id} className="flex flex-col gap-4 border-b border-[#061B49]/10 py-4 last:border-b-0 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    {item.photo && <AdminPreview src={item.photo} alt={item.author} compact />}
                    <div>
                    <p className="text-sm leading-7 text-[#516074]">{item.text}</p>
                    <h3 className="mt-3 font-bold">{item.author}</h3>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B741F]">{item.role}</p>
                    </div>
                  </div>
                  <AdminActions onEdit={() => setTestimonialDraft(item)} onDelete={() => deleteTestimonial(item)} />
                </article>
              ))}
            </ContentList>
          </div>
        )}

        {activePanel === 'alumni' && (
          <div className="grid gap-6 xl:grid-cols-[minmax(340px,420px)_1fr]">
            <form onSubmit={saveAlumniDestination} className="h-fit rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{alumniDestinationDraft.id ? 'Update tujuan alumni' : 'Tujuan alumni baru'}</h2>
                <button type="button" onClick={() => setAlumniDestinationDraft(emptyAlumniDestinationDraft)} className="inline-flex items-center gap-1 text-sm font-semibold text-[#164AA8]">
                  <Plus className="h-4 w-4" />
                  Baru
                </button>
              </div>
              <div className="space-y-4">
                <AdminInput label="Nama universitas" value={alumniDestinationDraft.name} onChange={(name) => setAlumniDestinationDraft((draft) => ({ ...draft, name }))} placeholder="University of Oxford" />
                <AdminInput label="URL gambar" value={alumniDestinationDraft.image} onChange={(image) => setAlumniDestinationDraft((draft) => ({ ...draft, image }))} placeholder="/uploads/content/universitas.jpg" />
                <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                  Upload gambar universitas
                  <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadImage(event, 'alumni')} className="mt-2 block w-full text-xs text-[#516074]" />
                </label>
                {alumniDestinationDraft.image && <AdminPreview src={alumniDestinationDraft.image} alt={alumniDestinationDraft.name || 'Preview universitas'} />}
                <button disabled={busy} className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#061B49] px-4 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60">
                  <Save className="h-4 w-4" />
                  Simpan tujuan alumni
                </button>
              </div>
            </form>

            <ContentList title={`${content.alumniDestinations.length} tujuan alumni`} subtitle="Item ini tampil pada section Our Alumni Destinations di halaman depan.">
              <div className="grid gap-3 md:grid-cols-2">
                {content.alumniDestinations.map((item) => (
                  <article key={item.id} className="flex items-center justify-between gap-4 rounded-md border border-[#061B49]/10 p-4">
                    {item.image && <AdminPreview src={item.image} alt={item.name} compact />}
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9B741F]">
                        {item.name.split(' ').map((part) => part[0]).join('').slice(0, 3)}
                      </p>
                      <h3 className="mt-1 font-bold">{item.name}</h3>
                    </div>
                    <AdminActions onEdit={() => setAlumniDestinationDraft(item)} onDelete={() => deleteAlumniDestination(item)} />
                  </article>
                ))}
              </div>
            </ContentList>
          </div>
        )}

        {activePanel === 'contact' && (
          <form onSubmit={saveContactInfo} className="max-w-4xl rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Informasi kontak pusat</h2>
              <p className="mt-1 text-sm text-[#516074]">Dipakai halaman kontak dan footer.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput label="Alamat" value={contactDraft.address} onChange={(address) => setContactDraft((draft) => ({ ...draft, address }))} />
              <AdminInput label="Telepon" value={contactDraft.phone} onChange={(phone) => setContactDraft((draft) => ({ ...draft, phone }))} />
              <AdminInput label="Email" value={contactDraft.email} onChange={(email) => setContactDraft((draft) => ({ ...draft, email }))} />
              <AdminInput label="Jam operasional" value={contactDraft.hours} onChange={(hours) => setContactDraft((draft) => ({ ...draft, hours }))} />
              <AdminInput label="URL Facebook" value={contactDraft.facebookUrl} onChange={(facebookUrl) => setContactDraft((draft) => ({ ...draft, facebookUrl }))} />
              <AdminInput label="URL Instagram" value={contactDraft.instagramUrl} onChange={(instagramUrl) => setContactDraft((draft) => ({ ...draft, instagramUrl }))} />
              <AdminInput label="URL LinkedIn" value={contactDraft.linkedinUrl} onChange={(linkedinUrl) => setContactDraft((draft) => ({ ...draft, linkedinUrl }))} />
              <AdminInput label="URL YouTube" value={contactDraft.youtubeUrl} onChange={(youtubeUrl) => setContactDraft((draft) => ({ ...draft, youtubeUrl }))} />
            </div>
            <div className="mt-4">
              <AdminTextarea label="URL embed peta atau kode iframe Google Maps" value={contactDraft.mapEmbedUrl} onChange={(mapEmbedUrl) => setContactDraft((draft) => ({ ...draft, mapEmbedUrl }))} />
            </div>
            <button disabled={busy} className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-[#061B49] px-5 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60">
              <Save className="h-4 w-4" />
              Simpan kontak
            </button>
          </form>
        )}

        {activePanel === 'footer' && (
          <form onSubmit={saveFooterInfo} className="max-w-4xl rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm md:p-7">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Informasi Footer & Logo</h2>
              <p className="mt-1 text-sm text-[#516074]">Mengatur teks pada footer website dan logo utama.</p>
            </div>
            
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <AdminInput label="URL Logo Header" value={globalConfigDraft.headerLogo} onChange={(val) => setGlobalConfigDraft((draft) => ({ ...draft, headerLogo: val }))} />
                <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                  Upload Logo Header
                  <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadImage(event, 'global-header-logo')} className="mt-2 block w-full text-xs text-[#516074]" />
                </label>
                {globalConfigDraft.headerLogo && <AdminPreview src={globalConfigDraft.headerLogo} alt="Header Logo" compact />}
              </div>
              <div className="space-y-4">
                <AdminInput label="URL Logo Footer (Kosongkan bila sama)" value={globalConfigDraft.footerLogo} onChange={(val) => setGlobalConfigDraft((draft) => ({ ...draft, footerLogo: val }))} />
                <label className="block rounded-md border border-dashed border-[#164AA8]/35 bg-[#164AA8]/5 px-4 py-3 text-sm font-semibold text-[#164AA8]">
                  Upload Logo Footer
                  <input disabled={busy} type="file" accept="image/*" onChange={(event) => void uploadImage(event, 'global-footer-logo')} className="mt-2 block w-full text-xs text-[#516074]" />
                </label>
                {globalConfigDraft.footerLogo && <AdminPreview src={globalConfigDraft.footerLogo} alt="Footer Logo" compact />}
              </div>
            </div>

            <div className="grid gap-4 mb-8">
              <AdminTextarea label="Deskripsi Profil Sekolah (Footer)" value={footerDraft.description} onChange={(description) => setFooterDraft((draft) => ({ ...draft, description }))} />
            </div>

            <div className="mb-6 border-t border-[#061B49]/10 pt-6">
              <h3 className="text-lg font-bold">Pengaturan Menu Navigasi</h3>
              <p className="mt-1 text-sm text-[#516074] mb-4">Pilih menu mana saja yang ingin ditampilkan di Header dan Footer website.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                {[
                  { key: 'nav.about', label: 'Tentang Kami' },
                  { key: 'nav.academic', label: 'Akademik (Utama)' },
                  { key: '/academic/preschool', label: '↳ Preschool', isSub: true },
                  { key: '/academic/primary', label: '↳ Primary School', isSub: true },
                  { key: '/academic/secondary', label: '↳ Secondary School', isSub: true },
                  { key: 'nav.facilities', label: 'Fasilitas' },
                  { key: 'nav.achievements', label: 'Prestasi' },
                  { key: 'nav.mediacenter', label: 'Pusat Media (Utama)' },
                  { key: '/gallery', label: '↳ Galeri', isSub: true },
                  { key: '/news', label: '↳ Berita', isSub: true },
                  { key: '/social-media', label: '↳ Media Sosial', isSub: true },
                  { key: 'nav.information', label: 'Info Tambahan (Utama)' },
                  { key: '/contact', label: '↳ Kontak', isSub: true },
                  { key: '/career', label: '↳ Karir', isSub: true }
                ].map((menu) => {
                  // Default true if undefined to prevent hiding everything unintentionally
                  const isActive = globalConfigDraft.activeMenus?.[menu.key] ?? true;
                  
                  return (
                    <label key={menu.key} className={`flex items-center gap-3 p-3 border border-[#061B49]/10 rounded-md cursor-pointer hover:bg-[#F6F1E6]/50 transition ${menu.isSub ? 'ml-6 border-l-4 border-l-[#164AA8]/20 bg-gray-50/50' : ''}`}>
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={(e) => {
                            const newActiveMenus = { 
                              ...(globalConfigDraft.activeMenus || defaultSiteContent.globalConfig.activeMenus!),
                              [menu.key]: e.target.checked 
                            };
                            setGlobalConfigDraft(d => ({ ...d, activeMenus: newActiveMenus }));
                          }}
                          className="peer h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-[#164AA8]/30 checked:border-[#164AA8] checked:bg-[#164AA8] transition-all"
                        />
                        <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none">
                          <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className={`text-sm select-none ${menu.isSub ? 'text-gray-600 font-medium' : 'font-bold'}`}>{menu.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <button disabled={busy} className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-[#061B49] px-5 py-3 font-semibold text-white transition hover:bg-[#164AA8] disabled:opacity-60">
              <Save className="h-4 w-4" />
              Simpan pengaturan
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

function AdminInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-[#061B49]/15 px-4 py-3 outline-none transition focus:border-[#164AA8] focus:ring-2 focus:ring-[#164AA8]/15"
      />
    </label>
  )
}

function AdminTextarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  rows?: number
}) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full resize-y rounded-md border border-[#061B49]/15 px-4 py-3 outline-none transition focus:border-[#164AA8] focus:ring-2 focus:ring-[#164AA8]/15"
      />
    </label>
  )
}

function AdminPreview({
  src,
  alt,
  compact = false,
}: {
  src: string
  alt: string
  compact?: boolean
}) {
  if (isVideoSource(src)) {
    return (
      <div className={`relative overflow-hidden rounded-md bg-[#061B49] ${compact ? 'h-28' : 'aspect-[16/10]'}`}>
        <video
          src={src}
          muted
          controls
          className="h-full w-full object-cover"
          aria-label={alt}
        />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-md bg-[#E8E1D3] ${compact ? 'h-28' : 'aspect-[16/10]'}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={compact ? '128px' : '(max-width: 768px) 100vw, 420px'}
        unoptimized={isUploadedImage(src)}
        className="object-cover"
      />
    </div>
  )
}

function AdminActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="flex shrink-0 gap-2">
      <button
        type="button"
        title="Edit"
        onClick={onEdit}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#061B49]/15 text-[#164AA8] hover:bg-[#164AA8]/10"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        title="Hapus"
        onClick={onDelete}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#061B49]/15 text-[#A12B2B] hover:bg-[#A12B2B]/10"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

function ContentList({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-lg border border-[#061B49]/10 bg-white p-5 shadow-sm">
      <div className="mb-3">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-[#516074]">{subtitle}</p>
      </div>
      {children}
    </section>
  )
}
