import React from 'react';
import Enzyme, {mount} from 'enzyme/build';
import Adapter from 'enzyme-adapter-react-16/build';
import OfferCard from './offer-card.jsx';

Enzyme.configure({adapter: new Adapter()});

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
}

it(`Should work correctly on button click`, () => {
  const handler = jest.fn();
  const {offer} = mock;
  const index = 2;

  const app = mount(<OfferCard
    offer={offer}
    mouseOverHandler={handler}
    index={index}
  />);

  const button = app.find(`img.place-card__image`);
  button.simulate(`click`);

  app.update();
  expect(app.state(`activeCard`)).toEqual(index.toString());
});
