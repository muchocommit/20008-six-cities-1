import MockAdapter from 'axios-mock-adapter';
import {createAPI} from './../api';
import {ActionType} from '../data';
import {
  getOffers,
  reducer,
  ActionCreator,
  Operation
} from './reducer';

describe(`Business logic is correct`, () => {
  it(`getOffers returns array of offers`, () => {
    expect(getOffers([{
      city: `Paris`,
      offers: [
        {
          mark: `Pizza lover's place`,
          name: `Warm sandwiches at hand`,
          location: [
            50.837780, 4.377366
          ]
        }
      ]
    },
    {
      city: `Cologne`,
      offers: [
        {
          mark: `Sandwich house`,
          name: `Fast food and KFC`,
          location: [
            50.849326, 4.364332
          ]
        },
      ]
    }])).toEqual([
      [{
        mark: `Pizza lover's place`,
        name: `Warm sandwiches at hand`,
        location: [
          50.837780, 4.377366
        ]
      }],

      [{
        mark: `Sandwich house`,
        name: `Fast food and KFC`,
        location: [
          50.849326, 4.364332
        ]
      }],
    ]);
  });

  it(`getLocationsByCity returns array of locations`, () => {

    expect(getOffers([{
      city: `Paris`,
      offers: [
        {
          mark: `Pizza lover's place`,
          name: `Warm sandwiches at hand`,
          location: [
            50.837780, 4.377366
          ]
        }
      ]
    },

    {
      city: `Cologne`,
      offers: [
        {
          mark: `Sandwich house`,
          name: `Fast food and KFC`,
          location: [
            50.849326, 4.364332
          ]
        },
      ]
    }])[0].map((it) => it.location)).toEqual([
      [50.837780, 4.377366]
    ]);
  });

  it(`getOffersByCity returns current city offers`, () => {

    expect(getOffers([{
      city: `Paris`,
      offers: [
        {
          mark: `Pizza lover's place`,
          name: `Warm sandwiches at hand`,
          location: [
            50.837780, 4.377366
          ]
        }
      ]
    },

    {
      city: `Cologne`,
      offers: [
        {
          mark: `Sandwich house`,
          name: `Fast food and KFC`,
          location: [
            50.849326, 4.364332
          ]
        },
      ]
    }])[0]).toEqual([{
      mark: `Pizza lover's place`,
      name: `Warm sandwiches at hand`,
      location: [
        50.837780, 4.377366
      ]
    }]);
  });
});

describe(`Reducer works correctly`, () => {
  it(`Returns initial state if undefined state is provided with empty object`, () => {
    expect(reducer(undefined, {})).toEqual(
        {city: 0,
          cities: [],
          isAuthorizationRequired: false});
  });

  it(`Returns modified initial state if action type with payload is provided`, () => {
    expect(reducer(undefined, {
      type: ActionType.CHANGE_CITY,
      payload: 3
    })).toEqual({city: 3,
      cities: [],
      isAuthorizationRequired: false});
  });

  it(`Returns modified state if action type with payload is provided`, () => {
    expect(reducer({city: 0}, {
      type: ActionType.CHANGE_CITY,
      payload: 3
    })).toEqual({
      city: 3});
  });

  it(`Should make a correct API call to /hotels`, () => {
    const dispatch = jest.fn();

    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = Operation.loadCities();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_CITIES,
          payload: [{fake: true}],
        });
      });
  });
});

describe(`ActionCreator works correctly`, () => {
  it(`Returns object with action type and city index`, () => {
    expect(ActionCreator.changeCity(1000)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: 1000
    });
  });

  it(`Returns object with action type and boolean value on requireAuth call`, () => {
    expect(ActionCreator.requireAuthorization(false)).toEqual({
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: false
    });
  });
});
