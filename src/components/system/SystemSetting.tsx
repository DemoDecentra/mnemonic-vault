// mui
import Box from "@mui/material/Box";
// react
import type { FC } from "react";
// components
import ThemeMenu from "./ThemeMenu";
import LanguageMenu from "./LanguageMenu";
// theme
import type { ThemeMode } from "../../theme";

interface SystemSettingProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

const SystemSetting: FC<SystemSettingProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
    >
      <ThemeMenu currentTheme={currentTheme} onThemeChange={onThemeChange} />
      <LanguageMenu />
    </Box>
  );
};

export default SystemSetting;
