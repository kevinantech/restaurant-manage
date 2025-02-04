"use client";
import { Color } from "@/frontend/common/constants/styles/color.style";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import React from "react";

const fontSize = 14;

const themeOptions: ThemeOptions = {
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize,
          /* https://mui.com/material-ui/react-text-field/#using-the-styled-api */
          "&.Mui-focused:not(.Mui-error)": {
            color: Color["admin-active"],
          },
        },
      },
    },
    /* <InputFromMUI variant="outlined"> */
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize,
          fontWeight: 600,
          fieldset: {
            borderColor: Color["admin-2"],
          },
          /**
           * Caja de un MuiOutlinedInput
           */
          "& fieldset": {
            transition: "background-color 200ms ease-in-out ",
          },

          /**
           * Caja de un MuiOutlinedInput cuando se deshabilita.
           */
          "&.Mui-disabled fieldset.MuiOutlinedInput-notchedOutline": {
            borderColor: Color["admin-2"],
          },
          /**
           * Caja de un MuiOutlinedInput cuando hay un foco y no hay estado de error presente.
           */
          "&:not(.Mui-error).Mui-focused fieldset": {
            borderColor: Color["admin-active"],
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize,
        },
      },
    },
    /* Switch Label */
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize,
          fontWeight: 600,
          color: "rgba(0 0 0 / .87)",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          "&.Mui-checked": {
            color: Color["admin-active"],
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "inherit",
  },
  palette: {
    error: {
      main: Color["admin-error"],
    },
  },
};

const theme = createTheme(themeOptions);

export interface AdminThemeProviderProps {
  children: React.ReactNode;
}

const AdminThemeProvider: React.FC<AdminThemeProviderProps> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AdminThemeProvider;
