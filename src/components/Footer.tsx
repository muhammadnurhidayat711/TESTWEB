'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from './BrandIcons'
import { useLanguage } from './LanguageProvider'
import { useContent } from './ContentProvider'

export default function Footer() {
  const { lang, t } = useLanguage()
  const content = useContent()
  const { contactInfo } = content
  const footerLogoUrl = content.globalConfig?.footerLogo || content.globalConfig?.headerLogo || ''
  
  const getLocalizedPath = (path: string) => `/${lang}${path === '/' ? '' : path}`

  const socialLinks = [
    { icon: FacebookIcon, href: contactInfo.facebookUrl, label: 'Facebook' },
    { icon: InstagramIcon, href: contactInfo.instagramUrl, label: 'Instagram' },
    { icon: LinkedinIcon, href: contactInfo.linkedinUrl, label: 'LinkedIn' },
    { icon: YoutubeIcon, href: contactInfo.youtubeUrl, label: 'Youtube' },
  ].filter((social) => social.href)

  const activeMenus = content.globalConfig?.activeMenus || {}
  const isFooterLinkVisible = (link: { href: string; navKey?: string }) => {
    const pageIsVisible = link.href in activeMenus ? activeMenus[link.href] !== false : true
    const parentIsVisible = link.navKey && link.navKey in activeMenus ? activeMenus[link.navKey] !== false : true

    return pageIsVisible && parentIsVisible
  }

  return (
    <footer className="bg-[#0A3A8D] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Abstract Background - Soft Organic Gradient Orbs */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-4 pr-8">
            <Link href={getLocalizedPath('/')} className="flex items-center gap-3 mb-8 group w-fit">
              {footerLogoUrl ? (
                <img
                  src={footerLogoUrl}
                  alt="Pelita Cemerlang"
                  width={240}
                  height={48}
                  className="h-12 w-auto max-w-[240px] object-contain transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <>
                  <div
                    className="w-12 h-12 rounded-2xl bg-white text-[#0A3A8D] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:-rotate-3 group-hover:scale-105"
                  >
                    <svg viewBox="0 0 40 40" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="20" cy="20" r="16" />
                      <path d="M20 10L20 30M13 17L20 10L27 17M13 23L20 30L27 23" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-jakarta font-bold text-2xl tracking-tight text-white">Pelita Cemerlang</span>
                </>
              )}
            </Link>
            <p className="text-gray-400 font-light leading-relaxed mb-8 max-w-sm whitespace-pre-wrap">
              {content.footer?.description || "Mendidik generasi muda dengan wawasan global, integritas tinggi, dan semangat inovasi berkelanjutan."}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#164AA8] hover:text-white hover:border-[#164AA8] hover:-translate-y-0.5 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-jakarta font-semibold mb-6 text-white tracking-wide text-sm uppercase">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4">
              {[
                { href: '/about', key: 'footer.about', navKey: 'nav.about' },
                { href: '/academic/primary', key: 'footer.academic', navKey: 'nav.academic' },
                { href: '/facilities', key: 'footer.facilities', navKey: 'nav.facilities' },
                { href: '/gallery', key: 'footer.gallery', navKey: 'nav.mediacenter' },
              ].filter(isFooterLinkVisible).map((link) => (
                <li key={link.href}>
                  <Link href={getLocalizedPath(link.href)} className="text-gray-400 font-light hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-white transition-all group-hover:w-3" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="font-jakarta font-semibold mb-6 text-white tracking-wide text-sm uppercase">{t('footer.info')}</h4>
            <ul className="space-y-4">
              {[
                { href: '/admission', key: 'footer.admission', navKey: 'nav.information' },
                { href: '/news', key: 'footer.news', navKey: 'nav.mediacenter' },
                { href: '/career', key: 'footer.career', navKey: 'nav.information' },
                { href: '/contact', key: 'footer.contact', navKey: 'nav.information' },
              ].filter(isFooterLinkVisible).map((link) => (
                <li key={link.href}>
                  <Link href={getLocalizedPath(link.href)} className="text-gray-400 font-light hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-white transition-all group-hover:w-3" />
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="font-jakarta font-semibold mb-6 text-white tracking-wide text-sm uppercase">{t('footer.contactTitle')}</h4>
            <ul className="space-y-4 mb-8 text-gray-400 font-light text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500 shrink-0" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500 shrink-0" />
                <span>{contactInfo.email}</span>
              </li>
            </ul>

            {/* 
            TODO: Implement newsletter API endpoint before enabling this form
            <div className="bg-white/5 rounded-2xl p-1.5 flex border border-white/10 focus-within:border-white/30 transition-colors">
              <input
                type="email"
                placeholder="Berlangganan Newsletter"
                className="bg-transparent border-none outline-none px-4 py-3 text-sm w-full text-white placeholder:text-gray-500 font-light rounded-xl"
              />
              <button
                className="w-11 h-11 rounded-xl bg-white text-[#0A3A8D] flex items-center justify-center shrink-0 hover:bg-[#DCC9AA] hover:text-[#061B49] transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            */}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-light text-gray-500">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link href={getLocalizedPath('/terms')} className="hover:text-white transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
