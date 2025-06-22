// mui
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// react
import type { FC } from "react";
// i18next
import { useTranslation } from "react-i18next";

export type WordCount = 12 | 24;

interface WordCountSelectorProps {
  wordCount: WordCount;
  onWordCountChange: (value: WordCount) => void;
}

const WordCountSelector: FC<WordCountSelectorProps> = ({
  wordCount,
  onWordCountChange,
}: WordCountSelectorProps) => {
  const { t } = useTranslation();
  return (
    <Box>
      <ToggleButtonGroup
        value={wordCount}
        exclusive
        onChange={(_, value) => {
          if (value !== null) {
            onWordCountChange(value as WordCount);
          }
        }}
        aria-label="Word count"
      >
        <ToggleButton size="small" color="primary" value={12}>
          12 {t("actionBar.words")}
        </ToggleButton>
        <ToggleButton size="small" color="primary" value={24}>
          24 {t("actionBar.words")}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default WordCountSelector;
