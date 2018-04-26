import { readFileSync } from 'fs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

const format = process.env.NODE_ENV;
const isMinify = format === 'minify';

const pkg = JSON.parse( readFileSync( 'package.json', 'utf-8' ) );

const output = isMinify
    ? [ { file: `./dist/${pkg.name}.min.js`, format: 'umd', name: pkg.name } ]
    : [
        { file: `./dist/${pkg.name}.js`, format: 'umd', name: pkg.name },
        { file: `./dist/${pkg.name}.es.js`, format: 'es', name: pkg.name },
    ];


const config = {
  input: `./build/src/${pkg.name}.js`,
  plugins: [
    replace({
      __VERSION__: pkg.version
    }),
  ],
  output
};

isMinify && config.plugins.push( uglify({
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
 }) );

export default config;
