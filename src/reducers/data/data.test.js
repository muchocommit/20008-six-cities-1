import MockAdapter from 'axios-mock-adapter';
import {createAPI} from './../../api';
import {ActionType} from './../../data';
import {
  sortOffersByCityName,
  getLocations,
  getLocationsCoordinates,
  ActionCreator,
  Operation,
  reducer
} from './data';


describe(`Business logic is correct`, () => {
  it(`getLocations returns array of locations`, () => {
    expect(getLocations([
      {
        "city": {
          "name": `Some City`,
          "location": {
            "latitude": 50.938361,
            "longitude": 6.959974,
            "zoom": 13
          }
        },
        "some-key": `Bla`,
        "description": `This is a place for the people who like to blah`,
        "location": {
          "latitude": 31.945361,
          "longitude": 3.962974,
          "zoom": 16
        },
        "id": 1
      },

      {
        "city": {
          "name": `Some City#2`,
          "location": {
            "latitude": 50.938361,
            "longitude": 6.959974,
            "zoom": 13
          }
        },
        "preview_image": `some/image`,
        "description": `This is a place for the people who like to blah`,
        "location": {
          "latitude": 32.945361,
          "longitude": 4.962974,
          "zoom": 16
        },
        "id": 2
      },
    ])).toEqual([
      {
        "latitude": 31.945361,
        "longitude": 3.962974,
        "zoom": 16
      },
      {
        "latitude": 32.945361,
        "longitude": 4.962974,
        "zoom": 16
      },
    ]);
  });

  it(`getLocationsCoordinates returns array of arrays coordinates`, () => {

    expect(getLocationsCoordinates([
      {
        "latitude": 31.945361,
        "longitude": 3.962974,
        "zoom": 16
      },
      {
        "latitude": 32.945361,
        "longitude": 4.962974,
        "zoom": 16
      },
    ])).toEqual([
      [31.945361, 3.962974], [32.945361, 4.962974]
    ]);
  });

  it(`sortOffersByCityName recursively filters citiesArray with respect to each name in namesArray`, () => {
    expect(sortOffersByCityName([
      `Cologne`, `Brussels`, `Hamburg`, `Dusseldorf`, `Paris`, `Amsterdam`],
    [
      {
        "city": {
          "name": `Cologne`,
          "location": {
            "latitude": 50.938361,
            "longitude": 6.959974,
            "zoom": 13
          }
        },
        "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
        "images": [
          `https://es31-server.appspot.com/six-cities/static/hotel/17.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`
        ],
        "title": `The house among olive `,
        "is_favorite": false,
        "is_premium": false,
        "rating": 4.5,
        "type": `apartment`,
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
          "name": `Angelina`,
          "is_pro": true,
          "avatar_url": `img/avatar-angelina.jpg`
        },
        "description": `This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.`,
        "location": {
          "latitude": 50.945361,
          "longitude": 6.962974,
          "zoom": 16
        },
        "id": 1
      },
      {
        "city": {
          "name": `Brussels`,
          "location": {
            "latitude": 50.846557,
            "longitude": 4.351697,
            "zoom": 13
          }
        },
        "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
        "images": [
          `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`
        ],
        "title": `The Pondhouse - A Magical Place`,
        "is_favorite": false,
        "is_premium": true,
        "rating": 2.3,
        "type": `house`,
        "bedrooms": 3,
        "max_adults": 4,
        "price": 452,
        "goods": [
          `Laptop friendly workspace`,
          `Towels`,
          `Air conditioning`,
          `Baby seat`,
          `Breakfast`,
          `Washer`
        ],
        "host": {
          "id": 25,
          "name": `Angelina`,
          "is_pro": true,
          "avatar_url": `img/avatar-angelina.jpg`
        },
        "description": `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.`,
        "location": {
          "latitude": 50.833557,
          "longitude": 4.374696999999999,
          "zoom": 16
        },
        "id": 2
      },

      {
        "city": {
          "name": `Hamburg`,
          "location": {
            "latitude": 53.550341,
            "longitude": 10.000654,
            "zoom": 13
          }
        },
        "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
        "images": [
          `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`
        ],
        "title": `Loft Studio in the Central Area`,
        "is_favorite": false,
        "is_premium": false,
        "rating": 2.7,
        "type": `room`,
        "bedrooms": 1,
        "max_adults": 2,
        "price": 250,
        "goods": [
          `Breakfast`,
          `Laptop friendly workspace`
        ],
        "host": {
          "id": 25,
          "name": `Angelina`,
          "is_pro": true,
          "avatar_url": `img/avatar-angelina.jpg`
        },
        "description": `Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.`,
        "location": {
          "latitude": 53.534341000000005,
          "longitude": 9.998654,
          "zoom": 16
        },
        "id": 4
      },

      {
        "city": {
          "name": `Dusseldorf`,
          "location": {
            "latitude": 51.225402,
            "longitude": 6.776314,
            "zoom": 13
          }
        },
        "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
        "images": [
          `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/17.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`
        ],
        "title": `The Joshua Tree House`,
        "is_favorite": false,
        "is_premium": false,
        "rating": 4.7,
        "type": `apartment`,
        "bedrooms": 4,
        "max_adults": 5,
        "price": 211,
        "goods": [
          `Air conditioning`,
          `Breakfast`,
          `Laptop friendly workspace`,
          `Washer`,
          `Baby seat`,
          `Towels`
        ],
        "host": {
          "id": 25,
          "name": `Angelina`,
          "is_pro": true,
          "avatar_url": `img/avatar-angelina.jpg`
        },
        "description": `I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!`,
        "location": {
          "latitude": 51.222402,
          "longitude": 6.786314,
          "zoom": 16
        },
        "id": 6
      },
      {
        "city": {
          "name": `Paris`,
          "location": {
            "latitude": 48.85661,
            "longitude": 2.351499,
            "zoom": 13
          }
        },
        "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
        "images": [
          `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`
        ],
        "title": `Perfectly located Castro`,
        "is_favorite": false,
        "is_premium": false,
        "rating": 3.7,
        "type": `hotel`,
        "bedrooms": 4,
        "max_adults": 9,
        "price": 144,
        "goods": [
          `Breakfast`,
          `Baby seat`,
          `Washer`,
          `Dishwasher`,
          `Laptop friendly workspace`,
          `Air conditioning`,
          `Fridge`,
          `Towels`
        ],
        "host": {
          "id": 25,
          "name": `Angelina`,
          "is_pro": true,
          "avatar_url": `img/avatar-angelina.jpg`
        },
        "description": `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.`,
        "location": {
          "latitude": 48.83861,
          "longitude": 2.350499,
          "zoom": 16
        },
        "id": 15
      },
      {
        "city": {
          "name": `Amsterdam`,
          "location": {
            "latitude": 52.37454,
            "longitude": 4.897976,
            "zoom": 13
          }
        },
        "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
        "images": [
          `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/17.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`
        ],
        "title": `House in countryside`,
        "is_favorite": false,
        "is_premium": false,
        "rating": 4.3,
        "type": `house`,
        "bedrooms": 3,
        "max_adults": 4,
        "price": 632,
        "goods": [
          `Washer`,
          `Breakfast`,
          `Laptop friendly workspace`
        ],
        "host": {
          "id": 25,
          "name": `Angelina`,
          "is_pro": true,
          "avatar_url": `img/avatar-angelina.jpg`
        },
        "description": `A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.`,
        "location": {
          "latitude": 52.35754,
          "longitude": 4.9179759999999995,
          "zoom": 16
        },
        "id": 17
      },

      {
        "city": {
          "name": `Cologne`,
          "location": {
            "latitude": 50.938361,
            "longitude": 6.959974,
            "zoom": 13
          }
        },
        "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
        "images": [
          `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/17.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`
        ],
        "title": `Canal View Prinsengracht`,
        "is_favorite": false,
        "is_premium": true,
        "rating": 4.2,
        "type": `house`,
        "bedrooms": 2,
        "max_adults": 9,
        "price": 652,
        "goods": [
          `Laptop friendly workspace`,
          `Breakfast`,
          `Baby seat`,
          `Washer`,
          `Air conditioning`
        ],
        "host": {
          "id": 25,
          "name": `Angelina`,
          "is_pro": true,
          "avatar_url": `img/avatar-angelina.jpg`
        },
        "description": `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.`,
        "location": {
          "latitude": 50.960361,
          "longitude": 6.967974,
          "zoom": 16
        },
        "id": 20
      },
      {
        "city": {
          "name": `Amsterdam`,
          "location": {
            "latitude": 52.37454,
            "longitude": 4.897976,
            "zoom": 13
          }
        },
        "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
        "images": [
          `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`
        ],
        "title": `The house among olive `,
        "is_favorite": false,
        "is_premium": true,
        "rating": 3.9,
        "type": `house`,
        "bedrooms": 4,
        "max_adults": 7,
        "price": 941,
        "goods": [
          `Washer`,
          `Baby seat`,
          `Laptop friendly workspace`,
          `Air conditioning`,
          `Breakfast`
        ],
        "host": {
          "id": 25,
          "name": `Angelina`,
          "is_pro": true,
          "avatar_url": `img/avatar-angelina.jpg`
        },
        "description": `Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.`,
        "location": {
          "latitude": 52.37554,
          "longitude": 4.9019759999999994,
          "zoom": 16
        },
        "id": 21
      },
      {
        "city": {
          "name": `Brussels`,
          "location": {
            "latitude": 50.846557,
            "longitude": 4.351697,
            "zoom": 13
          }
        },
        "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
        "images": [
          `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/17.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`
        ],
        "title": `Amazing and Extremely Central Flat`,
        "is_favorite": false,
        "is_premium": false,
        "rating": 2.7,
        "type": `house`,
        "bedrooms": 1,
        "max_adults": 4,
        "price": 263,
        "goods": [
          `Baby seat`,
          `Breakfast`,
          `Air conditioning`,
          `Washer`,
          `Laptop friendly workspace`
        ],
        "host": {
          "id": 25,
          "name": `Angelina`,
          "is_pro": true,
          "avatar_url": `img/avatar-angelina.jpg`
        },
        "description": `Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.`,
        "location": {
          "latitude": 50.835556999999994,
          "longitude": 4.354697,
          "zoom": 16
        },
        "id": 22
      },
      {
        "city": {
          "name": `Paris`,
          "location": {
            "latitude": 48.85661,
            "longitude": 2.351499,
            "zoom": 13
          }
        },
        "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
        "images": [
          `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
          `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`
        ],
        "title": `The house among olive `,
        "is_favorite": false,
        "is_premium": false,
        "rating": 4.1,
        "type": `room`,
        "bedrooms": 1,
        "max_adults": 2,
        "price": 242,
        "goods": [
          `Baby seat`,
          `Dishwasher`,
          `Washer`,
          `Laptop friendly workspace`,
          `Coffee machine`,
          `Air conditioning`,
          `Breakfast`,
          `Cable TV`,
          `Towels`,
          `Fridge`,
          `Washing machine`
        ],
        "host": {
          "id": 25,
          "name": `Angelina`,
          "is_pro": true,
          "avatar_url": `img/avatar-angelina.jpg`
        },
        "description": `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.`,
        "location": {
          "latitude": 48.861610000000006,
          "longitude": 2.340499,
          "zoom": 16
        },
        "id": 23
      }
    ]
    )).toEqual(
        [
          [
            {
              "city": {
                "name": `Cologne`,
                "location": {
                  "latitude": 50.938361,
                  "longitude": 6.959974,
                  "zoom": 13
                }
              },
              "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
              "images": [
                `https://es31-server.appspot.com/six-cities/static/hotel/17.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`
              ],
              "title": `The house among olive `,
              "is_favorite": false,
              "is_premium": false,
              "rating": 4.5,
              "type": `apartment`,
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
                "name": `Angelina`,
                "is_pro": true,
                "avatar_url": `img/avatar-angelina.jpg`
              },
              "description": `This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.`,
              "location": {
                "latitude": 50.945361,
                "longitude": 6.962974,
                "zoom": 16
              },
              "id": 1
            },
            {
              "city": {
                "name": `Cologne`,
                "location": {
                  "latitude": 50.938361,
                  "longitude": 6.959974,
                  "zoom": 13
                }
              },
              "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
              "images": [
                `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/17.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`
              ],
              "title": `Canal View Prinsengracht`,
              "is_favorite": false,
              "is_premium": true,
              "rating": 4.2,
              "type": `house`,
              "bedrooms": 2,
              "max_adults": 9,
              "price": 652,
              "goods": [
                `Laptop friendly workspace`,
                `Breakfast`,
                `Baby seat`,
                `Washer`,
                `Air conditioning`
              ],
              "host": {
                "id": 25,
                "name": `Angelina`,
                "is_pro": true,
                "avatar_url": `img/avatar-angelina.jpg`
              },
              "description": `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.`,
              "location": {
                "latitude": 50.960361,
                "longitude": 6.967974,
                "zoom": 16
              },
              "id": 20
            }
          ],
          [
            {
              "city": {
                "name": `Brussels`,
                "location": {
                  "latitude": 50.846557,
                  "longitude": 4.351697,
                  "zoom": 13
                }
              },
              "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
              "images": [
                `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`
              ],
              "title": `The Pondhouse - A Magical Place`,
              "is_favorite": false,
              "is_premium": true,
              "rating": 2.3,
              "type": `house`,
              "bedrooms": 3,
              "max_adults": 4,
              "price": 452,
              "goods": [
                `Laptop friendly workspace`,
                `Towels`,
                `Air conditioning`,
                `Baby seat`,
                `Breakfast`,
                `Washer`
              ],
              "host": {
                "id": 25,
                "name": `Angelina`,
                "is_pro": true,
                "avatar_url": `img/avatar-angelina.jpg`
              },
              "description": `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.`,
              "location": {
                "latitude": 50.833557,
                "longitude": 4.374696999999999,
                "zoom": 16
              },
              "id": 2
            },
            {
              "city": {
                "name": `Brussels`,
                "location": {
                  "latitude": 50.846557,
                  "longitude": 4.351697,
                  "zoom": 13
                }
              },
              "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
              "images": [
                `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/17.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`
              ],
              "title": `Amazing and Extremely Central Flat`,
              "is_favorite": false,
              "is_premium": false,
              "rating": 2.7,
              "type": `house`,
              "bedrooms": 1,
              "max_adults": 4,
              "price": 263,
              "goods": [
                `Baby seat`,
                `Breakfast`,
                `Air conditioning`,
                `Washer`,
                `Laptop friendly workspace`
              ],
              "host": {
                "id": 25,
                "name": `Angelina`,
                "is_pro": true,
                "avatar_url": `img/avatar-angelina.jpg`
              },
              "description": `Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.`,
              "location": {
                "latitude": 50.835556999999994,
                "longitude": 4.354697,
                "zoom": 16
              },
              "id": 22
            }
          ],
          [
            {
              "city": {
                "name": `Hamburg`,
                "location": {
                  "latitude": 53.550341,
                  "longitude": 10.000654,
                  "zoom": 13
                }
              },
              "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
              "images": [
                `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`
              ],
              "title": `Loft Studio in the Central Area`,
              "is_favorite": false,
              "is_premium": false,
              "rating": 2.7,
              "type": `room`,
              "bedrooms": 1,
              "max_adults": 2,
              "price": 250,
              "goods": [
                `Breakfast`,
                `Laptop friendly workspace`
              ],
              "host": {
                "id": 25,
                "name": `Angelina`,
                "is_pro": true,
                "avatar_url": `img/avatar-angelina.jpg`
              },
              "description": `Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.`,
              "location": {
                "latitude": 53.534341000000005,
                "longitude": 9.998654,
                "zoom": 16
              },
              "id": 4
            }
          ],
          [
            {
              "city": {
                "name": `Dusseldorf`,
                "location": {
                  "latitude": 51.225402,
                  "longitude": 6.776314,
                  "zoom": 13
                }
              },
              "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
              "images": [
                `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/17.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`
              ],
              "title": `The Joshua Tree House`,
              "is_favorite": false,
              "is_premium": false,
              "rating": 4.7,
              "type": `apartment`,
              "bedrooms": 4,
              "max_adults": 5,
              "price": 211,
              "goods": [
                `Air conditioning`,
                `Breakfast`,
                `Laptop friendly workspace`,
                `Washer`,
                `Baby seat`,
                `Towels`
              ],
              "host": {
                "id": 25,
                "name": `Angelina`,
                "is_pro": true,
                "avatar_url": `img/avatar-angelina.jpg`
              },
              "description": `I am happy to welcome you to my apartment in the city center! Three words: location, cosy and chic!`,
              "location": {
                "latitude": 51.222402,
                "longitude": 6.786314,
                "zoom": 16
              },
              "id": 6
            }
          ],
          [
            {
              "city": {
                "name": `Paris`,
                "location": {
                  "latitude": 48.85661,
                  "longitude": 2.351499,
                  "zoom": 13
                }
              },
              "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
              "images": [
                `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/10.jpg`
              ],
              "title": `Perfectly located Castro`,
              "is_favorite": false,
              "is_premium": false,
              "rating": 3.7,
              "type": `hotel`,
              "bedrooms": 4,
              "max_adults": 9,
              "price": 144,
              "goods": [
                `Breakfast`,
                `Baby seat`,
                `Washer`,
                `Dishwasher`,
                `Laptop friendly workspace`,
                `Air conditioning`,
                `Fridge`,
                `Towels`
              ],
              "host": {
                "id": 25,
                "name": `Angelina`,
                "is_pro": true,
                "avatar_url": `img/avatar-angelina.jpg`
              },
              "description": `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.`,
              "location": {
                "latitude": 48.83861,
                "longitude": 2.350499,
                "zoom": 16
              },
              "id": 15
            },
            {
              "city": {
                "name": `Paris`,
                "location": {
                  "latitude": 48.85661,
                  "longitude": 2.351499,
                  "zoom": 13
                }
              },
              "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
              "images": [
                `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/15.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`
              ],
              "title": `The house among olive `,
              "is_favorite": false,
              "is_premium": false,
              "rating": 4.1,
              "type": `room`,
              "bedrooms": 1,
              "max_adults": 2,
              "price": 242,
              "goods": [
                `Baby seat`,
                `Dishwasher`,
                `Washer`,
                `Laptop friendly workspace`,
                `Coffee machine`,
                `Air conditioning`,
                `Breakfast`,
                `Cable TV`,
                `Towels`,
                `Fridge`,
                `Washing machine`
              ],
              "host": {
                "id": 25,
                "name": `Angelina`,
                "is_pro": true,
                "avatar_url": `img/avatar-angelina.jpg`
              },
              "description": `Relax, rejuvenate and unplug in this ultimate rustic getaway experience in the country. In our beautiful screened Pondhouse, you can gaze at the stars and listen to the sounds of nature from your cozy warm bed.`,
              "location": {
                "latitude": 48.861610000000006,
                "longitude": 2.340499,
                "zoom": 16
              },
              "id": 23
            }
          ],
          [
            {
              "city": {
                "name": `Amsterdam`,
                "location": {
                  "latitude": 52.37454,
                  "longitude": 4.897976,
                  "zoom": 13
                }
              },
              "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
              "images": [
                `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/14.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/18.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/8.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/17.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`
              ],
              "title": `House in countryside`,
              "is_favorite": false,
              "is_premium": false,
              "rating": 4.3,
              "type": `house`,
              "bedrooms": 3,
              "max_adults": 4,
              "price": 632,
              "goods": [
                `Washer`,
                `Breakfast`,
                `Laptop friendly workspace`
              ],
              "host": {
                "id": 25,
                "name": `Angelina`,
                "is_pro": true,
                "avatar_url": `img/avatar-angelina.jpg`
              },
              "description": `A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.`,
              "location": {
                "latitude": 52.35754,
                "longitude": 4.9179759999999995,
                "zoom": 16
              },
              "id": 17
            },
            {
              "city": {
                "name": `Amsterdam`,
                "location": {
                  "latitude": 52.37454,
                  "longitude": 4.897976,
                  "zoom": 13
                }
              },
              "preview_image": `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
              "images": [
                `https://es31-server.appspot.com/six-cities/static/hotel/6.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/19.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/12.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/4.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/9.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/5.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/11.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/3.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/16.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/7.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/20.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/13.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/2.jpg`,
                `https://es31-server.appspot.com/six-cities/static/hotel/1.jpg`
              ],
              "title": `The house among olive `,
              "is_favorite": false,
              "is_premium": true,
              "rating": 3.9,
              "type": `house`,
              "bedrooms": 4,
              "max_adults": 7,
              "price": 941,
              "goods": [
                `Washer`,
                `Baby seat`,
                `Laptop friendly workspace`,
                `Air conditioning`,
                `Breakfast`
              ],
              "host": {
                "id": 25,
                "name": `Angelina`,
                "is_pro": true,
                "avatar_url": `img/avatar-angelina.jpg`
              },
              "description": `Peaceful studio in the most wanted area in town. Quiet house Near of everything. Completely renovated. Lovely neighbourhood, lot of trendy shops, restaurants and bars in a walking distance.`,
              "location": {
                "latitude": 52.37554,
                "longitude": 4.9019759999999994,
                "zoom": 16
              },
              "id": 21
            }
          ]
        ]
    );
  });
});

describe(`DataReducer works correctly`, () => {
  it(`Returns initial state if undefined state is provided with empty object`, () => {
    expect(reducer(undefined, {})).toEqual({
      city: 0,
      cities: []});
  });

  it(`Returns modified initial state if action type with payload is provided`, () => {
    expect(reducer(undefined, {
      type: ActionType.CHANGE_CITY,
      payload: 3
    })).toEqual({
      city: 3,
      cities: []});
  });

  it(`Returns modified state if action type with payload is provided`, () => {
    expect(reducer({city: 0}, {
      type: ActionType.CHANGE_CITY,
      payload: 3
    })).toEqual({
      city: 3});
  });

  it(`Should make a correct API call to /hotels`, () => {
    const dispatch = jest.fn();

    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = Operation.loadCities();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_CITIES,
          payload: [{fake: true}],
        });
      });
  });
});

describe(`ActionCreator in DataReducer works correctly`, () => {
  it(`Returns object with action type and city index`, () => {
    expect(ActionCreator.changeCity(1000)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: 1000
    });
  });
});


