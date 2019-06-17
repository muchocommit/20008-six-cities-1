import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';


const mock = {
  offer: {
    mark: `Downtown`,
    name: `Spartan place for saturday hangovers`,
    type: `Flat`,
    src: ``,
    ratings: [
      1, 2, 3, 2, 5, 2, 1, 5, 5
    ],
    price: {
      period: `week`,
      value: 17
    }
  }
};

it(`OfferCard renders correctly`, () => {
  const handler = jest.fn();
  const {offer} = mock;
  const index = 2;

  const tree = renderer
    .create(<OfferCard
      offer={offer}
      mouseOverHandler={handler}
      index={index}
    />).toJSON();

  expect(tree).toMatchSnapshot();
});
