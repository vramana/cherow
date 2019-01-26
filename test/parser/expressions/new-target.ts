import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - New target', () => {
  for (const arg of [
    'new.target',
    '{ new.target }',
    '() => new.target',
    'if (1) { new.target }',
    'if (1) {} else { new.target }',
    'while (0) { new.target }',
    'do { new.target } while (0)',
    'function f() { new.anythingElse; }',
    'new.prop',
    'var f = function() { new.unknown_property; }',
    'function f() { new..target; }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });

    it(`"use strict"; ${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }

  fail('Expressions - Template', [
    ['() => {new.target}', Context.Empty],
    ['new delete x', Context.Empty],
    ['new delete x.y', Context.Empty],
    ['new delete x().y', Context.Empty],
    ['new typeof x.y', Context.Empty],
    // ['new async () => x', Context.Empty],
    //    ['new async \n () => x', Context.Empty],
    ['async () => new await x', Context.Empty],
    ['async () => new await x()', Context.Empty],
    ['async () => new await x()()', Context.Empty],
    ['new.target', Context.Empty],
    ['new await foo', Context.Strict | Context.Module],

    ['function f(){ new.foo }', Context.Empty],
    ['_ => new.target', Context.Empty],
    ['_ => _ => _ => _ => new.target', Context.Empty]
  ]);

  for (const arg of [
    'function foo(){with({}) {new.target;}}',
    'function foo(){{if(true){new.target;}}}',
    'function foo(){ var x = function() {new.target;}; x();}',
    'function foo(){ var o = { "foo" : function () { new.target}}; o.foo();}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
      });
    });
  }

  for (const arg of [
    'new.target',
    '{ new.target }',
    '() => { new.target }',
    '() => new.target',
    'if (1) { new.target }',
    'if (1) {} else { new.target }',
    'while (0) { new.target }',
    'do { new.target } while (0)',
    'function a(b = new.target){}',
    'class C {get x() { { new.target } }}',
    'class C {get x() { () => new.target }}',
    'class C {get x() { do { new.target } while (0) }}',
    'function f() { new.target }',
    'function f() { () => new.target }',
    'function f() { if (1) { new.target } }',
    'function f() { while (0) { new.target } }',
    'function f() { do { new.target } while (0) }',
    `function a(){{if(true){new.target;}}}`,
    `function abc(){ var a = b = c = 1; try {} catch([a,b,c]) { new.target;}}`,
    `function a(){ var o = { "foo" : function () { new.target}}; o.foo();}`,
    '({ set a(b = new.target){} })',
    '(function a(b = new.target){})',
    'function f() { let x = new.target; }',
    'function f() { new new.target()(); }',
    'function f() { new.target(); }'
  ]) {
    it(`function f() {${arg}}`, () => {
      t.doesNotThrow(() => {
        parseSource(`function f() {${arg}}`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`'use strict'; function f() {${arg}}`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; function f() {${arg}}`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`var f = function() {${arg}}`, () => {
      t.doesNotThrow(() => {
        parseSource(`var f = function() {${arg}}`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`({m: function() {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`({m: function() {${arg}}})`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`({set x(_) {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`({set x(_) {${arg}}})`, undefined, Context.OptionsNext);
      });
    });

    it(`'use strict'; ({get x() {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; ({get x() {${arg}}})`, undefined, Context.Empty);
      });
    });

    it(`({m: function() {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`({m: function() {${arg}}})`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`'use strict'; ({m: function() {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`'use strict'; ({m: function() {${arg}}})`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`class C {m() {${arg}}}`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C {m() {${arg}}}`, undefined, Context.Empty);
      });
    });

    it(`class C {set x(_) {${arg}}}`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C {set x(_) {${arg}}}`, undefined, Context.OptionsNext | Context.Module);
      });
    });
  }

  pass('Expressions - Array (pass)', [
    [
      'class C {set x(_) {do { new.target } while (0)}}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'C'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'set',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'Identifier',
                        name: '_'
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'DoWhileStatement',
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  meta: {
                                    type: 'Identifier',
                                    name: 'new'
                                  },
                                  type: 'MetaProperty',
                                  property: {
                                    type: 'Identifier',
                                    name: 'target'
                                  }
                                }
                              }
                            ]
                          },
                          test: {
                            type: 'Literal',
                            value: 0
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'function f(){ new . target }',
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
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    meta: {
                      type: 'Identifier',
                      name: 'new'
                    },
                    type: 'MetaProperty',
                    property: {
                      type: 'Identifier',
                      name: 'target'
                    }
                  }
                }
              ]
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'function f(){ new.target }',
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
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    meta: {
                      type: 'Identifier',
                      name: 'new'
                    },
                    type: 'MetaProperty',
                    property: {
                      type: 'Identifier',
                      name: 'target'
                    }
                  }
                }
              ]
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'function f(){ _ => _ => new.target }',
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
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'ArrowFunctionExpression',
                      body: {
                        meta: {
                          type: 'Identifier',
                          name: 'new'
                        },
                        type: 'MetaProperty',
                        property: {
                          type: 'Identifier',
                          name: 'target'
                        }
                      },
                      params: [
                        {
                          type: 'Identifier',
                          name: '_'
                        }
                      ],
                      id: null,
                      async: false,
                      expression: true
                    },
                    params: [
                      {
                        type: 'Identifier',
                        name: '_'
                      }
                    ],
                    id: null,
                    async: false,
                    expression: true
                  }
                }
              ]
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      '_ => function(){ new.target }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        meta: {
                          type: 'Identifier',
                          name: 'new'
                        },
                        type: 'MetaProperty',
                        property: {
                          type: 'Identifier',
                          name: 'target'
                        }
                      }
                    }
                  ]
                },
                async: false,
                generator: false,

                id: null
              },
              params: [
                {
                  type: 'Identifier',
                  name: '_'
                }
              ],
              id: null,
              async: false,
              expression: true
            }
          }
        ]
      }
    ],
    [
      'function f(){ new.target + foo }',
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
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      meta: {
                        type: 'Identifier',
                        name: 'new'
                      },
                      type: 'MetaProperty',
                      property: {
                        type: 'Identifier',
                        name: 'target'
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    operator: '+'
                  }
                }
              ]
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'function f(){ foo + new.target }',
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
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    right: {
                      meta: {
                        type: 'Identifier',
                        name: 'new'
                      },
                      type: 'MetaProperty',
                      property: {
                        type: 'Identifier',
                        name: 'target'
                      }
                    },
                    operator: '+'
                  }
                }
              ]
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'foo({bar(){ new.target }})',
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
                name: 'foo'
              },
              arguments: [
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'bar'
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
                                meta: {
                                  type: 'Identifier',
                                  name: 'new'
                                },
                                type: 'MetaProperty',
                                property: {
                                  type: 'Identifier',
                                  name: 'target'
                                }
                              }
                            }
                          ]
                        },
                        async: false,
                        generator: false,

                        id: null
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'function f(f=new.target){}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'Identifier',
                  name: 'f'
                },
                right: {
                  meta: {
                    type: 'Identifier',
                    name: 'new'
                  },
                  type: 'MetaProperty',
                  property: {
                    type: 'Identifier',
                    name: 'target'
                  }
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            async: false,
            generator: false,

            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      '({foo(x=new.target){}})',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          meta: {
                            type: 'Identifier',
                            name: 'new'
                          },
                          type: 'MetaProperty',
                          property: {
                            type: 'Identifier',
                            name: 'target'
                          }
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: false,

                    id: null
                  },
                  kind: 'init',
                  computed: false,
                  method: true,
                  shorthand: false
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'f = function() {() => new.target}',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'f'
              },
              operator: '=',
              right: {
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                          meta: {
                            type: 'Identifier',
                            name: 'new'
                          },
                          type: 'MetaProperty',
                          property: {
                            type: 'Identifier',
                            name: 'target'
                          }
                        },
                        params: [],
                        id: null,
                        async: false,
                        expression: true
                      }
                    }
                  ]
                },
                async: false,
                generator: false,
                id: null
              }
            }
          }
        ]
      }
    ],
    [
      '(x.foo)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'Identifier',
                name: 'x'
              },
              property: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x + foo)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              operator: '+',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x.foo = y)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'x'
                },
                property: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(typeof x)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'typeof',
              argument: {
                type: 'Identifier',
                name: 'x'
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    // ['((x));', Context.Empty, {}],
    [
      '(a = 1, b = 2);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  right: {
                    type: 'Literal',
                    value: 1
                  }
                },
                {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'Literal',
                    value: 2
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a) = 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a.b) = 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a[b]) = 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    //['(a.b().c().d) = 1;', Context.Empty, {}],
    [
      '(a[b]) = 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a) += 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '+=',
              left: {
                type: 'Identifier',
                name: 'a'
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a.b) += 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '+=',
              left: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a[b]) += 1;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '+=',
              left: {
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
                  name: 'b'
                }
              },
              right: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    // ['(a.b().c().d) += 1;', Context.Empty, {}],
    [
      '(delete foo.bar);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'foo'
                },
                property: {
                  type: 'Identifier',
                  name: 'bar'
                }
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '([delete foo.bar]);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'UnaryExpression',
                  operator: 'delete',
                  argument: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  },
                  prefix: true
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '([target()[targetKey(a=b)]] = x);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'MemberExpression',
                    computed: true,
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'target'
                      },
                      arguments: []
                    },
                    property: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'targetKey'
                      },
                      arguments: [
                        {
                          type: 'AssignmentExpression',
                          operator: '=',
                          left: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'b'
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              right: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '([a.b] = x);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                ]
              },
              right: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(void x)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'void',
              argument: {
                type: 'Identifier',
                name: 'x'
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '[].length',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'ArrayExpression',
                elements: []
              },
              property: {
                type: 'Identifier',
                name: 'length'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x = y)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(a, b)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '([a / b]);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'BinaryExpression',
                  operator: '/',
                  left: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'b'
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '([a \n/b/g]);',
      Context.Empty,
      {
        body: [
          {
            expression: {
              elements: [
                {
                  left: {
                    left: {
                      name: 'a',
                      type: 'Identifier'
                    },
                    operator: '/',
                    right: {
                      name: 'b',
                      type: 'Identifier'
                    },
                    type: 'BinaryExpression'
                  },
                  operator: '/',
                  right: {
                    name: 'g',
                    type: 'Identifier'
                  },
                  type: 'BinaryExpression'
                }
              ],
              type: 'ArrayExpression'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      '(++x);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              operator: '++',
              argument: {
                type: 'Identifier',
                name: 'x'
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'delete (foo)',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'Identifier',
                name: 'foo'
              },
              prefix: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(++x, y);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'UpdateExpression',
                  operator: '++',
                  argument: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  prefix: true
                },
                {
                  type: 'Identifier',
                  name: 'y'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    /* ['(x--);', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "UpdateExpression",
              "operator": "--",
              "argument": {
                  "type": "Identifier",
                  "name": "x"
              },
              "prefix": false
          }
      }
  ],
  "sourceType": "script"
}],*/
    /* ['(x--, y);', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "SequenceExpression",
              "expressions": [
                  {
                      "type": "UpdateExpression",
                      "operator": "--",
                      "argument": {
                          "type": "Identifier",
                          "name": "x"
                      },
                      "prefix": false
                  },
                  {
                      "type": "Identifier",
                      "name": "y"
                  }
              ]
          }
      }
  ],
  "sourceType": "script"
}],
['(a=1)=2', Context.Empty, {
  "type": "Program",
  "body": [
      {
          "type": "ExpressionStatement",
          "expression": {
              "type": "AssignmentExpression",
              "operator": "=",
              "left": {
                  "type": "AssignmentPattern",
                  "left": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "right": {
                      "type": "Literal",
                      "value": 1,
                  }
              },
              "right": {
                  "type": "Literal",
                  "value": 2,
                  "raw": "2"
              }
          }
      }
  ],
  "sourceType": "script"
}],*/
    [
      '([].x);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              computed: false,
              object: {
                type: 'ArrayExpression',
                elements: []
              },
              property: {
                type: 'Identifier',
                name: 'x'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x + y) >= z',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              operator: '>=',
              left: {
                type: 'BinaryExpression',
                operator: '+',
                left: {
                  type: 'Identifier',
                  name: 'x'
                },
                right: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              right: {
                type: 'Identifier',
                name: 'z'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(x &= 42)',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '&=',
              right: {
                type: 'Literal',
                value: 42
              }
            }
          }
        ]
      }
    ],
    [
      '([a])',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ]
            }
          }
        ]
      }
    ]
  ]);
});
