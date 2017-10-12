import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Declarations - Let', () => {

    it('should fail on redeclaration within block', () => {
        expect(() => { parseScript('{ let f; function f() {} }'); }).to.throw();
    });

    it('should fail if attempt to redeclare let binding with var', () => {
        expect(() => { parseScript('{ let f; var f; }'); }).to.throw();
    });

    it('should fail on let let| split across two lines', () => {
        expect(() => { parseScript(`let  // start of a LexicalDeclaration, *not* an ASI opportunity
        let = "irrelevant initializer";`); }).to.throw();
    });

    it('should fail let newline', () => {
        expect(() => { parseScript(`function f() {
            let
            await 0;
        }`); }).to.throw();
    });

    it('should fail on let declarations with initialisers in statement positions ( do Statement while )', () => {
        expect(() => { parseScript('do let x = 1; while (false)'); }).to.throw();
    });

    it('should fail on let declarations with initialisers in statement positions ( for ( ;;) Statement )', () => {
        expect(() => { parseScript('for (;false;) let x = 1;'); }).to.throw();
    });

    it('should fail on let declarations with initialisers in statement positions ( if ( Expression ) Statement else Statement )', () => {
        expect(() => { parseScript('if (true) {} else let x = 1;'); }).to.throw();
    });

    it('should fail on let declarations with initialisers in statement positions ( do Statement while ( Expression ) )', () => {
        expect(() => { parseScript('do let x; while (false)'); }).to.throw();
    });

    it('should fail on let declarations with initialisers in statement positions ( if ( Expression ) Statement )', () => {
        expect(() => { parseScript('if (true) let x;'); }).to.throw();
    });

    it('should fail on redeclaration error within strict mode function inside non-strict code', () => {
        expect(() => { parseScript('(function() { "use strict"; { let f; var f; } })'); }).to.throw();
    });

    it('should parse function name arrow', () => {
        expect(parseScript('let arrow = () => {};', {
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
                    "start": 4,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 20
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
                      "name": "arrow"
                    },
                    "init": {
                      "type": "ArrowFunctionExpression",
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
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse function name class', () => {
        expect(parseScript('let xCls2 = class { static name() {} };', {
            raw: true,
            ranges: true,
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 38,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 38
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
                      "name": "xCls2"
                    },
                    "init": {
                      "type": "ClassExpression",
                      "start": 12,
                      "end": 38,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 1,
                          "column": 38
                        }
                      },
                      "id": null,
                      "superClass": null,
                      "body": {
                        "type": "ClassBody",
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
                        "body": [
                          {
                            "type": "MethodDefinition",
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
                            },
                            "computed": false,
                            "key": {
                              "type": "Identifier",
                              "start": 27,
                              "end": 31,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 27
                                },
                                "end": {
                                  "line": 1,
                                  "column": 31
                                }
                              },
                              "name": "name"
                            },
                            "static": true,
                            "kind": "method",
                            "value": {
                              "type": "FunctionExpression",
                              "start": 31,
                              "end": 36,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 31
                                },
                                "end": {
                                  "line": 1,
                                  "column": 36
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
                          }
                        ]
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

    it('should parse function name generator', () => {
        expect(parseScript('let gen = function*() {};', {
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
                      "name": "gen"
                    },
                    "init": {
                      "type": "FunctionExpression",
                      "start": 10,
                      "end": 24,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
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
});