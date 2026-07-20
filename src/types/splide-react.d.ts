declare module '@splidejs/react-splide' {
  import * as React from 'react'

  export const Splide: React.ComponentType<any>
  export const SplideSlide: React.ComponentType<any>
  export const SplideTrack: React.ComponentType<any>
  export type Options = Record<string, unknown>
}

declare module '@splidejs/react-splide/css'
