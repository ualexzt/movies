import React, { useEffect, useState } from 'react';
import { Movie } from '../../../types/types';
import { getMovies } from './movies.service';
import { Container } from '@mui/material';
import MovieItem from './MovieItem';

function FavoriteList() {
  const [favorite, setFavorite] = useState<Movie[]>([]);

  useEffect(() => {
    getMovies().then((res) => setFavorite(res.data));
  }, [setFavorite]);

  return (
    <Container
      maxWidth="lg"
      sx={{ display: 'flex', flexWrap: 'wrap', mt: 2, justifyContent: 'center' }}
    >
      {favorite.length < 0
        ? 'Don`t create movies list'
        : favorite.map((movie) => <MovieItem key={movie._id} movie={movie} />)}
    </Container>
  );
}

export default FavoriteList;
