import React, { useEffect } from 'react';
import { Alert, Container } from '@mui/material';
import MovieItem from './MovieItem';
import useTypedSelector from '../../../hooks/useTypedSelector';
import { HashLoader } from 'react-spinners';
import { useAction } from '../../../hooks/useAction';

function MoviesList() {
  const { error, loading, movies } = useTypedSelector((state) => state.movies);
  const { fetchMovies } = useAction();
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexWrap: 'wrap', mt: 2, justifyContent: 'center' }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      {error && <Alert severity="error">{error}</Alert>}
      {loading ? (
        <HashLoader color="orange" loading={loading} size={50} />
      ) : (
        movies.map((movie) => <MovieItem key={movie._id} movie={movie} />)
      )}
    </Container>
  );
}

export default MoviesList;
