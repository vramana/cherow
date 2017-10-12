import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';
const expect = chai.expect;

describe('Identifiers', () => {

        it('should fail if escaped reserved words used as Identifier - "class"', () => {
            expect(() => {
                parseScript('var cla\\u0073s = 123;');
            }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "class"', () => {
            expect(() => {
                parseScript('var class = 123;');
            }).to.throw();
        });

        it('should fail on plain await as identifier in module code', () => {
          expect(() => {
              parseModule('await;');
          }).to.throw();
      });

        it('should fail on invalid escaped surrogate pair', () => {
          expect(() => {
              parseScript('var \\uD83B\\uDE00');
          }).to.throw();
        });

        it('should fail on invalid id smp', () => {
          expect(() => {
              parseScript('var 🀒');
          }).to.throw();
        });

        it('should fail on invalid function await module', () => {
          expect(() => {
              parseModule('function await() {}');
          }).to.throw();
        });

        it('should fail on invalid hex escape sequence', () => {
          expect(() => {
              parseModule('"\\x{0}"');
          }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "const"', () => {
            expect(() => {
                parseScript('var const = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "escaped hex"', () => {
            expect(() => {
                parseScript('var \\u{63}ontinue = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "escaped hex4"', () => {
            expect(() => {
                parseScript('var \\u0063ontinue = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "continue"', () => {
            expect(() => {
                parseScript('var continue = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "default"', () => {
            expect(() => {
                parseScript('var default = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "do"', () => {
            expect(() => {
                parseScript('var do = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "else"', () => {
            expect(() => {
                parseScript('var else = 123;');
            }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "enum"', () => {
            expect(() => {
                parseScript('var enum = 123;');
            }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "yield" (strict)', () => {
            expect(() => {
                parseScript('"use strict"; var yield = 13;');
            }).to.throw();
        });

        it('should fail if escaped reserved words used as Identifier - "null" (hex)', () => {
            expect(() => {
                parseScript('var n\\u{65}w = 123;');
            }).to.throw();
        });

        it('should fail if escaped reserved words used as Identifier - "null" (hex 4)', () => {
            expect(() => {
                parseScript('var \\u006eull = 123;');
            }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "finally"', () => {
            expect(() => {
                parseScript('var finally = 123;');
            }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "export"', () => {
            expect(() => {
                parseScript('var export = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "extends"', () => {
            expect(() => {
                parseScript('var extends = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "false"', () => {
            expect(() => {
                parseScript('var false = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "true"', () => {
            expect(() => {
                parseScript('var true = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "if"', () => {
            expect(() => {
                parseScript('var if = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "import"', () => {
            expect(() => {
                parseScript('var import = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "in"', () => {
            expect(() => {
                parseScript('var in = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "new"', () => {
            expect(() => {
                parseScript('var new = 123;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "instanceof"', () => {
            expect(() => {
                parseScript('var if = instanceof;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "switch"', () => {
            expect(() => {
                parseScript('var import = switch;');
            }).to.throw();
        });
        it('should fail if reserved words used as Identifier - "try"', () => {
            expect(() => {
                parseScript('var in = try;');
            }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "void"', () => {
            expect(() => {
                parseScript('var void = 123;');
            }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "switch"', () => {
            expect(() => {
                parseScript('var switch = 123;');
            }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "this"', () => {
          expect(() => {
              parseScript('var this = 123;');
          }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "super" (hex)', () => {
          expect(() => {
              parseScript('var \\u0073uper = 123;');
          }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "throw"', () => {
          expect(() => {
              parseScript('var throw = 123;');
          }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "throw" (hex)', () => {
          expect(() => {
              parseScript('var \\u{74}\\u{72}\\u{79} = 123;');
          }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "throw" ( hex 4)', () => {
          expect(() => {
              parseScript('var \\u0074\\u0072\\u0079 = 123;');
          }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "true"', () => {
          expect(() => {
              parseScript('var true = 123;');
          }).to.throw();
        });

        it('should fail if reserved words used as Identifier - "try"', () => {
            expect(() => {
                parseScript('var try = 123;');
            }).to.throw();
        });

        it('should parse parse "var \\u{41}\\u{42}\\u{43};"', () => {
          expect(parseScript('var \\u{41}\\u{42}\\u{43};', {
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
                      "type": "Identifier",
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
                      "name": "ABC"
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

        it('should parse escaped math dal part', () => {
          expect(parseScript('var _\\u{1EE03}', {
              raw: true,
              ranges: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 14,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 14
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 14,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 14
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 14,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 14
                      }
                    },
                    "id": {
                      "type": "Identifier",
                      "start": 4,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "name": "_𞸃"
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

        it('should parse escaped math kaf lam', () => {
          expect(parseScript('var \\u{1EE0A}\\u{1EE0B}', {
              raw: true,
              ranges: true,
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
                "type": "VariableDeclaration",
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
                      "type": "Identifier",
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
                      "name": "𞸊𞸋"
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

        it('should parse escaped part', () => {
          expect(parseScript('var A\\u{42}C;', {
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                    "id": {
                      "type": "Identifier",
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
                      "name": "ABC"
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

        it('should parse escaped start', () => {
          expect(parseScript('var \\u{41}BC;', {
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                    "id": {
                      "type": "Identifier",
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
                      "name": "ABC"
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

        it('should parse estimated', () => {
          expect(parseScript('let ℮', {
              raw: true,
              ranges: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 5,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 5
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 5,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 5
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                      "name": "℮"
                    },
                    "init": null
                  }
                ],
                "kind": "let"
              }
            ],
            "sourceType": "script"
          });
        });

        it.skip('should parse math alef', () => {
          expect(parseScript('var 𞸀', {
              raw: true,
              ranges: true,
              locations: true
          })).to.eql({});
        });

        it.skip('should parse math kaf lam', () => {
          expect(parseScript('var 𞸊𞸋', {
              raw: true,
              ranges: true,
              locations: true
          })).to.eql({});
        });

        it('should parse valid await', () => {
          expect(parseScript('var await; (await);', {
              raw: true,
              ranges: true,
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
                "type": "VariableDeclaration",
                "start": 0,
                "end": 10,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 10
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
                      "name": "await"
                    },
                    "init": null
                  }
                ],
                "kind": "var"
              },
              {
                "type": "ExpressionStatement",
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
                },
                "expression": {
                  "type": "Identifier",
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
                  "name": "await"
                }
              }
            ],
            "sourceType": "script"
          });
        });

        it('should parse weierstrass', () => {
          expect(parseScript('var ℘;', {
              raw: true,
              ranges: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 6,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 6
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 6,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 6
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                      "name": "℘"
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

        it('should parse "await = 0;"', () => {
          expect(parseModule('await = 0;', {
              raw: true,
          })).to.eql({
              "body": [
                {
                  "expression": {
                    "left": {
                      "name": "await",
                      "type": "Identifier"
                    },
                    "operator": "=",
                    "right": {
                      "raw": "0",
                      "type": "Literal",
                      "value": 0,
                    },
                    "type": "AssignmentExpression"
                 },
                  "type": "ExpressionStatement"
               },
              ],
              "sourceType": "module",
              "type": "Program"
            });
        });

        it('should parse parse identifier with starting unicode', () => {
          expect(parseScript('\\u0073uperHollydayInHell', {
              raw: true,
              ranges: true,
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "Identifier",
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
                  "name": "superHollydayInHell"
                }
              }
            ],
            "sourceType": "script"
          });
        });


        it('should parse parse variable with underscore', () => {
          expect(parseScript('var _ = 1;', {
              raw: true,
              ranges: true,
              locations: true
          })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 10,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 10
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 10,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 10
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
                      "name": "_"
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
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
        });

        it('should parse parse russion alpha upper  - Г', () => {
            expect(parseScript('var Г = 1;', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 10,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 10
                  }
                },
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 10
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
                          "name": "Г"
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
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse parse russion alpha upper  - Ж', () => {
            expect(parseScript('var Ж = 1;', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 10,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 10
                  }
                },
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 10
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
                          "name": "Ж"
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
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse parse russion alpha upper via hex 4  - \\u0410 ', () => {
            expect(parseScript('var \\u0410 = 1;', {
                raw: true,
                ranges: true,
                locations: true
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
                "body": [
                  {
                    "type": "VariableDeclaration",
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
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "id": {
                          "type": "Identifier",
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
                          "name": "А"
                        },
                        "init": {
                          "type": "Literal",
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
                          "value": 1,
                          "raw": "1"
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse parse russion alpha upper via escape hex - \u{411}', () => {
            expect(parseScript('var \\u{411} = 1;', {
                raw: true,
                ranges: true,
                locations: true
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
                        "start": 4,
                        "end": 15,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 15
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 11,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 4
                            },
                            "end": {
                              "line": 1,
                              "column": 11
                            }
                          },
                          "name": "Б"
                        },
                        "init": {
                          "type": "Literal",
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
                          "value": 1,
                          "raw": "1"
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });
        
        it('should parse parse russion alpha upper via escape hex - \\u{41A}', () => {
            expect(parseScript('var \\u{41A} = 1;', {
                raw: true,
                ranges: true,
                locations: true
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
                        "start": 4,
                        "end": 15,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 15
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 11,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 4
                            },
                            "end": {
                              "line": 1,
                              "column": 11
                            }
                          },
                          "name": "К"
                        },
                        "init": {
                          "type": "Literal",
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
                          "value": 1,
                          "raw": "1"
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse parse russion alpha upper via escape hex - \u{411}', () => {
            expect(parseScript('var \\u{424} = 1;', {
                raw: true,
                ranges: true,
                locations: true
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
                        "start": 4,
                        "end": 15,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 15
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 11,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 4
                            },
                            "end": {
                              "line": 1,
                              "column": 11
                            }
                          },
                          "name": "Ф"
                        },
                        "init": {
                          "type": "Literal",
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
                          "value": 1,
                          "raw": "1"
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse parse russion alpha lower - ю', () => {
            expect(parseScript('var ю = 1;', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 10,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 10
                  }
                },
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 10
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
                          "name": "ю"
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
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse parse russion alpha lower - й', () => {
            expect(parseScript('var й = 1;', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 10,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 10
                  }
                },
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 10
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
                          "name": "й"
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
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });
        
        it('should parse parse russion alpha lower - д', () => {
            expect(parseScript('var д = 1;', {
                raw: true,
                ranges: true,
                locations: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 10,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 10
                  }
                },
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 10,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 0
                      },
                      "end": {
                        "line": 1,
                        "column": 10
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
                          "name": "д"
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
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse part digits via escape hex', () => {
            expect(parseScript('var $\\u{37}', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 11,
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 11,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 11,
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 11,
                          "name": "$7"
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

        it('should parse part digits via escape hex 4', () => {
            expect(parseScript('var $\\u0030 = 0;', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 16,
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 16,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 15,
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 11,
                          "name": "$0"
                        },
                        "init": {
                          "type": "Literal",
                          "start": 14,
                          "end": 15,
                          "value": 0,
                          "raw": "0"
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });

        it('should parse part digits via escape hex', () => {
            expect(parseScript('var $\\u0037 = 7;', {
                raw: true,
                ranges: true,
                locations: true
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
                        "start": 4,
                        "end": 15,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 15
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 11,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 4
                            },
                            "end": {
                              "line": 1,
                              "column": 11
                            }
                          },
                          "name": "$7"
                        },
                        "init": {
                          "type": "Literal",
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
                          "value": 7,
                          "raw": "7"
                        }
                      }
                    ],
                    "kind": "var"
                  }
                ],
                "sourceType": "script"
              });
        });


        it('should parse part digits via escape hex', () => {
            expect(parseScript('var $\\u{30}', {
                raw: true,
                ranges: true
            })).to.eql({
                "type": "Program",
                "start": 0,
                "end": 11,
                "body": [
                  {
                    "type": "VariableDeclaration",
                    "start": 0,
                    "end": 11,
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 4,
                        "end": 11,
                        "id": {
                          "type": "Identifier",
                          "start": 4,
                          "end": 11,
                          "name": "$0"
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
    
        it('should parse yield as reserved word used in identifier in sloppy mode"', () => {
            expect(parseScript('var yield  = 123;', {
                raw: true
            })).to.eql({
                "type": "Program",
                "body": [{
                    "type": "VariableDeclaration",
                    "declarations": [{
                        "type": "VariableDeclarator",
                        "id": {
                            "type": "Identifier",
                            "name": "yield"
                        },
                        "init": {
                            "type": "Literal",
                            "value": 123,
                            "raw": "123"
                        }
                    }],
                    "kind": "var"
                }],
                "sourceType": "script"
            })
        })
    
        it('should parse "aa\u0430"', () => {
            expect(parseScript('aa\\u0430', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 8,
                    "expression": {
                        "end": 8,
                        "start": 0,
                        "type": "Identifier",
                        "name": "aaа"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 8,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse "\u0430"', () => {
            expect(parseScript('\\u0430', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 6,
                    "expression": {
                        "end": 6,
                        "start": 0,
                        "type": "Identifier",
                        "name": "а"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 6,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse "\u0430"', () => {
            expect(parseScript('\\u0430', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 6,
                    "expression": {
                        "end": 6,
                        "start": 0,
                        "type": "Identifier",
                        "name": "а"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 6,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse "\u0430abc"', () => {
            expect(parseScript('\\u0430abc', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 9,
                    "expression": {
                        "end": 9,
                        "start": 0,
                        "type": "Identifier",
                        "name": "аabc"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 9,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    
        it('should parse "\u0430abc"', () => {
            expect(parseScript('\\u{0000000000F8}', {
                ranges: true
            })).to.eql({
                "body": [{
                    "end": 16,
                    "expression": {
                        "end": 16,
                        "start": 0,
                        "type": "Identifier",
                        "name": "ø"
                    },
                    "start": 0,
                    "type": "ExpressionStatement"
                }],
                "end": 16,
                "sourceType": "script",
                "start": 0,
                "type": "Program"
            })
        })
    });