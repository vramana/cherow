import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
// import * as t from 'assert';
// import { parseSource } from '../../../src/cherow';

describe('Next - Static private fields', () => {
  pass('Next - Static private fields', [
    /* [
      `class A { static ['a'] = 0; *b(){} }`,
      Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'A'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'FieldDefinition',
                  key: {
                    type: 'Literal',
                    value: 'a'
                  },
                  value: {
                    type: 'Literal',
                    value: 0
                  },
                  computed: true,
                  static: true
                },
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'b'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: true,

                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],*/
    [
      `class A { static 0; }`,
      Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'A'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'FieldDefinition',
                  key: {
                    type: 'Literal',
                    value: 0
                  },
                  value: null,
                  computed: false,
                  static: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `class A { static c = [c] = c }`,
      Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'A'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'FieldDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'c'
                  },
                  value: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'c'
                        }
                      ]
                    },
                    operator: '=',
                    right: {
                      type: 'Identifier',
                      name: 'c'
                    }
                  },
                  computed: false,
                  static: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `class A { static a = () => function t() { arguments; } }`,
      Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'A'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'FieldDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  value: {
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
                              type: 'Identifier',
                              name: 'arguments'
                            }
                          }
                        ]
                      },
                      async: false,
                      generator: false,

                      id: {
                        type: 'Identifier',
                        name: 't'
                      }
                    },
                    params: [],
                    id: null,
                    async: false,
                    expression: true
                  },
                  computed: false,
                  static: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `class A { static a = function t() { arguments; } }`,
      Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'A'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'FieldDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'a'
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
                            type: 'Identifier',
                            name: 'arguments'
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,

                    id: {
                      type: 'Identifier',
                      name: 't'
                    }
                  },
                  computed: false,
                  static: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `class A { static async; }`,
      Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'A'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'FieldDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  value: null,
                  computed: false,
                  static: true
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `class A { static await = 0; }`,
      Context.OptionsNext,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'A'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'FieldDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'await'
                  },
                  value: {
                    type: 'Literal',
                    value: 0
                  },
                  computed: false,
                  static: true
                }
              ]
            }
          }
        ]
      }
    ],
    // [ `class A { static a = 0; }`, Context.OptionsNext,   {}],
    // [ `class A { static a = 0; }`, Context.OptionsNext,   {}],
    // [ `class A { static a = 0; }`, Context.OptionsNext,   {}],
    // [ `class A { static a = 0; }`, Context.OptionsNext,   {}],
    // [ `class A { static a = 0; }`, Context.OptionsNext,   {}],

    [
      `class A { static foo = bar }`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'foo',
                    type: 'Identifier'
                  },
                  static: true,
                  type: 'FieldDefinition',
                  value: {
                    name: 'bar',
                    type: 'Identifier'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A { static chinese }`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'chinese',
                    type: 'Identifier'
                  },
                  static: true,
                  type: 'FieldDefinition',
                  value: null
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A { static #a() {}; static #b() {} }`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'a',
                    type: 'PrivateName'
                  },
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                },
                {
                  computed: false,
                  key: {
                    name: 'b',
                    type: 'PrivateName'
                  },
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A { static o(value) { C.#a = value; }}`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'o',
                    type: 'Identifier'
                  },
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [
                        {
                          expression: {
                            left: {
                              computed: false,
                              object: {
                                name: 'C',
                                type: 'Identifier'
                              },
                              property: {
                                name: 'a',
                                type: 'PrivateName'
                              },
                              type: 'MemberExpression'
                            },
                            operator: '=',
                            right: {
                              name: 'value',
                              type: 'Identifier'
                            },
                            type: 'AssignmentExpression'
                          },
                          type: 'ExpressionStatement'
                        }
                      ],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [
                      {
                        name: 'value',
                        type: 'Identifier'
                      }
                    ],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A { static $(value) { this.#$ = value; return this.#$; }}`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: '$',
                    type: 'Identifier'
                  },
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [
                        {
                          expression: {
                            left: {
                              computed: false,
                              object: {
                                type: 'ThisExpression'
                              },
                              property: {
                                name: '$',
                                type: 'PrivateName'
                              },
                              type: 'MemberExpression'
                            },
                            operator: '=',
                            right: {
                              name: 'value',
                              type: 'Identifier'
                            },
                            type: 'AssignmentExpression'
                          },
                          type: 'ExpressionStatement'
                        },
                        {
                          argument: {
                            computed: false,
                            object: {
                              type: 'ThisExpression'
                            },
                            property: {
                              name: '$',
                              type: 'PrivateName'
                            },
                            type: 'MemberExpression'
                          },
                          type: 'ReturnStatement'
                        }
                      ],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [
                      {
                        name: 'value',
                        type: 'Identifier'
                      }
                    ],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A { static get _() { return this.#_; }}`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: '_',
                    type: 'Identifier'
                  },
                  kind: 'get',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [
                        {
                          argument: {
                            computed: false,
                            object: {
                              type: 'ThisExpression'
                            },
                            property: {
                              name: '_',
                              type: 'PrivateName'
                            },
                            type: 'MemberExpression'
                          },
                          type: 'ReturnStatement'
                        }
                      ],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A { static #$(value) { return value; }}`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: '$',
                    type: 'PrivateName'
                  },
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [
                        {
                          argument: {
                            name: 'value',
                            type: 'Identifier'
                          },
                          type: 'ReturnStatement'
                        }
                      ],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [
                      {
                        name: 'value',
                        type: 'Identifier'
                      }
                    ],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A { static #a = 123; }`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'a',
                    type: 'PrivateName'
                  },
                  static: true,
                  type: 'FieldDefinition',
                  value: {
                    type: 'Literal',
                    value: 123
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A { static #a() {}; }`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'a',
                    type: 'PrivateName'
                  },
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A {
        static #a = 1;
        static getA() { return this.#a; }
        }`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'a',
                    type: 'PrivateName'
                  },
                  static: true,
                  type: 'FieldDefinition',
                  value: {
                    type: 'Literal',
                    value: 1
                  }
                },
                {
                  computed: false,
                  key: {
                    name: 'getA',
                    type: 'Identifier'
                  },
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [
                        {
                          argument: {
                            computed: false,
                            object: {
                              type: 'ThisExpression'
                            },
                            property: {
                              name: 'a',
                              type: 'PrivateName'
                            },
                            type: 'MemberExpression'
                          },
                          type: 'ReturnStatement'
                        }
                      ],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A {
            static #a = 1;
            static #b = this.#a;
            static getB() { return this.#b; }
           }`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'a',
                    type: 'PrivateName'
                  },
                  static: true,
                  type: 'FieldDefinition',
                  value: {
                    type: 'Literal',
                    value: 1
                  }
                },
                {
                  computed: false,
                  key: {
                    name: 'b',
                    type: 'PrivateName'
                  },
                  static: true,
                  type: 'FieldDefinition',
                  value: {
                    computed: false,
                    object: {
                      type: 'ThisExpression'
                    },
                    property: {
                      name: 'a',
                      type: 'PrivateName'
                    },
                    type: 'MemberExpression'
                  }
                },
                {
                  computed: false,
                  key: {
                    name: 'getB',
                    type: 'Identifier'
                  },
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [
                        {
                          argument: {
                            computed: false,
                            object: {
                              type: 'ThisExpression'
                            },
                            property: {
                              name: 'b',
                              type: 'PrivateName'
                            },
                            type: 'MemberExpression'
                          },
                          type: 'ReturnStatement'
                        }
                      ],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A { static #a; static getA() { return this.#a; } }`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'a',
                    type: 'PrivateName'
                  },
                  static: true,
                  type: 'FieldDefinition',
                  value: null
                },
                {
                  computed: false,
                  key: {
                    name: 'getA',
                    type: 'Identifier'
                  },
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
                  value: {
                    async: false,
                    body: {
                      body: [
                        {
                          argument: {
                            computed: false,
                            object: {
                              type: 'ThisExpression'
                            },
                            property: {
                              name: 'a',
                              type: 'PrivateName'
                            },
                            type: 'MemberExpression'
                          },
                          type: 'ReturnStatement'
                        }
                      ],
                      type: 'BlockStatement'
                    },
                    generator: false,
                    id: null,
                    params: [],
                    type: 'FunctionExpression'
                  }
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ],
    [
      `class A { static #a; }`,
      Context.Strict | Context.Module | Context.OptionsNext,
      {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'a',
                    type: 'PrivateName'
                  },
                  static: true,
                  type: 'FieldDefinition',
                  value: null
                }
              ],
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier'
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'module',
        type: 'Program'
      }
    ]
  ]);
});
