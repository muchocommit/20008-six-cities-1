import React from 'react';
import renderer from 'react-test-renderer';

import Map from './map.jsx';

const mock = {
  locations: [
    [52.3909553943508, 4.85309666406198],
    [52.369553943508, 4.85309666406198],
    [52.3909553943508, 4.929309666406198],
    [52.3809553943508, 4.939309666406198]
  ]
};

it(`Map is rendered correctly`, () => {
  const {locations} = mock;

  const tree = renderer.create(<Map
    locations={locations}
    id={`map`}
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
