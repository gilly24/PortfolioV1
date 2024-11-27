/** @type {import('tailwindcss').Config} */


// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffc837',
        secondary: '#ff8008',
        dark: '#0f3460',
        accent: '#00d9ff',
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      },
    },
  },
  plugins: [],
};
