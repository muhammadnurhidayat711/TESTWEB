'use client'

import { useEffect, useMemo, useState } from 'react'
import SkeletonImage from '@/components/SkeletonImage'
import { useMediaLoadingPreference } from '@/hooks/useMediaLoadingPreference'

type HeroBackgroundProps = {
  alt?: string
  className?: string
  fallbackImage: string
  images?: string[]
  intervalMs?: number
  priority?: boolean
  video?: string
}

export default function HeroBackground({
  alt = 'Pelita Cemerlang campus',
  className = '',
  fallbackImage,
  images,
  intervalMs = 6500,
  priority = true,
  video,
}: HeroBackgroundProps) {
  const slides = useMemo(() => {
    const uniqueImages = Array.from(new Set([...(images || []), fallbackImage].filter(Boolean)))
    return uniqueImages.length > 0 ? uniqueImages : ['/images/hero-g.jpg']
  }, [fallbackImage, images])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isPageVisible, setIsPageVisible] = useState(true)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const { prefersReducedData } = useMediaLoadingPreference()
  const visibleSlides = prefersReducedData ? slides.slice(0, 1) : slides
  const shouldUseVideo = Boolean(video && !prefersReducedData)

  useEffect(() => {
    setActiveIndex(0)
  }, [slides])

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
    if (visibleSlides.length <= 1 || isReducedMotion || !isPageVisible) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % visibleSlides.length)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [intervalMs, isPageVisible, isReducedMotion, visibleSlides.length])

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden will-change-transform ${className}`}>
      {visibleSlides.map((src, index) => (
        <SkeletonImage
          key={`${src}-${index}`}
          src={src}
          alt={index === 0 ? alt : ''}
          fill
          sizes="100vw"
          className={[
            'object-cover saturate-[0.86] brightness-[0.62] contrast-[1.08]',
            'transition-[opacity,transform,filter] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
            !shouldUseVideo && index === activeIndex ? 'opacity-100 scale-105 blur-0' : 'opacity-0 scale-100 blur-0',
            isReducedMotion ? 'origin-center' : index % 2 === 0 ? 'origin-center animate-hero-drift-a' : 'origin-center animate-hero-drift-b',
          ].join(' ')}
          priority={priority && index === 0}
          loading={priority && index === 0 ? undefined : 'lazy'}
          aria-hidden={index !== 0 || shouldUseVideo}
        />
      ))}
      {shouldUseVideo && (
        <>
          {!isVideoLoaded && (
            <div className="absolute inset-0 animate-pulse bg-[#061B49]/35" aria-hidden="true" />
          )}
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={visibleSlides[0]}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover saturate-[0.86] brightness-[0.62] contrast-[1.08] transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </>
      )}
    </div>
  )
}
