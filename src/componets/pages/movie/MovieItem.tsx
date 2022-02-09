import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Zoom,
} from '@mui/material';
import { Movie } from '../../../types';
import { useNavigate } from 'react-router-dom';

interface MovieProps {
  movie: Movie;
}

function MovieItem({ movie }: MovieProps) {
  const navigate = useNavigate();
  return (
    <>
      <Zoom in={true} style={{ transitionDelay: '500ms' }}>
        <Card sx={{ m: 2, width: 240 }}>
          <CardMedia component="img" height="140" image={movie.img} alt="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Director: {movie.director}
            </Typography>
            <Rating name="read-only" value={movie.rate} precision={0.5} readOnly />
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigate(`${movie.id}`)}>
              More
            </Button>
          </CardActions>
        </Card>
      </Zoom>
    </>
  );
}

export default MovieItem;
