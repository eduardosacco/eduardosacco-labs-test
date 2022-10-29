import { createTheme, ThemeProvider } from '@mui/material/styles';;
import React from 'react';

const ColorModeContext = React.createContext({});

export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = React.useState('light');
  const toggleColorMode = React.useCallback(() => {
    console.log('toggled color mode');
    setColorMode((colorMode) => (colorMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = createTheme({
    palette: {
      mode: colorMode,
      // primary: {
      //   main: '#3DFFD0',
      // },
      // secondary: {
      //   main: '#EBB3D5',
      // },
      // background: {
      //   default: '#141414',
      // },
    },
    typography: {
      fontFamily: 'Space Grotesk, Roboto',
    },
  });

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
      {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const { colorMode, toggleColorMode } = React.useContext(ColorModeContext);
  return { colorMode, toggleColorMode };
};
