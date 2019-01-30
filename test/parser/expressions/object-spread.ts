import { Context } from '../../../src/common';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';
import { pass, fail } from '../../test-utils';

describe('Expressions - Object Spread', () => {
  for (const arg of [
    '({get x() {}}) => {}',
    'let {...x, ...y} = {}',
    '({...x,}) => z"',
    'function ({...x,}) { z }',
    //    'let {...{x, y}} = {}',
    //    'let {...{...{x, y}}} = {}',
    //    '0, {...rest, b} = {}',
    '(([a, ...b = 0]) => {})',
    '(({a, ...b = 0}) => {})',
    //    'let {...obj1,} = foo',
    'let {...obj1,a} = foo',
    'let {...obj1,...obj2} = foo',
    'let {...(obj)} = foo',
    'let {...(a,b)} = foo',
    //    'let {...{a,b}} = foo',
    //  'let {...[a,b]} = foo',
    //    '({...obj1,a} = foo)',
    //    '({...obj1,...obj2} = foo)',
    //'({...(obj)} = foo)',
    '({...(a,b)} = foo)',
    '({...{a,b}} = foo)',
    '({...[a,b]} = foo',
    '({...(obj)}) => {}',

    '({...(a,b)}) => {}',
    '({...{a,b}}) => {}',
    '({...[a,b]}) => {}'
    //'({...obj}) => {}'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }

  const validSyntax = [
    '{ ...y }',
    '{...obj}',
    '{...obj1,}',
    '{...obj1,...obj2}',
    '{a,...obj1,b:1,...obj2,c:2}',
    '{...(obj)}',
    '{...a,b,c}',
    '{...(a,b),c}',
    '{ a: 1, ...y }',
    '{ b: 1, ...y }',
    '{ y, ...y}',
    '{ ...z = y}',
    '{ ...y, y }',
    '{ ...y, ...y}',
    '{ a: 1, ...y, b: 1}',
    '{ ...y, b: 1}',
    '{ ...1}',
    '{ ...null}',
    '{ ...undefined}',
    '{ ...1 in {}}',
    '{ ...[]}',
    '{ ...async function() { }}',
    '{ ...new Foo()}'
  ];
  for (const arg of validSyntax) {
    it(`x = ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`x = ${arg};`, undefined, Context.Empty);
      });
    });

    it(`x = ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`x = ${arg};`, undefined, Context.OptionsNext | Context.Module);
      });
    });

    it(`"use strict"; x = ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`x = ${arg};`, undefined, Context.Empty);
      });
    });
  }

  const valids: Array<[string, Context, any]> = [
    [
      '({a,...obj} = foo)',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 18,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 18,
            expression: {
              type: 'AssignmentExpression',
              start: 1,
              end: 17,
              operator: '=',
              left: {
                type: 'ObjectPattern',
                start: 1,
                end: 11,
                properties: [
                  {
                    type: 'Property',
                    start: 2,
                    end: 3,
                    method: false,
                    shorthand: true,
                    computed: false,
                    key: {
                      type: 'Identifier',
                      start: 2,
                      end: 3,
                      name: 'a'
                    },
                    kind: 'init',
                    value: {
                      type: 'Identifier',
                      start: 2,
                      end: 3,
                      name: 'a'
                    }
                  },
                  {
                    type: 'RestElement',
                    start: 4,
                    end: 10,
                    argument: {
                      type: 'Identifier',
                      start: 7,
                      end: 10,
                      name: 'obj'
                    }
                  }
                ]
              },
              right: {
                type: 'Identifier',
                start: 14,
                end: 17,
                name: 'foo'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '({a:b,...obj} = foo)',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 20,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 20,
            expression: {
              type: 'AssignmentExpression',
              start: 1,
              end: 19,
              operator: '=',
              left: {
                type: 'ObjectPattern',
                start: 1,
                end: 13,
                properties: [
                  {
                    type: 'Property',
                    start: 2,
                    end: 5,
                    method: false,
                    shorthand: false,
                    computed: false,
                    key: {
                      type: 'Identifier',
                      start: 2,
                      end: 3,
                      name: 'a'
                    },
                    value: {
                      type: 'Identifier',
                      start: 4,
                      end: 5,
                      name: 'b'
                    },
                    kind: 'init'
                  },
                  {
                    type: 'RestElement',
                    start: 6,
                    end: 12,
                    argument: {
                      type: 'Identifier',
                      start: 9,
                      end: 12,
                      name: 'obj'
                    }
                  }
                ]
              },
              right: {
                type: 'Identifier',
                start: 16,
                end: 19,
                name: 'foo'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'z = {x, ...y}',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 13,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 13,
            expression: {
              type: 'AssignmentExpression',
              start: 0,
              end: 13,
              operator: '=',
              left: {
                type: 'Identifier',
                start: 0,
                end: 1,
                name: 'z'
              },
              right: {
                type: 'ObjectExpression',
                start: 4,
                end: 13,
                properties: [
                  {
                    type: 'Property',
                    start: 5,
                    end: 6,
                    method: false,
                    shorthand: true,
                    computed: false,
                    key: {
                      type: 'Identifier',
                      start: 5,
                      end: 6,
                      name: 'x'
                    },
                    kind: 'init',
                    value: {
                      type: 'Identifier',
                      start: 5,
                      end: 6,
                      name: 'x'
                    }
                  },
                  {
                    type: 'SpreadElement',
                    start: 8,
                    end: 12,
                    argument: {
                      type: 'Identifier',
                      start: 11,
                      end: 12,
                      name: 'y'
                    }
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var someObject = { someKey: { ...mapGetters([ "some_val_1", "some_val_2" ]) } }',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 79,
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 79,
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 79,
                id: {
                  type: 'Identifier',
                  start: 4,
                  end: 14,
                  name: 'someObject'
                },
                init: {
                  type: 'ObjectExpression',
                  start: 17,
                  end: 79,
                  properties: [
                    {
                      type: 'Property',
                      start: 19,
                      end: 77,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 19,
                        end: 26,
                        name: 'someKey'
                      },
                      value: {
                        type: 'ObjectExpression',
                        start: 28,
                        end: 77,
                        properties: [
                          {
                            type: 'SpreadElement',
                            start: 30,
                            end: 75,
                            argument: {
                              type: 'CallExpression',
                              start: 33,
                              end: 75,
                              callee: {
                                type: 'Identifier',
                                start: 33,
                                end: 43,
                                name: 'mapGetters'
                              },
                              arguments: [
                                {
                                  type: 'ArrayExpression',
                                  start: 44,
                                  end: 74,
                                  elements: [
                                    {
                                      type: 'Literal',
                                      start: 46,
                                      end: 58,
                                      value: 'some_val_1'
                                    },
                                    {
                                      type: 'Literal',
                                      start: 60,
                                      end: 72,
                                      value: 'some_val_2'
                                    }
                                  ]
                                }
                              ]
                            }
                          }
                        ]
                      },
                      kind: 'init'
                    }
                  ]
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
      'let {x, ...y} = v',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 17,
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 17,
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 17,
                id: {
                  type: 'ObjectPattern',
                  start: 4,
                  end: 13,
                  properties: [
                    {
                      type: 'Property',
                      start: 5,
                      end: 6,
                      method: false,
                      shorthand: true,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 5,
                        end: 6,
                        name: 'x'
                      },
                      kind: 'init',
                      value: {
                        type: 'Identifier',
                        start: 5,
                        end: 6,
                        name: 'x'
                      }
                    },
                    {
                      type: 'RestElement',
                      start: 8,
                      end: 12,
                      argument: {
                        type: 'Identifier',
                        start: 11,
                        end: 12,
                        name: 'y'
                      }
                    }
                  ]
                },
                init: {
                  type: 'Identifier',
                  start: 16,
                  end: 17,
                  name: 'v'
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
      '(function({x, ...y}) {})',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 24,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 24,
            expression: {
              type: 'FunctionExpression',
              start: 1,
              end: 23,
              id: null,
              generator: false,
              async: false,
              params: [
                {
                  type: 'ObjectPattern',
                  start: 10,
                  end: 19,
                  properties: [
                    {
                      type: 'Property',
                      start: 11,
                      end: 12,
                      method: false,
                      shorthand: true,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 11,
                        end: 12,
                        name: 'x'
                      },
                      kind: 'init',
                      value: {
                        type: 'Identifier',
                        start: 11,
                        end: 12,
                        name: 'x'
                      }
                    },
                    {
                      type: 'RestElement',
                      start: 14,
                      end: 18,
                      argument: {
                        type: 'Identifier',
                        start: 17,
                        end: 18,
                        name: 'y'
                      }
                    }
                  ]
                }
              ],
              body: {
                type: 'BlockStatement',
                start: 21,
                end: 23,
                body: []
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'const fn = ({text = "default", ...props}) => text + props.children',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 66,
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 66,
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 6,
                end: 66,
                id: {
                  type: 'Identifier',
                  start: 6,
                  end: 8,
                  name: 'fn'
                },
                init: {
                  type: 'ArrowFunctionExpression',
                  start: 11,
                  end: 66,
                  id: null,
                  expression: true,
                  async: false,
                  params: [
                    {
                      type: 'ObjectPattern',
                      start: 12,
                      end: 40,
                      properties: [
                        {
                          type: 'Property',
                          start: 13,
                          end: 29,
                          method: false,
                          shorthand: true,
                          computed: false,
                          key: {
                            type: 'Identifier',
                            start: 13,
                            end: 17,
                            name: 'text'
                          },
                          kind: 'init',
                          value: {
                            type: 'AssignmentPattern',
                            start: 13,
                            end: 29,
                            left: {
                              type: 'Identifier',
                              start: 13,
                              end: 17,
                              name: 'text'
                            },
                            right: {
                              type: 'Literal',
                              start: 20,
                              end: 29,
                              value: 'default'
                            }
                          }
                        },
                        {
                          type: 'RestElement',
                          start: 31,
                          end: 39,
                          argument: {
                            type: 'Identifier',
                            start: 34,
                            end: 39,
                            name: 'props'
                          }
                        }
                      ]
                    }
                  ],
                  body: {
                    type: 'BinaryExpression',
                    start: 45,
                    end: 66,
                    left: {
                      type: 'Identifier',
                      start: 45,
                      end: 49,
                      name: 'text'
                    },
                    operator: '+',
                    right: {
                      type: 'MemberExpression',
                      start: 58,
                      end: 66,
                      object: {
                        type: 'Identifier',
                        start: 52,
                        end: 57,
                        name: 'props'
                      },
                      property: {
                        type: 'Identifier',
                        start: 58,
                        end: 66,
                        name: 'children'
                      },
                      computed: false
                    }
                  }
                }
              }
            ],
            kind: 'const'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '({x, ...y, a, ...b, c})',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 23,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 23,
            expression: {
              type: 'ObjectExpression',
              start: 1,
              end: 22,
              properties: [
                {
                  type: 'Property',
                  start: 2,
                  end: 3,
                  method: false,
                  shorthand: true,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 2,
                    end: 3,
                    name: 'x'
                  },
                  kind: 'init',
                  value: {
                    type: 'Identifier',
                    start: 2,
                    end: 3,
                    name: 'x'
                  }
                },
                {
                  type: 'SpreadElement',
                  start: 5,
                  end: 9,
                  argument: {
                    type: 'Identifier',
                    start: 8,
                    end: 9,
                    name: 'y'
                  }
                },
                {
                  type: 'Property',
                  start: 11,
                  end: 12,
                  method: false,
                  shorthand: true,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 11,
                    end: 12,
                    name: 'a'
                  },
                  kind: 'init',
                  value: {
                    type: 'Identifier',
                    start: 11,
                    end: 12,
                    name: 'a'
                  }
                },
                {
                  type: 'SpreadElement',
                  start: 14,
                  end: 18,
                  argument: {
                    type: 'Identifier',
                    start: 17,
                    end: 18,
                    name: 'b'
                  }
                },
                {
                  type: 'Property',
                  start: 20,
                  end: 21,
                  method: false,
                  shorthand: true,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 20,
                    end: 21,
                    name: 'c'
                  },
                  kind: 'init',
                  value: {
                    type: 'Identifier',
                    start: 20,
                    end: 21,
                    name: 'c'
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
      '({a:b,...obj}) => {}',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 20,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 20,
            expression: {
              type: 'ArrowFunctionExpression',
              start: 0,
              end: 20,
              id: null,
              expression: false,
              async: false,
              params: [
                {
                  type: 'ObjectPattern',
                  start: 1,
                  end: 13,
                  properties: [
                    {
                      type: 'Property',
                      start: 2,
                      end: 5,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 2,
                        end: 3,
                        name: 'a'
                      },
                      value: {
                        type: 'Identifier',
                        start: 4,
                        end: 5,
                        name: 'b'
                      },
                      kind: 'init'
                    },
                    {
                      type: 'RestElement',
                      start: 6,
                      end: 12,
                      argument: {
                        type: 'Identifier',
                        start: 9,
                        end: 12,
                        name: 'obj'
                      }
                    }
                  ]
                }
              ],
              body: {
                type: 'BlockStatement',
                start: 18,
                end: 20,
                body: []
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'let z = {...x}',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 14,
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 14,
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 14,
                id: {
                  type: 'Identifier',
                  start: 4,
                  end: 5,
                  name: 'z'
                },
                init: {
                  type: 'ObjectExpression',
                  start: 8,
                  end: 14,
                  properties: [
                    {
                      type: 'SpreadElement',
                      start: 9,
                      end: 13,
                      argument: {
                        type: 'Identifier',
                        start: 12,
                        end: 13,
                        name: 'x'
                      }
                    }
                  ]
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
      '({...obj}) => {}',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 16,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 16,
            expression: {
              type: 'ArrowFunctionExpression',
              start: 0,
              end: 16,
              id: null,
              expression: false,
              async: false,
              params: [
                {
                  type: 'ObjectPattern',
                  start: 1,
                  end: 9,
                  properties: [
                    {
                      type: 'RestElement',
                      start: 2,
                      end: 8,
                      argument: {
                        type: 'Identifier',
                        start: 5,
                        end: 8,
                        name: 'obj'
                      }
                    }
                  ]
                }
              ],
              body: {
                type: 'BlockStatement',
                start: 14,
                end: 16,
                body: []
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      '({...obj} = {}) => {}',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 21,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 21,
            expression: {
              type: 'ArrowFunctionExpression',
              start: 0,
              end: 21,
              id: null,
              expression: false,
              async: false,
              params: [
                {
                  type: 'AssignmentPattern',
                  start: 1,
                  end: 14,
                  left: {
                    type: 'ObjectPattern',
                    start: 1,
                    end: 9,
                    properties: [
                      {
                        type: 'RestElement',
                        start: 2,
                        end: 8,
                        argument: {
                          type: 'Identifier',
                          start: 5,
                          end: 8,
                          name: 'obj'
                        }
                      }
                    ]
                  },
                  right: {
                    type: 'ObjectExpression',
                    start: 12,
                    end: 14,
                    properties: []
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                start: 19,
                end: 21,
                body: []
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '({a,...obj}) => {}',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 18,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 18,
            expression: {
              type: 'ArrowFunctionExpression',
              start: 0,
              end: 18,
              id: null,
              expression: false,
              async: false,
              params: [
                {
                  type: 'ObjectPattern',
                  start: 1,
                  end: 11,
                  properties: [
                    {
                      type: 'Property',
                      start: 2,
                      end: 3,
                      method: false,
                      shorthand: true,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 2,
                        end: 3,
                        name: 'a'
                      },
                      kind: 'init',
                      value: {
                        type: 'Identifier',
                        start: 2,
                        end: 3,
                        name: 'a'
                      }
                    },
                    {
                      type: 'RestElement',
                      start: 4,
                      end: 10,
                      argument: {
                        type: 'Identifier',
                        start: 7,
                        end: 10,
                        name: 'obj'
                      }
                    }
                  ]
                }
              ],
              body: {
                type: 'BlockStatement',
                start: 16,
                end: 18,
                body: []
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '({...obj} = foo)',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 16,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 16,
            expression: {
              type: 'AssignmentExpression',
              start: 1,
              end: 15,
              operator: '=',
              left: {
                type: 'ObjectPattern',
                start: 1,
                end: 9,
                properties: [
                  {
                    type: 'RestElement',
                    start: 2,
                    end: 8,
                    argument: {
                      type: 'Identifier',
                      start: 5,
                      end: 8,
                      name: 'obj'
                    }
                  }
                ]
              },
              right: {
                type: 'Identifier',
                start: 12,
                end: 15,
                name: 'foo'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Expressions - New (pass)', valids);
});
