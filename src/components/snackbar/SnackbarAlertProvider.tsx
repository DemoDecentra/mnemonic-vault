import { useState } from "react";
import type { ReactNode } from "react";
import { SnackbarAlertContext, DEFAULT_SEVERITY } from "./context";
import type { AlertColor } from "@mui/material/Alert";

export function SnackbarAlertProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState(DEFAULT_SEVERITY);

  const openSnackbarAlert = (
    msg: string,
    sev: AlertColor = DEFAULT_SEVERITY
  ) => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const closeSnackbarAlert = () => {
    setOpen(false);
  };

  return (
    <SnackbarAlertContext.Provider
      value={{
        open,
        message,
        severity,
        openSnackbarAlert,
        closeSnackbarAlert,
      }}
    >
      {children}
    </SnackbarAlertContext.Provider>
  );
}
