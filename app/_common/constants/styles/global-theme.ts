import { ThemeOptions } from '@mui/material';
import { Open_Sans } from 'next/font/google';
import { Color } from './color.style';
import colors from 'tailwindcss/colors';

const openSans = Open_Sans({ subsets: ['latin'] });

const globalTheme: ThemeOptions = {
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
  },
  palette: {
    primary: {
      main: Color.pompadour,
    },
    secondary: {
      main: colors.blue[500],
    },
    error: {
      main: Color.cinnabar,
    },
  },
};

export { globalTheme };
