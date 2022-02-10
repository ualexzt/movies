import axios from 'axios';
import { Movie, User } from '../../../types';
import { FormikState } from 'formik';

const apiUrl = process.env.REACT_APP_API_URL;

export const getMovies = async () => {
  return await axios.get<Movie[]>(apiUrl + `/films?_sort=title&_order=asc`);
};

export const getMovie = async (id: number) => {
  return await axios.get<Movie>(apiUrl + `/films/${id}`);
};

export const addNewMovie = async (
  user: User | null,
  values: Movie,
  resetForm: (nextState?: Partial<FormikState<Movie>> | undefined) => void
) => {
  await axios.post<Movie>(apiUrl + `/films`, {
    ...values,
    author: user?.email,
    rate: 0,
  });
  resetForm();
};

export const editMovie = async (id: number, values: Movie, user: User | null) => {
  return await axios.put<Movie>(apiUrl + `/films/${id}`, {
    ...values,
    author: user?.email,
  });
};

export const deleteMovie = async (id: number) => {
  return await axios.delete(apiUrl + `/films/${id}`);
};
