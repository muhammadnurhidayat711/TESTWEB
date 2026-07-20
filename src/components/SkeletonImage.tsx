'use client'

import Image, { type ImageProps } from 'next/image'
import { ImageIcon } from 'lucide-react'
import { useState } from 'react'

type SkeletonImageProps = ImageProps & {
  skeletonClassName?: string
}

export default function SkeletonImage({
  alt,
  className = '',
  skeletonClassName = '',
  onLoad,
  ...props
}: SkeletonImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      {!isLoaded && (
        <div
          className={`professional-media-skeleton absolute inset-0 flex items-center justify-center bg-[#EEF3F8] ${skeletonClassName}`}
          role="status"
          aria-label="Memuat gambar"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,27,73,0.08),rgba(22,74,168,0.04)_38%,rgba(200,163,90,0.1))]" />
          <div className="absolute inset-x-[12%] top-[18%] h-px bg-white/55" />
          <div className="absolute inset-x-[18%] bottom-[22%] h-px bg-[#061B49]/10" />
          <div className="relative flex flex-col items-center gap-2 text-[#061B49]/55">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/65 shadow-sm backdrop-blur-sm">
              <ImageIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Loading media</span>
          </div>
        </div>
      )}
      <Image
        {...props}
        alt={alt}
        onLoad={(event) => {
          setIsLoaded(true)
          onLoad?.(event)
        }}
        className={`${className} transition-opacity duration-300`}
      />
    </>
  )
}
