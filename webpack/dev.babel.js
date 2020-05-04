import merge from 'webpack-merge';

import base from './base.babel';
import scss from './loaders/scss';
import files from './plugins/files';

export default merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    hot: true,
    port: 3000,
  },
  plugins: files,
  module: merge.smart(
    {
      rules: [
        {
          test: /\.(scss)$/,
          use: ['style-loader'],
        },
      ],
    },
    scss
  ),
});
