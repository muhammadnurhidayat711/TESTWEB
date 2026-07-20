'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import clsx from 'clsx'
import {
  ArrowUpRight,
  CalendarDays,
  Music2,
  Play,
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import { InstagramIcon, YoutubeIcon } from '@/components/BrandIcons'
import { useLanguage } from '@/components/LanguageProvider'
import type { SiteContent, SocialPlatform, SocialPost } from '@/types/siteContent'

const channels = [
  { platform: 'YouTube', handle: 'Pelita Cemerlang School' },
  { platform: 'Instagram', handle: '@pelitacemerlang.school' },
  { platform: 'TikTok', handle: '@pelitacemerlang' },
] as const

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 75,
      damping: 18,
    },
  },
}

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 20,
    },
  },
}

function platformStyle(platform: SocialPlatform) {
  switch (platform) {
    case 'Instagram':
      return {
        icon: InstagramIcon,
        text: 'text-[#F4C0E2]',
        label: 'Instagram',
      }
    case 'YouTube':
      return {
        icon: YoutubeIcon,
        text: 'text-[#FF9F98]',
        label: 'YouTube',
      }
    default:
      return {
        icon: Music2,
        text: 'text-white',
        label: 'TikTok',
      }
  }
}

function formatStyle(platform: SocialPlatform) {
  switch (platform) {
    case 'YouTube':
      return {
        format: '16:9',
        label: 'YouTube Video',
        railWidth: 'min-w-[330px] sm:min-w-[410px]',
        railAspect: 'aspect-video',
      }
    case 'Instagram':
      return {
        format: '4:5',
        label: 'Instagram Reels',
        railWidth: 'min-w-[245px] sm:min-w-[285px]',
        railAspect: 'aspect-[4/5]',
      }
    default:
      return {
        format: '9:16',
        label: 'TikTok Vertical',
        railWidth: 'min-w-[205px] sm:min-w-[240px]',
        railAspect: 'aspect-[9/16]',
      }
  }
}

function youtubeVideoId(value: string) {
  try {
    const url = new URL(value)
    const path = url.pathname.split('/').filter(Boolean)

    if (url.hostname === 'youtu.be') {
      return path[0] ?? ''
    }

    if (path[0] === 'shorts' || path[0] === 'embed') {
      return path[1] ?? ''
    }

    return url.searchParams.get('v') ?? ''
  } catch {
    return ''
  }
}

function youtubeEmbedUrl(post: SocialPost) {
  const id = youtubeVideoId(post.video) || youtubeVideoId(post.sourceUrl)

  if (!id) return ''

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    enablejsapi: '1',
    ...(origin ? { origin } : {}),
  })

  return `https://www.youtube.com/embed/${id}?${params.toString()}`
}

function sourceUrl(post: SocialPost) {
  return post.sourceUrl.startsWith('http') ? post.sourceUrl : post.video
}

function Poster({
  post,
  sizes,
  priority = false,
  className,
}: {
  post: SocialPost
  sizes: string
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src={post.image}
      alt={post.title}
      fill
      quality={85}
      sizes={sizes}
      priority={priority}
      className={clsx('object-cover', className)}
      style={{ objectPosition: post.objectPosition }}
    />
  )
}

