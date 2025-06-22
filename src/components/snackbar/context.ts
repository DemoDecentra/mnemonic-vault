import { createContext, useContext } from "react";
import type { AlertColor } from "@mui/material/Alert";

const DEFAULT_SEVERITY: AlertColor = "success";

interface SnackbarAlertContextProps {
  open: boolean;
  message: string;
  severity: AlertColor;
  openSnackbarAlert: (message: string, severity?: AlertColor) => void;
  closeSnackbarAlert: () => void;
}

export const SnackbarAlertContext = createContext<
  SnackbarAlertContextProps | undefined
>(undefined);

export const useSnackbarAlert = () => {
  const context = useContext(SnackbarAlertContext);
  if (!context) {
    throw new Error(
      "useSnackbarAlert must be used within a SnackbarAlertProvider"
    );
  }
  return context;
};

export { DEFAULT_SEVERITY };
