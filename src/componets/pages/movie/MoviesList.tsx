import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { Movie } from '../../../types';
import MovieItem from './MovieItem';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    let isMounted = true;
    const moviesRef = collection(db, 'movies');
    const q = query(moviesRef);
    onSnapshot(q, (snapshot) => {
      const moviesArr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      if (isMounted) setMovies(moviesArr as Movie[]);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
      {movies.length < 0
        ? 'Don`t create movies list'
        : movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)}
    </Container>
  );
}

export default MoviesList;
