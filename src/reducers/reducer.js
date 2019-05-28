const initialState = {
  city: 0
};

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: `CHANGE_CITY`,
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
  if (action.type) {
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
  getOffers
};
