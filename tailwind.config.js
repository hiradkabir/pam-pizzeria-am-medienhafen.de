/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#DC2626',
        'brand-gold': '#C05E35',
        'brand-gold-light': '#D9895A',
        'brand-cream': '#FEF2F2',
        'brand-warm': '#F5E6D0',
        'brand-dark': '#0D0500',
        'brand-surface': '#1A0A00',
        'brand-surface-2': '#2D1200',
        'brand-muted': '#C4A882'
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'serif'],
        serif: ['"Bodoni Moda"', 'serif'],
        sans: ['Jost', 'sans-serif']
      }
    }
  },
  plugins: []
};
