'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Camera, Maximize2, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import WaveBackground from '@/components/WaveBackground'
import ScrollReveal from '@/components/ScrollReveal'
import { useLanguage } from '@/components/LanguageProvider'
import { useContent } from '@/components/ContentProvider'
import HeroBackground from '@/components/HeroBackground'
import type { GalleryItem, SiteContent } from '@/types/siteContent'

const categories = [
  { id: 'All', key: 'all' },
  { id: 'Academics', key: 'academics' },
  { id: 'Events', key: 'events' },
  { id: 'Sports', key: 'sports' },
]

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

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 20
    }
  }
}

const galleryAspectClasses: Record<string, string> = {
  'aspect-[4/3]': 'aspect-[4/3]',
  'aspect-[16/9]': 'aspect-[16/9]',
  'aspect-square': 'aspect-square',
  'aspect-[3/4]': 'aspect-[3/4]',
  'aspect-[2/3]': 'aspect-[2/3]',
  'aspect-[3/2]': 'aspect-[3/2]',
  'aspect-[5/7]': 'aspect-[5/7]',
  'aspect-[2/1]': 'aspect-[2/1]',
  'aspect-[4/5]': 'aspect-[4/5]',
}

function getGalleryAspectClass(aspect: string) {
  return galleryAspectClasses[aspect] || galleryAspectClasses['aspect-[4/3]']
}

function isUploadedImage(src: string) {
  return src.startsWith('/uploads/')
}

export default function GalleryClient({ initialContent }: { initialContent: SiteContent }) {
  const { lang, t } = useLanguage()
  const labels = lang === 'id'
    ? { scroll: 'Scroll', closeImage: 'Tutup gambar' }
    : { scroll: 'Scroll', closeImage: 'Close image' }
  const [activeCategory, setActiveCategory] = useState('All')
  const content = useContent()
  const pageContent = content.pages.gallery
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!selectedImage) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null)
    }

    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selectedImage])

  const galleryImages = content.gallery.filter((image) => image.category !== 'Campus')
  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory)

  return (
    <div className="bg-[#FFFAF0] min-h-screen selection:bg-[#164AA8] selection:text-white relative overflow-hidden font-jakarta antialiased pb-24 text-neutral-800">

      <WaveBackground />

      <section ref={headerRef} className="relative h-[65vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <HeroBackground
          alt="Gallery Background"
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
            <Camera className="w-4.5 h-4.5 text-[#DCC9AA]" />
            <span className="text-[#DCC9AA] font-semibold text-xs tracking-[0.2em] uppercase font-jakarta">Visual Diary</span>
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/40 text-xs font-jakarta tracking-wider uppercase font-semibold">{labels.scroll}</span>
            <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-16 relative z-30">
        <div className="flex flex-col items-center border-b border-neutral-200/50 pb-6">
          <div className="flex items-center gap-8 overflow-x-auto w-full justify-center scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative pb-3 font-poppins text-xs font-semibold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'text-neutral-900 font-bold'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                <span>{t(`gallery.cat.${cat.key}`)}</span>
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="galleryTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A35A]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 relative z-30">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          key={`${activeCategory}-${filteredImages.length}`}
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          {filteredImages.map((image) => (
            <ScrollReveal key={image.id} direction="up" once={true} className="mb-8 break-inside-avoid">
              <motion.div
                variants={itemVariant}
                className="relative group overflow-hidden rounded-[2rem] bg-white/70 backdrop-blur-md border border-[#C8A35A]/20 shadow-[0_15px_40px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(200,163,90,0.08)] hover:border-[#C8A35A]/50 transition-all duration-700 p-3"
              >
                <div className="relative rounded-[1.75rem] overflow-hidden bg-neutral-100 shadow-sm">
                  {image.images && image.images.length > 1 ? (
                    <Splide
                      options={{
                        type: 'loop',
                        pagination: true,
                        arrows: true,
                        drag: true,
                        autoplay: false,
                      }}
                      className="group/slider [&_.splide\_\_arrow]:bg-white/50 [&_.splide\_\_arrow]:hover:bg-white [&_.splide\_\_pagination\_\_page]:bg-white/50 [&_.splide\_\_pagination\_\_page.is-active]:bg-white"
                    >
                      {image.images.map((imgSrc, idx) => (
                        <SplideSlide key={idx} onClick={() => setSelectedImage(image)}>
                          <div className={`relative w-full cursor-pointer ${getGalleryAspectClass(image.aspect)}`}>
                            <Image
                              src={imgSrc}
                              alt={`${image.title} ${idx + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              unoptimized={isUploadedImage(imgSrc)}
                              className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-103"
                            />
                          </div>
                        </SplideSlide>
                      ))}
                    </Splide>
                  ) : (
                    <div className={`relative w-full cursor-pointer ${getGalleryAspectClass(image.aspect)}`} onClick={() => setSelectedImage(image)}>
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={isUploadedImage(image.src)}
                        className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-103"
                      />
                    </div>
                  )}

                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 z-10">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block font-poppins">
                        {image.category}
                      </span>
                      <h3 className="text-white font-playfair text-xl font-bold flex justify-between items-center leading-tight tracking-tight">
                        {image.title}
                        <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white ml-4 border border-white/20 pointer-events-auto cursor-pointer" onClick={() => setSelectedImage(image)}>
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="px-4 py-3 flex items-center justify-between border-t border-neutral-100/50 mt-2">
                  <span className="text-neutral-500 font-jakarta font-light text-xs">{image.title}</span>
                  <span className="text-[#C8A35A] font-poppins font-bold text-[9px] tracking-widest uppercase">{image.category}</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}

          {filteredImages.length === 0 && (
            <div className="rounded-[1.5rem] border border-[#C8A35A]/20 bg-white/70 px-6 py-12 text-center text-neutral-500">
              {t('gallery.empty')}
            </div>
          )}
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              aria-label={labels.closeImage}
              className="absolute top-6 right-6 p-3 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110]"
              onClick={(event) => {
                event.stopPropagation()
                setSelectedImage(null)
              }}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 26 }}
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl p-4 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {selectedImage.images && selectedImage.images.length > 1 ? (
                    <Splide
                      options={{
                        type: 'loop',
                        pagination: true,
                        arrows: true,
                        drag: true,
                      }}
                      className="w-full h-full [&_.splide\_\_track]:h-full [&_.splide\_\_list]:h-full [&_.splide\_\_arrow]:bg-white/10 [&_.splide\_\_arrow]:hover:bg-white/20 [&_.splide\_\_arrow_svg]:fill-white [&_.splide\_\_pagination\_\_page]:bg-white/50 [&_.splide\_\_pagination\_\_page.is-active]:bg-white"
                    >
                      {selectedImage.images.map((imgSrc, idx) => (
                        <SplideSlide key={idx} className="h-full">
                          <div className="relative w-full h-full">
                            <Image
                              src={imgSrc}
                              alt={`${selectedImage.title} ${idx + 1}`}
                              fill
                              sizes="100vw"
                              unoptimized={isUploadedImage(imgSrc)}
                              className="object-contain"
                              priority
                            />
                          </div>
                        </SplideSlide>
                      ))}
                    </Splide>
                  ) : (
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      fill
                      sizes="100vw"
                      unoptimized={isUploadedImage(selectedImage.src)}
                      className="object-contain"
                      priority
                    />
                  )}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <span className="text-[#C8A35A] text-[10px] font-bold tracking-[0.25em] uppercase mb-2 block font-poppins">{selectedImage.category}</span>
                <h2 className="text-white font-playfair text-2xl font-bold tracking-tight">{selectedImage.title}</h2>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
