import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Miscellaneous - Scoping', () => {

    describe('Pass', () => {

        const validSyntax = [

            `(function foo(y, z) {{ function x() {} } })(1);`,
            // Complex parameter shouldn't be shadowed
            `(function foo(x = 0) { var x; { function x() {} } })(1);`,
            // Nested complex parameter shouldn't be shadowed
            `(function foo([[x]]) {var x; {function x() {} } })([[1]]);`,
            // Complex parameter shouldn't be shadowed
            `(function foo(x = 0) { var x; { function x() {}} })(1);`,
            // Nested complex parameter shouldn't be shadowed
            `(function shadowingVarNestedParameterDoesntBind([[x]]) { var x;{ function x() {} }  })([[1]]);`,
            // Rest parameter shouldn't be shadowed
            `(function shadowingVarRestParameterDoesntBind(...x) { var x; {  function x() {}  } })(1);`,
            // Don't shadow complex rest parameter
            `(function shadowingVarComplexRestParameterDoesntBind(...[x]) { var x; { function x() {} } })(1);`,
            // Hoisting is not affected by other simple parameters
            `(function irrelevantParameterBinds(y, z) {{function x() {}} })(1);`,
            // Hoisting is not affected by other complex parameters
            ` (function irrelevantComplexParameterBinds([y] = [], z) {{function x() {} } })();`,
            // Should allow shadowing function names
            `{(function foo() { { function foo() { return 0; } } })();}`,
            `{(function foo(...r) { { function foo() { return 0; } } })(); }`,
            `(function foo() { { let f = 0; (function () { { function f() { return 1; } } })(); } })();`,
            `(function foo() { var y = 1; (function bar(x = y) { { function y() {} } })();  })();`,
            `(function foo() { { let f = 2; { let y = 3; function f() { y = 2; } f(); } }})();`,
            `(function foo() { { function f() { return 4; } { function f() { return 5; } } }})()`,
            '(function foo(a = 0) { { let y = 3; function f(b = 0) { y = 2; } f(); } })();'
        ];

        for (const arg of validSyntax) {
            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });
        }
    });
});