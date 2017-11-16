import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statement - Labelled', () => {

    it('should fail on labelled class', () => {
        expect(() => {
            parseScript(`foo: class X {}`)
        }).to.throw();
    });

    it('should fail on labelled const', () => {
        expect(() => {
            parseScript(`foo: const bar = null;`)
        }).to.throw();
    });

    it('should fail on await as label in module code', () => {
      expect(() => {
          parseModule(`await: 1`)
      }).to.throw();
    });

    it('should fail on labelled let', () => {
        expect(() => {
            parseScript(`foo: let bar;`)
        }).to.throw();
    });

    it('should fail if let declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript(`label: let x = 1;`)
        }).to.throw();
    });

    it('should fail on "aw\\u0061it: 1;"', () => {
        expect(() => {
            parseScript(`"use strict"; aw\\u0061it: 1;`)
        }).to.throw();
    });
    it('should fail if use await keyword as label in strict mode"', () => {
        expect(() => {
            parseModule(`aw\\u0061it: 1;`)
        }).to.throw();
    });
    it('should fail if use await keyword as label in strict mode"', () => {
        expect(() => {
            parseModule(`label: async function* g() {}`)
        }).to.throw();
    });

    it('should fail on escaped yield ( strict mode code)', () => {
        expect(() => {
            parseScript(`"use strict"; yi\\u0065ld: 1;`)
        }).to.throw();
    });

    it('should fail on escaped await ( strict mode code)', () => {
      expect(() => {
          parseScript(`"use strict"; aw\\u0061it: 1;`)
      }).to.throw();
  });

    it('should fail if Lexical declaration (const) used in statement position"', () => {
        expect(() => {
            parseScript(`label: const x = null;`)
        }).to.throw();
    });
    it('should fail if Lexical declaration (let) used in statement position"', () => {
        expect(() => {
            parseScript(`label: let x;`)
        }).to.throw();
    });
    it('should fail on "if(0) label: function f(){}"', () => {
        expect(() => {
            parseScript(`if(0) label: function f(){}`)
        }).to.throw();
    });
    it('should fail on "if(0) labelA: labelB: function f(){}"', () => {
        expect(() => {
            parseScript(`if(0) labelA: labelB: function f(){}`)
        }).to.throw();
    });
    it('should fail on "if(0) label: function f(){} else ;"', () => {
        expect(() => {
            parseScript(`if(0) label: function f(){} else ;`)
        }).to.throw();
    });
    it('should fail on "if(0) ; else label: function f(){}"', () => {
        expect(() => {
            parseScript(`if(0) ; else label: function f(){}`)
        }).to.throw();
    });
    
    it('should fail on "label: continue label;"', () => {
        expect(() => {
            parseScript(`label: continue label;`)
        }).to.throw();
    });
    it('should fail on "label: if(0) continue label;"', () => {
        expect(() => {
            parseScript(`label: if(0) continue label;`)
        }).to.throw();
    });
    it('should fail on "if(0) ; else label: function f(){}"', () => {
        expect(() => {
            parseScript(`if(0) ; else label: function f(){}`)
        }).to.throw();
    });

    it('should fail on "if(0) ; else label: function f(){}"', () => {
        expect(() => {
            parseScript(`if(0) ; else label: function f(){}`)
        }).to.throw();
    });

    it('should fail on ""use strict"; implements:"abc";"', () => {
        expect(() => {
            parseScript(`"use strict"; implements:"abc";`)
        }).to.throw();
    });
    it('should fail on ""use strict"; implements:123;"', () => {
        expect(() => {
            parseScript(`"use strict"; implements:123;`)
        }).to.throw();
    });
    it('should fail on ""use strict"; implements:0;"', () => {
        expect(() => {
            parseScript(`"use strict"; implements:0;`)
        }).to.throw();
    });
    it('should fail on ""use strict"; static:2;"', () => {
        expect(() => {
            parseScript(`"use strict"; static:2;`)
        }).to.throw();
    });

    it('should fail on "function f(){ label: label: ; }"', () => {
        expect(() => {
            parseScript(`function f(){ label: label: ; }`)
        }).to.throw();
    });
    it('should fail on "label: label: ;"', () => {
        expect(() => {
            parseScript(`label: label: ;`)
        }).to.throw();
    });
    it('should fail on "break label;"', () => {
        expect(() => {
            parseScript(`break label;`)
        }).to.throw();
    });
    it('should fail on "labelA: break labelB;"', () => {
        expect(() => {
            parseScript(`labelA: break labelB;`)
        }).to.throw();
    });
    it('should fail on ""use strict"; label: function f(){}"', () => {
        expect(() => {
            parseScript(`"use strict"; label: function f(){}`)
        }).to.throw();
    });
    it('should fail on invalid generator label"', () => {
        expect(() => {
            parseScript(`a: function *g() {}`)
        }).to.throw();
    });
    it('should fail on invalid function label in strict mode', () => {
        expect(() => {
            parseModule(`a: function b() {}`)
        }).to.throw();
    });

    it('should fail on invalid function label - strict directive', () => {
        expect(() => {
            parseScript(`"use strict"; a: function f(){}`)
        }).to.throw();
    });

    it('should fail on "while ( false ) Label: continue Label;""', () => {
        expect(() => {
            parseScript(`while ( false ) Label: continue Label;`)
        }).to.not.throw();
    });
    
    it('should fail if ExpressionStatement doesn not have a lookahead restriction for `let', () => {
        expect(() => {
            parseScript(`var C = class { 'constructor'; };`, { next: true})
        }).to.throw();
    });

    it('should parse await as label in non-module code', () => {
      expect(parseScript('aw\\u0061it: 1;', {
          raw: true,
      })).to.eql({
          "body": [
            {
             "body": {
                "expression": {
                  "raw": "1",
                  "type": "Literal",
                  "value": 1,
                },
                "type": "ExpressionStatement",
              },
              "label": {
                "name": "await",
                "type": "Identifier",
              },
             "type": "LabeledStatement",
            },
          ],
          "sourceType": "script",
          "type": "Program",
        });
    });

    it('should parse await as label in non-module code', () => {
      expect(parseScript('yi\\u0065ld: 1;', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
          "body": [
            {
              "body": {
                "end": 14,
               "expression": {
                  "end": 13,
                  "loc": {
                    "end": {
                      "column": 13,
                    "line": 1,
                    },
                    "start": {
                      "column": 12,
                      "line": 1,
                    }
                  },
                 "raw": "1",
                  "start": 12,
                  "type": "Literal",
                  "value": 1,
                },
                "loc": {
                  "end": {
                    "column": 14,
                    "line": 1,
                  },
                  "start": {
                    "column": 12,
                    "line": 1,
                  },
               },
                "start": 12,
                "type": "ExpressionStatement",
              },
              "end": 14,
             "label": {
                "end": 10,
                "loc": {
                 "end": {
                    "column": 10,
                    "line": 1,
                  },
                  "start": {
                    "column": 0,
                    "line": 1,
                  },
                },
                "name": "yield",
                "start": 0,
                "type": "Identifier",
              },
              "loc": {
                "end": {
                  "column": 14,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "start": 0,
              "type": "LabeledStatement",
            }
          ],
          "end": 14,
          "loc": {
            "end": {
              "column": 14,
              "line": 1,
            },
            "start": {
              "column": 0,
              "line": 1,
            },
          },
          "sourceType": "script",
          "start": 0,
          "type": "Program"
        });
    });
    
    
    it('should parse await as label in non-module code', () => {
      expect(parseScript('await: 1;', {
          ranges: true,
          raw: true,
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
            "type": "LabeledStatement",
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
            "body": {
              "type": "ExpressionStatement",
              "start": 7,
              "end": 9,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 7
                },
                "end": {
                  "line": 1,
                  "column": 9
                }
              },
              "expression": {
                "type": "Literal",
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
                "value": 1,
                "raw": "1"
              }
            },
            "label": {
              "type": "Identifier",
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
              "name": "await"
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse valid labeleld var"', () => {
        expect(parseScript('foo: var bar;', {
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
                "type": "LabeledStatement",
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
                "body": {
                  "type": "VariableDeclaration",
                  "start": 5,
                  "end": 13,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 13
                    }
                  },
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
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
                        "name": "bar"
                      },
                      "init": null
                    }
                  ],
                  "kind": "var"
                },
                "label": {
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
                  "name": "foo"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "foo: if (true) break foo;""', () => {
        expect(parseScript('foo: if (true) break foo;', {
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
                "type": "LabeledStatement",
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
                "body": {
                  "type": "IfStatement",
                  "start": 5,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 25
                    }
                  },
                  "test": {
                    "type": "Literal",
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
                    "value": true,
                    "raw": "true"
                  },
                  "consequent": {
                    "type": "BreakStatement",
                    "start": 15,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 15
                      },
                      "end": {
                        "line": 1,
                        "column": 25
                      }
                    },
                    "label": {
                      "type": "Identifier",
                      "start": 21,
                      "end": 24,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 21
                        },
                        "end": {
                          "line": 1,
                          "column": 24
                        }
                      },
                      "name": "foo"
                    }
                  },
                  "alternate": null
                },
                "label": {
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
                  "name": "foo"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse two labels"', () => {
        expect(parseScript('target1: target2: target3: while (true) { continue target1; }', {
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
                "line": 1,
                "column": 61
              }
            },
            "body": [
              {
                "type": "LabeledStatement",
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
                "body": {
                  "type": "LabeledStatement",
                  "start": 9,
                  "end": 61,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 61
                    }
                  },
                  "body": {
                    "type": "LabeledStatement",
                    "start": 18,
                    "end": 61,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 18
                      },
                      "end": {
                        "line": 1,
                        "column": 61
                      }
                    },
                    "body": {
                      "type": "WhileStatement",
                      "start": 27,
                      "end": 61,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 27
                        },
                        "end": {
                          "line": 1,
                          "column": 61
                        }
                      },
                      "test": {
                        "type": "Literal",
                        "start": 34,
                        "end": 38,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 34
                          },
                          "end": {
                            "line": 1,
                            "column": 38
                          }
                        },
                        "value": true,
                        "raw": "true"
                      },
                      "body": {
                        "type": "BlockStatement",
                        "start": 40,
                        "end": 61,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 40
                          },
                          "end": {
                            "line": 1,
                            "column": 61
                          }
                        },
                        "body": [
                          {
                            "type": "ContinueStatement",
                            "start": 42,
                            "end": 59,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 42
                              },
                              "end": {
                                "line": 1,
                                "column": 59
                              }
                            },
                            "label": {
                              "type": "Identifier",
                              "start": 51,
                              "end": 58,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 51
                                },
                                "end": {
                                  "line": 1,
                                  "column": 58
                                }
                              },
                              "name": "target1"
                            }
                          }
                        ]
                      }
                    },
                    "label": {
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
                      "name": "target3"
                    }
                  },
                  "label": {
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
                    "name": "target2"
                  }
                },
                "label": {
                  "type": "Identifier",
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
                  "name": "target1"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse two labels"', () => {
        expect(parseScript('foo: 10; foo: 20;', {
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
                "type": "LabeledStatement",
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
                "body": {
                  "type": "ExpressionStatement",
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
                  "expression": {
                    "type": "Literal",
                    "start": 5,
                    "end": 7,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 5
                      },
                      "end": {
                        "line": 1,
                        "column": 7
                      }
                    },
                    "value": 10,
                    "raw": "10"
                  }
                },
                "label": {
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
                  "name": "foo"
                }
              },
              {
                "type": "LabeledStatement",
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
                "body": {
                  "type": "ExpressionStatement",
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
                  },
                  "expression": {
                    "type": "Literal",
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
                    },
                    "value": 20,
                    "raw": "20"
                  }
                },
                "label": {
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
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse yield as label in non-strict mode"', () => {
        expect(parseScript('yield: 1;', {
            ranges: true,
            raw: true,
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
                "type": "LabeledStatement",
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
                "body": {
                  "type": "ExpressionStatement",
                  "start": 7,
                  "end": 9,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 9
                    }
                  },
                  "expression": {
                    "type": "Literal",
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
                    "value": 1,
                    "raw": "1"
                  }
                },
                "label": {
                  "type": "Identifier",
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
                  "name": "yield"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "a: function b() {}"', () => {
        expect(parseScript('a: function b() {}', {
            ranges: true,
            raw: true
        })).to.eql({
            "body": [{
                "body": {
                    "body": {
                        "body": [],
                        "end": 18,
                        "start": 16,
                        "type": "BlockStatement"
                    },
                    "end": 18,
                    "expression": false,
                    "generator": false,
                    "async": false,
                    "id": {
                        "end": 13,
                        "name": "b",
                        "start": 12,
                        "type": "Identifier"
                    },
                    "params": [],
                    "start": 3,
                    "type": "FunctionDeclaration"
                },
                "end": 18,
                "label": {
                    "end": 1,
                    "name": "a",
                    "start": 0,
                    "type": "Identifier"
                },
                "start": 0,
                "type": "LabeledStatement"
            }, ],
            "end": 18,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse "start: for (;;) break start"', () => {
        expect(parseScript('start: for (;;) break start')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "start"
                },
                "body": {
                    "type": "ForStatement",
                    "init": null,
                    "test": null,
                    "update": null,
                    "body": {
                        "type": "BreakStatement",
                        "label": {
                            "type": "Identifier",
                            "name": "start"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "start: while (true) break start"', () => {
        expect(parseScript('start: while (true) break start')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "start"
                },
                "body": {
                    "type": "WhileStatement",
                    "test": {
                        "type": "Literal",
                        "value": true
                    },
                    "body": {
                        "type": "BreakStatement",
                        "label": {
                            "type": "Identifier",
                            "name": "start"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "a:{break a;}"', () => {
        expect(parseScript('a:{break a;}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "a"
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [{
                        "type": "BreakStatement",
                        "label": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse a: function b() {}', () => {
        expect(parseScript('a: function b() {}')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "a"
                },
                "body": {
                    "type": "FunctionDeclaration",
                    "id": {
                        "type": "Identifier",
                        "name": "b"
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


    it('should parse start: while (true) break start', () => {
        expect(parseScript('start: while (true) break start')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "start"
                },
                "body": {
                    "type": "WhileStatement",
                    "test": {
                        "type": "Literal",
                        "value": true,
                    },
                    "body": {
                        "type": "BreakStatement",
                        "label": {
                            "type": "Identifier",
                            "name": "start"
                        }
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse__proto__: test', () => {
        expect(parseScript('__proto__: test')).to.eql({
            "type": "Program",
            "body": [{
                "type": "LabeledStatement",
                "label": {
                    "type": "Identifier",
                    "name": "__proto__"
                },
                "body": {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "Identifier",
                        "name": "test"
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse two labels without wrongly reporting duplicates', () => {
        expect(parseScript(`loop:
            switch(c) {}
            loop:
            switch(c) {}`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 73,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 24
              }
            },
            "body": [
              {
                "type": "LabeledStatement",
                "start": 0,
                "end": 30,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 2,
                    "column": 24
                  }
                },
                "body": {
                  "type": "SwitchStatement",
                  "start": 18,
                  "end": 30,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 12
                    },
                    "end": {
                      "line": 2,
                      "column": 24
                    }
                  },
                  "discriminant": {
                    "type": "Identifier",
                    "start": 25,
                    "end": 26,
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
                    "name": "c"
                  },
                  "cases": []
                },
                "label": {
                  "type": "Identifier",
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
                  "name": "loop"
                }
              },
              {
                "type": "LabeledStatement",
                "start": 43,
                "end": 73,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 12
                  },
                  "end": {
                    "line": 4,
                    "column": 24
                  }
                },
                "body": {
                  "type": "SwitchStatement",
                  "start": 61,
                  "end": 73,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 12
                    },
                    "end": {
                      "line": 4,
                      "column": 24
                    }
                  },
                  "discriminant": {
                    "type": "Identifier",
                    "start": 68,
                    "end": 69,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 19
                      },
                      "end": {
                        "line": 4,
                        "column": 20
                      }
                    },
                    "name": "c"
                  },
                  "cases": []
                },
                "label": {
                  "type": "Identifier",
                  "start": 43,
                  "end": 47,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 12
                    },
                    "end": {
                      "line": 3,
                      "column": 16
                    }
                  },
                  "name": "loop"
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse two labels"', () => {
      expect(parseScript('a: { b: switch(x) {} }', {
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
            "type": "LabeledStatement",
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
              "type": "BlockStatement",
              "start": 3,
              "end": 22,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 3
                },
                "end": {
                  "line": 1,
                  "column": 22
                }
              },
              "body": [
                {
                  "type": "LabeledStatement",
                  "start": 5,
                  "end": 20,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 5
                    },
                    "end": {
                      "line": 1,
                      "column": 20
                    }
                  },
                  "body": {
                    "type": "SwitchStatement",
                    "start": 8,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "discriminant": {
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
                    "cases": []
                  },
                  "label": {
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
                    "name": "b"
                  }
                }
              ]
            },
            "label": {
              "type": "Identifier",
              "start": 0,
              "end": 1,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 1
                }
              },
              "name": "a"
            }
          }
        ],
        "sourceType": "script"
      });
    });
});