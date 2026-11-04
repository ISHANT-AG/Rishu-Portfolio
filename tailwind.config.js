/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stage: '#FFFFFF',
        'stage-subtle': '#F8F8F7',
        ink: '#0D0D0D',
        'ink-muted': '#555552',
        'ink-faint': '#9E9E99',
        crimson: '#872D35',
        'crimson-dark': '#661E25',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.22em',
        'mega-wide': '0.3em',
      },
      lineHeight: {
        'tight-editorial': '0.88',
      }
    },
  },
  plugins: [],
}
