import { ThemeProvider as Provider, ThemeOptions, createTheme } from "@mui/material";

export interface BaseThemeProviderProps {
  children: React.ReactNode;
}

const themeOptions: ThemeOptions = {
  typography: { fontFamily: "inherit" },
};

const theme = createTheme(themeOptions);

const BaseThemeProvider: React.FC<BaseThemeProviderProps> = ({ children }) => {
  return <Provider theme={theme}>{children}</Provider>;
};

export { themeOptions as baseThemeOptions };

export default BaseThemeProvider;
