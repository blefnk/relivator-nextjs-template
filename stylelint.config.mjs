/** @type {import("stylelint").Config} */
export default {
  plugins: ["stylelint-scss"],
  ignoreFiles: ["src/styles/tokens.css"],
  extends: ["stylelint-config-standard-scss", "stylelint-config-css-modules"],
  overrides: [{ files: ["**/*.scss"], customSyntax: "postcss-scss" }],
};
