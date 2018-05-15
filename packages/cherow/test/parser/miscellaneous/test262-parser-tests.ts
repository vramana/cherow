import { parseScript, parseModule } from '../../../src/cherow';
import { readdirSync, readFileSync } from 'fs';
import * as t from 'assert';

const Test262Dir = 'node_modules/test262-parser-tests';

const expectations = {
    pass: [

        'e0c3d30b6fe96812.js',
        'abd5e4aa1a9f99ba.js',
        '7c6d13458e08e1f4.js',
        '7a405ea1fdb6a26e.js',
        '44f31660bd715f05.js',
        '2c0f785914da9d0b.js',
        '1f3808cbdfab97e4.js',
        '046a0bb70d03d0cc.js',
        '110fa1efdd0868b8.js',
        '1a1c717109ab67e1.js',
        '206ebb4e67a6daa9.js',
        '4ad6e3a59e27e9b1.js',
        'a62c6323a3696fa8.js',
        'fc020c065098cbd5.js',
        '050a006ae573e260.js',
        '574ea84fc61bdc31.js',
        '6c4fe38464c16309.js',
        '8643da76fe7e95c7.js',
        '3dbb6e166b14a6c0.js',
    ],
    explicit: [

        'eaee2c64dfc46b6a.js',
        'e0c3d30b6fe96812.js',
        'c85fbdb8c97e0534.js',
        'abd5e4aa1a9f99ba.js',
        '7a405ea1fdb6a26e.js',
        '44f31660bd715f05.js',
        '2c0f785914da9d0b.js',
        '1f3808cbdfab97e4.js',
        '046a0bb70d03d0cc.js',

        // Same tests as above
        '110fa1efdd0868b8.js',
        '1a1c717109ab67e1.js',
        '206ebb4e67a6daa9.js',
        'fc020c065098cbd5.js',
        '4ad6e3a59e27e9b1.js',
        '597108fd45a6e79b.js',
        // This tests violate the specs, and should not pass
        // See: https://github.com/tc39/test262/blob/master/test/language/statements/function/13.1-42-s.js
        '040001f3b0eb3bde.js',
        '050a006ae573e260.js',
        '574ea84fc61bdc31.js',
        '6c4fe38464c16309.js',
        '8643da76fe7e95c7.js',
        'ce5f3bc27d5ccaac.js'
    ],
    fail: [

        'beead77994cf5733.js',
        '85ee036d67974729.js',
        'a5370cb0412d7c8a.js',
        'ef2d369cccc5386c.js',
        'fd2a45941e114896.js',
        'e3fbcf63d7e43ead.js',
        'a38011d2c010999e.js',
        '7b876ca5139f1ca8.js',
        '15a6123f6b825c38.js',
        '1a5b0dfa9fde985d.js',
        '1acada3c651821cf.js',
        '147fa078a7436e0e.js',
        '569a2c1bad3beeb2.js',

    ]
};

const parse = (src: string, module: boolean) => (module ? parseModule : parseScript)(src);

const isModule = (val: string) => /\.module\.js/.test(val);

describe('Test262 Parser tests', () => {

    describe('Pass', () => {
        for (const f of readdirSync(`${Test262Dir}/pass`)) {
            if (expectations.pass.indexOf(f) !== -1) continue;
            it(`Should pass -  [${f}]`, () => {
                const passSrc = readFileSync(`${Test262Dir}/pass/${f}`, 'utf8');
                t.doesNotThrow(() => {
                    parse(passSrc, isModule(f));
                });
            });
        }
    });

    describe('Pass explicit', () => {
        for (const f of readdirSync(`${Test262Dir}/pass-explicit`)) {
            if (expectations.explicit.indexOf(f) !== -1) continue;
            it(`Should pass -  [${f}]`, () => {
                const passSrc = readFileSync(`${Test262Dir}/pass-explicit/${f}`, 'utf8');
                t.doesNotThrow(() => {
                    parse(passSrc, isModule(f));
                });
            });
        }
    });

    describe('Fail', () => {
        for (const f of readdirSync(`${Test262Dir}/fail`)) {
            if (expectations.fail.indexOf(f) !== -1) continue;
            it(`Should fail on - [${f}]`, () => {
                const passSrc = readFileSync(`${Test262Dir}/fail/${f}`, 'utf8');
                t.throws(() => {
                    parse(passSrc, isModule(f));
                });
            });
        }
    });
});
