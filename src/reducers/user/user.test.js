import {ActionType} from './../../data';
import {
  ActionCreator,
  reducer} from './user';

describe(`UserReducer works correctly`, () => {
  it(`Returns initial state if undefined state is provided with empty object`, () => {
    expect(reducer(undefined, {})).toEqual({
      authorizationRequired: false,
      credentials: {
        [`avatar_url`]: ``,
        email: ``,
        id: null,
        [`is_pro`]: false,
        name: ``
      },
    });
  });

  it(`Returns modified initial state if action type with payload is provided for authorizationRequired`, () => {
    expect(reducer(undefined, {
      type: ActionType.AUTHORIZATION_REQUIRED,
      payload: false
    })).toEqual({
      authorizationRequired: false,
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
      authorizationRequired: false,
      credentials: {id: 1}});
  });

  it(`Returns modified state if action type with payload is provided for Authorization`, () => {
    expect(reducer({authorizationRequired: false, credentials: {}}, {
      type: ActionType.AUTHORIZATION_REQUIRED,
      payload: true
    })).toEqual({
      authorizationRequired: true,
      credentials: {}});
  });
});

describe(`ActionCreator in UserReducer works correctly`, () => {
  it(`Returns object with action type`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.AUTHORIZATION_REQUIRED,
      payload: true
    });
    expect(ActionCreator.sendCredentials({id: 2})).toEqual({
      type: ActionType.SEND_CREDENTIALS,
      payload: {id: 2}
    });
  });
});
