/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#FFF5F2',
          100: '#FFE8E0',
          200: '#FFD0C2',
          300: '#FFB09A',
          400: '#E8836B',
          500: '#D4644B',
          600: '#B84A33',
        },
        ivory: {
          50: '#FFFDFB',
          100: '#FFFBF7',
          200: '#FFF7F0',
          300: '#FFF0E3',
        },
        ink: {
          DEFAULT: '#383838',
          light: '#4B4E56',
          muted: '#777A86',
          faint: '#B0B8C1',
        },
        blue: {
          brand: '#448CFF',
        },
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        container: '1360px',
      },
    },
  },
  plugins: [],
}
