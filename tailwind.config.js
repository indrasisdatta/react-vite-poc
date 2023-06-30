/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        primary: "#fff",
        dark: "#000",
      },
      color: {
        primary: "#000",
        dark: "#fff",
      },
    },
  },
  plugins: [import("@tailwindcss/forms")],
};
