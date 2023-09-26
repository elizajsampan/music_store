import UserActionTypes from "./userActionTypes";

const userReducer = (state, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UserActionTypes.EDIT_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
