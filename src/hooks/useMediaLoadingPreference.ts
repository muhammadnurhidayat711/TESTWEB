'use client'

import { useEffect, useState } from 'react'

type NetworkInformationLike = {
  effectiveType?: string
  saveData?: boolean
  addEventListener?: (type: 'change', listener: () => void) => void
  removeEventListener?: (type: 'change', listener: () => void) => void
}

function readConnection() {
  if (typeof navigator === 'undefined') {
    return { prefersReducedData: false, effectiveType: '' }
  }

  const connection = (
    (navigator as Navigator & { connection?: NetworkInformationLike }).connection
    || (navigator as Navigator & { mozConnection?: NetworkInformationLike }).mozConnection
    || (navigator as Navigator & { webkitConnection?: NetworkInformationLike }).webkitConnection
  )

  const effectiveType = connection?.effectiveType || ''
  const prefersReducedData = Boolean(
    connection?.saveData
    || effectiveType === 'slow-2g'
    || effectiveType === '2g'
    || effectiveType === '3g',
  )

  return { connection, prefersReducedData, effectiveType }
}

export function useMediaLoadingPreference() {
  const [state, setState] = useState(() => {
    const { prefersReducedData, effectiveType } = readConnection()
    return { prefersReducedData, effectiveType }
  })

  useEffect(() => {
    const { connection } = readConnection()
    if (!connection?.addEventListener) return

    const update = () => {
      const { prefersReducedData, effectiveType } = readConnection()
      setState({ prefersReducedData, effectiveType })
    }

    connection.addEventListener('change', update)
    return () => connection.removeEventListener?.('change', update)
  }, [])

  return state
}
