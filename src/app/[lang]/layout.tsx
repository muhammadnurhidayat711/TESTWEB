import { Metadata } from 'next'
import { Plus_Jakarta_Sans, Outfit, Cormorant_Garamond } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LanguageProvider from '@/components/LanguageProvider'
import { ContentProvider } from '@/components/ContentProvider'
import { readSiteContent } from '@/lib/contentStore'
import { normalizeLanguage } from '@/lib/i18n'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true, // Preload critical font for faster initial render
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  preload: true,
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['italic', 'normal'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true, // Preload display font to reduce FOIT
})

import Preloader from '@/components/Preloader'

export const metadata: Metadata = {
  icons: {
    icon: '/icon.svg',
  },
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const lang = normalizeLanguage(resolvedParams.lang)
  const initialContent = await readSiteContent(lang)

  return (
    <html lang={lang} data-scroll-behavior="smooth" className={`${jakarta.variable} ${outfit.variable} ${cormorant.variable}`}>
      <body className="font-inter bg-white">
        <LanguageProvider initialLang={lang}>
          <ContentProvider initialContent={initialContent}>
            <Preloader />
            <Header />
            <main>{children}</main>
            <Footer />
          </ContentProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
