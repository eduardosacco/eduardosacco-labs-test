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
import Emoji from './Emoji';

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
            props.cards.map((card, index) => (
              <Grid key={index} item xs={4} sm={4} md={6}>
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
                        {...card.imgProps}
                        alt={card.imgAlt}
                        layout="fill"
                        objectFit="cover"
                        width={undefined}
                        height={undefined}
                        placeholder="blur"
                      />
                    </Box>
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" color="secondary">
                      {card.symbol && (
                        <span>
                          <Emoji symbol={card.symbol} />
                          &nbsp;
                        </span>
                      )}
                      {card.heading}
                    </Typography>
                    <Typography align="justify">{card.description}</Typography>
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
