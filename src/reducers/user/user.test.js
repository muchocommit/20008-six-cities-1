import {ActionType} from './../../data';
import {
  ActionCreator,
  reducer} from './user';

describe(`UserReducer works correctly`, () => {
  it(`Returns initial state if undefined state is provided with empty object`, () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthorizationRequired: true,
      credentials: {}
    });
  });

  it(`Returns modified initial state if action type with payload is provided for isAuthorizationRequired`, () => {
    expect(reducer(undefined, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: false
    })).toEqual({
      isAuthorizationRequired: false,
      credentials: {}});
  });

  it(`Returns modified initial state if action type with payload is provided for credentials`, () => {
    expect(reducer(undefined, {
      type: ActionType.SEND_CREDENTIALS,
      payload: {id: 1}
    })).toEqual({
      isAuthorizationRequired: true,
      credentials: {id: 1}});
  });

  it(`Returns modified state if action type with payload is provided for Authorization`, () => {
    expect(reducer({isAuthorizationRequired: false, credentials: {}}, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: true
    })).toEqual({
      isAuthorizationRequired: true,
      credentials: {}});
  });
});

describe(`ActionCreator in UserReducer works correctly`, () => {
  it(`Returns object with action type`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: true
    });
    expect(ActionCreator.sendCredentials({id: 2})).toEqual({
      type: ActionType.SEND_CREDENTIALS,
      payload: {id: 2}
    });
  });
});
