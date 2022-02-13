import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { Movie } from '../../../types';
import MovieItem from './MovieItem';
import { getMovies } from './movies.service';

function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies('_sort=title&_order=asc').then((res) => setMovies(res.data));
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexWrap: 'wrap', mt: 2, justifyContent: 'center' }}
    >
      {movies.length < 0
        ? 'Don`t create movies list'
        : movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)}
    </Container>
  );
}

export default MoviesList;
