import { TypographyVariantsOptions } from '@mui/material';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });

export const typographyOptions: TypographyVariantsOptions = {
  fontFamily: openSans.style.fontFamily,
  fontSize: 14,
  button: { textTransform: 'capitalize' },

  // Ex. MenuItem uses this now
  body1: { fontSize: '0.875rem' /* 14px */ },
};
