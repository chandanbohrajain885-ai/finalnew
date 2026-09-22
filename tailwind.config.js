/** @type {import('tailwindcss').Config} */
export default {
  // flat layout: everything lives beside this file
  content: ['./index.html', './*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0A0A0C', 800: '#141419', 700: '#1E1E25', 600: '#2C2C35', 400: '#5A5A67', 300: '#8A8A96' },
        ivory: { DEFAULT: '#F5F2EB', 200: '#EDE8DE', 300: '#E2DCCE', 400: '#CFC7B4' },
        gold: { DEFAULT: '#C09B3A', light: '#E2C275', pale: '#F0E3C2', deep: '#8E6F1E' },
        navy: { DEFAULT: '#0C2340', 700: '#143254', 500: '#20456C' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        hi: ['"Noto Serif Devanagari"', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { widest2: '0.32em' },
      maxWidth: { content: '78rem' },
      transitionTimingFunction: { editorial: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
}
