import 'server-only'

import { timingSafeEqual } from 'node:crypto'

/**
 * Development-only fallback key.
 * In production, ADMIN_CONTENT_KEY env var is REQUIRED — without it all admin
 * endpoints will return 503.
 */
const DEV_FALLBACK_KEY = 'pelita-dev-only-key'

export function getAdminKey() {
  if (process.env.ADMIN_CONTENT_KEY) {
    return process.env.ADMIN_CONTENT_KEY
  }

  // Only allow fallback in development — never in production
  if (process.env.NODE_ENV === 'development') {
    console.warn('[adminAuth] ADMIN_CONTENT_KEY not set — using dev fallback key. Set it before deploying!')
    return DEV_FALLBACK_KEY
  }

  return ''
}

export function getAdminKeyStatus() {
  return {
    configured: Boolean(process.env.ADMIN_CONTENT_KEY),
    // Never expose the actual key value in responses — only indicate if it's configured
    developmentMode: process.env.NODE_ENV === 'development' && !process.env.ADMIN_CONTENT_KEY,
  }
}

export function isAdminRequestAuthorized(request: Request) {
  const expectedKey = getAdminKey()
  const providedKey = request.headers.get('x-admin-key') ?? ''

  if (!expectedKey || !providedKey) {
    return false
  }

  const expectedBuffer = Buffer.from(expectedKey)
  const providedBuffer = Buffer.from(providedKey)

  return expectedBuffer.length === providedBuffer.length
    && timingSafeEqual(expectedBuffer, providedBuffer)
}
