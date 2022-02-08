import React, { useEffect, useState } from 'react';
import { Box, Button, CardMedia, Grid, Paper, Typography } from '@mui/material';
import { DocumentData } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { Movie } from '../../../types';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { deleteMovie, getMovie } from './movies.service';

function MovieDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const { user } = useUserAuth();

  useEffect(() => {
    async function detail() {
      const docSnap: DocumentData | undefined = await getMovie(params.id);
      setMovie(docSnap?.data());
    }

    detail();
  }, [params.id]);

  const handleDelete = () => {
    deleteMovie(params.id);
    navigate('/movies');
  };
  return (
    <>
      <Paper sx={{ my: 2, p: 2, mx: 'auto', maxWidth: 'lg', flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item>
            <CardMedia component="img" height="240" image={movie?.img} alt={movie.title} />
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
              {user?.email === movie.author && (
                <Grid item>
                  <Box sx={{ display: 'flex' }}>
                    <Button
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={() => navigate(`/movies/edit/${params.id}`)}
                    >
                      Edit
                    </Button>
                    <Button variant="outlined" onClick={handleDelete}>
                      {' '}
                      Remove{' '}
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
            <Grid item>
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
