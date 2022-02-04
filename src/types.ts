import { Dispatch, SetStateAction } from 'react';

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface IUser {
  id: string;
  email: string | null;
}

export interface Movie {
  id: string;
  title: string;
  director: string;
  duration: string;
  price: string;
  img: string;
  featured: boolean;
  description: string;
}