import { Context } from '../../../src/common';
import { fail } from '../../test-utils';
describe('Module - Miscellaneous', () => {
  fail('Module - Miscellaneous (failures)', [
    [
      `/*
    */-->`,
      Context.Module | Context.Strict
    ],
    ['-->', Context.Module | Context.Strict],
    ['super;', Context.Module | Context.Strict],
    ['new.target;', Context.Module | Context.Strict],
    [
      `let x;
    var x;`,
      Context.Module | Context.Strict
    ],
    ['export default var eval = x;', Context.Module | Context.Strict],
    ['function eval(){ }', Context.Module | Context.Strict],
    ['function f(x=arguments=10){ }', Context.Module | Context.Strict],
    ['label: { label: 0; }', Context.Module | Context.Strict],
    ['yield;', Context.Module | Context.Strict],
    ['?', Context.Module | Context.Strict],
    ['export {} null;', Context.Module | Context.Strict],
    ['export * from "./parse-err-semi-export-star.js" null;', Context.Module | Context.Strict],
    ['export default null null;', Context.Module | Context.Strict],
    ['return;', Context.Module | Context.Strict],
    [
      `var g;
    function* g() {}`,
      Context.Module | Context.Strict
    ],
    [
      `var f;
    function f() {}`,
      Context.Module | Context.Strict
    ],
    ['export default let x;', Context.Module | Context.Strict],
    ['export default null, null;', Context.Module | Context.Strict],
    ['export default const x = null;', Context.Module | Context.Strict],
    ['function f() { export default null; }', Context.Module | Context.Strict],
    [
      `for (var y of [])
    export default null;`,
      Context.Module | Context.Strict
    ],
    [`() => { export default null; };`, Context.Module | Context.Strict],
    [`while (false) { continue undef; }`, Context.Module | Context.Strict],
    ['var public;', Context.Module | Context.Strict],
    ['"use strict"; with (x) y;', Context.Module | Context.Strict],
    ['class X { foo() { with (x) y; } }', Context.Module | Context.Strict],
    ['"use strict"; with (x) y;', Context.Module | Context.Strict],
    ['"use strict"; with (x) y;', Context.Module | Context.Strict],
    ["'use strict'; with (x) y;", Context.Module],
    ['"use strict";\nwith (x) y;', Context.Module],
    ['function f(){ "use strict"; with (x) y; }', Context.Module | Context.Strict],
    ['function f(){ "use strict"\nwith (x) y; }', Context.Module],
    ['function f(x=y){"use strict";}', Context.Module],
    ['"use strict"; with (x) y;', Context.Module | Context.Strict],
    ['+function f([x]){"use strict";}', Context.Empty],
    ['({x:function([x]){"use strict";}})', Context.Empty],
    ['({x:function(a, x=y){"use strict";}})', Context.Empty],
    ['+function f(a, [x]){"use strict";}', Context.Empty],
    ['({x:function(a, [x]){"use strict";}})', Context.Empty],
    ['function f([x], a){"use strict";}', Context.Empty],
    ['({x:function([x], a){"use strict";}})', Context.Empty]

    // TODO: (fkleuver)  Fixing Token.ts and add this as 'tokens' as it was before will make this fail
    // ['import {foo as eval} from "x";', Context.Module | Context.Strict],
    // ['import {eval} from "x";', Context.Module | Context.Strict],
  ]);
});
