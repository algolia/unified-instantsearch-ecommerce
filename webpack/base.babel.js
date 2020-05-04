import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
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
