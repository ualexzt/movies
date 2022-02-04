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
import React, { SyntheticEvent, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

function AddMovie() {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('0');
  const [price, setPrice] = useState('0');
  const [featured, setFeatured] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'movies'), {
        title: title,
        director: director,
        description: description,
        duration: duration,
        price: price,
        featured: featured,
        img: 'https://peopletalk.ru/wp-content/uploads/2020/06/mstiteli-640x360.jpg',
      });
      console.log('Document written with ID: ', docRef.id);
      setDescription('');
      setFeatured(false);
      setPrice('');
      setDuration('');
      setTitle('');
      setDirector('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };
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
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Movie title"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Film director"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  value={description}
                  label="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={featured}
                    onChange={() => setFeatured(!featured)}
                    color="primary"
                  />
                }
                label="Featured"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default AddMovie;
