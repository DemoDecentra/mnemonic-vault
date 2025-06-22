# Mnemonic Vault

Mnemonic Vault is a modern web application for generating, validating, and analyzing BIP39 mnemonics and seed phrases. Built with React, TypeScript, and Vite, it provides a secure and user-friendly interface for cryptocurrency and security enthusiasts to manage mnemonic phrases and derive cryptographic keys.

## Features

- **BIP39 Mnemonic Generation:** Create secure, random mnemonic phrases with customizable word counts.
- **Mnemonic Validation:** Instantly validate the correctness of entered or generated mnemonics.
- **Seed & Entropy Display:** View the entropy and derived seed for any mnemonic phrase.
- **Passphrase Support:** Add an optional passphrase for enhanced security.
- **Security Meter:** Visual feedback on the strength and validity of your mnemonic.
- **Key Generation:** Derive cryptographic keys from your mnemonic and passphrase.
- **Modern UI:** Responsive, accessible, and easy-to-use interface built with Material UI.

## Usage

1. **Generate or Enter a Mnemonic:** Choose your desired word count and generate a new mnemonic, or enter your own.
2. **Validate:** The app will automatically validate your mnemonic and display its entropy and seed.
3. **Add a Passphrase (Optional):** Enhance security by adding a passphrase.
4. **View Derived Keys:** Use the key generator to derive cryptographic keys from your mnemonic and passphrase.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/` — Main source code (components, logic, styles)
- `public/` — Static assets
- `index.html` — Entry HTML file

## License

Apache License 2.0

---

> **Mnemonic Vault** is intended for educational and personal use. Always keep your mnemonic phrases and passphrases secure and never share them with anyone you do not trust.
