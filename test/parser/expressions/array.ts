import { Context } from '../../../src/common';
import { pass } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Expressions - Array', () => {});

for (const arg of ['[...]', '[a, ...]', '[..., ]', '[..., ...]', '[ (...a)]']) {
  it(`${arg}`, () => {
    t.throws(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });

  it(`"use strict"; ${arg}`, () => {
    t.throws(() => {
      parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
    });
  });

  it(`"use strict"; ${arg}`, () => {
    t.throws(() => {
      parseSource(`"use strict"; ${arg}`, undefined, Context.OptionsWebCompat);
    });
  });

  it(`${arg}`, () => {
    t.throws(() => {
      parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
    });
  });
}

for (const arg of [
  '[1 <= 0]',
  'let [a,,b] = c',
  '[a, ...b=c]',
  '[a, ...b=c]',
  '([a, ...b=c])',
  '[,,1,,,2,3,,]',
  '[ 1, 2,, 3, ]',
  '[ 0 ]',
  '[ ,, 0 ]',
  ' [,,3,,,]',
  '[,]',
  '[x()]',
  '[...a]',
  '[a, ...b]',
  '[...a,]',
  '[...a, ,]',
  '[, ...a]',
  '[...a, ...b]',
  '[...a, , ...b]',
  '[...[...a]]',
  '[, ...a]',
  '[, , ...a]',
  '[a, ...b]',
  '[function* f() {}]',
  '[a, ...{0: b}] = (1);',
  '[...{a}] = b;',
  '[...{a}] = b;',
  '[a, ...{0: b}] = 1',
  '[1, "z", "a", "Symbol(foo)"]',
  '[{...null}]',
  '[{...{a: 2, b: 3}, ... {c: 4, d: 5}}]',
  '[1, 2, 3, ...[]]',
  ' [...{}];',
  '[1,2,,4,5];',
  'var array = [,,,,,];',
  'var a = [,];',
  'let a = [];',
  'let b = [42];',
  'let c = [42, 7];',
  'let [d, ...e] = [1, 2, 3, 4, 5];',
  `[a,]`,
  `[a,,]`,
  `[a,a,]`,
  `[a,,,]`,
  `[a,a,,]`,
  `[,a]`,
  `[,a,]`,
  `[,a,,]`,
  `[,a,a,]`,
  `[,a,]`,
  `[,a,,]`,
  `[,a,a,]`,
  `[,,a]`,
  `[,a,a]`,
  `[,,a,]`,
  `[,,a,]`,
  `[,,,a]`,
  `[,,a,a]`,
  '([].x);',
  'async([].x);',
  'async([].x) => x;'
]) {
  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.Empty);
    });
  });

  it(`"use strict"; ${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
    });
  });

  it(`"use strict"; ${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`"use strict"; ${arg}`, undefined, Context.OptionsWebCompat);
    });
  });

  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseSource(`${arg}`, undefined, Context.OptionsNext | Context.Module);
    });
  });
}

