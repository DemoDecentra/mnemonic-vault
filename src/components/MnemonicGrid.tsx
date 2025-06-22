// mui
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
// scure bip39
import { validateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
// react
import { useState } from "react";
import type { FC } from "react";

interface MnemonicGridProps {
  words: string[];
  onWordChange: (index: number, value: string) => void;
  showPassphrase: boolean;
}

const MnemonicGrid: FC<MnemonicGridProps> = ({
  words,
  onWordChange,
  showPassphrase,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [wordOption, setWordOption] = useState<string[]>(wordlist);

  const handleOpen = (index: number) => {
    const wordsCopy = [...words];
    const options = wordlist.filter((word) => {
      wordsCopy.splice(index, 1, word);
      return validateMnemonic(wordsCopy.join(" "), wordlist);
    });
    setWordOption(options.length > 0 ? options : wordlist);
    setOpenIndex(index);
  };

  const handleClose = () => {
    setOpenIndex(null);
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: "space-between",
        gap: 1,
        my: 2,
      }}
    >
      {words.map((word, index) => (
        <Grid key={index} sx={{ width: 180 }}>
          <Autocomplete
            autoHighlight
            options={wordOption}
            open={openIndex === index}
            onOpen={() => handleOpen(index)}
            onClose={handleClose}
            value={word}
            renderInput={(params) => (
              <TextField
                {...params}
                label={`${index + 1}`}
                error={word === ""}
                type={showPassphrase ? "text" : "password"}
              />
            )}
            onChange={(_, value) => {
              onWordChange(index, value ?? "");
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MnemonicGrid;
