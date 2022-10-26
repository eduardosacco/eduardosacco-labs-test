// import Footer from './footer';
import { Box } from '@mui/material';
import Footer from './Footer';
import MenuAppBar from './MenuAppBar';

export default function Layout(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        marginTop: '0',
        marginBottom: 'auto',
      }}
    >
      <MenuAppBar />
      <Box
        display="flex"
        flexDirection="column"
        padding={1}
        marginBottom="auto"
      >
        {props.children}
      </Box>
      <Footer />
    </Box>
  );
}
