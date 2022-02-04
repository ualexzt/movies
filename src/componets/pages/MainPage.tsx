import React from 'react';
import { Box, Button, CardMedia, Container, Typography } from '@mui/material';
import { Login } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import HeaderImg from '../../assets/img/BEST-MOVIES.jpg';

function MainPage() {
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
        <CardMedia component="img" height="360" image={HeaderImg} alt="green iguana" />
        <Typography component="h1" variant="h4" sx={{ textAlign: 'center', color: 'red' }}>
          Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.
        </Typography>
        <Typography component="h1" variant="h6">
          Ready to watch? Create or restart your membership.
        </Typography>

        <Link to="/signup">
          <Button
            variant="outlined"
            startIcon={<Login />}
            sx={{ mt: 3, color: 'white', border: 1 }}
            size="large"
          >
            JOIN US
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

export default MainPage;
