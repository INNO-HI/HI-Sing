/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF8F4',
          100: '#FFEDE5',
          200: '#FFD9CC',
          300: '#F4BFA7',
          400: '#F59E8B',
          500: '#E88773',
          600: '#D4705A',
        },
        neutral: {
          50: '#FAFAFA',
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
