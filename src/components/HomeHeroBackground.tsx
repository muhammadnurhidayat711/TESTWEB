'use client'

import HeroBackground from '@/components/HeroBackground'

type HomeHeroBackgroundProps = {
  images?: string[]
  fallbackImage: string
  video?: string
}

export default function HomeHeroBackground({ images, fallbackImage, video }: HomeHeroBackgroundProps) {
  return (
    <HeroBackground
      alt="Pelita Cemerlang Campus"
      className="home-hero-bg"
      fallbackImage={fallbackImage}
      images={images}
      video={video}
    />
  )
}
