import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import globals from "globals";
import tseslint from "typescript-eslint";

// The current Relivator 1.2.6 version comes with many predefined ESLint configs.
// Run the `pnpm reli:setup` to easily switch between them and set up other tooling.
// Current: addons\scripts\reliverse\relicon\setup\configs\eslint.config.minimal.ts
//
const stylisticConfig = stylistic.configs.customize({
  indent: 2,
  jsx: true,
  quoteProps: "as-needed",
  quotes: "double",
  semi: true,
});

// ===================================================================
// Steps if you want to use the new React Compiler:
// - npx nypm add -D babel-plugin-react-compiler
// - npx nypm add -D eslint-plugin-react-compiler
// - import compiler from "eslint-plugin-react-compiler";
// - Add the compiler plugin to the plugins object (["react-compiler": compiler,])
// - Add the compiler rules to the rules object
// - Set experimental.reactCompiler to true in next.config.js
// @see https://react.dev/learn/react-compiler
// ===================================================================
//
// @see https://eslint.org
// @see https://typescript-eslint.io
// @see https://github.com/blefnk/relivator
//
export default tseslint.config(
  js.configs.recommended,
  {
    ignores: [
      "**/.{git,next,turbo,million,output}/",
      "**/{node_modules,build,dist,drizzle}/",
      "**/eslint.config.{ultimate,medium,minimal,rules-disabled}.ts",
      "**/pnpm-lock.yaml",
      "eslint.config.js", // TODO: delete when linting error is resolved
    ],
  },
  {
    name: "@reliverse/eslint-config/core",
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...globals.es2024,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
          jsx: true,
        },
        project: true,
        tsconfigRootDir: import.meta.dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
    plugins: {
      "@stylistic": stylistic,
      perfectionist: perfectionist,
    },
    rules: {
      ...perfectionist.configs["recommended-natural"].rules,
      ...stylisticConfig.rules,
      "@stylistic/quotes": [
        "warn",
        "double",
        {
          avoidEscape: true,
        },
      ],
      "no-var": "error",
    },
  },
  {
    name: "@reliverse/eslint-config/js",
    files: ["**/*.{js,jsx}"],
    ...tseslint.configs.disableTypeChecked,
  },
);
