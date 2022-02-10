import React, { useEffect, useState } from 'react';
import { User } from '../types';
import { userAuthContext } from '../hooks/useUserAuth';

export function UserAuthContextProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // проверка авторизации
  }, []);

  return <userAuthContext.Provider value={{ user, setUser }}>{children}</userAuthContext.Provider>;
}
