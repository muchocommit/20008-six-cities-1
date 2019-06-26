import {getOffersByCityName} from './selectors';

describe(`Selector functions work as expected`, () => {
  it(`getOffersByCityName should offers by cityName provided from citiesArray`, () => {
    expect(getOffersByCityName(`Paris`, [
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
    ])).toEqual([
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
    ]);
  });
});

