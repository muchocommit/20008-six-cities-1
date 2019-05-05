import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Card} from './card.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`Should work correctly on button click`, () => {
  const handler = jest.fn();

  const app = shallow(<Card
    name={`Eine schone Raum`}
    clickHandler={handler}
  />);

  const startButton = app.find(`a.place-card__link`);
  startButton.simulate(`click`);

  expect(handler).toHaveBeenCalledTimes(1);
});
