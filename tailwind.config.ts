import type { Config } from "tailwindcss";
const { Color } = require("./src/frontend/common/constants/styles/color.style");

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
      backgroundImage: {
        "wave-blue-2_1":
          "url('/wave-blue-2_1.svg')" /* only if it is inside the public folder */,
      },
    },
  },
  plugins: [],
};
export default config;
