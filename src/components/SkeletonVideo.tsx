'use client'

import { forwardRef, type VideoHTMLAttributes, useState } from 'react'
import { Play } from 'lucide-react'

type SkeletonVideoProps = VideoHTMLAttributes<HTMLVideoElement> & {
  skeletonClassName?: string
}

const SkeletonVideo = forwardRef<HTMLVideoElement, SkeletonVideoProps>(function SkeletonVideo({
  className = '',
  skeletonClassName = '',
  onLoadedData,
  ...props
}, ref) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      {!isLoaded && (
        <div
          className={`professional-media-skeleton absolute inset-0 flex items-center justify-center bg-[#061B49] ${skeletonClassName}`}
          role="status"
          aria-label="Memuat video"
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,27,73,0.96),rgba(22,74,168,0.72)_46%,rgba(200,163,90,0.34))]" />
          <div className="absolute inset-x-[12%] top-[18%] h-px bg-white/18" />
          <div className="absolute inset-x-[18%] bottom-[22%] h-px bg-white/12" />
          <div className="relative flex flex-col items-center gap-2 text-white/78">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-white/12 shadow-sm backdrop-blur-sm">
              <Play className="h-5 w-5 fill-current" aria-hidden="true" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]">Preparing video</span>
          </div>
        </div>
      )}
      <video
        {...props}
        ref={ref}
        onLoadedData={(event) => {
          setIsLoaded(true)
          onLoadedData?.(event)
        }}
        className={`${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </>
  )
})

export default SkeletonVideo
