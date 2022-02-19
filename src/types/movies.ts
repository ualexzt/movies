import { Movie } from './types';

export interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export enum MoviesActionType {
  // eslint-disable-next-line no-unused-vars
  FETCH_MOVIES = 'FETCH_MOVIES',
  // eslint-disable-next-line no-unused-vars
  FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS',
  // eslint-disable-next-line no-unused-vars
  FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR',
}

interface FetchMoviesAction {
  type: MoviesActionType.FETCH_MOVIES;
}

interface FetchMoviesActionSuccess {
  type: MoviesActionType.FETCH_MOVIES_SUCCESS;
  payload: Movie[];
}

interface FetchMoviesActionError {
  type: MoviesActionType.FETCH_MOVIES_ERROR;
  payload: string;
}

export type MoviesAction = FetchMoviesAction | FetchMoviesActionSuccess | FetchMoviesActionError;
