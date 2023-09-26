import { createSelector } from "reselect";

const selectThemeSlice = (state) => state.theme;

export const selectIsDarkMode = createSelector(
  [selectThemeSlice],
  (themeSlice) => themeSlice.isDarkMode
);

export const selectToastConfig = createSelector(
  [selectThemeSlice],
  (themeSlice) => themeSlice.toastConfig
);
