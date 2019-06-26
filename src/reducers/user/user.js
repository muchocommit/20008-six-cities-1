import {ActionType} from './../../data';

const initialState = {
  isAuthorizationRequired: true,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: status,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
  }

  return state;
};


export {
  ActionCreator,
  reducer,
};
