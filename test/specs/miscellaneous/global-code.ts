import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Global code', () => {

        it('should fail if an ArrowFunction in global code contain SuperCall', () => {
            expect(() => {
                parseScript('() => { super(); };'); }).to.throw();
        });

        it('should fail if global code contain SuperCall', () => {
            expect(() => {
                parseScript('super();')
            }).to.throw()
        });

        it('should fail if global code contain Super property', () => {
            expect(() => {
                parseScript('super.property;')
            }).to.throw()
        });
      
});