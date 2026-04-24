/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        appleGray: '#f5f5f7',
        appleDark: '#1d1d1f',
        appleBlue: '#0066cc',
      }
    },
  },
  plugins: [],
}
