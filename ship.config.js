/* eslint-disable import/no-commonjs */

const fs = require('fs');
const path = require('path');

module.exports = {
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
    return 'git checkout master && git rebase next';
  },
};
