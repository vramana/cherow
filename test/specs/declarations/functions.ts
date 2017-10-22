import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Declarations - Functions', () => {

      it('should fail on anonymous function declaration', () => {
          expect(() => {
              parseScript('function () {}');
          }).to.throw();
      });

      it('should fail on eval as func name in strict mode', () => {
        expect(() => {
            parseScript('"use strict"; function eval () {}');
        }).to.throw('');
    });
      
      it('should fail on ""use strict" function eval() {"use strict"; }"', () => {
          expect(() => {
              parseScript('"use strict" function eval() {"use strict"; }');
          }).to.throw();
      });
  
      it('should fail on "function a([], []) {"use strict";}\n', () => {
          expect(() => {
              parseScript('function a([], []) {"use strict";}\n');
          }).to.throw();
      });
  
      it('should fail on ""use strict" function eval() {"use strict"; }"', () => {
          expect(() => {
              parseScript('"use strict" function eval() {"use strict"; }');
          }).to.throw();
      });
  
  
      it('should fail on ""use strict"; function eval() {  }function eval() {  }"', () => {
          expect(() => {
              parseScript('"use strict"; function eval() {  }function eval() {  }');
          }).to.throw();
      });
  
      it('should fail on "function static() { "use strict"; }"', () => {
          expect(() => {
              parseModule('function static() { "use strict"; }');
          }).to.throw();
      });
  
      it('should fail on "function arguments() { "use strict"; }"', () => {
          expect(() => {
              parseModule('function arguments() { "use strict"; }');
          }).to.throw();
      });
  
      it('should fail on anonymous function declaration', () => {
          expect(() => {
              parseScript('"use strict"; function package() {}');
          }).to.throw();
      });
  
      it('should fail on function with keyword', () => {
          expect(() => {
              parseScript('function true() {}');
          }).to.throw();
      });
  
      it('should fail on function with keyword', () => {
          expect(() => {
              parseScript('function if() {}');
          }).to.throw();
      });
  
      it('should fail on nested anonymous function declaration', () => {
          expect(() => {
              parseScript('function foo() { function () {} }');
          }).to.throw();
      });
  
      it('should fail on RestParameter without an initializer "', () => {
          expect(() => {
              parseScript('function f(...x = []) {}');
          }).to.throw();
      });
  
      it('should fail on RestParameter without an initializer "', () => {
          expect(() => {
              parseScript('function f([...x, y]) {}');
          }).to.throw('');
      });
  
      it('should fail on "function foo() { "use strict"; return {yield} }"', () => {
          expect(() => {
              parseScript('function foo() { "use strict"; return {yield} }');
          }).to.throw('');
      });
  
      it('should fail on "function foo({a}) { "use strict"; }"', () => {
          expect(() => {
              parseScript('function foo({a}) { "use strict"; }');
          }).to.throw('');
      });
  
      it('should fail if FormalParameters contains any duplicate element', () => {
          expect(() => {
              parseScript('(function f(x = 0, x) {}');
          }).to.throw('');
      });
  
      it('should fail if `yield` token is interpreted as an IdentifierReference within a generator', () => {
          expect(() => {
              parseScript(`"use strict"; function *g() {
                  0, function(x = yield) {
                    paramValue = x;
                  };
                }`);
          }).to.throw('');
      });
  
      it('should fail if `yield` token is interpreted as an IdentifierReference within a generator', () => {
          expect(() => {
              parseScript(`var gen = function *g() {
                  var yi\\u0065ld;
                };`);
          }).to.throw('');
      });
  
      it('should fail if a FunctionDeclaration has two identical parameters', () => {
          expect(() => {
              parseScript('0, function*(x = yield) {};');
          }).to.throw('');
      });
  
      it('should fail if a FunctionDeclaration has two identical parameters', () => {
          expect(() => {
              parseScript('"use strict"; function _13_1_5_fun(param, param) { }');
          }).to.throw();
      });
  
      it('should fail if any Identifier value occurs more than once within a FormalParameterList', () => {
          expect(() => {
              parseScript('"use strict"; var _13_1_9_fun = function (param1, param2, param1) { };');
            }).to.throw();
      });
  
      it('should fail if a FunctionDeclaration has two identical parameters', () => {
          expect(() => {
              parseScript('"use strict"; function _13_1_5_fun(param, param) { }');
            }).to.throw();
      });
  
      it('should fail on "class A extends yield B { }"', () => {
          expect(() => {
              parseScript('"use strict"; function foo() { eval = 42; };');
          }).to.throw();
      });
  
      it('should fail on "function __func(){\A\B\C};"', () => {
          expect(() => {
              parseScript('function __func(){\\A\\B\\C};');
          }).to.throw('');
      });
  
      it('should fail on "function __func(){\a\b\c};"', () => {
          expect(() => {
              parseScript('function __func(){\\a\\b\\c};');
          }).to.throw('');
      });
  
      it('should fail if function name is "eval" in module code only"', () => {
          expect(() => {
              parseModule('function eval() {  }');
          }).to.throw('');
      });
  
      it('should fail if function name is "arguments" in strict mode"', () => {
          expect(() => {
              parseScript('"use strict"; function arguments() {  }');
          }).to.throw('');
      });
  
      it('should fail on duplicate params', () => {
          expect(() => {
              parseScript(`"use strict"; function foo(bar, bar) {}`);
            }).to.throw();
      });
  
      it('should fail on yield as function name in strict mode', () => {
          expect(() => {
              parseScript(`"use strict"; function yield() {}`);
          }).to.throw('');
      });
  
      it('should fail on yield as function name in strict mode', () => {
          expect(() => {
              parseScript(`a: function* a(){}`);
          }).to.throw('');
      });

      it('should fail on duplicate binding in param list for func expr in func decl body (strict mode)', () => {
        expect(() => {
            parseScript(`"use strict"; function foo() {  const bar = function (abc, abc) {}  }`);
        }).to.throw('');
      });

      it('should fail on duplicate binding in param list for func expr in func decl body (strict mode)', () => {
        expect(() => {
            parseScript(`function foo(abc, abc ) {  "use strict"; const bar = function (abc, def) {}  }`);
        }).to.not.throw('');
      });

      it('should fail on duplicate binding in param list for func expr in func decl body (module code)', () => {
        expect(() => {
            parseModule(`function foo() {  const bar = function (abc, abc) {}  }`);
        }).to.throw('');
      });

      it('should parse binding in param list for func expr in func decl body', () => {
        expect(parseScript(`function foo(abc, abc ) {  "use strict"; const bar = function (abc, def) {}  }`, {
            ranges: true,
            locations: true,
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [
                        {
                            "type": "Identifier",
                            "name": "abc",
                            "start": 13,
                            "end": 16,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 13
                                },
                                "end": {
                                    "line": 1,
                                    "column": 16
                                }
                            }
                        },
                        {
                            "type": "Identifier",
                            "name": "abc",
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
                            }
                        }
                    ],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "Literal",
                                    "value": "use strict",
                                    "start": 27,
                                    "end": 39,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 39
                                        }
                                    }
                                },
                                "start": 27,
                                "end": 40,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 40
                                    }
                                }
                            },
                            {
                                "type": "VariableDeclaration",
                                "declarations": [
                                    {
                                        "type": "VariableDeclarator",
                                        "init": {
                                            "type": "FunctionExpression",
                                            "params": [
                                                {
                                                    "type": "Identifier",
                                                    "name": "abc",
                                                    "start": 63,
                                                    "end": 66,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 63
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 66
                                                        }
                                                    }
                                                },
                                                {
                                                    "type": "Identifier",
                                                    "name": "def",
                                                    "start": 68,
                                                    "end": 71,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 68
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 71
                                                        }
                                                    }
                                                }
                                            ],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 73,
                                                "end": 75,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 73
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 75
                                                    }
                                                }
                                            },
                                            "async": false,
                                            "generator": false,
                                            "expression": false,
                                            "id": null,
                                            "start": 53,
                                            "end": 75,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 53
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 75
                                                }
                                            }
                                        },
                                        "id": {
                                            "type": "Identifier",
                                            "name": "bar",
                                            "start": 47,
                                            "end": 50,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 47
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 50
                                                }
                                            }
                                        },
                                        "start": 47,
                                        "end": 75,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 47
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 75
                                            }
                                        }
                                    }
                                ],
                                "kind": "const",
                                "start": 41,
                                "end": 75,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 41
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 75
                                    }
                                }
                            }
                        ],
                        "start": 24,
                        "end": 78,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 24
                            },
                            "end": {
                                "line": 1,
                                "column": 78
                            }
                        }
                    },
                    "async": false,
                    "generator": false,
                    "expression": false,
                    "id": {
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
                    "start": 0,
                    "end": 78,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 78
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 78,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 78
                }
            }
        });
      });

      it('should parse binding in param list for func expr in func decl body', () => {
        expect(parseModule(`function foo() {  const bar = function (abc, def) {}    }`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "FunctionDeclaration",
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
                },
                "id": {
                  "type": "Identifier",
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
                  },
                  "name": "foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 15,
                  "end": 57,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 1,
                      "column": 57
                    }
                  },
                  "body": [
                    {
                      "type": "VariableDeclaration",
                      "start": 18,
                      "end": 52,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 52
                        }
                      },
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 24,
                          "end": 52,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 24
                            },
                            "end": {
                              "line": 1,
                              "column": 52
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 24,
                            "end": 27,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 24
                              },
                              "end": {
                                "line": 1,
                                "column": 27
                              }
                            },
                            "name": "bar"
                          },
                          "init": {
                            "type": "FunctionExpression",
                            "start": 30,
                            "end": 52,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 30
                              },
                              "end": {
                                "line": 1,
                                "column": 52
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "Identifier",
                                "start": 40,
                                "end": 43,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 40
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 43
                                  }
                                },
                                "name": "abc"
                              },
                              {
                                "type": "Identifier",
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
                                },
                                "name": "def"
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 50,
                              "end": 52,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 50
                                },
                                "end": {
                                  "line": 1,
                                  "column": 52
                                }
                              },
                              "body": []
                            }
                          }
                        }
                      ],
                      "kind": "const"
                    }
                  ]
                }
              }
            ],
            "sourceType": "module"
          });
    });

    it('should parse two function decl on top-level with same name', () => {
          expect(parseScript(`function a() {}`, {
              ranges: true,
              locations: true,
              raw: true
          })).to.eql({
              "type": "Program",
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
              },
              "body": [{
                  "type": "FunctionDeclaration",
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
                  },
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 10,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 10
                          }
                      },
                      "name": "a"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 15,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 15
                          }
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse two function decl on top-level with same name', () => {
          expect(parseScript(`function foo(a) { "use strict"; }`, {
              ranges: true,
              locations: true,
              raw: true
          })).to.eql({
              "type": "Program",
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
              },
              "body": [{
                  "type": "FunctionDeclaration",
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
                  },
                  "id": {
                      "type": "Identifier",
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
                      },
                      "name": "foo"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "Identifier",
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
                      },
                      "name": "a"
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "start": 16,
                      "end": 33,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 16
                          },
                          "end": {
                              "line": 1,
                              "column": 33
                          }
                      },
                      "body": [{
                          "type": "ExpressionStatement",
                          "start": 18,
                          "end": 31,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 18
                              },
                              "end": {
                                  "line": 1,
                                  "column": 31
                              }
                          },
                          "expression": {
                              "type": "Literal",
                              "start": 18,
                              "end": 30,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 30
                                  }
                              },
                              "value": "use strict",
                              "raw": "\"use strict\""
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse function decl with numeric literal and "use strict" directive prologue', () => {
          expect(parseScript(`function test() {'use strict'; 0O0; }`, {
              ranges: true,
              locations: false,
              raw: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 37,
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 37,
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 13,
                      "name": "test"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 16,
                      "end": 37,
                      "body": [{
                              "type": "ExpressionStatement",
                              "start": 17,
                              "end": 30,
                              "expression": {
                                  "type": "Literal",
                                  "start": 17,
                                  "end": 29,
                                  "value": "use strict",
                                  "raw": "'use strict'"
                              }
                          },
                          {
                              "type": "ExpressionStatement",
                              "start": 31,
                              "end": 35,
                              "expression": {
                                  "type": "Literal",
                                  "start": 31,
                                  "end": 34,
                                  "value": 0,
                                  "raw": "0O0"
                              }
                          }
                      ]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse two function decl on top-level with same name', () => {
          expect(parseScript(`function a() {}
          function a() {}`, {
              ranges: true,
              locations: true,
              raw: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 41,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 25
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
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
                },
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 15,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 15
                    }
                  },
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 26,
                "end": 41,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 10
                  },
                  "end": {
                    "line": 2,
                    "column": 25
                  }
                },
                "id": {
                  "type": "Identifier",
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
                  },
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 39,
                  "end": 41,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 23
                    },
                    "end": {
                      "line": 2,
                      "column": 25
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
      });
  
      it('should parse one function decl on top-level with two nested func decl with same name', () => {
          expect(parseScript(`function a() {
              function a() {}
              function a() {}
              }`, {
              ranges: true,
              locations: true,
              raw: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 90,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 15
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 90,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 15
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 90,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 4,
                      "column": 15
                    }
                  },
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 29,
                      "end": 44,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 14
                        },
                        "end": {
                          "line": 2,
                          "column": 29
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 38,
                        "end": 39,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 23
                          },
                          "end": {
                            "line": 2,
                            "column": 24
                          }
                        },
                        "name": "a"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 42,
                        "end": 44,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 27
                          },
                          "end": {
                            "line": 2,
                            "column": 29
                          }
                        },
                        "body": []
                      }
                    },
                    {
                      "type": "FunctionDeclaration",
                      "start": 59,
                      "end": 74,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 14
                        },
                        "end": {
                          "line": 3,
                          "column": 29
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 68,
                        "end": 69,
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
                        "name": "a"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 72,
                        "end": 74,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 27
                          },
                          "end": {
                            "line": 3,
                            "column": 29
                          }
                        },
                        "body": []
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
      });
  
      it('should parse yield as function name in sloppy mode', () => {
          expect(parseScript(`function yield() {}`, {
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 19,
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 19,
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 14,
                      "name": "yield"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 17,
                      "end": 19,
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse yield as function expression name wrapped in a function declaration  in sloppy mode', () => {
          expect(parseScript(`function* fn() {
                (function yield() {});
              }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 71,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 15
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 71,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 15
                  }
                },
                "id": {
                  "type": "Identifier",
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
                  },
                  "name": "fn"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 15,
                  "end": 71,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 3,
                      "column": 15
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 33,
                      "end": 55,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 16
                        },
                        "end": {
                          "line": 2,
                          "column": 38
                        }
                      },
                      "expression": {
                        "type": "FunctionExpression",
                        "start": 34,
                        "end": 53,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 17
                          },
                          "end": {
                            "line": 2,
                            "column": 36
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 43,
                          "end": 48,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 26
                            },
                            "end": {
                              "line": 2,
                              "column": 31
                            }
                          },
                          "name": "yield"
                        },
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 51,
                          "end": 53,
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
                          "body": []
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
      });
  
      it('should parse yield unary as function name in sloppy mode', () => {
          expect(parseScript(`function fn() { function yield() {} }`, {
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 37,
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 37,
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 11,
                      "name": "fn"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 14,
                      "end": 37,
                      "body": [{
                          "type": "FunctionDeclaration",
                          "start": 16,
                          "end": 35,
                          "id": {
                              "type": "Identifier",
                              "start": 25,
                              "end": 30,
                              "name": "yield"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "start": 33,
                              "end": 35,
                              "body": []
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse yield unary as function name in sloppy mode', () => {
          expect(parseScript(`function* fn() {
                () => yield;
                () => { yield };
              }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 94,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 15
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 94,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 15
                  }
                },
                "id": {
                  "type": "Identifier",
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
                  },
                  "name": "fn"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 15,
                  "end": 94,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 4,
                      "column": 15
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 33,
                      "end": 45,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 16
                        },
                        "end": {
                          "line": 2,
                          "column": 28
                        }
                      },
                      "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 33,
                        "end": 44,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 16
                          },
                          "end": {
                            "line": 2,
                            "column": 27
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "Identifier",
                          "start": 39,
                          "end": 44,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 22
                            },
                            "end": {
                              "line": 2,
                              "column": 27
                            }
                          },
                          "name": "yield"
                        }
                      }
                    },
                    {
                      "type": "ExpressionStatement",
                      "start": 62,
                      "end": 78,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 16
                        },
                        "end": {
                          "line": 3,
                          "column": 32
                        }
                      },
                      "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 62,
                        "end": 77,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 16
                          },
                          "end": {
                            "line": 3,
                            "column": 31
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 68,
                          "end": 77,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 22
                            },
                            "end": {
                              "line": 3,
                              "column": 31
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 70,
                              "end": 75,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 24
                                },
                                "end": {
                                  "line": 3,
                                  "column": 29
                                }
                              },
                              "expression": {
                                "type": "Identifier",
                                "start": 70,
                                "end": 75,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 24
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 29
                                  }
                                },
                                "name": "yield"
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
      });
  
      it('should parse yield unary as function name in sloppy mode', () => {
          expect(parseScript(`+function yield() {}`, {
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 20,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 20,
                  "expression": {
                      "type": "UnaryExpression",
                      "start": 0,
                      "end": 20,
                      "operator": "+",
                      "prefix": true,
                      "argument": {
                          "type": "FunctionExpression",
                          "start": 1,
                          "end": 20,
                          "id": {
                              "type": "Identifier",
                              "start": 10,
                              "end": 15,
                              "name": "yield"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "start": 18,
                              "end": 20,
                              "body": []
                          }
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function eval() {"use strict"; }"', () => {
          expect(parseScript(`function Foo(x = new.target) {}
          function Bar() { (x = new.target) => {} }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 83,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 2,
                "column": 51
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 31
                  }
                },
                "id": {
                  "type": "Identifier",
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
                  },
                  "name": "Foo"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 13,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "left": {
                      "type": "Identifier",
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
                      },
                      "name": "x"
                    },
                    "right": {
                      "type": "MetaProperty",
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
                      },
                      "meta": {
                        "type": "Identifier",
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
                        },
                        "name": "new"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 21,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 21
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "name": "target"
                      }
                    }
                  }
                ],
                "body": {
                  "type": "BlockStatement",
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
                  },
                  "body": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 42,
                "end": 83,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 10
                  },
                  "end": {
                    "line": 2,
                    "column": 51
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 51,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 19
                    },
                    "end": {
                      "line": 2,
                      "column": 22
                    }
                  },
                  "name": "Bar"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 57,
                  "end": 83,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 25
                    },
                    "end": {
                      "line": 2,
                      "column": 51
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 59,
                      "end": 81,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 27
                        },
                        "end": {
                          "line": 2,
                          "column": 49
                        }
                      },
                      "expression": {
                        "type": "ArrowFunctionExpression",
                        "start": 59,
                        "end": 81,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 27
                          },
                          "end": {
                            "line": 2,
                            "column": 49
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "AssignmentPattern",
                            "start": 60,
                            "end": 74,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 28
                              },
                              "end": {
                                "line": 2,
                                "column": 42
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 60,
                              "end": 61,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 28
                                },
                                "end": {
                                  "line": 2,
                                  "column": 29
                                }
                              },
                              "name": "x"
                            },
                            "right": {
                              "type": "MetaProperty",
                              "start": 64,
                              "end": 74,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 32
                                },
                                "end": {
                                  "line": 2,
                                  "column": 42
                                }
                              },
                              "meta": {
                                "type": "Identifier",
                                "start": 64,
                                "end": 67,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 32
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 35
                                  }
                                },
                                "name": "new"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 68,
                                "end": 74,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 36
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 42
                                  }
                                },
                                "name": "target"
                              }
                            }
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
                          "start": 79,
                          "end": 81,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 47
                            },
                            "end": {
                              "line": 2,
                              "column": 49
                            }
                          },
                          "body": []
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
      });
  
      it('should parse "function eval() {"use strict"; }"', () => {
          expect(parseScript(`function eval() {"use strict"; }`, {
              ranges: false
          })).to.eql({
              "body": [{
                  "async": false,
                  "body": {
                      "body": [{
                          "expression": {
                              "type": "Literal",
                              "value": "use strict"
                          },
                          "type": "ExpressionStatement"
                      }],
                      "type": "BlockStatement"
                  },
                  "expression": false,
                  "generator": false,
                  "id": {
                      "name": "eval",
                      "type": "Identifier"
                  },
                  "params": [],
                  "type": "FunctionDeclaration"
              }],
              "sourceType": "script",
              "type": "Program"
          });
      });
  
      it('should parse "function static() {"use strict"; }"', () => {
          expect(parseScript(`function static() {"use strict"; }`, {
              ranges: false
          })).to.eql({
              "body": [{
                  "async": false,
                  "body": {
                      "body": [{
                          "expression": {
                              "type": "Literal",
                              "value": "use strict"
                          },
                          "type": "ExpressionStatement"
                      }],
                      "type": "BlockStatement"
                  },
                  "expression": false,
                  "generator": false,
                  "id": {
                      "name": "static",
                      "type": "Identifier"
                  },
                  "params": [],
                  "type": "FunctionDeclaration"
              }],
              "sourceType": "script",
              "type": "Program"
          });
      });
  
  
  
      it('should parse "function ref(a, b,) { }"', () => {
          expect(parseScript(`function ref(a, b,) { }`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "ref"
                  },
                  "params": [{
                          "type": "Identifier",
                          "name": "a"
                      },
                      {
                          "type": "Identifier",
                          "name": "b"
                      }
                  ],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function ref(a,) { }"', () => {
          expect(parseScript(`function ref(a,) { }`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "ref"
                  },
                  "params": [{
                      "type": "Identifier",
                      "name": "a"
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function f([...[,]] = g()) { }"', () => {
          expect(parseScript(`function f([...[,]] = g()) {}`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "AssignmentPattern",
                      "left": {
                          "type": "ArrayPattern",
                          "elements": [{
                              "type": "RestElement",
                              "argument": {
                                  "type": "ArrayPattern",
                                  "elements": [
                                      null
                                  ]
                              }
                          }]
                      },
                      "right": {
                          "type": "CallExpression",
                          "callee": {
                              "type": "Identifier",
                              "name": "g"
                          },
                          "arguments": []
                      }
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function* g() {  yield; };"', () => {
          expect(parseScript(`    function* g() {  yield; };`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                      "type": "FunctionDeclaration",
                      "id": {
                          "type": "Identifier",
                          "name": "g"
                      },
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "body": [{
                              "type": "ExpressionStatement",
                              "expression": {
                                  "type": "YieldExpression",
                                  "argument": null,
                                  "delegate": false
                              }
                          }]
                      },
                      "generator": true,
                      "expression": false,
                      "async": false
                  },
                  {
                      "type": "EmptyStatement"
                  }
              ],
              "sourceType": "script"
          });
      });
  
      it('should parse "function f([, ...x]) {}"', () => {
          expect(parseScript(`function f([, ...x]) {}`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "ArrayPattern",
                      "elements": [
                          null,
                          {
                              "type": "RestElement",
                              "argument": {
                                  "type": "Identifier",
                                  "name": "x"
                              }
                          }
                      ]
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function f([...[...x]]) {}"', () => {
          expect(parseScript(`function f([...[...x]]) { }`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "ArrayPattern",
                      "elements": [{
                          "type": "RestElement",
                          "argument": {
                              "type": "ArrayPattern",
                              "elements": [{
                                  "type": "RestElement",
                                  "argument": {
                                      "type": "Identifier",
                                      "name": "x"
                                  }
                              }]
                          }
                      }]
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function f([...[]]) { }"', () => {
          expect(parseScript(`function f([...[]]) { }`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "ArrayPattern",
                      "elements": [{
                          "type": "RestElement",
                          "argument": {
                              "type": "ArrayPattern",
                              "elements": []
                          }
                      }]
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function f([...[,]]) {}"', () => {
          expect(parseScript(`function f([...[,]]) { }`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "ArrayPattern",
                      "elements": [{
                          "type": "RestElement",
                          "argument": {
                              "type": "ArrayPattern",
                              "elements": [
                                  null
                              ]
                          }
                      }]
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function f([...[x, y, z]]) { }"', () => {
          expect(parseScript(`function f([...[x, y, z]]) {}`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "ArrayPattern",
                      "elements": [{
                          "type": "RestElement",
                          "argument": {
                              "type": "ArrayPattern",
                              "elements": [{
                                      "type": "Identifier",
                                      "name": "x"
                                  },
                                  {
                                      "type": "Identifier",
                                      "name": "y"
                                  },
                                  {
                                      "type": "Identifier",
                                      "name": "z"
                                  }
                              ]
                          }
                      }]
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function f([]) {}"', () => {
          expect(parseScript(`function f([]) { }`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "ArrayPattern",
                      "elements": []
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function f([x = 23]) {}"', () => {
          expect(parseScript(`function f([x = 23]) {}`, {
              ranges: false,
              raw: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "ArrayPattern",
                      "elements": [{
                          "type": "AssignmentPattern",
                          "left": {
                              "type": "Identifier",
                              "name": "x"
                          },
                          "right": {
                              "type": "Literal",
                              "value": 23,
                              "raw": "23"
                          }
                      }]
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function f([[...x] = values]) {}"', () => {
          expect(parseScript(`function f([[...x] = values]) { }`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "ArrayPattern",
                      "elements": [{
                          "type": "AssignmentPattern",
                          "left": {
                              "type": "ArrayPattern",
                              "elements": [{
                                  "type": "RestElement",
                                  "argument": {
                                      "type": "Identifier",
                                      "name": "x"
                                  }
                              }]
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "values"
                          }
                      }]
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function f([[] = function() { }()]) {}"', () => {
          expect(parseScript(`function f([[] = function() { }()]) {}`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "ArrayPattern",
                      "elements": [{
                          "type": "AssignmentPattern",
                          "left": {
                              "type": "ArrayPattern",
                              "elements": []
                          },
                          "right": {
                              "type": "CallExpression",
                              "callee": {
                                  "type": "FunctionExpression",
                                  "id": null,
                                  "params": [],
                                  "body": {
                                      "type": "BlockStatement",
                                      "body": []
                                  },
                                  "generator": false,
                                  "expression": false,
                                  "async": false
                              },
                              "arguments": []
                          }
                      }]
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function f([[,] = g()]) {}"', () => {
          expect(parseScript(`function f([[,] = g()]) {}`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "ArrayPattern",
                      "elements": [{
                          "type": "AssignmentPattern",
                          "left": {
                              "type": "ArrayPattern",
                              "elements": [
                                  null
                              ]
                          },
                          "right": {
                              "type": "CallExpression",
                              "callee": {
                                  "type": "Identifier",
                                  "name": "g"
                              },
                              "arguments": []
                          }
                      }]
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function ref(a, b = 39,) {}"', () => {
          expect(parseScript(`function ref(a, b = 39,) { }`, {
              ranges: false,
              raw: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "ref"
                  },
                  "params": [{
                          "type": "Identifier",
                          "name": "a"
                      },
                      {
                          "type": "AssignmentPattern",
                          "left": {
                              "type": "Identifier",
                              "name": "b"
                          },
                          "right": {
                              "type": "Literal",
                              "value": 39,
                              "raw": "39"
                          }
                      }
                  ],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function ref(x, y = x, z = y) {}"', () => {
          expect(parseScript(`function ref(x, y = x, z = y) { }`, {
              ranges: false
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "ref"
                  },
                  "params": [{
                          "type": "Identifier",
                          "name": "x"
                      },
                      {
                          "type": "AssignmentPattern",
                          "left": {
                              "type": "Identifier",
                              "name": "y"
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "x"
                          }
                      },
                      {
                          "type": "AssignmentPattern",
                          "left": {
                              "type": "Identifier",
                              "name": "z"
                          },
                          "right": {
                              "type": "Identifier",
                              "name": "y"
                          }
                      }
                  ],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": false,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function __func(){ x = true; }"', () => {
          expect(parseScript(`function __func(){ x = true; }`, {
              ranges: true
          })).to.eql({
              "body": [{
                  "async": false,
                  "body": {
                      "body": [{
                          "end": 28,
                          "expression": {
                              "end": 27,
                              "left": {
                                  "end": 20,
                                  "name": "x",
                                  "start": 19,
                                  "type": "Identifier"
                              },
                              "operator": "=",
                              "right": {
                                  "end": 27,
                                  "start": 23,
                                  "type": "Literal",
                                  "value": true
                              },
                              "start": 19,
                              "type": "AssignmentExpression"
                          },
                          "start": 19,
                          "type": "ExpressionStatement"
                      }],
                      "end": 30,
                      "start": 17,
                      "type": "BlockStatement"
                  },
                  "end": 30,
                  "expression": false,
                  "generator": false,
                  "id": {
                      "end": 15,
                      "name": "__func",
                      "start": 9,
                      "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
              }],
              "end": 30,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse "function func(){return "id_string";}"', () => {
          expect(parseScript(`function func(){return "id_string";}`, {
              ranges: true
          })).to.eql({
              "body": [{
                  "async": false,
                  "body": {
                      "body": [{
                          "argument": {
                              "end": 34,
                              "start": 23,
                              "type": "Literal",
                              "value": "id_string"
                          },
                          "end": 35,
                          "start": 16,
                          "type": "ReturnStatement"
                      }],
                      "end": 36,
                      "start": 15,
                      "type": "BlockStatement"
                  },
                  "end": 36,
                  "expression": false,
                  "generator": false,
                  "id": {
                      "end": 13,
                      "name": "func",
                      "start": 9,
                      "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
              }],
              "end": 36,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse "function __func(){ x = true; }"', () => {
          expect(parseScript(`function __func(arguments){
              return arguments;
              
          };`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 87,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 12
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 86,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 11
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 15,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 15
                    }
                  },
                  "name": "__func"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 16,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 16
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "name": "arguments"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 26,
                  "end": 86,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 26
                    },
                    "end": {
                      "line": 4,
                      "column": 11
                    }
                  },
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 42,
                      "end": 59,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 14
                        },
                        "end": {
                          "line": 2,
                          "column": 31
                        }
                      },
                      "argument": {
                        "type": "Identifier",
                        "start": 49,
                        "end": 58,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 21
                          },
                          "end": {
                            "line": 2,
                            "column": 30
                          }
                        },
                        "name": "arguments"
                      }
                    }
                  ]
                }
              },
              {
                "type": "EmptyStatement",
                "start": 86,
                "end": 87,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 11
                  },
                  "end": {
                    "line": 4,
                    "column": 12
                  }
                }
              }
            ],
            "sourceType": "script"
          });
      });
  
      it('should parse "function __func(){ x = true; }"', () => {
          expect(parseScript(`function
          x
          (
          )
          {
          }
          ;
          
          x();
          
          function                                                    y                                   (                                          )                                              {};
          
          y();
          
          function
          
          z
          
          (
          
          )
          
          {
              
          }
          
          ;
          
          z();`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 541,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 29,
                "column": 14
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 68,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 6,
                    "column": 11
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 19,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 10
                    },
                    "end": {
                      "line": 2,
                      "column": 11
                    }
                  },
                  "name": "x"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 55,
                  "end": 68,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 10
                    },
                    "end": {
                      "line": 6,
                      "column": 11
                    }
                  },
                  "body": []
                }
              },
              {
                "type": "EmptyStatement",
                "start": 79,
                "end": 80,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 10
                  },
                  "end": {
                    "line": 7,
                    "column": 11
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 102,
                "end": 106,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 10
                  },
                  "end": {
                    "line": 9,
                    "column": 14
                  }
                },
                "expression": {
                  "type": "CallExpression",
                  "start": 102,
                  "end": 105,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 10
                    },
                    "end": {
                      "line": 9,
                      "column": 13
                    }
                  },
                  "callee": {
                    "type": "Identifier",
                    "start": 102,
                    "end": 103,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 10
                      },
                      "end": {
                        "line": 9,
                        "column": 11
                      }
                    },
                    "name": "x"
                  },
                  "arguments": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 128,
                "end": 316,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 10
                  },
                  "end": {
                    "line": 11,
                    "column": 198
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 188,
                  "end": 189,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 70
                    },
                    "end": {
                      "line": 11,
                      "column": 71
                    }
                  },
                  "name": "y"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 314,
                  "end": 316,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 196
                    },
                    "end": {
                      "line": 11,
                      "column": 198
                    }
                  },
                  "body": []
                }
              },
              {
                "type": "EmptyStatement",
                "start": 316,
                "end": 317,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 198
                  },
                  "end": {
                    "line": 11,
                    "column": 199
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 339,
                "end": 343,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 10
                  },
                  "end": {
                    "line": 13,
                    "column": 14
                  }
                },
                "expression": {
                  "type": "CallExpression",
                  "start": 339,
                  "end": 342,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 10
                    },
                    "end": {
                      "line": 13,
                      "column": 13
                    }
                  },
                  "callee": {
                    "type": "Identifier",
                    "start": 339,
                    "end": 340,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 10
                      },
                      "end": {
                        "line": 13,
                        "column": 11
                      }
                    },
                    "name": "y"
                  },
                  "arguments": []
                }
              },
              {
                "type": "FunctionDeclaration",
                "start": 365,
                "end": 492,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 10
                  },
                  "end": {
                    "line": 25,
                    "column": 11
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 395,
                  "end": 396,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 10
                    },
                    "end": {
                      "line": 17,
                      "column": 11
                    }
                  },
                  "name": "z"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 464,
                  "end": 492,
                  "loc": {
                    "start": {
                      "line": 23,
                      "column": 10
                    },
                    "end": {
                      "line": 25,
                      "column": 11
                    }
                  },
                  "body": []
                }
              },
              {
                "type": "EmptyStatement",
                "start": 514,
                "end": 515,
                "loc": {
                  "start": {
                    "line": 27,
                    "column": 10
                  },
                  "end": {
                    "line": 27,
                    "column": 11
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 537,
                "end": 541,
                "loc": {
                  "start": {
                    "line": 29,
                    "column": 10
                  },
                  "end": {
                    "line": 29,
                    "column": 14
                  }
                },
                "expression": {
                  "type": "CallExpression",
                  "start": 537,
                  "end": 540,
                  "loc": {
                    "start": {
                      "line": 29,
                      "column": 10
                    },
                    "end": {
                      "line": 29,
                      "column": 13
                    }
                  },
                  "callee": {
                    "type": "Identifier",
                    "start": 537,
                    "end": 538,
                    "loc": {
                      "start": {
                        "line": 29,
                        "column": 10
                      },
                      "end": {
                        "line": 29,
                        "column": 11
                      }
                    },
                    "name": "z"
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
      });
  
      it('should parse "function* bar() { yield class {} }"', () => {
          expect(parseScript(`function* bar() { yield class {} }`, {
              ranges: false,
              raw: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "bar"
                  },
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [{
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "YieldExpression",
                              "argument": {
                                  "type": "ClassExpression",
                                  "id": null,
                                  "superClass": null,
                                  "body": {
                                      "type": "ClassBody",
                                      "body": []
                                  }
                              },
                              "delegate": false
                          }
                      }]
                  },
                  "generator": true,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
  
      it('should parse parameter default inside arrow', () => {
          expect(parseScript(`(x = yield) => {}`, {
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 17,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 17,
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 17,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [{
                          "type": "AssignmentPattern",
                          "start": 1,
                          "end": 10,
                          "left": {
                              "type": "Identifier",
                              "start": 1,
                              "end": 2,
                              "name": "x"
                          },
                          "right": {
                              "type": "Identifier",
                              "start": 5,
                              "end": 10,
                              "name": "yield"
                          }
                      }],
                      "body": {
                          "type": "BlockStatement",
                          "start": 15,
                          "end": 17,
                          "body": []
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse yield unary as function name in sloppy mode', () => {
          expect(parseScript(`function* fn() {
                function fn2(x = yield) {}
              }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 75,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 15
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 75,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 15
                  }
                },
                "id": {
                  "type": "Identifier",
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
                  },
                  "name": "fn"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 15,
                  "end": 75,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 3,
                      "column": 15
                    }
                  },
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 33,
                      "end": 59,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 16
                        },
                        "end": {
                          "line": 2,
                          "column": 42
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 42,
                        "end": 45,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 25
                          },
                          "end": {
                            "line": 2,
                            "column": 28
                          }
                        },
                        "name": "fn2"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
                          "start": 46,
                          "end": 55,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 29
                            },
                            "end": {
                              "line": 2,
                              "column": 38
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 46,
                            "end": 47,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 29
                              },
                              "end": {
                                "line": 2,
                                "column": 30
                              }
                            },
                            "name": "x"
                          },
                          "right": {
                            "type": "Identifier",
                            "start": 50,
                            "end": 55,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 33
                              },
                              "end": {
                                "line": 2,
                                "column": 38
                              }
                            },
                            "name": "yield"
                          }
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 57,
                        "end": 59,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 40
                          },
                          "end": {
                            "line": 2,
                            "column": 42
                          }
                        },
                        "body": []
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
      });
  
      it('should parse parameter default inside function', () => {
          expect(parseScript(`function fn(x = yield) {} `, {
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 26,
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 25,
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 11,
                      "name": "fn"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "AssignmentPattern",
                      "start": 12,
                      "end": 21,
                      "left": {
                          "type": "Identifier",
                          "start": 12,
                          "end": 13,
                          "name": "x"
                      },
                      "right": {
                          "type": "Identifier",
                          "start": 16,
                          "end": 21,
                          "name": "yield"
                      }
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "start": 23,
                      "end": 25,
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse yield unary as function name in sloppy mode', () => {
          expect(parseScript(`yield => {};`, {
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 12,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 12,
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 11,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [{
                          "type": "Identifier",
                          "start": 0,
                          "end": 5,
                          "name": "yield"
                      }],
                      "body": {
                          "type": "BlockStatement",
                          "start": 9,
                          "end": 11,
                          "body": []
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse parameter name arrow', () => {
          expect(parseScript(`(yield) => {}`, {
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 13,
              "body": [{
                  "type": "ExpressionStatement",
                  "start": 0,
                  "end": 13,
                  "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 13,
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [{
                          "type": "Identifier",
                          "start": 1,
                          "end": 6,
                          "name": "yield"
                      }],
                      "body": {
                          "type": "BlockStatement",
                          "start": 11,
                          "end": 13,
                          "body": []
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse parameter name function', () => {
          expect(parseScript(`function fn(yield) {}`, {
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 21,
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 21,
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 11,
                      "name": "fn"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "Identifier",
                      "start": 12,
                      "end": 17,
                      "name": "yield"
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "start": 19,
                      "end": 21,
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse yield star parameter default inside function', () => {
          expect(parseScript(`function fn(x = yield* yield) {}`, {
              ranges: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 32,
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 32,
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 11,
                      "name": "fn"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "AssignmentPattern",
                      "start": 12,
                      "end": 28,
                      "left": {
                          "type": "Identifier",
                          "start": 12,
                          "end": 13,
                          "name": "x"
                      },
                      "right": {
                          "type": "BinaryExpression",
                          "start": 16,
                          "end": 28,
                          "left": {
                              "type": "Identifier",
                              "start": 16,
                              "end": 21,
                              "name": "yield"
                          },
                          "operator": "*",
                          "right": {
                              "type": "Identifier",
                              "start": 23,
                              "end": 28,
                              "name": "yield"
                          }
                      }
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "start": 30,
                      "end": 32,
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });

      
      it('should parse function returning conditional', () => {
        expect(parseScript(`function Qd() {
            return a ?  a in a : b
         }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 61,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 10
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 61,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 10
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 11,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 11
                    }
                  },
                  "name": "Qd"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 14,
                  "end": 61,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 3,
                      "column": 10
                    }
                  },
                  "body": [
                    {
                      "type": "ReturnStatement",
                      "start": 28,
                      "end": 50,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 2,
                          "column": 34
                        }
                      },
                      "argument": {
                        "type": "ConditionalExpression",
                        "start": 35,
                        "end": 50,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 19
                          },
                          "end": {
                            "line": 2,
                            "column": 34
                          }
                        },
                        "test": {
                          "type": "Identifier",
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
                          },
                          "name": "a"
                        },
                        "consequent": {
                          "type": "BinaryExpression",
                          "start": 40,
                          "end": 46,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 24
                            },
                            "end": {
                              "line": 2,
                              "column": 30
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 40,
                            "end": 41,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 24
                              },
                              "end": {
                                "line": 2,
                                "column": 25
                              }
                            },
                            "name": "a"
                          },
                          "operator": "in",
                          "right": {
                            "type": "Identifier",
                            "start": 45,
                            "end": 46,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 29
                              },
                              "end": {
                                "line": 2,
                                "column": 30
                              }
                            },
                            "name": "a"
                          }
                        },
                        "alternate": {
                          "type": "Identifier",
                          "start": 49,
                          "end": 50,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 33
                            },
                            "end": {
                              "line": 2,
                              "column": 34
                            }
                          },
                          "name": "b"
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });
  
      it('should parse function decl wrapped around function expr with retun statement', () => {
          expect(parseScript(`function a() {
            b =function () { return c }
            return d;
          }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 88,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 11
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 88,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 4,
                    "column": 11
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 9,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "name": "a"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 13,
                  "end": 88,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 4,
                      "column": 11
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 27,
                      "end": 54,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 12
                        },
                        "end": {
                          "line": 2,
                          "column": 39
                        }
                      },
                      "expression": {
                        "type": "AssignmentExpression",
                        "start": 27,
                        "end": 54,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 12
                          },
                          "end": {
                            "line": 2,
                            "column": 39
                          }
                        },
                        "operator": "=",
                        "left": {
                          "type": "Identifier",
                          "start": 27,
                          "end": 28,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 12
                            },
                            "end": {
                              "line": 2,
                              "column": 13
                            }
                          },
                          "name": "b"
                        },
                        "right": {
                          "type": "FunctionExpression",
                          "start": 30,
                          "end": 54,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 15
                            },
                            "end": {
                              "line": 2,
                              "column": 39
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 42,
                            "end": 54,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 27
                              },
                              "end": {
                                "line": 2,
                                "column": 39
                              }
                            },
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 44,
                                "end": 52,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 29
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 37
                                  }
                                },
                                "argument": {
                                  "type": "Identifier",
                                  "start": 51,
                                  "end": 52,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 36
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 37
                                    }
                                  },
                                  "name": "c"
                                }
                              }
                            ]
                          }
                        }
                      }
                    },
                    {
                      "type": "ReturnStatement",
                      "start": 67,
                      "end": 76,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 12
                        },
                        "end": {
                          "line": 3,
                          "column": 21
                        }
                      },
                      "argument": {
                        "type": "Identifier",
                        "start": 74,
                        "end": 75,
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
                        "name": "d"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
      });
  
      it('should parse "function eval() { }"', () => {
          expect(parseScript(`function eval() { }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
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
              },
              "body": [{
                  "type": "FunctionDeclaration",
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
                  },
                  "id": {
                      "type": "Identifier",
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
                      },
                      "name": "eval"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
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
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function test(t, t) { }"', () => {
          expect(parseScript(`function test(t, t) { }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 23,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 23
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 23,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 23
                      }
                  },
                  "id": {
                      "type": "Identifier",
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
                      },
                      "name": "test"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [{
                          "type": "Identifier",
                          "start": 14,
                          "end": 15,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 14
                              },
                              "end": {
                                  "line": 1,
                                  "column": 15
                              }
                          },
                          "name": "t"
                      },
                      {
                          "type": "Identifier",
                          "start": 17,
                          "end": 18,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 17
                              },
                              "end": {
                                  "line": 1,
                                  "column": 18
                              }
                          },
                          "name": "t"
                      }
                  ],
                  "body": {
                      "type": "BlockStatement",
                      "start": 20,
                      "end": 23,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 20
                          },
                          "end": {
                              "line": 1,
                              "column": 23
                          }
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function eval() { function inner() { "use strict" } }"', () => {
          expect(parseScript(`function eval() { function inner() { "use strict" } }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 53,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 53
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 53,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 53
                      }
                  },
                  "id": {
                      "type": "Identifier",
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
                      },
                      "name": "eval"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 16,
                      "end": 53,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 16
                          },
                          "end": {
                              "line": 1,
                              "column": 53
                          }
                      },
                      "body": [{
                          "type": "FunctionDeclaration",
                          "start": 18,
                          "end": 51,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 18
                              },
                              "end": {
                                  "line": 1,
                                  "column": 51
                              }
                          },
                          "id": {
                              "type": "Identifier",
                              "start": 27,
                              "end": 32,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 27
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 32
                                  }
                              },
                              "name": "inner"
                          },
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "start": 35,
                              "end": 51,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 35
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 51
                                  }
                              },
                              "body": [{
                                  "type": "ExpressionStatement",
                                  "start": 37,
                                  "end": 49,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 37
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 49
                                      }
                                  },
                                  "expression": {
                                      "type": "Literal",
                                      "start": 37,
                                      "end": 49,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 37
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 49
                                          }
                                      },
                                      "value": "use strict",
                                      "raw": "\"use strict\""
                                  }
                              }]
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });

      it('should parse "function hello(a) { z(); }"', () => {
          expect(parseScript(`function hello(a) { z(); }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 26,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 26
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 26,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 26
                      }
                  },
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      },
                      "name": "hello"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "Identifier",
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
                      "name": "a"
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "start": 18,
                      "end": 26,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 18
                          },
                          "end": {
                              "line": 1,
                              "column": 26
                          }
                      },
                      "body": [{
                          "type": "ExpressionStatement",
                          "start": 20,
                          "end": 24,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 20
                              },
                              "end": {
                                  "line": 1,
                                  "column": 24
                              }
                          },
                          "expression": {
                              "type": "CallExpression",
                              "start": 20,
                              "end": 23,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 20
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 23
                                  }
                              },
                              "callee": {
                                  "type": "Identifier",
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
                                  },
                                  "name": "z"
                              },
                              "arguments": []
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function hello(a, b) { z(); }"', () => {
          expect(parseScript(`function hello(a, b) { z(); }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
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
              },
              "body": [{
                  "type": "FunctionDeclaration",
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
                  },
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      },
                      "name": "hello"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [{
                          "type": "Identifier",
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
                          "name": "a"
                      },
                      {
                          "type": "Identifier",
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
                          },
                          "name": "b"
                      }
                  ],
                  "body": {
                      "type": "BlockStatement",
                      "start": 21,
                      "end": 29,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 21
                          },
                          "end": {
                              "line": 1,
                              "column": 29
                          }
                      },
                      "body": [{
                          "type": "ExpressionStatement",
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
                          },
                          "expression": {
                              "type": "CallExpression",
                              "start": 23,
                              "end": 26,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 23
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 26
                                  }
                              },
                              "callee": {
                                  "type": "Identifier",
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
                                  "name": "z"
                              },
                              "arguments": []
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function a(...b) { }"', () => {
          expect(parseScript(`function a(...b) { }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 20,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 20
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 20,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 20
                      }
                  },
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 10,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 10
                          }
                      },
                      "name": "a"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "RestElement",
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
                      },
                      "argument": {
                          "type": "Identifier",
                          "start": 14,
                          "end": 15,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 14
                              },
                              "end": {
                                  "line": 1,
                                  "column": 15
                              }
                          },
                          "name": "b"
                      }
                  }],
                  "body": {
                      "type": "BlockStatement",
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
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function a(...[]) { }"', () => {
          expect(parseScript(`function a(...[]) { }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "params": [{
                      "type": "RestElement",
                      "argument": {
                          "type": "ArrayPattern",
                          "elements": [],
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
                      },
                      "start": 11,
                      "end": 16,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 11
                          },
                          "end": {
                              "line": 1,
                              "column": 16
                          }
                      }
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": [],
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
                      }
                  },
                  "async": false,
                  "generator": false,
                  "expression": false,
                  "id": {
                      "type": "Identifier",
                      "name": "a",
                      "start": 9,
                      "end": 10,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 10
                          }
                      }
                  },
                  "start": 0,
                  "end": 21,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 21
                      }
                  }
              }],
              "sourceType": "script",
              "start": 0,
              "end": 21,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 21
                  }
              }
          });
      });
  
      it('should parse "function universe(__proto__) { }"', () => {
          expect(parseScript(`function universe(__proto__) { }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 32,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 32
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 32,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 32
                      }
                  },
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 17,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 17
                          }
                      },
                      "name": "universe"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "Identifier",
                      "start": 18,
                      "end": 27,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 18
                          },
                          "end": {
                              "line": 1,
                              "column": 27
                          }
                      },
                      "name": "__proto__"
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "start": 29,
                      "end": 32,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 29
                          },
                          "end": {
                              "line": 1,
                              "column": 32
                          }
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function eval() { }"', () => {
          expect(parseScript(`function test() { "use strict"\n + 0; }`, {
              ranges: true,
          })).to.eql({
              "body": [{
                  "async": false,
                  "body": {
                      "body": [{
                          "end": 36,
                          "expression": {
                              "end": 35,
                              "left": {
                                  "end": 30,
                                  "start": 18,
                                  "type": "Literal",
                                  "value": "use strict",
                              },
                              "operator": "+",
                              "right": {
                                  "end": 35,
                                  "start": 34,
                                  "type": "Literal",
                                  "value": 0,
                              },
                              "start": 18,
                              "type": "BinaryExpression",
                          },
                          "start": 18,
                          "type": "ExpressionStatement"
                      }, ],
                      "end": 38,
                      "start": 16,
                      "type": "BlockStatement",
                  },
                  "end": 38,
                  "expression": false,
                  "generator": false,
                  "id": {
                      "end": 13,
                      "name": "test",
                      "start": 9,
                      "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration",
              }, ],
              "end": 38,
              "sourceType": "script",
              "start": 0,
              "type": "Program",
          });
      });
  
      it('should parse "function a() {} function a() {}"', () => {
          expect(parseScript(`function a() {} function a() {}`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 31,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 31
                  }
              },
              "body": [{
                      "type": "FunctionDeclaration",
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
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 9,
                          "end": 10,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 9
                              },
                              "end": {
                                  "line": 1,
                                  "column": 10
                              }
                          },
                          "name": "a"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "start": 13,
                          "end": 15,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 13
                              },
                              "end": {
                                  "line": 1,
                                  "column": 15
                              }
                          },
                          "body": []
                      }
                  },
                  {
                      "type": "FunctionDeclaration",
                      "start": 16,
                      "end": 31,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 16
                          },
                          "end": {
                              "line": 1,
                              "column": 31
                          }
                      },
                      "id": {
                          "type": "Identifier",
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
                          "name": "a"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
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
                          },
                          "body": []
                      }
                  }
              ],
              "sourceType": "script"
          });
      });
  
      it('should parse "function a() { function a() {} function a() {} }"', () => {
          expect(parseScript(`function a() { function a() {} function a() {} }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "start": 0,
              "end": 48,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 48
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 48,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 48
                      }
                  },
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 10,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 10
                          }
                      },
                      "name": "a"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 48,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 48
                          }
                      },
                      "body": [{
                              "type": "FunctionDeclaration",
                              "start": 15,
                              "end": 30,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 30
                                  }
                              },
                              "id": {
                                  "type": "Identifier",
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
                                  },
                                  "name": "a"
                              },
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                  "type": "BlockStatement",
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
                                  },
                                  "body": []
                              }
                          },
                          {
                              "type": "FunctionDeclaration",
                              "start": 31,
                              "end": 46,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 31
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 46
                                  }
                              },
                              "id": {
                                  "type": "Identifier",
                                  "start": 40,
                                  "end": 41,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 40
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 41
                                      }
                                  },
                                  "name": "a"
                              },
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                  "type": "BlockStatement",
                                  "start": 44,
                                  "end": 46,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 44
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 46
                                      }
                                  },
                                  "body": []
                              }
                          }
                      ]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse binding as specified via property name and identifier', () => {
          expect(parseScript(`function yield(){ "use strict"; }\n`, {})).to.eql({
              "body": [{
                  "async": false,
                  "body": {
                      "body": [{
                          "expression": {
                              "type": "Literal",
                              "value": "use strict",
                          },
                          "type": "ExpressionStatement"
                      }],
                      "type": "BlockStatement"
                  },
                  "expression": false,
                  "generator": false,
                  "id": {
                      "name": "yield",
                      "type": "Identifier",
                  },
                  "params": [],
                  "type": "FunctionDeclaration"
              }],
              "sourceType": "script",
              "type": "Program"
          });
      });
  
      it('should parse binding as specified via property name and identifier', () => {
          expect(parseScript(`(function arguments() {'use strict'; })()`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "CallExpression",
                      "callee": {
                          "type": "FunctionExpression",
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "body": [{
                                  "type": "ExpressionStatement",
                                  "expression": {
                                      "type": "Literal",
                                      "value": "use strict",
                                      "start": 23,
                                      "end": 35,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 23
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 35
                                          }
                                      },
                                      "raw": "'use strict'"
                                  },
                                  "start": 23,
                                  "end": 36,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 23
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 36
                                      }
                                  }
                              }],
                              "start": 22,
                              "end": 38,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 22
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 38
                                  }
                              }
                          },
                          "async": false,
                          "generator": false,
                          "expression": false,
                          "id": {
                              "type": "Identifier",
                              "name": "arguments",
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
                          "start": 1,
                          "end": 38,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 1
                              },
                              "end": {
                                  "line": 1,
                                  "column": 38
                              }
                          }
                      },
                      "arguments": [],
                      "start": 0,
                      "end": 41,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 41
                          }
                      }
                  },
                  "start": 0,
                  "end": 41,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 41
                      }
                  }
              }],
              "sourceType": "script",
              "start": 0,
              "end": 41,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 41
                  }
              }
          });
      });
  
      it('should parse "(function package() {"use strict"; })()"', () => {
          expect(parseScript(`(function package() {'use strict'; })()`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "CallExpression",
                      "callee": {
                          "type": "FunctionExpression",
                          "params": [],
                          "body": {
                              "type": "BlockStatement",
                              "body": [{
                                  "type": "ExpressionStatement",
                                  "expression": {
                                      "type": "Literal",
                                      "value": "use strict",
                                      "start": 21,
                                      "end": 33,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 21
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 33
                                          }
                                      },
                                      "raw": "'use strict'"
                                  },
                                  "start": 21,
                                  "end": 34,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 21
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 34
                                      }
                                  }
                              }],
                              "start": 20,
                              "end": 36,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 20
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 36
                                  }
                              }
                          },
                          "async": false,
                          "generator": false,
                          "expression": false,
                          "id": {
                              "type": "Identifier",
                              "name": "package",
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
                          "start": 1,
                          "end": 36,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 1
                              },
                              "end": {
                                  "line": 1,
                                  "column": 36
                              }
                          }
                      },
                      "arguments": [],
                      "start": 0,
                      "end": 39,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 39
                          }
                      }
                  },
                  "start": 0,
                  "end": 39,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 39
                      }
                  }
              }],
              "sourceType": "script",
              "start": 0,
              "end": 39,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 39
                  }
              }
          });
      });
  
      it('should parse binding as specified via property name and identifier', () => {
          expect(parseScript(`function static() {"use strict"; }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [{
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "Literal",
                              "value": "use strict",
                              "start": 19,
                              "end": 31,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 19
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 31
                                  }
                              },
                              "raw": "\"use strict\""
                          },
                          "start": 19,
                          "end": 32,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 19
                              },
                              "end": {
                                  "line": 1,
                                  "column": 32
                              }
                          }
                      }],
                      "start": 18,
                      "end": 34,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 18
                          },
                          "end": {
                              "line": 1,
                              "column": 34
                          }
                      }
                  },
                  "async": false,
                  "generator": false,
                  "expression": false,
                  "id": {
                      "type": "Identifier",
                      "name": "static",
                      "start": 9,
                      "end": 15,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 15
                          }
                      }
                  },
                  "start": 0,
                  "end": 34,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 34
                      }
                  }
              }],
              "sourceType": "script",
              "start": 0,
              "end": 34,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 34
                  }
              }
          });
      });
  
      it('should parse binding as specified via property name and identifier', () => {
          expect(parseScript(`function x(...{ a }){}`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "params": [{
                      "type": "RestElement",
                      "argument": {
                          "type": "ObjectPattern",
                          "properties": [{
                              "type": "Property",
                              "kind": "init",
                              "key": {
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
                              },
                              "computed": false,
                              "value": {
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
                              },
                              "method": false,
                              "shorthand": true,
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
                          }],
                          "start": 11,
                          "end": 19,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 11
                              },
                              "end": {
                                  "line": 1,
                                  "column": 19
                              }
                          }
                      },
                      "start": 11,
                      "end": 19,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 11
                          },
                          "end": {
                              "line": 1,
                              "column": 19
                          }
                      }
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "body": [],
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
                  "async": false,
                  "generator": false,
                  "expression": false,
                  "id": {
                      "type": "Identifier",
                      "name": "x",
                      "start": 9,
                      "end": 10,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 10
                          }
                      }
                  },
                  "start": 0,
                  "end": 22,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 22
                      }
                  }
              }],
              "sourceType": "script",
              "start": 0,
              "end": 22,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 22
                  }
              }
          });
      });
  
      it('should parse binding as specified via property name and identifier', () => {
          expect(parseScript(`function eval() {"use strict"; }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [{
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "Literal",
                              "value": "use strict",
                              "start": 17,
                              "end": 29,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 17
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 29
                                  }
                              },
                              "raw": "\"use strict\""
                          },
                          "start": 17,
                          "end": 30,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 17
                              },
                              "end": {
                                  "line": 1,
                                  "column": 30
                              }
                          }
                      }],
                      "start": 16,
                      "end": 32,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 16
                          },
                          "end": {
                              "line": 1,
                              "column": 32
                          }
                      }
                  },
                  "async": false,
                  "generator": false,
                  "expression": false,
                  "id": {
                      "type": "Identifier",
                      "name": "eval",
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
                  "end": 32,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 32
                      }
                  }
              }],
              "sourceType": "script",
              "start": 0,
              "end": 32,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 32
                  }
              }
          });
      });
  });