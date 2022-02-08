import React from 'react';
import { Box, Button, CardMedia, Container, Typography } from '@mui/material';
import { Login } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import HeaderImg from '../../assets/img/BEST-MOVIES.jpg';
import { useUserAuth } from '../../hooks/useUserAuth';

function MainPage() {
  const navigate = useNavigate();
  const { user } = useUserAuth();
  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CardMedia component="img" height="400" image={HeaderImg} alt="green iguana" />
        <Typography component="h1" variant="h4" sx={{ textAlign: 'center', color: 'red' }}>
          Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
        </Typography>
        <Typography component="h1" variant="h6">
          Ready to watch? Create or restart your membership.
        </Typography>
        {!user && (
          <Button
            variant="contained"
            startIcon={<Login />}
            sx={{ mt: 3, border: 1 }}
            size="large"
            onClick={() => navigate('/signup')}
          >
            JOIN US
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default MainPage;
