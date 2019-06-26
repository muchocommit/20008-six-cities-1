import {ActionType} from '../../data';

const initialState = {
  city: 0,
  cities: []
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
    };
  },

  changeCity: (city) => {
    return {
      type: ActionType.CHANGE_CITY,
      payload: city
    };
  }
};

const getLocations = (offers) => {
  return offers.map((it) => it.location);
};

const getLocationsCoordinates = (locations) => {
  return locations.map((it) => [it.latitude, it.longitude]);
};

const sortOffersByCityName = (namesArray, citiesArray) => {
  return namesArray.map((name) => {

    return citiesArray.filter((it) => {
      return name === it.city.name;
    });
  });
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
  sortOffersByCityName,
  getLocations,
  getLocationsCoordinates,
  ActionCreator,
  Operation,
  reducer
};

