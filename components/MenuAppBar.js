import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import PositionedMenu from './Menu';

export default function MenuAppBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <PositionedMenu />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {`Ed's Experiments Lab`}
        </Typography>
        <Avatar alt="Eduardo Sacco">
          <Image src='/images/ed.gif' alt="Eduardo Sacco" layout="fill" />
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}
