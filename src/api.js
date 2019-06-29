import axios from 'axios';
import {ActionCreator} from './reducers/user/user';

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/six-cities`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;

  };
  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.requireAuthorization(true));
    }
    return err.response.status;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
