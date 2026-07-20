'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { useLanguage } from './LanguageProvider'

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    // Skip preloader entirely if user has already seen it this session
    // or if they prefer reduced motion
    const hasLoaded = sessionStorage.getItem('hasLoadedBefore')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (hasLoaded || prefersReducedMotion) {
      setLoading(false)
      return
    }

    // Wait for the DOM to be interactive, then show content quickly
    // Use a shorter timer to avoid blocking the user
    const timer = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem('hasLoadedBefore', 'true')
    }, 600) // Reduced from 900ms to 600ms
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#061B49] transition-opacity duration-700 ease-in-out', // Reduced from 1000ms to 700ms
        loading ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      )}
    >
      {/* Deep Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,211,163,0.08)_0%,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-[#0A3A8D]/30 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />

      <div
        className={clsx(
          'relative flex flex-col items-center justify-center transition-all duration-[1200ms] ease-out', // Reduced from 1500ms
          loading ? 'scale-100 translate-y-0' : 'scale-110 -translate-y-10'
        )}
      >
        {/* Core Loading Rings */}
        <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48">
          
          {/* Subtle Outer Track */}
          <div className="absolute inset-0 rounded-full border border-white/5 bg-[#FFFAF0]/[0.02] backdrop-blur-sm shadow-[0_0_50px_rgba(232,211,163,0.05)]"></div>
          
          {/* Slow Outer Celestial Ring */}
          <div className="absolute -inset-2 rounded-full border border-transparent border-t-[#E9D3A3]/60 border-b-[#E9D3A3]/20 animate-spin" style={{ animationDuration: '4s' }}></div>
          
          {/* Inner Precise Ring (Reverse) */}
          <div className="absolute inset-2 rounded-full border border-transparent border-r-[#B88A35]/70 border-l-[#B88A35]/30 animate-spin" style={{ animationDuration: '5s', animationDirection: 'reverse' }}></div>
          
          {/* Core Pulsating Ring */}
          <div className="absolute inset-5 rounded-full border-[0.5px] border-[#E9D3A3]/30 bg-gradient-to-tr from-[#0A3A8D]/20 to-transparent shadow-inner animate-pulse" style={{ animationDuration: '4s' }}></div>

          {/* Center Logo with Breathing Effect */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 relative z-10 animate-pulse" style={{ animationDuration: '4s' }}>
            <Image
              src="/images/logo.png"
              alt="Loading Logo"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(232,211,163,0.4)]"
              priority
            />
          </div>
        </div>

        {/* Elegant Typography */}
        <div className="mt-12 flex flex-col items-center gap-4 opacity-90">
          <span className="font-playfair text-[#E9D3A3] text-sm sm:text-base font-medium tracking-[0.4em] uppercase animate-pulse" style={{ animationDuration: '4s' }}>
            {t('common.loading')}
          </span>
          <div className="flex gap-3">
            <div className="w-1 h-1 rounded-full bg-[#E9D3A3]/70 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '2s' }} />
            <div className="w-1 h-1 rounded-full bg-[#E9D3A3]/70 animate-bounce" style={{ animationDelay: '300ms', animationDuration: '2s' }} />
            <div className="w-1 h-1 rounded-full bg-[#E9D3A3]/70 animate-bounce" style={{ animationDelay: '600ms', animationDuration: '2s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
