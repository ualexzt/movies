import { createContext, useContext } from 'react';
import { TypeSetState, User } from '../types/types';

interface IContext {
  user: User | null;
  setUser: TypeSetState<User | null>;
}

export const userAuthContext = createContext<IContext>({} as IContext);

export function useUserAuth() {
  return useContext(userAuthContext);
}
