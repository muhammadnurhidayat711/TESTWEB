'use client'

import { useMemo, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Newspaper, ArrowRight, Calendar, User, ChevronDown } from 'lucide-react'
import WaveBackground from '@/components/WaveBackground'
import ScrollReveal from '@/components/ScrollReveal'
import { useContent } from '@/components/ContentProvider'
import { useLanguage } from '@/components/LanguageProvider'
import HeroBackground from '@/components/HeroBackground'
import type { NewsArticle } from '@/types/siteContent'

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

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const content = useContent()
  const { lang } = useLanguage()
  const labels = lang === 'id'
    ? { allNews: 'Semua Berita', infoCenter: 'Pusat Informasi', scroll: 'Scroll', featured: 'Sorotan Utama', readMore: 'Baca Selengkapnya', close: 'Tutup' }
    : { allNews: 'All News', infoCenter: 'Information Center', scroll: 'Scroll', featured: 'Featured', readMore: 'Read More', close: 'Close' }
  const pageContent = content.pages.news
  const headerRef = useRef<HTMLDivElement>(null)
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  const featuredArticle = content.news.find((article) => article.featured) ?? content.news[0]
  const articles = featuredArticle
    ? content.news.filter((article) => article.id !== featuredArticle.id)
    : content.news
  const categories = useMemo(() => [
    { id: 'All', name: labels.allNews },
    ...Array.from(new Set(content.news.map((article) => article.category))).map((category) => ({
      id: category,
      name: category,
    })),
  ], [content.news, labels.allNews])
  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(art => art.category === activeCategory)

  const showFeatured = featuredArticle
    && (activeCategory === 'All' || activeCategory === featuredArticle.category)

  return (
    <div className="bg-[#FFFAF0] min-h-screen selection:bg-[#164AA8] selection:text-white relative overflow-hidden font-jakarta antialiased pb-24 text-neutral-800">

      <WaveBackground />

      <section ref={headerRef} className="relative h-[65vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <HeroBackground
          alt="News Background"
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
            <Newspaper className="w-4.5 h-4.5 text-[#DCC9AA]" />
            <span className="text-[#DCC9AA] font-semibold text-xs tracking-[0.2em] uppercase font-jakarta">{labels.infoCenter}</span>
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

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/40 text-xs font-jakarta tracking-wider uppercase font-semibold">{labels.scroll}</span>
            <ChevronDown className="w-5 h-5 text-white/40 animate-bounce" />
          </div>
        </motion.div>
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
                <span>{cat.name}</span>
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="newsTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C8A35A]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {showFeatured && (
          <motion.div
            key="featured-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto px-6 mb-24 -mt-8 relative z-30"
          >
            <ScrollReveal direction="up" once={true}>
              <button onClick={() => setSelectedArticle(featuredArticle)} className="block group w-full text-left">
                <div className="relative rounded-[2.5rem] overflow-hidden bg-white/70 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-[#C8A35A]/20 hover:border-[#C8A35A]/40 transition-all duration-700 flex flex-col lg:flex-row p-3">

                  <div className="lg:w-1/2 p-3 flex items-center justify-center">
                    <div className="relative w-full aspect-[16/10] lg:h-[420px] rounded-[2rem] overflow-hidden bg-neutral-100 shadow-sm border border-neutral-200/30">
                      <Image
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover group-hover:scale-103 transition-transform duration-[2000ms] ease-out"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        quality={85}
                        priority
                      />
                    </div>
                  </div>

                  <div className="lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center relative bg-transparent">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#164AA8]/3 to-transparent rounded-bl-full -translate-y-1/2 translate-x-1/2" />

                    <div className="flex items-center gap-3.5 mb-6">
                      <span className="inline-flex px-4 py-1.5 bg-[#C8A35A]/10 text-[#C8A35A] font-poppins font-bold text-[9px] tracking-[0.2em] uppercase rounded-full">
                        {labels.featured} - {featuredArticle.category}
                      </span>
                    </div>

                    <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-[#061B49] mb-6 leading-tight group-hover:text-[#164AA8] transition-colors tracking-tight">
                      {featuredArticle.title}
                    </h2>

                    <p className="text-neutral-500 font-jakarta font-light text-base md:text-lg leading-relaxed mb-10">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-8 border-t border-neutral-100">
                      <div className="flex items-center gap-6 text-xs text-neutral-400 font-poppins uppercase tracking-wider font-semibold">
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#C8A35A]" /> {featuredArticle.date}</span>
                        <span className="flex items-center gap-2"><User className="w-4 h-4 text-[#C8A35A]" /> {featuredArticle.author}</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#FFFAF0] border border-[#C8A35A]/30 flex items-center justify-center group-hover:bg-[#0A3A8D] group-hover:text-white group-hover:border-[#0A3A8D] transition-all duration-300">
                        <ArrowRight className="w-5 h-5 text-[#0A3A8D] group-hover:text-white" />
                      </div>
                    </div>

                  </div>

                </div>
              </button>
            </ScrollReveal>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="max-w-7xl mx-auto px-6 relative z-30">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          key={activeCategory}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArticles.map((article) => (
            <ScrollReveal key={article.id} direction="up" once={true}>
              <motion.div variants={itemVariant} className="h-full">
                <button onClick={() => setSelectedArticle(article)} className="group block h-full w-full text-left">
                  <div className="bg-white/70 backdrop-blur-md rounded-[2.25rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.01)] border border-[#C8A35A]/20 hover:border-[#C8A35A]/50 hover:shadow-[0_20px_50px_rgba(200,163,90,0.06)] transition-all duration-500 h-full flex flex-col p-3">

                    <div className="relative h-64 overflow-hidden rounded-[1.75rem] bg-gray-100 shadow-sm">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-103"
                        quality={85}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-[#0A3A8D] font-poppins font-bold text-[9px] tracking-widest uppercase rounded-full shadow-sm border border-neutral-100">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-[10px] font-bold font-poppins tracking-wider text-neutral-400 uppercase mb-4">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#C8A35A]" /> {article.date}</span>
                      </div>

                      <h3 className="font-playfair text-2xl font-bold text-[#061B49] mb-4 leading-tight group-hover:text-[#164AA8] transition-colors tracking-tight">
                        {article.title}
                      </h3>

                      <p className="text-neutral-500 font-jakarta font-light text-sm leading-relaxed mb-8 flex-grow">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-[#0A3A8D] group-hover:text-[#164AA8] font-poppins font-bold text-xs tracking-widest uppercase transition-all mt-auto pt-6 border-t border-neutral-100">
                        {labels.readMore}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>

                    </div>
                  </div>
                </button>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>
      </section>

    <AnimatePresence>
      {selectedArticle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#061B49]/80 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl h-auto max-h-full bg-[#FFFAF0] rounded-[2rem] shadow-2xl relative flex flex-col overflow-hidden"
          >
            {/* Tombol Close Mengambang */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all shadow-sm"
              aria-label={labels.close}
            >
              x
            </button>
            
            {/* Area Konten dengan Scroll Terpisah */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden rounded-[2rem] pb-8">
              <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] shrink-0">
                <Image src={selectedArticle.image} alt={selectedArticle.title} fill className="object-cover" quality={85} />
                {/* Gradient agar transisi gambar ke teks lebih halus */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FFFAF0] via-[#FFFAF0]/10 to-transparent" />
              </div>
              
              {/* Bagian Teks (Sedikit naik ke atas gambar) */}
              <div className="px-6 sm:px-10 md:px-16 lg:px-20 flex flex-col gap-6 -mt-16 sm:-mt-24 relative z-10">
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[10px] sm:text-xs font-bold font-poppins tracking-wider text-[#9B741F] uppercase bg-white/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-sm self-start">
                  <span className="px-3 py-1 bg-[#C8A35A]/10 rounded-full">{selectedArticle.category}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {selectedArticle.date}</span>
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {selectedArticle.author}</span>
                </div>
                
                <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-[#061B49] leading-tight">
                  {selectedArticle.title}
                </h2>
                
                <div className="w-16 h-1.5 bg-gradient-to-r from-[#C8A35A] to-[#DCC9AA] rounded-full" />
                
                <div className="prose prose-sm sm:prose-base md:prose-lg prose-neutral max-w-none font-jakarta font-light text-[#516074] leading-relaxed whitespace-pre-wrap mt-2">
                  {selectedArticle.excerpt}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>

    </div>
  )
}
