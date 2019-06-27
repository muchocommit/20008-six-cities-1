import {ActionType} from './../../data';

const initialState = {
  isAuthorizationRequired: true,
  credentials: {}
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
  sendCredentials: (submitData) => (dispatch, _getState, api) => {
    return api.post(`/login`, submitData)
      .then((response) => {
        if (response === 400) {
          dispatch(ActionCreator.sendCredentials({id: null}));
          dispatch(ActionCreator.requireAuthorization(true));
        } else {

          dispatch(ActionCreator.sendCredentials(response.data));
          dispatch(ActionCreator.requireAuthorization(false));
        }
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
  Operation
};
