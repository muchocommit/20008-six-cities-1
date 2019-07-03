import {ActionType} from './../../data';
import {
  ActionCreator,
  reducer} from './user';

describe(`UserReducer works correctly`, () => {
  it(`Returns initial state if undefined state is provided with empty object`, () => {
    expect(reducer(undefined, {})).toEqual({
      comments: [],
      isAuthorizationFailed: false,
      isAuthorizationRequired: false,
      isCommentsDeployFailed: false,
      credentials: {
        [`avatar_url`]: ``,
        email: ``,
        id: null,
        [`is_pro`]: false,
        name: ``
      },
    });
  });

  it(`Returns modified initial state if action type with payload is provided for isAuthorizationFailed`, () => {
    expect(reducer(undefined, {
      type: ActionType.AUTHORIZATION_FAILED,
      payload: false
    })).toEqual({
      comments: [],
      isAuthorizationFailed: false,
      isAuthorizationRequired: false,
      isCommentsDeployFailed: false,
      credentials: {
        [`avatar_url`]: ``,
        email: ``,
        id: null,
        [`is_pro`]: false,
        name: ``}
    });
  });


  it(`Returns modified initial state if action type with payload is provided for credentials`, () => {
    expect(reducer(undefined, {
      type: ActionType.SEND_CREDENTIALS,
      payload: {id: 1}
    })).toEqual({
      comments: [],
      isAuthorizationFailed: false,
      isAuthorizationRequired: false,
      credentials: {id: 1},
      isCommentsDeployFailed: false});
  });

  it(`Returns modified state if action type with payload is provided for Authorization`, () => {
    expect(reducer({isAuthorizationFailed: false, isAuthorizationRequired: false, credentials: {}}, {
      type: ActionType.AUTHORIZATION_FAILED,
      payload: true
    })).toEqual({
      isAuthorizationFailed: true,
      isAuthorizationRequired: false,
      credentials: {}});
  });
});

describe(`ActionCreator in UserReducer works correctly`, () => {
  it(`Returns object with action type`, () => {
    expect(ActionCreator.isAuthorizationFailed(true)).toEqual({
      type: ActionType.AUTHORIZATION_FAILED,
      payload: true
    });
    expect(ActionCreator.sendCredentials({id: 2})).toEqual({
      type: ActionType.SEND_CREDENTIALS,
      payload: {id: 2}
    });
  });
});
