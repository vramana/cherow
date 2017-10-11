import { readFileSync } from 'fs';
import buble from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';

const format = process.env.NODE_ENV;
const isMinify = format === 'minify';

const pkg = JSON.parse( readFileSync( 'package.json', 'utf-8' ) );

const output = isMinify
    ? [ { file: `./dist/${pkg.name}.min.js`, format: 'umd', } ]
    : [
        { file: `./dist/${pkg.name}.js`, format: 'umd', },
        { file: `./dist/${pkg.name}.mjs`, format: 'es', },
    ];


const config = {
  input: `./build/src/${pkg.name}.js`,
  plugins: [
    buble({exclude: './node_modules/**'}),
  ],
  sourceMap: false,
  name: pkg.name,
  output
};

isMinify && config.plugins.push( uglify() );

export default config;
