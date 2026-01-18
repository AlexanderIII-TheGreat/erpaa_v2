/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-blue': '#3B82F6',
        'sky-blue': '#0EA5E9',
        'success': '#10B981',
        'warning': '#F59E0B',
        'danger': '#EF4444',
        'gray-light': '#F8FAFC',
        'gray-medium': '#E2E8F0'
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-in'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}