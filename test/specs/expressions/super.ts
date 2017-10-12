import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Super', () => {

            it(`should fail on "!{ a() { !function* (a = super.b()){} } };"`, () => {
                expect(() => {
                    parseScript(`class a extends b { c() { function* d(c = super.e()){} } }`);
                }).to.not.throw();
            });

            it(`should fail on "!{ a() { !function* (a = super.b()){} } };"`, () => {
                expect(() => {
                    parseScript(`!{ a() { !function* (a = super.b()){} } };`);
                }).to.not.throw();
            });

            it(`should fail on "class a extends b { c() { !function* (c = super.d()){} } }"`, () => {
                expect(() => {
                    parseScript(`class a extends b { c() { !function* (c = super.d()){} } }`);
                }).to.not.throw();
            });

            it(`should fail on "function* a(b){ super.c }"`, () => {
                expect(() => {
                    parseScript(`function* a(b){ super.c }`);
                }).to.throw();
            });

            it(`should fail on "!function* (a){ super.b }"`, () => {
                expect(() => {
                    parseScript(`!function* (a){ super.b }`);
                }).to.throw();
            });

            it(`should fail on "{ a() { function* b(){ super.c(); } } };"`, () => {
                expect(() => {
                    parseScript(`{ a() { function* b(){ super.c(); } } };`);
                }).to.throw();
            });

            it(`should fail on "!{ a() { !function* (){ super.b(); } } };"`, () => {
                expect(() => {
                    parseScript(`!{ a() { !function* (){ super.b(); } } };`);
                }).to.not.throw();
            });

            it(`should fail on "class a extends b { c() { function* d(){ super.e(); } } }"`, () => {
                expect(() => {
                    parseScript(`class a extends b { c() { function* d(){ super.e(); } } }`);
                }).to.not.throw();
            });

            it(`should fail on "class a extends b { c() { !function* (){ super.d(); } } }"`, () => {
                expect(() => {
                    parseScript(`class a extends b { c() { !function* (){ super.d(); } } }`);
                }).to.not.throw();
            });

            it('should fail on "class A extends B { *g1() { return super() } }}"', () => {
                expect(() => {
                    parseScript(`class A extends B { *g1() { return super() } }`);
                }).to.throw();
            });

            it('should fail on "class A extends B { *g1() { return super() } }}"', () => {
                expect(() => {
                    parseScript(`function wrap() { function* foo(a = super(), b = super.foo()) { } }`);
                }).to.throw();
            });

            it('should fail on "class A extends B { *g1() { return super() } }}"', () => {
                expect(() => {
                    parseScript(`class A static foo() { super() } }`);
                }).to.throw();
            });

            it('should fail on "function foo() {super() super.foo()"', () => {
                expect(() => {
                    parseScript(`function foo() {super() super.foo()`);
                }).to.throw();
            });

            it('should fail on "var foo = function() { super()  super.foo() }"', () => {
                expect(() => {
                    parseScript(`var foo = function() { super()  super.foo() }`);
                }).to.throw();
            });

            it('should fail on "function wrap() { function foo(a = super(), b = super.foo()) {}}"', () => {
                expect(() => {
                    parseScript(`function wrap() { function foo(a = super(), b = super.foo()) {}}`);
                }).to.throw();
            });

            it('should fail on invalid lone super', () => {
                expect(() => {
                    parseScript('class A extends B { constructor() { (super).a(); } }')
                }).to.throw()
            });

            it('should fail on invalid lone super', () => {
                expect(() => {
                    parseScript('function f() { (super)() }')
                }).to.throw()
            });

            it('should fail on "class A extends B { constructor() { super; } }"', () => {
                expect(() => {
                    parseScript('class A extends B { constructor() { super; } }')
                }).to.throw()
            });

            it('should fail on "class A extends B { constructor() { (super)(); } }"', () => {
                expect(() => {
                    parseScript('class A extends B { constructor() { (super)(); } }')
                }).to.throw()
            });

            it('should fail on "class A extends B { constructor() { new super(); } }"', () => {
                expect(() => {
                    parseScript('class A extends B { constructor() { new super(); } }')
                }).to.not.throw()
            });

            it('should fail on invalid super', () => {
                expect(() => {
                    parseScript('({ a() { (super).b(); } });')
                }).to.throw()
            });

            
            it('should fail on invalid super', () => {
                expect(() => {
                    parseScript('({ a() { (super).b(); } });')
                }).to.throw()
            });

            
            it('should fail on "class C { m() { new super(); }  }"', () => {
                expect(() => {
                    parseScript('class C { m() { new super(); }  }')
                }).to.throw()
            });

            
            it('should fail on invalid super', () => {
                expect(() => {
                    parseScript('({ a() { (super).b(); } });')
                }).to.throw()
            });

            it('should fail on nested function super', () => {
                expect(() => {
                    parseScript(`class C {
                        superM() {
                          return (function() {
                            return super.m();
                          })();
                        }
                        superX2() {
                          return (function() {
                            return (function() {
                              return super.x;
                            })();
                          })();
                        }
                        constructor() {
                          (function() { super(); })();
                        }
                      }`)
                }).to.throw()
            });

            it('should parse value of reference returned by SuperProperty', () => {
                expect(parseScript(`class A {
                constructor() {
                  bar = (() => { return super['fromA']; })();
                }
            }`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
  "type": "Program",
  "start": 0,
  "end": 135,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 5,
      "column": 13
    }
  },
  "body": [
    {
      "type": "ClassDeclaration",
      "start": 0,
      "end": 135,
      "loc": {
        "start": {
          "line": 1,
          "column": 0
        },
        "end": {
          "line": 5,
          "column": 13
        }
      },
      "id": {
        "type": "Identifier",
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
        },
        "name": "A"
      },
      "superClass": null,
      "body": {
        "type": "ClassBody",
        "start": 8,
        "end": 135,
        "loc": {
          "start": {
            "line": 1,
            "column": 8
          },
          "end": {
            "line": 5,
            "column": 13
          }
        },
        "body": [
          {
            "type": "MethodDefinition",
            "start": 26,
            "end": 121,
            "loc": {
              "start": {
                "line": 2,
                "column": 16
              },
              "end": {
                "line": 4,
                "column": 17
              }
            },
            "computed": false,
            "key": {
              "type": "Identifier",
              "start": 26,
              "end": 37,
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
              "name": "constructor"
            },
            "static": false,
            "kind": "constructor",
            "value": {
              "type": "FunctionExpression",
              "start": 37,
              "end": 121,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 27
                },
                "end": {
                  "line": 4,
                  "column": 17
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 40,
                "end": 121,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 30
                  },
                  "end": {
                    "line": 4,
                    "column": 17
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 60,
                    "end": 103,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 18
                      },
                      "end": {
                        "line": 3,
                        "column": 61
                      }
                    },
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 60,
                      "end": 102,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 18
                        },
                        "end": {
                          "line": 3,
                          "column": 60
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 60,
                        "end": 63,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 18
                          },
                          "end": {
                            "line": 3,
                            "column": 21
                          }
                        },
                        "name": "bar"
                      },
                      "right": {
                        "type": "CallExpression",
                        "start": 66,
                        "end": 102,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 24
                          },
                          "end": {
                            "line": 3,
                            "column": 60
                          }
                        },
                        "callee": {
                          "type": "ArrowFunctionExpression",
                          "start": 67,
                          "end": 99,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 25
                            },
                            "end": {
                              "line": 3,
                              "column": 57
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [],
                          "body": {
                            "type": "BlockStatement",
                            "start": 73,
                            "end": 99,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 31
                              },
                              "end": {
                                "line": 3,
                                "column": 57
                              }
                            },
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 75,
                                "end": 97,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 33
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 55
                                  }
                                },
                                "argument": {
                                  "type": "MemberExpression",
                                  "start": 82,
                                  "end": 96,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 40
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 54
                                    }
                                  },
                                  "object": {
                                    "type": "Super",
                                    "start": 82,
                                    "end": 87,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 40
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 45
                                      }
                                    }
                                  },
                                  "property": {
                                    "type": "Literal",
                                    "start": 88,
                                    "end": 95,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 46
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 53
                                      }
                                    },
                                    "value": "fromA",
                                    "raw": "'fromA'"
                                  },
                                  "computed": true
                                }
                              }
                            ]
                          }
                        },
                        "arguments": []
                      }
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


            it('should parse right shift between boolean and null', () => {
                expect(parseScript(`class A extends B {
                    constructor() {
                        () => super()
                    }
                }`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 133,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 5,
                        "column": 17
                      }
                    },
                    "body": [
                      {
                        "type": "ClassDeclaration",
                        "start": 0,
                        "end": 133,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 5,
                            "column": 17
                          }
                        },
                        "id": {
                          "type": "Identifier",
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
                          },
                          "name": "A"
                        },
                        "superClass": {
                          "type": "Identifier",
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
                          },
                          "name": "B"
                        },
                        "body": {
                          "type": "ClassBody",
                          "start": 18,
                          "end": 133,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 5,
                              "column": 17
                            }
                          },
                          "body": [
                            {
                              "type": "MethodDefinition",
                              "start": 40,
                              "end": 115,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 20
                                },
                                "end": {
                                  "line": 4,
                                  "column": 21
                                }
                              },
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 40,
                                "end": 51,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 31
                                  }
                                },
                                "name": "constructor"
                              },
                              "static": false,
                              "kind": "constructor",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 51,
                                "end": 115,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 31
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 21
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 54,
                                  "end": 115,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 34
                                    },
                                    "end": {
                                      "line": 4,
                                      "column": 21
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 80,
                                      "end": 93,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 24
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 37
                                        }
                                      },
                                      "expression": {
                                        "type": "ArrowFunctionExpression",
                                        "start": 80,
                                        "end": 93,
                                        "loc": {
                                          "start": {
                                            "line": 3,
                                            "column": 24
                                          },
                                          "end": {
                                            "line": 3,
                                            "column": 37
                                          }
                                        },
                                        "id": null,
                                        "generator": false,
                                        "expression": true,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                          "type": "CallExpression",
                                          "start": 86,
                                          "end": 93,
                                          "loc": {
                                            "start": {
                                              "line": 3,
                                              "column": 30
                                            },
                                            "end": {
                                              "line": 3,
                                              "column": 37
                                            }
                                          },
                                          "callee": {
                                            "type": "Super",
                                            "start": 86,
                                            "end": 91,
                                            "loc": {
                                              "start": {
                                                "line": 3,
                                                "column": 30
                                              },
                                              "end": {
                                                "line": 3,
                                                "column": 35
                                              }
                                            }
                                          },
                                          "arguments": []
                                        }
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
        
            it('should parse constructor super', () => {
                expect(parseScript(`class A extends B {
                    constructor() {
                        super();
                    }
                }`, {
                    ranges: true,
                    raw: true,
                    locations: true 
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 128,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 5,
                        "column": 17
                      }
                    },
                    "body": [
                      {
                        "type": "ClassDeclaration",
                        "start": 0,
                        "end": 128,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 5,
                            "column": 17
                          }
                        },
                        "id": {
                          "type": "Identifier",
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
                          },
                          "name": "A"
                        },
                        "superClass": {
                          "type": "Identifier",
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
                          },
                          "name": "B"
                        },
                        "body": {
                          "type": "ClassBody",
                          "start": 18,
                          "end": 128,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 5,
                              "column": 17
                            }
                          },
                          "body": [
                            {
                              "type": "MethodDefinition",
                              "start": 40,
                              "end": 110,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 20
                                },
                                "end": {
                                  "line": 4,
                                  "column": 21
                                }
                              },
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 40,
                                "end": 51,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 31
                                  }
                                },
                                "name": "constructor"
                              },
                              "static": false,
                              "kind": "constructor",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 51,
                                "end": 110,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 31
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 21
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 54,
                                  "end": 110,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 34
                                    },
                                    "end": {
                                      "line": 4,
                                      "column": 21
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 80,
                                      "end": 88,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 24
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 32
                                        }
                                      },
                                      "expression": {
                                        "type": "CallExpression",
                                        "start": 80,
                                        "end": 87,
                                        "loc": {
                                          "start": {
                                            "line": 3,
                                            "column": 24
                                          },
                                          "end": {
                                            "line": 3,
                                            "column": 31
                                          }
                                        },
                                        "callee": {
                                          "type": "Super",
                                          "start": 80,
                                          "end": 85,
                                          "loc": {
                                            "start": {
                                              "line": 3,
                                              "column": 24
                                            },
                                            "end": {
                                              "line": 3,
                                              "column": 29
                                            }
                                          }
                                        },
                                        "arguments": []
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
        
            it('should parse super computed', () => {
                expect(parseScript(`class A extends B {
                    X() {
                        return super[1]
                    }
                }`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 125,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 5,
                        "column": 17
                      }
                    },
                    "body": [
                      {
                        "type": "ClassDeclaration",
                        "start": 0,
                        "end": 125,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 5,
                            "column": 17
                          }
                        },
                        "id": {
                          "type": "Identifier",
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
                          },
                          "name": "A"
                        },
                        "superClass": {
                          "type": "Identifier",
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
                          },
                          "name": "B"
                        },
                        "body": {
                          "type": "ClassBody",
                          "start": 18,
                          "end": 125,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 5,
                              "column": 17
                            }
                          },
                          "body": [
                            {
                              "type": "MethodDefinition",
                              "start": 40,
                              "end": 107,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 20
                                },
                                "end": {
                                  "line": 4,
                                  "column": 21
                                }
                              },
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 40,
                                "end": 41,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 21
                                  }
                                },
                                "name": "X"
                              },
                              "static": false,
                              "kind": "method",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 41,
                                "end": 107,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 21
                                  },
                                  "end": {
                                    "line": 4,
                                    "column": 21
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 44,
                                  "end": 107,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 24
                                    },
                                    "end": {
                                      "line": 4,
                                      "column": 21
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ReturnStatement",
                                      "start": 70,
                                      "end": 85,
                                      "loc": {
                                        "start": {
                                          "line": 3,
                                          "column": 24
                                        },
                                        "end": {
                                          "line": 3,
                                          "column": 39
                                        }
                                      },
                                      "argument": {
                                        "type": "MemberExpression",
                                        "start": 77,
                                        "end": 85,
                                        "loc": {
                                          "start": {
                                            "line": 3,
                                            "column": 31
                                          },
                                          "end": {
                                            "line": 3,
                                            "column": 39
                                          }
                                        },
                                        "object": {
                                          "type": "Super",
                                          "start": 77,
                                          "end": 82,
                                          "loc": {
                                            "start": {
                                              "line": 3,
                                              "column": 31
                                            },
                                            "end": {
                                              "line": 3,
                                              "column": 36
                                            }
                                          }
                                        },
                                        "property": {
                                          "type": "Literal",
                                          "start": 83,
                                          "end": 84,
                                          "loc": {
                                            "start": {
                                              "line": 3,
                                              "column": 37
                                            },
                                            "end": {
                                              "line": 3,
                                              "column": 38
                                            }
                                          },
                                          "value": 1,
                                          "raw": "1"
                                        },
                                        "computed": true
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
        
            it('should parse yield followed by super', () => {
                expect(parseScript(`({ *f() { yield super.f(); } })`, {
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
                    "body": [
                      {
                        "type": "ExpressionStatement",
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
                        "expression": {
                          "type": "ObjectExpression",
                          "start": 1,
                          "end": 30,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 1
                            },
                            "end": {
                              "line": 1,
                              "column": 30
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 3,
                              "end": 28,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 3
                                },
                                "end": {
                                  "line": 1,
                                  "column": 28
                                }
                              },
                              "method": true,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
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
                                },
                                "name": "f"
                              },
                              "kind": "init",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 5,
                                "end": 28,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 5
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 28
                                  }
                                },
                                "id": null,
                                "generator": true,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 8,
                                  "end": 28,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 8
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 28
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 10,
                                      "end": 26,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 10
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 26
                                        }
                                      },
                                      "expression": {
                                        "type": "YieldExpression",
                                        "start": 10,
                                        "end": 25,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 10
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 25
                                          }
                                        },
                                        "delegate": false,
                                        "argument": {
                                          "type": "CallExpression",
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
                                          "callee": {
                                            "type": "MemberExpression",
                                            "start": 16,
                                            "end": 23,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 16
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 23
                                              }
                                            },
                                            "object": {
                                              "type": "Super",
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
                                            "property": {
                                              "type": "Identifier",
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
                                              },
                                              "name": "f"
                                            },
                                            "computed": false
                                          },
                                          "arguments": []
                                        }
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

            it('should parse "class A extends B { "constructor"() { super() } }"', () => {
                expect(parseScript(`class A extends B { "constructor"() { super() } }`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
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
                    },
                    "body": [
                      {
                        "type": "ClassDeclaration",
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
                        },
                        "id": {
                          "type": "Identifier",
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
                          },
                          "name": "A"
                        },
                        "superClass": {
                          "type": "Identifier",
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
                          },
                          "name": "B"
                        },
                        "body": {
                          "type": "ClassBody",
                          "start": 18,
                          "end": 49,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 49
                            }
                          },
                          "body": [
                            {
                              "type": "MethodDefinition",
                              "start": 20,
                              "end": 47,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 20
                                },
                                "end": {
                                  "line": 1,
                                  "column": 47
                                }
                              },
                              "computed": false,
                              "key": {
                                "type": "Literal",
                                "start": 20,
                                "end": 33,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 33
                                  }
                                },
                                "value": "constructor",
                                "raw": "\"constructor\""
                              },
                              "static": false,
                              "kind": "constructor",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 33,
                                "end": 47,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 33
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 47
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 36,
                                  "end": 47,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 36
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 47
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 38,
                                      "end": 45,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 38
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 45
                                        }
                                      },
                                      "expression": {
                                        "type": "CallExpression",
                                        "start": 38,
                                        "end": 45,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 38
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 45
                                          }
                                        },
                                        "callee": {
                                          "type": "Super",
                                          "start": 38,
                                          "end": 43,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 38
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 43
                                            }
                                          }
                                        },
                                        "arguments": []
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
        
            it('should parse "class A extends B { constructor(a = super()){} }"', () => {
                expect(parseScript(`class A extends B { constructor(a = super()){} }`, {
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
                    "body": [
                      {
                        "type": "ClassDeclaration",
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
                          },
                          "name": "A"
                        },
                        "superClass": {
                          "type": "Identifier",
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
                          },
                          "name": "B"
                        },
                        "body": {
                          "type": "ClassBody",
                          "start": 18,
                          "end": 48,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 48
                            }
                          },
                          "body": [
                            {
                              "type": "MethodDefinition",
                              "start": 20,
                              "end": 46,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 20
                                },
                                "end": {
                                  "line": 1,
                                  "column": 46
                                }
                              },
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 20,
                                "end": 31,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 31
                                  }
                                },
                                "name": "constructor"
                              },
                              "static": false,
                              "kind": "constructor",
                              "value": {
                                "type": "FunctionExpression",
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
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [
                                  {
                                    "type": "AssignmentPattern",
                                    "start": 32,
                                    "end": 43,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 32
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 43
                                      }
                                    },
                                    "left": {
                                      "type": "Identifier",
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
                                      },
                                      "name": "a"
                                    },
                                    "right": {
                                      "type": "CallExpression",
                                      "start": 36,
                                      "end": 43,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 36
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 43
                                        }
                                      },
                                      "callee": {
                                        "type": "Super",
                                        "start": 36,
                                        "end": 41,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 36
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 41
                                          }
                                        }
                                      },
                                      "arguments": []
                                    }
                                  }
                                ],
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
                            }
                          ]
                        }
                      }
                    ],
                    "sourceType": "script"
                  });
            });
            it('should parse "class A extends B { constructor() { ({a: super()}); } }"', () => {
                expect(parseScript(`class A extends B { constructor() { ({a: super()}); } }`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 55,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 55
                      }
                    },
                    "body": [
                      {
                        "type": "ClassDeclaration",
                        "start": 0,
                        "end": 55,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 1,
                            "column": 55
                          }
                        },
                        "id": {
                          "type": "Identifier",
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
                          },
                          "name": "A"
                        },
                        "superClass": {
                          "type": "Identifier",
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
                          },
                          "name": "B"
                        },
                        "body": {
                          "type": "ClassBody",
                          "start": 18,
                          "end": 55,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 55
                            }
                          },
                          "body": [
                            {
                              "type": "MethodDefinition",
                              "start": 20,
                              "end": 53,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 20
                                },
                                "end": {
                                  "line": 1,
                                  "column": 53
                                }
                              },
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 20,
                                "end": 31,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 31
                                  }
                                },
                                "name": "constructor"
                              },
                              "static": false,
                              "kind": "constructor",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 31,
                                "end": 53,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 31
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 53
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 34,
                                  "end": 53,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 34
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 53
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 36,
                                      "end": 51,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 36
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 51
                                        }
                                      },
                                      "expression": {
                                        "type": "ObjectExpression",
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
                                        "properties": [
                                          {
                                            "type": "Property",
                                            "start": 38,
                                            "end": 48,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 38
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 48
                                              }
                                            },
                                            "method": false,
                                            "shorthand": false,
                                            "computed": false,
                                            "key": {
                                              "type": "Identifier",
                                              "start": 38,
                                              "end": 39,
                                              "loc": {
                                                "start": {
                                                  "line": 1,
                                                  "column": 38
                                                },
                                                "end": {
                                                  "line": 1,
                                                  "column": 39
                                                }
                                              },
                                              "name": "a"
                                            },
                                            "value": {
                                              "type": "CallExpression",
                                              "start": 41,
                                              "end": 48,
                                              "loc": {
                                                "start": {
                                                  "line": 1,
                                                  "column": 41
                                                },
                                                "end": {
                                                  "line": 1,
                                                  "column": 48
                                                }
                                              },
                                              "callee": {
                                                "type": "Super",
                                                "start": 41,
                                                "end": 46,
                                                "loc": {
                                                  "start": {
                                                    "line": 1,
                                                    "column": 41
                                                  },
                                                  "end": {
                                                    "line": 1,
                                                    "column": 46
                                                  }
                                                }
                                              },
                                              "arguments": []
                                            },
                                            "kind": "init"
                                          }
                                        ]
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
        
            it('should parse "class A extends B { constructor() { () => super(); } }"', () => {
                expect(parseScript(`class A extends B { constructor() { () => super(); } }`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
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
                    },
                    "body": [
                      {
                        "type": "ClassDeclaration",
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
                        },
                        "id": {
                          "type": "Identifier",
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
                          },
                          "name": "A"
                        },
                        "superClass": {
                          "type": "Identifier",
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
                          },
                          "name": "B"
                        },
                        "body": {
                          "type": "ClassBody",
                          "start": 18,
                          "end": 54,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 54
                            }
                          },
                          "body": [
                            {
                              "type": "MethodDefinition",
                              "start": 20,
                              "end": 52,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 20
                                },
                                "end": {
                                  "line": 1,
                                  "column": 52
                                }
                              },
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 20,
                                "end": 31,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 31
                                  }
                                },
                                "name": "constructor"
                              },
                              "static": false,
                              "kind": "constructor",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 31,
                                "end": 52,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 31
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
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 34,
                                  "end": 52,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 34
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 52
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 36,
                                      "end": 50,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 36
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 50
                                        }
                                      },
                                      "expression": {
                                        "type": "ArrowFunctionExpression",
                                        "start": 36,
                                        "end": 49,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 36
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 49
                                          }
                                        },
                                        "id": null,
                                        "generator": false,
                                        "expression": true,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                          "type": "CallExpression",
                                          "start": 42,
                                          "end": 49,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 42
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 49
                                            }
                                          },
                                          "callee": {
                                            "type": "Super",
                                            "start": 42,
                                            "end": 47,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 42
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 47
                                              }
                                            }
                                          },
                                          "arguments": []
                                        }
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
        
            it('should parse "class A extends B { constructor() { () => { super(); } } }"', () => {
                expect(parseScript(`class A extends B { constructor() { () => { super(); } } }`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 58,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 58
                      }
                    },
                    "body": [
                      {
                        "type": "ClassDeclaration",
                        "start": 0,
                        "end": 58,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 1,
                            "column": 58
                          }
                        },
                        "id": {
                          "type": "Identifier",
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
                          },
                          "name": "A"
                        },
                        "superClass": {
                          "type": "Identifier",
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
                          },
                          "name": "B"
                        },
                        "body": {
                          "type": "ClassBody",
                          "start": 18,
                          "end": 58,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 58
                            }
                          },
                          "body": [
                            {
                              "type": "MethodDefinition",
                              "start": 20,
                              "end": 56,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 20
                                },
                                "end": {
                                  "line": 1,
                                  "column": 56
                                }
                              },
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 20,
                                "end": 31,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 31
                                  }
                                },
                                "name": "constructor"
                              },
                              "static": false,
                              "kind": "constructor",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 31,
                                "end": 56,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 31
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 56
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 34,
                                  "end": 56,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 34
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 56
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 36,
                                      "end": 54,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 36
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 54
                                        }
                                      },
                                      "expression": {
                                        "type": "ArrowFunctionExpression",
                                        "start": 36,
                                        "end": 54,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 36
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 54
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
                                              "line": 1,
                                              "column": 42
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 54
                                            }
                                          },
                                          "body": [
                                            {
                                              "type": "ExpressionStatement",
                                              "start": 44,
                                              "end": 52,
                                              "loc": {
                                                "start": {
                                                  "line": 1,
                                                  "column": 44
                                                },
                                                "end": {
                                                  "line": 1,
                                                  "column": 52
                                                }
                                              },
                                              "expression": {
                                                "type": "CallExpression",
                                                "start": 44,
                                                "end": 51,
                                                "loc": {
                                                  "start": {
                                                    "line": 1,
                                                    "column": 44
                                                  },
                                                  "end": {
                                                    "line": 1,
                                                    "column": 51
                                                  }
                                                },
                                                "callee": {
                                                  "type": "Super",
                                                  "start": 44,
                                                  "end": 49,
                                                  "loc": {
                                                    "start": {
                                                      "line": 1,
                                                      "column": 44
                                                    },
                                                    "end": {
                                                      "line": 1,
                                                      "column": 49
                                                    }
                                                  }
                                                },
                                                "arguments": []
                                              }
                                            }
                                          ]
                                        }
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

            it('should parse "({ a() { super.b(); } });"', () => {
                expect(parseScript(`({ a() { super.b(); } });`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 0,
                        "end": 25,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 1,
                            "column": 25
                          }
                        },
                        "expression": {
                          "type": "ObjectExpression",
                          "start": 1,
                          "end": 23,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 1
                            },
                            "end": {
                              "line": 1,
                              "column": 23
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 3,
                              "end": 21,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 3
                                },
                                "end": {
                                  "line": 1,
                                  "column": 21
                                }
                              },
                              "method": true,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 3,
                                "end": 4,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 3
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 4
                                  }
                                },
                                "name": "a"
                              },
                              "kind": "init",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 4,
                                "end": 21,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 4
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 21
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 7,
                                  "end": 21,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 7
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 21
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 9,
                                      "end": 19,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 9
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 19
                                        }
                                      },
                                      "expression": {
                                        "type": "CallExpression",
                                        "start": 9,
                                        "end": 18,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 9
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 18
                                          }
                                        },
                                        "callee": {
                                          "type": "MemberExpression",
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
                                          },
                                          "object": {
                                            "type": "Super",
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
                                            }
                                          },
                                          "property": {
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
                                            "name": "b"
                                          },
                                          "computed": false
                                        },
                                        "arguments": []
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
        
            it('should parse "({ *a() { super.b = 0; } });"', () => {
                expect(parseScript(`({ *a() { super.b = 0; } });`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 28,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 28
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 0,
                        "end": 28,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 1,
                            "column": 28
                          }
                        },
                        "expression": {
                          "type": "ObjectExpression",
                          "start": 1,
                          "end": 26,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 1
                            },
                            "end": {
                              "line": 1,
                              "column": 26
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 3,
                              "end": 24,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 3
                                },
                                "end": {
                                  "line": 1,
                                  "column": 24
                                }
                              },
                              "method": true,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
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
                                },
                                "name": "a"
                              },
                              "kind": "init",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 5,
                                "end": 24,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 5
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 24
                                  }
                                },
                                "id": null,
                                "generator": true,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 8,
                                  "end": 24,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 8
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 24
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 10,
                                      "end": 22,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 10
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 22
                                        }
                                      },
                                      "expression": {
                                        "type": "AssignmentExpression",
                                        "start": 10,
                                        "end": 21,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 10
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 21
                                          }
                                        },
                                        "operator": "=",
                                        "left": {
                                          "type": "MemberExpression",
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
                                          },
                                          "object": {
                                            "type": "Super",
                                            "start": 10,
                                            "end": 15,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 10
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 15
                                              }
                                            }
                                          },
                                          "property": {
                                            "type": "Identifier",
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
                                            },
                                            "name": "b"
                                          },
                                          "computed": false
                                        },
                                        "right": {
                                          "type": "Literal",
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
                                          "value": 0,
                                          "raw": "0"
                                        }
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
        
            it('should parse "({ get a() { super[0] = 1; } });"', () => {
                expect(parseScript(`({ get a() { super[0] = 1; } });`, {
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
                    "body": [
                      {
                        "type": "ExpressionStatement",
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
                        "expression": {
                          "type": "ObjectExpression",
                          "start": 1,
                          "end": 30,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 1
                            },
                            "end": {
                              "line": 1,
                              "column": 30
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 3,
                              "end": 28,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 3
                                },
                                "end": {
                                  "line": 1,
                                  "column": 28
                                }
                              },
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 7,
                                "end": 8,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 7
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 8
                                  }
                                },
                                "name": "a"
                              },
                              "kind": "get",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 8,
                                "end": 28,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 8
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 28
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 11,
                                  "end": 28,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 11
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 28
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 13,
                                      "end": 26,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 13
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 26
                                        }
                                      },
                                      "expression": {
                                        "type": "AssignmentExpression",
                                        "start": 13,
                                        "end": 25,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 13
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 25
                                          }
                                        },
                                        "operator": "=",
                                        "left": {
                                          "type": "MemberExpression",
                                          "start": 13,
                                          "end": 21,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 13
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 21
                                            }
                                          },
                                          "object": {
                                            "type": "Super",
                                            "start": 13,
                                            "end": 18,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 13
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 18
                                              }
                                            }
                                          },
                                          "property": {
                                            "type": "Literal",
                                            "start": 19,
                                            "end": 20,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 19
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 20
                                              }
                                            },
                                            "value": 0,
                                            "raw": "0"
                                          },
                                          "computed": true
                                        },
                                        "right": {
                                          "type": "Literal",
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
                                          "value": 1,
                                          "raw": "1"
                                        }
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
        
            it('should parse "(class { constructor() { super.x } });"', () => {
                expect(parseScript(`(class { constructor() { super.x } });`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 38,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 38
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 0,
                        "end": 38,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 1,
                            "column": 38
                          }
                        },
                        "expression": {
                          "type": "ClassExpression",
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
                          },
                          "id": null,
                          "superClass": null,
                          "body": {
                            "type": "ClassBody",
                            "start": 7,
                            "end": 36,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 7
                              },
                              "end": {
                                "line": 1,
                                "column": 36
                              }
                            },
                            "body": [
                              {
                                "type": "MethodDefinition",
                                "start": 9,
                                "end": 34,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 9
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 34
                                  }
                                },
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 9,
                                  "end": 20,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 9
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 20
                                    }
                                  },
                                  "name": "constructor"
                                },
                                "static": false,
                                "kind": "constructor",
                                "value": {
                                  "type": "FunctionExpression",
                                  "start": 20,
                                  "end": 34,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 20
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 34
                                    }
                                  },
                                  "id": null,
                                  "generator": false,
                                  "expression": false,
                                  "async": false,
                                  "params": [],
                                  "body": {
                                    "type": "BlockStatement",
                                    "start": 23,
                                    "end": 34,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 23
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 34
                                      }
                                    },
                                    "body": [
                                      {
                                        "type": "ExpressionStatement",
                                        "start": 25,
                                        "end": 32,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 25
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 32
                                          }
                                        },
                                        "expression": {
                                          "type": "MemberExpression",
                                          "start": 25,
                                          "end": 32,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 25
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 32
                                            }
                                          },
                                          "object": {
                                            "type": "Super",
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
                                          "property": {
                                            "type": "Identifier",
                                            "start": 31,
                                            "end": 32,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 31
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 32
                                              }
                                            },
                                            "name": "x"
                                          },
                                          "computed": false
                                        }
                                      }
                                    ]
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    ],
                    "sourceType": "script"
                  });
            });
        
            it('should parse "({ set a(x) { super.b[0] = 1; } });"', () => {
                expect(parseScript(`({ set a(x) { super.b[0] = 1; } });`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
                    "start": 0,
                    "end": 35,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 35
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 0,
                        "end": 35,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 1,
                            "column": 35
                          }
                        },
                        "expression": {
                          "type": "ObjectExpression",
                          "start": 1,
                          "end": 33,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 1
                            },
                            "end": {
                              "line": 1,
                              "column": 33
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 3,
                              "end": 31,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 3
                                },
                                "end": {
                                  "line": 1,
                                  "column": 31
                                }
                              },
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 7,
                                "end": 8,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 7
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 8
                                  }
                                },
                                "name": "a"
                              },
                              "kind": "set",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 8,
                                "end": 31,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 8
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 31
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [
                                  {
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
                                    "name": "x"
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 12,
                                  "end": 31,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 12
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 31
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 14,
                                      "end": 29,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 14
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 29
                                        }
                                      },
                                      "expression": {
                                        "type": "AssignmentExpression",
                                        "start": 14,
                                        "end": 28,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 14
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 28
                                          }
                                        },
                                        "operator": "=",
                                        "left": {
                                          "type": "MemberExpression",
                                          "start": 14,
                                          "end": 24,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 14
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 24
                                            }
                                          },
                                          "object": {
                                            "type": "MemberExpression",
                                            "start": 14,
                                            "end": 21,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 14
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 21
                                              }
                                            },
                                            "object": {
                                              "type": "Super",
                                              "start": 14,
                                              "end": 19,
                                              "loc": {
                                                "start": {
                                                  "line": 1,
                                                  "column": 14
                                                },
                                                "end": {
                                                  "line": 1,
                                                  "column": 19
                                                }
                                              }
                                            },
                                            "property": {
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
                                              "name": "b"
                                            },
                                            "computed": false
                                          },
                                          "property": {
                                            "type": "Literal",
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
                                            },
                                            "value": 0,
                                            "raw": "0"
                                          },
                                          "computed": true
                                        },
                                        "right": {
                                          "type": "Literal",
                                          "start": 27,
                                          "end": 28,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 27
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 28
                                            }
                                          },
                                          "value": 1,
                                          "raw": "1"
                                        }
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
        
            it('should parse "(class { constructor() { super.x } })"', () => {
                expect(parseScript(`(class { constructor() { super.x } })`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
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
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
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
                        },
                        "expression": {
                          "type": "ClassExpression",
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
                          },
                          "id": null,
                          "superClass": null,
                          "body": {
                            "type": "ClassBody",
                            "start": 7,
                            "end": 36,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 7
                              },
                              "end": {
                                "line": 1,
                                "column": 36
                              }
                            },
                            "body": [
                              {
                                "type": "MethodDefinition",
                                "start": 9,
                                "end": 34,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 9
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 34
                                  }
                                },
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 9,
                                  "end": 20,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 9
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 20
                                    }
                                  },
                                  "name": "constructor"
                                },
                                "static": false,
                                "kind": "constructor",
                                "value": {
                                  "type": "FunctionExpression",
                                  "start": 20,
                                  "end": 34,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 20
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 34
                                    }
                                  },
                                  "id": null,
                                  "generator": false,
                                  "expression": false,
                                  "async": false,
                                  "params": [],
                                  "body": {
                                    "type": "BlockStatement",
                                    "start": 23,
                                    "end": 34,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 23
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 34
                                      }
                                    },
                                    "body": [
                                      {
                                        "type": "ExpressionStatement",
                                        "start": 25,
                                        "end": 32,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 25
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 32
                                          }
                                        },
                                        "expression": {
                                          "type": "MemberExpression",
                                          "start": 25,
                                          "end": 32,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 25
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 32
                                            }
                                          },
                                          "object": {
                                            "type": "Super",
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
                                          "property": {
                                            "type": "Identifier",
                                            "start": 31,
                                            "end": 32,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 31
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 32
                                              }
                                            },
                                            "name": "x"
                                          },
                                          "computed": false
                                        }
                                      }
                                    ]
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    ],
                    "sourceType": "script"
                  });
            });
        
            it('should parse "class A { a() { () => super.b; } }"', () => {
                expect(parseScript(`class A { a() { () => super.b; } }`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
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
                    },
                    "body": [
                      {
                        "type": "ClassDeclaration",
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
                        },
                        "id": {
                          "type": "Identifier",
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
                          },
                          "name": "A"
                        },
                        "superClass": null,
                        "body": {
                          "type": "ClassBody",
                          "start": 8,
                          "end": 34,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 34
                            }
                          },
                          "body": [
                            {
                              "type": "MethodDefinition",
                              "start": 10,
                              "end": 32,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 10
                                },
                                "end": {
                                  "line": 1,
                                  "column": 32
                                }
                              },
                              "computed": false,
                              "key": {
                                "type": "Identifier",
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
                                },
                                "name": "a"
                              },
                              "static": false,
                              "kind": "method",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 11,
                                "end": 32,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 11
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 32
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 14,
                                  "end": 32,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 14
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 32
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
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
                                      },
                                      "expression": {
                                        "type": "ArrowFunctionExpression",
                                        "start": 16,
                                        "end": 29,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 16
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 29
                                          }
                                        },
                                        "id": null,
                                        "generator": false,
                                        "expression": true,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                          "type": "MemberExpression",
                                          "start": 22,
                                          "end": 29,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 22
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 29
                                            }
                                          },
                                          "object": {
                                            "type": "Super",
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
                                          },
                                          "property": {
                                            "type": "Identifier",
                                            "start": 28,
                                            "end": 29,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 28
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 29
                                              }
                                            },
                                            "name": "b"
                                          },
                                          "computed": false
                                        }
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
        
            it('should parse "class A extends B { constructor() { super.x } }"', () => {
                expect(parseScript(`class A extends B { constructor() { super.x } }`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
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
                    },
                    "body": [
                      {
                        "type": "ClassDeclaration",
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
                        },
                        "id": {
                          "type": "Identifier",
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
                          },
                          "name": "A"
                        },
                        "superClass": {
                          "type": "Identifier",
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
                          },
                          "name": "B"
                        },
                        "body": {
                          "type": "ClassBody",
                          "start": 18,
                          "end": 47,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 47
                            }
                          },
                          "body": [
                            {
                              "type": "MethodDefinition",
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
                              },
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 20,
                                "end": 31,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 31
                                  }
                                },
                                "name": "constructor"
                              },
                              "static": false,
                              "kind": "constructor",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 31,
                                "end": 45,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 31
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 45
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
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
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 36,
                                      "end": 43,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 36
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 43
                                        }
                                      },
                                      "expression": {
                                        "type": "MemberExpression",
                                        "start": 36,
                                        "end": 43,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 36
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 43
                                          }
                                        },
                                        "object": {
                                          "type": "Super",
                                          "start": 36,
                                          "end": 41,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 36
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 41
                                            }
                                          }
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "start": 42,
                                          "end": 43,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 42
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 43
                                            }
                                          },
                                          "name": "x"
                                        },
                                        "computed": false
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
        
            it('should parse "class A { a() { new super.b; } }"', () => {
                expect(parseScript(`class A { a() { new super.b; } }`, {
                    ranges: true,
                    raw: true
                })).to.eql({
                    "type": "Program",
                    "body": [
                        {
                            "type": "ClassDeclaration",
                            "id": {
                                "type": "Identifier",
                                "name": "A",
                                "start": 6,
                                "end": 7
                            },
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": [
                                    {
                                        "type": "MethodDefinition",
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 10,
                                            "end": 11
                                        },
                                        "kind": "method",
                                        "static": false,
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
                                                            "type": "NewExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "object": {
                                                                    "type": "Super",
                                                                    "start": 20,
                                                                    "end": 25
                                                                },
                                                                "computed": false,
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "b",
                                                                    "start": 26,
                                                                    "end": 27
                                                                },
                                                                "start": 16,
                                                                "end": 27
                                                            },
                                                            "arguments": [],
                                                            "start": 16,
                                                            "end": 27
                                                        },
                                                        "start": 16,
                                                        "end": 28
                                                    }
                                                ],
                                                "start": 14,
                                                "end": 30
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 11,
                                            "end": 30
                                        },
                                        "start": 10,
                                        "end": 30
                                    }
                                ],
                                "start": 8,
                                "end": 32
                            },
                            "start": 0,
                            "end": 32
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 32
                });
            });
            
            it('should parse "({ *f() { yield super.f(); } })"', () => {
                expect(parseScript(`({ *f() { yield super.f(); } })`, {
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
                    "body": [
                      {
                        "type": "ExpressionStatement",
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
                        "expression": {
                          "type": "ObjectExpression",
                          "start": 1,
                          "end": 30,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 1
                            },
                            "end": {
                              "line": 1,
                              "column": 30
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 3,
                              "end": 28,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 3
                                },
                                "end": {
                                  "line": 1,
                                  "column": 28
                                }
                              },
                              "method": true,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
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
                                },
                                "name": "f"
                              },
                              "kind": "init",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 5,
                                "end": 28,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 5
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 28
                                  }
                                },
                                "id": null,
                                "generator": true,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 8,
                                  "end": 28,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 8
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 28
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 10,
                                      "end": 26,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 10
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 26
                                        }
                                      },
                                      "expression": {
                                        "type": "YieldExpression",
                                        "start": 10,
                                        "end": 25,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 10
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 25
                                          }
                                        },
                                        "delegate": false,
                                        "argument": {
                                          "type": "CallExpression",
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
                                          "callee": {
                                            "type": "MemberExpression",
                                            "start": 16,
                                            "end": 23,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 16
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 23
                                              }
                                            },
                                            "object": {
                                              "type": "Super",
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
                                            "property": {
                                              "type": "Identifier",
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
                                              },
                                              "name": "f"
                                            },
                                            "computed": false
                                          },
                                          "arguments": []
                                        }
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
        
            it('should parse "class A { a() { new super.b(); } }"', () => {
                expect(parseScript(`class A { a() { new super.b(); } }`, {
                    ranges: true,
                    raw: true,
                })).to.eql({
                    "type": "Program",
                    "body": [
                        {
                            "type": "ClassDeclaration",
                            "id": {
                                "type": "Identifier",
                                "name": "A",
                                "start": 6,
                                "end": 7
                            },
                            "superClass": null,
                            "body": {
                                "type": "ClassBody",
                                "body": [
                                    {
                                        "type": "MethodDefinition",
                                        "computed": false,
                                        "key": {
                                            "type": "Identifier",
                                            "name": "a",
                                            "start": 10,
                                            "end": 11
                                        },
                                        "kind": "method",
                                        "static": false,
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
                                                            "type": "NewExpression",
                                                            "callee": {
                                                                "type": "MemberExpression",
                                                                "object": {
                                                                    "type": "Super",
                                                                    "start": 20,
                                                                    "end": 25
                                                                },
                                                                "computed": false,
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "b",
                                                                    "start": 26,
                                                                    "end": 27
                                                                },
                                                                "start": 16,
                                                                "end": 27
                                                            },
                                                            "arguments": [],
                                                            "start": 16,
                                                            "end": 29
                                                        },
                                                        "start": 16,
                                                        "end": 30
                                                    }
                                                ],
                                                "start": 14,
                                                "end": 32
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
                                            "start": 11,
                                            "end": 32
                                        },
                                        "start": 10,
                                        "end": 32
                                    }
                                ],
                                "start": 8,
                                "end": 34
                            },
                            "start": 0,
                            "end": 34
                        }
                    ],
                    "sourceType": "script",
                    "start": 0,
                    "end": 34
                });
            });
        
            it('should parse "class A extends B { constructor() { super() } }"', () => {
                expect(parseScript(`class A extends B { constructor() { super() } }`, {
                    ranges: true,
                    raw: true,
                    locations: true
                })).to.eql({
                    "type": "Program",
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
                    },
                    "body": [
                      {
                        "type": "ClassDeclaration",
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
                        },
                        "id": {
                          "type": "Identifier",
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
                          },
                          "name": "A"
                        },
                        "superClass": {
                          "type": "Identifier",
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
                          },
                          "name": "B"
                        },
                        "body": {
                          "type": "ClassBody",
                          "start": 18,
                          "end": 47,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 47
                            }
                          },
                          "body": [
                            {
                              "type": "MethodDefinition",
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
                              },
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 20,
                                "end": 31,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 20
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 31
                                  }
                                },
                                "name": "constructor"
                              },
                              "static": false,
                              "kind": "constructor",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 31,
                                "end": 45,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 31
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 45
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
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
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
                                      "start": 36,
                                      "end": 43,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 36
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 43
                                        }
                                      },
                                      "expression": {
                                        "type": "CallExpression",
                                        "start": 36,
                                        "end": 43,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 36
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 43
                                          }
                                        },
                                        "callee": {
                                          "type": "Super",
                                          "start": 36,
                                          "end": 41,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 36
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 41
                                            }
                                          }
                                        },
                                        "arguments": []
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
        
            it('should parse "(class extends B { constructor() { super() } });"', () => {
                expect(parseScript(`(class extends B { constructor() { super() } });`, {
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
                    "body": [
                      {
                        "type": "ExpressionStatement",
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
                        "expression": {
                          "type": "ClassExpression",
                          "start": 1,
                          "end": 46,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 1
                            },
                            "end": {
                              "line": 1,
                              "column": 46
                            }
                          },
                          "id": null,
                          "superClass": {
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
                            "name": "B"
                          },
                          "body": {
                            "type": "ClassBody",
                            "start": 17,
                            "end": 46,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 17
                              },
                              "end": {
                                "line": 1,
                                "column": 46
                              }
                            },
                            "body": [
                              {
                                "type": "MethodDefinition",
                                "start": 19,
                                "end": 44,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 19
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 44
                                  }
                                },
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 19,
                                  "end": 30,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 19
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 30
                                    }
                                  },
                                  "name": "constructor"
                                },
                                "static": false,
                                "kind": "constructor",
                                "value": {
                                  "type": "FunctionExpression",
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
                                  },
                                  "id": null,
                                  "generator": false,
                                  "expression": false,
                                  "async": false,
                                  "params": [],
                                  "body": {
                                    "type": "BlockStatement",
                                    "start": 33,
                                    "end": 44,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 33
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 44
                                      }
                                    },
                                    "body": [
                                      {
                                        "type": "ExpressionStatement",
                                        "start": 35,
                                        "end": 42,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 35
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 42
                                          }
                                        },
                                        "expression": {
                                          "type": "CallExpression",
                                          "start": 35,
                                          "end": 42,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 35
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 42
                                            }
                                          },
                                          "callee": {
                                            "type": "Super",
                                            "start": 35,
                                            "end": 40,
                                            "loc": {
                                              "start": {
                                                "line": 1,
                                                "column": 35
                                              },
                                              "end": {
                                                "line": 1,
                                                "column": 40
                                              }
                                            }
                                          },
                                          "arguments": []
                                        }
                                      }
                                    ]
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    ],
                    "sourceType": "script"
                  });
            });
        });