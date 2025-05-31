import http from '../axios';
const baseURL = import.meta.env.VITE_APP_API_URL;

export const register = async (data, params, headers) =>
  await http.post(`${baseURL}/users/register`, data, params, headers);

export const login = async (data, params, headers) =>
  await http.post(`${baseURL}/users/login`, data, { params, headers });

export const logout = async (data, params, headers) =>
  await http.post(`${baseURL}/users/logout`, data, { params, headers });

export const getMe = async (params, headers) =>
  await http.get(`${baseURL}/users/me`, { params, headers });
