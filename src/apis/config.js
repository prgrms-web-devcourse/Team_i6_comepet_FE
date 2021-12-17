import axios from 'axios';
import { getCookie } from '@/utils/cookie';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const CONTENT_TYPE = 'application/json';
const userToken = getCookie('token');
const AUTH_TOKEN = (userToken && `Bearer ${userToken}`) || '';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = CONTENT_TYPE;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
