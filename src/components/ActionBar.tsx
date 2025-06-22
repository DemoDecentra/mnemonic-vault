// mui
import IconInvalid from "@mui/icons-material/CancelOutlined";
import IconValid from "@mui/icons-material/CheckCircle";
import IconCopy from "@mui/icons-material/ContentCopy";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// components
import type { WordCount } from "./WordCountSelector";
import WordCountSelector from "./WordCountSelector";
import { useSnackbarAlert } from "./snackbar";
// react
import type { FC } from "react";
// scure bip39
import { generateMnemonic, validateMnemonic } from "@scure/bip39";
import { wordlist as WORDLIST } from "@scure/bip39/wordlists/english";
// i18next
import { useTranslation } from "react-i18next";

interface ActionBarProps {
  wordCount: WordCount;
  valid: boolean;
  showPassphrase: boolean;
  words: string[];
  onWordCountChange: (wordCount: WordCount) => void;
  onWordsChange: (words: string[]) => void;
  onTogglePassphrase: () => void;
}

function wordCountToEntropy(wordCount: WordCount) {
  return wordCount === 12 ? 128 : 256;
}

const ActionBar: FC<ActionBarProps> = ({
  valid,
  showPassphrase,
  wordCount,
  words,
  onWordCountChange,
  onWordsChange,
  onTogglePassphrase,
}: ActionBarProps) => {
  const { t } = useTranslation();
  const { openSnackbarAlert } = useSnackbarAlert();

  const handleWordCountChange = (wordCount: WordCount) => {
    if (wordCount < words.length) {
      onWordsChange(words.slice(0, wordCount));
    } else {
      const newWords = [...words, ...Array(wordCount - words.length).fill("")];
      onWordsChange(newWords);
    }
    onWordCountChange(wordCount);
  };

  const handleGenerate = () => {
    const mnemonic = generateMnemonic(WORDLIST, wordCountToEntropy(wordCount));
    const newWords = mnemonic.split(" ");
    onWordsChange(newWords);
    openSnackbarAlert(t("snackMessage.generated"));
  };

  // generate a valid mnemonic, only replace empty words
  const handleCompleteRest = () => {
    const mnemonic = generateMnemonic(WORDLIST, wordCountToEntropy(wordCount));
    const newWords = mnemonic.split(" ");
    let lastEmptyIndex = -1;
    words.forEach((word, index) => {
      if (WORDLIST.includes(word)) {
        newWords[index] = word;
      } else {
        lastEmptyIndex = index;
      }
    });
    if (lastEmptyIndex === -1) {
      lastEmptyIndex = words.length - 1;
    }
    // random select a word from wordlist until valid
    while (!validateMnemonic(newWords.join(" "), WORDLIST)) {
      const randomIndex = Math.floor(Math.random() * WORDLIST.length);
      newWords[lastEmptyIndex] = WORDLIST[randomIndex];
    }
    onWordsChange(newWords);
    openSnackbarAlert(t("snackMessage.generated"));
  };

  const handleClear = () => {
    onWordsChange(Array(wordCount).fill(""));
    openSnackbarAlert(t("snackMessage.cleared"));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(words.join(" "));
    openSnackbarAlert(t("snackMessage.copied"));
  };

  return (
    <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
      <WordCountSelector
        wordCount={wordCount}
        onWordCountChange={handleWordCountChange}
      />
      <Box width={"60%"}>
        <Button
          sx={{ ml: 2, textTransform: "none" }}
          variant="contained"
          onClick={handleGenerate}
        >
          {t("actionBar.generate")}
        </Button>
        <Button
          sx={{ ml: 2, textTransform: "none" }}
          variant="contained"
          onClick={handleCompleteRest}
          disabled={valid || words.every((word) => word === "")}
        >
          {t("actionBar.completeRest")}
        </Button>
        <Button
          sx={{ ml: 2, textTransform: "none" }}
          variant="text"
          color="warning"
          disabled={words.every((word) => word === "")}
          onClick={handleClear}
        >
          {t("actionBar.clear")}
        </Button>
        <Tooltip
          title={t(
            valid ? "actionBar.validMnemonic" : "actionBar.invalidMnemonic"
          )}
          placement="right"
        >
          <span>
            <IconButton sx={{ ml: 2 }} disabled>
              {valid ? (
                <IconValid color="success" />
              ) : (
                <IconInvalid color="error" />
              )}
            </IconButton>
          </span>
        </Tooltip>
      </Box>
      <Box width={"10%"} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Tooltip
          title={
            showPassphrase
              ? t("actionBar.hidePassphrase")
              : t("actionBar.showPassphrase")
          }
          placement="top"
        >
          <IconButton onClick={onTogglePassphrase}>
            {showPassphrase ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Tooltip>
        <Tooltip title={t("actionBar.copyToClipboard")} placement="top">
          <span>
            <IconButton disabled={!valid} onClick={handleCopy}>
              <IconCopy />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ActionBar;
