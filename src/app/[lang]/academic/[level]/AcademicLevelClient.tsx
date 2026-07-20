'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { ArrowRight, BookOpen, Brain, Clock, Users, GraduationCap, ChevronDown, Target, Heart, Globe, Lightbulb, Star, Shield, Award } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { SplitTextReveal, LetterReveal } from '@/components/KineticTypography'
import ThreeDCard, { ThreeDCardItem } from '@/components/ThreeDCard'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import WaveBackground from '@/components/WaveBackground'
import { useLanguage } from '@/components/LanguageProvider'
import HeroBackground from '@/components/HeroBackground'
import type { AcademicExtracurriculars, AcademicLevelKey, AcademicPageContent } from '@/types/siteContent'

const iconMap: Record<string, React.ElementType> = {
  Heart,
  Target,
  BookOpen,
  Lightbulb,
  Globe,
  Brain,
  Users,
  Star,
  Shield,
  Award,
  GraduationCap,
}

// Define data specific to each level
const levelData: Record<string, any> = {
  preschool: {
    id: 'preschool',
    name: 'Preschool',
    title: 'Membangun Fondasi Karakter & Kreativitas',
    desc: 'Fokus pada pengembangan motorik, sosial, emosional, dan kognitif anak melalui pendekatan bermain yang terstruktur dalam lingkungan yang aman.',
    age: '3 - 6 Tahun',
    principal: {
      name: 'Ms. Maria Christina, M.Pd.',
      role: 'Principal of Preschool',
      image: 'https://picsum.photos/1200/1600?random=11',
      message: 'Selamat datang di jenjang Preschool. Kami percaya setiap anak adalah unik dan memiliki potensi luar biasa. Di sini, kami menciptakan lingkungan belajar yang hangat, menyenangkan, dan menstimulasi rasa ingin tahu mereka untuk mulai menjelajahi dunia.'
    },
    highlights: [
      { icon: 'Heart', text: 'Sensory & Motor Play' },
      { icon: 'Target', text: 'Character Building' },
      { icon: 'BookOpen', text: 'Basic Literacy' },
      { icon: 'Lightbulb', text: 'Creative Arts' }
    ],
    extracurriculars: [
      { name: 'Dancing', desc: 'Membangun kelenturan dan kepercayaan diri melalui gerak tari ceria.', image: 'https://picsum.photos/1200/800?random=101' },
      { name: 'Lukis', desc: 'Mengekspresikan imajinasi dan melatih kreativitas dengan kanvas warna.', image: 'https://picsum.photos/1200/800?random=102' },
      { name: 'Renang', desc: 'Pengenalan air dan pelatihan motorik dasar untuk keselamatan.', image: 'https://picsum.photos/1200/800?random=103' },
      { name: 'Futsal', desc: 'Aktivitas bermain bola untuk melatih koordinasi dan kekompakan tim.', image: 'https://picsum.photos/1200/800?random=104' },
      { name: 'Dancing Modern', desc: 'Tarian modern yang merangsang kepekaan ritmik dan motorik kasar anak.', image: 'https://picsum.photos/1200/800?random=105' }
    ],
    bgImage: '/images/hero-g.jpg'
  },
  primary: {
    id: 'primary',
    name: 'Primary School',
    title: 'Eksplorasi Pengetahuan & Kemandirian',
    desc: 'Mengembangkan literasi dasar, numerasi, dan pemahaman dunia melalui kurikulum yang adaptif dan menantang untuk merangsang potensi maksimal siswa.',
    age: '6 - 12 Tahun',
    principal: {
      name: 'Mr. David Santoso, S.Pd.',
      role: 'Principal of Primary School',
      image: 'https://picsum.photos/1200/1600?random=12',
      message: 'Di jenjang Primary, kami berdedikasi untuk membekali siswa dengan fondasi akademik yang kuat serta menumbuhkan jiwa kepemimpinan sejak dini. Kami mendorong kemandirian dan rasa tanggung jawab dalam setiap langkah pembelajaran mereka.'
    },
    highlights: [
      { icon: 'Globe', text: 'Bilingual Program' },
      { icon: 'Brain', text: 'STEM Integration' },
      { icon: 'Users', text: 'Leadership Skills' },
      { icon: 'Target', text: 'Physical Education' }
    ],
    extracurriculars: [
      { name: 'Futsal', desc: 'Pengembangan teknik dasar sepak bola dan strategi kerja sama tim.', image: 'https://picsum.photos/1200/800?random=106' },
      { name: 'Dancing', desc: 'Melatih keluwesan, kebugaran fisik, dan ekspresi melalui tarian.', image: 'https://picsum.photos/1200/800?random=107' },
      { name: 'Basket', desc: 'Pelatihan dasar melempar, menangkap, dan kompetisi sehat bola basket.', image: 'https://picsum.photos/1200/800?random=108' },
      { name: 'Wusho', desc: 'Pelatihan seni bela diri untuk menanamkan kedisiplinan dan fokus.', image: 'https://picsum.photos/1200/800?random=109' },
      { name: 'Renang', desc: 'Pelatihan teknik renang gaya utama untuk kebugaran tubuh secara holistik.', image: 'https://picsum.photos/1200/800?random=110' },
      { name: 'Batminton', desc: 'Keterampilan dasar pukulan, refleks, dan kegesitan dalam bulu tangkis.', image: 'https://picsum.photos/1200/800?random=111' }
    ],
    bgImage: '/images/hero-g.jpg'
  },
  secondary: {
    id: 'secondary',
    name: 'Secondary School',
    title: 'Persiapan Masa Depan Global',
    desc: 'Membentuk pemikir kritis, inovator, dan pemimpin masa depan melalui program akademik komprehensif dan panduan karir.',
    age: '12 - 18 Tahun',
    principal: {
      name: 'Dr. Sarah Wijaya, M.Ed.',
      role: 'Principal of Secondary School',
      image: 'https://picsum.photos/1200/1600?random=13',
      message: 'Masa Secondary adalah fase transisi krusial menuju kedewasaan. Kurikulum kami dirancang untuk menantang pemikiran kritis, memupuk inovasi, dan secara strategis mempersiapkan siswa untuk sukses di perguruan tinggi dan panggung karir global.'
    },
    highlights: [
      { icon: 'Lightbulb', text: 'Advanced Mentorship' },
      { icon: 'Target', text: 'Career Counseling' },
      { icon: 'Globe', text: 'Global Perspective' },
      { icon: 'Heart', text: 'Community Service' }
    ],
    extracurriculars: [
      { name: 'Cookery', desc: 'Pengembangan keterampilan tata boga, kreativitas menu, dan pemahaman nutrisi.', image: 'https://picsum.photos/1200/800?random=112' },
      { name: 'Basket', desc: 'Pembinaan bola basket kompetitif yang mengasah taktik dan stamina.', image: 'https://picsum.photos/1200/800?random=113' },
      { name: 'Futsal', desc: 'Latihan teknik lanjutan, kepemimpinan tim, dan persiapan kompetisi.', image: 'https://picsum.photos/1200/800?random=114' },
      { name: 'Computer', desc: 'Pengembangan literasi digital, desain, pemrograman dasar, dan multimedia.', image: 'https://picsum.photos/1200/800?random=115' }
    ],
    bgImage: '/images/hero-g.jpg'
  }
}
const curriculumFeaturesByLang = {
  id: [
    { icon: BookOpen, title: 'Kurikulum Bilingual', desc: 'Pembelajaran menggunakan proporsi Bahasa Indonesia dan Bahasa Inggris secara dinamis.' },
    { icon: Brain, title: 'Metode Pembelajaran Aktif', desc: 'Student-centered learning dengan pendekatan berbasis proyek dan kolaborasi.' },
    { icon: Clock, title: 'Fleksibilitas Waktu', desc: 'Sistem jam belajar yang disesuaikan dengan kapasitas dan psikologi usia perkembangan siswa.' },
    { icon: Users, title: 'Rasio Kelas Optimal', desc: 'Jumlah siswa dibatasi per kelas untuk memastikan atensi yang lebih personal bagi setiap anak.' },
  ],
  en: [
    { icon: BookOpen, title: 'Bilingual Curriculum', desc: 'Learning uses Indonesian and English dynamically across classroom activities.' },
    { icon: Brain, title: 'Active Learning Method', desc: 'Student-centered learning through project-based exploration and collaboration.' },
    { icon: Clock, title: 'Age-Responsive Schedule', desc: "Learning time is adapted to students' capacity and developmental psychology." },
    { icon: Users, title: 'Optimal Class Ratio', desc: 'Class sizes are managed to provide more personal attention for every student.' },
  ],
}

