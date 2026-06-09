import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)))
}

const config: StorybookConfig = {
  stories: [
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [],
  framework: getAbsolutePath('@storybook/react-vite'),
  viteFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      alias: [
        ...(Array.isArray(config.resolve?.alias) ? config.resolve.alias : []),
        {
          find: "@xv/styles",
          replacement: resolve(__dirname, "../../xv-styles/index.css"),
        },
        {
          find: "@xv/icons/assets",
          replacement: resolve(__dirname, "../../xv-icons/icons"),
        },
      ],
    };
    return config;
  },
};

export default config;