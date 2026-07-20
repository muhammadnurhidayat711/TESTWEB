'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  variant?: 'fade' | 'zoom' | 'blur'
  delay?: number
  duration?: number
  once?: boolean
  margin?: string
}

export default function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  variant = 'fade',
  delay = 0,
  duration = 0.6,
  once = true,
  margin = '-100px'
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: margin as any })
  const shouldReduceMotion = useReducedMotion()

  const getDirectionOffsets = () => {
    switch (direction) {
      case 'up': return { y: 24 }
      case 'down': return { y: -24 }
      case 'left': return { x: 24 }
      case 'right': return { x: -24 }
      default: return {}
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'zoom': return { scale: 0.96 }
      case 'blur': return { scale: 0.98 }
      default: return {}
    }
  }

  const initial = {
    opacity: 0,
    ...getDirectionOffsets(),
    ...getVariantStyles(),
  }

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
  }

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? { opacity: 1 } : initial}
      animate={shouldReduceMotion ? { opacity: 1 } : isInView ? animate : initial}
      transition={{
        duration: Math.min(duration, 0.42),
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`motion-elevate transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface ScrollStaggerProps {
  children: ReactNode
  className?: string
  delay?: number
  staggerDelay?: number
  once?: boolean
  margin?: string
}

export function ScrollStagger({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.08,
  once = true,
  margin = '-100px'
}: ScrollStaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: margin as any })
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={shouldReduceMotion ? "show" : isInView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}
