import { pass, fail } from '../utils';

describe('Miscellaneous - Tolerant mode', () => {

    describe('ESNext', () => {

        pass(`0o9n;`, {
            source: `0o9n;`,
            tolerant: true,
            next: true,
            expected: {
                  body: [
                    {
                      expression: {
                        bigint: '',
                        type: 'Literal',
                        value: 9,
                      },
                      type: 'ExpressionStatement'
                    }
                  ],
                  errors: [
                    {
                      "description": "Missing octal digits after '0o'",
                      index: 2,
                      column: 2,
                      lineNumber: 1,
                   }
                  ],
                  sourceType: 'script',
                  type: 'Program',
                }
        });

        pass(`let { x, y, ...z, } = obj;`, {
            source: `let { x, y, ...z, } = obj;`,
            tolerant: true,
            ranges: true,
            next: true,
            expected: {
                  body: [
                    {
                      declarations: [
                        {
                          end: 25,
                          id: {
                            end: 19,
                            properties: [
                              {
                                computed: false,
                                end: 7,
                                key: {
                                  end: 7,
                                  name: 'x',
                                  start: 6,
                                  type: 'Identifier',
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true,
                                start: 6,
                                type: 'Property',
                                value: {
                                  end: 7,
                                  name: 'x',
                                  start: 6,
                                  type: 'Identifier',
                                }
                             },
                              {
                                computed: false,
                                end: 10,
                                key: {
                                  end: 10,
                                  name: 'y',
                                  start: 9,
                                  type: 'Identifier',
                                },
                               kind: 'init',
                                method: false,
                                shorthand: true,
                                start: 9,
                                type: 'Property',
                                value: {
                                  end: 10,
                                  name: 'y',
                                  start: 9,
                                  type: 'Identifier',
                                }
                              },
                              {
                                argument: {
                                  end: 16,
                                  name: 'z',
                                 start: 15,
                                  type: 'Identifier',
                                },
                                end: 16,
                                start: 12,
                                type: 'RestElement',
                              }
                            ],
                            start: 4,
                            type: 'ObjectPattern',
                          },
                         init: {
                            end: 25,
                            name: 'obj',
                            start: 22,
                            type: 'Identifier',
                          },
                          start: 4,
                          type: 'VariableDeclarator',
                        }
                      ],
                      end: 26,
                      kind: 'let',
                      start: 0,
                      type: 'VariableDeclaration',
                    },
                  ],
                 end: 26,
                  errors: [
                    {
                      description: 'Rest element must be last element',
                      index: 17,
                      column: 16,
                      lineNumber: 1,
                   },
                  ],
                  sourceType: 'script',
                  start: 0,
                  type: 'Program',
                }
        });

        pass(`import(...[1])`, {
            source: `import(...[1])`,
            tolerant: true,
            next: true,
            expected: {
                  body: [
                    {
                      expression: {
                        arguments: [
                          {
                            argument: {
                              elements: [
                                {
                                  type: 'Literal',
                                  value: 1,
                                },
                              ],
                              type: 'ArrayExpression'
                            },
                            type: 'SpreadElement'
                          }
                        ],
                        callee: {
                          type: 'Import',
                        },
                        type: 'CallExpression'
                      },
                      type: 'ExpressionStatement'
                    }
                  ],
                  errors: [
                    {
                      description: 'Unexpected token \'...\'',
                      index: 10,
                      column: 7,
                      lineNumber: 1,
                    }
                  ],
                  sourceType: 'script',
                  type: 'Program',
                }
        });

        pass(`let { ...x = y } = z;`, {
            source: `let { a, ...b, c } = x;`,
            tolerant: true,
            next: true,
            expected: {
                  body: [
                    {
                      declarations: [
                        {
                          id: {
                            properties: [
                              {
                                computed: false,
                                key: {
                                  name: 'a',
                                  type: 'Identifier'
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true,
                                type: 'Property',
                                value: {
                                  name: 'a',
                                  type: 'Identifier'
                                },
                              },
                              {
                                argument: {
                                  name: 'b',
                                  type: 'Identifier',
                                },
                                type: 'RestElement',
                              },
                              {
                               computed: false,
                                key: {
                                  name: 'c',
                                  type: 'Identifier',
                                },
                                kind: 'init',
                                method: false,
                                shorthand: true,
                                type: 'Property',
                                value: {
                                  name: 'c',
                                  type: 'Identifier',
                                }
                              }
                            ],
                            type: 'ObjectPattern'
                         },
                          init: {
                            name: 'x',
                            type: 'Identifier'
                          },
                          type: 'VariableDeclarator'
                        },
                      ],
                      kind: 'let',
                      type: 'VariableDeclaration'
                    },
                  ],
                  errors: [
                    {
                      description: 'Rest element must be last element',
                      index: 14,
                      column: 13,
                      lineNumber: 1,
                    },
                 ],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

        pass(`function test() { (throw 1, 2); }`, {
            source: `function test() { (throw 1, 2); }`,
            tolerant: true,
            next: true,
            expected: {
                  body: [
                    {
                      async: false,
                      body: {
                        body: [
                          {
                            expression: {
                             expressions: [
                                {
                                  expressions: {
                                    type: 'Literal',
                                    value: 1
                                  },
                                  type: 'ThrowExpression'
                                },
                                {
                                  type: 'Literal',
                                 value: 2,
                                },
                              ],
                              type: 'SequenceExpression'
                           },
                            type: 'ExpressionStatement'
                          }
                        ],
                        type: 'BlockStatement'
                      },
                     expression: false,
                      generator: false,
                      id: {
                        name: 'test',
                        type: 'Identifier'
                      },
                      params: [],
                      type: 'FunctionDeclaration'
                   }
                  ],
                  errors: [],
                  sourceType: 'script',
                  type: 'Program'
                }
        });

        pass(`class C { x = typeof arguments; }`, {
            source: `class C { x = typeof arguments; }`,
            tolerant: true,
            next: true,
            expected: {
                  body: [
                    {
                      body: {
                        body: [
                          {
                            key: {
                              name: 'x',
                              type: 'Identifier',
                            },
                            type: 'ClassProperty',
                            value: {
                             argument: {
                                name: 'arguments',
                                type: 'Identifier',
                              },
                              operator: 'typeof',
                              prefix: true,
                              type: 'UnaryExpression',
                            }
                         },
                        ],
                        type: 'ClassBody',
                      },
                      id: {
                        name: 'C',
                        type: 'Identifier',
                      },
                      superClass: null,
                      type: 'ClassDeclaration'
                   },
                  ],
                  errors: [
                    {
                      description: 'Unexpected reserved word',
                      index: 31,
                      column: 30,
                      lineNumber: 1,
                    },
                    {
                      description: 'Unexpected reserved word',
                      index: 31,
                      column: 30,
                      lineNumber: 1,
                   },
                  ],
                  sourceType: 'script',
                  type: 'Program',
                }
        });
    });

    pass(`/*`, {
        source: `/*`,
        tolerant: true,
        expected: {
            body: [],
            errors: [{
                description: 'Unterminated comment',
                index: 2,
                column: 0,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`var foo = 1; /* `, {
        source: `var foo = 1; /*`,
        tolerant: true,
        expected: {
            body: [{
                declarations: [{
                    id: {
                        name: 'foo',
                        type: 'Identifier'
                    },
                    init: {
                        type: 'Literal',
                        value: 1,
                    },
                    type: 'VariableDeclarator'
                }],
                kind: 'var',
                type: 'VariableDeclaration'
            }],
            errors: [{
                description: 'Unterminated comment',
                index: 15,
                column: 13,
                lineNumber: 1,
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`/* /* if(foo) {}`, {
        source: `/* /* if(foo) {}`,
        tolerant: true,
        expected: {
            body: [],
            errors: [{
                description: 'Unterminated comment',
                index: 16,
                column: 0,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`({ set s() { } })`, {
        source: `({ set s() { } })`,
        tolerant: true,
        expected: {
              body: [
                {
                  expression: {
                    properties: [
                      {
                        computed: false,
                        key: {
                          name: 's',
                          type: 'Identifier'
                        },
                        kind: 'set',
                        method: false,
                        shorthand: false,
                        type: 'Property',
                        value: {
                          async: false,
                          body: {
                            body: [],
                            type: 'BlockStatement'
                          },
                         expression: false,
                          generator: false,
                          id: null,
                          params: [],
                          type: 'FunctionExpression'
                        }
                      }
                    ],
                    type: 'ObjectExpression'
                  },
                 type: 'ExpressionStatement'
                }
              ],
              errors: [
                {
                  description: 'Setter must have exactly one formal parameter',
                  index: 10,
                  column: 9,
                  lineNumber: 1,
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`if(window.shouldStopExecuting) { break; }`, {
        source: `if(window.shouldStopExecuting) { break; }`,
        tolerant: true,
        expected: {
              body: [
                {
                  alternate: null,
                 consequent: {
                    body: [
                      {
                        label: null,
                        type: 'BreakStatement'
                     },
                    ],
                    type: 'BlockStatement'
                  },
                  test: {
                    computed: false,
                    object: {
                      name: 'window',
                      type: 'Identifier',
                    },
                    property: {
                      name: 'shouldStopExecuting',
                      type: 'Identifier',
                    },
                    type: 'MemberExpression'
                  },
                 type: 'IfStatement'
                }
              ],
              errors: [
                {
                  description: 'break  statement must be nested within an iteration statement',
                  index: 38,
                  column: 33,
                 lineNumber: 1,
                }
              ],
             sourceType: 'script',
              type: 'Program',
            }
    });

    pass(`"\\1"; "use strict";`, {
        source: `"\\1"; "use strict";`,
        tolerant: true,
        expected: {
              body: [
                {
                  directive: '\\1',
                  expression: {
                    type: 'Literal',
                    value: '\u0001',
                  },
                  type: 'ExpressionStatement'
                },
                {
                  directive: 'use strict',
                  expression: {
                   type: 'Literal',
                    value: 'use strict',
                  },
                  type: 'ExpressionStatement'
               }
              ],
              errors: [],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`f({} b c);`, {
        source: `f({} b c);`,
        tolerant: true,
        expected: {
            body: [{
                expression: {
                    arguments: [{
                            properties: [],
                            type: 'ObjectExpression'
                        },
                        {
                            name: 'c',
                            type: 'Identifier'
                        }
                    ],
                    callee: {
                        name: 'f',
                        type: 'Identifier'
                    },
                    type: 'CallExpression'
                },
                type: 'ExpressionStatement'
            }],
            errors: [{
                description: 'Unexpected token \'identifier\'',
                index: 6,
                column: 5,
                lineNumber: 1,
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`f(a b c);`, {
        source: `f(a b c);`,
        tolerant: true,
        expected: {
            body: [{
                expression: {
                    arguments: [{
                            name: 'a',
                            type: 'Identifier'
                        },
                        {
                            name: 'c',
                            type: 'Identifier'
                        }
                    ],
                    callee: {
                        name: 'f',
                        type: 'Identifier'
                    },
                    type: 'CallExpression'
                },
                type: 'ExpressionStatement'
            }],
            errors: [{
                description: 'Unexpected token \'identifier\'',
                index: 5,
                column: 4,
                lineNumber: 1,
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`f({} b c);`, {
        source: `f({} b c);`,
        tolerant: true,
        expected: {
            body: [{
                expression: {
                    arguments: [{
                            properties: [],
                            type: 'ObjectExpression'
                        },
                        {
                            name: 'c',
                            type: 'Identifier'
                        }
                    ],
                    callee: {
                        name: 'f',
                        type: 'Identifier'
                    },
                    type: 'CallExpression'
                },
                type: 'ExpressionStatement'
            }],
            errors: [{
                description: 'Unexpected token \'identifier\'',
                index: 6,
                column: 5,
                lineNumber: 1
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`var o = {one: function() {} two:2};`, {
        source: `var o = {one: function() {} two:2};`,
        tolerant: true,
        expected: {
              body: [
                {
                  declarations: [
                   {
                      id: {
                        name: 'o',
                        type: 'Identifier'
                      },
                      init: {
                        properties: [
                          {
                            computed: false,
                            key: {
                              name: 'one',
                              type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: false,
                            type: 'Property',
                            value: {
                              async: false,
                              body: {
                                body: [],
                                type: 'BlockStatement'
                              },
                              expression: false,
                              generator: false,
                              id: null,
                              params: [],
                              type: 'FunctionExpression'
                            }
                          },
                          {
                            computed: false,
                            key: undefined,
                            kind: 'init',
                            method: false,
                            shorthand: false,
                            type: 'Property',
                            value: {
                              type: 'Literal',
                              value: 2,
                            }
                          }
                        ],
                        type: 'ObjectExpression'
                      },
                      type: 'VariableDeclarator'
                    }
                 ],
                  kind: 'var',
                  type: 'VariableDeclaration'
                }
              ],
              errors: [
                {
                  description: 'Unexpected token \'identifier\'',
                  index: 31,
                  column: 28,
                  lineNumber: 1,
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`var o = {one: function() {} two:2 three: 3};`, {
        source: `var o = {one: function() {} two:2 three: 3};`,
        tolerant: true,
        expected: {
            body: [{
                declarations: [{
                    id: {
                        name: 'o',
                        type: 'Identifier'
                    },
                    init: {
                        properties: [{
                                computed: false,
                                key: {
                                    name: 'one',
                                    type: 'Identifier'
                                },
                                kind: 'init',
                                method: false,
                                shorthand: false,
                                type: 'Property',
                                value: {
                                    async: false,
                                    body: {
                                        body: [],
                                        type: 'BlockStatement'
                                    },
                                    expression: false,
                                    generator: false,
                                    id: null,
                                    params: [],
                                    type: 'FunctionExpression'
                                }
                            },
                            {
                                computed: false,
                                key: undefined,
                                kind: 'init',
                                method: false,
                                shorthand: false,
                                type: 'Property',
                                value: {
                                    type: 'Literal',
                                    value: 2,
                                },
                            },
                            {
                                computed: false,
                                key: undefined,
                                kind: 'init',
                                method: false,
                                shorthand: false,
                                type: 'Property',
                                value: {
                                    type: 'Literal',
                                    value: 3,
                                }
                            }
                        ],
                        type: 'ObjectExpression'
                    },
                    type: 'VariableDeclarator'
                }],
                kind: 'var',
                type: 'VariableDeclaration'
            }],
            errors: [{
                    description: 'Unexpected token \'identifier\'',
                    index: 31,
                    column: 28,
                    lineNumber: 1,
                },
                {
                    description: 'Unexpected token \'identifier\'',
                    index: 39,
                    column: 34,
                    lineNumber: 1,
                },
            ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`var o = {one: function() {} two:2, three: 3 "four":4};`, {
        source: `var o = {one: function() {} two:2, three: 3 "four":4};`,
        tolerant: true,
        expected: {
             body: [
                {
                  declarations: [
                    {
                      id: {
                       name: 'o',
                        type: 'Identifier'
                     },
                      init: {
                       properties: [
                          {
                            computed: false,
                            key: {
                              name: 'one',
                              type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: false,
                            type: 'Property',
                            value: {
                              async: false,
                              body: {
                                body: [],
                                type: 'BlockStatement'
                              },
                              expression: false,
                              generator: false,
                              id: null,
                              params: [],
                              type: 'FunctionExpression'
                            }
                          },
                          {
                            computed: false,
                            key: undefined,
                            kind: 'init',
                            method: false,
                            shorthand: false,
                            type: 'Property',
                            value: {
                              type: 'Literal',
                              value: 2,
                            }
                          },
                          {
                            computed: false,
                            key: {
                              name: 'three',
                              type: 'Identifier',
                            },
                           kind: 'init',
                            method: false,
                            shorthand: false,
                            type: 'Property',
                            value: {
                             type: 'Literal',
                              value: 3
                            }
                          },
                          {
                            computed: false,
                            key: undefined,
                            kind: 'init',
                            method: false,
                            shorthand: false,
                           type: 'Property',
                            value: {
                              type: 'Literal',
                              value: 4,
                            }
                          }
                        ],
                        type: 'ObjectExpression'
                      },
                      type: 'VariableDeclarator'
                    }
                  ],
                  kind: 'var',
                  type: 'VariableDeclaration'
                }
              ],
              errors: [
                {
                  description: 'Unexpected token \'identifier\'',
                  index: 31,
                  column: 28,
                  lineNumber: 1,
                },
                {
                 description: 'Unexpected token \',\'',
                  index: 34,
                  column: 33,
                  lineNumber: 1,
                },
                {
                  description: 'Unexpected token \'string\'',
                  index: 50,
                  column: 44,
                  lineNumber: 1,
                }
              ],
              sourceType: 'script',
             type: 'Program'
            }
    });

    pass(`var o = {one: function() {} two:2, three: {aa: "a" bb: "b"} four: 4};`, {
        source: `var o = {one: function() {} two:2, three: {aa: "a" bb: "b"} four: 4};`,
        tolerant: true,
        expected: {
              body: [
                {
                  declarations: [
                   {
                      id: {
                        name: 'o',
                        type: 'Identifier'
                      },
                      init: {
                        properties: [
                          {
                            computed: false,
                            key: {
                              name: 'one',
                              type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: false,
                            type: 'Property',
                            value: {
                              async: false,
                              body: {
                                body: [],
                                type: 'BlockStatement'
                              },
                              expression: false,
                              generator: false,
                              id: null,
                              params: [],
                              type: 'FunctionExpression'
                            }
                          },
                          {
                            computed: false,
                            key: undefined,
                            kind: 'init',
                            method: false,
                            shorthand: false,
                           type: 'Property',
                            value: {
                              type: 'Literal',
                              value: 2
                            }
                          },
                          {
                            computed: false,
                            key: {
                              name: 'three',
                              type: 'Identifier',
                            },
                            kind: 'init',
                            method: false,
                            shorthand: false,
                            type: 'Property',
                            value: {
                              properties: [
                                {
                                  computed: false,
                                  key: {
                                    name: 'aa',
                                    type: 'Identifier'
                                  },
                                  kind: 'init',
                                  method: false,
                                  shorthand: false,
                                  type: 'Property',
                                  value: {
                                    type: 'Literal',
                                    value: 'a',
                                  }
                                },
                                {
                                  computed: false,
                                  key: undefined,
                                  kind: 'init',
                                  method: false,
                                  shorthand: false,
                                 type: 'Property',
                                  value: {
                                    type: 'Literal',
                                    value: 'b'
                                  }
                                }
                              ],
                              type: 'ObjectExpression'
                            }
                          },
                          {
                            computed: false,
                            key: undefined,
                            kind: 'init',
                            method: false,
                            shorthand: false,
                            type: 'Property',
                            value: {
                              type: 'Literal',
                              value: 4,
                            }
                          }
                        ],
                        type: 'ObjectExpression',
                      },
                      type: 'VariableDeclarator'
                    }
                  ],
                  kind: 'var',
                  type: 'VariableDeclaration'
                }
              ],
              errors: [
                {
                  description: 'Unexpected token \'identifier\'',
                  index: 31,
                  column: 28,
                  lineNumber: 1,
                },
                {
                  description: 'Unexpected token \',\'',
                  index: 34,
                  column: 33,
                  lineNumber: 1,
                },
                {
                  description: 'Unexpected token \'identifier\'',
                  index: 53,
                  column: 51,
                  lineNumber: 1,
                },
                {
                  description: 'Unexpected token \'identifier\'',
                  index: 64,
                  column: 60,
                  lineNumber: 1,
                }
              ],
              sourceType: 'script',
              type: 'Program',
            }
    });

    pass(`x = { y: z; }`, {
        source: `x = { y: z; }`,
        tolerant: true,
        expected: {
            body: [{
                expression: {
                    left: {
                        name: 'x',
                        type: 'Identifier'
                    },
                    operator: '=',
                    right: {
                        properties: [{
                            computed: false,
                            key: {
                                name: 'y',
                                type: 'Identifier'
                            },
                            kind: 'init',
                            method: false,
                            shorthand: false,
                            type: 'Property',
                            value: {
                                name: 'z',
                                type: 'Identifier'
                            }
                        }],
                        type: 'ObjectExpression'
                    },
                    type: 'AssignmentExpression'
                },
                type: 'ExpressionStatement'
            }],
            errors: [{
                description: 'Unexpected token \';\'',
                index: 11,
                column: 10,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`return`, {
        source: `return`,
        tolerant: true,
        expected: {
            body: [{
                argument: null,
                type: 'ReturnStatement'
            }],
            errors: [{
                description: 'Illegal return statement',
                index: 6,
                column: 0,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`(function () { 'use strict'; with (i); }())`, {
        source: `(function () { 'use strict'; with (i); }())`,
        tolerant: true,
        expected: {
            body: [{
                expression: {
                    arguments: [],
                    callee: {
                        async: false,
                        body: {
                            body: [{
                                    directive: 'use strict',
                                    expression: {
                                        type: 'Literal',
                                        value: 'use strict',
                                    },
                                    type: 'ExpressionStatement'
                                },
                                {
                                    body: {
                                        type: 'EmptyStatement'
                                    },
                                    object: {
                                        name: 'i',
                                        type: 'Identifier'
                                    },
                                    type: 'WithStatement'
                                }
                            ],
                            type: 'BlockStatement'
                        },
                        expression: false,
                        generator: false,
                        id: null,
                        params: [],
                        type: 'FunctionExpression'
                    },
                    type: 'CallExpression'
                },
                type: 'ExpressionStatement'
            }],
            errors: [{
                description: 'Strict mode code may not include a with statement',
                index: 33,
                column: 29,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass(`(function () { 'use strict'; 021 }())`, {
        source: `(function () { 'use strict'; 021 }())`,
        tolerant: true,
        expected: {
              body: [
                {
                  expression: {
                    arguments: [],
                    callee: {
                      async: false,
                      body: {
                        body: [
                          {
                            directive: 'use strict',
                            expression: {
                              type: 'Literal',
                              value: 'use strict',
                            },
                            type: 'ExpressionStatement'
                          },
                          {
                            expression: {
                              type: 'Literal',
                              value: 17
                            },
                            type: 'ExpressionStatement'
                          }
                        ],
                        type: 'BlockStatement'
                     },
                      expression: false,
                      generator: false,
                      id: null,
                      params: [],
                      type: 'FunctionExpression'
                    },
                    type: 'CallExpression'
                 },
                  type: 'ExpressionStatement'
                }
              ],
              errors: [
               {
                  description: 'Octal literals are not allowed in strict mode',
                  index: 32,
                  column: 29,
                  lineNumber: 1,
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`"use strict"; delete x`, {
        source: `"use strict"; delete x`,
        tolerant: true,
        expected: {
            body: [{
                    directive: 'use strict',
                    expression: {
                        type: 'Literal',
                        value: 'use strict'
                    },
                    type: 'ExpressionStatement'
                },
                {
                    expression: {
                        argument: {
                            name: 'x',
                            type: 'Identifier'
                        },
                        operator: 'delete',
                        prefix: true,
                        type: 'UnaryExpression'
                    },
                    type: 'ExpressionStatement'
                }
            ],
            errors: [{
                description: 'Identifier expressions must not be deleted in strict mode',
                index: 20,
                column: 14,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`"use strict"; try {} catch (eval) {}`, {
        source: `"use strict"; try {} catch (eval) {}`,
        tolerant: true,
        expected: {
            body: [{
                    directive: 'use strict',
                    expression: {
                        type: 'Literal',
                        value: 'use strict'
                    },
                    type: 'ExpressionStatement'
                },
                {
                    block: {
                        body: [],
                        type: 'BlockStatement'
                    },
                    finalizer: null,
                    handler: {
                        body: {
                            body: [],
                            type: 'BlockStatement'
                        },
                        param: {
                            name: 'eval',
                            type: 'Identifier'
                        },
                        type: 'CatchClause'
                    },
                    type: 'TryStatement',
                }
            ],
            errors: [{
                description: 'Eval or arguments can\'t be assigned to in strict mode code',
                index: 32,
                column: 28,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`"use strict"; var eval;`, {
        source: `"use strict"; var eval;`,
        tolerant: true,
        expected: {
            body: [{
                    directive: 'use strict',
                    expression: {
                        type: 'Literal',
                        value: 'use strict',
                    },
                    type: 'ExpressionStatement'
                },
                {
                    declarations: [{
                        id: {
                            name: 'eval',
                            type: 'Identifier',
                        },
                        init: null,
                        type: 'VariableDeclarator'
                    }],
                    kind: 'var',
                    type: 'VariableDeclaration'
                }
            ],
            errors: [{
                description: 'Eval or arguments can\'t be assigned to in strict mode code',
                index: 22,
                column: 18,
                lineNumber: 1,
            }, ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`"use strict"; eval = 0;`, {
        source: `"use strict"; eval = 0;`,
        tolerant: true,
        expected: {
            body: [{
                    directive: 'use strict',
                    expression: {
                        type: 'Literal',
                        value: 'use strict',
                    },
                    type: 'ExpressionStatement'
                },
                {
                    expression: {
                        left: {
                            name: 'eval',
                            type: 'Identifier'
                        },
                        operator: '=',
                        right: {
                            type: 'Literal',
                            value: 0
                        },
                        type: 'AssignmentExpression'
                    },
                    type: 'ExpressionStatement'
                }
            ],
            errors: [{
                description: 'Eval or arguments can\'t be assigned to in strict mode code',
                index: 20,
                column: 19,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`"use strict"; eval++;`, {
        source: `"use strict"; eval++;`,
        tolerant: true,
        expected: {
            body: [{
                    directive: 'use strict',
                    expression: {
                        type: 'Literal',
                        value: 'use strict'
                    },
                    type: 'ExpressionStatement'
                },
                {
                    expression: {
                        argument: {
                            name: 'eval',
                            type: 'Identifier'
                        },
                        operator: '++',
                        prefix: false,
                        type: 'UpdateExpression'
                    },
                    type: 'ExpressionStatement'
                }
            ],
            errors: [{
                description: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
                index: 18,
                column: 14,
                lineNumber: 1
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`"use strict"; arguments = 0;`, {
        source: `"use strict"; arguments = 0;`,
        tolerant: true,
        expected: {
            body: [{
                    directive: 'use strict',
                    expression: {
                        type: 'Literal',
                        value: 'use strict'
                    },
                    type: 'ExpressionStatement'
                },
                {
                    expression: {
                        left: {
                            name: 'arguments',
                            type: 'Identifier'
                        },
                        operator: '=',
                        right: {
                            type: 'Literal',
                            value: 0
                        },
                        type: 'AssignmentExpression'
                    },
                    type: 'ExpressionStatement'
                }
            ],
            errors: [{
                description: 'Eval or arguments can\'t be assigned to in strict mode code',
                index: 25,
                column: 24,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`"use strict"; function arguments() {};`, {
        source: `"use strict"; function arguments() {};`,
        tolerant: true,
        expected: {
            body: [{
                    directive: 'use strict',
                    expression: {
                        type: 'Literal',
                        value: 'use strict'
                    },
                    type: 'ExpressionStatement'
                },
                {
                    async: false,
                    body: {
                        body: [],
                        type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: 'arguments',
                        type: 'Identifier',
                    },
                    params: [],
                    type: 'FunctionDeclaration'
                },
                {
                    type: 'EmptyStatement'
                }
            ],
            errors: [{
                    description: 'Eval or arguments can\'t be assigned to in strict mode code',
                    index: 32,
                    column: 23,
                    lineNumber: 1,
                },
                {
                    description: 'Eval or arguments can\'t be assigned to in strict mode code',
                    index: 32,
                    column: 23,
                    lineNumber: 1,
                }
            ],
            sourceType: 'script',
            type: 'Program',
        }
    });

    pass(`"use strict"; (function eval() {});`, {
        source: `"use strict"; (function eval() {});`,
        tolerant: true,
        expected: {
              body: [
                {
                  directive: 'use strict',
                  expression: {
                    type: 'Literal',
                    value: 'use strict',
                  },
                  type: 'ExpressionStatement'
                },
                {
                  expression: {
                    async: false,
                    body: {
                      body: [],
                      type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                   id: {
                      name: 'eval',
                      type: 'Identifier'
                    },
                    params: [],
                    type: 'FunctionExpression'
                  },
                 type: 'ExpressionStatement'
                }
              ],
              errors: [
                {
                  description: 'Eval or arguments can\'t be assigned to in strict mode code',
                  index: 28,
                  column: 24,
                  lineNumber: 1,
                }
              ],
             sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`"use strict"; (function interface() {});`, {
        source: `"use strict"; (function interface() {});`,
        tolerant: true,
        expected: {
              body: [
                {
                  directive: 'use strict',
                  expression: {
                    type: 'Literal',
                    value: 'use strict',
                  },
                  type: 'ExpressionStatement'
                },
                {
                  expression: {
                    async: false,
                    body: {
                      body: [],
                      type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                   id: {
                      name: 'interface',
                      type: 'Identifier',
                    },
                    params: [],
                    type: 'FunctionExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
              errors: [
                {
                  description: 'Unexpected token \'interface\'',
                  index: 33,
                  column: 24,
                  lineNumber: 1,
                }
             ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`"use strict"; function f(eval) {};`, {
        source: `"use strict"; function f(eval) {};`,
        tolerant: true,
        expected: {
            body: [{
                    directive: 'use strict',
                    expression: {
                        type: 'Literal',
                        value: 'use strict',
                    },
                    type: 'ExpressionStatement'
                },
                {
                    async: false,
                    body: {
                        body: [],
                        type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: 'f',
                        type: 'Identifier'
                    },
                    params: [{
                        name: 'eval',
                        type: 'Identifier'
                    }],
                    type: 'FunctionDeclaration'
                },
                {
                    type: 'EmptyStatement'
                }
            ],
            errors: [
                {
                    description: 'Eval or arguments can\'t be assigned to in strict mode code',
                    index: 29,
                    column: 25,
                    lineNumber: 1,
                },
                {
                    description: 'Eval or arguments can\'t be assigned to in strict mode code',
                    index: 29,
                    column: 25,
                    lineNumber: 1,
                }
            ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`"use strict"; function f(foo,  foo) {};`, {
        source: `"use strict"; function f(foo,  foo) {};`,
        tolerant: true,
        expected: {
            body: [{
                    directive: 'use strict',
                    expression: {
                        type: 'Literal',
                        value: 'use strict'
                    },
                    type: 'ExpressionStatement'
                },
                {
                    async: false,
                    body: {
                        body: [],
                        type: 'BlockStatement'
                    },
                    expression: false,
                    generator: false,
                    id: {
                        name: 'f',
                        type: 'Identifier'
                    },
                    params: [{
                            name: 'foo',
                            type: 'Identifier'
                        },
                        {
                            name: 'foo',
                            type: 'Identifier'
                        }
                    ],
                    type: 'FunctionDeclaration'
                },
                {
                    type: 'EmptyStatement'
                }
            ],
            errors: [{
                description: '\'foo\' has already been declared ',
                index: 34,
                column: 31,
                lineNumber: 1
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`"use strict"; var x = { 014: 3}`, {
        source: `"use strict"; var x = { 014: 3}`,
        tolerant: true,
        expected: {
            body: [{
                    directive: 'use strict',
                    expression: {
                        type: 'Literal',
                        value: 'use strict'
                    },
                    type: 'ExpressionStatement'
                },
                {
                    declarations: [{
                        id: {
                            name: 'x',
                            type: 'Identifier'
                        },
                        init: {
                            properties: [{
                                computed: false,
                                key: {
                                    type: 'Literal',
                                    value: 12
                                },
                                kind: 'init',
                                method: false,
                                shorthand: false,
                                type: 'Property',
                                value: {
                                    type: 'Literal',
                                    value: 3
                                }
                            }],
                            type: 'ObjectExpression'
                        },
                        type: 'VariableDeclarator'
                    }],
                    kind: 'var',
                    type: 'VariableDeclaration'
                }
            ],
            errors: [{
                    description: 'Octal literals are not allowed in strict mode',
                    index: 27,
                    column: 24,
                    lineNumber: 1
                },
                {
                    description: 'Octal literals are not allowed in strict mode',
                    index: 30,
                    column: 29,
                    lineNumber: 1
                }
            ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`var x = 'abc\\8';`, {
        source: `var x = 'abc\\8';`,
        tolerant: true,
        expected: {
            body: [{
                declarations: [{
                    id: {
                        name: 'x',
                        type: 'Identifier'
                    },
                    init: {
                        type: 'Literal',
                        value: 'abc'
                    },
                    type: 'VariableDeclarator'
                }],
                kind: 'var',
                type: 'VariableDeclaration'
            }],
            errors: [{
                    description: 'Escapes \\8 or \\9 are not syntactically valid escapes',
                    index: 13,
                    column: 8,
                    lineNumber: 1,
                },
                {
                    description: 'Invalid hexadecimal escape sequence',
                    index: 13,
                    column: 8,
                    lineNumber: 1,
                },
                {
                    description: 'Unicode escape code point out of range',
                    index: 13,
                    column: 8,
                    lineNumber: 1,
                }
            ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`({x(eval){"use strict"}})`, {
        source: `({x(eval){"use strict"}})`,
        tolerant: true,
        expected: {
              body: [
                {
                  expression: {
                    properties: [
                      {
                        computed: false,
                        key: {
                          name: 'x',
                          type: 'Identifier'
                        },
                        kind: 'init',
                        method: true,
                        shorthand: false,
                        type: 'Property',
                        value: {
                          async: false,
                          body: {
                            body: [
                              {
                                directive: 'use strict',
                                expression: {
                                  type: 'Literal',
                                  value: 'use strict',
                                },
                                type: 'ExpressionStatement'
                              }
                            ],
                            type: 'BlockStatement'
                          },
                          expression: false,
                          generator: false,
                          id: null,
                          params: [
                            {
                              name: 'eval',
                              type: 'Identifier'
                           }
                          ],
                          type: 'FunctionExpression'
                        }
                      }
                    ],
                    type: 'ObjectExpression'
                  },
                  type: 'ExpressionStatement'
                }
              ],
             errors: [
                {
                  description: 'Unexpected eval or arguments in strict mode',
                  index: 8,
                  column: 4,
                  lineNumber: 1,
                },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`for (5 in []) {}`, {
        source: `for (5 in []) {}`,
        tolerant: true,
        expected: {
            body: [{
                body: {
                    body: [],
                    type: 'BlockStatement'
                },
                left: {
                    type: 'Literal',
                    value: 5,
                },
                right: {
                    elements: [],
                    type: 'ArrayExpression'
                },
                type: 'ForInStatement'
            }],
            errors: [{
                    description: 'Invalid left-hand side in for-loop',
                    index: 13,
                    column: 12,
                    lineNumber: 1,
                },
                {
                    description: 'Invalid destructuring assignment target',
                    index: 13,
                    column: 12,
                    lineNumber: 1,
                }
            ],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`--4`, {
        source: `--4`,
        tolerant: true,
        expected: {
            body: [{
                expression: {
                    argument: {
                        type: 'Literal',
                        value: 4
                    },
                    operator: '--',
                    prefix: true,
                    type: 'UpdateExpression'
                },
                type: 'ExpressionStatement'
            }],
            errors: [{
                description: 'Invalid left-hand side expression in prefix operation',
                index: 2,
                column: 0,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`3++`, {
        source: `3++`,
        tolerant: true,
        expected: {
            body: [{
                expression: {
                    argument: {
                        type: 'Literal',
                        value: 3
                    },
                    operator: '++',
                    prefix: false,
                    type: 'UpdateExpression'
                },
                type: 'ExpressionStatement'
            }],
            errors: [{
                description: 'Invalid left-hand side expression in postfix operation',
                index: 1,
                column: 0,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`1 = 2`, {
        source: `1 = 2`,
        tolerant: true,
        expected: {
            body: [{
                expression: {
                    left: {
                        type: 'Literal',
                        value: 1
                    },
                    operator: '=',
                    right: {
                        type: 'Literal',
                        value: 2
                    },
                    type: 'AssignmentExpression'
                },
                type: 'ExpressionStatement'
            }],
            errors: [{
                description: 'Invalid destructuring assignment target',
                index: 3,
                column: 2,
                lineNumber: 1,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`foo("bar") = baz`, {
        source: `foo("bar") = baz`,
        tolerant: true,
        expected: {
            body: [{
                expression: {
                    left: {
                        arguments: [{
                            type: 'Literal',
                            value: 'bar'
                        }],
                        callee: {
                            name: 'foo',
                            type: 'Identifier'
                        },
                        type: 'CallExpression'
                    },
                    operator: '=',
                    right: {
                        name: 'baz',
                        type: 'Identifier'
                    },
                    type: 'AssignmentExpression'
                },
                type: 'ExpressionStatement'
            }],
            errors: [{
                description: 'Invalid destructuring assignment target',
                index: 12,
                lineNumber: 1,
                column: 11,
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`"use strict"; let eval;`, {
        source: `"use strict"; let eval;`,
        tolerant: true,
        expected: {
            body: [{
                    directive: 'use strict',
                    expression: {
                        type: 'Literal',
                        value: 'use strict',
                    },
                    type: 'ExpressionStatement'
                },
                {
                    declarations: [{
                        id: {
                            name: 'eval',
                            type: 'Identifier',
                        },
                        init: null,
                        type: 'VariableDeclarator'
                    }],
                    kind: 'let',
                    type: 'VariableDeclaration'
                }
            ],
            errors: [{
                description: 'Eval or arguments can\'t be assigned to in strict mode code',
                index: 22,
                column: 18,
                lineNumber: 1
            }],
            sourceType: 'script',
            type: 'Program'
        }
    });

    pass(`with (x`, {
        source: `with (x`,
        tolerant: true,
        expected: {
              body: [
                {
                  body: {
                    type: 'EmptyStatement',
                  },
                  object: {
                    name: 'x',
                    type: 'Identifier'
                  },
                 type: 'WithStatement'
                },
              ],
              errors: [
                {
                  description: 'missing ) after with-statement',
                  index: 7,
                  column: 6,
                  lineNumber: 1,
               },
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`do {} while (true`, {
        source: `do {} while (true`,
        tolerant: true,
        expected: {
              body: [
                {
                  body: {
                    body: [],
                    type: 'BlockStatement',
                  },
                 test: {
                    type: 'Literal',
                    value: true,
                  },
                  type: 'DoWhileStatement'
                }
              ],
              errors: [
                {
                    description: 'missing ) after do-while',
                  index: 17,
                  column: 13,
                  lineNumber: 1,
                },
              ],
              sourceType: 'script',
              type: 'Program',
            }
    });

    pass(`for (var i = 0; i < j; ++i`, {
        source: `for (var i = 0; i < j; ++i`,
        tolerant: true,
        expected: {
              body: [
                {
                  body: {
                    type: 'EmptyStatement'
                  },
                  init: {
                    declarations: [
                      {
                        id: {
                          name: 'i',
                          type: 'Identifier'
                        },
                        init: {
                          type: 'Literal',
                          value: 0,
                        },
                        type: 'VariableDeclarator'
                      }
                    ],
                    kind: 'var',
                    type: 'VariableDeclaration'
                  },
                  test: {
                    left: {
                      name: 'i',
                      type: 'Identifier',
                    },
                    operator: '<',
                    right: {
                      name: 'j',
                      type: 'Identifier',
                    },
                    type: 'BinaryExpression',
                  },
                  type: 'ForStatement',
                  update: {
                    argument: {
                      name: 'i',
                      type: 'Identifier',
                    },
                    operator: '++',
                    prefix: true,
                    type: 'UpdateExpression'
                  },
               },
              ],
              errors: [
                {
                    description: 'missing ) after for-loop head',
                  index: 26,
                  column: 25,
                  lineNumber: 1,
                },
              ],
              sourceType: 'script',
              type: 'Program',
            }
    });

    pass(`if (x < 42`, {
        source: `if (x < 42`,
        tolerant: true,
        expected: {
              body: [
                {
                  alternate: null,
                  consequent: {
                    type: 'EmptyStatement'
                  },
                  test: {
                    left: {
                      name: 'x',
                      type: 'Identifier'
                    },
                    operator: '<',
                    right: {
                      type: 'Literal',
                      value: 42,
                    },
                    type: 'BinaryExpression'
                  },
                  type: 'IfStatement'
                }
              ],
             errors: [
                {
                    description: 'missing ) after if-statement',
                  index: 10,
                  column: 8,
                  lineNumber: 1,
                }
              ],
              sourceType: 'script',
              type: 'Program'
            }
    });

    pass(`for (x of y  `, {
        source: `for (x of y  `,
        tolerant: true,
        expected: {
              body: [
                {
                  await: false,
                  body: {
                    type: 'EmptyStatement'
                  },
                  left: {
                    name: 'x',
                    type: 'Identifier'
                 },
                  right: {
                   name: 'y',
                    type: 'Identifier'
                  },
                  type: 'ForOfStatement'
                }
              ],
              errors: [
                {
                  description: 'missing ) after for-loop head',
                  index: 13,
                  column: 12,
                  lineNumber: 1,
                },
             ],
              sourceType: 'script',
              type: 'Program',
            }
    });

    pass(`for (x in y  `, {
        source: `for (x in y`,
        tolerant: true,
        expected: {
              body: [
                {
                  body: {
                   type: 'EmptyStatement'
                  },
                  left: {
                    name: 'x',
                    type: 'Identifier'
                  },
                  right: {
                    name: 'y',
                   type: 'Identifier'
                  },
                  type: 'ForInStatement'
                }
              ],
              errors: [
                {
                  description: 'missing ) after for-loop head',
                  index: 11,
                  column: 10,
                 lineNumber: 1,
                },
              ],
              sourceType: 'script',
              type: 'Program',
            }
    });

    pass(`foo(a c)`, {
        source: `foo(a c)`,
        tolerant: true,
        expected: {
              body: [
               {
                  expression: {
                    arguments: [
                      {
                        name: 'a',
                        type: 'Identifier',
                      },
                    ],
                    callee: {
                      name: 'foo',
                      type: 'Identifier',
                    },
                    type: 'CallExpression',
                  },
                  type: 'ExpressionStatement'
                }
              ],
              errors: [
                {
                 description: 'Unexpected token \'identifier\'',
                  index: 7,
                  column: 6,
                 lineNumber: 1,
                }
              ],
              sourceType: 'script',
              type: 'Program',
            }
    });
});