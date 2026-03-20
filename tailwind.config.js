/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1f5f3a',
        'primary-container': '#2f7d50',
        'primary-fixed-dim': '#dbe7df',
        'on-primary': '#ffffff',
        secondary: '#d6a53a',
        'secondary-container': '#e9c878',
        surface: '#f8f9f9',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#eef1f2',
        'surface-container-high': '#e2e8ee',
        'surface-container-highest': '#cad2d7',
        'on-surface': '#334155',
        'on-surface-variant': '#475569',
        outline: '#94a3b8',
        'outline-variant': '#cad2d7',
        'surface-container': '#cad2d7',
      },
      fontFamily: {
        headline: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        label: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        body: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [],
}