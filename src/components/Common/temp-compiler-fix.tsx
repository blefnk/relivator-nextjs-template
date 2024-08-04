/* eslint-disable unicorn/prevent-abbreviations */
import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

// TODO: Remove this file after the StrictMode
// TODO: issue with React Compiler Linter is fixed
createRoot(document.querySelector("#root")!).render(
  <StrictMode>App</StrictMode>,
);
