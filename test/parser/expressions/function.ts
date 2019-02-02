import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Functions', () => {
  const inValids: Array<[string, Context]> = [
    // Duplicate function args in strct mode

    ['(function f(a, a) {})', Context.Strict],
    ['(function f(a, b, a) {})', Context.Strict],
    ['(function f(b, a, a) {})', Context.Strict],
    ['(function f(a, a, b) {})', Context.Strict],
    ['(function f(b, a, b, a) {})', Context.Strict],
    ['(function f(b, a, b, a = x) {})', Context.Strict],

    // Duplicate function args with explicit directive

    ['(function f(a, a) {"use strict";})', Context.Empty],
    ['(function f(a, b, a) {"use strict";})', Context.Empty],
    ['(function f(b, a, a) {"use strict";})', Context.Empty],
    ['(function f(a, a, b) {"use strict";})', Context.Empty],
    ['(function f(b, a, b, a) {"use strict";})', Context.Empty],
    ['(function f(b, a, b, a = x) {"use strict";})', Context.Empty],

    ['(function eval() {"use strict";})', Context.Empty],

    // General
    ['"use strict"; (function eval(){})', Context.Empty],
    ['"use strict"; (function eval(){})', Context.Empty],

    ['(function arguments(){ "use strict"; })', Context.Empty],
    ['(function arguments(){ "use strict"; })', Context.Empty],
    ['(function f(x) { let x })', Context.Empty]

    // Future reserved words
    //['(function package() {})', Context.Strict],
    //['(function implements() {})', Context.Strict | Context.Module],
    // ['(function package() {"use strict";})', Context.Empty],
  ];

  fail('Expressions - Functions', inValids);

  const validSyntax = [
    `(function foo(y, z) {{ function x() {} } })(1);`,
    // Complex parameter shouldn't be shadowed
    `(function foo(x = 0) { var x; { function x() {} } })(1);`,
    // Nested complex parameter shouldn't be shadowed
    `(function foo([[x]]) {var x; {function x() {} } })([[1]]);`,
    // Complex parameter shouldn't be shadowed
    `(function foo(x = 0) { var x; { function x() {}} })(1);`,
    // Nested complex parameter shouldn't be shadowed
    `(function foo([[x]]) { var x;{ function x() {} }  })([[1]]);`,
    // Rest parameter shouldn't be shadowed
    `(function foo(...x) { var x; {  function x() {}  } })(1);`,
    // Don't shadow complex rest parameter
    `(function foo(...[x]) { var x; { function x() {} } })(1);`,
    // Hoisting is not affected by other simple parameters
    `(function foo(y, z) {{function x() {}} })(1);`,
    // Hoisting is not affected by other complex parameters
    ` (function foo([y] = [], z) {{function x() {} } })();`,
    // Should allow shadowing function names
    `{(function foo() { { function foo() { return 0; } } })();}`,
    `{(function foo(...r) { { function foo() { return 0; } } })(); }`,
    `(function foo() { { let f = 0; (function () { { function f() { return 1; } } })(); } })();`,
    `(function foo() { var y = 1; (function bar(x = y) { { function y() {} } })();  })();`,
    `(function foo() { { function f() { return 4; } { function f() { return 5; } } }})()`,
    '(function foo(a = 0) { { let y = 3; function f(b = 0) { y = 2; } f(); } })();',
    '(function conditional() {  if (true) { function f() { return 1; } } else {  function f() { return 2; }} if (false) { function g() { return 1; }}  L: {break L;function f() { return 3; } }})();',
    '(function foo() {function outer() { return f; } { f = 1; function f () {} f = ""; } })();',
    '(function foo(x) { {  function x() {} } })(1);',
    '(function foo([[x]]) { { function x() {}}})([[1]]);',
    // rest parameter shouldn't be shadowed
    '(function shadowingRestParameterDoesntBind(...x) { {  function x() {} } })(1);'
  ];

  for (const arg of validSyntax) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }

  for (const arg of [
    '{ x: y }',
    '{ x, }',
    '{ x: y = 33 }',
    '{ fn = function () {}, xFn = function x() {} }',
    '{ cover = (function () {}), xCover = (1, function() {})  }',
    '{ arrow = () => {} }',
    '{}',
    '{ x: y } = { x: 23 }',
    '{ poisoned: x = ++initEvalCount } = poisonedProperty',
    '{ w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] }',
    '{ x, } = { x: 23 }',
    '[,] = g()',
    '[{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = []',
    '[{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }]',
    '[{ x, y, z } = { x: 44, y: 55, z: 66 }] = []',
    '[x = 23] = [,]',
    '[[...x] = [2, 1, 3]] = []',
    '[[x, y, z] = [4, 5, 6]] = []',
    '[ , , ...x]',
    '[, ...x]',
    '[,]',
    '[{ x }]',
    '[{ x }]',
    '[{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }]',
    '[ a = b ]',
    '[x = 23]',
    '[[] = function() { a += 1; }()]',
    'x = args = arguments'
  ]) {
    it(`(function(${arg}) {})`, () => {
      t.doesNotThrow(() => {
        parseSource(`(function(${arg}) {})`, undefined, Context.Empty);
      });
    });
  }

  for (const arg of [
    '(function([[,] = function* g() {}]) {})',
    '(function([cover = (function () {}), xCover = (1, function() {})]) {})',
    '(function([fn = function () {}, xFn = function x() {}]) {})',
    '(function([x = 23]) {})',
    '(function([...[x, y, z]]) {})',
    '(function([...[,]]) {})',
    '(function([...x]) {})',
    '(function([...{ length }]) {})',
    '(function([x = 23] = [undefined]) {})',
    '(function([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }]) {})',
    '(function({} = null) {})'
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
  // valid tests

  const valids: Array<[string, Context, any]> = [
    [
      '(function package() { (function gave_away_the_package() { "use strict"; }) })',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: {
                type: 'Identifier',
                name: 'package'
              },
              params: [],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'FunctionExpression',
                      id: {
                        type: 'Identifier',
                        name: 'gave_away_the_package'
                      },
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'Literal',
                              value: 'use strict'
                            }
                          }
                        ]
                      },
                      generator: false,

                      async: false
                    }
                  }
                ]
              },
              generator: false,

              async: false
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(function (eval) { (function () { "use strict"; })})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: null,
              params: [
                {
                  type: 'Identifier',
                  name: 'eval'
                }
              ],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'FunctionExpression',
                      id: null,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'Literal',
                              value: 'use strict'
                            }
                          }
                        ]
                      },
                      generator: false,

                      async: false
                    }
                  }
                ]
              },
              generator: false,

              async: false
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'x=function f(){ var f }',
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
                type: 'FunctionExpression',
                id: {
                  type: 'Identifier',
                  name: 'f'
                },
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          id: {
                            type: 'Identifier',
                            name: 'f'
                          },
                          init: null
                        }
                      ],
                      kind: 'var'
                    }
                  ]
                },
                generator: false,

                async: false
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'x=function f(){ let f }',
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
              operator: '=',
              right: {
                type: 'FunctionExpression',
                params: [],
                body: {
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
                            name: 'f'
                          }
                        }
                      ]
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
            }
          }
        ]
      }
    ],
    [
      '(function f( {p, q} = class C { get [[] = ";"]() {} } ) {})();',
      Context.LocationTracking,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          kind: 'init',
                          key: {
                            type: 'Identifier',
                            name: 'p',
                            start: 14,
                            end: 15,
                            loc: {
                              start: {
                                line: 1,
                                column: 14
                              },
                              end: {
                                line: 1,
                                column: 15
                              }
                            }
                          },
                          computed: false,
                          value: {
                            type: 'Identifier',
                            name: 'p',
                            start: 14,
                            end: 15,
                            loc: {
                              start: {
                                line: 1,
                                column: 14
                              },
                              end: {
                                line: 1,
                                column: 15
                              }
                            }
                          },
                          method: false,
                          shorthand: true,
                          start: 14,
                          end: 15,
                          loc: {
                            start: {
                              line: 1,
                              column: 14
                            },
                            end: {
                              line: 1,
                              column: 15
                            }
                          }
                        },
                        {
                          type: 'Property',
                          kind: 'init',
                          key: {
                            type: 'Identifier',
                            name: 'q',
                            start: 17,
                            end: 18,
                            loc: {
                              start: {
                                line: 1,
                                column: 17
                              },
                              end: {
                                line: 1,
                                column: 18
                              }
                            }
                          },
                          computed: false,
                          value: {
                            type: 'Identifier',
                            name: 'q',
                            start: 17,
                            end: 18,
                            loc: {
                              start: {
                                line: 1,
                                column: 17
                              },
                              end: {
                                line: 1,
                                column: 18
                              }
                            }
                          },
                          method: false,
                          shorthand: true,
                          start: 17,
                          end: 18,
                          loc: {
                            start: {
                              line: 1,
                              column: 17
                            },
                            end: {
                              line: 1,
                              column: 18
                            }
                          }
                        }
                      ],
                      start: 13,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      }
                    },
                    right: {
                      type: 'ClassExpression',
                      id: {
                        type: 'Identifier',
                        name: 'C',
                        start: 28,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 29
                          }
                        }
                      },
                      superClass: null,
                      body: {
                        type: 'ClassBody',
                        body: [
                          {
                            type: 'MethodDefinition',
                            kind: 'get',
                            static: false,
                            computed: true,
                            key: {
                              type: 'AssignmentExpression',
                              left: {
                                type: 'ArrayPattern',
                                elements: [],
                                start: 37,
                                end: 39,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 37
                                  },
                                  end: {
                                    line: 1,
                                    column: 39
                                  }
                                }
                              },
                              operator: '=',
                              right: {
                                type: 'Literal',
                                value: ';',
                                start: 42,
                                end: 45,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 42
                                  },
                                  end: {
                                    line: 1,
                                    column: 45
                                  }
                                }
                              },
                              start: 37,
                              end: 45,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 37
                                },
                                end: {
                                  line: 1,
                                  column: 45
                                }
                              }
                            },
                            value: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                type: 'BlockStatement',
                                body: [],
                                start: 49,
                                end: 51,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 49
                                  },
                                  end: {
                                    line: 1,
                                    column: 51
                                  }
                                }
                              },
                              async: false,
                              generator: false,
                              expression: false,
                              id: null,
                              start: 46,
                              end: 51,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 46
                                },
                                end: {
                                  line: 1,
                                  column: 51
                                }
                              }
                            },
                            start: 32,
                            end: 51,
                            loc: {
                              start: {
                                line: 1,
                                column: 32
                              },
                              end: {
                                line: 1,
                                column: 51
                              }
                            }
                          }
                        ],
                        start: 30,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 30
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        }
                      },
                      start: 22,
                      end: 53,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 53
                        }
                      }
                    },
                    start: 13,
                    end: 53,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 53
                      }
                    }
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 56,
                  end: 58,
                  loc: {
                    start: {
                      line: 1,
                      column: 56
                    },
                    end: {
                      line: 1,
                      column: 58
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
                  start: 10,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  }
                },
                start: 1,
                end: 58,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 58
                  }
                }
              },
              arguments: [],
              start: 0,
              end: 61,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 61
                }
              }
            },
            start: 0,
            end: 62,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 62
              }
            }
          }
        ],
        start: 0,
        end: 62,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 62
          }
        }
      }
    ],
    [
      `var E = 'Σ';
        var PI = 123;
        function f() {
            print(E = 2, /b/.test(E) || /b/.test(E = 2));
            ((E = 3) * PI);
        }`,
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
                  value: 'Σ'
                },
                id: {
                  type: 'Identifier',
                  name: 'E'
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
                  value: 123
                },
                id: {
                  type: 'Identifier',
                  name: 'PI'
                }
              }
            ]
          },
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'print'
                    },
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'E'
                        },
                        operator: '=',
                        right: {
                          type: 'Literal',
                          value: 2
                        }
                      },
                      {
                        type: 'LogicalExpression',
                        left: {
                          type: 'CallExpression',
                          callee: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Literal',
                              value: {},
                              regex: {
                                pattern: 'b',
                                flags: ''
                              }
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'test'
                            }
                          },
                          arguments: [
                            {
                              type: 'Identifier',
                              name: 'E'
                            }
                          ]
                        },
                        right: {
                          type: 'CallExpression',
                          callee: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Literal',
                              value: {},
                              regex: {
                                pattern: 'b',
                                flags: ''
                              }
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'test'
                            }
                          },
                          arguments: [
                            {
                              type: 'AssignmentExpression',
                              left: {
                                type: 'Identifier',
                                name: 'E'
                              },
                              operator: '=',
                              right: {
                                type: 'Literal',
                                value: 2
                              }
                            }
                          ]
                        },
                        operator: '||'
                      }
                    ]
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'E'
                      },
                      operator: '=',
                      right: {
                        type: 'Literal',
                        value: 3
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'PI'
                    },
                    operator: '*'
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
      '(function foo(y, z) {{ function x() {} } })(1);',
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'Identifier',
                    name: 'y'
                  },
                  {
                    type: 'Identifier',
                    name: 'z'
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'BlockStatement',
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
                        }
                      ]
                    }
                  ]
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 1
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '(function foo([[x]]) {var x; {function x() {} } })([[1]]);',
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'x'
                          }
                        ]
                      }
                    ]
                  }
                ],
                body: {
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
                    },
                    {
                      type: 'BlockStatement',
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
                        }
                      ]
                    }
                  ]
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              arguments: [
                {
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Literal',
                          value: 1
                        }
                      ]
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
      '(function foo(...[x]) { var x; { function x() {} } })(1);',
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ]
                    }
                  }
                ],
                body: {
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
                    },
                    {
                      type: 'BlockStatement',
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
                        }
                      ]
                    }
                  ]
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 1
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '(function conditional() {  if (true) { function f() { return 1; } } else {  function f() { return 2; }} if (false) { function g() { return 1; }}  L: {break L;function f() { return 3; } }})();',
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
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'IfStatement',
                      test: {
                        type: 'Literal',
                        value: true
                      },
                      consequent: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'FunctionDeclaration',
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              body: [
                                {
                                  type: 'ReturnStatement',
                                  argument: {
                                    type: 'Literal',
                                    value: 1
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
                      },
                      alternate: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'FunctionDeclaration',
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              body: [
                                {
                                  type: 'ReturnStatement',
                                  argument: {
                                    type: 'Literal',
                                    value: 2
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
                    },
                    {
                      type: 'IfStatement',
                      test: {
                        type: 'Literal',
                        value: false
                      },
                      consequent: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'FunctionDeclaration',
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              body: [
                                {
                                  type: 'ReturnStatement',
                                  argument: {
                                    type: 'Literal',
                                    value: 1
                                  }
                                }
                              ]
                            },
                            async: false,
                            generator: false,
                            id: {
                              type: 'Identifier',
                              name: 'g'
                            }
                          }
                        ]
                      },
                      alternate: null
                    },
                    {
                      type: 'LabeledStatement',
                      label: {
                        type: 'Identifier',
                        name: 'L'
                      },
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'BreakStatement',
                            label: {
                              type: 'Identifier',
                              name: 'L'
                            }
                          },
                          {
                            type: 'FunctionDeclaration',
                            params: [],
                            body: {
                              type: 'BlockStatement',
                              body: [
                                {
                                  type: 'ReturnStatement',
                                  argument: {
                                    type: 'Literal',
                                    value: 3
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
                    }
                  ]
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'conditional'
                }
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      '(function shadowingRestParameterDoesntBind(...x) { {  function x() {} } })(1);',
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'BlockStatement',
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
                        }
                      ]
                    }
                  ]
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'shadowingRestParameterDoesntBind'
                }
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 1
                }
              ]
            }
          }
        ]
      }
    ],
    [
      '(function foo() { { let f = 0; (function () { { function f() { return 1; } } })(); } })();',
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
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
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
                                value: 0
                              },
                              id: {
                                type: 'Identifier',
                                name: 'f'
                              }
                            }
                          ]
                        },
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                type: 'BlockStatement',
                                body: [
                                  {
                                    type: 'BlockStatement',
                                    body: [
                                      {
                                        type: 'FunctionDeclaration',
                                        params: [],
                                        body: {
                                          type: 'BlockStatement',
                                          body: [
                                            {
                                              type: 'ReturnStatement',
                                              argument: {
                                                type: 'Literal',
                                                value: 1
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
                                ]
                              },
                              async: false,
                              generator: false,
                              id: null
                            },
                            arguments: []
                          }
                        }
                      ]
                    }
                  ]
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              arguments: []
            }
          }
        ]
      }
    ],
    [
      '(function foo(y, z) {{function x() {}} })(1);',
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'Identifier',
                    name: 'y'
                  },
                  {
                    type: 'Identifier',
                    name: 'z'
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'BlockStatement',
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
                        }
                      ]
                    }
                  ]
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 1
                }
              ]
            }
          }
        ]
      }
    ],

    [
      'foo(function f(){})',
      Context.Empty,
      {
        type: 'Program',
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
                  type: 'FunctionExpression',
                  id: {
                    type: 'Identifier',
                    name: 'f'
                  },
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,

                  async: false
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo(function f(){})',
      Context.Empty,
      {
        type: 'Program',
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
                  type: 'FunctionExpression',
                  id: {
                    type: 'Identifier',
                    name: 'f'
                  },
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,

                  async: false
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let f = function await() {}',
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
                  name: 'f'
                },
                init: {
                  type: 'FunctionExpression',
                  id: {
                    type: 'Identifier',
                    name: 'await'
                  },
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,

                  async: false
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(yield) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'Identifier',
                name: 'yield'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(await) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'FunctionDeclaration',
            id: {
              type: 'Identifier',
              name: 'f'
            },
            params: [
              {
                type: 'Identifier',
                name: 'await'
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            generator: false,

            async: false
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let f = function f(yield) {}',
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
                  name: 'f'
                },
                init: {
                  type: 'FunctionExpression',
                  id: {
                    type: 'Identifier',
                    name: 'f'
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'yield'
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: []
                  },
                  generator: false,

                  async: false
                }
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(function(a, a) {})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: null,
              params: [
                {
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'a'
                }
              ],
              body: {
                type: 'BlockStatement',
                body: []
              },
              generator: false,

              async: false
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '(function eval() {})',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              id: {
                type: 'Identifier',
                name: 'eval'
              },
              params: [],
              body: {
                type: 'BlockStatement',
                body: []
              },
              generator: false,
              async: false
            }
          }
        ],
        sourceType: 'script'
      }
    ]
    //['function(a, a) {"use strict"}', Context.Empty, {}]
  ];

  pass('Expressions - Functions (pass)', valids);
});
