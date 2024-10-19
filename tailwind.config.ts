import type { Config } from "tailwindcss";
const { Color } = require("./src/common/constants/styles/color.style");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...Color,
      },
      screens: {
        "semi-sm": "600px",
      },
    },
  },
  plugins: [],
};
export default config;
