import { pass, fail } from '../test-utils';

describe('Next - Statoc public fields', () => {

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

  pass('(class { static a = 0; });', {
      source: '(class { static a = 0; });',
      next: true,
      expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
                    }
                  ],
                  type: 'ClassBody',
                },
                id: null,
                superClass: null,
                type: 'ClassExpression',
              },
              type: 'ExpressionStatement',
            },
          ],
          sourceType: 'script',
          type: 'Program'
        }
  });

  pass('(class { static ["a"]; ["b"](){} });', {
    source: '(class { static ["a"]; ["b"](){} });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static a; *b(){} });', {
    source: '(class { static a; *b(){} });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
            },
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static ["a"]; *b(){} });', {
    source: '(class { static ["a"]; *b(){} });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class extends Base { static ["a"] = 0; b(){} });', {
    source: '(class extends Base { static ["a"] = 0; b(){} });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static 0; });', {
    source: '(class { static 0; });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
                      computed: false,
                      key: {
                       type: 'Literal',
                        value: 0,
                      },
                      static: true,
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
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static a\n b\n });', {
    source: '(class { static a\n b\n });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
            },
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static a = () => function t() { arguments; } });', {
    source: '(class { static a = () => function t() { arguments; } });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
                            body: [
                              {
                                expression: {
                                  name: 'arguments',
                                  type: 'Identifier',
                                },
                                type: 'ExpressionStatement'
                              },
                            ],
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
                    }
                  ],
                  type: 'ClassBody',
                },
               id: null,
                superClass: null,
                type: 'ClassExpression',
              },
              type: 'ExpressionStatement',
            },
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static get\n *a(){} });', {
    source: '(class { static get\n *a(){} });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                 body: [
                    {
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
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
});
  pass('(class { static a\n static });', {
    source: '(class { static a\n static });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static async\n a(){} });', {
    source: '(class { static async\n a(){} });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static ["a"]\n });', {
    source: '(class { static ["a"]\n });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
                      computed: true,
                      key: {
                        type: 'Literal',
                       value: 'a',
                      },
                      static: true,
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
              type: 'ExpressionStatement',
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static ["a"]\n ["b"](){} });', {
    source: '(class { static ["a"]\n ["b"](){} });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
            },
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static ["a"] = 0; });', {
    source: '(class { static ["a"] = 0; });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
                    }
                  ],
                  type: 'ClassBody'
                },
                id: null,
                superClass: null,
                type: 'ClassExpression'
              },
              type: 'ExpressionStatement'
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static ["a"]; });', {
    source: '(class { static ["a"]; });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
                      computed: true,
                      key: {
                        type: 'Literal',
                        value: 'a',
                      },
                      static: true,
                      type: 'FieldDefinition',
                      value: null,
                    },
                  ],
                  type: 'ClassBody',
                },
                id: null,
                superClass: null,
                type: 'ClassExpression',
              },
              type: 'ExpressionStatement'
            }
          ],
          sourceType: 'script',
          type: 'Program',
        }
});

  pass('(class { static async });', {
    source: '(class { static async });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
                      computed: false,
                      key: {
                        name: 'async',
                        type: 'Identifier',
                      },
                      static: true,
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
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

  pass('(class { static ["a"]; b; });', {
    source: '(class { static ["a"]; b; });',
    next: true,
    expected: {
          body: [
            {
              expression: {
                body: {
                  body: [
                    {
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
            },
          ],
          sourceType: 'script',
          type: 'Program'
        }
});

});