import { Dispatch, SetStateAction } from 'react';

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export interface User {
  id: string;
  email: string | null;
  password: string | null;
}

export interface Movie {
  id?: number;
  title: string;
  director: string;
  duration: string;
  price: string;
  img?: string;
  featured: boolean;
  description: string;
  author: string;
  rate: number;
}
