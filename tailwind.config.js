/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        anton: ['Anton', 'Arial Narrow', 'Impact', 'sans-serif'],
        bebas: ['Bebas Neue', 'Arial Narrow', 'sans-serif'],
      },
      colors: {
        /**
         * Brand: burnt sealer amber.
         * 500 is deliberately dark enough that BOTH `bg-primary-500 + text-white`
         * (5.0:1) and `text-primary-500` on white (5.0:1) clear WCAG AA. The
         * bright safety amber lives in Tailwind's built-in `amber-400/500` and is
         * used for accents on dark backgrounds and in the logo.
         */
        primary: {
          50: '#FDF6EC',
          100: '#FAE9CF',
          200: '#F3D19F',
          300: '#E9B269',
          400: '#D98B33',
          500: '#B45309',
          600: '#96430A',
          700: '#79360B',
          800: '#602C0B',
          900: '#4C2409',
          950: '#2B1204',
        },
        /** Asphalt. 950 matches the logo badge. */
        charcoal: {
          50: '#F6F6F7',
          100: '#E7E7E9',
          200: '#D1D1D5',
          300: '#B0B0B6',
          400: '#88888F',
          500: '#6D6D75',
          600: '#5D5D64',
          700: '#4F4F56',
          800: '#3A3A41',
          900: '#26262B',
          950: '#16161A',
        },
      },
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};
