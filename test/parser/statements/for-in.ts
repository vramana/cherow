import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/cherow';

describe('Statements - For in', () => {
  fail('Statements - For in (fail)', [
    ['for (let in x) {}', Context.Strict],
    ['for (let x;;) { var x; }', Context.Empty],
    ['for (const x = y;;) { var x; }', Context.Empty],
    ['for (let x in y) { var x; }', Context.Empty],
    ['for (const x in y) { var x; }', Context.Empty],
    ['for (let x of y) { var x; }', Context.Empty],
    ['for (let foo = bar, zoo = boo in x);', Context.Empty],
    ['for (let foo = bar, zoo = boo in x);', Context.Empty],
    ['for (let foo = bar in x);', Context.Empty],
    ['for (let foo = bar of x);', Context.Empty],
    ['for (let foo = bar, zoo = boo of x', Context.Empty],
    ['for (let x of y) { var x; }', Context.Empty],
    ['for (const a;;);', Context.Empty],
    ['for (const a,b,c;;);', Context.Empty],
    ['for (let a, b, x, d;;) { var foo; var bar; { var doo, x, ee; } }', Context.Empty],
    ['for (const let in {}) {}', Context.Empty],
    ['for (let let of {}) {}', Context.Empty],
    ['for(var [] = 0 in {});', Context.Empty],
    ['for(var [,] = 0 in {});', Context.Empty],
    ['for(var [a] = 0 in {});', Context.Empty],
    ['for ([...x,] in [[]]) ;', Context.Empty],
    ['for(var [a = 0] = 0 in {});', Context.Empty],
    ['for(var [...a] = 0 in {});', Context.Empty],
    ['for(var [...[]] = 0 in {});', Context.Empty],
    ['for(var [...[a]] = 0 in {});', Context.Empty],
    ['for(var {} = 0 in {});', Context.Empty],
    ['for(var {p: x} = 0 in {});', Context.Empty],
    ['for(var {p: x = 0} = 0 in {});', Context.Empty],
    ['for(var {x} = 0 in {});', Context.Empty],
    ['for(var {x = 0} = 0 in {});', Context.Empty],
    ['for(let x = 0 in {});', Context.Empty],
    ['for(let [] = 0 in {});', Context.Empty],
    ['for(let [,] = 0 in {});', Context.Empty],
    ['for(let [a] = 0 in {});', Context.Empty],
    ['for(const {x = 0} = 0 in {});', Context.Empty],
    ['for([,] = 0 in {});', Context.Empty],
    ['for([a] = 0 in {});', Context.Empty],
    ['for([a = 0] = 0 in {});', Context.Empty],
    ['for([...a] = 0 in {});', Context.Empty],
    ['for([...[]] = 0 in {});', Context.Empty],
    ['for([...[a]] = 0 in {});', Context.Empty],
    ['for({} = 0 in {});', Context.Empty],
    ['for({p: x} = 0 in {});', Context.Empty],
    ['for({p: x = 0} = 0 in {});', Context.Empty],
    ['for({x} = 0 in {});', Context.Empty],
    ['for({x = 0} = 0 in {});', Context.Empty],
    ['for(f() = 0 in {});', Context.Empty],
    ['for(let [a = 0] = 0 in {});', Context.Empty],
    ['for(let [...a] = 0 in {});', Context.Empty],
    ['for(let [...[]] = 0 in {});', Context.Empty],
    ['for(let [...[a]] = 0 in {});', Context.Empty],
    ['for(let {} = 0 in {});', Context.Empty],
    ['for(let {p: x} = 0 in {});', Context.Empty],
    ['for(let {p: x = 0} = 0 in {});', Context.Empty],
    ['for(let {x} = 0 in {});', Context.Empty],
    ['for(let {x = 0} = 0 in {});', Context.Empty],
    ['for(const x = 0 in {});', Context.Empty],
    ['for(const [] = 0 in {});', Context.Empty],
    ['for(const [,] = 0 in {});', Context.Empty],
    ['for(const [a] = 0 in {});', Context.Empty],
    ['for(const [a = 0] = 0 in {});', Context.Empty],
    ['for(const [...a] = 0 in {});', Context.Empty],
    ['for(const [...[]] = 0 in {});', Context.Empty],
    ['for(const [...[a]] = 0 in {});', Context.Empty],
    ['for(const {} = 0 in {});', Context.Empty],
    ['for(const {p: x} = 0 in {});', Context.Empty],
    ['for(const {p: x = 0} = 0 in {});', Context.Empty],
    ['for(const {x} = 0 in {});', Context.Empty],
    ['"use strict"; for (var [ v , c ] = 0 in undefined) { }', Context.Empty],
    ['"use strict"; for (var {a: []} = 2 in []) { }', Context.Empty],
    ['for (x => 0 in 1;;) break;', Context.Empty],
    ['"use strict"; for (var [x] = x in y) var x;', Context.Empty],
    ['"use strict"; for (var [arguments] = ({ get y(){} }) in y ) (x);', Context.Empty],
    ['for (let i = void 0 in [1, 2, 3]) {}', Context.Empty],
    ['function foo() { for (let i, j = 1 in {}) {} }', Context.Empty],
    ['function foo() { for (const i, j = void 0 in [1, 2, 3]) {} }', Context.Empty],
    ['for (var a = b = c = (d in e) in z);', Context.Empty],
    ['for (i++ = 0 in {});', Context.Empty],
    ['for(let a = 0 of b);', Context.Empty],
    ['for(let ? b : c in 0);', Context.Empty],
    ['for (var i, j in {}) {}', Context.Empty],
    ['for (var i, j = void 0 in [1, 2, 3]) {}', Context.Empty],
    ['function foo() { for (var i, j of {}) {} }', Context.Empty],
    ['"use strict"; for ([ x = yield ] in [[]]) ;', Context.Empty],
    ['for ([[(x, y)]] in [[[]]]) ;', Context.Empty],
    ['"use strict"; for ([[x[yield]]] in [[[]]]) ;', Context.Empty],
    ['"use strict"; for ([{ x = yield }] in [[{}]]) ;', Context.Empty],
    ['for ([...x,] in [[]]) ;', Context.Empty],
    ['for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty],
    ['for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty],
    ['"use strict"; for ({ x = yield } in [{}]) ;', Context.Empty],
    ['for (let x in {}) label1: label2: function f() {}', Context.Empty],
    ['for (x in {}) label1: label2: function f() {}', Context.Empty]
  ]);

  for (const arg of [
    'for(x in {}, {}) {}',
    'for(var x in {}, {}) {}',
    'for(let x in {}, {}) {}',
    'for(const x in {}, {}) {}',
    'for(const x in [1,2,3]) {}',
    'for(const x = 1; ; ) {}',
    'for([{a=0}] in b);',
    'for({0: a = 1} in []) {}',
    'for(let [a] in []) {}',
    'for(x in {}, {}) {}',
    'for(var x in {}, {}) {}',
    'for(let x in {}, {}) {}',
    'for(const x in {}, {}) {}',
    'for(const x in [1,2,3]) {}',
    'for(const x = 1; ; ) {}',
    'for([{a=0}] in b);',
    'for({a: a} in []){}',
    "for({'a': a} in []){}",
    'for({"a": a} in []){}',
    'for({a=0} in b);',
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
    'for([{a=0}] in b);',
    'for({0: a = 1} in []) {}',
    'for(let [a] in []) {}',
    'for(let [a = 1] in []) {}',
    'for(let [a = 1, ...b] in []) {}',
    'for(let {a} in []) {}',
    'for(const {a} in []){}',
    'for(const {[Symbol.iterator]: a} in []){}',
    ` if (a) {
                for(f(); false;) {}
              } else
                for(x in y) {
                  g()
                }`,
    `for (x in null, { key: 0 }) {}`,
    `2; for (var b in { x: 0 }) { 3; }`,
    `for (var p in obj) {
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
              }`
  ]) {
    it(`"use strict"; ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`"use strict"; ${arg}`, undefined, Context.Empty);
      });
    });

    it(`function foo(){ 'use strict'; ${arg} }`, () => {
      t.doesNotThrow(() => {
        parseSource(`function foo(){ 'use strict'; ${arg} }`, undefined, Context.Empty);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });

    it(`${arg} ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg} ${arg}`, undefined, Context.Empty);
      });
    });

    it(`async(); ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`async(); ${arg}`, undefined, Context.Empty);
      });
    });

    it(`function foo() { ${arg} }`, () => {
      t.doesNotThrow(() => {
        parseSource(`function foo() { ${arg} }`, undefined, Context.Empty);
      });
    });

    it(`if (true) { ${arg} } else ${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`if (true) { ${arg} } else ${arg}`, undefined, Context.Empty);
      });
    });
  }

  // valid tests
  const valids: Array<[string, Context, any]> = [
    [
      'for (var {x : y} in obj);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (var [foo, bar=b] of arr);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForOfStatement',
            await: false,
            left: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      }
                    ]
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'for (var {[x]: y} of obj);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: true,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        method: false,
                        shorthand: false
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            },
            await: false
          }
        ]
      }
    ],

    [
      'for (var {x = y} in obj);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'y'
                          }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var [] in x);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ArrayPattern',
                    elements: []
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'Identifier',
              name: 'x'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var [foo,] in arr);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        ]
      }
    ],
    [
      'for (var a = 0 in stored = a, {});',
      Context.OptionsWebCompat | Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 34,
        body: [
          {
            type: 'ForInStatement',
            start: 0,
            end: 34,
            left: {
              type: 'VariableDeclaration',
              start: 5,
              end: 14,
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 9,
                  end: 14,
                  id: {
                    type: 'Identifier',
                    start: 9,
                    end: 10,
                    name: 'a'
                  },
                  init: {
                    type: 'Literal',
                    start: 13,
                    end: 14,
                    value: 0
                  }
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'SequenceExpression',
              start: 18,
              end: 32,
              expressions: [
                {
                  type: 'AssignmentExpression',
                  start: 18,
                  end: 28,
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    start: 18,
                    end: 24,
                    name: 'stored'
                  },
                  right: {
                    type: 'Identifier',
                    start: 27,
                    end: 28,
                    name: 'a'
                  }
                },
                {
                  type: 'ObjectExpression',
                  start: 30,
                  end: 32,
                  properties: []
                }
              ]
            },
            body: {
              type: 'EmptyStatement',
              start: 33,
              end: 34
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var a = (++effects, -1) in x);',
      Context.OptionsWebCompat | Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 35,
        body: [
          {
            type: 'ForInStatement',
            start: 0,
            end: 35,
            left: {
              type: 'VariableDeclaration',
              start: 5,
              end: 28,
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 9,
                  end: 28,
                  id: {
                    type: 'Identifier',
                    start: 9,
                    end: 10,
                    name: 'a'
                  },
                  init: {
                    type: 'SequenceExpression',
                    start: 14,
                    end: 27,
                    expressions: [
                      {
                        type: 'UpdateExpression',
                        start: 14,
                        end: 23,
                        operator: '++',
                        prefix: true,
                        argument: {
                          type: 'Identifier',
                          start: 16,
                          end: 23,
                          name: 'effects'
                        }
                      },
                      {
                        type: 'UnaryExpression',
                        start: 25,
                        end: 27,
                        operator: '-',
                        prefix: true,
                        argument: {
                          type: 'Literal',
                          start: 26,
                          end: 27,
                          value: 1
                        }
                      }
                    ]
                  }
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'Identifier',
              start: 32,
              end: 33,
              name: 'x'
            },
            body: {
              type: 'EmptyStatement',
              start: 34,
              end: 35
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var a in stored = a, {a: 0, b: 1, c: 2});',
      Context.OptionsWebCompat | Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 46,
        body: [
          {
            type: 'ForInStatement',
            start: 0,
            end: 46,
            left: {
              type: 'VariableDeclaration',
              start: 5,
              end: 10,
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 9,
                  end: 10,
                  id: {
                    type: 'Identifier',
                    start: 9,
                    end: 10,
                    name: 'a'
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'SequenceExpression',
              start: 14,
              end: 44,
              expressions: [
                {
                  type: 'AssignmentExpression',
                  start: 14,
                  end: 24,
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    start: 14,
                    end: 20,
                    name: 'stored'
                  },
                  right: {
                    type: 'Identifier',
                    start: 23,
                    end: 24,
                    name: 'a'
                  }
                },
                {
                  type: 'ObjectExpression',
                  start: 26,
                  end: 44,
                  properties: [
                    {
                      type: 'Property',
                      start: 27,
                      end: 31,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 27,
                        end: 28,
                        name: 'a'
                      },
                      value: {
                        type: 'Literal',
                        start: 30,
                        end: 31,
                        value: 0
                      },
                      kind: 'init'
                    },
                    {
                      type: 'Property',
                      start: 33,
                      end: 37,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 33,
                        end: 34,
                        name: 'b'
                      },
                      value: {
                        type: 'Literal',
                        start: 36,
                        end: 37,
                        value: 1
                      },
                      kind: 'init'
                    },
                    {
                      type: 'Property',
                      start: 39,
                      end: 43,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 39,
                        end: 40,
                        name: 'c'
                      },
                      value: {
                        type: 'Literal',
                        start: 42,
                        end: 43,
                        value: 2
                      },
                      kind: 'init'
                    }
                  ]
                }
              ]
            },
            body: {
              type: 'EmptyStatement',
              start: 45,
              end: 46
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var a = (++effects, -1) in stored = a, {a: 0, b: 1, c: 2});',
      Context.OptionsWebCompat | Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 64,
        body: [
          {
            type: 'ForInStatement',
            start: 0,
            end: 64,
            left: {
              type: 'VariableDeclaration',
              start: 5,
              end: 28,
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 9,
                  end: 28,
                  id: {
                    type: 'Identifier',
                    start: 9,
                    end: 10,
                    name: 'a'
                  },
                  init: {
                    type: 'SequenceExpression',
                    start: 14,
                    end: 27,
                    expressions: [
                      {
                        type: 'UpdateExpression',
                        start: 14,
                        end: 23,
                        operator: '++',
                        prefix: true,
                        argument: {
                          type: 'Identifier',
                          start: 16,
                          end: 23,
                          name: 'effects'
                        }
                      },
                      {
                        type: 'UnaryExpression',
                        start: 25,
                        end: 27,
                        operator: '-',
                        prefix: true,
                        argument: {
                          type: 'Literal',
                          start: 26,
                          end: 27,
                          value: 1
                        }
                      }
                    ]
                  }
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'SequenceExpression',
              start: 32,
              end: 62,
              expressions: [
                {
                  type: 'AssignmentExpression',
                  start: 32,
                  end: 42,
                  operator: '=',
                  left: {
                    type: 'Identifier',
                    start: 32,
                    end: 38,
                    name: 'stored'
                  },
                  right: {
                    type: 'Identifier',
                    start: 41,
                    end: 42,
                    name: 'a'
                  }
                },
                {
                  type: 'ObjectExpression',
                  start: 44,
                  end: 62,
                  properties: [
                    {
                      type: 'Property',
                      start: 45,
                      end: 49,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 45,
                        end: 46,
                        name: 'a'
                      },
                      value: {
                        type: 'Literal',
                        start: 48,
                        end: 49,
                        value: 0
                      },
                      kind: 'init'
                    },
                    {
                      type: 'Property',
                      start: 51,
                      end: 55,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 51,
                        end: 52,
                        name: 'b'
                      },
                      value: {
                        type: 'Literal',
                        start: 54,
                        end: 55,
                        value: 1
                      },
                      kind: 'init'
                    },
                    {
                      type: 'Property',
                      start: 57,
                      end: 61,
                      method: false,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Identifier',
                        start: 57,
                        end: 58,
                        name: 'c'
                      },
                      value: {
                        type: 'Literal',
                        start: 60,
                        end: 61,
                        value: 2
                      },
                      kind: 'init'
                    }
                  ]
                }
              ]
            },
            body: {
              type: 'EmptyStatement',
              start: 63,
              end: 64
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var a = ++b in c);',
      Context.OptionsWebCompat | Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 23,
        body: [
          {
            type: 'ForInStatement',
            start: 0,
            end: 23,
            left: {
              type: 'VariableDeclaration',
              start: 5,
              end: 16,
              declarations: [
                {
                  type: 'VariableDeclarator',
                  start: 9,
                  end: 16,
                  id: {
                    type: 'Identifier',
                    start: 9,
                    end: 10,
                    name: 'a'
                  },
                  init: {
                    type: 'UpdateExpression',
                    start: 13,
                    end: 16,
                    operator: '++',
                    prefix: true,
                    argument: {
                      type: 'Identifier',
                      start: 15,
                      end: 16,
                      name: 'b'
                    }
                  }
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'Identifier',
              start: 20,
              end: 21,
              name: 'c'
            },
            body: {
              type: 'EmptyStatement',
              start: 22,
              end: 23
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var a = b in c);',
      Context.OptionsWebCompat,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
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
              kind: 'var'
            },
            right: {
              type: 'Identifier',
              name: 'c'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (a in b);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'Identifier',
              name: 'b'
            }
          }
        ]
      }
    ],
    [
      'for (a in b); for (a in b); for (a in b);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'Identifier',
              name: 'b'
            }
          },
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'Identifier',
              name: 'b'
            }
          },
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'Identifier',
              name: 'a'
            },
            right: {
              type: 'Identifier',
              name: 'b'
            }
          }
        ]
      }
    ],
    [
      'for (let a in b);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'b'
            }
          }
        ]
      }
    ],
    [
      'for (const a in b);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: 'a'
                  },
                  init: null
                }
              ],
              kind: 'const'
            },
            right: {
              type: 'Identifier',
              name: 'b'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],

    [
      'for (let in x) {}',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
              type: 'Identifier',
              name: 'let'
            },
            right: {
              type: 'Identifier',
              name: 'x'
            },
            body: {
              type: 'BlockStatement',
              body: []
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var [foo,,bar] in arr);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      null,
                      {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        ]
      }
    ],
    [
      'for (var [,foo] in arr);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      null,
                      {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        ]
      }
    ],
    [
      'for (var [foo,bar] in arr);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        ]
      }
    ],
    [
      'for (var [foo,,] in arr);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      null
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        ]
      }
    ],
    [
      'for (var [foo=a, bar=b] in arr);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'a'
                        }
                      },
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        ]
      }
    ],
    [
      'for (var [,] in x);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ArrayPattern',
                    elements: [null]
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'Identifier',
              name: 'x'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var [foo] in arr);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        ]
      }
    ],
    [
      'for (var [foo=a] in arr);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'a'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        ]
      }
    ],
    [
      'for (var [foo=a, bar] in arr);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'foo'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'a'
                        }
                      },
                      {
                        type: 'Identifier',
                        name: 'bar'
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        ]
      }
    ],
    [
      'for (var [foo, bar=b] in arr);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'bar'
                        },
                        right: {
                          type: 'Identifier',
                          name: 'b'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'arr'
            }
          }
        ]
      }
    ],
    [
      'for (var [...foo] in obj);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'Identifier',
                          name: 'foo'
                        }
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (var {} in obj);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: []
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (var {x,} in obj);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (var {x, y} in obj);',
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'EmptyStatement'
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        method: false,
                        shorthand: true
                      },
                      {
                        type: 'Property',
                        kind: 'init',
                        key: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        method: false,
                        shorthand: true
                      }
                    ]
                  }
                }
              ]
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            }
          }
        ]
      }
    ],
    [
      'for (var {x} in obj);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'for (var {x = y} in obj);',
      Context.Empty,
      {
        type: 'Program',
        body: [
          {
            type: 'ForInStatement',
            left: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        computed: false,
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'x'
                          },
                          right: {
                            type: 'Identifier',
                            name: 'y'
                          }
                        },
                        kind: 'init',
                        method: false,
                        shorthand: true
                      }
                    ]
                  },
                  init: null
                }
              ],
              kind: 'var'
            },
            right: {
              type: 'Identifier',
              name: 'obj'
            },
            body: {
              type: 'EmptyStatement'
            }
          }
        ],
        sourceType: 'script'
      }
    ]
  ];

  pass('Statements - For of (pass)', valids);
});
