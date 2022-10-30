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
import Link from '../src/Link';

export default function Album(props) {
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {props.cards &&
            props.cards.map((card) => (
              <Grid key={card} item xs={4} sm={4} md={6}>
                <Card>
                  <CardMedia sx={{ height: 400 }} title={card.heading}>
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
                    <Typography gutterBottom variant="h5" color="secondary">
                      {card.heading}
                    </Typography>
                    <Typography>{card.description}</Typography>
                  </CardContent>
                  {card.link && (
                    <CardActions
                      sx={{
                        display: 'flex',
                        justifyContent: 'right',
                      }}
                    >
                      <Link style={{ textDecoration: 'none' }} href={card.link}>
                        <Button size="small" color="primary" variant="outlined">
                          {card.linkText ? card.linkText : 'View'}
                        </Button>
                      </Link>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
