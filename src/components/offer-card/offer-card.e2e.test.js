import React from 'react';
import Enzyme, {shallow} from 'enzyme/build';
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

  const app = shallow(<OfferCard
    offer={offer}
    mouseOverHandler={handler}
    index={1}
  />);

  const startButton = app.find(`a.place-card__link`);
  startButton.simulate(`click`);

  expect(handler).toHaveBeenCalledTimes(1);
});
