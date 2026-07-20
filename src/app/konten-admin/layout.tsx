import { Plus_Jakarta_Sans, Outfit, Cormorant_Garamond } from 'next/font/google'
import '@/styles/globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: true,
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
  preload: true,
})

export const metadata = {
  title: 'Admin - Pelita Cemerlang',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" data-scroll-behavior="smooth" className={`${jakarta.variable} ${outfit.variable} ${cormorant.variable}`}>
      <body className="font-inter bg-gray-50">
        {children}
      </body>
    </html>
  )
}
