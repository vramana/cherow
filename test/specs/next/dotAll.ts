import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Next - DotAll', () => {

    it('should fail and report as unterminated regExp on duplicate DotAll without "next" option enabled', () => {
        expect(() => {
            parseScript(`/./ss;`);
        }).to.throw('Unexpected regular expression flag');
    });

    it('should fail correctly on duplicate DotAll flag with "next" option enabled', () => {
        expect(() => {
            parseScript(`/./ss;`, {
                next: true
            });
        }).to.throw('Duplicate regular expression flag s');
    });

});