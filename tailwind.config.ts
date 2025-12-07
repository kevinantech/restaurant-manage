import type { Config } from 'tailwindcss';
const { Color } = require('./app/styles.ts');

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { ...Color },
      screens: {
        'semi-sm': '600px',
      },
    },
  },
  plugins: [],
};
export default config;
