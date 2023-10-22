import axios from 'axios';
import { apiUrl } from '../../config/config';
import { accessToken, refreshToken } from '../../constants/storage';
import { getCookie, setCookie } from '../../utils/cookie';

const api = axios.create({
  baseURL: apiUrl,
});

const authApi = axios.create({
  baseURL: apiUrl,
});

authApi.interceptors.request.use(
  async (config) => {
    let accessTokenNew = localStorage.getItem('token');
  
    
    if (!accessTokenNew) {
      if (accessTokenNew) {
       
        accessTokenNew = accessTokenNew;
      } else {
        window.location = "/login";
      }
    }

    config.headers.common.Authorization = `Bearer ${accessTokenNew}`;
    return config;
  },
  (err) => {
    console.error(err);
    return Promise.reject(err);
  },
);

export { api, authApi };
