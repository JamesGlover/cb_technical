/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // We set a custom 'accent' colour which we can use sparingly to add a bit of
      // variety. In this case we're just re-using the default 'purple' colour range
      colors: { accent: colors.purple },
    },
  },
  plugins: [],
}
