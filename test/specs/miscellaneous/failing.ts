import { parseScript, parseModule, parse } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Failing', () => {

    it('should throw on eval in array pattern', () => {
        expect(() => {
            parseScript('"use strict"; [,,,eval,] = 0');
        }).to.throw();
    });

    it('should throw on arguments in array pattern', () => {
        expect(() => {
            parseScript('"use strict"; [,,,arguments,] = 0');
        }).to.throw();
    });

    it('should fail on ""use strict"; [eval] = 0;"', () => {
        expect(() => {
            parseScript('"use strict"; [eval] = 0');
        }).to.throw('');
    });

    it('should fail on ""use strict"; arguments = 0;"', () => {
        expect(() => {
            parseScript('"use strict"; arguments = 0;');
        }).to.throw();
    });
});