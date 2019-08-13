import axios from 'axios';
import {ApiParams} from './data';

export const createAPI = () => {
  const api = axios.create({
    baseURL: ApiParams.BASE_URL,
    timeout: ApiParams.TIME_OUT,
    withCredentials: ApiParams.WITH_CREDENTIALS,
  });

  const onSuccess = (response) => {
    return response;
  };
  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
