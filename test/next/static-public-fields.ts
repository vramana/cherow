import { pass, fail } from '../test-utils';

describe('Next - Statc public fields', () => {

  fail('class A { static a : 0 }', {
      source: 'class A { static a : 0 }',
      next: true,
      line: 1
  });

  fail('class A { static a = 0\n ["b"](){} }', {
    source: 'class A { static a = 0\n ["b"](){} }',
    next: true,
    line: 2
});

  fail('class A { static a = }', {
      source: 'class A { static a = }',
      next: true,
      line: 1
  });

  fail('class A { static *a = 0 }', {
      source: 'class A { static *a = 0 }',
      next: true,
      line: 1
  });

  fail('class A { static *a }', {
      source: 'class A { static *a }',
      next: true,
      line: 1
  });

  fail('class A { static async a = 0 }', {
      source: 'class A { static async a = 0 }',
      next: true,
      line: 1
  });

  fail('class A { static a = 0\n ["b"](){} }', {
      source: 'class A { static a = 0\n ["b"](){} }',
      next: true,
      line: 2
  });

  fail('class A { static constructor }', {
      source: 'class A { static constructor }',
      next: true,
      index: 28
  });

  fail('class A { static prototype }', {
      source: 'class A { static prototype }',
      next: true,
      index: 16
  });

  fail('class C extends Base { static get a }', {
      source: 'class C extends Base { static get a }',
      next: true,
      index: 35
  });

  fail('class C extends Base { static a = () => arguments }', {
      source: 'class C extends Base { static a = () => arguments }',
      next: true,
      index: 39
  });

  fail('class C extends Base { static a = arguments }', {
      source: 'class C extends Base { static a = arguments }',
      next: true,
      index: 33
  });

  fail('class C extends Base { static a = arguments }', {
      source: 'class C extends Base { static a = arguments }',
      next: true,
      index: 33
  });

  pass('(class { static yield = 0 });', {
      source: '(class { static yield = 0 });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                          computed: false,
                          key: {
                              name: 'yield',
                              type: 'Identifier',
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 0,
                          }
                      }],
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static yield\n a });', {
      source: '(class { static yield\n a });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: false,
                              key: {
                                  name: 'yield',
                                  type: 'Identifier',
                              },
                              static: true,
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
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static await = 0 });', {
      source: '(class { static await = 0 });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                          computed: false,
                          key: {
                              name: 'await',
                              type: 'Identifier',
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 0,
                          }
                      }],
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static await\n a });', {
      source: '(class { static await\n a });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: false,
                              key: {
                                  name: 'await',
                                  type: 'Identifier',
                              },
                              static: true,
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
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });
  pass('(class { static a = 0; });', {
      source: '(class { static a = 0; });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                          computed: false,
                          key: {
                              name: 'a',
                              type: 'Identifier',
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 0,
                          }
                      }],
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression',
              },
              type: 'ExpressionStatement',
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static ["a"]; ["b"](){} });', {
      source: '(class { static ["a"]; ["b"](){} });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'a',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'b',
                              },
                              kind: 'method',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
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
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static a; *b(){} });', {
      source: '(class { static a; *b(){} });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: false,
                              key: {
                                  name: 'a',
                                  type: 'Identifier',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: false,
                              key: {
                                  name: 'b',
                                  type: 'Identifier',
                              },
                              kind: 'method',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
                                  },
                                  expression: false,
                                  generator: true,
                                  id: null,
                                  params: [],
                                  type: 'FunctionExpression'
                              }
                          }
                      ],
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static ["a"]; *b(){} });', {
      source: '(class { static ["a"]; *b(){} });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'a',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: false,
                              key: {
                                  name: 'b',
                                  type: 'Identifier',
                              },
                              kind: 'method',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
                                  },
                                  expression: false,
                                  generator: true,
                                  id: null,
                                  params: [],
                                  type: 'FunctionExpression'
                              }
                          }
                      ],
                      type: 'ClassBody'
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class extends Base { static ["a"] = 0; b(){} });', {
      source: '(class extends Base { static ["a"] = 0; b(){} });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'a',
                              },
                              static: true,
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
                                  type: 'Identifier',
                              },
                              kind: 'method',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
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
                  id: null,
                  superClass: {
                      name: 'Base',
                      type: 'Identifier'
                  },
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static 0; });', {
      source: '(class { static 0; });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                          computed: false,
                          key: {
                              type: 'Literal',
                              value: 0,
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: null,
                      }, ],
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static a\n b\n });', {
      source: '(class { static a\n b\n });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: false,
                              key: {
                                  name: 'a',
                                  type: 'Identifier',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: false,
                              key: {
                                  name: 'b',
                                  type: 'Identifier',
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: null,
                          },
                      ],
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static a = () => function t() { arguments; } });', {
      source: '(class { static a = () => function t() { arguments; } });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                          computed: false,
                          key: {
                              name: 'a',
                              type: 'Identifier',
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: {
                              async: false,
                              body: {
                                  async: false,
                                  body: {
                                      body: [{
                                          expression: {
                                              name: 'arguments',
                                              type: 'Identifier',
                                          },
                                          type: 'ExpressionStatement'
                                      }, ],
                                      type: 'BlockStatement',
                                  },
                                  expression: false,
                                  generator: false,
                                  id: {
                                      name: 't',
                                      type: 'Identifier',
                                  },
                                  params: [],
                                  type: 'FunctionExpression',
                              },
                              expression: true,
                              generator: false,
                              id: null,
                              params: [],
                              type: 'ArrowFunctionExpression'
                          }
                      }],
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression',
              },
              type: 'ExpressionStatement',
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static get\n *a(){} });', {
      source: '(class { static get\n *a(){} });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: false,
                              key: {
                                  name: 'get',
                                  type: 'Identifier'
                              },
                              static: true,
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
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });
  pass('(class { static a\n static });', {
      source: '(class { static a\n static });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: false,
                              key: {
                                  name: 'a',
                                  type: 'Identifier',
                              },
                              static: true,
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
                  id: null,
                  superClass: null,
                  type: 'ClassExpression',
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static async\n a(){} });', {
      source: '(class { static async\n a(){} });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: false,
                              key: {
                                  name: 'async',
                                  type: 'Identifier',
                              },
                              static: true,
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
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static ["a"]\n });', {
      source: '(class { static ["a"]\n });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                          computed: true,
                          key: {
                              type: 'Literal',
                              value: 'a',
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: null,
                      }],
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression',
              },
              type: 'ExpressionStatement',
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static ["a"]\n ["b"](){} });', {
      source: '(class { static ["a"]\n ["b"](){} });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'a',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'b',
                              },
                              kind: 'method',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
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
                  id: null,
                  superClass: null,
                  type: 'ClassExpression',
              },
              type: 'ExpressionStatement',
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static ["a"] = 0; });', {
      source: '(class { static ["a"] = 0; });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                          computed: true,
                          key: {
                              type: 'Literal',
                              value: 'a',
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 0
                          }
                      }],
                      type: 'ClassBody'
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static ["a"]; });', {
      source: '(class { static ["a"]; });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                          computed: true,
                          key: {
                              type: 'Literal',
                              value: 'a',
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: null,
                      }, ],
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression',
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program',
      }
  });

  pass('(class { static async });', {
      source: '(class { static async });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                          computed: false,
                          key: {
                              name: 'async',
                              type: 'Identifier',
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: null,
                      }, ],
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static ["a"]; b(){}; });', {
      source: '(class { static ["a"]; b(){};; });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'a',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: false,
                              key: {
                                  name: 'b',
                                  type: 'Identifier',
                              },
                              kind: 'method',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
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
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { ["a"]; static b(){}; });', {
      source: '(class { ["a"]; static b(){};; });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'a',
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: null
                          },
                          {
                              computed: false,
                              key: {
                                  name: 'b',
                                  type: 'Identifier',
                              },
                              kind: 'method',
                              static: true,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
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
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static ["a"]; static b(){}; });', {
      source: '(class { static ["a"]; static b(){};; });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'a',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: false,
                              key: {
                                  name: 'b',
                                  type: 'Identifier',
                              },
                              kind: 'method',
                              static: true,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
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
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static ["a"]; #b(){}; });', {
      source: '(class { static ["a"]; #b(){};; });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'a',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: false,
                              key: {
                                  name: 'b',
                                  type: 'PrivateName',
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
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static ["a"]; #b(){}; });', {
      source: '(class { #a, b; static ["c"]; #d(){ this.#a; }; });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: false,
                              key: {
                                  name: 'a',
                                  type: 'PrivateName'
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: false,
                              key: {
                                  name: 'b',
                                  type: 'Identifier',
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'c',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: false,
                              key: {
                                  name: 'd',
                                  type: 'PrivateName'
                              },
                              kind: 'method',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [{
                                          expression: {
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
                                          type: 'ExpressionStatement'
                                      }, ],
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
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static ["a"]; b; });', {
      source: '(class { static ["a"]; b; });',
      next: true,
      expected: {
          body: [{
              expression: {
                  body: {
                      body: [{
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'a',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: null,
                          },
                          {
                              computed: false,
                              key: {
                                  name: 'b',
                                  type: 'Identifier',
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: null,
                          },
                      ],
                      type: 'ClassBody',
                  },
                  id: null,
                  superClass: null,
                  type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass('(class { static a = 0; });', {
      source: `const foo = "foo";

const bar = () => {};
const four = 4;

class Static {
static [one()] = "test";
static [2 * 4 + 7] = "247";
static [2 * four + 7] = "247";
static [2 * four + seven] = "247";
[null] = "null";
[undefined] = "undefined";
[(a = "foo")] = false;
[void 0] = "void 0";
get ["giraffe"]() {}
set ["tiger"](value) {}
get [monkey()]() {}
set [computed()](value) {}
["test" + one]() {}
static [10]() {}
[/regex/] = "regex";
[foo] = "foo";
[bar] = "bar";
[baz] = "baz";
}`,
      next: true,
      expected: {
          body: [{
                  declarations: [{
                      id: {
                          name: 'foo',
                          type: 'Identifier',
                      },
                      init: {
                          type: 'Literal',
                          value: 'foo',
                      },
                      type: 'VariableDeclarator'
                  }],
                  kind: 'const',
                  type: 'VariableDeclaration'
              },
              {
                  declarations: [{
                      id: {
                          name: 'bar',
                          type: 'Identifier',
                      },
                      init: {
                          async: false,
                          body: {
                              body: [],
                              type: 'BlockStatement'
                          },
                          expression: false,
                          generator: false,
                          id: null,
                          params: [],
                          type: 'ArrowFunctionExpression'
                      },
                      type: 'VariableDeclarator'
                  }],
                  kind: 'const',
                  type: 'VariableDeclaration',
              },
              {
                  declarations: [{
                      id: {
                          name: 'four',
                          type: 'Identifier',
                      },
                      init: {
                          type: 'Literal',
                          value: 4,
                      },
                      type: 'VariableDeclarator',
                  }, ],
                  kind: 'const',
                  type: 'VariableDeclaration',
              },
              {
                  body: {
                      body: [{
                              computed: true,
                              key: {
                                  arguments: [],
                                  callee: {
                                      name: 'one',
                                      type: 'Identifier',
                                  },
                                  type: 'CallExpression',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: 'test',
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  left: {
                                      left: {
                                          type: 'Literal',
                                          value: 2,
                                      },
                                      operator: '*',
                                      right: {
                                          type: 'Literal',
                                          value: 4,
                                      },
                                      type: 'BinaryExpression',
                                  },
                                  operator: '+',
                                  right: {
                                      type: 'Literal',
                                      value: 7,
                                  },
                                  type: 'BinaryExpression',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: '247',
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  left: {
                                      left: {
                                          type: 'Literal',
                                          value: 2,
                                      },
                                      operator: '*',
                                      right: {
                                          name: 'four',
                                          type: 'Identifier',
                                      },
                                      type: 'BinaryExpression'
                                  },
                                  operator: '+',
                                  right: {
                                      type: 'Literal',
                                      value: 7,
                                  },
                                  type: 'BinaryExpression',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: '247',
                              },
                          },
                          {
                              computed: true,
                              key: {
                                  left: {
                                      left: {
                                          type: 'Literal',
                                          value: 2,
                                      },
                                      operator: '*',
                                      right: {
                                          name: 'four',
                                          type: 'Identifier',
                                      },
                                      type: 'BinaryExpression',
                                  },
                                  operator: '+',
                                  right: {
                                      name: 'seven',
                                      type: 'Identifier',
                                  },
                                  type: 'BinaryExpression',
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: '247',
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: null,
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: 'null',
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  name: 'undefined',
                                  type: 'Identifier',
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: 'undefined',
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  left: {
                                      name: 'a',
                                      type: 'Identifier',
                                  },
                                  operator: '=',
                                  right: {
                                      type: 'Literal',
                                      value: 'foo',
                                  },
                                  type: 'AssignmentExpression',
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: false,
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  argument: {
                                      type: 'Literal',
                                      value: 0,
                                  },
                                  operator: 'void',
                                  prefix: true,
                                  type: 'UnaryExpression',
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: 'void 0',
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'giraffe',
                              },
                              kind: 'get',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
                                  },
                                  expression: false,
                                  generator: false,
                                  id: null,
                                  params: [],
                                  type: 'FunctionExpression'
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 'tiger',
                              },
                              kind: 'set',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
                                  },
                                  expression: false,
                                  generator: false,
                                  id: null,
                                  params: [{
                                      name: 'value',
                                      type: 'Identifier',
                                  }, ],
                                  type: 'FunctionExpression',
                              },
                          },
                          {
                              computed: true,
                              key: {
                                  arguments: [],
                                  callee: {
                                      name: 'monkey',
                                      type: 'Identifier',
                                  },
                                  type: 'CallExpression',
                              },
                              kind: 'get',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
                                  },
                                  expression: false,
                                  generator: false,
                                  id: null,
                                  params: [],
                                  type: 'FunctionExpression'
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  arguments: [],
                                  callee: {
                                      name: 'computed',
                                      type: 'Identifier',
                                  },
                                  type: 'CallExpression',
                              },
                              kind: 'set',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
                                  },
                                  expression: false,
                                  generator: false,
                                  id: null,
                                  params: [{
                                      name: 'value',
                                      type: 'Identifier',
                                  }],
                                  type: 'FunctionExpression',
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  left: {
                                      type: 'Literal',
                                      value: 'test',
                                  },
                                  operator: '+',
                                  right: {
                                      name: 'one',
                                      type: 'Identifier',
                                  },
                                  type: 'BinaryExpression',
                              },
                              kind: 'method',
                              static: false,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
                                  },
                                  expression: false,
                                  generator: false,
                                  id: null,
                                  params: [],
                                  type: 'FunctionExpression',
                              },
                          },
                          {
                              computed: true,
                              key: {
                                  type: 'Literal',
                                  value: 10,
                              },
                              kind: 'method',
                              static: true,
                              type: 'MethodDefinition',
                              value: {
                                  async: false,
                                  body: {
                                      body: [],
                                      type: 'BlockStatement',
                                  },
                                  expression: false,
                                  generator: false,
                                  id: null,
                                  params: [],
                                  type: 'FunctionExpression'
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  regex: {
                                      flags: '',
                                      pattern: 'regex',
                                  },
                                  type: 'Literal',
                                  value: /regex/,
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: 'regex',
                              },
                          },
                          {
                              computed: true,
                              key: {
                                  name: 'foo',
                                  type: 'Identifier',
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: 'foo',
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  name: 'bar',
                                  type: 'Identifier',
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: 'bar',
                              }
                          },
                          {
                              computed: true,
                              key: {
                                  name: 'baz',
                                  type: 'Identifier',
                              },
                              static: false,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: 'baz',
                              }
                          }
                      ],
                      type: 'ClassBody',
                  },
                  id: {
                      name: 'Static',
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

  pass('class MyClass { static myProperty = value; method() {} }', {
      source: 'class MyClass { static myProperty = value; method() {} }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          key: {
                              name: 'myProperty',
                              type: 'Identifier',
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: {
                              name: 'value',
                              type: 'Identifier',
                          },
                      },
                      {
                          computed: false,
                          key: {
                              name: 'method',
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
                  name: 'MyClass',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass(`class B {
static field = 23;
}`, {
      source: `class B {
static field = 23;
}`,
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      computed: false,
                      key: {
                          name: 'field',
                          type: 'Identifier',
                      },
                      static: true,
                      type: 'FieldDefinition',
                      value: {
                          type: 'Literal',
                          value: 23,
                      }
                  }],
                  type: 'ClassBody',
              },
              id: {
                  name: 'B',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass(`class Foo {
static num = 0;
static str = "bar";
}`, {
      source: `class Foo {
static num = 0;
static str = "bar";
}`,
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          key: {
                              name: 'num',
                              type: 'Identifier',
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 0,
                          }
                      },
                      {
                          computed: false,
                          key: {
                              name: 'str',
                              type: 'Identifier',
                          },
                          static: true,
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 'bar',
                          }
                      }
                  ],
                  type: 'ClassBody',
              },
              id: {
                  name: 'Foo',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration',
          }],
          sourceType: 'script',
          type: 'Program',
      }
  });

  pass(`var Foo = class { static num = 0; }`, {
      source: `var Foo = class { static num = 0; }`,
      next: true,
      expected: {
          body: [{
              declarations: [{
                  id: {
                      name: 'Foo',
                      type: 'Identifier',
                  },
                  init: {
                      body: {
                          body: [{
                              computed: false,
                              key: {
                                  name: 'num',
                                  type: 'Identifier'
                              },
                              static: true,
                              type: 'FieldDefinition',
                              value: {
                                  type: 'Literal',
                                  value: 0,
                              }
                          }],
                          type: 'ClassBody'
                      },
                      id: null,
                      superClass: null,
                      type: 'ClassExpression'
                  },
                  type: 'VariableDeclarator'
              }],
              kind: 'var',
              type: 'VariableDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

  pass(`export default param =>
class Foo {
static props = {
prop1: 'prop1',
prop2: 'prop2'
}

getParam() {
return param;
}
}`, {
      source: `export default param =>
class Foo {
static props = {
  prop1: 'prop1',
  prop2: 'prop2'
}

getParam() {
  return param;
}
}`,
      next: true,
      module: true,
      expected: {
          body: [{
              declaration: {
                  async: false,
                  body: {
                      body: {
                          body: [{
                                  computed: false,
                                  key: {
                                      name: 'props',
                                      type: 'Identifier'
                                  },
                                  static: true,
                                  type: 'FieldDefinition',
                                  value: {
                                      properties: [{
                                              computed: false,
                                              key: {
                                                  name: 'prop1',
                                                  type: 'Identifier',
                                              },
                                              kind: 'init',
                                              method: false,
                                              shorthand: false,
                                              type: 'Property',
                                              value: {
                                                  type: 'Literal',
                                                  value: 'prop1',
                                              },
                                          },
                                          {
                                              computed: false,
                                              key: {
                                                  name: 'prop2',
                                                  type: 'Identifier',
                                              },
                                              kind: 'init',
                                              method: false,
                                              shorthand: false,
                                              type: 'Property',
                                              value: {
                                                  type: 'Literal',
                                                  value: 'prop2',
                                              }
                                          }
                                      ],
                                      type: 'ObjectExpression'
                                  }
                              },
                              {
                                  computed: false,
                                  key: {
                                      name: 'getParam',
                                      type: 'Identifier',
                                  },
                                  kind: 'method',
                                  static: false,
                                  type: 'MethodDefinition',
                                  value: {
                                      async: false,
                                      body: {
                                          body: [{
                                              argument: {
                                                  name: 'param',
                                                  type: 'Identifier',
                                              },
                                              type: 'ReturnStatement'
                                          }, ],
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
                          name: 'Foo',
                          type: 'Identifier',
                      },
                      superClass: null,
                      type: 'ClassExpression'
                  },
                  expression: true,
                  generator: false,
                  id: null,
                  params: [{
                      name: 'param',
                      type: 'Identifier',
                  }, ],
                  type: 'ArrowFunctionExpression',
              },
              type: 'ExportDefaultDeclaration'
          }],
          sourceType: 'module',
          type: 'Program'
      }
  });
});