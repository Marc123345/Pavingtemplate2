/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /**
       * Summit Paving design system.
       *
       * The governing idea is linework, not shadows: panels are separated by
       * ruled borders the way a drawing set is, corners are square, and depth
       * comes from weight of rule rather than from blur. Buttons take mono
       * uppercase labels because everything measured on the sheet is mono.
       *
       * `primary` and `charcoal` are kept as aliases onto blue and ink — over
       * 200 class usages across the site already point at those names, and
       * renaming them would be a large mechanical edit for no visual change.
       */
      fontFamily: {
        sans: ['IBM Plex Sans', 'Helvetica Neue', '-apple-system', 'sans-serif'],
        body: ['IBM Plex Sans', 'Helvetica Neue', '-apple-system', 'sans-serif'],
        display: ['Barlow Condensed', 'Arial Narrow', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
        /* Display slots inherited from the previous system. */
        anton: ['Barlow Condensed', 'Arial Narrow', 'sans-serif'],
        bebas: ['Barlow Condensed', 'Arial Narrow', 'sans-serif'],
      },

      colors: {
        paper: '#F6F5F1',

        /** Ink — asphalt-derived neutrals. */
        ink: {
          100: '#E9EBED', 200: '#D6DADE', 300: '#B4BAC1', 400: '#8A939D',
          500: '#636C76', 600: '#4A525B', 700: '#333940', 800: '#23272C',
          900: '#191C20', 950: '#131518',
        },
        charcoal: {
          50: '#F6F5F1', 100: '#E9EBED', 200: '#D6DADE', 300: '#B4BAC1',
          400: '#8A939D', 500: '#636C76', 600: '#4A525B', 700: '#333940',
          800: '#23272C', 900: '#191C20', 950: '#131518',
        },

        /** Drafting blue. */
        blue: {
          tint: '#E8F0F9', soft: '#C9DCF0',
          DEFAULT: '#1E5AA8', hover: '#164275', deep: '#0F2E5C',
        },
        primary: {
          50: '#E8F0F9', 100: '#E8F0F9', 200: '#C9DCF0', 300: '#C9DCF0',
          400: '#1E5AA8', 500: '#1E5AA8', 600: '#164275', 700: '#1E5AA8',
          800: '#164275', 900: '#0F2E5C', 950: '#0F2E5C',
        },

        /** Marking paint — line-striping yellow. One action per page. */
        paint: { DEFAULT: '#F0B429', hover: '#E09E17' },

        pass: { DEFAULT: '#1F7A3D', bg: '#E7F2EA' },
        hold: { DEFAULT: '#8A5A00', bg: '#F7EFD9' },
        fault: { DEFAULT: '#B42318', bg: '#F9E9E6' },
      },

      /** Condensed display takes positive tracking; a condensed face closes up at size. */
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.55' }],
        base: ['0.9375rem', { lineHeight: '1.65' }],
        lg: ['1.0625rem', { lineHeight: '1.6' }],
        xl: ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.375rem', { lineHeight: '1.25' }],
        '3xl': ['1.75rem', { lineHeight: '1.1' }],
        '4xl': ['2.5rem', { lineHeight: '1' }],
        '5xl': ['3.5rem', { lineHeight: '0.98' }],
        '6xl': ['4.25rem', { lineHeight: '0.95' }],
        'display-lg': ['4.25rem', { lineHeight: '0.95', letterSpacing: '0.01em', fontWeight: '700' }],
        'display': ['3.5rem', { lineHeight: '0.98', letterSpacing: '0.01em', fontWeight: '700' }],
        'display-sm': ['2.5rem', { lineHeight: '1', letterSpacing: '0.01em', fontWeight: '700' }],
      },

      /** 4px module. */
      spacing: {
        '18': '4.5rem', '112': '28rem', '128': '32rem',
      },

      /** Square. The system has no rounded corners at all. */
      borderRadius: {
        theme: '0px', xs: '0px', sm: '0px', lg: '0px', pill: '9999px',
      },

      borderWidth: { hair: '1px', line: '1px', heavy: '2px', control: '1.5px' },

      /**
       * Depth is linework here, so the shadow tokens resolve to none. They are
       * kept as names because ~40 usages reference them; leaving them defined
       * and empty is what stops a stray `shadow-theme-lg` reintroducing the
       * blur this system is built to avoid.
       */
      boxShadow: {
        theme: 'none', 'theme-md': 'none', 'theme-lg': 'none',
        sm: 'none', md: 'none', lg: 'none', xl: 'none',
        /** The one legitimate shadow: a hard offset, used on focus. */
        control: '2px 2px 0 #C9DCF0',
      },

      transitionTimingFunction: { theme: 'linear' },
      transitionDuration: { '120': '120ms', '200': '200ms', '320': '320ms', '400': '400ms' },
    },
  },
  plugins: [],
};
