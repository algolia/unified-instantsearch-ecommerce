import merge from 'webpack-merge';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import base from './base.babel';
import scss from './loaders/scss';

import config from './config';

export default merge(base, {
  mode: 'production',
  output: {
    path: path.resolve('./export'),
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${config.filename}.css`,
    }),
  ],
  module: merge.smart(
    {
      rules: [
        {
          test: /\.(scss)$/,
          use: [MiniCssExtractPlugin.loader],
        },
      ],
    },
    scss
  ),
});