const pageLabels = {
  id: {
    levelBadge: 'Jenjang Pendidikan',
    scroll: 'Scroll Down',
    focusTitle: 'Fokus Utama Pembelajaran',
    focusFallback: (name: string) => `Di jenjang ${name}, kami menyesuaikan pendekatan pedagogi dengan tahap perkembangan psikologis dan kognitif siswa untuk memberikan hasil pembelajaran yang paling optimal.`,
    secondaryEyebrow: 'Program Secondary',
    philosophyEyebrow: 'Filosofi Pendidikan',
    philosophyTitle: 'Hubungan yang Membentuk Ekosistem Belajar',
    standardEyebrow: 'Standar Pendidikan',
    methodTitle: 'Keunggulan Metode Kami',
    talentEyebrow: 'Pengembangan Minat & Bakat',
    extracurricularTitle: 'Ekstrakurikuler Pilihan',
    otherEyebrow: 'Jenjang Lain',
    otherTitle: 'Kenali Program Pendidikan Berkesinambungan Kami',
    ctaTitle: (name: string) => `Siap Memulai Perjalanan di ${name}?`,
    ctaDesc: 'Daftarkan anak Anda hari ini dan jadilah bagian dari revolusi pendidikan yang berorientasi pada masa depan.',
    ctaButton: 'Pendaftaran Online',
  },
  en: {
    levelBadge: 'Education Level',
    scroll: 'Scroll Down',
    focusTitle: 'Learning Focus',
    focusFallback: (name: string) => `At the ${name} level, we align our pedagogy with students' psychological and cognitive development to create the most effective learning outcomes.`,
    secondaryEyebrow: 'Secondary Programs',
    philosophyEyebrow: 'Education Philosophy',
    philosophyTitle: 'Relationships That Shape the Learning Ecosystem',
    standardEyebrow: 'Education Standards',
    methodTitle: 'Our Method Excellence',
    talentEyebrow: 'Interest & Talent Development',
    extracurricularTitle: 'Selected Extracurriculars',
    otherEyebrow: 'Other Levels',
    otherTitle: 'Explore Our Continuous Education Programs',
    ctaTitle: (name: string) => `Ready to Start Your Journey at ${name}?`,
    ctaDesc: 'Register your child today and become part of a future-oriented education journey.',
    ctaButton: 'Online Registration',
  },
}

