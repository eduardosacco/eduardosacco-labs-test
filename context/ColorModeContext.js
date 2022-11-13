import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';

const ColorModeContext = React.createContext({});

export const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = React.useState('dark');
  const toggleColorMode = React.useCallback(() => {
    console.log('toggled color mode');
    setColorMode((colorMode) => (colorMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
          primary: {
            main: '#00c14e',
          },
          secondary: {
            main: '#e7b75f',
          },
          error: {
            main: '#f25f25',
          },
        },
        typography: {
          fontFamily: 'Space Mono, Space Grotesk, Roboto',
        },
        shape: {
          borderRadius: 0,
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
