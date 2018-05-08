const { concurrent, crossEnv, rimraf, series, copy } = require('nps-utils');
const path = require('path');

function config(name) {
  return `configs/tsconfig-${name}.json`;
}

function rollup(mod, minify) {
  return package(`rollup --c --environment mod:${mod},${minify ? 'minify' : ''}`);
}

function mocha(arg) {
  return crossEnv(`TS_NODE_PROJECT=\'${config('test')}\' ${package('mocha')} ${arg}`);
}

function package(script) {
  return crossEnv(`./node_modules/.bin/${script}`);
}

function getConfig(pkgName) {

  const output = {
    scripts: {
      lint: package(`tslint --project ${config('build')}`),
      test: {
        default: mocha('test/**/*.ts'),
        watch: mocha('test/**/*.ts --watch')
      },
      coverage: {
        default: series.nps('coverage.before', 'coverage.run'),
        before: series.nps('coverage.clean', 'coverage.build'),
        clean: rimraf('build'),
        build: package(`tsc --project ${config('test')}`),
        run: package('nyc mocha ./build/test/**/*.js'),
        post: crossEnv(`cat ./coverage/lcov.info | ${package('coveralls')}`)
      },
      build: {
        default: series.nps('build.before', 'build.all.default', 'build.moveTypes'),
        minify: series.nps('build.all.minify'),
        before: series.nps('lint', 'build.clean'),
        clean: rimraf('dist'),
        all: {
          default: concurrent.nps(
            'build.amd.default',
            'build.umd.default',
            'build.commonjs.default',
            'build.es2017.default',
            'build.es2015.default',
            'build.nativeModules.default',
            'build.system.default'
          ),
          minify: concurrent.nps(
            'build.amd.minify',
            'build.umd.minify',
            'build.commonjs.minify',
            'build.es2017.minify',
            'build.es2015.minify',
            'build.nativeModules.minify',
            'build.system.minify'
          )
        },
        amd: {
          default: rollup('amd'),
          minify: rollup('amd', true)
        },
        umd: {
          default: rollup('umd'),
          minify: rollup('umd', true)
        },
        commonjs: {
          default: rollup('commonjs'),
          minify: rollup('commonjs', true)
        },
        es2017: {
          default: rollup('es2017'),
          minify: rollup('es2017', true)
        },
        es2015: {
          default: rollup('es2015'),
          minify: rollup('es2015', true)
        },
        nativeModules: {
          default: rollup('native-modules'),
          minify: rollup('native-modules', true)
        },
        system: {
          default: rollup('system'),
          minify: rollup('system', true)
        },
        moveTypes: {
          default: series.nps('build.moveTypes.move', 'build.moveTypes.clean'),
          move: copy(`**/*.d.ts ../../dist/types --parents --cwd=${pkgName}/src`),
          clean: rimraf(`${pkgName}`)
        }
      }
    }
  };

  if (!(pkgName && pkgName.length)) {
    output.scripts.build.moveTypes.move = copy(`**/*.d.ts dist/types --parents --cwd=.`);
    output.scripts.build.moveTypes.clean = rimraf(`!(dist)**/*.d.ts *.d.ts`);
  }

  return output;
}

module.exports = getConfig;
