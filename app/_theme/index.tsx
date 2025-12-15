'use client';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material';
import { Color } from 'app/styles';
import defaultTheme from 'tailwindcss/defaultTheme';
import { typography } from './typography';

/**
 * https://mui.com/material-ui/customization/theme-components/
 */
export const theme: ThemeOptions = {
  breakpoints: {
    // Usa breakpoints de tailwind.
    values: {
      xs: 0,
      sm: parseInt(defaultTheme.screens.sm),
      md: parseInt(defaultTheme.screens.md),
      lg: parseInt(defaultTheme.screens.lg),
      xl: parseInt(defaultTheme.screens.xl),
    },
  },
  typography,
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
          '&:hover': { boxShadow: 'none' },
          '&:active': { boxShadow: 'none' },
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          display: 'block',
        },
      },
    },
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

const ThemeCustomization: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>;
};

export default ThemeCustomization;
