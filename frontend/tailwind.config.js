/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "editor-bg":"#111326",
        "node-primary":"rgba(236, 124, 0, 1)",
        "node-secondary":"rgba(236, 124, 0, 0.6)",
        "node-bg": "rgba(29, 40, 97, 0.6)"
      }
    },
  },
  plugins: [],
}