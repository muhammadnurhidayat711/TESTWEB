'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { useContent } from './ContentProvider'
import clsx from 'clsx'

interface SubLink {
  href: string
  label: string
  key?: string
}

interface NavLink {
  href?: string
  key: string
  dropdown?: SubLink[]
}

const navLinks: NavLink[] = [
  { href: '/', key: 'nav.home' },
  { href: '/about', key: 'nav.about' },
  { 
    key: 'nav.academic',
    dropdown: [
      { href: '/academic/preschool', label: 'Preschool' },
      { href: '/academic/primary', label: 'Primary School' },
      { href: '/academic/secondary', label: 'Secondary School' },
    ]
  },
  { href: '/facilities', key: 'nav.facilities' },
  { href: '/achievements', key: 'nav.achievements' },
  { 
    key: 'nav.mediacenter',
    dropdown: [
      { href: '/gallery', key: 'footer.gallery', label: 'Pusat Media' },
      { href: '/news', key: 'footer.news', label: 'Berita' },
      { href: '/social-media', key: 'footer.socialmedia', label: 'Media Sosial' },
    ]
  },
  {
    key: 'nav.information',
    dropdown: [
      { href: '/contact', key: 'nav.contact', label: 'Kontak' },
      { href: '/career', key: 'nav.career', label: 'Karir' },
    ]
  },
]

