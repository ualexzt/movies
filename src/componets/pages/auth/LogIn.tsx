import React, { SyntheticEvent, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useUserAuth } from '../../context/UserAuthContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { auth, setUser } = useUserAuth();
  const navigate = useNavigate();
  const handleLogIn = async (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setUser({
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
        });
        navigate('/');
      })
      .catch((e) => setError(e.message));
  };
  return (
    <>
      {error && (
        <Alert
          onClose={() => {
            setError('');
          }}
          severity="error"
        >
          {error}
        </Alert>
      )}

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogIn}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/signup"
                  sx={{ textDecoration: 'none', textAlign: 'center' }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default LogIn;
