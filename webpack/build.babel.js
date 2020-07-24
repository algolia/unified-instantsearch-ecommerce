import merge from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import base from './base.babel';
import scss from './loaders/scss';

import config from './config';

export default merge(base, {
  output: {
    path: path.resolve('./export'),
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          output: {
            comments: new RegExp(config.licenseBanner),
          },
        },
        extractComments: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: config.licenseBanner,
    }),
    new MiniCssExtractPlugin({
      filename: `${config.filename}.css`,
    }),
  ],
  module: merge.smart(
    {
      rules: [
        {
          test: /\.(s?css)$/,
          use: [MiniCssExtractPlugin.loader],
        },
      ],
    },
    scss
  ),
});
