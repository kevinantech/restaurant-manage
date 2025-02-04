import type { Config } from 'tailwindcss';
const { Color } = require('./app/_common/constants/styles/color.style');

const config: Config = {
  content: ['./app/*.tsx', './app/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        ...Color,
      },
      screens: {
        'semi-sm': '600px',
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};
export default config;
