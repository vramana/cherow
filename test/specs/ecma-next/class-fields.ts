import { n, fail, pass } from '../utils/test-utils';

describe('"Next - "Class fields"', () => {

    fail('inaccessible outside of the class body', '#a')
    fail('constructor with private name', 'class Foo { #constructor() {} }')
    fail('missing semicolon', 'class Foo { p = x  *#m () {} }')
    fail('delete non private','class Foo { #x;  constructor() { delete #x.d; } }');
    fail('ASI failure generator','class Foo { #p = x *#m () {} }');
    fail('ASI failure inline','class Foo { #x #y }');
    fail('computed','class Foo { #[m] = 1 }');
    fail('delete shorthand','class Foo { #x; constructor() { delete #x; } }');
    fail('numeric literal','class Foo { #2 = y } }');
    fail('numeric start of identifier','class Foo { #2x = y } }');
    fail('string literal','class Foo { #"p" = x }');
    fail('method','class Foo {  #p = x #m () {} }');
    fail('dangling semicolon', 'class Foo { x,y,; }');
    fail('comma separator methid', 'x, f() {}');
    fail('dangling comma', 'x,');
    fail('dangling comma', '#x,;');
    fail('private field as constructor', 'class C { constructor; }');
    fail('private field as static prototype', 'class C { static prototype; }');
    fail('private field as static constructor', 'class C { static constructor; }');
    fail('private field with arguments in arrow func body', 'class C { #x = () => arguments; }');
    fail('private field with eval in arrow func body', 'class C { #x = () => eval; }');
    fail('private name as constructor', 'class C { #constructor; }');
    fail('static assign arguments', 'class C { static x = arguments; }');
    fail('static assign eval', 'class C { static x = eval; }');
    fail('duplicate private names', `class C { #x; #x; }`);
    fail('private class fields early error with StringValue "#constructor"', 'function f() { this.#x; }');
    fail('private class fields early error with StringValue "#constructor"', '#constructor;');
    fail('`arguments` used in class field (ClassElementName PrivateName)', 'class C { #x = arguments; }');
    fail('`eval` used in class field (ClassElementName PrivateName)', 'class C { #x = eval; }');
    fail('private field assign arguments', 'class C { #x = arguments; }');
    fail('private field assign eval', 'class C { #x = eval; }');
    fail('`arguments` used in class field (private field, ternary expression)', 'class C { #x = false ? {} : arguments; }');
    fail('`arguments` used in class field (private field, ternary expression)', 'class C { #x = false ? {} : eval; }');
    fail('`arguments` used in class field (ternary expression)', 'class C { x = false ? {} : arguments;}');
    fail('`eval` used in class field (ternary expression)', 'class C { x = false ? {} : eval }');
    fail('Early Error #1 (module code)', '#x,;', true);
    fail('Early Error #2 (module code)', 'class C { constructor() { this.#x; }  }', true);
    fail('Early Error #3 (module code)', 'class C { f() {  this.#x; }  }', true);
    fail('Early Error #4 (module code)', 'class C { y = this.#x; }', true);
    fail('Early Error #5 (module code)', 'new C().#x;', true);
    fail('Early Error #6 (module code)', 'class C { #x; }', true);
    fail('Early Error #7 (module code)', `class C {
        f() {
          this.#x;
          class D extends C {
            #x;
          }
        }
      }`, true);

    fail('Early Error #8 (module code)', 'function f() { this.#x; }', true);
    
    pass('ASI #5', `class C {
        a = x
        in
        z
        b = y
        in
        z
      }`, {
        "type": "Program",
        "body": [
            {
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
                    "body": [
                        {
                            "type": "ClassProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 18,
                                "end": 19,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 9
                                    }
                                }
                            },
                            "value": {
                                "type": "BinaryExpression",
                                "left": {
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 22,
                                    "end": 23,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 13
                                        }
                                    }
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "z",
                                    "start": 43,
                                    "end": 44,
                                    "loc": {
                                        "start": {
                                            "line": 4,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 9
                                        }
                                    }
                                },
                                "operator": "in",
                                "start": 22,
                                "end": 44,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 9
                                    }
                                }
                            },
                            "start": 18,
                            "end": 44,
                            "loc": {
                                "start": {
                                    "line": 2,
                                    "column": 8
                                },
                                "end": {
                                    "line": 4,
                                    "column": 9
                                }
                            }
                        },
                        {
                            "type": "ClassProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "b",
                                "start": 53,
                                "end": 54,
                                "loc": {
                                    "start": {
                                        "line": 5,
                                        "column": 8
                                    },
                                    "end": {
                                        "line": 5,
                                        "column": 9
                                    }
                                }
                            },
                            "value": {
                                "type": "BinaryExpression",
                                "left": {
                                    "type": "Identifier",
                                    "name": "y",
                                    "start": 57,
                                    "end": 58,
                                    "loc": {
                                        "start": {
                                            "line": 5,
                                            "column": 12
                                        },
                                        "end": {
                                            "line": 5,
                                            "column": 13
                                        }
                                    }
                                },
                                "right": {
                                    "type": "Identifier",
                                    "name": "z",
                                    "start": 78,
                                    "end": 79,
                                    "loc": {
                                        "start": {
                                            "line": 7,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 7,
                                            "column": 9
                                        }
                                    }
                                },
                                "operator": "in",
                                "start": 57,
                                "end": 79,
                                "loc": {
                                    "start": {
                                        "line": 5,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 7,
                                        "column": 9
                                    }
                                }
                            },
                            "start": 53,
                            "end": 79,
                            "loc": {
                                "start": {
                                    "line": 5,
                                    "column": 8
                                },
                                "end": {
                                    "line": 7,
                                    "column": 9
                                }
                            }
                        }
                    ],
                    "start": 8,
                    "end": 87,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 8,
                            "column": 7
                        }
                    }
                },
                "start": 0,
                "end": 87,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 8,
                        "column": 7
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 87,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 8,
                "column": 7
            }
        }
    });
    
    pass('literal', `class C { 'a'; }`, {
        "type": "Program",
        "body": [
            {
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
                    "body": [
                        {
                            "type": "Literal",
                            "value": "a",
                            "start": 10,
                            "end": 13,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 13
                                }
                            },
                            "raw": "'a'"
                        }
                    ],
                    "start": 8,
                    "end": 16,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
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
        "sourceType": "script",
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
    });

      pass('static computed name', `class C { static ["a"] = 39; }`, {
        "type": "Program",
        "body": [
            {
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
                    "body": [
                        {
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
                        }
                    ],
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
            }
        ],
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
    });

      pass('static private name', `var C = class { static #x() {}; }`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "ClassExpression",
                            "id": null,
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": [
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "PrivateProperty",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "x",
                                                "start": 24,
                                                "end": 25,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 24
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 25
                                                    }
                                                }
                                            },
                                            "value": null,
                                            "static": true,
                                            "start": 23,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 23
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 28,
                                                "end": 30,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 28
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 30
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 25,
                                            "end": 30,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 30
                                                }
                                            }
                                        },
                                        "static": true,
                                        "start": 16,
                                        "end": 30,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 30
                                            }
                                        }
                                    }
                                ],
                                "start": 14,
                                "end": 33,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 33
                                    }
                                }
                            },
                            "start": 8,
                            "end": 33,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 33
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
                        "end": 33,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 33
                            }
                        }
                    }
                ],
                "kind": "var",
                "start": 0,
                "end": 33,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 33
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 33,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 33
            }
        }
    });

    pass('field definitions after a static method', `var C = class {
        static m() { return 42; } static #x; static #y;
      static x() {
          this.#x = 42;
          return this.#x;
        }
        static y() {
          this.#y = 43;
          return this.#y;
        }
      }`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "ClassExpression",
                            "id": null,
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": [
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "m",
                                            "start": 31,
                                            "end": 32,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 16
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "Literal",
                                                            "value": 42,
                                                            "start": 44,
                                                            "end": 46,
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
                                                            "raw": "42"
                                                        },
                                                        "start": 37,
                                                        "end": 47,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 21
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 31
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 35,
                                                "end": 49,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 33
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 32,
                                            "end": 49,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 33
                                                }
                                            }
                                        },
                                        "static": true,
                                        "start": 24,
                                        "end": 49,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 33
                                            }
                                        }
                                    },
                                    {
                                        "type": "PrivateProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "x",
                                            "start": 58,
                                            "end": 59,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 42
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 43
                                                }
                                            }
                                        },
                                        "value": null,
                                        "static": true,
                                        "start": 57,
                                        "end": 59,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 41
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
                                            "name": "y",
                                            "start": 69,
                                            "end": 70,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 53
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 54
                                                }
                                            }
                                        },
                                        "value": null,
                                        "static": true,
                                        "start": 68,
                                        "end": 70,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 52
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 54
                                            }
                                        }
                                    },
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "x",
                                            "start": 85,
                                            "end": 86,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 13
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 14
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "AssignmentExpression",
                                                            "left": {
                                                                "type": "MemberExpression",
                                                                "object": {
                                                                    "type": "ThisExpression",
                                                                    "start": 101,
                                                                    "end": 105,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 4,
                                                                            "column": 10
                                                                        },
                                                                        "end": {
                                                                            "line": 4,
                                                                            "column": 14
                                                                        }
                                                                    }
                                                                },
                                                                "computed": false,
                                                                "property": {
                                                                    "type": "PrivateName",
                                                                    "id": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 107,
                                                                        "end": 108,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 4,
                                                                                "column": 16
                                                                            },
                                                                            "end": {
                                                                                "line": 4,
                                                                                "column": 17
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 106,
                                                                    "end": 108,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 4,
                                                                            "column": 15
                                                                        },
                                                                        "end": {
                                                                            "line": 4,
                                                                            "column": 17
                                                                        }
                                                                    }
                                                                },
                                                                "start": 101,
                                                                "end": 108,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 10
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 17
                                                                    }
                                                                }
                                                            },
                                                            "operator": "=",
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 42,
                                                                "start": 111,
                                                                "end": 113,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 20
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 22
                                                                    }
                                                                },
                                                                "raw": "42"
                                                            },
                                                            "start": 101,
                                                            "end": 113,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 4,
                                                                    "column": 10
                                                                },
                                                                "end": {
                                                                    "line": 4,
                                                                    "column": 22
                                                                }
                                                            }
                                                        },
                                                        "start": 101,
                                                        "end": 114,
                                                        "loc": {
                                                            "start": {
                                                                "line": 4,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 4,
                                                                "column": 23
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "ThisExpression",
                                                                "start": 132,
                                                                "end": 136,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 17
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "PrivateName",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
                                                                    "start": 138,
                                                                    "end": 139,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 5,
                                                                            "column": 23
                                                                        },
                                                                        "end": {
                                                                            "line": 5,
                                                                            "column": 24
                                                                        }
                                                                    }
                                                                },
                                                                "start": 137,
                                                                "end": 139,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 22
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 24
                                                                    }
                                                                }
                                                            },
                                                            "start": 132,
                                                            "end": 139,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 17
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 24
                                                                }
                                                            }
                                                        },
                                                        "start": 125,
                                                        "end": 140,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 25
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 89,
                                                "end": 150,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 17
                                                    },
                                                    "end": {
                                                        "line": 6,
                                                        "column": 9
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 86,
                                            "end": 150,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 14
                                                },
                                                "end": {
                                                    "line": 6,
                                                    "column": 9
                                                }
                                            }
                                        },
                                        "static": true,
                                        "start": 78,
                                        "end": 150,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 6
                                            },
                                            "end": {
                                                "line": 6,
                                                "column": 9
                                            }
                                        }
                                    },
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "y",
                                            "start": 166,
                                            "end": 167,
                                            "loc": {
                                                "start": {
                                                    "line": 7,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 7,
                                                    "column": 16
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "AssignmentExpression",
                                                            "left": {
                                                                "type": "MemberExpression",
                                                                "object": {
                                                                    "type": "ThisExpression",
                                                                    "start": 182,
                                                                    "end": 186,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 8,
                                                                            "column": 10
                                                                        },
                                                                        "end": {
                                                                            "line": 8,
                                                                            "column": 14
                                                                        }
                                                                    }
                                                                },
                                                                "computed": false,
                                                                "property": {
                                                                    "type": "PrivateName",
                                                                    "id": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 188,
                                                                        "end": 189,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 8,
                                                                                "column": 16
                                                                            },
                                                                            "end": {
                                                                                "line": 8,
                                                                                "column": 17
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 187,
                                                                    "end": 189,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 8,
                                                                            "column": 15
                                                                        },
                                                                        "end": {
                                                                            "line": 8,
                                                                            "column": 17
                                                                        }
                                                                    }
                                                                },
                                                                "start": 182,
                                                                "end": 189,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 10
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 17
                                                                    }
                                                                }
                                                            },
                                                            "operator": "=",
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 43,
                                                                "start": 192,
                                                                "end": 194,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 20
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 22
                                                                    }
                                                                },
                                                                "raw": "43"
                                                            },
                                                            "start": 182,
                                                            "end": 194,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 8,
                                                                    "column": 10
                                                                },
                                                                "end": {
                                                                    "line": 8,
                                                                    "column": 22
                                                                }
                                                            }
                                                        },
                                                        "start": 182,
                                                        "end": 195,
                                                        "loc": {
                                                            "start": {
                                                                "line": 8,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 8,
                                                                "column": 23
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "ThisExpression",
                                                                "start": 213,
                                                                "end": 217,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 9,
                                                                        "column": 17
                                                                    },
                                                                    "end": {
                                                                        "line": 9,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "PrivateName",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "y",
                                                                    "start": 219,
                                                                    "end": 220,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 9,
                                                                            "column": 23
                                                                        },
                                                                        "end": {
                                                                            "line": 9,
                                                                            "column": 24
                                                                        }
                                                                    }
                                                                },
                                                                "start": 218,
                                                                "end": 220,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 9,
                                                                        "column": 22
                                                                    },
                                                                    "end": {
                                                                        "line": 9,
                                                                        "column": 24
                                                                    }
                                                                }
                                                            },
                                                            "start": 213,
                                                            "end": 220,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 17
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 24
                                                                }
                                                            }
                                                        },
                                                        "start": 206,
                                                        "end": 221,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 25
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 170,
                                                "end": 231,
                                                "loc": {
                                                    "start": {
                                                        "line": 7,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 10,
                                                        "column": 9
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 167,
                                            "end": 231,
                                            "loc": {
                                                "start": {
                                                    "line": 7,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 10,
                                                    "column": 9
                                                }
                                            }
                                        },
                                        "static": true,
                                        "start": 159,
                                        "end": 231,
                                        "loc": {
                                            "start": {
                                                "line": 7,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 10,
                                                "column": 9
                                            }
                                        }
                                    }
                                ],
                                "start": 14,
                                "end": 239,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 11,
                                        "column": 7
                                    }
                                }
                            },
                            "start": 8,
                            "end": 239,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 11,
                                    "column": 7
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
                        "end": 239,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 11,
                                "column": 7
                            }
                        }
                    }
                ],
                "kind": "var",
                "start": 0,
                "end": 239,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 11,
                        "column": 7
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 239,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 11,
                "column": 7
            }
        }
    });

    pass('literal private names', `var C = class {
        static async m() { return 42; } static #x; static #y;
      static x() {
          this.#x = 42;
          return this.#x;
        }
        static y() {
          this.#y = 43;
          return this.#y;
        }
      }`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "ClassExpression",
                            "id": null,
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": [
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "m",
                                            "start": 37,
                                            "end": 38,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 21
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 22
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "Literal",
                                                            "value": 42,
                                                            "start": 50,
                                                            "end": 52,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 34
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 36
                                                                }
                                                            },
                                                            "raw": "42"
                                                        },
                                                        "start": 43,
                                                        "end": 53,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 27
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 37
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 41,
                                                "end": 55,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 25
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 39
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": true,
                                            "expression": false,
                                            "start": 38,
                                            "end": 55,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 22
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 39
                                                }
                                            }
                                        },
                                        "static": true,
                                        "start": 24,
                                        "end": 55,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 39
                                            }
                                        }
                                    },
                                    {
                                        "type": "PrivateProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "x",
                                            "start": 64,
                                            "end": 65,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 48
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 49
                                                }
                                            }
                                        },
                                        "value": null,
                                        "static": true,
                                        "start": 63,
                                        "end": 65,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 47
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 49
                                            }
                                        }
                                    },
                                    {
                                        "type": "PrivateProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "y",
                                            "start": 75,
                                            "end": 76,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 59
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 60
                                                }
                                            }
                                        },
                                        "value": null,
                                        "static": true,
                                        "start": 74,
                                        "end": 76,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 58
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 60
                                            }
                                        }
                                    },
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "x",
                                            "start": 91,
                                            "end": 92,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 13
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 14
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "AssignmentExpression",
                                                            "left": {
                                                                "type": "MemberExpression",
                                                                "object": {
                                                                    "type": "ThisExpression",
                                                                    "start": 107,
                                                                    "end": 111,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 4,
                                                                            "column": 10
                                                                        },
                                                                        "end": {
                                                                            "line": 4,
                                                                            "column": 14
                                                                        }
                                                                    }
                                                                },
                                                                "computed": false,
                                                                "property": {
                                                                    "type": "PrivateName",
                                                                    "id": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 113,
                                                                        "end": 114,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 4,
                                                                                "column": 16
                                                                            },
                                                                            "end": {
                                                                                "line": 4,
                                                                                "column": 17
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 112,
                                                                    "end": 114,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 4,
                                                                            "column": 15
                                                                        },
                                                                        "end": {
                                                                            "line": 4,
                                                                            "column": 17
                                                                        }
                                                                    }
                                                                },
                                                                "start": 107,
                                                                "end": 114,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 10
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 17
                                                                    }
                                                                }
                                                            },
                                                            "operator": "=",
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 42,
                                                                "start": 117,
                                                                "end": 119,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 20
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 22
                                                                    }
                                                                },
                                                                "raw": "42"
                                                            },
                                                            "start": 107,
                                                            "end": 119,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 4,
                                                                    "column": 10
                                                                },
                                                                "end": {
                                                                    "line": 4,
                                                                    "column": 22
                                                                }
                                                            }
                                                        },
                                                        "start": 107,
                                                        "end": 120,
                                                        "loc": {
                                                            "start": {
                                                                "line": 4,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 4,
                                                                "column": 23
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "ThisExpression",
                                                                "start": 138,
                                                                "end": 142,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 17
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "PrivateName",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
                                                                    "start": 144,
                                                                    "end": 145,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 5,
                                                                            "column": 23
                                                                        },
                                                                        "end": {
                                                                            "line": 5,
                                                                            "column": 24
                                                                        }
                                                                    }
                                                                },
                                                                "start": 143,
                                                                "end": 145,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 22
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 24
                                                                    }
                                                                }
                                                            },
                                                            "start": 138,
                                                            "end": 145,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 17
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 24
                                                                }
                                                            }
                                                        },
                                                        "start": 131,
                                                        "end": 146,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 25
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 95,
                                                "end": 156,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 17
                                                    },
                                                    "end": {
                                                        "line": 6,
                                                        "column": 9
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 92,
                                            "end": 156,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 14
                                                },
                                                "end": {
                                                    "line": 6,
                                                    "column": 9
                                                }
                                            }
                                        },
                                        "static": true,
                                        "start": 84,
                                        "end": 156,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 6
                                            },
                                            "end": {
                                                "line": 6,
                                                "column": 9
                                            }
                                        }
                                    },
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "y",
                                            "start": 172,
                                            "end": 173,
                                            "loc": {
                                                "start": {
                                                    "line": 7,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 7,
                                                    "column": 16
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "AssignmentExpression",
                                                            "left": {
                                                                "type": "MemberExpression",
                                                                "object": {
                                                                    "type": "ThisExpression",
                                                                    "start": 188,
                                                                    "end": 192,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 8,
                                                                            "column": 10
                                                                        },
                                                                        "end": {
                                                                            "line": 8,
                                                                            "column": 14
                                                                        }
                                                                    }
                                                                },
                                                                "computed": false,
                                                                "property": {
                                                                    "type": "PrivateName",
                                                                    "id": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 194,
                                                                        "end": 195,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 8,
                                                                                "column": 16
                                                                            },
                                                                            "end": {
                                                                                "line": 8,
                                                                                "column": 17
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 193,
                                                                    "end": 195,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 8,
                                                                            "column": 15
                                                                        },
                                                                        "end": {
                                                                            "line": 8,
                                                                            "column": 17
                                                                        }
                                                                    }
                                                                },
                                                                "start": 188,
                                                                "end": 195,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 10
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 17
                                                                    }
                                                                }
                                                            },
                                                            "operator": "=",
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 43,
                                                                "start": 198,
                                                                "end": 200,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 20
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 22
                                                                    }
                                                                },
                                                                "raw": "43"
                                                            },
                                                            "start": 188,
                                                            "end": 200,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 8,
                                                                    "column": 10
                                                                },
                                                                "end": {
                                                                    "line": 8,
                                                                    "column": 22
                                                                }
                                                            }
                                                        },
                                                        "start": 188,
                                                        "end": 201,
                                                        "loc": {
                                                            "start": {
                                                                "line": 8,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 8,
                                                                "column": 23
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "ThisExpression",
                                                                "start": 219,
                                                                "end": 223,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 9,
                                                                        "column": 17
                                                                    },
                                                                    "end": {
                                                                        "line": 9,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "PrivateName",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "y",
                                                                    "start": 225,
                                                                    "end": 226,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 9,
                                                                            "column": 23
                                                                        },
                                                                        "end": {
                                                                            "line": 9,
                                                                            "column": 24
                                                                        }
                                                                    }
                                                                },
                                                                "start": 224,
                                                                "end": 226,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 9,
                                                                        "column": 22
                                                                    },
                                                                    "end": {
                                                                        "line": 9,
                                                                        "column": 24
                                                                    }
                                                                }
                                                            },
                                                            "start": 219,
                                                            "end": 226,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 17
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 24
                                                                }
                                                            }
                                                        },
                                                        "start": 212,
                                                        "end": 227,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 25
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 176,
                                                "end": 237,
                                                "loc": {
                                                    "start": {
                                                        "line": 7,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 10,
                                                        "column": 9
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 173,
                                            "end": 237,
                                            "loc": {
                                                "start": {
                                                    "line": 7,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 10,
                                                    "column": 9
                                                }
                                            }
                                        },
                                        "static": true,
                                        "start": 165,
                                        "end": 237,
                                        "loc": {
                                            "start": {
                                                "line": 7,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 10,
                                                "column": 9
                                            }
                                        }
                                    }
                                ],
                                "start": 14,
                                "end": 245,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 11,
                                        "column": 7
                                    }
                                }
                            },
                            "start": 8,
                            "end": 245,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 11,
                                    "column": 7
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
                        "end": 245,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 11,
                                "column": 7
                            }
                        }
                    }
                ],
                "kind": "var",
                "start": 0,
                "end": 245,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 11,
                        "column": 7
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 245,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 11,
                "column": 7
            }
        }
    });

    pass('async static', 'class foo{  static async *m() { return 42; } #x; #y; }', {
        "type": "Program",
        "body": [
            {
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
                    "body": [
                        {
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
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
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
                                        }
                                    ],
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
                                "generator": true,
                                "async": true,
                                "expression": false,
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
            }
        ],
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
    });

    pass('', 'class Hotel { *#evil() { yield notReally(); } }', {
        "type": "Program",
        "body": [
            {
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "Hotel",
                    "start": 6,
                    "end": 11,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 6
                        },
                        "end": {
                            "line": 1,
                            "column": 11
                        }
                    }
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [
                        {
                            "type": "MethodDefinition",
                            "key": {
                                "type": "PrivateProperty",
                                "key": {
                                    "type": "Identifier",
                                    "name": "evil",
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
                                "value": null,
                                "static": false,
                                "start": 15,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            },
                            "kind": "method",
                            "computed": false,
                            "value": {
                                "type": "FunctionExpression",
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "YieldExpression",
                                                "argument": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "Identifier",
                                                        "name": "notReally",
                                                        "start": 31,
                                                        "end": 40,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 31
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 40
                                                            }
                                                        }
                                                    },
                                                    "arguments": [],
                                                    "start": 31,
                                                    "end": 42,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 31
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 42
                                                        }
                                                    }
                                                },
                                                "delegate": false,
                                                "start": 25,
                                                "end": 42,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 25
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 42
                                                    }
                                                }
                                            },
                                            "start": 25,
                                            "end": 43,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 43
                                                }
                                            }
                                        }
                                    ],
                                    "start": 23,
                                    "end": 45,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 45
                                        }
                                    }
                                },
                                "generator": true,
                                "async": false,
                                "expression": false,
                                "start": 20,
                                "end": 45,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 45
                                    }
                                }
                            },
                            "static": false,
                            "start": 14,
                            "end": 45,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 45
                                }
                            }
                        }
                    ],
                    "start": 12,
                    "end": 47,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 12
                        },
                        "end": {
                            "line": 1,
                            "column": 47
                        }
                    }
                },
                "start": 0,
                "end": 47,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 47
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 47,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 47
            }
        }
    });

    pass('private getter and setter', 'class foo { get #bar() { return m1(); } set #zoo(x) { return m2(x); } }', {
        "type": "Program",
        "body": [
            {
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
                    "body": [
                        {
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
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
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
                                        }
                                    ],
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
                                "generator": false,
                                "async": false,
                                "expression": false,
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
                                "id": null,
                                "params": [
                                    {
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
                                    }
                                ],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
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
                                                "arguments": [
                                                    {
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
                                                    }
                                                ],
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
                                        }
                                    ],
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
                                "generator": false,
                                "async": false,
                                "expression": false,
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
            }
        ],
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
    });

    pass('private method with async', 'class Foo { async #evil() { await notReally(); }} ', {
        "type": "Program",
        "body": [
            {
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
                    "body": [
                        {
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
                                "id": null,
                                "params": [],
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
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
                                        }
                                    ],
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
                                "generator": false,
                                "async": true,
                                "expression": false,
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
                        }
                    ],
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
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 50,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 50
            }
        }
    });




    pass('comma separator inline', `class C { x, y; d(){} f(){} }`,  {
        "type": "Program",
        "body": [
            {
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
                    "body": [
                        {
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
                                "id": null,
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
                                "generator": false,
                                "async": false,
                                "expression": false,
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
                                "id": null,
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
                                "generator": false,
                                "async": false,
                                "expression": false,
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
            }
        ],
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
    });

    pass('mixed comma public fields with assign', `class C { p1 = 1, p2 = 2; }`,  {
        "type": "Program",
        "body": [
            {
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
                    "body": [
                        {
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
            }
        ],
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
    });

    pass('mixed comma public fields', `class C { p1, p2; }`,  {
        "type": "Program",
        "body": [
            {
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
                    "body": [
                        {
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
            }
        ],
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
    });
    
    pass('comma separated public', `class C {
          p1, p2;
          p3 = 1, p4 = 1;
          p5 = 1, p6, p7;
        }`,  {
            "type": "Program",
            "body": [
                {
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
                        "body": [
                            {
                                "type": "Identifier",
                                "name": "p1",
                                "start": 20,
                                "end": 22,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 12
                                    }
                                }
                            },
                            {
                                "type": "Identifier",
                                "name": "p2",
                                "start": 24,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 16
                                    }
                                }
                            },
                            {
                                "type": "ClassProperty",
                                "key": {
                                    "type": "Identifier",
                                    "name": "p3",
                                    "start": 38,
                                    "end": 40,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 12
                                        }
                                    }
                                },
                                "value": {
                                    "type": "Literal",
                                    "value": 1,
                                    "start": 43,
                                    "end": 44,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 16
                                        }
                                    },
                                    "raw": "1"
                                },
                                "start": 38,
                                "end": 45,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 17
                                    }
                                }
                            },
                            {
                                "type": "ClassProperty",
                                "key": {
                                    "type": "Identifier",
                                    "name": "p4",
                                    "start": 46,
                                    "end": 48,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 20
                                        }
                                    }
                                },
                                "value": {
                                    "type": "Literal",
                                    "value": 1,
                                    "start": 51,
                                    "end": 52,
                                    "loc": {
                                        "start": {
                                            "line": 3,
                                            "column": 23
                                        },
                                        "end": {
                                            "line": 3,
                                            "column": 24
                                        }
                                    },
                                    "raw": "1"
                                },
                                "start": 46,
                                "end": 52,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 24
                                    }
                                }
                            },
                            {
                                "type": "ClassProperty",
                                "key": {
                                    "type": "Identifier",
                                    "name": "p5",
                                    "start": 64,
                                    "end": 66,
                                    "loc": {
                                        "start": {
                                            "line": 4,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 12
                                        }
                                    }
                                },
                                "value": {
                                    "type": "Literal",
                                    "value": 1,
                                    "start": 69,
                                    "end": 70,
                                    "loc": {
                                        "start": {
                                            "line": 4,
                                            "column": 15
                                        },
                                        "end": {
                                            "line": 4,
                                            "column": 16
                                        }
                                    },
                                    "raw": "1"
                                },
                                "start": 64,
                                "end": 71,
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 17
                                    }
                                }
                            },
                            {
                                "type": "Identifier",
                                "name": "p6",
                                "start": 72,
                                "end": 74,
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 20
                                    }
                                }
                            },
                            {
                                "type": "Identifier",
                                "name": "p7",
                                "start": 76,
                                "end": 78,
                                "loc": {
                                    "start": {
                                        "line": 4,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 4,
                                        "column": 24
                                    }
                                }
                            }
                        ],
                        "start": 8,
                        "end": 89,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 8
                            },
                            "end": {
                                "line": 5,
                                "column": 9
                            }
                        }
                    },
                    "start": 0,
                    "end": 89,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 5,
                            "column": 9
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 89,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 5,
                    "column": 9
                }
            }
        });

    pass('comma separated private fields', `class C { #p1,#p2; #p3 = 1, #p4 = 1; #p5 = 1, #p6, #p7; }`,  {
        "type": "Program",
        "body": [
            {
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
                    "body": [
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "p1",
                                "start": 11,
                                "end": 13,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 11
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 13
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 10,
                            "end": 14,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 10
                                },
                                "end": {
                                    "line": 1,
                                    "column": 14
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "p2",
                                "start": 15,
                                "end": 17,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 17
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 14,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 14
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "p3",
                                "start": 20,
                                "end": 22,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 22
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "start": 25,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 25
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                },
                                "raw": "1"
                            },
                            "static": false,
                            "start": 19,
                            "end": 27,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 19
                                },
                                "end": {
                                    "line": 1,
                                    "column": 27
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "p4",
                                "start": 29,
                                "end": 31,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 31
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "start": 34,
                                "end": 35,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 34
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 35
                                    }
                                },
                                "raw": "1"
                            },
                            "static": false,
                            "start": 28,
                            "end": 35,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 28
                                },
                                "end": {
                                    "line": 1,
                                    "column": 35
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "p5",
                                "start": 38,
                                "end": 40,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 38
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 40
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "start": 43,
                                "end": 44,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 43
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 44
                                    }
                                },
                                "raw": "1"
                            },
                            "static": false,
                            "start": 37,
                            "end": 45,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 37
                                },
                                "end": {
                                    "line": 1,
                                    "column": 45
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "p6",
                                "start": 47,
                                "end": 49,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 47
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 49
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 46,
                            "end": 50,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 46
                                },
                                "end": {
                                    "line": 1,
                                    "column": 50
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "p7",
                                "start": 52,
                                "end": 54,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 52
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 54
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
                            "start": 51,
                            "end": 54,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 51
                                },
                                "end": {
                                    "line": 1,
                                    "column": 54
                                }
                            }
                        }
                    ],
                    "start": 8,
                    "end": 57,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 57
                        }
                    }
                },
                "start": 0,
                "end": 57,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 57
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 57,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 57
            }
        }
    });
    
    pass('inline', `class Foo { static #x, y; }`, {
        "type": "Program",
        "body": [
            {
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
                    "body": [
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 20,
                                "end": 21,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 21
                                    }
                                }
                            },
                            "value": null,
                            "static": true,
                            "start": 19,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 19
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            }
                        },
                        {
                            "type": "Identifier",
                            "name": "y",
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
                            }
                        }
                    ],
                    "start": 10,
                    "end": 27,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 10
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
            }
        ],
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
    });
    
    pass('inline', `class A { #x; #y; }
    
    class B { #x = 0; #y = 1; }`,  {
        "type": "Program",
        "body": [
            {
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "A",
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
                    "body": [
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 11,
                                "end": 12,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 11
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 12
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
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
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "y",
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
                                }
                            },
                            "value": null,
                            "static": false,
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
            },
            {
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "B",
                    "start": 35,
                    "end": 36,
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 10
                        },
                        "end": {
                            "line": 3,
                            "column": 11
                        }
                    }
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 40,
                                "end": 41,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 16
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": 0,
                                "start": 44,
                                "end": 45,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 19
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 20
                                    }
                                },
                                "raw": "0"
                            },
                            "static": false,
                            "start": 39,
                            "end": 45,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 14
                                },
                                "end": {
                                    "line": 3,
                                    "column": 20
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "y",
                                "start": 48,
                                "end": 49,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 24
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "start": 52,
                                "end": 53,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 28
                                    }
                                },
                                "raw": "1"
                            },
                            "static": false,
                            "start": 47,
                            "end": 53,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 22
                                },
                                "end": {
                                    "line": 3,
                                    "column": 28
                                }
                            }
                        }
                    ],
                    "start": 37,
                    "end": 56,
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 12
                        },
                        "end": {
                            "line": 3,
                            "column": 31
                        }
                    }
                },
                "start": 29,
                "end": 56,
                "loc": {
                    "start": {
                        "line": 3,
                        "column": 4
                    },
                    "end": {
                        "line": 3,
                        "column": 31
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 56,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 3,
                "column": 31
            }
        }
    });

    pass('nested', `class A { #x; #y; }
    
    class B { #x = 0; #y = 1; }`, {
        "type": "Program",
        "body": [
            {
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "A",
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
                    "body": [
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 11,
                                "end": 12,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 11
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 12
                                    }
                                }
                            },
                            "value": null,
                            "static": false,
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
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "y",
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
                                }
                            },
                            "value": null,
                            "static": false,
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
            },
            {
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "B",
                    "start": 35,
                    "end": 36,
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 10
                        },
                        "end": {
                            "line": 3,
                            "column": 11
                        }
                    }
                },
                "superClass": null,
                "body": {
                    "type": "ClassBody",
                    "body": [
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 40,
                                "end": 41,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 16
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": 0,
                                "start": 44,
                                "end": 45,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 19
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 20
                                    }
                                },
                                "raw": "0"
                            },
                            "static": false,
                            "start": 39,
                            "end": 45,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 14
                                },
                                "end": {
                                    "line": 3,
                                    "column": 20
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "y",
                                "start": 48,
                                "end": 49,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 23
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 24
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "start": 52,
                                "end": 53,
                                "loc": {
                                    "start": {
                                        "line": 3,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 3,
                                        "column": 28
                                    }
                                },
                                "raw": "1"
                            },
                            "static": false,
                            "start": 47,
                            "end": 53,
                            "loc": {
                                "start": {
                                    "line": 3,
                                    "column": 22
                                },
                                "end": {
                                    "line": 3,
                                    "column": 28
                                }
                            }
                        }
                    ],
                    "start": 37,
                    "end": 56,
                    "loc": {
                        "start": {
                            "line": 3,
                            "column": 12
                        },
                        "end": {
                            "line": 3,
                            "column": 31
                        }
                    }
                },
                "start": 29,
                "end": 56,
                "loc": {
                    "start": {
                        "line": 3,
                        "column": 4
                    },
                    "end": {
                        "line": 3,
                        "column": 31
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 56,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 3,
                "column": 31
            }
        }
    });
        
    pass('static', 'class A { static #x; static #y = 1; }', {
        "type": "Program",
        "body": [
            {
                "type": "ClassDeclaration",
                "id": {
                    "type": "Identifier",
                    "name": "A",
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
                    "body": [
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 18,
                                "end": 19,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 19
                                    }
                                }
                            },
                            "value": null,
                            "static": true,
                            "start": 17,
                            "end": 19,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 17
                                },
                                "end": {
                                    "line": 1,
                                    "column": 19
                                }
                            }
                        },
                        {
                            "type": "PrivateProperty",
                            "key": {
                                "type": "Identifier",
                                "name": "y",
                                "start": 29,
                                "end": 30,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 29
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 30
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": 1,
                                "start": 33,
                                "end": 34,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 33
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 34
                                    }
                                },
                                "raw": "1"
                            },
                            "static": true,
                            "start": 28,
                            "end": 34,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 28
                                },
                                "end": {
                                    "line": 1,
                                    "column": 34
                                }
                            }
                        }
                    ],
                    "start": 8,
                    "end": 37,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 37
                        }
                    }
                },
                "start": 0,
                "end": 37,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 37
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 37,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 37
            }
        }
    });

    pass('method static private names', `var C = class {
        m() { return 42; } static #x; static #y;
      static x() {
          this.#x = 42;
          return this.#x;
        }
        static y() {
          this.#y = 43;
          return this.#y;
        }
      }`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "ClassExpression",
                            "id": null,
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": [
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "m",
                                            "start": 24,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 8
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 9
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "Literal",
                                                            "value": 42,
                                                            "start": 37,
                                                            "end": 39,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 2,
                                                                    "column": 21
                                                                },
                                                                "end": {
                                                                    "line": 2,
                                                                    "column": 23
                                                                }
                                                            },
                                                            "raw": "42"
                                                        },
                                                        "start": 30,
                                                        "end": 40,
                                                        "loc": {
                                                            "start": {
                                                                "line": 2,
                                                                "column": 14
                                                            },
                                                            "end": {
                                                                "line": 2,
                                                                "column": 24
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 28,
                                                "end": 42,
                                                "loc": {
                                                    "start": {
                                                        "line": 2,
                                                        "column": 12
                                                    },
                                                    "end": {
                                                        "line": 2,
                                                        "column": 26
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 25,
                                            "end": 42,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 9
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 26
                                                }
                                            }
                                        },
                                        "static": false,
                                        "start": 24,
                                        "end": 42,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 26
                                            }
                                        }
                                    },
                                    {
                                        "type": "PrivateProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "x",
                                            "start": 51,
                                            "end": 52,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 35
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 36
                                                }
                                            }
                                        },
                                        "value": null,
                                        "static": true,
                                        "start": 50,
                                        "end": 52,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 34
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 36
                                            }
                                        }
                                    },
                                    {
                                        "type": "PrivateProperty",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "y",
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
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "x",
                                            "start": 78,
                                            "end": 79,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 13
                                                },
                                                "end": {
                                                    "line": 3,
                                                    "column": 14
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "AssignmentExpression",
                                                            "left": {
                                                                "type": "MemberExpression",
                                                                "object": {
                                                                    "type": "ThisExpression",
                                                                    "start": 94,
                                                                    "end": 98,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 4,
                                                                            "column": 10
                                                                        },
                                                                        "end": {
                                                                            "line": 4,
                                                                            "column": 14
                                                                        }
                                                                    }
                                                                },
                                                                "computed": false,
                                                                "property": {
                                                                    "type": "PrivateName",
                                                                    "id": {
                                                                        "type": "Identifier",
                                                                        "name": "x",
                                                                        "start": 100,
                                                                        "end": 101,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 4,
                                                                                "column": 16
                                                                            },
                                                                            "end": {
                                                                                "line": 4,
                                                                                "column": 17
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 99,
                                                                    "end": 101,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 4,
                                                                            "column": 15
                                                                        },
                                                                        "end": {
                                                                            "line": 4,
                                                                            "column": 17
                                                                        }
                                                                    }
                                                                },
                                                                "start": 94,
                                                                "end": 101,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 10
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 17
                                                                    }
                                                                }
                                                            },
                                                            "operator": "=",
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 42,
                                                                "start": 104,
                                                                "end": 106,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 20
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 22
                                                                    }
                                                                },
                                                                "raw": "42"
                                                            },
                                                            "start": 94,
                                                            "end": 106,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 4,
                                                                    "column": 10
                                                                },
                                                                "end": {
                                                                    "line": 4,
                                                                    "column": 22
                                                                }
                                                            }
                                                        },
                                                        "start": 94,
                                                        "end": 107,
                                                        "loc": {
                                                            "start": {
                                                                "line": 4,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 4,
                                                                "column": 23
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "ThisExpression",
                                                                "start": 125,
                                                                "end": 129,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 17
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "PrivateName",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
                                                                    "start": 131,
                                                                    "end": 132,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 5,
                                                                            "column": 23
                                                                        },
                                                                        "end": {
                                                                            "line": 5,
                                                                            "column": 24
                                                                        }
                                                                    }
                                                                },
                                                                "start": 130,
                                                                "end": 132,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 5,
                                                                        "column": 22
                                                                    },
                                                                    "end": {
                                                                        "line": 5,
                                                                        "column": 24
                                                                    }
                                                                }
                                                            },
                                                            "start": 125,
                                                            "end": 132,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 5,
                                                                    "column": 17
                                                                },
                                                                "end": {
                                                                    "line": 5,
                                                                    "column": 24
                                                                }
                                                            }
                                                        },
                                                        "start": 118,
                                                        "end": 133,
                                                        "loc": {
                                                            "start": {
                                                                "line": 5,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 5,
                                                                "column": 25
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 82,
                                                "end": 143,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 17
                                                    },
                                                    "end": {
                                                        "line": 6,
                                                        "column": 9
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 79,
                                            "end": 143,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 14
                                                },
                                                "end": {
                                                    "line": 6,
                                                    "column": 9
                                                }
                                            }
                                        },
                                        "static": true,
                                        "start": 71,
                                        "end": 143,
                                        "loc": {
                                            "start": {
                                                "line": 3,
                                                "column": 6
                                            },
                                            "end": {
                                                "line": 6,
                                                "column": 9
                                            }
                                        }
                                    },
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "y",
                                            "start": 159,
                                            "end": 160,
                                            "loc": {
                                                "start": {
                                                    "line": 7,
                                                    "column": 15
                                                },
                                                "end": {
                                                    "line": 7,
                                                    "column": 16
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "AssignmentExpression",
                                                            "left": {
                                                                "type": "MemberExpression",
                                                                "object": {
                                                                    "type": "ThisExpression",
                                                                    "start": 175,
                                                                    "end": 179,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 8,
                                                                            "column": 10
                                                                        },
                                                                        "end": {
                                                                            "line": 8,
                                                                            "column": 14
                                                                        }
                                                                    }
                                                                },
                                                                "computed": false,
                                                                "property": {
                                                                    "type": "PrivateName",
                                                                    "id": {
                                                                        "type": "Identifier",
                                                                        "name": "y",
                                                                        "start": 181,
                                                                        "end": 182,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 8,
                                                                                "column": 16
                                                                            },
                                                                            "end": {
                                                                                "line": 8,
                                                                                "column": 17
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 180,
                                                                    "end": 182,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 8,
                                                                            "column": 15
                                                                        },
                                                                        "end": {
                                                                            "line": 8,
                                                                            "column": 17
                                                                        }
                                                                    }
                                                                },
                                                                "start": 175,
                                                                "end": 182,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 10
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 17
                                                                    }
                                                                }
                                                            },
                                                            "operator": "=",
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 43,
                                                                "start": 185,
                                                                "end": 187,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 8,
                                                                        "column": 20
                                                                    },
                                                                    "end": {
                                                                        "line": 8,
                                                                        "column": 22
                                                                    }
                                                                },
                                                                "raw": "43"
                                                            },
                                                            "start": 175,
                                                            "end": 187,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 8,
                                                                    "column": 10
                                                                },
                                                                "end": {
                                                                    "line": 8,
                                                                    "column": 22
                                                                }
                                                            }
                                                        },
                                                        "start": 175,
                                                        "end": 188,
                                                        "loc": {
                                                            "start": {
                                                                "line": 8,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 8,
                                                                "column": 23
                                                            }
                                                        }
                                                    },
                                                    {
                                                        "type": "ReturnStatement",
                                                        "argument": {
                                                            "type": "MemberExpression",
                                                            "object": {
                                                                "type": "ThisExpression",
                                                                "start": 206,
                                                                "end": 210,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 9,
                                                                        "column": 17
                                                                    },
                                                                    "end": {
                                                                        "line": 9,
                                                                        "column": 21
                                                                    }
                                                                }
                                                            },
                                                            "computed": false,
                                                            "property": {
                                                                "type": "PrivateName",
                                                                "id": {
                                                                    "type": "Identifier",
                                                                    "name": "y",
                                                                    "start": 212,
                                                                    "end": 213,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 9,
                                                                            "column": 23
                                                                        },
                                                                        "end": {
                                                                            "line": 9,
                                                                            "column": 24
                                                                        }
                                                                    }
                                                                },
                                                                "start": 211,
                                                                "end": 213,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 9,
                                                                        "column": 22
                                                                    },
                                                                    "end": {
                                                                        "line": 9,
                                                                        "column": 24
                                                                    }
                                                                }
                                                            },
                                                            "start": 206,
                                                            "end": 213,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 9,
                                                                    "column": 17
                                                                },
                                                                "end": {
                                                                    "line": 9,
                                                                    "column": 24
                                                                }
                                                            }
                                                        },
                                                        "start": 199,
                                                        "end": 214,
                                                        "loc": {
                                                            "start": {
                                                                "line": 9,
                                                                "column": 10
                                                            },
                                                            "end": {
                                                                "line": 9,
                                                                "column": 25
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 163,
                                                "end": 224,
                                                "loc": {
                                                    "start": {
                                                        "line": 7,
                                                        "column": 19
                                                    },
                                                    "end": {
                                                        "line": 10,
                                                        "column": 9
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 160,
                                            "end": 224,
                                            "loc": {
                                                "start": {
                                                    "line": 7,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 10,
                                                    "column": 9
                                                }
                                            }
                                        },
                                        "static": true,
                                        "start": 152,
                                        "end": 224,
                                        "loc": {
                                            "start": {
                                                "line": 7,
                                                "column": 8
                                            },
                                            "end": {
                                                "line": 10,
                                                "column": 9
                                            }
                                        }
                                    }
                                ],
                                "start": 14,
                                "end": 232,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 11,
                                        "column": 7
                                    }
                                }
                            },
                            "start": 8,
                            "end": 232,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 11,
                                    "column": 7
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
                        "end": 232,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 11,
                                "column": 7
                            }
                        }
                    }
                ],
                "kind": "var",
                "start": 0,
                "end": 232,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 11,
                        "column": 7
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 232,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 11,
                "column": 7
            }
        }
    });

    pass('static private name', `var C = class { foo() { #a = 1, b = 2; }; }`, {
        "type": "Program",
        "body": [
            {
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "init": {
                            "type": "ClassExpression",
                            "id": null,
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": [
                                    {
                                        "type": "MethodDefinition",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "foo",
                                            "start": 16,
                                            "end": 19,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 19
                                                }
                                            }
                                        },
                                        "kind": "method",
                                        "computed": false,
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "ExpressionStatement",
                                                        "expression": {
                                                            "type": "SequenceExpression",
                                                            "expressions": [
                                                                {
                                                                    "type": "AssignmentExpression",
                                                                    "left": {
                                                                        "type": "PrivateName",
                                                                        "id": {
                                                                            "type": "Identifier",
                                                                            "name": "a",
                                                                            "start": 25,
                                                                            "end": 26,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 1,
                                                                                    "column": 25
                                                                                },
                                                                                "end": {
                                                                                    "line": 1,
                                                                                    "column": 26
                                                                                }
                                                                            }
                                                                        },
                                                                        "start": 24,
                                                                        "end": 26,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 1,
                                                                                "column": 24
                                                                            },
                                                                            "end": {
                                                                                "line": 1,
                                                                                "column": 26
                                                                            }
                                                                        }
                                                                    },
                                                                    "operator": "=",
                                                                    "right": {
                                                                        "type": "Literal",
                                                                        "value": 1,
                                                                        "start": 29,
                                                                        "end": 30,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 1,
                                                                                "column": 29
                                                                            },
                                                                            "end": {
                                                                                "line": 1,
                                                                                "column": 30
                                                                            }
                                                                        },
                                                                        "raw": "1"
                                                                    },
                                                                    "start": 24,
                                                                    "end": 30,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 24
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 30
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    "type": "AssignmentExpression",
                                                                    "left": {
                                                                        "type": "Identifier",
                                                                        "name": "b",
                                                                        "start": 32,
                                                                        "end": 33,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 1,
                                                                                "column": 32
                                                                            },
                                                                            "end": {
                                                                                "line": 1,
                                                                                "column": 33
                                                                            }
                                                                        }
                                                                    },
                                                                    "operator": "=",
                                                                    "right": {
                                                                        "type": "Literal",
                                                                        "value": 2,
                                                                        "start": 36,
                                                                        "end": 37,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 1,
                                                                                "column": 36
                                                                            },
                                                                            "end": {
                                                                                "line": 1,
                                                                                "column": 37
                                                                            }
                                                                        },
                                                                        "raw": "2"
                                                                    },
                                                                    "start": 32,
                                                                    "end": 37,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 32
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 37
                                                                        }
                                                                    }
                                                                }
                                                            ],
                                                            "start": 24,
                                                            "end": 37,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 24
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 37
                                                                }
                                                            }
                                                        },
                                                        "start": 24,
                                                        "end": 38,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 24
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 38
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 22,
                                                "end": 40,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 22
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 40
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 19,
                                            "end": 40,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 40
                                                }
                                            }
                                        },
                                        "static": false,
                                        "start": 16,
                                        "end": 40,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 40
                                            }
                                        }
                                    }
                                ],
                                "start": 14,
                                "end": 43,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 43
                                    }
                                }
                            },
                            "start": 8,
                            "end": 43,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 8
                                },
                                "end": {
                                    "line": 1,
                                    "column": 43
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
                        "end": 43,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 4
                            },
                            "end": {
                                "line": 1,
                                "column": 43
                            }
                        }
                    }
                ],
                "kind": "var",
                "start": 0,
                "end": 43,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 43
                    }
                }
            }
        ],
        "sourceType": "script",
        "start": 0,
        "end": 43,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 43
            }
        }
    });
});
