import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Destructuring', () => {

    it('should fail on "(...[a, b]) => {}"', () => {
        expect(() => {
            parseScript('(...[a, b]) => {}')
        }).to.not.throw()
    });

    it('should fail on "(a, ...[b]) => {}"', () => {
        expect(() => {
            parseScript('(a, ...[b]) => {}')
        }).to.not.throw()
    });


    it('should fail on "function x(...[ a, b ]){}"', () => {
        expect(() => {
            parseScript('function x(...[ a, b ]){}')
        }).to.not.throw()
    });

    it('should fail on "function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}"', () => {
        expect(() => {
            parseScript('function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){}')
        }).to.not.throw()
    });

    it('should fail on "(function x(...[ a, b ]){})"', () => {
        expect(() => {
            parseScript('(function x(...[ a, b ]){})')
        }).to.not.throw()
    });

    it('should fail on "var a = { set foo(...v) {} };"', () => {
        expect(() => {
            parseScript('var a = { set foo(...v) {} };')
        }).to.throw()
    });

    it('should fail on "class a { set foo(...v) {} };"', () => {
        expect(() => {
            parseScript('class a { set foo(...v) {} };')
        }).to.throw()
    });

    it('should fail on "(function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){})"', () => {
        expect(() => {
            parseScript('(function x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){})')
        }).to.not.throw()
    });

    it('should parse "({ a: b, c }, [d, e], ...f) => {}"', () => {
        expect(parseScript('({ a: b, c }, [d, e], ...f) => {}', {
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
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
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
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 7,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 7
                            }
                          },
                          "method": false,
                          "shorthand": false,
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
                            "name": "a"
                          },
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
                            "name": "b"
                          },
                          "kind": "init"
                        },
                        {
                          "type": "Property",
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
                          "method": false,
                          "shorthand": true,
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
                            "name": "c"
                          },
                          "kind": "init",
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
                            "name": "c"
                          }
                        }
                      ]
                    },
                    {
                      "type": "ArrayPattern",
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
                          "name": "d"
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
                          "name": "e"
                        }
                      ]
                    },
                    {
                      "type": "RestElement",
                      "start": 22,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 22
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "argument": {
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
                        "name": "f"
                      }
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
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
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({ x([ a, b ]){} })"', () => {
        expect(parseScript('({ x([ a, b ]){} })', {
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
                      "start": 3,
                      "end": 16,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 16
                        }
                      },
                      "method": true,
                      "shorthand": false,
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
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 16,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 16
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "ArrayPattern",
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
                            "elements": [
                              {
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
                                "name": "a"
                              },
                              {
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
                                "name": "b"
                              }
                            ]
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
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

    it('should parse "({ x(...[ a, b ]){} })"', () => {
        expect(parseScript('({ x(...[ a, b ]){} })', {
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
                  "properties": [
                    {
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
                        "type": "FunctionExpression",
                        "start": 4,
                        "end": 19,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 4
                          },
                          "end": {
                            "line": 1,
                            "column": 19
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "RestElement",
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
                            "argument": {
                              "type": "ArrayPattern",
                              "start": 8,
                              "end": 16,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 8
                                },
                                "end": {
                                  "line": 1,
                                  "column": 16
                                }
                              },
                              "elements": [
                                {
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
                                  "name": "a"
                                },
                                {
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
                                  "name": "b"
                                }
                              ]
                            }
                          }
                        ],
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
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({ x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){} })"', () => {
        expect(parseScript('({ x({ a: { w, x }, b: [y, z] }, ...[a, b, c]){} })', {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 51,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 51
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
                "start": 0,
                "end": 51,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 51
                  }
                },
                "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 50,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 1
                    },
                    "end": {
                      "line": 1,
                      "column": 50
                    }
                  },
                  "properties": [
                    {
                      "type": "Property",
                      "start": 3,
                      "end": 48,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 3
                        },
                        "end": {
                          "line": 1,
                          "column": 48
                        }
                      },
                      "method": true,
                      "shorthand": false,
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
                        "type": "FunctionExpression",
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
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [
                          {
                            "type": "ObjectPattern",
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
                            "properties": [
                              {
                                "type": "Property",
                                "start": 7,
                                "end": 18,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 7
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
                                  "name": "a"
                                },
                                "value": {
                                  "type": "ObjectPattern",
                                  "start": 10,
                                  "end": 18,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 10
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 18
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
                                        "name": "w"
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
                                        "name": "w"
                                      }
                                    },
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
                                "kind": "init"
                              },
                              {
                                "type": "Property",
                                "start": 20,
                                "end": 29,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 20
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
                                  "name": "b"
                                },
                                "value": {
                                  "type": "ArrayPattern",
                                  "start": 23,
                                  "end": 29,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 23
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 29
                                    }
                                  },
                                  "elements": [
                                    {
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
                                      "name": "y"
                                    },
                                    {
                                      "type": "Identifier",
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
                                      "name": "z"
                                    }
                                  ]
                                },
                                "kind": "init"
                              }
                            ]
                          },
                          {
                            "type": "RestElement",
                            "start": 33,
                            "end": 45,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 33
                              },
                              "end": {
                                "line": 1,
                                "column": 45
                              }
                            },
                            "argument": {
                              "type": "ArrayPattern",
                              "start": 36,
                              "end": 45,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 36
                                },
                                "end": {
                                  "line": 1,
                                  "column": 45
                                }
                              },
                              "elements": [
                                {
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
                                  "name": "a"
                                },
                                {
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
                                  "name": "b"
                                },
                                {
                                  "type": "Identifier",
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
                                  "name": "c"
                                }
                              ]
                            }
                          }
                        ],
                        "body": {
                          "type": "BlockStatement",
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

    
    it('should parse "({ a }, ...b) => {}"', () => {
        expect(parseScript('({ a }, ...b) => {}', {
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
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 6,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 6
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
                            "name": "a"
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
                            "name": "a"
                          }
                        }
                      ]
                    },
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
                        "name": "b"
                      }
                    }
                  ],
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
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "({ a: [a, b] }, ...c) => {}"', () => {
        expect(parseScript('({ a: [a, b] }, ...c) => {}', {
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
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 1
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 3,
                          "end": 12,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 3
                            },
                            "end": {
                              "line": 1,
                              "column": 12
                            }
                          },
                          "method": false,
                          "shorthand": false,
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
                            "name": "a"
                          },
                          "value": {
                            "type": "ArrayPattern",
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
                            "elements": [
                              {
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
                                "name": "a"
                              },
                              {
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
                                "name": "b"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    {
                      "type": "RestElement",
                      "start": 16,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 16
                        },
                        "end": {
                          "line": 1,
                          "column": 20
                        }
                      },
                      "argument": {
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
                        "name": "c"
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
            ],
            "sourceType": "script"
          });
    });

    it('should parse "function x([ a, b ]){}"', () => {
        expect(parseScript('function x([ a, b ]){}', {
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
                "type": "FunctionDeclaration",
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
                  "name": "x"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ArrayPattern",
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
                    "elements": [
                      {
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
                        "name": "a"
                      },
                      {
                        "type": "Identifier",
                        "start": 16,
                        "end": 17,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 17
                          }
                        },
                        "name": "b"
                      }
                    ]
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
            ],
            "sourceType": "script"
          });
    });

    it('should parse "function x({ a, b }){}"', () => {
        expect(parseScript('function x({ a, b }){}', {
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
                "type": "FunctionDeclaration",
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
                  "name": "x"
                },
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "ObjectPattern",
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
                    "properties": [
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
                          "name": "a"
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
                          "name": "a"
                        }
                      },
                      {
                        "type": "Property",
                        "start": 16,
                        "end": 17,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 16
                          },
                          "end": {
                            "line": 1,
                            "column": 17
                          }
                        },
                        "method": false,
                        "shorthand": true,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "start": 16,
                          "end": 17,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 16
                            },
                            "end": {
                              "line": 1,
                              "column": 17
                            }
                          },
                          "name": "b"
                        },
                        "kind": "init",
                        "value": {
                          "type": "Identifier",
                          "start": 16,
                          "end": 17,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 16
                            },
                            "end": {
                              "line": 1,
                              "column": 17
                            }
                          },
                          "name": "b"
                        }
                      }
                    ]
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
            ],
            "sourceType": "script"
          });
    });
    it('should parse "(function x([ a, b ]){})"', () => {
        expect(parseScript('(function x([ a, b ]){})', {
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
                  "type": "FunctionExpression",
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
                  "id": {
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
                    "name": "x"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "ArrayPattern",
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
                      "elements": [
                        {
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
                          "name": "a"
                        },
                        {
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
                          "name": "b"
                        }
                      ]
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
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
                    "body": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });
});