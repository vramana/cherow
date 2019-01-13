import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Break', () => {
  const invalids: Array<[string, Context]> = [
    ['break', Context.Empty],
    ['{ break }', Context.Empty],
    ['if (x) break', Context.Empty],
    ['function f(){    break    }', Context.Empty],
    ['function f(){    if (x) break   }', Context.Empty],
    ['function f(){    break y   }', Context.Empty],
    ['switch (x){ case z:    break y   }', Context.Empty],
    ['switch (x){ case z:    if (x) break y   }', Context.Empty],
    ['function f(){ switch (x){ case z:       break y   }}', Context.Empty],
    ['function f(){ switch (x){ case z:       if (x) break y   }}', Context.Empty],
    ['for (;;)    if (x) break y   }', Context.Empty],
    ['function f(){ for (;;)       break y   }', Context.Empty],
    ['function f(){ while (true)       break y   }', Context.Empty],
    ['do     break y   ; while(true);', Context.Empty],
    ['do     if (x) break y   ; while(true);', Context.Empty],
    ['function f(){ do        if (x) break y   ; while(true);}', Context.Empty],
    ['x: foo; break x;', Context.Empty],
    ['loop1: function a() {}  while (true) { continue loop1; }', Context.Empty],
    ['{  break foo; var y=2; }', Context.Empty],
    ['loop1: while (true) { loop2: function a() { break loop2; } }', Context.Empty],
    [
      `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break LABEL_ANOTHER_LOOP;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);
      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);
      function OUT_FUNC(){}
  })();`,
      Context.Empty
    ],
    [
      `LABEL1 : do {
      x++;
      (function(){break LABEL1;})();
      y++;
  } while(0);`,
      Context.Empty
    ],
    [
      `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break IN_DO_FUNC;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);
      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);
      function OUT_FUNC(){}
    })();`,
      Context.Empty
    ],
    [
      `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break LABEL_IN;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);
      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);
      function OUT_FUNC(){}
    })();`,
      Context.Empty
    ],
    [
      `(function(){
      OuterLabel : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break LABEL_IN;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);
      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);
      function OUT_FUNC(){}
    })();`,
      Context.Empty
    ],
    [
      `var x=0,y=0;
    try{
      LABEL1 : do {
        x++;
        throw "gonna leave it";
        y++;
      } while(0);
      $ERROR('#1: throw "gonna leave it" lead to throwing exception');
    } catch(e){
      break;
      LABEL2 : do {
        x++;
        y++;
      } while(0);
    }`,
      Context.Empty
    ],
    ['loop1: while (true) { loop2: function a() { break loop1; } }', Context.Empty],
    ['loop; while (true) { break loop1; }', Context.Empty],
    [
      `(function(){
      LABEL_OUT : var x=0, y=0;
      LABEL_DO_LOOP : do {
          LABEL_IN : x++;
          if(x===10)
              return;
          break LABEL_IN;
          LABEL_IN_2 : y++;
          function IN_DO_FUNC(){}
      } while(0);
      LABEL_ANOTHER_LOOP : do {
          ;
      } while(0);
      function OUT_FUNC(){}
    })();`,
      Context.Empty
    ],
    [
      `var x=1;
    break;
    var y=2;`,
      Context.Empty
    ]
  ];
  fail('Statements - Block (failure)', invalids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      `switch (a) { case 10 /* StringLiteral */:
        if (lookAhead(function () { return nextToken() !== 57 /* ColonToken */; })) {
            statement.expression = parseLiteralNode();
            break;
        }
}`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'a'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 10
                },
                consequent: [
                  {
                    type: 'IfStatement',
                    test: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'lookAhead'
                      },
                      arguments: [
                        {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'ReturnStatement',
                                argument: {
                                  type: 'BinaryExpression',
                                  left: {
                                    type: 'CallExpression',
                                    callee: {
                                      type: 'Identifier',
                                      name: 'nextToken'
                                    },
                                    arguments: []
                                  },
                                  right: {
                                    type: 'Literal',
                                    value: 57
                                  },
                                  operator: '!=='
                                }
                              }
                            ]
                          },
                          async: false,
                          generator: false,
                          id: null
                        }
                      ]
                    },
                    consequent: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Identifier',
                                name: 'statement'
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'expression'
                              }
                            },
                            operator: '=',
                            right: {
                              type: 'CallExpression',
                              callee: {
                                type: 'Identifier',
                                name: 'parseLiteralNode'
                              },
                              arguments: []
                            }
                          }
                        },
                        {
                          type: 'BreakStatement',
                          label: null
                        }
                      ]
                    },
                    alternate: null
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    [
      'switch (a) { case 123: { if (a) {} break } }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'a'
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 123
                },
                consequent: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'IfStatement',
                        test: {
                          type: 'Identifier',
                          name: 'a'
                        },
                        consequent: {
                          type: 'BlockStatement',
                          body: []
                        },
                        alternate: null
                      },
                      {
                        type: 'BreakStatement',
                        label: null
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],

    [
      'ding: foo: bar: while (true) break foo;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'ding'
            },
            body: {
              type: 'LabeledStatement',
              label: {
                type: 'Identifier',
                name: 'foo'
              },
              body: {
                type: 'LabeledStatement',
                label: {
                  type: 'Identifier',
                  name: 'bar'
                },
                body: {
                  type: 'WhileStatement',
                  test: {
                    type: 'Literal',
                    value: true
                  },
                  body: {
                    type: 'BreakStatement',
                    label: {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  }
                }
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'foo: while (true) { if (x) break foo; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'foo'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'IfStatement',
                    test: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    consequent: {
                      type: 'BreakStatement',
                      label: {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    },
                    alternate: null
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'foo: while (true) if (x) break foo;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'foo'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'IfStatement',
                test: {
                  type: 'Identifier',
                  name: 'x'
                },
                consequent: {
                  type: 'BreakStatement',
                  label: {
                    type: 'Identifier',
                    name: 'foo'
                  }
                },
                alternate: null
              }
            }
          }
        ]
      }
    ],
    [
      'foo: while(true)break foo;',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'foo'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'BreakStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            }
          }
        ]
      }
    ],
    [
      'function f(){ while (true)       if (x) break   }',
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
                  type: 'WhileStatement',
                  test: {
                    type: 'Literal',
                    value: true
                  },
                  body: {
                    type: 'IfStatement',
                    test: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    consequent: {
                      type: 'BreakStatement',
                      label: null
                    },
                    alternate: null
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
      'while (true)    { break }   ',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: true
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'BreakStatement',
                  label: null
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'function f(){ for (;;)       if (x) break   }',
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
                  type: 'ForStatement',
                  body: {
                    type: 'IfStatement',
                    test: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    consequent: {
                      type: 'BreakStatement',
                      label: null
                    },
                    alternate: null
                  },
                  init: null,
                  test: null,
                  update: null
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
      'L: let\nx',
      Context.Empty,
      {
        body: [
          {
            body: {
              expression: {
                name: 'let',
                type: 'Identifier'
              },
              type: 'ExpressionStatement'
            },
            label: {
              name: 'L',
              type: 'Identifier'
            },
            type: 'LabeledStatement'
          },
          {
            expression: {
              name: 'x',
              type: 'Identifier'
            },
            type: 'ExpressionStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'function f(){ switch (x){ case z:       break    }}',
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
                  type: 'SwitchStatement',
                  discriminant: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  cases: [
                    {
                      type: 'SwitchCase',
                      test: {
                        type: 'Identifier',
                        name: 'z'
                      },
                      consequent: [
                        {
                          type: 'BreakStatement',
                          label: null
                        }
                      ]
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
        ]
      }
    ],
    [
      'done: while (true) { break done; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'done'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BreakStatement',
                    label: {
                      type: 'Identifier',
                      name: 'done'
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
      `__proto__: while (true) { break __proto__; }`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: '__proto__'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BreakStatement',
                    label: {
                      type: 'Identifier',
                      name: '__proto__'
                    }
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - Break (pass)', valids);
});
