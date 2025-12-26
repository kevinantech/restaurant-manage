'use client';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import defaultTheme from 'tailwindcss/defaultTheme';
import { colorSchemes } from './colorSchemes';
import {
  buttonBase,
  cardContent,
  cardHeader,
  inputBase,
  listItemButton,
  outlinedInput,
  svgIcon,
  typography,
} from './componentsOverrides';
import { typographyOptions } from './typography';

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

  components: {
    ...buttonBase,
    ...cardHeader,
    ...cardContent,
    ...inputBase,
    ...listItemButton,
    ...outlinedInput,
    ...typography,
    ...svgIcon,
  },
  colorSchemes,
  cssVariables: true,
  typography: typographyOptions,
};

export type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeCustomization: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={createTheme(theme)}>{children}</ThemeProvider>;
};

export default ThemeCustomization;
