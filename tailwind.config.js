/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#333333",
        secondary: "#B3B3B3",
        tertiary: "#FFFFFF",
        quaternary: "#5A91E0",
        alerrt: "#E32323",
      },
    },
  },
  plugins: [],
};
