import { TypographyOptions } from '@mui/material/styles/createTypography';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });

export const typography: TypographyOptions = {
  fontFamily: openSans.style.fontFamily,
  fontSize: 14,
};
