import React, { createContext, useContext, useEffect, useState } from 'react';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { IUser, TypeSetState } from '../../types';

import { app } from '../../firebaseConfig';

interface IContext {
  user: IUser | null;
  setUser: TypeSetState<IUser | null>;
  auth: Auth;
}

const userAuthContext = createContext<IContext>({} as IContext);

export function UserAuthContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>(null);
  const auth = getAuth(app);
  // function signUp(email: string, password: string) {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }
  //
  // function logIn(email: string, password: string) {
  //   return signInWithEmailAndPassword(auth, email, password);
  // }
  //
  // function logOut() {
  //   return signOut(auth);
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(
        currentUser
          ? {
              id: currentUser.uid,
              email: currentUser.email || '',
            }
          : null
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, setUser, auth }}>{children}</userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
