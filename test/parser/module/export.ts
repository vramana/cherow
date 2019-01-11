import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Module - Export', () => {
  const inValids: Array<[string, Context]> = [
    ['export foo', Context.Strict | Context.Module],
    ['export {', Context.Strict | Context.Module],
    ///    ['export async;', Context.Strict | Context.Module],
    ['var a; export { a,', Context.Strict | Context.Module],
    ['var a, b; export { a as , b};', Context.Strict | Context.Module],
    ['export { , };', Context.Strict | Context.Module],
    // ['export default;', Context.Strict | Context.Module],
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
    //   ['export default await', Context.Strict | Context.Module],
    //   ['export default await z', Context.Strict | Context.Module],
    //    ['export var let = x;', Context.Strict | Context.Module],
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
    ['var x, y; export default x; export {y as default};', Context.Strict | Context.Module],
    ['var x, y; export default x; export {y as default};', Context.Strict | Context.Module],
    ['var x, y; export default x; export {y as default};', Context.Strict | Context.Module],
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
    ['export {a}; export {b as a};', Context.Strict | Context.Module],
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
    ['for (let y in []) import v from "foo"', Context.Empty],
    ['switch(0) { default: export default null; }', Context.Strict | Context.Module],
    ['switch(0) { case 1: export default null; }', Context.Strict | Context.Module],
    ['if (true) { } else export default null;', Context.Empty],
    ['function* g() { export default null; }', Context.Empty],
    ['test262: export default null;', Context.Empty],
    ['(function() { export default null; });', Context.Empty],
    ['for (x = 0; false;) export default null;', Context.Empty],
    ['do export default null; while (false)', Context.Empty]
  ];

  fail('Declarations - Functions (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
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
