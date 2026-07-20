import 'server-only'

import type { SocialPlatform } from '@/types/siteContent'

type SocialMetadata = {
  sourceUrl: string
  platform: SocialPlatform
  type: string
  title: string
  excerpt: string
  date: string
  image: string
  video: string
  objectPosition: string
  metric: string
  comments: string
}

type OEmbedResponse = {
  title?: string
  thumbnail_url?: string
  author_name?: string
}

type SocialInput = {
  sourceUrl: string
  embedCaption: string
  embedTitle: string
  platformHint?: SocialPlatform
}

type YouTubeVideoResponse = {
  items?: Array<{
    snippet?: {
      title?: string
      description?: string
      publishedAt?: string
      thumbnails?: Record<string, { url?: string }>
    }
    statistics?: {
      viewCount?: string
      commentCount?: string
    }
  }>
}

const metadataTimeoutMs = 10000

const htmlEntityMap: Record<string, string> = {
  amp: '&',
  quot: '"',
  '#39': "'",
  lt: '<',
  gt: '>',
}

function decodeHtml(value: string) {
  return value.replace(/&([^;]+);/g, (match, entity) => htmlEntityMap[entity] ?? match)
}

function stripTags(value: string) {
  return decodeHtml(
    value
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  )
}

function extractAttribute(value: string, attribute: string) {
  const escaped = attribute.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return decodeHtml(value.match(new RegExp(`${escaped}=["']([^"']+)["']`, 'i'))?.[1]?.trim() ?? '')
}

function socialInput(rawInput: string): SocialInput {
  const input = rawInput.trim()

  if (!input.includes('<blockquote')) {
    return {
      sourceUrl: input,
      embedCaption: '',
      embedTitle: '',
    }
  }

  if (input.includes('instagram-media')) {
    const permalink = extractAttribute(input, 'data-instgrm-permalink')
      || input.match(/href=["'](https?:\/\/(?:www\.)?instagram\.com\/[^"']+)["']/i)?.[1]
      || ''
    const title = stripTags(
      input.match(/<p\b[^>]*>[\s\S]*?<a\b[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/p>/i)?.[1] ?? '',
    )

    if (!permalink) {
      throw new Error('Embed Instagram perlu permalink.')
    }

    return {
      sourceUrl: decodeHtml(permalink),
      embedCaption: '',
      embedTitle: title || 'Kiriman Instagram',
      platformHint: 'Instagram',
    }
  }

  const cite = extractAttribute(input, 'cite')
  const videoId = extractAttribute(input, 'data-video-id')
  const sourceUrl = cite || (videoId ? `https://www.tiktok.com/video/${videoId}` : '')
  const section = input.match(/<section\b[^>]*>([\s\S]*?)<\/section>/i)?.[1] ?? input

  if (!sourceUrl) {
    throw new Error('Embed TikTok perlu atribut cite atau data-video-id.')
  }

  return {
    sourceUrl,
    embedCaption: stripTags(section),
    embedTitle: '',
    platformHint: 'TikTok',
  }
}

function firstMeta(html: string, keys: string[]) {
  for (const key of keys) {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const forward = new RegExp(`<meta[^>]+(?:property|name)=["']${escapedKey}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i')
    const reverse = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escapedKey}["'][^>]*>`, 'i')
    const value = html.match(forward)?.[1] ?? html.match(reverse)?.[1]

    if (value) {
      return decodeHtml(value.trim())
    }
  }

  return ''
}

function formatCount(value?: string, label = 'views') {
  const count = Number(value)

  if (!Number.isFinite(count)) {
    return ''
  }

  return `${new Intl.NumberFormat('id-ID', { notation: 'compact', maximumFractionDigits: 1 }).format(count)} ${label}`
}

function youtubeVideoId(url: URL) {
  if (url.hostname === 'youtu.be') {
    return url.pathname.split('/').filter(Boolean)[0] ?? ''
  }

  if (url.pathname.startsWith('/shorts/')) {
    return url.pathname.split('/')[2] ?? ''
  }

  return url.searchParams.get('v') ?? ''
}

function youtubeThumbnail(video: NonNullable<YouTubeVideoResponse['items']>[number]) {
  const thumbnails = video.snippet?.thumbnails ?? {}

  return thumbnails.maxres?.url
    ?? thumbnails.standard?.url
    ?? thumbnails.high?.url
    ?? thumbnails.medium?.url
    ?? thumbnails.default?.url
    ?? ''
}

function platformForUrl(url: URL): SocialPlatform {
  const hostname = url.hostname.replace(/^www\./, '')

  if (hostname === 'youtu.be' || hostname.endsWith('youtube.com')) {
    return 'YouTube'
  }

  if (hostname.endsWith('tiktok.com')) {
    return 'TikTok'
  }

  if (hostname.endsWith('instagram.com')) {
    return 'Instagram'
  }

  throw new Error('Gunakan link Instagram, YouTube, atau TikTok.')
}

async function fetchPageMetadata(url: string) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; PelitaContentBot/1.0)',
    },
    cache: 'no-store',
    signal: AbortSignal.timeout(metadataTimeoutMs),
  })

  if (!response.ok) {
    throw new Error('Metadata dari sumber tidak dapat dibaca.')
  }

  const html = await response.text()

  return {
    title: firstMeta(html, ['og:title', 'twitter:title']),
    excerpt: firstMeta(html, ['og:description', 'description', 'twitter:description']),
    image: firstMeta(html, ['og:image', 'twitter:image']),
    video: firstMeta(html, ['og:video', 'og:video:url']),
  }
}

