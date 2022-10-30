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
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h5">
            {props.heading}
          </Typography>
          <Typography>{props.description}</Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            alignSelf: 'flex-end',
          }}
        >
          <Button size="small" color="primary" variant="outlined">
            View
          </Button>
        </CardActions>
      </Box>
    </Grid>
  );

  return (
    <Card>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {!props.imgRight && image}
        {content}
        {props.imgRight && image}
      </Grid>
    </Card>
  );
}
