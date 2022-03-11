import { merge, mergeWithRules } from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserJSPlugin from 'terser-webpack-plugin';
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin';

import base from './base.babel';
import scss from './loaders/scss';

import config from './config';

export default merge(base, {
  output: {
    path: path.resolve('./export'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        terserOptions: {
          output: {
            comments: new RegExp(config.licenseBanner),
          },
        },
        extractComments: false,
      }),
      new CSSMinimizerPlugin(),
    ],
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: config.licenseBanner,
    }),
    new MiniCssExtractPlugin({
      filename: `${config.filename}.css`,
    }),
  ],
  module: mergeWithRules({
    rules: {
      test: 'match',
      use: 'append',
    },
  })(
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
