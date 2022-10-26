import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

export default function Footer() {
  return (
    <Box
      sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <footer
        style={{
          textAlign: 'center',
          margin: '1em',
          position: 'relative',
          bottom: 0,
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          {'Made by: '}
          <MuiLink color="inherit" href="https://eduardosacco.github.io/">
            Eduardo Sacco
          </MuiLink>{' '}
          {new Date().getFullYear()}.
        </Typography>
      </footer>
    </Box>
  );
}
