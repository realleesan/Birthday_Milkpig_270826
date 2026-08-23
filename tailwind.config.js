/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          50: '#FFF4F6',
          100: '#FFE4E8',
          200: '#FFCBD3',
          300: '#FFA3B3',
          400: '#FF6B8B',
          500: '#FF3B66',
          600: '#E61E4E',
          700: '#B80D37',
          800: '#8A0A2A',
          900: '#5C051B',
        },
        roseGold: {
          light: '#F8EDEB',
          DEFAULT: '#E07A5F',
          dark: '#B0533C',
        },
        champagne: {
          light: '#FFF9F2',
          DEFAULT: '#F4A261',
          gold: '#D4AF37',
        },
        cream: '#FFFDF9',
        darkWine: '#2B0B14',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        cursive: ['var(--font-dancing)', 'cursive'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'romantic-glow': '0 10px 40px -10px rgba(255, 107, 139, 0.4)',
        'gold-glow': '0 10px 30px -5px rgba(212, 175, 55, 0.3)',
        'polaroid': '0 15px 35px rgba(43, 11, 20, 0.12), 0 5px 15px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