export default function Header() {
  const pathname = usePathname()
  const { lang, t, toggleLanguage } = useLanguage()
  const router = useRouter()
  const content = useContent()
  const headerLogoUrl = content.globalConfig?.headerLogo || '/images/logo.png'

  const getLocalizedPath = (path: string) => `/${lang}${path === '/' ? '' : path}`

  const handleToggleLanguage = () => {
    const newLang = lang === 'id' ? 'en' : 'id'
    toggleLanguage()

    const segments = pathname.split('/')
    if (segments.length > 1 && (segments[1] === 'id' || segments[1] === 'en')) {
      segments[1] = newLang
      const newPath = segments.join('/')
      router.push(newPath)
    } else {
      router.push(`/${newLang}`)
    }
  }
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isScrolledRef = useRef(false)
  const tickingRef = useRef(false)
  const hasOverlayHero = /^\/(?:id|en)\/?$/.test(pathname) || pathname === '/'
  const useFloatingHeader = hasOverlayHero && !isScrolled

  const activeMenus = content.globalConfig?.activeMenus || {}
  const visibleNavLinks = navLinks.map(link => {
    if (link.dropdown) {
      const visibleDropdown = link.dropdown.filter(sub => {
        // Use href as the unique identifier for submenus in activeMenus
        if (sub.href in activeMenus) return activeMenus[sub.href] !== false
        return true
      })
      return { ...link, dropdown: visibleDropdown }
    }
    return link
  }).filter(link => {
    if (link.key in activeMenus) return activeMenus[link.key] !== false
    // Also hide parent if all dropdowns are hidden and it has no direct href
    if (link.dropdown && link.dropdown.length === 0) return false
    return true
  })

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return

      tickingRef.current = true
      window.requestAnimationFrame(() => {
        const nextIsScrolled = window.scrollY > 20
        if (isScrolledRef.current !== nextIsScrolled) {
          isScrolledRef.current = nextIsScrolled
          setIsScrolled(nextIsScrolled)
        }
        tickingRef.current = false
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = previousOverflow || ''
      }
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          useFloatingHeader
            ? 'bg-transparent py-5'
            : 'bg-[#04163F]/96 py-3 shadow-[0_18px_48px_rgba(6,27,73,0.34)] backdrop-blur-2xl'
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo - Neo-Brutalist geometric style */}
            <Link href={getLocalizedPath('/')} className="flex items-center group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={headerLogoUrl}
                alt="Pelita Cemerlang"
                width={240}
                height={48}
                className="h-10 w-auto sm:h-12 max-w-[240px] object-contain transition-transform group-hover:scale-105"
                loading="eager"
                fetchPriority="high"
              />
            </Link>

            <nav
              className={clsx(
                'hidden items-center gap-1 rounded-full px-3 py-2 shadow-lg transition-all duration-500 lg:flex',
                useFloatingHeader
                  ? 'bg-[#061B49]/20 shadow-[#061B49]/10 backdrop-blur-sm'
                  : 'bg-[#08265F]/96 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_14px_34px_rgba(3,13,36,0.34)]'
              )}
            >
              {visibleNavLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.key} className="relative group px-1 py-1">
                      <button className="z-10 flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold text-[#FFFAF0] drop-shadow-[0_1px_3px_rgba(3,13,36,0.48)] transition-all duration-300 hover:bg-white/10 hover:text-white">
                        {t(link.key)}
                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                      </button>
                      <div className="absolute top-full left-0 mt-4 w-52 bg-white rounded-2xl shadow-xl border border-[#D7C5A7] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 overflow-hidden">
                        <div className="py-2">
                          {link.dropdown.map(drop => (
                            <Link key={drop.href} href={getLocalizedPath(drop.href)} className="block px-5 py-2.5 text-sm font-medium text-[#0A3A8D] hover:bg-[#164AA8]/10 hover:text-[#164AA8] transition-colors">
                              {drop.key ? t(drop.key) : drop.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }

                const isActive = pathname === getLocalizedPath(link.href!)
                return (
                  <Link
                    key={link.href}
                    href={getLocalizedPath(link.href!)}
                    className={clsx(
                      'relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
                      isActive
                        ? 'bg-[#FFFAF0] text-[#061B49] shadow-[0_8px_18px_rgba(3,13,36,0.22)]'
                        : 'text-[#FFFAF0] drop-shadow-[0_1px_3px_rgba(3,13,36,0.48)] hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {t(link.key)}
                  </Link>
                )
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleToggleLanguage}
                className={clsx(
                  'h-10 w-10 rounded-full text-sm font-semibold text-[#FFFAF0] drop-shadow-[0_1px_3px_rgba(3,13,36,0.48)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#0A3A8D]',
                  useFloatingHeader
                    ? 'bg-[#061B49]/18 backdrop-blur-sm'
                    : 'bg-[#08265F]/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_22px_rgba(3,13,36,0.24)]'
                )}
              >
                {lang === 'id' ? 'EN' : 'ID'}
              </button>
              <div className="hidden md:block transition-transform duration-200 hover:-translate-y-0.5">
                <Link
                href={getLocalizedPath('/admission')}
                  className="motion-shimmer inline-flex items-center rounded-full border border-[#B88A35]/45 bg-[#DCC9AA] px-5 py-2.5 text-sm font-semibold text-[#061B49] shadow-[inset_0_0_0_1px_rgba(255,250,240,0.35),0_8px_20px_rgba(184,138,53,0.16)] transition-all duration-300 hover:border-[#E9D3A3]/90 hover:bg-[#B88A35] hover:text-white hover:shadow-xl hover:shadow-[#DCC9AA]/25"
                >
                  {t('nav.admission')}
                </Link>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={clsx(
                  'flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#0A3A8D] lg:hidden',
                  useFloatingHeader
                    ? 'bg-[#061B49]/18 backdrop-blur-sm'
                    : 'bg-[#08265F]/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_22px_rgba(3,13,36,0.24)]'
                )}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full screen overlay */}
      {isMobileMenuOpen && (
          <>
            <div
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />
            <div
              className="fixed right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-2xl z-50 lg:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <span className="font-jakarta font-bold text-lg text-[#0A3A8D]">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 hover:bg-[#0A3A8D] hover:text-white transition-colors flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {visibleNavLinks.map((link, index) => {
                  if (link.dropdown) {
                    return (
                      <div
                        key={link.key}
                        className="mb-4"
                      >
                        <div className="px-5 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{t(link.key)}</div>
                        <div className="space-y-1 mt-1">
                           {link.dropdown.map(drop => {
                            const isDropActive = pathname === getLocalizedPath(drop.href)
                            return (
                              <div key={drop.href}>
                                <Link
                                  href={getLocalizedPath(drop.href)}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={clsx(
                                    'block px-5 py-3 text-sm font-semibold rounded-2xl transition-all duration-300',
                                    isDropActive
                                      ? 'bg-[#0A3A8D] text-white shadow-lg shadow-[#0A3A8D]/20'
                                      : 'text-[#0A3A8D] hover:bg-[#DCC9AA]/40 hover:text-[#0A3A8D]'
                                  )}
                                >
                                  {drop.key ? t(drop.key) : drop.label}
                                </Link>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                  const isActive = pathname === getLocalizedPath(link.href!)
                  return (
                    <div key={link.href}>
                      <Link
                        href={getLocalizedPath(link.href!)}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={clsx(
                          'block px-5 py-4 text-base font-semibold rounded-2xl transition-all duration-300',
                          isActive
                            ? 'bg-[#0A3A8D] text-white shadow-lg shadow-[#0A3A8D]/20'
                            : 'text-[#0A3A8D] hover:bg-[#DCC9AA]/40 hover:text-[#0A3A8D]'
                        )}
                      >
                        {t(link.key)}
                      </Link>
                    </div>
                  )
                })}
              </nav>
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="transition-transform duration-200 hover:-translate-y-0.5">
                  <Link
                    href={getLocalizedPath('/admission')}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="motion-shimmer flex w-full items-center justify-center rounded-2xl border border-[#B88A35]/45 bg-[#0A3A8D] px-5 py-4 font-semibold text-white shadow-[inset_0_0_0_1px_rgba(232,211,163,0.3),0_10px_22px_rgba(10,58,141,0.18)] transition-colors hover:border-[#E9D3A3]/90 hover:bg-[#DCC9AA] hover:text-[#061B49]"
                  >
                    {t('nav.admission')}
                  </Link>
                </div>
              </div>
            </div>
          </>
      )}
    </>
  )
}
