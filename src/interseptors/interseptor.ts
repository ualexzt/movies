import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const $api = axios.create({ withCredentials: true, baseURL: apiUrl });
$api.interceptors.request.use((config) => {
  (config.headers ?? {}).Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $api;
