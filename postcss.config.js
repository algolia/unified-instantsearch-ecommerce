/* eslint-disable import/no-commonjs, no-global-assign */

// When the configuration file refers to `window`, we need to shim it so it
// doesn't break when processed with Node during the build step.
window = global;

require('module-alias/register');
require('ignore-styles');

const postcssPresetEnv = require('postcss-preset-env');
const postcssInjectCssVariables = require('postcss-inject-css-variables');
const {
  generateCustomProperties,
  generateCustomMedia,
} = require('./postcss/utils');
const { styles } = require('./src/config').default;

const CUSTOM_PROPERTIES_NAMESPACE = 'algolia-theme';

module.exports = {
  plugins: [
    postcssPresetEnv({
      features: {
        'custom-media-queries': true,
      },
      importFrom: () => {
        const customProperties = {
          ...generateCustomProperties(styles.colors, {
            namespace: `${CUSTOM_PROPERTIES_NAMESPACE}-color`,
          }),
          ...generateCustomProperties(styles.text, {
            namespace: `${CUSTOM_PROPERTIES_NAMESPACE}-text`,
          }),
        };

        const customMedia = {
          ...generateCustomMedia(styles.breakpoints, {
            namespace: CUSTOM_PROPERTIES_NAMESPACE,
          }),
        };

        return { customProperties, customMedia };
      },
    }),
    postcssInjectCssVariables({
      ...generateCustomProperties(styles.colors, {
        namespace: `${CUSTOM_PROPERTIES_NAMESPACE}-color`,
        hyphens: false,
      }),
      ...generateCustomProperties(styles.text, {
        namespace: `${CUSTOM_PROPERTIES_NAMESPACE}-text`,
        hyphens: false,
      }),
    }),
  ],
};
