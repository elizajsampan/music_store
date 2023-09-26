import UserActionTypes from "./userActionTypes";

export const setUser = (user) => ({
  type: UserActionTypes.SET_USER,
  payload: user,
});

export const editUser = (editedUser) => {
  return {
    type: UserActionTypes.EDIT_USER,
    payload: editedUser,
  };
};
