import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12.06C22 6.48 17.52 2 12 2S2 6.48 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54v-2.22c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.25c-1.24 0-1.63.77-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.21 22 17.06 22 12.06Z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" />
    </svg>
  )
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V23h-4V8Zm7.5 0h3.83v2.05h.05c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.14V23h-4v-7.89c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V23h-4V8Z" transform="translate(2 0)" />
    </svg>
  )
}

export function YoutubeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.58 7.19a2.7 2.7 0 0 0-1.9-1.91C18 4.83 12 4.83 12 4.83s-6 0-7.68.45a2.7 2.7 0 0 0-1.9 1.91A28.08 28.08 0 0 0 2 12a28.08 28.08 0 0 0 .42 4.81 2.7 2.7 0 0 0 1.9 1.91c1.68.45 7.68.45 7.68.45s6 0 7.68-.45a2.7 2.7 0 0 0 1.9-1.91A28.08 28.08 0 0 0 22 12a28.08 28.08 0 0 0-.42-4.81ZM10 15.2V8.8l5.23 3.2L10 15.2Z" />
    </svg>
  )
}
