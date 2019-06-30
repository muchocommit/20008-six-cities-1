import {ActionType} from './../../data';
import {Redirect} from 'react-router-dom';
import React from 'react';

const initialState = {
  isAuthorizationRequired: false,
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
  checkAuth: () => {
    return (dispatch, _getState, api) => {
      return api
        .get(`/login`)
        .then((response) => {
          if (response.status === 200) {

            dispatch(ActionCreator.sendCredentials(response.data));
          } else {

            dispatch(ActionCreator.requireAuthorization(true));
          }
        });
    };
  },

  sendCredentials: (submitData) => {

    return (dispatch, _getState, api) => {

      console.log({submitData}, {dispatch}, {_getState}, {api})

      return api.post(`/login`, submitData)
        .then((response) => {
          if (response.status === 200) {

            dispatch(ActionCreator.sendCredentials(response.data));
            return <Redirect to="/"/>;

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
