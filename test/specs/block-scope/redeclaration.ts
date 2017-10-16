import { parseScript, parseModule, parse } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Block scope - Redeclaration', () => {

    it('should fail on redeclaration with AsyncFunctionDeclaration (AsyncFunctionDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function f() {} async function f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with AsyncGeneratorDeclaration (AsyncFunctionDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function f() {} async function* f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with ClassDeclaration (AsyncFunctionDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function f() {} class f {}; }');
        }).to.throw();
    });

    it('should fail on redeclaration with const-LexicalDeclaration (AsyncFunctionDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function f() {} const f = 0; }');
        }).to.throw();
    });

    it('should fail on redeclaration with FunctionDeclaration (AsyncFunctionDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function f() {} function f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with VariableDeclaration (AsyncFunctionDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function f() {} var f; }');
        }).to.throw();
    });

    it('should fail on redeclaration with AsyncFunctionDeclaration (AsyncGeneratorDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function* f() {} async function f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with AsyncGeneratorDeclaration (AsyncGeneratorDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function* f() {} async function* f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with ClassDeclaration (AsyncGeneratorDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function* f() {} class f {}; }');
        }).to.throw();
    });

    it('should fail on redeclaration with const-LexicalDeclaration (AsyncGeneratorDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function* f() {} const f = 0; }');
        }).to.throw();
    });

    it('should fail on redeclaration with FunctionDeclaration (AsyncGeneratorDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function* f() {} function f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with GeneratorDeclaration (AsyncGeneratorDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function* f() {} function* f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with let-LexicalDeclaration (AsyncGeneratorDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function* f() {} let f; }');
        }).to.throw();
    });

    it('should fail on redeclaration with VariableDeclaration (AsyncGeneratorDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ async function* f() {} var f; }');
        }).to.throw();
    });

    it('should fail on redeclaration with AsyncFunctionDeclaration (ClassDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ class f {} async function f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with AsyncGeneratorDeclaration (ClassDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ class f {} async function* f() {} }');
        }).to.throw();
    });
    it('should fail on redeclaration with ClassDeclaration (ClassDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ class f {} class f {}; }');
        }).to.throw();
    });

    it('should fail on redeclaration with const-LexicalDeclaration (ClassDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ class f {} const f = 0; }');
        }).to.throw();
    });

    it('should fail on redeclaration with FunctionDeclaration (ClassDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ class f {} function f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with const-LexicalDeclaration (FunctionDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ function f() {} const f = 0; }');
        }).to.throw();
    });

    it('should fail on redeclaration with VariableDeclaration (FunctionDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ function f() {} var f; }');
        }).to.not.throw();
    });
    it('should fail on redeclaration with AsyncGeneratorDeclaration (GeneratorDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ function* f() {} async function* f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with ClassDeclaration (GeneratorDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ function* f() {} class f {}; }');
        }).to.throw();
    });

    it('should fail on redeclaration with let-LexicalDeclaration (GeneratorDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ function* f() {} let f; }');
        }).to.throw();
    });

    it('should fail on redeclaration with AsyncFunctionDeclaration (LexicalDeclaration (let) in BlockStatement)', () => {
        expect(() => {
            parseScript('{ let f; async function f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with ClassDeclaration (LexicalDeclaration (let) in BlockStatement)', () => {
        expect(() => {
            parseScript('{ let f; class f {}; }');
        }).to.throw();
    });
    it('should fail on redeclaration with const-LexicalDeclaration (LexicalDeclaration (let) in BlockStatement)', () => {
        expect(() => {
            parseScript('{ let f; const f = 0; }');
        }).to.throw();
    });

    it('should fail on redeclaration with VariableDeclaration (LexicalDeclaration (let) in BlockStatement)', () => {
        expect(() => {
            parseScript('{ let f; var f; }');
        }).to.throw();
    });

    it('should fail on redeclaration with AsyncFunctionDeclaration (VariableDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ var f; async function f() {} }');
        }).to.throw();
    });

    it('should fail on redeclaration with let-LexicalDeclaration (VariableDeclaration in BlockStatement)', () => {
        expect(() => {
            parseScript('{ var f; let f; }');
        }).to.throw();
    });
});