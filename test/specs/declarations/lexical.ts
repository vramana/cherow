import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Declarations - Lexical', () => {
  
    it('should fail on const declarations mixed: with, without initialiser', () => {
        expect(() => {
            parseScript(`l\\u0065t a;`);
        }).to.throw();
    });
    
    it('should fail on let newline await in normal function', () => {
        expect(() => {
            parseScript(`for (let [x = let];;) {}`);
          }).to.not.throw('');
    });

    it('should fail on let newline await in normal function', () => {
        expect(() => {
            parseScript(`function f() {
                let
                await 0;
            }`);
        }).to.throw();
    });

    it('should fail on const declarations mixed: with, without initialiser', () => {
        expect(() => {
            parseScript(`const x = 1, y;`);
        }).to.throw();
    });

    it('should fail on const with initializer in label statement', () => {
        expect(() => {
            parseScript(`label: const x = 1;`);
        }).to.throw();
    });

    it('should fail on const split across two lines', () => {
        expect(() => {
            parseScript(`const
        let = "irrelevant initializer";`);
        }).to.throw();
    });

    it('should fail on  const declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript(`for (;false;) const x = 1;`);
        }).to.throw();
    });

    it('should fail on const declarations without initialisers in statement positions', () => {
        expect(() => {
            parseScript(`for (;false;) const x;`);
        }).to.throw();
    });

    it('should fail on const declarations without initialisers in statement positions in switch statement', () => {
        expect(() => {
            parseScript(`switch (true) { case true: const x; }`);
        }).to.throw();
    });

    it('should fail on "const x = 0,"', () => {
        expect(() => {
            parseScript(`const x = 0,`);
        }).to.throw();
    });

    it('should fail on "const x = 0,"', () => {
        expect(() => {
            parseScript(`const x = 0,`);
        }).to.throw();
    });

    it('should fail on "const x = 0, y = 1,;"', () => {
        expect(() => {
            parseScript(`const x = 0, y = 1,;`);
        }).to.throw();
    });

    it('should fail on "let x,"', () => {
        expect(() => {
            parseScript(`let x,`);
        }).to.throw();
    });

    it('should fail on "let x,;"', () => {
        expect(() => {
            parseScript(`let x,;`);
        }).to.throw();
    });

    it('should fail on "let x, y, ;"', () => {
        expect(() => {
            parseScript(`let x, y, ;`);
        }).to.throw();
    });

    it('should fail on let: |let let| split across two lines', () => {
        expect(() => {
            parseScript(`let 
    let;`)
        }).to.throw();
    });

    it('should fail on const declarations mixed: with, without initialiser', () => {
        expect(() => {
            parseScript('const x = 1, y;')
        }).to.throw();
    });

    it('should fail on const declarations mixed: without, with initialiser', () => {
        expect(() => {
            parseScript('const x, y = 1;')
        }).to.throw();
    });

    it("should throw on \"var x += 1;", () => {
        expect(() => {
            parseScript(`var x += 1;`)
        }).to.throw();
    });

    it("should throw on \"var x | true;", () => {
        expect(() => {
            parseScript(`var x | true;`)
        }).to.throw();
    });

    it("should throw on \"var x && 1;", () => {
        expect(() => {
            parseScript(`var x && 1;`)
        }).to.throw();
    });

    it("should throw on \"var x*1;", () => {
        expect(() => {
            parseScript(`var x*1;`)
        }).to.throw();
    });

    it("should throw on \"var x in []", () => {
        expect(() => {
            parseScript(`var x in []`)
        }).to.throw();
    });

    it("should throw on \"let eval = 123, b = 124;\" in strict mode", () => {
        expect(() => {
            parseScript(`"use strict"; let eval = 123, b = 124;`)
        }).to.throw();
    });

    it("should throw on \"const arguments = 123, b = 124;\" in strict mode", () => {
        expect(() => {
            parseScript(`"use strict"; const arguments = 123, b = 124;`)
        }).to.throw();
    });

    it("should throw on \"let x,\"", () => {
        expect(() => {
            parseScript(`let x,`)
        }).to.throw();
    });

    it("should throw on invalid \"const [...[ x ] = []] = [];\" in module code", () => {
        expect(() => {
            parseModule(`const [...[ x ] = []] = [];`)
        }).to.throw();
    });

    it("should throw on invalid \"let default\"", () => {
        expect(() => {
            parseScript(`let default`)
        }).to.throw();
    });

    it("should throw on invalid \"const [...[ x ] = []] = [];\"", () => {
        expect(() => {
            parseScript(`const [...[ x ] = []] = [];;`)
        }).to.throw();
    });

    it("should throw on invalid \"const x = 0,\"", () => {
        expect(() => {
            parseScript(`const x = 0,`)
        }).to.throw();
    });

    it("should throw on invalid \"const x = 0, y = 1,;\"", () => {
        expect(() => {
            parseModule(`const x = 0, y = 1,;`)
        }).to.throw();
    });

    it("should throw on invalid \"const x = 12, y;\"", () => {
        expect(() => {
            parseModule(`const x = 12, y;`)
        }).to.throw();
    });

    it("should throw on invalid const var\"", () => {
        expect(() => {
            parseModule(`"const var`)
        }).to.throw();
    });

    it("should throw on invalid const var\"", () => {
        expect(() => {
            parseScript(`"const var`)
        }).to.throw();
    });

    it("should throw on \"const x = 0,\"", () => {
        expect(() => {
            parseScript(`const x = 0,`)
        }).to.throw();
    });

    it("should throw on \"const x = 0, y = 1,;\"", () => {
        expect(() => {
            parseScript(`const x = 0, y = 1,;`)
        }).to.throw();
    });

    it("should throw on \"a: const a\"", () => {
        expect(() => {
            parseScript(`a: const a`)
        }).to.throw('');
    });

    it("should throw on invalid \"const x = 0, y = 1,;\"", () => {
        expect(() => {
            parseScript(`const x = 0, y = 1,;`)
        }).to.throw();
    });

    it('should throw on invalid complex binding without initializer', () => {
        expect(() => {
            parseScript(`let []`)
        }).to.throw();
    });

    it('should throw on duplicate const', () => {
        expect(() => {
            parseScript(`const const;`)
        }).to.throw();
    });

    it('should throw on invalid const let', () => {
        expect(() => {
            parseScript(`const let`)
        }).to.throw();
    });

    it('should throw on invalid let declaration', () => {
        expect(() => {
            parseScript(`let x, y, z, let;`)
        }).to.throw();
    });

    it('should throw on invalid let initializer', () => {
        expect(() => {
            parseScript(`let x, y, z, let = 1;`)
        }).to.throw();
    });

    it('should throw on duplicate let', () => {
        expect(() => {
            parseModule(`let let;`)
        }).to.throw();
    });

    it('should throw if the default export is an lexical declaration (const)', () => {
        expect(() => {
            parseModule(`"use strict"; const const = 1;`)
        }).to.throw();
    });

    it('should throw if the default export is an lexical declaration (const)', () => {
        expect(() => {
            parseScript(`"use strict"; const const = 1;`)
        }).to.throw();
    });

    it('should throw on invalid "let eval"', () => {
        expect(() => {
            parseModule(`let eval`)
        }).to.throw();
    });

    it('should throw on invalid "var eval"', () => {
        expect(() => {
            parseModule(`var eval`)
        }).to.throw();
    });

    it('should throw on invalid "let [eval] = 1"', () => {
        expect(() => {
            parseModule(`let [eval] = 1`)
        }).to.throw();
    });

    it('should throw on invalid "let arguments = 1"', () => {
        expect(() => {
            parseModule(`let arguments = 1`)
        }).to.throw();
    });

    it('should throw on invalid "let [arguments] = 1"', () => {
        expect(() => {
            parseModule(`let [arguments] = 1`)
        }).to.throw();
    });

    it('should throw on invalid "let [eval] = 1"', () => {
        expect(() => {
            parseModule(`let [eval] = 1`)
        }).to.throw();
    });

    it('should throw on invalid "const [eval] = 1"', () => {
        expect(() => {
            parseModule(`const [eval] = 1`)
        }).to.throw();
    });

    it('should throw on invalid "const eval = arguments"', () => {
        expect(() => {
            parseModule(`const eval = arguments`)
        }).to.throw();
    });

    it("should throw if using let as lefthandside expression", () => {
        expect(() => {
            parseModule(`let let`)
        }).to.throw();
    });

    it("should fail on use of future reserved word as declaration - strict directive", () => {
        expect(() => {
            parseScript(`"use strict"; let eval;`)
        }).to.throw();
    });

    it("should throw on \"var x += 1;", () => {
        expect(() => {
            parseScript(`var x += 1;`)
        }).to.throw();
    });

    it('should fail on `let` contextual keyword containing Unicode escape sequences', () => {
        expect(() => {
            parseScript('"use strict"; l\\u0065t')
        }).to.throw();
    });

    it('should fail on invalid let declaration', () => {
        expect(() => {
            parseScript('let x, y, z, let;')
        }).to.throw();
    });

    it('should fail on invalid duplicate let', () => {
        expect(() => {
            parseScript('let let;')
        }).to.throw();
    });

    it('should fail on invalid strict const const', () => {
        expect(() => {
            parseScript('"use strict"; const const = 1;')
        }).to.throw();
    });

    it('should fail on invalid strict const let', () => {
        expect(() => {
            parseScript('"use strict"; const let = 1;')
        }).to.throw();
    });

    it('should fail on invalid trailing comma let', () => {
        expect(() => {
            parseScript('let x,')
        }).to.throw();
    });

    it('should fail on invalid trailing comma', () => {
        expect(() => {
            parseScript('let x,;')
        }).to.throw();
    });

    it('should fail on invalid trailing comma', () => {
        expect(() => {
            parseScript('let x, y, ;')
        }).to.throw();
    });

    it('should fail on invalid trailing comma', () => {
        expect(() => {
            parseScript(`let x,
        y = 3,`)
        }).to.throw();
    });

    it('should fail on invalid trailing comma const', () => {
        expect(() => {
            parseScript('const x = 0,')
        }).to.throw('');
    });

    it('should fail on invalid trailing comma const new line', () => {
        expect(() => {
            parseScript(`const x = 0,
        y = 1,`)
        }).to.throw();
    });

    it('should fail on "let \\u{61}, \\u{0061};"', () => {
        expect(() => {
            parseScript(`let \\u{61}, \\u{0061};`)
        }).to.throw();
    });

    it('should fail on "let a, b, a;"', () => {
        expect(() => {
            parseScript(`let a, b, a;`)
        }).to.throw();
    });

    it('should fail on "const a = 1, b;"', () => {
        expect(() => {
            parseScript(`const a = 1, b;`)
        }).to.throw();
    });

    it('should fail on "let [a, ...a] = 1;"', () => {
        expect(() => {
            parseScript(`let [a, ...a] = 1;`)
        }).to.throw();
    });

    it('should fail on ""use strict"; const let = 1;"', () => {
        expect(() => {
            parseScript(`"use strict"; const let = 1;`)
        }).to.throw();
    });

    it('should fail on "var a; const a = 1;"', () => {
        expect(() => {
            parseScript(`var a; const a = 1;`)
        }).to.throw();
    });

    it('should fail on "let x\u{E01D5}, x󠇕;"', () => {
        expect(() => {
            parseScript(`let x\\u{E01D5}, x󠇕;`)
        }).to.throw();
    });

    it('should fail on "let a; let a;"', () => {
        expect(() => {
            parseScript(`let a; let a;`)
        }).to.throw();
    });

    it('should fail if "this" are used as an shorthand property"', () => {
        expect(() => {
            parseScript(`let {this} = x`)
        }).to.throw('');
    });

    it('should fail if let are used in labelled statement', () => {
        expect(() => {
            parseScript(`a: let a`)
        }).to.throw('');
    });
    
    it('should parse function name arrow', () => {
        expect(parseScript(`const arrow = () => {};`, {
            raw: true,
            ranges: true,
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 22,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 22
                      }
                    },
                    "id": {
                      "type": "Identifier",
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
                      },
                      "name": "arrow"
                    },
                    "init": {
                      "type": "ArrowFunctionExpression",
                      "start": 14,
                      "end": 22,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 22
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
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
                        },
                        "body": []
                      }
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse deconstructed rest object with getter', () => {
        expect(parseScript(`const {...x} = { get v() { return 2; } };`, {
            raw: true,
            ranges: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "ObjectExpression",
                                "properties": [
                                    {
                                        "type": "Property",
                                        "key": {
                                            "type": "Identifier",
                                            "name": "v",
                                            "start": 21,
                                            "end": 22,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 21
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 22
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
                                                            "type": "Literal",
                                                            "value": 2,
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
                                                            "raw": "2"
                                                        },
                                                        "start": 27,
                                                        "end": 36,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 27
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 36
                                                            }
                                                        }
                                                    }
                                                ],
                                                "start": 25,
                                                "end": 38,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 25
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 38
                                                    }
                                                }
                                            },
                                            "generator": false,
                                            "async": false,
                                            "expression": false,
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
                                        "kind": "get",
                                        "computed": false,
                                        "method": false,
                                        "shorthand": false,
                                        "start": 17,
                                        "end": 38,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 17
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 38
                                            }
                                        }
                                    }
                                ],
                                "start": 15,
                                "end": 40,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 15
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 40
                                    }
                                }
                            },
                            "id": {
                                "type": "ObjectPattern",
                                "properties": [
                                    {
                                        "type": "RestElement",
                                        "argument": {
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
                                        "start": 7,
                                        "end": 11,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 7
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 11
                                            }
                                        }
                                    }
                                ],
                                "start": 6,
                                "end": 12,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 6
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 12
                                    }
                                }
                            },
                            "start": 6,
                            "end": 40,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 40
                                }
                            }
                        }
                    ],
                    "kind": "const",
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
                }
            ],
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

    it('should parse assignment of function `name` attribute (let)', () => {
        expect(parseScript(`let cover = (function() {});`, {
            raw: true,
            ranges: true,
            next: true,
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "name": "cover"
                    },
                    "init": {
                      "type": "FunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
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
                        },
                        "body": []
                      }
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse let: function local use before initialization in declaration statement', () => {
        expect(parseScript(`(function() {
            let x = x + 1;
          }());`, {
            raw: true,
            ranges: true,
            next: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 56,
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
                "type": "ExpressionStatement",
                "start": 0,
                "end": 56,
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
                "expression": {
                  "type": "CallExpression",
                  "start": 1,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 3,
                      "column": 13
                    }
                  },
                  "callee": {
                    "type": "FunctionExpression",
                    "start": 1,
                    "end": 52,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 3,
                        "column": 11
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [],
                    "body": {
                      "type": "BlockStatement",
                      "start": 12,
                      "end": 52,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 3,
                          "column": 11
                        }
                      },
                      "body": [
                        {
                          "type": "VariableDeclaration",
                          "start": 26,
                          "end": 40,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 12
                            },
                            "end": {
                              "line": 2,
                              "column": 26
                            }
                          },
                          "declarations": [
                            {
                              "type": "VariableDeclarator",
                              "start": 30,
                              "end": 39,
                              "loc": {
                                "start": {
                                  "line": 2,
                                  "column": 16
                                },
                                "end": {
                                  "line": 2,
                                  "column": 25
                                }
                              },
                              "id": {
                                "type": "Identifier",
                                "start": 30,
                                "end": 31,
                                "loc": {
                                  "start": {
                                    "line": 2,
                                    "column": 16
                                  },
                                  "end": {
                                    "line": 2,
                                    "column": 17
                                  }
                                },
                                "name": "x"
                              },
                              "init": {
                                "type": "BinaryExpression",
                                "start": 34,
                                "end": 39,
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
                                "left": {
                                  "type": "Identifier",
                                  "start": 34,
                                  "end": 35,
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
                                  "name": "x"
                                },
                                "operator": "+",
                                "right": {
                                  "type": "Literal",
                                  "start": 38,
                                  "end": 39,
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
                                  "value": 1,
                                  "raw": "1"
                                }
                              }
                            }
                          ],
                          "kind": "let"
                        }
                      ]
                    }
                  },
                  "arguments": []
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binding as specified via property name and identifier (`let` statement)', () => {
        expect(parseScript(`let { x: y } = { x: 23 };`, {
            raw: true,
            ranges: true,
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 24,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 4,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 6,
                          "end": 10,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 6
                            },
                            "end": {
                              "line": 1,
                              "column": 10
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
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
                            "name": "x"
                          },
                          "value": {
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
                            "name": "y"
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
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
                      "properties": [
                        {
                          "type": "Property",
                          "start": 17,
                          "end": 22,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 17
                            },
                            "end": {
                              "line": 1,
                              "column": 22
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
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
                            "name": "x"
                          },
                          "value": {
                            "type": "Literal",
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
                            },
                            "value": 23,
                            "raw": "23"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object binding pattern with "nested" array binding pattern', () => {
        expect(parseScript(`const { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };`, {
            raw: true,
            ranges: true,
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
                "line": 1,
                "column": 61
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 61,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 61
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 60,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 60
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 32,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 32
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 9
                              }
                            },
                            "name": "w"
                          },
                          "value": {
                            "type": "AssignmentPattern",
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
                            "left": {
                              "type": "ArrayPattern",
                              "start": 11,
                              "end": 20,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 11
                                },
                                "end": {
                                  "line": 1,
                                  "column": 20
                                }
                              },
                              "elements": [
                                {
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
                                {
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
                                  "name": "y"
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
                                  "name": "z"
                                }
                              ]
                            },
                            "right": {
                              "type": "ArrayExpression",
                              "start": 23,
                              "end": 32,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 23
                                },
                                "end": {
                                  "line": 1,
                                  "column": 32
                                }
                              },
                              "elements": [
                                {
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
                                  "value": 4,
                                  "raw": "4"
                                },
                                {
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
                                  "value": 5,
                                  "raw": "5"
                                },
                                {
                                  "type": "Literal",
                                  "start": 30,
                                  "end": 31,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 30
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 31
                                    }
                                  },
                                  "value": 6,
                                  "raw": "6"
                                }
                              ]
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 37,
                      "end": 60,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 37
                        },
                        "end": {
                          "line": 1,
                          "column": 60
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 39,
                          "end": 58,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 39
                            },
                            "end": {
                              "line": 1,
                              "column": 58
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
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
                            "name": "w"
                          },
                          "value": {
                            "type": "ArrayExpression",
                            "start": 42,
                            "end": 58,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 42
                              },
                              "end": {
                                "line": 1,
                                "column": 58
                              }
                            },
                            "elements": [
                              {
                                "type": "Literal",
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
                                "value": 7,
                                "raw": "7"
                              },
                              {
                                "type": "Identifier",
                                "start": 46,
                                "end": 55,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 46
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 55
                                  }
                                },
                                "name": "undefined"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse assignment of function `name` attribute', () => {
        expect(parseScript(`const cls = class {};`, {
            raw: true,
            ranges: true,
            locations: true,
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "id": {
                      "type": "Identifier",
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
                      },
                      "name": "cls"
                    },
                    "init": {
                      "type": "ClassExpression",
                      "start": 12,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "id": null,
                      "superClass": null,
                      "body": {
                        "type": "ClassBody",
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
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });
    it('should parse nested array destructuring with a null value', () => {
        expect(parseScript(`const [[x]] = [null];`, {
            raw: true,
            ranges: true,
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
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
                      },
                      "elements": [
                        {
                          "type": "ArrayPattern",
                          "start": 7,
                          "end": 10,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 10
                            }
                          },
                          "elements": [
                            {
                              "type": "Identifier",
                              "start": 8,
                              "end": 9,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 8
                                },
                                "end": {
                                  "line": 1,
                                  "column": 9
                                }
                              },
                              "name": "x"
                            }
                          ]
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 14,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 14
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "elements": [
                        {
                          "type": "Literal",
                          "start": 15,
                          "end": 19,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 15
                            },
                            "end": {
                              "line": 1,
                              "column": 19
                            }
                          },
                          "value": null,
                          "raw": "null"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse named functions in strict mode', () => {
        expect(parseScript(`'use strict'; let foo = function foo() {}`, {
            raw: true,
            ranges: true,
            locations: true
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
                "line": 1,
                "column": 41
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
                  "type": "Literal",
                  "start": 0,
                  "end": 12,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 12
                    }
                  },
                  "value": "use strict",
                  "raw": "'use strict'"
                }
              },
              {
                "type": "VariableDeclaration",
                "start": 14,
                "end": 41,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 14
                  },
                  "end": {
                    "line": 1,
                    "column": 41
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 18,
                    "end": 41,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 18
                      },
                      "end": {
                        "line": 1,
                        "column": 41
                      }
                    },
                    "id": {
                      "type": "Identifier",
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
                      "name": "foo"
                    },
                    "init": {
                      "type": "FunctionExpression",
                      "start": 24,
                      "end": 41,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 24
                        },
                        "end": {
                          "line": 1,
                          "column": 41
                        }
                      },
                      "id": {
                        "type": "Identifier",
                        "start": 33,
                        "end": 36,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 33
                          },
                          "end": {
                            "line": 1,
                            "column": 36
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
                        "body": []
                      }
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "const { async: foo } = bar;"', () => {
        expect(parseScript(`const { async: foo } = bar;`, {
            raw: true,
            locations: true,
            ranges: true
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 18,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 18
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 13,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 13
                              }
                            },
                            "name": "async"
                          },
                          "value": {
                            "type": "Identifier",
                            "start": 15,
                            "end": 18,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 15
                              },
                              "end": {
                                "line": 1,
                                "column": 18
                              }
                            },
                            "name": "foo"
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "Identifier",
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
                      "name": "bar"
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse let as an identifier', () => {
        expect(parseScript(`let;`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 4,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 4
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 4,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 4
                  }
                },
                "expression": {
                  "type": "Identifier",
                  "start": 0,
                  "end": 3,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 3
                    }
                  },
                  "name": "let"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse let assignment', () => {
        expect(parseScript(`var let;`, {
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 8,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 8
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 8,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 8
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 7,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 7
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 7,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 7
                        }
                      },
                      "name": "let"
                    },
                    "init": null
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });
    it("should parse \"var static;\"", () => {
        expect(parseScript(`var static;`, {
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 10,
                    "id": {
                        "end": 10,
                        "name": "static",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": null,
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 11,
                "kind": "var",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 11,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "let x = 1"', () => {
        expect(parseScript('let x = 1', {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 9,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 9
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 9,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 9
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 9,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 9
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
                      "type": "Literal",
                      "start": 8,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 8
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "value": 1,
                      "raw": "1"
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse a single "let a"', () => {
        expect(parseScript('let a', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 5,
                    "id": {
                        "end": 5,
                        "name": "a",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": null,
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 5,
                "kind": "let",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 5,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "let a;"', () => {
        expect(parseScript('let a;', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 5,
                    "id": {
                        "end": 5,
                        "name": "a",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": null,
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 6,
                "kind": "let",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 6,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse a single "const x = 42', () => {
        expect(parseScript('const x = 42', {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 12,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 12
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 12,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 12
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 12,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 12
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
                      "name": "x"
                    },
                    "init": {
                      "type": "Literal",
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
                      "value": 42,
                      "raw": "42"
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse a single "let.let = foo', () => {
        expect(parseScript('let.let = foo', {
            raw: true,
            ranges: true,
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
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                    "type": "MemberExpression",
                    "start": 0,
                    "end": 7,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 7
                      }
                    },
                    "object": {
                      "type": "Identifier",
                      "start": 0,
                      "end": 3,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 0
                        },
                        "end": {
                          "line": 1,
                          "column": 3
                        }
                      },
                      "name": "let"
                    },
                    "property": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 7,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 7
                        }
                      },
                      "name": "let"
                    },
                    "computed": false
                  },
                  "right": {
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse a single "let x = 42', () => {
        expect(parseScript('let x = 42', {
            raw: true,
            ranges: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 10,
                    "id": {
                        "end": 5,
                        "name": "x",
                        "start": 4,
                        "type": "Identifier"
                    },
                    "init": {
                        "end": 10,
                        "raw": "42",
                        "start": 8,
                        "type": "Literal",
                        "value": 42
                    },
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 10,
                "kind": "let",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 10,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });
   
    it('should parse destructuring initializer with an undefined value', () => {
        expect(parseScript('let [x = 23] = [undefined];', {
            ranges: true,
            locations: true,
            raw: true
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 4,
                      "end": 12,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 12
                        }
                      },
                      "elements": [
                        {
                          "type": "AssignmentPattern",
                          "start": 5,
                          "end": 11,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
                            },
                            "end": {
                              "line": 1,
                              "column": 11
                            }
                          },
                          "left": {
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
                          },
                          "right": {
                            "type": "Literal",
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
                            "value": 23,
                            "raw": "23"
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 15,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "elements": [
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
                          "name": "undefined"
                        }
                      ]
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it("should parse \"const [[...x] = values] = [];\"", () => {
        expect(parseScript(`const [[...x] = values] = [];`, {
            ranges: true,
            locations: true,
            raw: true
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 28,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 28
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 23,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 23
                        }
                      },
                      "elements": [
                        {
                          "type": "AssignmentPattern",
                          "start": 7,
                          "end": 22,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 22
                            }
                          },
                          "left": {
                            "type": "ArrayPattern",
                            "start": 7,
                            "end": 13,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 7
                              },
                              "end": {
                                "line": 1,
                                "column": 13
                              }
                            },
                            "elements": [
                              {
                                "type": "RestElement",
                                "start": 8,
                                "end": 12,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 8
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 12
                                  }
                                },
                                "argument": {
                                  "type": "Identifier",
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
                                  },
                                  "name": "x"
                                }
                              }
                            ]
                          },
                          "right": {
                            "type": "Identifier",
                            "start": 16,
                            "end": 22,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 16
                              },
                              "end": {
                                "line": 1,
                                "column": 22
                              }
                            },
                            "name": "values"
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 26,
                      "end": 28,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 26
                        },
                        "end": {
                          "line": 1,
                          "column": 28
                        }
                      },
                      "elements": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it("should parse \"const [[x]] = [null];\"", () => {
        expect(parseScript(`const [[x]] = [null];`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 20,
                    "id": {
                        "elements": [{
                            "elements": [{
                                "end": 9,
                                "name": "x",
                                "start": 8,
                                "type": "Identifier"
                            }],
                            "end": 10,
                            "start": 7,
                            "type": "ArrayPattern"
                        }],
                        "end": 11,
                        "start": 6,
                        "type": "ArrayPattern"
                    },
                    "init": {
                        "elements": [{
                            "end": 19,
                            "raw": "null",
                            "start": 15,
                            "type": "Literal",
                            "value": null,
                        }],
                        "end": 20,
                        "start": 14,
                        "type": "ArrayExpression"
                    },
                    "start": 6,
                    "type": "VariableDeclarator"
                }],
                "end": 21,
                "kind": "const",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 21,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it("should parse \"const [_, x] = [];\"", () => {
        expect(parseScript(`const [_, x] = [];`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "ArrayPattern",
                        "elements": [{
                                "type": "Identifier",
                                "name": "_"
                            },
                            {
                                "type": "Identifier",
                                "name": "x"
                            }
                        ]
                    },
                    "init": {
                        "type": "ArrayExpression",
                        "elements": []
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it("should parse \"const [,] = g();\"", () => {
        expect(parseScript(`const [,] = g();`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "VariableDeclaration",
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
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 15,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 15
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
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
                      },
                      "elements": [
                        null
                      ]
                    },
                    "init": {
                      "type": "CallExpression",
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
                      },
                      "callee": {
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
                        "name": "g"
                      },
                      "arguments": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it("should parse \"const [...[...x]] = values;\"", () => {
        expect(parseScript(`const [...[...x]] = values;`, {
            locations: true,
            raw: true,
            ranges: true
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
            "body": [
              {
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "elements": [
                        {
                          "type": "RestElement",
                          "start": 7,
                          "end": 16,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 16
                            }
                          },
                          "argument": {
                            "type": "ArrayPattern",
                            "start": 10,
                            "end": 16,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 10
                              },
                              "end": {
                                "line": 1,
                                "column": 16
                              }
                            },
                            "elements": [
                              {
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
                                  "name": "x"
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "Identifier",
                      "start": 20,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "name": "values"
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it("should parse \"let [x, y, z] = [1, 2, 3];\"", () => {
        expect(parseScript(`let [x, y, z] = [1, 2, 3];`, {
            locations: true,
            raw: true,
            ranges: true
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 4,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      },
                      "elements": [
                        {
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
                        },
                        {
                          "type": "Identifier",
                          "start": 8,
                          "end": 9,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 9
                            }
                          },
                          "name": "y"
                        },
                        {
                          "type": "Identifier",
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
                          },
                          "name": "z"
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
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
                      "elements": [
                        {
                          "type": "Literal",
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
                          "value": 1,
                          "raw": "1"
                        },
                        {
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
                          "value": 2,
                          "raw": "2"
                        },
                        {
                          "type": "Literal",
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
                          "value": 3,
                          "raw": "3"
                        }
                      ]
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it("should parse \"let [[x]] = [null];\"", () => {
        expect(parseScript(`let [[x]] = [null];`, {
            locations: true,
            raw: true,
            ranges: true
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 18,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 4,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "elements": [
                        {
                          "type": "ArrayPattern",
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
                          "elements": [
                            {
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
                              "name": "x"
                            }
                          ]
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 12,
                      "end": 18,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 1,
                          "column": 18
                        }
                      },
                      "elements": [
                        {
                          "type": "Literal",
                          "start": 13,
                          "end": 17,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 13
                            },
                            "end": {
                              "line": 1,
                              "column": 17
                            }
                          },
                          "value": null,
                          "raw": "null"
                        }
                      ]
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it("should parse \"const [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }];\"", () => {
        expect(parseScript(`const [{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }];`, {
            ranges: true,
            locations: true,
            raw: true
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
                "line": 1,
                "column": 89
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 89,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 89
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 88,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 88
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 57,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 57
                        }
                      },
                      "elements": [
                        {
                          "type": "AssignmentPattern",
                          "start": 7,
                          "end": 56,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 56
                            }
                          },
                          "left": {
                            "type": "ObjectPattern",
                            "start": 7,
                            "end": 27,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 7
                              },
                              "end": {
                                "line": 1,
                                "column": 27
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
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
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
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
                                  "name": "u"
                                },
                                "value": {
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
                                  "name": "v"
                                },
                                "kind": "init"
                              },
                              {
                                "type": "Property",
                                "start": 15,
                                "end": 19,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 15
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 19
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
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
                                  "name": "w"
                                },
                                "value": {
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
                                  "name": "x"
                                },
                                "kind": "init"
                              },
                              {
                                "type": "Property",
                                "start": 21,
                                "end": 25,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 21
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 25
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 21,
                                  "end": 22,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 21
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 22
                                    }
                                  },
                                  "name": "y"
                                },
                                "value": {
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
                                  "name": "z"
                                },
                                "kind": "init"
                              }
                            ]
                          },
                          "right": {
                            "type": "ObjectExpression",
                            "start": 30,
                            "end": 56,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 30
                              },
                              "end": {
                                "line": 1,
                                "column": 56
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 32,
                                "end": 38,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 32
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 38
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
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
                                  "name": "u"
                                },
                                "value": {
                                  "type": "Literal",
                                  "start": 35,
                                  "end": 38,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 35
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 38
                                    }
                                  },
                                  "value": 444,
                                  "raw": "444"
                                },
                                "kind": "init"
                              },
                              {
                                "type": "Property",
                                "start": 40,
                                "end": 46,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 40
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 46
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
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
                                  "name": "w"
                                },
                                "value": {
                                  "type": "Literal",
                                  "start": 43,
                                  "end": 46,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 43
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 46
                                    }
                                  },
                                  "value": 555,
                                  "raw": "555"
                                },
                                "kind": "init"
                              },
                              {
                                "type": "Property",
                                "start": 48,
                                "end": 54,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 48
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 54
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 48,
                                  "end": 49,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 48
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 49
                                    }
                                  },
                                  "name": "y"
                                },
                                "value": {
                                  "type": "Literal",
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
                                  },
                                  "value": 666,
                                  "raw": "666"
                                },
                                "kind": "init"
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 60,
                      "end": 88,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 60
                        },
                        "end": {
                          "line": 1,
                          "column": 88
                        }
                      },
                      "elements": [
                        {
                          "type": "ObjectExpression",
                          "start": 61,
                          "end": 87,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 61
                            },
                            "end": {
                              "line": 1,
                              "column": 87
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 63,
                              "end": 69,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 63
                                },
                                "end": {
                                  "line": 1,
                                  "column": 69
                                }
                              },
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 63,
                                "end": 64,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 63
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 64
                                  }
                                },
                                "name": "u"
                              },
                              "value": {
                                "type": "Literal",
                                "start": 66,
                                "end": 69,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 66
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 69
                                  }
                                },
                                "value": 777,
                                "raw": "777"
                              },
                              "kind": "init"
                            },
                            {
                              "type": "Property",
                              "start": 71,
                              "end": 77,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 71
                                },
                                "end": {
                                  "line": 1,
                                  "column": 77
                                }
                              },
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 71,
                                "end": 72,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 71
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 72
                                  }
                                },
                                "name": "w"
                              },
                              "value": {
                                "type": "Literal",
                                "start": 74,
                                "end": 77,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 74
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 77
                                  }
                                },
                                "value": 888,
                                "raw": "888"
                              },
                              "kind": "init"
                            },
                            {
                              "type": "Property",
                              "start": 79,
                              "end": 85,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 79
                                },
                                "end": {
                                  "line": 1,
                                  "column": 85
                                }
                              },
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 79,
                                "end": 80,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 79
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 80
                                  }
                                },
                                "name": "y"
                              },
                              "value": {
                                "type": "Literal",
                                "start": 82,
                                "end": 85,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 82
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 85
                                  }
                                },
                                "value": 999,
                                "raw": "999"
                              },
                              "kind": "init"
                            }
                          ]
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it("should parse \"{ const x = 14, y = 3, z = 1977 }\"", () => {
        expect(parseScript(`{ const x = 14, y = 3, z = 1977 }`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "BlockStatement",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "x"
                            },
                            "init": {
                                "type": "Literal",
                                "value": 14
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "y"
                            },
                            "init": {
                                "type": "Literal",
                                "value": 3
                            }
                        },
                        {
                            "type": "VariableDeclarator",
                            "id": {
                                "type": "Identifier",
                                "name": "z"
                            },
                            "init": {
                                "type": "Literal",
                                "value": 1977
                            }
                        }
                    ],
                    "kind": "const"
                }]
            }],
            "sourceType": "script"
        });
    });


    it("should parse \"let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];\"", () => {
        expect(parseScript(`let [{ x, y, z } = { x: 44, y: 55, z: 66 }] = [{ x: 11, y: 22, z: 33 }];`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 72,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 72
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 72,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 72
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 71,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 71
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
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
                      },
                      "elements": [
                        {
                          "type": "AssignmentPattern",
                          "start": 5,
                          "end": 42,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 5
                            },
                            "end": {
                              "line": 1,
                              "column": 42
                            }
                          },
                          "left": {
                            "type": "ObjectPattern",
                            "start": 5,
                            "end": 16,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 5
                              },
                              "end": {
                                "line": 1,
                                "column": 16
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
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
                                "method": false,
                                "shorthand": true,
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
                                  "name": "x"
                                },
                                "kind": "init",
                                "value": {
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
                                  "name": "x"
                                }
                              },
                              {
                                "type": "Property",
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
                                "method": false,
                                "shorthand": true,
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
                                  "name": "y"
                                },
                                "kind": "init",
                                "value": {
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
                              },
                              {
                                "type": "Property",
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
                                "method": false,
                                "shorthand": true,
                                "computed": false,
                                "key": {
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
                                  "name": "z"
                                },
                                "kind": "init",
                                "value": {
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
                                  "name": "z"
                                }
                              }
                            ]
                          },
                          "right": {
                            "type": "ObjectExpression",
                            "start": 19,
                            "end": 42,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 19
                              },
                              "end": {
                                "line": 1,
                                "column": 42
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 21,
                                "end": 26,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 21
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 26
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 21,
                                  "end": 22,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 21
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 22
                                    }
                                  },
                                  "name": "x"
                                },
                                "value": {
                                  "type": "Literal",
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
                                  },
                                  "value": 44,
                                  "raw": "44"
                                },
                                "kind": "init"
                              },
                              {
                                "type": "Property",
                                "start": 28,
                                "end": 33,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 28
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 33
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
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
                                  "name": "y"
                                },
                                "value": {
                                  "type": "Literal",
                                  "start": 31,
                                  "end": 33,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 31
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 33
                                    }
                                  },
                                  "value": 55,
                                  "raw": "55"
                                },
                                "kind": "init"
                              },
                              {
                                "type": "Property",
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
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 35,
                                  "end": 36,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 35
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 36
                                    }
                                  },
                                  "name": "z"
                                },
                                "value": {
                                  "type": "Literal",
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
                                  },
                                  "value": 66,
                                  "raw": "66"
                                },
                                "kind": "init"
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 46,
                      "end": 71,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 46
                        },
                        "end": {
                          "line": 1,
                          "column": 71
                        }
                      },
                      "elements": [
                        {
                          "type": "ObjectExpression",
                          "start": 47,
                          "end": 70,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 47
                            },
                            "end": {
                              "line": 1,
                              "column": 70
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 49,
                              "end": 54,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 49
                                },
                                "end": {
                                  "line": 1,
                                  "column": 54
                                }
                              },
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
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
                                },
                                "name": "x"
                              },
                              "value": {
                                "type": "Literal",
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
                                },
                                "value": 11,
                                "raw": "11"
                              },
                              "kind": "init"
                            },
                            {
                              "type": "Property",
                              "start": 56,
                              "end": 61,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 56
                                },
                                "end": {
                                  "line": 1,
                                  "column": 61
                                }
                              },
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 56,
                                "end": 57,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 56
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 57
                                  }
                                },
                                "name": "y"
                              },
                              "value": {
                                "type": "Literal",
                                "start": 59,
                                "end": 61,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 59
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 61
                                  }
                                },
                                "value": 22,
                                "raw": "22"
                              },
                              "kind": "init"
                            },
                            {
                              "type": "Property",
                              "start": 63,
                              "end": 68,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 63
                                },
                                "end": {
                                  "line": 1,
                                  "column": 68
                                }
                              },
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                "type": "Identifier",
                                "start": 63,
                                "end": 64,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 63
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 64
                                  }
                                },
                                "name": "z"
                              },
                              "value": {
                                "type": "Literal",
                                "start": 66,
                                "end": 68,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 66
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 68
                                  }
                                },
                                "value": 33,
                                "raw": "33"
                              },
                              "kind": "init"
                            }
                          ]
                        }
                      ]
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it("should parse \"let { x, } = { x: 23 };\"", () => {
        expect(parseScript(`let { x, } = { x: 23 };`, {
            ranges: true,
            locations: true,
            raw: true
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 22,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 22
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 4,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
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
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
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
                            "name": "x"
                          },
                          "kind": "init",
                          "value": {
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
                            "name": "x"
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 13,
                      "end": 22,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 22
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
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
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
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
                          "value": {
                            "type": "Literal",
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
                            "value": 23,
                            "raw": "23"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it("should parse \"let { x: y } = { x: 23 };\"", () => {
        expect(parseScript(`let { x: y } = { x: 23 };`, {})).to.eql({
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                    type: "VariableDeclarator",
                    id: {
                        type: "ObjectPattern",
                        properties: [{
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "x",
                            },
                            computed: false,
                            value: {
                                type: "Identifier",
                                name: "y",
                            },
                            kind: "init",
                            method: false,
                            shorthand: false,
                        }, ],
                    },
                    init: {
                        type: "ObjectExpression",
                        properties: [{
                            type: "Property",
                            key: {
                                type: "Identifier",
                                name: "x",
                            },
                            computed: false,
                            value: {
                                type: "Literal",
                                value: 23,
                            },
                            kind: "init",
                            method: false,
                            shorthand: false,
                        }, ],
                    },
                }, ],
                kind: "let",
            }, ],
            sourceType: "script",
        });
    });

    it("should parse \"let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };\"", () => {
        expect(parseScript(`let { w: { x, y, z } = { x: 4, y: 5, z: 6 } } = { w: { x: undefined, z: 7 } };`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "VariableDeclaration",
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
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 77,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 77
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 4,
                      "end": 45,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 45
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 6,
                          "end": 43,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 6
                            },
                            "end": {
                              "line": 1,
                              "column": 43
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
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
                            "name": "w"
                          },
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 9,
                            "end": 43,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 9
                              },
                              "end": {
                                "line": 1,
                                "column": 43
                              }
                            },
                            "left": {
                              "type": "ObjectPattern",
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
                              "properties": [
                                {
                                  "type": "Property",
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
                                  },
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
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
                                    },
                                    "name": "x"
                                  },
                                  "kind": "init",
                                  "value": {
                                    "type": "Identifier",
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
                                    },
                                    "name": "x"
                                  }
                                },
                                {
                                  "type": "Property",
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
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
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
                                    "name": "y"
                                  },
                                  "kind": "init",
                                  "value": {
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
                                    "name": "y"
                                  }
                                },
                                {
                                  "type": "Property",
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
                                  "method": false,
                                  "shorthand": true,
                                  "computed": false,
                                  "key": {
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
                                    "name": "z"
                                  },
                                  "kind": "init",
                                  "value": {
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
                                    "name": "z"
                                  }
                                }
                              ]
                            },
                            "right": {
                              "type": "ObjectExpression",
                              "start": 23,
                              "end": 43,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 23
                                },
                                "end": {
                                  "line": 1,
                                  "column": 43
                                }
                              },
                              "properties": [
                                {
                                  "type": "Property",
                                  "start": 25,
                                  "end": 29,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 25
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 29
                                    }
                                  },
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
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
                                    "name": "x"
                                  },
                                  "value": {
                                    "type": "Literal",
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
                                    "value": 4,
                                    "raw": "4"
                                  },
                                  "kind": "init"
                                },
                                {
                                  "type": "Property",
                                  "start": 31,
                                  "end": 35,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 31
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 35
                                    }
                                  },
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
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
                                    "name": "y"
                                  },
                                  "value": {
                                    "type": "Literal",
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
                                    "value": 5,
                                    "raw": "5"
                                  },
                                  "kind": "init"
                                },
                                {
                                  "type": "Property",
                                  "start": 37,
                                  "end": 41,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 37
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 41
                                    }
                                  },
                                  "method": false,
                                  "shorthand": false,
                                  "computed": false,
                                  "key": {
                                    "type": "Identifier",
                                    "start": 37,
                                    "end": 38,
                                    "loc": {
                                      "start": {
                                        "line": 1,
                                        "column": 37
                                      },
                                      "end": {
                                        "line": 1,
                                        "column": 38
                                      }
                                    },
                                    "name": "z"
                                  },
                                  "value": {
                                    "type": "Literal",
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
                                    "value": 6,
                                    "raw": "6"
                                  },
                                  "kind": "init"
                                }
                              ]
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 48,
                      "end": 77,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 48
                        },
                        "end": {
                          "line": 1,
                          "column": 77
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 50,
                          "end": 75,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 50
                            },
                            "end": {
                              "line": 1,
                              "column": 75
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
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
                            },
                            "name": "w"
                          },
                          "value": {
                            "type": "ObjectExpression",
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
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 55,
                                "end": 67,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 55
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 67
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 55,
                                  "end": 56,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 55
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 56
                                    }
                                  },
                                  "name": "x"
                                },
                                "value": {
                                  "type": "Identifier",
                                  "start": 58,
                                  "end": 67,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 58
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 67
                                    }
                                  },
                                  "name": "undefined"
                                },
                                "kind": "init"
                              },
                              {
                                "type": "Property",
                                "start": 69,
                                "end": 73,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 69
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 73
                                  }
                                },
                                "method": false,
                                "shorthand": false,
                                "computed": false,
                                "key": {
                                  "type": "Identifier",
                                  "start": 69,
                                  "end": 70,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 69
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 70
                                    }
                                  },
                                  "name": "z"
                                },
                                "value": {
                                  "type": "Literal",
                                  "start": 72,
                                  "end": 73,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 72
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 73
                                    }
                                  },
                                  "value": 7,
                                  "raw": "7"
                                },
                                "kind": "init"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it("should parse \"{ let a; }\"", () => {
        expect(parseScript(`{ let a; }`, {})).to.eql({
            type: "Program",
            body: [{
                type: "BlockStatement",
                body: [{
                    type: "VariableDeclaration",
                    declarations: [{
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "a",
                        },
                        init: null,
                    }, ],
                    kind: "let",
                }, ],
            }, ],
            sourceType: "script",
        });
    });

    it("should parse assignment of function name - class", () => {
        expect(parseScript(`const {} = obj;`, {})).to.eql({
            "type": "Program",
            "body": [{
                "type": "VariableDeclaration",
                "declarations": [{
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "ObjectPattern",
                        "properties": []
                    },
                    "init": {
                        "type": "Identifier",
                        "name": "obj"
                    }
                }],
                "kind": "const"
            }],
            "sourceType": "script"
        });
    });

    it("should parse \"const {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};\"", () => {
        expect(parseScript(`const {a, b, ...rest} = {x: 1, y: 2, a: 5, b: 3};`, {
            next: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "id": {
                        "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "a",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "a",
                                    "type": "Identifier"
                                }
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "b",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": true,
                                "type": "Property",
                                "value": {
                                    "name": "b",
                                    "type": "Identifier"
                                }
                            },
                            {
                                "argument": {
                                    "name": "rest",
                                    "type": "Identifier"
                                },
                                "type": "RestElement"
                            }
                        ],
                        "type": "ObjectPattern"
                    },
                    "init": {
                        "properties": [{
                                "computed": false,
                                "key": {
                                    "name": "x",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 1
                                }
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "y",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 2
                                }
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "a",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 5
                                }
                            },
                            {
                                "computed": false,
                                "key": {
                                    "name": "b",
                                    "type": "Identifier"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false,
                                "type": "Property",
                                "value": {
                                    "type": "Literal",
                                    "value": 3
                                }
                            }
                        ],
                        "type": "ObjectExpression"
                    },
                    "type": "VariableDeclarator"
                }],
                "kind": "const",
                "type": "VariableDeclaration"
            }],
            "sourceType": "script",
            "type": "Program"
        });
    });

    it("should parse \"let [w = counter(), x = counter(), y = counter(), z = counter()] = [null, 0, false, ];\"", () => {
        expect(parseScript(`let [w = counter(), x = counter(), y = counter(), z = counter()] = [null, 0, false, ''];`, {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "declarations": [{
                    "end": 87,
                    "id": {
                        "elements": [{
                                "end": 18,
                                "left": {
                                    "end": 6,
                                    "name": "w",
                                    "start": 5,
                                    "type": "Identifier"
                                },
                                "right": {
                                    "arguments": [],
                                    "callee": {
                                        "end": 16,
                                        "name": "counter",
                                        "start": 9,
                                        "type": "Identifier"
                                    },
                                    "end": 18,
                                    "start": 9,
                                    "type": "CallExpression"
                                },
                                "start": 5,
                                "type": "AssignmentPattern"
                            },
                            {
                                "end": 33,
                                "left": {
                                    "end": 21,
                                    "name": "x",
                                    "start": 20,
                                    "type": "Identifier"
                                },
                                "right": {
                                    "arguments": [],
                                    "callee": {
                                        "end": 31,
                                        "name": "counter",
                                        "start": 24,
                                        "type": "Identifier"
                                    },
                                    "end": 33,
                                    "start": 24,
                                    "type": "CallExpression"
                                },
                                "start": 20,
                                "type": "AssignmentPattern"
                            },
                            {
                                "end": 48,
                                "left": {
                                    "end": 36,
                                    "name": "y",
                                    "start": 35,
                                    "type": "Identifier"
                                },
                                "right": {
                                    "arguments": [],
                                    "callee": {
                                        "end": 46,
                                        "name": "counter",
                                        "start": 39,
                                        "type": "Identifier"
                                    },
                                    "end": 48,
                                    "start": 39,
                                    "type": "CallExpression"
                                },
                                "start": 35,
                                "type": "AssignmentPattern"
                            },
                            {
                                "end": 63,
                                "left": {
                                    "end": 51,
                                    "name": "z",
                                    "start": 50,
                                    "type": "Identifier"
                                },
                                "right": {
                                    "arguments": [],
                                    "callee": {
                                        "end": 61,
                                        "name": "counter",
                                        "start": 54,
                                        "type": "Identifier"
                                    },
                                    "end": 63,
                                    "start": 54,
                                    "type": "CallExpression"
                                },
                                "start": 50,
                                "type": "AssignmentPattern"
                            }
                        ],
                        "end": 64,
                        "start": 4,
                        "type": "ArrayPattern"
                    },
                    "init": {
                        "elements": [{
                                "end": 72,
                                "raw": "null",
                                "start": 68,
                                "type": "Literal",
                                "value": null,
                            },
                            {
                                "end": 75,
                                "raw": "0",
                                "start": 74,
                                "type": "Literal",
                                "value": 0,
                            },
                            {
                                "end": 82,
                                "raw": "false",
                                "start": 77,
                                "type": "Literal",
                                "value": false,
                            },
                            {
                                "end": 86,
                                "raw": "''",
                                "start": 84,
                                "type": "Literal",
                                "value": ""
                            }
                        ],
                        "end": 87,
                        "start": 67,
                        "type": "ArrayExpression"
                    },
                    "start": 4,
                    "type": "VariableDeclarator"
                }],
                "end": 88,
                "kind": "let",
                "start": 0,
                "type": "VariableDeclaration"
            }],
            "end": 88,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it("should parse \"let [...[]] = iter;\"", () => {
        expect(parseScript(`let [...[]] = iter;`, {})).to.eql({
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                    type: "VariableDeclarator",
                    id: {
                        type: "ArrayPattern",
                        elements: [{
                            type: "RestElement",
                            argument: {
                                type: "ArrayPattern",
                                elements: [],
                            },
                        }, ],
                    },
                    init: {
                        type: "Identifier",
                        name: "iter",
                    },
                }, ],
                kind: "let",
            }, ],
            sourceType: "script",
        });
    });

    it("should parse \"let a, b;\"", () => {
        expect(parseScript(`let a, b;`, {})).to.eql({
            type: "Program",
            body: [{
                type: "VariableDeclaration",
                declarations: [{
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "a",
                        },
                        init: null,
                    },
                    {
                        type: "VariableDeclarator",
                        id: {
                            type: "Identifier",
                            name: "b",
                        },
                        init: null,
                    },
                ],
                kind: "let",
            }, ],
            sourceType: "script",
        });
    });

    it("should parse \"(let[a])\"", () => {
        expect(parseScript(`(let[a])`, {})).to.eql({
            type: "Program",
            body: [{
                type: "ExpressionStatement",
                expression: {
                    type: "MemberExpression",
                    computed: true,
                    object: {
                        type: "Identifier",
                        name: "let",
                    },
                    property: {
                        type: "Identifier",
                        name: "a",
                    },
                },
            }, ],
            sourceType: "script",
        });
    });

    it('should parse lexical conditional binary numbers', () => {
        expect(parseScript(`let bitmask = targets.length ?
        0b1111111111111111111111111111111 :
        0b1000000000000000000000000000000;`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 117,
            "body": [{
                "type": "VariableDeclaration",
                "start": 0,
                "end": 117,
                "declarations": [{
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 116,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 11,
                        "name": "bitmask"
                    },
                    "init": {
                        "type": "ConditionalExpression",
                        "start": 14,
                        "end": 116,
                        "test": {
                            "type": "MemberExpression",
                            "start": 14,
                            "end": 28,
                            "object": {
                                "type": "Identifier",
                                "start": 14,
                                "end": 21,
                                "name": "targets"
                            },
                            "property": {
                                "type": "Identifier",
                                "start": 22,
                                "end": 28,
                                "name": "length"
                            },
                            "computed": false
                        },
                        "consequent": {
                            "type": "Literal",
                            "start": 39,
                            "end": 72,
                            "value": 2147483647,
                            "raw": "0b1111111111111111111111111111111"
                        },
                        "alternate": {
                            "type": "Literal",
                            "start": 83,
                            "end": 116,
                            "value": 1073741824,
                            "raw": "0b1000000000000000000000000000000"
                        }
                    }
                }],
                "kind": "let"
            }],
            "sourceType": "script"
        });
    });
});