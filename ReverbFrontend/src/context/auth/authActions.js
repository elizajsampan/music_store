import AuthActionTypes from "./authActionTypes";

export const setAuthToken = (jwt) => ({
  type: AuthActionTypes.SET_AUTH_TOKEN,
  payload: jwt,
});


