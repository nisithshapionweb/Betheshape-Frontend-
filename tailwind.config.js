/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textPrimary: "#bb874a",
        hoverTextPrimary: "#bb874a",
        activeTextPrimary: "#bb874a",
        borderColor: "#1f4e43",
        accent: "#1c6e77",
        softGreen: "#3ab480",
        mutedPurple: "#a33a94",
        lightGray: "#fdf0f1",
        bgButton:"#bb874a",
        hoverBgButton:"#bb874a"
      },
    },
  },
  plugins: [daisyui, require("@tailwindcss/typography")],
};
