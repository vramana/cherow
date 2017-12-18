import { pass, fail } from '../utils';

describe('Next - Class fields', () => {
    fail('static class field with prototype', {
        source: 'var C = class { static "prototype"; }',
        next: true
    });
    
    fail('class a {  constructor () { #foo  }  }', {
        source: 'class a {  constructor () { #foo  }  }',
        next: true
    });

    fail('class a {  constructor () { #foo  }  }', {
        source: 'class a {  constructor () { #foo  }  }',
    });

    fail('class C {  f() { this.#x;  class D extends C { #x; } } }', {
        source: 'class C {  f() { this.#x;  class D extends C { #x; } } }',
        next: true,
        module: true
    });
    
    fail('static class field with constructor', {
        source: 'class C { static "constructor"; }',
        next: true
    });
    fail('static class field with constructor', {
        source: 'class C { static "constructor"; }',
        next: true
    });
    fail('static class field with constructor (expr)', {
        source: 'var C = class { static "constructor"; }',
        next: true
    });
    fail('constructor with private name', {
        source: 'class C { static "constructor"; }',
        next: true
    });
    fail('constructor with private name', {
        source: 'class Foo { #constructor() {} }',
        next: true
    });
    fail('missing semicolon', {
        source: 'class Foo { p = x  *#m () {} }',
        next: true
    });
    fail('delete non private', {
        source: 'class Foo { #x;  constructor() { delete #x.d; } }'
    });;
    fail('ASI failure generator', {
        source: 'class Foo { #p = x *#m () {} }',
        next: true
    });;
    fail('ASI failure inline', {
        source: 'class Foo { #x #y }'
    });;
    fail('computed', {
        source: 'class Foo { #[m] = 1 }',
        next: true
    });;
    fail('delete shorthand', {
        source: 'class Foo { #x; constructor() { delete #x; } }'
    });;
    fail('delete shorthand', {
        source: 'class Foo { foo() { delete x; } }'
    });;
    fail('delete shorthand', {
        source: 'class Foo { a, foo() { delete b; } }'
    });;
    fail('delete shorthand', {
        source: 'class Foo { a.b, constructor() { delete a.b.c; } }',
        next: true
    });;
    fail('numeric literal', {
        source: 'class Foo { #2 = y } }',
        next: true
    });;
    fail('numeric start of identifier', {
        source: 'class Foo { #2x = y } }',
        next: true
    });;
    fail('string literal', {
        source: 'class Foo { #"p" = x }'
    });;
    fail('method', {
        source: 'class Foo {  #p = x #m () {} }'
    });;
    fail('dangling semicolon', {
        source: 'class Foo { x,y,; }'
    });;
    fail('comma separator methid', {
        source: 'x, f() {}'
    });;
    fail('dangling comma', {
        source: 'x,',
        next: true
    });
    fail('dangling comma', {
        source: '#x,;',
        next: true
    });
    fail('private field as constructor', {
        source: 'class C { constructor; }',
        next: true
    });
    fail('private field as static prototype', {
        source: 'class C { static prototype; }',
        next: true
    });
    fail('private field as static constructor', {
        source: 'class C { static constructor; }',
        next: true
    });
    fail('private field with arguments in arrow func body', {
        source: 'class C { #x = () => arguments; }',
        next: true
    });
    fail('private field with eval in arrow func body', {
        source: 'class C { #x = () => eval; }',
        next: true
    });
    fail('private name as constructor', {
        source: 'class C { #constructor; }',
        next: true
    });
    fail('static assign arguments', {
        source: 'class C { static x = arguments; }',
        next: true
    });
    fail('static assign eval', {
        source: 'class C { static x = eval; }',
        next: true
    });
    fail('duplicate private names', {
        source: `class C { #x; #x; }`,
        next: true
    });
    fail('private class fields early error with StringValue "#constructor"', {
        source: 'function f() { this.#x; }',
        next: true
    });
    fail('private class fields early error with StringValue "#constructor"', {
        source: '#constructor;',
        next: true
    });
    fail('`arguments` used in class field (ClassElementName PrivateName)', {
        source: 'class C { #x = arguments; }',
        next: true
    });
    fail('`eval` used in class field (ClassElementName PrivateName)', {
        source: 'class C { #x = eval; }',
        next: true
    });
    fail('private field assign arguments', {
        source: 'class C { #x = arguments; }',
        next: true
    });
    fail('private field assign eval', {
        source: 'class C { #x = eval; }',
        next: true
    });
    fail('`arguments` used in class field (private field, ternary expression)', {
        source: 'class C { #x = false ? {} : arguments; }',
        next: true
    });
    fail('`arguments` used in class field (private field, ternary expression)', {
        source: 'class C { #x = false ? {} : eval; }',
        next: true
    });
    fail('`arguments` used in class field (ternary expression)', {
        source: 'class C { x = false ? {} : arguments;}'
    });
    fail('`eval` used in class field (ternary expression)', {
        source: 'class C { x = false ? {} : eval }'
    });
    fail('privatename with constructor', {
        source: 'var C = class { #constructor; }',
        next: true
    });
    fail('privatename with arguments', {
        source: 'var C = class { #x = arguments;  }',
        next: true
    });
    fail('var C = class { x = () => arguments; }', {
        source: 'var C = class { x = () => arguments; }',
        next: true
    });
    fail('var C = class {  #x = () => arguments;  }', {
        source: 'var C = class {  #x = () => arguments;  }',
        next: true
    });
    fail('undefined in class scope', {
        source: 'var C = class { #foo; constructor () { #bar }}',
        next: true
    });
    fail('computed private class property - #1', {
        source: 'class A { #["a" + "b"] = bar }',
        next: true
    });
    fail('computed private class property - #2', {
        source: 'class foo { #a["b" + "c"] = foo,  #a["b" + "c"] = bar }',
        next: true
    });
    fail('privatename with constructor', {
        source: 'var C = class { #constructor; }',
        next: true
    });
    fail('duplicates', {
        source: 'class foo { #a, #a }',
        next: true
    });
    fail('duplicates', {
        source: `class A { #pe; constructor(x) { this.#p = x;  }  }`
    });
    fail('duplicates', {
        source: `class A { constructor(x) { this.#p = x;  } #pe;  }`
    });
    fail('duplicates', {
        source: `class A { constructor(x) { this.#p = x;  } #p;  }`
    });
    fail('var C = class { #x = true ? {} : arguments; }', {
        source: 'var C = class { x = false ? {} : arguments; }',
        next: true
    });
    fail('var C = class { #x = true ? {} : arguments; }', {
        source: 'var C = class { #x = false ? {} : arguments; }',
        next: true
    });
    fail('var C = class { #x = true ? {} : arguments; }', {
        source: 'var C = class { x = true ? {} : arguments; }',
        next: true
    });
    fail('var C = class { #x = true ? {} : arguments; }', {
        source: 'var C = class { x = true ? {} : arguments; }',
        next: true
    });
    fail('var C = class { #x = true ? {} : arguments; }', {
        source: 'var C = class { #x = true ? {} : arguments; }',
        next: true
    });
    fail('var C = class { #x = true ? {} : arguments; }', {
        source: 'var C = class { #x = true ? {} : arguments; }',
        next: true
    });
    fail('duplicate bindings', {
        source: 'class foo { #a;  #a; }',
        next: true
    });
    fail('invalid computed value', {
        source: 'class foo { a["b" + "c"] = bar }',
        next: true
    });

    fail('invalid computed value', {
        source: `class C {
        #x;
      
        x() {
          var g = this.f;
          delete (g().#x);
        }
      
        f() {
          return this;
        }
      }`,
        next: true
    });


    fail('invalid computed value', {
        source: `class C {
        #x;
      
        x() {
          var g = this.f;
          delete g().#x;
        }
      
        f() {
          return this;
        }
      }`,
        next: true
    });
    fail('invalid computed value', {
        source: `class C {
        #x;
      
        x() {
          
          delete (this.#x);
        }
      
        
      }`,
        next: true
    });
    fail('invalid computed value', {
        source: `class C {
        #x;
      
        x() {
          
          delete this.#x;
        }
      
        
      }`,
        next: true
    });
    fail('invalid computed value', {
        source: `class C {
        #x;
      
        x() {
          var g = this.f;
          delete ((g().#x));
        }
      
        f() {
          return this;
        }
      }`,
        next: true
    });

    fail('Early Error #1 (module code)', {
        source: '#x,;',
        module: true
    });
    fail('Early Error #2 (module code)', {
        source: 'class C { constructor() { this.#x; }  }',
        module: true
    });
    fail('Early Error #3 (module code)', {
        source: 'class C { f() {  this.#x; }  }',
        module: true
    });
    fail('Early Error #4 (module code)', {
        source: 'class C { y = this.#x; }',
        module: true
    });
    fail('Early Error #5 (module code)', {
        source: 'new C().#x;',
        module: true
    });
    fail('Early Error #6 (module code)', {
        source: 'class C { #x; }',
        module: true
    });
    fail('Early Error #7 (module code)', {
        source: `class C {
        f() {
          this.#x;
          class D extends C {
            #x;
          }
        }
      }`,
        module: true
    });
    fail('Early Error #8 (module code)', {
        source: 'function f() { this.#x; }',
        module: true
    });

    fail('invalid undeclared bindings', {
        source: `class A {
        constructor(x) {
            this.#p = x;
        }
        #ps;
    }`
    });

    pass(`newline`, {
        source: `class C {
            'a'; "b"; 'c' = 39;
            "d" = 42;
            *m() { return 42; }
          
          }`,
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        module: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "C",
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "Literal",
                            "value": "a",
                            "start": 22,
                            "end": 25,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 12
                                },
                                "end": {
                                    "line": 2,
                                    "column": 15
                                }
                            },
                            "raw": "'a'"
                        },
                        {
                            "type": "Literal",
                            "value": "b",
                            "start": 27,
                            "end": 30,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 17
                                },
                                "end": {
                                    "line": 2,
                                    "column": 20
                                }
                            },
                            "raw": "\"b\""
                        },
                        {
                            "type": "ClassProperty",
                            "key": {
                                "type": "Literal",
                                "value": "c",
                                "start": 32,
                                "end": 35,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 25
                                    }
                                },
                                "raw": "'c'"
                            },
                            "value": {
                                "type": "Literal",
                                "value": 39,
                                "start": 38,
                                "end": 40,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 28
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 30
                                    }
                                },
                                "raw": "39"
                            },
                            "start": 32,
                            "end": 40,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 22
                                },
                                "end": {
                                    "line": 2,
                                    "column": 30
                                }
                            }
                        },
                        {
                            "type": "ClassProperty",
                            "key": {
                                "type": "Literal",
                                "value": "d",
                                "start": 54,
                                "end": 57,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 15
                                    }
                                },
                                "raw": "\"d\""
                            },
                            "value": {
                                "type": "Literal",
                                "value": 42,
                                "start": 60,
                                "end": 62,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 20
                                    }
                                },
                                "raw": "42"
                            },
                            "start": 54,
                            "end": 62,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 12
                                },
                                "end": {
                                    "line": 3,
                                    "column": 20
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "m",
                                "start": 77,
                                "end": 78,
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 14
                                    }
                                }
                            },
                            "kind": "method",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ReturnStatement",
                                        "argument": {
                                            "type": "Literal",
                                            "value": 42,
                                            "start": 90,
                                            "end": 92,
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 26
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 28
                                                }
                                            },
                                            "raw": "42"
                                        },
                                        "start": 83,
                                        "end": 93,
                                        "loc": {
                                            "start": {
                                                "line": 4,
                                                "column": 19
                                            },
                                            "end": {
                                                "line": 4,
                                                "column": 29
                                            }
                                        }
                                    }],
                                    "start": 81,
                                    "end": 95,
                                    "loc": {
                                        "start": {
                                            "line": 4,
                                            "column": 17
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 31
                                        }
                                    }
                                },
                                "async": false,
                                "generator": true,
                                "expression": false,
                                "id": null,
                                "start": 78,
                                "end": 95,
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 31
                                    }
                                }
                            },
                            "static": false,
                            "start": 76,
                            "end": 95,
                            "loc": {
                                "start": {
                                    "line": 4,
                                    "column": 12
                                },
                                "end": {
                                    "line": 4,
                                    "column": 31
                                }
                            }
                        }
                    ],
                    "start": 8,
                    "end": 118,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 6,
                            "column": 11
                        }
                    }
                },
                "start": 0,
                "end": 118,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 6,
                        "column": 11
                    }
                }
            }],
            "sourceType": "module",
            "start": 0,
            "end": 118,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 6,
                    "column": 11
                }
            }
        }
    });

    pass(`async`, {
        source: `class C {
            async *m() { return 42; } 'a'; "b"; 'c' = 39;
            "d" = 42;
          
          }`,
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        module: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "C",
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "m",
                                "start": 29,
                                "end": 30,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 19
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 20
                                    }
                                }
                            },
                            "kind": "method",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ReturnStatement",
                                        "argument": {
                                            "type": "Literal",
                                            "value": 42,
                                            "start": 42,
                                            "end": 44,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 32
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 34
                                                }
                                            },
                                            "raw": "42"
                                        },
                                        "start": 35,
                                        "end": 45,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 25
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 35
                                            }
                                        }
                                    }],
                                    "start": 33,
                                    "end": 47,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 37
                                        }
                                    }
                                },
                                "async": true,
                                "generator": true,
                                "expression": false,
                                "id": null,
                                "start": 30,
                                "end": 47,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 37
                                    }
                                }
                            },
                            "static": false,
                            "start": 22,
                            "end": 47,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 12
                                },
                                "end": {
                                    "line": 2,
                                    "column": 37
                                }
                            }
                        },
                        {
                            "type": "Literal",
                            "value": "a",
                            "start": 48,
                            "end": 51,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 38
                                },
                                "end": {
                                    "line": 2,
                                    "column": 41
                                }
                            },
                            "raw": "'a'"
                        },
                        {
                            "type": "Literal",
                            "value": "b",
                            "start": 53,
                            "end": 56,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 43
                                },
                                "end": {
                                    "line": 2,
                                    "column": 46
                                }
                            },
                            "raw": "\"b\""
                        },
                        {
                            "type": "ClassProperty",
                            "key": {
                                "type": "Literal",
                                "value": "c",
                                "start": 58,
                                "end": 61,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 48
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 51
                                    }
                                },
                                "raw": "'c'"
                            },
                            "value": {
                                "type": "Literal",
                                "value": 39,
                                "start": 64,
                                "end": 66,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 54
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 56
                                    }
                                },
                                "raw": "39"
                            },
                            "start": 58,
                            "end": 66,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 48
                                },
                                "end": {
                                    "line": 2,
                                    "column": 56
                                }
                            }
                        },
                        {
                            "type": "ClassProperty",
                            "key": {
                                "type": "Literal",
                                "value": "d",
                                "start": 80,
                                "end": 83,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 15
                                    }
                                },
                                "raw": "\"d\""
                            },
                            "value": {
                                "type": "Literal",
                                "value": 42,
                                "start": 86,
                                "end": 88,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 20
                                    }
                                },
                                "raw": "42"
                            },
                            "start": 80,
                            "end": 88,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 12
                                },
                                "end": {
                                    "line": 3,
                                    "column": 20
                                }
                            }
                        }
                    ],
                    "start": 8,
                    "end": 112,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 5,
                            "column": 11
                        }
                    }
                },
                "start": 0,
                "end": 112,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 5,
                        "column": 11
                    }
                }
            }],
            "sourceType": "module",
            "start": 0,
            "end": 112,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 11
                }
            }
        }
    });

    pass(`static / complex`, {
        source: `class C {
            static y = (x.push("a"), "old_value");
            static ["y"] = (x.push("b"), "another_value");
            static "y" = (x.push("c"), "same_value");
            static y = (x.push("d"), "same_value");
          }`,
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        module: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "C",
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "ClassProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "y",
                                "start": 29,
                                "end": 30,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 19
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 20
                                    }
                                }
                            },
                            "value": {
                                "type": "SequenceExpression",
                                "expressions": [{
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "object": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 34,
                                                "end": 35,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 24
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 25
                                                    }
                                                }
                                            },
                                            "computed": false,
                                            "property": {
                                                "type": "Identifier",
                                                "name": "push",
                                                "start": 36,
                                                "end": 40,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 26
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 30
                                                    }
                                                }
                                            },
                                            "start": 34,
                                            "end": 40,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 24
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 30
                                                }
                                            }
                                        },
                                        "arguments": [{
                                            "type": "Literal",
                                            "value": "a",
                                            "start": 41,
                                            "end": 44,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 31
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 34
                                                }
                                            },
                                            "raw": "\"a\""
                                        }],
                                        "start": 34,
                                        "end": 45,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 24
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 35
                                            }
                                        }
                                    },
                                    {
                                        "type": "Literal",
                                        "value": "old_value",
                                        "start": 47,
                                        "end": 58,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 37
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 48
                                            }
                                        },
                                        "raw": "\"old_value\""
                                    }
                                ],
                                "start": 34,
                                "end": 58,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 48
                                    }
                                }
                            },
                            "start": 29,
                            "end": 59,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 19
                                },
                                "end": {
                                    "line": 2,
                                    "column": 49
                                }
                            }
                        },
                        {
                            "type": "ClassProperty",
                            "key": {
                                "type": "Literal",
                                "value": "y",
                                "start": 81,
                                "end": 84,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 23
                                    }
                                },
                                "raw": "\"y\""
                            },
                            "value": {
                                "type": "SequenceExpression",
                                "expressions": [{
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "object": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 89,
                                                "end": 90,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 28
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 29
                                                    }
                                                }
                                            },
                                            "computed": false,
                                            "property": {
                                                "type": "Identifier",
                                                "name": "push",
                                                "start": 91,
                                                "end": 95,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 30
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 34
                                                    }
                                                }
                                            },
                                            "start": 89,
                                            "end": 95,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 28
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 34
                                                }
                                            }
                                        },
                                        "arguments": [{
                                            "type": "Literal",
                                            "value": "b",
                                            "start": 96,
                                            "end": 99,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 35
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 38
                                                }
                                            },
                                            "raw": "\"b\""
                                        }],
                                        "start": 89,
                                        "end": 100,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 39
                                            }
                                        }
                                    },
                                    {
                                        "type": "Literal",
                                        "value": "another_value",
                                        "start": 102,
                                        "end": 117,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 41
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 56
                                            }
                                        },
                                        "raw": "\"another_value\""
                                    }
                                ],
                                "start": 89,
                                "end": 117,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 28
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 56
                                    }
                                }
                            },
                            "start": 80,
                            "end": 118,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 19
                                },
                                "end": {
                                    "line": 3,
                                    "column": 57
                                }
                            }
                        },
                        {
                            "type": "ClassProperty",
                            "key": {
                                "type": "Literal",
                                "value": "y",
                                "start": 139,
                                "end": 142,
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 19
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 22
                                    }
                                },
                                "raw": "\"y\""
                            },
                            "value": {
                                "type": "SequenceExpression",
                                "expressions": [{
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "object": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 146,
                                                "end": 147,
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 26
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 27
                                                    }
                                                }
                                            },
                                            "computed": false,
                                            "property": {
                                                "type": "Identifier",
                                                "name": "push",
                                                "start": 148,
                                                "end": 152,
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 28
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 32
                                                    }
                                                }
                                            },
                                            "start": 146,
                                            "end": 152,
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 26
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 32
                                                }
                                            }
                                        },
                                        "arguments": [{
                                            "type": "Literal",
                                            "value": "c",
                                            "start": 153,
                                            "end": 156,
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 33
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 36
                                                }
                                            },
                                            "raw": "\"c\""
                                        }],
                                        "start": 146,
                                        "end": 157,
                                        "loc": {
                                            "start": {
                                                "line": 4,
                                                "column": 26
                                            },
                                            "end": {
                                                "line": 4,
                                                "column": 37
                                            }
                                        }
                                    },
                                    {
                                        "type": "Literal",
                                        "value": "same_value",
                                        "start": 159,
                                        "end": 171,
                                        "loc": {
                                            "start": {
                                                "line": 4,
                                                "column": 39
                                            },
                                            "end": {
                                                "line": 4,
                                                "column": 51
                                            }
                                        },
                                        "raw": "\"same_value\""
                                    }
                                ],
                                "start": 146,
                                "end": 171,
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 26
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 51
                                    }
                                }
                            },
                            "start": 139,
                            "end": 172,
                            "loc": {
                                "start": {
                                    "line": 4,
                                    "column": 19
                                },
                                "end": {
                                    "line": 4,
                                    "column": 52
                                }
                            }
                        },
                        {
                            "type": "ClassProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "y",
                                "start": 193,
                                "end": 194,
                                "loc": {
                                    "start": {
                                        "line": 5,
                                        "column": 19
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 20
                                    }
                                }
                            },
                            "value": {
                                "type": "SequenceExpression",
                                "expressions": [{
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "object": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 198,
                                                "end": 199,
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 24
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 25
                                                    }
                                                }
                                            },
                                            "computed": false,
                                            "property": {
                                                "type": "Identifier",
                                                "name": "push",
                                                "start": 200,
                                                "end": 204,
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 26
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 30
                                                    }
                                                }
                                            },
                                            "start": 198,
                                            "end": 204,
                                            "loc": {
                                                "start": {
                                                    "line": 5,
                                                    "column": 24
                                                },
                                                "end": {
                                                    "line": 5,
                                                    "column": 30
                                                }
                                            }
                                        },
                                        "arguments": [{
                                            "type": "Literal",
                                            "value": "d",
                                            "start": 205,
                                            "end": 208,
                                            "loc": {
                                                "start": {
                                                    "line": 5,
                                                    "column": 31
                                                },
                                                "end": {
                                                    "line": 5,
                                                    "column": 34
                                                }
                                            },
                                            "raw": "\"d\""
                                        }],
                                        "start": 198,
                                        "end": 209,
                                        "loc": {
                                            "start": {
                                                "line": 5,
                                                "column": 24
                                            },
                                            "end": {
                                                "line": 5,
                                                "column": 35
                                            }
                                        }
                                    },
                                    {
                                        "type": "Literal",
                                        "value": "same_value",
                                        "start": 211,
                                        "end": 223,
                                        "loc": {
                                            "start": {
                                                "line": 5,
                                                "column": 37
                                            },
                                            "end": {
                                                "line": 5,
                                                "column": 49
                                            }
                                        },
                                        "raw": "\"same_value\""
                                    }
                                ],
                                "start": 198,
                                "end": 223,
                                "loc": {
                                    "start": {
                                        "line": 5,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 49
                                    }
                                }
                            },
                            "start": 193,
                            "end": 224,
                            "loc": {
                                "start": {
                                    "line": 5,
                                    "column": 19
                                },
                                "end": {
                                    "line": 5,
                                    "column": 50
                                }
                            }
                        }
                    ],
                    "start": 8,
                    "end": 237,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 6,
                            "column": 11
                        }
                    }
                },
                "start": 0,
                "end": 237,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 6,
                        "column": 11
                    }
                }
            }],
            "sourceType": "module",
            "start": 0,
            "end": 237,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 6,
                    "column": 11
                }
            }
        }
    });

    pass(`undeclared bindings`, {
        source: 'class foo { #a, a }',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        module: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 13,
                                "end": 14,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 12,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        {
                            "type": "Identifier",
                            "name": "a",
                            "start": 16,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 16
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        }
                    ],
                    "start": 10,
                    "end": 19,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 10
                        },
                        "end": {
                            "line": 1,
                            "column": 19
                        }
                    }
                },
                "start": 0,
                "end": 19,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 19
                    }
                }
            }],
            "sourceType": "module",
            "start": 0,
            "end": 19,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 19
                }
            }
        }
    });

    pass(`ASI`, {
        source: ` class Isiah {
            #foo
            constructor () {
                foo;
                bar; bar;
                a = b;
                b = b;
            }
        }`,
        loc: true,
        ranges: true,
        next: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "Isiah",
                    "start": 7,
                    "end": 12,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 7
                        },
                        "end": {
                            "line": 1,
                            "column": 12
                        }
                    }
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "foo",
                                "start": 28,
                                "end": 31,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 16
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 27,
                            "end": 31,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 12
                                },
                                "end": {
                                    "line": 2,
                                    "column": 16
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "constructor",
                                "start": 44,
                                "end": 55,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 23
                                    }
                                }
                            },
                            "kind": "constructor",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "Identifier",
                                                "name": "foo",
                                                "start": 77,
                                                "end": 80,
                                                "loc": {
                                                    "start": {
                                                        "line": 4,
                                                        "column": 16
                                                    },
                                                    "end": {
                                                        "line": 4,
                                                        "column": 19
                                                    }
                                                }
                                            },
                                            "start": 77,
                                            "end": 81,
                                            "loc": {
                                                "start": {
                                                    "line": 4,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 4,
                                                    "column": 20
                                                }
                                            }
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "Identifier",
                                                "name": "bar",
                                                "start": 98,
                                                "end": 101,
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 16
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 19
                                                    }
                                                }
                                            },
                                            "start": 98,
                                            "end": 102,
                                            "loc": {
                                                "start": {
                                                    "line": 5,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 5,
                                                    "column": 20
                                                }
                                            }
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "Identifier",
                                                "name": "bar",
                                                "start": 103,
                                                "end": 106,
                                                "loc": {
                                                    "start": {
                                                        "line": 5,
                                                        "column": 21
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 24
                                                    }
                                                }
                                            },
                                            "start": 103,
                                            "end": 107,
                                            "loc": {
                                                "start": {
                                                    "line": 5,
                                                    "column": 21
                                                },
                                                "end": {
                                                    "line": 5,
                                                    "column": 25
                                                }
                                            }
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "a",
                                                    "start": 124,
                                                    "end": 125,
                                                    "loc": {
                                                        "start": {
                                                            "line": 6,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 6,
                                                            "column": 17
                                                        }
                                                    }
                                                },
                                                "operator": "=",
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "b",
                                                    "start": 128,
                                                    "end": 129,
                                                    "loc": {
                                                        "start": {
                                                            "line": 6,
                                                            "column": 20
                                                        },
                                                        "end": {
                                                            "line": 6,
                                                            "column": 21
                                                        }
                                                    }
                                                },
                                                "start": 124,
                                                "end": 129,
                                                "loc": {
                                                    "start": {
                                                        "line": 6,
                                                        "column": 16
                                                    },
                                                    "end": {
                                                        "line": 6,
                                                        "column": 21
                                                    }
                                                }
                                            },
                                            "start": 124,
                                            "end": 130,
                                            "loc": {
                                                "start": {
                                                    "line": 6,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 6,
                                                    "column": 22
                                                }
                                            }
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "AssignmentExpression",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "b",
                                                    "start": 147,
                                                    "end": 148,
                                                    "loc": {
                                                        "start": {
                                                            "line": 7,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 7,
                                                            "column": 17
                                                        }
                                                    }
                                                },
                                                "operator": "=",
                                                "right": {
                                                    "type": "Identifier",
                                                    "name": "b",
                                                    "start": 151,
                                                    "end": 152,
                                                    "loc": {
                                                        "start": {
                                                            "line": 7,
                                                            "column": 20
                                                        },
                                                        "end": {
                                                            "line": 7,
                                                            "column": 21
                                                        }
                                                    }
                                                },
                                                "start": 147,
                                                "end": 152,
                                                "loc": {
                                                    "start": {
                                                        "line": 7,
                                                        "column": 16
                                                    },
                                                    "end": {
                                                        "line": 7,
                                                        "column": 21
                                                    }
                                                }
                                            },
                                            "start": 147,
                                            "end": 153,
                                            "loc": {
                                                "start": {
                                                    "line": 7,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 7,
                                                    "column": 22
                                                }
                                            }
                                        }
                                    ],
                                    "start": 59,
                                    "end": 167,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 8,
                                            "column": 13
                                        }
                                    }
                                },
                                "async": false,
                                "generator": false,
                                "expression": false,
                                "id": null,
                                "start": 56,
                                "end": 167,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 8,
                                        "column": 13
                                    }
                                }
                            },
                            "static": false,
                            "start": 44,
                            "end": 167,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 12
                                },
                                "end": {
                                    "line": 8,
                                    "column": 13
                                }
                            }
                        }
                    ],
                    "start": 13,
                    "end": 177,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 13
                        },
                        "end": {
                            "line": 9,
                            "column": 9
                        }
                    }
                },
                "start": 1,
                "end": 177,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 1
                    },
                    "end": {
                        "line": 9,
                        "column": 9
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 177,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 9,
                    "column": 9
                }
            }
        }
    });

    pass(`class C { p1 = 1, p2 = 2; }`, {
        source: 'class C { p1 = 1, p2 = 2; }',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "C",
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "ClassProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "p1",
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
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "start": 15,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                },
                                "raw": "1"
                            },
                            "start": 10,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        },
                        {
                            "type": "ClassProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "p2",
                                "start": 18,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": 2,
                                "start": 23,
                                "end": 24,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 24
                                    }
                                },
                                "raw": "2"
                            },
                            "start": 18,
                            "end": 24,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 24
                                }
                            }
                        }
                    ],
                    "start": 8,
                    "end": 27,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 27
                        }
                    }
                },
                "start": 0,
                "end": 27,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 27
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 27,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 27
                }
            }
        }
    });

    pass(`class C { x, y; d(){} f(){} }`, {
        source: 'class C { x, y; d(){} f(){} }',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "C",
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "Identifier",
                            "name": "x",
                            "start": 10,
                            "end": 11,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 11
                                }
                            }
                        },
                        {
                            "type": "Identifier",
                            "name": "y",
                            "start": 13,
                            "end": 14,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 14
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "d",
                                "start": 16,
                                "end": 17,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 17
                                    }
                                }
                            },
                            "kind": "method",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 19,
                                    "end": 21,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 19
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 21
                                        }
                                    }
                                },
                                "async": false,
                                "generator": false,
                                "expression": false,
                                "id": null,
                                "start": 17,
                                "end": 21,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 17
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 21
                                    }
                                }
                            },
                            "static": false,
                            "start": 16,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 16
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "f",
                                "start": 22,
                                "end": 23,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 23
                                    }
                                }
                            },
                            "kind": "method",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [],
                                    "start": 25,
                                    "end": 27,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 25
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 27
                                        }
                                    }
                                },
                                "async": false,
                                "generator": false,
                                "expression": false,
                                "id": null,
                                "start": 23,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            "static": false,
                            "start": 22,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 22
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            }
                        }
                    ],
                    "start": 8,
                    "end": 29,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 29
                        }
                    }
                },
                "start": 0,
                "end": 29,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 29
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 29,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 29
                }
            }
        }
    });

    pass(`class Foo { async #evil() { await notReally(); }}`, {
        source: 'class Foo { async #evil() { await notReally(); }}',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "Foo",
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                        "type": "MethodDefinition",
                        "key": {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "evil",
                                "start": 19,
                                "end": 23,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 19
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 23
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 18,
                            "end": 23,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 23
                                }
                            }
                        },
                        "kind": "method",
                        "computed": false,
                        "value": {
                            "type": "FunctionExpression",
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "AwaitExpression",
                                        "argument": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "notReally",
                                                "start": 34,
                                                "end": 43,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 34
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 43
                                                    }
                                                }
                                            },
                                            "arguments": [],
                                            "start": 34,
                                            "end": 45,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 34
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 45
                                                }
                                            }
                                        },
                                        "start": 28,
                                        "end": 45,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 28
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 45
                                            }
                                        }
                                    },
                                    "start": 28,
                                    "end": 46,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 28
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 46
                                        }
                                    }
                                }],
                                "start": 26,
                                "end": 48,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 26
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 48
                                    }
                                }
                            },
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "id": null,
                            "start": 23,
                            "end": 48,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 23
                                },
                                "end": {
                                    "line": 1,
                                    "column": 48
                                }
                            }
                        },
                        "static": false,
                        "start": 12,
                        "end": 48,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 12
                            },
                            "end": {
                                "line": 1,
                                "column": 48
                            }
                        }
                    }],
                    "start": 10,
                    "end": 49,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 10
                        },
                        "end": {
                            "line": 1,
                            "column": 49
                        }
                    }
                },
                "start": 0,
                "end": 49,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 49
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 49,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 49
                }
            }
        }
    });

    pass(`class foo { get #bar() { return m1(); } set #zoo(x) { return m2(x); } }`, {
        source: 'class foo { get #bar() { return m1(); } set #zoo(x) { return m2(x); } }',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "PrivateProperty",
                                "key": {
                                    "type": "Identifier",
                                    "name": "bar",
                                    "start": 17,
                                    "end": 20,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 17
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 20
                                        }
                                    }
                                },
                                "value": null,
                                "static": false,
                                "start": 16,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            },
                            "kind": "get",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ReturnStatement",
                                        "argument": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "m1",
                                                "start": 32,
                                                "end": 34,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 32
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 34
                                                    }
                                                }
                                            },
                                            "arguments": [],
                                            "start": 32,
                                            "end": 36,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 32
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 36
                                                }
                                            }
                                        },
                                        "start": 25,
                                        "end": 37,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 25
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 37
                                            }
                                        }
                                    }],
                                    "start": 23,
                                    "end": 39,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 39
                                        }
                                    }
                                },
                                "async": false,
                                "generator": false,
                                "expression": false,
                                "id": null,
                                "start": 20,
                                "end": 39,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 39
                                    }
                                }
                            },
                            "static": false,
                            "start": 12,
                            "end": 39,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 39
                                }
                            }
                        },
                        {
                            "type": "MethodDefinition",
                            "key": {
                                "type": "PrivateProperty",
                                "key": {
                                    "type": "Identifier",
                                    "name": "zoo",
                                    "start": 45,
                                    "end": 48,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 45
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 48
                                        }
                                    }
                                },
                                "value": null,
                                "static": false,
                                "start": 44,
                                "end": 48,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 44
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 48
                                    }
                                }
                            },
                            "kind": "set",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "params": [{
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 49,
                                    "end": 50,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 49
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 50
                                        }
                                    }
                                }],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ReturnStatement",
                                        "argument": {
                                            "type": "CallExpression",
                                            "callee": {
                                                "type": "Identifier",
                                                "name": "m2",
                                                "start": 61,
                                                "end": 63,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 61
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 63
                                                    }
                                                }
                                            },
                                            "arguments": [{
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 64,
                                                "end": 65,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 64
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 65
                                                    }
                                                }
                                            }],
                                            "start": 61,
                                            "end": 66,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 61
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 66
                                                }
                                            }
                                        },
                                        "start": 54,
                                        "end": 67,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 54
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 67
                                            }
                                        }
                                    }],
                                    "start": 52,
                                    "end": 69,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 52
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 69
                                        }
                                    }
                                },
                                "async": false,
                                "generator": false,
                                "expression": false,
                                "id": null,
                                "start": 48,
                                "end": 69,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 48
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 69
                                    }
                                }
                            },
                            "static": false,
                            "start": 40,
                            "end": 69,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 40
                                },
                                "end": {
                                    "line": 1,
                                    "column": 69
                                }
                            }
                        }
                    ],
                    "start": 10,
                    "end": 71,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 10
                        },
                        "end": {
                            "line": 1,
                            "column": 71
                        }
                    }
                },
                "start": 0,
                "end": 71,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 71
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 71,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 71
                }
            }
        }
    });

    pass(`class foo{  static async *m() { return 42; } #x; #y; }`, {
        source: 'class foo{  static async *m() { return 42; } #x; #y; }',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "m",
                                "start": 26,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 26
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            "kind": "method",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ReturnStatement",
                                        "argument": {
                                            "type": "Literal",
                                            "value": 42,
                                            "start": 39,
                                            "end": 41,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 39
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 41
                                                }
                                            },
                                            "raw": "42"
                                        },
                                        "start": 32,
                                        "end": 42,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 32
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 42
                                            }
                                        }
                                    }],
                                    "start": 30,
                                    "end": 44,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 30
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 44
                                        }
                                    }
                                },
                                "async": true,
                                "generator": true,
                                "expression": false,
                                "id": null,
                                "start": 27,
                                "end": 44,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 44
                                    }
                                }
                            },
                            "static": true,
                            "start": 12,
                            "end": 44,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 44
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 46,
                                "end": 47,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 46
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 47
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 45,
                            "end": 47,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 45
                                },
                                "end": {
                                    "line": 1,
                                    "column": 47
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "y",
                                "start": 50,
                                "end": 51,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 50
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 51
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 49,
                            "end": 51,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 49
                                },
                                "end": {
                                    "line": 1,
                                    "column": 51
                                }
                            }
                        }
                    ],
                    "start": 9,
                    "end": 54,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 54
                        }
                    }
                },
                "start": 0,
                "end": 54,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 54
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 54,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 54
                }
            }
        }
    });

    pass(`literal private names`, {
        source: `var C = class {
            static async m() { return 42; } static #x; static #y;
          static x() {
              this.#x = 42;
              return this.#x;
            }
            static y() {
              this.#y = 43;
              return this.#y;
            }
          }`,
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                    "type": "MethodDefinition",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "m",
                                        "start": 41,
                                        "end": 42,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 25
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 26
                                            }
                                        }
                                    },
                                    "kind": "method",
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [{
                                                "type": "ReturnStatement",
                                                "argument": {
                                                    "type": "Literal",
                                                    "value": 42,
                                                    "start": 54,
                                                    "end": 56,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 38
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 40
                                                        }
                                                    },
                                                    "raw": "42"
                                                },
                                                "start": 47,
                                                "end": 57,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 31
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 41
                                                    }
                                                }
                                            }],
                                            "start": 45,
                                            "end": 59,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 29
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 43
                                                }
                                            }
                                        },
                                        "async": true,
                                        "generator": false,
                                        "expression": false,
                                        "id": null,
                                        "start": 42,
                                        "end": 59,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 26
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 43
                                            }
                                        }
                                    },
                                    "static": true,
                                    "start": 28,
                                    "end": 59,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 43
                                        }
                                    }
                                },
                                {
                                    "type": "PrivateProperty",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 68,
                                        "end": 69,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 52
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 53
                                            }
                                        }
                                    },
                                    "value": null,
                                    "static": true,
                                    "start": 67,
                                    "end": 69,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 51
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 53
                                        }
                                    }
                                },
                                {
                                    "type": "PrivateProperty",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y",
                                        "start": 79,
                                        "end": 80,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 63
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 64
                                            }
                                        }
                                    },
                                    "value": null,
                                    "static": true,
                                    "start": 78,
                                    "end": 80,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 62
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 64
                                        }
                                    }
                                },
                                {
                                    "type": "MethodDefinition",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 99,
                                        "end": 100,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 17
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 18
                                            }
                                        }
                                    },
                                    "kind": "method",
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [{
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "left": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "ThisExpression",
                                                                "start": 119,
                                                                "end": 123,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 14
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 18
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "PrivateName",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
                                                                    "start": 125,
                                                                    "end": 126,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 4,
                                                                            "column": 20
                                                                        },
                                                                        "end": {
                                                                            "line": 4,
                                                                            "column": 21
                                                                        }
                                                                    }
                                                                },
                                                                "start": 124,
                                                                "end": 126,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 19
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "start": 119,
                                                            "end": 126,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 4,
                                                                    "column": 14
                                                                },
                                                                "end": {
                                                                    "line": 4,
                                                                    "column": 21
                                                                }
                                                            }
                                                        },
                                                        "operator": "=",
                                                        "right": {
                                                            "type": "Literal",
                                                            "value": 42,
                                                            "start": 129,
                                                            "end": 131,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 4,
                                                                    "column": 24
                                                                },
                                                                "end": {
                                                                    "line": 4,
                                                                    "column": 26
                                                                }
                                                            },
                                                            "raw": "42"
                                                        },
                                                        "start": 119,
                                                        "end": 131,
                                                        "loc": {
                                                            "start": {
                                                                "line": 4,
                                                                "column": 14
                                                            },
                                                            "end": {
                                                                "line": 4,
                                                                "column": 26
                                                            }
                                                        }
                                                    },
                                                    "start": 119,
                                                    "end": 132,
                                                    "loc": {
                                                        "start": {
                                                            "line": 4,
                                                            "column": 14
                                                        },
                                                        "end": {
                                                            "line": 4,
                                                            "column": 27
                                                        }
                                                    }
                                                },
                                                {
                                                    "type": "ReturnStatement",
                                                    "argument": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "ThisExpression",
                                                            "start": 154,
                                                            "end": 158,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 21
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 25
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "PrivateName",
                                                            "id": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 160,
                                                                "end": 161,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 27
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 28
                                                                    }
                                                                }
                                                            },
                                                            "start": 159,
                                                            "end": 161,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 26
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 28
                                                                }
                                                            }
                                                        },
                                                        "start": 154,
                                                        "end": 161,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 21
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 28
                                                            }
                                                        }
                                                    },
                                                    "start": 147,
                                                    "end": 162,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 14
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 29
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 103,
                                            "end": 176,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 21
                                                },
                                                "end": {
                                                    "line": 6,
                                                    "column": 13
                                                }
                                            }
                                        },
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "id": null,
                                        "start": 100,
                                        "end": 176,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 18
                                            },
                                            "end": {
                                                "line": 6,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "static": true,
                                    "start": 92,
                                    "end": 176,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 6,
                                            "column": 13
                                        }
                                    }
                                },
                                {
                                    "type": "MethodDefinition",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y",
                                        "start": 196,
                                        "end": 197,
                                        "loc": {
                                            "start": {
                                                "line": 7,
                                                "column": 19
                                            },
                                            "end": {
                                                "line": 7,
                                                "column": 20
                                            }
                                        }
                                    },
                                    "kind": "method",
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [{
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "left": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "ThisExpression",
                                                                "start": 216,
                                                                "end": 220,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 14
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 18
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "PrivateName",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "y",
                                                                    "start": 222,
                                                                    "end": 223,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 8,
                                                                            "column": 20
                                                                        },
                                                                        "end": {
                                                                            "line": 8,
                                                                            "column": 21
                                                                        }
                                                                    }
                                                                },
                                                                "start": 221,
                                                                "end": 223,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 19
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "start": 216,
                                                            "end": 223,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 8,
                                                                    "column": 14
                                                                },
                                                                "end": {
                                                                    "line": 8,
                                                                    "column": 21
                                                                }
                                                            }
                                                        },
                                                        "operator": "=",
                                                        "right": {
                                                            "type": "Literal",
                                                            "value": 43,
                                                            "start": 226,
                                                            "end": 228,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 8,
                                                                    "column": 24
                                                                },
                                                                "end": {
                                                                    "line": 8,
                                                                    "column": 26
                                                                }
                                                            },
                                                            "raw": "43"
                                                        },
                                                        "start": 216,
                                                        "end": 228,
                                                        "loc": {
                                                            "start": {
                                                                "line": 8,
                                                                "column": 14
                                                            },
                                                            "end": {
                                                                "line": 8,
                                                                "column": 26
                                                            }
                                                        }
                                                    },
                                                    "start": 216,
                                                    "end": 229,
                                                    "loc": {
                                                        "start": {
                                                            "line": 8,
                                                            "column": 14
                                                        },
                                                        "end": {
                                                            "line": 8,
                                                            "column": 27
                                                        }
                                                    }
                                                },
                                                {
                                                    "type": "ReturnStatement",
                                                    "argument": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "ThisExpression",
                                                            "start": 251,
                                                            "end": 255,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 21
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 25
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "PrivateName",
                                                            "id": {
                                                                "type": "Identifier",
                                                                "name": "y",
                                                                "start": 257,
                                                                "end": 258,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 9,
                                                                        "column": 27
                                                                    },
                                                                    "end": {
                                                                        "line": 9,
                                                                        "column": 28
                                                                    }
                                                                }
                                                            },
                                                            "start": 256,
                                                            "end": 258,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 26
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 28
                                                                }
                                                            }
                                                        },
                                                        "start": 251,
                                                        "end": 258,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 21
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 28
                                                            }
                                                        }
                                                    },
                                                    "start": 244,
                                                    "end": 259,
                                                    "loc": {
                                                        "start": {
                                                            "line": 9,
                                                            "column": 14
                                                        },
                                                        "end": {
                                                            "line": 9,
                                                            "column": 29
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 200,
                                            "end": 273,
                                            "loc": {
                                                "start": {
                                                    "line": 7,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 10,
                                                    "column": 13
                                                }
                                            }
                                        },
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "id": null,
                                        "start": 197,
                                        "end": 273,
                                        "loc": {
                                            "start": {
                                                "line": 7,
                                                "column": 20
                                            },
                                            "end": {
                                                "line": 10,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "static": true,
                                    "start": 189,
                                    "end": 273,
                                    "loc": {
                                        "start": {
                                            "line": 7,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 10,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "start": 14,
                            "end": 285,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 11,
                                    "column": 11
                                }
                            }
                        },
                        "start": 8,
                        "end": 285,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 11,
                                "column": 11
                            }
                        }
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 4,
                        "end": 5,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 5
                            }
                        }
                    },
                    "start": 4,
                    "end": 285,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 11,
                            "column": 11
                        }
                    }
                }],
                "kind": "var",
                "start": 0,
                "end": 285,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 11,
                        "column": 11
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 285,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 11,
                    "column": 11
                }
            }
        }
    });

    pass(`field definitions after a static method`, {
        source: `var C = class {
            static m() { return 42; } static #x; static #y;
          static x() {
              this.#x = 42;
              return this.#x;
            }
            static y() {
              this.#y = 43;
              return this.#y;
            }
          }`,
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "init": {
                        "type": "ClassExpression",
                        "id": null,
                        "superClass": null,
                        "body": {
                            "type": "ClassBody",
                            "body": [{
                                    "type": "MethodDefinition",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "m",
                                        "start": 35,
                                        "end": 36,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 19
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 20
                                            }
                                        }
                                    },
                                    "kind": "method",
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [{
                                                "type": "ReturnStatement",
                                                "argument": {
                                                    "type": "Literal",
                                                    "value": 42,
                                                    "start": 48,
                                                    "end": 50,
                                                    "loc": {
                                                        "start": {
                                                            "line": 2,
                                                            "column": 32
                                                        },
                                                        "end": {
                                                            "line": 2,
                                                            "column": 34
                                                        }
                                                    },
                                                    "raw": "42"
                                                },
                                                "start": 41,
                                                "end": 51,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 25
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 35
                                                    }
                                                }
                                            }],
                                            "start": 39,
                                            "end": 53,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 37
                                                }
                                            }
                                        },
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "id": null,
                                        "start": 36,
                                        "end": 53,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 20
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 37
                                            }
                                        }
                                    },
                                    "static": true,
                                    "start": 28,
                                    "end": 53,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 37
                                        }
                                    }
                                },
                                {
                                    "type": "PrivateProperty",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 62,
                                        "end": 63,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 46
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 47
                                            }
                                        }
                                    },
                                    "value": null,
                                    "static": true,
                                    "start": 61,
                                    "end": 63,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 45
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 47
                                        }
                                    }
                                },
                                {
                                    "type": "PrivateProperty",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y",
                                        "start": 73,
                                        "end": 74,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 57
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 58
                                            }
                                        }
                                    },
                                    "value": null,
                                    "static": true,
                                    "start": 72,
                                    "end": 74,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 56
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 58
                                        }
                                    }
                                },
                                {
                                    "type": "MethodDefinition",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "x",
                                        "start": 93,
                                        "end": 94,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 17
                                            },
                                            "end": {
                                                "line": 3,
                                                "column": 18
                                            }
                                        }
                                    },
                                    "kind": "method",
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [{
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "left": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "ThisExpression",
                                                                "start": 113,
                                                                "end": 117,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 14
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 18
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "PrivateName",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
                                                                    "start": 119,
                                                                    "end": 120,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 4,
                                                                            "column": 20
                                                                        },
                                                                        "end": {
                                                                            "line": 4,
                                                                            "column": 21
                                                                        }
                                                                    }
                                                                },
                                                                "start": 118,
                                                                "end": 120,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 19
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "start": 113,
                                                            "end": 120,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 4,
                                                                    "column": 14
                                                                },
                                                                "end": {
                                                                    "line": 4,
                                                                    "column": 21
                                                                }
                                                            }
                                                        },
                                                        "operator": "=",
                                                        "right": {
                                                            "type": "Literal",
                                                            "value": 42,
                                                            "start": 123,
                                                            "end": 125,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 4,
                                                                    "column": 24
                                                                },
                                                                "end": {
                                                                    "line": 4,
                                                                    "column": 26
                                                                }
                                                            },
                                                            "raw": "42"
                                                        },
                                                        "start": 113,
                                                        "end": 125,
                                                        "loc": {
                                                            "start": {
                                                                "line": 4,
                                                                "column": 14
                                                            },
                                                            "end": {
                                                                "line": 4,
                                                                "column": 26
                                                            }
                                                        }
                                                    },
                                                    "start": 113,
                                                    "end": 126,
                                                    "loc": {
                                                        "start": {
                                                            "line": 4,
                                                            "column": 14
                                                        },
                                                        "end": {
                                                            "line": 4,
                                                            "column": 27
                                                        }
                                                    }
                                                },
                                                {
                                                    "type": "ReturnStatement",
                                                    "argument": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "ThisExpression",
                                                            "start": 148,
                                                            "end": 152,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 21
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 25
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "PrivateName",
                                                            "id": {
                                                                "type": "Identifier",
                                                                "name": "x",
                                                                "start": 154,
                                                                "end": 155,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 27
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 28
                                                                    }
                                                                }
                                                            },
                                                            "start": 153,
                                                            "end": 155,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 26
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 28
                                                                }
                                                            }
                                                        },
                                                        "start": 148,
                                                        "end": 155,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 21
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 28
                                                            }
                                                        }
                                                    },
                                                    "start": 141,
                                                    "end": 156,
                                                    "loc": {
                                                        "start": {
                                                            "line": 5,
                                                            "column": 14
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 29
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 97,
                                            "end": 170,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 21
                                                },
                                                "end": {
                                                    "line": 6,
                                                    "column": 13
                                                }
                                            }
                                        },
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "id": null,
                                        "start": 94,
                                        "end": 170,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 18
                                            },
                                            "end": {
                                                "line": 6,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "static": true,
                                    "start": 86,
                                    "end": 170,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 6,
                                            "column": 13
                                        }
                                    }
                                },
                                {
                                    "type": "MethodDefinition",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "y",
                                        "start": 190,
                                        "end": 191,
                                        "loc": {
                                            "start": {
                                                "line": 7,
                                                "column": 19
                                            },
                                            "end": {
                                                "line": 7,
                                                "column": 20
                                            }
                                        }
                                    },
                                    "kind": "method",
                                    "computed": false,
                                    "value": {
                                        "type": "FunctionExpression",
                                        "params": [],
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [{
                                                    "type": "ExpressionStatement",
                                                    "expression": {
                                                        "type": "AssignmentExpression",
                                                        "left": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "ThisExpression",
                                                                "start": 210,
                                                                "end": 214,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 14
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 18
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "PrivateName",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "y",
                                                                    "start": 216,
                                                                    "end": 217,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 8,
                                                                            "column": 20
                                                                        },
                                                                        "end": {
                                                                            "line": 8,
                                                                            "column": 21
                                                                        }
                                                                    }
                                                                },
                                                                "start": 215,
                                                                "end": 217,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 19
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "start": 210,
                                                            "end": 217,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 8,
                                                                    "column": 14
                                                                },
                                                                "end": {
                                                                    "line": 8,
                                                                    "column": 21
                                                                }
                                                            }
                                                        },
                                                        "operator": "=",
                                                        "right": {
                                                            "type": "Literal",
                                                            "value": 43,
                                                            "start": 220,
                                                            "end": 222,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 8,
                                                                    "column": 24
                                                                },
                                                                "end": {
                                                                    "line": 8,
                                                                    "column": 26
                                                                }
                                                            },
                                                            "raw": "43"
                                                        },
                                                        "start": 210,
                                                        "end": 222,
                                                        "loc": {
                                                            "start": {
                                                                "line": 8,
                                                                "column": 14
                                                            },
                                                            "end": {
                                                                "line": 8,
                                                                "column": 26
                                                            }
                                                        }
                                                    },
                                                    "start": 210,
                                                    "end": 223,
                                                    "loc": {
                                                        "start": {
                                                            "line": 8,
                                                            "column": 14
                                                        },
                                                        "end": {
                                                            "line": 8,
                                                            "column": 27
                                                        }
                                                    }
                                                },
                                                {
                                                    "type": "ReturnStatement",
                                                    "argument": {
                                                        "type": "MemberExpression",
                                                        "object": {
                                                            "type": "ThisExpression",
                                                            "start": 245,
                                                            "end": 249,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 21
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 25
                                                                }
                                                            }
                                                        },
                                                        "computed": false,
                                                        "property": {
                                                            "type": "PrivateName",
                                                            "id": {
                                                                "type": "Identifier",
                                                                "name": "y",
                                                                "start": 251,
                                                                "end": 252,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 9,
                                                                        "column": 27
                                                                    },
                                                                    "end": {
                                                                        "line": 9,
                                                                        "column": 28
                                                                    }
                                                                }
                                                            },
                                                            "start": 250,
                                                            "end": 252,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 26
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 28
                                                                }
                                                            }
                                                        },
                                                        "start": 245,
                                                        "end": 252,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 21
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 28
                                                            }
                                                        }
                                                    },
                                                    "start": 238,
                                                    "end": 253,
                                                    "loc": {
                                                        "start": {
                                                            "line": 9,
                                                            "column": 14
                                                        },
                                                        "end": {
                                                            "line": 9,
                                                            "column": 29
                                                        }
                                                    }
                                                }
                                            ],
                                            "start": 194,
                                            "end": 267,
                                            "loc": {
                                                "start": {
                                                    "line": 7,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 10,
                                                    "column": 13
                                                }
                                            }
                                        },
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "id": null,
                                        "start": 191,
                                        "end": 267,
                                        "loc": {
                                            "start": {
                                                "line": 7,
                                                "column": 20
                                            },
                                            "end": {
                                                "line": 10,
                                                "column": 13
                                            }
                                        }
                                    },
                                    "static": true,
                                    "start": 183,
                                    "end": 267,
                                    "loc": {
                                        "start": {
                                            "line": 7,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 10,
                                            "column": 13
                                        }
                                    }
                                }
                            ],
                            "start": 14,
                            "end": 279,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 11,
                                    "column": 11
                                }
                            }
                        },
                        "start": 8,
                        "end": 279,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 11,
                                "column": 11
                            }
                        }
                    },
                    "id": {
                        "type": "Identifier",
                        "name": "C",
                        "start": 4,
                        "end": 5,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 5
                            }
                        }
                    },
                    "start": 4,
                    "end": 279,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 11,
                            "column": 11
                        }
                    }
                }],
                "kind": "var",
                "start": 0,
                "end": 279,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 11,
                        "column": 11
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 279,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 11,
                    "column": 11
                }
            }
        }
    });

    pass(`class C { static ["a"] = 39; }`, {
        source: 'class C { static ["a"] = 39; }',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "C",
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                        "type": "ClassProperty",
                        "key": {
                            "type": "Literal",
                            "value": "a",
                            "start": 18,
                            "end": 21,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            },
                            "raw": "\"a\""
                        },
                        "value": {
                            "type": "Literal",
                            "value": 39,
                            "start": 25,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 25
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            },
                            "raw": "39"
                        },
                        "start": 17,
                        "end": 27,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 17
                            },
                            "end": {
                                "line": 1,
                                "column": 27
                            }
                        }
                    }],
                    "start": 8,
                    "end": 30,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 30
                        }
                    }
                },
                "start": 0,
                "end": 30,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 30
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 30,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 30
                }
            }
        }
    });

    pass(`async static`, {
        source: 'class foo{  static async *m() { return 42; } #x; #y; }',
        loc: true,
        ranges: true,
        next: true,
        raw: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "MethodDefinition",
                            "key": {
                                "type": "Identifier",
                                "name": "m",
                                "start": 26,
                                "end": 27,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 26
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            "kind": "method",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [{
                                        "type": "ReturnStatement",
                                        "argument": {
                                            "type": "Literal",
                                            "value": 42,
                                            "start": 39,
                                            "end": 41,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 39
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 41
                                                }
                                            },
                                            "raw": "42"
                                        },
                                        "start": 32,
                                        "end": 42,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 32
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 42
                                            }
                                        }
                                    }],
                                    "start": 30,
                                    "end": 44,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 30
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 44
                                        }
                                    }
                                },
                                "async": true,
                                "generator": true,
                                "expression": false,
                                "id": null,
                                "start": 27,
                                "end": 44,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 44
                                    }
                                }
                            },
                            "static": true,
                            "start": 12,
                            "end": 44,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 44
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 46,
                                "end": 47,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 46
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 47
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 45,
                            "end": 47,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 45
                                },
                                "end": {
                                    "line": 1,
                                    "column": 47
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "y",
                                "start": 50,
                                "end": 51,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 50
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 51
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 49,
                            "end": 51,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 49
                                },
                                "end": {
                                    "line": 1,
                                    "column": 51
                                }
                            }
                        }
                    ],
                    "start": 9,
                    "end": 54,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 9
                        },
                        "end": {
                            "line": 1,
                            "column": 54
                        }
                    }
                },
                "start": 0,
                "end": 54,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 54
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 54,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 54
                }
            }
        }
    });

    pass(`mixed comma public fields`, {
        source: 'class C { p1, p2; }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "C",
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "Identifier",
                            "name": "p1",
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
                        {
                            "type": "Identifier",
                            "name": "p2",
                            "start": 14,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        }
                    ],
                    "start": 8,
                    "end": 19,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 19
                        }
                    }
                },
                "start": 0,
                "end": 19,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 19
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 19,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 19
                }
            }
        }
    });
    
    pass(`no conflict between private and public name`, {
        source: 'class foo { #a, a }',
        loc: true,
        ranges: true,
        next: true,
        expected: {
            "type": "Program",
            "body": [{
                "type": "ClassDeclaration",
                "id": {
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
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [{
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 13,
                                "end": 14,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 13
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 12,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 12
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        {
                            "type": "Identifier",
                            "name": "a",
                            "start": 16,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 16
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        }
                    ],
                    "start": 10,
                    "end": 19,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 10
                        },
                        "end": {
                            "line": 1,
                            "column": 19
                        }
                    }
                },
                "start": 0,
                "end": 19,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 19
                    }
                }
            }],
            "sourceType": "script",
            "start": 0,
            "end": 19,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 19
                }
            }
        }
    });
});