/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      screens: {
        'xs': '450px',
        '2xs': '320px',
      },
      colors: {
        'nav-bg': '#333333',
        'nav-a': colors.slate[100],
        'nav-a-hover': colors.yellow[300],
        'millers-red': '#FF4B4B',
        'millers-yellow': colors.yellow,
        'millers-gold': '#BC9404',
      },
      backgroundImage: {
        'index-hero': `url('/action-hero.JPG'}')`,
      },
      fontFamily: {
        sans: ['InterVariable', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
