import React, { useState } from 'react';
import NoImage from '../../../assets/img/noimage.jpg';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Rating,
  Typography,
  Zoom,
} from '@mui/material';
import { Movie } from '../../../types';
import { useNavigate } from 'react-router-dom';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

interface MovieProps {
  movie: Movie;
}

function MovieItem({ movie }: MovieProps) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  return (
    <>
      <Zoom in={true} style={{ transitionDelay: '500ms' }}>
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            m: 2,
            width: 240,
          }}
        >
          <CardHeader
            title={movie.title}
            action={
              favorite ? (
                <StarIcon color="warning" onClick={() => setFavorite((prevState) => !prevState)} />
              ) : (
                <StarOutlineIcon onClick={() => setFavorite((prevState) => !prevState)} />
              )
            }
            disableTypography
          />
          <CardMedia component="img" height="200" image={movie.img || NoImage} alt="no image" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Director: {movie.director}
            </Typography>
            <Rating name="read-only" value={movie.rate} precision={0.5} readOnly />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate(`/movies/${movie._id}`)}
            >
              More
            </Button>
          </CardActions>
        </Card>
      </Zoom>
    </>
  );
}

export default MovieItem;
