import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Continue', () => {
  const invalids: Array<[string, Context]> = [
    ['continue', Context.Empty],
    ['while (true) continue x;', Context.Empty],
    ['function f(){ do        if (x) continue y   ; while(true);}', Context.Empty],
    ['do     continue y   ; while(true);', Context.Empty],
    ['do     if (x) continue y   ; while(true);', Context.Empty],
    ['function f(){ while (true)       if (x) continue y   }', Context.Empty],
    ['function f(){ for (;;)       if (x) continue y   }', Context.Empty],
    ['for (;;)    continue y ', Context.Empty],
    ['function f(){    if (x) continue   }', Context.Empty],
    ['function f(){    continue y   }', Context.Empty],
    ['function f(){    if (x) continue y   }', Context.Empty],
    ['switch (x) { case x: if (foo) continue; }', Context.Empty],
    ['switch (x) { case x: continue foo; }', Context.Empty],
    ['switch (x) { default: continue foo; }', Context.Empty],
    ['switch (x) { case x: if (foo) {continue foo;} }', Context.Empty],
    ['function f(){ for (;;)       if (x) continue y   }}', Context.Empty],
    ['while (true)    if (x) continue y   }', Context.Empty],
    ['function f(){ while (true)       if (x) continue y   }}', Context.Empty],
    ['do     if (x) continue y   ; while(true);', Context.Empty],
    ['function f(){ do        if (x) continue y   ; while(true);}', Context.Empty],
    ['continue foo', Context.Empty],
    ['continue; continue;', Context.Empty],
    ['continue\ncontinue;', Context.Empty],
    ['continue foo;continue;', Context.Empty],
    ['continue foo\ncontinue;', Context.Empty],
    ['do {  test262: {  continue test262; } } while (a)', Context.Empty],
    ['ce: while(true) { continue fapper; }', Context.Empty],
    ['oop1: while (true) { loop2: function a() { continue loop2; } }', Context.Empty],
    ['loop1: while (true) { loop2: function a() { continue loop1; } }', Context.Empty],
    ['loop1: while (true) { loop1: function a() { continue loop1; } }', Context.Empty],
    ['oop1: while (true) { loop2: function a() { continue loop2; } }', Context.Empty],
    ['oop1: while (true) { loop2: function a() { continue loop2; } }', Context.Empty],
    ['oop1: while (true) { loop2: function a() { continue loop2; } }', Context.Empty],
    [
      `LABEL1 : do {
      x++;
      (function(){continue LABEL1;})();
      y++;
      } while(0);`,
      Context.Empty
    ],
    [
      `try{
      LABEL1 : do {
        x++;
        throw "gonna leave it";
        y++;
      } while(0);
      $ERROR('#1: throw "gonna leave it" lead to throwing exception');
      } catch(e){
      continue LABEL2;
      LABEL2 : do {
        x++;
        y++;
      } while(0);
      };`,
      Context.Empty
    ],
    [
      `try{
      LABEL1 : do {
        x++;
        throw "gonna leave it";
        y++;
      } while(0);
      $ERROR('#1: throw "gonna leave it" lead to throwing exception');
      } catch(e){
      continue;
      LABEL2 : do {
        x++;
        y++;
      } while(0);
      };`,
      Context.Empty
    ]
  ];
  fail('Statements - Block (failure)', invalids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'foo: while (true) { if (x) continue foo; }',
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
                      type: 'ContinueStatement',
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
      'foo: while (true) if (x) continue foo;',
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
                  type: 'ContinueStatement',
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
      'foo: while (true) { continue foo; }',
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
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: 'foo'
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'do     {continue}    while(true);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ContinueStatement',
                  label: null
                }
              ]
            },
            test: {
              type: 'Literal',
              value: true
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'function f(){ while (true)       { continue }    }',
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
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ContinueStatement',
                        label: null
                      }
                    ]
                  }
                }
              ]
            },
            async: false,
            generator: false,
            expression: false,
            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      'function f(){ for (;;)       if (x) continue   }',
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
                      type: 'ContinueStatement',
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
            expression: false,
            id: {
              type: 'Identifier',
              name: 'f'
            }
          }
        ]
      }
    ],
    [
      '"use strict"; eval: while (foo) { continue eval; }',
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
            },
            directive: 'use strict'
          },
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'eval'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Identifier',
                name: 'foo'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: 'eval'
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'eval: while (foo) { continue eval; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'eval'
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Identifier',
                name: 'foo'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: 'eval'
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'for (x in y) continue',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'ContinueStatement',
              label: null
            },
            left: {
              type: 'Identifier',
              name: 'x'
            },
            right: {
              type: 'Identifier',
              name: 'y'
            }
          }
        ]
      }
    ],
    [
      'do continue; while(foo);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
              type: 'ContinueStatement',
              label: null
            },
            test: {
              type: 'Identifier',
              name: 'foo'
            }
          }
        ]
      }
    ],
    [
      'foo: for (;;) continue foo',
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
              type: 'ForStatement',
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              init: null,
              test: null,
              update: null
            }
          }
        ]
      }
    ],
    [
      'foo: while (x) continue foo',
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
                type: 'Identifier',
                name: 'x'
              },
              body: {
                type: 'ContinueStatement',
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
      'foo: do continue foo; while(foo);',
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
              type: 'DoWhileStatement',
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo'
                }
              },
              test: {
                type: 'Identifier',
                name: 'foo'
              }
            }
          }
        ]
      }
    ],
    [
      'while (true) { continue }',
      Context.Empty,
      {
        type: 'Program',
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
                  type: 'ContinueStatement',
                  label: null
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'done: while (true) { continue done }',
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
                    type: 'ContinueStatement',
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
      `a: while (1) { continue \n b; }`,
      Context.Empty,
      {
        body: [
          {
            body: {
              body: {
                body: [
                  {
                    label: null,
                    type: 'ContinueStatement'
                  },
                  {
                    expression: {
                      name: 'b',
                      type: 'Identifier'
                    },
                    type: 'ExpressionStatement'
                  }
                ],
                type: 'BlockStatement'
              },
              test: {
                type: 'Literal',
                value: 1
              },
              type: 'WhileStatement'
            },
            label: {
              name: 'a',
              type: 'Identifier'
            },
            type: 'LabeledStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `a: while (1) { continue /*\r*/ b; }`,
      Context.Empty,
      {
        body: [
          {
            body: {
              body: {
                body: [
                  {
                    label: null,
                    type: 'ContinueStatement'
                  },
                  {
                    expression: {
                      name: 'b',
                      type: 'Identifier'
                    },
                    type: 'ExpressionStatement'
                  }
                ],
                type: 'BlockStatement'
              },
              test: {
                type: 'Literal',
                value: 1
              },
              type: 'WhileStatement'
            },
            label: {
              name: 'a',
              type: 'Identifier'
            },
            type: 'LabeledStatement'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      `a: do continue a; while(1);`,
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'a'
            },
            body: {
              type: 'DoWhileStatement',
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'a'
                }
              },
              test: {
                type: 'Literal',
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - Continue (pass)', valids);
});
