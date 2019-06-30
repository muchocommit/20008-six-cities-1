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

const Operation = {
  checkAuth: () => {
    return (dispatch, _getState) => {

      // console.log(_getState())
    };
  },

  sendCredentials: (submitData, history) => {

    return (dispatch, _getState, api) => {

      return api.post(`/login`, submitData)
        .then((response) => {
          if (response.status === 200) {

            return response.data;
          } else {

            dispatch(ActionCreator.sendCredentials({}));
            dispatch(ActionCreator.requireAuthorization(true));
          }
        });
    };

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
  Operation
};
