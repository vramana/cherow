import * as t from 'assert';
import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - With', () => {

  describe('Failure', () => {

      const invalidSyntax = [
          // Esprima issue: https://github.com/jquery/esprima/issues/1877
          `with(1) b: function a(){}`,
          'with ({}) async function f() {}',
          `with ({}) class C {}`,
          `with ({}) function foo() {}`,
          `with ({}) let x;`,
          'while (false) function f() {}',
          'while (false) function* g() {}',
          'while (false) class C {}',
          'while (false) let x = 1;',
          'while (false) async function f() {}',
          'while 0 break;',
          'while true break;',
          'while "hood" break;',
          'while ( false ) Label: continue Label;',
          `while '' break;`,
          `while() {}`,
          'with (foo) function bar() {}'
      ];

      for (const arg of invalidSyntax) {
          it(`${arg}`, () => {
              t.throws(() => {
                  parseSource(`${arg}`, undefined, Context.Empty);
              });
          });
      }

      // The `with` statement is not allowed in strict mode'
      fail('with (foo) bar;', Context.Strict | Context.Module, {
          source: 'with (foo) bar;',
      });
  });

  describe('Pass', () => {

      const validSyntax = [
          `with({}){ p1 = 'x1'; }`,
      ];

      for (const arg of validSyntax) {
          it(`${arg}`, () => {
              t.doesNotThrow(() => {
                  parseSource(`${arg}`, undefined, Context.Empty);
              });
          });
      }

      pass('with (foo) bar;', Context.OptionsLoc | Context.OptionsRanges, {
          source: 'with (foo) bar;',
          expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "WithStatement",
                    "object": {
                        "type": "Identifier",
                        "name": "foo",
                        "start": 6,
                        "end": 9,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 9
                            }
                        }
                    },
                    "body": {
                        "type": "ExpressionStatement",
                        "expression": {
                            "type": "Identifier",
                            "name": "bar",
                            "start": 11,
                            "end": 14,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 11
                                },
                                "end": {
                                    "line": 1,
                                    "column": 14
                                }
                            }
                        },
                        "start": 11,
                        "end": 15,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 11
                            },
                            "end": {
                                "line": 1,
                                "column": 15
                            }
                        }
                    },
                    "start": 0,
                    "end": 15,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 15
                        }
                    }
                }
            ],
            "start": 0,
            "end": 15,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 15
                }
            }
        }
      });

      pass('with ({}) {}', Context.OptionsLoc | Context.OptionsRanges, {
          source: 'with ({}) {}',
          expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "WithStatement",
                    "object": {
                        "type": "ObjectExpression",
                        "properties": [],
                        "start": 6,
                        "end": 8,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 6
                            },
                            "end": {
                                "line": 1,
                                "column": 8
                            }
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 10,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 10
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        }
                    },
                    "start": 0,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                }
            ],
            "start": 0,
            "end": 12,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 12
                }
            }
        }
      });

      pass('with ({}) 12', Context.OptionsLoc | Context.OptionsRanges, {
        source: 'with ({}) 12',
        expected: {
          "type": "Program",
          "sourceType": "script",
          "body": [
              {
                  "type": "WithStatement",
                  "object": {
                      "type": "ObjectExpression",
                      "properties": [],
                      "start": 6,
                      "end": 8,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 6
                          },
                          "end": {
                              "line": 1,
                              "column": 8
                          }
                      }
                  },
                  "body": {
                      "type": "ExpressionStatement",
                      "expression": {
                          "type": "Literal",
                          "value": 12,
                          "start": 10,
                          "end": 12,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 10
                              },
                              "end": {
                                  "line": 1,
                                  "column": 12
                              }
                          }
                      },
                      "start": 10,
                      "end": 12,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 10
                          },
                          "end": {
                              "line": 1,
                              "column": 12
                          }
                      }
                  },
                  "start": 0,
                  "end": 12,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 12
                      }
                  }
              }
          ],
          "start": 0,
          "end": 12,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 12
              }
          }
      }
    });

    pass('with (x) foo;', Context.OptionsLoc | Context.OptionsRanges, {
      source: 'with (x) foo;',
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "WithStatement",
                "object": {
                    "type": "Identifier",
                    "name": "x",
                    "start": 6,
                    "end": 7,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 6
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                },
                "body": {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Identifier",
                        "name": "foo",
                        "start": 9,
                        "end": 12,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 9
                            },
                            "end": {
                                "line": 1,
                                "column": 12
                            }
                        }
                    },
                    "start": 9,
                    "end": 13,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 13
                        }
                    }
                },
                "start": 0,
                "end": 13,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 13
                    }
                }
            }
        ],
        "start": 0,
        "end": 13,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 13
            }
        }
    }
  });

  pass('with (x) { foo }', Context.OptionsLoc | Context.OptionsRanges, {
    source: 'with (x) { foo }',
    expected: {
      "type": "Program",
      "sourceType": "script",
      "body": [
          {
              "type": "WithStatement",
              "object": {
                  "type": "Identifier",
                  "name": "x",
                  "start": 6,
                  "end": 7,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 6
                      },
                      "end": {
                          "line": 1,
                          "column": 7
                      }
                  }
              },
              "body": {
                  "type": "BlockStatement",
                  "body": [
                      {
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "Identifier",
                              "name": "foo",
                              "start": 11,
                              "end": 14,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 11
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 14
                                  }
                              }
                          },
                          "start": 11,
                          "end": 14,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 11
                              },
                              "end": {
                                  "line": 1,
                                  "column": 14
                              }
                          }
                      }
                  ],
                  "start": 9,
                  "end": 16,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 9
                      },
                      "end": {
                          "line": 1,
                          "column": 16
                      }
                  }
              },
              "start": 0,
              "end": 16,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 16
                  }
              }
          }
      ],
      "start": 0,
      "end": 16,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 1,
              "column": 16
          }
      }
  }
});

  });
});
