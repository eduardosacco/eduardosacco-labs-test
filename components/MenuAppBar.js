import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import PositionedMenu from './Menu';
import ThemeSwitcher from './ThemeSwitcher';
import Emoji from './Emoji';

export default function MenuAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <PositionedMenu />
        <Box
          sx={{ mx: 1, display: 'flex', justifyContent: 'center', flexGrow: 1 }}
        >
          <Typography variant="h6" component="div" align="center">
            <Emoji symbol="💻" />
            &nbsp;{`Ed's Lab`}&nbsp;
            <Emoji symbol="🧪" />
          </Typography>
        </Box>
        <Box sx={{ mx: 1 }}>
          <ThemeSwitcher />
        </Box>
        <Avatar alt="Eduardo Sacco">
          <Image src="/images/ed.gif" alt="Eduardo Sacco" layout="fill" />
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
