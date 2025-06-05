/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6347',        // Tomato
        secondary: '#FFA07A',      // Light Salmon
        accent: '#FFD700',         // Gold
        'neutral-white': '#FFFFFF',
        'neutral-light-gray': '#F8F8F8',
        'neutral-dark-gray': '#333333',
        'success-green': '#32CD32',    // Lime Green (using a more descriptive name)
        'warning-gold': '#FFD700',     // Gold (same as accent, can be distinguished by usage)
        'error-crimson': '#DC143C',   // Crimson
      },
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        secondary: ['Montserrat', 'sans-serif'],
      },
      borderRadius: {
        'md': '8px', // Matching --border-radius from HTML example
      },
      boxShadow: {
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
