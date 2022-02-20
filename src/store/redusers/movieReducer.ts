import { MovieAction, MovieActionType, MovieState } from '../../types/movie';
import { Movie } from '../../types/types';

const initialState: MovieState = {
  movie: {} as Movie,
  loading: false,
  error: null,
  rate: 0,
};

export const movieReducer = (state = initialState, action: MovieAction) => {
  switch (action.type) {
    case MovieActionType.FETCH_MOVIE:
      return { ...state, loading: true, error: null, movie: {} as Movie };
    case MovieActionType.FETCH_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        movie: action.payload,
        rate: action.payload.rate,
      };
    case MovieActionType.FETCH_MOVIE_ERROR:
      return { ...state, loading: false, error: action.error, movie: {} as Movie };
    case MovieActionType.CREATE_MOVIE:
      return { ...state, movie: action.payload };
    case MovieActionType.UPDATE_MOVIE:
      return { ...state, movie: action.payload };
    case MovieActionType.DELETE_MOVIE:
      return { ...state };
    case MovieActionType.UPDATE_RATE:
      return { ...state, rate: action.payload };
    default:
      return state;
  }
};