async function fetchTikTokMetadata(sourceUrl: string, embedCaption = ''): Promise<SocialMetadata> {
  const response = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(sourceUrl)}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(metadataTimeoutMs),
  })

  if (!response.ok) {
    throw new Error('Link TikTok tidak dapat dibaca.')
  }

  const embed = await response.json() as OEmbedResponse
  const caption = embed.title?.trim() || embedCaption
  const authorName = embed.author_name?.trim().replace(/^@/, '') ?? ''
  const title = authorName ? `TikTok @${authorName}` : 'Video TikTok'

  if (!caption || !embed.thumbnail_url) {
    throw new Error('TikTok tidak mengirim metadata yang dibutuhkan.')
  }

  return {
    sourceUrl,
    platform: 'TikTok',
    type: 'Video',
    title,
    excerpt: embedCaption || caption,
    date: 'Dari TikTok',
    image: embed.thumbnail_url,
    video: sourceUrl,
    objectPosition: 'center',
    metric: '',
    comments: '',
  }
}

async function fetchYouTubeMetadata(sourceUrl: string, url: URL): Promise<SocialMetadata> {
  const videoId = youtubeVideoId(url)

  if (!videoId) {
    throw new Error('Link YouTube harus menuju video atau Shorts.')
  }

  const apiKey = process.env.YOUTUBE_DATA_API_KEY

  if (apiKey) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${encodeURIComponent(videoId)}&key=${encodeURIComponent(apiKey)}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(metadataTimeoutMs),
    })
    const payload = await response.json() as YouTubeVideoResponse
    const video = payload.items?.[0]

    if (response.ok && video?.snippet?.title && youtubeThumbnail(video)) {
      return {
        sourceUrl,
        platform: 'YouTube',
        type: url.pathname.startsWith('/shorts/') ? 'Shorts' : 'Video',
        title: video.snippet.title,
        excerpt: video.snippet.description || video.snippet.title,
        date: video.snippet.publishedAt
          ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(video.snippet.publishedAt))
          : 'Dari YouTube',
        image: youtubeThumbnail(video),
        video: sourceUrl,
        objectPosition: 'center',
        metric: formatCount(video.statistics?.viewCount),
        comments: formatCount(video.statistics?.commentCount, 'komentar'),
      }
    }
  }

  const page = await fetchPageMetadata(sourceUrl)
  const image = page.image || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

  if (!page.title || !image) {
    throw new Error('Metadata YouTube tidak lengkap.')
  }

  return {
    sourceUrl,
    platform: 'YouTube',
    type: url.pathname.startsWith('/shorts/') ? 'Shorts' : 'Video',
    title: page.title,
    excerpt: page.excerpt || page.title,
    date: 'Dari YouTube',
    image,
    video: sourceUrl,
    objectPosition: 'center',
    metric: '',
    comments: '',
  }
}

async function fetchInstagramMetadata(sourceUrl: string, embedTitle = ''): Promise<SocialMetadata> {
  const page = await fetchPageMetadata(sourceUrl)

  return {
    sourceUrl,
    platform: 'Instagram',
    type: sourceUrl.includes('/reel/') ? 'Reels' : 'Post',
    title: page.title || embedTitle || 'Kiriman Instagram',
    excerpt: page.excerpt || page.title || embedTitle || 'Kiriman Instagram',
    date: 'Dari Instagram',
    image: page.image,
    video: sourceUrl,
    objectPosition: 'center',
    metric: '',
    comments: '',
  }
}

export async function fetchSocialMetadata(rawInput: string) {
  const input = socialInput(rawInput)
  let url: URL

  try {
    url = new URL(input.sourceUrl)
  } catch {
    throw new Error('Link media sosial tidak valid.')
  }

  const platform = input.platformHint ?? platformForUrl(url)
  const sourceUrl = input.sourceUrl

  if (platform === 'YouTube') {
    return fetchYouTubeMetadata(sourceUrl, url)
  }

  if (platform === 'TikTok') {
    return fetchTikTokMetadata(sourceUrl, input.embedCaption)
  }

  return fetchInstagramMetadata(sourceUrl, input.embedTitle)
}
