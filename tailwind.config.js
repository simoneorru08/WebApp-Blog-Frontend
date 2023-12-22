/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts}",
    "./public/index.html",
  ],
  darkMode: false,
  theme: {
    extend: {},
    //Aggiungo stili personalizzati
    minHeight: {
      '60': '60px'
    },
    height: {
      '300!': '300px!important',
    },
  },
  variants: {},
  plugins: [],
}

