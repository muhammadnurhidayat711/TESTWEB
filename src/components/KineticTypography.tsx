'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  staggerDelay?: number
}

export function SplitTextReveal({
  text,
  className = '',
  once = true,
  delay = 0,
  staggerDelay = 0.02
}: SplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.span
      ref={ref}
      initial={shouldReduceMotion ? false : { y: 22, opacity: 0 }}
      animate={shouldReduceMotion || isInView ? { y: 0, opacity: 1 } : { y: 22, opacity: 0 }}
      transition={{
        duration: 0.38,
        delay: Math.min(delay, 0.12),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`inline-block transform-gpu ${className}`}
    >
      {text}
    </motion.span>
  )
}

interface LetterRevealProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  staggerDelay?: number
}

export function LetterReveal({
  text,
  className = '',
  once = true,
  delay = 0,
  staggerDelay = 0.015
}: LetterRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.span
      ref={ref}
      initial={shouldReduceMotion ? false : { y: 26, opacity: 0, scale: 0.985 }}
      animate={shouldReduceMotion || isInView ? { y: 0, opacity: 1, scale: 1 } : { y: 26, opacity: 0, scale: 0.985 }}
      transition={{
        duration: 0.42,
        delay: Math.min(delay, 0.12),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`inline-block transform-gpu ${className}`}
    >
      {text}
    </motion.span>
  )
}

interface KineticHoverTextProps {
  text: string
  className?: string
}

export function KineticHoverText({ text, className = '' }: KineticHoverTextProps) {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block whitespace-pre cursor-pointer transform-gpu"
          whileHover={{
            scale: 1.18,
            color: '#DCC9AA',
            y: -6,
            rotateZ: [0, -4, 4, 0],
            transition: { duration: 0.34, type: 'spring', stiffness: 360, damping: 18 }
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

interface TextMarqueeProps {
  text: string
  outlineText?: string
  speed?: number // speed in seconds for full loop
  direction?: 'left' | 'right'
  className?: string
}

export function ScrollingMarquee({
  text,
  outlineText = '',
  speed = 25,
  direction = 'left',
  className = ''
}: TextMarqueeProps) {
  const items = Array(3).fill({ text, outlineText })

  return (
    <div className={`w-full overflow-hidden whitespace-nowrap flex select-none relative py-4 ${className}`}>
      <div className="flex gap-8 w-max pr-8 transform-gpu">
        {items.map((item, index) => (
          <div key={index} className="flex gap-8 items-center text-4xl sm:text-5xl md:text-7xl font-bold font-playfair tracking-wider uppercase">
            <span className="text-[#164AA8]/10 dark:text-white/10 text-outline">
              {item.text}
            </span>
            {item.outlineText && (
              <span className="text-transparent border-text-stroke text-stroke-primary dark:text-stroke-white">
                {item.outlineText}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