pass('Expressions - Array (pass)', [
  [
    '[a]',
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
  ],
  [
    '[,,,]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [null, null, null]
          }
        }
      ]
    }
  ],
  [
    '[,,x]',
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
              null,
              null,
              {
                type: 'Identifier',
                name: 'x'
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[this];',
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
                type: 'ThisExpression'
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x, y, ...z]',
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
                name: 'x'
              },
              {
                type: 'Identifier',
                name: 'y'
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'Identifier',
                  name: 'z'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x, ...y, z]',
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
                name: 'x'
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'Identifier',
                  name: 'y'
                }
              },
              {
                type: 'Identifier',
                name: 'z'
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x, y, ...z = arr]',
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
                name: 'x'
              },
              {
                type: 'Identifier',
                name: 'y'
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'z'
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'arr'
                  }
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x, y, ...z()]',
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
                name: 'x'
              },
              {
                type: 'Identifier',
                name: 'y'
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'z'
                  },
                  arguments: []
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x, y, ...z + arr]',
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
                name: 'x'
              },
              {
                type: 'Identifier',
                name: 'y'
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'z'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'arr'
                  },
                  operator: '+'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x, ...z = arr, y]',
    Context.OptionsRanges,
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
                name: 'x',
                start: 1,
                end: 2
              },
              {
                type: 'SpreadElement',
                argument: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'z',
                    start: 7,
                    end: 8
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'arr',
                    start: 11,
                    end: 14
                  },
                  start: 7,
                  end: 14
                },
                start: 4,
                end: 14
              },
              {
                type: 'Identifier',
                name: 'y',
                start: 16,
                end: 17
              }
            ],
            start: 0,
            end: 18
          },
          start: 0,
          end: 18
        }
      ],
      start: 0,
      end: 18
    }
  ],
  [
    '[x, ...z(), y]',
    Context.OptionsRanges,
    {
      type: 'Program',
      start: 0,
      end: 14,
      body: [
        {
          type: 'ExpressionStatement',
          start: 0,
          end: 14,
          expression: {
            type: 'ArrayExpression',
            start: 0,
            end: 14,
            elements: [
              {
                type: 'Identifier',
                start: 1,
                end: 2,
                name: 'x'
              },
              {
                type: 'SpreadElement',
                start: 4,
                end: 10,
                argument: {
                  type: 'CallExpression',
                  start: 7,
                  end: 10,
                  callee: {
                    type: 'Identifier',
                    start: 7,
                    end: 8,
                    name: 'z'
                  },
                  arguments: []
                }
              },
              {
                type: 'Identifier',
                start: 12,
                end: 13,
                name: 'y'
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x, ...z + arr, y]',
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
            type: 'ArrayExpression',
            start: 0,
            end: 18,
            elements: [
              {
                type: 'Identifier',
                start: 1,
                end: 2,
                name: 'x'
              },
              {
                type: 'SpreadElement',
                start: 4,
                end: 14,
                argument: {
                  type: 'BinaryExpression',
                  start: 7,
                  end: 14,
                  left: {
                    type: 'Identifier',
                    start: 7,
                    end: 8,
                    name: 'z'
                  },
                  operator: '+',
                  right: {
                    type: 'Identifier',
                    start: 11,
                    end: 14,
                    name: 'arr'
                  }
                }
              },
              {
                type: 'Identifier',
                start: 16,
                end: 17,
                name: 'y'
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[...this];',
    Context.OptionsRanges,
    {
      type: 'Program',
      start: 0,
      end: 10,
      body: [
        {
          type: 'ExpressionStatement',
          start: 0,
          end: 10,
          expression: {
            type: 'ArrayExpression',
            start: 0,
            end: 9,
            elements: [
              {
                type: 'SpreadElement',
                start: 1,
                end: 8,
                argument: {
                  type: 'ThisExpression',
                  start: 4,
                  end: 8
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
    '[...x.list];',
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
                type: 'SpreadElement',
                argument: {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'list'
                  }
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[...x.list] = a;',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'RestElement',
                  argument: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'list'
                    }
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'a'
            }
          }
        }
      ]
    }
  ],
  [
    '[...x = y];',
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
                type: 'SpreadElement',
                argument: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
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
        }
      ]
    }
  ],
  [
    '[...x += y];',
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
                type: 'SpreadElement',
                argument: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  operator: '+=',
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[...[x].map(y, z)];',
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
                type: 'SpreadElement',
                argument: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'x'
                        }
                      ]
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'map'
                    }
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'y'
                    },
                    {
                      type: 'Identifier',
                      name: 'z'
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[...[x].map(y, z)[x]] = a;',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'RestElement',
                  argument: {
                    type: 'MemberExpression',
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'MemberExpression',
                        object: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'x'
                            }
                          ]
                        },
                        computed: false,
                        property: {
                          type: 'Identifier',
                          name: 'map'
                        }
                      },
                      arguments: [
                        {
                          type: 'Identifier',
                          name: 'y'
                        },
                        {
                          type: 'Identifier',
                          name: 'z'
                        }
                      ]
                    },
                    computed: true,
                    property: {
                      type: 'Identifier',
                      name: 'x'
                    }
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'a'
            }
          }
        }
      ]
    }
  ],
  [
    '[...{x:y}/y]',
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
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false
                      }
                    ]
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '/'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[...{x}/y]',
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
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        value: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '/'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[...[x]/y]',
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
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      }
                    ]
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '/'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[.../x/]',
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
                type: 'SpreadElement',
                argument: {
                  type: 'Literal',
                  value: {},
                  regex: {
                    pattern: 'x',
                    flags: ''
                  }
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[.../x/+y]',
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
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Literal',
                    value: {},
                    regex: {
                      pattern: 'x',
                      flags: ''
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '+'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[.../x//y]',
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
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Literal',
                    value: {},
                    regex: {
                      pattern: 'x',
                      flags: ''
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '/'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[.../x/g/y]',
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
                type: 'SpreadElement',
                argument: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Literal',
                    value: {},
                    regex: {
                      pattern: 'x',
                      flags: 'g'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'y'
                  },
                  operator: '/'
                }
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[new x()[y]] = z',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'NewExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    arguments: []
                  },
                  computed: true,
                  property: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ]
    }
  ],
  [
    '[new x().y = a] = z',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'NewExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ]
    }
  ],
  [
    '[new x()[y] = a] = z',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'NewExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    computed: true,
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ]
    }
  ],
  [
    '[x()[y] = a + b] = z',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    computed: true,
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    operator: '+'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ]
    }
  ],
  [
    '[new x()[y] = a + b] = z',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'NewExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    computed: true,
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    },
                    operator: '+'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'z'
            }
          }
        }
      ]
    }
  ],
  [
    '[function(){}.length] = x',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: false,
                    id: null
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[5..length] = x',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Literal',
                    value: 5
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '["X".length] = x',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Literal',
                    value: 'X'
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[`x`.length] = x',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'x',
                          raw: 'x'
                        },
                        tail: true
                      }
                    ]
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[`a${5}b`.length] = x',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'TemplateLiteral',
                    expressions: [
                      {
                        type: 'Literal',
                        value: 5
                      }
                    ],
                    quasis: [
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'a',
                          raw: 'a'
                        },
                        tail: false
                      },
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'b',
                          raw: 'b'
                        },
                        tail: true
                      }
                    ]
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[/foo/.length] = x',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Literal',
                    value: {},
                    regex: {
                      pattern: 'foo',
                      flags: ''
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[/x/g.length] = x',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Literal',
                    value: {},
                    regex: {
                      pattern: 'x',
                      flags: 'g'
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'length'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'x'
            }
          }
        }
      ]
    }
  ],
  [
    '[{}.x] = y',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'ObjectExpression',
                    properties: []
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'x'
                  }
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
    '[{}[x]] = y',
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
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'ObjectExpression',
                    properties: []
                  },
                  computed: true,
                  property: {
                    type: 'Identifier',
                    name: 'x'
                  }
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
    '[x()[y]] = z',
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
                      name: 'x'
                    },
                    arguments: []
                  },
                  property: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              ]
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
    '[x.y = a] = z',
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
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
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
    '[x().y = a] = z',
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
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
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
    '[a[x.y] = a] = z',
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
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: true,
                    object: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    property: {
                      type: 'MemberExpression',
                      computed: false,
                      object: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      property: {
                        type: 'Identifier',
                        name: 'y'
                      }
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
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
    '[x()[y] = a ] = z',
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
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: true,
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
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
    '[x.y = a + b] = z',
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
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                }
              ]
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
    '[x().y = a + b] = z',
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
                  type: 'AssignmentPattern',
                  left: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      arguments: []
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  },
                  right: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: {
                      type: 'Identifier',
                      name: 'a'
                    },
                    right: {
                      type: 'Identifier',
                      name: 'b'
                    }
                  }
                }
              ]
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
    '[foo, [x,y,z], bar = B] = arr;',
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
                  type: 'Identifier',
                  name: 'foo'
                },
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    },
                    {
                      type: 'Identifier',
                      name: 'y'
                    },
                    {
                      type: 'Identifier',
                      name: 'z'
                    }
                  ]
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'bar'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'B'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[foo, [[[[[[[[[[[[[x,y,z]]]]]]]]]]]]], bar = B] = arr;',
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
                  type: 'Identifier',
                  name: 'foo'
                },
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'ArrayPattern',
                              elements: [
                                {
                                  type: 'ArrayPattern',
                                  elements: [
                                    {
                                      type: 'ArrayPattern',
                                      elements: [
                                        {
                                          type: 'ArrayPattern',
                                          elements: [
                                            {
                                              type: 'ArrayPattern',
                                              elements: [
                                                {
                                                  type: 'ArrayPattern',
                                                  elements: [
                                                    {
                                                      type: 'ArrayPattern',
                                                      elements: [
                                                        {
                                                          type: 'ArrayPattern',
                                                          elements: [
                                                            {
                                                              type: 'ArrayPattern',
                                                              elements: [
                                                                {
                                                                  type: 'ArrayPattern',
                                                                  elements: [
                                                                    {
                                                                      type: 'Identifier',
                                                                      name: 'x'
                                                                    },
                                                                    {
                                                                      type: 'Identifier',
                                                                      name: 'y'
                                                                    },
                                                                    {
                                                                      type: 'Identifier',
                                                                      name: 'z'
                                                                    }
                                                                  ]
                                                                }
                                                              ]
                                                            }
                                                          ]
                                                        }
                                                      ]
                                                    }
                                                  ]
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'bar'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'B'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[foo, [x,y = 20,z], bar = B] = arr;',
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
                  type: 'Identifier',
                  name: 'foo'
                },
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x'
                    },
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      right: {
                        type: 'Literal',
                        value: 20
                      }
                    },
                    {
                      type: 'Identifier',
                      name: 'z'
                    }
                  ]
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'bar'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'B'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    'foo([a, b] = arr);',
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
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'a'
                    },
                    {
                      type: 'Identifier',
                      name: 'b'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'arr'
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
    'x, [foo, bar] = doo',
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
                name: 'x'
              },
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
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
                right: {
                  type: 'Identifier',
                  name: 'doo'
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
    'x, [foo = y, bar] = doo',
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
                name: 'x'
              },
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
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
                        name: 'y'
                      }
                    },
                    {
                      type: 'Identifier',
                      name: 'bar'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'doo'
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
    'x = [a, b] = y',
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
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  },
                  {
                    type: 'Identifier',
                    name: 'b'
                  }
                ]
              },
              right: {
                type: 'Identifier',
                name: 'y'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[a, b] = c = d',
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
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'Identifier',
                  name: 'b'
                }
              ]
            },
            right: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: 'c'
              },
              right: {
                type: 'Identifier',
                name: 'd'
              }
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[a,b=[x,y]] = z',
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
                  type: 'Identifier',
                  name: 'a'
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'x'
                      },
                      {
                        type: 'Identifier',
                        name: 'y'
                      }
                    ]
                  }
                }
              ]
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
    '(foo, [bar, baz] = doo);',
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
                name: 'foo'
              },
              {
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'bar'
                    },
                    {
                      type: 'Identifier',
                      name: 'baz'
                    }
                  ]
                },
                right: {
                  type: 'Identifier',
                  name: 'doo'
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
    '[x.y] = z',
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
                    name: 'x'
                  },
                  property: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              ]
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
    '[x().y] = z',
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
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    arguments: []
                  },
                  property: {
                    type: 'Identifier',
                    name: 'y'
                  }
                }
              ]
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
    '[a[x.y]] = z',
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
                    type: 'Identifier',
                    name: 'a'
                  },
                  property: {
                    type: 'MemberExpression',
                    computed: false,
                    object: {
                      type: 'Identifier',
                      name: 'x'
                    },
                    property: {
                      type: 'Identifier',
                      name: 'y'
                    }
                  }
                }
              ]
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
    '[5[foo]]=x',
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
                    type: 'Literal',
                    value: 5
                  },
                  property: {
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
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '["x".foo]=x',
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
                    type: 'Literal',
                    value: 'x'
                  },
                  property: {
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
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x.y = z]',
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
                    name: 'y'
                  }
                },
                right: {
                  type: 'Identifier',
                  name: 'z'
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
    '[x + y]',
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
                operator: '+',
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
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x = y, z]',
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
              },
              {
                type: 'Identifier',
                name: 'z'
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[await = x]',
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
                type: 'AssignmentExpression',
                operator: '=',
                left: {
                  type: 'Identifier',
                  name: 'await'
                },
                right: {
                  type: 'Identifier',
                  name: 'x'
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
    '[x()]',
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
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'x'
                },
                arguments: []
              }
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x().foo]',
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
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  arguments: []
                },
                property: {
                  type: 'Identifier',
                  name: 'foo'
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
    '[[foo].length] = x',
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
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    ]
                  },
                  property: {
                    type: 'Identifier',
                    name: 'length'
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
    '[x, y]',
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
                type: 'Identifier',
                name: 'x'
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
  [
    '[x = y]',
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
            ]
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x.y]',
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
                type: 'MemberExpression',
                computed: false,
                object: {
                  type: 'Identifier',
                  name: 'x'
                },
                property: {
                  type: 'Identifier',
                  name: 'y'
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
    '[]',
    Context.Empty,
    {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: []
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[,]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [null]
          }
        }
      ]
    }
  ],
  [
    '[,,]',
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [null, null]
          }
        }
      ]
    }
  ],
  [
    '[x,]',
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
                name: 'x'
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[x,,,]',
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
                name: 'x'
              },
              null,
              null
            ]
          }
        }
      ]
    }
  ],
  [
    '[x,,y]',
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
                name: 'x'
              },
              null,
              {
                type: 'Identifier',
                name: 'y'
              }
            ]
          }
        }
      ]
    }
  ],
  [
    '[foo = A] = arr;',
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
                    name: 'A'
                  }
                }
              ]
            },
            operator: '=',
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ]
    }
  ],
  [
    '[foo, bar] = arr;',
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
                  type: 'Identifier',
                  name: 'foo'
                },
                {
                  type: 'Identifier',
                  name: 'bar'
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[foo = A, bar = B] = arr;',
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
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  right: {
                    type: 'Identifier',
                    name: 'A'
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
                    name: 'B'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    '[x &= 42]',
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
            ]
          }
        }
      ]
    }
  ],
  [
    '[a = 2]',
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
                type: 'AssignmentExpression',
                left: {
                  type: 'Identifier',
                  name: 'a'
                },
                operator: '=',
                right: {
                  type: 'Literal',
                  value: 2
                }
              }
            ]
          }
        }
      ]
    }
  ]
]);
