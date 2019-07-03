import {createSelector} from "reselect";
import {NameSpace} from './../name-space';
import {sortOffersByCityName} from './data';

const NAME_SPACE = NameSpace.DATA;

export const getCityNames = (array) => [...new Set(array.map((it) => it[`city`].name))];

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

      offers.map((offer, index) => {
        offer.cityName = cityNames[index];

        return offer;
      });

      return {cityNames, offers};
    }
);

