import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Module - Export', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['export let x = 0;', 'export let x = 0;', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportNamedDeclaration',
            'source': null,
            'specifiers': [],
            'declaration': {
                'type': 'VariableDeclaration',
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 0,
                            'start': 15,
                            'end': 16
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'x',
                            'start': 11,
                            'end': 12
                        },
                        'start': 11,
                        'end': 16
                    }
                ],
                'start': 7,
                'end': 17
            },
            'start': 0,
            'end': 17
        }
    ],
    'start': 0,
    'end': 17
}],
['export function func() { };', 'export function func() { };', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ExportNamedDeclaration',
          'source': null,
          'specifiers': [],
          'declaration': {
              'type': 'FunctionDeclaration',
              'params': [],
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 23,
                  'end': 26
              },
              'async': false,
              'generator': false,
              'expression': false,
              'id': {
                  'type': 'Identifier',
                  'name': 'func',
                  'start': 16,
                  'end': 20
              },
              'start': 7,
              'end': 26
          },
          'start': 0,
          'end': 26
      },
      {
          'type': 'EmptyStatement',
          'start': 26,
          'end': 27
      }
  ],
  'start': 0,
  'end': 27
}],
['export class C { };', 'export class C { };', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ExportNamedDeclaration',
          'source': null,
          'specifiers': [],
          'declaration': {
              'type': 'ClassDeclaration',
              'id': {
                  'type': 'Identifier',
                  'name': 'C',
                  'start': 13,
                  'end': 14
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [],
                  'start': 15,
                  'end': 18
              },
              'start': 7,
              'end': 18
          },
          'start': 0,
          'end': 18
      },
      {
          'type': 'EmptyStatement',
          'start': 18,
          'end': 19
      }
  ],
  'start': 0,
  'end': 19
}],
['function f() {}; f(); export { f };', 'function f() {}; f(); export { f };', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'FunctionDeclaration',
          'params': [],
          'body': {
              'type': 'BlockStatement',
              'body': [],
              'start': 13,
              'end': 15
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'f',
              'start': 9,
              'end': 10
          },
          'start': 0,
          'end': 15
      },
      {
          'type': 'EmptyStatement',
          'start': 15,
          'end': 16
      },
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'f',
                  'start': 17,
                  'end': 18
              },
              'arguments': [],
              'start': 17,
              'end': 20
          },
          'start': 17,
          'end': 21
      },
      {
          'type': 'ExportNamedDeclaration',
          'source': null,
          'specifiers': [
              {
                  'type': 'ExportSpecifier',
                  'local': {
                      'type': 'Identifier',
                      'name': 'f',
                      'start': 31,
                      'end': 32
                  },
                  'exported': {
                      'type': 'Identifier',
                      'name': 'f',
                      'start': 31,
                      'end': 32
                  },
                  'start': 31,
                  'end': 32
              }
          ],
          'declaration': null,
          'start': 22,
          'end': 35
      }
  ],
  'start': 0,
  'end': 35
}],
['export default class C {}', 'export default class C {}', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ExportDefaultDeclaration',
          'declaration': {
              'type': 'ClassDeclaration',
              'id': {
                  'type': 'Identifier',
                  'name': 'C',
                  'start': 21,
                  'end': 22
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [],
                  'start': 23,
                  'end': 25
              },
              'start': 15,
              'end': 25
          },
          'start': 0,
          'end': 25
      }
  ],
  'start': 0,
  'end': 25
}],
['export * from "module";', 'export * from "module";', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ExportAllDeclaration',
          'source': {
              'type': 'Literal',
              raw: null,
              'value': 'module',
              'start': 14,
              'end': 22
          },
          'start': 0,
          'end': 23
      }
  ],
  'start': 0,
  'end': 23
}],
['export {a as b, c as d} from "module";', 'export {a as b, c as d} from "module";', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ExportNamedDeclaration',
          'source': {
              'type': 'Literal',
              raw: null,
              'value': 'module',
              'start': 29,
              'end': 37
          },
          'specifiers': [
              {
                  'type': 'ExportSpecifier',
                  'local': {
                      'type': 'Identifier',
                      'name': 'a',
                      'start': 8,
                      'end': 9
                  },
                  'exported': {
                      'type': 'Identifier',
                      'name': 'b',
                      'start': 13,
                      'end': 14
                  },
                  'start': 8,
                  'end': 14
              },
              {
                  'type': 'ExportSpecifier',
                  'local': {
                      'type': 'Identifier',
                      'name': 'c',
                      'start': 16,
                      'end': 17
                  },
                  'exported': {
                      'type': 'Identifier',
                      'name': 'd',
                      'start': 21,
                      'end': 22
                  },
                  'start': 16,
                  'end': 22
              }
          ],
          'declaration': null,
          'start': 0,
          'end': 38
      }
  ],
  'start': 0,
  'end': 38
}],
['export function l() {}', 'export function l() {}', Context.OptionsRanges | Context.Module, {
  'type': 'Program',
  'sourceType': 'module',
  'body': [
      {
          'type': 'ExportNamedDeclaration',
          'source': null,
          'specifiers': [],
          'declaration': {
              'type': 'FunctionDeclaration',
              'params': [],
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 20,
                  'end': 22
              },
              'async': false,
              'generator': false,
              'expression': false,
              'id': {
                  'type': 'Identifier',
                  'name': 'l',
                  'start': 16,
                  'end': 17
              },
              'start': 7,
              'end': 22
          },
          'start': 0,
          'end': 22
      }
  ],
  'start': 0,
  'end': 22
}],
   ['export default [];', 'export default [];', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportDefaultDeclaration',
            'declaration': {
                'type': 'ArrayExpression',
                'elements': [],
                'start': 15,
                'end': 17
            },
            'start': 0,
            'end': 18
        }
    ],
    'start': 0,
    'end': 18
}],
   ['export {foo as bar} from "foo";', 'export {foo as bar} from "foo";', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportNamedDeclaration',
            'source': {
                'type': 'Literal',
                raw: null,
                'value': 'foo',
                'start': 25,
                'end': 30
            },
            'specifiers': [
                {
                    'type': 'ExportSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 8,
                        'end': 11
                    },
                    'exported': {
                        'type': 'Identifier',
                        'name': 'bar',
                        'start': 15,
                        'end': 18
                    },
                    'start': 8,
                    'end': 18
                }
            ],
            'declaration': null,
            'start': 0,
            'end': 31
        }
    ],
    'start': 0,
    'end': 31
}],
   ['export function *foo () {}', 'export function *foo () {}', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportNamedDeclaration',
            'source': null,
            'specifiers': [],
            'declaration': {
                'type': 'FunctionDeclaration',
                'params': [],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 24,
                    'end': 26
                },
                'async': false,
                'generator': true,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 17,
                    'end': 20
                },
                'start': 7,
                'end': 26
            },
            'start': 0,
            'end': 26
        }
    ],
    'start': 0,
    'end': 26
}],
   ['export { x as y };', 'export { x as y };', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportNamedDeclaration',
            'source': null,
            'specifiers': [
                {
                    'type': 'ExportSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 9,
                        'end': 10
                    },
                    'exported': {
                        'type': 'Identifier',
                        'name': 'y',
                        'start': 14,
                        'end': 15
                    },
                    'start': 9,
                    'end': 15
                }
            ],
            'declaration': null,
            'start': 0,
            'end': 18
        }
    ],
    'start': 0,
    'end': 18
}],
   ['export function goo() {};', 'export function goo() {};', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportNamedDeclaration',
            'source': null,
            'specifiers': [],
            'declaration': {
                'type': 'FunctionDeclaration',
                'params': [],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 22,
                    'end': 24
                },
                'async': false,
                'generator': false,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'goo',
                    'start': 16,
                    'end': 19
                },
                'start': 7,
                'end': 24
            },
            'start': 0,
            'end': 24
        },
        {
            'type': 'EmptyStatement',
            'start': 24,
            'end': 25
        }
    ],
    'start': 0,
    'end': 25
}],
   ['export const joo = 42;', 'export const joo = 42;', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportNamedDeclaration',
            'source': null,
            'specifiers': [],
            'declaration': {
                'type': 'VariableDeclaration',
                'kind': 'const',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'Literal',
                            raw: null,
                            'value': 42,
                            'start': 19,
                            'end': 21
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'joo',
                            'start': 13,
                            'end': 16
                        },
                        'start': 13,
                        'end': 21
                    }
                ],
                'start': 7,
                'end': 22
            },
            'start': 0,
            'end': 22
        }
    ],
    'start': 0,
    'end': 22
}],
   ['export async function async() { await 1; }', 'export async function async() { await 1; }', Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportNamedDeclaration',
            'source': null,
            'specifiers': [],
            'declaration': {
                'type': 'FunctionDeclaration',
                'params': [],
                'body': {
                    'type': 'BlockStatement',
                    'body': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'AwaitExpression',
                                'argument': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 1
                                }
                            }
                        }
                    ]
                },
                'async': true,
                'generator': false,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'async'
                }
            }
        }
    ]
}],
   ['export let document = { }', 'export let document = { }', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportNamedDeclaration',
            'source': null,
            'specifiers': [],
            'declaration': {
                'type': 'VariableDeclaration',
                'kind': 'let',
                'declarations': [
                    {
                        'type': 'VariableDeclarator',
                        'init': {
                            'type': 'ObjectExpression',
                            'properties': [],
                            'start': 22,
                            'end': 25
                        },
                        'id': {
                            'type': 'Identifier',
                            'name': 'document',
                            'start': 11,
                            'end': 19
                        },
                        'start': 11,
                        'end': 25
                    }
                ],
                'start': 7,
                'end': 25
            },
            'start': 0,
            'end': 25
        }
    ],
    'start': 0,
    'end': 25
}],
   ['export default function _fn2 () { }', 'export default function _fn2 () { }', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportDefaultDeclaration',
            'declaration': {
                'type': 'FunctionDeclaration',
                'params': [],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 32,
                    'end': 35
                },
                'async': false,
                'generator': false,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': '_fn2',
                    'start': 24,
                    'end': 28
                },
                'start': 15,
                'end': 35
            },
            'start': 0,
            'end': 35
        }
    ],
    'start': 0,
    'end': 35
}],
   ['export default () => 3', 'export default () => 3', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportDefaultDeclaration',
            'declaration': {
                'type': 'ArrowFunctionExpression',
                'body': {
                    'type': 'Literal',
                    raw: null,
                    'value': 3,
                    'start': 21,
                    'end': 22
                },
                'params': [],
                'id': null,
                'async': false,
                'generator': false,
                'expression': true,
                'start': 15,
                'end': 22
            },
            'start': 0,
            'end': 22
        }
    ],
    'start': 0,
    'end': 22
}],
   ['export * from "foo"', 'export * from "foo"', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportAllDeclaration',
            'source': {
                'type': 'Literal',
                raw: null,
                'value': 'foo',
                'start': 14,
                'end': 19
            },
            'start': 0,
            'end': 19
        }
    ],
    'start': 0,
    'end': 19
}],
   ['export {}', 'export {}', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportNamedDeclaration',
            'source': null,
            'specifiers': [],
            'declaration': null,
            'start': 0,
            'end': 9
        }
    ],
    'start': 0,
    'end': 9
}],
   ['export {x}', 'export {x}', Context.OptionsRanges | Context.Module, {
    'type': 'Program',
    'sourceType': 'module',
    'body': [
        {
            'type': 'ExportNamedDeclaration',
            'source': null,
            'specifiers': [
                {
                    'type': 'ExportSpecifier',
                    'local': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 8,
                        'end': 9
                    },
                    'exported': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 8,
                        'end': 9
                    },
                    'start': 8,
                    'end': 9
                }
            ],
            'declaration': null,
            'start': 0,
            'end': 10
        }
    ],
    'start': 0,
    'end': 10
}],
];

