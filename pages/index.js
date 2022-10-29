import { Card, CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Album from '../components/Album';
import ToggleColorMode from '../components/ThemeSwitcher';

export default function Home() {
  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="primary"
            gutterBottom
          >
            {`Welcome to Ed's Experiments Lab!`}
          </Typography>

          <Box sx={{ my: 4 }}>
            <Album />
          </Box>

          <Container maxWidth="lg">
            <Card>
              <Box sx={{ display: 'flex' }}>
                <CardMedia
                  sx={{
                    mr: 2,
                    position: 'relative',
                    width: '50%',
                    height: 400,
                  }}
                >
                  <Image
                    alt="electronic-duo"
                    src="/images/electronic-duo.png"
                    layout="fill"
                    objectFit="cover"
                  />
                </CardMedia>
                <Typography gutterBottom variant="h5">
                  HOLA WACHO
                </Typography>
              </Box>
            </Card>
          </Container>
        </Box>
      </Container>
    </>
  );
}
