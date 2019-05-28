const initialState = {
  city: 0
};

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: `CHANGE_CITY`,
      payload: city
    }
  }
};

const reducer = (state = initialState, action) => {
  if (action.type) {
    return Object.assign({}, state, {
      city: action.payload
    });
  }


  return state;
};

export {reducer};
