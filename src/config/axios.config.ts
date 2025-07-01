import axios from 'axios';

/**
 * @description axios instance with baseURL. everywhere in our application we will be using this instance for data fetching.
 */
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { accept: 'application/json', 'content-type': 'application/json' },
  withCredentials: true,
});
