import { ThemeOptions } from "@mui/material";
import { Open_Sans } from "next/font/google";
import { Color } from "./color.style";

const openSans = Open_Sans({ subsets: ["latin"] });

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
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
  palette: {
    primary: {
      main: Color.pompadour,
    },
    error: {
      main: Color.cinnabar,
    },
  },
};

export { globalTheme };
