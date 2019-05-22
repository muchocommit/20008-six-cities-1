import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';

const mock = {
  offers: [
    {
      mark: `Poor Quality`,
      name: `Dirty and cold`,
      src: `test.jpg`,
      type: `Hangover suite`,
      ratings: [
        1, 3, 4, 5, 5
      ],
      price: {
        period: `night`,
        value: 110
      },
      location: [
        52.369553943508, 4.85309666406198
      ]
    },
    {
      mark: `Premium`,
      name: `Wood and stone place`,
      src: `test1.jpg`,
      type: `Apartment`,
      ratings: [
        1, 2, 4, 2
      ],
      price: {
        period: `night`,
        value: 100
      },
      location: [
        52.369553943508, 4.85309666406198
      ]
    },
    {
      mark: `Poorest quality`,
      name: `Lo and behold`,
      src: `test2.jpg`,
      type: `Pigeon hole`,
      ratings: [
        2, 3, 4, 2, 4, 1, 5, 5
      ],
      price: {
        period: `night`,
        value: 90
      },
      location: [
        52.369553943508, 4.85309666406198
      ]
    },
    {
      mark: `Premium`,
      name: `Nice flat in the city center`,
      src: `img/apartment-01.jpg`,
      type: `Apartment`,
      ratings: [
        3, 5, 4, 3, 4, 5, 5, 5
      ],
      price: {
        period: `night`,
        value: 115
      },
      location: [
        52.369553943508, 4.85309666406198
      ]
    }
  ]
};

it(`App correctly renders after relaunch`, () => {

  const {offers} = mock;
  const tree = renderer
    .create(<App
      offers={offers}/>, {
      createNodeMock: () => {
        const el = document.createElement(`div`);
        el.id = `map`;
        el.style.height = `400px`;

        return el;
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
