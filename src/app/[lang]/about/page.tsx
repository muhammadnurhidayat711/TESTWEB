'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Target, Eye, Users } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'
import { useContent } from '@/components/ContentProvider'
import { motion, Variants } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import { SplitTextReveal } from '@/components/KineticTypography'
import ThreeDCard, { ThreeDCardItem } from '@/components/ThreeDCard'
import WaveBackground from '@/components/WaveBackground'
import HeroBackground from '@/components/HeroBackground'

// Coordinated high-end stagger settings
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.08
    } 
  }
}

// Silky liquid-spring fade up
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      stiffness: 75, 
      damping: 18
    } 
  }
}

const timelineDataId = [
  { year: '1998', title: 'Awal Sebuah Visi', desc: 'Didirikan dengan sebuah visi sederhana di sebuah gedung kecil dengan 50 siswa angkatan pertama yang antusias.' },
  { year: '2005', title: 'Ekspansi Kampus Utama', desc: 'Membangun kampus utama dengan fasilitas modern, laboratorium, dan area olahraga bertaraf internasional.' },
  { year: '2012', title: 'Integrasi Kurikulum Global', desc: 'Penerapan resmi kurikulum bilingual penuh dan kemitraan dengan institusi pendidikan internasional terkemuka.' },
  { year: '2024', title: 'Era Inovasi Digital', desc: 'Transformasi digital besar-besaran, menghadirkan smart classroom dan integrasi AI dalam proses pembelajaran.' }
]

const timelineDataEn = [
  { year: '1998', title: 'Beginning of a Vision', desc: 'Founded with a simple vision in a small building with an enthusiastic first batch of 50 students.' },
  { year: '2005', title: 'Main Campus Expansion', desc: 'Built the main campus with modern facilities, laboratories, and an international standard sports area.' },
  { year: '2012', title: 'Global Curriculum Integration', desc: 'Official implementation of a full bilingual curriculum and partnership with leading international educational institutions.' },
  { year: '2024', title: 'Digital Innovation Era', desc: 'Massive digital transformation, introducing smart classrooms and AI integration in the learning process.' }
]

