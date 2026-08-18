/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /**
       * Dustrix runs on Poppins alone. `anton` and `bebas` are kept as aliases
       * pointing at it so the 33 existing `font-anton` / `font-bebas` usages
       * keep working through the switch — they are display slots now, not
       * references to those faces. New work should use `font-display`.
       */
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        anton: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        bebas: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        /**
         * Brand: deep green, drawn from the lawns that frame nearly every one
         * of A1's job photographs — and a deliberate step away from a trade
         * where almost every competitor is orange or yellow.
         *
         * 500 is dark enough that BOTH `bg-primary-500 + text-white` and
         * `text-primary-500` on white clear WCAG AA, at 5.02:1. That is the
         * same ratio the previous burnt amber carried, so it is a genuine
         * drop-in: no existing colour pairing needed reworking.
         *
         * Safety yellow stays as the accent on dark backgrounds — it is the
         * colour of the machines and vests in the photos, and reads at 11.8:1
         * on asphalt. It lives in Tailwind's built-in `amber-400/yellow-400`.
         */
        primary: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#34D399',
          500: '#15803D',
          600: '#166534',
          700: '#14532D',
          800: '#123F23',
          900: '#0F3319',
          950: '#052E16',
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
      /**
       * Dustrix's headline scale: 80px / 60px / 36px with tracking pulled
       * tight and negative. The negative tracking is what stops Poppins — a
       * geometric face with generous default sidebearings — from reading soft
       * at display size, and it is doing the job the condensed face used to.
       */
      fontSize: {
        'display-lg': ['5rem', { lineHeight: '1.15', letterSpacing: '-0.05em', fontWeight: '800' }],
        'display': ['3.75rem', { lineHeight: '1.16', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-sm': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        /** Dustrix's button and card radius. */
        theme: '10px',
      },
      boxShadow: {
        /** Dustrix's card lift — wide, soft and very light. */
        theme: '0px 16px 32px 0px rgba(0, 0, 0, 0.04)',
        'theme-md': '0px 16px 32px 0px rgba(0, 0, 0, 0.05)',
        'theme-lg': '0px 16px 32px 0px rgba(0, 0, 0, 0.10)',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
};
