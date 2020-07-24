import merge from 'webpack-merge';

import base from './base.babel';
import scss from './loaders/scss';
import files from './plugins/files';

export default merge(base, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    hot: true,
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  plugins: [...files],
  module: merge.smart(
    {
      rules: [
        {
          test: /\.(s?css)$/,
          use: ['style-loader'],
        },
      ],
    },
    scss
  ),
});
