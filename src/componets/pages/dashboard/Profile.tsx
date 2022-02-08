import React from 'react';
import { useUserAuth } from '../../../hooks/useUserAuth';

function Profile() {
  const { user } = useUserAuth();
  return <div>User Profile Page {user?.email}</div>;
}

export default Profile;
