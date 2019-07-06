import {createSelector} from 'reselect';
import {NameSpace} from './../name-space';
import {sortOffersByCityName} from './data';

const NAME_SPACE = NameSpace.DATA;

export const getCityNamesDistinct = (array) =>
  [...new Set(array.map((it) => it[`city`].name))];

export const getCities = (state) => {
  return state[NAME_SPACE].cities;
};

export const getCity = (state) => {
  return state[NAME_SPACE].city;
};

export const getOffersByCityName = (cityName, citiesArray) => {
  return citiesArray.filter((it) => it.city.name === cityName);
};

const getCurrentOffers = (state) => {
  return state[NAME_SPACE].currentOffers;
};

export const getOffers = (state) => {
  return state[NAME_SPACE].offers;
};

export const getCityNames = (state) => {
  return state[NAME_SPACE].cityNames;
};

export const getFilterParam = (state) => {
  return state[NAME_SPACE].filterParam;
};


export const combineOffers = createSelector(
    getCities,

    (cities) => {

      if (cities.length > 0) {
        const cityNames = getCityNamesDistinct(cities);
        const offers = sortOffersByCityName(cityNames, cities);

        return offers.map((offer, index) => {
          offer.cityName = cityNames[index];

          return offer;
        });
      }

      return [];
    }
);

export const combineCurrentOffers = createSelector(
    getCities,
    getCity,

    (cities, city) => {

      if (cities.length > 0) {

        const cityNames = getCityNamesDistinct(cities);
        const offers = sortOffersByCityName(cityNames, cities);

        return offers.map((offer, index) => {
          offer.cityName = cityNames[index];

          return offer;
        })[city];
      }

      return [];
    }
);

export const combineCityNames = createSelector(
    getCities,

    (cities) => {
      return getCityNamesDistinct(cities);
    }
);
