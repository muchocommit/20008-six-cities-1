import {TOP_RATING} from '../../data';

export const getRating = (ratings) => {
  const medianRating = ratings.reduce((acc, it) => acc + it) / ratings.length;

  return +(medianRating / TOP_RATING * 100).toFixed(2);
};
