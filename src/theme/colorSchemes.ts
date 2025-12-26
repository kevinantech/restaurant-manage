import { ThemeOptions } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

export const colorSchemes: ThemeOptions['colorSchemes'] = {
  light: {
    palette: {
      primary: {
        main: blue[500],
      },
      text: {
        primary: grey[800],
        heading: grey[900],
      },
    },
  },
};
