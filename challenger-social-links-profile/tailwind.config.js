/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        "black-20": "rgb(20, 20, 20)",
        "black-31": "rgb(31, 31, 31)",
        "black-51": "rgb(51, 51, 51)",
      },
    },
  },
  plugins: [],
};
