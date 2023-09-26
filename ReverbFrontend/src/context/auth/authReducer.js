import AuthActionTypes from "./authActionTypes";

const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_TOKEN:
      return {
        ...state,
        jwt: action.payload,
      };
    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
