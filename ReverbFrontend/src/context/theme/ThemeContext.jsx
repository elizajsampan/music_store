import { createTheme } from "@mui/material";
import { lime } from "@mui/material/colors";
import { createContext, useCallback, useReducer } from "react";
import {
  hideToastNotification,
  showToastNotification,
  toggleDarkMode,
} from "./themeActions";
import themeReducer from "./themeReducer";

export const ThemeContext = createContext({
  theme: null,
  isDarkMode: false,
  toggleDarkMode: () => {},
  toastNotification: null,
  onShowToastNotification: () => {},
  onHideToastNotification: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [{ isDarkMode, toastNotification }, dispatch] = useReducer(
    themeReducer,
    {
      isDarkMode: false,
      toastNotification: null,
    }
  );

  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        light: "#9c4dc0",
        main: "#9c4dca",
        dark: "#38006b",
        contrastText: "#fff",
      },
      secondary: {
        light: "#5472d3",
        main: "#0d47a1",
        dark: "#002171",
        contrastText: "#fff",
      },
    },
  });

  const onToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const onShowToastNotification = useCallback((toastConfig) => {
    dispatch(showToastNotification(toastConfig));
  }, []);

  const onHideToastNotification = useCallback(() => {
    dispatch(hideToastNotification());
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode: onToggleDarkMode,
        theme,
        onShowToastNotification,
        onHideToastNotification,
        toastNotification,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
