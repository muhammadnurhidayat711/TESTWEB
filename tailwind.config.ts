import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#164AA8',
          light: '#2D67C4',
          lighter: '#DCC9AA',
          lightest: '#FFFAF0',
          dark: '#0A3A8D',
        },
        gold: {
          DEFAULT: '#C8A35A',
          light: '#E8D7B7',
          soft: '#DCC9AA',
        },
      },
      fontFamily: {
        poppins: ['var(--font-outfit)', 'sans-serif'],
        inter: ['var(--font-jakarta)', 'sans-serif'],
        playfair: ['var(--font-cormorant)', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 7s infinite alternate',
        'gradient-xy': 'gradient-xy 8s ease infinite',
        'ambient-light': 'homeAmbientLight 12s ease-in-out infinite alternate',
        'aurora-sweep': 'homeAuroraSweep 10s ease-in-out infinite alternate',
        'luxury-beam': 'homeLuxuryBeam 9s ease-in-out infinite alternate',
        'light-sweep': 'homeLightSweep 5.8s ease-in-out infinite',
        'visible-aura': 'homeVisibleAura 6.8s ease-in-out infinite alternate',
        'orbit-dot': 'homeOrbitDot 12s linear infinite',
        'wave-1': 'waveSlow1 28s ease-in-out infinite',
        'wave-2': 'waveSlow2 38s ease-in-out infinite',
        'wave-3': 'waveSlow3 48s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        homeAmbientLight: {
          '0%': { opacity: '0.42', transform: 'translate3d(-52%, -50%, 0) scale(0.96)' },
          '100%': { opacity: '0.68', transform: 'translate3d(-48%, -52%, 0) scale(1.04)' },
        },
        homeAuroraSweep: {
          '0%': { opacity: '0.22', transform: 'translate3d(-18%, 0, 0) rotate(-8deg)' },
          '100%': { opacity: '0.42', transform: 'translate3d(18%, -4%, 0) rotate(-8deg)' },
        },
        homeLuxuryBeam: {
          '0%': { opacity: '0.42', transform: 'translate3d(-8%, 0, 0) rotate(-12deg) scaleX(0.94)' },
          '100%': { opacity: '0.82', transform: 'translate3d(8%, -3%, 0) rotate(-12deg) scaleX(1.08)' },
        },
        homeLightSweep: {
          '0%': { opacity: '0', transform: 'translateX(-140%) rotate(-10deg)' },
          '18%': { opacity: '0.42' },
          '62%': { opacity: '0.42' },
          '100%': { opacity: '0', transform: 'translateX(140%) rotate(-10deg)' },
        },
        homeVisibleAura: {
          '0%': { opacity: '0.28', transform: 'translate3d(-50%, -50%, 0) scale(0.96)' },
          '100%': { opacity: '0.5', transform: 'translate3d(-50%, -51.5%, 0) scale(1.04)' },
        },
        homeOrbitDot: {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        waveSlow1: {
          '0%': { transform: 'translate3d(0, 0, 0) scaleY(1)' },
          '50%': { transform: 'translate3d(-25%, 15px, 0) scaleY(1.1)' },
          '100%': { transform: 'translate3d(-50%, 0, 0) scaleY(1)' },
        },
        waveSlow2: {
          '0%': { transform: 'translate3d(-50%, 0, 0) scaleY(1.05)' },
          '50%': { transform: 'translate3d(-25%, -15px, 0) scaleY(0.9)' },
          '100%': { transform: 'translate3d(0, 0, 0) scaleY(1.05)' },
        },
        waveSlow3: {
          '0%': { transform: 'translate3d(-25%, -5px, 0) scaleY(0.95)' },
          '50%': { transform: 'translate3d(-50%, 10px, 0) scaleY(1.05)' },
          '100%': { transform: 'translate3d(0, -5px, 0) scaleY(0.95)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'url("/images/hero-pattern.svg")',
      },
    },
  },
  plugins: [],
}
export default config
