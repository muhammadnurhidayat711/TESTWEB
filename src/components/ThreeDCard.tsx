'use client'

import React, { useRef, useState, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ThreeDCardProps {
  children: ReactNode
  className?: string
  depthEffect?: boolean
}

export default function ThreeDCard({ children, className = '', depthEffect = true }: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    card.style.setProperty('--mx', `${mouseX}px`)
    card.style.setProperty('--my', `${mouseY}px`)
  }

  const handleMouseEnter = () => {
    setHovering(true)
  }

  const handleMouseLeave = () => {
    setHovering(false)
  }

  return (
    <div 
      className="perspective-1000 flex items-center justify-center motion-3d-wrap"
      style={{ perspective: '1400px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: hovering && !shouldReduceMotion ? 1.01 : 1,
          y: hovering && !shouldReduceMotion ? -3 : 0,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        className={`relative w-full h-full cursor-pointer rounded-[2rem] border border-white/10 bg-white/5 transition-[background-color,border-color,box-shadow] duration-300 transform-gpu motion-card ${className}`}
      >
        {hovering && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-[#164AA8]/14 via-white/8 to-[#DCC9AA]/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldReduceMotion ? 0 : 0.42 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        <div className={`w-full h-full ${depthEffect ? 'preserve-3d' : ''}`}>
          {children}
        </div>
      </motion.div>
    </div>
  )
}

interface ThreeDCardItemProps {
  children?: ReactNode
  className?: string
  translateZ?: number | string
  translateX?: number | string
  translateY?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
}

export function ThreeDCardItem({
  children,
  className = '',
  translateZ = 0,
  translateX = 0,
  translateY = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
}: ThreeDCardItemProps) {
  const transformString = `
    translate3d(${translateX}px, ${translateY}px, ${translateZ}px) 
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg) 
    rotateZ(${rotateZ}deg)
  `

  return (
    <div
      style={{
        transform: transformString,
        transformStyle: 'preserve-3d',
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </div>
  )
}

export function IsometricFloat({
  children,
  className = '',
  delay = 0,
  duration = 5
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}) {
  return (
    <div
      className={`isometric-transform transform-gpu ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: 'rotateX(30deg) rotateY(-45deg)',
      }}
    >
      {children}
    </div>
  )
}
