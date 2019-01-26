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
    '{ x : ++y }',
    '{ x : y * 2 }',
    '{ get x() {} }',
    '{ set x() {} }',
    '{ x: y() }',
    '{ this }',
    '{ x: this }',
    '{ x: this = 1 }',
    '{ super }',
    '{ x: super }',
    '{ x: super = 1 }',
    '{ new.target }',
    '{ x: new.target }',
    '{ x: new.target = 1 }',
    '{ import.meta }',
    '{ x: import.meta }',
    '{ x: import.meta = 1 }',
    '[x--]',
    '[--x = 1]',
    '[x()]',
    '[this]',
    '[this = 1]',
    '[new.target]',
    '[new.target = 1]',
    '[import.meta]',
    '[import.meta = 1]',
    '[super]',
    '[super = 1]',
    '[function f() {}]',
    '[async function f() {}]',
    '[function* f() {}]',
    '[50]',
    '[(50)]',
    '[(function() {})]',
    '[(async function() {})]',
    '[(function*() {})]',
    '[(foo())]',
    '{ x: 50 }',
    '{ x: (50) }',
    "['str']",
    "{ x: 'str' }",
    "{ x: ('str') }",
    '{ x: (foo()) }',
    '{ x: function() {} }',
    '{ x: async function() {} }',
    '{ x: function*() {} }',
    '{ x: (function() {}) }',
    '{ x: (async function() {}) }',
    '{ x: (function*() {}) }',
    "{ x: y } = 'str'",
    "[x, y] = 'str'",
    '[(x,y) => z]',
    //"[async(x,y) => z]",
    //"[async x => z]",
    '{x: (y) => z}',
    '{x: (y,w) => z}',
    '{x: async (y) => z}',
    '{x: async (y,w) => z}',
    '[x, ...y, z]',
    '[...x,]',
    '[x, y, ...z = 1]',
    '[...z = 1]',
    '[x, y, ...[z] = [1]]',
    '[...[z] = [1]]',
    '[...++x]',
    '[...x--]',
    '[...!x]',
    '[...x + y]',
    '({ x: x4, x: (x+=1e4) })',
    '(({ x: x4, x: (x+=1e4) }))',
    '({ x: x4, x: (x+=1e4) } = {})',
    '(({ x: x4, x: (x+=1e4) } = {}))',
    '(({ x: x4, x: (x+=1e4) }) = {})',
    '({ x: y } = {})',
    '(({ x: y } = {}))',
    '(({ x: y }) = {})',
    '([a])',
    '(([a]))',
    '([a] = [])',
    '(([a] = []))',
    '(([a]) = [])',
    '{ x: ([y]) }',
    '{ x: ([y] = []) }',
    '{ x: ({y}) }',
    '{ x: ({y} = {}) }',
    '{ x: (++y) }',
    '[ (...[a]) ]',
    '[ ...([a]) ]',
    '[ ...([a] = [])',
    '[ ...[ ( [ a ] ) ] ]',
    '[ ([a]) ]',
    '[ (...[a]) ]',
    '[ ([a] = []) ]',
    '[ (++y) ]',
    '[ ...(++y) ]',
    '[ x += x ]',
    '{ foo: x += x }'
  ]) {
    it(`'use strict'; let x, y, z; (${arg}= z = {});`, () => {
      t.throws(() => {
        parseSource(`'use strict'; let x, y, z; (${arg}= z = {});`, undefined, Context.Empty);
      });
    });
    it(`'use strict'; let x, y, z; (x =${arg} = z = {});`, () => {
      t.throws(() => {
        parseSource(`'use strict'; let x, y, z; (x =${arg} = z = {});`, undefined, Context.Empty);
      });
    });
    it(`var x, y, z; (x = ${arg} = z = {});`, () => {
      t.throws(() => {
        parseSource(`var x, y, z; (x = ${arg} = z = {});`, undefined, Context.Empty);
      });
    });

    it(`var x, y, z; for (x of x =  ${arg} = z = {});`, () => {
      t.throws(() => {
        parseSource(`var x, y, z; for (x of x =  ${arg} = z = {});`, undefined, Context.Empty);
      });
    });

    it(`'use strict'; let x, y, z; for (x in x =${arg} = z = {});`, () => {
      t.throws(() => {
        parseSource(`'use strict'; let x, y, z; for (x in x =${arg} = z = {});`, undefined, Context.Empty);
      });
    });

    it(`'use strict'; let x, y, z; for (x of ${arg} = z = {});`, () => {
      t.throws(() => {
        parseSource(`'use strict'; let x, y, z; for (x of ${arg}  = z = {});`, undefined, Context.Empty);
      });
    });

    it(`'use strict'; let x, y, z; for (x of x = ${arg} = z = {});`, () => {
      t.throws(() => {
        parseSource(`'use strict'; let x, y, z; for (x of x = ${arg} = z = {});`, undefined, Context.Empty);
      });
    });
  }

  // Tests for destructuring
  for (const arg of [
    'x',
    '{ x : y }',
    '{ x : foo().y }',
    '{ x : foo()[y] }',
    '{ x : y.z }',
    '{ x : y[z] }',
    '{ x : { y } }',
    '{ x : { foo: y } }',
    '{ x : { foo: foo().y } }',
    '{ x : { foo: foo()[y] } }',
    '{ x : { foo: y.z } }',
    '{ x : { foo: y[z] } }',
    '{ x : [ y ] }',
    '{ x : [ foo().y ] }',
    '{ x : [ foo()[y] ] }',
    '{ x : [ y.z ] }',
    '{ x : [ y[z] ] }',

    '{ x : y = 10 }',
    '{ x : foo().y = 10 }',
    '{ x : foo()[y] = 10 }',
    '{ x : y.z = 10 }',
    '{ x : y[z] = 10 }',
    '{ x : { y = 10 } = {} }',
    '{ x : { foo: y = 10 } = {} }',
    '{ x : { foo: foo().y = 10 } = {} }',
    '{ x : { foo: foo()[y] = 10 } = {} }',
    '{ x : { foo: y.z = 10 } = {} }',
    '{ x : { foo: y[z] = 10 } = {} }',
    '{ x : [ y = 10 ] = {} }',
    '{ x : [ foo().y = 10 ] = {} }',
    '{ x : [ foo()[y] = 10 ] = {} }',
    '{ x : [ y.z = 10 ] = {} }',
    '{ x : [ y[z] = 10 ] = {} }',
    '{ z : { __proto__: x, __proto__: y } = z }',

    '[ x ]',
    '[ foo().x ]',
    '[ foo()[x] ]',
    '[ x.y ]',
    '[ x[y] ]',
    '[ { x } ]',
    '[ { x : y } ]',
    '[ { x : foo().y } ]',
    '[ { x : foo()[y] } ]',
    '[ { x : x.y } ]',
    '[ { x : x[y] } ]',
    '[ [ x ] ]',
    '[ [ foo().x ] ]',
    '[ [ foo()[x] ] ]',
    '[ [ x.y ] ]',
    '[ [ x[y] ] ]',

    '[ x = 10 ]',
    '[ foo().x = 10 ]',
    '[ foo()[x] = 10 ]',
    '[ x.y = 10 ]',
    '[ x[y] = 10 ]',
    '[ { x = 10 } = {} ]',
    '[ { x : y = 10 } = {} ]',
    '[ { x : foo().y = 10 } = {} ]',
    '[ { x : foo()[y] = 10 } = {} ]',
    '[ { x : x.y = 10 } = {} ]',
    '[ { x : x[y] = 10 } = {} ]',
    '[ [ x = 10 ] = {} ]',
    '[ [ foo().x = 10 ] = {} ]',
    '[ [ foo()[x] = 10 ] = {} ]',
    '[ [ x.y = 10 ] = {} ]',
    '[ [ x[y] = 10 ] = {} ]',
    '{ x : y = 1 }',
    '{ x }',
    '{ x, y, z }',
    '{ x = 1, y: z, z: y }',
    '{x = 42, y = 15}',
    '[x]',
    '[x = 1]',
    '[x,y,z]',
    '[x, y = 42, z]',
    '{ x : x, y : y }',
    '{ x : x = 1, y : y }',
    '{ x : x, y : y = 42 }',
    '[]',
    '{}',
    '[{x:x, y:y}, [,x,z,]]',
    '[{x:x = 1, y:y = 2}, [z = 3, z = 4, z = 5]]',
    '[x,,y]',
    '[(x),,(y)]',
    '[(x)]',
    '{42 : x}',
    '{42 : x = 42}',
    '{42e-2 : x}',
    '{42e-2 : x = 42}',
    "{'hi' : x}",
    "{'hi' : x = 42}",
    '{var: x}',
    '{var: x = 42}',
    '{var: (x) = 42}',
    '{[x] : z}',
    '{[1+1] : z}',
    '{[1+1] : (z)}',
    '{[foo()] : z}',
    '{[foo()] : (z)}',
    '{[foo()] : foo().bar}',
    "{[foo()] : foo()['bar']}",
    '{[foo()] : this.bar}',
    "{[foo()] : this['bar']}",
    "{[foo()] : 'foo'.bar}",
    "{[foo()] : 'foo'['bar']}",
    '[...x]',
    '[x,y,...z]',
    '[x,,...z]',
    '{ x: y }',
    '[x, y]',
    '[((x, y) => z).x]',
    '{x: ((y, z) => z).x}',
    "[((x, y) => z)['x']]",
    "{x: ((y, z) => z)['x']}",

    '{x: { y = 10 } }',
    '[(({ x } = { x: 1 }) => x).a]',

    '{ ...d.x }',
    '{ ...c[0]}',

    // v8:4662
    '{ x: (y) }',
    '{ x: (y) = [] }',
    '{ x: (foo.bar) }',
    "{ x: (foo['bar']) }",
    '[ ...(a) ]',
    "[ ...(foo['bar']) ]",
    '[ ...(foo.bar) ]',
    '[ (y) ]',
    '[ (foo.bar) ]',
    "[ (foo['bar']) ]"
  ]) {
    it(`'use strict'; let x, y, z; (${arg}= z = {});`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; let x, y, z; (${arg}= z = {});`, undefined, Context.Empty);
      });
    });
    it(`'use strict'; let x, y, z; (x =${arg} = z = {});`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; let x, y, z; (x =${arg} = z = {});`, undefined, Context.Empty);
      });
    });
    it(`var x, y, z; (x = ${arg} = z = {});`, () => {
      t.doesNotThrow(() => {
        parseSource(`var x, y, z; (x = ${arg} = z = {});`, undefined, Context.Empty);
      });
    });

    it(`var x, y, z; for (x in x =  ${arg}  = z = {});`, () => {
      t.doesNotThrow(() => {
        parseSource(`var x, y, z; for (x in x =  ${arg} = z = {});`, undefined, Context.Empty);
      });
    });

    it(`var x, y, z; for (x of x =  ${arg} = z = {});`, () => {
      t.doesNotThrow(() => {
        parseSource(`var x, y, z; for (x of x =  ${arg} = z = {});`, undefined, Context.Empty);
      });
    });

    it(`'use strict'; let x, y, z; for (x in x =${arg} = z = {});`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; let x, y, z; for (x in x =${arg} = z = {});`, undefined, Context.Empty);
      });
    });

    it(`'use strict'; let x, y, z; for (x of ${arg} = z = {});`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; let x, y, z; for (x of ${arg}  = z = {});`, undefined, Context.Empty);
      });
    });

    it(`'use strict'; let x, y, z; for (x of x = ${arg} = z = {});`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; let x, y, z; for (x of x = ${arg} = z = {});`, undefined, Context.Empty);
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
