'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { defaultSiteContent, getDefaultSiteContent } from '@/data/contentDefaults'
import type { SiteContent } from '@/types/siteContent'
import { useLanguage } from './LanguageProvider'

const ContentContext = createContext<SiteContent>(defaultSiteContent)

interface ContentProviderProps {
  children: ReactNode
  initialContent?: SiteContent
}

export function ContentProvider({ children, initialContent }: ContentProviderProps) {
  const { lang } = useLanguage()
  const [content, setContent] = useState<SiteContent>(initialContent || getDefaultSiteContent(lang))

  // Track the language of the current initialContent to avoid redundant fetches
  const [initialLang, setInitialLang] = useState(lang)

  useEffect(() => {
    if (initialContent && lang === initialLang) {
      // Server already provided content for this language — no fetch needed
      setContent(initialContent)
      return
    }

    // Language changed or no initial content — fetch from API
    setContent(getDefaultSiteContent(lang))

    let active = true

    fetch(`/api/content?lang=${lang}`)
      .then((res) => res.ok ? res.json() : null)
      .then((data: SiteContent | null) => {
        if (active && data) setContent(data)
      })
      .catch(() => {
        // Keep default content when the public content endpoint is unavailable.
      })

    return () => {
      active = false
    }
  }, [lang, initialContent, initialLang])

  // Update initialLang when initialContent changes (e.g., navigation to different lang route)
  useEffect(() => {
    if (initialContent) setInitialLang(lang)
  }, [initialContent, lang])

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const custom = e as CustomEvent<SiteContent>
      if (custom.detail) setContent(custom.detail)
    }

    window.addEventListener('pelita-content-updated', handleUpdate)

    return () => {
      window.removeEventListener('pelita-content-updated', handleUpdate)
    }
  }, [])

  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
