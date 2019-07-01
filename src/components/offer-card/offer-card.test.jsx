import React from 'react';
import OfferCard from './offer-card.jsx';

import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';

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

  const tree = renderer.create(
      <MemoryRouter>
        <OfferCard
          offer={offer}
          mouseOverHandler={handler}
          index={index}
          isFavorite={false}>
        </OfferCard>
      </MemoryRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
