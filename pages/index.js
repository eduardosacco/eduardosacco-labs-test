import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Album from '../components/Album';
import CardLongResponsive from '../components/CardLongResponsive';

const projectContent = [
  {
    id: 1,
    imgPath: '/images/d1.jpeg',
    heading: 'Sweet Potato',
    description: 'Some description',
  },
  {
    id: 2,
    imgPath: '/images/d2.jpeg',
    heading: 'Sweet Potato',
    description: 'Some description',
  },
];

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
                heading="Hi I'm Ed!"
                description={`I am an electronic/software engineer from Argentina.
                  I love to code and everything tech related. I am currently looking for my next place to continue my Web3 journey!
                  I love going on mountaineering expeditions and going to the beach with my girlfriend and my dogs Nasta and Pantu.`}
                linkText='Checkout my portfolio page'
                link="https://eduardosacco.github.io/"
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
            <Album cards={projectContent} />
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
              description={`We have been friends for more than 10 years! We have shared a lot through time.
                We have done multiple mountaineering expeditions and there will be more in the future.
                Together we are THE ELECTRONIC DUO.`}
            />
          </Container>
        </Box>
      </Container>
    </>
  );
}
