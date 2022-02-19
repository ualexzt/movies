import { MovieAction, MovieState } from '../../types/movie';
import { Movie } from '../../types/types';

const initialState: MovieState = {
  movie: {} as Movie,
  loading: false,
  error: null,
};

export const movieReducer = (state = initialState, action: MovieAction) => {
  switch (action.type) {
    default:
      return state;
  }
};
