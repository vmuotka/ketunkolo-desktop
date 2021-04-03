const colors = require("tailwindcss/colors");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.amber,
        secondary: colors.violet
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      borderWidth: ['focus'],
      backgroundColor: ['focus'],
    },
  },
  plugins: [],
}
