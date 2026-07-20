'use client'

import { useEffect } from 'react'

export default function HomeScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.1,
      }
    )

    // Observe only immediately visible items (single query, no loop watching)
    const observeItems = () => {
      document.querySelectorAll<HTMLElement>('[data-home-reveal]:not(.is-visible)')
        .forEach((item) => observer.observe(item))
    }

    observeItems()

    // LIGHTWEIGHT: Watch direct children and subtree additions in main container
    // Using subtree: true but only for childList changes, not attributes
    const container = document.querySelector('main')
    if (container) {
      const mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLElement) {
              // Check the node itself
              if (node.hasAttribute('data-home-reveal') && !node.classList.contains('is-visible')) {
                observer.observe(node)
              }
              // Also check direct children (for wrapper elements)
              node.querySelectorAll('[data-home-reveal]:not(.is-visible)').forEach((el) => {
                observer.observe(el)
              })
            }
          }
        }
      })
      mutationObserver.observe(container, { childList: true, subtree: true })
      return () => {
        mutationObserver.disconnect()
        observer.disconnect()
      }
    }

    return () => observer.disconnect()
  }, [])

  return null
}
