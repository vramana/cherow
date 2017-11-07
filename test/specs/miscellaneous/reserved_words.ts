import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Reserved words', () => {

        it('should fail on invalid use of escaped / non-escaped keyword as identifier - break', () => {
            expect(() => {
                parseScript('(function(){var \\u0062reak;})()');
            }).to.throw();
        });

        it('should fail on invalid use of escaped / non-escaped keyword as identifier - case', () => {
            expect(() => {
                parseScript('(function(){var \\u0063ase;})()');
            }).to.throw();
        });

        it('should fail on invalid use of escaped / non-escaped keyword as identifier - catch', () => {
            expect(() => {
                parseScript('(function(){var \\u0063atch;})()');
            }).to.throw();
        });

        it('should fail on invalid use of escaped / non-escaped keyword as identifier - delete', () => {
            expect(() => {
                parseScript('(function(){var \\u0064elete;})()');
            }).to.throw();
        });

        it('should fail on invalid use of escaped / non-escaped keyword as identifier - finaly', () => {
            expect(() => {
                parseScript('(function(){var \\u0066inally;})()');
            }).to.throw();
        });

        it('should fail on invalid use of escaped / non-escaped keyword as identifier - in', () => {
            expect(() => {
                parseScript('(function(){var in;})()');
            }).to.throw();
        });

        it('should fail on invalid use of escaped / non-escaped keyword as identifier - typeof', () => {
            expect(() => {
                parseScript('(function(){var \\u0074ypeof;})()');
            }).to.throw();
        });


        it('should fail on invalid use of escaped / non-escaped keyword as identifier - debugger', () => {
            expect(() => {
                parseScript('(function(){function debugger(){}})();');
            }).to.throw();
        });

        
        it('should fail on invalid use of escaped / non-escaped keyword as identifier - const', () => {
            expect(() => {
                parseScript('(function(){function \\u0063onst(){}})()');
            }).to.throw();
        });

        
        it('should fail on invalid use of escaped / non-escaped keyword as identifier - typeof', () => {
            expect(() => {
                parseScript('(function(){function debugger(){}})();');
            }).to.throw();
        });

        
        it('should fail on invalid use of escaped / non-escaped keyword as identifier - typeof', () => {
            expect(() => {
                parseScript('(function(){function debugger(){}})();');
            }).to.throw();
        });

});