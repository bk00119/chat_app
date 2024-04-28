/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-yellow": "#FBD344",
        "primary-red": "#F44646",
        "secondary-red": "#F53647",
      },
      fontFamily: {
        merienda: ["var(--font-merienda)"],
      },
    },
  },
  plugins: [],
}
