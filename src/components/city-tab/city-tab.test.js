import React from 'react';
import renderer from 'react-test-renderer';
import CityTab from './city-tab.jsx';

it(`CityTab renders correctly after launch`, () => {

  const tree = renderer
    .create(<CityTab
      isActive={true}
      onCityTabButtonClick={jest.fn()}
      city={`Manila`}
    />, {
      createNodeMock: () => {
        return {};
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();

});
