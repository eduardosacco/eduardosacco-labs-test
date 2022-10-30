import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Album from '../components/Album';
import CardLongResponsive from '../components/CardLongResponsive';

const projectContent = [
  {
    id: 1,
    imgPath: '/images/d1.jpeg',
    heading: 'Contacts API',
    description: `Web API to handle contact records information. 
      The API exposes endpoints to enable CRUD operations for contact records. 
      It was done in .NET c#`,
    link: 'https://github.com/eduardosacco/contacts-api-demo',
    linkText: 'View in GitHub'
  },
  {
    id: 2,
    imgPath: '/images/d2.jpeg',
    heading: 'Where Profit?',
    description: `Calculate the most profitable Uniswap liquidity pool in a given time frame.
      Data is obtained by querying Uniswap V3 subgraph. This is actually my first Go script.`,
    link: 'https://github.com/eduardosacco/where-profit',
    linkText: 'View in GitHub'
  },
  {
    id: 3,
    imgPath: '/images/d3.png',
    heading: 'Market Data Aggregator',
    description: `Parses trade data as it comes in and compute various aggregate metrics from the provided data,
      completing a set of ten million trades in as little time as possible. This is my second Go script.`,
    link: 'https://github.com/eduardosacco/market-data-aggregator',
    linkText: 'View in GitHub'
  },
  {
    id: 4,
    imgPath: '/images/d4.jpeg',
    heading: 'Financial Chat',
    description: `A simple browser-based chat application using .NET. 
      It has a decoupled bot that checks stock prices. It uses SignalR and RabbitMQ.`,
    link: 'https://github.com/eduardosacco/net-core-financial-chat',
    linkText: 'View in GitHub'
  },
  {
    id: 5,
    imgPath: '/images/d5.png',
    heading: 'Lottery Contract',
    description: `A simple Lottery contract made in Solidity. It includes a compile and deploy scripts and some tests.`,
    link: 'https://github.com/eduardosacco/lottery',
    linkText: 'View in GitHub'
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
                linkText="Checkout my portfolio page"
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
