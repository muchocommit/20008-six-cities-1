import {TOP_RATING} from '../../data';

export const getRating = (rating) => {
  return +(rating / TOP_RATING * 100).toFixed(0);
};

