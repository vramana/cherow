import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Try', () => {
  fail('Statements - Try (fail)', [
    ['try {} catch (a, a) { }', Context.OptionsDisableWebCompat],
    ['try {} catch ([a,a]) { }', Context.OptionsDisableWebCompat],
    ['try {} catch ([a] = b) { }', Context.OptionsDisableWebCompat],
    ['try {} catch ([a] = b) { }', Context.OptionsDisableWebCompat],
    ['try {} catch ([a] = b) { }', Context.OptionsDisableWebCompat],
    ['try {} catch ([a] = b) { }', Context.OptionsDisableWebCompat],
    ['try {} catch (fkleuver) { const fkleuver = 1; } ', Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { var foo; }', Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { let foo; }', Context.Empty],
    ['try {} catch (foo) { try {} catch (_) { var foo; } }', Context.OptionsDisableWebCompat],
    ['try {} catch ([foo]) { var foo; }', Context.OptionsDisableWebCompat],
    ['try {} catch ({ foo }) { var foo; }', Context.OptionsDisableWebCompat],
    ['try {} catch ({ a: foo, b: { c: [foo] } }) {}', Context.Empty],
    ['try {} catch (foo) { function foo() {} }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { for (var e;;) {} }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { for (var e in y) {} }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { for (var e of y) {} }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { let e = x; }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { const e = x; }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { for (var e of y) {} }', Context.Empty],
    ['try {} catch (e) { let e = x; }', Context.Empty],
    ['try {} catch (e) { const e = x; }', Context.Empty],
    ['try {} catch (e) { for (var e of y) {} }', Context.Empty],
    ['try {} catch (e) { for (var e of y) {} }', Context.Empty],
    ['try {} catch(e) { var e; }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { let e = x; }', Context.Empty]
  ]);

  pass('Statements - Try (pass)', [
    [
      'try {} catch ([a,b,c]) { }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a'
                  },
                  {
                    type: 'Identifier',
                    name: 'b'
                  },
                  {
                    type: 'Identifier',
                    name: 'c'
                  }
                ]
              },
              body: {
                type: 'BlockStatement',
                body: []
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch (foo) {} var foo;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo'
              },
              body: {
                type: 'BlockStatement',
                body: []
              }
            },
            finalizer: null
          },
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'foo'
                },
                init: null
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try { throw null; } catch ({}) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'Literal',
                    value: null
                  }
                }
              ]
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ObjectPattern',
                properties: []
              },
              body: {
                type: 'BlockStatement',
                body: []
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try { } catch (a) { { const a = b; } }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'a'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            id: {
                              type: 'Identifier',
                              name: 'a'
                            },
                            init: {
                              type: 'Identifier',
                              name: 'b'
                            }
                          }
                        ],
                        kind: 'const'
                      }
                    ]
                  }
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var foo; try {} catch (_) { const foo = 1; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'foo'
                }
              }
            ]
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: '_'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'const',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: 1
                        },
                        id: {
                          type: 'Identifier',
                          name: 'foo'
                        }
                      }
                    ]
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch(e) { try {} catch (e) {} }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'TryStatement',
                    block: {
                      type: 'BlockStatement',
                      body: []
                    },
                    handler: {
                      type: 'CatchClause',
                      param: {
                        type: 'Identifier',
                        name: 'e'
                      },
                      body: {
                        type: 'BlockStatement',
                        body: []
                      }
                    },
                    finalizer: null
                  }
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try {} catch (foo) { { let foo; } }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            id: {
                              type: 'Identifier',
                              name: 'foo'
                            },
                            init: null
                          }
                        ],
                        kind: 'let'
                      }
                    ]
                  }
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var foo; try {} catch (_) { let foo; }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'foo'
                },
                init: null
              }
            ],
            kind: 'var'
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: '_'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        id: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        init: null
                      }
                    ],
                    kind: 'let'
                  }
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try {} catch (e) { { let e = x; } }',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            id: {
                              type: 'Identifier',
                              name: 'e'
                            },
                            init: {
                              type: 'Identifier',
                              name: 'x'
                            }
                          }
                        ],
                        kind: 'let'
                      }
                    ]
                  }
                ]
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try {} catch (foo) {} let foo;',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo'
              },
              body: {
                type: 'BlockStatement',
                body: []
              }
            },
            finalizer: null
          },
          {
            type: 'VariableDeclaration',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  type: 'Identifier',
                  name: 'foo'
                },
                init: null
              }
            ],
            kind: 'let'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'try {} catch (e) { let b = x; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        id: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      }
                    ]
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch (e) { var e = x; }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        id: {
                          type: 'Identifier',
                          name: 'e'
                        }
                      }
                    ]
                  }
                ]
              }
            },
            finalizer: null
          }
        ]
      }
    ],
    [
      'try {} catch (a) { }',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: []
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'a'
              },
              body: {
                type: 'BlockStatement',
                body: []
              }
            },
            finalizer: null
          }
        ]
      }
    ]
  ]);
});
