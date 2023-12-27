/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // When adding other plugins, we need to add some of them before tailwindcss
    tailwindcss: {},
    // But some others, like autoprefixer, we need to add after tailwindcss
    autoprefixer: {},
  },
};

module.exports = config;
