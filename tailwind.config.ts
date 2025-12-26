import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          DEFAULT: 'var(--color-primary)',
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          accent: 'var(--color-accent)',
          background: 'var(--color-background)',
          text: 'var(--color-text)',
          'text-light': 'var(--color-text-light)',
          border: 'var(--color-border)',
        }
      },
      backgroundColor: {
        'wood-bg': 'var(--color-background)',
      },
      textColor: {
        'wood-text': 'var(--color-text)',
        'wood-text-light': 'var(--color-text-light)',
      },
      borderColor: {
        'wood-border': 'var(--color-border)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'wood': '0 4px 20px rgba(139, 115, 85, 0.15)',
        'wood-lg': '0 10px 40px rgba(139, 115, 85, 0.2)',
        'wood-inner': 'inset 0 2px 4px rgba(139, 115, 85, 0.1)',
      },
      borderRadius: {
        'wood': '0.75rem',
        'wood-lg': '1rem',
        'wood-xl': '1.5rem',
      },
      backgroundImage: {
        'wood-pattern': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        'wood-gradient': 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
        'wood-light-gradient': 'linear-gradient(135deg, rgba(139, 115, 85, 0.1) 0%, rgba(166, 124, 82, 0.1) 100%)',
      },
    },
  },
  plugins: [],
}

export default config