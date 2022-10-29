import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

const ColorModeContext = React.createContext({});

export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = React.useState('light');
  const toggleColorMode = React.useCallback(() => {
    console.log('toggled color mode');
    setColorMode((colorMode) => (colorMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
        typography: {
          fontFamily: 'Space Grotesk, Roboto',
        },
      }),
    [colorMode]
  );

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const { colorMode, toggleColorMode } = React.useContext(ColorModeContext);
  return { colorMode, toggleColorMode };
};
