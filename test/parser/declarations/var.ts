import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Declarations - Var', () => {
  fail('Declarations - Var (fail)', [
    ['var a = b; const a = c', Context.Empty],
    ['const a = b; var a = c', Context.Empty],
    ['{ var f; function f() {} }', Context.Empty],
    ['{ var f; function f() {} }', Context.OptionsWebCompat],
    ['var foo = {}; foo.{;', Context.Empty],
    ['var foo = {}; foo.};', Context.Empty],
    ['var foo = {}; foo.=;', Context.Empty],
    ['ar foo = {}; foo.888;', Context.Empty],
    ['var foo = {}; foo.-;', Context.Empty],
    ['"use strict"; var foo = {}; foo.-;', Context.Empty],
    ['var foo = {}; foo.--;', Context.Empty],
    ['{ let x; var x; }', Context.Empty],
    ['var {foo};', Context.Empty],
    ['var [foo]; ', Context.Empty],
    //['var f; function f() {} ', Context.Module],
    ['var [foo=a];', Context.Empty],
    ['var [foo], bar;', Context.Empty],
    ['var foo, [bar];', Context.Empty],
    ['var [...foo, bar] = obj;', Context.Empty],
    ['var [...foo,,] = obj;', Context.Empty],
    ['var [...[a, b],,] = obj;', Context.Empty],
    ['ar [... ...foo] = obj;', Context.Empty],
    [' var [...] = obj;', Context.Empty],
    ['var [..x] = obj; ', Context.Empty],
    ['var {foo};', Context.Empty],
    ['var [.x] = obj;', Context.Empty],
    ['var {,} = x;', Context.Empty],
    ['var {foo,,} = x;', Context.Empty],
    [' var {,foo} = x; ', Context.Empty],
    ['var {,,foo} = x;', Context.Empty],
    ['var {foo,,bar} = x;', Context.Empty],
    ['var\nfoo()', Context.Empty],
    ['var [foo = x];', Context.Empty],
    ['var [foo], bar;', Context.Empty],
    ['var foo, [bar];', Context.Empty],
    ['var [foo:bar] = obj;', Context.Empty],
    ['var [...foo, bar] = obj;', Context.Empty],
    ['var [...foo,] = obj;', Context.Empty],
    ['var [...foo,,] = obj;', Context.Empty],
    ['var [...[foo, bar],] = obj;', Context.Empty],
    ['var [...[foo, bar],,] = obj;', Context.Empty],
    ['var [... ...foo] = obj;', Context.Empty],
    ['var [...bar = foo] = obj;', Context.Empty],
    ['var [.x] = obj;', Context.Empty],
    ['var [..x] = obj;', Context.Empty],
    ['var {,} = obj;', Context.Empty],
    ['var {,,} = obj;', Context.Empty],
    ['var {,x} = obj;', Context.Empty],
    ['var {,,x} = obj;', Context.Empty],
    ['var {x,, y} = obj;', Context.Empty],
    ['var {x,, y} = obj;', Context.Empty],
    ['var {x};', Context.Empty],
    ['var {x}, {y} = z;', Context.Empty],
    ['var x, {y};', Context.Empty],
    ['var {x}, y', Context.Empty],
    ['var {x:y};', Context.Empty],
    ['var {x=y};', Context.Empty],
    ['for (var {x = y, z = a} = obj);', Context.Empty],
    ['for (var {x : y} = obj);', Context.Empty],
    ['for (var {x : y, z} = obj);', Context.Empty],
    ['for (var {x : y, z : a} = obj);', Context.Empty],
    ['for (var {x : y = z} = obj);', Context.Empty],
    ['for (var {x : y, z, a : b = c} = obj)', Context.Empty],
    ['for (var {x}, {y} = z);', Context.Empty],
    ['for (var x, {y});', Context.Empty],
    ['for (var {x});', Context.Empty],
    ['for (var {x}, y);', Context.Empty],
    ['for (var x = y, {z});', Context.Empty],
    ['for (var {x}, y);', Context.Empty],
    ['for (var {x:y});', Context.Empty],
    ['for (var {x:y=z} = obj, {a:b=c});', Context.Empty],
    ['for (var {x:y=z});', Context.Empty],
    ['for (var {x:y=z}, {a:b=c} = obj);', Context.Empty],
    ['for (var {a:=c} = z);', Context.Empty],
    ['for (var {[x]: y} = z);', Context.Empty],
    ['for (var {[x]: y});', Context.Empty],
    ['for (var {[x] = y} = z);', Context.Empty],
    ['for (var {[x]: y = z});', Context.Empty],
    ['for (var {[x]: y = z} = a);', Context.Empty],
    ['for (var {a, [x]: y} = a);', Context.Empty],
    ['for (var [foo] = arr, [bar] in arr);', Context.Empty],
    ['for (var [foo], bar in arr);', Context.Empty],
    ['for (var [foo] = arr, bar in arr);', Context.Empty],
    ['for (var foo, [bar] in arr);', Context.Empty],
    ['for (var foo = arr, [bar] in arr);', Context.Empty],
    ['for (var [foo = x]);', Context.Empty],
    ['var {[x]} = z;', Context.Empty],
    ['var {[x] = y} = z;', Context.Empty],
    ['for (var foo);', Context.Empty],
    ['for (var\nfoo();;);', Context.Empty],
    ['for (var foo = bar, zoo = boo);', Context.Empty],
    ['for (var\nfoo());', Context.Empty],
    ['for (var foo = bar, zoo = boo in x);', Context.Empty],
    ['var {foo};', Context.Empty],
    ['for (var foo = bar, zoo = boo of x);', Context.Empty],
    ['for (var\nfoo() of x);', Context.Empty],
    ['for (var [foo];;);', Context.Empty],
    ['for (var foo, [bar];;);', Context.Empty],
    ['for (var [...foo, bar] = obj;;);', Context.Empty],
    ['var {foo};', Context.Empty],
    ['for (var [...foo,,] = obj;;);', Context.Empty],
    ['for (var [...[foo, bar],,] = obj;;);', Context.Empty],
    ['for (var [...bar = foo] = obj;;);', Context.Empty],
    ['for (var [... ...foo] = obj;;);', Context.Empty],
    ['for (var {,} = obj;;);', Context.Empty],
    ['for (var {,,x} = obj;;);', Context.Empty],
    ['var {foo};', Context.Empty],
    ['for (var {x,, y} = obj;;);', Context.Empty],
    ['for (var {x}, {y} = z;;);', Context.Empty],
    ['for (var {x}, y;;);', Context.Empty],
    ['for (var {x:y=z} = obj, {a:b=c};;);', Context.Empty],
    ['for (var [foo]);', Context.Empty],
    ['for (var [foo, ...bar] = obj);', Context.Empty],
    ['for (var [...[foo, bar],,] = obj);', Context.Empty],
    ['for (var [.x] = obj);', Context.Empty],
    ['for (var [..x] = obj);', Context.Empty],
    ['for (var {x,} = obj);', Context.Empty],
    ['for (var {x,, y} = obj);', Context.Empty],
    ['for (var {x} = a, y = obj);', Context.Empty],
    ['for (var {x} = a, obj);', Context.Empty],
    ['for (var x, {y} = obj);', Context.Empty],
    ['for (var {x = y, z} = obj);', Context.Empty],
    ['for (var {x : y} = obj);', Context.Empty],
    ['for (var {x : y = z} = obj);', Context.Empty],
    ['for (var x, {y});', Context.Empty],
    ['for (var {x=y});', Context.Empty],
    ['for (var {[x] = y} = z);', Context.Empty],
    ['for (var {[x]: y = z});', Context.Empty],
    ['var {foo};', Context.Empty],
    ['for (var {[x]: y = z} = a);', Context.Empty],
    ['for (var [foo], bar);', Context.Empty],
    ['for (var [...foo, bar] in obj);', Context.Empty],
    ['for (var [...[foo, bar],,] in obj);', Context.Empty],
    ['for (var [...[foo, bar],] in obj);', Context.Empty],
    ['for (var [...] in obj);', Context.Empty],
    ['for (var [..x] in obj);', Context.Empty],
    ['for (var {,} in obj);', Context.Empty],
    ['for (var {,,} in obj);', Context.Empty],
    ['for (var {,,x} in obj);', Context.Empty],
    ['for (var {x,, y} in obj);', Context.Empty],
    ['for (var {x} = a, {y} in obj);', Context.Empty],
    ['for (var {x=y});', Context.Empty],
    ['for (var {a:=c} in z);', Context.Empty],
    ['for (var [foo] = arr, [bar] of arr);', Context.Empty],
    ['for (var [foo], bar of arr);', Context.Empty],
    ['for (var [foo] = arr, bar of arr);', Context.Empty],
    ['for (var foo, [bar] of arr);', Context.Empty],
    ['for (var [foo = x]);', Context.Empty],
    ['for (var [foo]);', Context.Empty],
    ['for (var foo, [bar]);', Context.Empty],
    ['for (var [...foo, bar] of obj);', Context.Empty],
    ['for (var [...foo,,] of obj);', Context.Empty],
    ['for (var [...[foo, bar],] of obj);', Context.Empty],
    ['var {foo};', Context.Empty],
    ['for (var [...[foo, bar],,] of obj);', Context.Empty],
    ['for (var [..x] of obj);', Context.Empty],
    ['for (var [.x] of obj);', Context.Empty],
    ['for (var {,,} of obj);', Context.Empty],
    ['for (var x, {y} of obj);', Context.Empty]
  ]);

  for (const arg of [
    'var [[...x] = function() { initCount += 1; }()] = [[2, 1, 3]];',
    'var [[x]] = [null];',
    'var [cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }] = [];',
    `var first = 0;
    var second = 0;
    function* g() {
      first += 1;
      yield;
      second += 1;
    };

    var [,] = g();`,
    'var { x, } = { x: 23 };',
    'var { w: [x, y, z] = [4, 5, 6] } = {};',
    'var { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };',
    'var { x: y = 33 } = { };',
    'var { x: y, } = { x: 23 };',
    'var xCls = class x {};',
    'var cls = class {};',
    'var\n{x} = x;',
    'var {x}\n= x;',
    'var [...x] = [1, 2, 3];',
    'var { x, } = { x: 23 };',
    'var { x: y = 33 } = { };',
    'var {...x} = { get v() { count++; return 2; } };',
    `var { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: undefined };`,
    `var { poisoned: x = ++initEvalCount } = poisonedProperty;`,
    `var { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };`,
    `var arrow = () => {};`,
    `var xFn = function x() {};`,
    'var obj = { test262id: 1 };'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
      });
    });
  }

  // Should fail on reserved words
  const reservedKeywords = [
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'new',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'null',
    'true',
    'false'
    // future reserved keyword,
    //  'enum',
  ];

  for (const arg of reservedKeywords) {
    it(`for (var ${arg} = x;;);`, () => {
      t.throws(() => {
        parseSource(`for (var ${arg} = x;;);`, undefined, Context.Empty);
      });
    });

    it(`function f({${arg}}) {}`, () => {
      t.throws(() => {
        parseSource(`function f({${arg}}) {}`, undefined, Context.Empty);
      });
    });

    it(`function fh({x: ${arg}}) {}`, () => {
      t.throws(() => {
        parseSource(`function fh({x: ${arg}}) {}`, undefined, Context.Empty);
      });
    });

    it(`function f([${arg}]) {}`, () => {
      t.throws(() => {
        parseSource(`function f([${arg}]) {}`, undefined, Context.Empty);
      });
    });

    it(`try {} catch (${arg}) {}`, () => {
      t.throws(() => {
        parseSource(`try {} catch (${arg}) {}`, undefined, Context.Empty);
      });
    });

    it(`export var ${arg} = 10;`, () => {
      t.throws(() => {
        parseSource(`export var ${arg} = 10;`, undefined, Context.Module);
      });
    });
  }

  pass('Declarations - Var (pass)', [
    [
      'var f; function f() {}',
      Context.OptionsWebCompat,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'f',
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
            async: false,
            body: {
              body: [],
              type: 'BlockStatement'
            },
            generator: false,
            id: {
              name: 'f',
              type: 'Identifier'
            },
            params: [],
            type: 'FunctionDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'for (var {x, y = z} of obj);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        method: false,
                        shorthand: true
                      },
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'y'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'z'
                          }
                        },
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (var {x = y, z = a} of obj);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'y'
                          }
                        },
                        method: false,
                        shorthand: true
                      },
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'z'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'z'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'a'
                          }
                        },
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (var {x : y} of obj);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (var {x, y : z} of obj);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        method: false,
                        shorthand: true
                      },
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'z'
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (var {x : y, z : a} of obj);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        method: false,
                        shorthand: false
                      },
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'z'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (var foo in x);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
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
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        ]
      }
    ],
    [
      'for (var foo of x);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
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
            right: {
              type: 'Identifier',
              name: 'x'
            },
            await: false
          }
        ]
      }
    ],
    [
      'for (var [,] = x;;);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  id: {
                    type: 'ArrayPattern',
                    elements: [null]
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (var [foo,] = arr;;);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Identifier',
                    name: 'arr'
                  },
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    ]
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (var [,foo] = arr;;);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Identifier',
                    name: 'arr'
                  },
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      null,
                      {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    ]
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (var [foo,,bar] = arr;;);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Identifier',
                    name: 'arr'
                  },
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      null,
                      {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    ]
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (var [foo, ...bar] = obj;;);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Identifier',
                    name: 'obj'
                  },
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'Identifier',
                          name: 'bar'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (var [x, ...[foo, bar]] = obj;;);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Identifier',
                    name: 'obj'
                  },
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      },
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'foo'
                            },
                            {
                              type: 'Identifier',
                              name: 'bar'
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (var [a=[...b], ...c] = obj;;);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Identifier',
                    name: 'obj'
                  },
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'SpreadElement',
                              argument: {
                                type: 'Identifier',
                                name: 'b'
                              }
                            }
                          ]
                        }
                      },
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'Identifier',
                          name: 'c'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (var x = a, {y} = obj;;);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  id: {
                    type: 'Identifier',
                    name: 'x'
                  }
                },
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Identifier',
                    name: 'obj'
                  },
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (var x, {y} = obj;;);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement'
            },
            init: {
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
                },
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Identifier',
                    name: 'obj'
                  },
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                }
              ]
            },
            test: null,
            update: null
          }
        ]
      }
    ],
    [
      'for (var [] in x);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: []
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        ]
      }
    ],
    [
      'for (var [,,] in x);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [null, null]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        ]
      }
    ],
    [
      'var x; var x = 5;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 5
                },
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
      'var x = 5; function x() {}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 5
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
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
              name: 'x'
            }
          }
        ]
      }
    ],
    [
      'var x; x = 8;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 8
              }
            }
          }
        ]
      }
    ],
    [
      'var O = { async method() { await 1; } }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'method'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: [
                            {
                              type: 'ExpressionStatement',
                              expression: {
                                type: 'AwaitExpression',
                                argument: {
                                  type: 'Literal',
                                  value: 1
                                }
                              }
                            }
                          ]
                        },
                        async: true,
                        generator: false,
                        id: null
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false
                    }
                  ]
                },
                id: {
                  type: 'Identifier',
                  name: 'O'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var O = { async ["meth" + "od"]() { await 1; } }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'Literal',
                          value: 'meth'
                        },
                        right: {
                          type: 'Literal',
                          value: 'od'
                        },
                        operator: '+'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: [
                            {
                              type: 'ExpressionStatement',
                              expression: {
                                type: 'AwaitExpression',
                                argument: {
                                  type: 'Literal',
                                  value: 1
                                }
                              }
                            }
                          ]
                        },
                        async: true,
                        generator: false,
                        id: null
                      },
                      kind: 'init',
                      computed: true,
                      method: true,
                      shorthand: false
                    }
                  ]
                },
                id: {
                  type: 'Identifier',
                  name: 'O'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var [ a, , b ] = list',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Identifier',
                  name: 'list'
                },
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    },
                    null,
                    {
                      type: 'Identifier',
                      name: 'b'
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var O = { async "method"() { await 1; } }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Literal',
                        value: 'method'
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: [
                            {
                              type: 'ExpressionStatement',
                              expression: {
                                type: 'AwaitExpression',
                                argument: {
                                  type: 'Literal',
                                  value: 1
                                }
                              }
                            }
                          ]
                        },
                        async: true,
                        generator: false,
                        id: null
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false
                    }
                  ]
                },
                id: {
                  type: 'Identifier',
                  name: 'O'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var O = { async 0() { await 1; } }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Literal',
                        value: 0
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: [
                            {
                              type: 'ExpressionStatement',
                              expression: {
                                type: 'AwaitExpression',
                                argument: {
                                  type: 'Literal',
                                  value: 1
                                }
                              }
                            }
                          ]
                        },
                        async: true,
                        generator: false,
                        id: null
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false
                    }
                  ]
                },
                id: {
                  type: 'Identifier',
                  name: 'O'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var let',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
                  name: 'let'
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var [let] = []',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ArrayExpression',
                  elements: []
                },
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'let'
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var x; { with ({}) { x = 1; } }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
            type: 'BlockStatement',
            body: [
              {
                type: 'WithStatement',
                object: {
                  type: 'ObjectExpression',
                  properties: []
                },
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        operator: '=',
                        right: {
                          type: 'Literal',
                          value: 1
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '{ var x; }; x = 0;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
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
              }
            ]
          },
          {
            type: 'EmptyStatement'
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 0
              }
            }
          }
        ]
      }
    ],
    [
      'var x = 8;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 8
                },
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
      'var x; { var x = 5; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                kind: 'var',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: {
                      type: 'Literal',
                      value: 5
                    },
                    id: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    [
      'var {x=1} = {a: 4, b: (x = 5)};',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      value: {
                        type: 'Literal',
                        value: 4
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      value: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        operator: '=',
                        right: {
                          type: 'Literal',
                          value: 5
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    }
                  ]
                },
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      kind: 'init',
                      key: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      computed: false,
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          type: 'Literal',
                          value: 1
                        }
                      },
                      method: false,
                      shorthand: true
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var x = {a: 4, b: (x = 5)};',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      value: {
                        type: 'Literal',
                        value: 4
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      value: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        operator: '=',
                        right: {
                          type: 'Literal',
                          value: 5
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    }
                  ]
                },
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
      'var x; try {} catch (x) { x = 5; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'x'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      operator: '=',
                      right: {
                        type: 'Literal',
                        value: 5
                      }
                    }
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'var x; eval("");',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'eval'
              },
              arguments: [
                {
                  type: 'Literal',
                  value: ''
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'eval(""); var x;',
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
                name: 'eval'
              },
              arguments: [
                {
                  type: 'Literal',
                  value: ''
                }
              ]
            }
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
      'var x; var x;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
      'function x() {}; var x;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
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
              name: 'x'
            }
          },
          {
            type: 'EmptyStatement'
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
      'var x; try {} catch (x) { var x = 5; }',
      Context.OptionsWebCompat,
      {
        type: 'Program',
        sourceType: 'script',
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
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'x'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: 5
                        },
                        id: {
                          type: 'Identifier',
                          name: 'x'
                        }
                      }
                    ]
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      '"use strict"; var x = 0; { let x; x = 6; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict'
            }
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 0
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          },
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                kind: 'let',
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
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '=',
                  right: {
                    type: 'Literal',
                    value: 6
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    [
      '"use strict"; let x = 0; { let x = 6; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict'
            }
          },
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 0
                },
                id: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ]
          },
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'VariableDeclaration',
                kind: 'let',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: {
                      type: 'Literal',
                      value: 6
                    },
                    id: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    [
      'var [x, x] = [4, 5];',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'Literal',
                      value: 4
                    },
                    {
                      type: 'Literal',
                      value: 5
                    }
                  ]
                },
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    },
                    {
                      type: 'Identifier',
                      name: 'x'
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var x; [x, x] = [4, 5];',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
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
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'x'
                  },
                  {
                    type: 'Identifier',
                    name: 'x'
                  }
                ]
              },
              operator: '=',
              right: {
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'Literal',
                    value: 4
                  },
                  {
                    type: 'Literal',
                    value: 5
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'var {a: x, b: x} = {a: 4, b: 5};',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      value: {
                        type: 'Literal',
                        value: 4
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      value: {
                        type: 'Literal',
                        value: 5
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    }
                  ]
                },
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      kind: 'init',
                      key: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      kind: 'init',
                      key: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      method: false,
                      shorthand: false
                    }
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
    [
      'var x = {a: 4, b: (x = 5)};',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      value: {
                        type: 'Literal',
                        value: 4
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      value: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        operator: '=',
                        right: {
                          type: 'Literal',
                          value: 5
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    }
                  ]
                },
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
      'var foo = {}; foo.if;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: []
                },
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ]
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'foo'
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'if'
              }
            }
          }
        ]
      }
    ],
    [
      'var foo = {}; foo.super;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: []
                },
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ]
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'foo'
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'super'
              }
            }
          }
        ]
      }
    ],
    [
      '"use strict"; var foo = {}; foo.eval;',
      Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              raw: '"use strict"',
              value: 'use strict'
            },
            directive: 'use strict'
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: []
                },
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ]
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                raw: 'foo',
                name: 'foo'
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'eval',
                raw: 'eval'
              }
            }
          }
        ]
      }
    ],
    [
      'var foo = {}; foo.interface;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: []
                },
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ]
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'foo'
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'interface'
              }
            }
          }
        ]
      }
    ],
    [
      'var foo = {}; foo.arguments;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ObjectExpression',
                  properties: []
                },
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ]
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'foo'
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'arguments'
              }
            }
          }
        ]
      }
    ],
    [
      'var [,] = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [null]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var [,,] = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [null, null]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var\nfoo',
      Context.Empty,
      {
        body: [
          {
            declarations: [
              {
                id: {
                  name: 'foo',
                  type: 'Identifier'
                },
                init: null,
                type: 'VariableDeclarator'
              }
            ],
            kind: 'var',
            type: 'VariableDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'var [foo,,] = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    null
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var [,foo] = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    null,
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var [,,foo] = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    null,
                    null,
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var [foo,bar] = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var [foo] = x, [foo] = y;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var [foo] = x, b;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'b'
                },
                init: null
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var [foo] = x, b = y;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'b'
                },
                init: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var x, [foo] = y;',
      Context.Empty,
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var [foo=a] = c;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'c'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var [foo=a,bar=b] = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a'
                      }
                    },
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      right: {
                        type: 'Identifier',
                        name: 'b'
                      }
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {} = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: []
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo} = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo,} = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo} = x, {foo} = y;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo} = x, b;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'b'
                },
                init: null
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo} = x, b = y;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              },
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'b'
                },
                init: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var x, {foo} = y;',
      Context.Empty,
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
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'y'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var x; { let x; var y; }',
      Context.Empty,
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
            type: 'BlockStatement',
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
                kind: 'let'
              },
              {
                type: 'VariableDeclaration',
                declarations: [
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
              }
            ]
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var foo;',
      Context.Empty,
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
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var foo = bar;',
      Context.Empty,
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
                init: {
                  type: 'Identifier',
                  name: 'bar'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo=a} = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      computed: false,
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'a'
                        }
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo=a,bar} = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      computed: false,
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'a'
                        }
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo,bar=b} = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      computed: false,
                      value: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      computed: false,
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var {foo=a,bar=b} = x;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      computed: false,
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'a'
                        }
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'bar'
                      },
                      computed: false,
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      },
                      kind: 'init',
                      method: false,
                      shorthand: true
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  name: 'x'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ]
  ]);
});
