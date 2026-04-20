/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF2EF',
          100: '#FFDFD7',
          200: '#FFC5B8',
          300: '#FF9E8A',
          400: '#FF6E59',
          500: '#E85340',
          600: '#C93D2C',
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
