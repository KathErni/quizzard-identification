/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          blue: "#180161",
          purple: "#4F1787",
          lightpurple: "#8667a7",
          green: "#00af27",
          pink: "#EB3678",
          orange: "#FB773C",
          white: "#ffffff",
        },
      },
      fontFamily: {
        redressed: ["redressed", "sans-serif"],
      },
      backgroundImage: (theme) => ({
        "wizard-bg": "url('/src/assets/Bg.png')",
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
