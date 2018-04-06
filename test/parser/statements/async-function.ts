import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';

describe('Statements - Async function', () => {

  describe('Failures', () => {

  fail('async function fn() { var await; }', Context.Empty, {
      source: 'async function fn() { var await; }',
  });

  fail('async function fn() { var await; }', Context.Strict | Context.Module, {
    source: 'async function fn() { var await; }',
  });

  fail('async function fn() { var await; }', Context.Empty, {
    source: 'async function fn() {  void await; }',
  });

  fail('async function fn() { var await; }', Context.Empty, {
    source: 'async function fn() {  await: ; }',
  });

  fail('async function foo(x = 1){"use strict"}', Context.Empty, {
    source: 'async function foo(x = 1){"use strict"}',
  });
  fail('"use strict"; async function foo (arguments) {  }', Context.Empty, {
    source: '"use strict"; async function foo (arguments) {  }',
  });

  fail('async function a() { async function await() {} }', Context.Empty, {
    source: 'async function a() { async function await() {} }',
  });

  fail('async function foo (x = await) {  }', Context.Empty, {
    source: 'async function foo (x = await) {  }',
  });

  fail('async function foo (await) {  }', Context.Empty, {
     source: 'async function foo (await) {  }',
   });

  fail('"use strict"; async function arguments () {  }', Context.Empty, {
    source: '"use strict"; async function arguments () {  }',
  });

  fail('async function foo (foo) { super() };', Context.Empty, {
     source: 'async function foo (foo) { super() };',
   });

  fail('async function foo (foo) { super.prop };', Context.Empty, {
     source: 'async function foo (foo) { super.prop };',
   });

   // fail('"use strict"; async function foo(a, a) { }', Context.Empty, {
   //   source: '"use strict"; async function foo(a, a) { }',
   // });

  fail('"use strict"; async function foo (eval) {  }', Context.Empty, {
    source: '"use strict"; async function foo (eval) {  }',
  });

  fail('async function foo (foo = super()) { let bar; }', Context.Empty, {
     source: 'async function foo (foo = super()) { let bar; }',
   });

  //fail('\\u0061sync function f(){}', Context.Empty, {
    //source: '\\u0061sync function f(){}',
  //});

  fail('async function foo() { async function await() { } }', Context.Empty, {
      source: 'async function foo() { (async function await() { }) }',
    });

  fail('async function foo() { async function await() { } }', Context.Empty, {
    source: 'async function foo() { async function await() { } }',
  });

  fail('async({x=y})', Context.Empty, {
    source: 'async({x=y})',
  });

  fail(`async
  function asyncFn() { await 1; }`, Context.Empty, {
    source: `async
    function asyncFn() { await 1; }`,
  });

  fail(`async function f() {
    let
    await 0;
}`, Context.Empty, {
    source: `async function f() {
      let
      await 0;
  }`,
  });

  });

  describe('Pass', () => {

    pass(`async
    function asyncFn() { }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `async
      function asyncFn() { }`,
      expected: {
        type: 'Program',
        start: 0,
        end: 35,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 28
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 5,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 5
              }
            },
            expression: {
              type: 'Identifier',
              start: 0,
              end: 5,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 5
                }
              },
              name: 'async'
            }
          },
          {
            type: 'FunctionDeclaration',
            start: 13,
            end: 35,
            loc: {
              start: {
                line: 2,
                column: 6
              },
              end: {
                line: 2,
                column: 28
              }
            },
            id: {
              type: 'Identifier',
              start: 22,
              end: 29,
              loc: {
                start: {
                  line: 2,
                  column: 15
                },
                end: {
                  line: 2,
                  column: 22
                }
              },
              name: 'asyncFn'
            },
            generator: false,
            expression: false,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 32,
              end: 35,
              loc: {
                start: {
                  line: 2,
                  column: 25
                },
                end: {
                  line: 2,
                  column: 28
                }
              },
              body: []
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`async function foo(a, b) { await a };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `async function foo(a, b) { await a };`,
      expected: {
        type: 'Program',
        start: 0,
        end: 37,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 37
          }
        },
        body: [
          {
            type: 'FunctionDeclaration',
            start: 0,
            end: 36,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 36
              }
            },
            id: {
              type: 'Identifier',
              start: 15,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 18
                }
              },
              name: 'foo'
            },
            generator: false,
            expression: false,
            async: true,
            params: [
              {
                type: 'Identifier',
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
                name: 'a'
              },
              {
                type: 'Identifier',
                start: 22,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                },
                name: 'b'
              }
            ],
            body: {
              type: 'BlockStatement',
              start: 25,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 25
                },
                end: {
                  line: 1,
                  column: 36
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 27,
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 27
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  },
                  expression: {
                    type: 'AwaitExpression',
                    start: 27,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    argument: {
                      type: 'Identifier',
                      start: 33,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      },
                      name: 'a'
                    }
                  }
                }
              ]
            }
          },
          {
            type: 'EmptyStatement',
            start: 36,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 36
              },
              end: {
                line: 1,
                column: 37
              }
            }
          }
        ],
        sourceType: 'script'
      }
    });

    pass(`async function asyncFn() { await 1; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `async function asyncFn() { await 1; }`,
      expected: {
        type: 'Program',
        start: 0,
        end: 37,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 37
          }
        },
        body: [
          {
            type: 'FunctionDeclaration',
            start: 0,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 37
              }
            },
            id: {
              type: 'Identifier',
              start: 15,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 22
                }
              },
              name: 'asyncFn'
            },
            generator: false,
            expression: false,
            async: true,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 25,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 25
                },
                end: {
                  line: 1,
                  column: 37
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 27,
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 27
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  },
                  expression: {
                    type: 'AwaitExpression',
                    start: 27,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    argument: {
                      type: 'Literal',
                      start: 33,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      },
                      value: 1,
                      raw: '1'
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    });
 });
});