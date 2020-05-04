import path from 'path';
import merge from 'webpack-merge';

import build from './build.babel';
import htmlWebpackPlugin from './plugins/html-webpack-plugin';

export default merge(build, {
  output: {
    path: path.resolve('./preview'),
  },
  plugins: htmlWebpackPlugin,
});
