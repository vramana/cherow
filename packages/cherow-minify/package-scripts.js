const { concurrent, crossEnv, rimraf, series } = require('nps-utils');
const pkgName = 'cherow-minify';
const config = require('../../package-scripts')(pkgName);

// Important: make this moveTypes similar to the one in cherow-ts/package-scripts.js when
// cherow is imported as a dependency in this package
config.scripts.build.moveTypes = crossEnv(`./node_modules/.bin/move-cli \"${pkgName}.d.ts\" \"dist/types/${pkgName}.d.ts\" --md`);
config.scripts.build.default = series.nps('build.before', 'build.all.default', 'build.moveTypes');

config.scripts.coverage.run = crossEnv(`./node_modules/.bin/nyc mocha ./build/${pkgName}/test/**/*.js`);

module.exports = config;
