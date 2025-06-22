// mui
import { ThemeProvider, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
// react
import { useEffect, useMemo, useState } from "react";
// components
import App from "./App";
import { SnackbarProvider } from "./components/snackbar";
// theme
import type { EffectiveThemeMode, ThemeMode } from "./theme";
import {
  defaultTheme,
  getStoredTheme,
  getTheme,
  setStoredTheme,
} from "./theme";

export const ThemeWrapper = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<ThemeMode>(defaultTheme);

  // Initialize theme from localStorage
  useEffect(() => {
    setMode(getStoredTheme());
  }, []);

  // Get the effective theme based on mode and system preference
  const effectiveMode: EffectiveThemeMode =
    mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode;
  const theme = useMemo(() => getTheme(effectiveMode), [effectiveMode]);

  const handleThemeChange = (newMode: ThemeMode) => {
    setMode(newMode);
    setStoredTheme(newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <App onThemeChange={handleThemeChange} currentTheme={effectiveMode} />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default ThemeWrapper;
