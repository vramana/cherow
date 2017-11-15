import { fail, pass } from '../utils/test-utils';

describe('Statements - For of', () => {

    fail('async function declaration is not allowed in statement position', 'for (var x of []) async function f() {}')
    fail('async generator function declaration is not allowed in statement position', '"use strict"; for ({ x: [x = yield] } of [{ x: [] }]) ;')
    fail('lexical declaration (const) in statement position', 'for (var x of []) const y = null;')
    fail('left hand side expression is not a simple assignment target', 'for ((this) of []) {}')
    fail('destructuring assignment pattern (array literal)', 'for ([(x, y)] of []) {}')
    fail('use of lexical (let)', 'for (this of []) {}')
    fail('for (x of []) label1: label2: function f() {}', 'for (x of []) label1: label2: function f() {}')
    fail('for ( let of [] ) ;', 'for ( let of [] ) ;')
    fail('for (const let of []) {}', 'for (const let of []) {}')
    fail('for (var x o\\u0066 []) ;', 'for (var x o\\u0066 []) ;')
    fail('for ( let of [] ) ;', 'for ( let of [] ) ;')
    fail('"use strict"; for (x of let) {}', '"use strict"; for (x of let) {}')
    fail('for (var {x} = y of z);', 'for (var {x} = y of z);')
    fail('for (const x = 1 of y);', 'for (const x = 1 of y);')
    fail('for (x=0 of y);', 'for (x=0 of y);')
    fail('for ( ; false; ) async function* g() {}', 'for ( ; false; ) async function* g() {}')
    fail('for (x=0 of y);', 'for (x=0 of y);')
    fail('for (const x; false; ) label1: label2: function f() {}', 'for (const x; false; ) label1: label2: function f() {}')

    fail('for (var x of []) function f() {}', 'for (var x of []) function f() {}')
    fail('for (const let of []) {}', 'for (const let of []) {}')
    fail('for ((this) of []) {}', 'for ((this) of []) {}')
    fail('for(this of 0);', 'for(this of 0);')
    fail('for(var a = 0 of b);', 'for(var a = 0 of b);')
});