import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Module - Export', () => {
  const failures = [
    'export {',
    'var a; export { a',
    'var a; export { a',
    'var a; export { a,',
    'var a; export { a, ;',
    'var a; export { a as };',
    'var a, b; export { a as , b};',
    'export var {[x]} = z;',
    'export var {[x]};',
    'export var {[x] = y} = z;',
    'export {x}; export let [...x] = y;',
    'export {x}; export let {...x} = y;',
    'export {x}; export let [x] = y;',
    'export var foo; export let foo;',
    'export let foo; export let foo;',
    'export {a}; export {b as a};',
    'var a,b; export {b, a}; export {a};',
    'var a,b; export {a, b}; export {a};',
    `export default var x = null;
     export default var x = null;`,
    `export function f() {}
     export function *f() {}`,
    `export class f() {}
     export function *f() {}`,
    `export function f() {}
     export class f() {}`,
    `export async function *f() {}
     export function *f() {}`,
    `export default async function *f() {}
     export function *f() {}`,
    `export async function *f() {}
     export default function *f() {}`,
    `export const f = g;
     export let f;`,
    `var x;
     export default x;
     export * as default from './early-dup-export-start-as-dflt.js';`,
    `label: {
      label: 0;
    }`,
    `let x;
    const x;`,
    `export { unresolvable };`,
    `var x;
    export { x as z };
    export * as z from './early-dup-export-as-star-as.js';`,
    `var x;
    export default x;
    export * as default from './early-dup-export-start-as-dflt.js';`,
    'var a,b; export {a}; export {a, b};',
    'export {b as a}; export {a};',
    'export {a}; export {b as a};',
    'export var a = x, a = y;',
    'export let x = y, {...x} = y;',
    'export let x = y, [...x] = y;',
    'export let [x] = y; export function x(){};',
    'export function x(){}; export let [x] = y;',
    'export {x}; export let [x] = y;',
    'export let [x, x] = y;',
    'var a, b; export {a, a, b}',
    'var a, b; export {b, a, a}',
    'var a, b; export {a, b, a}',
    'var a; export {a, a}',
    'class C { method() { export default null; } }',
    '{ export default null; }',
    'class C { *method() { export default null; } }',
    `for (const x = 0; false;)
    export default null;`,
    'switch(0) { case 1: export default null; default: }',
    'switch(0) { case 1: export default null; default: }',
    'export default (async function await() {})',
    'export default async function await() {}',
    'export async function await() {}',
    'export async',
    'export async\nfunction async() { await 1; }',
    'export }',
    'var foo, bar; export { foo bar };',
    'export { , };',
    'export default let x = 7;',
    'export default const x = 7;',
    'export *;',
    'export * from;',
    'export { Q } from;',
    "export default from 'module.js';",
    'export { for }',
    'export { for as foo }',
    'export * as z from "c";',
    'export const const1;',
    'function foo() { }; export foo;',
    'export B, * as A, { C, D } from "test";',
    'function foo() { export default function() { } }',
    'function foo() { }; export { , foo };',
    'function foo() { }; () => { export { foo }; }',
    "export * as arguments from 'bar'",
    "export * as await from 'bar'",
    "export * as default from 'bar'",
    "export * as enum from 'bar'",
    "export * as foo from 'bar'",
    "export * as for from 'bar'",
    "export * as let from 'bar'",
    "export * as static from 'bar'",
    "export * as yield from 'bar'",
    'export {',
    'var a; export { a',
    'var a; export { a,',
    'var a; export { a, ;',
    'var a; export { a as };',
    'var a, b; export { a as , b};',
    'export }',
    'var foo, bar; export { foo bar };',
    'export { foo };',
    'export { , };',
    'export default;',
    'export default var x = 7;',
    'export default let x = 7;',
    'export default const x = 7;',
    'export *;',
    'export * as;',
    'export * as foo;',
    'export * as foo from;',
    "export * as foo from ';",
    "export * as ,foo from 'bar'",
    'export *;',
    'export * from;',
    'export { Q } from;',
    "export default from 'module.js';",
    'export { for }',
    'export { for as foo }',
    'export { arguments }',
    'export { arguments as foo }',
    'function foo() { }; try { export { foo }; } catch(e) { }',
    // 'Syntax error if export is followed by non-identifier'
    'export 12;',
    'function foo() { }; export { foo as 100 };'
  ];

  for (const arg of failures) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
      });
    });
  }

  const inValids: Array<[string, Context]> = [
    ['export foo', Context.Strict | Context.Module],
    ['export {', Context.Strict | Context.Module],
    ['export async;', Context.Strict | Context.Module],
    ['export async () => y', Context.Strict | Context.Module],
    ['var a; export { a,', Context.Strict | Context.Module],
    ['var a, b; export { a as , b};', Context.Strict | Context.Module],
    ['export { , };', Context.Strict | Context.Module],
    ['export default;', Context.Strict | Context.Module],
    ['export default var x = 7;', Context.Strict | Context.Module],
    ['export *;', Context.Strict | Context.Module],
    ['export * from;', Context.Strict | Context.Module],
    ["export default from 'module.js';", Context.Strict | Context.Module],
    ['export { for }', Context.Strict | Context.Module],
    ['export { for as foo }', Context.Strict | Context.Module],
    ['export {try};', Context.Strict | Context.Module],
    ['export *', Context.Strict | Context.Module],
    ['export { default }', Context.Strict | Context.Module],
    ['export default function f(){}; export function f(){};', Context.Strict | Context.Module],
    ['export default class f {}; export function f(){};', Context.Strict | Context.Module],
    ['export function f(){}; export default class f {}; ', Context.Strict | Context.Module],
    ['export default class f {}; export default class f {}; ', Context.Strict | Context.Module],
    ['export B, * as A, { C, D } from "test";', Context.Strict | Context.Module],
    ['function foo() { }; export [ foo ];', Context.Strict | Context.Module],
    ['function foo() { }; () => { export { foo }; }', Context.Strict | Context.Module],
    ['function foo() { }; export { foo as 100 };', Context.Strict | Context.Module],
    ['export { if as foo }', Context.Strict | Context.Module],
    ['export default function(){}; export default function(){};', Context.Strict | Context.Module],
    ['export default async function(){}; export default function(){};', Context.Strict | Context.Module],
    ['export default function(){}; export default async function(){};', Context.Strict | Context.Module],
    ['export let a = 1, a = 2;', Context.Strict | Context.Module],
    ['export const a = 1, a = 2;', Context.Strict | Context.Module],
    ['export let ...x = y', Context.Strict | Context.Module],
    ['export ...x = y', Context.Strict | Context.Module],
    ['export default ...x = y', Context.Strict | Context.Module],
    ['export var foo = x foo', Context.Strict | Context.Module],
    ['export const a = 1, a = 2;', Context.Strict | Context.Module],
    ['export let a = 1, a = 2;', Context.Strict | Context.Module],
    ['export default const a = 1, a = 2;', Context.Strict | Context.Module],
    ['export default let a = 1, a = 2;', Context.Strict | Context.Module],
    ['export const a = 1, a = 2;', Context.Strict | Context.Module],
    ['export const foo = x foo', Context.Strict | Context.Module],
    ['export {x, y} foo', Context.Strict | Context.Module],
    ['export {x, y} from "x" foo', Context.Strict | Context.Module],
    ['export * from "x" foo', Context.Strict | Context.Module],
    ['export * as x from "x" foo', Context.Strict | Context.Module],
    ['export default await', Context.Strict | Context.Module],
    ['export default await z', Context.Strict | Context.Module],
    ['export var let = x;', Context.Strict | Context.Module],
    ['export foo;', Context.Strict | Context.Module],
    ['var foo, bar; export {foo, ...bar}', Context.Strict | Context.Module],
    ['var foo, bar; export {[foo]}', Context.Strict | Context.Module],
    ['var foo, bar; export {{foo}}', Context.Strict | Context.Module],
    ['var foo, bar, x; export {{foo: x}}', Context.Strict | Context.Module],
    ['var foo; export {foo(){}}', Context.Strict | Context.Module],
    ['var foo; export {[foo]}', Context.Strict | Context.Module],
    ['var foo; export {[foo](){}}', Context.Strict | Context.Module],
    ['var foo; export {async foo(){}}', Context.Strict | Context.Module],
    ['export {new}', Context.Strict | Context.Module],
    ['var foo; export {foo: new}', Context.Strict | Context.Module],
    ['var foo; export {[foo]}', Context.Strict | Context.Module],
    ['var foo; export {[foo]}', Context.Strict | Context.Module],
    ['var foo; export {[foo]}', Context.Strict | Context.Module],
    ['var foo; export {[foo]}', Context.Strict | Context.Module],
    ['export default x; export {y as default};', Context.Strict | Context.Module],
    ['var x, y; export default x; export {y as default};', Context.Strict | Context.Module],
    ['export {x}; export let [x] = y;', Context.Strict | Context.Module],
    ['export let [x] = y; export {x};', Context.Strict | Context.Module],
    ['export {x}; export let [...x] = y;', Context.Strict | Context.Module],
    ['export {x}; export let {...x} = y;', Context.Strict | Context.Module],
    ['var a; export {a, a}', Context.Strict | Context.Module],
    ['var a, b; export {a, b, a}', Context.Strict | Context.Module],
    ['var a, b; export {b, a, a}', Context.Strict | Context.Module],
    ['var a, b; export {a, a, b}', Context.Strict | Context.Module],
    ['var a, b; export {a, b as a}', Context.Strict | Context.Module],
    ['export let [x, x] = y;', Context.Strict | Context.Module],
    ['export function x(){}; export let [x] = y;', Context.Strict | Context.Module],
    ['export let [x] = y; export function x(){};', Context.Strict | Context.Module],
    ['export let x = y, [x] = y;', Context.Strict | Context.Module],
    ['export let x = y, [...x] = y;', Context.Strict | Context.Module],
    ['export let x = y, {...x} = y;', Context.Strict | Context.Module],
    ['export var a = x, a = y;', Context.Strict | Context.Module],
    ['var a; export {a}; export {a};', Context.Strict | Context.Module],
    ['var a,b; export {a, b}; export {a};', Context.Strict | Context.Module],
    ['var a,b; export {b, a}; export {a};', Context.Strict | Context.Module],
    ['var a,b; export {a}; export {a, b};', Context.Strict | Context.Module],
    ['export {b as a}; export {a};', Context.Strict | Context.Module],
    ['var a; export {b as a};', Context.Strict | Context.Module],
    ['export {a as b};', Context.Strict | Context.Module],
    ['export let foo; export let foo;', Context.Strict | Context.Module],
    ['export var foo; export let foo;', Context.Strict | Context.Module],
    ['export {a}; export {b as a};', Context.Strict | Context.Module],
    ['export {a}; export {c as d};', Context.Strict | Context.Module],
    ['export {b as a}; export {a};', Context.Strict | Context.Module],
    ['export {c as d}; export {a};', Context.Strict | Context.Module],
    ['export default = 42', Context.Strict | Context.Module],
    ['export {default} +', Context.Strict | Context.Module],
    ['export default from "foo"', Context.Strict | Context.Module],
    ['export {default}', Context.Strict | Context.Module],
    ['({ set m(x) { export default null; } });', Context.Strict | Context.Module],
    ['for (let y in []) import v from "foo"', Context.Strict | Context.Module],
    ['for (let y in []) import v from "foo"', Context.Strict | Context.Module],
    ['switch(0) { default: export default null; }', Context.Strict | Context.Module],
    ['switch(0) { case 1: export default null; }', Context.Strict | Context.Module],
    ['if (true) { } else export default null;', Context.Strict | Context.Module],
    ['function* g() { export default null; }', Context.Empty],
    ['test262: export default null;', Context.Strict | Context.Module],
    ['(function() { export default null; });', Context.Strict | Context.Module],
    ['for (x = 0; false;) export default null;', Context.Strict | Context.Module],
    ['do export default null; while (false)', Context.Strict | Context.Module],
    ["export * as arguments from 'bar'", Context.Strict | Context.Module],
    ["export * as await from 'bar'", Context.Strict | Context.Module],
    ["export * as default from 'bar'", Context.Strict | Context.Module],
    ["export * as enum from 'bar'", Context.Strict | Context.Module],
    ["export * as foo from 'bar'", Context.Strict | Context.Module],
    ["export * as for from 'bar'", Context.Strict | Context.Module],
    ["export * as let from 'bar'", Context.Strict | Context.Module],
    ["export * as static from 'bar'", Context.Strict | Context.Module],
    ["export * as yield from 'bar'", Context.Strict | Context.Module],
    ['export {', Context.Strict | Context.Module],
    ['var a; export { a', Context.Strict | Context.Module],
    ['var a; export { a,', Context.Strict | Context.Module],
    ['var a; export { a, ;', Context.Strict | Context.Module],
    ['var a; export { a as };', Context.Strict | Context.Module],
    ['var a, b; export { a as , b};', Context.Strict | Context.Module],
    ['export }', Context.Strict | Context.Module],
    ['var foo, bar; export { foo bar };', Context.Strict | Context.Module],
    ['export { foo };', Context.Strict | Context.Module],
    ['export { , };', Context.Strict | Context.Module],
    ['export default;', Context.Strict | Context.Module],
    ['export default var x = 7;', Context.Strict | Context.Module],
    ['export default let x = 7;', Context.Strict | Context.Module],
    ['export default const x = 7;', Context.Strict | Context.Module],
    ['export *;', Context.Strict | Context.Module],
    ['export * from;', Context.Strict | Context.Module],
    ['export { Q } from;', Context.Strict | Context.Module],
    ["export default from 'module.js';", Context.Strict | Context.Module],
    ['export { for }', Context.Strict | Context.Module],
    ['export { for as foo }', Context.Strict | Context.Module],
    ['export { arguments }', Context.Strict | Context.Module],
    ['export { arguments as foo }', Context.Strict | Context.Module],
    ['var a; export { a, a };', Context.Strict | Context.Module],
    ['var a, b; export { a as b, b };', Context.Strict | Context.Module],
    ['var a, b; export { a as c, b as c };', Context.Strict | Context.Module],
    ['export default function f(){}; export default class C {};', Context.Strict | Context.Module],
    ['export default function f(){}; var a; export { a as default };', Context.Strict | Context.Module],
    ['export class extends C {}', Context.Empty],
    ['export *;', Context.Strict | Context.Module],
    ['export * as;', Context.Strict | Context.Module],
    ['export * as foo;', Context.Strict | Context.Module],
    ['export * as foo from;', Context.Strict | Context.Module],
    ["export * as foo from ';", Context.Strict | Context.Module],
    ["export * as ,foo from 'bar'", Context.Strict | Context.Module]
  ];

  fail('Declarations - Functions (fail)', inValids);

  const programs = [
    'export let x = 0;',
    'export var y = 0;',
    'export const z = 0;',
    'export default x;',
    'export function func() { };',
    'export class C { };',
    'export class A extends B {};',
    'export default class A extends B {};',
    'export { };',
    'export {get}; function get() {};',
    'function f() {}; f(); export { f };',
    'export let x = 0;',
    'export var y = 0;',
    'export const z = 0;',
    'export function func() { };',
    'export class C { };',
    'export { };',
    'export function foo () { return "foo"; }',
    'export const boo = 5;',
    'import {ns} from "three";',
    'var a, b, c; export { a, b as baz, c };',
    'var d, e; export { d as dreary, e, };',
    'export default function f() {}',
    'export default function() {}',
    'export default function*() {}',
    'export default class C {}',
    'export default class {}',
    'export default class extends C {}',
    'export default 42',
    'var x; export default x = 7',
    "export { Q } from 'somemodule.js';",
    "export * from 'somemodule.js';",
    'var foo; export { foo as for };',
    "export { arguments } from 'm.js';",
    "export { for } from 'm.js';",
    "export { yield } from 'm.js'",
    "export { static } from 'm.js'",
    "export { let } from 'm.js'",
    'var a; export { a as b, a as c };',
    'var a; export { a as await };',
    'var a; export { a as enum };',
    "export {thing}; import thing from 'a.js';",
    "export {thing}; import {thing} from 'a.js';",
    "export {thing}; import * as thing from 'a.js';",
    'var a, b, c; export { a, b as baz, c };',
    'var d, e; export { d as dreary, e, };',
    'export default function f() {}',
    'export default function() {}',
    'export default function *a() {}',
    'export let x = 0;',
    'export var y = 0;',
    'export const z = 0;',
    'export function func() { };',
    'export class C { };',
    'export { };',
    'function f() {}; f(); export { f };',
    'var a, b, c; export { a, b as baz, c };',
    'var d, e; export { d as dreary, e, };',
    'export default function f() {}',
    'export default function() {}',
    'export default function*() {}',
    'export default class C {}',
    'export default class {}',
    'export default class extends C {}',
    'export default 42',
    'var x; export default x = 7',
    "export { Q } from 'somemodule.js';",
    "export * from 'somemodule.js';",
    'var foo; export { foo as for };',
    "export { arguments } from 'm.js';",
    "export { yield } from 'm.js'",
    "export { static } from 'm.js'",
    "export { let } from 'm.js'",
    'var a; export { a as b, a as c };',
    'var a; export { a as await };',
    'var a; export { a as enum };',
    "export {thing}; import * as thing from 'a.js';",
    'export var document',
    'export var document = {}',
    'export var document',
    'export class Class {}',
    'export default 42',
    'export default class A {}',
    'export default (class{});',
    'export default /foo/',
    'export var namedOther = null;',
    'export var starAsVarDecl;',
    'export let starAsLetDecl;',
    'export const starAsConstDecl = null;',
    'export function starAsFuncDecl() {}',
    'export function* starAsGenDecl() {}',
    'export class starAsClassDecl {}',
    'export default class Foo {}++x',
    "export { x as y } from './y.js';\nexport { x as z } from './z.js';",
    "export { default as y } from './y.js';\nexport default 42;",
    'export default function(x) {};',
    'export default function () { };',
    'export default function _fn2 () { }',
    'var a; export default a = 10;',
    'export default () => 3',
    'function _default() { }; export default _default',
    'export let a, [...x] = y',
    'export let [...x] = y',
    // Named generator function statement
    'function* g() { }; export default g',
    'class c { }; export default c',
    "var _ = { method: function() { return 'method_result'; }, method2: function() { return 'method2_result'; } }; export default _",
    `export{};
    export {};
    export {}
    export { };
    export
    {

    };
    export//-
    {//-
    //-
    };
    export/**/{/**/};`
  ];

  for (const arg of programs) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
      });
    });
  }

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'var a,b; export {a}; export {b};',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'a',
                  type: 'Identifier'
                },
                init: null,
                type: 'VariableDeclarator'
              },
              {
                id: {
                  name: 'b',
                  type: 'Identifier'
                },
                init: null,
                type: 'VariableDeclarator'
              }
            ],
            kind: 'var',
            type: 'VariableDeclaration'
          },
          {
            declaration: null,
            source: null,
            specifiers: [
              {
                exported: {
                  name: 'a',
                  type: 'Identifier'
                },
                local: {
                  name: 'a',
                  type: 'Identifier'
                },
                type: 'ExportSpecifier'
              }
            ],
            type: 'ExportNamedDeclaration'
          },
          {
            declaration: null,
            source: null,
            specifiers: [
              {
                exported: {
                  name: 'b',
                  type: 'Identifier'
                },
                local: {
                  name: 'b',
                  type: 'Identifier'
                },
                type: 'ExportSpecifier'
              }
            ],
            type: 'ExportNamedDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export default async () => y',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'y'
              },
              params: [],
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ],
    [
      'export default async (x) => y',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            declaration: {
              async: true,
              body: {
                name: 'y',
                type: 'Identifier'
              },
              expression: true,
              id: null,
              params: [
                {
                  name: 'x',
                  type: 'Identifier'
                }
              ],
              type: 'ArrowFunctionExpression'
            },
            type: 'ExportDefaultDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export default async function f(){}',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f'
              }
            }
          }
        ]
      }
    ],
    [
      'export default async function(){}',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              id: null
            }
          }
        ]
      }
    ],
    [
      'export default function* f(){}',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: false,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'f'
              }
            }
          }
        ]
      }
    ],
    [
      'export default function* (){}',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: false,
              generator: true,
              id: null
            }
          }
        ]
      }
    ],
    [
      'export default class x{}',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ClassDeclaration',
              id: {
                type: 'Identifier',
                name: 'x'
              },
              superClass: null,
              body: {
                type: 'ClassBody',
                body: []
              }
            }
          }
        ]
      }
    ],
    [
      'export {} from "x"',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'x'
            },
            specifiers: [],
            declaration: null
          }
        ]
      }
    ],
    [
      'export default async x => y',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'y'
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'x'
                }
              ],
              id: null,
              async: true,
              expression: true
            }
          }
        ]
      }
    ],
    [
      'export default (a,b) => {}',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ],
              id: null,
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      'export default () => {}',
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: []
              },
              params: [],
              id: null,
              async: false,
              expression: false
            }
          }
        ]
      }
    ],
    [
      'export {};',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: null
          }
        ]
      }
    ],
    [
      'export {};',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: null
          }
        ]
      }
    ],
    [
      'export var foo = 1;',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  init: {
                    type: 'Literal',
                    value: 1
                  }
                }
              ],
              kind: 'var'
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export function foo () {}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: false,
              generator: false,

              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'export {foo} from "foo";',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'foo'
            },
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'foo'
                },
                exported: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ],
            declaration: null
          }
        ]
      }
    ],
    [
      'export * from "foo";',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportAllDeclaration',
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ]
      }
    ],
    [
      'export default function () {}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: false,
              generator: false,

              id: null
            }
          }
        ]
      }
    ],
    [
      'export default (1 + 2);',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'BinaryExpression',
              left: {
                type: 'Literal',
                value: 1
              },
              right: {
                type: 'Literal',
                value: 2
              },
              operator: '+'
            }
          }
        ]
      }
    ],

    [
      'export class a {}',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: {
              body: {
                body: [],
                type: 'ClassBody'
              },
              id: {
                name: 'a',
                type: 'Identifier'
              },
              superClass: null,
              type: 'ClassDeclaration'
            },
            source: null,
            specifiers: [],
            type: 'ExportNamedDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export default class A {}',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: {
              body: {
                body: [],
                type: 'ClassBody'
              },
              id: {
                name: 'A',
                type: 'Identifier'
              },
              superClass: null,
              type: 'ClassDeclaration'
            },
            type: 'ExportDefaultDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export default [];',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrayExpression',
              elements: []
            }
          }
        ],
        sourceType: 'module'
      }
    ],

    [
      'export default function foo() {}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: false,
              generator: false,

              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'export default function *foo() {}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: false,
              generator: true,

              id: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'var foo; export {foo as new}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ]
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'foo'
                },
                exported: {
                  type: 'Identifier',
                  name: 'new'
                }
              }
            ],
            declaration: null
          }
        ]
      }
    ],
    [
      'export {a as b}; var a;',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                exported: {
                  type: 'Identifier',
                  name: 'b'
                }
              }
            ],
            declaration: null
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var a; export {a as b};',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ]
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a'
                },
                exported: {
                  type: 'Identifier',
                  name: 'b'
                }
              }
            ],
            declaration: null
          }
        ]
      }
    ],
    [
      'export {foo}; function foo() {};',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'foo'
                },
                exported: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ],
            declaration: null
          },
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: []
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'foo'
            }
          },
          {
            type: 'EmptyStatement'
          }
        ]
      }
    ],
    [
      'export var x = 1;',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: {
              declarations: [
                {
                  id: {
                    name: 'x',
                    type: 'Identifier'
                  },
                  init: {
                    type: 'Literal',
                    value: 1
                  },
                  type: 'VariableDeclarator'
                }
              ],
              kind: 'var',
              type: 'VariableDeclaration'
            },
            source: null,
            specifiers: [],
            type: 'ExportNamedDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'export default 3;',
      Context.Strict | Context.Module,
      {
        body: [
          {
            declaration: {
              type: 'Literal',
              value: 3
            },
            type: 'ExportDefaultDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      'var x; export { x as a }; export { x as b };',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'a'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: null
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'b'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export default [x] = y',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'AssignmentExpression',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'x'
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ]
      }
    ],
    [
      'let foo, bar; export {foo, bar}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'foo'
                },
                init: null
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'bar'
                },
                init: null
              }
            ],
            kind: 'let'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'foo'
                },
                local: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'bar'
                },
                local: {
                  type: 'Identifier',
                  name: 'bar'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export default function *f(){} foo',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: false,
              generator: true,

              id: {
                type: 'Identifier',
                name: 'f'
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        ]
      }
    ],
    [
      'export * from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportAllDeclaration',
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export {}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: null
          }
        ]
      }
    ],
    [
      'export {x}; var x;',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                exported: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            declaration: null
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var x; export {x as a}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'a'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'var x; export {x,}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'x'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export {x} from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'x'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export {x as a} from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'a'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export {x,} from "foo"',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'x'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo'
            }
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'var x; export {x as a,}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'x'
                },
                exported: {
                  type: 'Identifier',
                  name: 'a'
                }
              }
            ],
            declaration: null
          }
        ]
      }
    ],
    [
      'var x,y; export {x, y}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'y'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'x'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'y'
                },
                local: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'var x,y; export {x as a, y as b}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'y'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'a'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'b'
                },
                local: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'var x,y; export {x, y,}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'y'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'x'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'y'
                },
                local: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'var x,y; export {x as a, y as b,}',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'x'
                },
                init: null
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'y'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'ExportNamedDeclaration',
            declaration: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'a'
                },
                local: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'ExportSpecifier',
                exported: {
                  type: 'Identifier',
                  name: 'b'
                },
                local: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export var x',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export var x, y',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export var x = 10, y = 20',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  init: {
                    type: 'Literal',
                    value: 10
                  }
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  init: {
                    type: 'Literal',
                    value: 20
                  }
                }
              ],
              kind: 'var'
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export let x',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  init: null
                }
              ],
              kind: 'let'
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export let x, y',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  init: null
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  init: null
                }
              ],
              kind: 'let'
            },
            specifiers: [],
            source: null
          }
        ],
        sourceType: 'module'
      }
    ],
    [
      'export async function f(){}; export {f};',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f'
              }
            }
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'f'
                },
                exported: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            ],
            declaration: null
          }
        ]
      }
    ],
    [
      'export async function *f(){}; export {f};',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              async: true,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'f'
              }
            }
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'f'
                },
                exported: {
                  type: 'Identifier',
                  name: 'f'
                }
              }
            ],
            declaration: null
          }
        ]
      }
    ],

    [
      'export let a = 1;',
      Context.Strict | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 1
                  },
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  ];

  pass('Module - Export', valids);
});
