/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f4f7f7',
          100: '#e3ebea',
          200: '#c7d7d6',
          300: '#a0bab8',
          400: '#739694',
          500: '#557977',
          600: '#446362',
          700: '#3a5251',
          800: '#334544',
          900: '#2e3b3b',
          950: '#1a2222',
        },
      },
    },
  },
  plugins: [],
};