// @ts-check

const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  env: { es2023: true, browser: true, node: true },
  settings: {
    "import/resolver": { typescript: { project: ["./tsconfig.json"] } },
    tailwindcss: { callees: ["cn"], config: "tailwind.config.ts" }
  },
  overrides: [
    //! =========================================
    //! | TypeScript EsLint Configuration Rules |
    //! =========================================
    {
      files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json"],
        ecmaVersion: "latest",
        sourceType: "module"
      },
      plugins: ["@tanstack/query"],
      extends: [
        "next/core-web-vitals",
        "plugin:@tanstack/eslint-plugin-query/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      rules: {
        // !! Turn Back on When Things are Stable !!
        "@next/next/no-html-link-for-pages": "off",
        "@tanstack/query/exhaustive-deps": "error",
        "@tanstack/query/prefer-query-object-syntax": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-redundant-type-constituents": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/require-await": "off",
        "react-hooks/exhaustive-deps": "off",
        "react/display-name": "off",
        "react/no-unescaped-entities": "off"
      }
    },
    //! =========================================
    //! | JavaScript EsLint Configuration Rules |
    //! =========================================
    {
      files: ["*.js", "*.jsx", "*.mjs", "*.cjs"],
      extends: ["next/core-web-vitals"]
    }
  ]
});
