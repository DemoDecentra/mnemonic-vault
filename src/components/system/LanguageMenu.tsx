// mui
import TranslateIcon from "@mui/icons-material/Translate";
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

const LanguageMenu: FC = () => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <Box>
      <Tooltip title={t("systemSetting.changeLanguage")}>
        <IconButton
          color="inherit"
          onClick={handleClick}
          aria-controls="language-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          aria-label={t("systemSetting.changeLanguage")}
        >
          <TranslateIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="language-menu"
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
        <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
        <MenuItem onClick={() => changeLanguage("ja")}>日本語</MenuItem>
        <MenuItem onClick={() => changeLanguage("zh")}>中文</MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageMenu;
