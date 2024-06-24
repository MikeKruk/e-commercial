import axios, { InternalAxiosRequestConfig } from 'axios';
import authInterceptor from './middleware/authInterceptor';

const api = axios.create();

api.interceptors.request.use(
  authInterceptor as (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig,
);

export default api;
