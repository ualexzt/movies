import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { userAuthContext } from '../hooks/useUserAuth';
import { checkAuth } from '../componets/pages/auth/auth.service';

export function UserAuthContextProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // проверка авторизации
    async function setAuth() {
      if (localStorage.getItem('token')) {
        const response = await checkAuth();
        if (response) {
          setUser(response.data.user);
        }
      }
    }

    setAuth();
  }, []);

  return <userAuthContext.Provider value={{ user, setUser }}>{children}</userAuthContext.Provider>;
}
