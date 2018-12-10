const path = require('path');
const rollup = require('rollup');
const typescript2 = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

async function createBundle() {
  for (const type of ['normal', 'minified']) {
    console.log(`creating ${type} bundle`);

    const bundle = await rollup.rollup({
      input: path.join(src, 'cherow.ts'),
      plugins: [
        typescript2({
          tsconfig: path.join(root, 'tsconfig.json'),
          typescript: ts
        }),
        ...(type === 'minified' ? [terser()] : [])
      ]
    });

    const suffix = type === 'minified' ? '.min' : '';

    //'amd' | 'cjs' | 'system' | 'es' | 'esm' | 'iife' | 'umd'

    for (const format of ['esm', 'system', 'cjs']) {
      const fileName = path.join(dist, `cherow.${format}${suffix}.js`);

      console.log(`writing ${fileName}`);

      await bundle.write({
        file: fileName,
        name: 'cherow',
        format
      });
    }

    for (const format of ['umd', 'amd', 'iife']) {
      const fileName = path.join(dist, `cherow.${format}${suffix}.js`);

      console.log(`writing ${fileName}`);

      await bundle.write({
        file: fileName,
        exports: 'named',
        name: 'cherow',
        format
      });
    }
  }

  console.log(`done`);
}

createBundle();
