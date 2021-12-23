import axios from 'axios';
import { getCookie, removeCookie } from '@/utils/cookie';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const CONTENT_TYPE = 'application/json';
const TOKEN = getCookie('token');
const AUTH_TOKEN = (TOKEN && `Bearer ${TOKEN}`) || '';

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
    const detailCode = error.response.data.code;
    const isExpiredToken = detailCode === 903;

    if (isExpiredToken) {
      axios.defaults.headers.common['Authorization'] = '';
      removeCookie('token');
      return;
    }

    return Promise.reject(error);
  }
);

export default axios;
