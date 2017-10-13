import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Compound assignment', () => {

    it('should fail on add non simple', () => {
        expect(() => {
            parseScript(`1 += 1;`);
        }).to.throw()
    });

    it('should fail on bitwise and non simple', () => {
        expect(() => {
            parseScript(`1 &= 1;`);
        }).to.throw()
    });

    it('should fail on mod div non simple', () => {
        expect(() => {
            parseScript(`1 %= 1;`);
        }).to.throw()
    });

    it('should fail on subtract non simple', () => {
        expect(() => {
            parseScript(`1 -= 1;`);
        }).to.throw()
    });

    it('should fail on u-right shift non simple', () => {
        expect(() => {
            parseScript(`1 >>>= 1;`);
        }).to.throw()
    });
});