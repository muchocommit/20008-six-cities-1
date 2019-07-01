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

  addBookMark: ({bookMarkIndex, isFavorite}) =>
    (dispatch, _getState, api) => {

      return api.post(`/favorite/${bookMarkIndex}/${isFavorite}`)
      .then((response) => {

        if (response.status === 200) {
          return response.data;
        }

        throw response;
      });
    }
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

const groupByPropertyName = (objectArray, property) => {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property].name;
    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(obj);
    return acc;
  }, {});
};

const groupFavoriteOffersByCityName = (set) => {
  const arrayConcatenated = set.reduce((acc, it) => acc.concat(it));

  return groupByPropertyName(arrayConcatenated, `city`);
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

const getFavoriteOffers = (offersArray) => {
  return offersArray.map((offer) => {

    return offer.filter((it) => {
      return it[`is_favorite`] === true;
    });
  }).filter((it) => it.length > 0);
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
  getFavoriteOffers,
  groupFavoriteOffersByCityName,
  ActionCreator,
  Operation,
  reducer
};

