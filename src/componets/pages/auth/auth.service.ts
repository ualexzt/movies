import axios from 'axios';
import { User } from '../../../types';

const apiUrl = process.env.REACT_APP_API_URL;

export const logIn = async (email: string, password: string) => {
  let user = null;
  await axios.get<User>(apiUrl + `/users?email=${email}`).then((res) => {
    if (res.data && res.data.password === password) {
      user = res.data;
    }
  });
  return user;
};

export const signUp = async (email: string, password: string) => {
  let user = {} as User;
  await axios
    .post<User>(apiUrl + '/users', { email: email, password: password })
    .then((res) => (user = res.data));
  return user;
};
