import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Button, CardMedia, Grid, Paper, Rating, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Movie } from '../../../types/types';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { deleteMovie, editMovie, getMovie } from './movies.service';
import NoImage from '../../../assets/img/noimage.jpg';

function MovieDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [rate, setRate] = useState<number>(0);
  const { user } = useUserAuth();

  useEffect(() => {
    getMovie(params.id).then((res) => {
      setMovie(res.data);
      setRate(res.data.rate);
    });
  }, [params.id]);

  const handleDelete = () => {
    deleteMovie(params.id).then(() => navigate('/movies'));
  };

  const handleRate = (event: SyntheticEvent, newValue: number | null) => {
    if (!newValue) {
      return;
    }
    if (movie.rate) {
      newValue = (newValue + movie.rate) / 2;
    }

    editMovie(params.id, { ...movie, rate: newValue }, user).then((res) => {
      if (res) {
        setRate(res.data.rate);
      }
    });
  };

  return (
    <>
      <Paper sx={{ my: 2, p: 2, mx: 'auto', maxWidth: 'lg', flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item>
            <CardMedia
              component="img"
              height="240"
              image={movie?.img || NoImage}
              alt={movie.title}
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {movie?.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Director: {movie.director}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Description: {movie.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Duration: {movie.duration}
                </Typography>
              </Grid>
              <Grid item>
                <Box sx={{ display: 'flex' }}>
                  <Button variant="outlined" sx={{ mr: 1 }} onClick={() => navigate(-1)}>
                    Go Back
                  </Button>
                  {user?.email === movie.author && movie.author != null && (
                    <>
                      <Button
                        variant="outlined"
                        sx={{ mr: 1 }}
                        onClick={() => navigate(`/movies/edit/${params.id}`)}
                      >
                        Edit
                      </Button>
                      <Button variant="outlined" onClick={handleDelete}>
                        Remove
                      </Button>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid item>
              <Rating value={rate || 0} precision={0.5} onChange={handleRate} />
              <Typography variant="subtitle1" component="div">
                ${movie.price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default MovieDetail;
