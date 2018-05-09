const { crossEnv, rimraf, series } = require('nps-utils');
const pkgName = 'cherow-flow';
const config = require('../../package-scripts')(pkgName);

config.scripts.build.moveTypes = series(
  crossEnv(`./node_modules/.bin/move-cli "${pkgName}/src" "dist/types" --md`),
  rimraf(pkgName)
);
config.scripts.build.default = series.nps('build.before', 'build.all.default', 'build.moveTypes');

config.scripts.coverage.run = crossEnv(`./node_modules/.bin/nyc mocha ./build/${pkgName}/test/**/*.js`);

module.exports = config;
