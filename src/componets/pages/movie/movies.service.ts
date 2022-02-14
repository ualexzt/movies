import { Movie, User } from '../../../types';
import { FormikState } from 'formik';
import $api from '../../../interseptors/interseptor';

export const getMovies = async () => {
  return await $api.get<Movie[]>(`/movie`);
};

export const getMovie = async (id: string | undefined) => {
  return await $api.get<Movie>(`/movie/${id}`);
};

export const addNewMovie = async (
  user: User | null,
  values: Movie,
  resetForm: (nextState?: Partial<FormikState<Movie>> | undefined) => void
) => {
  await $api.post<Movie>(`/movie/create`, {
    ...values,
    author: user?.email,
    rate: 0,
  });
  resetForm();
};

export const editMovie = async (id: string | undefined, values: Movie, user: User | null) => {
  return await $api.put<Movie>(`/movie/update/${id}`, {
    ...values,
    author: user?.email,
  });
};

export const deleteMovie = async (id: string | undefined) => {
  return await $api.delete(`/movie/delete/${id}`);
};
