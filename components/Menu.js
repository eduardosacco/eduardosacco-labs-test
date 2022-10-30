import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import * as React from 'react';
import Link from '../src/Link';

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Test', path: '/test' },
    { label: 'Crypto', path: '/crypto' },
  ];

  return (
    <div>
      <Button
        id="menu-button"
        variant="contained"
        color="secondary"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ mr: 2 }}
      >
        MENU
      </Button>
      <Menu
        id="menu"
        aria-labelledby="menu-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            style={{ textDecoration: 'none' }}
            color={router.asPath === item.path ? 'primary' : 'secondary'}
          >
            <MenuItem onClick={handleClose}>{item.label}</MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
}
