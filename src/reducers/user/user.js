import moment from 'moment';

import {ActionType} from './../../data';

const initialState = {
  // Auth is failed on login POST
  // attempt and error is displayed
  isAuthorizationFailed: false,
  // The page is forbidden
  isAuthorizationRequired: false,
  credentials: {
    [`avatar_url`]: ``,
    email: ``,
    id: null,
    [`is_pro`]: false,
    name: ``
  },
  comments: []
};

const ActionCreator = {
  isAuthorizationRequired: (status) => {
    return {
      type: ActionType.AUTHORIZATION_REQUIRED,
      payload: status
    }
  },

  isAuthorizationFailed: (status) => {
    return {
      type: ActionType.AUTHORIZATION_FAILED,
      payload: status,
    };
  },

  sendCredentials: (status) => {
    return {
      type: ActionType.SEND_CREDENTIALS,
      payload: status
    };
  },

  getComments: (status) => {
    return {
      type: ActionType.GET_COMMENTS,
      payload: status
    };
  }
};

const getDateFromUTCString = (string) =>
  moment(`${string}`).utc().format(`YYYY-MM-DD`);

const getMonthYearFromUTCString = (string) =>
  moment("2019-06-27T20:42:47.038Z").utc().format("MMMM YYYY");

const formatDateIntoUTCString = () =>
  moment().utc().format(`YYYY-MM-DD[T]HH:mm:ss.SSS[Z]`);


const getCredentials = (credentials) => {
  const localCredentials = JSON.parse(
    localStorage.getItem(`credentials`));

  for (let key in credentials) {

    if (localCredentials && localCredentials.hasOwnProperty(key)) {
      credentials[key] = localCredentials[key];
    }
  }

  return credentials;
};

const Operation = {
  getComments: (hotelId) => {
    return (dispatch, _getState, api) => {
      return api.get(`/comments/${hotelId}`)
        .then((response) => {

          if (response.status === 200) {
            return response.data;
          }

          throw response;
        })
    }
  },

  sendCredentials: (submitData) =>
    (dispatch, _getState, api) => {
      return api.post(`/login`, submitData)
        .then((response) => {
          if (response.status === 200) {


            localStorage.setItem(`credentials`, JSON.stringify(response.data));
            return response.data;
          }

          // Response with code 400 (Bad request)
          // is thrown
          throw response;
        });
    },

  checkAuth: () => {
    return (dispatch, _getState, api) => {
      return api
        .get(`/login`)
        .then((response) => {

          if (response.status === 200) {
            return response.data;
          }

          // Response with code 403 (Forbidden)
          // is thrown
          throw response;
        });
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHORIZATION_FAILED:
      return Object.assign({}, state, {
        isAuthorizationFailed: action.payload,
      });

    case ActionType.SEND_CREDENTIALS:
      return Object.assign({}, state, {
        credentials: action.payload
      });

    case ActionType.AUTHORIZATION_REQUIRED:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload
      });

    case ActionType.GET_COMMENTS:
      return Object.assign({}, state, {
        comments: action.payload
      })
  }

  return state;
};

export {
  ActionCreator,
  reducer,
  Operation,
  getCredentials,
  getDateFromUTCString,
  formatDateIntoUTCString,
  getMonthYearFromUTCString
};
