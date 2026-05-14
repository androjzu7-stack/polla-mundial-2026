/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8eef5',
          100: '#c5d3e5',
          200: '#9fb5d2',
          300: '#7896bf',
          400: '#5a7eb0',
          500: '#3b66a2',
          600: '#2d5490',
          700: '#1a3c5e',
          800: '#152f4a',
          900: '#0e2035',
        },
        gold: {
          50: '#fdf8ec',
          100: '#faeece',
          200: '#f5de9c',
          300: '#efcc6a',
          400: '#e9ba38',
          500: '#d4a017',
          600: '#b88612',
          700: '#9a6d0d',
          800: '#7c5508',
          900: '#5e3f06',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 160, 23, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(212, 160, 23, 0)' },
        }
      }
    },
  },
  plugins: [],
}
