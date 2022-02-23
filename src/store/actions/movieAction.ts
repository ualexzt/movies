import { Dispatch } from 'redux';
import { MovieAction, MovieActionType } from '../../types/movie';
import {
  addNewMovie,
  deleteMovie,
  editMovie,
  getMovie,
} from '../../componets/pages/movie/movies.service';
import { Movie, User } from '../../types/types';

export const fetchMovieAction = (id: string | undefined) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      dispatch({ type: MovieActionType.FETCH_MOVIE });
      const response = await getMovie(id);
      dispatch({ type: MovieActionType.FETCH_MOVIE_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: MovieActionType.FETCH_MOVIE_ERROR,
        error: 'An error occurred while loading data',
      });
    }
  };
};

export const createMovieAction = (user: User | null, value: Movie) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      const response = await addNewMovie(user, value);
      dispatch({ type: MovieActionType.CREATE_MOVIE, payload: response.data });
    } catch (e) {}
  };
};

export const updateRateAction = (id: string | undefined, values: Movie, user: User | null) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    const response = await editMovie(id, values, user);
    dispatch({ type: MovieActionType.UPDATE_RATE, payload: response.data.rate });
    try {
    } catch (e) {}
  };
};

export const updateMovieAction = (id: string | undefined, values: Movie, user: User | null) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      const response = await editMovie(id, values, user);
      dispatch({ type: MovieActionType.UPDATE_MOVIE, payload: response.data });
    } catch (e) {}
  };
};

export const deleteMovieAction = (id: string | undefined) => {
  return async (dispatch: Dispatch<MovieAction>) => {
    try {
      await deleteMovie(id);
      dispatch({ type: MovieActionType.DELETE_MOVIE });
    } catch (e) {}
  };
};
