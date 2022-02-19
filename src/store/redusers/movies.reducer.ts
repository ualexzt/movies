import { MoviesAction, MoviesActionType, MoviesState } from '../../types/movies';

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
};
export const moviesReducer = (state = initialState, action: MoviesAction): MoviesState => {
  switch (action.type) {
    case MoviesActionType.FETCH_MOVIES:
      return { ...state, loading: true, error: null, movies: [] };
    case MoviesActionType.FETCH_MOVIES_SUCCESS:
      return { ...state, loading: false, error: null, movies: action.payload };
    case MoviesActionType.FETCH_MOVIES_ERROR:
      return { ...state, loading: false, error: action.payload, movies: [] };
    default:
      return state;
  }
};
