import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./i18n";
import ThemeWrapper from "./ThemeWrapper";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeWrapper />
  </StrictMode>
);
