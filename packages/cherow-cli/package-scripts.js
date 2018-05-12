const { crossEnv, rimraf, series } = require('nps-utils');
const pkgName = 'cherow-cli';
const config = require('../../package-scripts')(pkgName, 'bin');

config.scripts.build.all = config.scripts.build.commonjs;

config.scripts.coverage.run = crossEnv(`./node_modules/.bin/nyc mocha ./build/${pkgName}/test/**/*.js`);

module.exports = config;
