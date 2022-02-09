import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Box, Button, CardMedia, Grid, Paper, Rating, Typography } from '@mui/material';
import { doc, DocumentData, updateDoc } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { Movie } from '../../../types';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { deleteMovie, getMovie } from './movies.service';
import { db } from '../../../firebaseConfig';

function MovieDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [rate, setRate] = useState<number | null>(0);
  const { user } = useUserAuth();

  useEffect(() => {
    async function detail() {
      const docSnap: DocumentData | undefined = await getMovie(params.id);
      setMovie(docSnap?.data());
      setRate(docSnap?.data().rate);
    }

    detail();
  }, [params.id]);

  const handleDelete = () => {
    deleteMovie(params.id);
    navigate('/movies');
  };

  const handleRate = async (event: SyntheticEvent, newValue: number | null) => {
    const updateMovie = doc(db, 'movies', `${params.id}`);
    await updateDoc(updateMovie, {
      rate: newValue,
    });
    setRate(newValue);
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
