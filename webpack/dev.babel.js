import { merge, mergeWithRules } from 'webpack-merge';

import base from './base.babel';
import scss from './loaders/scss';
import files from './plugins/files';

export default merge(base, {
  devtool: 'inline-source-map',
  devServer: {
    static: './public',
    hot: true,
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: 'all',
  },
  plugins: [...files],
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
          use: ['style-loader'],
        },
      ],
    },
    scss
  ),
});
