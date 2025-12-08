'use client';
import {
  ThemeProvider as _ThemeProvider,
  createTheme,
  ThemeOptions,
} from '@mui/material';
import { Color } from 'app/styles';
import { Open_Sans } from 'next/font/google';
import colors from 'tailwindcss/colors';

const openSans = Open_Sans({ subsets: ['latin'] });

const theme: ThemeOptions = {
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
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    },
  },
  palette: {
    primary: {
      main: Color.primary,
    },
    secondary: {
      main: colors.blue[500],
    },
    error: {
      main: Color.cinnabar,
    },
  },
};

export type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <_ThemeProvider theme={createTheme(theme)}>{children}</_ThemeProvider>;
};

export default ThemeProvider;
