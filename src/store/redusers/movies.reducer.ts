import { MoviesAction, MoviesActionType, MoviesState } from '../../types/movies';

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};
export const moviesReducer = (store = initialState, action: MoviesAction): MoviesState => {
  switch (action.type) {
    case MoviesActionType.FETCH_MOVIES:
      return { loading: true, error: null, movies: [] };
    case MoviesActionType.FETCH_MOVIES_SUCCESS:
      return { loading: false, error: null, movies: action.payload };
    case MoviesActionType.FETCH_MOVIES_ERROR:
      return { loading: false, error: action.payload, movies: [] };
    default:
      return store;
  }
};
