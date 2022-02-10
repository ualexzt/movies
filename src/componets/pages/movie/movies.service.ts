import axios from 'axios';
import { Movie, User } from '../../../types';
import { FormikState } from 'formik';

const apiUrl = process.env.REACT_APP_API_URL;

export const getMovies = async () => {
  return await axios.get<Movie[]>(apiUrl + `/films`);
};

export const getMovie = async (id: number) => {
  return await axios.get<Movie>(apiUrl + `/films/${id}`);
};

export const addNewMovie = async (
  user: User | null,
  values: Movie,
  resetForm: (nextState?: Partial<FormikState<Movie>> | undefined) => void
) => {
  try {
    await axios.post(apiUrl + `/films`, {
      title: values.title,
      director: values.director,
      description: values.description,
      duration: values.duration,
      price: values.price,
      featured: values.featured,
      img: 'https://upload.wikimedia.org/wikipedia/ru/thumb/6/6e/Spider-Man_%E2%80%94_No_Way_Home_poster.jpg/640px-Spider-Man_%E2%80%94_No_Way_Home_poster.jpg',
      author: user?.email,
      rate: 0,
    });
    resetForm();
    // console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const editMovie = async (id: number, values: Movie) => {
  try {
    return await axios.put<Movie>(apiUrl + `/films/${id}`, {
      title: values.title,
      director: values.director,
      description: values.description,
      duration: values.duration,
      price: values.price,
      featured: values.featured,
      rate: values.rate,
    });
  } catch (e) {
    if (e instanceof Error) console.log(e.message);
  }
};

// export const deleteMovie = async (id: string | undefined) => {
//   try {
//     await deleteDoc(doc(db, 'movies', `${id}`));
//   } catch (e) {
//     if (e instanceof Error) console.log(e.message);
//   }
// };
