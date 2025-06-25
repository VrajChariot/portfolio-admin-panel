/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./views/**/*.{html,ejs}"],
    theme: {
      extend: {
        fontFamily: {
          sans: ["Inter", "sans-serif"],
        },
        container: {
          center: true,
          padding: "1rem",
        }
      },
    },
    plugins: [],
  };