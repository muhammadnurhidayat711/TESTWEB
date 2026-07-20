'use client'

import { useState } from 'react'
import { useContent } from '@/components/ContentProvider'
import { useLanguage } from '@/components/LanguageProvider'
import clsx from 'clsx'
import { Quote, PlayCircle } from 'lucide-react'

export default function HomeTestimonials() {
  const content = useContent()
  const { lang } = useLanguage()
  const labels = lang === 'id'
    ? {
        sectionLabel: 'Testimoni',
        sectionTitle: 'Apa Kata Mereka',
        sectionDesc: 'Cerita otentik dari komunitas Pelita Cemerlang.',
        showText: 'Tampilkan testimoni teks',
        showVideo: 'Tampilkan testimoni video',
        profilePhoto: 'Foto profil',
        communityExperience: 'Pengalaman komunitas',
        chooseGroup: 'Pilih testimoni',
        chooseItem: 'Pilih testimoni',
      }
    : {
        sectionLabel: 'Testimonials',
        sectionTitle: 'What They Say',
        sectionDesc: 'Authentic stories from the Pelita Cemerlang community.',
        showText: 'Show text testimonials',
        showVideo: 'Show video testimonials',
        profilePhoto: 'Profile photo',
        communityExperience: 'Community experience',
        chooseGroup: 'Choose testimonial',
        chooseItem: 'Choose testimonial',
      }
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeVideo, setActiveVideo] = useState(0)
  const [viewMode, setViewMode] = useState<'text' | 'video'>('text')
  
  const testimonialsList = content.testimonials.length ? content.testimonials : []
  const videos = content.pages.home.testimonialsSection?.videos?.filter(v => v.url) || []
  const active = testimonialsList[activeTestimonial]

  if (!testimonialsList.length && videos.length === 0) return null

  return (
    <section className="relative overflow-hidden border-y border-[#D7C5A7]/55 bg-[#FFFAF0]/80 py-10 backdrop-blur-sm [content-visibility:auto] [contain-intrinsic-size:520px] md:py-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-6 max-w-2xl text-center md:mb-7">
          <p className="mb-3 font-jakarta text-[11px] font-bold uppercase tracking-[0.22em] text-[#B88A35]">
            {content.pages.home.testimonialsSection?.label || labels.sectionLabel}
          </p>
          <h2 className="luxury-text-stroke mb-2 font-playfair text-[1.8rem] font-bold tracking-tight text-[#0A3A8D] md:text-[2.1rem]">
            {content.pages.home.testimonialsSection?.title || labels.sectionTitle}
          </h2>
          <p className="font-jakarta text-sm font-light leading-6 text-[#164AA8]/75">
            {content.pages.home.testimonialsSection?.desc || labels.sectionDesc}
          </p>
        </div>

        {testimonialsList.length > 0 && videos.length > 0 && (
          <div className="flex justify-center mb-10 md:mb-12">
            <div className="relative inline-flex items-center p-1 bg-[#FFFAF0]/50 border border-[#D7C5A7]/60 rounded-full shadow-[inset_0_2px_4px_rgba(6,27,73,0.04)]">
              {/* Sliding Background */}
              <div
                className={clsx(
                  "absolute h-[calc(100%-8px)] rounded-full bg-[#0A3A8D] transition-all duration-300 ease-out shadow-sm",
                  viewMode === 'text' ? "left-1 w-[calc(50%-4px)]" : "left-[50%] w-[calc(50%-4px)]"
                )}
              />
              
              <button
                onClick={() => setViewMode('text')}
                className={clsx(
                  "relative z-10 px-8 py-2.5 transition-colors duration-300 rounded-full flex items-center justify-center",
                  viewMode === 'text' ? "text-white" : "text-[#0A3A8D] hover:text-[#061B49]"
                )}
                aria-label={labels.showText}
              >
                <Quote className="w-[18px] h-[18px]" />
              </button>
              
              <button
                onClick={() => setViewMode('video')}
                className={clsx(
                  "relative z-10 px-8 py-2.5 transition-colors duration-300 rounded-full flex items-center justify-center",
                  viewMode === 'video' ? "text-white" : "text-[#0A3A8D] hover:text-[#061B49]"
                )}
                aria-label={labels.showVideo}
              >
                <PlayCircle className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        )}

        {(viewMode === 'text' || videos.length === 0) && testimonialsList.length > 0 && active && (
          <div className="mx-auto grid max-w-[76rem] items-stretch gap-5 lg:grid-cols-[minmax(270px,0.72fr)_minmax(600px,1.52fr)] lg:gap-6">
            <div className="relative h-[260px] w-full overflow-hidden rounded-lg border border-[#D7C5A7] bg-[#061B49] shadow-[0_18px_48px_rgba(6,27,73,0.16)] sm:h-[285px] lg:h-[300px]">
                {active.photo ? (
                  <img
                    src={active.photo}
                    alt={`${labels.profilePhoto} ${active.author}`}
                    width={260}
                    height={260}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#0A3A8D] font-playfair text-7xl font-bold text-[#FFFAF0]">
                    {active.author.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061B49]/78 via-[#061B49]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-5 py-5 text-[#FFFAF0] md:px-6">
                  <h3 className="font-jakarta text-lg font-bold">{active.author}</h3>
                  <p className="mt-2 font-jakarta text-xs font-semibold uppercase tracking-[0.18em] text-[#E9D3A3]">
                    {active.role}
                  </p>
                </div>
            </div>

            <div className="relative h-[260px] overflow-hidden rounded-lg border border-[#D7C5A7]/80 bg-white/55 px-5 py-5 shadow-[0_18px_48px_rgba(6,27,73,0.08)] backdrop-blur-sm sm:h-[285px] sm:px-7 sm:py-6 lg:h-[300px] lg:px-8 lg:py-7">
              <div className="pointer-events-none absolute right-6 top-2 select-none font-playfair text-[5.5rem] leading-none text-[#DCC9AA]/35 md:right-7 md:text-[6.5rem]">
                "
              </div>

              <div className="relative flex h-full flex-col justify-between gap-5">
                <div className="max-w-2xl">
                  <p className="mb-4 font-jakarta text-[11px] font-bold uppercase tracking-[0.2em] text-[#B88A35]">
                    {labels.communityExperience}
                  </p>
                  <p className="line-clamp-5 font-playfair text-base font-light italic leading-relaxed text-[#061B49] sm:text-lg lg:text-[1.25rem]">
                  {active.text}
                </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-[#D7C5A7]/70 pt-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h4 className="font-jakarta text-base font-bold text-[#0A3A8D]">{active.author}</h4>
                    <span className="mt-1 block font-jakarta text-xs font-semibold uppercase tracking-[0.18em] text-[#B88A35]">
                      {active.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-2" aria-label={labels.chooseGroup}>
                    {testimonialsList.map((testimonial, i) => (
                      <button
                        key={testimonial.id}
                        onClick={() => setActiveTestimonial(i)}
                        aria-label={`${labels.chooseItem} ${i + 1}`}
                        aria-pressed={i === activeTestimonial}
                        className={clsx(
                          'h-2.5 rounded-full transition-[width,background-color] duration-300',
                          i === activeTestimonial
                            ? 'w-9 bg-[#0A3A8D]'
                            : 'w-2.5 bg-[#D7C5A7] hover:bg-[#B88A35]',
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {(viewMode === 'video' || testimonialsList.length === 0) && videos.length > 0 && (
          <div className="mx-auto max-w-[76rem]">
            <div className="mx-auto max-w-xl">
              <div className={clsx(
                "grid gap-3 lg:gap-4 mx-auto",
                videos.length === 1 ? "grid-cols-1 max-w-[180px]" : 
                videos.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-[380px]" : 
                "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
              )}>
                {videos.map((video, idx) => {
                  return (
                    <div key={idx} className="relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-[#D7C5A7] bg-[#061B49] shadow-[0_18px_48px_rgba(6,27,73,0.12)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(6,27,73,0.18)]">
                      <video src={video.url} controls preload="metadata" className="w-full h-full object-cover" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
