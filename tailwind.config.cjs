/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF1ED',
          100: '#FEDBD6',
          200: '#FDBDB5',
          300: '#FA8C7D',
          400: '#F5583E',
          500: '#E54428',
          600: '#C9371E',
        },
        neutral: {
          50: '#F8F8F8',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
        },
        ink: {
          DEFAULT: '#2C2C2C',
          light: '#444444',
          muted: '#6B7280',
          faint: '#AAAAAA',
        },
      },
      fontFamily: {
        sans: ['"A2G"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        container: '1080px',
      },
    },
  },
  plugins: [],
}
