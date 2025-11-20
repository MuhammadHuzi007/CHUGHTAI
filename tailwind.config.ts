import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // User specified palette: #22223b, #4a4e69, #9a8c98, #c9ada7, #f2e9e4
        palette: {
          darkest: '#22223b',
          dark: '#4a4e69',
          mid: '#9a8c98',
          light: '#c9ada7',
          lightest: '#f2e9e4',
        },
        primary: {
          50: '#f2e9e4',
          100: '#e6dcd9',
          200: '#c9ada7',
          300: '#b29ca0',
          400: '#9a8c98',
          500: '#726d80',
          600: '#4a4e69',
          700: '#363852',
          800: '#2c2d46',
          900: '#22223b',
          950: '#11111d',
        },
        accent: {
          50: '#fbf7f6',
          100: '#f2e9e4',
          200: '#e8dbd9',
          300: '#c9ada7',
          400: '#9a8c98',
          500: '#857080',
          600: '#4a4e69',
          700: '#3d3f56',
          800: '#22223b',
          900: '#1a1a2e',
          950: '#0d0d17',
        },
        dark: {
          50: '#f2e9e4',
          100: '#e6dcd9',
          200: '#c9ada7',
          300: '#b29ca0',
          400: '#9a8c98',
          500: '#726d80',
          600: '#4a4e69',
          700: '#363852',
          800: '#2c2d46',
          900: '#22223b',
          950: '#0f0f1a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'serif'],
        accent: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'gradient': 'gradient 10s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #22223b 0%, #4a4e69 50%, #9a8c98 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(154, 140, 152, 0.3)',
        'glow-lg': '0 0 40px rgba(74, 78, 105, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config

