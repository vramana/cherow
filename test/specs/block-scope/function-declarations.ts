import { parseScript, parseModule, parse } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Block scope - Function declarations', () => {

    it('should fail on statement position for statement', () => {
        expect(() => {
            parseScript('"use strict"; for (;false;) function g() {}');
        }).to.throw();
    });

    it('should fail on statement position for default statement list', () => {
        expect(() => {
            parseScript('switch (true) { default: function g() {} }');
        }).to.not.throw();
    });

    it('should fail on statement position for do statement while expression', () => {
        expect(() => {
            parseScript('"use strict"; do function g() {} while (false)');
        }).to.throw();
    });

    it('should fail on statement position if statement expression', () => {
        expect(() => {
            parseScript('"use strict"; if (true) function g() {}');
        }).to.throw();
    });
});