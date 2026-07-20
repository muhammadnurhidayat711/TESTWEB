import React from 'react'

interface WaveBackgroundProps {
  veil?: boolean
}

export default function WaveBackground({ veil = true }: WaveBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-60"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        {/* Wave Line 1: Elegant Gold Wave */}
        <path
          d="M -100,150 C 300,80 600,450 1000,250 C 1200,150 1400,280 1600,200"
          fill="none"
          stroke="#DCC9AA"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        {/* Wave Line 2: Soft Brand Blue Wave */}
        <path
          d="M -100,250 C 250,400 650,150 950,350 C 1150,480 1350,300 1600,380"
          fill="none"
          stroke="#164AA8"
          strokeWidth="1.2"
          strokeOpacity="0.25"
        />

        {/* Wave Line 3: Very fine background wave */}
        <path
          d="M -100,450 C 400,600 700,300 1100,550 C 1300,650 1450,520 1600,580"
          fill="none"
          stroke="#164AA8"
          strokeWidth="1"
          strokeOpacity="0.15"
        />

        {/* Wave Line 4: Deep subtle Accent Wave */}
        <path
          d="M -100,650 C 300,550 550,750 900,600 C 1200,480 1350,680 1600,620"
          fill="none"
          stroke="#DCC9AA"
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />

        {/* Subtle Decorative Dots along the curves */}
        <circle cx="450" cy="235" r="3" fill="#DCC9AA" opacity="0.5" />
        <circle cx="850" cy="420" r="2" fill="#164AA8" opacity="0.3" />
        <circle cx="1100" cy="550" r="3" fill="#DCC9AA" opacity="0.4" />
      </svg>
      {veil && (
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FFFAF0]/30 to-[#DCC9AA]/20 mix-blend-multiply" />
      )}
    </div>
  )
}
