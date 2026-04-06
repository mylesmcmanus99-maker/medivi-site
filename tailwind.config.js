/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1B263B',
        teal: '#31B2BF',
        slate: '#E0E1DD',
        charcoal: '#415A77',
      },
    },
  },
  plugins: [],
}
