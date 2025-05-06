/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Main primary color
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Main secondary color
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      height: {
        'screen-75': '75vh',
        'screen-85': '85vh',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'bounce-in-out': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            h1: {
              fontFamily: theme('fontFamily.heading'),
              fontWeight: '700',
              fontSize: '2.25rem', // 36px
              lineHeight: '2.5rem', // 40px
              letterSpacing: '-0.025em',
              marginBottom: '1.5rem',
            },
            h2: {
              fontFamily: theme('fontFamily.heading'),
              fontWeight: '600',
              fontSize: '1.875rem', // 30px
              lineHeight: '2.25rem', // 36px
              letterSpacing: '-0.025em',
              marginBottom: '1.25rem',
            },
            h3: {
              fontFamily: theme('fontFamily.heading'),
              fontWeight: '600',
              fontSize: '1.5rem', // 24px
              lineHeight: '2rem', // 32px
              marginBottom: '1rem',
            },
            h4: {
              fontFamily: theme('fontFamily.heading'),
              fontWeight: '600',
              fontSize: '1.25rem', // 20px
              lineHeight: '1.75rem', // 28px
              marginBottom: '0.75rem',
            },
            p: {
              marginBottom: '1.25rem',
              lineHeight: '1.75',
            },
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'underline',
              textDecorationColor: 'transparent',
              textUnderlineOffset: '4px',
              fontWeight: '500',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                color: theme('colors.primary.700'),
                textDecorationColor: theme('colors.primary.700'),
              },
            },
            code: {
              color: theme('colors.primary.700'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontFamily: theme('fontFamily.mono'),
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.200'),
              overflow: 'auto',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
                textDecorationColor: theme('colors.primary.300'),
              },
            },
            code: {
              color: theme('colors.primary.300'),
              backgroundColor: theme('colors.gray.800'),
            },
            pre: {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: theme('colors.gray.200'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};