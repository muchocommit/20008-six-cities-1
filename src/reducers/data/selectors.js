import {createSelector} from 'reselect';
import {NameSpace} from './../name-space';
import {sortOffersByCityName} from './data';
import {SortingParams} from '../../data';

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

export const getCurrentOffersDefault = (state) => {
  return state[NAME_SPACE].currentOffersDefault;
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

export const getCurrentCityOffers = (cities, city) => {
  const cityNames = getCityNamesDistinct(cities);
  const offers = sortOffersByCityName(cityNames, cities);

  return offers.map((offer, index) => {
    offer.cityName = cityNames[index];

    return offer;
  })[city];
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
    getFilterParam,

    (cities, city, filterParam) => {

      if (cities.length > 0) {

        switch (filterParam) {

          case SortingParams.LOW_TO_HIGH:
            return getCurrentCityOffers(cities, city).sort((a, b) => a.price - b.price);

          case SortingParams.HIGH_TO_LOW:
            return getCurrentCityOffers(cities, city).sort((a, b) => b.price - a.price);

          case SortingParams.TOP_RATED:
            return getCurrentCityOffers(cities, city).sort((a, b) => b.rating - a.rating);

          case SortingParams.POPULAR:
            return getCurrentCityOffers(cities, city);
        }
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
