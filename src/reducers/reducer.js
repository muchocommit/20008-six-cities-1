import {ActionType} from '../data';

const initialState = {
  city: 0,
  cities: [],
  isAuthorizationRequired: false
};

const Operation = {
  loadCities: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.loadCities(response.data));
      });
  },
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
  },

  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: status,
    };
  },
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

    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
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
