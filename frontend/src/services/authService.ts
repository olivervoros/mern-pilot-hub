import axios from 'axios';

interface Headers {
  'Content-Type'?: string;
  [key: string]: string | undefined;
}

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

const login = (userData: string, headers: Headers) =>
  api.post('/login', userData, { headers });

const register = (newUserData: string, headers: Headers) =>
  api.post('/users', newUserData, { headers });

export { login, register };
