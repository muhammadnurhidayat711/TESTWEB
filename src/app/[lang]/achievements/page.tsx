'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Trophy, Award, Star, ChevronDown } from 'lucide-react'
import WaveBackground from '@/components/WaveBackground'
import ScrollReveal from '@/components/ScrollReveal'
import { SplitTextReveal } from '@/components/KineticTypography'
import ThreeDCard, { ThreeDCardItem } from '@/components/ThreeDCard'
import { useContent } from '@/components/ContentProvider'
import { useLanguage } from '@/components/LanguageProvider'
import HeroBackground from '@/components/HeroBackground'

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
}

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

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 15 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 85,
      damping: 20
    }
  }
}

export default function AchievementsPage() {
  const content = useContent()
  const { lang } = useLanguage()
  const labels = lang === 'id'
    ? {
        allFields: 'Semua Bidang',
        scroll: 'Scroll',
        featured: 'Sorotan Utama',
        featuredNav: 'Navigasi sorotan utama',
        showFeatured: 'Tampilkan sorotan',
        empty: 'Belum ada prestasi pada kategori ini',
      }
    : {
        allFields: 'All Fields',
        scroll: 'Scroll',
        featured: 'Featured Highlight',
        featuredNav: 'Featured highlights navigation',
        showFeatured: 'Show highlight',
        empty: 'No achievements in this category yet',
      }
  const pageContent = content.pages.achievements
  const headerRef = useRef<HTMLDivElement>(null)

  const achievements = content.achievements
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0)

  const featuredAchievements = achievements.filter((achievement) => achievement.featured)
  const spotlightAchievements = featuredAchievements.length ? featuredAchievements : achievements.slice(0, 3)
  const categories = useMemo(() => [
    { id: 'all', name: labels.allFields },
    ...Array.from(new Set(achievements.map((achievement) => achievement.category))).map((category) => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1),
    })),
  ], [achievements, labels.allFields])

  useEffect(() => {
    if (!spotlightAchievements.length) return

    const featuredInterval = window.setInterval(() => {
      setActiveFeaturedIndex((currentIndex) => (currentIndex + 1) % spotlightAchievements.length)
    }, 5000)

    return () => window.clearInterval(featuredInterval)
  }, [spotlightAchievements.length])

  const activeFeaturedAchievement = spotlightAchievements[activeFeaturedIndex % Math.max(spotlightAchievements.length, 1)]
  const filteredAchievements = [...achievements]
    .filter(a => selectedCategory === 'all' || a.category === selectedCategory)
    .sort((a, b) => b.year - a.year)

  if (!activeFeaturedAchievement) return null

  return (
    <div className="bg-[#FFFAF0] min-h-screen selection:bg-[#164AA8] selection:text-white relative overflow-hidden font-jakarta antialiased pb-24 text-neutral-800">

      <WaveBackground />

      <section ref={headerRef} className="relative h-[65vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <HeroBackground
          alt="Achievements Background"
          fallbackImage={pageContent.heroBgImage}
          images={pageContent.heroBgImages}
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A3A8D]/80 via-[#0A3A8D]/50 to-[#FFFAF0]" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-20 max-w-5xl mx-auto px-6 text-center mt-12"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#164AA8]/20 border border-[#164AA8]/30"
          >
            <Trophy className="w-4.5 h-4.5 text-[#DCC9AA]" />
            <span className="text-[#DCC9AA] font-semibold text-xs tracking-[0.2em] uppercase font-jakarta">Wall of Fame</span>
          </motion.div>

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

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/80 font-jakarta font-light max-w-2xl mx-auto leading-relaxed"
          >
            {pageContent.heroSubtitle}
          </motion.p>

          {pageContent.introText && (
            <motion.p
              variants={fadeUp}
              className="mt-4 text-md text-white/60 font-jakarta font-light max-w-2xl mx-auto leading-relaxed"
            >
              {pageContent.introText}
            </motion.p>
          )}
        </motion.div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/40 text-xs font-jakarta tracking-wider uppercase font-semibold">{labels.scroll}</span>
            <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-24 -mt-16 relative z-30">
        <ScrollReveal direction="up" once={true}>
          <div className="relative rounded-[2.5rem] overflow-hidden bg-white/70 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-neutral-200/50 group">

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="relative h-[520px] w-full rounded-[10px] overflow-hidden bg-neutral-900 shadow-sm sm:h-[540px] lg:h-[560px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeaturedAchievement.id}
                    initial={{ opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeFeaturedAchievement.image}
                      alt=""
                      fill
                      sizes="100vw"
                      className="object-cover scale-[1.04] blur-sm opacity-90 saturate-110 brightness-110 transition-transform duration-[2600ms] ease-out group-hover:scale-[1.07]"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/8 via-black/0 to-black/14" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.12)_100%)]" />
                    <motion.div
                      className="pointer-events-none absolute inset-0 opacity-85"
                      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        backgroundImage: 'linear-gradient(115deg, rgba(255,255,255,0.16) 0%, rgba(255,247,227,0.08) 28%, rgba(220,201,170,0.22) 48%, rgba(255,255,255,0.06) 64%, rgba(200,163,90,0.16) 100%)',
                        backgroundSize: '260% 260%',
                      }}
                    />
                    <motion.div
                      className="pointer-events-none absolute -inset-y-12 -left-1/3 w-1/2 rotate-12 opacity-0 blur-xl"
                      animate={{ x: ['0%', '310%'], opacity: [0, 0.72, 0] }}
                      transition={{ duration: 6.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.42), rgba(220,201,170,0.32), transparent)',
                      }}
                    />
                    <motion.div
                      className="pointer-events-none absolute inset-0 opacity-45"
                      animate={{ opacity: [0.28, 0.48, 0.28] }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(255,247,227,0.16), transparent 46%)',
                      }}
                    />

                    <div className="absolute inset-3 sm:inset-4 lg:inset-6">
                      <Image
                        src={activeFeaturedAchievement.image}
                        alt={activeFeaturedAchievement.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1200px"
                        className="object-contain transition-transform duration-[2600ms] ease-out group-hover:scale-[1.01]"
                        style={{ filter: 'drop-shadow(0 18px 45px rgba(0, 0, 0, 0.28))' }}
                        priority={activeFeaturedIndex === 0}
                      />
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-[10px] border border-white/24 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_0_34px_rgba(255,255,255,0.08),inset_0_-60px_80px_rgba(0,0,0,0.14)]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/22" />
                    <div className="absolute inset-x-0 bottom-0 flex justify-center px-4 pb-8 pt-24 text-center sm:px-8 sm:pb-10 lg:px-12">
                      <div className="max-w-4xl px-2 py-2 sm:px-4">
                        <div
                          className="mx-auto mb-2 flex max-w-full flex-wrap items-center justify-center gap-2 text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.16em] text-[#FFF7E3]/95 font-poppins"
                          style={{
                            textShadow: '0 1px 0 rgba(255, 255, 255, 0.28), 0 4px 16px rgba(0, 0, 0, 0.86), 0 0 18px rgba(220, 201, 170, 0.34)',
                          }}
                        >
                          <span>{labels.featured} {new Date().getFullYear()}</span>
                          <span className="h-1 w-1 rounded-full bg-[#FFF7E3]/70" />
                          <span>{activeFeaturedAchievement.featuredLabel || activeFeaturedAchievement.level}</span>
                        </div>

                        <h2
                          className="mx-auto max-w-2xl bg-gradient-to-b from-white via-[#FFF7E3] to-[#F5DFAE] bg-clip-text font-playfair text-xl sm:text-2xl lg:text-3xl font-bold text-transparent leading-tight tracking-tight"
                          style={{
                            filter: 'drop-shadow(0 4px 18px rgba(0, 0, 0, 0.86)) drop-shadow(0 0 20px rgba(220, 201, 170, 0.26))',
                          }}
                        >
                          {activeFeaturedAchievement.title}
                        </h2>

                        <div
                          className="mx-auto mt-3 flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[8px] sm:text-[10px] font-semibold font-poppins uppercase tracking-[0.12em] text-[#FFF7E3]/90"
                          style={{
                            textShadow: '0 1px 0 rgba(255, 255, 255, 0.2), 0 3px 12px rgba(0, 0, 0, 0.84), 0 0 14px rgba(220, 201, 170, 0.26)',
                          }}
                        >
                          <span>{activeFeaturedAchievement.featuredTeam || activeFeaturedAchievement.student}</span>
                          <span className="hidden h-1 w-1 rounded-full bg-[#FFF7E3]/55 sm:block" />
                          <span>{activeFeaturedAchievement.featuredMentor || activeFeaturedAchievement.class}</span>
                          <span className="hidden h-1 w-1 rounded-full bg-[#FFF7E3]/55 sm:block" />
                          <span>{activeFeaturedAchievement.level}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1" role="group" aria-label={labels.featuredNav}>
                  {spotlightAchievements.map((achievement, index) => (
                    <button
                      key={achievement.id}
                      type="button"
                      onClick={() => setActiveFeaturedIndex(index)}
                      aria-label={`${labels.showFeatured} ${index + 1}: ${achievement.title}`}
                      aria-current={activeFeaturedIndex === index ? 'true' : undefined}
                      className="group/dot flex h-8 items-center px-1"
                    >
                      <span
                        className={`block h-2.5 rounded-full transition-all duration-300 ${
                          activeFeaturedIndex === index
                            ? 'w-9 bg-[#DCC9AA] shadow-[0_4px_14px_rgba(220,201,170,0.28)]'
                            : 'w-2.5 bg-[#DCC9AA]/35 group-hover/dot:bg-[#DCC9AA]/60'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>



      <section className="max-w-7xl mx-auto px-6 pb-24 relative z-30">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          >
            {filteredAchievements.map((a) => (
              <motion.div
                layout="position"
                variants={scaleUp}
                exit={{ opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.25 } }}
                transition={{ type: 'spring', stiffness: 300, damping: 32 }}
                key={a.id}
                className="h-full"
              >
                <div className="bg-white/70 backdrop-blur-md rounded-[2.25rem] p-3 shadow-[0_15px_40px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(200,163,90,0.06)] border border-[#C8A35A]/20 hover:border-[#C8A35A]/50 transition-all duration-500 h-full flex flex-col group">

                  <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden bg-neutral-100 shadow-sm border border-neutral-200/30 z-10">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-103"
                    />

                    <div className="absolute top-4 left-4">
                      <span className="px-3.5 py-1.5 bg-white/90 backdrop-blur-sm text-[#0A3A8D] font-poppins font-bold text-[9px] tracking-widest uppercase rounded-full shadow-sm border border-neutral-100">
                        {a.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <div className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-neutral-100 text-[#0A3A8D]">
                        {a.medal?.toLowerCase() === 'gold' && <Award className="w-5 h-5 text-[#C8A35A]" strokeWidth={2.5} />}
                        {a.medal?.toLowerCase() === 'silver' && <Award className="w-5 h-5 text-neutral-400" strokeWidth={2.5} />}
                        {a.medal?.toLowerCase() === 'bronze' && <Award className="w-5 h-5 text-[#CD7F32]" strokeWidth={2.5} />}
                        {!['gold', 'silver', 'bronze'].includes(a.medal?.toLowerCase() || '') && <Award className="w-5 h-5 text-[#0A3A8D]" strokeWidth={2.5} />}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow relative z-20">
                    <h3 className="font-playfair text-xl md:text-2xl font-bold text-[#061B49] mb-3 leading-tight tracking-tight group-hover:text-[#164AA8] transition-colors duration-300">
                      {a.title}
                    </h3>

                    <p className="text-neutral-500 font-jakarta font-light text-xs md:text-sm leading-relaxed mb-6 flex-grow">
                      {a.desc}
                    </p>

                    <div className="border-t border-neutral-100/80 pt-5 flex justify-between items-center mt-auto">
                      <div>
                        <div className="font-bold text-[#061B49] text-sm font-playfair">{a.student}</div>
                        <div className="text-neutral-400 text-xs font-poppins uppercase tracking-wider font-semibold">{a.class}</div>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#164AA8] bg-[#164AA8]/5 px-3 py-1.5 rounded-full font-poppins">
                        {a.level}
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-32 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-neutral-200/40">
            <Star className="w-12 h-12 mx-auto text-[#C8A35A]/50 mb-4 animate-pulse" />
            <p className="text-neutral-400 font-poppins text-xs font-bold uppercase tracking-widest">{labels.empty}</p>
          </div>
        )}
      </section>

    </div>
  )
}
