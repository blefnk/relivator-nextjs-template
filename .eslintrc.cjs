// @ts-check

const { defineConfig } = require("eslint-define-config");

const config = defineConfig({
  env: { es2023: true, browser: true, node: true },
  settings: {
    "import/resolver": { typescript: { project: ["./tsconfig.json"] } },
    tailwindcss: { callees: ["cn"], config: "./tailwind.config.ts" }
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
        "plugin:@tanstack/eslint-plugin-query/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:tailwindcss/recommended",
        "next/core-web-vitals",
        "prettier"
      ],
      rules: {
        "@typescript-eslint/consistent-type-imports": [
          "off"
          // "warn",
          // {
          //   prefer: "type-imports",
          //   fixStyle: "inline-type-imports"
          // }
        ],
        // "@typescript-eslint/no-unused-vars": [
        // "warn", { argsIgnorePattern: "^_" }],
        "@tanstack/query/exhaustive-deps": "error",
        "@tanstack/query/prefer-query-object-syntax": "error",
        // !! Turn Back on When Things are Stable !!
        "@next/next/no-html-link-for-pages": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-redundant-type-constituents": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/require-await": "off",
        "react-hooks/exhaustive-deps": "off",
        "react/display-name": "off",
        "react/no-unescaped-entities": "off",
        "tailwindcss/classnames-order": "off",
        "tailwindcss/enforces-shorthand": "off",
        "tailwindcss/migration-from-tailwind-2": "off",
        "tailwindcss/no-custom-classname": "off"
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

module.exports = config;
