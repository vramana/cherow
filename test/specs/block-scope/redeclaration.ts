import { fail } from '../utils/test-utils';

describe('Block scope - Redeclaration', () => {

    fail('redeclaration within block', '{ let f; function f() {} }');
    fail('attempt to redeclare let binding with var', '{ let f; var f; }');
    fail('redeclaration with AsyncFunctionDeclaration (AsyncFunctionDeclaration in BlockStatement)', '{ async function f() {} async function f() {} }');
    fail('redeclaration with AsyncGeneratorDeclaration (AsyncFunctionDeclaration in BlockStatement)', '{ async function f() {} async function* f() {} }');
    fail('redeclaration with const-LexicalDeclaration (AsyncFunctionDeclaration in BlockStatement)', '{ async function f() {} const f = 0; }');
    fail('redeclaration with FunctionDeclaration (AsyncFunctionDeclaration in BlockStatement)', '{ async function f() {} function f() {} }');
    fail('redeclaration with VariableDeclaration (AsyncFunctionDeclaration in BlockStatement)', '{ async function f() {} var f; }');
    fail('redeclaration with AsyncFunctionDeclaration', '{ async function* f() {} async function f() {} }');
    fail('redeclaration with ClassDeclaration ', '{ async function* f() {} const f = 0; }');
    fail('redeclaration with let-LexicalDeclaration', '{ async function* f() {} let f; }');
    fail('redeclaration with AsyncFunctionDeclaration', '{ class f {} async function f() {} }');
    fail('redeclaration with ClassDeclaration', '{ class f {} class f {}; }');
    fail('redeclaration with const-LexicalDeclaration', '{ function f() {} const f = 0; }');
    fail('redeclaration with AsyncGeneratorDeclaration', '{ function* f() {} async function* f() {} }');
    fail('redeclaration with VariableDeclaration ', '{ let f; var f; }');
    fail('redeclaration with AsyncFunctionDeclaration', '{ var f; async function f() {} }');
    fail('redeclaration with VariableDeclaration ', '{ let f; var f; }');
    fail('redeclaration with let-LexicalDeclaration', '{ var f; let f; }');
});