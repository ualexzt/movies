import React from 'react';
import { useUserAuth } from '../../context/UserAuthContext';

function Profile() {
  const { user } = useUserAuth();
  return <div>User Profile Page {user?.email}</div>;
}

export default Profile;
