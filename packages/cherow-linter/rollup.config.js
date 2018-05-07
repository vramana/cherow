import { readFileSync } from 'fs';
import ts from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

const { mod, minify } = process.env;

function when(predicate, opts) {
  return predicate ? opts : {};
}

function output(target, format, opts = {}) {
  return {
    input: `src/${pkg.name}.ts`,
    output: { ...{ file: `dist/${mod}/${pkg.name}${minify ? '.min' : ''}.js`, format, name: pkg.name }, ...opts },
    plugins: [
      replace({
        __VERSION__: pkg.version
      }),
      resolve(),
      commonJS(),
      ts({
        tsconfig: `configs/tsconfig-build.json`,
        tsconfigOverride: { compilerOptions: { target } },
        useTsconfigDeclarationDir: true,
        cacheRoot: `.rollupcache/${mod}`
      }),
      when(
        minify,
        uglify({
          compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
          },
          output: {
            comments: false
          }
        })
      )
    ],
    external: ["cherow"]
  };
}

let config;
switch (mod) {
  case 'amd':
    config = output('es2015', 'amd', { amd: { id: pkg.name } });
    break;
  case 'umd':
    config = output('es2015', 'umd');
    break;
  case 'commonjs':
    config = output('es2015', 'cjs');
    break;
  case 'es2017':
    config = output('es2017', 'es');
    break;
  case 'es2015':
    config = output('es2015', 'es');
    break;
  case 'native-modules':
    config = output('es2015', 'es');
    break;
  case 'system':
    config = output('es2015', 'system');
    break;
}

export default config;
