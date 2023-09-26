import ThemeActionTypes from "./themeActionTypes";

export const toggleDarkMode = () => ({
  type: ThemeActionTypes.TOGGLE_DARK_MODE,
});

export const showToastNotification = (toastConfiguration) => ({
  type: ThemeActionTypes.SHOW_TOAST_NOTIFICATION,
  payload: toastConfiguration,
});

export const hideToastNotification = () => ({
  type: ThemeActionTypes.HIDE_TOAST_NOTIFICATION,
});
