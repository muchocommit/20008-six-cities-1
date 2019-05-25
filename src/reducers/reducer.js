import {Cities} from '../data';

const initialState = {
  city: 0
};

const ActionCreator = {
  changeCity: (city) => {
    return {
      type: `CHANGE_CITY`,
      payload: Cities[city]
    }
  }
};

const reducer = (state = initialState, action) => {
  Object.assign({}, state, {
      city: action.payload
    });

  return state;
};

export {reducer};
