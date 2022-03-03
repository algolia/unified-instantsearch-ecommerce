import 'module-alias/register';
import path from 'path';

import config from './config';

export default {
  mode: process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: `${config.filename}.js`,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-fast-compare': path.resolve(
        __dirname,
        './aliases/react-fast-compare'
      ),
    },
  },
};
