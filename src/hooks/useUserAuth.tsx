import { createContext, useContext } from 'react';
import { TypeSetState, User } from '../types';
import { Auth } from 'firebase/auth';

interface IContext {
  user: User | null;
  setUser: TypeSetState<User | null>;
  auth: Auth;
}

export const userAuthContext = createContext<IContext>({} as IContext);

export function useUserAuth() {
  return useContext(userAuthContext);
}
