import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../context/theme/ThemeContext";

const ToastNotification = () => {
  const { toastNotification, onHideToastNotification } =
    useContext(ThemeContext);

  if (!toastNotification) {
    return null;
  }

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      open={true}
      onClose={onHideToastNotification}
    >
      <Alert
        onClose={onHideToastNotification}
        severity={toastNotification.severity}
        sx={{ width: "100%" }}
      >
        {toastNotification.message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