const invalids: Array < [string, string, Context, any] > = [
  ['export foo', 'export foo', Context.Empty, {}],
  ['export {', 'export {', Context.Module, {}],
  ['export async;', 'export async;', Context.Module, {}],
  ['var a; export { a', 'var a; export { a', Context.Module, {}],
  ['var a; export { a,', 'var a; export { a,', Context.Module, {}],
  ['var a; export { a, ;', 'var a; export { a, ;', Context.Module, {}],
  ['var a; export { a as };', 'var a; export { a as };', Context.Module, {}],
  ['var a, b; export { a as , b};', 'var a, b; export { a as , b};', Context.Module, {}],
  ['class C { method() { export default null; } }', 'class C { method() { export default null; } }', Context.Module, {}],
  ['{ export default null; }', '{ export default null; }', Context.Module, {}],
  ['switch(0) { case 1: export default null; default: }', 'switch(0) { case 1: export default null; default: }', Context.Module, {}],
  ['export { , };', 'export { , };', Context.Module, {}],
  ['export default;', 'export default;', Context.Module, {}],
  ['export default var x = 7;', 'export default var x = 7;', Context.Module, {}],
  ['export default let x = 7;', 'export default let x = 7;', Context.Module, {}],
  ['export *;', 'export *;', Context.Module, {}],
  ['export * from;', 'export * from;', Context.Module, {}],
  ['export { Q } from;', 'export { Q } from;', Context.Module, {}],
  ['export default from \'module.js\';', 'export default from \'module.js\';', Context.Module, {}],
  ['export { for }', 'export { for }', Context.Module, {}],
  ['export { for as foo }', 'export { for as foo }', Context.Module, {}],
  ['export * as z from "c";', 'export * as z from "c";', Context.Module, {}],
  ['export function() {}', 'export function() {}', Context.Module, {}],
  ['export function*() {}', 'export function*() {}', Context.Module, {}],
  ['export class {}', 'export class {}', Context.Module, {}],
  ['export class extends C {}', 'export class extends C {}', Context.Module, {}],
  ['export async', 'export async', Context.Module, {}],
  ['export async\nfunction async() { await 1; }', 'export async\nfunction async() { await 1; }', Context.Module, {}],
  ['export * as namespace from \'./foo\' null;', 'export * as namespace from \'./foo\' null;', Context.Module, {}],
  ['export {try};', 'export {try};', Context.Module, {}],
  ['export * +', 'export * +', Context.Module, {}],
  ['export default from "foo"', 'export default from "foo"', Context.Module, {}],
  ['export {default}', 'export {default}', Context.Module, {}],
  ['export {try as bar};', 'export {try as bar};', Context.Module, {}],
  ['export typeof foo;', 'export typeof foo;', Context.Module, {}],
  ['export new Foo();', 'export new Foo();', Context.Module, {}],
  ['export *', 'export *', Context.Module, {}],
  ['export { default }', 'export { default }', Context.Module, {}],
  ['export { if }', 'export { if }', Context.Module, {}],
  ['export { default as foo }', 'export { default as foo }', Context.Module, {}],
  ['export { if as foo }', 'export { if as foo }', Context.Module, {}],
  ['export * from foo', 'export * from foo', Context.Module, {}],
  ['export { bar } from foo', 'export { bar } from foo', Context.Module, {}],
  ['function foo() { }; export foo;', 'function foo() { }; export foo;', Context.Module, {}],
  ['export B, * as A, { C, D } from "test";', 'export B, * as A, { C, D } from "test";', Context.Module, {}],
  ['function foo() { }; export [ foo ];', 'function foo() { }; export [ foo ];', Context.Module, {}],
  ['function foo() { export default function() { } }', 'function foo() { export default function() { } }', Context.Module, {}],
  ['function foo() { }; export { , foo };', 'function foo() { }; export { , foo };', Context.Module, {}],
  ['function foo() { }; () => { export { foo }; }', 'function foo() { }; () => { export { foo }; }', Context.Module, {}],
  ['function foo() { }; try { export { foo }; } catch(e) { }', 'function foo() { }; try { export { foo }; } catch(e) { }', Context.Module, {}],
  ['export 12;', 'export 12;', Context.Module, {}],
  ['function foo() { }; export { foo as 100 };', 'function foo() { }; export { foo as 100 };', Context.Module, {}],
]

fail('Module - Export (pass)', invalids);
pass('Module - Export (pass)', valids);

});
