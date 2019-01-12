import { Context } from '../../../src/common';
import { pass } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Destructuring - Assignment', () => {});

const RHS_Numbers = [
  'x',
  '[x,] = 0',
  '[x,,] = 0',
  '[[x]] = 0',
  '[, x,,] = 0',
  '[...[x]] = 0',
  '[...{x = 1}] = [{}]',
  '[...[x]] = 0',
  '[x, ...{0: y}] = 0',
  '[x, x] = 0',
  '[x, ...x] = 0',
  '[(a)] = 0',
  '({x} = 0)',
  'let {a, ...b} = {/*...*/}; // valid;',
  "[ x = 'x' in {} ] = value;",
  'a = [ a = x += 1, b = x *= 2 ] = value;',
  ' [[ x ]] = [null]',
  '[{ x }] = [null];',
  '[{ x }] = [];',
  '[{ x }] = [ , ];'
];

for (const arg of RHS_Numbers) {
  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });
}

const validSyntax = [
  'x',
  '[x,]',
  '[x,,]',
  '[[x]]',
  '{ x : y.z }',
  '{ x : y[z] }',
  '{ x : y }',
  '{ x : foo().y }',
  '{ x : foo()[y] }',
  '{ x : y.z }',
  '{ x : y[z] }',
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
  //"{ z : { __proto__: x, __proto__: y } = z }",
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
  '{ x: (y) }',
  '{ x: (y) = [] }',
  '{ x: (foo.bar) }',
  "{ x: (foo['bar']) }",
  '[ ...(a) ]',
  "[ ...(foo['bar']) ]",
  '[ ...(foo.bar) ]',
  '[ (y) ]',
  '[ (foo.bar) ]',
  "[ (foo['bar']) ]",
  'a',
  '{ x : y }',
  '{ x : y = 1 }',
  '[a = 1]',
  '{x = 42, y = 15}',
  '{42e-2 : x}',
  '{42e-2 : x = 42}'
];
for (const arg of validSyntax) {
  it(`function fn() { 'use strict';} fn(${arg});`, () => {
    t.doesNotThrow(() => {
      parseSource(`'use strict'; let x, y, z; (${arg} = {});`, undefined, Context.Empty);
    });
  });

  it(`'use strict'; let x, y, z; for (x in ${arg} = z = {});`, () => {
    t.doesNotThrow(() => {
      parseSource(`'use strict'; let x, y, z; for (x in ${arg} = z = {});`, undefined, Context.Empty);
    });
  });

  it(`'use strict'; let x, y, z; for (x in x =  ${arg} = z = {});`, () => {
    t.doesNotThrow(() => {
      parseSource(`'use strict'; let x, y, z; for (x in x = ${arg} = z = {});`, undefined, Context.Empty);
    });
  });

  it(`'use strict'; let x, y, z; for (x of ${arg} = z = {});`, () => {
    t.doesNotThrow(() => {
      parseSource(`'use strict'; let x, y, z; for (x of ${arg} = z = {});`, undefined, Context.Empty);
    });
  });

  it(`'use strict'; let x, y, z; for (x of x =  ${arg} = z = {});`, () => {
    t.doesNotThrow(() => {
      parseSource(`'use strict'; let x, y, z; for (x of x = ${arg} = z = {});`, undefined, Context.Empty);
    });
  });

  it(`var x, y, z; for (x of x = ${arg} = z = {});`, () => {
    t.doesNotThrow(() => {
      parseSource(`var x, y, z; for (x of x = ${arg} = z = {});`, undefined, Context.Empty);
    });
  });

  it(`var x, y, z; (x = ${arg} = z = {});`, () => {
    t.doesNotThrow(() => {
      parseSource(`var x, y, z; (x = ${arg} = z = {});`, undefined, Context.Empty);
    });
  });

  it(`'use strict'; let x, y, z; for (x of ${arg}= z = {});`, () => {
    t.doesNotThrow(() => {
      parseSource(`'use strict'; let x, y, z; for (x of ${arg} = z = {});`, undefined, Context.Empty);
    });
  });

  it(`var x, y, z; for (x in ${arg} = z = {});`, () => {
    t.doesNotThrow(() => {
      parseSource(`var x, y, z; for (x in ${arg} = z = {});`, undefined, Context.Empty);
    });
  });

  it(`var x, y, z; for (x in x = ${arg}  = z = {});`, () => {
    t.doesNotThrow(() => {
      parseSource(`var x, y, z; for (x in x = ${arg}  = z = {});`, undefined, Context.Empty);
    });
  });

  it(`var x, y, z; for (x of x = ${arg}  = z = {});`, () => {
    t.doesNotThrow(() => {
      parseSource(`var x, y, z; for (x of x = ${arg}  = z = {});`, undefined, Context.Empty);
    });
  });
}

const ambiguity = [
  'var foo = { x = 10 } = {};',
  'var foo = { q } = { x = 10 } = {};',
  'var foo; foo = { x = 10 } = {};',
  'var foo; foo = { q } = { x = 10 } = {};',
  'var x; ({ x = 10 } = {});',
  'var q, x; ({ q } = { x = 10 } = {});',
  'var x; [{ x = 10 } = {}]',
  'var x; (true ? { x = true } = {} : { x = false } = {})',
  'var q, x; (q, { x = 10 } = {});',
  'var { x = 10 } = { x = 20 } = {};',
  'var { __proto__: x, __proto__: y } = {}',
  '({ __proto__: x, __proto__: y } = {})',
  'var { x = 10 } = (o = { x = 20 } = {});',
  'var x; (({ x = 10 } = { x = 20 } = {}) => x)({})'
];

for (const arg of ambiguity) {
  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });

  it(`"use strict"; ${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
    });
  });
}
pass('Destructuring - Assignment (pass)', [
  [
    'async (a, b, c)',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'async'
            },
            arguments: [
              {
                type: 'Identifier',
                name: 'a'
              },
              {
                type: 'Identifier',
                name: 'b'
              },
              {
                type: 'Identifier',
                name: 'c'
              }
            ]
          }
        }
      ]
    }
  ]
]);
