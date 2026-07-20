'use client'

import Image from 'next/image'
import { useContent } from '@/components/ContentProvider'

export default function HomeAlumniDestinations() {
  const content = useContent()
  const destinations = content.alumniDestinations.length
    ? content.alumniDestinations
    : []

  if (!destinations.length) return null

  return (
    <section className="relative overflow-hidden border-t border-[#D7C5A7]/50 bg-transparent py-24 [content-visibility:auto] [contain-intrinsic-size:760px] md:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div data-home-reveal className="home-scroll-item mx-auto mb-20 max-w-3xl text-center">
          <h2 className="luxury-text-stroke mb-6 font-playfair text-4xl font-bold tracking-tight text-[#0A3A8D] md:text-5xl">
            {content.pages.home.alumniSection?.title || 'Jejak Alumni Kami'}
          </h2>
          <p className="font-jakarta text-xl font-light text-[#164AA8]">
            {content.pages.home.alumniSection?.desc || 'Lulusan Pelita Cemerlang secara konsisten membuktikan kualitasnya dengan melanjutkan studi di berbagai universitas terkemuka.'}
          </p>
        </div>

        <div className="alumni-destinations-rail relative mt-16 w-full overflow-hidden">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-[#FFFAF0] to-transparent md:w-32" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-[#FFFAF0] to-transparent md:w-32" />

          <div className="alumni-destinations-track flex w-max">
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0 gap-6 pr-6 md:gap-10 md:pr-10">
                {destinations.map((destination) => (
                  <div key={`${group}-${destination.id}`} className="home-card-motion group flex w-40 shrink-0 flex-col items-center gap-3 md:w-52">
                    <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-[#D7C5A7]/50 bg-white/60 p-4 shadow-sm backdrop-blur-sm md:p-5">
                      {destination.image ? (
                        <Image
                          src={destination.image}
                          alt={destination.name}
                          fill
                          sizes="(max-width: 768px) 160px, 208px"
                          className="object-contain p-4 md:p-5"
                        />
                      ) : (
                        <span className="font-playfair text-4xl font-bold text-primary/20">
                          {destination.name.split(' ').map((part) => part[0]).join('').slice(0, 3)}
                        </span>
                      )}
                    </div>
                    <span className="px-2 text-center font-jakarta text-xs font-semibold leading-snug text-[#0A3A8D] transition-colors duration-300 group-hover:text-primary md:text-sm">
                      {destination.name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
