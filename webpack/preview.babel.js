import path from 'path';
import merge from 'webpack-merge';

import build from './build.babel';
import files from './plugins/files';

export default merge(build, {
  output: {
    path: path.resolve('./preview'),
  },
  plugins: files,
});
