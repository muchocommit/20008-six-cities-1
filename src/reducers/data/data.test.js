import MockAdapter from 'axios-mock-adapter';
import {createAPI} from './../../api';
import {ActionType} from './../../data';
import {
  sortOffersByCityName,
  getLocations,
  getLocationsCoordinates,
  ActionCreator,
  Operation,
  reducer
} from './data';


describe(`Business logic is correct`, () => {
  it(`getLocations returns array of locations`, () => {
    expect(getLocations([
      {
        "city": {
          "name": `Some City`,
          "location": {
            "latitude": 50.938361,
            "longitude": 6.959974,
            "zoom": 13
          }
        },
        "some-key": `Bla`,
        "description": `This is a place for the people who like to blah`,
        "location": {
          "latitude": 31.945361,
          "longitude": 3.962974,
          "zoom": 16
        },
        "id": 1
      },

      {
        "city": {
          "name": `Some City#2`,
          "location": {
            "latitude": 50.938361,
            "longitude": 6.959974,
            "zoom": 13
          }
        },
        "preview_image": `some/image`,
        "description": `This is a place for the people who like to blah`,
        "location": {
          "latitude": 32.945361,
          "longitude": 4.962974,
          "zoom": 16
        },
        "id": 2
      },
    ])).toEqual([
      {
        "latitude": 31.945361,
        "longitude": 3.962974,
        "zoom": 16
      },
      {
        "latitude": 32.945361,
        "longitude": 4.962974,
        "zoom": 16
      },
    ]);
  });

  it(`getLocationsCoordinates returns array of arrays coordinates`, () => {

    expect(getLocationsCoordinates([
      {
        "latitude": 31.945361,
        "longitude": 3.962974,
        "zoom": 16
      },
      {
        "latitude": 32.945361,
        "longitude": 4.962974,
        "zoom": 16
      },
    ])).toEqual([
      [31.945361, 3.962974], [32.945361, 4.962974]
    ]);
  });

  it(`sortOffersByCityName recursively filters citiesArray with respect to each name in namesArray`, () => {
    expect(sortOffersByCityName([
      `Cologne`, `Brussels`, `Hamburg`, `Dusseldorf`, `Paris`, `Amsterdam`],
    [
      {
        "city": {
          "name": `Cologne`,
          "location": {
            "latitude": 50.938361,
            "longitude": 6.959974,
            "zoom": 13
          }
        },
        "id": 1
      },
      {
        "city": {
          "name": `Brussels`,
          "location": {
            "latitude": 50.846557,
            "longitude": 4.351697,
            "zoom": 13
          }
        },
        "id": 2
      },

      {
        "city": {
          "name": `Hamburg`,
          "location": {
            "latitude": 53.550341,
            "longitude": 10.000654,
            "zoom": 13
          }
        },
        "id": 4
      },

      {
        "city": {
          "name": `Dusseldorf`,
          "location": {
            "latitude": 51.225402,
            "longitude": 6.776314,
            "zoom": 13
          }
        },
        "id": 6
      },
      {
        "city": {
          "name": `Paris`,
          "location": {
            "latitude": 48.85661,
            "longitude": 2.351499,
            "zoom": 13
          }
        },
        "id": 15
      },
      {
        "city": {
          "name": `Amsterdam`,
          "location": {
            "latitude": 52.37454,
            "longitude": 4.897976,
            "zoom": 13
          }
        },
        "id": 17
      },

      {
        "city": {
          "name": `Cologne`,
          "location": {
            "latitude": 50.938361,
            "longitude": 6.959974,
            "zoom": 13
          }
        },
        "id": 20
      },
      {
        "city": {
          "name": `Amsterdam`,
          "location": {
            "latitude": 52.37454,
            "longitude": 4.897976,
            "zoom": 13
          }
        },
        "id": 21
      },
      {
        "city": {
          "name": `Brussels`,
          "location": {
            "latitude": 50.846557,
            "longitude": 4.351697,
            "zoom": 13
          }
        },
        "id": 22
      },
      {
        "city": {
          "name": `Paris`,
          "location": {
            "latitude": 48.85661,
            "longitude": 2.351499,
            "zoom": 13
          }
        },
        "id": 23
      }
    ]
    )).toEqual(
        [
          [
            {
              "city": {
                "name": `Cologne`,
                "location": {
                  "latitude": 50.938361,
                  "longitude": 6.959974,
                  "zoom": 13
                }
              },
              "id": 1
            },
            {
              "city": {
                "name": `Cologne`,
                "location": {
                  "latitude": 50.938361,
                  "longitude": 6.959974,
                  "zoom": 13
                }
              },
              "id": 20
            }
          ],
          [
            {
              "city": {
                "name": `Brussels`,
                "location": {
                  "latitude": 50.846557,
                  "longitude": 4.351697,
                  "zoom": 13
                }
              },
              "id": 2
            },
            {
              "city": {
                "name": `Brussels`,
                "location": {
                  "latitude": 50.846557,
                  "longitude": 4.351697,
                  "zoom": 13
                }
              },
              "id": 22
            }
          ],
          [
            {
              "city": {
                "name": `Hamburg`,
                "location": {
                  "latitude": 53.550341,
                  "longitude": 10.000654,
                  "zoom": 13
                }
              },
              "id": 4
            }
          ],
          [
            {
              "city": {
                "name": `Dusseldorf`,
                "location": {
                  "latitude": 51.225402,
                  "longitude": 6.776314,
                  "zoom": 13
                }
              },
              "id": 6
            }
          ],
          [
            {
              "city": {
                "name": `Paris`,
                "location": {
                  "latitude": 48.85661,
                  "longitude": 2.351499,
                  "zoom": 13
                }
              },
              "id": 15
            },
            {
              "city": {
                "name": `Paris`,
                "location": {
                  "latitude": 48.85661,
                  "longitude": 2.351499,
                  "zoom": 13
                }
              },
              "id": 23
            }
          ],
          [
            {
              "city": {
                "name": `Amsterdam`,
                "location": {
                  "latitude": 52.37454,
                  "longitude": 4.897976,
                  "zoom": 13
                }
              },
              "id": 17
            },
            {
              "city": {
                "name": `Amsterdam`,
                "location": {
                  "latitude": 52.37454,
                  "longitude": 4.897976,
                  "zoom": 13
                }
              },
              "id": 21
            }
          ]
        ]
    );
  });
});

describe(`DataReducer works correctly`, () => {
  it(`Returns initial state if undefined state is provided with empty object`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: 0,
      cities: []});
  });

  it(`Returns modified initial state if action type with payload is provided`, () => {
    expect(reducer(undefined, {
      type: ActionType.CHANGE_CITY,
      payload: 3
    })).toEqual({
      city: 3,
      cities: []});
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

    const api = createAPI();
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

describe(`ActionCreator in DataReducer works correctly`, () => {
  it(`Returns object with action type and city index`, () => {
    expect(ActionCreator.changeCity(1000)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: 1000
    });
  });
});


