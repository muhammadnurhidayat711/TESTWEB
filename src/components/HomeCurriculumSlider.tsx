'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function HomeCurriculumSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPageVisible, setIsPageVisible] = useState(true)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setIsReducedMotion(mediaQuery.matches)
    const updateVisibility = () => setIsPageVisible(document.visibilityState === 'visible')

    updateMotionPreference()
    updateVisibility()

    mediaQuery.addEventListener('change', updateMotionPreference)
    document.addEventListener('visibilitychange', updateVisibility)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
      document.removeEventListener('visibilitychange', updateVisibility)
    }
  }, [])

  useEffect(() => {
    if (images.length <= 1 || isReducedMotion || !isPageVisible) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length, isPageVisible, isReducedMotion])

  if (!images || images.length === 0) return null

  if (images.length === 1) {
    return <Image src={images[0]} alt="Kurikulum" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((img, idx) => (
        <div 
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={img}
            alt={`Kurikulum ${idx + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} 
          />
        ))}
      </div>
    </div>
  )
}
