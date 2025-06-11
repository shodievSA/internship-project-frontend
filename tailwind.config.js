/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  darkMode: ['class', '.dark-mode'],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [
    tailwindScrollbar({ nocompatible: true })
  ],
}

