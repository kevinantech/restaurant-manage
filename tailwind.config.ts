import type { Config } from 'tailwindcss';
const { Color } = require('./src/app/styles.ts');

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { ...Color },
    },
  },
  plugins: [],
};
export default config;
