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

const cards = [
  {
    id: 1,
    imgPath: '/images/d1.jpeg',
    heading: 'Sweet Potato',
    description: 'Some description',
  },
];

export default function Album() {
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {cards.map((card) => (
            <Grid key={card} item xs={4} sm={4} md={6}>
              <Card>
                <CardMedia style={{ height: 400 }} title={card.heading}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: 'auto',
                      height: '100%',
                    }}
                  >
                    <Image
                      alt="Image"
                      src={card.imgPath}
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                </CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {card.heading}
                  </Typography>
                  <Typography>{card.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'right' }}>
                  <Button size="small" color="primary" variant="outlined">
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
