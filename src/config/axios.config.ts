import axios from 'axios';
import { TOKEN } from '../Constants/globals.constants';

/**
 * @description axios instance with baseURL. everywhere in our application we will be using this instance for data fetching.
 */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { accept: 'application/json', 'content-type': 'application/json' },
});

/**
 * @description this request interceptor, intercepts all of our http requests made with axios instace and attaches access token in the header.
 */
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
