import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { User } from '../types';
import { userAuthContext } from '../hooks/useUserAuth';
import { app } from '../firebaseConfig';

export function UserAuthContextProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth(app);

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
