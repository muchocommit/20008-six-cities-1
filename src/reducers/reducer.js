import {ActionType} from '../data';

const initialState = {
  city: 0,
  cities: []
};

const Operation = {
  loadCities: () => (dispatch) => {
    return fetch(`https://es31-server.appspot.com/six-cities`)
      .then((response) => response.json())
      .then((cities) => {
        dispatch(ActionCreator.loadCities(cities));
      });
  }
};

const ActionCreator = {
  loadCities: (cities) => {
    return {
      type: ActionType.LOAD_CITIES,
      payload: cities
    }
  },

  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: city
    };
  }
};

const getOffers = (cities) => {
  return cities.map((it) => it.offers);
};

const getLocationsByCity = (cities, city) => {
  return getOffers(cities)[city].map(
      (it) => it.location);
};

const getOffersByCity = (cities, city) => {
  return getOffers(cities)[city];
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case ActionType.LOAD_CITIES:
      return Object.assign({}, state, {
        cities: action.payload
      });

    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {
        city: action.payload
    });
  }

  return state;
};

export {
  reducer,
  ActionCreator,
  getLocationsByCity,
  getOffersByCity,
  getOffers,
  Operation
};
