import { parseScript, parseModule } from '../../src/cherow';
import { readdirSync, readFileSync } from 'fs';
import * as t from 'assert';

const Test262Dir = 'node_modules/test262-parser-tests';

const expectations = {
    pass: [
        '597108fd45a6e79b.js',
        '110fa1efdd0868b8.js',
        '1a1c717109ab67e1.js',
        '206ebb4e67a6daa9.js',
        '4ad6e3a59e27e9b1.js',
        'a62c6323a3696fa8.js',
        'fc020c065098cbd5.js',

        // This tests violate the specs, and should not pass
        // See: https://github.com/tc39/test262/blob/master/test/language/statements/function/13.1-42-s.js
        '040001f3b0eb3bde.js',
        '050a006ae573e260.js',
        '574ea84fc61bdc31.js',
        '6c4fe38464c16309.js',
        '8643da76fe7e95c7.js',
        '3dbb6e166b14a6c0.js',
    ],
    explicit: [
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
        'a5370cb0412d7c8a.js',
        'ef2d369cccc5386c.js',
        'fd2a45941e114896.js',
        'e3fbcf63d7e43ead.js',
        'dc5864c9096ad0a8.js',
        'db41a80ccf646002.js',
        'ca3dd7ea0b4626dd.js',
        'c045e273186c0644.js',
        'a9431906f263368d.js',
        'a38011d2c010999e.js',
        'bcde05eea9466dfd.js',
        'c0ad1c20e662c8ed.js',
        '7b876ca5139f1ca8.js',
        '75f1656578c2d7e8.js',
        '4ef1d6ca8eceb313.js',
        '50a060984b757dc1.js',
        '95e67679ebbacf14.js',
        '90cd97db35a1a503.js',
        '68766c3f46c4851a.js',
        '479332b63ff26de1.js',
        '3bc2b27a7430f818.js',
        '8bf8438d0a686b4e.js',
        '3d3e6ce2b81a224d.js',
        '15a6123f6b825c38.js',
        '1a5b0dfa9fde985d.js',
        '1acada3c651821cf.js',
        '28520880d460c4f9.js',
        '2fa321f0374c7017.js',
        '346316bef54d805a.js',
        '4e885526e8dfaa12.js',
        '03d13b6c40f6aaea.js',
        '147fa078a7436e0e.js',
        '0ebf57bd8c051d27.js',
        '08bafe059b17ac92.js',

        'dfc6f1cc5533e0bb.js',
        'dc14ac854168468f.js',
         'a793dd27762c8ec8.js',
         '783aeb8c90c3775d.js',
        '569a2c1bad3beeb2.js',
         '2884c585d2f035a5.js',
         '168502012959421f.js',
    ],
    early: [

        '301abb5ba3b6506a.js',
        'd33fac4370fa022c.js',
        '02ea8b2ade05bd70.js',
        '126221967461dba0.module.js',
        '13d24ad99ac46c21.module.js',
        '149af49baff5d371.js',
        '14d1d9ec5f97bd4e.module.js',
        '18de13cf45fc2107.module.js',
        '1fd7f24619b5f266.js',
        '272a7c1b82c9c8b8.module.js',
        '293d515dfacc7ea6.module.js',
        '32a3e279226eefa0.module.js',
        '3a29281d7d6fba5a.module.js',
        '3abbddaa6f253dec.js',
        '3c97613274574690.module.js',
        '3dd7d3e784a292d6.js',
        '41a7ff8ab6df21d6.js',
        '4e6529771ad3343f.module.js',
        '5127ca1fe7c943ba.module.js',
        '53699b3b15d7ce42.module.js',
        '58bb4a3a2d717d4f.js',
        '5b0f82ab482ac359.module.js',
        '5e601aa06b18557d.js',
        '6473f07239ed08ef.js',
        '69a9f6b6e2fa6bf6.js',
        '0f5f47108da5c34e.js',
        '6d96413c7ef0f717.js',
        '75943e9bc83b6d0e.js',
        '7a916ef0ccd4ea9c.js',
        '7ea0f80766201023.module.js',
        '7fc6f3a6590d207d.module.js',
        '84bf7b09d729a621.module.js',
        '87946387ad39dde7.js',
        '82c93f9933c9710a.js',
        '8ffe04111c1a982d.module.js',
        '91e632d1f6f140ed.js',
        '96533ed6c7244382.module.js',
        'a236c74609b92c02.module.js',
        'a87c5d5237b34393.module.js',
        'aa796531364c9806.js',
        'aecc5068d346867a.js',
        'b118f7ba23d3f8dd.module.js',
        'b6a72a718cb7ca67.js',
        'ba2bfa1952f3e537.module.js',
        'c211e5a7799f20ad.js',
        'c33da51b85893244.module.js',
        'cdceb01cec39f8d0.js',
        'd070112b8eb9781e.module.js',
        'd412cecc75edd30d.js',
        'de9d9a6cd61407f5.js',
        'e1831477442a7ebf.js',
        'e6a9e14c6a08a7f7.module.js',
        'e6bf6eec9bccde06.module.js',
        'e777215433af6809.module.js',
        'f25183676693850d.js',
        'f7f9bb74dc8d96ac.module.js',
        'f89017fd3f793d0d.js',
        'f9e0efceb5690fdd.module.js',
        'fa56fc427be3e801.module.js',
        '0cda0bd08ee5f32a.js',
        '06593c3474233eca.js',
        'd6828a45cebf554c.js',
        '4de83a7417cd30dd.js'
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
/*
    describe('Early errors', () => {
        for (const f of readdirSync(`${Test262Dir}/early`)) {
            if (expectations.early.indexOf(f) !== -1) continue;
            const passTestFile = `${Test262Dir}/early/${f}`;
            it(`should fail on early error [${f}]`, () => {
                const passSrc = readFileSync(`${Test262Dir}/early/${f}`, 'utf8');
                t.throws(() => {
                    parse(passSrc, isModule(f));
                });
            });
        }
    });*/
});