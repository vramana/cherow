import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Destructuring - Miscellaneous', () => {
  // Tests for destructuring
  for (const arg of [
    'a',
    '{ x : y }',
    '{ x : y = 1 }',
    '{ get, set }',
    '{ get = 1, set = 2 }',
    '[a]',
    '[a = 1]',
    '[a,b,c]',
    '[a, b = 42, c]',
    '{ x : x, y : y }',
    '{ x : x = 1, y : y }',
    '{ x : x, y : y = 42 }',
    '[]',
    '{}',
    '[{x:x, y:y}, [a,b,c]]',
    '[{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]]',
    '{x}',
    '{x, y}',
    '{x = 42, y = 15}',
    '[a,,b]',
    '{42 : x}',
    '{42 : x = 42}',
    '{42e-2 : x}',
    '{42e-2 : x = 42}',
    '{x : y, x : z}',
    "{'hi' : x}",
    "{'hi' : x = 42}",
    '{var: x}',
    '{var: x = 42}',
    '{[x] : z}',
    '{[1+1] : z}',
    '{[foo()] : z}',
    '{}',
    '[...rest]',
    '[a,b,...rest]',
    '[a,,...rest]',
    '{ __proto__: x, __proto__: y}',
    '{arguments: x}',
    '{eval: x}',
    '{ x : y, ...z }',
    '{ x : y = 1, ...z }',
    '{ x : x, y : y, ...z }',
    '{ x : x = 1, y : y, ...z }',
    '{ x : x, y : y = 42, ...z }',
    '[{x:x, y:y, ...z}, [a,b,c]]',
    '[{x:x = 1, y:y = 2, ...z}, [a = 3, b = 4, c = 5]]',
    '{...x}',
    '{x, ...y}',
    '{x = 42, y = 15, ...z}',
    '{42 : x = 42, ...y}',
    "{'hi' : x, ...z}",
    "{'hi' : x = 42, ...z}",
    '{var: x = 42, ...z}',
    '{[x] : z, ...y}',
    '{[1+1] : z, ...x}',
    '{arguments: x, ...z}',
    '{ __proto__: x, __proto__: y, ...z}'
  ]) {
    it(`'use strict'; let ${arg} = {};`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; let ${arg} = {};`, undefined, Context.Empty);
      });
    });

    it(`'use strict'; const ${arg} = {};`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; const ${arg} = {};`, undefined, Context.Empty);
      });
    });

    it(`function f(${arg}) {}`, () => {
      t.doesNotThrow(() => {
        parseSource(`function f(${arg}) {}`, undefined, Context.Empty);
      });
    });

    it(`var f = (${arg}) => {};`, () => {
      t.doesNotThrow(() => {
        parseSource(`var f = (${arg}) => {};`, undefined, Context.Empty);
      });
    });

    it(`var f = (argument1,${arg}) => {};`, () => {
      t.doesNotThrow(() => {
        parseSource(`var f = (argument1,${arg}) => {};`, undefined, Context.Empty);
      });
    });

    it(`try {} catch(${arg}) {}`, () => {
      t.doesNotThrow(() => {
        parseSource(`try {} catch(${arg}) {}`, undefined, Context.Empty);
      });
    });
  }

  // Tests for destructuring
  for (const arg of [
    'a++',
    '++a',
    'delete a',
    'void a',
    'typeof a',
    '--a',
    '+a',
    '-a',
    '~a',
    '!a',
    '{ x : y++ }',
    '[a++]',
    '(x => y)',
    '(async x => y)',
    '((x, z) => y)',
    '(async (x, z) => y)',
    //"a[i]",
    'a()',
    'a.b',
    'new a',
    'a + a',
    'a - a',
    'a * a',
    'a / a',
    'a == a',
    'a != a',
    'a > a',
    'a < a',
    'a <<< a',
    'a >>> a',
    'function a() {}',
    'function* a() {}',
    'async function a() {}',
    'a`bcd`',
    'this',
    'null',
    'true',
    'false',
    '1',
    "'abc'",
    '/abc/',
    '`abc`',
    'class {}',
    '{+2 : x}',
    '{-2 : x}',
    'var',
    '[var]',
    '{x : {y : var}}',
    '{x : x = a+}',
    '{x : x = (a+)}',
    '{x : x += a}',
    '{m() {} = 0}',
    '{[1+1]}',
    '[...rest, x]',
    '[a,b,...rest, x]',
    '[a,,...rest, x]',
    '[...rest,]',
    '[a,b,...rest,]',
    '[a,,...rest,]',
    '[...rest,...rest1]',
    '[a,b,...rest,...rest1]',
    '[a,,..rest,...rest1]',
    '[x, y, ...z = 1]',
    '[...z = 1]',
    '[x, y, ...[z] = [1]]',
    '[...[z] = [1]]',
    '{ x : 3 }',
    "{ x : 'foo' }",
    '{ x : /foo/ }',
    '{ x : `foo` }',
    '{ get a() {} }',
    '{ set a() {} }',
    '{ method() {} }',
    '{ *method() {} }',
    '...a++',
    '...++a',
    '...typeof a',
    '...[a++]',
    '...(x => y)',
    '{ ...x, }',
    '{ ...x, y }',
    '{ y, ...x, y }',
    '{ ...x, ...y }',
    '{ ...x, ...x }',
    '{ ...x, ...x = {} }',
    '{ ...x, ...x = ...x }',
    '{ ...x, ...x = ...{ x } }',
    '{ ,, ...x }',
    '{ ...get a() {} }',
    '{ ...set a() {} }',
    '{ ...method() {} }',
    '{ ...function() {} }',
    '{ ...*method() {} }',
    // "{...{x} }",
    // "{...[x] }",
    // "{...{ x = 5 } }",
    // "{...[ x = 5 ] }",
    '{...x.f }',
    '{...x[0] }',
    'async function* a() {}'
  ]) {
    it(`'use strict'; let ${arg} = {};`, () => {
      t.throws(() => {
        parseSource(`'use strict'; let ${arg} = {};`, undefined, Context.Empty);
      });
    });

    it(`var  ${arg} = {};`, () => {
      t.throws(() => {
        parseSource(`var  ${arg} = {};`, undefined, Context.Empty);
      });
    });

    it(`'use strict'; const  ${arg} = {};`, () => {
      t.throws(() => {
        parseSource(`'use strict'; const  ${arg} = {};`, undefined, Context.Empty);
      });
    });

    it(`function f(${arg}) {}`, () => {
      t.throws(() => {
        parseSource(`function f(${arg}) {}`, undefined, Context.Empty);
      });
    });

    // it(`var f = (${arg}) => {};`, () => {
    // t.throws(() => {
    // parseSource(`var f = (${arg}) => {};`, undefined, Context.Empty);
    // });
    // });

    it(`try {} catch(${arg}) {}`, () => {
      t.throws(() => {
        parseSource(`try {} catch(${arg}) {}`, undefined, Context.Empty);
      });
    });
  }
});
