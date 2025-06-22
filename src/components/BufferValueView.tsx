// mui
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import IconCopy from "@mui/icons-material/ContentCopy";
// react
import type { FC } from "react";
// i18next
import { useTranslation } from "react-i18next";
// components
import { useSnackbarAlert } from "./snackbar";

export interface BufferValueViewProps {
  label: string;
  buffer: Uint8Array;
  radix: "hexical" | "decimal" | "binary";
  showCopy?: boolean;
}

function bufferToValue(
  buffer: Uint8Array,
  radix: "hexical" | "decimal" | "binary"
) {
  switch (radix) {
    case "hexical":
      return Array.from(buffer)
        .map((byte) => byte.toString(16).toUpperCase().padStart(2, "0"))
        .join(" ");
    case "decimal":
      return Array.from(buffer)
        .map((byte) => byte.toString(10))
        .join(" ");
    case "binary":
      return Array.from(buffer)
        .map((byte) => byte.toString(2).padStart(8, "0"))
        .join(" ");
  }
}

const BufferValueView: FC<BufferValueViewProps> = ({
  label,
  buffer,
  radix,
  showCopy = true,
}) => {
  const { t } = useTranslation();
  const { openSnackbarAlert } = useSnackbarAlert();

  const handleCopy = () => {
    navigator.clipboard.writeText(bufferToValue(buffer, radix));
    openSnackbarAlert(t("snackMessage.copied"));
  };

  return (
    <Box sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
      <TextField
        label={label}
        size="small"
        variant="outlined"
        fullWidth
        multiline
        disabled
        value={bufferToValue(buffer, radix)}
      />
      {showCopy && (
        <Tooltip title={t("actionBar.copyToClipboard")} placement="left">
          <Box>
            <IconButton
              sx={{ display: "flex", alignItems: "center" }}
              color="secondary"
              disabled={!buffer.length}
              onClick={handleCopy}
            >
              <IconCopy fontSize="small" />
            </IconButton>
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

export default BufferValueView;
