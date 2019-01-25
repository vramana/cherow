/* import { parseModule, parseScript } from '../../src/cherow';
import * as fs from 'fs';
import * as path from 'path';
import * as t from 'assert';
import { walk } from '../test-utils';
import expectations from './expectations';

const test262Parser = require('test262-parser');
const xfail = new Set(expectations.xfail.files);
const xfailFeatures = new Set(expectations.xfail.features);
const xpassDespiteFeatures = new Set(expectations.xfail.xpassDespiteFeatures);
const testDir = path.join(path.dirname(require.resolve('test262/package.json')), 'test');

describe('test262 tests', () => {
  walk(testDir, (f: any) => {
    if (!f.endsWith('.js') || f.endsWith('_FIXTURE.js')) {
      return;
    }
    const shortName = path.relative(testDir, f);

    it(shortName, () => {
      const contents = fs.readFileSync(f, 'utf8');
      const data = test262Parser.parseFile({ file: shortName, contents });

      const isModule = data.attrs.flags.module;
      const shouldFail =
        data.attrs.negative != null && (data.attrs.negative.phase === 'parse' || data.attrs.negative.phase === 'early');

      const xfailed =
        xfail.has(shortName) ||
        (!shouldFail &&
          data.attrs.features != null &&
          data.attrs.features.some((feat: any) => xfailFeatures.has(feat)) &&
          !xpassDespiteFeatures.has(shortName));

      let failed;
      try {
        if (isModule) {
          parseModule(data.contents);
        } else if (data.attrs.flags.onlyStrict) {
          parseScript(data.contents, { impliedStrict: true });
        } else if (data.attrs.flags.noStrict) {
          parseScript(data.contents);
        } else {
          parseScript(data.contents, { impliedStrict: true });
          parseScript(data.contents);
        }
        failed = false;
      } catch (er) {
        failed = true;
      }

      if (xfailed) {
        // t.equal(failed, shouldFail)
      } else {
        // t.equal(failed, shouldFail)
      }
    });
  });
});

describe('test262 expectations sanity', () => {
  describe('named tests exist', () => {
    for (let file of expectations.xfail.xpassDespiteFeatures.concat(expectations.xfail.files)) {
      it('existence of ' + file, () => {
        t.ok(fs.existsSync(path.join(testDir, file)));
      });
    }
  });

  describe('xpassDespiteFeatures tests have a forbidden feature', () => {
    for (let file of expectations.xfail.xpassDespiteFeatures) {
      it('features of ' + file, () => {
        const contents = fs.readFileSync(path.join(testDir, file), 'utf8');
        const data = test262Parser.parseFile({ file, contents });
        t.ok(Array.isArray(data.attrs.features));
        // expect(data.attrs.features.some((feat: any) => xfailFeatures.has(feat))).to.be.ok();
      });
    }
  });
});

*/