function FeaturedYoutubeMedia({ post }: { post: SocialPost }) {
  const embedUrl = youtubeEmbedUrl(post)

  if (embedUrl) {
    return (
      <iframe
        key={embedUrl}
        title={post.title}
        src={embedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="eager"
        className="absolute inset-0 h-full w-full border-0"
        style={{ border: 'none' }}
      />
    )
  }

  if (post.video.includes('.mp4')) {
    return (
      <video
        key={post.video}
        autoPlay
        muted
        controls
        playsInline
        poster={post.image}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={post.video} type="video/mp4" />
      </video>
    )
  }

  return <Poster post={post} sizes="100vw" priority className="scale-[1.02]" />
}

function RailCard({
  post,
  active,
  onYoutubeSelect,
}: {
  post: SocialPost
  active: boolean
  onYoutubeSelect: () => void
}) {
  const style = platformStyle(post.platform)
  const format = formatStyle(post.platform)
  const Icon = style.icon
  const inner = (
    <div className={`relative ${format.railAspect}`}>
      <Poster
        post={post}
        sizes={
          post.platform === 'YouTube'
            ? '(max-width: 640px) 330px, 410px'
            : post.platform === 'Instagram'
              ? '(max-width: 640px) 245px, 285px'
              : '(max-width: 640px) 205px, 240px'
        }
        className="transition-transform duration-[1800ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061B49]/72 via-[#061B49]/12 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#061B49]/95 via-[#061B49]/5 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            <Icon className={clsx('h-3.5 w-3.5', style.text)} />
            {format.format}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-[#061B49]">
            {post.platform === 'YouTube'
              ? <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
              : <ArrowUpRight className="h-3.5 w-3.5" />}
          </span>
        </div>

        <div className={post.platform === 'YouTube' ? 'max-w-sm' : 'max-w-[210px]'}>
          <div className="mb-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-white/60">
            <CalendarDays className="h-3.5 w-3.5 text-[#DCC9AA]" />
            {style.label}
          </div>
          <h4 className={`${post.platform === 'YouTube' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-playfair font-bold leading-none tracking-tight text-white`}>
            {post.title}
          </h4>
          <p className={`mt-3 line-clamp-2 text-white/72 ${post.platform === 'YouTube' ? 'max-w-xs text-xs md:text-sm' : 'text-[11px] leading-5'}`}>
            {post.excerpt}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <motion.article
      variants={itemVariant}
      className={clsx(
        'group relative shrink-0 overflow-hidden rounded-md bg-[#061B49] shadow-[0_24px_80px_rgba(6,27,73,0.18)]',
        format.railWidth,
        active && 'ring-2 ring-[#E9D3A3]/80',
      )}
    >
      {post.platform === 'YouTube' ? (
        <button type="button" onClick={onYoutubeSelect} className="block w-full text-left">
          {inner}
        </button>
      ) : (
        <a href={sourceUrl(post)} target="_blank" rel="noopener noreferrer" className="block w-full text-left">
          {inner}
        </a>
      )}
    </motion.article>
  )
}

export default function SocialMediaClient({ initialContent }: { initialContent: SiteContent }) {
  const { lang } = useLanguage()
  const labels = lang === 'id'
    ? {
        youtubeOnly: 'Banner utama hanya video YouTube',
        openYoutube: 'Buka YouTube',
      }
    : {
        youtubeOnly: 'Main banner only supports YouTube video',
        openYoutube: 'Open YouTube',
      }
  const socialPosts = initialContent.socialPosts
  const youtubePosts = socialPosts.filter((post) => post.platform === 'YouTube')
  
  // Set the first youtube post as active by default, if any
  const firstYoutubeId = youtubePosts.length > 0 ? youtubePosts[0].id : ''
  const [activeYoutubeId, setActiveYoutubeId] = useState(firstYoutubeId)

  const featuredPost = useMemo(
    () => youtubePosts.find((post) => post.id === activeYoutubeId) ?? youtubePosts[0],
    [activeYoutubeId, youtubePosts],
  )

  const platformRails = channels.map((channel) => ({
    ...channel,
    posts: socialPosts.filter((post) => post.platform === channel.platform),
  }))

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFFAF0] pb-24 font-jakarta text-neutral-800 selection:bg-[#164AA8] selection:text-white">
      {featuredPost && (
        <section className="relative min-h-screen overflow-hidden bg-[#061B49]">
          <div className="absolute inset-0 z-0">
            <FeaturedYoutubeMedia post={featuredPost} />
          </div>
          <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(4,18,48,0.88)_0%,rgba(4,18,48,0.62)_42%,rgba(4,18,48,0.12)_78%)]" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#061B49]/88 via-[#061B49]/15 to-[#061B49]/28" />

          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="relative z-20 flex min-h-screen items-end px-6 pb-14 pt-36 md:px-10 md:pb-16 lg:px-14"
          >
            <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-8">
              <div className="max-w-[650px]">
                <motion.div variants={fadeUp} className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-md bg-black/70 px-2.5 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                    <YoutubeIcon className="h-3.5 w-3.5" />
                    YouTube
                  </span>
                  <span className="rounded-full border border-white/45 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                    {labels.youtubeOnly}
                  </span>
                </motion.div>

                <motion.h1 variants={fadeUp} className="mb-4 text-4xl font-bold leading-[0.98] tracking-tight text-white md:text-6xl">
                  {featuredPost.title}
                </motion.h1>

                <motion.p variants={fadeUp} className="mb-6 max-w-lg text-sm font-light leading-relaxed text-white/82 md:text-base">
                  {featuredPost.excerpt}
                </motion.p>

                <motion.a
                  variants={fadeUp}
                  href={sourceUrl(featuredPost)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-2.5 text-sm font-bold text-[#061B49] transition hover:bg-[#E9D3A3]"
                >
                  {labels.openYoutube}
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      <section id="timeline" className="relative z-30 pb-4">
        <div className="mt-12 space-y-14">
          {platformRails.map((rail) => (
            <ScrollReveal key={rail.platform} direction="up" once>
              <div>
                <div className="mb-5 flex items-end justify-between gap-6 px-6 md:px-10 lg:px-14">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">{rail.handle}</p>
                    <h2 className="font-playfair text-3xl font-bold tracking-tight text-[#061B49] md:text-4xl">{rail.platform}</h2>
                  </div>
                </div>

                <div className="social-media-rail overflow-hidden pb-5">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="show"
                    className={`social-media-track flex w-max ${
                      rail.platform === 'Instagram'
                        ? 'social-media-track-reverse'
                        : rail.platform === 'TikTok'
                          ? 'social-media-track-slow'
                          : ''
                    }`}
                  >
                    {[0, 1].map((group) => (
                      <div key={`${rail.platform}-${group}`} className="flex shrink-0 gap-3 px-1.5 md:gap-4 md:px-2">
                        {[...rail.posts, ...rail.posts].map((post, index) => (
                          <RailCard
                            key={`${post.id}-${group}-${index}`}
                            post={post}
                            active={post.platform === 'YouTube' && post.id === featuredPost?.id}
                            onYoutubeSelect={() => setActiveYoutubeId(post.id)}
                          />
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
