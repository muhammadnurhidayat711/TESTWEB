'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Building, ChevronDown, Play, Volume2, VolumeX, X } from 'lucide-react'
import SkeletonImage from '@/components/SkeletonImage'
import SkeletonVideo from '@/components/SkeletonVideo'
import ScrollReveal from '@/components/ScrollReveal'
import { useContent } from '@/components/ContentProvider'
import { useLanguage } from '@/components/LanguageProvider'
import { useMediaLoadingPreference } from '@/hooks/useMediaLoadingPreference'

type FacilityViewItem = {
  id: string
  title: string
  image: string
  images?: string[]
  video?: string
  description?: string
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 18,
    },
  },
}

function getFacilityImages(facility: FacilityViewItem | null) {
  if (!facility) return []
  const images = facility.images && facility.images.length > 0
    ? facility.images
    : facility.image
      ? [facility.image]
      : []

  return Array.from(new Set(images.filter(Boolean)))
}

export default function FacilitiesPage() {
  const [activeFacilityIndex, setActiveFacilityIndex] = useState(0)
  const [activeFacilityImageIndex, setActiveFacilityImageIndex] = useState(0)
  const [activeMediaType, setActiveMediaType] = useState<'image' | 'video'>('image')
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [isHeroVideoMuted, setIsHeroVideoMuted] = useState(true)
  const [isHeroVideoLoaded, setIsHeroVideoLoaded] = useState(false)
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  const content = useContent()
  const { lang } = useLanguage()
  const { prefersReducedData } = useMediaLoadingPreference()

  const labels = lang === 'id'
    ? {
        eyebrow: 'Fasilitas',
        scroll: 'Lihat fasilitas',
        choose: 'Pilih',
        show: 'Tampilkan',
        playTour: 'Putar Video',
        closeVideo: 'Tutup Video',
        mediaTitle: 'Jelajahi Fasilitas',
        mediaSubtitle: 'Pilih fasilitas, lalu lihat foto atau video yang tersedia.',
        photos: 'Foto',
        video: 'Video',
        listTitle: 'Pilih fasilitas',
      }
    : {
        eyebrow: 'Facilities',
        scroll: 'View facilities',
        choose: 'Choose',
        show: 'Show',
        playTour: 'Play Video',
        closeVideo: 'Close Video',
        mediaTitle: 'Explore Facilities',
        mediaSubtitle: 'Choose a facility, then view the available photos or video.',
        photos: 'Photos',
        video: 'Video',
        listTitle: 'Choose a facility',
      }

  const pageContent = content.pages.facilities
  const facilitiesData = content.facilities as FacilityViewItem[]
  const activeFacility = facilitiesData[activeFacilityIndex] ?? null
  const activeFacilityImages = getFacilityImages(activeFacility)
  const activeFacilityImage = activeFacilityImages[activeFacilityImageIndex] || activeFacilityImages[0] || ''
  const heroVideoUrl = pageContent.heroVideo
  const heroImage = pageContent.heroBgImages?.[0] || pageContent.heroBgImage
  const shouldUseHeroVideo = Boolean(heroVideoUrl && !prefersReducedData)
  const hasActiveVideo = Boolean(activeFacility?.video)
  const showActiveVideo = hasActiveVideo && activeMediaType === 'video'

  useEffect(() => {
    setActiveFacilityImageIndex(0)
    setActiveMediaType('image')
  }, [activeFacilityIndex])

  useEffect(() => {
    if (showVideoModal && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => {})
    } else if (!showVideoModal && modalVideoRef.current) {
      modalVideoRef.current.pause()
    }
  }, [showVideoModal])

  useEffect(() => {
    if (!showVideoModal) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow || ''
    }
  }, [showVideoModal])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFFAF0] font-jakarta text-neutral-800 antialiased selection:bg-[#164AA8] selection:text-white">
      <section className="relative flex h-[75vh] min-h-[560px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <SkeletonImage
              src={heroImage}
              alt="Campus facilities"
              fill
              sizes="100vw"
              priority
              className="object-cover saturate-[0.86] brightness-[0.52] contrast-[1.08]"
            />
          )}
          {shouldUseHeroVideo && (
            <>
              <video
                src={heroVideoUrl}
                autoPlay
                muted={isHeroVideoMuted}
                loop
                playsInline
                preload="metadata"
                poster={heroImage}
                onLoadedData={() => setIsHeroVideoLoaded(true)}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${isHeroVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ filter: 'saturate(0.86) brightness(0.52) contrast(1.08)' }}
              />
              {!isHeroVideoLoaded && <div className="absolute inset-0 animate-pulse bg-[#061B49]/25" aria-hidden="true" />}
              <button
                type="button"
                onClick={() => setIsHeroVideoMuted((current) => !current)}
                className="absolute bottom-24 right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50"
                aria-label={isHeroVideoMuted ? 'Unmute' : 'Mute'}
              >
                {isHeroVideoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </>
          )}
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A3A8D]/75 via-[#0A3A8D]/40 to-[#FFFAF0]" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[400px] w-[min(800px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,211,163,0.18)_0%,rgba(255,250,240,0.08)_40%,transparent_70%)] blur-2xl"
          aria-hidden="true"
        />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-20 mx-auto mt-12 max-w-5xl px-6 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#164AA8]/30 bg-[#164AA8]/20 px-5 py-2.5 backdrop-blur-sm"
          >
            <Building className="h-4.5 w-4.5 text-[#DCC9AA]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DCC9AA]">
              {labels.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mb-6 font-playfair text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl"
          >
            {pageContent.heroTitle.split(' ').map((word, index, words) => (
              index === words.length - 1 ? (
                <span key={`${word}-${index}`} className="bg-gradient-to-r from-[#DCC9AA] to-[#C8A35A] bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                `${word} `
              )
            ))}
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/80 md:text-xl">
            {pageContent.heroSubtitle}
          </motion.p>

          {heroVideoUrl && (
            <motion.div variants={fadeUp} className="mt-8">
              <button
                type="button"
                onClick={() => setShowVideoModal(true)}
                className="group inline-flex items-center gap-3 rounded-full border border-[#E9D3A3]/60 bg-[#FFFAF0]/12 px-7 py-3.5 text-sm font-semibold text-[#FFFAF0] backdrop-blur-sm transition-all hover:border-[#E9D3A3] hover:bg-[#FFFAF0] hover:text-[#0A3A8D]"
              >
                <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
                {labels.playTour}
              </button>
            </motion.div>
          )}
        </motion.div>

        <button
          type="button"
          onClick={() => document.getElementById('facility-media')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
          aria-label={labels.scroll}
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-white/40">{labels.scroll}</span>
          <ChevronDown className="h-5 w-5 animate-bounce text-white/40" />
        </button>
      </section>

      <section id="facility-media" className="relative z-20 mx-auto max-w-7xl px-4 py-10 [content-visibility:auto] [contain-intrinsic-size:900px] md:px-6 md:py-14">
        <ScrollReveal>
          <div className="mb-6 max-w-3xl">
            <h2 className="font-playfair text-3xl font-bold tracking-tight text-[#061B49] md:text-5xl">
              {labels.mediaTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#516074] md:text-base">
              {labels.mediaSubtitle}
            </p>
          </div>
        </ScrollReveal>

        {activeFacility && (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.618fr)_minmax(320px,1fr)]">
            <section className="overflow-hidden rounded-lg border border-[#061B49]/10 bg-white shadow-[0_18px_48px_rgba(6,27,73,0.1)]">
              <div className="relative aspect-[1.618/1] min-h-[300px] bg-[#061B49] md:min-h-[520px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeFacility.id}-${activeMediaType}-${activeFacilityImage}`}
                    initial={{ opacity: 0, scale: 1.015 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.995 }}
                    transition={{ duration: 0.42, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    {showActiveVideo ? (
                      <SkeletonVideo
                        src={activeFacility.video}
                        controls
                        muted
                        playsInline
                        preload="none"
                        className="h-full w-full object-cover"
                        poster={activeFacilityImage || activeFacility.image}
                      />
                    ) : (
                      activeFacilityImage && (
                        <SkeletonImage
                          src={activeFacilityImage}
                          alt={activeFacility.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 70vw"
                          className="object-cover"
                          priority={activeFacilityIndex === 0}
                        />
                      )
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#061B49]/88 via-[#061B49]/32 to-transparent p-5 md:p-7">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#E9D3A3]">
                    {showActiveVideo ? labels.video : `${activeFacilityImages.length || 1} ${labels.photos}`}
                  </p>
                  <h3 className="font-playfair text-3xl font-bold leading-tight text-white md:text-5xl">
                    {activeFacility.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 p-4 md:p-5">
                {activeFacility.description && (
                  <p className="max-w-3xl text-sm leading-7 text-[#516074] md:text-base">
                    {activeFacility.description}
                  </p>
                )}

                {(hasActiveVideo || activeFacilityImages.length > 1) && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {hasActiveVideo && (
                      <button
                        type="button"
                        onClick={() => setActiveMediaType('video')}
                        className={`flex h-16 w-24 shrink-0 items-center justify-center rounded-md border bg-[#061B49] transition ${
                          activeMediaType === 'video' ? 'border-[#164AA8] opacity-100' : 'border-[#061B49]/10 opacity-72 hover:opacity-100'
                        }`}
                        aria-label={`${labels.show} ${labels.video} ${activeFacility.title}`}
                      >
                        <Play className="h-6 w-6 text-white" />
                      </button>
                    )}

                    {activeFacilityImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => {
                          setActiveMediaType('image')
                          setActiveFacilityImageIndex(index)
                        }}
                        aria-label={`${labels.show} ${activeFacility.title} ${index + 1}`}
                        className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md border transition ${
                          activeMediaType === 'image' && activeFacilityImageIndex === index
                            ? 'border-[#164AA8] opacity-100'
                            : 'border-[#061B49]/10 opacity-72 hover:opacity-100'
                        }`}
                      >
                        <SkeletonImage
                          src={image}
                          alt={`${activeFacility.title} ${index + 1}`}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <aside className="rounded-lg border border-[#061B49]/10 bg-white p-3 shadow-sm lg:max-h-[690px] lg:overflow-y-auto">
              <h2 className="px-1 pb-3 text-sm font-bold text-[#061B49]">
                {labels.listTitle}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {facilitiesData.map((facility, index) => (
                  <FacilityImageCard
                    key={facility.id}
                    facility={facility}
                    index={index}
                    isActive={activeFacilityIndex === index}
                    chooseLabel={labels.choose}
                    onSelect={() => {
                      setActiveFacilityIndex(index)
                      setActiveFacilityImageIndex(0)
                    }}
                  />
                ))}
              </div>
            </aside>
          </div>
        )}
      </section>

      <AnimatePresence>
        {showVideoModal && heroVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 px-4 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setShowVideoModal(false)}
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
              aria-label={labels.closeVideo}
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-lg shadow-2xl"
            >
              <SkeletonVideo
                ref={modalVideoRef}
                src={heroVideoUrl}
                controls
                autoPlay
                preload="metadata"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FacilityImageCard({
  facility,
  index,
  isActive,
  chooseLabel,
  onSelect,
}: {
  facility: FacilityViewItem
  index: number
  isActive: boolean
  chooseLabel: string
  onSelect: () => void
}) {
  const displayImage = facility.images?.[0] || facility.image
  const imageCount = getFacilityImages(facility).length

  return (
    <div className="transform-gpu">
      <button
        type="button"
        onClick={onSelect}
        aria-label={`${chooseLabel} ${facility.title}`}
        className={`group grid w-full grid-cols-[minmax(112px,38%)_minmax(0,62%)] overflow-hidden rounded-md border bg-white text-left outline-none transition focus-visible:ring-2 focus-visible:ring-[#164AA8] ${
          isActive
            ? 'border-[#164AA8] shadow-[0_12px_26px_rgba(22,74,168,0.14)]'
            : 'border-[#061B49]/10 hover:border-[#164AA8]/45'
        }`}
      >
        <div className="relative aspect-[1.618/1] min-h-24 overflow-hidden bg-[#061B49]">
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.035]">
            {displayImage && (
              <SkeletonImage
                src={displayImage}
                alt={facility.title}
                fill
                sizes="(max-width: 1024px) 38vw, 150px"
                className="object-cover"
              />
            )}
          </div>
          {facility.video && (
            <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
              <Play className="h-3.5 w-3.5" />
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col justify-center px-3 py-2">
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[#061B49]">
            {facility.title}
          </h3>
          <p className="mt-2 text-xs font-semibold text-[#516074]">
            {facility.video ? 'Video' : `${imageCount || 1} foto`}
          </p>
        </div>
      </button>
    </div>
  )
}
