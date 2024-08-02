/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        yancolour:'#EBF3FC',
         zippy: ' hsl(221, 98%, 19%)'
      }
    },
  },
  plugins: [],
}
