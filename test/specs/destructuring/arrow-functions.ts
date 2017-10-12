import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('destructuring - Arrow functions', () => {

    it('should fail on "foo(a=1 => 42);"', () => {
        expect(() => {
            parseScript('foo(a=1 => 42);')
        }).to.throw()
    });

    it('should fail on "foo([a,b] => 42);"', () => {
        expect(() => {
            parseScript('foo([a,b] => 42);')
        }).to.throw()
    });

    it('should parse attempted spread param', () => {
        expect(parseScript('(a, ...[b]) => {};', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 18,
                "expression": {
                    "body": {
                        "body": [],
                        "end": 17,
                        "start": 15,
                        "type": "BlockStatement"
                    },
                    "end": 17,
                    "expression": false,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [{
                            "end": 2,
                            "name": "a",
                            "start": 1,
                            "type": "Identifier"
                        },
                        {
                            "argument": {
                                "elements": [{
                                    "end": 9,
                                    "name": "b",
                                    "start": 8,
                                    "type": "Identifier"
                                }],
                                "end": 10,
                                "start": 7,
                                "type": "ArrayPattern"
                            },
                            "end": 10,
                            "start": 4,
                            "type": "RestElement"
                        }
                    ],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 18,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse arrow with rest', () => {
        expect(parseScript('(...a) => {};', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "RestElement",
                        "argument": {
                            "type": "Identifier",
                            "name": "a"
                        }
                    }],
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
        })
    });

    it('should parse arrow with multi rest', () => {
        expect(parseScript('(a, ...b) => {};', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 16,
                "expression": {
                    "body": {
                        "body": [],
                        "end": 15,
                        "start": 13,
                        "type": "BlockStatement"
                    },
                    "end": 15,
                    "expression": false,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [{
                            "end": 2,
                            "name": "a",
                            "start": 1,
                            "type": "Identifier"
                        },
                        {
                            "argument": {
                                "end": 8,
                                "name": "b",
                                "start": 7,
                                "type": "Identifier"
                            },
                            "end": 8,
                            "start": 4,
                            "type": "RestElement"
                        }
                    ],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 16,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        })
    });

    it('should parse arrow param with array"', () => {
        expect(parseScript('([y]) => x;', {
            ranges: false
        })).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "ArrowFunctionExpression",
                    "id": null,
                    "params": [{
                        "type": "ArrayPattern",
                        "elements": [{
                            "type": "Identifier",
                            "name": "y"
                        }]
                    }],
                    "body": {
                        "type": "Identifier",
                        "name": "x"
                    },
                    "generator": false,
                    "expression": true,
                    "async": false
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse param with nested array"', () => {
        expect(parseScript('([y, [x]]) => x;', {
            ranges: true
        })).to.eql({
            "body": [{
                "end": 16,
                "expression": {
                    "body": {
                        "end": 15,
                        "name": "x",
                        "start": 14,
                        "type": "Identifier"
                    },
                    "end": 15,
                    "expression": true,
                    "generator": false,
                    "async": false,
                    "id": null,
                    "params": [{
                        "elements": [{
                                "end": 3,
                                "name": "y",
                                "start": 2,
                                "type": "Identifier"
                            },
                            {
                                "elements": [{
                                    "end": 7,
                                    "name": "x",
                                    "start": 6,
                                    "type": "Identifier"
                                }],
                                "end": 8,
                                "start": 5,
                                "type": "ArrayPattern"
                            }
                        ],
                        "end": 9,
                        "start": 1,
                        "type": "ArrayPattern"
                    }],
                    "start": 0,
                    "type": "ArrowFunctionExpression"
                },
                "start": 0,
                "type": "ExpressionStatement"
            }],
            "end": 16,
            "sourceType": "script",
            "start": 0,
            "type": "Program"
        });
    });

    it('should parse param with default array', () => {
        expect(parseScript('([x = 10]) => x', {
            ranges: true,
            locations: true,
            raw: true
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
                      "start": 1,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "elements": [
                        {
                          "type": "AssignmentPattern",
                          "start": 2,
                          "end": 8,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 8
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 3,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 3
                              }
                            },
                            "name": "x"
                          },
                          "right": {
                            "type": "Literal",
                            "start": 6,
                            "end": 8,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 6
                              },
                              "end": {
                                "line": 1,
                                "column": 8
                              }
                            },
                            "value": 10,
                            "raw": "10"
                          }
                        }
                      ]
                    }
                  ],
                  "body": {
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
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse arrow param object', () => {
        expect(parseScript('({y}) => x;', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 11,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 11
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 11,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 11
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 4,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 4
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 3,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
                            },
                            "end": {
                              "line": 1,
                              "column": 3
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 3,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 3
                              }
                            },
                            "name": "y"
                          },
                          "kind": "init",
                          "value": {
                            "type": "Identifier",
                            "start": 2,
                            "end": 3,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 3
                              }
                            },
                            "name": "y"
                          }
                        }
                      ]
                    }
                  ],
                  "body": {
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
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse param with nested object', () => {
        expect(parseScript('({x = 10, y: { z = 10 }}) => [x, z]', {
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
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 24,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 24
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 2,
                          "end": 8,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 2
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
                            "start": 2,
                            "end": 3,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 3
                              }
                            },
                            "name": "x"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 2,
                            "end": 8,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 2
                              },
                              "end": {
                                "line": 1,
                                "column": 8
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 2,
                              "end": 3,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 2
                                },
                                "end": {
                                  "line": 1,
                                  "column": 3
                                }
                              },
                              "name": "x"
                            },
                            "right": {
                              "type": "Literal",
                              "start": 6,
                              "end": 8,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 6
                                },
                                "end": {
                                  "line": 1,
                                  "column": 8
                                }
                              },
                              "value": 10,
                              "raw": "10"
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 10,
                          "end": 23,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 10
                            },
                            "end": {
                              "line": 1,
                              "column": 23
                            }
                          },
                          "method": false,
                          "shorthand": false,
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
                          "value": {
                            "type": "ObjectPattern",
                            "start": 13,
                            "end": 23,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 13
                              },
                              "end": {
                                "line": 1,
                                "column": 23
                              }
                            },
                            "properties": [
                              {
                                "type": "Property",
                                "start": 15,
                                "end": 21,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 15
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 21
                                  }
                                },
                                "method": false,
                                "shorthand": true,
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
                                  "name": "z"
                                },
                                "kind": "init",
                                "value": {
                                  "type": "AssignmentPattern",
                                  "start": 15,
                                  "end": 21,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 15
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 21
                                    }
                                  },
                                  "left": {
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
                                    "name": "z"
                                  },
                                  "right": {
                                    "type": "Literal",
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
                                    "value": 10,
                                    "raw": "10"
                                  }
                                }
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "ArrayExpression",
                    "start": 29,
                    "end": 35,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 29
                      },
                      "end": {
                        "line": 1,
                        "column": 35
                      }
                    },
                    "elements": [
                      {
                        "type": "Identifier",
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
                        "name": "x"
                      },
                      {
                        "type": "Identifier",
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
                        },
                        "name": "z"
                      }
                    ]
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse attempted spread param', () => {
        expect(parseScript('foo(([a,b]) => 42);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 19,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 19,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 18,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 3,
                    "name": "foo"
                  },
                  "arguments": [
                    {
                      "type": "ArrowFunctionExpression",
                      "start": 4,
                      "end": 17,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "ArrayPattern",
                          "start": 5,
                          "end": 10,
                          "elements": [
                            {
                              "type": "Identifier",
                              "start": 6,
                              "end": 7,
                              "name": "a"
                            },
                            {
                              "type": "Identifier",
                              "start": 8,
                              "end": 9,
                              "name": "b"
                            }
                          ]
                        }
                      ],
                      "body": {
                        "type": "Literal",
                        "start": 15,
                        "end": 17,
                        "value": 42,
                        "raw": "42"
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "foo((a=1) => 42);"', () => {
        expect(parseScript('foo((a=1) => 42);', {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 17,
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 17,
                "expression": {
                  "type": "CallExpression",
                  "start": 0,
                  "end": 16,
                  "callee": {
                    "type": "Identifier",
                    "start": 0,
                    "end": 3,
                    "name": "foo"
                  },
                  "arguments": [
                    {
                      "type": "ArrowFunctionExpression",
                      "start": 4,
                      "end": 15,
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
                          "start": 5,
                          "end": 8,
                          "left": {
                            "type": "Identifier",
                            "start": 5,
                            "end": 6,
                            "name": "a"
                          },
                          "right": {
                            "type": "Literal",
                            "start": 7,
                            "end": 8,
                            "value": 1,
                            "raw": "1"
                          }
                        }
                      ],
                      "body": {
                        "type": "Literal",
                        "start": 13,
                        "end": 15,
                        "value": 42,
                        "raw": "42"
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