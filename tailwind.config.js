// TAILWIND CONFIGURATION FILE
// Not needed by the assessment, used for styling
// As Tailwind creates the /public/css/style.css file based on the
// configuration file, and the used classes in the files

/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/***.{html,js,css}",
    "./views/*.ejs",
    "./views/**/*.ejs"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
