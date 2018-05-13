import { readFileSync } from 'fs';
import ts from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';
import string from 'rollup-plugin-string';
const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

export default {
  input: 'src/index.ts',
  output: { ...{ file: 'bin/cherow', format: 'cjs', banner: '#!/usr/bin/env node', name: pkg.name } },
  plugins: [
    replace({
      __VERSION__: pkg.version
    }),
    string( { include: '**/*.md' } ),
		json(),
    resolve(),
    commonJS(),
    ts({
      tsconfig: `configs/tsconfig-build.json`,
      tsconfigOverride: {
        compilerOptions: {
          declaration: false
        }
      },
      cacheRoot: '.rollupcache'
    })
  ]
};
