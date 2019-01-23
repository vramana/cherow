import { Context } from '../../../src/common';
import { fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

// Cover grammar tests
//
// Covers:
//
// - Destructuring
// - Assignment
// - Binding
// - Parenthesized pattern
// - Invalid syntax

describe('Miscellaneous - Grammar', () => {
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
    '[async(x,y) => z]',
    '{x: (y) => z}',
    '{x: (y,w) => z}',
    '{x: async (y) => z}',
    '{x: async (y,w) => z}',
    '[x, ...y, z]',
    '[...x,]',
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
    it(`let x, y, z; (${arg}= {});`, () => {
      t.throws(() => {
        parseSource(`let x, y, z; (${arg}= {});`, undefined, Context.OptionsNext);
      });
    });

    it(`var x, y, z; (${arg}= {});`, () => {
      t.throws(() => {
        parseSource(`var x, y, z; (${arg}= {});`, undefined, Context.OptionsNext);
      });
    });

    it(`'use strict'; let x, y, z; for (x in ${arg}= {});`, () => {
      t.throws(() => {
        parseSource(`'use strict'; let x, y, z; for (x in ${arg}= {});`, undefined, Context.OptionsNext);
      });
    });

    it(`'use strict'; let x, y, z; for (x of ${arg}= {});`, () => {
      t.throws(() => {
        parseSource(`'use strict'; let x, y, z; for (x of ${arg}= {});`, undefined, Context.OptionsNext);
      });
    });

    it(`var x, y, z; for (x in ${arg}= {});`, () => {
      t.throws(() => {
        parseSource(`var x, y, z; for (x in ${arg}= {});`, undefined, Context.OptionsNext);
      });
    });

    it(`var x, y, z; for (x of ${arg}= {});`, () => {
      t.throws(() => {
        parseSource(`var x, y, z; for (x of ${arg}= {});`, undefined, Context.OptionsNext);
      });
    });
  }

  for (const arg of ['a++', '++a', 'delete a', 'void a', 'typeof a', '--a', '+a']) {
    it(`"use strict"; let ${arg} = {};`, () => {
      t.throws(() => {
        parseSource(`"use strict"; const ${arg} = {};`, undefined, Context.Empty);
      });
    });

    it(`"use strict"; const ${arg} = {};`, () => {
      t.throws(() => {
        parseSource(`"use strict"; const ${arg} = {};`, undefined, Context.Empty);
      });
    });

    it(`try {} catch(${arg}) {}`, () => {
      t.throws(() => {
        parseSource(`try {} catch(${arg}) {}`, undefined, Context.Empty);
      });
    });
  }

  fail('Declarations - Var (fail)', [
    ['for (let x = {} in null);', Context.Empty],
    ['var foo; foo = { q } = { x = 10 };', Context.Empty],
    ['var q, x; ({ q } = { x = 10 });', Context.Empty],
    ['var q, x; (q, { x = 10 });', Context.Empty],
    ['var x; (({ x = 10 } = { x = 20 }) => x)({})', Context.Empty],
    ['({ a, b }) = {a: 1, b: 2}', Context.Empty],
    ['({get a(){}})=0', Context.Empty],
    ['({a:this}=0)', Context.Empty],
    ['({a = 0});', Context.Empty],
    ['({ async}) = 0', Context.Empty],
    ['({a({e: a.b}){}})', Context.Empty],
    ['({set a({e: a.b}){}})', Context.Empty],
    ['({a([a.b]){}})', Context.Empty],
    ['for (var x, {y} of obj);', Context.Empty],
    ['({*a([a.b]){}})', Context.Empty],
    ['({set a([a.b]){}})', Context.Empty],
    ['(x=1)=y', Context.Empty],
    ['({a}) = 0', Context.Empty],
    ['{a, b} = {a: 1, b: 2}', Context.Empty],
    ['({a, b}) = {a: 1, b:2}', Context.Empty],
    ['({a, b}) = {a: 1, b:2}', Context.Empty],
    ['([b]) = b;', Context.Empty],
    ['([{constructor(){}}] = b);', Context.Empty],
    ['[...a, ] = b', Context.Empty],
    ['({ obj:20 }) = 42', Context.Empty],
    ['(x=1)=2', Context.Empty],
    ['(a = b) = {};', Context.Empty],
    ['({a}) = {}', Context.Empty],
    ['[a, ...(b = c)] = 0', Context.Empty],
    ['({a}) = 0;', Context.Empty],
    ['({a}) = 0;', Context.Empty],
    ['(a, (b)) => 42', Context.Empty],
    ['var ([x]) = 0', Context.Empty],
    ['function a([a.b]) {}', Context.Empty],
    ['function* a({e: a.b}) {}', Context.Empty],
    ['(function* ({e: a.b}) {})', Context.Empty],
    ['[a, ...b, {c=0}]', Context.Empty],
    ['[{a=0},...0]', Context.Empty],
    ['var +a = {};', Context.Empty],
    ['var { x : y++ } = {};', Context.Empty],
    ['let [a++] = {};', Context.Empty],
    ['var a - a = {};', Context.Empty],
    ['var this = {};', Context.Empty],
    ['var {+2 : x} = {};', Context.Empty],
    ['var [var] = {};', Context.Empty],
    ['var [...rest,] = {};', Context.Empty],
    ['var [a,b,...rest,] = {};', Context.Empty],
    ['var ...(x => y) = {};', Context.Empty],
    ['var f = ( a++ ) => {};', Context.Empty],
    ['var f = ( a++ ) => {};', Context.Empty],
    ['var f = (this ) => {};', Context.Empty],
    ['var f = ( class {} ) => {};', Context.Empty],
    ['var f = ( {+2 : x} ) => {};', Context.Empty],
    ['var f = ( [a,b,...rest,] ) => {};', Context.Empty],
    ['var f = ([...z = 1] ) => {};', Context.Empty],
    ['var f = ( [a,,..rest,...rest1] ) => {};', Context.Empty],
    ['var f = ( ...typeof a ) => {};', Context.Empty],
    ['var f = ( { ,, ...x } ) => {};', Context.Empty],
    ['var f = ( { ...get a() {} } ) => {};', Context.Empty],
    ['var f = ( async function* a() {} ) => {};', Context.Empty],
    ['try {} catch(((x, z) => y)) {}', Context.Empty],
    ['try {} catch(a <<< a) {}', Context.Empty],
    ['try {} catch(function* a() {}) {}', Context.Empty],
    ['try {} catch(this) {}', Context.Empty],
    ['var f = (argument1, (async x => y)) => {};', Context.Empty],
    ['var f = (argument1, (async (x, z) => y)) => {};', Context.Empty],
    ['var f = (argument1, {x : {y : var}}) => {};', Context.Empty],
    ['function f( [x, y, ...[z] = [1]] ) {}', Context.Empty],
    ['function f( { get a() {} } ) {}', Context.Empty],
    ['function f({ ...x, ...y } ) {}', Context.Empty],
    ['function f( { y, ...x, y } ) {}', Context.Empty],
    ['function f( {[1+1]} ) {}', Context.Empty],
    ['function f( {x : x = (a+)} ) {}', Context.Empty],
    ['function f( argument1, this ) {}', Context.Empty],
    ['a = {..., ...b}', Context.Empty],
    ['[...a, ...b, ...c] = [...a, ...b, ...c]', Context.Empty],
    ['{...a, ...b, ...c} = {...a, ...b, ...c}', Context.Empty],
    ['var [var] = {};', Context.Empty],
    ['var [var] = {};', Context.Empty],
    ['var [var] = {};', Context.Empty],
    ['var [var] = {};', Context.Empty],
    ['var [var] = {};', Context.Empty],
    ['var [var] = {};', Context.Empty],
    ['var [var] = {};', Context.Empty],
    ['var [var] = {};', Context.Empty]
  ]);

  for (const arg of [
    '[x, y, ...z = 1]',
    '[...z = 1]',
    '[x, y, ...[z] = [1]]',
    '[...[z] = [1]]',
    '(a.b) = 0',
    'a0({});',
    '(a) = 0',
    '(a) = 2;',
    '({ a: 1 }).a === 1',
    '({ responseText: text } = res)',
    '(({a = {b} = {b: 42}}) => a.b)({})',
    'var { x : y } = {};',
    'var { x : y = 1 } = {};',
    'var { get, set } = {};',
    '{ get = 1, set = 2 }',
    'var [a] = {};',
    'var [{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]] = {};',
    'var {[1+1] : z} = {};',
    'var { __proto__: x, __proto__: y} = {};',
    'var { x : x, y : y, ...z } = {};',
    'var [{x:x, y:y, ...z}, [a,b,c]] = {};',
    'var {x, ...y} = {};',
    'var {[1+1] : z, ...x} = {};',
    'var {arguments: x, ...z} = {};',
    'function f( {[foo()] : z}) {}',
    'function f( {eval: x} ) {}',
    'try {} catch( [a,b,...rest] ) {}',
    'try {} catch( [a = 1] ) {}',
    // 'try {} catch( [{x:x, y:y}, [a,b,c]] ) {}',
    'var f = (argument1, [a,b,c]) => {};',
    'var f = (argument1, { x : x, y : y = 42 }) => {};',
    'var f = (argument1, [{x:x = 1, y:y = 2}, [a = 3, b = 4, c = 5]]) => {};',
    'var f = (argument1, [a,b,...rest]) => {};',
    'var f = (argument1, {x = 42, y = 15, ...z}) => {};',
    '"use strict"; let {"hi" : x} = {};',
    '"use strict"; let {42 : x} = {};',
    '"use strict"; let [a,,...rest] = {};',
    'var {arguments} = {};',
    'var {x: arguments} = {};',
    'var {...arguments} = {};',
    'var {arguments = false} = {};'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.OptionsDisableWebCompat);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
      });
    });
  }
});
