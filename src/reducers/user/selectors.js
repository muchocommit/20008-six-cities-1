import {NameSpace} from './../name-space';

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export const getCredentials = (state) => {
  return state[NAME_SPACE].credentials;
};
