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
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { Movie } from '../../../types';
import { addNewMovie, editMovie, getMovie } from './movies.service';
import firebase from 'firebase/compat';
import DocumentData = firebase.firestore.DocumentData;

function AddOrEditMovie() {
  const { user } = useUserAuth();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function detail() {
      const docSnap: DocumentData | undefined = await getMovie(params.id);
      await addMovieForm.setValues(docSnap?.data() as Movie);
    }

    if (params.id) detail();
  }, []);

  const addMovieForm = useFormik<Movie>({
    initialValues: {
      title: '',
      director: '',
      description: '',
      duration: '',
      price: '',
      featured: false,
      img: '',
    },
    onSubmit: async (values, { resetForm }) => {
      // if (image) uploadImage(image);
      if (params.id) {
        await editMovie(values, params.id);
        navigate(`/movies/${params.id}`);
      } else {
        await addNewMovie(user, values, resetForm);
      }
    },
  });

  // const handleUpload = () => {
  //   uploadImage(image);
  // };

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
                    id="title"
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
                {/* <Grid item xs={12}> */}
                {/*   <TextField */}
                {/*     fullWidth */}
                {/*     id="img" */}
                {/*     name="img" */}
                {/*     type="file" */}
                {/*     onChange={(e: ChangeEvent<HTMLInputElement>) => { */}
                {/*       if (e.target.files) { */}
                {/*         console.log(e.target.files[0].name); */}
                {/*         setImage(e.target.files[0]); */}
                {/*       } */}
                {/*     }} */}
                {/*   /> */}
                {/* </Grid> */}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        id="featured"
                        checked={addMovieForm.values.featured}
                        onChange={addMovieForm.handleChange}
                      />
                    }
                    label="Featured"
                  />
                </Grid>
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

export default AddOrEditMovie;
