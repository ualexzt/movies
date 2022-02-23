import React from 'react';
import { Button, Typography } from '@mui/material';
import { Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function LoginButton() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="contained"
        startIcon={<Login />}
        sx={{ ml: 5 }}
        onClick={() => navigate('/login')}
      >
        <Typography sx={{ display: { xs: 'none', md: 'flex' } }}>JOIN US</Typography>
      </Button>
    </>
  );
}

export default LoginButton;
