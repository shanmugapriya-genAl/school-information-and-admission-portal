/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Quicksand", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          primary: "var(--theme-primary, #fbbf24)",
          'primary-hover': "var(--theme-primary-hover, #f59e0b)",
          light: "var(--theme-light, #fef3c7)",
          'light-hover': "var(--theme-light-hover, #fde68a)",
          dark: "var(--theme-dark, #b45309)",
        }
      }
    },
  },
  plugins: [],
}
