import React from 'react';
import renderer from 'react-test-renderer';
import {App} from '../app/app.jsx';

const mock = {
  cities: {cityNames: [`Cologne`, `Paris`],

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
          "latitude": 50.965361,
          "longitude": 6.972974,
          "zoom": 16
        },
        "id": 1
      },

      {
        "city": {
          "name": `Some City`,
          "location": {
            "latitude": 52.968361,
            "longitude": 8.959974,
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
          "latitude": 41.945361,
          "longitude": 2.962974,
          "zoom": 16
        },
        "id": 2
      },
    ]}
};

it(`App correctly renders after relaunch`, () => {

  const {cities} = mock;
  const tree = renderer
    .create(<App
      cities={cities}
      city={0}
      isAuthorizationRequired={true}
      onAuthorizationScreenSubmit={jest.fn()}
      onHandleTabClick={jest.fn()}
      bodyElement={document.createElement(`body`)}
      renderScreen={jest.fn()}
      renderHeader={jest.fn()}
    />, {
      createNodeMock: () => {
        const el = document.createElement(`div`);
        el.id = `map`;
        el.style.height = `100%`;

        return el;
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
