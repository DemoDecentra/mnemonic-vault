import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";

export type ThemeMode = "light" | "dark" | "system";
export type EffectiveThemeMode = "light" | "dark";

const getDesignTokens = (mode: EffectiveThemeMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode colors
          background: {
            default: "#f0f7fa", // Very light blue-gray
            paper: "#ffffff",
          },
          primary: {
            main: "#1976d2", // Strong blue
            light: "#63a4ff",
            dark: "#004ba0",
            contrastText: "#ffffff",
          },
          secondary: {
            main: "#2e7d32", // Deep green
            light: "#60ad5e",
            dark: "#005005",
            contrastText: "#ffffff",
          },
          text: {
            primary: "#1a237e", // Dark blue
            secondary: "#1b5e20", // Dark green
          },
        }
      : {
          // Dark mode colors
          background: {
            default: "#0a1929", // Dark blue-gray
            paper: "#132f4c", // Slightly lighter blue-gray
          },
          primary: {
            main: "#90caf9", // Light blue
            light: "#c3fdff",
            dark: "#5d99c6",
            contrastText: "#000000",
          },
          secondary: {
            main: "#81c784", // Light green
            light: "#b2fab4",
            dark: "#519657",
            contrastText: "#000000",
          },
          text: {
            primary: "#e3f2fd", // Very light blue
            secondary: "#c8e6c9", // Very light green
          },
        }),
  },
});

export const getTheme = (mode: EffectiveThemeMode): Theme => {
  return createTheme(getDesignTokens(mode));
};

export const defaultTheme: ThemeMode = "system";

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") return defaultTheme;
  return (localStorage.getItem("theme") as ThemeMode) || defaultTheme;
};

export const setStoredTheme = (theme: ThemeMode) => {
  localStorage.setItem("theme", theme);
};
