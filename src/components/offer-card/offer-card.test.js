import React from 'react';
import renderer from 'react-test-renderer';
import OfferCard from './offer-card.jsx';


const mock = {
  offer: {
    id: 5,
    [`is_premium`]: true,
    [`preview_image`]: `some/src`,
    price: 10012313,
    type: `apartment`,
    rating: 4.5,
    title: `Mock title`
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
