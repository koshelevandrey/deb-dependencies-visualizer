import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spaceGrotesk: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
