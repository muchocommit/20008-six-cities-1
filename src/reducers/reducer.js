const initialState = {
  city: 0,
  offers: 0
};

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: `CHANGE_CITY`,
      payload: city
    };
  },
  countOffers: (offers) => {
    return {
      type: `COUNT_OFFERS`,
      payload: offers.length
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
    case `CHANGE_CITY`:
      return Object.assign({}, state, {
        city: action.payload})

    case `COUNT_OFFERS`:
      return Object.assign({}, state, {
        offers: action.payload})

    default:
      return state;
  }
};

export {
  reducer,
  ActionCreator,
  getLocationsByCity,
  getOffersByCity,
  getOffers
};
