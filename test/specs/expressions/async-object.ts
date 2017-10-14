import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Expressions - Async Object', () => {

    it('should fail on invalid async property', () => {
        expect(() => {
            parseScript(`({async foo: 1});`);
        }).to.throw()
    });

    it('should fail on invalid async object', () => {
        expect(() => {
            parseScript(`async ({a = b});`);
        }).to.not.throw()
    });

    it('should fail on invalid async method return await', () => {
        expect(() => {
            parseScript(`({async foo() { return {await} }});`);
        }).to.throw()
    });

    it('should fail on invalid async method expression', () => {
        expect(() => {
            parseScript(`({async foo() { var await }});`);
        }).to.throw()
    });

    it('should fail on invalid async method empty await', () => {
        expect(() => {
            parseScript(`({async foo() { await }});`);
        }).to.throw()
    });

    it('should fail on invalid async getter method', () => {
        expect(() => {
            parseScript(`({async get foo() { }});`);
        }).to.not.throw()
    });

    it('should fail on invalid async generator method', () => {
        expect(() => {
            parseScript(`({async* foo() { }});`);
        }).to.throw()
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
});