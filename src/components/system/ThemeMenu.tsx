// mui
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
// react
import { useState } from "react";
import type { FC } from "react";
// i18next
import { useTranslation } from "react-i18next";
// theme
import type { ThemeMode } from "../../theme";

interface ThemeMenuProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

const ThemeMenu: FC<ThemeMenuProps> = ({ currentTheme, onThemeChange }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeSelect = (theme: ThemeMode) => {
    onThemeChange(theme);
    handleClose();
  };

  const getThemeIcon = () => {
    switch (currentTheme) {
      case "dark":
        return <DarkModeIcon />;
      case "light":
        return <LightModeIcon />;
      case "system":
      default:
        return <SettingsBrightnessIcon />;
    }
  };

  const getThemeLabel = () => {
    switch (currentTheme) {
      case "dark":
        return t("theme.dark");
      case "light":
        return t("theme.light");
      case "system":
      default:
        return t("theme.system");
    }
  };

  return (
    <Box>
      <Tooltip title={`${t("systemSetting.changeTheme")} (${getThemeLabel()})`}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          aria-label={t("systemSetting.changeTheme")}
        >
          {getThemeIcon()}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => handleThemeSelect("system")}>
          <SettingsBrightnessIcon sx={{ mr: 1 }} />
          {t("theme.system")}
        </MenuItem>
        <MenuItem onClick={() => handleThemeSelect("light")}>
          <LightModeIcon sx={{ mr: 1 }} />
          {t("theme.light")}
        </MenuItem>
        <MenuItem onClick={() => handleThemeSelect("dark")}>
          <DarkModeIcon sx={{ mr: 1 }} />
          {t("theme.dark")}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ThemeMenu;
