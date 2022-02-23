import { Movie, User } from '../../../types/types';
import $api from '../../../interseptors/interseptor';

export const getMovies = async () => {
  return await $api.get<Movie[]>(`/movie`);
};

export const getMovie = async (id: string | undefined) => {
  return await $api.get<Movie>(`/movie/${id}`);
};

export const addNewMovie = async (
  user: User | null,
  values: Movie
  // resetForm: (nextState?: Partial<FormikState<Movie>> | undefined) => void
) => {
  return await $api.post<Movie>(`/movie/create`, {
    ...values,
    author: user?.email,
    rate: 0,
  });
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
