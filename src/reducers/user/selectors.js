import {NameSpace} from './../name-space';

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationAttempt = (state) => {
  return state[NAME_SPACE].isAuthorizationFailed;
};

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].isAuthorizationRequired;
};

export const getCredentials = (state) => {
  return state[NAME_SPACE].credentials;
};

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};

export const getCommentsDeployAttempt = (state) => {
  return state[NAME_SPACE].isCommentsDeployFailed;
};
