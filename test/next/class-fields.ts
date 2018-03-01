import { pass, fail } from '../test-utils';

describe('Next - Class fields', () => {

    fail('class A { #a = () => arguments }', {
        source: 'class A { #a = () => arguments }',
        next: true,
        line: 1
    });
/*
    fail('class A { #a = () => { arguments } }', {
        source: 'class A { #a = () => { arguments } }',
        next: true,
        line: 1
    });*/

    fail('class A { #a = arguments[0] }', {
        source: 'class A { #a = arguments[0] }',
        next: true,
        line: 1
    });
/*
    fail('class A { #a = f(arguments) }', {
        source: 'class A { #a = f(arguments) }',
        next: true,
        line: 1
    });*/

    fail('class A { #a = () => () => arguments }', {
        source: 'class A { #a = () => () => arguments }',
        next: true,
        line: 1
    });

    fail('class A { static #a }', {
        source: 'class A { static #a }',
        next: true,
        line: 1
    });

    fail('class A { async #constructor }', {
        source: 'class A { async #constructor }',
        next: true,
        message: 'Classes may not have a private field named \'#constructor\'',
        line: 1
    });

    fail('class A { async #constructor }', {
        source: 'class A { async #"constructor" }',
        next: true,
        message: 'Invalid or unexpected token',
        line: 1
    });

    fail('class A { static a = }', {
      source: 'class A { static a = }',
      next: true,
      line: 1
  });

    fail('class A { static constructor }', {
      source: 'class A { static constructor }',
      next: true,
      message:'Classes may not have a field named \'constructor\'',
      line: 1
  });

    fail('class A { static prototype }', {
      source: 'class A { static prototype }',
      next: true,
      line: 1
  });

    fail('class A { static *a }', {
      source: 'class A { static *a }',
      next: true,
      line: 1
  });

    fail(`class Foo {
    p = x
    [m] () {}
  }`, {
    source: `class Foo {
        p = x
        [m] () {}
      }`,
    next: true,
    line: 3
    });

    fail('class A { static async a }', {
      source: 'class A { static async a}',
      next: true,
      line: 1
  });

    fail('class A { static async a = 0}', {
      source: 'class A { static async a = 0 }',
      next: true,
      line: 1
  });

    fail('class A { static a = arguments }', {
      source: 'class A { static a = arguments }',
      next: true,
      line: 1
  });

    fail('class A { static a = () => arguments }', {
      source: 'class A { static a = () => arguments }',
      next: true,
      line: 1
  });

    fail('class A { static a = () => () => arguments }', {
      source: 'class A { static a = () => () => arguments }',
      next: true,
      line: 1
  });

    fail('class A { static a = 0\n *b(){} }', {
      source: 'class A { static a = 0\n *b(){} }',
      next: true,
      line: 2
  });

    fail('class A { static a = 0\n ["b"](){} }', {
      source: 'class A { static a = 0\n ["b"](){} }',
      next: true,
      line: 2
  });

    fail('class A { a : 0 }', {
      source: 'class A { a : 0 }',
      next: true,
      line: 1
  });

    fail('class A { a =}', {
      source: 'class A { a = }',
      next: true,
      line: 1
  });

    fail('class A { *a }', {
      source: 'class A { *a }',
      next: true,
      line: 1
  });

    fail('class A { a = 0\n ["b"](){} }', {
      source: 'class A { a = 0\n ["b"](){} }',
      next: true,
      line: 2
  });

    fail('class A { async a }', {
      source: 'class A { async a }',
      next: true,
      line: 1
  });

    fail('class A { #a = 0\n ["b"](){} }', {
      source: 'class A { #a = 0\n ["b"](){} }',
      next: true,
      line: 2
  });

    fail('class A { #["a"] = 1 }', {
      source: 'class A { #["a"] = 1 }',
      next: true,
      line: 1
  });

    fail('class A { #[a] }', {
      source: 'class A { #[a] }',
      next: true,
      line: 1
  });

    fail('class A { #"a" = 0; }', {
      source: 'class A { #"a" = 0; }',
      next: true,
      line: 1
  });

    fail('class A { *#a() { } }', {
      source: 'class A { *#a() { } }',
      next: true,
      line: 1
  });

    fail('class A { #constructor = function() {} }', {
      source: 'class A { #constructor = function() {} }',
      next: true,
      message: 'Classes may not have a private field named \'#constructor\'',
      line: 1
  });

  fail('class A { #constructor = function() {} }', {
    source: 'class A { static #"constructor" = function() {} }',
    next: true,
    message: 'Invalid or unexpected token',
    line: 1
});

fail('class A { #constructor = function() {} }', {
    source: 'class A { #"constructor" = function() {} }',
    line: 1,
    message: 'Invalid or unexpected token'
});

    fail('class A { # a = 0 }', {
      source: 'class A { # a = 0 }',
      next: true,
      line: 1
  });

    fail('class A { #0; }', {
      source: 'class A { #0; }',
      next: true,
      line: 1
  });

    fail('class A { async *#a() { } }', {
      source: 'class A { async *#a() { } }',
      next: true,
      line: 1
  });

    fail('class A { async #*a() { } }', {
      source: 'class A { async #*a() { } }',
      next: true,
      line: 1
  });

    fail('class A { static #["a"] = 0; b(){} }', {
      source: 'class A { static #["a"] = 0; b(){} }',
      next: true,
      line: 1
  });

    fail('class A { #a() {}; f() { delete this.#a } }', {
      source: 'class A { #a() {}; f() { delete this.#a } }',
      next: true,
      message: 'Private fields can not be deleted',
      line: 1,
      column: 39,
      index: 39
  });
    fail('var C = class extends A { x = true; super().x; }', {
      source: 'var C = class extends A { x = true; super().x; }',
      next: true,
      index: 43
  });

    fail('class A { static a : 0 }', {
      source: 'class A { static a : 0 }',
      next: true,
      line: 1
  });

    fail('var C = class { #x = typeof arguments; }', {
      source: 'var C = class { #x = typeof arguments; }',
      next: true,
      index: 27
  });

    fail('var C = class extends A { x = true; super().x; }', {
      source: 'var C = class extends A { x = super().x; }',
      next: true,
      index: 35
  });

    fail('class C { static "x" = /*{ initializer }*/; }  ', {
      source: 'class C { static "x" = /*{ initializer }*/; }  ',
      next: true,
      index: 22
  });

    fail('class C { x = false ? {} : /*{ initializer }*/; }  ', {
      source: 'class C { x = false ? {} : /*{ initializer }*/;}  ',
      next: true,
      index: 26
  });

    fail('var C = class { x = () => arguments; }', {
      source: 'var C = class { x = () => arguments; }',
      next: true,
      index: 25
  });

    fail('class C { x = typeof /*{ initializer }*/; }  ', {
      source: 'class C { x = typeof /*{ initializer }*/; }  ',
      next: true,
      index: 20
  });

    fail('class C { x = {} == /*{ initializer }*/; }  ', {
      source: 'class C { x = {} == /*{ initializer }*/; }  ',
      next: true,
      index: 19
  });

    fail('class C { static [x] = /*{ initializer }*/; }  ', {
      source: 'class C { static [x] = /*{ initializer }*/; }  ',
      next: true,
      index: 22
  });

    fail('class A { #a; a() { this.# a } }', {
      source: 'class A { #a; a() { this.# a } }',
      next: true,
      line: 1
  });

    fail('#foo = 123;', {
      source: '#foo = 123;',
      next: true,
      index: 0
  });

    fail('#foo.bar = 123;', {
      source: '#foo.bar = 123;',
      next: true,
      index: 0
  });

    fail('class C { x = () => arguments; }  ', {
      source: 'class C { x = () => arguments; }  ',
      next: true,
      index: 19
  });

    fail('class C { x = () => super(); }', {
      source: 'class C { x = () => super(); }',
      next: true,
      index: 25
  });

    fail('class C { [x] = arguments; }', {
      source: 'class C { [x] = arguments; }',
      next: true,
      index: 15
  });

    fail('class C {  #x = false ? {} : arguments; }', {
      source: 'class C {  #x = false ? {} : arguments; }',
      next: true,
      index: 28
  });

    fail('class C {  #x = () => arguments; }', {
      source: 'class C {  #x = () => arguments; }',
      next: true,
      index: 21
  });

    fail('class C { "constructor"; }', {
  source: 'class C { "constructor"; }',
  next: true,
  index: 23
  });

    fail('class C { x = {} == super(); }', {
      source: 'class C { x = {} == super(); }',
      next: true,
      index: 25
  });

    fail('class C {  static "x" = super(); }', {
      source: 'class C {  static "x" = super(); }',
      next: true,
      index: 29
  });

    fail('class A { # a }', {
      source: 'class A { # a }',
      next: true,
      index: 9
  });

    fail('class A { #constructor = 4 }', {
      source: 'class A { #constructor = 4 }',
      next: true,
      index: 11
  });

    pass(`class Foo extends Bar {
      bar = "foo";

      constructor() {
        super();
      }
    }`, {
    source: `class Foo extends Bar {
        bar = "foo";

        constructor() {
          super();
        }
      }`,
    next: true,
    raw: true,
    expected: {
          body: [
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'bar',
                      type: 'Identifier'
                    },
                    static: false,
                    type: 'FieldDefinition',
                    value: {
                      raw: '"foo"',
                      type: 'Literal',
                      value: 'foo',
                    }
                  },
                  {
                    computed: false,
                    key: {
                      name: 'constructor',
                      type: 'Identifier',
                    },
                    kind: 'constructor',
                    static: false,
                    type: 'MethodDefinition',
                    value: {
                      async: false,
                      body: {
                        body: [
                          {
                            expression: {
                              arguments: [],
                              callee: {
                                type: 'Super',
                              },
                              type: 'CallExpression'
                           },
                            type: 'ExpressionStatement'
                          }
                        ],
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
              superClass: {
                name: 'Bar',
                type: 'Identifier',
              },
             type: 'ClassDeclaration'
            },
          ],
          sourceType: 'script',
          type: 'Program'
        }
  });

    pass('class A { #a foo() { #a} }', {
    source: 'class A { #a foo() { #a } }',
    next: true,
    raw: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'A'
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'PrivateName',
                                name: 'a'
                            },
                            value: null,
                            computed: false,
                            static: false,
                        },
                        {
                            type: 'MethodDefinition',
                            kind: 'method',
                            static: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                name: 'foo'
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'PrivateName',
                                                name: 'a'
                                            }
                                        }
                                    ]
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null
                            }
                        }
                    ]
                }
            }
        ]
    }
  });

    pass('class A { toString() { return `maldito<${ this.#x },${ this.#y }>` } }', {
    source: 'class A { toString() { return `maldito<${ this.#x },${ this.#y }>` } }',
    next: true,
    raw: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'A'
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'MethodDefinition',
                            kind: 'method',
                            static: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                name: 'toString'
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'TemplateLiteral',
                                                expressions: [
                                                    {
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'ThisExpression'
                                                        },
                                                        computed: false,
                                                        property: {
                                                            type: 'PrivateName',
                                                            name: 'x'
                                                        }
                                                    },
                                                    {
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'ThisExpression'
                                                        },
                                                        computed: false,
                                                        property: {
                                                            type: 'PrivateName',
                                                            name: 'y'
                                                        }
                                                    }
                                                ],
                                                quasis: [
                                                    {
                                                        type: 'TemplateElement',
                                                        value: {
                                                            cooked: 'maldito<',
                                                            raw: 'maldito<'
                                                        },
                                                        tail: false
                                                    },
                                                    {
                                                        type: 'TemplateElement',
                                                        value: {
                                                            cooked: ',',
                                                            raw: ','
                                                        },
                                                        tail: false
                                                    },
                                                    {
                                                        type: 'TemplateElement',
                                                        value: {
                                                            cooked: '>',
                                                            raw: '>'
                                                        },
                                                        tail: true
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null
                            }
                        }
                    ]
                }
            }
        ]
    }
});

    pass(`class A {}
  class B extends A {
    foo = 1

    constructor () {
      (() => super())()
    }
  }`, {
    source: `class A {}
    class B extends A {
      foo = 1

      constructor () {
        (() => super())()
      }
    }`,
    next: true,
    loc: true,
    raw: true,
    ranges: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'A',
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
                    }
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [],
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
                    }
                },
                start: 0,
                end: 10,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 10
                    }
                }
            },
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'B',
                    start: 21,
                    end: 22,
                    loc: {
                        start: {
                            line: 2,
                            column: 10
                        },
                        end: {
                            line: 2,
                            column: 11
                        }
                    }
                },
                superClass: {
                    type: 'Identifier',
                    name: 'A',
                    start: 31,
                    end: 32,
                    loc: {
                        start: {
                            line: 2,
                            column: 20
                        },
                        end: {
                            line: 2,
                            column: 21
                        }
                    }
                },
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'foo',
                                start: 41,
                                end: 44,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 6
                                    },
                                    end: {
                                        line: 3,
                                        column: 9
                                    }
                                }
                            },
                            value: {
                                type: 'Literal',
                                value: 1,
                                start: 47,
                                end: 48,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 12
                                    },
                                    end: {
                                        line: 3,
                                        column: 13
                                    }
                                },
                                raw: '1'
                            },
                            computed: false,
                            static: false,
                            start: 41,
                            end: 48,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 6
                                },
                                end: {
                                    line: 3,
                                    column: 13
                                }
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            kind: 'constructor',
                            static: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                name: 'constructor',
                                start: 56,
                                end: 67,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 6
                                    },
                                    end: {
                                        line: 5,
                                        column: 17
                                    }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'CallExpression',
                                                callee: {
                                                    type: 'ArrowFunctionExpression',
                                                    body: {
                                                        type: 'CallExpression',
                                                        callee: {
                                                            type: 'Super',
                                                            start: 88,
                                                            end: 93,
                                                            loc: {
                                                                start: {
                                                                    line: 6,
                                                                    column: 15
                                                                },
                                                                end: {
                                                                    line: 6,
                                                                    column: 20
                                                                }
                                                            }
                                                        },
                                                        arguments: [],
                                                        start: 88,
                                                        end: 95,
                                                        loc: {
                                                            start: {
                                                                line: 6,
                                                                column: 15
                                                            },
                                                            end: {
                                                                line: 6,
                                                                column: 22
                                                            }
                                                        }
                                                    },
                                                    params: [],
                                                    id: null,
                                                    async: false,
                                                    generator: false,
                                                    expression: true,
                                                    start: 82,
                                                    end: 95,
                                                    loc: {
                                                        start: {
                                                            line: 6,
                                                            column: 9
                                                        },
                                                        end: {
                                                            line: 6,
                                                            column: 22
                                                        }
                                                    }
                                                },
                                                arguments: [],
                                                start: 81,
                                                end: 98,
                                                loc: {
                                                    start: {
                                                        line: 6,
                                                        column: 8
                                                    },
                                                    end: {
                                                        line: 6,
                                                        column: 25
                                                    }
                                                }
                                            },
                                            start: 81,
                                            end: 98,
                                            loc: {
                                                start: {
                                                    line: 6,
                                                    column: 8
                                                },
                                                end: {
                                                    line: 6,
                                                    column: 25
                                                }
                                            }
                                        }
                                    ],
                                    start: 71,
                                    end: 106,
                                    loc: {
                                        start: {
                                            line: 5,
                                            column: 21
                                        },
                                        end: {
                                            line: 7,
                                            column: 7
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 68,
                                end: 106,
                                loc: {
                                    start: {
                                        line: 5,
                                        column: 18
                                    },
                                    end: {
                                        line: 7,
                                        column: 7
                                    }
                                }
                            },
                            start: 56,
                            end: 106,
                            loc: {
                                start: {
                                    line: 5,
                                    column: 6
                                },
                                end: {
                                    line: 7,
                                    column: 7
                                }
                            }
                        }
                    ],
                    start: 33,
                    end: 112,
                    loc: {
                        start: {
                            line: 2,
                            column: 22
                        },
                        end: {
                            line: 8,
                            column: 5
                        }
                    }
                },
                start: 15,
                end: 112,
                loc: {
                    start: {
                        line: 2,
                        column: 4
                    },
                    end: {
                        line: 8,
                        column: 5
                    }
                }
            }
        ],
        start: 0,
        end: 112,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 8,
                column: 5
            }
        }
    }
  });

    pass(`class Point {
    #x = 1;
    #y = 2;

    constructor(x = 0, y = 0) {
      this.#x = +x;
      this.#y = +y;

      this.foo = class {
        #x = 1;
        #y = 2;

        constructor(x = 0, y = 0) {
          this.#x = +x;
          this.#y = +y;
        }

        get x() { return this.#x }
        set x(value) { this.#x = +value }

        get y() { return this.#y }
        set y(value) { this.#y = +value }

        equals(p) { return this.#x === p.#x && this.#y === p.#y }

      };
    }

    get x() { return this.#x }
    set x(value) { this.#x = +value }

    get y() { return this.#y }
    set y(value) { this.#y = +value }

    equals(p) { return this.#x === p.#x && this.#y === p.#y }

  }`, {
    source: `class Point {
        #x = 1;
        #y = 2;

        constructor(x = 0, y = 0) {
          this.#x = +x;
          this.#y = +y;

          this.foo = class {
            #x = 1;
            #y = 2;

            constructor(x = 0, y = 0) {
              this.#x = +x;
              this.#y = +y;
            }

            get x() { return this.#x }
            set x(value) { this.#x = +value }

            get y() { return this.#y }
            set y(value) { this.#y = +value }

            equals(p) { return this.#x === p.#x && this.#y === p.#y }

          };
        }

        get x() { return this.#x }
        set x(value) { this.#x = +value }

        get y() { return this.#y }
        set y(value) { this.#y = +value }

        equals(p) { return this.#x === p.#x && this.#y === p.#y }

      }`,
    next: true,
    raw: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'Point'
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'PrivateName',
                                name: 'x'
                            },
                            value: {
                                type: 'Literal',
                                value: 1,
                                raw: '1'
                            },
                            computed: false,
                            static: false
                        },
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'PrivateName',
                                name: 'y'
                            },
                            value: {
                                type: 'Literal',
                                value: 2,
                                raw: '2'
                            },
                            computed: false,
                            static: false
                        },
                        {
                            type: 'MethodDefinition',
                            kind: 'constructor',
                            static: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                name: 'constructor'
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'x'
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0,
                                            raw: '0'
                                        }
                                    },
                                    {
                                        type: 'AssignmentPattern',
                                        left: {
                                            type: 'Identifier',
                                            name: 'y'
                                        },
                                        right: {
                                            type: 'Literal',
                                            value: 0,
                                            raw: '0'
                                        }
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                left: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'PrivateName',
                                                        name: 'x'
                                                    }
                                                },
                                                operator: '=',
                                                right: {
                                                    type: 'UnaryExpression',
                                                    operator: '+',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'x'
                                                    },
                                                    prefix: true
                                                }
                                            }
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                left: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'PrivateName',
                                                        name: 'y'
                                                    }
                                                },
                                                operator: '=',
                                                right: {
                                                    type: 'UnaryExpression',
                                                    operator: '+',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'y'
                                                    },
                                                    prefix: true
                                                }
                                            }
                                        },
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                left: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'Identifier',
                                                        name: 'foo'
                                                    }
                                                },
                                                operator: '=',
                                                right: {
                                                    type: 'ClassExpression',
                                                    id: null,
                                                    superClass: null,
                                                    body: {
                                                        type: 'ClassBody',
                                                        body: [
                                                            {
                                                                type: 'FieldDefinition',
                                                                key: {
                                                                    type: 'PrivateName',
                                                                    name: 'x'
                                                                },
                                                                value: {
                                                                    type: 'Literal',
                                                                    value: 1,
                                                                    raw: '1'
                                                                },
                                                                computed: false,
                                                                static: false
                                                            },
                                                            {
                                                                type: 'FieldDefinition',
                                                                key: {
                                                                    type: 'PrivateName',
                                                                    name: 'y'
                                                                },
                                                                value: {
                                                                    type: 'Literal',
                                                                    value: 2,
                                                                    raw: '2'
                                                                },
                                                                computed: false,
                                                                static: false
                                                            },
                                                            {
                                                                type: 'MethodDefinition',
                                                                kind: 'constructor',
                                                                static: false,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'constructor'
                                                                },
                                                                value: {
                                                                    type: 'FunctionExpression',
                                                                    params: [
                                                                        {
                                                                            type: 'AssignmentPattern',
                                                                            left: {
                                                                                type: 'Identifier',
                                                                                name: 'x'
                                                                            },
                                                                            right: {
                                                                                type: 'Literal',
                                                                                value: 0,
                                                                                raw: '0'
                                                                            }
                                                                        },
                                                                        {
                                                                            type: 'AssignmentPattern',
                                                                            left: {
                                                                                type: 'Identifier',
                                                                                name: 'y'
                                                                            },
                                                                            right: {
                                                                                type: 'Literal',
                                                                                value: 0,
                                                                                raw: '0'
                                                                            }
                                                                        }
                                                                    ],
                                                                    body: {
                                                                        type: 'BlockStatement',
                                                                        body: [
                                                                            {
                                                                                type: 'ExpressionStatement',
                                                                                expression: {
                                                                                    type: 'AssignmentExpression',
                                                                                    left: {
                                                                                        type: 'MemberExpression',
                                                                                        object: {
                                                                                            type: 'ThisExpression'
                                                                                        },
                                                                                        computed: false,
                                                                                        property: {
                                                                                            type: 'PrivateName',
                                                                                            name: 'x'
                                                                                        }
                                                                                    },
                                                                                    operator: '=',
                                                                                    right: {
                                                                                        type: 'UnaryExpression',
                                                                                        operator: '+',
                                                                                        argument: {
                                                                                            type: 'Identifier',
                                                                                            name: 'x'
                                                                                        },
                                                                                        prefix: true
                                                                                    }
                                                                                }
                                                                            },
                                                                            {
                                                                                type: 'ExpressionStatement',
                                                                                expression: {
                                                                                    type: 'AssignmentExpression',
                                                                                    left: {
                                                                                        type: 'MemberExpression',
                                                                                        object: {
                                                                                            type: 'ThisExpression'
                                                                                        },
                                                                                        computed: false,
                                                                                        property: {
                                                                                            type: 'PrivateName',
                                                                                            name: 'y'
                                                                                        }
                                                                                    },
                                                                                    operator: '=',
                                                                                    right: {
                                                                                        type: 'UnaryExpression',
                                                                                        operator: '+',
                                                                                        argument: {
                                                                                            type: 'Identifier',
                                                                                            name: 'y'
                                                                                        },
                                                                                        prefix: true
                                                                                    }
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    async: false,
                                                                    generator: false,
                                                                    expression: false,
                                                                    id: null
                                                                }
                                                            },
                                                            {
                                                                type: 'MethodDefinition',
                                                                kind: 'get',
                                                                static: false,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'x'
                                                                },
                                                                value: {
                                                                    type: 'FunctionExpression',
                                                                    params: [],
                                                                    body: {
                                                                        type: 'BlockStatement',
                                                                        body: [
                                                                            {
                                                                                type: 'ReturnStatement',
                                                                                argument: {
                                                                                    type: 'MemberExpression',
                                                                                    object: {
                                                                                        type: 'ThisExpression'
                                                                                    },
                                                                                    computed: false,
                                                                                    property: {
                                                                                        type: 'PrivateName',
                                                                                        name: 'x'
                                                                                    }
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    async: false,
                                                                    generator: false,
                                                                    expression: false,
                                                                    id: null
                                                                }
                                                            },
                                                            {
                                                                type: 'MethodDefinition',
                                                                kind: 'set',
                                                                static: false,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'x'
                                                                },
                                                                value: {
                                                                    type: 'FunctionExpression',
                                                                    params: [
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'value'
                                                                        }
                                                                    ],
                                                                    body: {
                                                                        type: 'BlockStatement',
                                                                        body: [
                                                                            {
                                                                                type: 'ExpressionStatement',
                                                                                expression: {
                                                                                    type: 'AssignmentExpression',
                                                                                    left: {
                                                                                        type: 'MemberExpression',
                                                                                        object: {
                                                                                            type: 'ThisExpression'
                                                                                        },
                                                                                        computed: false,
                                                                                        property: {
                                                                                            type: 'PrivateName',
                                                                                            name: 'x'
                                                                                        }
                                                                                    },
                                                                                    operator: '=',
                                                                                    right: {
                                                                                        type: 'UnaryExpression',
                                                                                        operator: '+',
                                                                                        argument: {
                                                                                            type: 'Identifier',
                                                                                            name: 'value'
                                                                                        },
                                                                                        prefix: true
                                                                                    }
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    async: false,
                                                                    generator: false,
                                                                    expression: false,
                                                                    id: null
                                                                }
                                                            },
                                                            {
                                                                type: 'MethodDefinition',
                                                                kind: 'get',
                                                                static: false,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'y'
                                                                },
                                                                value: {
                                                                    type: 'FunctionExpression',
                                                                    params: [],
                                                                    body: {
                                                                        type: 'BlockStatement',
                                                                        body: [
                                                                            {
                                                                                type: 'ReturnStatement',
                                                                                argument: {
                                                                                    type: 'MemberExpression',
                                                                                    object: {
                                                                                        type: 'ThisExpression'
                                                                                    },
                                                                                    computed: false,
                                                                                    property: {
                                                                                        type: 'PrivateName',
                                                                                        name: 'y'
                                                                                    }
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    async: false,
                                                                    generator: false,
                                                                    expression: false,
                                                                    id: null
                                                                }
                                                            },
                                                            {
                                                                type: 'MethodDefinition',
                                                                kind: 'set',
                                                                static: false,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'y'
                                                                },
                                                                value: {
                                                                    type: 'FunctionExpression',
                                                                    params: [
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'value'
                                                                        }
                                                                    ],
                                                                    body: {
                                                                        type: 'BlockStatement',
                                                                        body: [
                                                                            {
                                                                                type: 'ExpressionStatement',
                                                                                expression: {
                                                                                    type: 'AssignmentExpression',
                                                                                    left: {
                                                                                        type: 'MemberExpression',
                                                                                        object: {
                                                                                            type: 'ThisExpression'
                                                                                        },
                                                                                        computed: false,
                                                                                        property: {
                                                                                            type: 'PrivateName',
                                                                                            name: 'y'
                                                                                        }
                                                                                    },
                                                                                    operator: '=',
                                                                                    right: {
                                                                                        type: 'UnaryExpression',
                                                                                        operator: '+',
                                                                                        argument: {
                                                                                            type: 'Identifier',
                                                                                            name: 'value'
                                                                                        },
                                                                                        prefix: true
                                                                                    }
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    async: false,
                                                                    generator: false,
                                                                    expression: false,
                                                                    id: null
                                                                }
                                                            },
                                                            {
                                                                type: 'MethodDefinition',
                                                                kind: 'method',
                                                                static: false,
                                                                computed: false,
                                                                key: {
                                                                    type: 'Identifier',
                                                                    name: 'equals'
                                                                },
                                                                value: {
                                                                    type: 'FunctionExpression',
                                                                    params: [
                                                                        {
                                                                            type: 'Identifier',
                                                                            name: 'p'
                                                                        }
                                                                    ],
                                                                    body: {
                                                                        type: 'BlockStatement',
                                                                        body: [
                                                                            {
                                                                                type: 'ReturnStatement',
                                                                                argument: {
                                                                                    type: 'LogicalExpression',
                                                                                    left: {
                                                                                        type: 'BinaryExpression',
                                                                                        left: {
                                                                                            type: 'MemberExpression',
                                                                                            object: {
                                                                                                type: 'ThisExpression'
                                                                                            },
                                                                                            computed: false,
                                                                                            property: {
                                                                                                type: 'PrivateName',
                                                                                                name: 'x'
                                                                                            }
                                                                                        },
                                                                                        right: {
                                                                                            type: 'MemberExpression',
                                                                                            object: {
                                                                                                type: 'Identifier',
                                                                                                name: 'p'
                                                                                            },
                                                                                            computed: false,
                                                                                            property: {
                                                                                                type: 'PrivateName',
                                                                                                name: 'x'
                                                                                            }
                                                                                        },
                                                                                        operator: '==='
                                                                                    },
                                                                                    right: {
                                                                                        type: 'BinaryExpression',
                                                                                        left: {
                                                                                            type: 'MemberExpression',
                                                                                            object: {
                                                                                                type: 'ThisExpression'
                                                                                            },
                                                                                            computed: false,
                                                                                            property: {
                                                                                                type: 'PrivateName',
                                                                                                name: 'y'
                                                                                            }
                                                                                        },
                                                                                        right: {
                                                                                            type: 'MemberExpression',
                                                                                            object: {
                                                                                                type: 'Identifier',
                                                                                                name: 'p'
                                                                                            },
                                                                                            computed: false,
                                                                                            property: {
                                                                                                type: 'PrivateName',
                                                                                                name: 'y'
                                                                                            }
                                                                                        },
                                                                                        operator: '==='
                                                                                    },
                                                                                    operator: '&&'
                                                                                }
                                                                            }
                                                                        ]
                                                                    },
                                                                    async: false,
                                                                    generator: false,
                                                                    expression: false,
                                                                    id: null
                                                                }
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            kind: 'get',
                            static: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'MemberExpression',
                                                object: {
                                                    type: 'ThisExpression'
                                                },
                                                computed: false,
                                                property: {
                                                    type: 'PrivateName',
                                                    name: 'x'
                                                }
                                            }
                                        }
                                    ]
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            kind: 'set',
                            static: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                name: 'x'
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'value'
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                left: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'PrivateName',
                                                        name: 'x'
                                                    }
                                                },
                                                operator: '=',
                                                right: {
                                                    type: 'UnaryExpression',
                                                    operator: '+',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'value'
                                                    },
                                                    prefix: true
                                                }
                                            }
                                        }
                                    ]
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            kind: 'get',
                            static: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'MemberExpression',
                                                object: {
                                                    type: 'ThisExpression'
                                                },
                                                computed: false,
                                                property: {
                                                    type: 'PrivateName',
                                                    name: 'y'
                                                }
                                            }
                                        }
                                    ]
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            kind: 'set',
                            static: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                name: 'y'
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'value'
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ExpressionStatement',
                                            expression: {
                                                type: 'AssignmentExpression',
                                                left: {
                                                    type: 'MemberExpression',
                                                    object: {
                                                        type: 'ThisExpression'
                                                    },
                                                    computed: false,
                                                    property: {
                                                        type: 'PrivateName',
                                                        name: 'y'
                                                    }
                                                },
                                                operator: '=',
                                                right: {
                                                    type: 'UnaryExpression',
                                                    operator: '+',
                                                    argument: {
                                                        type: 'Identifier',
                                                        name: 'value'
                                                    },
                                                    prefix: true
                                                }
                                            }
                                        }
                                    ]
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            kind: 'method',
                            static: false,
                            computed: false,
                            key: {
                                type: 'Identifier',
                                name: 'equals'
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [
                                    {
                                        type: 'Identifier',
                                        name: 'p'
                                    }
                                ],
                                body: {
                                    type: 'BlockStatement',
                                    body: [
                                        {
                                            type: 'ReturnStatement',
                                            argument: {
                                                type: 'LogicalExpression',
                                                left: {
                                                    type: 'BinaryExpression',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'ThisExpression'
                                                        },
                                                        computed: false,
                                                        property: {
                                                            type: 'PrivateName',
                                                            name: 'x'
                                                        }
                                                    },
                                                    right: {
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'p'
                                                        },
                                                        computed: false,
                                                        property: {
                                                            type: 'PrivateName',
                                                            name: 'x'
                                                        }
                                                    },
                                                    operator: '==='
                                                },
                                                right: {
                                                    type: 'BinaryExpression',
                                                    left: {
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'ThisExpression'
                                                        },
                                                        computed: false,
                                                        property: {
                                                            type: 'PrivateName',
                                                            name: 'y'
                                                        }
                                                    },
                                                    right: {
                                                        type: 'MemberExpression',
                                                        object: {
                                                            type: 'Identifier',
                                                            name: 'p'
                                                        },
                                                        computed: false,
                                                        property: {
                                                            type: 'PrivateName',
                                                            name: 'y'
                                                        }
                                                    },
                                                    operator: '==='
                                                },
                                                operator: '&&'
                                            }
                                        }
                                    ]
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null
                            }
                        }
                    ]
                }
            }
        ]
    }
});

    pass('class a {  #a = 0; ["b"](){} }', {
      source: 'class a {  #a = 0; ["b"](){} }',
      next: true,
      loc: true,
      ranges: true,
      expected: {
          type: 'Program',
          sourceType: 'script',
          body: [{
              type: 'ClassDeclaration',
              id: {
                  type: 'Identifier',
                  name: 'a',
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
                  }
              },
              superClass: null,
              body: {
                  type: 'ClassBody',
                  body: [{
                          type: 'FieldDefinition',
                          key: {
                              type: 'PrivateName',
                              name: 'a',
                              start: 11,
                              end: 13,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 11
                                  },
                                  end: {
                                      line: 1,
                                      column: 13
                                  }
                              }
                          },
                          value: {
                              type: 'Literal',
                              value: 0,
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
                              }
                          },
                          computed: false,
                          static: false,
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
                          }
                      },
                      {
                          type: 'MethodDefinition',
                          kind: 'method',
                          static: false,
                          computed: true,
                          key: {
                              type: 'Literal',
                              value: 'b',
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
                              }
                          },
                          value: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  body: [],
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
                                  }
                              },
                              async: false,
                              generator: false,
                              expression: false,
                              id: null,
                              start: 24,
                              end: 28,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 24
                                  },
                                  end: {
                                      line: 1,
                                      column: 28
                                  }
                              }
                          },
                          start: 19,
                          end: 28,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 19
                              },
                              end: {
                                  line: 1,
                                  column: 28
                              }
                          }
                      }
                  ],
                  start: 8,
                  end: 30,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
                      },
                      end: {
                          line: 1,
                          column: 30
                      }
                  }
              },
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
              }
          }],
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
          }
      }
  });

    pass('class a {  #a; b(){} }', {
      source: 'class a {  #a; b(){} }',
      next: true,
      loc: true,
      ranges: true,
      expected: {
          type: 'Program',
          sourceType: 'script',
          body: [{
              type: 'ClassDeclaration',
              id: {
                  type: 'Identifier',
                  name: 'a',
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
                  }
              },
              superClass: null,
              body: {
                  type: 'ClassBody',
                  body: [{
                          type: 'FieldDefinition',
                          key: {
                              type: 'PrivateName',
                              name: 'a',
                              start: 11,
                              end: 13,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 11
                                  },
                                  end: {
                                      line: 1,
                                      column: 13
                                  }
                              }
                          },
                          value: null,
                          computed: false,
                          static: false,
                          start: 11,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          }
                      },
                      {
                          type: 'MethodDefinition',
                          kind: 'method',
                          static: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              name: 'b',
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
                          },
                          value: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  body: [],
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
                                  }
                              },
                              async: false,
                              generator: false,
                              expression: false,
                              id: null,
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
                              }
                          },
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
                          }
                      }
                  ],
                  start: 8,
                  end: 22,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
                      },
                      end: {
                          line: 1,
                          column: 22
                      }
                  }
              },
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
              }
          }],
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
          }
      }
  });

    pass('class C { #a = function t() { arguments; } }', {
      source: 'class C { #a = function t() { arguments; } }',
      next: true,
      loc: true,
      ranges: true,
      expected: {
          type: 'Program',
          sourceType: 'script',
          body: [{
              type: 'ClassDeclaration',
              id: {
                  type: 'Identifier',
                  name: 'C',
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
                  }
              },
              superClass: null,
              body: {
                  type: 'ClassBody',
                  body: [{
                      type: 'FieldDefinition',
                      key: {
                          type: 'PrivateName',
                          name: 'a',
                          start: 10,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          }
                      },
                      value: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                              type: 'BlockStatement',
                              body: [{
                                  type: 'ExpressionStatement',
                                  expression: {
                                      type: 'Identifier',
                                      name: 'arguments',
                                      start: 30,
                                      end: 39,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 30
                                          },
                                          end: {
                                              line: 1,
                                              column: 39
                                          }
                                      }
                                  },
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
                                  }
                              }],
                              start: 28,
                              end: 42,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 28
                                  },
                                  end: {
                                      line: 1,
                                      column: 42
                                  }
                              }
                          },
                          async: false,
                          generator: false,
                          expression: false,
                          id: {
                              type: 'Identifier',
                              name: 't',
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
                          },
                          start: 15,
                          end: 42,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 15
                              },
                              end: {
                                  line: 1,
                                  column: 42
                              }
                          }
                      },
                      computed: false,
                      static: false,
                      start: 10,
                      end: 42,
                      loc: {
                          start: {
                              line: 1,
                              column: 10
                          },
                          end: {
                              line: 1,
                              column: 42
                          }
                      }
                  }],
                  start: 8,
                  end: 44,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
                      },
                      end: {
                          line: 1,
                          column: 44
                      }
                  }
              },
              start: 0,
              end: 44,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 44
                  }
              }
          }],
          start: 0,
          end: 44,
          loc: {
              start: {
                  line: 1,
                  column: 0
              },
              end: {
                  line: 1,
                  column: 44
              }
          }
      }
  });

    pass('class C { #await = 0; }', {
      source: 'class C { #await = 0; }',
      next: true,
      loc: true,
      ranges: true,
      expected: {
          type: 'Program',
          sourceType: 'script',
          body: [{
              type: 'ClassDeclaration',
              id: {
                  type: 'Identifier',
                  name: 'C',
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
                  }
              },
              superClass: null,
              body: {
                  type: 'ClassBody',
                  body: [{
                      type: 'FieldDefinition',
                      key: {
                          type: 'PrivateName',
                          name: 'await',
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
                          }
                      },
                      value: {
                          type: 'Literal',
                          value: 0,
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
                      },
                      computed: false,
                      static: false,
                      start: 10,
                      end: 20,
                      loc: {
                          start: {
                              line: 1,
                              column: 10
                          },
                          end: {
                              line: 1,
                              column: 20
                          }
                      }
                  }],
                  start: 8,
                  end: 23,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
                      },
                      end: {
                          line: 1,
                          column: 23
                      }
                  }
              },
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
              }
          }],
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
          }
      }
  });

    pass('class C { [x] = 0 }', {
      source: 'class C { [x] = 0 }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      type: 'FieldDefinition',
                      computed: true,
                      static: false,
                      key: {
                          type: 'Identifier',
                          name: 'x'
                      },
                      value: {
                          type: 'Literal',
                          value: 0
                      }
                  }],
                  type: 'ClassBody',
              },
              id: {
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class C { x = 0 }', {
      source: 'class C { x = 0 }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      type: 'FieldDefinition',
                      key: {
                          type: 'Identifier',
                          name: 'x'
                      },
                      value: {
                          type: 'Literal',
                          value: 0
                      },
                      computed: false,
                      static: false,
                  }],
                  type: 'ClassBody',
              },
              id: {
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class C { x }', {
      source: 'class C { x  }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      type: 'FieldDefinition',
                      key: {
                          type: 'Identifier',
                          name: 'x'
                      },
                      value: null,
                      computed: false,
                      static: false,
                  }],
                  type: 'ClassBody',
              },
              id: {
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class C { async }', {
      source: 'class C { async  }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      type: 'FieldDefinition',
                      key: {
                          type: 'Identifier',
                          name: 'async'
                      },
                      value: null,
                      computed: false,
                      static: false,
                  }],
                  type: 'ClassBody',
              },
              id: {
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class C { async = 5 }', {
      source: 'class C { async = 5  }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      type: 'FieldDefinition',
                      key: {
                          type: 'Identifier',
                          name: 'async'
                      },
                      value: {
                          type: 'Literal',
                          value: 5
                      },
                      computed: false,
                      static: false,
                  }],
                  type: 'ClassBody',
              },
              id: {
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class C { #x }', {
      source: 'class C { #x }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      type: 'FieldDefinition',
                      static: false,
                      computed: false,
                      key: {
                          type: 'PrivateName',
                          name: 'x'
                      },
                      value: null,
                  }],
                  type: 'ClassBody',
              },
              id: {
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class C { #x = 0 }', {
      source: 'class C { #x = 0 }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      type: 'FieldDefinition',
                      computed: false,
                      static: false,
                      key: {
                          type: 'PrivateName',
                          name: 'x'
                      },
                      value: {
                          type: 'Literal',
                          value: 0
                      }
                  }],
                  type: 'ClassBody',
              },
              id: {
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class C { p1 = 1, p2 = 2; }', {
      source: 'class C { p1 = 1, p2 = 2; }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          static: false,
                          key: {
                              name: 'p1',
                              type: 'Identifier'
                          },
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 1,
                          }
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              name: 'p2',
                              type: 'Identifier',
                          },
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 2,
                          }
                      }
                  ],
                  type: 'ClassBody',
              },
              id: {
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class Foo { async #evil() { await notReally(); }}', {
      source: 'class Foo { async #evil() { await notReally(); }}',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      computed: false,
                      key: {
                          name: 'evil',
                          type: 'PrivateName',
                      },
                      kind: 'method',
                      static: false,
                      type: 'MethodDefinition',
                      value: {
                          async: true,
                          body: {
                              body: [{
                                  expression: {
                                      argument: {
                                          arguments: [],
                                          callee: {
                                              name: 'notReally',
                                              type: 'Identifier',
                                          },
                                          type: 'CallExpression'
                                      },
                                      type: 'AwaitExpression'
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
                  }],
                  type: 'ClassBody'
              },
              id: {
                  name: 'Foo',
                  type: 'Identifier'
              },
              superClass: null,
              type: 'ClassDeclaration'
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class foo { #async = 0 }', {
      source: 'class foo { #async = 0 }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      computed: false,
                      key: {
                          name: 'async',
                          type: 'PrivateName',
                      },
                      static: false,
                      type: 'FieldDefinition',
                      value: {
                          type: 'Literal',
                          value: 0,
                      }
                  }],
                  type: 'ClassBody',
              },
              id: {
                  name: 'foo',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration',
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class foo { #async\n a(){} }', {
      source: 'class foo { #async\n a(){} }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          key: {
                              name: 'async',
                              type: 'PrivateName'
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
              id: {
                  name: 'foo',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program',
      }
  });

    pass('class foo { #await; }', {
      source: 'class foo { #await; }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      computed: false,
                      key: {
                          name: 'await',
                          type: 'PrivateName',
                      },
                      static: false,
                      type: 'FieldDefinition',
                      value: null,
                  }],
                  type: 'ClassBody',
              },
              id: {
                  name: 'foo',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class foo { #async\n a }', {
      source: 'class foo { #async\n a }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          key: {
                              name: 'async',
                              type: 'PrivateName'
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
                  type: 'ClassBody',
              },
              id: {
                  name: 'foo',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class foo { #a\n static }', {
      source: 'class foo { #a\n static }',
      next: true,
      expected: {
          body: [{
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
                  name: 'foo',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class foo { #a, a }', {
      source: 'class foo { #a, a }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          static: false,
                          key: {
                              name: 'a',
                              type: 'PrivateName'
                          },
                          type: 'FieldDefinition',
                          value: null,
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              name: 'a',
                              type: 'Identifier',
                          },
                          type: 'FieldDefinition',
                          value: null,
                      },
                  ],
                  type: 'ClassBody',
              },
              id: {
                  name: 'foo',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass(` class A {
  #foo
  constructor () {
      foo;
      bar; bar;
      a = b;
      b = b;
  }
}`, {
      source: `class A {
    #foo
    constructor () {
        foo;
        bar; bar;
        a = b;
        b = b;
    }
}`,
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          static: false,
                          key: {
                              name: 'foo',
                              type: 'PrivateName'
                          },
                          type: 'FieldDefinition',
                          value: null,
                      },
                      {
                          computed: false,
                          key: {
                              name: 'constructor',
                              type: 'Identifier',
                          },
                          kind: 'constructor',
                          static: false,
                          type: 'MethodDefinition',
                          value: {
                              async: false,
                              body: {
                                  body: [{
                                          expression: {
                                              name: 'foo',
                                              type: 'Identifier'
                                          },
                                          type: 'ExpressionStatement'
                                      },
                                      {
                                          expression: {
                                              name: 'bar',
                                              type: 'Identifier'
                                          },
                                          type: 'ExpressionStatement'
                                      },
                                      {
                                          expression: {
                                              name: 'bar',
                                              type: 'Identifier'
                                          },
                                          type: 'ExpressionStatement'
                                      },
                                      {
                                          expression: {
                                              left: {
                                                  name: 'a',
                                                  type: 'Identifier'
                                              },
                                              operator: '=',
                                              right: {
                                                  name: 'b',
                                                  type: 'Identifier'
                                              },
                                              type: 'AssignmentExpression'
                                          },
                                          type: 'ExpressionStatement'
                                      },
                                      {
                                          expression: {
                                              left: {
                                                  name: 'b',
                                                  type: 'Identifier'
                                              },
                                              operator: '=',
                                              right: {
                                                  name: 'b',
                                                  type: 'Identifier'
                                              },
                                              type: 'AssignmentExpression'
                                          },
                                          type: 'ExpressionStatement'
                                      }
                                  ],
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
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class C { p1 = 1, p2 = 2; }', {
      source: 'class C { p1 = 1, p2 = 2; }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          static: false,
                          key: {
                              name: 'p1',
                              type: 'Identifier'
                          },
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 1,
                          }
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              name: 'p2',
                              type: 'Identifier',
                          },
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 2,
                          }
                      }
                  ],
                  type: 'ClassBody',
              },
              id: {
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class C { async *m() { return 42; } /*{ fields }*/; }', {
      source: 'class C { async *m() { return 42; } /*{ fields }*/; }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      computed: false,
                      static: false,
                      key: {
                          name: 'm',
                          type: 'Identifier'
                      },
                      kind: 'method',
                      type: 'MethodDefinition',
                      value: {
                          async: true,
                          body: {
                              body: [{
                                  argument: {
                                      type: 'Literal',
                                      value: 42,
                                  },
                                  type: 'ReturnStatement'
                              }],
                              type: 'BlockStatement',
                          },
                          expression: false,
                          generator: true,
                          id: null,
                          params: [],
                          type: 'FunctionExpression'
                      }
                  }],
                  type: 'ClassBody'
              },
              id: {
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass(`class C {
  foo = "foobar";
  m() { return 42 }
  /*{ fields }*/
  m2() { return 39 }
  bar = "barbaz";
}`, {
      source: `class C {
  foo = "foobar";
  m() { return 42 }
  /*{ fields }*/
  m2() { return 39 }
  bar = "barbaz";
}`,
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          static: false,
                          key: {
                              name: 'foo',
                              type: 'Identifier'
                          },
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 'foobar',
                          }
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              name: 'm',
                              type: 'Identifier'
                          },
                          kind: 'method',
                          type: 'MethodDefinition',
                          value: {
                              async: false,
                              body: {
                                  body: [{
                                      argument: {
                                          type: 'Literal',
                                          value: 42,
                                      },
                                      type: 'ReturnStatement'
                                  }],
                                  type: 'BlockStatement'
                              },
                              expression: false,
                              generator: false,
                              id: null,
                              params: [],
                              type: 'FunctionExpression'
                          }
                      },
                      {
                          computed: false,
                          key: {
                              name: 'm2',
                              type: 'Identifier'
                          },
                          kind: 'method',
                          static: false,
                          type: 'MethodDefinition',
                          value: {
                              async: false,
                              body: {
                                  body: [{
                                      argument: {
                                          type: 'Literal',
                                          value: 39,
                                      },
                                      type: 'ReturnStatement'
                                  }],
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
                          computed: false,
                          static: false,
                          key: {
                              name: 'bar',
                              type: 'Identifier'
                          },
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 'barbaz'
                          }
                      }
                  ],
                  type: 'ClassBody'
              },
              id: {
                  name: 'C',
                  type: 'Identifier'
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class C { async *m() { return 42; } "a"; "b"; "c" = 39;  "d" = 42; }', {
      source: 'class C { async *m() { return 42; } "a"; "b"; "c" = 39;  "d" = 42; }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          key: {
                              name: 'm',
                              type: 'Identifier'
                          },
                          kind: 'method',
                          static: false,
                          type: 'MethodDefinition',
                          value: {
                              async: true,
                              body: {
                                  body: [{
                                      argument: {
                                          type: 'Literal',
                                          value: 42,
                                      },
                                      type: 'ReturnStatement'
                                  }],
                                  type: 'BlockStatement'
                              },
                              expression: false,
                              generator: true,
                              id: null,
                              params: [],
                              type: 'FunctionExpression'
                          }
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              type: 'Literal',
                              value: 'a',
                          },
                          type: 'FieldDefinition',
                          value: null,
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              type: 'Literal',
                              value: 'b',
                          },
                          type: 'FieldDefinition',
                          value: null,
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              type: 'Literal',
                              value: 'c',
                          },
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 39,
                          }
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              type: 'Literal',
                              value: 'd',
                          },
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 42,
                          }
                      }
                  ],
                  type: 'ClassBody'
              },
              id: {
                  name: 'C',
                  type: 'Identifier'
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass(`class C {
;;;;
;;;;;;'a'; "b"; 'c' = 39;
"d" = 42;;;;;;;
;;;;

}`, {
      source: `class C {
  ;;;;
  ;;;;;;'a'; "b"; 'c' = 39;
  "d" = 42;;;;;;;
  ;;;;

}`,
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          static: false,
                          key: {
                              type: 'Literal',
                              value: 'a',
                          },
                          type: 'FieldDefinition',
                          value: null,
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              type: 'Literal',
                              value: 'b',
                          },
                          type: 'FieldDefinition',
                          value: null,
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              type: 'Literal',
                              value: 'c',
                          },
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 39,
                          }
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              type: 'Literal',
                              value: 'd'
                          },
                          type: 'FieldDefinition',
                          value: {
                              type: 'Literal',
                              value: 42,
                          }
                      }
                  ],
                  type: 'ClassBody'
              },
              id: {
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class C { x, y; d(){} f(){} }', {
      source: 'class C { x, y; d(){} f(){} }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          static: false,
                          key: {
                              name: 'x',
                              type: 'Identifier'
                          },
                          type: 'FieldDefinition',
                          value: null,
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              name: 'y',
                              type: 'Identifier'
                          },
                          type: 'FieldDefinition',
                          value: null,
                      },
                      {
                          computed: false,
                          key: {
                              name: 'd',
                              type: 'Identifier'
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
                      },
                      {
                          computed: false,
                          key: {
                              name: 'f',
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
                  name: 'C',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class A { /*a*/a/*b*/ }', {
      source: 'class A { /*a*/a/*b*/ }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      computed: false,
                      static: false,
                      key: {
                          name: 'a',
                          type: 'Identifier',
                      },
                      type: 'FieldDefinition',
                      value: null,
                  }],
                  type: 'ClassBody'
              },
              id: {
                  name: 'A',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class A { #a = 0; *b(){} }', {
      source: 'class A { #a = 0; *b(){} }',
      next: true,
      loc: true,
      ranges: true,
      expected: {
          type: 'Program',
          sourceType: 'script',
          body: [{
              type: 'ClassDeclaration',
              id: {
                  type: 'Identifier',
                  name: 'A',
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
                  }
              },
              superClass: null,
              body: {
                  type: 'ClassBody',
                  body: [{
                          type: 'FieldDefinition',
                          key: {
                              type: 'PrivateName',
                              name: 'a',
                              start: 10,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 10
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              }
                          },
                          value: {
                              type: 'Literal',
                              value: 0,
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
                          },
                          computed: false,
                          static: false,
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
                          }
                      },
                      {
                          type: 'MethodDefinition',
                          kind: 'method',
                          static: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              name: 'b',
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
                          },
                          value: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  body: [],
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
                                  }
                              },
                              async: false,
                              generator: true,
                              expression: false,
                              id: null,
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
                              }
                          },
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
                          }
                      }
                  ],
                  start: 8,
                  end: 26,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
                      },
                      end: {
                          line: 1,
                          column: 26
                      }
                  }
              },
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
              }
          }],
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
          }
      }
  });

    pass('class A { #a = 0; *b(){} }', {
      source: 'class A { #a = 0; *b(){} }',
      next: true,
      loc: true,
      ranges: true,
      expected: {
          type: 'Program',
          sourceType: 'script',
          body: [{
              type: 'ClassDeclaration',
              id: {
                  type: 'Identifier',
                  name: 'A',
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
                  }
              },
              superClass: null,
              body: {
                  type: 'ClassBody',
                  body: [{
                          type: 'FieldDefinition',
                          key: {
                              type: 'PrivateName',
                              name: 'a',
                              start: 10,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 10
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              }
                          },
                          value: {
                              type: 'Literal',
                              value: 0,
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
                          },
                          computed: false,
                          static: false,
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
                          }
                      },
                      {
                          type: 'MethodDefinition',
                          kind: 'method',
                          static: false,
                          computed: false,
                          key: {
                              type: 'Identifier',
                              name: 'b',
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
                          },
                          value: {
                              type: 'FunctionExpression',
                              params: [],
                              body: {
                                  type: 'BlockStatement',
                                  body: [],
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
                                  }
                              },
                              async: false,
                              generator: true,
                              expression: false,
                              id: null,
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
                              }
                          },
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
                          }
                      }
                  ],
                  start: 8,
                  end: 26,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
                      },
                      end: {
                          line: 1,
                          column: 26
                      }
                  }
              },
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
              }
          }],
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
          }
      }
  });

    pass('class A { #a = 0\n }', {
      source: 'class A { #a = 0\n }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                      computed: false,
                      static: false,
                      key: {
                          name: 'a',
                          type: 'PrivateName',
                      },
                      type: 'FieldDefinition',
                      value: {
                          type: 'Literal',
                          value: 0,
                      }
                  }],
                  type: 'ClassBody',
              },
              id: {
                  name: 'A',
                  type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass('class A { x; y; }', {
    source: 'class A { x; y; }',
    next: true,
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'A',
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
                    }
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'x',
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
                                }
                            },
                            value: null,
                            computed: false,
                            static: false,
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
                            }
                        },
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'y',
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
                            },
                            value: null,
                            computed: false,
                            static: false,
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
                    ],
                    start: 8,
                    end: 17,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 17
                        }
                    }
                },
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
                }
            }
        ],
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
        }
    }
  });

    pass('class B { x = 0; y = 1; }', {
    source: 'class B { x = 0; y = 1; }',
    next: true,
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'B',
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
                    }
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'x',
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
                                }
                            },
                            value: {
                                type: 'Literal',
                                value: 0,
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
                                raw: '0'
                            },
                            computed: false,
                            static: false,
                            start: 10,
                            end: 15,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 10
                                },
                                end: {
                                    line: 1,
                                    column: 15
                                }
                            }
                        },
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'y',
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
                            },
                            value: {
                                type: 'Literal',
                                value: 1,
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
                                raw: '1'
                            },
                            computed: false,
                            static: false,
                            start: 17,
                            end: 22,
                            loc: {
                                start: {
                                    line: 1,
                                    column: 17
                                },
                                end: {
                                    line: 1,
                                    column: 22
                                }
                            }
                        }
                    ],
                    start: 8,
                    end: 25,
                    loc: {
                        start: {
                            line: 1,
                            column: 8
                        },
                        end: {
                            line: 1,
                            column: 25
                        }
                    }
                },
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
                }
            }
        ],
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
        }
    }
  });

    pass('class A { #a\n get }', {
      source: 'class A { #a\n get }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          static: false,
                          key: {
                              name: 'a',
                              type: 'PrivateName',
                          },
                          type: 'FieldDefinition',
                          value: null,
                      },
                      {
                          computed: false,
                          static: false,
                          key: {
                              name: 'get',
                              type: 'Identifier',
                          },
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
          }, ],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass(`class Foo {
    x
    y
  }

  class Foo {
    p
    [m] () {}
  }`, {
    source: `class Foo {
        x
        y
      }

      class Foo {
        p
        [m] () {}
      }`,
    next: true,
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'Foo',
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
                    }
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'x',
                                start: 20,
                                end: 21,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 8
                                    },
                                    end: {
                                        line: 2,
                                        column: 9
                                    }
                                }
                            },
                            value: null,
                            computed: false,
                            static: false,
                            start: 20,
                            end: 21,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 8
                                },
                                end: {
                                    line: 2,
                                    column: 9
                                }
                            }
                        },
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'y',
                                start: 30,
                                end: 31,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 8
                                    },
                                    end: {
                                        line: 3,
                                        column: 9
                                    }
                                }
                            },
                            value: null,
                            computed: false,
                            static: false,
                            start: 30,
                            end: 31,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 8
                                },
                                end: {
                                    line: 3,
                                    column: 9
                                }
                            }
                        }
                    ],
                    start: 10,
                    end: 39,
                    loc: {
                        start: {
                            line: 1,
                            column: 10
                        },
                        end: {
                            line: 4,
                            column: 7
                        }
                    }
                },
                start: 0,
                end: 39,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 7
                    }
                }
            },
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'Foo',
                    start: 53,
                    end: 56,
                    loc: {
                        start: {
                            line: 6,
                            column: 12
                        },
                        end: {
                            line: 6,
                            column: 15
                        }
                    }
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'p',
                                start: 67,
                                end: 68,
                                loc: {
                                    start: {
                                        line: 7,
                                        column: 8
                                    },
                                    end: {
                                        line: 7,
                                        column: 9
                                    }
                                }
                            },
                            value: null,
                            computed: false,
                            static: false,
                            start: 67,
                            end: 68,
                            loc: {
                                start: {
                                    line: 7,
                                    column: 8
                                },
                                end: {
                                    line: 7,
                                    column: 9
                                }
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            kind: 'method',
                            static: false,
                            computed: true,
                            key: {
                                type: 'Identifier',
                                name: 'm',
                                start: 78,
                                end: 79,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 9
                                    },
                                    end: {
                                        line: 8,
                                        column: 10
                                    }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 84,
                                    end: 86,
                                    loc: {
                                        start: {
                                            line: 8,
                                            column: 15
                                        },
                                        end: {
                                            line: 8,
                                            column: 17
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 81,
                                end: 86,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 12
                                    },
                                    end: {
                                        line: 8,
                                        column: 17
                                    }
                                }
                            },
                            start: 77,
                            end: 86,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 8
                                },
                                end: {
                                    line: 8,
                                    column: 17
                                }
                            }
                        }
                    ],
                    start: 57,
                    end: 94,
                    loc: {
                        start: {
                            line: 6,
                            column: 16
                        },
                        end: {
                            line: 9,
                            column: 7
                        }
                    }
                },
                start: 47,
                end: 94,
                loc: {
                    start: {
                        line: 6,
                        column: 6
                    },
                    end: {
                        line: 9,
                        column: 7
                    }
                }
            }
        ],
        start: 0,
        end: 94,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 9,
                column: 7
            }
        }
    }
});

    pass(`class Foo {
    [x]
    ['y']
  }

  class Foo {
    [p]
    [m] () {}
  }`, {
    source: `class Foo {
        [x]
        ['y']
      }

      class Foo {
        [p]
        [m] () {}
      }`,
    next: true,
    loc: true,
    ranges: true,
    raw: true,
    expected: {
        type: 'Program',
        sourceType: 'script',
        body: [
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'Foo',
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
                    }
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'x',
                                start: 21,
                                end: 22,
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 9
                                    },
                                    end: {
                                        line: 2,
                                        column: 10
                                    }
                                }
                            },
                            value: null,
                            static: false,
                            computed: true,
                            start: 20,
                            end: 23,
                            loc: {
                                start: {
                                    line: 2,
                                    column: 8
                                },
                                end: {
                                    line: 2,
                                    column: 11
                                }
                            }
                        },
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'Literal',
                                value: 'y',
                                start: 33,
                                end: 36,
                                loc: {
                                    start: {
                                        line: 3,
                                        column: 9
                                    },
                                    end: {
                                        line: 3,
                                        column: 12
                                    }
                                },
                                raw: '\'y\''
                            },
                            value: null,
                            computed: true,
                            static: false,
                            start: 32,
                            end: 37,
                            loc: {
                                start: {
                                    line: 3,
                                    column: 8
                                },
                                end: {
                                    line: 3,
                                    column: 13
                                }
                            }
                        }
                    ],
                    start: 10,
                    end: 45,
                    loc: {
                        start: {
                            line: 1,
                            column: 10
                        },
                        end: {
                            line: 4,
                            column: 7
                        }
                    }
                },
                start: 0,
                end: 45,
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 4,
                        column: 7
                    }
                }
            },
            {
                type: 'ClassDeclaration',
                id: {
                    type: 'Identifier',
                    name: 'Foo',
                    start: 59,
                    end: 62,
                    loc: {
                        start: {
                            line: 6,
                            column: 12
                        },
                        end: {
                            line: 6,
                            column: 15
                        }
                    }
                },
                superClass: null,
                body: {
                    type: 'ClassBody',
                    body: [
                        {
                            type: 'FieldDefinition',
                            key: {
                                type: 'Identifier',
                                name: 'p',
                                start: 74,
                                end: 75,
                                loc: {
                                    start: {
                                        line: 7,
                                        column: 9
                                    },
                                    end: {
                                        line: 7,
                                        column: 10
                                    }
                                }
                            },
                            value: null,
                            computed: true,
                            static: false,
                            start: 73,
                            end: 76,
                            loc: {
                                start: {
                                    line: 7,
                                    column: 8
                                },
                                end: {
                                    line: 7,
                                    column: 11
                                }
                            }
                        },
                        {
                            type: 'MethodDefinition',
                            kind: 'method',
                            static: false,
                            computed: true,
                            key: {
                                type: 'Identifier',
                                name: 'm',
                                start: 86,
                                end: 87,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 9
                                    },
                                    end: {
                                        line: 8,
                                        column: 10
                                    }
                                }
                            },
                            value: {
                                type: 'FunctionExpression',
                                params: [],
                                body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 92,
                                    end: 94,
                                    loc: {
                                        start: {
                                            line: 8,
                                            column: 15
                                        },
                                        end: {
                                            line: 8,
                                            column: 17
                                        }
                                    }
                                },
                                async: false,
                                generator: false,
                                expression: false,
                                id: null,
                                start: 89,
                                end: 94,
                                loc: {
                                    start: {
                                        line: 8,
                                        column: 12
                                    },
                                    end: {
                                        line: 8,
                                        column: 17
                                    }
                                }
                            },
                            start: 85,
                            end: 94,
                            loc: {
                                start: {
                                    line: 8,
                                    column: 8
                                },
                                end: {
                                    line: 8,
                                    column: 17
                                }
                            }
                        }
                    ],
                    start: 63,
                    end: 102,
                    loc: {
                        start: {
                            line: 6,
                            column: 16
                        },
                        end: {
                            line: 9,
                            column: 7
                        }
                    }
                },
                start: 53,
                end: 102,
                loc: {
                    start: {
                        line: 6,
                        column: 6
                    },
                    end: {
                        line: 9,
                        column: 7
                    }
                }
            }
        ],
        start: 0,
        end: 102,
        loc: {
            start: {
                line: 1,
                column: 0
            },
            end: {
                line: 9,
                column: 7
            }
        }
    }
  });

    pass('class A { #get\n *a(){} }', {
      source: 'class A { #get\n *a(){} }',
      next: true,
      expected: {
          body: [{
              body: {
                  body: [{
                          computed: false,
                          static: false,
                          key: {
                              name: 'get',
                              type: 'PrivateName'
                          },
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
                                  type: 'BlockStatement',
                              },
                              expression: false,
                              generator: true,
                              id: null,
                              params: [],
                              type: 'FunctionExpression',
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
          }],
          sourceType: 'script',
          type: 'Program'
      }
  });

    pass(`class A1 {
        static
        a
        static
      }

      class A2 { a }
      class A3 { get }
      class A4 { set }
      class A5 { static }
      class A6 { async }

      class A7 {
        get
        *a(){}
      }

      class A8 {
        static
        *a(){}
      }

      class A9 {
        async
        a(){}
      }

      class A10 {
        static
        async
        a
      }

      class A12 {
        static = 0;
      }

      class A13 {
        get
        ['a'](){}
      }

      class A14 {
        static
        get
        static
        (){}
      }`, {
    source: `class A1 {
        static
        a
        static
      }

      class A2 { a }
      class A3 { get }
      class A4 { set }
      class A5 { static }
      class A6 { async }

      class A7 {
        get
        *a(){}
      }

      class A8 {
        static
        *a(){}
      }

      class A9 {
        async
        a(){}
      }

      class A10 {
        static
        async
        a
      }

      class A12 {
        static = 0;
      }

      class A13 {
        get
        ['a'](){}
      }

      class A14 {
        static
        get
        static
        (){}
      }`,
    next: true,
    raw: true,
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
                  },
                ],
                type: 'ClassBody',
              },
              id: {
                name: 'A1',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
           },
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
                  }
                ],
                type: 'ClassBody',
              },
              id: {
                name: 'A2',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration',
            },
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'get',
                      type: 'Identifier',
                    },
                    static: false,
                    type: 'FieldDefinition',
                    value: null,
                  },
                ],
                type: 'ClassBody',
              },
              id: {
                name: 'A3',
                type: 'Identifier',
              },
              superClass: null,
             type: 'ClassDeclaration'
            },
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'set',
                      type: 'Identifier',
                    },
                    static: false,
                    type: 'FieldDefinition',
                    value: null,
                  },
                ],
                type: 'ClassBody',
              },
              id: {
                name: 'A4',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration',
            },
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'static',
                      type: 'Identifier',
                    },
                    static: false,
                    type: 'FieldDefinition',
                    value: null,
                  },
                ],
                type: 'ClassBody',
              },
              id: {
                name: 'A5',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration',
            },
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
                  }
                ],
                type: 'ClassBody'
              },
              id: {
               name: 'A6',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
            },
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'get',
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
              id: {
                name: 'A7',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration',
            },
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'a',
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
                     generator: true,
                      id: null,
                      params: [],
                      type: 'FunctionExpression'
                    }
                  }
                ],
                type: 'ClassBody'
              },
             id: {
                name: 'A8',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
            },
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
                type: 'ClassBody',
              },
              id: {
                name: 'A9',
                type: 'Identifier'
              },
              superClass: null,
              type: 'ClassDeclaration'
            },
           {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'async',
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
                      type: 'Identifier'
                    },
                    static: false,
                    type: 'FieldDefinition',
                    value: null,
                  },
                ],
                type: 'ClassBody'
              },
              id: {
                name: 'A10',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
            },
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'static',
                      type: 'Identifier',
                   },
                    static: false,
                    type: 'FieldDefinition',
                    value: {
                     raw: '0',
                      type: 'Literal',
                      value: 0,
                    }
                  }
                ],
                type: 'ClassBody',
              },
              id: {
                name: 'A12',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration',
            },
            {
              body: {
                body: [
                  {
                    computed: true,
                    key: {
                      raw: '\'a\'',
                      type: 'Literal',
                      value: 'a',
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
                  }
                ],
                type: 'ClassBody',
              },
              id: {
                name: 'A13',
                type: 'Identifier',
              },
              superClass: null,
              type: 'ClassDeclaration'
            },
            {
              body: {
                body: [
                 {
                    computed: false,
                    key: {
                      name: 'static',
                      type: 'Identifier',
                    },
                    kind: 'get',
                    static: true,
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
                name: 'A14',
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