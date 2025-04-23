import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslintJs.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  { ignores: [".next", ".vercel"] },
  {
    files: ["**/*.{ts,tsx}"],
    ...eslintReact.configs["recommended-typescript"],
  },
  {
    rules: {
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
    },
  },
);
