import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';

it(`App correctly renders after relaunch`, () => {

  const tree = renderer
    .create(<App
      names={
        [
          `Comfortable flat in Amsterdam city center`,
          `Nice place to watch sunrise`, `Quiet apartments in the bay area`
        ]
      }
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
