/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#2D3748',
        accent: '#4ECDC4'
      }
    }
  },
  plugins: []
};