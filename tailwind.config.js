const { url } = require('inspector');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: 'Roboto, sans-serif',
      },
      backgroundImage:{
        app: 'url(/app-bg.svg)'
      },
      colors:{
        gray: {
          100: '#E1e1e6',
          300: '#8D8D99',
          600: '#323238',
          800: '#202024',
          900: '#121214',
          950: '#09090A'
        },
        green_avatar:{
          500: '#129E57'
        },
        yellow:{
          500: '#f7dd43',
          700: '#E5CD3D'
        }
      }
    },
  },
  plugins: [],
}
