import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MoviesActionCreator from '../store/actions/moviesAction';

export const useAction = () => {
  const dispatch = useDispatch();
  return bindActionCreators(MoviesActionCreator, dispatch);
};
