import {
  getOffers,
  reducer,
  ActionCreator
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
  it(`Returns initial state if none provided`, () => {
    expect(reducer(undefined, {})).toEqual({city: 0});
  });

  it(`Returns modified initial state if action type with payload is provided`, () => {
    expect(reducer(undefined, {
      type: `CHANGE_CITY`,
      payload: 3
    })).toEqual({city: 3});
  });

  it(`Returns modified state if action type with payload is provided`, () => {
    expect(reducer({city: 0}, {
      type: `CHANGE_CITY`,
      payload: 3
    })).toEqual({city: 3});
  });
});

describe(`ActionCreator works correctly`, () => {
  it(`Returns object with action type and city index`, () => {
    expect(ActionCreator.changeCity(1000)).toEqual({
      type: `CHANGE_CITY`,
      payload: 1000
    });
  });
});
