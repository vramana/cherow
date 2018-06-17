import * as t from 'assert';
import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser';

describe('Statements - Do while', () => {


  describe('Failure', () => {

    const invalidSyntax = [
        `do break; while 1;`,
        'do break; while 0;',
        'do break; while true;',
        `do break; while false;`,
        `do break; while '';`,
        `do break; while 'hood';`,
        'do async function f() {} while (false)',
        'do async function* g() {} while (false)',
        'do class C {} while (false)',
        'do const x = null; while (false)',
        'do function* g() {} while (false)',
        'do label1: label2: function f() {} while (false)',
        'do function f() {} while (false)',
        'do let x; while (false)',
        'while ( false ) Label: continue Label;',
        `while '' break;`,
        `while() {}`,
    ];

    for (const arg of invalidSyntax) {
        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }

  });

  describe('Pass', () => {
      // Testing both in sloppy mode and strict / module code
      const validSyntax = [
          `do{ break; } while(function __func(){return 0;});`,
          'do { __condition++; if (((""+__condition/2).split(".")).length>1) continue; __odds++;} while(__condition < 10)',
          'do { break; } while (false)',
          `do {
      var __in__do=1;
      if(__in__do)break;
  } while({});`,
      ];

      for (const arg of validSyntax) {
          it(`${arg}`, () => {
              t.doesNotThrow(() => {
                  parseSource(`${arg}`, undefined, Context.Empty);
              });
          });

          it(`${arg}`, () => {
              t.doesNotThrow(() => {
                  parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
              });
          });
      }

      pass(`do a(); while (true);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `do a(); while (true);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 21,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 21
                  }
              },
              body: [{
                  type: 'DoWhileStatement',
                  start: 0,
                  end: 21,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 21
                      }
                  },
                  body: {
                      type: 'ExpressionStatement',
                      start: 3,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 3
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      expression: {
                          type: 'CallExpression',
                          start: 3,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 3
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          },
                          callee: {
                              type: 'Identifier',
                              start: 3,
                              end: 4,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 3
                                  },
                                  end: {
                                      line: 1,
                                      column: 4
                                  }
                              },
                              name: 'a'
                          },
                          arguments: []
                      }
                  },
                  test: {
                      type: 'Literal',
                      start: 15,
                      end: 19,
                      loc: {
                          start: {
                              line: 1,
                              column: 15
                          },
                          end: {
                              line: 1,
                              column: 19
                          }
                      },
                      value: true,

                  }
              }],
              sourceType: 'script'
          }

      });

      pass('do foo; while (bar);', Context.Empty, {
          source: 'do foo; while (bar);',
          expected: {
              "body": [{
                  "body": {
                      "expression": {
                          "name": "foo",
                          "type": "Identifier",
                      },
                      "type": "ExpressionStatement",
                  },
                  "test": {
                      "name": "bar",
                      "type": "Identifier",
                  },
                  "type": "DoWhileStatement",
              }, ],
              "sourceType": "script",
              "type": "Program",
          }
      });

      // Note: This only get parsed in 'editor mode'
      pass('do foo; while (bar);', Context.OptionsEditorMode, {
          source: 'do function foo() {} while (bar);',
          expected: {
              "body": [{
                  "body": {
                      "async": false,
                      "body": {
                          "body": [],
                          "type": "BlockStatement",
                      },
                      "expression": false,
                      "generator": false,
                      "id": {
                          "name": "foo",
                          "type": "Identifier",
                      },
                      "params": [],
                      "type": "FunctionDeclaration",
                  },
                  "test": {
                      "name": "bar",
                      "type": "Identifier",
                  },
                  "type": "DoWhileStatement",
              }, ],
              "sourceType": "script",
              "type": "Program"
          }
      });


      pass(`do ; while (true)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `do ; while (true)`,
          expected: {
              type: 'Program',
              start: 0,
              end: 17,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 17
                  }
              },
              body: [{
                  type: 'DoWhileStatement',
                  start: 0,
                  end: 17,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 17
                      }
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 3,
                      end: 4,
                      loc: {
                          start: {
                              line: 1,
                              column: 3
                          },
                          end: {
                              line: 1,
                              column: 4
                          }
                      }
                  },
                  test: {
                      type: 'Literal',
                      start: 12,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 12
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      value: true,

                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`do continue; while(1);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `do continue; while(1);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 22,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 22
                  }
              },
              body: [{
                  type: 'DoWhileStatement',
                  start: 0,
                  end: 22,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 22
                      }
                  },
                  body: {
                      type: 'ContinueStatement',
                      start: 3,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 3
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      label: null
                  },
                  test: {
                      type: 'Literal',
                      start: 19,
                      end: 20,
                      loc: {
                          start: {
                              line: 1,
                              column: 19
                          },
                          end: {
                              line: 1,
                              column: 20
                          }
                      },
                      value: 1,
                      raw: '1'
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`do {} while (true)`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `do {} while (true)`,
          expected: {
              type: 'Program',
              start: 0,
              end: 18,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 18
                  }
              },
              body: [{
                  type: 'DoWhileStatement',
                  start: 0,
                  end: 18,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 18
                      }
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 3,
                      end: 5,
                      loc: {
                          start: {
                              line: 1,
                              column: 3
                          },
                          end: {
                              line: 1,
                              column: 5
                          }
                      },
                      body: []
                  },
                  test: {
                      type: 'Literal',
                      start: 13,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      value: true,

                  }
              }],
              sourceType: 'script'
          }

      });

      pass(`{do ; while(false); false}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `{do ; while(false); false}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 26,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 26
                  }
              },
              body: [{
                  type: 'BlockStatement',
                  start: 0,
                  end: 26,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 26
                      }
                  },
                  body: [{
                          type: 'DoWhileStatement',
                          start: 1,
                          end: 19,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 19
                              }
                          },
                          body: {
                              type: 'EmptyStatement',
                              start: 4,
                              end: 5,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 4
                                  },
                                  end: {
                                      line: 1,
                                      column: 5
                                  }
                              }
                          },
                          test: {
                              type: 'Literal',
                              start: 12,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              value: false,

                          }
                      },
                      {
                          type: 'ExpressionStatement',
                          start: 20,
                          end: 25,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 20
                              },
                              end: {
                                  line: 1,
                                  column: 25
                              }
                          },
                          expression: {
                              type: 'Literal',
                              start: 20,
                              end: 25,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 25
                                  }
                              },
                              value: false,

                          }
                      }
                  ]
              }],
              sourceType: 'script'
          }
      });

      pass(`{do ; while(false) false}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `{do ; while(false) false}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 25,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 25
                  }
              },
              body: [{
                  type: 'BlockStatement',
                  start: 0,
                  end: 25,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 25
                      }
                  },
                  body: [{
                          type: 'DoWhileStatement',
                          start: 1,
                          end: 18,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 18
                              }
                          },
                          body: {
                              type: 'EmptyStatement',
                              start: 4,
                              end: 5,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 4
                                  },
                                  end: {
                                      line: 1,
                                      column: 5
                                  }
                              }
                          },
                          test: {
                              type: 'Literal',
                              start: 12,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              value: false,

                          }
                      },
                      {
                          type: 'ExpressionStatement',
                          start: 19,
                          end: 24,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 19
                              },
                              end: {
                                  line: 1,
                                  column: 24
                              }
                          },
                          expression: {
                              type: 'Literal',
                              start: 19,
                              end: 24,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 19
                                  },
                                  end: {
                                      line: 1,
                                      column: 24
                                  }
                              },
                              value: false,

                          }
                      }
                  ]
              }],
              sourceType: 'script'
          }
      });
  });
});
