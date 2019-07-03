export const TOP_RATING = 5;

export const MapParams = {
  ZOOM: 5,
  CITY: [52.38333, 4.9],
  ICON: {
    URL: `img/pin.svg`,
    SIZE: [30, 30]
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
  RESET_COMMENTS_DEPLOY: `RESET_COMMENTS_DEPLOY`
};
