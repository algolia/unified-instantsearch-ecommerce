import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import config from './config';

export default {
  entry: './src/index.js',
  output: {
    filename: `${config.filename}.js`,
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
