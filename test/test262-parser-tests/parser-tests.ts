import { parseScript, parseModule } from '../../src/cherow';
import { readdirSync, readFileSync } from 'fs';
import expectations from './whitelist';
import * as t from 'assert';

const Test262Dir = 'node_modules/test262-parser-tests';

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
    });
});