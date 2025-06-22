// mui
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// react
import type { FC } from "react";
// i18next
import { useTranslation } from "react-i18next";
// components
import BufferValueView from "./BufferValueView";
import Box from "@mui/material/Box";

interface SeedViewProps {
  seed: Uint8Array;
  showPassphrase: boolean;
  passphrase: string;
  setPassphrase: (passphrase: string) => void;
}

const SeedView: FC<SeedViewProps> = ({
  seed,
  showPassphrase,
  passphrase,
  setPassphrase,
}) => {
  const { t } = useTranslation();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{t("title.seed")}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: "flex", width: "100%" }}>
        <TextField
          variant="outlined"
          label={t("seed.passphrase")}
          type={showPassphrase ? "text" : "password"}
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          sx={{ width: "280px" }}
        />
        <Box sx={{ ml: 2, width: "100%" }}>
          <BufferValueView
            label={t("seed.generatedSeed")}
            buffer={seed}
            radix={"hexical"}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SeedView;
