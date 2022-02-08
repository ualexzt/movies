import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserAuth } from '../hooks/useUserAuth';

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { user } = useUserAuth();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}

export default RequireAuth;
