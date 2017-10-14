import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('Espressions - Yield', () => {
  
      it('should fail on "yield v"', () => {
          expect(() => {
              parseScript('yield v');
          }).to.throw();
      });

      it('should fail if generator parameters contain yield expression', () => {
        expect(() => {
            parseScript('function* fn(x = yield) {}');
        }).to.throw();
      });

      it('should fail if generator parameters contain yield expression', () => {
        expect(() => {
            parseScript('"use strict"; function fn(x = yield) {} ');
        }).to.throw();
      });

      it('should fail on "function* fn() { (x = yield) => {}; }"', () => {
        expect(() => {
            parseScript('function* fn() { (x = yield) => {}; } ');
        }).to.throw();
      });

      it('should fail on "function yield() { "use strict"; }"', () => {
        expect(() => {
            parseScript('"use strict"; function yield() {}');
        }).to.throw();
      });

      it('should fail on invalid yield binding property', () => {
          expect(() => {
              parseScript('var {x: y = yield 3} = z;');
          }).to.throw();
      });
  
      it('should fail on invalid yield expression', () => {
          expect(() => {
              parseScript('(function() { yield 3; })');
          }).to.throw();
      });
  
      it('should fail on "function *a(){yield*}"', () => {
          expect(() => {
              parseScript('function *a(){yield*}');
          }).to.throw();
      });

      it('should fail on "+function* yield() {}"', () => {
        expect(() => {
            parseScript('+function* yield() {}');
        }).to.throw();
    });
  
      it('should fail on "function *a(){yield\n*a}"', () => {
          expect(() => {
              parseScript('function *a(){yield\n*a}');
          }).to.throw();
      });

      it('should fail on "+function* fn() { (x = 3 + a.b(yield) ** 2) => {};}"', () => {
        expect(() => {
            parseScript('+function* fn() { (x = 3 + a.b(yield) ** 2) => {};}');
        }).to.throw();
      });

      it('should fail on "+function* fn() { (x = 3 + a.b(yield) ** 2) => {};}"', () => {
        expect(() => {
            parseScript('+function* fn() {  (x = yield fn) => {}; }');
        }).to.throw();
      });

      it('should fail on "function* fn() { (a, b = 3, x = yield) => {}; }"', () => {
        expect(() => {
            parseScript('function* fn() { (a, b = 3, x = yield) => {}; }');
        }).to.throw();
      });

      it('should fail on "function* fn() { (x = (yield) => {}) => {}; }"', () => {
        expect(() => {
            parseScript('function* fn() { (x = (yield) => {}) => {}; }');
        }).to.throw();
      });
  
      it('should fail on invalid yield arrow default', () => {
          expect(() => {
              parseScript('function* g() { (x = yield 42) => {} }');
          }).to.throw();
      });
  
      it('should fail on invalid yield generator arrow parameter', () => {
          expect(() => {
              parseScript('function *g(){ (yield) => 42 }');
          }).to.throw();
      });
  
      it('should fail on invalid yield generator arrow parameters', () => {
          expect(() => {
              parseScript('function *g(){ (a, b, c, yield) => 42 }');
          }).to.throw();
      });
  
      it('should fail on invalid yield generator catch', () => {
          expect(() => {
              parseScript('function *g() { try {} catch (yield) {} }');
            }).to.throw();
      });
  
      it('should fail on invalid yield generator declaration', () => {
          expect(() => {
              parseScript('function *g() { function *yield(){} }');
          }).to.throw();
      });
  
  
      it('should fail on invalid yield generator expression name', () => {
          expect(() => {
              parseScript('(function*yield(){})');
          }).to.throw();
      });
  
      it('should fail on invalid yield generator expression parameter', () => {
          expect(() => {
              parseScript('(function *(yield){})');
            }).to.throw();
      });
    
      it('should fail on invalid yield generator function declaration', () => {
          expect(() => {
              parseScript('function *g() { function yield() {} }');
          }).to.throw();
      });
  
      it('should fail on invalid yield generator lexical declaration', () => {
          expect(() => {
              parseScript('function *g() { let yield; }');
          }).to.throw();
      });
  
      it('should fail on invalid yield generator member expression', () => {
          expect(() => {
              parseScript('function *g() { return yield.x; }');
          }).to.throw();
      });
  
      it('should fail on invalid yield generator parameter', () => {
          expect(() => {
              parseScript('function *g(yield){}');
            }).to.throw();
      });
  
      it('should fail on invalid yield generator strict function expression', () => {
          expect(() => {
              parseScript('function *g(a, b, c, ...yield){}');
            }).to.throw();
      });
  
      it('should fail on invalid yield generator rest', () => {
          expect(() => {
              parseScript('"use strict"; function *g(){ var y = function yield(){}; }');
          }).to.throw();
      });
  
      it('should fail on invalid yield generator struct function parameter', () => {
          expect(() => {
              parseScript('"use strict"; function *g() { var z = function(yield) {} }');
          }).to.throw();
      });
  
      it('should fail on invalid yield generator variable declaration', () => {
          expect(() => {
              parseScript('function *g() { var yield; }');
            }).to.throw();
      });
  
      it('should fail on "yield 10"', () => {
          expect(() => {
              parseScript('yield 10');
          }).to.throw();
      });

      it('should fail on "yield 10"', () => {
        expect(() => {
            parseScript('yield 10');
        }).to.throw();
    });
    
    it('should fail on yield star parameter default inside generator', () => {
        expect(() => {
            parseScript('function* fn(x = yield* yield) {} ');
        }).to.throw();
    });

    it('should fail on yield parameter name strict body', () => {
        expect(() => {
            parseScript('function fn(yield) { "use strict"; }');
        }).to.throw();
    });
    it('should fail on yield parameter name generator', () => {
        expect(() => {
            parseScript('function* fn(yield) {} ');
        }).to.throw();
    });

      it('should fail on invalid function name function declaration inside generator', () => {
        expect(() => {
            parseScript(`function* fn() {
                  function yield() {}
                } `);
        }).to.throw();
        });

        it('should fail on invalid parameter name arrow inside generator', () => {
            expect(() => {
                parseScript(`function* fn() {
                      () => (yield) => {};
                    }`);
            }).to.not.throw();
            });

            it('should fail on invalid parameter name arrow inside generator', () => {
                expect(() => {
                    parseScript(`function* fn() {
                          (yield) => {};
                        }`);
                }).to.throw();
                });

                it('should fail on invalid parameter name arrow no parens', () => {
                    expect(() => {
                        parseScript(`"use strict"; yield => {};`);
                    }).to.throw();
                    });

            it('should fail on invalid parameter default strict', () => {
                expect(() => {
                    parseScript(`"use strict"; function fn(x = yield) {}`);
                }).to.throw();
                });

                it('should parse yield star parameter default', () => {
                    expect(parseScript(`function fn(x = yield* yield) {}`, {
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
                              "name": "fn"
                            },
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "AssignmentPattern",
                                "start": 12,
                                "end": 28,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 12
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 28
                                  }
                                },
                                "left": {
                                  "type": "Identifier",
                                  "start": 12,
                                  "end": 13,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 12
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 13
                                    }
                                  },
                                  "name": "x"
                                },
                                "right": {
                                  "type": "BinaryExpression",
                                  "start": 16,
                                  "end": 28,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 16
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 28
                                    }
                                  },
                                  "left": {
                                    "type": "Identifier",
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
                                    },
                                    "name": "yield"
                                  },
                                  "operator": "*",
                                  "right": {
                                    "type": "Identifier",
                                    "start": 23,
                                    "end": 28,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 23
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 28
                                      }
                                    },
                                    "name": "yield"
                                  }
                                }
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
                              "start": 30,
                              "end": 32,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 30
                                },
                                "end": {
                                  "line": 1,
                                  "column": 32
                                }
                              },
                              "body": []
                            }
                          }
                        ],
                        "sourceType": "script"
                      });
                });

                it('should parse yield parameter default inside function inside generator', () => {
                    expect(parseScript(`var x = { *test () { yield *v } };`, {
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
                            "type": "VariableDeclaration",
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
                            "declarations": [
                              {
                                "type": "VariableDeclarator",
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
                                },
                                "id": {
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
                                  "name": "x"
                                },
                                "init": {
                                  "type": "ObjectExpression",
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
                                  },
                                  "properties": [
                                    {
                                      "type": "Property",
                                      "start": 10,
                                      "end": 31,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 10
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 31
                                        }
                                      },
                                      "method": true,
                                      "shorthand": false,
                                      "computed": false,
                                      "key": {
                                        "type": "Identifier",
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
                                        "name": "test"
                                      },
                                      "kind": "init",
                                      "value": {
                                        "type": "FunctionExpression",
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
                                        "id": null,
                                        "generator": true,
                                        "expression": false,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                          "type": "BlockStatement",
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
                                          "body": [
                                            {
                                              "type": "ExpressionStatement",
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
                                              "expression": {
                                                "type": "YieldExpression",
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
                                                "delegate": true,
                                                "argument": {
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
                                                  "name": "v"
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
                            "kind": "var"
                          }
                        ],
                        "sourceType": "script"
                      });
                });

                it('should parse yield parameter default inside function inside generator', () => {
                    expect(parseScript(`(yield) => {}`, {
                        ranges: true,
                        raw: true,
                        locations: true
                    })).to.eql({
                        "type": "Program",
                        "start": 0,
                        "end": 13,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 1,
                            "column": 13
                          }
                        },
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 0,
                            "end": 13,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 0
                              },
                              "end": {
                                "line": 1,
                                "column": 13
                              }
                            },
                            "expression": {
                              "type": "ArrowFunctionExpression",
                              "start": 0,
                              "end": 13,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 0
                                },
                                "end": {
                                  "line": 1,
                                  "column": 13
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [
                                {
                                  "type": "Identifier",
                                  "start": 1,
                                  "end": 6,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 1
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 6
                                    }
                                  },
                                  "name": "yield"
                                }
                              ],
                              "body": {
                                "type": "BlockStatement",
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
                                },
                                "body": []
                              }
                            }
                          }
                        ],
                        "sourceType": "script"
                      });
                });
    
                it('should parse yield parameter default inside function inside generator', () => {
                    expect(parseScript(`function* fn() {
                          () => (yield) => {};
                        }`, {
                        ranges: true,
                        raw: true,
                        locations: true
                    })).to.eql({
                        "type": "Program",
                        "start": 0,
                        "end": 89,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 0
                          },
                          "end": {
                            "line": 3,
                            "column": 25
                          }
                        },
                        "body": [
                          {
                            "type": "FunctionDeclaration",
                            "start": 0,
                            "end": 89,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 0
                              },
                              "end": {
                                "line": 3,
                                "column": 25
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
                              "end": 89,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 15
                                },
                                "end": {
                                  "line": 3,
                                  "column": 25
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 43,
                                  "end": 63,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 26
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 46
                                    }
                                  },
                                  "expression": {
                                    "type": "ArrowFunctionExpression",
                                    "start": 43,
                                    "end": 62,
                                    "loc": {
                                      "start": {
                                        "line": 2,
                                        "column": 26
                                      },
                                      "end": {
                                        "line": 2,
                                        "column": 45
                                      }
                                    },
                                    "id": null,
                                    "generator": false,
                                    "expression": true,
                                    "async": false,
                                    "params": [],
                                    "body": {
                                      "type": "ArrowFunctionExpression",
                                      "start": 49,
                                      "end": 62,
                                      "loc": {
                                        "start": {
                                          "line": 2,
                                          "column": 32
                                        },
                                        "end": {
                                          "line": 2,
                                          "column": 45
                                        }
                                      },
                                      "id": null,
                                      "generator": false,
                                      "expression": false,
                                      "async": false,
                                      "params": [
                                        {
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
                                      ],
                                      "body": {
                                        "type": "BlockStatement",
                                        "start": 60,
                                        "end": 62,
                                        "loc": {
                                          "start": {
                                            "line": 2,
                                            "column": 43
                                          },
                                          "end": {
                                            "line": 2,
                                            "column": 45
                                          }
                                        },
                                        "body": []
                                      }
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

         it('should parse yield parameter default inside function inside generator', () => {
            expect(parseScript(`function* fn() {
                  function fn2(x = yield) {}
                }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 79,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 17
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 79,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 3,
                        "column": 17
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
                      "end": 79,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 3,
                          "column": 17
                        }
                      },
                      "body": [
                        {
                          "type": "FunctionDeclaration",
                          "start": 35,
                          "end": 61,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 18
                            },
                            "end": {
                              "line": 2,
                              "column": 44
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 44,
                            "end": 47,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 27
                              },
                              "end": {
                                "line": 2,
                                "column": 30
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
                              "start": 48,
                              "end": 57,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 31
                                },
                                "end": {
                                  "line": 2,
                                  "column": 40
                                }
                              },
                              "left": {
                                "type": "Identifier",
                                "start": 48,
                                "end": 49,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 31
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 32
                                  }
                                },
                                "name": "x"
                              },
                              "right": {
                                "type": "Identifier",
                                "start": 52,
                                "end": 57,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 35
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 40
                                  }
                                },
                                "name": "yield"
                              }
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 59,
                            "end": 61,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 42
                              },
                              "end": {
                                "line": 2,
                                "column": 44
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

        it('should parse yield parameter default inside function', () => {
            expect(parseScript(`function fn(x = yield) {} `, {
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
                "body": [
                  {
                    "type": "FunctionDeclaration",
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
                      "name": "fn"
                    },
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "AssignmentPattern",
                        "start": 12,
                        "end": 21,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 12
                          },
                          "end": {
                            "line": 1,
                            "column": 21
                          }
                        },
                        "left": {
                          "type": "Identifier",
                          "start": 12,
                          "end": 13,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 13
                            }
                          },
                          "name": "x"
                        },
                        "right": {
                          "type": "Identifier",
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
                          },
                          "name": "yield"
                        }
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
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
                      },
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse yield parameter default inside arrow', () => {
            expect(parseScript(`(x = yield) => {}`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 17,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 17
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 0,
                    "end": 17,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 17
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 0,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
                          "start": 1,
                          "end": 10,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 1
                            },
                            "end": {
                              "line": 1,
                              "column": 10
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 1,
                            "end": 2,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 1
                              },
                              "end": {
                                "line": 1,
                                "column": 2
                              }
                            },
                            "name": "x"
                          },
                          "right": {
                            "type": "Identifier",
                            "start": 5,
                            "end": 10,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 5
                              },
                              "end": {
                                "line": 1,
                                "column": 10
                              }
                            },
                            "name": "yield"
                          }
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
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
                        },
                        "body": []
                      }
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse yield in nested function as identifier #1 ', () => {
            expect(parseScript(`function* fn() {
                  () => yield;
                  () => { yield };}`, {
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
                    "line": 3,
                    "column": 35
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 83,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 3,
                        "column": 35
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
                      "end": 83,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 3,
                          "column": 35
                        }
                      },
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 35,
                          "end": 47,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 18
                            },
                            "end": {
                              "line": 2,
                              "column": 30
                            }
                          },
                          "expression": {
                            "type": "ArrowFunctionExpression",
                            "start": 35,
                            "end": 46,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 18
                              },
                              "end": {
                                "line": 2,
                                "column": 29
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "Identifier",
                              "start": 41,
                              "end": 46,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 24
                                },
                                "end": {
                                  "line": 2,
                                  "column": 29
                                }
                              },
                              "name": "yield"
                            }
                          }
                        },
                        {
                          "type": "ExpressionStatement",
                          "start": 66,
                          "end": 82,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 18
                            },
                            "end": {
                              "line": 3,
                              "column": 34
                            }
                          },
                          "expression": {
                            "type": "ArrowFunctionExpression",
                            "start": 66,
                            "end": 81,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 18
                              },
                              "end": {
                                "line": 3,
                                "column": 33
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 72,
                              "end": 81,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 24
                                },
                                "end": {
                                  "line": 3,
                                  "column": 33
                                }
                              },
                              "body": [
                                {
                                  "type": "ExpressionStatement",
                                  "start": 74,
                                  "end": 79,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 26
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 31
                                    }
                                  },
                                  "expression": {
                                    "type": "Identifier",
                                    "start": 74,
                                    "end": 79,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 26
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 31
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

        it('should parse parameter default inside arrow inside arrow inside generator', () => {
            expect(parseScript(`function* fn() {
                  () => (x = yield) => {};
                }`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 77,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 17
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 77,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 3,
                        "column": 17
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
                      "end": 77,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 3,
                          "column": 17
                        }
                      },
                      "body": [
                        {
                          "type": "ExpressionStatement",
                          "start": 35,
                          "end": 59,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 18
                            },
                            "end": {
                              "line": 2,
                              "column": 42
                            }
                          },
                          "expression": {
                            "type": "ArrowFunctionExpression",
                            "start": 35,
                            "end": 58,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 18
                              },
                              "end": {
                                "line": 2,
                                "column": 41
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": true,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "ArrowFunctionExpression",
                              "start": 41,
                              "end": 58,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 24
                                },
                                "end": {
                                  "line": 2,
                                  "column": 41
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [
                                {
                                  "type": "AssignmentPattern",
                                  "start": 42,
                                  "end": 51,
                                  "loc": {
                                    "start": {
                                      "line": 2,
                                      "column": 25
                                    },
                                    "end": {
                                      "line": 2,
                                      "column": 34
                                    }
                                  },
                                  "left": {
                                    "type": "Identifier",
                                    "start": 42,
                                    "end": 43,
                                    "loc": {
                                      "start": {
                                        "line": 2,
                                        "column": 25
                                      },
                                      "end": {
                                        "line": 2,
                                        "column": 26
                                      }
                                    },
                                    "name": "x"
                                  },
                                  "right": {
                                    "type": "Identifier",
                                    "start": 46,
                                    "end": 51,
                                    "loc": {
                                      "start": {
                                        "line": 2,
                                        "column": 29
                                      },
                                      "end": {
                                        "line": 2,
                                        "column": 34
                                      }
                                    },
                                    "name": "yield"
                                  }
                                }
                              ],
                              "body": {
                                "type": "BlockStatement",
                                "start": 56,
                                "end": 58,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 39
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 41
                                  }
                                },
                                "body": []
                              }
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

      it('should parse yield in nested function as identifier #1 ', () => {
          expect(parseScript(`function *f2() {
          () => yield / 1
        }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "ArrowFunctionExpression",
                                    "body": {
                                        "type": "BinaryExpression",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "yield",
                                            "start": 33,
                                            "end": 38,
                                            "loc": {
                                                "start": {
                                                    "line": 2,
                                                    "column": 16
                                                },
                                                "end": {
                                                    "line": 2,
                                                    "column": 21
                                                }
                                            }
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 1,
                                            "start": 41,
                                            "end": 42,
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
                                            "raw": "1"
                                        },
                                        "operator": "/",
                                        "start": 33,
                                        "end": 42,
                                        "loc": {
                                            "start": {
                                                "line": 2,
                                                "column": 16
                                            },
                                            "end": {
                                                "line": 2,
                                                "column": 25
                                            }
                                        }
                                    },
                                    "params": [],
                                    "id": null,
                                    "async": false,
                                    "generator": false,
                                    "expression": true,
                                    "start": 27,
                                    "end": 42,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 10
                                        },
                                        "end": {
                                            "line": 2,
                                            "column": 25
                                        }
                                    }
                                },
                                "start": 27,
                                "end": 42,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 2,
                                        "column": 25
                                    }
                                }
                            }
                        ],
                        "start": 15,
                        "end": 52,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 3,
                                "column": 9
                            }
                        }
                    },
                    "async": false,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "f2",
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
                    "start": 0,
                    "end": 52,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 3,
                            "column": 9
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 52,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 3,
                    "column": 9
                }
            }
        });
      });
  
      it('should parse yield in nested function as identifier #2', () => {
          expect(parseScript(`function *f3() {
          ({
            g() {
              return yield / 1;
            }
          })
        }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "FunctionDeclaration",
                    "params": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "ObjectExpression",
                                    "properties": [
                                        {
                                            "type": "Property",
                                            "key": {
                                                "type": "Identifier",
                                                "name": "g",
                                                "start": 42,
                                                "end": 43,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 12
                                                    },
                                                    "end": {
                                                        "line": 3,
                                                        "column": 13
                                                    }
                                                }
                                            },
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
                                                                "type": "BinaryExpression",
                                                                "left": {
                                                                    "type": "Identifier",
                                                                    "name": "yield",
                                                                    "start": 69,
                                                                    "end": 74,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 4,
                                                                            "column": 21
                                                                        },
                                                                        "end": {
                                                                            "line": 4,
                                                                            "column": 26
                                                                        }
                                                                    }
                                                                },
                                                                "right": {
                                                                    "type": "Literal",
                                                                    "value": 1,
                                                                    "start": 77,
                                                                    "end": 78,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 4,
                                                                            "column": 29
                                                                        },
                                                                        "end": {
                                                                            "line": 4,
                                                                            "column": 30
                                                                        }
                                                                    },
                                                                    "raw": "1"
                                                                },
                                                                "operator": "/",
                                                                "start": 69,
                                                                "end": 78,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 4,
                                                                        "column": 21
                                                                    },
                                                                    "end": {
                                                                        "line": 4,
                                                                        "column": 30
                                                                    }
                                                                }
                                                            },
                                                            "start": 62,
                                                            "end": 79,
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
                                                        }
                                                    ],
                                                    "start": 46,
                                                    "end": 93,
                                                    "loc": {
                                                        "start": {
                                                            "line": 3,
                                                            "column": 16
                                                        },
                                                        "end": {
                                                            "line": 5,
                                                            "column": 13
                                                        }
                                                    }
                                                },
                                                "generator": false,
                                                "async": false,
                                                "expression": false,
                                                "start": 43,
                                                "end": 93,
                                                "loc": {
                                                    "start": {
                                                        "line": 3,
                                                        "column": 13
                                                    },
                                                    "end": {
                                                        "line": 5,
                                                        "column": 13
                                                    }
                                                }
                                            },
                                            "kind": "init",
                                            "computed": false,
                                            "method": true,
                                            "shorthand": false,
                                            "start": 42,
                                            "end": 93,
                                            "loc": {
                                                "start": {
                                                    "line": 3,
                                                    "column": 12
                                                },
                                                "end": {
                                                    "line": 5,
                                                    "column": 13
                                                }
                                            }
                                        }
                                    ],
                                    "start": 28,
                                    "end": 105,
                                    "loc": {
                                        "start": {
                                            "line": 2,
                                            "column": 11
                                        },
                                        "end": {
                                            "line": 6,
                                            "column": 11
                                        }
                                    }
                                },
                                "start": 27,
                                "end": 106,
                                "loc": {
                                    "start": {
                                        "line": 2,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 6,
                                        "column": 12
                                    }
                                }
                            }
                        ],
                        "start": 15,
                        "end": 116,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 15
                            },
                            "end": {
                                "line": 7,
                                "column": 9
                            }
                        }
                    },
                    "async": false,
                    "generator": true,
                    "expression": false,
                    "id": {
                        "type": "Identifier",
                        "name": "f3",
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
                    "start": 0,
                    "end": 116,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 7,
                            "column": 9
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 116,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 7,
                    "column": 9
                }
            }
        });
      });
  
      it('should parse yield expressions in parameters if it is inside of a nested generator', () => {
          expect(parseScript(`function* foo(a = function*(b) { yield b }) { }`, {
              ranges: true,
              locations: true,
              raw: true
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
              "body": [{
                  "type": "FunctionDeclaration",
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
                      "name": "foo"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "AssignmentPattern",
                      "start": 14,
                      "end": 42,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 14
                          },
                          "end": {
                              "line": 1,
                              "column": 42
                          }
                      },
                      "left": {
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
                          "name": "a"
                      },
                      "right": {
                          "type": "FunctionExpression",
                          "start": 18,
                          "end": 42,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 18
                              },
                              "end": {
                                  "line": 1,
                                  "column": 42
                              }
                          },
                          "id": null,
                          "generator": true,
                          "expression": false,
                          "async": false,
                          "params": [{
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
                          }],
                          "body": {
                              "type": "BlockStatement",
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
                              },
                              "body": [{
                                  "type": "ExpressionStatement",
                                  "start": 33,
                                  "end": 40,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 33
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 40
                                      }
                                  },
                                  "expression": {
                                      "type": "YieldExpression",
                                      "start": 33,
                                      "end": 40,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 33
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 40
                                          }
                                      },
                                      "delegate": false,
                                      "argument": {
                                          "type": "Identifier",
                                          "start": 39,
                                          "end": 40,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 39
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 40
                                              }
                                          },
                                          "name": "b"
                                      }
                                  }
                              }]
                          }
                      }
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "start": 44,
                      "end": 47,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 44
                          },
                          "end": {
                              "line": 1,
                              "column": 47
                          }
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse yield expression with regular expression', () => {
          expect(parseScript(`function* bar() { yield /re/ }`, {
              ranges: true,
              locations: true,
              raw: true
          })).to.eql({
              "type": "Program",
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
              },
              "body": [{
                  "type": "FunctionDeclaration",
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
                  },
                  "id": {
                      "type": "Identifier",
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
                      "name": "bar"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
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
                      "body": [{
                          "type": "ExpressionStatement",
                          "start": 18,
                          "end": 28,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 18
                              },
                              "end": {
                                  "line": 1,
                                  "column": 28
                              }
                          },
                          "expression": {
                              "type": "YieldExpression",
                              "start": 18,
                              "end": 28,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 28
                                  }
                              },
                              "delegate": false,
                              "argument": {
                                  "type": "Literal",
                                  "start": 24,
                                  "end": 28,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 24
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 28
                                      }
                                  },
                                  "value": /re/,
                                  "raw": "/re/",
                                  "regex": {
                                      "pattern": "re",
                                      "flags": ""
                                  }
                              }
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should distinguish parenthesized expression or arrow function expression', () => {
          expect(parseScript('function* wrap() {\n(a = yield b)\n}', {
              ranges: true
          })).to.eql({
              "body": [{
                  "async": false,
                  "body": {
                      "body": [{
                          "end": 32,
                          "expression": {
                              "end": 31,
                              "left": {
                                  "end": 21,
                                  "name": "a",
                                  "start": 20,
                                  "type": "Identifier"
                              },
                              "operator": "=",
                              "right": {
                                  "argument": {
                                      "end": 31,
                                      "name": "b",
                                      "start": 30,
                                      "type": "Identifier"
                                  },
                                  "delegate": false,
                                  "end": 31,
                                  "start": 24,
                                  "type": "YieldExpression"
                              },
                              "start": 20,
                              "type": "AssignmentExpression"
                          },
                          "start": 19,
                          "type": "ExpressionStatement"
                      }, ],
                      "end": 34,
                      "start": 17,
                      "type": "BlockStatement"
                  },
                  "end": 34,
                  "expression": false,
                  "generator": true,
                  "id": {
                      "end": 14,
                      "name": "wrap",
                      "start": 10,
                      "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
              }],
              "end": 34,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });

      it('should  Distinguish ParenthesizedExpression or ArrowFunctionExpression', () => {
        expect(parseScript('function *f() { yield\n{}/1/g\n}', {
            ranges: true
        })).to.eql({
              "body": [
                {
                  "async": false,
                  "body": {
                    "body": [
                      {
                        "end": 21,
                        "expression": {
                         "argument": null,
                          "delegate": false,
                          "end": 21,
                          "start": 16,
                          "type": "YieldExpression"
                        },
                       "start": 16,
                        "type": "ExpressionStatement"
                      },
                     {
                        "body": [],
                        "end": 24,
                        "start": 22,
                        "type": "BlockStatement"
                      },
                      {
                        "end": 28,
                        "expression": {
                          "end": 28,
                         "regex": {
                            "flags": "g",
                            "pattern": "1",
                          },
                          "start": 24,
                          "type": "Literal",
                          "value": /1/g,
                        },
                        "start": 24,
                        "type": "ExpressionStatement",
                      },
                    ],
                    "end": 30,
                    "start": 14,
                    "type": "BlockStatement",
                  },
                  "end": 30,
                  "expression": false,
                 "generator": true,
                  "id": {
                    "end": 11,
                    "name": "f",
                    "start": 10,
                    "type": "Identifier",
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration",
                },
              ],
              "end": 30,
              "sourceType": "script",
              "start": 0,
              "type": "Program",
            });
    });
    
      it('should  Distinguish ParenthesizedExpression or ArrowFunctionExpression', () => {
          expect(parseScript('function* wrap() {\n({a = yield b} = obj)\n}', {
              ranges: true
          })).to.eql({
              "body": [{
                  "async": false,
                  "body": {
                      "body": [{
                          "end": 40,
                          "expression": {
                              "end": 39,
                              "left": {
                                  "end": 33,
                                  "properties": [{
                                      "computed": false,
                                      "end": 32,
                                      "key": {
                                          "end": 22,
                                          "name": "a",
                                          "start": 21,
                                          "type": "Identifier"
                                      },
                                      "kind": "init",
                                      "method": false,
                                      "shorthand": true,
                                      "start": 21,
                                      "type": "Property",
                                      "value": {
                                          "end": 32,
                                          "left": {
                                              "end": 22,
                                              "name": "a",
                                              "start": 21,
                                              "type": "Identifier"
                                          },
                                          "right": {
                                              "argument": {
                                                  "end": 32,
                                                  "name": "b",
                                                  "start": 31,
                                                  "type": "Identifier",
                                              },
                                              "delegate": false,
                                              "end": 32,
                                              "start": 25,
                                              "type": "YieldExpression",
                                          },
                                          "start": 21,
                                          "type": "AssignmentPattern"
                                      },
                                  }],
                                  "start": 20,
                                  "type": "ObjectPattern"
                              },
                              "operator": "=",
                              "right": {
                                  "end": 39,
                                  "name": "obj",
                                  "start": 36,
                                  "type": "Identifier"
                              },
                              "start": 20,
                              "type": "AssignmentExpression"
                          },
                          "start": 19,
                          "type": "ExpressionStatement"
                      }],
                      "end": 42,
                      "start": 17,
                      "type": "BlockStatement"
                  },
                  "end": 42,
                  "expression": false,
                  "generator": true,
                  "id": {
                      "end": 14,
                      "name": "wrap",
                      "start": 10,
                      "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
              }, ],
              "end": 42,
              "sourceType": "script",
              "start": 0,
              "type": "Program",
          });
      });
  
      it('should parse yield expressions inside functions in default parameters', () => {
          expect(parseScript('function* foo(a = class {*bar() { yield b }}) {}', {
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
                      "name": "foo"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "AssignmentPattern",
                      "start": 14,
                      "end": 44,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 14
                          },
                          "end": {
                              "line": 1,
                              "column": 44
                          }
                      },
                      "left": {
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
                          "name": "a"
                      },
                      "right": {
                          "type": "ClassExpression",
                          "start": 18,
                          "end": 44,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 18
                              },
                              "end": {
                                  "line": 1,
                                  "column": 44
                              }
                          },
                          "id": null,
                          "superClass": null,
                          "body": {
                              "type": "ClassBody",
                              "start": 24,
                              "end": 44,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 24
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 44
                                  }
                              },
                              "body": [{
                                  "type": "MethodDefinition",
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
                                  },
                                  "computed": false,
                                  "key": {
                                      "type": "Identifier",
                                      "start": 26,
                                      "end": 29,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 26
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 29
                                          }
                                      },
                                      "name": "bar"
                                  },
                                  "static": false,
                                  "kind": "method",
                                  "value": {
                                      "type": "FunctionExpression",
                                      "start": 29,
                                      "end": 43,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 29
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 43
                                          }
                                      },
                                      "id": null,
                                      "generator": true,
                                      "expression": false,
                                      "async": false,
                                      "params": [],
                                      "body": {
                                          "type": "BlockStatement",
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
                                          "body": [{
                                              "type": "ExpressionStatement",
                                              "start": 34,
                                              "end": 41,
                                              "loc": {
                                                  "start": {
                                                      "line": 1,
                                                      "column": 34
                                                  },
                                                  "end": {
                                                      "line": 1,
                                                      "column": 41
                                                  }
                                              },
                                              "expression": {
                                                  "type": "YieldExpression",
                                                  "start": 34,
                                                  "end": 41,
                                                  "loc": {
                                                      "start": {
                                                          "line": 1,
                                                          "column": 34
                                                      },
                                                      "end": {
                                                          "line": 1,
                                                          "column": 41
                                                      }
                                                  },
                                                  "delegate": false,
                                                  "argument": {
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
                                                      "name": "b"
                                                  }
                                              }
                                          }]
                                      }
                                  }
                              }]
                          }
                      }
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "start": 46,
                      "end": 48,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 46
                          },
                          "end": {
                              "line": 1,
                              "column": 48
                          }
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse yield expressions inside functions in default parameters', () => {
          expect(parseScript('function* foo(a = function* foo() { yield b }) {}', {
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
              "body": [{
                  "type": "FunctionDeclaration",
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
                      "name": "foo"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "AssignmentPattern",
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
                      },
                      "left": {
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
                          "name": "a"
                      },
                      "right": {
                          "type": "FunctionExpression",
                          "start": 18,
                          "end": 45,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 18
                              },
                              "end": {
                                  "line": 1,
                                  "column": 45
                              }
                          },
                          "id": {
                              "type": "Identifier",
                              "start": 28,
                              "end": 31,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 28
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 31
                                  }
                              },
                              "name": "foo"
                          },
                          "generator": true,
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
                              "body": [{
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
                                      "type": "YieldExpression",
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
                                      "delegate": false,
                                      "argument": {
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
                                          "name": "b"
                                      }
                                  }
                              }]
                          }
                      }
                  }],
                  "body": {
                      "type": "BlockStatement",
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
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse ternary yield', () => {
          expect(parseScript('function* g(){ x ? yield : y }', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
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
              },
              "body": [{
                  "type": "FunctionDeclaration",
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
                  },
                  "id": {
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
                      "name": "g"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 30,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 30
                          }
                      },
                      "body": [{
                          "type": "ExpressionStatement",
                          "start": 15,
                          "end": 28,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 15
                              },
                              "end": {
                                  "line": 1,
                                  "column": 28
                              }
                          },
                          "expression": {
                              "type": "ConditionalExpression",
                              "start": 15,
                              "end": 28,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 28
                                  }
                              },
                              "test": {
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
                                  "name": "x"
                              },
                              "consequent": {
                                  "type": "YieldExpression",
                                  "start": 19,
                                  "end": 24,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 19
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 24
                                      }
                                  },
                                  "delegate": false,
                                  "argument": null
                              },
                              "alternate": {
                                  "type": "Identifier",
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
                                  "name": "y"
                              }
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse yield arg array', () => {
          expect(parseScript('function *g() { yield [x] }', {
              ranges: true
          })).to.eql({
              "body": [{
                  "body": {
                      "body": [{
                          "end": 25,
                          "expression": {
                              "argument": {
                                  "elements": [{
                                      "end": 24,
                                      "name": "x",
                                      "start": 23,
                                      "type": "Identifier"
                                  }],
                                  "end": 25,
                                  "start": 22,
                                  "type": "ArrayExpression"
                              },
                              "delegate": false,
                              "end": 25,
                              "start": 16,
                              "type": "YieldExpression"
                          },
                          "start": 16,
                          "type": "ExpressionStatement"
                      }],
                      "end": 27,
                      "start": 14,
                      "type": "BlockStatement"
                  },
                  "end": 27,
                  "expression": false,
                  "generator": true,
                  "async": false,
                  "id": {
                      "end": 11,
                      "name": "g",
                      "start": 10,
                      "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
              }],
              "end": 27,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse yield arg bitnot', () => {
          expect(parseScript('function *g() { yield ~x }')).to.eql({
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
                              "argument": {
                                  "type": "UnaryExpression",
                                  "operator": "~",
                                  "argument": {
                                      "type": "Identifier",
                                      "name": "x"
                                  },
                                  "prefix": true
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

      it('should parse yield arg class', () => {
          expect(parseScript('function *g() { yield class x {} }')).to.eql({
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
                              "argument": {
                                  "type": "ClassExpression",
                                  "id": {
                                      "type": "Identifier",
                                      "name": "x"
                                  },
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
  
      it('should parse yield arg delete', () => {
          expect(parseScript('function *g() { yield delete x }', {
              ranges: true
          })).to.eql({
              "body": [{
                  "body": {
                      "body": [{
                          "end": 30,
                          "expression": {
                              "argument": {
                                  "argument": {
                                      "end": 30,
                                      "name": "x",
                                      "start": 29,
                                      "type": "Identifier"
                                  },
                                  "end": 30,
                                  "operator": "delete",
                                  "prefix": true,
                                  "start": 22,
                                  "type": "UnaryExpression"
                              },
                              "delegate": false,
                              "end": 30,
                              "start": 16,
                              "type": "YieldExpression"
                          },
                          "start": 16,
                          "type": "ExpressionStatement"
                      }],
                      "end": 32,
                      "start": 14,
                      "type": "BlockStatement"
                  },
                  "end": 32,
                  "expression": false,
                  "generator": true,
                  "async": false,
                  "id": {
                      "end": 11,
                      "name": "g",
                      "start": 10,
                      "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
              }],
              "end": 32,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
  
      });
  
      it('should parse yield arg function', () => {
          expect(parseScript('function *g() { yield function(){} }', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 36,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 36
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 36,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 36
                  }
                },
                "id": {
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
                  "name": "g"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 14,
                  "end": 36,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 36
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 16,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "expression": {
                        "type": "YieldExpression",
                        "start": 16,
                        "end": 34,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 34
                          }
                        },
                        "delegate": false,
                        "argument": {
                          "type": "FunctionExpression",
                          "start": 22,
                          "end": 34,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 22
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
                            },
                            "body": []
                          }
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
  
      it('should parse yield arg group', () => {
          expect(parseScript('function *g() { yield (x) }', {
              ranges: true
          })).to.eql({
              "body": [{
                  "body": {
                      "body": [{
                          "end": 25,
                          "expression": {
                              "argument": {
                                  "end": 24,
                                  "name": "x",
                                  "start": 23,
                                  "type": "Identifier"
                              },
                              "delegate": false,
                              "end": 25,
                              "start": 16,
                              "type": "YieldExpression"
                          },
                          "start": 16,
                          "type": "ExpressionStatement"
                      }],
                      "end": 27,
                      "start": 14,
                      "type": "BlockStatement"
                  },
                  "end": 27,
                  "expression": false,
                  "generator": true,
                  "async": false,
                  "id": {
                      "end": 11,
                      "name": "g",
                      "start": 10,
                      "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
              }],
              "end": 27,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse yield arg let', () => {
          expect(parseScript('function *g() { yield let }')).to.eql({
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
                              "argument": {
                                  "type": "Identifier",
                                  "name": "let"
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
  
  
      it('should parse yield arg minus', () => {
          expect(parseScript('function *g() { yield -x }')).to.eql({
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
                              "argument": {
                                  "type": "UnaryExpression",
                                  "operator": "-",
                                  "argument": {
                                      "type": "Identifier",
                                      "name": "x"
                                  },
                                  "prefix": true
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
  
      it('should parse yield arg minus minus', () => {
          expect(parseScript('function *g() { yield --x }')).to.eql({
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
                              "argument": {
                                  "type": "UpdateExpression",
                                  "operator": "--",
                                  "argument": {
                                      "type": "Identifier",
                                      "name": "x"
                                  },
                                  "prefix": true
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
  
      it('should parse yield arg new', () => {
          expect(parseScript('function *g() { yield new X() }', {
              ranges: true,
              raw: true,
          })).to.eql({
              "body": [{
                  "body": {
                      "body": [{
                          "end": 29,
                          "expression": {
                              "argument": {
                                  "arguments": [],
                                  "callee": {
                                      "end": 27,
                                      "name": "X",
                                      "start": 26,
                                      "type": "Identifier"
                                  },
                                  "end": 29,
                                  "start": 22,
                                  "type": "NewExpression"
                              },
                              "delegate": false,
                              "end": 29,
                              "start": 16,
                              "type": "YieldExpression"
                          },
                          "start": 16,
                          "type": "ExpressionStatement"
                      }],
                      "end": 31,
                      "start": 14,
                      "type": "BlockStatement"
                  },
                  "end": 31,
                  "expression": false,
                  "generator": true,
                  "async": false,
                  "id": {
                      "end": 11,
                      "name": "g",
                      "start": 10,
                      "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
              }],
              "end": 31,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse yield arg not', () => {
          expect(parseScript('function *g() { yield !x }')).to.eql({
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
                              "argument": {
                                  "type": "UnaryExpression",
                                  "operator": "!",
                                  "argument": {
                                      "type": "Identifier",
                                      "name": "x"
                                  },
                                  "prefix": true
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
  
      it('should parse yield arg object', () => {
          expect(parseScript('function *g() { yield {x} }')).to.eql({
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
                              "argument": {
                                  "type": "ObjectExpression",
                                  "properties": [{
                                      "type": "Property",
                                      "key": {
                                          "type": "Identifier",
                                          "name": "x"
                                      },
                                      "computed": false,
                                      "value": {
                                          "type": "Identifier",
                                          "name": "x"
                                      },
                                      "kind": "init",
                                      "method": false,
                                      "shorthand": true
                                  }]
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
  
      it('should parse yield arg plus', () => {
          expect(parseScript('function *g() { yield +x }')).to.eql({
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
                              "argument": {
                                  "type": "UnaryExpression",
                                  "operator": "+",
                                  "argument": {
                                      "type": "Identifier",
                                      "name": "x"
                                  },
                                  "prefix": true
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
  
      it('should parse yield arg plus plus', () => {
          expect(parseScript('function *g() { yield ++x }')).to.eql({
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
                              "argument": {
                                  "type": "UpdateExpression",
                                  "operator": "++",
                                  "argument": {
                                      "type": "Identifier",
                                      "name": "x"
                                  },
                                  "prefix": true
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
  
      it('should parse yield arg plus', () => {
          expect(parseScript('function *g() { yield +x }')).to.eql({
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
                              "argument": {
                                  "type": "UnaryExpression",
                                  "operator": "+",
                                  "argument": {
                                      "type": "Identifier",
                                      "name": "x"
                                  },
                                  "prefix": true
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
  
      it('should parse yield arg plus plus', () => {
          expect(parseScript('function *g() { yield ++x }')).to.eql({
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
                              "argument": {
                                  "type": "UpdateExpression",
                                  "operator": "++",
                                  "argument": {
                                      "type": "Identifier",
                                      "name": "x"
                                  },
                                  "prefix": true
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
  
      it('should parse yield array pattern', () => {
          expect(parseScript('([yield] = x)')).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "AssignmentExpression",
                      "operator": "=",
                      "left": {
                          "type": "ArrayPattern",
                          "elements": [{
                              "type": "Identifier",
                              "name": "yield"
                          }]
                      },
                      "right": {
                          "type": "Identifier",
                          "name": "x"
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse yield expression precedence', () => {
          expect(parseScript('function *g() { yield a=b, yield* c=d, e }', {
              ranges: true,
              raw: true
          })).to.eql({
              "body": [{
                  "body": {
                      "body": [{
                          "end": 40,
                          "expression": {
                              "end": 40,
                              "expressions": [{
                                      "argument": {
                                          "end": 25,
                                          "left": {
                                              "end": 23,
                                              "name": "a",
                                              "start": 22,
                                              "type": "Identifier"
                                          },
                                          "operator": "=",
                                          "right": {
                                              "end": 25,
                                              "name": "b",
                                              "start": 24,
                                              "type": "Identifier"
                                          },
                                          "start": 22,
                                          "type": "AssignmentExpression"
                                      },
                                      "delegate": false,
                                      "end": 25,
                                      "start": 16,
                                      "type": "YieldExpression"
                                  },
                                  {
                                      "argument": {
                                          "end": 37,
                                          "left": {
                                              "end": 35,
                                              "name": "c",
                                              "start": 34,
                                              "type": "Identifier"
                                          },
                                          "operator": "=",
                                          "right": {
                                              "end": 37,
                                              "name": "d",
                                              "start": 36,
                                              "type": "Identifier"
                                          },
                                          "start": 34,
                                          "type": "AssignmentExpression"
                                      },
                                      "delegate": true,
                                      "end": 37,
                                      "start": 27,
                                      "type": "YieldExpression"
                                  },
                                  {
                                      "end": 40,
                                      "name": "e",
                                      "start": 39,
                                      "type": "Identifier"
                                  }
                              ],
                              "start": 16,
                              "type": "SequenceExpression"
                          },
                          "start": 16,
                          "type": "ExpressionStatement"
                      }],
                      "end": 42,
                      "start": 14,
                      "type": "BlockStatement"
                  },
                  "end": 42,
                  "expression": false,
                  "generator": true,
                  "async": false,
                  "id": {
                      "end": 11,
                      "name": "g",
                      "start": 10,
                      "type": "Identifier"
                  },
                  "params": [],
                  "start": 0,
                  "type": "FunctionDeclaration"
              }],
              "end": 42,
              "sourceType": "script",
              "start": 0,
              "type": "Program"
          });
      });
  
      it('should parse yield function expression', () => {
          expect(parseScript('(function yield(){})')).to.eql({
              "type": "Program",
              "body": [{
                  "type": "ExpressionStatement",
                  "expression": {
                      "type": "FunctionExpression",
                      "id": {
                          "type": "Identifier",
                          "name": "yield"
                      },
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "body": []
                      },
                      "generator": false,
                      "expression": false,
                      "async": false
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse yield generator declaration', () => {
          expect(parseScript('function *yield(){}')).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "yield"
                  },
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": []
                  },
                  "generator": true,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse yield parameter object pattern', () => {
          expect(parseScript('function f({yield: y}){}')).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "f"
                  },
                  "params": [{
                      "type": "ObjectPattern",
                      "properties": [{
                          "type": "Property",
                          "key": {
                              "type": "Identifier",
                              "name": "yield"
                          },
                          "computed": false,
                          "value": {
                              "type": "Identifier",
                              "name": "y"
                          },
                          "kind": "init",
                          "method": false,
                          "shorthand": false
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
  
      it('should parse yield yield expression', () => {
          expect(parseScript('function *g() { yield yield }', {
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
                      "name": "g"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
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
                      "body": [{
                          "type": "ExpressionStatement",
                          "start": 16,
                          "end": 27,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 16
                              },
                              "end": {
                                  "line": 1,
                                  "column": 27
                              }
                          },
                          "expression": {
                              "type": "YieldExpression",
                              "start": 16,
                              "end": 27,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 16
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 27
                                  }
                              },
                              "delegate": false,
                              "argument": {
                                  "type": "YieldExpression",
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
                                  },
                                  "delegate": false,
                                  "argument": null
                              }
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function*a(){yield\na}"', () => {
          expect(parseScript('function*a(){yield\na}')).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "a"
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
                          },
                          {
                              "type": "ExpressionStatement",
                              "expression": {
                                  "type": "Identifier",
                                  "name": "a"
                              }
                          }
                      ]
                  },
                  "generator": true,
                  "expression": false,
                  "async": false
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function *a(){yield-0}"', () => {
          expect(parseScript('function *a(){yield-0}')).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [{
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "YieldExpression",
                              "argument": {
                                  "type": "UnaryExpression",
                                  "operator": "-",
                                  "argument": {
                                      "type": "Literal",
                                      "value": 0
                                  },
                                  "prefix": true
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
  
      it('should parse "function *a(){yield delete 0}"', () => {
          expect(parseScript('function *a(){yield delete 0}')).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [{
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "YieldExpression",
                              "argument": {
                                  "type": "UnaryExpression",
                                  "operator": "delete",
                                  "argument": {
                                      "type": "Literal",
                                      "value": 0
                                  },
                                  "prefix": true
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
  
      it('should parse "function *a(){yield 2e308}"', () => {
          expect(parseScript('function *a(){yield 2e308}')).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [{
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "YieldExpression",
                              "argument": {
                                  "type": "Literal",
                                  "value": Infinity
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
  
      it('should parse "function *a(){yield(0)}"', () => {
          expect(parseScript('function *a(){yield(0)}')).to.eql({
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "id": {
                      "type": "Identifier",
                      "name": "a"
                  },
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [{
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "YieldExpression",
                              "argument": {
                                  "type": "Literal",
                                  "value": 0
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
  
      it('should parse "function* g(){ a ? yield : b; }"', () => {
          expect(parseScript('function* g(){ a ? yield : b; }', {
              ranges: true,
              locations: true,
              raw: true
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
                      "name": "g"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 31,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 31
                          }
                      },
                      "body": [{
                          "type": "ExpressionStatement",
                          "start": 15,
                          "end": 29,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 15
                              },
                              "end": {
                                  "line": 1,
                                  "column": 29
                              }
                          },
                          "expression": {
                              "type": "ConditionalExpression",
                              "start": 15,
                              "end": 28,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 28
                                  }
                              },
                              "test": {
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
                              "consequent": {
                                  "type": "YieldExpression",
                                  "start": 19,
                                  "end": 24,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 19
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 24
                                      }
                                  },
                                  "delegate": false,
                                  "argument": null
                              },
                              "alternate": {
                                  "type": "Identifier",
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
                                  "name": "b"
                              }
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function*a(){yield*a}"', () => {
          expect(parseScript('function*a(){yield*a}', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
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
              },
              "body": [{
                  "type": "FunctionDeclaration",
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
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 12,
                      "end": 21,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 12
                          },
                          "end": {
                              "line": 1,
                              "column": 21
                          }
                      },
                      "body": [{
                          "type": "ExpressionStatement",
                          "start": 13,
                          "end": 20,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 13
                              },
                              "end": {
                                  "line": 1,
                                  "column": 20
                              }
                          },
                          "expression": {
                              "type": "YieldExpression",
                              "start": 13,
                              "end": 20,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 13
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 20
                                  }
                              },
                              "delegate": true,
                              "argument": {
                                  "type": "Identifier",
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
                                  "name": "a"
                              }
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          });
      });
  
  
      it('should parse "(function () { yield* 10 })"', () => {
          expect(parseScript('(function () { yield* 10 })', {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
              "type": "Program",
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
              },
              "body": [{
                  "type": "ExpressionStatement",
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
                  },
                  "expression": {
                      "type": "FunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
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
                          "body": [{
                              "type": "ExpressionStatement",
                              "start": 15,
                              "end": 24,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 24
                                  }
                              },
                              "expression": {
                                  "type": "BinaryExpression",
                                  "start": 15,
                                  "end": 24,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 15
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 24
                                      }
                                  },
                                  "left": {
                                      "type": "Identifier",
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
                                      },
                                      "name": "yield"
                                  },
                                  "operator": "*",
                                  "right": {
                                      "type": "Literal",
                                      "start": 22,
                                      "end": 24,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 22
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 24
                                          }
                                      },
                                      "value": 10,
                                      "raw": "10"
                                  }
                              }
                          }]
                      }
                  }
              }],
              "sourceType": "script"
          });
      });
  
      it('should parse "function* foo(a = function*(b) { yield b }) { }"', () => {
          expect(parseScript('function* foo(a = function*(b) { yield b }) { }', {
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
              "body": [{
                  "type": "FunctionDeclaration",
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
                      "name": "foo"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "AssignmentPattern",
                      "start": 14,
                      "end": 42,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 14
                          },
                          "end": {
                              "line": 1,
                              "column": 42
                          }
                      },
                      "left": {
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
                          "name": "a"
                      },
                      "right": {
                          "type": "FunctionExpression",
                          "start": 18,
                          "end": 42,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 18
                              },
                              "end": {
                                  "line": 1,
                                  "column": 42
                              }
                          },
                          "id": null,
                          "generator": true,
                          "expression": false,
                          "async": false,
                          "params": [{
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
                          }],
                          "body": {
                              "type": "BlockStatement",
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
                              },
                              "body": [{
                                  "type": "ExpressionStatement",
                                  "start": 33,
                                  "end": 40,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 33
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 40
                                      }
                                  },
                                  "expression": {
                                      "type": "YieldExpression",
                                      "start": 33,
                                      "end": 40,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 33
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 40
                                          }
                                      },
                                      "delegate": false,
                                      "argument": {
                                          "type": "Identifier",
                                          "start": 39,
                                          "end": 40,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 39
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 40
                                              }
                                          },
                                          "name": "b"
                                      }
                                  }
                              }]
                          }
                      }
                  }],
                  "body": {
                      "type": "BlockStatement",
                      "start": 44,
                      "end": 47,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 44
                          },
                          "end": {
                              "line": 1,
                              "column": 47
                          }
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
  
      
      it('should parse "(function yield(){ \"use strict\"; })\n"', () => {
          expect(parseScript('(function yield(){ "use strict"; })')).to.eql({
              "body": [{
                  "expression": {
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
                          "name": "yield",
                          "type": "Identifier"
                      },
                      "params": [],
                      "type": "FunctionExpression"
                  },
                  "type": "ExpressionStatement"
              }],
              "sourceType": "script",
              "type": "Program"
          });
      });
  
      it('should parse yield as function name"', () => {
          expect(parseScript('function* yield() {}', {
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
                      },
                      "name": "yield"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
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
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });
      it('should parse parameter default inside arrow', () => {
          expect(parseScript(`(x = yield) => {}`, {
              ranges: true,
              raw: true
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
      it('should parse parameter default inside funtion', () => {
          expect(parseScript(`function fn(x = yield) {}`, {
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
              "body": [{
                  "type": "FunctionDeclaration",
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
                      "name": "fn"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [{
                      "type": "AssignmentPattern",
                      "start": 12,
                      "end": 21,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 12
                          },
                          "end": {
                              "line": 1,
                              "column": 21
                          }
                      },
                      "left": {
                          "type": "Identifier",
                          "start": 12,
                          "end": 13,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 12
                              },
                              "end": {
                                  "line": 1,
                                  "column": 13
                              }
                          },
                          "name": "x"
                      },
                      "right": {
                          "type": "Identifier",
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
                          },
                          "name": "yield"
                      }
                  }],
                  "body": {
                      "type": "BlockStatement",
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
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          });
      });

      it('should parse funtion name function expression', () => {
        expect(parseScript(`function* fn() {
              (function yield() {});
            } `, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 68,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 14
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 67,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 13
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
                  "end": 67,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 3,
                      "column": 13
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 31,
                      "end": 53,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 14
                        },
                        "end": {
                          "line": 2,
                          "column": 36
                        }
                      },
                      "expression": {
                        "type": "FunctionExpression",
                        "start": 32,
                        "end": 51,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 15
                          },
                          "end": {
                            "line": 2,
                            "column": 34
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 41,
                          "end": 46,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 24
                            },
                            "end": {
                              "line": 2,
                              "column": 29
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
                          "start": 49,
                          "end": 51,
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

    it('should parse funtion name function method', () => {
        expect(parseScript(`function* yield() {}`, {
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
            "body": [
              {
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
                  },
                  "name": "yield"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
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
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse funtion name function method', () => {
        expect(parseScript(`class A { yield() {} }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "ClassDeclaration",
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
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 10,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "computed": false,
                      "key": {
                        "type": "Identifier",
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
                        },
                        "name": "yield"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
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
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
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
  
      it('should parse funtion name function expression', () => {
        expect(parseScript(`function yield() {}`, {
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
            "body": [
              {
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
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 17
                    },
                    "end": {
                      "line": 1,
                      "column": 19
                    }
                  },
                  "body": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

      it('should parse funtion name function expression', () => {
          expect(parseScript(`+function yield() {}`, {
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
                  "type": "ExpressionStatement",
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
                  "expression": {
                      "type": "UnaryExpression",
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
                      "operator": "+",
                      "prefix": true,
                      "argument": {
                          "type": "FunctionExpression",
                          "start": 1,
                          "end": 20,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 1
                              },
                              "end": {
                                  "line": 1,
                                  "column": 20
                              }
                          },
                          "id": {
                              "type": "Identifier",
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
                              },
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
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 18
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 20
                                  }
                              },
                              "body": []
                          }
                      }
                  }
              }],
              "sourceType": "script"
          });
      });

      it('should parse function name inside function', () => {
        expect(parseScript(`function fn() { function yield() {} }`, {
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
                "type": "FunctionDeclaration",
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
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 14
                    },
                    "end": {
                      "line": 1,
                      "column": 37
                    }
                  },
                  "body": [
                    {
                      "type": "FunctionDeclaration",
                      "start": 16,
                      "end": 35,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 35
                        }
                      },
                      "id": {
                        "type": "Identifier",
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
                        },
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
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 33
                          },
                          "end": {
                            "line": 1,
                            "column": 35
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

     
    it('should parse function name generator method', () => {
        expect(parseScript(`function* foo() { console.log(yield); }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "FunctionDeclaration",
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
                },
                "id": {
                  "type": "Identifier",
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
                  "name": "foo"
                },
                "generator": true,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 16,
                  "end": 39,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 16
                    },
                    "end": {
                      "line": 1,
                      "column": 39
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 18,
                      "end": 37,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 37
                        }
                      },
                      "expression": {
                        "type": "CallExpression",
                        "start": 18,
                        "end": 36,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 18
                          },
                          "end": {
                            "line": 1,
                            "column": 36
                          }
                        },
                        "callee": {
                          "type": "MemberExpression",
                          "start": 18,
                          "end": 29,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 29
                            }
                          },
                          "object": {
                            "type": "Identifier",
                            "start": 18,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 18
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            },
                            "name": "console"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 26,
                            "end": 29,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 26
                              },
                              "end": {
                                "line": 1,
                                "column": 29
                              }
                            },
                            "name": "log"
                          },
                          "computed": false
                        },
                        "arguments": [
                          {
                            "type": "YieldExpression",
                            "start": 30,
                            "end": 35,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 30
                              },
                              "end": {
                                "line": 1,
                                "column": 35
                              }
                            },
                            "delegate": false,
                            "argument": null
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });
    
        it('should parse function name generator method', () => {
            expect(parseScript(`var x = {*[test]() { yield *v; }}`, {
                ranges: true,
                raw: true,
                locations: true
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
                    "body": [
                      {
                        "type": "VariableDeclaration",
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
                        "declarations": [
                          {
                            "type": "VariableDeclarator",
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
                            },
                            "id": {
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
                              "name": "x"
                            },
                            "init": {
                              "type": "ObjectExpression",
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
                              },
                              "properties": [
                                {
                                  "type": "Property",
                                  "start": 9,
                                  "end": 32,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 9
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 32
                                    }
                                  },
                                  "method": true,
                                  "shorthand": false,
                                  "computed": true,
                                  "key": {
                                    "type": "Identifier",
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
                                    "name": "test"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "FunctionExpression",
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
                                    },
                                    "id": null,
                                    "generator": true,
                                    "expression": false,
                                    "async": false,
                                    "params": [],
                                    "body": {
                                      "type": "BlockStatement",
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
                                      },
                                      "body": [
                                        {
                                          "type": "ExpressionStatement",
                                          "start": 21,
                                          "end": 30,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 21
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 30
                                            }
                                          },
                                          "expression": {
                                            "type": "YieldExpression",
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
                                            "delegate": true,
                                            "argument": {
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
                                              "name": "v"
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
                        "kind": "var"
                      }
                    ],
                    "sourceType": "script"
                  });
        });

        it('should parse function name generator method', () => {
            expect(parseScript(`function* foo(a = {*bar() { yield b }}) {}`, {
                ranges: true,
                raw: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 42,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 42
                  }
                },
                "body": [
                  {
                    "type": "FunctionDeclaration",
                    "start": 0,
                    "end": 42,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 42
                      }
                    },
                    "id": {
                      "type": "Identifier",
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
                      "name": "foo"
                    },
                    "generator": true,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "AssignmentPattern",
                        "start": 14,
                        "end": 38,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 14
                          },
                          "end": {
                            "line": 1,
                            "column": 38
                          }
                        },
                        "left": {
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
                          "name": "a"
                        },
                        "right": {
                          "type": "ObjectExpression",
                          "start": 18,
                          "end": 38,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 18
                            },
                            "end": {
                              "line": 1,
                              "column": 38
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 19,
                              "end": 37,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 19
                                },
                                "end": {
                                  "line": 1,
                                  "column": 37
                                }
                              },
                              "method": true,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
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
                                "name": "bar"
                              },
                              "kind": "init",
                              "value": {
                                "type": "FunctionExpression",
                                "start": 23,
                                "end": 37,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 23
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 37
                                  }
                                },
                                "id": null,
                                "generator": true,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 26,
                                  "end": 37,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 26
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 37
                                    }
                                  },
                                  "body": [
                                    {
                                      "type": "ExpressionStatement",
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
                                      },
                                      "expression": {
                                        "type": "YieldExpression",
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
                                        },
                                        "delegate": false,
                                        "argument": {
                                          "type": "Identifier",
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
                                          "name": "b"
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
                    "body": {
                      "type": "BlockStatement",
                      "start": 40,
                      "end": 42,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 40
                        },
                        "end": {
                          "line": 1,
                          "column": 42
                        }
                      },
                      "body": []
                    }
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse function name generator method', () => {
        expect(parseScript(`class A { *yield() {} }`, {
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
            "body": [
              {
                "type": "ClassDeclaration",
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
                  "end": 23,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 23
                    }
                  },
                  "body": [
                    {
                      "type": "MethodDefinition",
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
                      "computed": false,
                      "key": {
                        "type": "Identifier",
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
                        },
                        "name": "yield"
                      },
                      "static": false,
                      "kind": "method",
                      "value": {
                        "type": "FunctionExpression",
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
                        },
                        "id": null,
                        "generator": true,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
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
  
      it('should parse function name function expression inside generator', () => {
          expect(parseScript(`function* fn() {
          (function yield() {});
        }`, {
              ranges: true,
              raw: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 59,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 3,
                "column": 9
              }
            },
            "body": [
              {
                "type": "FunctionDeclaration",
                "start": 0,
                "end": 59,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 3,
                    "column": 9
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
                  "end": 59,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 15
                    },
                    "end": {
                      "line": 3,
                      "column": 9
                    }
                  },
                  "body": [
                    {
                      "type": "ExpressionStatement",
                      "start": 27,
                      "end": 49,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 10
                        },
                        "end": {
                          "line": 2,
                          "column": 32
                        }
                      },
                      "expression": {
                        "type": "FunctionExpression",
                        "start": 28,
                        "end": 47,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 11
                          },
                          "end": {
                            "line": 2,
                            "column": 30
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 37,
                          "end": 42,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 20
                            },
                            "end": {
                              "line": 2,
                              "column": 25
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
                          "start": 45,
                          "end": 47,
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
  
  });