export default function AboutPage() {
  const { lang, t } = useLanguage()
  const { pages } = useContent()
  const pageContent = pages.about
  const headerRef = useRef<HTMLDivElement>(null)
  
  // Ambil Misi dari pageContent atau fallback ke t() jika kosong
  const defaultMissionText = t('about.mission.text').split('|')
  const missionItems = pageContent.visionMission?.missionItems && pageContent.visionMission.missionItems.length > 0 
    ? pageContent.visionMission.missionItems 
    : defaultMissionText

  const fallbackTimeline = lang === 'id' ? timelineDataId : timelineDataEn

  return (
    <div className="bg-[#FFFAF0] min-h-screen selection:bg-[#164AA8] selection:text-white relative overflow-hidden font-jakarta antialiased pb-24 text-neutral-800">
      
      {/* Wave Background Decorative Lines */}
      <WaveBackground />

      {/* ============================================
          PAGE HEADER - Standard Hero Layout Matching Facilities Style
          ============================================ */}
      <section ref={headerRef} className="relative h-[65vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <HeroBackground
          alt="About Background"
          fallbackImage={pageContent.heroBgImage}
          images={pageContent.heroBgImages}
        />

        {/* Gradient Overlay matching standard blue theme transition to warm cream */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A3A8D]/80 via-[#0A3A8D]/50 to-[#FFFAF0]" />

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-12"
        >
          {/* Centered pill label with gold details */}
          <motion.div 
            variants={fadeUp} 
            className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#164AA8]/20 border border-[#164AA8]/30"
          >
            <Users className="w-4.5 h-4.5 text-[#DCC9AA]" />
            <span className="text-[#DCC9AA] font-semibold text-xs tracking-[0.2em] uppercase font-jakarta">{lang === 'id' ? 'Tentang Kami' : 'About Us'}</span>
          </motion.div>

          {/* Headline with Gold Accent */}
          <motion.h1 
            variants={fadeUp} 
            className="font-playfair text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight"
          >
            {pageContent.heroTitle.split(' ').map((word, i, arr) => (
              i === arr.length - 1 ? (
                <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-[#DCC9AA] to-[#C8A35A]">{word}</span>
              ) : (
                word + ' '
              )
            ))}
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={fadeUp} 
            className="text-lg md:text-xl text-white/80 font-jakarta font-light max-w-2xl mx-auto leading-relaxed"
          >
            {pageContent.heroSubtitle}
          </motion.p>

          {/* Intro Text */}
          {pageContent.introText && (
            <motion.p 
              variants={fadeUp} 
              className="text-md mt-4 text-white/60 font-jakarta font-light max-w-2xl mx-auto leading-relaxed"
            >
              {pageContent.introText}
            </motion.p>
          )}
        </motion.div>

      </section>

      {false && (
      <>
      {/* ============================================
          SECTION SAMBUTAN - Editorial Page Spread Vibe
          ============================================ */}
      <section id="sambutan" className="py-32 relative overflow-hidden bg-white/40 backdrop-blur-sm border-y border-neutral-200/20 scroll-mt-24">
        <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-gradient-to-br from-[#164AA8]/3 to-transparent rounded-full pointer-events-none animate-pulse-slow" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Foto Principal - Luxury Gallery Frame */}
            <div className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
              <ScrollReveal direction="right" once={true}>
                <div className="relative p-4 bg-white border border-neutral-200/60 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.025)]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-50">
                    <Image 
                      src={pageContent.sambutan?.image || "https://picsum.photos/800/1000?random=52"} 
                      alt={pageContent.sambutan?.name || "Principal"} 
                      fill 
                      sizes="(max-width: 1024px) 100vw, 40vw" 
                      className="object-cover transition-transform duration-[1.5s] ease-out hover:scale-103" 
                      priority
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
            
            {/* Isi Sambutan - Editorial Storytelling */}
            <div className="lg:col-span-7 lg:pl-6">
              <ScrollReveal direction="left" once={true}>
                {/* Big decorative quotes */}
                <div className="relative">
                  <span className="absolute -top-12 -left-6 font-playfair text-[9rem] text-[#C8A35A]/15 pointer-events-none select-none">“</span>
                  <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[#061B49] mb-8 leading-tight tracking-tight relative z-10">
                    <SplitTextReveal text={pageContent.sambutan?.quote || (lang === 'id' ? 'Pendidikan Sejati Adalah Transformasi Karakter.' : 'True Education is Character Transformation.')} />
                  </h2>
                </div>
                
                <div className="space-y-6 text-neutral-500 font-jakarta font-light text-[15px] md:text-[17px] leading-relaxed relative z-10">
                  {(pageContent.sambutan?.descParagraphs || (lang === 'id' ? [
                    'Selamat datang di Pelita Cemerlang School. Kami percaya bahwa pendidikan sejati melampaui keunggulan akademik semata. Ini adalah tentang membentuk karakter, memelihara integritas, dan menginspirasi hasrat untuk terus belajar sepanjang hayat.',
                    'Di tengah dunia yang berubah dengan cepat, misi kami tetap teguh: membekali generasi masa depan dengan kecerdasan intelektual dan keanggunan moral. Kami mengundang Anda untuk bergabung dalam perjalanan transformatif ini, di mana setiap anak didorong untuk menemukan potensi terbaik mereka dan memberikan dampak positif bagi dunia.'
                  ] : [
                    'Welcome to Pelita Cemerlang School. We believe that true education goes beyond academic excellence. It is about shaping character, nurturing integrity, and inspiring a lifelong passion for learning.',
                    'In a rapidly changing world, our mission remains steadfast: to equip future generations with intellectual intelligence and moral grace. We invite you to join us on this transformative journey, where every child is encouraged to discover their best potential and make a positive impact on the world.'
                  ])).map((paragraf, i) => (
                    <p key={i} className={i === 0 ? "first-letter:text-4xl first-letter:font-playfair first-letter:font-bold first-letter:text-[#C8A35A] first-letter:float-left first-letter:mr-2.5 first-letter:mt-1" : ""}>
                      {paragraf}
                    </p>
                  ))}
                </div>

                {/* Principal Signature Block */}
                <div className="mt-12 pt-8 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-playfair text-xl font-bold text-[#061B49] mb-1">{pageContent.sambutan?.name || 'Dr. Robert C. Alexander'}</h5>
                    <p className="font-poppins text-[10px] font-bold text-[#C8A35A] tracking-widest uppercase">{pageContent.sambutan?.role || (lang === 'id' ? 'Direktur Eksekutif Pelita Cemerlang' : 'Executive Director of Pelita Cemerlang')}</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>
      </>
      )}

      {/* ============================================
          SECTION VISI & MISI - Balanced Twin Cards
          ============================================ */}
      <section className="py-28 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Visi Kami Card */}
            <div className="h-full">
              <ScrollReveal direction="up" delay={0} once={true} className="h-full">
                <ThreeDCard className="flex h-full min-h-[520px] flex-col p-9 sm:p-10 lg:p-12 bg-white/75 backdrop-blur-md border border-neutral-200/60 rounded-[2rem] shadow-[0_16px_42px_rgba(6,27,73,0.045)] relative overflow-hidden group transition-all duration-500">
                  <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A35A]/45 to-transparent" />
                  <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-bl from-[#164AA8]/4 to-transparent rounded-bl-full -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-110 z-0" />
                  <ThreeDCardItem translateZ={35} className="w-full relative z-10">
                    <div className="mb-8 flex items-center gap-5">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#164AA8]/8 text-[#164AA8]">
                        <Eye className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#C8A35A] tracking-[0.25em] uppercase font-poppins block mb-2">
                          {pageContent.visionMission?.visionLabel || (lang === 'id' ? 'Arah Masa Depan' : 'Future Direction')}
                        </span>
                        <h3 className="font-playfair text-4xl font-bold text-[#061B49] tracking-tight">
                          {pageContent.visionMission?.visionTitle || (lang === 'id' ? 'Visi Kami' : 'Our Vision')}
                        </h3>
                      </div>
                    </div>
                  </ThreeDCardItem>
                  <ThreeDCardItem translateZ={15} className="w-full relative z-10">
                    <p className="max-w-xl text-neutral-500 font-jakarta font-light text-lg md:text-xl leading-relaxed">
                      {pageContent.visionMission?.visionDesc || t('about.vision.text')}
                    </p>
                  </ThreeDCardItem>
                </ThreeDCard>
              </ScrollReveal>
            </div>
            
            {/* Misi Kami Card */}
            <div className="h-full">
              <ScrollReveal direction="up" delay={0.1} once={true} className="h-full">
                <ThreeDCard className="flex h-full min-h-[520px] flex-col bg-gradient-to-br from-[#061B49] to-[#030d24] p-9 sm:p-10 lg:p-12 border border-[#C8A35A]/25 rounded-[2rem] shadow-[0_20px_50px_rgba(6,27,73,0.12)] relative overflow-hidden group text-white transition-all duration-500">
                  <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#C8A35A]/55 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-[#164AA8]/15 to-transparent rounded-tr-full translate-y-1/2 -translate-x-1/2 transition-transform duration-700 group-hover:scale-110 z-0" />
                  <ThreeDCardItem translateZ={35} className="w-full relative z-10">
                    <div className="mb-8 flex items-center gap-5">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#C8A35A]/12 text-[#C8A35A]">
                        <Target className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#DCC9AA]/60 tracking-[0.25em] uppercase font-poppins block mb-2">
                          {pageContent.visionMission?.missionLabel || (lang === 'id' ? 'Langkah Nyata' : 'Action Steps')}
                        </span>
                        <h3 className="font-playfair text-4xl font-bold tracking-tight">
                          {pageContent.visionMission?.missionTitle || (lang === 'id' ? 'Misi Kami' : 'Our Mission')}
                        </h3>
                      </div>
                    </div>
                  </ThreeDCardItem>
                  <ThreeDCardItem translateZ={15} className="w-full relative z-10">
                    <ol className="space-y-3.5 text-blue-100/80 font-jakarta font-light text-sm md:text-base leading-relaxed">
                      {missionItems.map((item, index) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#C8A35A]/35 bg-[#C8A35A]/10 text-xs font-semibold text-[#DCC9AA]">
                            {index + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </ThreeDCardItem>
                </ThreeDCard>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================
          SECTION TIMELINE - Left-Aligned Chronology
          ============================================ */}
      <section className="py-32 relative z-10 bg-white/30 backdrop-blur-sm border-t border-neutral-200/20">
        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-24">
            <span className="text-[10px] font-bold text-[#C8A35A] tracking-[0.25em] uppercase font-poppins block mb-3">
              {pageContent.timelineSection?.label || (lang === 'id' ? 'Tonggak Sejarah' : 'Milestones')}
            </span>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#061B49] tracking-tight">
              <SplitTextReveal text={pageContent.timelineSection?.title || (lang === 'id' ? 'Jejak Langkah Kami' : 'Our Journey')} />
            </h2>
            <p className="mt-4 text-lg text-neutral-400 font-jakarta font-light max-w-xl mx-auto">
              <SplitTextReveal text={pageContent.timelineSection?.desc || (lang === 'id' ? 'Evolusi konstan menuju keunggulan pendidikan internasional.' : 'Constant evolution towards international educational excellence.')} delay={0.2} />
            </p>
          </div>

          {/* Vertical Timeline Wrapper */}
          <div className="relative pl-8 md:pl-16 border-l border-neutral-200/60 ml-4 md:ml-8 space-y-20">
            {(pageContent.timelineSection?.items || fallbackTimeline).map((item, idx) => (
              <ScrollReveal key={idx} direction="left" once={true} className="relative group">
                
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[37px] md:-left-[69px] top-2.5 w-4 h-4 rounded-full bg-white border-4 border-[#164AA8] shadow-[0_0_0_6px_rgba(22,74,168,0.05)] transition-all duration-300 group-hover:scale-120 group-hover:border-[#C8A35A] group-hover:shadow-[0_0_0_10px_rgba(200,163,90,0.08)] z-20" />

                {/* Animated Story Card */}
                <div className="relative bg-white/70 backdrop-blur-md border border-neutral-200/40 rounded-[2rem] p-8 md:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                  
                  {/* Huge Watermark Year */}
                  <span className="absolute right-6 -bottom-6 font-playfair text-7xl md:text-9xl font-bold text-neutral-100/60 select-none pointer-events-none transition-colors duration-500 group-hover:text-neutral-200/50 z-0">
                    {item.year}
                  </span>

                  <div className="relative z-10">
                    {/* Tiny Category Tag */}
                    <span className="text-[10px] font-bold text-[#C8A35A] tracking-widest uppercase font-poppins block mb-3">
                      Milestone {item.year}
                    </span>

                    {/* Milestone Title */}
                    <h4 className="font-playfair text-xl md:text-2xl text-[#061B49] font-bold mb-3 tracking-tight">
                      {item.title}
                    </h4>

                    {/* Milestone Description */}
                    <p className="text-neutral-500 font-jakarta font-light text-sm md:text-base leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                </div>

              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}
