import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import MovieItem from './MovieItem';
import useTypedSelector from '../../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../../../store/actions/moviesAction';
import { HashLoader } from 'react-spinners';

function MoviesList() {
  const { error, loading, movies } = useTypedSelector((state) => state.movies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexWrap: 'wrap', mt: 2, justifyContent: 'center' }}
    >
      {loading ? (
        <HashLoader color="orange" loading={loading} size={50} />
      ) : (
        movies.map((movie) => <MovieItem key={movie._id} movie={movie} />)
      )}
    </Container>
  );
}

export default MoviesList;
