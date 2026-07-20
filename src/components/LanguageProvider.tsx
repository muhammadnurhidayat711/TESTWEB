'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations } from '@/data/translations'

type Language = 'id' | 'en'

interface LanguageContextType {
  lang: Language
  t: (key: string) => string
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export default function LanguageProvider({ children, initialLang = 'id' }: { children: ReactNode, initialLang?: Language }) {
  const [lang, setLang] = useState<Language>(initialLang)

  useEffect(() => {
    setLang(initialLang)
    localStorage.setItem('lang', initialLang)
  }, [initialLang])

  const toggleLanguage = () => {
    // Left for backwards compatibility if needed, but routing should be used
    const newLang = lang === 'id' ? 'en' : 'id'
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }

  const t = (key: string): string => {
    return translations[lang][key as keyof typeof translations.id] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
