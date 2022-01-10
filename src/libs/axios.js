import axios from 'axios';
import { storage } from 'src/utils/storage';

const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8080';

const _http = axios.create({
  baseURL: `${url}/api/v1`,
  // timeout: 2000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: ''
  }
});

// Add a request interceptor
_http.interceptors.request.use(
  config => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Must return config
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_http.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default _http;