const secondaryPrograms = {
  id: [
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
  en: [
    {
      id: 'junior-high-school',
      title: 'Junior High School',
      desc: 'Building a strong middle-school academic foundation, independent learning habits, character, and critical thinking through guided active learning.',
      points: ['Supportive learning transition', 'Stronger literacy, numeracy, and science', 'Character building and collaboration'],
      icon: 'BookOpen',
    },
    {
      id: 'senior-high-school',
      title: 'Senior High School',
      desc: 'Preparing students for university and a global future through academic guidance, portfolio development, and career exploration.',
      points: ['University preparation', 'Career guidance and mentoring', 'Leadership and global readiness'],
      icon: 'GraduationCap',
    },
  ],
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 60, damping: 20 } }
}

function isUploadedImage(src: string) {
  return src.startsWith('/uploads/')
}

export default function AcademicLevelClient({
  level,
  academicExtracurriculars,
  academicPages,
}: {
  level: string
  academicExtracurriculars: AcademicExtracurriculars
  academicPages: Record<AcademicLevelKey, AcademicPageContent>
}) {
  const { lang } = useLanguage()
  const getLocalizedPath = (path: string) => `/${lang}${path === '/' ? '' : path}`
  const rawLevel = level
  const currentLevelKey: AcademicLevelKey = Object.hasOwn(levelData, rawLevel)
    ? rawLevel as AcademicLevelKey
    : 'primary'
  
  const pageContent = academicPages[currentLevelKey]
  const data = {
    ...pageContent,
    highlights: pageContent.highlights && pageContent.highlights.length > 0 ? pageContent.highlights : levelData[currentLevelKey].highlights,
    extracurriculars: academicExtracurriculars[currentLevelKey],
  }
  const displayedSecondaryPrograms = currentLevelKey === 'secondary' && data.secondaryPrograms?.length
    ? data.secondaryPrograms
    : secondaryPrograms[lang]
  const labels = pageLabels[lang]
  const curriculumFeatures = curriculumFeaturesByLang[lang]
  const headerRef = useRef<HTMLDivElement>(null)

  // Determine other levels for bottom navigation
  const otherLevels = (Object.keys(academicPages) as AcademicLevelKey[])
    .filter(l => l !== currentLevelKey)
    .map(l => academicPages[l])

  if (!data) return null;

  return (
    <div className="bg-[#FFFAF0] min-h-screen selection:bg-[#164AA8] selection:text-white relative overflow-hidden">
      <WaveBackground />

      {/* ============================================
          PAGE HEADER - Hero with Dynamic Level
          ============================================ */}
      <section ref={headerRef} className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
        <HeroBackground
          alt={`${data.name} Background`}
          fallbackImage={data.bgImage}
          images={data.bgImages}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A3A8D]/85 via-[#0A3A8D]/60 to-[#FFFAF0]" />
        
        <motion.div initial="hidden" animate="show" variants={staggerContainer} className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-20">
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#164AA8]/20 border border-[#164AA8]/30 backdrop-blur-sm">
            <GraduationCap className="w-5 h-5 text-[#DCC9AA]" />
            <span className="text-[#DCC9AA] font-semibold text-xs tracking-[0.2em] uppercase font-jakarta">{labels.levelBadge}</span>
          </motion.div>

          <h1 className="font-playfair text-6xl md:text-8xl font-bold text-white tracking-tight mb-8 leading-tight flex flex-col items-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCC9AA] to-[#C8A35A] drop-shadow-sm">
              <SplitTextReveal text={data.name} delay={0.2} />
            </span>
          </h1>

          {currentLevelKey === 'secondary' && (
            <motion.div
              variants={fadeUp}
              className="mx-auto mb-8 flex max-w-2xl flex-col items-center justify-center gap-3 sm:flex-row"
            >
              {displayedSecondaryPrograms.map((program, index) => (
                <a
                  key={program.title}
                  href={`#${program.id || (index === 0 ? 'junior-high-school' : 'senior-high-school')}`}
                  className="inline-flex w-full items-center justify-center rounded-full border border-[#DCC9AA]/45 bg-white/10 px-5 py-3 font-jakarta text-sm font-bold text-[#FFFAF0] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#DCC9AA] hover:bg-[#DCC9AA] hover:text-[#061B49] sm:w-auto"
                >
                  {program.title}
                </a>
              ))}
            </motion.div>
          )}

          <p className="text-xl md:text-2xl text-white/90 font-playfair max-w-3xl mx-auto leading-relaxed mb-6 font-medium">
            <SplitTextReveal text={data.title} delay={0.4} />
          </p>
          <p className="text-base md:text-lg text-white/70 font-jakarta font-light max-w-2xl mx-auto leading-relaxed mb-12">
            <SplitTextReveal text={data.desc} delay={0.6} />
          </p>
        </motion.div>

        <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[#0A3A8D]/50 text-xs font-jakarta tracking-wider uppercase font-bold">{labels.scroll}</span>
            <ChevronDown className="w-6 h-6 text-[#0A3A8D]/50 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ============================================
          LEVEL HIGHLIGHTS & INTRO
          ============================================ */}
      <section className="py-24 relative z-30 -mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-[2.5rem] shadow-xl border border-[#D7C5A7]/50 p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#164AA8]/5 to-transparent rounded-bl-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="grid lg:grid-cols-2 gap-16 relative z-10">
              <ScrollReveal direction="right" once={true}>
                <h3 className="font-playfair text-4xl font-bold text-[#0A3A8D] mb-6">{labels.focusTitle}</h3>
                <p className="text-[#164AA8] font-light leading-relaxed mb-10 text-lg">
                  {data.focusDesc || labels.focusFallback(data.name)}
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {data.highlights.map((item: any, i: number) => {
                    const IconComponent = iconMap[item.icon] || Star
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[#164AA8]/5 flex items-center justify-center shrink-0 border border-[#164AA8]/10">
                          <IconComponent className="w-6 h-6 text-[#164AA8]" />
                        </div>
                        <span className="font-jakarta font-semibold text-[#0A3A8D] text-sm">{item.text}</span>
                      </div>
                    )
                  })}
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={0.2} once={true} className="relative h-[300px] lg:h-full min-h-[300px] rounded-[2rem] overflow-hidden shadow-lg border border-[#D7C5A7]">
                 <Image src={pageContent.highlightImage} alt={`${data.name} Activity`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {data.philosophySections && data.philosophySections.length > 0 && (
        <section className="relative z-20 border-y border-[#D7C5A7]/35 bg-[#FFFAF0] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-14 max-w-3xl md:mb-18">
              <span className="mb-5 block font-jakarta text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9B741F]">
                {labels.philosophyEyebrow}
              </span>
              <h2 className="font-playfair text-4xl font-bold leading-tight tracking-tight text-[#061B49] md:text-5xl">
                <SplitTextReveal text={labels.philosophyTitle} />
              </h2>
            </div>

            <div className="divide-y divide-[#D7C5A7]/45 border-y border-[#D7C5A7]/45">
              {data.philosophySections.slice(0, 3).map((section, index) => (
                <ScrollReveal key={`${section.title}-${index}`} direction={index % 2 === 0 ? 'right' : 'left'} delay={index * 0.1} once={true}>
                  <article className="group grid gap-8 py-10 md:grid-cols-2 md:items-center md:gap-14 md:py-14 lg:gap-20">
                    <div className={`relative aspect-[16/11] overflow-hidden rounded-lg bg-[#061B49] md:aspect-[5/4] ${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 44vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized={isUploadedImage(section.image)}
                      />
                      <div className="absolute inset-0 bg-[#061B49]/10 transition-colors duration-500 group-hover:bg-transparent" />
                    </div>

                    <div className={index % 2 === 1 ? 'md:order-1' : 'md:order-2'}>
                      <div className="mb-6 flex items-center gap-4">
                        <span className="font-jakarta text-sm font-semibold tabular-nums text-[#9B741F]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="h-px w-12 bg-[#D7C5A7]" />
                      </div>
                      <h3 className="mb-5 max-w-xl font-playfair text-3xl font-bold leading-tight text-[#061B49] md:text-4xl">
                        {section.title}
                      </h3>
                      <p className="max-w-xl font-jakarta text-base font-light leading-8 text-[#516074]">
                        {section.desc}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentLevelKey === 'secondary' && (
        <section className="relative z-20 bg-transparent py-6 md:py-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <span className="mb-4 block font-jakarta text-xs font-semibold uppercase tracking-[0.22em] text-[#164AA8]">
                {labels.secondaryEyebrow}
              </span>
              <h2 className="font-playfair text-4xl font-bold tracking-tight text-[#0A3A8D] md:text-5xl">
                <SplitTextReveal text={lang === 'id' ? 'Junior High & Senior High School' : 'Junior High & Senior High School'} />
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {displayedSecondaryPrograms.map((program, index) => {
                const ProgramIcon = iconMap[program.icon] || BookOpen
                return (
                <ScrollReveal direction="up" delay={index * 0.1} once={true} key={program.title}>
                  <div
                    id={program.id || (index === 0 ? 'junior-high-school' : 'senior-high-school')}
                    className="group relative h-full scroll-mt-32 overflow-hidden rounded-[2rem] border border-[#D7C5A7]/60 bg-white/75 p-7 shadow-[0_18px_52px_rgba(6,27,73,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_64px_rgba(6,27,73,0.14)] md:p-9"
                  >
                    <div className="absolute right-0 top-0 h-44 w-44 translate-x-16 -translate-y-16 rounded-full bg-[#164AA8]/8 transition-transform duration-500 group-hover:scale-125" />
                    <div className="relative z-10">
                      <div className="mb-7 flex items-center justify-between gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#164AA8]/10 bg-[#164AA8]/5">
                          <ProgramIcon className="h-7 w-7 text-[#164AA8]" />
                        </div>
                      </div>

                      <h3 className="mb-4 font-playfair text-3xl font-bold text-[#0A3A8D] md:text-4xl">
                        {program.title}
                      </h3>
                      <p className="mb-7 font-jakarta text-base font-light leading-8 text-[#164AA8]">
                        {program.desc}
                      </p>

                      <div className="grid gap-3">
                        {program.points.map((point) => (
                          <div key={point} className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#DCC9AA]" />
                            <span className="font-jakarta text-sm font-semibold leading-6 text-[#0A3A8D]">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================
          BENTO GRID FEATURES - General Methodology
          ============================================ */}
      <section className="py-24 bg-transparent relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#164AA8] font-semibold text-xs tracking-[0.2em] uppercase mb-4 block font-jakarta">{labels.standardEyebrow}</span>
            <h2 className="font-playfair text-4xl font-bold text-[#0A3A8D] tracking-tight">
              <SplitTextReveal text={labels.methodTitle} />
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculumFeatures.map((feature, index) => (
              <ScrollReveal direction="up" delay={index * 0.08} once={true} key={feature.title}>
                <div className="bg-white/60 backdrop-blur-sm rounded-[1.5rem] p-8 shadow-sm border border-[#D7C5A7]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-14 h-14 bg-[#164AA8]/5 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-[#164AA8]" />
                  </div>
                  <h4 className="font-jakarta font-bold text-[#0A3A8D] text-lg mb-3 leading-tight">{feature.title}</h4>
                  <p className="text-[#164AA8] font-light leading-relaxed text-sm">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          EXTRACURRICULAR PROGRAMS
          ============================================ */}
      <section className="py-16 md:py-20 bg-white/30 backdrop-blur-sm border-t border-[#D7C5A7]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="text-left">
              <span className="text-[#164AA8] font-semibold text-[10px] tracking-[0.22em] uppercase mb-3 block font-jakarta">{labels.talentEyebrow}</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#0A3A8D] tracking-tight">
                <SplitTextReveal text={labels.extracurricularTitle} />
              </h2>
            </div>
          </div>
          
          {/* Compact carousel cards */}
          <div className="pb-10">
            <ScrollReveal direction="up" once={true}>
              <Splide
                hasTrack={false}
                options={{
                  type: 'loop',
                  perPage: 3,
                  perMove: 1,
                  gap: '1rem',
                  pagination: true,
                  arrows: true,
                  autoplay: true,
                  interval: 4000,
                  breakpoints: {
                    1024: { perPage: 2 },
                    640: { perPage: 1 },
                  },
                }}
                className="extracurricular-splide"
              >
                <div className="relative">
                  <SplideTrack>
                    {data.extracurriculars?.map((ekskul: any, index: number) => (
                      <SplideSlide key={ekskul.name} className="py-3">
                        <div className="relative h-[230px] overflow-hidden rounded-[1.25rem] border border-[#D7C5A7]/60 bg-[#061B49] shadow-[0_14px_34px_rgba(6,27,73,0.10)] transition-all duration-500 group hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(6,27,73,0.16)]">
                          <Image 
                            src={ekskul.image} 
                            alt={ekskul.name} 
                            fill 
                            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={95}
                            unoptimized={isUploadedImage(ekskul.image)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#061B49]/92 via-[#061B49]/35 to-transparent z-10" />
                          <div className="absolute left-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-xs font-bold text-white backdrop-blur-md">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div className="absolute bottom-5 left-5 right-5 z-20 text-white">
                            <h3 className="font-playfair text-2xl font-bold mb-1.5 leading-tight">{ekskul.name}</h3>
                            <p className="line-clamp-2 text-white/78 font-jakarta font-light text-xs leading-5">{ekskul.desc}</p>
                          </div>
                        </div>
                      </SplideSlide>
                    ))}
                  </SplideTrack>
                </div>
              </Splide>
            </ScrollReveal>
          </div>

          <div className="text-center mb-12">
            <span className="text-[#164AA8] font-semibold text-xs tracking-[0.2em] uppercase mb-4 block font-jakarta">{labels.otherEyebrow}</span>
            <h2 className="font-playfair text-4xl font-bold text-[#0A3A8D] tracking-tight">
              {labels.otherTitle}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {otherLevels.map((other, idx) => (
              <ScrollReveal direction="up" delay={idx * 0.1} once={true} key={other.id}>
                <Link href={getLocalizedPath(`/academic/${other.id}`)} className="group block relative h-[250px] rounded-[2rem] overflow-hidden shadow-md">
                  <Image src={other.bgImage} alt={other.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A3A8D]/90 via-[#0A3A8D]/40 to-transparent transition-opacity duration-300" />
                  <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                    <div>
                      <h3 className="text-white font-playfair text-3xl font-bold">{other.name}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#164AA8] group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CTA BANNER
          ============================================ */}
      <ScrollReveal direction="up" once={true} className="max-w-4xl mx-auto px-6 text-center pb-24">
        <div className="bg-[#0A3A8D] rounded-[2.5rem] p-12 md:p-16 relative overflow-hidden mt-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#164AA8]/25 to-transparent rounded-bl-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#DCC9AA]/15 to-transparent rounded-tr-full translate-y-1/2 -translate-x-1/2" />
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6 relative z-10 tracking-tight">
            {labels.ctaTitle(data.name)}
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto font-jakarta font-light relative z-10">
            {labels.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href={getLocalizedPath('/admission')} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0A3A8D] font-semibold rounded-full hover:bg-gray-100 transition-colors font-jakarta shadow-xl">
              {labels.ctaButton}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

    </div>
  )
}
