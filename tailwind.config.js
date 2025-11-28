/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        gold: {
          400: '#E6C200',
          500: '#D4AF37',
          600: '#AA8C2C',
          700: '#80681E',
        },
        black: {
          900: '#000000',
          800: '#121212',
          700: '#1E1E1E',
        }
      }
    },
  },
  plugins: [],
}
