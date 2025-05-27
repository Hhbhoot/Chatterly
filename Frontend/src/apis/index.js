import http from '../axios';
const baseURL = import.meta.env.VITE_APP_API_URL;
console.log(baseURL);

export const register = async (data, params, headers) =>
  await http.post(`${baseURL}/users/register`, data, params, headers);
