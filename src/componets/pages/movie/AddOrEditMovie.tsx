import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useUserAuth } from '../../../hooks/useUserAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { Movie } from '../../../types/types';
import { useDispatch } from 'react-redux';
import useTypedSelector from '../../../hooks/useTypedSelector';
import {
  createMovieAction,
  fetchMovieAction,
  updateMovieAction,
} from '../../../store/actions/movieAction';

function AddOrEditMovie() {
  const { user } = useUserAuth();
  const dispatch = useDispatch();
  const { movie } = useTypedSelector((state) => state.movie);
  const params = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    function detail() {
      dispatch(fetchMovieAction(params.id));
      addMovieForm.setValues(movie);
      setImage(movie.img);
    }

    if (params.id) detail();
  }, [params.id]);

  const handleImage = (e: BaseSyntheticEvent) => {
    const file = e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setImage(e.target?.result);
        addMovieForm.setFieldValue('img', e.target?.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const addMovieForm = useFormik<Movie>({
    initialValues: {
      title: '',
      director: '',
      description: '',
      duration: '',
      price: '',
      featured: false,
      img: null,
      rate: 0,
      author: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (params.id) {
        dispatch(updateMovieAction(params.id, values, user));
        navigate(`/movies/${params.id}`);
      } else {
        dispatch(createMovieAction(user, values));
        resetForm();
        navigate(`/movies`);
      }
    },
  });

  return (
    <>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            Add movies to store
          </Typography>

          <form onSubmit={addMovieForm.handleSubmit}>
            <Grid container spacing={2}>
              <Grid
                container
                item
                xs={4}
                direction="column"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <input
                  type="file"
                  onChange={handleImage}
                  id="upload-file"
                  style={{ display: 'none' }}
                />
                <label htmlFor="upload-file">
                  {image ? (
                    <CardMedia
                      component="img"
                      sx={{ width: 160, cursor: 'pointer' }}
                      image={image}
                      alt="Live from space album cover"
                    />
                  ) : (
                    <Button
                      component="span"
                      variant="outlined"
                      sx={{ textAlign: 'center', width: 128, height: 128 }}
                    >
                      Add picture
                    </Button>
                  )}
                </label>
              </Grid>
              <Grid item container spacing={2} xs={8}>
                <Grid item xs={12}>
                  <TextField
                    id="title"
                    required
                    fullWidth
                    label="Movie title"
                    autoFocus
                    inputProps={{ maxLength: 50 }}
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
                    inputProps={{ maxLength: 250 }}
                    {...addMovieForm.getFieldProps('description')}
                  />
                </Grid>

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
            </Grid>

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Apply
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default AddOrEditMovie;
