import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Login } from '@mui/icons-material';

function LogOutUset() {
  return (
    <>
      <Link to="/signin">
        <Button variant="outlined" startIcon={<Login />} sx={{ ml: 5, color: 'white', border: 1 }}>
          JOIN US
        </Button>
      </Link>
    </>
  );
}

export default LogOutUset;
