/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        'nav-bg': '#0f172a',
        "nav-a": "#64748b",
        "nav-a-hover": "#cbd5e1",
        "millers-red": "#BE301A",
        "millers-yellow": "#FAEA0D",
        "millers-gold": "#BC9404",
      },
      fontFamily: {
        sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
