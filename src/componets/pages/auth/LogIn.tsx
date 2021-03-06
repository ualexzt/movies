import React, { useState } from 'react';
import { Alert, Avatar, Box, Container, Grid, Link, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useUserAuth } from '../../../hooks/useUserAuth';
import AuthForm from './AuthForm';
import { logIn } from './auth.service';

function LogIn() {
  const { setUser } = useUserAuth();
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      logIn(values.email, values.password).then((res) => {
        setUser(res);
      });
      navigate('/');
    },
  });

  return (
    <>
      {errors && (
        <Alert
          onClose={() => {
            setErrors('');
          }}
          severity="error"
        >
          {errors}
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
            Log in
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
                to="/signup"
                sx={{ textDecoration: 'none', textAlign: 'center' }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default LogIn;
