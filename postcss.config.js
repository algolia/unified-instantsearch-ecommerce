/* eslint-disable import/no-commonjs */

const postcssPresetEnv = require('postcss-preset-env');
const postcssInjectCssVariables = require('postcss-inject-css-variables');
const {
  generateCustomProperties,
  generateCustomMedia,
} = require('./postcss/utils');
const { colors, text, breakpoints } = require('./src/config/styles');

const CUSTOM_PROPERTIES_NAMESPACE = 'algolia-theme';

module.exports = {
  plugins: [
    postcssPresetEnv({
      features: {
        'custom-media-queries': true,
      },
      importFrom: () => {
        const customProperties = {
          ...generateCustomProperties(colors, {
            namespace: `${CUSTOM_PROPERTIES_NAMESPACE}-color`,
          }),
          ...generateCustomProperties(text, {
            namespace: `${CUSTOM_PROPERTIES_NAMESPACE}-text`,
          }),
        };

        const customMedia = {
          ...generateCustomMedia(breakpoints, {
            namespace: CUSTOM_PROPERTIES_NAMESPACE,
          }),
        };

        return { customProperties, customMedia };
      },
    }),
    postcssInjectCssVariables({
      ...generateCustomProperties(colors, {
        namespace: `${CUSTOM_PROPERTIES_NAMESPACE}-color`,
        hyphens: false,
      }),
      ...generateCustomProperties(text, {
        namespace: `${CUSTOM_PROPERTIES_NAMESPACE}-text`,
        hyphens: false,
      }),
    }),
  ],
};
