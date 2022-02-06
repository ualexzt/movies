import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useFormik } from 'formik';

function AddMovie() {
  const addMovieForm = useFormik({
    initialValues: {
      title: '',
      director: '',
      description: '',
      duration: '',
      price: '',
      featured: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const docRef = await addDoc(collection(db, 'movies'), {
          title: values.title,
          director: values.director,
          description: values.description,
          duration: values.duration,
          price: values.price,
          featured: values.featured,
          img: 'https://peopletalk.ru/wp-content/uploads/2020/06/mstiteli-640x360.jpg',
        });
        resetForm();
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    },
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add movies to store
          </Typography>
          <form onSubmit={addMovieForm.handleSubmit}>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Movie title"
                    autoFocus
                    {...addMovieForm.getFieldProps('title')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Film director"
                    {...addMovieForm.getFieldProps('director')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration"
                    {...addMovieForm.getFieldProps('duration')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Price" {...addMovieForm.getFieldProps('price')} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    label="Description"
                    {...addMovieForm.getFieldProps('description')}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="primary" {...addMovieForm.getFieldProps('featured')} />}
                  label="Featured"
                />
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default AddMovie;
