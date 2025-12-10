'use client';
import {
  ThemeProvider as _ThemeProvider,
  createTheme,
  ThemeOptions,
} from '@mui/material';
import { Color } from 'app/styles';
import { Open_Sans } from 'next/font/google';

const openSans = Open_Sans({ subsets: ['latin'] });

/**
 * https://mui.com/material-ui/customization/theme-components/
 */
export const theme: ThemeOptions = {
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
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
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
    MuiSvgIcon: { styleOverrides: { root: { display: 'block' } } },
    /* MuiMenuItem: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
    }, */
  },
  palette: {
    primary: {
      main: Color.primary['800'],
      ...Color.primary,
    },
    secondary: {
      main: Color.secondary['800'],
      ...Color.secondary,
    },
    error: {
      main: Color.error,
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
