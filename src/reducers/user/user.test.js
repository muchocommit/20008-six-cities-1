import {ActionType} from './../../data';
import {
  ActionCreator,
  reducer} from './user';

describe(`UserReducer works correctly`, () => {
  it(`Returns initial state if undefined state is provided with empty object`, () => {
    expect(reducer(undefined, {})).toEqual({
      isAuthorizationRequired: false});
  });

  it(`Returns modified initial state if action type with payload is provided`, () => {
    expect(reducer(undefined, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: true
    })).toEqual({
      isAuthorizationRequired: true});
  });

  it(`Returns modified state if action type with payload is provided`, () => {
    expect(reducer({isAuthorizationRequired: true}, {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: false
    })).toEqual({
      isAuthorizationRequired: false});
  });
});

describe(`ActionCreator in UserReducer works correctly`, () => {
  it(`Returns object with action type and city index`, () => {
    expect(ActionCreator.requireAuthorization(true)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: true
    });
  });
});
