import axios from "axios";
import { ACCESS_TOKEN } from "./consts";

//baseURL: This sets the base URL for all HTTP requests made with this Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//api.interceptors.request.use(): This method adds an interceptor to the Axios
//instance that will run before each request is sent.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
