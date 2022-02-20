import { Movie } from './types';

export interface MovieState {
  movie: Movie;
  loading: boolean;
  error: null | string;
  rate: number;
}

export enum MovieActionType {
  FETCH_MOVIE = 'FETCH_MOVIE',
  FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS',
  FETCH_MOVIE_ERROR = 'FETCH_MOVIE_ERROR',
  CREATE_MOVIE = 'CREATE_MOVIE',
  UPDATE_MOVIE = 'UPDATE_MOVIE',
  DELETE_MOVIE = 'DELETE_MOVIE',
  UPDATE_RATE = 'UPDATE_RATE',
}

interface FetchMovieAction {
  type: MovieActionType.FETCH_MOVIE;
}

interface FetchMoviesActionSuccess {
  type: MovieActionType.FETCH_MOVIE_SUCCESS;
  payload: Movie;
}

interface FetchMovieActionError {
  type: MovieActionType.FETCH_MOVIE_ERROR;
  error: string;
}

interface CreateMovieAction {
  type: MovieActionType.CREATE_MOVIE;
  payload: Movie;
}

interface UpdateMovieAction {
  type: MovieActionType.UPDATE_MOVIE;
  payload: Movie;
}

interface DeleteMovieAction {
  type: MovieActionType.DELETE_MOVIE;
}

interface UpdateRateAction {
  type: MovieActionType.UPDATE_RATE;
  payload: number;
}

export type MovieAction =
  | FetchMovieAction
  | FetchMoviesActionSuccess
  | FetchMovieActionError
  | CreateMovieAction
  | UpdateMovieAction
  | DeleteMovieAction
  | UpdateRateAction;
