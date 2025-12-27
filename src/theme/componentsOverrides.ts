/**
 *
 * https://mui.com/material-ui/customization/css-theme-variables/usage/#color-channel-tokens
 *
 */
import { ThemeOptions } from '@mui/material/styles';

export const cardHeader: ThemeOptions['components'] = {
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: '1.5rem' /* 24px */,
      },
      title: {
        fontSize: '1.125rem' /* 18px */,
        fontWeight: 500,
      },
    },
  },
};

export const cardContent: ThemeOptions['components'] = {
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: '1.5rem' /* 24px */,
      },
    },
  },
};

export const inputBase: ThemeOptions['components'] = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        fontSize: '0.875rem' /* 14 */,
      },
    },
  },
};

export const outlinedInput: ThemeOptions['components'] = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '0.5rem' /* 8px */,
      },
      input: {
        fontWeight: 500,
        padding: '1rem 0.875rem' /* 16px 14px */,

        /* amend styles when the input is autofilled. */
        '&:-webkit-autofill': {
          WebkitBoxShadow: '0 0 0 1000px white inset',
          WebkitTextFillColor: 'inherit',
          caretColor: 'inherit',
        },
      },
      multiline: {
        '& > textarea': { padding: '0' },
      },
    },
  },
};

export const buttonBase: ThemeOptions['components'] = {};

export const listItemButton: ThemeOptions['components'] = {
  MuiListItemButton: {
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
};

export const svgIcon: ThemeOptions['components'] = {
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        display: 'block',
      },
    },
  },
};

export const typography: ThemeOptions['components'] = {
  MuiTypography: {
    styleOverrides: {
      root: ({ theme }) => {
        const headingColor = theme.vars.palette.text.heading;
        return {
          variants: [
            { props: { variant: 'h1' }, style: { color: headingColor } },
            { props: { variant: 'h2' }, style: { color: headingColor } },
            { props: { variant: 'h3' }, style: { color: headingColor } },
            { props: { variant: 'h4' }, style: { color: headingColor } },
            { props: { variant: 'h5' }, style: { color: headingColor } },
            { props: { variant: 'h6' }, style: { color: headingColor } },
          ],
        };
      },
    },
  },
};
