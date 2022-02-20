import React, { SyntheticEvent, useEffect } from 'react';
import { Box, Button, CardMedia, Grid, Paper, Rating, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserAuth } from '../../../hooks/useUserAuth';
import NoImage from '../../../assets/img/noimage.jpg';
import useTypedSelector from '../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import {
  deleteMovieAction,
  fetchMovieAction,
  updateRateAction,
} from '../../../store/actions/movieAction';
import { HashLoader } from 'react-spinners';

function MovieDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  const { loading, movie, rate } = useTypedSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieAction(params.id));
  }, [dispatch, params.id]);

  const handleDelete = () => {
    dispatch(deleteMovieAction(params.id));
    navigate('/movies');
  };

  const handleRate = (event: SyntheticEvent, newValue: number | null) => {
    if (!newValue) {
      return;
    }
    if (movie.rate) {
      newValue = (newValue + movie.rate) / 2;
    }
    dispatch(updateRateAction(params.id, { ...movie, rate: newValue }, user));
  };

  return (
    <>
      {loading ? (
        <HashLoader color="orange" loading={loading} size={50} />
      ) : (
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
      )}
    </>
  );
}

export default MovieDetail;
