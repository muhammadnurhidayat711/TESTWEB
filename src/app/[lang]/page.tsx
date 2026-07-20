import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import HomeTestimonials from '@/components/HomeTestimonials'
import HomeAlumniDestinations from '@/components/HomeAlumniDestinations'
import HomeScrollAnimations from '@/components/HomeScrollAnimations'
import HomeCurriculumSlider from '@/components/HomeCurriculumSlider'
import HomeHeroBackground from '@/components/HomeHeroBackground'
import WaveBackground from '@/components/WaveBackground'
import { readSiteContent } from '@/lib/contentStore'
import { normalizeLanguage } from '@/lib/i18n'
import { translations } from '@/data/translations'

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params
  const lang = normalizeLanguage(resolvedParams.lang)
  const content = await readSiteContent(lang)
  const pageContent = content.pages.home
  const getLocalizedPath = (path: string) => `/${lang}${path === '/' ? '' : path}`
  const t = (key: keyof typeof translations.id) => translations[lang][key] || key
  const fallback = lang === 'id'
    ? {
        coreValuesTitle: 'Nilai Inti Kami',
        coreValuesSubtitle: 'Membangun karakter unggul yang IMPACTFUL bagi sesama.',
        curriculumLabel: 'Standar Pendidikan Global',
        curriculumTitle: 'Kurikulum Bertaraf Internasional',
        curriculumDesc: 'Pelita Cemerlang School mengadopsi kurikulum berstandar internasional yang dipadukan dengan nilai-nilai luhur nasional.',
        ctaTitle: 'Mulai Perjalanan Anda Bersama Kami.',
        ctaDesc: 'Bergabunglah dengan komunitas pembelajar yang berdedikasi. Pendaftaran untuk tahun ajaran baru kini telah dibuka.',
        ctaButton: 'Pendaftaran Online',
      }
    : {
        coreValuesTitle: 'Our Core Values',
        coreValuesSubtitle: 'Building excellent character that creates meaningful impact for others.',
        curriculumLabel: 'Global Education Standards',
        curriculumTitle: 'International-Standard Curriculum',
        curriculumDesc: 'Pelita Cemerlang School adopts an international-standard curriculum enriched with strong national values.',
        ctaTitle: 'Start Your Journey With Us.',
        ctaDesc: 'Join a dedicated learning community. Admission for the new academic year is now open.',
        ctaButton: 'Online Registration',
      }

  return (
    <div className="bg-[#FFFAF0] min-h-screen selection:bg-primary selection:text-white relative overflow-hidden">
      <WaveBackground />
      <HomeScrollAnimations />

      {/* ============================================
          HERO SECTION - Smooth Image Slideshow Background
          ============================================ */}
      <section className="relative h-screen min-h-[760px] flex flex-col items-center justify-center overflow-hidden">
        <HomeHeroBackground images={pageContent.heroBgImages} fallbackImage={pageContent.heroBgImage} video={pageContent.heroVideo} />

        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#061B49]/92 via-[#0A3A8D]/82 to-[#061B49]/96 pointer-events-none" />
        <div
          className="absolute inset-0 z-10 pointer-events-none backdrop-blur-[2.5px] bg-[radial-gradient(circle_at_center,rgba(255,250,240,0.10)_0%,rgba(255,250,240,0.04)_24%,rgba(6,27,73,0.20)_54%,rgba(6,27,73,0.70)_82%,rgba(6,27,73,0.92)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-1/2 z-10 h-[360px] w-[min(720px,86vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFFAF0]/12 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-1/2 z-20 h-[420px] w-[min(760px,88vw)] rounded-full bg-[radial-gradient(circle,rgba(232,211,163,0.26)_0%,rgba(255,250,240,0.12)_38%,transparent_70%)] blur-2xl pointer-events-none animate-ambient-light"
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-[32%] z-20 h-28 w-[min(760px,86vw)] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(232,211,163,0.22),rgba(255,250,240,0.16),transparent)] blur-xl pointer-events-none animate-aurora-sweep"
          aria-hidden="true"
        />

        {/* Elegant Animated Wave Lines */}
        <div className="absolute inset-x-0 top-[12%] bottom-[12%] z-20 overflow-hidden pointer-events-none opacity-40 select-none" aria-hidden="true">
          <div className="absolute inset-0 w-[200%] h-full flex items-center justify-center">
            {/* Wave 1: Gold/Champagne Wave */}
            <svg className="absolute w-full h-[320px] animate-wave-1" viewBox="0 0 2880 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path 
                d="M 0,160 Q 360,80 720,160 T 1440,160 T 2160,160 T 2880,160" 
                stroke="#E9D3A3" 
                strokeWidth="1.5" 
                strokeOpacity="0.28" 
                strokeLinecap="round"
              />
            </svg>
            {/* Wave 2: Ivory/White Wave */}
            <svg className="absolute w-full h-[320px] animate-wave-2" viewBox="0 0 2880 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path 
                d="M 0,160 Q 240,110 480,160 T 960,160 T 1440,160 T 1920,160 T 2400,160 T 2880,160" 
                stroke="#FFFAF0" 
                strokeWidth="1.0" 
                strokeOpacity="0.18" 
                strokeLinecap="round"
              />
            </svg>
            {/* Wave 3: Muted Gold Wave */}
            <svg className="absolute w-full h-[320px] animate-wave-3" viewBox="0 0 2880 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path 
                d="M 0,160 Q 180,130 360,160 T 720,160 T 1080,160 T 1440,160 T 1800,160 T 2160,160 T 2520,160 T 2880,160" 
                stroke="#DCC9AA" 
                strokeWidth="1.2" 
                strokeOpacity="0.22" 
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div
          className="absolute left-1/2 top-[43%] z-20 h-28 w-[min(360px,62vw)] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent,rgba(255,250,240,0.40),rgba(232,211,163,0.34),transparent)] blur-lg mix-blend-screen pointer-events-none animate-light-sweep"
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-[36%] z-20 h-24 w-[min(980px,105vw)] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(184,138,53,0.10)_18%,rgba(232,211,163,0.42)_46%,rgba(255,250,240,0.30)_56%,rgba(184,138,53,0.12)_78%,transparent_100%)] blur-md mix-blend-screen pointer-events-none animate-luxury-beam"
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-[57%] z-20 h-16 w-[min(760px,90vw)] -translate-x-1/2 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,250,240,0.12)_20%,rgba(232,211,163,0.34)_52%,rgba(255,250,240,0.16)_76%,transparent_100%)] blur-md mix-blend-screen pointer-events-none animate-luxury-beam [animation-delay:1.8s]"
          aria-hidden="true"
        />

        {/* Geometric Decorations */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/12 z-20 pointer-events-none" />

        {/* Content */}
        <div className="relative z-30 max-w-4xl mx-auto px-6 flex flex-col items-center text-center pb-2">
          {/* Title */}
          <h1 className="home-fade-up home-delay-1 home-title-gold-stroke font-playfair text-4xl sm:text-5xl lg:text-[4.1rem] font-bold text-[#FFFAF0] tracking-tight leading-[1.04] mb-5 flex flex-col items-center">
            {pageContent.heroTitle}
          </h1>

          {/* Tagline */}
          <h2 className="home-fade-up home-delay-2 luxury-readable-light font-jakarta text-lg md:text-2xl lg:text-[1.7rem] text-[#FFFAF0]/95 font-medium tracking-wide mb-8 italic">
            &quot;{pageContent.heroSubtitle}&quot;
          </h2>

          <div className="home-fade-up home-delay-3 mb-9 flex w-full max-w-sm items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#E9D3A3]/70" />
            <span className="h-1.5 w-1.5 rotate-45 rounded-[1px] bg-[#E9D3A3]" />
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#E9D3A3]/70" />
          </div>

          {/* Education Level Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Preschool', href: '/academic/preschool' },
              { label: 'Primary', href: '/academic/primary' },
              { label: 'Secondary', href: '/academic/secondary' },
            ].map((level, index) => (
              <div key={level.label} className={`home-fade-up home-delay-${Math.min(index + 2, 5)}`}>
                <Link
                  href={getLocalizedPath(level.href)}
                  className="home-hover-lift luxury-readable-light luxury-glass-light group relative inline-flex items-center justify-center rounded-full border border-[#E9D3A3]/60 bg-[#FFFAF0]/12 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-[#FFFAF0] backdrop-blur-sm transition-all hover:border-[#E9D3A3] hover:bg-[#FFFAF0] hover:text-[#0A3A8D] md:px-6 md:text-xs"
                >
                  {level.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Main CTA */}
          <div className="home-fade-up home-delay-5 mt-8">
            <Link
              href={getLocalizedPath('/admission')}
              className="home-hover-lift luxury-button-light group relative inline-flex items-center justify-center gap-2 rounded-full border border-[#E9D3A3]/85 bg-[#FFFAF0] px-6 py-3 text-sm font-bold tracking-wide text-[#0A3A8D] transition-all hover:border-[#FFFAF0] hover:bg-[#E9D3A3]"
            >
              {t('nav.admission')}
              <ChevronRight className="w-4 h-4 text-[#B88A35] group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 md:hidden pointer-events-none">
          <span className="font-jakarta text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">{t('hero.scroll')}</span>
          <span className="home-trace-line h-10 w-px bg-white/20" />
        </div>

      </section>

      {/* ============================================
          CORE VALUES - Dark Section with Glow Orbs
          ============================================ */}
      <section className="py-20 md:py-24 bg-[#0A3A8D]/90 backdrop-blur-sm relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:820px]">
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div data-home-reveal className="home-scroll-item text-center mb-12">
              <h2 className="luxury-text-stroke font-playfair text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                {pageContent.coreValues?.title || fallback.coreValuesTitle}
              </h2>
            <p className="text-sm md:text-base text-white/50 font-jakarta font-light max-w-xl mx-auto leading-relaxed">
              {pageContent.coreValues?.subtitle || fallback.coreValuesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {(pageContent.coreValues?.items || []).map((item) => (
              <div
                key={item.letter}
                data-home-reveal
                className="home-scroll-item home-scroll-soft home-card-motion relative rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 hover:bg-white/[0.065] flex items-start gap-4 overflow-hidden group"
              >
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#DCC9AA]/25 bg-[#DCC9AA]/10">
                    <span className="font-playfair text-2xl font-bold text-[#DCC9AA] group-hover:text-white transition-colors duration-200">
                      {item.letter}
                    </span>
                  </div>

                  <div className="relative z-10 min-w-0">
                    <h3 className="mb-1 font-jakarta text-sm font-semibold text-white tracking-wide">
                      {item.letter}{item.word}
                    </h3>
                    <p className="text-xs md:text-sm text-white/45 font-jakarta font-light leading-relaxed group-hover:text-white/65 transition-colors duration-200">
                      {item.desc}
                    </p>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          CURRICULUM - Balanced Light Section
          ============================================ */}
      <section className="py-24 md:py-32 bg-transparent relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div data-home-reveal className="home-scroll-item home-scroll-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary font-semibold text-xs tracking-[0.15em] uppercase mb-6">
                {pageContent.curriculum?.label || fallback.curriculumLabel}
              </div>
              <h2 className="luxury-text-stroke font-playfair text-4xl md:text-5xl font-bold text-[#0A3A8D] tracking-tight mb-6 leading-tight">
                {pageContent.curriculum?.title || fallback.curriculumTitle}
              </h2>
              <p className="text-lg text-[#164AA8] font-jakarta font-light leading-relaxed mb-10">
                {pageContent.curriculum?.desc || fallback.curriculumDesc}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch gap-6">
                {(pageContent.curriculum?.cards || []).map((card, idx) => (
                  <div key={idx} data-home-reveal className="home-scroll-item home-scroll-soft home-card-motion flex-1 flex flex-col rounded-2xl bg-white/60 backdrop-blur-sm border border-[#D7C5A7]/50 p-8 hover:shadow-[0_12px_28px_rgba(6,27,73,0.07)] relative overflow-hidden group">
                    <div className="w-full">
                      <h3 className="text-xl font-bold text-[#0A3A8D] mb-3 font-jakarta relative z-10">{card.title}</h3>
                      <p className="text-[#164AA8] font-light leading-relaxed relative z-10 text-sm">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-home-reveal className="home-scroll-item home-scroll-right relative">
              <div className="home-image-polish relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_14px_34px_rgba(6,27,73,0.11)] border border-[#D7C5A7] bg-[#0A3A8D]">
                {pageContent.curriculum?.images && pageContent.curriculum.images.length > 0 ? (
                  <HomeCurriculumSlider images={pageContent.curriculum.images} />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[#0A3A8D]" />
                    <div className="absolute inset-8 rounded-[1.5rem] border border-white/15" />
                    <div className="absolute left-10 top-10 h-20 w-20 rounded-2xl bg-white/10" />
                    <div className="absolute bottom-10 right-10 h-28 w-40 rounded-2xl bg-white/10 border border-white/10" />
                    <div className="absolute bottom-12 left-10 right-10 space-y-3">
                      <div className="h-3 w-2/3 rounded-full bg-white/25" />
                      <div className="h-3 w-1/2 rounded-full bg-[#DCC9AA]/40" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeTestimonials />

      <HomeAlumniDestinations />

      {/* ============================================
          CTA SECTION - Dramatic Centered
          ============================================ */}
      <section className="py-32 bg-transparent relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:520px]">
        <div data-home-reveal className="home-scroll-item max-w-4xl mx-auto px-6 text-center relative z-10">
          <div>
            <h2 className="luxury-text-stroke font-jakarta text-5xl md:text-6xl font-bold text-[#0A3A8D] tracking-tight mb-8 leading-tight">
              {pageContent.cta?.title || fallback.ctaTitle}
            </h2>
            <p className="text-xl text-[#164AA8] font-jakarta font-light mb-12 max-w-2xl mx-auto">
              {pageContent.cta?.desc || fallback.ctaDesc}
            </p>
            <div className="flex justify-center gap-4">
              <Link href={getLocalizedPath(pageContent.cta?.buttonLink || '/admission')} className="home-hover-lift inline-flex items-center justify-center gap-2 rounded-full border border-[#B88A35]/45 bg-[#0A3A8D] px-10 py-4 text-lg font-semibold text-white shadow-[inset_0_0_0_1px_rgba(232,211,163,0.35),0_10px_24px_rgba(22,74,168,0.16)] hover:bg-primary-dark hover:border-[#E9D3A3]/80">
                {pageContent.cta?.buttonText || fallback.ctaButton}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
