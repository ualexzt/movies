import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer, { RootState } from './redusers';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const configureStore = (preloadState: RootState) =>
  createStore(rootReducer, preloadState, composeEnhancers(applyMiddleware(thunk)));
export const store = configureStore({} as RootState);
