import axios from 'axios';

export const createAPI = () => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;

  };
  const onFail = (err) => {
    return err.response.status;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
