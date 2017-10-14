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
      expect(parseScript('function f({x} = {x: 10}) {}', {
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
        "body": [
          {
            "type": "FunctionDeclaration",
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
                "end": 24,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 11
                  },
                  "end": {
                    "line": 1,
                    "column": 24
                  }
                },
                "left": {
                  "type": "ObjectPattern",
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
                  "properties": [
                    {
                      "type": "Property",
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
                      "method": false,
                      "shorthand": true,
                      "computed": false,
                      "key": {
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
                      "kind": "init",
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
                        "name": "x"
                      }
                    }
                  ]
                },
                "right": {
                  "type": "ObjectExpression",
                  "start": 17,
                  "end": 24,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 17
                    },
                    "end": {
                      "line": 1,
                      "column": 24
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
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
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
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
                      "value": {
                        "type": "Literal",
                        "start": 21,
                        "end": 23,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 21
                          },
                          "end": {
                            "line": 1,
                            "column": 23
                          }
                        },
                        "value": 10,
                        "raw": "10"
                      },
                      "kind": "init"
                    }
                  ]
                }
              }
            ],
            "body": {
              "type": "BlockStatement",
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
              "body": []
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse function wrapped in paren with label and object pattern', () => {
      expect(parseScript('({f: function({x} = {x: 10}) {}})', {
          ranges: true,
          raw: true,
          locations: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 33,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 33
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 33,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 33
              }
            },
            "expression": {
              "type": "ObjectExpression",
              "start": 1,
              "end": 32,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 1
                },
                "end": {
                  "line": 1,
                  "column": 32
                }
              },
              "properties": [
                {
                  "type": "Property",
                  "start": 2,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 2
                    },
                    "end": {
                      "line": 1,
                      "column": 31
                    }
                  },
                  "method": false,
                  "shorthand": false,
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
                    "name": "f"
                  },
                  "value": {
                    "type": "FunctionExpression",
                    "start": 5,
                    "end": 31,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 5
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "AssignmentPattern",
                        "start": 14,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 14
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "left": {
                          "type": "ObjectPattern",
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
                          "properties": [
                            {
                              "type": "Property",
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
                                "name": "x"
                              },
                              "kind": "init",
                              "value": {
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
                              }
                            }
                          ]
                        },
                        "right": {
                          "type": "ObjectExpression",
                          "start": 20,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 20
                            },
                            "end": {
                              "line": 1,
                              "column": 27
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
                                "value": 10,
                                "raw": "10"
                              },
                              "kind": "init"
                            }
                          ]
                        }
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 29,
                      "end": 31,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 29
                        },
                        "end": {
                          "line": 1,
                          "column": 31
                        }
                      },
                      "body": []
                    }
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

    it('should parse param with array"', () => {
      expect(parseScript('({f({x} = {x: 10}) {}})', {
          ranges: true,
          raw: true,
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ObjectExpression",
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
              },
              "properties": [
                {
                  "type": "Property",
                  "start": 2,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 2
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "method": true,
                  "shorthand": false,
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
                    "name": "f"
                  },
                  "kind": "init",
                  "value": {
                    "type": "FunctionExpression",
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
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "AssignmentPattern",
                        "start": 4,
                        "end": 17,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 17
                          }
                        },
                        "left": {
                          "type": "ObjectPattern",
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
                          "properties": [
                            {
                              "type": "Property",
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
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
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
                              "kind": "init",
                              "value": {
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
                          ]
                        },
                        "right": {
                          "type": "ObjectExpression",
                          "start": 10,
                          "end": 17,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 10
                            },
                            "end": {
                              "line": 1,
                              "column": 17
                            }
                          },
                          "properties": [
                            {
                              "type": "Property",
                              "start": 11,
                              "end": 16,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 11
                                },
                                "end": {
                                  "line": 1,
                                  "column": 16
                                }
                              },
                              "method": false,
                              "shorthand": false,
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
                              "value": {
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
                                "value": 10,
                                "raw": "10"
                              },
                              "kind": "init"
                            }
                          ]
                        }
                      }
                    ],
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
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });


    it('should parse class expression"', () => {
      expect(parseScript('(class {f({x} = {x: 10}) {}})', {
          ranges: true,
          raw: true,
          locations: true
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ClassExpression",
              "start": 1,
              "end": 28,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 1
                },
                "end": {
                  "line": 1,
                  "column": 28
                }
              },
              "id": null,
              "superClass": null,
              "body": {
                "type": "ClassBody",
                "start": 7,
                "end": 28,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 28
                  }
                },
                "body": [
                  {
                    "type": "MethodDefinition",
                    "start": 8,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
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
                      "name": "f"
                    },
                    "static": false,
                    "kind": "method",
                    "value": {
                      "type": "FunctionExpression",
                      "start": 9,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
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
                          "left": {
                            "type": "ObjectPattern",
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
                              }
                            ]
                          },
                          "right": {
                            "type": "ObjectExpression",
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
                                  "value": 10,
                                  "raw": "10"
                                },
                                "kind": "init"
                              }
                            ]
                          }
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
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse arrow', () => {
      expect(parseScript('(({x} = {x: 10}) => {})', {
          ranges: true,
          raw: true,
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "AssignmentPattern",
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
                  },
                  "left": {
                    "type": "ObjectPattern",
                    "start": 2,
                    "end": 5,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 2
                      },
                      "end": {
                        "line": 1,
                        "column": 5
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
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
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
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
                          "name": "x"
                        },
                        "kind": "init",
                        "value": {
                          "type": "Identifier",
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
                          "name": "x"
                        }
                      }
                    ]
                  },
                  "right": {
                    "type": "ObjectExpression",
                    "start": 8,
                    "end": 15,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 15
                      }
                    },
                    "properties": [
                      {
                        "type": "Property",
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
                          "name": "x"
                        },
                        "value": {
                          "type": "Literal",
                          "start": 12,
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 14
                            }
                          },
                          "value": 10,
                          "raw": "10"
                        },
                        "kind": "init"
                      }
                    ]
                  }
                }
              ],
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
        "sourceType": "script"
      });
    });

    it('should parse param with array"', () => {
      expect(parseScript('x = function(y = 1) {}', {
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
              "type": "AssignmentExpression",
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
              "operator": "=",
              "left": {
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
                "name": "x"
              },
              "right": {
                "type": "FunctionExpression",
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
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 13,
                    "end": 18,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 13
                      },
                      "end": {
                        "line": 1,
                        "column": 18
                      }
                    },
                    "left": {
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
                      "name": "y"
                    },
                    "right": {
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
                    }
                  }
                ],
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
          }
        ],
        "sourceType": "script"
      });
    }); 

    it('should parse object literal"', () => {
      expect(parseScript('x = { f: function(a=1) {} }', {
          ranges: true,
          raw: true,
          locations: true
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "AssignmentExpression",
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
              "operator": "=",
              "left": {
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
                "name": "x"
              },
              "right": {
                "type": "ObjectExpression",
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
                "properties": [
                  {
                    "type": "Property",
                    "start": 6,
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
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
                      "name": "f"
                    },
                    "value": {
                      "type": "FunctionExpression",
                      "start": 9,
                      "end": 25,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 9
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
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
                          "left": {
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
                            "name": "a"
                          },
                          "right": {
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
                            "value": 1,
                            "raw": "1"
                          }
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 23,
                        "end": 25,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 23
                          },
                          "end": {
                            "line": 1,
                            "column": 25
                          }
                        },
                        "body": []
                      }
                    },
                    "kind": "init"
                  }
                ]
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse object method', () => {
      expect(parseScript('x = { f(a=1) {} }', {
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
              "type": "AssignmentExpression",
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
              "operator": "=",
              "left": {
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
                "name": "x"
              },
              "right": {
                "type": "ObjectExpression",
                "start": 4,
                "end": 17,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 17
                  }
                },
                "properties": [
                  {
                    "type": "Property",
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
                    "method": true,
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
                      "name": "f"
                    },
                    "kind": "init",
                    "value": {
                      "type": "FunctionExpression",
                      "start": 7,
                      "end": 15,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 15
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "AssignmentPattern",
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
                          "left": {
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
                            "name": "a"
                          },
                          "right": {
                            "type": "Literal",
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
                            "value": 1,
                            "raw": "1"
                          }
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
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
        "sourceType": "script"
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