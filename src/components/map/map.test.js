import React from 'react';
import renderer from 'react-test-renderer';

import Map from './map.jsx';

const mock = {
  locations: [
    {
      "id": 1,
      "location": {
        "latitude": 50.950361,
        "longitude": 6.961974,
        "zoom": 16
      }
    },
    {
      "id": 10,
      "location": {
        "latitude": 50.949361,
        "longitude": 6.976974,
        "zoom": 16
      }
    },
    {
      "id": 14,
      "location": {
        "latitude": 50.913361,
        "longitude": 6.9509739999999995,
        "zoom": 16
      }
    },
    {
      "id": 15,
      "location": {
        "latitude": 50.934361,
        "longitude": 6.943974,
        "zoom": 16
      }
    },
    {
      "id": 21,
      "location": {
        "latitude": 50.918461,
        "longitude": 6.969974,
        "zoom": 16
      }
    },
    {
      "id": 26,
      "location": {
        "latitude": 50.960361,
        "longitude": 6.9509739999999995,
        "zoom": 16
      }
    },
    {
      "id": 30,
      "location": {
        "latitude": 50.957361,
        "longitude": 6.9509739999999995,
        "zoom": 16
      }
    },
    {
      "id": 32,
      "location": {
        "latitude": 50.941361,
        "longitude": 6.956974,
        "zoom": 16
      }
    },
    {
      "id": 56,
      "location": {
        "latitude": 50.932361,
        "longitude": 6.960974,
        "zoom": 16
      }
    },
    {
      "id": 69,
      "location": {
        "latitude": 50.945361,
        "longitude": 6.935974,
        "zoom": 16
      }
    },
    {
      "id": 76,
      "location": {
        "latitude": 50.947361,
        "longitude": 6.9799739999999995,
        "zoom": 16
      }
    },
    {
      "id": 79,
      "location": {
        "latitude": 50.945361,
        "longitude": 6.962974,
        "zoom": 16
      }
    },
    {
      "id": 80,
      "location": {
        "latitude": 50.932361,
        "longitude": 6.937974,
        "zoom": 16
      }
    },
    {
      "id": 92,
      "location": {
        "latitude": 50.930361,
        "longitude": 6.937974,
        "zoom": 16
      }
    }
  ]
};

it(`Map is rendered correctly`, () => {
  const {locations} = mock;

  const tree = renderer.create(<Map
    locations={locations}
    mapId={`map`}
  />, {
    createNodeMock: () => {
      const el = document.createElement(`div`);
      el.id = `map`;
      el.style.height = `400px`;

      return el;
    }
  }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
