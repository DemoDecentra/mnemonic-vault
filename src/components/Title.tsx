// mui
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// react
import type { FC } from "react";
// i18next
import { useTranslation } from "react-i18next";

const Title: FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        my: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Avatar
          src="img/wallet-icon.png"
          sx={{ mr: 2, width: 50, height: 50 }}
        />
        <Typography variant="h3" component="h1" color="primary">
          <b>{t("title.app")}</b>
        </Typography>
      </Box>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }} color="secondary">
        <i>{t("title.welcome")}</i>
      </Typography>
    </Box>
  );
};

export default Title;
