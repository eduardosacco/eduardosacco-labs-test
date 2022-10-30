import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Album from '../components/Album';
import CardLongResponsive from '../components/CardLongResponsive';

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

          <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
              <CardLongResponsive
                imgRight={true}
                imgPath="/images/ed-banner.png"
                imgAlt="ed banner"
                heading="Hi i'm Ed!"
                description="dasdsadasad dsadsada"
                link="ads"
              />
            </Box>
          </Container>

          <Box sx={{ my: 4 }}>
            <Box
              sx={{
                my: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4" color="secondary" gutterBottom>
                Project Portfolio
              </Typography>
              <Typography
                variant="h6"
                align="center"
                color="textSecondary"
                paragraph
              >
                I love to learn new stuff &#129299;. Check out some of the
                projects I have worked on. There are different types
                technologies used in these projects. The pictures are just my
                dogs because I think they are cool.
              </Typography>
            </Box>
            <Album />
          </Box>

          <Box sx={{ my: 4 }}>
            <Box
              sx={{
                my: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4" color="secondary" gutterBottom>
                Other stuff
              </Typography>
            </Box>
          </Box>

          <Container maxWidth="lg">
            <CardLongResponsive
              imgPath="/images/electronic-duo.png"
              imgAlt="electronic duo"
              heading="This is my bro Gonza"
              description="dasdsadasad dsadsada"
            />
          </Container>
        </Box>
      </Container>
    </>
  );
}
