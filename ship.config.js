/* eslint-disable import/no-commonjs */

const fs = require('fs');
const path = require('path');

module.exports = {
  mergeStrategy: {
    toReleaseBranch: {
      next: 'master',
    },
  },
  versionUpdated({ version, dir }) {
    fs.writeFileSync(
      path.resolve(dir, 'src', 'version.js'),
      `export const version = '${version}';\n`
    );
  },
  buildCommand() {
    // We don't build the project before releasing.
    return null;
  },
  publishCommand() {
    // We don't publish to npm.
    return null;
  },
};
