import React from 'react';
import { Button } from '@mui/material';
import { Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="contained"
        startIcon={<Login />}
        sx={{ ml: 5, border: 1 }}
        onClick={() => navigate('/login')}
      >
        JOIN US
      </Button>
    </>
  );
}

export default LogoutButton;
