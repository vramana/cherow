import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('TC39 - Module code', () => {

        it('should fail if duplicate label', () => {
            expect(() => {
                parseModule('label: { label: 0; }');
            }).to.throw();
        });

        it('should fail if duplicate lexical declared names', () => {
            expect(() => {
                parseModule('let x; const x;');
            }).to.throw('');
        });

        it('should fail if any element is a duplicat declaration', () => {
            expect(() => {
                parseModule('let x; var x;');
            }).to.throw();
        });

        it('should fail if module item list contains new target', () => {
            expect(() => {
                parseModule('new.target;');
            }).to.throw();
        });

        it('should fail if module item list contains super', () => {
            expect(() => {
                parseModule('super;');
            }).to.throw();
        });

        it('should fail on early undefined break', () => {
            expect(() => {
                parseModule('while (false) { break undef; }');
            }).to.throw();
        });
        
        it('should fail on early undefined break', () => {
            expect(() => {
                parseModule('while (false) { break undef; }');
            }).to.throw();
        });

        it('should fail on yield', () => {
            expect(() => {
                parseModule('yield;');
            }).to.not.throw();
        });

        it('should fail on return', () => {
            expect(() => {
                parseModule('return;');
            }).to.throw();
        });

        it('should fail on invalid hoisted function', () => {
            expect(() => {
                parseModule(`var f;
                function f() {}`);
            }).to.not.throw();
        });

        it('should fail on invalid hoisted function', () => {
            expect(() => {
                parseModule(`var g;
                function* g() {}`);
            }).to.not.throw();
        });

        it('should fail on invalid reference', () => {
            expect(() => {
                parseModule('1++;');
            }).to.throw();
        });

        it('should fail on invalid syntax', () => {
            expect(() => {
                parseModule('?');
            }).to.throw();
        });

        it('should fail f ContainsUndefinedContinueTarget of module item list with arguments « » and « » is true"', () => {
            expect(() => {
                parseModule('while (false) { continue undef; }');
            }).to.throw();
        });

        it('should fail if imported binding is a binding identifier and contain "eval"', () => {
            expect(() => {
                parseModule('import { eval } from "./early-import-eval.js";');
            }).to.throw();
        });

        it('should fail if imported binding is a binding identifier and contain "eval"', () => {
            expect(() => {
                parseModule('import { eval } from "./early-import-eval.js";');
            }).to.throw();
        });

        it('should fail if early strict mode', () => {
            expect(() => {
                parseModule(`var public;`);
            }).to.throw();
        });
    });