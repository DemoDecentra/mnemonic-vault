// mui
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
// react
import type { FC } from "react";
// i18next
import { useTranslation } from "react-i18next";
// library
import { deflate } from "pako";
import { Box } from "@mui/material";

interface SecurityMeterProps {
  entropy: Uint8Array;
}
type SecurityColor = "error" | "warning" | "success";

interface SecurityProfile {
  color: SecurityColor;
  messageKey: string;
  score: number;
}

const DANGEROUS_THRESHOLD = 60;
const SAFE_THRESHOLD = 80;

const getSecurityProfile = (entropy: Uint8Array): SecurityProfile => {
  const compressed = deflate(entropy, { level: 9 });
  const adjustParameter = entropy.length === 16 ? 1.56 : 1.34;
  const score = Math.min(
    100,
    Number(
      ((compressed.length / entropy.length / adjustParameter) * 100).toFixed(0)
    )
  );
  if (score < DANGEROUS_THRESHOLD) {
    return {
      color: "error",
      messageKey: "security.dangerous",
      score,
    };
  }
  if (score < SAFE_THRESHOLD) {
    return {
      color: "warning",
      messageKey: "security.warning",
      score,
    };
  }
  return {
    color: "success",
    messageKey: "security.safe",
    score,
  };
};

const SecurityMeter: FC<SecurityMeterProps> = ({ entropy }) => {
  const { t } = useTranslation();

  const { messageKey, score, color } = getSecurityProfile(entropy);
  // const score = 20;
  // const color = "error";

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box
          sx={{
            alignItems: "center",
            width: "90%",
          }}
        >
          <Typography variant="subtitle1">{t("title.security")}</Typography>
          <LinearProgress
            variant="determinate"
            value={score}
            color={color}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Gauge
            value={score}
            startAngle={-110}
            endAngle={110}
            height={80}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: theme.typography.body2.fontSize,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: theme.palette.error.main,
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
          <Gauge
            value={score}
            startAngle={-110}
            endAngle={110}
            height={80}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: theme.typography.body2.fontSize,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: theme.palette.success.main,
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
          <Gauge
            value={score}
            startAngle={-110}
            endAngle={110}
            height={80}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: theme.typography.body2.fontSize,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: theme.palette.success.main,
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
        </Box>

        <Alert severity={color}>{t(messageKey)}</Alert>
      </AccordionDetails>
    </Accordion>
  );
};

export default SecurityMeter;
