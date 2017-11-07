import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statements - do-while', () => {

    it('should fail on expression if do-while IterationStatement is bracketed with braces`', () => {
        expect(() => {
            parseScript(`do break; while 1;`);
        }).to.throw();
    });

    it('should fail if async function declaration is in statement position`', () => {
        expect(() => {
            parseScript(`do async function f() {} while (false)`);
        }).to.throw();
    });

    it('should fail if async function declaration is in statement position`', () => {
        expect(() => {
            parseScript(`do async function f() {} while (false)`);
        }).to.throw();
    });

    it('should fail on do without while', () => {
        expect(() => {
            parseScript(`do abc`);
        }).to.throw();
    });

    it('should fail on do continue', () => {
        expect(() => {
            parseScript(`do continue`);
        }).to.throw();
    });

    it('should fail on labelled function statement', () => {
        expect(() => {
            parseScript(`do label1: label2: function f() {} while (false)`);
        }).to.throw();
    });

    it('should fail if expression in do-while iteration statement bracketed with braces', () => {
        expect(() => {
            parseScript(`do break; while true;`);
        }).to.throw();
    });

    it('should fail if a statement within do-while is not compound`', () => {
        expect(() => {
            parseScript(`do var x=1; var y =2; while (0);`);
        }).to.throw();
    });

    it('should fail on a block within a do-while expression`', () => {
        expect(() => {
            parseScript(`do{ ; }while({0});`);
        }).to.throw();
    });

    it('should fail on expression in do-while IterationStatement bracketed with braces (literal)`', () => {
        expect(() => {
            parseScript(`do break; while 'hood';`);
        }).to.throw();
    });

    it('should fail on expression in do-while IterationStatement bracketed with braces (empty)`', () => {
        expect(() => {
            parseScript(`do break; while '';`)
        }).to.throw();
    });

    it('should fail on \'while (false) let x;`', () => {
        expect(() => {
            parseScript(`do function f() {} while (false)`)
        }).to.throw();
    });

    it('should fail on unknown label', () => {
        expect(() => {
            parseScript(`label:
            do {
               continue label1;
            } while (i < 5);`)
        }).to.throw();
    });

    it('should fail on generator declaration in statement position', () => {
        expect(() => {
            parseScript(`do function* g() {} while (false)`);
        }).to.throw();
    });

    it('should fail on generator declaration in statement position', () => {
        expect(() => {
            parseScript(`do function* g() {} while (false)`)
        }).to.throw();
    });

    it('should fail on function declaration in statement position', () => {
        expect(() => {
            parseScript(`do function f() {} while (false)`)
        }).to.throw();
    });

    it('should fail on async function declaration in statement position', () => {
        expect(() => {
            parseScript(`do async function f() {} while (false)`);
        }).to.throw();
    });

    it('should fail on async generator declaration in statement position', () => {
        expect(() => {
            parseScript(`do async function* g() {} while (false)`);
        }).to.throw();
    });

    it('should fail on async generator declaration in statement position', () => {
        expect(() => {
            parseScript(`do async function* g() {} while (false)`, {
                next: true
            });
        }).to.throw();
    });

    it('should fail on "while (false) let x;"', () => {
        expect(() => {
            parseScript(`do let [x] = 0 while (false);`);
        }).to.throw();
    });

    it('should fail on "while (false) let x;"', () => {
        expect(() => {
            parseScript(`do const x = null; while (false)`);
        }).to.throw();
    });

    it('should fail on "do class C {} while (false)"', () => {
        expect(() => {
            parseScript(`do class C {} while (false)`);
        }).to.throw();
    });

    it('should parse "while ( "" );"', () => {
        expect(parseScript('while ( "" );', {
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
                "type": "WhileStatement",
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
                "test": {
                  "type": "Literal",
                  "start": 8,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "value": "",
                  "raw": "\"\""
                },
                "body": {
                  "type": "EmptyStatement",
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
    
    it('should parse two do while statements', () => {
      expect(parseScript(`{ do { } while (false);false }`, {
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
        "body": [
          {
            "type": "BlockStatement",
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
            "body": [
              {
                "type": "DoWhileStatement",
                "start": 2,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 2
                  },
                  "end": {
                    "line": 1,
                    "column": 23
                  }
                },
                "body": {
                  "type": "BlockStatement",
                  "start": 5,
                  "end": 8,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 8
                    }
                  },
                  "body": []
                },
                "test": {
                  "type": "Literal",
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
                  "value": false,
                  "raw": "false"
                }
              },
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "Literal",
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
                  "value": false,
                  "raw": "false"
                }
              }
            ]
          }
        ],
        "sourceType": "script"
      });
    });
    
    it('should parse two do while statements', () => {
        expect(parseScript(`do continue; while(1);
        do continue; while(1);`, {
            ranges: true,
            locations: true,
            raw: true
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
                "line": 2,
                "column": 30
              }
            },
            "body": [
              {
                "type": "DoWhileStatement",
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
                "body": {
                  "type": "ContinueStatement",
                  "start": 3,
                  "end": 12,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 3
                    },
                    "end": {
                      "line": 1,
                      "column": 12
                    }
                  },
                  "label": null
                },
                "test": {
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
                  "value": 1,
                  "raw": "1"
                }
              },
              {
                "type": "DoWhileStatement",
                "start": 31,
                "end": 53,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 2,
                    "column": 30
                  }
                },
                "body": {
                  "type": "ContinueStatement",
                  "start": 34,
                  "end": 43,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 11
                    },
                    "end": {
                      "line": 2,
                      "column": 20
                    }
                  },
                  "label": null
                },
                "test": {
                  "type": "Literal",
                  "start": 50,
                  "end": 51,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 27
                    },
                    "end": {
                      "line": 2,
                      "column": 28
                    }
                  },
                  "value": 1,
                  "raw": "1"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "do continue; while(1);"', () => {
        expect(parseScript('do continue; while(1);')).to.eql({
            type: "Program",
            body: [{
                type: "DoWhileStatement",
                body: {
                    type: "ContinueStatement",
                    label: null,
                },
                test: {
                    type: "Literal",
                    value: 1,
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse "do {} while (true)"', () => {
        expect(parseScript('do {} while (true)')).to.eql({
            type: "Program",
            body: [{
                type: "DoWhileStatement",
                body: {
                    type: "BlockStatement",
                    body: [],
                },
                test: {
                    type: "Literal",
                    value: true,
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse "{do ; while(false); false}"', () => {
        expect(parseScript('{do ; while(false); false}', {
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
                "type": "BlockStatement",
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
                    "type": "DoWhileStatement",
                    "start": 1,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    },
                    "body": {
                      "type": "EmptyStatement",
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
                    "test": {
                      "type": "Literal",
                      "start": 12,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "value": false,
                      "raw": "false"
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 20,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 20
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "expression": {
                      "type": "Literal",
                      "start": 20,
                      "end": 25,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "value": false,
                      "raw": "false"
                    }
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "do keep(); while (true);"', () => {
      expect(parseScript('do keep(); while (true);', {
        ranges: true,
        raw: true,
        locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 24,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 24
          }
        },
        "body": [
          {
            "type": "DoWhileStatement",
            "start": 0,
            "end": 24,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 24
              }
            },
            "body": {
              "type": "ExpressionStatement",
              "start": 3,
              "end": 10,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 3
                },
                "end": {
                  "line": 1,
                  "column": 10
                }
              },
              "expression": {
                "type": "CallExpression",
                "start": 3,
                "end": 9,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 3
                  },
                  "end": {
                    "line": 1,
                    "column": 9
                  }
                },
                "callee": {
                  "type": "Identifier",
                  "start": 3,
                  "end": 7,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 3
                    },
                    "end": {
                      "line": 1,
                      "column": 7
                    }
                  },
                  "name": "keep"
                },
                "arguments": []
              }
            },
            "test": {
              "type": "Literal",
              "start": 18,
              "end": 22,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 18
                },
                "end": {
                  "line": 1,
                  "column": 22
                }
              },
              "value": true,
              "raw": "true"
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "do { x++; y--; } while (x < 10)"', () => {
      expect(parseScript('do { x++; y--; } while (x < 10)', {
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
            "type": "DoWhileStatement",
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
            "body": {
              "type": "BlockStatement",
              "start": 3,
              "end": 16,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 3
                },
                "end": {
                  "line": 1,
                  "column": 16
                }
              },
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 5,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "expression": {
                    "type": "UpdateExpression",
                    "start": 5,
                    "end": 8,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 5
                      },
                      "end": {
                        "line": 1,
                        "column": 8
                      }
                    },
                    "operator": "++",
                    "prefix": false,
                    "argument": {
                      "type": "Identifier",
                      "start": 5,
                      "end": 6,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 5
                        },
                        "end": {
                          "line": 1,
                          "column": 6
                        }
                      },
                      "name": "x"
                    }
                  }
                },
                {
                  "type": "ExpressionStatement",
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
                  },
                  "expression": {
                    "type": "UpdateExpression",
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
                    "operator": "--",
                    "prefix": false,
                    "argument": {
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
                      "name": "y"
                    }
                  }
                }
              ]
            },
            "test": {
              "type": "BinaryExpression",
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
              },
              "left": {
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
                "name": "x"
              },
              "operator": "<",
              "right": {
                "type": "Literal",
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
                "value": 10,
                "raw": "10"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "do ; while (true)"', () => {
        expect(parseScript('do ; while (true)')).to.eql({
            type: "Program",
            body: [{
                type: "DoWhileStatement",
                body: {
                    type: "EmptyStatement",
                },
                test: {
                    type: "Literal",
                    value: true,
                },
            }, ],
            sourceType: "script",
        });
    });
});