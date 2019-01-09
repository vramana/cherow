import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - For', () => {
  const inValids: Array<[string, Context]> = [
    // Bindings

    ['for (let x;;) { var x; }', Context.OptionsDisableWebCompat],
    ['for (const x = y;;) { var x; }', Context.OptionsDisableWebCompat],
    ['for (let x in y) { var x; }', Context.OptionsDisableWebCompat],
    ['for (const x in y) { var x; }', Context.OptionsDisableWebCompat],
    ['for (let x of y) { var x; }', Context.OptionsDisableWebCompat],
    ['for (const a;;);', Context.OptionsDisableWebCompat],
    ['for (const a,b,c;;);', Context.OptionsDisableWebCompat],
    // ['for (const [x, x] in {}) {}', Context.OptionsDisableWebCompat],
    ['for (let a, b, x, d;;) { var foo; var bar; { var doo, x, ee; } }', Context.OptionsDisableWebCompat],

    // General
    ['for (var [foo] = arr, [bar] = arr2);', Context.OptionsDisableWebCompat],
    ['for (var [foo,,bar] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo,bar] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [,,foo] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [,foo] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo,,] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo,] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [,,] = x);', Context.OptionsDisableWebCompat],
    ['for (var [,] = x);', Context.OptionsDisableWebCompat],
    ['for (var [] = x);', Context.OptionsDisableWebCompat],
    ['for (var [foo] = arr, [bar] = arr2);', Context.OptionsDisableWebCompat],
    ['for (var [foo] = arr, bar);', Context.OptionsDisableWebCompat],
    ['for (var [foo] = arr, bar = arr2);', Context.OptionsDisableWebCompat],
    ['for (var foo = arr, [bar] = arr2);', Context.OptionsDisableWebCompat],
    ['for (var [foo=a] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo=a, bar] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo, bar=b] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo=a, bar=b] = arr);', Context.OptionsDisableWebCompat],
    ['for (var [foo]);', Context.OptionsDisableWebCompat],
    ['for (var [foo = x]);', Context.OptionsDisableWebCompat],
    ['for (var [foo], bar);', Context.OptionsDisableWebCompat],
    ['for (var foo, [bar]);', Context.OptionsDisableWebCompat],
    ['for (var [...foo] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [foo, ...bar] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...foo, bar] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...foo,] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...foo,,] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...[foo, bar]] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...[foo, bar],] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...[foo, bar],,] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [x, ...[foo, bar]] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...bar = foo] = obj);', Context.OptionsDisableWebCompat],
    ['for (var [...] = obj);', Context.OptionsDisableWebCompat],
    ['for (var {} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {,} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {,,} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x,} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x,,} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {,x} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {,,x} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x, y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x,, y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x} = a, {y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x} = a, y = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x} = a, obj);', Context.OptionsDisableWebCompat],
    ['for (var x = a, {y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var x, {y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x = y} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x = y, z} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x, y = z} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x = y, z = a} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {x}, {y} = z);', Context.OptionsDisableWebCompat],
    ['for (var {x}, y);', Context.OptionsDisableWebCompat],
    ['for (var x = y, {z});', Context.OptionsDisableWebCompat],
    ['for (var {x}, y);', Context.OptionsDisableWebCompat],
    ['for (var {x=y});', Context.OptionsDisableWebCompat],
    ['for (var {x:y=z});', Context.OptionsDisableWebCompat],
    ['for (var {x:y=z} = obj, {a:b=c});', Context.OptionsDisableWebCompat],
    ['for (var {x:y=z}, {a:b=c} = obj);', Context.OptionsDisableWebCompat],
    ['for (var {a:=c} = z);', Context.OptionsDisableWebCompat],
    ['for (var {[x]: y} = z);', Context.OptionsDisableWebCompat],
    ['for (var {[x]} = z);', Context.OptionsDisableWebCompat],
    ['for (var {[x]: y});', Context.OptionsDisableWebCompat],
    ['for (var {[x]: y = z});', Context.OptionsDisableWebCompat],
    ['for (var {[x]: y = z} = a);', Context.OptionsDisableWebCompat],
    ['for (var {a, [x]: y} = a);', Context.OptionsDisableWebCompat]
  ];

  fail('Statements - For (fail)', inValids);

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'for (let foo, bar;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let foo = bar;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [,] = x;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let\nfoo;;);',
      Context.OptionsDisableWebCompat,
      {
        body: [
          {
            body: {
              type: 'EmptyStatement'
            },
            init: {
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
              kind: 'let',
              type: 'VariableDeclaration'
            },
            test: null,
            type: 'ForStatement',
            update: null
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
    ],
    [
      'for (let [] = x;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ArrayPattern',
                    elements: []
                  },
                  init: {
                    type: 'Identifier',
                    name: 'x'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [,,] = x;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo] = arr;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                    name: 'arr'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo,] = arr;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                    name: 'arr'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo] = arr, [bar] = arr2;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                    name: 'arr'
                  }
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    ]
                  },
                  init: {
                    type: 'Identifier',
                    name: 'arr2'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo] = arr, bar;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                    name: 'arr'
                  }
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
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo, bar=b] = arr;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                    name: 'arr'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let [foo=a] = arr;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                    name: 'arr'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (let foo = arr, [bar] = arr2;;);',
      Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForStatement',
            init: {
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
                    name: 'arr'
                  }
                },
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    ]
                  },
                  init: {
                    type: 'Identifier',
                    name: 'arr2'
                  }
                }
              ],
              kind: 'let'
            },
            test: null,
            update: null,
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - For (pass)', valids);
});
