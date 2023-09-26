import ThemeActionTypes from "./themeActionTypes";

const themeReducer = (state, action) => {
  switch (action.type) {
    case ThemeActionTypes.TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    case ThemeActionTypes.SHOW_TOAST_NOTIFICATION:
      return {
        ...state,
        toastNotification: action.payload,
      };
    case ThemeActionTypes.HIDE_TOAST_NOTIFICATION:
      return {
        ...state,
        toastNotification: null,
      };
    default:
      return state;
  }
};

export default themeReducer;
