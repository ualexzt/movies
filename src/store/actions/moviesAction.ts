import { MoviesAction, MoviesActionType } from '../../types/movies';
import { Dispatch } from 'redux';
import { getMovies } from '../../componets/pages/movie/movies.service';

export const fetchMovies = () => {
  return async (dispatch: Dispatch<MoviesAction>) => {
    try {
      dispatch({ type: MoviesActionType.FETCH_MOVIES });
      const response = await getMovies();
      dispatch({ type: MoviesActionType.FETCH_MOVIES_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({
        type: MoviesActionType.FETCH_MOVIES_ERROR,
        payload: 'An error occurred while loading data',
      });
    }
  };
};
