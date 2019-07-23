import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.tsx';

const mock = {
  names: [`Manila`, `Delhi`, `Abu Dhabi`, `Burkina Faso`, `Kaya`],
  incorrectNames: [0, 1, 4, 5, `New York`]
};

it(`CitiesList renders correctly after launch`, () => {
  const {names} = mock;

  const tree = renderer
    .create(<CitiesList
      activateItem={jest.fn()}
      isActiveItem={() => true}
      cityNames={names}
      handleTabClick={jest.fn()}
    />, {
      createNodeMock: () => {
        return {};
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
