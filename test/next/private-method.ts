import { pass, fail } from '../test-utils';

describe('Next - Private Methods', () => {
/*
  fail('class A { #[ab]() {} }', {
    source: 'class A { #[ab]() {} }',
    next: true,
    index: 39
  });

  fail('class A { #[ab]() {} }', {
    source: 'class A { #[ab]() {} }',
    next: true,
    index: 39
  });

  fail('class A { a() { this.#a } b() { this.#b } }', {
    source: 'class A { a() { this.#a } b() { this.#b } }',
    next: true,
    index: 39
  });
*/
  fail('class A { #a() {}; f() { delete this.#a } }', {
    source: 'class A { #a() {}; f() { delete this.#a } }',
    next: true,
    line: 1
  });

  fail('class A { #constructor() {} }', {
    source: 'class A { #constructor() {} }',
    next: true,
    index: 11
  });

  fail(`var C = class { x = true ? {} : arguments; }`, {
    source: 'var C = class { x = true ? {} : arguments; }',
    line: 1,
  });

  fail('class A { #[ab]() {} }', {
    source: 'class A { #[ab]() {} }',
    next: true,
    index: 9
  });

  fail('a = { #ab() {} }', {
    source: 'a = { #ab() {} }',
    next: true,
    index: 5
  });

  fail('class A { [{#ab() {}}]() {} }', {
    source: 'class A { [{#ab() {}}]() {} }',
    next: true,
    index: 12
  });

  pass('class A { foo; #y() {} }', {
    source: 'class A { foo; #y() {} }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  static: false,
                  key: {
                    name: 'foo',
                    type: 'Identifier'
                  },
                  type: 'FieldDefinition',
                  value: null,
                },
                {
                  computed: false,
                  key: {
                   name: 'y',
                    type: 'PrivateName'
                  },
                  kind: 'method',
                  static: false,
                  type: 'MethodDefinition',
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
              type: 'ClassBody',
            },
            id: {
              name: 'A',
              type: 'Identifier',
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });
  /*
  "async\n a(){}",  // a field named async, and a method named a.
    "async\n a",
    "await;",

      "#a = 0\n",
    "#a = 0\n #b",
    "#a = 0\n b",
    "#a = 0\n b(){}",
    "#a\n",
    "#a\n #b\n",
    "#a\n b\n",
    "#a\n b(){}",
    "#a\n *b(){}",
    "#a\n ['b'](){}",

    */
  pass('class A { #a = 0\n #b }', {
    source: 'class A { #a = 0\n #b }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'a',
                    type: 'PrivateName',
                  },
                  static: false,
                  type: 'FieldDefinition',
                  value: {
                    type: 'Literal',
                    value: 0,
                  }
                },
                {
                  computed: false,
                  key: {
                    name: 'b',
                    type: 'PrivateName',
                  },
                  static: false,
                  type: 'FieldDefinition',
                  value: null,
                }
              ],
              type: 'ClassBody',
            },
            id: {
              name: 'A',
              type: 'Identifier',
            },
            superClass: null,
            type: 'ClassDeclaration'
          },
        ],
        sourceType: 'script',
        type: 'Program'
      }
   });

  pass('class A { await = 0 }', {
      source: 'class A { await = 0 }',
      next: true,
      expected: {
          body: [
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'await',
                      type: 'Identifier',
                    },
                    static: false,
                    type: 'FieldDefinition',
                    value: {
                      type: 'Literal',
                      value: 0
                    }
                  }
                ],
                type: 'ClassBody',
              },
              id: {
                name: 'A',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
    });

  pass('class A { async\n a }', {
      source: 'class A { async\n a }',
      next: true,
      expected: {
          body: [
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'async',
                      type: 'Identifier',
                    },
                    static: false,
                    type: 'FieldDefinition',
                    value: null,
                  },
                  {
                   computed: false,
                    key: {
                      name: 'a',
                      type: 'Identifier',
                    },
                    static: false,
                    type: 'FieldDefinition',
                    value: null,
                  },
                ],
                type: 'ClassBody'
              },
              id: {
                name: 'A',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration',
            },
          ],
          sourceType: 'script',
          type: 'Program'
        }
    });

  pass('class A { await; }', {
      source: 'class A { await; }',
      next: true,
      expected: {
          body: [
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'await',
                      type: 'Identifier',
                    },
                    static: false,
                    type: 'FieldDefinition',
                    value: null,
                  }
                ],
                type: 'ClassBody',
              },
              id: {
                name: 'A',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
    });

  pass('class A { async\n a(){} }', {
      source: 'class A { async\n a(){} }',
      next: true,
      expected: {
          body: [
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                    name: 'async',
                      type: 'Identifier'
                    },
                    static: false,
                    type: 'FieldDefinition',
                    value: null,
                  },
                  {
                    computed: false,
                    key: {
                      name: 'a',
                      type: 'Identifier',
                    },
                   kind: 'method',
                    static: false,
                    type: 'MethodDefinition',
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
          sourceType: 'script',
          type: 'Program'
        }
    });

  pass('class A { a\n static }', {
    source: 'class A { a\n static }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                    name: 'a',
                    type: 'Identifier',
                  },
                  static: false,
                  type: 'FieldDefinition',
                  value: null,
                },
                {
                  computed: false,
                  key: {
                    name: 'static',
                    type: 'Identifier',
                  },
                  static: false,
                  type: 'FieldDefinition',
                  value: null,
                }
              ],
              type: 'ClassBody',
            },
            id: {
              name: 'A',
              type: 'Identifier',
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

  pass('class A { b\na() {} }', {
    source: 'class A { b\na() {} }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
               {
                  computed: false,
                  static: false,
                  key: {
                    name: 'b',
                    type: 'Identifier',
                  },
                  type: 'FieldDefinition',
                  value: null,
                },
                {
                  computed: false,
                  key: {
                    name: 'a',
                    type: 'Identifier'
                  },
                  kind: 'method',
                  static: false,
                  type: 'MethodDefinition',
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
              type: 'ClassBody'
            },
            id: {
              name: 'A',
              type: 'Identifier',
            },
            superClass: null,
            type: 'ClassDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

  pass('class foo { #x() {} }', {
    source: 'class foo { #x() {} }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
                  key: {
                      name: 'x',
                    type: 'PrivateName'
                  },
                  kind: 'method',
                  static: false,
                  type: 'MethodDefinition',
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
              type: 'ClassBody'
            },
            id: {
              name: 'foo',
              type: 'Identifier',
            },
            superClass: null,
           type: 'ClassDeclaration'
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

});