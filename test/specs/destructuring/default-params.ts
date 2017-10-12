import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Default params', () => {
    
    it('should fail on "function h({ a, { b } }, { c }, { { d } }) { return a + b + c + d; }"', () => {
        expect(() => {
            parseScript('function h({ a, { b } }, { c }, { { d } }) { return a + b + c + d; }')
        }).to.throw()
    });
     
    it('should parse not strict eval', () => {
        expect(parseScript('(eval = 10) => 42;', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                  "expression": true,
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
                        "end": 5,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 1
                          },
                          "end": {
                            "line": 1,
                            "column": 5
                          }
                        },
                        "name": "eval"
                      },
                      "right": {
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
                        "value": 10,
                        "raw": "10"
                      }
                    }
                  ],
                  "body": {
                    "type": "Literal",
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
                    "value": 42,
                    "raw": "42"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse default arrow parameter', () => {
        expect(parseScript('(x=1) => x * x;', {
            ranges: true,
            raw: true,
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
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "AssignmentPattern",
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
                        "type": "Literal",
                        "start": 3,
                        "end": 4,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 3
                          },
                          "end": {
                            "line": 1,
                            "column": 4
                          }
                        },
                        "value": 1,
                        "raw": "1"
                      }
                    }
                  ],
                  "body": {
                    "type": "BinaryExpression",
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
                    "left": {
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
                    },
                    "operator": "*",
                    "right": {
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
                      "name": "x"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse not all params', () => {
        expect(parseScript('var foo = function(a, b = 42, c) {};', {
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 35,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 4
                      },
                      "end": {
                        "line": 1,
                        "column": 35
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
                      "name": "foo"
                    },
                    "init": {
                      "type": "FunctionExpression",
                      "start": 10,
                      "end": 35,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 35
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
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
                        },
                        {
                          "type": "AssignmentPattern",
                          "start": 22,
                          "end": 28,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 22
                            },
                            "end": {
                              "line": 1,
                              "column": 28
                            }
                          },
                          "left": {
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
                            "name": "b"
                          },
                          "right": {
                            "type": "Literal",
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
                            "value": 42,
                            "raw": "42"
                          }
                        },
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
                          "name": "c"
                        }
                      ],
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
                  }
                ],
                "kind": "var"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse method', () => {
        expect(parseScript('x = { f: function(a=1) {} }', {
            ranges: true,
            raw: true
        })).to.eql({
              "body": [
                {
                  "end": 27,
                  "expression": {
                    "end": 27,
                   "left": {
                      "end": 1,
                      "name": "x",
                      "start": 0,
                      "type": "Identifier"
                    },
                    "operator": "=",
                   "right": {
                      "end": 27,
                      "properties": [
                        {
                          "computed": false,
                          "end": 25,
                          "key": {
                            "end": 7,
                            "name": "f",
                            "start": 6,
                            "type": "Identifier"
                          },
                          "kind": "init",
                          "method": false,
                          "shorthand": false,
                          "start": 6,
                          "type": "Property",
                          "value": {
                            "body": {
                              "body": [],
                              "end": 25,
                              "start": 23,
                              "type": "BlockStatement"
                            },
                            "end": 25,
                            "expression": false,
                            "generator": false,
                            "async": false,
                            "id": null,
                            "params": [
                              {
                                "end": 21,
                                "left": {
                                  "end": 19,
                                  "name": "a",
                                 "start": 18,
                                  "type": "Identifier"
                                },
                               "right": {
                                  "end": 21,
                                  "raw": "1",
                                  "start": 20,
                                  "type": "Literal",
                                  "value": 1,
                                },
                                "start": 18,
                                "type": "AssignmentPattern"
                              }
                            ],
                            "start": 9,
                            "type": "FunctionExpression"
                          }
                        }
                      ],
                      "start": 4,
                     "type": "ObjectExpression"
                    },
                    "start": 0,
                    "type": "AssignmentExpression"
                  },
                  "start": 0,
                  "type": "ExpressionStatement"
                }
              ],
              "end": 27,
              "sourceType": "script",
              "start": 0, 
              "type": "Program"
            });
    });

    it('should parse param with array"', () => {
        expect(parseScript('function f([x] = [1]) {};', {
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
                "type": "FunctionDeclaration",
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
                  "name": "f"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
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
                    "left": {
                      "type": "ArrayPattern",
                      "start": 11,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 11
                        },
                        "end": {
                          "line": 1,
                          "column": 14
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
                        }
                      ]
                    },
                    "right": {
                      "type": "ArrayExpression",
                      "start": 17,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "elements": [
                        {
                          "type": "Literal",
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
                          "value": 1,
                          "raw": "1"
                        }
                      ]
                    }
                  }
                ],
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
              },
              {
                "type": "EmptyStatement",
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
                }
              }
            ],
            "sourceType": "script"
          });
    });
 });