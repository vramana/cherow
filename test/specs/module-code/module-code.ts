import { parseScript, parseModule, parse } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('TC39 - Module code', () => {

        it('should fail if duplicate label', () => {
            expect(() => {
                parse('label: { label: 0; }', { sourceType: 'module'});
            }).to.throw();
        });

        it('should fail if duplicate label', () => {
            expect(() => {
                parseModule('label: { label: 0; }');
            }).to.throw();
        });

        it('should fail if duplicate lexical declared names', () => {
            expect(() => {
                parseModule('let x; const x;');
            }).to.throw('');
        });

        it('should fail if any element is a duplicat declaration', () => {
            expect(() => {
                parseModule('let x; var x;');
            }).to.throw();
        });

        it('should fail if module item list contains new target', () => {
            expect(() => {
                parseModule('new.target;');
            }).to.throw();
        });

        it('should fail if module item list contains super', () => {
            expect(() => {
                parseModule('super;');
            }).to.throw();
        });

        it('should fail f ContainsUndefinedContinueTarget of module item list with arguments « » and « » is true"', () => {
            expect(() => {
                parseModule('while (false) { continue undef; }');
            }).to.throw();
        });
        
        it('should fail on early undefined break', () => {
            expect(() => {
                parseModule('while (false) { break undef; }');
            }).to.throw();
        });

        it('should fail on yield;', () => {
            expect(() => {
                parseModule('yield;');
            }).to.throw();
        });

        it('should fail on return', () => {
            expect(() => {
                parseModule('return;');
            }).to.throw();
        });

        it('should fail on invalid hoisted function', () => {
            expect(() => {
                parseModule(`var f;
                function f() {}`);
            }).to.not.throw();
        });

        it('should fail on invalid hoisted function', () => {
            expect(() => {
                parseModule(`var g;
                function* g() {}`);
            }).to.not.throw();
        });

        it('should fail on invalid reference', () => {
            expect(() => {
                parseModule('1++;');
            }).to.throw();
        });

        it('should fail on invalid syntax', () => {
            expect(() => {
                parseModule('?');
            }).to.throw();
        });

        it('should fail if early strict mode', () => {
            expect(() => {
                parseModule(`var public;`);
            }).to.throw();
        });

        it('should parse local binding for', () => {
            expect(parseModule(`for (var test262 = null; false; ) {}`, {
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
                    "type": "ForStatement",
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
                    "init": {
                      "type": "VariableDeclaration",
                      "start": 5,
                      "end": 23,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 5
                        },
                        "end": {
                          "line": 1,
                          "column": 23
                        }
                      },
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 9,
                          "end": 23,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 9
                            },
                            "end": {
                              "line": 1,
                              "column": 23
                            }
                          },
                          "id": {
                            "type": "Identifier",
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
                            "name": "test262"
                          },
                          "init": {
                            "type": "Literal",
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
                            },
                            "value": null,
                            "raw": "null"
                          }
                        }
                      ],
                      "kind": "var"
                    },
                    "test": {
                      "type": "Literal",
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
                      "value": false,
                      "raw": "false"
                    },
                    "update": null,
                    "body": {
                      "type": "BlockStatement",
                      "start": 34,
                      "end": 36,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 34
                        },
                        "end": {
                          "line": 1,
                          "column": 36
                        }
                      },
                      "body": []
                    }
                  }
                ],
                "sourceType": "module"
              });
        });

        it('should parse two ForStatements', () => {
            expect(parseModule(`for (var test262; false; ) {}
            for (var test262; false; ) {}`, {
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
                    "line": 2,
                    "column": 41
                  }
                },
                "body": [
                  {
                    "type": "ForStatement",
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
                    "init": {
                      "type": "VariableDeclaration",
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
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
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
                          "id": {
                            "type": "Identifier",
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
                            "name": "test262"
                          },
                          "init": null
                        }
                      ],
                      "kind": "var"
                    },
                    "test": {
                      "type": "Literal",
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
                      },
                      "value": false,
                      "raw": "false"
                    },
                    "update": null,
                    "body": {
                      "type": "BlockStatement",
                      "start": 27,
                      "end": 29,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 29
                        }
                      },
                      "body": []
                    }
                  },
                  {
                    "type": "ForStatement",
                    "start": 42,
                    "end": 71,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 12
                      },
                      "end": {
                        "line": 2,
                        "column": 41
                      }
                    },
                    "init": {
                      "type": "VariableDeclaration",
                      "start": 47,
                      "end": 58,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 17
                        },
                        "end": {
                          "line": 2,
                          "column": 28
                        }
                      },
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
                          "start": 51,
                          "end": 58,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 21
                            },
                            "end": {
                              "line": 2,
                              "column": 28
                            }
                          },
                          "id": {
                            "type": "Identifier",
                            "start": 51,
                            "end": 58,
                            "loc": {
                              "start": {
                                "line": 2,
                                "column": 21
                              },
                              "end": {
                                "line": 2,
                                "column": 28
                              }
                            },
                            "name": "test262"
                          },
                          "init": null
                        }
                      ],
                      "kind": "var"
                    },
                    "test": {
                      "type": "Literal",
                      "start": 60,
                      "end": 65,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 30
                        },
                        "end": {
                          "line": 2,
                          "column": 35
                        }
                      },
                      "value": false,
                      "raw": "false"
                    },
                    "update": null,
                    "body": {
                      "type": "BlockStatement",
                      "start": 69,
                      "end": 71,
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
                ],
                "sourceType": "module"
              });
        });
    });