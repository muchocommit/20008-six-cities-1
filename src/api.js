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

    // Need to return err.response in order to
    // Handle it
    return err.response;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};
