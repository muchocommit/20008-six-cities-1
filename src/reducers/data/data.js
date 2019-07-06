import {ActionType} from '../../data';

const initialState = {
  city: 0,
  cities: [],
  offers: [],
  currentOffers: [],
  cityNames: [],
  filterParam: ``
};

const Operation = {
  loadCities: (cities = null) => (dispatch, _getState, api) => {
    if (cities) {

      return dispatch(ActionCreator.loadCities(cities));
    }
    return api.get(`/hotels`)
      .then((response) => {

        if (response) {

          return dispatch(ActionCreator.loadCities(response.data));
        }
        throw response;
      });
  },

  addBookMark: ({bookMarkIndex, isFavorite}) =>
    (dispatch, _getState, api) => {

    isFavorite = +!isFavorite;
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
  },

  updateOffers: (offers) => {
    return {
      type: ActionType.UPDATE_OFFERS,
      payload: offers
    }
  },

  updateCurrentOffers: (currentOffers) => {
    return {
      type: ActionType.UPDATE_CURRENT_OFFERS,
      payload: currentOffers
    }
  },

  filterParam: (filterParam) => {
    return {
      type: ActionType.FILTER_PARAM,
      payload: filterParam
    }
  },


  updateCityNames: (cityNames) => {
    return {
      type: ActionType.UPDATE_CITY_NAMES
    }
  }
};

const getOfferById = (array, id) => {
  return array.map((it) => {

    return it.find((item) => item.id === id);

  }).filter((it) => it !== void (0));
};

const getOffersByCityName = (array, name) => {
  return array.find((city) => {

    return city.filter((offers) => {
      return offers.city.name === name;
    })
  })
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

const groupFavoriteOffersByCityName = (array) => {
  const arrayConcatenated = array.reduce((acc, it) => acc.concat(it));

  return groupByPropertyName(arrayConcatenated, `city`);
};

const getLocations = (offers) => {
  return offers.map((it) => {
    return {id: it.id, location: it.location};
  });
};

const getPureLocations = (array) => array.map((it) =>
  [it.location.latitude, it.location.longitude]);

const accumulateLocationsFromArray = (array) => {
  return array.reduce((acc, val) => {

    const latitude = (acc.latitude + val[0]);
    const longitude = (acc.longitude + val[1]);

    return Object.assign({}, acc, {latitude, longitude});
  }, {latitude: 0, longitude: 0})
};

const getLocationMean = (accumulatedObject, arrayLength) => {
  const latitude = accumulatedObject.latitude / arrayLength;
  const longitude = accumulatedObject.longitude / arrayLength;

  return Object.assign({}, accumulatedObject, {latitude, longitude});
};

const getLocationsCoordinates = (locationObject) =>
  [locationObject.location.latitude, locationObject.location.longitude];

const sortOffersByCityName = (namesArray, [...citiesArray]) => {

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

    case ActionType.UPDATE_OFFERS:
      return Object.assign({}, state, {
        offers: action.payload
      });

    case ActionType.UPDATE_CURRENT_OFFERS:
      console.log(state);
      return Object.assign({}, state, {
        currentOffers: action.payload
      });

    case ActionType.UPDATE_CITY_NAMES:
      return Object.assign({}, state, {
        cityNames: action.payload
      });

    case ActionType.FILTER_PARAM:
      return Object.assign({}, state, {
        filterParam: action.payload
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
  getPureLocations,
  getOfferById,
  getOffersByCityName,
  getLocationMean,
  accumulateLocationsFromArray,
  ActionCreator,
  Operation,
  reducer
};

