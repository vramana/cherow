import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/utilities';
import * as t from 'assert';
import { parse } from '../../../src/parser/parser';

describe('Statements - For in', () => {

  describe('Failure', () => {

      fail('for(const x = 4, y in [1,2,3]) {}', Context.Empty, {
          source: 'for(const x = 4, y in [1,2,3]) {}',
      });

      fail('for (this in {}) {};', Context.Empty, {
          source: 'for (this in {}) {}',
      });

      fail('for(const x,y of []) {}', Context.Empty, {
          source: 'for(const x,y in []) {}',
      });

      // fail('for ({...rest, b} in [{}]) ;', Context.Empty, {
      //  source: 'for ({...rest, b} in [{}]) ;',
      // });

      fail('for(x in {__arr;}){ break ; };', Context.Empty, {
          source: 'for(x in {__arr;}){ break ; };',
      });

      fail('for (var of [1, 2, 3]) {}', Context.Empty, {
          source: 'for (var of [1, 2, 3]) {}',
      });

      fail('for (var of [1, 2, 3]) {}', Context.Empty, {
          source: 'for (var of [1, 2, 3]) {}',
      });

      fail('for (var in {}) {}', Context.Empty, {
          source: 'for (var in {}) {}',
      });

      fail('for (let i = 1 in {}) {}', Context.Empty, {
          source: 'for (let i = 1 in {}) {}',
      });

      fail('for (let i = void 0 in [1, 2, 3]) {}', Context.Empty, {
          source: 'for (let i = void 0 in [1, 2, 3]) {}',
      });

      fail('for (const i = void 0 in [1, 2, 3]) {}', Context.Empty, {
          source: 'for (const i = void 0 in [1, 2, 3]) {}',
      });

      fail('"for (var i = void 0 in [1, 2, 3]) {}', Context.Empty, {
          source: '"for (var i = void 0 in [1, 2, 3]) {}',
      });

      fail('"use strict"; for (var i = 1 in {}) {}', Context.Empty, {
          source: '"use strict"; for (var i = 1 in {}) {}',
      });

      // fail('for (var i = yield in [1, 2, 3]) {}', Context.Empty, {
         //  source: 'for (var i = yield in [1, 2, 3]) {}',
      // });

      fail('function foo() { for (let i, j = 1 in {}) {} }', Context.Empty, {
          source: 'function foo() { for (let i, j = 1 in {}) {} }',
      });

      fail('function foo() { for (const i, j = void 0 in [1, 2, 3]) {} }', Context.Empty, {
          source: 'function foo() { for (const i, j = void 0 in [1, 2, 3]) {} }',
      });

      fail('for (x=0 in y);', Context.Empty, {
          source: 'for (x=0 in y);',
      });
      fail('for (var x = y = z in q);', Context.Empty, {
          source: 'for (var x = y = z in q);',
      });

      fail('for (x=0 in y);', Context.Empty, {
          source: 'for (x=0 in y);',
      });

      fail('for (var a = b = c = (d in e) in z);', Context.Empty, {
          source: 'for (var a = b = c = (d in e) in z);',
      });

      fail('"use strict"; for(var [,] = 0 in {});', Context.Empty, {
          source: '"use strict"; for(var [,] = 0 in {});',
      });

      fail('for(let ? b : c in 0);', Context.Empty, {
          source: 'for(let ? b : c in 0);',
      });

      fail('for (a 12 b; 12) break;', Context.Empty, {
          source: 'for (a 12 b; 12) break;',
      });

      fail('for (a in b 5', Context.Empty, {
          source: 'for (a in b 5',
      });

      fail('for (var a, b in e) break;', Context.Empty, {
          source: 'for (var a, b in e) break;',
      });

      fail('for (const x = 0 in {});', Context.Empty, {
        source: 'for (const x = 0 in {});',
    });

      fail('for (let x = 0 in {});', Context.Empty, {
        source: 'for (let x = 0 in {});',
    });

      fail('for (a=12 in e) break;', Context.Empty, {
          source: 'for (a=12 in e) break;',
      });

      // fail('for (var [arguments] = ({ get y(){} }) in y ) (x);', Context.Empty, {
         //  source: 'for (var [arguments] = ({ get y(){} }) in y ) (x);',
      // });

      // fail('for (var [x] = [] in null);', Context.Empty, {
         //  source: 'for (var [x] = [] in null);',
      // });

      fail('for (0 = 0 in {});', Context.Empty, {
          source: 'for (0 = 0 in {});',
      });

      fail('for (i++ = 0 in {});', Context.Empty, {
          source: 'for (i++ = 0 in {});',
      });

      fail('for(let a = 0 in b);', Context.Empty, {
          source: 'for(let a = 0 in b);',
      });

      fail('for(const a = 0 in b);', Context.Empty, {
          source: 'for(const a = 0 in b);',
      });

      fail('for(let ? b : c in 0);', Context.Empty, {
          source: 'for(let ? b : c in 0);',
      });

      fail('for(({a}) in 0);', Context.Empty, {
          source: 'for(({a}) in 0);',
      });

      fail('for(([a]) in 0);', Context.Empty, {
          source: 'for(([a]) in 0);',
      });

      fail('for(let ? b : c in 0);', Context.Empty, {
          source: 'for(let ? b : c in 0);',
      });

      fail('for (var i, j in {}) {}', Context.Empty, {
          source: 'for (var i, j in {}) {}',
      });

      fail('for (var i, j in [1, 2, 3]) {}', Context.Empty, {
          source: 'for (var i, j in [1, 2, 3]) {}',
      });

      fail('for (var i, j = 1 in {}) {}', Context.Empty, {
          source: 'for (var i, j = 1 in {}) {}',
      });

      fail('for (var i, j = void 0 in [1, 2, 3]) {}', Context.Empty, {
          source: 'for (var i, j = void 0 in [1, 2, 3]) {}',
      });

      fail('for (let i, j in {}) {}', Context.Empty, {
          source: 'for (let i, j in {}) {}',
      });

      fail('for (let i, j in [1, 2, 3]) {}', Context.Empty, {
          source: 'for (let i, j in [1, 2, 3]) {}',
      });

      fail('for (const i, j in [1, 2, 3]) {}', Context.Empty, {
          source: 'for (const i, j in [1, 2, 3]) {}',
      });

      fail('for (const i, j = 1 in {}) {}', Context.Empty, {
          source: 'for (const i, j = 1 in {}) {}',
      });

      fail('function foo() { for (var i, j of {}) {} }', Context.Empty, {
          source: 'function foo() { for (var i, j of {}) {} }',
      });

      fail('for (var i, j in [1, 2, 3]) {}', Context.Empty, {
          source: 'for (var i, j in [1, 2, 3]) {}',
      });

      fail('for (var i, j = 1 in {}) {}', Context.Empty, {
          source: 'for (var i, j = 1 in {}) {}',
      });

      fail('"use strict"; for ([ x = yield ] in [[]]) ;', Context.Empty, {
          source: '"use strict"; for ([ x = yield ] in [[]]) ;',
      });

      fail('for (var in {}) {}', Context.Empty, {
          source: 'for (var in {}) {}',
      });
      fail('for(([a]) in 0);', Context.Empty, {
          source: 'for(([a]) in 0);',
      });

      fail('for ([[(x, y)]] in [[[]]]) ;', Context.Empty, {
          source: 'for ([[(x, y)]] in [[[]]]) ;',
      });

      fail('"use strict"; for ([[x[yield]]] in [[[]]]) ;', Context.Empty, {
          source: '"use strict"; for ([[x[yield]]] in [[[]]]) ;',
      });

      fail('for ([{ get x() {} }] in [[{}]]) ;', Context.Empty, {
          source: 'for ([{ get x() {} }] in [[{}]]) ;',
      });

      fail('"use strict"; for ([{ x = yield }] in [[{}]]) ;', Context.Empty, {
          source: '"use strict"; for ([{ x = yield }] in [[{}]]) ;',
      });

      // fail('"use strict"; for ([arguments] in [[]]) ;', Context.Empty, {
      // source: '"use strict"; for ([arguments] in [[]]) ;',
      // });

      fail('"use strict"; for ([ x[yield] ] in [[]]) ;', Context.Empty, {
          source: '"use strict"; for ([ x[yield] ] in [[]]) ;',
      });

      fail('for ([...x, y] in [[]]) ;', Context.Empty, {
          source: 'for ([...x, y] in [[]]) ;',
      });

      fail('for ([...x,] in [[]]) ;', Context.Empty, {
          source: 'for ([...x,] in [[]]) ;',
      });

      fail('for ([...x, ...y] in [[]]) ;', Context.Empty, {
          source: 'for ([...x, ...y] in [[]]) ;',
      });

      fail('for ([...x,] in [[]]) ;', Context.Empty, {
          source: 'for ([...x,] in [[]]) ;',
      });

      // fail('for ([...x = 1] in [[]]) ;', Context.Empty, {
      //  source: 'for ([...x = 1] in [[]]) ;',
      // });

      fail('for ([...[(x, y)]] in [[[]]]) ;', Context.Empty, {
          source: 'for ([...[(x, y)]] in [[[]]]) ;',
      });

      fail('"use strict"; for ([...[x[yield]]] in [[]]) ;', Context.Empty, {
          source: '"use strict"; for ([...[x[yield]]] in [[]]) ;',
      });

      fail('for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty, {
          source: 'for ([...{ get x() {} }] in [[[]]]) ;',
      });

      fail('for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty, {
          source: 'for ([...{ get x() {} }] in [[[]]]) ;',
      });

      fail('for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty, {
          source: 'for ([...{ get x() {} }] in [[[]]]) ;',
      });

      fail('"use strict"; for ([...{ x = yield }] in [[{}]]) ;', Context.Empty, {
          source: '"use strict"; for ([...{ x = yield }] in [[{}]]) ;',
      });

      fail('for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty, {
          source: 'for ([...{ get x() {} }] in [[[]]]) ;',
      });

      // fail('for ({ yield } in [{}]) ;', Context.Empty, {
      // source: 'for ({ yield } in [{}]) ;',
      // });

      // fail('"use strict"; for ({ yield } in [{}]) ;', Context.Empty, {
      // source: 'for ({ yield } in [{}]) ;',
      // });

      //fail('"use strict"; for ({ eval = 0 } in [{}]) ;', Context.Empty, {
      //    source: '"use strict"; for ({ eval = 0 } in [{}]) ;',
      //});

      fail('"use strict"; for ({ x = yield } in [{}]) ;', Context.Empty, {
          source: '"use strict"; for ({ x = yield } in [{}]) ;',
      });

      fail('for (const x in {}) label1: label2: function f() {}', Context.Empty, {
          source: 'for (const x in {}) label1: label2: function f() {}',
      });

      fail('for (let x in {}) label1: label2: function f() {}', Context.Empty, {
          source: 'for (let x in {}) label1: label2: function f() {}',
      });

      fail('for (x in {}) label1: label2: function f() {}', Context.Empty, {
          source: 'for (x in {}) label1: label2: function f() {}',
      });

      /*fail(`for (var x in null) let // ASI
{}`, Context.Empty, {
          source: `for (var x in null) let // ASI
  {}`,
      }); */
  });

  describe('Pass', () => {

        const programs: any = [
            'for(x in {}, {}) {}',
            'for(var x in {}, {}) {}',
            'for(let x in {}, {}) {}',
            'for(const x in {}, {}) {}',
            'for(const x in [1,2,3]) {}',
            'for(const x = 1; ; ) {}',
            'for([{a=0}] in b);',
            'for({0: a = 1} in []) {}',
            'for(let [a] in []) {}',
            'for(let [a = 1] in []) {}',
            'for(let [a = 1, ...b] in []) {}',
            'for(let {a} in []) {}',
            'for(const {a} in []){}',
            'for(const {a: a} in []){}',
            'for(const {\'a\': a} in []){}',
            'for(const {"a": a} in []){}',
            'for(const {[Symbol.iterator]: a} in []){}',
            'for([a = 1, ...b] in []){}',
            'for({a} in []){}',
            'for({a: a} in []){}',
            'for({\'a\': a} in []){}',
            'for({"a": a} in []){}',
            'for({[Symbol.iterator]: a} in []){}',
            'for({0: a} in []){}',
            'for({a = 1} in []){}',
            'for ({j} in x) { foo = j }',
            'for ({j} in x) { var [foo] = [j] }',
            'for ({j} in x) { const foo = j }',
            'for (var j in x) { const foo = j }',
            'for (var {j} in x) { let [foo] = [j] }',
            'for (var {j} in x) { function foo() {return j} }',
            'for (let {j} in x) { var foo = j }',
            'for (let {j} in x) { let foo = j }',
            'for (const j in x) { let [foo] = [j] }',
            'for (const {j} in x) { let [foo] = [j] }',
            'for (const {j} in x) { function foo() {return j} }',
        ];

        for (const arg of programs) {
            it(`"use strict"; ${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`"use strict"; ${arg}`, undefined, Context.Empty);
                });
            });

            it(`function foo(){ 'use strict'; ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parse(`function foo(){ 'use strict'; ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg}`, undefined, Context.Empty);
                });
            });

            it(`${arg} ${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`${arg} ${arg}`, undefined, Context.Empty);
                });
            });

            it(`async(); ${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`async(); ${arg}`, undefined, Context.Empty);
                });
            });

            it(`function foo() { ${arg} }`, () => {
                t.doesNotThrow(() => {
                    parse(`function foo() { ${arg} }`, undefined, Context.Empty);
                });
            });

            it(`if (true) { ${arg} } else ${arg}`, () => {
                t.doesNotThrow(() => {
                    parse(`if (true) { ${arg} } else ${arg}`, undefined, Context.Empty);
                });
            });
        }

        pass(`for ([arguments] in [[]]) ;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for ([arguments] in [[]]) ;`,
          expected: {
              type: 'Program',
              start: 0,
              end: 27,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 27
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 27,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 27
                      }
                  },
                  left: {
                      type: 'ArrayPattern',
                      start: 5,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      elements: [{
                          type: 'Identifier',
                          start: 6,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 6
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          name: 'arguments'
                      }]
                  },
                  right: {
                      type: 'ArrayExpression',
                      start: 20,
                      end: 24,
                      loc: {
                          start: {
                              line: 1,
                              column: 20
                          },
                          end: {
                              line: 1,
                              column: 24
                          }
                      },
                      elements: [{
                          type: 'ArrayExpression',
                          start: 21,
                          end: 23,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 21
                              },
                              end: {
                                  line: 1,
                                  column: 23
                              }
                          },
                          elements: []
                      }]
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 26,
                      end: 27,
                      loc: {
                          start: {
                              line: 1,
                              column: 26
                          },
                          end: {
                              line: 1,
                              column: 27
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for (let x in null, { key: 0 }) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (let x in null, { key: 0 }) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 34,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 34
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 34,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 34
                      }
                  },
                  left: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 10,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 10
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          id: {
                              type: 'Identifier',
                              start: 9,
                              end: 10,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 10
                                  }
                              },
                              name: 'x'
                          },
                          init: null
                      }],
                      kind: 'let'
                  },
                  right: {
                      type: 'SequenceExpression',
                      start: 14,
                      end: 30,
                      loc: {
                          start: {
                              line: 1,
                              column: 14
                          },
                          end: {
                              line: 1,
                              column: 30
                          }
                      },
                      expressions: [{
                              type: 'Literal',
                              start: 14,
                              end: 18,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 14
                                  },
                                  end: {
                                      line: 1,
                                      column: 18
                                  }
                              },
                              value: null,
                              raw: 'null'
                          },
                          {
                              type: 'ObjectExpression',
                              start: 20,
                              end: 30,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 30
                                  }
                              },
                              properties: [{
                                  type: 'Property',
                                  start: 22,
                                  end: 28,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 22
                                      },
                                      end: {
                                          line: 1,
                                          column: 28
                                      }
                                  },
                                  method: false,
                                  shorthand: false,
                                  computed: false,
                                  key: {
                                      type: 'Identifier',
                                      start: 22,
                                      end: 25,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 22
                                          },
                                          end: {
                                              line: 1,
                                              column: 25
                                          }
                                      },
                                      name: 'key'
                                  },
                                  value: {
                                      type: 'Literal',
                                      start: 27,
                                      end: 28,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 27
                                          },
                                          end: {
                                              line: 1,
                                              column: 28
                                          }
                                      },
                                      value: 0,
                                      raw: '0'
                                  },
                                  kind: 'init'
                              }]
                          }
                      ]
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 32,
                      end: 34,
                      loc: {
                          start: {
                              line: 1,
                              column: 32
                          },
                          end: {
                              line: 1,
                              column: 34
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for([{a=0}] in b);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for([{a=0}] in b);`,
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
                  type: 'ForInStatement',
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
                  left: {
                      type: 'ArrayPattern',
                      start: 4,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      elements: [{
                          type: 'ObjectPattern',
                          start: 5,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 6,
                              end: 9,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 6
                                  },
                                  end: {
                                      line: 1,
                                      column: 9
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 6,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 6
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  },
                                  name: 'a'
                              },
                              kind: 'init',
                              value: {
                                  type: 'AssignmentPattern',
                                  start: 6,
                                  end: 9,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 6
                                      },
                                      end: {
                                          line: 1,
                                          column: 9
                                      }
                                  },
                                  left: {
                                      type: 'Identifier',
                                      start: 6,
                                      end: 7,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 6
                                          },
                                          end: {
                                              line: 1,
                                              column: 7
                                          }
                                      },
                                      name: 'a'
                                  },
                                  right: {
                                      type: 'Literal',
                                      start: 8,
                                      end: 9,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 8
                                          },
                                          end: {
                                              line: 1,
                                              column: 9
                                          }
                                      },
                                      value: 0,
                                      raw: '0'
                                  }
                              }
                          }]
                      }]
                  },
                  right: {
                      type: 'Identifier',
                      start: 15,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 15
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      name: 'b'
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 17,
                      end: 18,
                      loc: {
                          start: {
                              line: 1,
                              column: 17
                          },
                          end: {
                              line: 1,
                              column: 18
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for([{a=0}] in b);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for([{a=0}] in b);`,
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
                  type: 'ForInStatement',
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
                  left: {
                      type: 'ArrayPattern',
                      start: 4,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      elements: [{
                          type: 'ObjectPattern',
                          start: 5,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 6,
                              end: 9,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 6
                                  },
                                  end: {
                                      line: 1,
                                      column: 9
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 6,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 6
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  },
                                  name: 'a'
                              },
                              kind: 'init',
                              value: {
                                  type: 'AssignmentPattern',
                                  start: 6,
                                  end: 9,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 6
                                      },
                                      end: {
                                          line: 1,
                                          column: 9
                                      }
                                  },
                                  left: {
                                      type: 'Identifier',
                                      start: 6,
                                      end: 7,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 6
                                          },
                                          end: {
                                              line: 1,
                                              column: 7
                                          }
                                      },
                                      name: 'a'
                                  },
                                  right: {
                                      type: 'Literal',
                                      start: 8,
                                      end: 9,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 8
                                          },
                                          end: {
                                              line: 1,
                                              column: 9
                                          }
                                      },
                                      value: 0,
                                      raw: '0'
                                  }
                              }
                          }]
                      }]
                  },
                  right: {
                      type: 'Identifier',
                      start: 15,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 15
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      name: 'b'
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 17,
                      end: 18,
                      loc: {
                          start: {
                              line: 1,
                              column: 17
                          },
                          end: {
                              line: 1,
                              column: 18
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for(var a in b, c);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(var a in b, c);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 19,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 19
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 19,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 19
                      }
                  },
                  left: {
                      type: 'VariableDeclaration',
                      start: 4,
                      end: 9,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 9
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 8,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          id: {
                              type: 'Identifier',
                              start: 8,
                              end: 9,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 8
                                  },
                                  end: {
                                      line: 1,
                                      column: 9
                                  }
                              },
                              name: 'a'
                          },
                          init: null
                      }],
                      kind: 'var'
                  },
                  right: {
                      type: 'SequenceExpression',
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
                      expressions: [{
                              type: 'Identifier',
                              start: 13,
                              end: 14,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 13
                                  },
                                  end: {
                                      line: 1,
                                      column: 14
                                  }
                              },
                              name: 'b'
                          },
                          {
                              type: 'Identifier',
                              start: 16,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              name: 'c'
                          }
                      ]
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 18,
                      end: 19,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 19
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for(a in b, c);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(a in b, c);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 15,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 15
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 15,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 15
                      }
                  },
                  left: {
                      type: 'Identifier',
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
                      },
                      name: 'a'
                  },
                  right: {
                      type: 'SequenceExpression',
                      start: 9,
                      end: 13,
                      loc: {
                          start: {
                              line: 1,
                              column: 9
                          },
                          end: {
                              line: 1,
                              column: 13
                          }
                      },
                      expressions: [{
                              type: 'Identifier',
                              start: 9,
                              end: 10,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 10
                                  }
                              },
                              name: 'b'
                          },
                          {
                              type: 'Identifier',
                              start: 12,
                              end: 13,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 13
                                  }
                              },
                              name: 'c'
                          }
                      ]
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 14,
                      end: 15,
                      loc: {
                          start: {
                              line: 1,
                              column: 14
                          },
                          end: {
                              line: 1,
                              column: 15
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for ([...{ x = yield }] in [[{}]]) ;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for ([...{ x = yield }] in [[{}]]) ;`,
          expected: {
              type: 'Program',
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
              body: [{
                  type: 'ForInStatement',
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
                  left: {
                      type: 'ArrayPattern',
                      start: 5,
                      end: 23,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 23
                          }
                      },
                      elements: [{
                          type: 'RestElement',
                          start: 6,
                          end: 22,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 6
                              },
                              end: {
                                  line: 1,
                                  column: 22
                              }
                          },
                          argument: {
                              type: 'ObjectPattern',
                              start: 9,
                              end: 22,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 22
                                  }
                              },
                              properties: [{
                                  type: 'Property',
                                  start: 11,
                                  end: 20,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 11
                                      },
                                      end: {
                                          line: 1,
                                          column: 20
                                      }
                                  },
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
                                      type: 'Identifier',
                                      start: 11,
                                      end: 12,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 11
                                          },
                                          end: {
                                              line: 1,
                                              column: 12
                                          }
                                      },
                                      name: 'x'
                                  },
                                  kind: 'init',
                                  value: {
                                      type: 'AssignmentPattern',
                                      start: 11,
                                      end: 20,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 11
                                          },
                                          end: {
                                              line: 1,
                                              column: 20
                                          }
                                      },
                                      left: {
                                          type: 'Identifier',
                                          start: 11,
                                          end: 12,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 11
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 12
                                              }
                                          },
                                          name: 'x'
                                      },
                                      right: {
                                          type: 'Identifier',
                                          start: 15,
                                          end: 20,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 15
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 20
                                              }
                                          },
                                          name: 'yield'
                                      }
                                  }
                              }]
                          }
                      }]
                  },
                  right: {
                      type: 'ArrayExpression',
                      start: 27,
                      end: 33,
                      loc: {
                          start: {
                              line: 1,
                              column: 27
                          },
                          end: {
                              line: 1,
                              column: 33
                          }
                      },
                      elements: [{
                          type: 'ArrayExpression',
                          start: 28,
                          end: 32,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 28
                              },
                              end: {
                                  line: 1,
                                  column: 32
                              }
                          },
                          elements: [{
                              type: 'ObjectExpression',
                              start: 29,
                              end: 31,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 29
                                  },
                                  end: {
                                      line: 1,
                                      column: 31
                                  }
                              },
                              properties: []
                          }]
                      }]
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 35,
                      end: 36,
                      loc: {
                          start: {
                              line: 1,
                              column: 35
                          },
                          end: {
                              line: 1,
                              column: 36
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for ( [let][1] in obj ) ;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for ( [let][1] in obj ) ;`,
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
                  type: 'ForInStatement',
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
                  left: {
                      type: 'MemberExpression',
                      start: 6,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 6
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      object: {
                          type: 'ArrayExpression',
                          start: 6,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 6
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          elements: [{
                              type: 'Identifier',
                              start: 7,
                              end: 10,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 7
                                  },
                                  end: {
                                      line: 1,
                                      column: 10
                                  }
                              },
                              name: 'let'
                          }]
                      },
                      property: {
                          type: 'Literal',
                          start: 12,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 12
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          value: 1,
                          raw: '1'
                      },
                      computed: true
                  },
                  right: {
                      type: 'Identifier',
                      start: 18,
                      end: 21,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 21
                          }
                      },
                      name: 'obj'
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 24,
                      end: 25,
                      loc: {
                          start: {
                              line: 1,
                              column: 24
                          },
                          end: {
                              line: 1,
                              column: 25
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for ((x) in { attr: null }) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for ((x) in { attr: null }) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 30,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 30
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 30,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 30
                      }
                  },
                  left: {
                      type: 'Identifier',
                      start: 6,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 6
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      name: 'x'
                  },
                  right: {
                      type: 'ObjectExpression',
                      start: 12,
                      end: 26,
                      loc: {
                          start: {
                              line: 1,
                              column: 12
                          },
                          end: {
                              line: 1,
                              column: 26
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 14,
                          end: 24,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 24
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              start: 14,
                              end: 18,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 14
                                  },
                                  end: {
                                      line: 1,
                                      column: 18
                                  }
                              },
                              name: 'attr'
                          },
                          value: {
                              type: 'Literal',
                              start: 20,
                              end: 24,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 24
                                  }
                              },
                              value: null,
                              raw: 'null'
                          },
                          kind: 'init'
                      }]
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 28,
                      end: 30,
                      loc: {
                          start: {
                              line: 1,
                              column: 28
                          },
                          end: {
                              line: 1,
                              column: 30
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for (x in null, { key: 0 }) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (x in null, { key: 0 }) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 30,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 30
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 30,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 30
                      }
                  },
                  left: {
                      type: 'Identifier',
                      start: 5,
                      end: 6,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 6
                          }
                      },
                      name: 'x'
                  },
                  right: {
                      type: 'SequenceExpression',
                      start: 10,
                      end: 26,
                      loc: {
                          start: {
                              line: 1,
                              column: 10
                          },
                          end: {
                              line: 1,
                              column: 26
                          }
                      },
                      expressions: [{
                              type: 'Literal',
                              start: 10,
                              end: 14,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 10
                                  },
                                  end: {
                                      line: 1,
                                      column: 14
                                  }
                              },
                              value: null,
                              raw: 'null'
                          },
                          {
                              type: 'ObjectExpression',
                              start: 16,
                              end: 26,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 26
                                  }
                              },
                              properties: [{
                                  type: 'Property',
                                  start: 18,
                                  end: 24,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 18
                                      },
                                      end: {
                                          line: 1,
                                          column: 24
                                      }
                                  },
                                  method: false,
                                  shorthand: false,
                                  computed: false,
                                  key: {
                                      type: 'Identifier',
                                      start: 18,
                                      end: 21,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 18
                                          },
                                          end: {
                                              line: 1,
                                              column: 21
                                          }
                                      },
                                      name: 'key'
                                  },
                                  value: {
                                      type: 'Literal',
                                      start: 23,
                                      end: 24,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 23
                                          },
                                          end: {
                                              line: 1,
                                              column: 24
                                          }
                                      },
                                      value: 0,
                                      raw: '0'
                                  },
                                  kind: 'init'
                              }]
                          }
                      ]
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 28,
                      end: 30,
                      loc: {
                          start: {
                              line: 1,
                              column: 28
                          },
                          end: {
                              line: 1,
                              column: 30
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`2; for (var b in { x: 0 }) { 3; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `2; for (var b in { x: 0 }) { 3; }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 33,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 33
                  }
              },
              body: [{
                      type: 'ExpressionStatement',
                      start: 0,
                      end: 2,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 2
                          }
                      },
                      expression: {
                          type: 'Literal',
                          start: 0,
                          end: 1,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 1
                              }
                          },
                          value: 2,
                          raw: '2'
                      }
                  },
                  {
                      type: 'ForInStatement',
                      start: 3,
                      end: 33,
                      loc: {
                          start: {
                              line: 1,
                              column: 3
                          },
                          end: {
                              line: 1,
                              column: 33
                          }
                      },
                      left: {
                          type: 'VariableDeclaration',
                          start: 8,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
                              start: 12,
                              end: 13,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 12
                                  },
                                  end: {
                                      line: 1,
                                      column: 13
                                  }
                              },
                              id: {
                                  type: 'Identifier',
                                  start: 12,
                                  end: 13,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 12
                                      },
                                      end: {
                                          line: 1,
                                          column: 13
                                      }
                                  },
                                  name: 'b'
                              },
                              init: null
                          }],
                          kind: 'var'
                      },
                      right: {
                          type: 'ObjectExpression',
                          start: 17,
                          end: 25,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 17
                              },
                              end: {
                                  line: 1,
                                  column: 25
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 19,
                              end: 23,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 19
                                  },
                                  end: {
                                      line: 1,
                                      column: 23
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
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
                                  name: 'x'
                              },
                              value: {
                                  type: 'Literal',
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
                                  value: 0,
                                  raw: '0'
                              },
                              kind: 'init'
                          }]
                      },
                      body: {
                          type: 'BlockStatement',
                          start: 27,
                          end: 33,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 27
                              },
                              end: {
                                  line: 1,
                                  column: 33
                              }
                          },
                          body: [{
                              type: 'ExpressionStatement',
                              start: 29,
                              end: 31,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 29
                                  },
                                  end: {
                                      line: 1,
                                      column: 31
                                  }
                              },
                              expression: {
                                  type: 'Literal',
                                  start: 29,
                                  end: 30,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 29
                                      },
                                      end: {
                                          line: 1,
                                          column: 30
                                      }
                                  },
                                  value: 3,
                                  raw: '3'
                              }
                          }]
                      }
                  }
              ],
              sourceType: 'script'
          }
      });

        pass(`for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
          if (p === "prop1") {
              countProp1++;
          }
          if (p === "prop2") {
              countProp2++;
          }
          if (p === "prop3") {
              countProp3++;
          }
      }
  }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (var p in obj) {
          if (obj.hasOwnProperty(p)) {
              if (p === "prop1") {
                  countProp1++;
              }
              if (p === "prop2") {
                  countProp2++;
              }
              if (p === "prop3") {
                  countProp3++;
              }
          }
      }`,
          expected: {
            type: 'Program',
            start: 0,
            end: 328,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 13,
                column: 7
              }
            },
            body: [
              {
                type: 'ForInStatement',
                start: 0,
                end: 328,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 13,
                    column: 7
                  }
                },
                left: {
                  type: 'VariableDeclaration',
                  start: 5,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 10
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 9,
                      end: 10,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 10
                        }
                      },
                      id: {
                        type: 'Identifier',
                        start: 9,
                        end: 10,
                        loc: {
                          start: {
                            line: 1,
                            column: 9
                          },
                          end: {
                            line: 1,
                            column: 10
                          }
                        },
                        name: 'p'
                      },
                      init: null
                    }
                  ],
                  kind: 'var'
                },
                right: {
                  type: 'Identifier',
                  start: 14,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  },
                  name: 'obj'
                },
                body: {
                  type: 'BlockStatement',
                  start: 19,
                  end: 328,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 13,
                      column: 7
                    }
                  },
                  body: [
                    {
                      type: 'IfStatement',
                      start: 31,
                      end: 320,
                      loc: {
                        start: {
                          line: 2,
                          column: 10
                        },
                        end: {
                          line: 12,
                          column: 11
                        }
                      },
                      test: {
                        type: 'CallExpression',
                        start: 35,
                        end: 56,
                        loc: {
                          start: {
                            line: 2,
                            column: 14
                          },
                          end: {
                            line: 2,
                            column: 35
                          }
                        },
                        callee: {
                          type: 'MemberExpression',
                          start: 35,
                          end: 53,
                          loc: {
                            start: {
                              line: 2,
                              column: 14
                            },
                            end: {
                              line: 2,
                              column: 32
                            }
                          },
                          object: {
                            type: 'Identifier',
                            start: 35,
                            end: 38,
                            loc: {
                              start: {
                                line: 2,
                                column: 14
                              },
                              end: {
                                line: 2,
                                column: 17
                              }
                            },
                            name: 'obj'
                          },
                          property: {
                            type: 'Identifier',
                            start: 39,
                            end: 53,
                            loc: {
                              start: {
                                line: 2,
                                column: 18
                              },
                              end: {
                                line: 2,
                                column: 32
                              }
                            },
                            name: 'hasOwnProperty'
                          },
                          computed: false
                        },
                        arguments: [
                          {
                            type: 'Identifier',
                            start: 54,
                            end: 55,
                            loc: {
                              start: {
                                line: 2,
                                column: 33
                              },
                              end: {
                                line: 2,
                                column: 34
                              }
                            },
                            name: 'p'
                          }
                        ]
                      },
                      consequent: {
                        type: 'BlockStatement',
                        start: 58,
                        end: 320,
                        loc: {
                          start: {
                            line: 2,
                            column: 37
                          },
                          end: {
                            line: 12,
                            column: 11
                          }
                        },
                        body: [
                          {
                            type: 'IfStatement',
                            start: 74,
                            end: 142,
                            loc: {
                              start: {
                                line: 3,
                                column: 14
                              },
                              end: {
                                line: 5,
                                column: 15
                              }
                            },
                            test: {
                              type: 'BinaryExpression',
                              start: 78,
                              end: 91,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 18
                                },
                                end: {
                                  line: 3,
                                  column: 31
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 78,
                                end: 79,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 18
                                  },
                                  end: {
                                    line: 3,
                                    column: 19
                                  }
                                },
                                name: 'p'
                              },
                              operator: '===',
                              right: {
                                type: 'Literal',
                                start: 84,
                                end: 91,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 24
                                  },
                                  end: {
                                    line: 3,
                                    column: 31
                                  }
                                },
                                value: 'prop1',
                                raw: '"prop1"'
                              }
                            },
                            consequent: {
                              type: 'BlockStatement',
                              start: 93,
                              end: 142,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 33
                                },
                                end: {
                                  line: 5,
                                  column: 15
                                }
                              },
                              body: [
                                {
                                  type: 'ExpressionStatement',
                                  start: 113,
                                  end: 126,
                                  loc: {
                                    start: {
                                      line: 4,
                                      column: 18
                                    },
                                    end: {
                                      line: 4,
                                      column: 31
                                    }
                                  },
                                  expression: {
                                    type: 'UpdateExpression',
                                    start: 113,
                                    end: 125,
                                    loc: {
                                      start: {
                                        line: 4,
                                        column: 18
                                      },
                                      end: {
                                        line: 4,
                                        column: 30
                                      }
                                    },
                                    operator: '++',
                                    prefix: false,
                                    argument: {
                                      type: 'Identifier',
                                      start: 113,
                                      end: 123,
                                      loc: {
                                        start: {
                                          line: 4,
                                          column: 18
                                        },
                                        end: {
                                          line: 4,
                                          column: 28
                                        }
                                      },
                                      name: 'countProp1'
                                    }
                                  }
                                }
                              ]
                            },
                            alternate: null
                          },
                          {
                            type: 'IfStatement',
                            start: 157,
                            end: 225,
                            loc: {
                              start: {
                                line: 6,
                                column: 14
                              },
                              end: {
                                line: 8,
                                column: 15
                              }
                            },
                            test: {
                              type: 'BinaryExpression',
                              start: 161,
                              end: 174,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 18
                                },
                                end: {
                                  line: 6,
                                  column: 31
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 161,
                                end: 162,
                                loc: {
                                  start: {
                                    line: 6,
                                    column: 18
                                  },
                                  end: {
                                    line: 6,
                                    column: 19
                                  }
                                },
                                name: 'p'
                              },
                              operator: '===',
                              right: {
                                type: 'Literal',
                                start: 167,
                                end: 174,
                                loc: {
                                  start: {
                                    line: 6,
                                    column: 24
                                  },
                                  end: {
                                    line: 6,
                                    column: 31
                                  }
                                },
                                value: 'prop2',
                                raw: '"prop2"'
                              }
                            },
                            consequent: {
                              type: 'BlockStatement',
                              start: 176,
                              end: 225,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 33
                                },
                                end: {
                                  line: 8,
                                  column: 15
                                }
                              },
                              body: [
                                {
                                  type: 'ExpressionStatement',
                                  start: 196,
                                  end: 209,
                                  loc: {
                                    start: {
                                      line: 7,
                                      column: 18
                                    },
                                    end: {
                                      line: 7,
                                      column: 31
                                    }
                                  },
                                  expression: {
                                    type: 'UpdateExpression',
                                    start: 196,
                                    end: 208,
                                    loc: {
                                      start: {
                                        line: 7,
                                        column: 18
                                      },
                                      end: {
                                        line: 7,
                                        column: 30
                                      }
                                    },
                                    operator: '++',
                                    prefix: false,
                                    argument: {
                                      type: 'Identifier',
                                      start: 196,
                                      end: 206,
                                      loc: {
                                        start: {
                                          line: 7,
                                          column: 18
                                        },
                                        end: {
                                          line: 7,
                                          column: 28
                                        }
                                      },
                                      name: 'countProp2'
                                    }
                                  }
                                }
                              ]
                            },
                            alternate: null
                          },
                          {
                            type: 'IfStatement',
                            start: 240,
                            end: 308,
                            loc: {
                              start: {
                                line: 9,
                                column: 14
                              },
                              end: {
                                line: 11,
                                column: 15
                              }
                            },
                            test: {
                              type: 'BinaryExpression',
                              start: 244,
                              end: 257,
                              loc: {
                                start: {
                                  line: 9,
                                  column: 18
                                },
                                end: {
                                  line: 9,
                                  column: 31
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 244,
                                end: 245,
                                loc: {
                                  start: {
                                    line: 9,
                                    column: 18
                                  },
                                  end: {
                                    line: 9,
                                    column: 19
                                  }
                                },
                                name: 'p'
                              },
                              operator: '===',
                              right: {
                                type: 'Literal',
                                start: 250,
                                end: 257,
                                loc: {
                                  start: {
                                    line: 9,
                                    column: 24
                                  },
                                  end: {
                                    line: 9,
                                    column: 31
                                  }
                                },
                                value: 'prop3',
                                raw: '"prop3"'
                              }
                            },
                            consequent: {
                              type: 'BlockStatement',
                              start: 259,
                              end: 308,
                              loc: {
                                start: {
                                  line: 9,
                                  column: 33
                                },
                                end: {
                                  line: 11,
                                  column: 15
                                }
                              },
                              body: [
                                {
                                  type: 'ExpressionStatement',
                                  start: 279,
                                  end: 292,
                                  loc: {
                                    start: {
                                      line: 10,
                                      column: 18
                                    },
                                    end: {
                                      line: 10,
                                      column: 31
                                    }
                                  },
                                  expression: {
                                    type: 'UpdateExpression',
                                    start: 279,
                                    end: 291,
                                    loc: {
                                      start: {
                                        line: 10,
                                        column: 18
                                      },
                                      end: {
                                        line: 10,
                                        column: 30
                                      }
                                    },
                                    operator: '++',
                                    prefix: false,
                                    argument: {
                                      type: 'Identifier',
                                      start: 279,
                                      end: 289,
                                      loc: {
                                        start: {
                                          line: 10,
                                          column: 18
                                        },
                                        end: {
                                          line: 10,
                                          column: 28
                                        }
                                      },
                                      name: 'countProp3'
                                    }
                                  }
                                }
                              ]
                            },
                            alternate: null
                          }
                        ]
                      },
                      alternate: null
                    }
                  ]
                }
              }
            ],
            sourceType: 'script'
          }
      });
      /*
          pass(`for (var x in null) let // ASI
          {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for (var x in null) let // ASI
              {}`,
              expected: {}
          });*/
      /*
          pass(`for ( let in obj ) ;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
              source: `for ( let in obj ) ;`,
              expected: {}
          }); */

        pass(`for ( let[x] in obj ) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for ( let[x] in obj ) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 24,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 24
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 24,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 24
                      }
                  },
                  left: {
                      type: 'VariableDeclaration',
                      start: 6,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 6
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          id: {
                              type: 'ArrayPattern',
                              start: 9,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              },
                              elements: [{
                                  type: 'Identifier',
                                  start: 10,
                                  end: 11,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 10
                                      },
                                      end: {
                                          line: 1,
                                          column: 11
                                      }
                                  },
                                  name: 'x'
                              }]
                          },
                          init: null
                      }],
                      kind: 'let'
                  },
                  right: {
                      type: 'Identifier',
                      start: 16,
                      end: 19,
                      loc: {
                          start: {
                              line: 1,
                              column: 16
                          },
                          end: {
                              line: 1,
                              column: 19
                          }
                      },
                      name: 'obj'
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 22,
                      end: 24,
                      loc: {
                          start: {
                              line: 1,
                              column: 22
                          },
                          end: {
                              line: 1,
                              column: 24
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for (a(b in c)[0] in d);
  for (a(b in c)[0] in d);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (a(b in c)[0] in d);
      for (a(b in c)[0] in d);`,
          expected: {
            type: 'Program',
            start: 0,
            end: 55,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 2,
                column: 30
              }
            },
            body: [
              {
                type: 'ForInStatement',
                start: 0,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                },
                left: {
                  type: 'MemberExpression',
                  start: 5,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  },
                  object: {
                    type: 'CallExpression',
                    start: 5,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    },
                    callee: {
                      type: 'Identifier',
                      start: 5,
                      end: 6,
                      loc: {
                        start: {
                          line: 1,
                          column: 5
                        },
                        end: {
                          line: 1,
                          column: 6
                        }
                      },
                      name: 'a'
                    },
                    arguments: [
                      {
                        type: 'BinaryExpression',
                        start: 7,
                        end: 13,
                        loc: {
                          start: {
                            line: 1,
                            column: 7
                          },
                          end: {
                            line: 1,
                            column: 13
                          }
                        },
                        left: {
                          type: 'Identifier',
                          start: 7,
                          end: 8,
                          loc: {
                            start: {
                              line: 1,
                              column: 7
                            },
                            end: {
                              line: 1,
                              column: 8
                            }
                          },
                          name: 'b'
                        },
                        operator: 'in',
                        right: {
                          type: 'Identifier',
                          start: 12,
                          end: 13,
                          loc: {
                            start: {
                              line: 1,
                              column: 12
                            },
                            end: {
                              line: 1,
                              column: 13
                            }
                          },
                          name: 'c'
                        }
                      }
                    ]
                  },
                  property: {
                    type: 'Literal',
                    start: 15,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    },
                    value: 0,
                    raw: '0'
                  },
                  computed: true
                },
                right: {
                  type: 'Identifier',
                  start: 21,
                  end: 22,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 22
                    }
                  },
                  name: 'd'
                },
                body: {
                  type: 'EmptyStatement',
                  start: 23,
                  end: 24,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 24
                    }
                  }
                }
              },
              {
                type: 'ForInStatement',
                start: 31,
                end: 55,
                loc: {
                  start: {
                    line: 2,
                    column: 6
                  },
                  end: {
                    line: 2,
                    column: 30
                  }
                },
                left: {
                  type: 'MemberExpression',
                  start: 36,
                  end: 48,
                  loc: {
                    start: {
                      line: 2,
                      column: 11
                    },
                    end: {
                      line: 2,
                      column: 23
                    }
                  },
                  object: {
                    type: 'CallExpression',
                    start: 36,
                    end: 45,
                    loc: {
                      start: {
                        line: 2,
                        column: 11
                      },
                      end: {
                        line: 2,
                        column: 20
                      }
                    },
                    callee: {
                      type: 'Identifier',
                      start: 36,
                      end: 37,
                      loc: {
                        start: {
                          line: 2,
                          column: 11
                        },
                        end: {
                          line: 2,
                          column: 12
                        }
                      },
                      name: 'a'
                    },
                    arguments: [
                      {
                        type: 'BinaryExpression',
                        start: 38,
                        end: 44,
                        loc: {
                          start: {
                            line: 2,
                            column: 13
                          },
                          end: {
                            line: 2,
                            column: 19
                          }
                        },
                        left: {
                          type: 'Identifier',
                          start: 38,
                          end: 39,
                          loc: {
                            start: {
                              line: 2,
                              column: 13
                            },
                            end: {
                              line: 2,
                              column: 14
                            }
                          },
                          name: 'b'
                        },
                        operator: 'in',
                        right: {
                          type: 'Identifier',
                          start: 43,
                          end: 44,
                          loc: {
                            start: {
                              line: 2,
                              column: 18
                            },
                            end: {
                              line: 2,
                              column: 19
                            }
                          },
                          name: 'c'
                        }
                      }
                    ]
                  },
                  property: {
                    type: 'Literal',
                    start: 46,
                    end: 47,
                    loc: {
                      start: {
                        line: 2,
                        column: 21
                      },
                      end: {
                        line: 2,
                        column: 22
                      }
                    },
                    value: 0,
                    raw: '0'
                  },
                  computed: true
                },
                right: {
                  type: 'Identifier',
                  start: 52,
                  end: 53,
                  loc: {
                    start: {
                      line: 2,
                      column: 27
                    },
                    end: {
                      line: 2,
                      column: 28
                    }
                  },
                  name: 'd'
                },
                body: {
                  type: 'EmptyStatement',
                  start: 54,
                  end: 55,
                  loc: {
                    start: {
                      line: 2,
                      column: 29
                    },
                    end: {
                      line: 2,
                      column: 30
                    }
                  }
                }
              }
            ],
            sourceType: 'script'
          }
      });

        pass(`for (a.in in a);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (a.in in a);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 16,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 16
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 16,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 16
                      }
                  },
                  left: {
                      type: 'MemberExpression',
                      start: 5,
                      end: 9,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 9
                          }
                      },
                      object: {
                          type: 'Identifier',
                          start: 5,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          },
                          name: 'a'
                      },
                      property: {
                          type: 'Identifier',
                          start: 7,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 7
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          name: 'in'
                      },
                      computed: false
                  },
                  right: {
                      type: 'Identifier',
                      start: 13,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      name: 'a'
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 15,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 15
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for(let [a=b in c] in null);
  for(let [a=b in c] in null);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(let [a=b in c] in null);
      for(let [a=b in c] in null);`,
          expected: {
            type: 'Program',
            start: 0,
            end: 63,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 2,
                column: 34
              }
            },
            body: [
              {
                type: 'ForInStatement',
                start: 0,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                },
                left: {
                  type: 'VariableDeclaration',
                  start: 4,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 8,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      },
                      id: {
                        type: 'ArrayPattern',
                        start: 8,
                        end: 18,
                        loc: {
                          start: {
                            line: 1,
                            column: 8
                          },
                          end: {
                            line: 1,
                            column: 18
                          }
                        },
                        elements: [
                          {
                            type: 'AssignmentPattern',
                            start: 9,
                            end: 17,
                            loc: {
                              start: {
                                line: 1,
                                column: 9
                              },
                              end: {
                                line: 1,
                                column: 17
                              }
                            },
                            left: {
                              type: 'Identifier',
                              start: 9,
                              end: 10,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 9
                                },
                                end: {
                                  line: 1,
                                  column: 10
                                }
                              },
                              name: 'a'
                            },
                            right: {
                              type: 'BinaryExpression',
                              start: 11,
                              end: 17,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 11
                                },
                                end: {
                                  line: 1,
                                  column: 17
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 11,
                                end: 12,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 11
                                  },
                                  end: {
                                    line: 1,
                                    column: 12
                                  }
                                },
                                name: 'b'
                              },
                              operator: 'in',
                              right: {
                                type: 'Identifier',
                                start: 16,
                                end: 17,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 16
                                  },
                                  end: {
                                    line: 1,
                                    column: 17
                                  }
                                },
                                name: 'c'
                              }
                            }
                          }
                        ]
                      },
                      init: null
                    }
                  ],
                  kind: 'let'
                },
                right: {
                  type: 'Literal',
                  start: 22,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  },
                  value: null,
                  raw: 'null'
                },
                body: {
                  type: 'EmptyStatement',
                  start: 27,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 27
                    },
                    end: {
                      line: 1,
                      column: 28
                    }
                  }
                }
              },
              {
                type: 'ForInStatement',
                start: 35,
                end: 63,
                loc: {
                  start: {
                    line: 2,
                    column: 6
                  },
                  end: {
                    line: 2,
                    column: 34
                  }
                },
                left: {
                  type: 'VariableDeclaration',
                  start: 39,
                  end: 53,
                  loc: {
                    start: {
                      line: 2,
                      column: 10
                    },
                    end: {
                      line: 2,
                      column: 24
                    }
                  },
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      start: 43,
                      end: 53,
                      loc: {
                        start: {
                          line: 2,
                          column: 14
                        },
                        end: {
                          line: 2,
                          column: 24
                        }
                      },
                      id: {
                        type: 'ArrayPattern',
                        start: 43,
                        end: 53,
                        loc: {
                          start: {
                            line: 2,
                            column: 14
                          },
                          end: {
                            line: 2,
                            column: 24
                          }
                        },
                        elements: [
                          {
                            type: 'AssignmentPattern',
                            start: 44,
                            end: 52,
                            loc: {
                              start: {
                                line: 2,
                                column: 15
                              },
                              end: {
                                line: 2,
                                column: 23
                              }
                            },
                            left: {
                              type: 'Identifier',
                              start: 44,
                              end: 45,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 15
                                },
                                end: {
                                  line: 2,
                                  column: 16
                                }
                              },
                              name: 'a'
                            },
                            right: {
                              type: 'BinaryExpression',
                              start: 46,
                              end: 52,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 17
                                },
                                end: {
                                  line: 2,
                                  column: 23
                                }
                              },
                              left: {
                                type: 'Identifier',
                                start: 46,
                                end: 47,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 17
                                  },
                                  end: {
                                    line: 2,
                                    column: 18
                                  }
                                },
                                name: 'b'
                              },
                              operator: 'in',
                              right: {
                                type: 'Identifier',
                                start: 51,
                                end: 52,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 22
                                  },
                                  end: {
                                    line: 2,
                                    column: 23
                                  }
                                },
                                name: 'c'
                              }
                            }
                          }
                        ]
                      },
                      init: null
                    }
                  ],
                  kind: 'let'
                },
                right: {
                  type: 'Literal',
                  start: 57,
                  end: 61,
                  loc: {
                    start: {
                      line: 2,
                      column: 28
                    },
                    end: {
                      line: 2,
                      column: 32
                    }
                  },
                  value: null,
                  raw: 'null'
                },
                body: {
                  type: 'EmptyStatement',
                  start: 62,
                  end: 63,
                  loc: {
                    start: {
                      line: 2,
                      column: 33
                    },
                    end: {
                      line: 2,
                      column: 34
                    }
                  }
                }
              }
            ],
            sourceType: 'script'
          }
      });

        pass(`for(x in list) process(x);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(x in list) process(x);`,
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
                  type: 'ForInStatement',
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
                  left: {
                      type: 'Identifier',
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
                      },
                      name: 'x'
                  },
                  right: {
                      type: 'Identifier',
                      start: 9,
                      end: 13,
                      loc: {
                          start: {
                              line: 1,
                              column: 9
                          },
                          end: {
                              line: 1,
                              column: 13
                          }
                      },
                      name: 'list'
                  },
                  body: {
                      type: 'ExpressionStatement',
                      start: 15,
                      end: 26,
                      loc: {
                          start: {
                              line: 1,
                              column: 15
                          },
                          end: {
                              line: 1,
                              column: 26
                          }
                      },
                      expression: {
                          type: 'CallExpression',
                          start: 15,
                          end: 25,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 15
                              },
                              end: {
                                  line: 1,
                                  column: 25
                              }
                          },
                          callee: {
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
                              name: 'process'
                          },
                          arguments: [{
                              type: 'Identifier',
                              start: 23,
                              end: 24,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 23
                                  },
                                  end: {
                                      line: 1,
                                      column: 24
                                  }
                              },
                              name: 'x'
                          }]
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for (var x in list) process(x);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (var x in list) process(x);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 31,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 31
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 31,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 31
                      }
                  },
                  left: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 10,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 10
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          id: {
                              type: 'Identifier',
                              start: 9,
                              end: 10,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 10
                                  }
                              },
                              name: 'x'
                          },
                          init: null
                      }],
                      kind: 'var'
                  },
                  right: {
                      type: 'Identifier',
                      start: 14,
                      end: 18,
                      loc: {
                          start: {
                              line: 1,
                              column: 14
                          },
                          end: {
                              line: 1,
                              column: 18
                          }
                      },
                      name: 'list'
                  },
                  body: {
                      type: 'ExpressionStatement',
                      start: 20,
                      end: 31,
                      loc: {
                          start: {
                              line: 1,
                              column: 20
                          },
                          end: {
                              line: 1,
                              column: 31
                          }
                      },
                      expression: {
                          type: 'CallExpression',
                          start: 20,
                          end: 30,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 20
                              },
                              end: {
                                  line: 1,
                                  column: 30
                              }
                          },
                          callee: {
                              type: 'Identifier',
                              start: 20,
                              end: 27,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 27
                                  }
                              },
                              name: 'process'
                          },
                          arguments: [{
                              type: 'Identifier',
                              start: 28,
                              end: 29,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 28
                                  },
                                  end: {
                                      line: 1,
                                      column: 29
                                  }
                              },
                              name: 'x'
                          }]
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for(var a in b);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(var a in b);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 16,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 16
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 16,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 16
                      }
                  },
                  left: {
                      type: 'VariableDeclaration',
                      start: 4,
                      end: 9,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 9
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 8,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          id: {
                              type: 'Identifier',
                              start: 8,
                              end: 9,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 8
                                  },
                                  end: {
                                      line: 1,
                                      column: 9
                                  }
                              },
                              name: 'a'
                          },
                          init: null
                      }],
                      kind: 'var'
                  },
                  right: {
                      type: 'Identifier',
                      start: 13,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      name: 'b'
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 15,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 15
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for(a in b);;`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(a in b);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 12,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 12
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 12
                      }
                  },
                  left: {
                      type: 'Identifier',
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
                      },
                      name: 'a'
                  },
                  right: {
                      type: 'Identifier',
                      start: 9,
                      end: 10,
                      loc: {
                          start: {
                              line: 1,
                              column: 9
                          },
                          end: {
                              line: 1,
                              column: 10
                          }
                      },
                      name: 'b'
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 11,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 11
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for(a.b in c);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(a.b in c);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 14
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 14,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 14
                      }
                  },
                  left: {
                      type: 'MemberExpression',
                      start: 4,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      object: {
                          type: 'Identifier',
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
                          },
                          name: 'a'
                      },
                      property: {
                          type: 'Identifier',
                          start: 6,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 6
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          name: 'b'
                      },
                      computed: false
                  },
                  right: {
                      type: 'Identifier',
                      start: 11,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 11
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      name: 'c'
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 13,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for(let of in of);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(let of in of);`,
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
                  type: 'ForInStatement',
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
                  left: {
                      type: 'VariableDeclaration',
                      start: 4,
                      end: 10,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 10
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 8,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          id: {
                              type: 'Identifier',
                              start: 8,
                              end: 10,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 8
                                  },
                                  end: {
                                      line: 1,
                                      column: 10
                                  }
                              },
                              name: 'of'
                          },
                          init: null
                      }],
                      kind: 'let'
                  },
                  right: {
                      type: 'Identifier',
                      start: 14,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 14
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      name: 'of'
                  },
                  body: {
                      type: 'EmptyStatement',
                      start: 17,
                      end: 18,
                      loc: {
                          start: {
                              line: 1,
                              column: 17
                          },
                          end: {
                              line: 1,
                              column: 18
                          }
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for ([x] in {ab: a}) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for ([x] in {ab: a}) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 23,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 23
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 23,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 23
                      }
                  },
                  left: {
                      type: 'ArrayPattern',
                      start: 5,
                      end: 8,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 8
                          }
                      },
                      elements: [{
                          type: 'Identifier',
                          start: 6,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 6
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          name: 'x'
                      }]
                  },
                  right: {
                      type: 'ObjectExpression',
                      start: 12,
                      end: 19,
                      loc: {
                          start: {
                              line: 1,
                              column: 12
                          },
                          end: {
                              line: 1,
                              column: 19
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 13,
                          end: 18,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 13
                              },
                              end: {
                                  line: 1,
                                  column: 18
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              start: 13,
                              end: 15,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 13
                                  },
                                  end: {
                                      line: 1,
                                      column: 15
                                  }
                              },
                              name: 'ab'
                          },
                          value: {
                              type: 'Identifier',
                              start: 17,
                              end: 18,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 17
                                  },
                                  end: {
                                      line: 1,
                                      column: 18
                                  }
                              },
                              name: 'a'
                          },
                          kind: 'init'
                      }]
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 21,
                      end: 23,
                      loc: {
                          start: {
                              line: 1,
                              column: 21
                          },
                          end: {
                              line: 1,
                              column: 23
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for ([...x] in {ab: a}) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for ([...x] in {ab: a}) {}`,
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
                  type: 'ForInStatement',
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
                  left: {
                      type: 'ArrayPattern',
                      start: 5,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      elements: [{
                          type: 'RestElement',
                          start: 6,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 6
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          argument: {
                              type: 'Identifier',
                              start: 9,
                              end: 10,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 10
                                  }
                              },
                              name: 'x'
                          }
                      }]
                  },
                  right: {
                      type: 'ObjectExpression',
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
                      properties: [{
                          type: 'Property',
                          start: 16,
                          end: 21,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 16
                              },
                              end: {
                                  line: 1,
                                  column: 21
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              start: 16,
                              end: 18,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 18
                                  }
                              },
                              name: 'ab'
                          },
                          value: {
                              type: 'Identifier',
                              start: 20,
                              end: 21,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 21
                                  }
                              },
                              name: 'a'
                          },
                          kind: 'init'
                      }]
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 24,
                      end: 26,
                      loc: {
                          start: {
                              line: 1,
                              column: 24
                          },
                          end: {
                              line: 1,
                              column: 26
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for (let {j} in x) { function foo() {return j} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (let {j} in x) { function foo() {return j} }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 48,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 48
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 48,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 48
                      }
                  },
                  left: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          id: {
                              type: 'ObjectPattern',
                              start: 9,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              },
                              properties: [{
                                  type: 'Property',
                                  start: 10,
                                  end: 11,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 10
                                      },
                                      end: {
                                          line: 1,
                                          column: 11
                                      }
                                  },
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
                                      type: 'Identifier',
                                      start: 10,
                                      end: 11,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 10
                                          },
                                          end: {
                                              line: 1,
                                              column: 11
                                          }
                                      },
                                      name: 'j'
                                  },
                                  kind: 'init',
                                  value: {
                                      type: 'Identifier',
                                      start: 10,
                                      end: 11,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 10
                                          },
                                          end: {
                                              line: 1,
                                              column: 11
                                          }
                                      },
                                      name: 'j'
                                  }
                              }]
                          },
                          init: null
                      }],
                      kind: 'let'
                  },
                  right: {
                      type: 'Identifier',
                      start: 16,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 16
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      name: 'x'
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 19,
                      end: 48,
                      loc: {
                          start: {
                              line: 1,
                              column: 19
                          },
                          end: {
                              line: 1,
                              column: 48
                          }
                      },
                      body: [{
                          type: 'FunctionDeclaration',
                          start: 21,
                          end: 46,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 21
                              },
                              end: {
                                  line: 1,
                                  column: 46
                              }
                          },
                          id: {
                              type: 'Identifier',
                              start: 30,
                              end: 33,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 30
                                  },
                                  end: {
                                      line: 1,
                                      column: 33
                                  }
                              },
                              name: 'foo'
                          },
                          generator: false,
                          expression: false,
                          async: false,
                          params: [],
                          body: {
                              type: 'BlockStatement',
                              start: 36,
                              end: 46,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 36
                                  },
                                  end: {
                                      line: 1,
                                      column: 46
                                  }
                              },
                              body: [{
                                  type: 'ReturnStatement',
                                  start: 37,
                                  end: 45,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 37
                                      },
                                      end: {
                                          line: 1,
                                          column: 45
                                      }
                                  },
                                  argument: {
                                      type: 'Identifier',
                                      start: 44,
                                      end: 45,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 44
                                          },
                                          end: {
                                              line: 1,
                                              column: 45
                                          }
                                      },
                                      name: 'j'
                                  }
                              }]
                          }
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for (const j in x) { var [foo] = [j] }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (const j in x) { var [foo] = [j] }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 38,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 38
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 38,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 38
                      }
                  },
                  left: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 11,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          id: {
                              type: 'Identifier',
                              start: 11,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 11
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              },
                              name: 'j'
                          },
                          init: null
                      }],
                      kind: 'const'
                  },
                  right: {
                      type: 'Identifier',
                      start: 16,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 16
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      name: 'x'
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 19,
                      end: 38,
                      loc: {
                          start: {
                              line: 1,
                              column: 19
                          },
                          end: {
                              line: 1,
                              column: 38
                          }
                      },
                      body: [{
                          type: 'VariableDeclaration',
                          start: 21,
                          end: 36,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 21
                              },
                              end: {
                                  line: 1,
                                  column: 36
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
                                  type: 'ArrayPattern',
                                  start: 25,
                                  end: 30,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 25
                                      },
                                      end: {
                                          line: 1,
                                          column: 30
                                      }
                                  },
                                  elements: [{
                                      type: 'Identifier',
                                      start: 26,
                                      end: 29,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 26
                                          },
                                          end: {
                                              line: 1,
                                              column: 29
                                          }
                                      },
                                      name: 'foo'
                                  }]
                              },
                              init: {
                                  type: 'ArrayExpression',
                                  start: 33,
                                  end: 36,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 33
                                      },
                                      end: {
                                          line: 1,
                                          column: 36
                                      }
                                  },
                                  elements: [{
                                      type: 'Identifier',
                                      start: 34,
                                      end: 35,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 34
                                          },
                                          end: {
                                              line: 1,
                                              column: 35
                                          }
                                      },
                                      name: 'j'
                                  }]
                              }
                          }],
                          kind: 'var'
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for (let {j} in x) { var [foo] = [j] }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (let {j} in x) { var [foo] = [j] }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 38,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 38
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 38,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 38
                      }
                  },
                  left: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          id: {
                              type: 'ObjectPattern',
                              start: 9,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              },
                              properties: [{
                                  type: 'Property',
                                  start: 10,
                                  end: 11,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 10
                                      },
                                      end: {
                                          line: 1,
                                          column: 11
                                      }
                                  },
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
                                      type: 'Identifier',
                                      start: 10,
                                      end: 11,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 10
                                          },
                                          end: {
                                              line: 1,
                                              column: 11
                                          }
                                      },
                                      name: 'j'
                                  },
                                  kind: 'init',
                                  value: {
                                      type: 'Identifier',
                                      start: 10,
                                      end: 11,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 10
                                          },
                                          end: {
                                              line: 1,
                                              column: 11
                                          }
                                      },
                                      name: 'j'
                                  }
                              }]
                          },
                          init: null
                      }],
                      kind: 'let'
                  },
                  right: {
                      type: 'Identifier',
                      start: 16,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 16
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      name: 'x'
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 19,
                      end: 38,
                      loc: {
                          start: {
                              line: 1,
                              column: 19
                          },
                          end: {
                              line: 1,
                              column: 38
                          }
                      },
                      body: [{
                          type: 'VariableDeclaration',
                          start: 21,
                          end: 36,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 21
                              },
                              end: {
                                  line: 1,
                                  column: 36
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
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
                              id: {
                                  type: 'ArrayPattern',
                                  start: 25,
                                  end: 30,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 25
                                      },
                                      end: {
                                          line: 1,
                                          column: 30
                                      }
                                  },
                                  elements: [{
                                      type: 'Identifier',
                                      start: 26,
                                      end: 29,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 26
                                          },
                                          end: {
                                              line: 1,
                                              column: 29
                                          }
                                      },
                                      name: 'foo'
                                  }]
                              },
                              init: {
                                  type: 'ArrayExpression',
                                  start: 33,
                                  end: 36,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 33
                                      },
                                      end: {
                                          line: 1,
                                          column: 36
                                      }
                                  },
                                  elements: [{
                                      type: 'Identifier',
                                      start: 34,
                                      end: 35,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 34
                                          },
                                          end: {
                                              line: 1,
                                              column: 35
                                          }
                                      },
                                      name: 'j'
                                  }]
                              }
                          }],
                          kind: 'var'
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for (j in x) { let [foo] = [j] }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (j in x) { let [foo] = [j] }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 32,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 32
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 32,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 32
                      }
                  },
                  left: {
                      type: 'Identifier',
                      start: 5,
                      end: 6,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 6
                          }
                      },
                      name: 'j'
                  },
                  right: {
                      type: 'Identifier',
                      start: 10,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 10
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      name: 'x'
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 13,
                      end: 32,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 32
                          }
                      },
                      body: [{
                          type: 'VariableDeclaration',
                          start: 15,
                          end: 30,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 15
                              },
                              end: {
                                  line: 1,
                                  column: 30
                              }
                          },
                          declarations: [{
                              type: 'VariableDeclarator',
                              start: 19,
                              end: 30,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 19
                                  },
                                  end: {
                                      line: 1,
                                      column: 30
                                  }
                              },
                              id: {
                                  type: 'ArrayPattern',
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
                                  elements: [{
                                      type: 'Identifier',
                                      start: 20,
                                      end: 23,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 20
                                          },
                                          end: {
                                              line: 1,
                                              column: 23
                                          }
                                      },
                                      name: 'foo'
                                  }]
                              },
                              init: {
                                  type: 'ArrayExpression',
                                  start: 27,
                                  end: 30,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 27
                                      },
                                      end: {
                                          line: 1,
                                          column: 30
                                      }
                                  },
                                  elements: [{
                                      type: 'Identifier',
                                      start: 28,
                                      end: 29,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 28
                                          },
                                          end: {
                                              line: 1,
                                              column: 29
                                          }
                                      },
                                      name: 'j'
                                  }]
                              }
                          }],
                          kind: 'let'
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for (j in x) { function foo() {return j} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (j in x) { function foo() {return j} }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 42,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 42
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 42,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 42
                      }
                  },
                  left: {
                      type: 'Identifier',
                      start: 5,
                      end: 6,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 6
                          }
                      },
                      name: 'j'
                  },
                  right: {
                      type: 'Identifier',
                      start: 10,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 10
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      name: 'x'
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 13,
                      end: 42,
                      loc: {
                          start: {
                              line: 1,
                              column: 13
                          },
                          end: {
                              line: 1,
                              column: 42
                          }
                      },
                      body: [{
                          type: 'FunctionDeclaration',
                          start: 15,
                          end: 40,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 15
                              },
                              end: {
                                  line: 1,
                                  column: 40
                              }
                          },
                          id: {
                              type: 'Identifier',
                              start: 24,
                              end: 27,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 24
                                  },
                                  end: {
                                      line: 1,
                                      column: 27
                                  }
                              },
                              name: 'foo'
                          },
                          generator: false,
                          expression: false,
                          async: false,
                          params: [],
                          body: {
                              type: 'BlockStatement',
                              start: 30,
                              end: 40,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 30
                                  },
                                  end: {
                                      line: 1,
                                      column: 40
                                  }
                              },
                              body: [{
                                  type: 'ReturnStatement',
                                  start: 31,
                                  end: 39,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 31
                                      },
                                      end: {
                                          line: 1,
                                          column: 39
                                      }
                                  },
                                  argument: {
                                      type: 'Identifier',
                                      start: 38,
                                      end: 39,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 38
                                          },
                                          end: {
                                              line: 1,
                                              column: 39
                                          }
                                      },
                                      name: 'j'
                                  }
                              }]
                          }
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for (var b in { x: 0 }) { 3; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (var b in { x: 0 }) { 3; }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 30,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 30
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 30,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 30
                      }
                  },
                  left: {
                      type: 'VariableDeclaration',
                      start: 5,
                      end: 10,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 10
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 9,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          id: {
                              type: 'Identifier',
                              start: 9,
                              end: 10,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 10
                                  }
                              },
                              name: 'b'
                          },
                          init: null
                      }],
                      kind: 'var'
                  },
                  right: {
                      type: 'ObjectExpression',
                      start: 14,
                      end: 22,
                      loc: {
                          start: {
                              line: 1,
                              column: 14
                          },
                          end: {
                              line: 1,
                              column: 22
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 16,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 16
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              start: 16,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              name: 'x'
                          },
                          value: {
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
                              value: 0,
                              raw: '0'
                          },
                          kind: 'init'
                      }]
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 24,
                      end: 30,
                      loc: {
                          start: {
                              line: 1,
                              column: 24
                          },
                          end: {
                              line: 1,
                              column: 30
                          }
                      },
                      body: [{
                          type: 'ExpressionStatement',
                          start: 26,
                          end: 28,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 26
                              },
                              end: {
                                  line: 1,
                                  column: 28
                              }
                          },
                          expression: {
                              type: 'Literal',
                              start: 26,
                              end: 27,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 26
                                  },
                                  end: {
                                      line: 1,
                                      column: 27
                                  }
                              },
                              value: 3,
                              raw: '3'
                          }
                      }]
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for(()=>{a in b};;);`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(()=>{a in b};;);`,
          expected: {
              type: 'Program',
              start: 0,
              end: 20,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 20
                  }
              },
              body: [{
                  type: 'ForStatement',
                  start: 0,
                  end: 20,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 20
                      }
                  },
                  init: {
                      type: 'ArrowFunctionExpression',
                      start: 4,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      id: null,
                      generator: false,
                      expression: false,
                      async: false,
                      params: [],
                      body: {
                          type: 'BlockStatement',
                          start: 8,
                          end: 16,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 16
                              }
                          },
                          body: [{
                              type: 'ExpressionStatement',
                              start: 9,
                              end: 15,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 9
                                  },
                                  end: {
                                      line: 1,
                                      column: 15
                                  }
                              },
                              expression: {
                                  type: 'BinaryExpression',
                                  start: 9,
                                  end: 15,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 9
                                      },
                                      end: {
                                          line: 1,
                                          column: 15
                                      }
                                  },
                                  left: {
                                      type: 'Identifier',
                                      start: 9,
                                      end: 10,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 9
                                          },
                                          end: {
                                              line: 1,
                                              column: 10
                                          }
                                      },
                                      name: 'a'
                                  },
                                  operator: 'in',
                                  right: {
                                      type: 'Identifier',
                                      start: 14,
                                      end: 15,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 14
                                          },
                                          end: {
                                              line: 1,
                                              column: 15
                                          }
                                      },
                                      name: 'b'
                                  }
                              }
                          }]
                      }
                  },
                  test: null,
                  update: null,
                  body: {
                      type: 'EmptyStatement',
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
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for(x of "foo" in {}) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(x of "foo" in {}) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 24,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 24
                  }
              },
              body: [{
                  type: 'ForOfStatement',
                  await: false,
                  start: 0,
                  end: 24,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 24
                      }
                  },
                  left: {
                      type: 'Identifier',
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
                      },
                      name: 'x'
                  },
                  right: {
                      type: 'BinaryExpression',
                      start: 9,
                      end: 20,
                      loc: {
                          start: {
                              line: 1,
                              column: 9
                          },
                          end: {
                              line: 1,
                              column: 20
                          }
                      },
                      left: {
                          type: 'Literal',
                          start: 9,
                          end: 14,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 14
                              }
                          },
                          value: 'foo',
                          raw: '"foo"'
                      },
                      operator: 'in',
                      right: {
                          type: 'ObjectExpression',
                          start: 18,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 18
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          },
                          properties: []
                      }
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 22,
                      end: 24,
                      loc: {
                          start: {
                              line: 1,
                              column: 22
                          },
                          end: {
                              line: 1,
                              column: 24
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for (x in {a: b}) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for (x in {a: b}) {}`,
          expected: {
              type: 'Program',
              start: 0,
              end: 20,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 20
                  }
              },
              body: [{
                  type: 'ForInStatement',
                  start: 0,
                  end: 20,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 20
                      }
                  },
                  left: {
                      type: 'Identifier',
                      start: 5,
                      end: 6,
                      loc: {
                          start: {
                              line: 1,
                              column: 5
                          },
                          end: {
                              line: 1,
                              column: 6
                          }
                      },
                      name: 'x'
                  },
                  right: {
                      type: 'ObjectExpression',
                      start: 10,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 10
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      properties: [{
                          type: 'Property',
                          start: 11,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          method: false,
                          shorthand: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              start: 11,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 11
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              },
                              name: 'a'
                          },
                          value: {
                              type: 'Identifier',
                              start: 14,
                              end: 15,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 14
                                  },
                                  end: {
                                      line: 1,
                                      column: 15
                                  }
                              },
                              name: 'b'
                          },
                          kind: 'init'
                      }]
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 18,
                      end: 20,
                      loc: {
                          start: {
                              line: 1,
                              column: 18
                          },
                          end: {
                              line: 1,
                              column: 20
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`function foo(){ 'use strict'; for(x in {}, {}) {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function foo(){ 'use strict'; for(x in {}, {}) {} }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 51,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 51
                  }
              },
              body: [{
                  type: 'FunctionDeclaration',
                  start: 0,
                  end: 51,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 51
                      }
                  },
                  id: {
                      type: 'Identifier',
                      start: 9,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 9
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      name: 'foo'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      start: 14,
                      end: 51,
                      loc: {
                          start: {
                              line: 1,
                              column: 14
                          },
                          end: {
                              line: 1,
                              column: 51
                          }
                      },
                      body: [{
                              type: 'ExpressionStatement',
                              directive: 'use strict',
                              start: 16,
                              end: 29,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 29
                                  }
                              },
                              expression: {
                                  type: 'Literal',
                                  start: 16,
                                  end: 28,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 16
                                      },
                                      end: {
                                          line: 1,
                                          column: 28
                                      }
                                  },
                                  value: 'use strict',
                                  raw: '\'use strict\''
                              }
                          },
                          {
                              type: 'ForInStatement',
                              start: 30,
                              end: 49,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 30
                                  },
                                  end: {
                                      line: 1,
                                      column: 49
                                  }
                              },
                              left: {
                                  type: 'Identifier',
                                  start: 34,
                                  end: 35,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 34
                                      },
                                      end: {
                                          line: 1,
                                          column: 35
                                      }
                                  },
                                  name: 'x'
                              },
                              right: {
                                  type: 'SequenceExpression',
                                  start: 39,
                                  end: 45,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 39
                                      },
                                      end: {
                                          line: 1,
                                          column: 45
                                      }
                                  },
                                  expressions: [{
                                          type: 'ObjectExpression',
                                          start: 39,
                                          end: 41,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 39
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 41
                                              }
                                          },
                                          properties: []
                                      },
                                      {
                                          type: 'ObjectExpression',
                                          start: 43,
                                          end: 45,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 43
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 45
                                              }
                                          },
                                          properties: []
                                      }
                                  ]
                              },
                              body: {
                                  type: 'BlockStatement',
                                  start: 47,
                                  end: 49,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 47
                                      },
                                      end: {
                                          line: 1,
                                          column: 49
                                      }
                                  },
                                  body: []
                              }
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`function foo(){ 'use strict'; for(let x in {}, {}) {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function foo(){ 'use strict'; for(let x in {}, {}) {} }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 55,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 55
                  }
              },
              body: [{
                  type: 'FunctionDeclaration',
                  start: 0,
                  end: 55,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 55
                      }
                  },
                  id: {
                      type: 'Identifier',
                      start: 9,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 9
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      name: 'foo'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      start: 14,
                      end: 55,
                      loc: {
                          start: {
                              line: 1,
                              column: 14
                          },
                          end: {
                              line: 1,
                              column: 55
                          }
                      },
                      body: [{
                              type: 'ExpressionStatement',
                              directive: 'use strict',
                              start: 16,
                              end: 29,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 29
                                  }
                              },
                              expression: {
                                  type: 'Literal',
                                  start: 16,
                                  end: 28,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 16
                                      },
                                      end: {
                                          line: 1,
                                          column: 28
                                      }
                                  },
                                  value: 'use strict',
                                  raw: '\'use strict\''
                              }
                          },
                          {
                              type: 'ForInStatement',
                              start: 30,
                              end: 53,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 30
                                  },
                                  end: {
                                      line: 1,
                                      column: 53
                                  }
                              },
                              left: {
                                  type: 'VariableDeclaration',
                                  start: 34,
                                  end: 39,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 34
                                      },
                                      end: {
                                          line: 1,
                                          column: 39
                                      }
                                  },
                                  declarations: [{
                                      type: 'VariableDeclarator',
                                      start: 38,
                                      end: 39,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 38
                                          },
                                          end: {
                                              line: 1,
                                              column: 39
                                          }
                                      },
                                      id: {
                                          type: 'Identifier',
                                          start: 38,
                                          end: 39,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 38
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 39
                                              }
                                          },
                                          name: 'x'
                                      },
                                      init: null
                                  }],
                                  kind: 'let'
                              },
                              right: {
                                  type: 'SequenceExpression',
                                  start: 43,
                                  end: 49,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 43
                                      },
                                      end: {
                                          line: 1,
                                          column: 49
                                      }
                                  },
                                  expressions: [{
                                          type: 'ObjectExpression',
                                          start: 43,
                                          end: 45,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 43
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 45
                                              }
                                          },
                                          properties: []
                                      },
                                      {
                                          type: 'ObjectExpression',
                                          start: 47,
                                          end: 49,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 47
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 49
                                              }
                                          },
                                          properties: []
                                      }
                                  ]
                              },
                              body: {
                                  type: 'BlockStatement',
                                  start: 51,
                                  end: 53,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 51
                                      },
                                      end: {
                                          line: 1,
                                          column: 53
                                      }
                                  },
                                  body: []
                              }
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`function foo(){ 'use strict'; for(var x in {}, {}) {} }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `function foo(){ 'use strict'; for(var x in {}, {}) {} }`,
          expected: {
              type: 'Program',
              start: 0,
              end: 55,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 55
                  }
              },
              body: [{
                  type: 'FunctionDeclaration',
                  start: 0,
                  end: 55,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 55
                      }
                  },
                  id: {
                      type: 'Identifier',
                      start: 9,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 9
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      name: 'foo'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                      type: 'BlockStatement',
                      start: 14,
                      end: 55,
                      loc: {
                          start: {
                              line: 1,
                              column: 14
                          },
                          end: {
                              line: 1,
                              column: 55
                          }
                      },
                      body: [{
                              type: 'ExpressionStatement',
                              directive: 'use strict',
                              start: 16,
                              end: 29,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 29
                                  }
                              },
                              expression: {
                                  type: 'Literal',
                                  start: 16,
                                  end: 28,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 16
                                      },
                                      end: {
                                          line: 1,
                                          column: 28
                                      }
                                  },
                                  value: 'use strict',
                                  raw: '\'use strict\''
                              }
                          },
                          {
                              type: 'ForInStatement',
                              start: 30,
                              end: 53,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 30
                                  },
                                  end: {
                                      line: 1,
                                      column: 53
                                  }
                              },
                              left: {
                                  type: 'VariableDeclaration',
                                  start: 34,
                                  end: 39,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 34
                                      },
                                      end: {
                                          line: 1,
                                          column: 39
                                      }
                                  },
                                  declarations: [{
                                      type: 'VariableDeclarator',
                                      start: 38,
                                      end: 39,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 38
                                          },
                                          end: {
                                              line: 1,
                                              column: 39
                                          }
                                      },
                                      id: {
                                          type: 'Identifier',
                                          start: 38,
                                          end: 39,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 38
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 39
                                              }
                                          },
                                          name: 'x'
                                      },
                                      init: null
                                  }],
                                  kind: 'var'
                              },
                              right: {
                                  type: 'SequenceExpression',
                                  start: 43,
                                  end: 49,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 43
                                      },
                                      end: {
                                          line: 1,
                                          column: 49
                                      }
                                  },
                                  expressions: [{
                                          type: 'ObjectExpression',
                                          start: 43,
                                          end: 45,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 43
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 45
                                              }
                                          },
                                          properties: []
                                      },
                                      {
                                          type: 'ObjectExpression',
                                          start: 47,
                                          end: 49,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 47
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 49
                                              }
                                          },
                                          properties: []
                                      }
                                  ]
                              },
                              body: {
                                  type: 'BlockStatement',
                                  start: 51,
                                  end: 53,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 51
                                      },
                                      end: {
                                          line: 1,
                                          column: 53
                                      }
                                  },
                                  body: []
                              }
                          }
                      ]
                  }
              }],
              sourceType: 'script'
          }
      });

        pass(`for(const x in [1,2,3]) {}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
          source: `for(const x in [1,2,3]) {}`,
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
                  type: 'ForInStatement',
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
                  left: {
                      type: 'VariableDeclaration',
                      start: 4,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 4
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      declarations: [{
                          type: 'VariableDeclarator',
                          start: 10,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          id: {
                              type: 'Identifier',
                              start: 10,
                              end: 11,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 10
                                  },
                                  end: {
                                      line: 1,
                                      column: 11
                                  }
                              },
                              name: 'x'
                          },
                          init: null
                      }],
                      kind: 'const'
                  },
                  right: {
                      type: 'ArrayExpression',
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
                      elements: [{
                              type: 'Literal',
                              start: 16,
                              end: 17,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 16
                                  },
                                  end: {
                                      line: 1,
                                      column: 17
                                  }
                              },
                              value: 1,
                              raw: '1'
                          },
                          {
                              type: 'Literal',
                              start: 18,
                              end: 19,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 18
                                  },
                                  end: {
                                      line: 1,
                                      column: 19
                                  }
                              },
                              value: 2,
                              raw: '2'
                          },
                          {
                              type: 'Literal',
                              start: 20,
                              end: 21,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 20
                                  },
                                  end: {
                                      line: 1,
                                      column: 21
                                  }
                              },
                              value: 3,
                              raw: '3'
                          }
                      ]
                  },
                  body: {
                      type: 'BlockStatement',
                      start: 24,
                      end: 26,
                      loc: {
                          start: {
                              line: 1,
                              column: 24
                          },
                          end: {
                              line: 1,
                              column: 26
                          }
                      },
                      body: []
                  }
              }],
              sourceType: 'script'
          }
      });

  });
});