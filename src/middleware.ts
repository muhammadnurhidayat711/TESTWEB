import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLanguage, supportedLanguages } from '@/lib/i18n'

const locales = supportedLanguages
const defaultLocale = defaultLanguage

export default function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname

  // Ignore api, _next, and admin routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/konten-admin') ||
    pathname.includes('.') // ignore static files (e.g. /favicon.ico)
  ) {
    return NextResponse.next()
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  const firstSegment = pathname.split('/').filter(Boolean)[0]

  if (firstSegment && firstSegment.length === 2 && pathnameIsMissingLocale) {
    const nextPathname = pathname.replace(`/${firstSegment}`, '')
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${nextPathname || ''}`, request.url)
    )
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale

    // e.g. incoming request is /about
    // The new URL is now /id/about
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico|icon.svg|images|uploads).*)',
  ],
}
