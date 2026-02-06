/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nook-green': '#1CCD9E',
        'nook-bg': '#F0F8F6',
        'nook-card': '#FFFFFF',
        'nook-text': '#4A4A4A',
        'nook-border': '#C8E6DE',
      },
    },
  },
  plugins: [],
}
