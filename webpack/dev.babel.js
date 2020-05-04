import merge from 'webpack-merge';
import base from './base.babel';

export default merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    hot: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
});
