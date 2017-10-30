import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
import { readdirSync, readFileSync } from 'fs';
import expectations from './whitelist';

const expect = chai.expect;
const Test262Dir = 'node_modules/test262-parser-tests';

function parse(src: string, asModule: boolean) {
    return (asModule ? parseModule : parseScript)(src);
}

describe('Test262 Parser tests', () => {
    
    describe('Pass', () => {
        for (const f of readdirSync(`${Test262Dir}/pass`)) {
            if (expectations.pass.indexOf(f) !== -1) {
                continue;
            }
            const passTestFile = `${Test262Dir}/pass/${f}`;
            it(`Should pass -  [${f}]`, () => {
                const passSrc = readFileSync(passTestFile, 'utf8');
                expect(() => {
                    parse(passSrc, /\.module\.js/.test(f));
                }).to.not.throw();
            });
        }
    });

    describe('Pass explicit', () => {
        for (const f of readdirSync(`${Test262Dir}/pass-explicit`)) {
            if (expectations.explicit.indexOf(f) !== -1) {
                continue;
            }
            const passTestFile = `${Test262Dir}/pass-explicit/${f}`;
            it(`Should pass -  [${f}]`, () => {
                const passSrc = readFileSync(passTestFile, 'utf8');
                expect(() => {
                    parse(passSrc, /\.module\.js/.test(f));
                }).to.not.throw();
            });
        }
    });

    describe('Fail', () => {
        for (const f of readdirSync(`${Test262Dir}/fail`)) {
            if (expectations.fail.indexOf(f) !== -1) {
                continue;
            }
            const passTestFile = `${Test262Dir}/fail/${f}`;
            it(`Should fail on - [${f}]`, () => {
                const passSrc = readFileSync(passTestFile, 'utf8');
                expect(() => {
                    parse(passSrc, /\.module\.js/.test(f));
                }).to.throw();
            });
        }
    });

    describe('Early errors', () => {
        for (let f of readdirSync(`${Test262Dir}/early`)) {
            if (expectations.early.indexOf(f) !== -1) {
                continue;
            }
            const passTestFile = `${Test262Dir}/early/${f}`;
            it(`should fail on early error [${f}]`, () => {
                const passSrc = readFileSync(passTestFile, 'utf8');
                expect(() => {
                    parse(passSrc, /\.module\.js/.test(f));
                }).to.throw();
            });
        }
    });
});