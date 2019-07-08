export const TOP_RATING = 5;

export const MapParams = {
  CITY_ZOOM: 14,
  ZOOM: 12,
  CITY: [52.38333, 4.9],
  ICON: {
    URL: `img/pin.svg`,
    SIZE: [30, 30]
  },
  ICON_FOCUS: {
    URL: `img/pin-orange.svg`,
    SIZE: [40, 40]
  },
  TILE_LAYER: {
    URL: `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`,
    OPTIONS: {
      ATTRIBUTION: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }
  }
};

export const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  LOAD_CITIES: `LOAD_CITIES`,
  AUTHORIZATION_FAILED: `AUTHORIZATION_FAILED`,
  AUTHORIZATION_REQUIRED: `AUTHORIZATION_REQUIRED`,
  SEND_CREDENTIALS: `SEND_CREDENTIALS`,
  GET_COMMENTS: `GET_COMMENTS`,
  COMMENTS_DEPLOY_FAILED: `COMMENTS_DEPLOY_FAILED`,
  RESET_COMMENTS_DEPLOY: `RESET_COMMENTS_DEPLOY`,
  UPDATE_OFFERS: `UPDATE_OFFERS`,
  UPDATE_CURRENT_OFFERS: `UPDATE_CURRENT_OFFERS`,
  UPDATE_CITY_NAMES: `UPDATE_CITY_NAMES`,
  FILTER_PARAM: `FILTER_PARAM`
};

export const SortingParams = {
  POPULAR: `Popular`,
  LOW_TO_HIGH: `Price: low to high`,
  HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`
};
