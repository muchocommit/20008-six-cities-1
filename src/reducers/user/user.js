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
  }
};

const Operation = {
  sendCredentials: (submitData) =>
    (dispatch, _getState, api) => {
      return api.post(`/login`, submitData)
        .then((response) => {
          if (response.status === 200) {

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
  }

  return state;
};

export {
  ActionCreator,
  reducer,
  Operation
};
