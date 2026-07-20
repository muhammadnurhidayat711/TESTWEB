'use client'

import { motion, Variants } from 'framer-motion'
import { FileText } from 'lucide-react'
import HeroBackground from '@/components/HeroBackground'
import WaveBackground from '@/components/WaveBackground'
import { useContent } from '@/components/ContentProvider'
import { useLanguage } from '@/components/LanguageProvider'

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
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 78,
      damping: 18,
    },
  },
}

function parseLegalContent(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean)
      const [title, ...bodyLines] = lines

      return {
        title: title || '',
        body: bodyLines.join(' '),
      }
    })
}

export default function TermsPage() {
  const { lang } = useLanguage()
  const content = useContent()
  const pageContent = content.pages.terms
  const sections = parseLegalContent(pageContent.legalContent || '')
  const labels = lang === 'id'
    ? { eyebrow: 'Legal', updated: 'Terakhir diperbarui' }
    : { eyebrow: 'Legal', updated: 'Last updated' }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFFAF0] pb-20 font-jakarta text-neutral-800 antialiased selection:bg-[#164AA8] selection:text-white">
      <WaveBackground />

      <section className="relative flex h-[58vh] min-h-[420px] items-center justify-center overflow-hidden">
        <HeroBackground
          alt="Terms and conditions background"
          fallbackImage={pageContent.heroBgImage}
          images={pageContent.heroBgImages}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A3A8D]/80 via-[#0A3A8D]/50 to-[#FFFAF0]" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative z-20 mx-auto mt-12 max-w-5xl px-6 text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#164AA8]/30 bg-[#164AA8]/20 px-5 py-2.5"
          >
            <FileText className="h-4.5 w-4.5 text-[#DCC9AA]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#DCC9AA]">
              {labels.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-jakarta text-4xl font-extrabold leading-tight tracking-normal text-white drop-shadow-lg md:text-6xl"
          >
            {pageContent.heroTitle}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-3xl text-base font-light leading-relaxed text-[#FFFAF0]/90 md:text-lg"
          >
            {pageContent.heroSubtitle}
          </motion.p>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-4xl px-6">
        <motion.article
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerContainer}
          className="rounded-lg border border-[#061B49]/10 bg-white p-6 shadow-[0_22px_70px_rgba(6,27,73,0.12)] md:p-10"
        >
          {pageContent.introText && (
            <motion.p variants={fadeUp} className="mb-8 text-lg leading-relaxed text-[#516074]">
              {pageContent.introText}
            </motion.p>
          )}

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.section
                key={`${section.title}-${index}`}
                variants={fadeUp}
                className="border-t border-[#061B49]/10 pt-7 first:border-t-0 first:pt-0"
              >
                {section.title && (
                  <h2 className="font-jakarta text-xl font-bold text-[#061B49] md:text-2xl">
                    {section.title}
                  </h2>
                )}
                {section.body && (
                  <p className="mt-3 whitespace-pre-wrap leading-8 text-[#516074]">
                    {section.body}
                  </p>
                )}
              </motion.section>
            ))}
          </div>
        </motion.article>
      </section>
    </div>
  )
}
