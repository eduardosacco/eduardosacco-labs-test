import Box from '@mui/material/Box';
import DarkModeToggle from "react-dark-mode-toggle";
import { useColorMode } from '../context/ColorModeContext';

export default function ThemeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      sx={{display:'flex'}}>
      <DarkModeToggle
        checked={colorMode === 'dark'}
        onChange={() => toggleColorMode()}
        size={50}
      />
    </Box>
  );
}
