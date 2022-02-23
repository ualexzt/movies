import { AuthInterface } from '../../../types/types';
import $api from '../../../interseptors/interseptor';
import axios from 'axios';

export const logIn = async (email: string, password: string) => {
  return await $api.post<AuthInterface>(`/auth/login`, { email, password });
};

export const signUp = async (username: string, email: string, password: string) => {
  return await $api.post<AuthInterface>(`/auth/signup`, { username, email, password });
};

export const logout = async () => {
  return await $api.post<AuthInterface>(`/auth/logout`);
};

export const checkAuth = async () => {
  try {
    const url = process.env.REACT_APP_API_URL;
    const response = await axios.get<AuthInterface>(`${url}/auth/refresh`, {
      withCredentials: true,
    });
    localStorage.setItem('token', response.data.accessToken);
    return response || null;
  } catch (e) {}
};
