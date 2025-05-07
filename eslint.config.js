import eslintReact from "@eslint-react/eslint-plugin";
import eslintJs from "@eslint/js";
import eslintParserTypeScript from "@typescript-eslint/parser";
import perfectionist from "eslint-plugin-perfectionist";
import eslintPluginReadableTailwind from "eslint-plugin-readable-tailwind";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslintJs.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  // fatima.eslint.plugin, // import { linter as fatima } from "fatima";
  { ignores: ["node_modules", ".next"] },
  {
    files: ["**/*.{ts,tsx}"],
    ...eslintReact.configs["recommended-typescript"],
    languageOptions: {
      parser: eslintParserTypeScript,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: true,
      },
    },
  },
  perfectionist.configs["recommended-natural"],
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "readable-tailwind": eslintPluginReadableTailwind,
    },
    rules: {
      ...eslintPluginReadableTailwind.configs.warning.rules,
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
      "@eslint-react/no-array-index-key": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
      "no-useless-escape": "off",
    },
    settings: {
      "readable-tailwind": {
        entryPoint: "src/css/globals.css",
      },
    },
  },
  // fatima.eslint.noEnvRule("**/*.tsx"),
);
