import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from '../src/Link';
import Emoji from './Emoji';

export default function CardLongResponsive(props) {
  const image = (
    <Grid item xs={4} sm={4} md={6}>
      <CardMedia
        sx={{
          mr: 2,
          position: 'relative',
          width: '100%',
          height: 400,
        }}
      >
        <Image
          alt={props.imgAlt}
          src={props.imgPath}
          layout="fill"
          objectFit="cover"
        />
      </CardMedia>
    </Grid>
  );

  const content = (
    <Grid item xs={4} sm={4} md={6}>
      <Box
        sx={{
          p: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            sx={{ my: 2 }}
            gutterBottom
            variant="h5"
            color="secondary"
          >
            {props.symbol && (
              <span>
                <Emoji symbol={props.symbol} />
                &nbsp;
              </span>
            )}
            {props.heading}
          </Typography>
          <Typography>{props.description}</Typography>
        </CardContent>
        {props.link && (
          <CardActions
            sx={{
              display: 'flex',
              alignSelf: 'flex-end',
            }}
          >
            <Link style={{ textDecoration: 'none' }} href={props.link}>
              <Button size="small" color="primary" variant="outlined">
                {props.linkText ? props.linkText : 'View'}
              </Button>
            </Link>
          </CardActions>
        )}
      </Box>
    </Grid>
  );

  return (
    <Card>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, md: 12 }}>
        {!props.imgRight && image}
        {content}
        {props.imgRight && image}
      </Grid>
    </Card>
  );
}
