import React, { useEffect, useState } from 'react';
import { CardMedia, Grid, Paper, Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useParams } from 'react-router-dom';
import { Movie } from '../../../types';

function MovieDetail() {
  const params = useParams();
  const [movie, setMovie] = useState<Movie>({} as Movie);

  useEffect(() => {
    async function getMovie() {
      const docRef = doc(db, 'movies', `${params.id}`);
      try {
        const docSnap = await getDoc(docRef);
        setMovie(docSnap.data() as Movie);
      } catch (e) {
        console.log('No such document!');
      }
    }

    getMovie();
  }, [params.id]);

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
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                  Remove
                </Typography>
              </Grid>
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
