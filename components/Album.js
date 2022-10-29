import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from 'next/image';

const cards = [1, 2, 3, 4];

export default function Album() {
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
          <Typography variant="h4" color="secondary" gutterBottom>
            Project Portfolio
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            I love to learn new stuff &#129299;. Check out some of the projects
            I have worked on. There are different types technologies used in
            these projects. The pictures are just my dogs because I think they
            are cool.
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {cards.map((card) => (
            <Grid key={card} xs={6}>
              <Card>
                <CardMedia
                  style={{ height: 400}}
                  title="Your title"
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: 'auto',
                      height: '100%',
                    }}
                  >
                    <Image
                      alt="Image"
                      src={`/images/d${card}.jpeg`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
