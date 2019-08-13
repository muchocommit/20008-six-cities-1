import moment from 'moment';

import {ActionType} from './../../data';

const initialState = {
  // Auth is failed on login POST
  // attempt and error is displayed
  isBookMarkAdditionFailed: false,
  isAuthorizationFailed: false,
  // The page is forbidden
  isAuthorizationRequired: false,
  isCommentsDeployFailed: false,
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
  setBookMarkAdditionFailure: (status) => {
    return {
      type: ActionType.BOOKMARK_ADDITION_FAILED,
      payload: status
    };
  },

  setAuthorizationRequired: (status) => {
    return {
      type: ActionType.AUTHORIZATION_REQUIRED,
      payload: status
    };
  },

  setAuthorizationFailed: (status) => {
    return {
      type: ActionType.AUTHORIZATION_FAILED,
      payload: status,
    };
  },

  getCommentsDeployAttempt: (status) => {
    return {
      type: ActionType.COMMENTS_DEPLOY_FAILED,
      payload: status
    };
  },

  setCredentials: (status) => {
    return {
      type: ActionType.SET_CREDENTIALS,
      payload: status
    };
  },

  getComments: (status) => {
    return {
      type: ActionType.GET_COMMENTS,
      payload: status
    };
  },

  resetCommentsDeploy: () => {
    return {
      type: ActionType.RESET_COMMENTS_DEPLOY,
      payload: false
    };
  }
};

const getTimeStampFromUTCString = (stamp) =>
  moment(`${stamp}`).utc().format(`x`);

const getDateFromUTCString = (string) =>
  moment(`${string}`).utc().format(`YYYY-MM-DD`);

const getMonthYearFromUTCString = (string) =>
  moment(`${string}`).utc().format(`MMMM YYYY`);


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
  postComments: ({submitData, hotelId}) => {
    return (dispatch, _getState, api) => {

      return api.post(`/comments/${hotelId}`, submitData)
        .then((response) => {
          if (response.status === 200) {

            return response.data;
          }

          // Response with code 400 (Bad request)
          // is thrown
          throw response;
        });
    };
  },

  getComments: (hotelId) => {
    return (dispatch, _getState, api) => {
      return api.get(`/comments/${hotelId}`)
        .then((response) => {

          if (response.status === 200) {
            return response.data;
          }

          throw response;
        });
    };
  },

  setCredentials: (submitData) =>
    (dispatch, _getState, api) => {
      return api.post(`/login`, submitData)
        .then((response) => {

          localStorage.setItem(`credentials`,
            JSON.stringify(response.data));

          return response.data;
        });
    },

  checkAuth: () => {
    return (dispatch, _getState, api) => {

      return api
        .get(`/login`)
        .then((response) => {

          return response.data;
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

    case ActionType.SET_CREDENTIALS:
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
      });

    case ActionType.COMMENTS_DEPLOY_FAILED:
      return Object.assign({}, state, {
        isCommentsDeployFailed: action.payload
      });

    case ActionType.RESET_COMMENTS_DEPLOY:
      return Object.assign({}, state, {
        isCommentsDeployFailed: action.payload
      });

    case ActionType.BOOKMARK_ADDITION_FAILED:
      return Object.assign({}, state, {
        isBookMarkAdditionFailed: action.payload
      });


  }

  return state;
};

export {
  ActionCreator,
  reducer,
  Operation,
  getCredentials,
  getDateFromUTCString,
  getMonthYearFromUTCString,
  getTimeStampFromUTCString
};
