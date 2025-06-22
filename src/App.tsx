// react
import { Suspense, useMemo, useState, type FC } from "react";
import type { ThemeMode } from "./theme";
// mui
import Container from "@mui/material/Container";
// scure bip39
import {
  mnemonicToEntropy,
  mnemonicToSeedSync,
  validateMnemonic,
} from "@scure/bip39";
import { wordlist as WORDLIST } from "@scure/bip39/wordlists/english";
// components
import ActionBar from "./components/ActionBar";
import EntropyDisplay from "./components/EntropyDisplay";
import Loading from "./components/Loading";
import MnemonicGrid from "./components/MnemonicGrid";
import SecurityMeter from "./components/SecurityMeter";
import SeedView from "./components/SeedView";
import { SnackbarAlert } from "./components/snackbar";
import SystemSetting from "./components/system/SystemSetting";
import Title from "./components/Title";
import type { WordCount } from "./components/WordCountSelector";

interface AppProps {
  onThemeChange: (mode: ThemeMode) => void;
  currentTheme: ThemeMode;
}

const App: FC<AppProps> = ({ onThemeChange, currentTheme }) => {
  const [wordCount, setWordCount] = useState<WordCount>(12);
  const [words, setWords] = useState<string[]>(Array(wordCount).fill(""));
  const [showPassphrase, setShowPassphrase] = useState<boolean>(true);
  const [passphrase, setPassphrase] = useState<string>("");

  const valid = useMemo(
    () => validateMnemonic(words.join(" "), WORDLIST),
    [words]
  );

  const entropy = useMemo<Uint8Array>(
    () =>
      valid ? mnemonicToEntropy(words.join(" "), WORDLIST) : new Uint8Array(),
    [valid, words]
  );

  const seed = useMemo<Uint8Array>(
    () =>
      valid
        ? mnemonicToSeedSync(words.join(" "), passphrase)
        : new Uint8Array(),
    [valid, words, passphrase]
  );

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  return (
    <Suspense fallback={<Loading />}>
      <Container
        maxWidth="md"
        sx={{ my: 4 }}
        onPaste={(e) => {
          const text = e.clipboardData.getData("text/plain").trim();
          if (text) {
            const words = text.trim().split(/\s+/);
            const wordsCount = words.length as WordCount;
            if (wordsCount === 12 || wordsCount === 24) {
              e.preventDefault();
              setWordCount(wordsCount);
              setWords(words);
            }
          }
        }}
      >
        <SystemSetting
          currentTheme={currentTheme}
          onThemeChange={onThemeChange}
        />
        <Title />
        <SnackbarAlert />
        <ActionBar
          wordCount={wordCount}
          valid={valid}
          showPassphrase={showPassphrase}
          words={words}
          onWordCountChange={setWordCount}
          onWordsChange={setWords}
          onTogglePassphrase={() => setShowPassphrase(!showPassphrase)}
        />
        <MnemonicGrid
          words={words}
          onWordChange={handleWordChange}
          showPassphrase={showPassphrase}
        />
        <EntropyDisplay entropy={entropy} />
        <SecurityMeter entropy={entropy} />
        <SeedView
          seed={seed}
          showPassphrase={showPassphrase}
          passphrase={passphrase}
          setPassphrase={setPassphrase}
        />
        {/* <KeyGenerator seed={seed} /> */}
      </Container>
    </Suspense>
  );
};

export default App;
