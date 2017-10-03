import { parseScript, parseModule } from '../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('V8 - Do expression', () => {

    it('should fail on invalid use of await as label', () => {
        expect(() => {
            parseScript(`class A extends B { constructor() { super; } }`);
        }).to.throw();
    });

    
});