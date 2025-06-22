import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useSnackbarAlert } from "./context";

export const SnackbarAlert = () => {
  const { open, message, severity, closeSnackbarAlert } = useSnackbarAlert();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={3000}
      open={open}
      onClose={closeSnackbarAlert}
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
