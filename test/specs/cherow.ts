import { parseScript, parseModule } from '../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

console.log(parseScript)

describe('V8 - Do expression', () => {
 
    it.skip('should parse conditional', () => {
        expect(parseScript(`for ({...rest} of ["foo"]) {}`, {
            ranges: true,
            raw: true,
            next: true,
            v8: true
        })).to.eql({
     });
    });
});