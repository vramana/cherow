import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
// import * as t from 'assert';
// import { parseSource } from '../../../src/cherow';

describe('Next - Static private fields', () => {
  fail('Next - Import', [
    [`class A { static #constructor() {} }`, Context.Empty],
    [`class A { static #[ab]() {} }`, Context.Empty],
    [`a = { static #ab() {} }`, Context.Empty],
    [`class A { static #x = /*{ initializer }*/; }`, Context.Empty],
    [`class A { static [{#ab() {}}]() {} }`, Context.Empty],
    [`class A{ static # a() {}}`, Context.Empty],
    [`class C{ static #method() { super(); } };`, Context.Empty],
    [`class C{ static #method() { super.y(); } };`, Context.Empty],
    [`class A { static #a() {}; f() { delete A.#a } }`, Context.Empty],
    [`class A { static #a() {}; static #a() {} }`, Context.Empty],
    [`class A { static #a() {}; static #a() {} }`, Context.Empty]
  ]);

  pass('Next - Static private fields', [
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
                  kind: 'method',
                  static: true,
                  type: 'MethodDefinition',
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
