import React, { useState } from 'react';
import { Alert, Avatar, Box, Container, Grid, Link, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useUserAuth } from '../../../context/UserAuthContext';
import AuthForm from './AuthForm';
import { useFormik } from 'formik';

function SignUp() {
  const navigate = useNavigate();
  const { auth, setUser } = useUserAuth();
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      await createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredentials) => {
          setUser({
            id: userCredentials.user.uid,
            email: userCredentials.user.email,
          });
          navigate('/');
        })
        .catch((e) => {
          setError(e.message);
        });
    },
  });
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
            Sign up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <AuthForm
              email={formik.values.email}
              password={formik.values.password}
              handleChange={formik.handleChange}
            />
          </form>
          <Grid container>
            <Grid item>
              <Link
                component={RouterLink}
                to="/login"
                sx={{ textDecoration: 'none', textAlign: 'center' }}
              >
                {'You have an account? Log In'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default SignUp;
