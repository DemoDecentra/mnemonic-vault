// mui
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
// react
import type { FC } from "react";
// i18next
import { useTranslation } from "react-i18next";
// components
import BufferValueView from "./BufferValueView";
import type { BufferValueViewProps } from "./BufferValueView";

interface EntropyDisplayProps {
  entropy: Uint8Array;
}

const EntropyDisplay: FC<EntropyDisplayProps> = ({ entropy }) => {
  const { t } = useTranslation();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">
          {t("title.entropy", { entropyBits: entropy.length * 8 })}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {(
          [
            {
              label: t("radix.hexical"),
              buffer: entropy,
              radix: "hexical",
            },
            {
              label: t("radix.decimal"),
              buffer: entropy,
              radix: "decimal",
            },
            {
              label: t("radix.binary"),
              buffer: entropy,
              radix: "binary",
            },
          ] as BufferValueViewProps[]
        ).map(({ label, buffer, radix }) => (
          <BufferValueView
            key={label}
            label={label}
            buffer={buffer}
            radix={radix}
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default EntropyDisplay;
