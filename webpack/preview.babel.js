import merge from 'webpack-merge';
import build from './build.babel';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export default merge(build, {
  output: {
    path: path.resolve('./preview'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'E-Comm Unified UI',
      template: 'public/index.html',
    }),
  ],
});
