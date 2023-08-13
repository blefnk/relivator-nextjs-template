// @ts-expect-error
/** @type {import("eslint").Linter.Config} */
module.exports = {
  settings: {
    "import/resolver": {
      typescript: { project: ["./tsconfig.json"] },
    },
    tailwindcss: {
      callees: ["cn"],
      config: "tailwind.config.ts",
    },
  },
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  overrides: [
    {
      // =================================================================
      // TypeScript EsLint (Configuration File)
      // =================================================================
      files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.json"],
        ecmaVersion: "latest",
        sourceType: "module",
      },
      extends: ["next/core-web-vitals"],
      rules: {
        "@next/next/no-html-link-for-pages": "off",
        "react/no-unescaped-entities": "off",
        "@next/next/no-img-element": "off",
        "react/display-name": "off",
      },
    },
    {
      // =================================================================
      // JavaScript EsLint (Configuration File)
      // =================================================================
      files: ["*.js", "*.jsx", "*.mjs", "*.cjs"],
      extends: ["next/core-web-vitals"],
    },
  ],
};

//! {
//!   "$schema": "https://json.schemastore.org/eslintrc",
//!   "extends": [
//!     "eslint:recommended",
//!     "plugin:@typescript-eslint/recommended",
//!     "prettier",
//!     "next/core-web-vitals",
//!     "plugin:jsx-a11y/recommended"
//!   ],
//!   "parser": "@typescript-eslint/parser",
//!   "plugins": [
//!     "@typescript-eslint",
//!     "import-helpers",
//!     "unused-imports",
//!     "jsx-a11y"
//!   ],
//!   "rules": {
//!     "quotes": ["warn", "double"],
//!     "semi": ["warn", "always"],
//!     "arrow-parens": ["warn", "always"],
//!     "@typescript-eslint/no-unused-vars": "off",
//!     "unused-imports/no-unused-imports-ts": "warn",
//!     "unused-imports/no-unused-vars": "warn",
//!     "@typescript-eslint/array-type": "error",
//!     "prefer-const": "error",
//!     "no-console": [
//!       "warn",
//!       {
//!         "allow": ["warn", "error"]
//!       }
//!     ],
//!     "import-helpers/order-imports": [
//!       "warn",
//!       {
//!         "newlinesBetween": "always",
//!         "groups": [
//!           "/^react/",
//!           "module",
//!           "/^~/",
//!           ["parent", "sibling", "index"]
//!         ],
//!         "alphabetize": {
//!           "order": "asc",
//!           "ignoreCase": true
//!         }
//!       }
//!     ],
//!     "@next/next/no-html-link-for-pages": "off"
//!   }
//! }
