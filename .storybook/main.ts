/**
 * @see https://github.com/shilman/storybook-rsc-demo
 * @see https://storybook.js.org/blog/storybook-react-server-components
 */

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [],
  staticDirs: ["../src/public"],
  framework: { name: "@storybook/nextjs", options: {} },
};

export default config;
