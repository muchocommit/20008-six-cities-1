import {createSelector} from "reselect";
import {NameSpace} from './../name-space';
import {sortOffersByCityName} from './data';

const NAME_SPACE = NameSpace.DATA;

const getCityNames = (cities) => [...new Set(cities.map((it) => it[`city`].name))];

export const getCities = (state) => {
  return state[NAME_SPACE].cities;
};

export const getCity = (state) => {
  return state[NAME_SPACE].city;
};

export const getOffersByCityName = (cityName, citiesArray) => {
  return citiesArray.filter((it) => it.city.name === cityName);
};

export const combineCities = createSelector(
    getCities,

    (cities) => {
      const cityNames = getCityNames(cities);
      const offers = sortOffersByCityName(cityNames, cities);

      return {cityNames, offers};
    }
);

