import { pass, fail } from '../test-utils';

describe('Next - Class fields', () => {

      fail('var C = class extends A { x = true; super().x; }', {
        source: 'var C = class extends A { x = true; super().x; }',
        next: true,
        index: 43
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
    index: 20
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

      fail('class C {static #field;}  ', {
    source: 'class C { static #field; }  ',
    next: true,
    index: 16
  });

      fail('class C { x = {} == /*{ initializer }*/; }  ', {
    source: 'class C { x = {} == /*{ initializer }*/; }  ',
    next: true,
    index: 19
  });

      fail('class C { static [x] = /*{ initializer }*/; }  ', {
    source: 'class C { static [x] = /*{ initializer }*/; }  ',
    next: true,
    index: 20
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
/*
  fail('class C { "constructor"; }', {
    source: 'class C { "constructor"; }',
    next: true,
    index: 23
  });

  fail('class C { x = {} == arguments; }', {
    source: 'class C { x = {} == arguments; }',
    next: true,
    index: 28
  });*/

      fail('class C { x = {} == super(); }', {
    source: 'class C { x = {} == super(); }',
    next: true,
    index: 25
  });

      fail('class C {  static "x" = super(); }', {
    source: 'class C {  static "x" = super(); }',
    next: true,
    index: 21
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

      pass('class a {  #a = 0; ["b"](){} }', {
    source: 'class a {  #a = 0; ["b"](){} }',
    next: true,
    loc: true,
    ranges: true,
    expected: {
      type: 'Program',
      sourceType: 'script',
      body: [
          {
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
                  body: [
                      {
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
          }
      ],
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
      body: [
          {
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
                  body: [
                      {
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
          }
      ],
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
      body: [
          {
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
                  body: [
                      {
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
                                  body: [
                                      {
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
                                      }
                                  ],
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
                      }
                  ],
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
          }
      ],
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
      body: [
          {
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
                  body: [
                      {
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
                      }
                  ],
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
          }
      ],
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

      pass('class C { super.#a; }', {
    source: 'class C { super.#a; }',
    next: true,
    loc: true,
    ranges: true,
    expected: {
      type: 'Program',
      sourceType: 'script',
      body: [
          {
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
                  body: [
                      {
                          type: 'FieldDefinition',
                          key: {
                              type: 'Identifier',
                              name: 'super',
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
                          value: null,
                          computed: false,
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
                              name: 'super',
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
                          value: null,
                          computed: false,
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
                      {
                          type: 'FieldDefinition',
                          key: {
                              type: 'PrivateName',
                              name: 'a',
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
                              }
                          },
                          value: null,
                          computed: false,
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
                          }
                      }
                  ],
                  start: 8,
                  end: 21,
                  loc: {
                      start: {
                          line: 1,
                          column: 8
                      },
                      end: {
                          line: 1,
                          column: 21
                      }
                  }
              },
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
              }
          }
      ],
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
      }
  }
  });
      pass('class C { [x] = 0 }', {
    source: 'class C { [x] = 0 }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  type: 'FieldDefinition',
                  computed: true,
                  key: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  value: {
                    type: 'Literal',
                    value: 0
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
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

      pass('class C { x = 0 }', {
    source: 'class C { x = 0 }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  type: 'FieldDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  value: {
                    type: 'Literal',
                    value: 0
                  },
                  computed: false
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
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

      pass('class C { x }', {
    source: 'class C { x  }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  type: 'FieldDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'x'
                  },
                  value: null,
                  computed: false
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
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

      pass('class C { async }', {
    source: 'class C { async  }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  type: 'FieldDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  value: null,
                  computed: false
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
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

      pass('class C { async = 5 }', {
    source: 'class C { async = 5  }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  type: 'FieldDefinition',
                  key: {
                    type: 'Identifier',
                    name: 'async'
                  },
                  value: {
                    type: 'Literal',
                    value: 5
                  },
                  computed: false
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
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

      pass('class C { #x }', {
    source: 'class C { #x }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  type: 'FieldDefinition',
                  computed: false,
                  key: {
                    type: 'PrivateName',
                    name: 'x'
                  },
                  value: null,
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
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

      pass('class C { #x = 0 }', {
    source: 'class C { #x = 0 }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  type: 'FieldDefinition',
                  computed: false,
                  key: {
                    type: 'PrivateName',
                    name: 'x'
                  },
                  value: {
                    type: 'Literal',
                    value: 0
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
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

      pass('class C { p1 = 1, p2 = 2; }', {
      source: 'class C { p1 = 1, p2 = 2; }',
      next: true,
      expected: {
          body: [
            {
              body: {
                body: [
                  {
                    computed: false,
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
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
    });

      pass('class C { p1, p2; }', {
      source: 'class C { p1, p2; }',
      next: true,
      expected: {
          body: [
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'p1',
                      type: 'Identifier'
                    },
                    type: 'FieldDefinition',
                    value: null,
                  },
                  {
                    computed: false,
                    key: {
                      name: 'p2',
                      type: 'Identifier',
                    },
                    type: 'FieldDefinition',
                    value: null,
                  },
                ],
                type: 'ClassBody',
              },
              id: {
                name: 'C',
                type: 'Identifier'
              },
              superClass: null,
              type: 'ClassDeclaration'
            },
          ],
          sourceType: 'script',
          type: 'Program'
        }
    });

      pass('class foo{  static async *m() { return 42; } #x; #y; }', {
      source: 'class foo{  static async *m() { return 42; } #x; #y; }',
      next: true,
      expected: {
          body: [
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                      name: 'm',
                      type: 'Identifier'
                    },
                    kind: 'method',
                    static: true,
                    type: 'MethodDefinition',
                    value: {
                      async: true,
                      body: {
                        body: [
                          {
                            argument: {
                              type: 'Literal',
                              value: 42,
                            },
                            type: 'ReturnStatement'
                          }
                        ],
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
                    key: {
                     name: 'x',
                      type: 'PrivateName'
                    },
                    type: 'FieldDefinition',
                    value: null,
                  },
                  {
                    computed: false,
                    key: {
                        name: 'y',
                      type: 'PrivateName',
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
            }
          ],
          sourceType: 'script',
          type: 'Program'
        }
    });

      pass('class foo { get #bar() { return m1(); } set #zoo(x) { return m2(x); } }', {
      source: 'class foo { get #bar() { return m1(); } set #zoo(x) { return m2(x); } }',
      next: true,
      expected: {
          body: [
            {
              body: {
                body: [
                  {
                    computed: false,
                    key: {
                        name: 'bar',
                      type: 'PrivateName'
                    },
                    kind: 'get',
                    static: false,
                    type: 'MethodDefinition',
                    value: {
                      async: false,
                      body: {
                        body: [
                          {
                            argument: {
                              arguments: [],
                              callee: {
                                name: 'm1',
                               type: 'Identifier',
                              },
                              type: 'CallExpression'
                            },
                            type: 'ReturnStatement'
                          },
                        ],
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
                        name: 'zoo',
                      type: 'PrivateName'
                    },
                    kind: 'set',
                    static: false,
                    type: 'MethodDefinition',
                    value: {
                      async: false,
                      body: {
                        body: [
                          {
                            argument: {
                              arguments: [
                                {
                                  name: 'x',
                                  type: 'Identifier'
                                },
                              ],
                              callee: {
                                name: 'm2',
                                type: 'Identifier'
                              },
                              type: 'CallExpression',
                            },
                            type: 'ReturnStatement',
                          },
                        ],
                        type: 'BlockStatement',
                      },
                      expression: false,
                      generator: false,
                      id: null,
                      params: [
                        {
                          name: 'x',
                          type: 'Identifier'
                        }
                      ],
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
            },
          ],
          sourceType: 'script',
          type: 'Program'
        }
    });

      pass('class Foo { async #evil() { await notReally(); }}', {
      source: 'class Foo { async #evil() { await notReally(); }}',
      next: true,
      expected: {
          body: [
            {
              body: {
                body: [
                  {
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
                        body: [
                          {
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
                          },
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
                type: 'Identifier'
              },
              superClass: null,
              type: 'ClassDeclaration'
            },
          ],
          sourceType: 'script',
          type: 'Program'
        }
    });

      pass('class foo { #a, a }', {
      source: 'class foo { #a, a }',
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
            }
          ],
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
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
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
                      body: [
                        {
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
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

      pass('class C { p1 = 1, p2 = 2; }', {
    source: 'class C { p1 = 1, p2 = 2; }',
    next: true,
    expected: {
        body: [
          {
            body: {
              body: [
                {
                  computed: false,
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
          }
        ],
        sourceType: 'script',
        type: 'Program'
      }
  });

      pass('class C { async *m() { return 42; } /*{ fields }*/; }', {
    source: 'class C { async *m() { return 42; } /*{ fields }*/; }',
    next: true,
    expected: {
        body: [
         {
            body: {
              body: [
                {
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
                      body: [
                        {
                        argument: {
                            type: 'Literal',
                            value: 42,
                          },
                          type: 'ReturnStatement'
                        }
                      ],
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
              name: 'C',
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
      body: [
        {
          body: {
            body: [
              {
                computed: false,
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
                key: {
                  name: 'm',
                  type: 'Identifier'
                },
               kind: 'method',
                static: false,
                type: 'MethodDefinition',
                value: {
                 async: false,
                  body: {
                    body: [
                      {
                        argument: {
                          type: 'Literal',
                          value: 42,
                        },
                        type: 'ReturnStatement'
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
                    body: [
                      {
                        argument: {
                          type: 'Literal',
                          value: 39,
                        },
                        type: 'ReturnStatement'
                      }
                    ],
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
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
});

      pass('class C { async *m() { return 42; } "a"; "b"; "c" = 39;  "d" = 42; }', {
  source: 'class C { async *m() { return 42; } "a"; "b"; "c" = 39;  "d" = 42; }',
  next: true,
  expected: {
      body: [
        {
          body: {
            body: [
              {
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
                    body: [
                      {
                        argument: {
                          type: 'Literal',
                          value: 42,
                        },
                        type: 'ReturnStatement'
                      }
                    ],
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
                key: {
                  type: 'Literal',
                  value: 'a',
                },
                type: 'FieldDefinition',
                value: null,
              },
              {
                computed: false,
                key: {
                 type: 'Literal',
                  value: 'b',
                },
                type: 'FieldDefinition',
                value: null,
              },
              {
                computed: false,
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
        }
      ],
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
     body: [
        {
          body: {
            body: [
              {
                computed: false,
                key: {
                  type: 'Literal',
                  value: 'a',
                },
                type: 'FieldDefinition',
                value: null,
              },
              {
                computed: false,
                key: {
                  type: 'Literal',
                  value: 'b',
                },
                type: 'FieldDefinition',
                value: null,
              },
              {
                computed: false,
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
        }
      ],
     sourceType: 'script',
      type: 'Program'
    }
});

      pass('class C { x, y; d(){} f(){} }', {
  source: 'class C { x, y; d(){} f(){} }',
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
                  type: 'Identifier'
                },
                type: 'FieldDefinition',
                value: null,
              },
             {
                computed: false,
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
        }
      ],
      sourceType: 'script',
      type: 'Program'
    }
});
});
