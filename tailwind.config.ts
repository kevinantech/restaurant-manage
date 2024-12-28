import type { Config } from "tailwindcss";
const { Color } = require("./src/frontend/common/constants/styles/color.style");

const config: Config = {
  content: [
    "./src/frontend/**/*.{js,ts,jsx,tsx,mdx}",
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
      backgroundImage: {},
    },
  },
  plugins: [],
};
export default config;
