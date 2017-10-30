import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async Object', () => {

    it('should fail on line break after async', () => {
            expect(() => {
                parseScript(`({async
                    a(eval){}})`);
         }).to.throw()
    });

    it('should fail on async generator method if options is not set for it', () => {
        expect(() => {
            parseScript(`({async *a(eval){}})`);
     }).to.throw()
    });

    it('should fail if rest element (identifier) has initializer', () => {
        expect(() => {
            parseScript(`var obj = { async *method([...x = []]) {} };`, { next: true});
     }).to.throw()
    });

    it('should fail if rest element (nested object pattern) has initializer', () => {
        expect(() => {
            parseScript(`var obj = { async *method([...{ x } = []]) {} };`, { next: true});
     }).to.throw()
    });

    it('should fail if est element (identifier) are followed by other elements', () => {
        expect(() => {
            parseScript(`var obj = { async *method([...x, y]) {} };`, { next: true});
     }).to.throw()
    });

    it('should fail if rest element (object binding pattern) are followed by other elements', () => {
        expect(() => {
            parseScript(`var obj = { async *method([...{ x }, y]) {} };`, { next: true});
     }).to.throw()
    });

    it('should fail if rest element (array binding pattern) are followed by other elements', () => {
        expect(() => {
            parseScript(`var obj = { async *method([...[x], y] = [1, 2, 3]) {} };`, { next: true});
     }).to.throw()
    });

    it('should fail if rest element (nested object pattern) has initializer', () => {
        expect(() => {
            parseScript(`var obj = { async *method([...{ x } = []] = []) {} };`, { next: true});
     }).to.throw()
    });

    it('should fail if if FormalParameters default expressions contains await', () => {
        expect(() => {
            parseScript(`({
                async foo (x = await) {  }
              })`, { next: true});
     }).to.throw()
    });

    it('should fail if if AsyncFunctionBody contains SuperCall', () => {
        expect(() => {
            parseScript(`({
                async foo () { super() }
              })`, { next: true});
     }).to.throw()
    });

    it('should fail on async async', () => {
        expect(() => {
            parseScript(`({async async});`);
        }).to.throw();
    });

    it('should fail on object method duplicate parameters', () => {
        expect(() => {
            parseScript(`({
                async foo(a, a) { }
              })`, { next: true});
     }).to.throw()
    });

    it('should fail if FormalParameters contains eval in strict mode', () => {
        expect(() => {
            parseScript(`"use strict"; ({
                async foo(eval) { }
              })`, { next: true});
     }).to.throw()
    });

    it('should fail if if BoundNames of FormalParameters also occurs in the LexicallyDeclaredNames of AsyncFunctionBody', () => {
        expect(() => {
            parseScript(`({
                async function foo(bar) { let bar; }
              })`, { next: true});
     }).to.throw()
    });

    it('should support async as property name', () => {
        expect(parseScript(`({async: async, foo: foo})`, {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 25
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 2
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 7,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 7
                          }
                        },
                        "name": "async"
                      },
                      "value": {
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
                        "name": "async"
                      },
                      "kind": "init"
                    },
                    {
                      "type": "Property",
                      "start": 16,
                      "end": 24,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 24
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
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
                        "name": "foo"
                      },
                      "value": {
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
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should allow async as shorthand property', () => {
        expect(parseScript(`({async})`, {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 8,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 8
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 7,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 2
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
                        "start": 2,
                        "end": 7,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 7
                          }
                        },
                        "name": "async"
                      },
                      "kind": "init",
                      "value": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 7,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 7
                          }
                        },
                        "name": "async"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should allow async as shorthand property', () => {
        expect(parseScript(`({async, foo})`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
                                    "name": "async",
                                    "start": 2,
                                    "end": 7,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 2
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 7
                                        }
                                    }
                                },
                                "value": {
                                    "type": "Identifier",
                                    "name": "async",
                                    "start": 2,
                                    "end": 7,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 2
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 7
                                        }
                                    }
                                },
                                "kind": "init",
                                "computed": false,
                                "method": false,
                                "shorthand": true,
                                "start": 2,
                                "end": 7,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 7
                                    }
                                }
                            },
                            {
                                "type": "Property",
                                "key": {
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
                                "value": {
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
                                "kind": "init",
                                "computed": false,
                                "method": false,
                                "shorthand": true,
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
                            }
                        ],
                        "start": 1,
                        "end": 13,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 13
                            }
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse async functions with vary names', () => {
        expect(parseScript(`({async "foo"(){}})`, {
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 2,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 2
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "method": true,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Literal",
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
                        "value": "foo",
                        "raw": "\"foo\""
                      },
                      "kind": "init",
                      "value": {
                        "type": "FunctionExpression",
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
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": true,
                        "params": [],
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
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should allow async as shorthand property assign', () => {
        expect(parseScript(`({async = 0} = {})`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "left": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "async",
                                        "start": 2,
                                        "end": 7,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 2
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 7
                                            }
                                        }
                                    },
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "async",
                                            "start": 2,
                                            "end": 7,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 2
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 7
                                                }
                                            }
                                        },
                                        "right": {
                                            "type": "Literal",
                                            "value": 0,
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
                                            "raw": "0"
                                        },
                                        "start": 2,
                                        "end": 11,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 2
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 11
                                            }
                                        }
                                    },
                                    "kind": "init",
                                    "computed": false,
                                    "method": false,
                                    "shorthand": true,
                                    "start": 2,
                                    "end": 11,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 2
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 11
                                        }
                                    }
                                }
                            ],
                            "start": 1,
                            "end": 12,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 1
                                },
                                "end": {
                                    "line": 1,
                                    "column": 12
                                }
                            }
                        },
                        "operator": "=",
                        "right": {
                            "type": "ObjectExpression",
                            "properties": [],
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
                        "start": 1,
                        "end": 17,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 17
                            }
                        }
                    },
                    "start": 0,
                    "end": 18,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 18,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 18
                }
            }
        });
    });

    it('should parse async functions with vary name', () => {
        expect(parseScript(`({async "foo"(){}})`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Literal",
                                    "value": "foo",
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
                                    "raw": "\"foo\""
                                },
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
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
                                    "generator": false,
                                    "async": true,
                                    "expression": false,
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
                                    }
                                },
                                "kind": "init",
                                "computed": false,
                                "method": true,
                                "shorthand": false,
                                "start": 2,
                                "end": 17,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 17
                                    }
                                }
                            }
                        ],
                        "start": 1,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 18
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
    });

    it('should parse async functions with number as name', () => {
        expect(parseScript(`({async 100(){}})`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Literal",
                                    "value": 100,
                                    "start": 8,
                                    "end": 11,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 8
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 11
                                        }
                                    },
                                    "raw": "100"
                                },
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
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
                                        }
                                    },
                                    "generator": false,
                                    "async": true,
                                    "expression": false,
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
                                    }
                                },
                                "kind": "init",
                                "computed": false,
                                "method": true,
                                "shorthand": false,
                                "start": 2,
                                "end": 15,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 15
                                    }
                                }
                            }
                        ],
                        "start": 1,
                        "end": 16,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 16
                            }
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse async functions as unary expression', () => {
        expect(parseScript(`({ async delete() {} })`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
                                    "name": "delete",
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
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
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
                                    "generator": false,
                                    "async": true,
                                    "expression": false,
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
                                "kind": "init",
                                "computed": false,
                                "method": true,
                                "shorthand": false,
                                "start": 3,
                                "end": 20,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 3
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            }
                        ],
                        "start": 1,
                        "end": 22,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 22
                            }
                        }
                    },
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse async functions as computed property', () => {
        expect(parseScript(`({async [foo](){}})`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
                                "value": {
                                    "type": "FunctionExpression",
                                    "id": null,
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [],
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
                                    "generator": false,
                                    "async": true,
                                    "expression": false,
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
                                    }
                                },
                                "kind": "init",
                                "computed": true,
                                "method": true,
                                "shorthand": false,
                                "start": 2,
                                "end": 17,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 2
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 17
                                    }
                                }
                            }
                        ],
                        "start": 1,
                        "end": 18,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 18
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
    });

    it('should parse async as identifier', () => {
        expect(parseScript(`({ async: true })`, {
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
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 16,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 16
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                        "type": "Identifier",
                        "start": 3,
                        "end": 8,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 3
                          },
                          "end": {
                            "line": 1,
                            "column": 8
                          }
                        },
                        "name": "async"
                      },
                      "value": {
                        "type": "Literal",
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
                        "value": true,
                        "raw": "true"
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse async method literal', () => {
        expect(parseScript(`({ async "xyz"() {} })`, {
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
            "body": [{
                "type": "ExpressionStatement",
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
                "expression": {
                    "type": "ObjectExpression",
                    "start": 1,
                    "end": 21,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 1,
                            "column": 21
                        }
                    },
                    "properties": [{
                        "type": "Property",
                        "start": 3,
                        "end": 19,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 3
                            },
                            "end": {
                                "line": 1,
                                "column": 19
                            }
                        },
                        "method": true,
                        "shorthand": false,
                        "computed": false,
                        "key": {
                            "type": "Literal",
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
                            "value": "xyz",
                            "raw": "\"xyz\""
                        },
                        "kind": "init",
                        "value": {
                            "type": "FunctionExpression",
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
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
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
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async method computed', () => {
        expect(parseScript(`({ async ["xyz"]() {} })`, {
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
            "body": [{
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
                    "properties": [{
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
                        "computed": true,
                        "key": {
                            "type": "Literal",
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
                            "value": "xyz",
                            "raw": "\"xyz\""
                        },
                        "kind": "init",
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
                            "generator": false,
                            "expression": false,
                            "async": true,
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
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse async method await', () => {
        expect(parseScript(`({ async f(a) { await a } })`, {
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
            "body": [{
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
                    "end": 27,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 1
                        },
                        "end": {
                            "line": 1,
                            "column": 27
                        }
                    },
                    "properties": [{
                        "type": "Property",
                        "start": 3,
                        "end": 25,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 3
                            },
                            "end": {
                                "line": 1,
                                "column": 25
                            }
                        },
                        "method": true,
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
                            "name": "f"
                        },
                        "kind": "init",
                        "value": {
                            "type": "FunctionExpression",
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
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": true,
                            "params": [{
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
                                "name": "a"
                            }],
                            "body": {
                                "type": "BlockStatement",
                                "start": 14,
                                "end": 25,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 14
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 25
                                    }
                                },
                                "body": [{
                                    "type": "ExpressionStatement",
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
                                    "expression": {
                                        "type": "AwaitExpression",
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
                                        "argument": {
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
                                            "name": "a"
                                        }
                                    }
                                }]
                            }
                        }
                    }]
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse lone rest element', () => {
        expect(parseScript(`var obj = { async *method([...x]) {} }`, {
            ranges: true,
            raw: true,
            locations: true,
            next: true
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
                                            "name": "method",
                                            "start": 19,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [
                                                {
                                                    "type": "ArrayPattern",
                                                    "elements": [
                                                        {
                                                            "type": "RestElement",
                                                            "argument": {
                                                                "type": "Identifier",
                                                                "name": "x",
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
                                                                }
                                                            },
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
                                                            }
                                                        }
                                                    ],
                                                    "start": 26,
                                                    "end": 32,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 32
                                                        }
                                                    }
                                                }
                                            ],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
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
                                                }
                                            },
                                            "generator": true,
                                            "async": true,
                                            "expression": false,
                                            "start": 25,
                                            "end": 36,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 36
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": true,
                                        "shorthand": false,
                                        "start": 12,
                                        "end": 36,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 36
                                            }
                                        }
                                    }
                                ],
                                "start": 10,
                                "end": 38,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 38
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "obj",
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
                                }
                            },
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
                            }
                        }
                    ],
                    "kind": "var",
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse bindingElement with object binding pattern', () => {
        expect(parseScript(`var obj = { async *method([{ x, y, z } = { x: 44, y: 55, z: 66 }] = []) {} }`, {
            ranges: true,
            raw: true,
            locations: true,
            next: true
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
                                            "name": "method",
                                            "start": 19,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [
                                                {
                                                    "type": "AssignmentPattern",
                                                    "left": {
                                                        "type": "ArrayPattern",
                                                        "elements": [
                                                            {
                                                                "type": "AssignmentPattern",
                                                                "left": {
                                                                    "type": "ObjectPattern",
                                                                    "properties": [
                                                                        {
                                                                            "type": "Property",
                                                                            "kind": "init",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "x",
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
                                                                            "computed": false,
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "x",
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
                                                                            "method": false,
                                                                            "shorthand": true,
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
                                                                        {
                                                                            "type": "Property",
                                                                            "kind": "init",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "y",
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
                                                                            "computed": false,
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "y",
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
                                                                            "method": false,
                                                                            "shorthand": true,
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
                                                                        {
                                                                            "type": "Property",
                                                                            "kind": "init",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "z",
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
                                                                                }
                                                                            },
                                                                            "computed": false,
                                                                            "value": {
                                                                                "type": "Identifier",
                                                                                "name": "z",
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
                                                                                }
                                                                            },
                                                                            "method": false,
                                                                            "shorthand": true,
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
                                                                            }
                                                                        }
                                                                    ],
                                                                    "start": 27,
                                                                    "end": 38,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 27
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 38
                                                                        }
                                                                    }
                                                                },
                                                                "right": {
                                                                    "type": "ObjectExpression",
                                                                    "properties": [
                                                                        {
                                                                            "type": "Property",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "x",
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
                                                                                }
                                                                            },
                                                                            "value": {
                                                                                "type": "Literal",
                                                                                "value": 44,
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
                                                                                "raw": "44"
                                                                            },
                                                                            "kind": "init",
                                                                            "computed": false,
                                                                            "method": false,
                                                                            "shorthand": false,
                                                                            "start": 43,
                                                                            "end": 48,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 1,
                                                                                    "column": 43
                                                                                },
                                                                                "end": {
                                                                                    "line": 1,
                                                                                    "column": 48
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "Property",
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
                                                                            "value": {
                                                                                "type": "Literal",
                                                                                "value": 55,
                                                                                "start": 53,
                                                                                "end": 55,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 1,
                                                                                        "column": 53
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 1,
                                                                                        "column": 55
                                                                                    }
                                                                                },
                                                                                "raw": "55"
                                                                            },
                                                                            "kind": "init",
                                                                            "computed": false,
                                                                            "method": false,
                                                                            "shorthand": false,
                                                                            "start": 50,
                                                                            "end": 55,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 1,
                                                                                    "column": 50
                                                                                },
                                                                                "end": {
                                                                                    "line": 1,
                                                                                    "column": 55
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            "type": "Property",
                                                                            "key": {
                                                                                "type": "Identifier",
                                                                                "name": "z",
                                                                                "start": 57,
                                                                                "end": 58,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 1,
                                                                                        "column": 57
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 1,
                                                                                        "column": 58
                                                                                    }
                                                                                }
                                                                            },
                                                                            "value": {
                                                                                "type": "Literal",
                                                                                "value": 66,
                                                                                "start": 60,
                                                                                "end": 62,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 1,
                                                                                        "column": 60
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 1,
                                                                                        "column": 62
                                                                                    }
                                                                                },
                                                                                "raw": "66"
                                                                            },
                                                                            "kind": "init",
                                                                            "computed": false,
                                                                            "method": false,
                                                                            "shorthand": false,
                                                                            "start": 57,
                                                                            "end": 62,
                                                                            "loc": {
                                                                                "start": {
                                                                                    "line": 1,
                                                                                    "column": 57
                                                                                },
                                                                                "end": {
                                                                                    "line": 1,
                                                                                    "column": 62
                                                                                }
                                                                            }
                                                                        }
                                                                    ],
                                                                    "start": 41,
                                                                    "end": 64,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 41
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 64
                                                                        }
                                                                    }
                                                                },
                                                                "start": 27,
                                                                "end": 64,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 27
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 64
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "start": 26,
                                                        "end": 65,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 26
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 65
                                                            }
                                                        }
                                                    },
                                                    "right": {
                                                        "type": "ArrayExpression",
                                                        "elements": [],
                                                        "start": 68,
                                                        "end": 70,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 68
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 70
                                                            }
                                                        }
                                                    },
                                                    "start": 26,
                                                    "end": 70,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 70
                                                        }
                                                    }
                                                }
                                            ],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 72,
                                                "end": 74,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 72
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 74
                                                    }
                                                }
                                            },
                                            "generator": true,
                                            "async": true,
                                            "expression": false,
                                            "start": 25,
                                            "end": 74,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 74
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": true,
                                        "shorthand": false,
                                        "start": 12,
                                        "end": 74,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 74
                                            }
                                        }
                                    }
                                ],
                                "start": 10,
                                "end": 76,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 76
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "obj",
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
                                }
                            },
                            "start": 4,
                            "end": 76,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 76
                                }
                            }
                        }
                    ],
                    "kind": "var",
                    "start": 0,
                    "end": 76,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 76
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 76,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 76
                }
            }
        });
    });

    it('should parse nested object destructuring with a value of `undefined`', () => {
        expect(parseScript(`var obj = { async *method([{ x }] = []) {} }`, {
            ranges: true,
            raw: true,
            locations: true,
            next: true
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
                                            "name": "method",
                                            "start": 19,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [
                                                {
                                                    "type": "AssignmentPattern",
                                                    "left": {
                                                        "type": "ArrayPattern",
                                                        "elements": [
                                                            {
                                                                "type": "ObjectPattern",
                                                                "properties": [
                                                                    {
                                                                        "type": "Property",
                                                                        "kind": "init",
                                                                        "key": {
                                                                            "type": "Identifier",
                                                                            "name": "x",
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
                                                                        "computed": false,
                                                                        "value": {
                                                                            "type": "Identifier",
                                                                            "name": "x",
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
                                                                        "method": false,
                                                                        "shorthand": true,
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
                                                                    }
                                                                ],
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
                                                                }
                                                            }
                                                        ],
                                                        "start": 26,
                                                        "end": 33,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 26
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 33
                                                            }
                                                        }
                                                    },
                                                    "right": {
                                                        "type": "ArrayExpression",
                                                        "elements": [],
                                                        "start": 36,
                                                        "end": 38,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 36
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 38
                                                            }
                                                        }
                                                    },
                                                    "start": 26,
                                                    "end": 38,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 38
                                                        }
                                                    }
                                                }
                                            ],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
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
                                                }
                                            },
                                            "generator": true,
                                            "async": true,
                                            "expression": false,
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
                                        "kind": "init",
                                        "computed": false,
                                        "method": true,
                                        "shorthand": false,
                                        "start": 12,
                                        "end": 42,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 42
                                            }
                                        }
                                    }
                                ],
                                "start": 10,
                                "end": 44,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 44
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "obj",
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
                                }
                            },
                            "start": 4,
                            "end": 44,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 44
                                }
                            }
                        }
                    ],
                    "kind": "var",
                    "start": 0,
                    "end": 44,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 44
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 44,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 44
                }
            }
        });
    });

    it('should parse object binding pattern with "nested" array binding pattern taking the `null` value', () => {
        expect(parseScript(`var obj = { async *method({ w: [x, y, z] = [4, 5, 6] } = { w: null }) {}};`, {
            ranges: true,
            raw: true,
            locations: true,
            next: true
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
                                            "name": "method",
                                            "start": 19,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [
                                                {
                                                    "type": "AssignmentPattern",
                                                    "left": {
                                                        "type": "ObjectPattern",
                                                        "properties": [
                                                            {
                                                                "type": "Property",
                                                                "kind": "init",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "w",
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
                                                                    }
                                                                },
                                                                "computed": false,
                                                                "value": {
                                                                    "type": "AssignmentPattern",
                                                                    "left": {
                                                                        "type": "ArrayPattern",
                                                                        "elements": [
                                                                            {
                                                                                "type": "Identifier",
                                                                                "name": "x",
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
                                                                            {
                                                                                "type": "Identifier",
                                                                                "name": "y",
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
                                                                                }
                                                                            },
                                                                            {
                                                                                "type": "Identifier",
                                                                                "name": "z",
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
                                                                                }
                                                                            }
                                                                        ],
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
                                                                    "right": {
                                                                        "type": "ArrayExpression",
                                                                        "elements": [
                                                                            {
                                                                                "type": "Literal",
                                                                                "value": 4,
                                                                                "start": 44,
                                                                                "end": 45,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 1,
                                                                                        "column": 44
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 1,
                                                                                        "column": 45
                                                                                    }
                                                                                },
                                                                                "raw": "4"
                                                                            },
                                                                            {
                                                                                "type": "Literal",
                                                                                "value": 5,
                                                                                "start": 47,
                                                                                "end": 48,
                                                                                "loc": {
                                                                                    "start": {
                                                                                        "line": 1,
                                                                                        "column": 47
                                                                                    },
                                                                                    "end": {
                                                                                        "line": 1,
                                                                                        "column": 48
                                                                                    }
                                                                                },
                                                                                "raw": "5"
                                                                            },
                                                                            {
                                                                                "type": "Literal",
                                                                                "value": 6,
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
                                                                                "raw": "6"
                                                                            }
                                                                        ],
                                                                        "start": 43,
                                                                        "end": 52,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 1,
                                                                                "column": 43
                                                                            },
                                                                            "end": {
                                                                                "line": 1,
                                                                                "column": 52
                                                                            }
                                                                        }
                                                                    },
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
                                                                    }
                                                                },
                                                                "method": false,
                                                                "shorthand": false,
                                                                "start": 28,
                                                                "end": 52,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 28
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 52
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "start": 26,
                                                        "end": 54,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 26
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 54
                                                            }
                                                        }
                                                    },
                                                    "right": {
                                                        "type": "ObjectExpression",
                                                        "properties": [
                                                            {
                                                                "type": "Property",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "w",
                                                                    "start": 59,
                                                                    "end": 60,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 59
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 60
                                                                        }
                                                                    }
                                                                },
                                                                "value": {
                                                                    "type": "Literal",
                                                                    "value": null,
                                                                    "start": 62,
                                                                    "end": 66,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 62
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 66
                                                                        }
                                                                    },
                                                                    "raw": "null"
                                                                },
                                                                "kind": "init",
                                                                "computed": false,
                                                                "method": false,
                                                                "shorthand": false,
                                                                "start": 59,
                                                                "end": 66,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 59
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 66
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "start": 57,
                                                        "end": 68,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 57
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 68
                                                            }
                                                        }
                                                    },
                                                    "start": 26,
                                                    "end": 68,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 68
                                                        }
                                                    }
                                                }
                                            ],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 70,
                                                "end": 72,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 70
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 72
                                                    }
                                                }
                                            },
                                            "generator": true,
                                            "async": true,
                                            "expression": false,
                                            "start": 25,
                                            "end": 72,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 72
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": true,
                                        "shorthand": false,
                                        "start": 12,
                                        "end": 72,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 72
                                            }
                                        }
                                    }
                                ],
                                "start": 10,
                                "end": 73,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 73
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "obj",
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
                                }
                            },
                            "start": 4,
                            "end": 73,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 73
                                }
                            }
                        }
                    ],
                    "kind": "var",
                    "start": 0,
                    "end": 74,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 74
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 74,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 74
                }
            }
        });
    });

    it('should parse binding as specified via property name and identifier', () => {
        expect(parseScript(`var obj = { async *method({ x: y } = { x: 23 }) {} }`, {
            ranges: true,
            raw: true,
            locations: true,
            next: true
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
                                            "name": "method",
                                            "start": 19,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [
                                                {
                                                    "type": "AssignmentPattern",
                                                    "left": {
                                                        "type": "ObjectPattern",
                                                        "properties": [
                                                            {
                                                                "type": "Property",
                                                                "kind": "init",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
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
                                                                    }
                                                                },
                                                                "computed": false,
                                                                "value": {
                                                                    "type": "Identifier",
                                                                    "name": "y",
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
                                                                    }
                                                                },
                                                                "method": false,
                                                                "shorthand": false,
                                                                "start": 28,
                                                                "end": 32,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 28
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 32
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "start": 26,
                                                        "end": 34,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 26
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 34
                                                            }
                                                        }
                                                    },
                                                    "right": {
                                                        "type": "ObjectExpression",
                                                        "properties": [
                                                            {
                                                                "type": "Property",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
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
                                                                    }
                                                                },
                                                                "value": {
                                                                    "type": "Literal",
                                                                    "value": 23,
                                                                    "start": 42,
                                                                    "end": 44,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 42
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 44
                                                                        }
                                                                    },
                                                                    "raw": "23"
                                                                },
                                                                "kind": "init",
                                                                "computed": false,
                                                                "method": false,
                                                                "shorthand": false,
                                                                "start": 39,
                                                                "end": 44,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 39
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 44
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "start": 37,
                                                        "end": 46,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 37
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 46
                                                            }
                                                        }
                                                    },
                                                    "start": 26,
                                                    "end": 46,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 46
                                                        }
                                                    }
                                                }
                                            ],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 48,
                                                "end": 50,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 48
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 50
                                                    }
                                                }
                                            },
                                            "generator": true,
                                            "async": true,
                                            "expression": false,
                                            "start": 25,
                                            "end": 50,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 50
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": true,
                                        "shorthand": false,
                                        "start": 12,
                                        "end": 50,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 50
                                            }
                                        }
                                    }
                                ],
                                "start": 10,
                                "end": 52,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 52
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "obj",
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
                                }
                            },
                            "start": 4,
                            "end": 52,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 52
                                }
                            }
                        }
                    ],
                    "kind": "var",
                    "start": 0,
                    "end": 52,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 52
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
                    "line": 1,
                    "column": 52
                }
            }
        });
    });

    it('should parse bindingElement with array binding pattern', () => {
        expect(parseScript(`var obj = { *method([[,] = g()]) {} }`, {
            ranges: true,
            raw: true,
            locations: true,
            next: true
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
                                            "name": "method",
                                            "start": 13,
                                            "end": 19,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 13
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 19
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [
                                                {
                                                    "type": "ArrayPattern",
                                                    "elements": [
                                                        {
                                                            "type": "AssignmentPattern",
                                                            "left": {
                                                                "type": "ArrayPattern",
                                                                "elements": [
                                                                    null
                                                                ],
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
                                                                }
                                                            },
                                                            "right": {
                                                                "type": "CallExpression",
                                                                "callee": {
                                                                    "type": "Identifier",
                                                                    "name": "g",
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
                                                                    }
                                                                },
                                                                "arguments": [],
                                                                "start": 27,
                                                                "end": 30,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 27
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 30
                                                                    }
                                                                }
                                                            },
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
                                                            }
                                                        }
                                                    ],
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
                                                    }
                                                }
                                            ],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
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
                                                }
                                            },
                                            "generator": true,
                                            "async": false,
                                            "expression": false,
                                            "start": 19,
                                            "end": 35,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 35
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": true,
                                        "shorthand": false,
                                        "start": 12,
                                        "end": 35,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 35
                                            }
                                        }
                                    }
                                ],
                                "start": 10,
                                "end": 37,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 37
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "obj",
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
                                }
                            },
                            "start": 4,
                            "end": 37,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 37
                                }
                            }
                        }
                    ],
                    "kind": "var",
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
    });

    it('should parse with elison', () => {
        expect(parseScript(`var obj = { *method([,]) {} }`, {
            ranges: true,
            raw: true,
            locations: true,
            next: true
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
                    "start": 4,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 29
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
                      "name": "obj"
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 10,
                      "end": 29,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 29
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 12,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 27
                            }
                          },
                          "method": true,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 13,
                            "end": 19,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 13
                              },
                              "end": {
                                "line": 1,
                                "column": 19
                              }
                            },
                            "name": "method"
                          },
                          "kind": "init",
                          "value": {
                            "type": "FunctionExpression",
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
                            },
                            "id": null,
                            "generator": true,
                            "expression": false,
                            "async": false,
                            "params": [
                              {
                                "type": "ArrayPattern",
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
                                "elements": [
                                  null
                                ]
                              }
                            ],
                            "body": {
                              "type": "BlockStatement",
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
                              "body": []
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

    it('should parse destructuring initializer with an undefined value', () => {
        expect(parseScript(`var obj = { *method([x = 23] = [undefined]) {} }`, {
            ranges: true,
            raw: true,
            locations: true,
            next: true
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
                                            "name": "method",
                                            "start": 13,
                                            "end": 19,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 13
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 19
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [
                                                {
                                                    "type": "AssignmentPattern",
                                                    "left": {
                                                        "type": "ArrayPattern",
                                                        "elements": [
                                                            {
                                                                "type": "AssignmentPattern",
                                                                "left": {
                                                                    "type": "Identifier",
                                                                    "name": "x",
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
                                                                "right": {
                                                                    "type": "Literal",
                                                                    "value": 23,
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
                                                                    "raw": "23"
                                                                },
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
                                                                }
                                                            }
                                                        ],
                                                        "start": 20,
                                                        "end": 28,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 20
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 28
                                                            }
                                                        }
                                                    },
                                                    "right": {
                                                        "type": "ArrayExpression",
                                                        "elements": [
                                                            {
                                                                "type": "Identifier",
                                                                "name": "undefined",
                                                                "start": 32,
                                                                "end": 41,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 32
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 41
                                                                    }
                                                                }
                                                            }
                                                        ],
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
                                                    "start": 20,
                                                    "end": 42,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 20
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 42
                                                        }
                                                    }
                                                }
                                            ],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
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
                                                }
                                            },
                                            "generator": true,
                                            "async": false,
                                            "expression": false,
                                            "start": 19,
                                            "end": 46,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 46
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": true,
                                        "shorthand": false,
                                        "start": 12,
                                        "end": 46,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 46
                                            }
                                        }
                                    }
                                ],
                                "start": 10,
                                "end": 48,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 48
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "obj",
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
                                }
                            },
                            "start": 4,
                            "end": 48,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 48
                                }
                            }
                        }
                    ],
                    "kind": "var",
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
                    }
                }
            ],
            "sourceType": "script",
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
            }
        });
    });

    it('should parse object binding pattern with "nested" object binding pattern taking the `null` value', () => {
        expect(parseScript(`var obj = { *method({ w: { x, y, z } = undefined } = { }) {} }`, {
            ranges: true,
            raw: true,
            locations: true,
            next: true
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
                                            "name": "method",
                                            "start": 13,
                                            "end": 19,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 13
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 19
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [
                                                {
                                                    "type": "AssignmentPattern",
                                                    "left": {
                                                        "type": "ObjectPattern",
                                                        "properties": [
                                                            {
                                                                "type": "Property",
                                                                "kind": "init",
                                                                "key": {
                                                                    "type": "Identifier",
                                                                    "name": "w",
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
                                                                "computed": false,
                                                                "value": {
                                                                    "type": "AssignmentPattern",
                                                                    "left": {
                                                                        "type": "ObjectPattern",
                                                                        "properties": [
                                                                            {
                                                                                "type": "Property",
                                                                                "kind": "init",
                                                                                "key": {
                                                                                    "type": "Identifier",
                                                                                    "name": "x",
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
                                                                                    }
                                                                                },
                                                                                "computed": false,
                                                                                "value": {
                                                                                    "type": "Identifier",
                                                                                    "name": "x",
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
                                                                                    }
                                                                                },
                                                                                "method": false,
                                                                                "shorthand": true,
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
                                                                                }
                                                                            },
                                                                            {
                                                                                "type": "Property",
                                                                                "kind": "init",
                                                                                "key": {
                                                                                    "type": "Identifier",
                                                                                    "name": "y",
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
                                                                                    }
                                                                                },
                                                                                "computed": false,
                                                                                "value": {
                                                                                    "type": "Identifier",
                                                                                    "name": "y",
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
                                                                                    }
                                                                                },
                                                                                "method": false,
                                                                                "shorthand": true,
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
                                                                                }
                                                                            },
                                                                            {
                                                                                "type": "Property",
                                                                                "kind": "init",
                                                                                "key": {
                                                                                    "type": "Identifier",
                                                                                    "name": "z",
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
                                                                                    }
                                                                                },
                                                                                "computed": false,
                                                                                "value": {
                                                                                    "type": "Identifier",
                                                                                    "name": "z",
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
                                                                                    }
                                                                                },
                                                                                "method": false,
                                                                                "shorthand": true,
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
                                                                                }
                                                                            }
                                                                        ],
                                                                        "start": 25,
                                                                        "end": 36,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 1,
                                                                                "column": 25
                                                                            },
                                                                            "end": {
                                                                                "line": 1,
                                                                                "column": 36
                                                                            }
                                                                        }
                                                                    },
                                                                    "right": {
                                                                        "type": "Identifier",
                                                                        "name": "undefined",
                                                                        "start": 39,
                                                                        "end": 48,
                                                                        "loc": {
                                                                            "start": {
                                                                                "line": 1,
                                                                                "column": 39
                                                                            },
                                                                            "end": {
                                                                                "line": 1,
                                                                                "column": 48
                                                                            }
                                                                        }
                                                                    },
                                                                    "start": 25,
                                                                    "end": 48,
                                                                    "loc": {
                                                                        "start": {
                                                                            "line": 1,
                                                                            "column": 25
                                                                        },
                                                                        "end": {
                                                                            "line": 1,
                                                                            "column": 48
                                                                        }
                                                                    }
                                                                },
                                                                "method": false,
                                                                "shorthand": false,
                                                                "start": 22,
                                                                "end": 48,
                                                                "loc": {
                                                                    "start": {
                                                                        "line": 1,
                                                                        "column": 22
                                                                    },
                                                                    "end": {
                                                                        "line": 1,
                                                                        "column": 48
                                                                    }
                                                                }
                                                            }
                                                        ],
                                                        "start": 20,
                                                        "end": 50,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 20
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 50
                                                            }
                                                        }
                                                    },
                                                    "right": {
                                                        "type": "ObjectExpression",
                                                        "properties": [],
                                                        "start": 53,
                                                        "end": 56,
                                                        "loc": {
                                                            "start": {
                                                                "line": 1,
                                                                "column": 53
                                                            },
                                                            "end": {
                                                                "line": 1,
                                                                "column": 56
                                                            }
                                                        }
                                                    },
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
                                                    }
                                                }
                                            ],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 58,
                                                "end": 60,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 58
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 60
                                                    }
                                                }
                                            },
                                            "generator": true,
                                            "async": false,
                                            "expression": false,
                                            "start": 19,
                                            "end": 60,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 60
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": true,
                                        "shorthand": false,
                                        "start": 12,
                                        "end": 60,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 12
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 60
                                            }
                                        }
                                    }
                                ],
                                "start": 10,
                                "end": 62,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 62
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "obj",
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
                                }
                            },
                            "start": 4,
                            "end": 62,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 62
                                }
                            }
                        }
                    ],
                    "kind": "var",
                    "start": 0,
                    "end": 62,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 62
                        }
                    }
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 62,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 62
                }
            }
        });
    });

    it('should parse with trailing comma', () => {
        expect(parseScript(`var obj = { async *method({ x: y, }) {} }`, {
            ranges: true,
            raw: true,
            locations: true,
            next: true
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
                                            "name": "method",
                                            "start": 19,
                                            "end": 25,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 19
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 25
                                                }
                                            }
                                        },
                                        "value": {
                                            "type": "FunctionExpression",
                                            "id": null,
                                            "params": [
                                                {
                                                    "type": "ObjectPattern",
                                                    "properties": [
                                                        {
                                                            "type": "Property",
                                                            "kind": "init",
                                                            "key": {
                                                                "type": "Identifier",
                                                                "name": "x",
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
                                                                }
                                                            },
                                                            "computed": false,
                                                            "value": {
                                                                "type": "Identifier",
                                                                "name": "y",
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
                                                                }
                                                            },
                                                            "method": false,
                                                            "shorthand": false,
                                                            "start": 28,
                                                            "end": 32,
                                                            "loc": {
                                                                "start": {
                                                                    "line": 1,
                                                                    "column": 28
                                                                },
                                                                "end": {
                                                                    "line": 1,
                                                                    "column": 32
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    "start": 26,
                                                    "end": 35,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 26
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 35
                                                        }
                                                    }
                                                }
                                            ],
                                            "body": {
                                                "type": "BlockStatement",
                                                "body": [],
                                                "start": 37,
                                                "end": 39,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 37
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 39
                                                    }
                                                }
                                            },
                                            "generator": true,
                                            "async": true,
                                            "expression": false,
                                            "start": 25,
                                            "end": 39,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 25
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 39
                                                }
                                            }
                                        },
                                        "kind": "init",
                                        "computed": false,
                                        "method": true,
                                        "shorthand": false,
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
                                    }
                                ],
                                "start": 10,
                                "end": 41,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 10
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 41
                                    }
                                }
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "obj",
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
                                }
                            },
                            "start": 4,
                            "end": 41,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 4
                                },
                                "end": {
                                    "line": 1,
                                    "column": 41
                                }
                            }
                        }
                    ],
                    "kind": "var",
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
});