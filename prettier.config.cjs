/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */
/** @typedef {import("prettier").Config} PrettierConfig */

/** @type {PrettierConfig | SortImportsConfig} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  useTabs: false,
  singleQuote: false,
  bracketSameLine: false,
  trailingComma: "none",
  arrowParens: "always",
  endOfLine: "lf",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/app.ts",
    "^~/app/(.*)$",
    "^~/data/(.*)$",
    "^~/forms/(.*)$",
    "^~/hooks/(.*)$",
    "^~/islands/(.*)$",
    "^~/schema/(.*)$",
    "^~/styles/(.*)$",
    "^~/utils/(.*)$",
    "",
    "^[./]",
    ""
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("prettier-plugin-packagejson"),
    require.resolve("@ianvs/prettier-plugin-sort-imports")
  ]
};

module.exports = config;
