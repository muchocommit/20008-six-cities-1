import React from 'react';
import renderer from 'react-test-renderer';
import {App} from '../app/app.jsx';

const mock = {
  cities: [
    {
      city: `Paris`,
      offers: [
        {
          mark: `Pizza lover's place`,
          name: `Warm sandwiches at hand`,
          src: `img/apartment-01.jpg`,
          type: `Hut`,
          ratings: [
            3, 5, 4, 2, 4, 5, 5, 5, 2
          ],
          price: {
            period: `night`,
            value: 10
          },
          location: [
            48.886575, 2.344352
          ]
        },
        {
          mark: `Premium`,
          name: `Luxurious hotel`,
          src: `img/apartment-02.jpg`,
          type: `Suite`,
          ratings: [
            5, 5, 4, 5, 4, 5, 5, 5
          ],
          price: {
            period: `night`,
            value: 200
          },
          location: [
            48.886152, 2.338151
          ]
        },
        {
          mark: `Goth`,
          name: `Tunnel complex with millions of skeletons`,
          src: `img/apartment-02.jpg`,
          type: `Catacombs`,
          ratings: [
            5, 5, 4, 5, 4, 5, 5, 5
          ],
          price: {
            period: `night`,
            value: 1500
          },
          location: [
            48.833944, 2.333221
          ]
        }
      ]
    },

    {
      city: `Cologne`,
      offers: [
        {
          mark: `Sandwich house`,
          name: `Fast food and KFC`,
          src: `img/apartment-03.jpg`,
          type: `Apartment`,
          ratings: [
            3, 5, 4, 2, 4, 5, 5, 5
          ],
          price: {
            period: `night`,
            value: 15
          },
          location: [
            50.937279, 6.939163
          ]
        },
        {
          mark: `City centre`,
          name: `Nice flat in the city center`,
          src: `img/apartment-01.jpg`,
          type: `Apartment`,
          ratings: [
            3, 5, 4, 3, 4, 5, 5, 5
          ],
          price: {
            period: `night`,
            value: 55
          },
          location: [
            50.941802, 6.955914
          ]
        },
      ]
    },

    {
      city: `Brussels`,
      offers: [
        {
          mark: `Bureaucratic`,
          name: `Government place`,
          src: `img/apartment-01.jpg`,
          type: `Residence`,
          ratings: [
            4, 5, 4, 3, 4, 5, 5, 5
          ],
          price: {
            period: `night`,
            value: 5500
          },
          location: [
            50.837780, 4.377366
          ]
        },
        {
          mark: `Circus`,
          name: `Nice flat in the circus curtains`,
          src: `img/apartment-02.jpg`,
          type: `Entertainment`,
          ratings: [
            1, 3, 5, 5, 2, 1, 2, 2
          ],
          price: {
            period: `night`,
            value: 30
          },
          location: [
            50.849326, 4.364332
          ]
        },
      ]
    },

    {
      city: `Amsterdam`,
      offers: [
        {
          mark: `Garden`,
          name: `Botanical garden in the city centre`,
          src: `img/apartment-01.jpg`,
          type: `Museum`,
          ratings: [
            4, 5, 4, 3, 4, 5, 5, 5
          ],
          price: {
            period: `night`,
            value: 20
          },
          location: [
            52.366685, 4.907400
          ]
        },
        {
          mark: `Medium priced`,
          name: `Nice flat in the city centre`,
          src: `img/apartment-02.jpg`,
          type: `Apartment`,
          ratings: [
            4, 3, 5, 5, 4, 4, 4, 4
          ],
          price: {
            period: `night`,
            value: 60
          },
          location: [
            52.372223, 4.863275
          ]
        },
        {
          mark: `Medium priced`,
          name: `Nice flat in the south`,
          src: `img/apartment-03.jpg`,
          type: `Apartment`,
          ratings: [
            4, 3, 5, 5, 4, 3, 5, 2
          ],
          price: {
            period: `night`,
            value: 30
          },
          location: [
            52.350619, 4.876317
          ]
        },
      ]
    },

    {
      city: `Hamburg`,
      offers: [
        {
          mark: `Premium`,
          name: `Warm and cozy place in the city centre`,
          src: `img/apartment-01.jpg`,
          type: `Apartment`,
          ratings: [
            4, 5, 4, 3, 4, 3, 4, 4
          ],
          price: {
            period: `night`,
            value: 100
          },
          location: [
            53.548934, 9.999851
          ]
        },
        {
          mark: `Premium`,
          name: `Nice place to watch movies`,
          src: `img/apartment-02.jpg`,
          type: `Apartment`,
          ratings: [
            4, 3, 5, 5, 2, 4, 4, 4
          ],
          price: {
            period: `night`,
            value: 50
          },
          location: [
            53.554574, 10.012419
          ]
        },
      ]
    },

    {
      city: `Dusseldorf`,
      offers: [
        {
          mark: `Nature's best`,
          name: `Green grass at your disposal`,
          src: `img/apartment-01.jpg`,
          type: `Park`,
          ratings: [
            1, 2, 3, 3, 5, 1, 2, 2
          ],
          price: {
            period: `day`,
            value: 2
          },
          location: [
            51.207189, 6.799710
          ]
        },
        {
          mark: `Premium`,
          name: `Nice place to watch movies`,
          src: `img/apartment-02.jpg`,
          type: `Apartment`,
          ratings: [
            4, 3, 5, 5, 2, 4, 4, 4
          ],
          price: {
            period: `night`,
            value: 50
          },
          location: [
            51.232181, 6.808695
          ]
        },
      ]
    }
  ]
};

it(`App correctly renders after relaunch`, () => {

  const {cities} = mock;
  const tree = renderer
    .create(<App
      cities={cities}
      city={0}
      onHandleTabClick={jest.fn()}
    />, {
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
