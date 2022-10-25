import { createTheme, ThemeOptions, TypographyVariantsOptions } from '@mui/material/styles';

// Create a theme instance.
export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3DFFD0',
    },
    secondary: {
      main: '#EBB3D5',
    },
    background: {
      default: '#141414',
    },
  },
  typography: {
    fontFamily: 'Space Grotesk, Roboto',
  },
};

const theme = createTheme(themeOptions);

export default theme;
