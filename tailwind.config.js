/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        sepia: {
          50: '#fdfbf7',
          100: '#f7f4ec',
          200: '#eee8da',
          300: '#dfd5be',
          400: '#cbbda0',
          500: '#b4a080',
          600: '#9b8466',
          700: '#7e6a52',
          800: '#675644',
          900: '#55473a',
          950: '#2e251e',
        }
      }
    },
  },
  plugins: [],
}
