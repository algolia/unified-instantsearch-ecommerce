import merge from 'webpack-merge';
import DashboardPlugin from 'webpack-dashboard/plugin';

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
  plugins: [...files, new DashboardPlugin()],
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
