/* eslint-disable import/no-commonjs */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const postcssInjectCssVariables = require('postcss-inject-css-variables');

const {
  generateCustomProperties,
  generateCustomMedia,
} = require('./webpack/utils');
const { colors, text, breakpoints } = require('./src/config/styles');

const CUSTOM_PROPERTIES_NAMESPACE = 'algolia-theme';

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /root\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
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
            },
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: [
          { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                postcssPresetEnv({
                  features: {
                    'custom-media-queries': true
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
              ],
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
};
