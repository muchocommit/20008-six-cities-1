import {ActionType} from './../../data';

const initialState = {
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
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
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

const hydrateStateWithLocalStorage = (credentials) => {
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
  sendCredentials: (submitData) =>
    (dispatch, _getState, api) => {
      return api.post(`/login`, submitData)
        .then((response) => {
          if (response.status === 200) {

            localStorage.setItem(`credentials`, JSON.stringify(response.data));
            return response.data;
          }
          return {};
        });
    }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });

    case ActionType.SEND_CREDENTIALS:
      return Object.assign({}, state, {
        credentials: action.payload
      });
  }

  return state;
};

export {
  ActionCreator,
  reducer,
  Operation,
  hydrateStateWithLocalStorage
};
