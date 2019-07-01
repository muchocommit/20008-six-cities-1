import React from 'react';
import renderer from 'react-test-renderer';
import OffersList from './offers-list.jsx';
import {MemoryRouter} from 'react-router-dom';

const mock = {
  offers: [
    {
      "city": {
        "name": `Some City`,
        "location": {
          "latitude": 50.938361,
          "longitude": 6.959974,
          "zoom": 13
        }
      },
      "preview_image": `some/image`,
      "images": [
        `someimage`,
        `yet-another-image`,
      ],
      "title": `The house among whee `,
      "is_favorite": false,
      "is_premium": false,
      "rating": 4.5,
      "type": `nest`,
      "bedrooms": 1,
      "max_adults": 4,
      "price": 163,
      "goods": [
        `Washer`,
        `Breakfast`,
        `Laptop friendly workspace`
      ],
      "host": {
        "id": 25,
        "name": `Angelica`,
        "is_pro": true,
        "avatar_url": `img/avatar-angelica.jpg`
      },
      "description": `This is a place for the people who like to blah`,
      "location": {
        "latitude": 50.945361,
        "longitude": 6.962974,
        "zoom": 16
      },
      "id": 1
    },

    {
      "city": {
        "name": `Some City`,
        "location": {
          "latitude": 50.938361,
          "longitude": 6.959974,
          "zoom": 13
        }
      },
      "preview_image": `some/image`,
      "images": [
        `someimage`,
        `yet-another-image`,
      ],
      "title": `The house among whee `,
      "is_favorite": false,
      "is_premium": false,
      "rating": 4.5,
      "type": `nest`,
      "bedrooms": 1,
      "max_adults": 4,
      "price": 163,
      "goods": [
        `Washer`,
        `Breakfast`,
        `Laptop friendly workspace`
      ],
      "host": {
        "id": 25,
        "name": `Angelica`,
        "is_pro": true,
        "avatar_url": `img/avatar-angelica.jpg`
      },
      "description": `This is a place for the people who like to blah`,
      "location": {
        "latitude": 50.945361,
        "longitude": 6.962974,
        "zoom": 16
      },
      "id": 1
    },
  ]
};

it(`Offers-list correctly render after relaunch`, () => {

  const {offers} = mock;
  const tree = renderer
    .create(
      <MemoryRouter>
      <OffersList
      activateItem={jest.fn()}
      offers={offers}/>
      </MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
