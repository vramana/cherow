import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Declarations - Const', () => {

    it('should fail if rest element (array binding pattern) are followed by any element', () => {
        expect(() => {
            parseScript('const [...[x], y] = [1, 2, 3];');
        }).to.throw();
    });

    it('should fail if rest element (nested object pattern) has initializer', () => {
        expect(() => {
            parseScript('const [...{ x } = []] = [];');
        }).to.throw();
    });

    it('should fail if rest element (identifier) has initializer', () => {
        expect(() => {
            parseScript('const [...x = []] = [];');
        }).to.throw();
    });

    it('should fail if rest element (nested array pattern) has initializer', () => {
        expect(() => {
            parseScript('const [...[ x ] = []] = [];');
        }).to.throw();
    });

    it('should fail if const declarations are mixed: with / without initialiser', () => {
        expect(() => {
            parseScript('const x = 1, y;');
        }).to.throw();
    });
    it('should fail if const declarations are mixed: with / without initialiser', () => {
        expect(() => {
            parseScript('const x, y = 1;');
        }).to.throw();
    });
    it('should fail on const declarations without initialiser', () => {
        expect(() => {
            parseScript('const x;');
        }).to.throw();
    });
    it('should fail on const declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript('do const x = 1; while (false)');
        }).to.throw();
    });
    it('should fail on const declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript('if (true) const x = 1;');
        }).to.throw();
    });
    it('should fail on const declarations with initialisers in statement positions', () => {
        expect(() => {
            parseScript('label: const x = 1;');
        }).to.throw();
    });
    it('should fail on redeclaration error within strict mode function inside non-strict code', () => {
        expect(() => {
            parseScript('(function() { "use strict"; { const f = 1; var f; } })');
        }).to.throw();
    });

    it('should parse binding as specified via property name and identifier', () => {
        expect(parseScript(`const { x: y } = { x: 23 };`, {
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 26,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 26
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
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
                          "method": false,
                          "shorthand": false,
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
                            "name": "x"
                          },
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
                            "name": "y"
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 17,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 17
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 19,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 19
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
                            "name": "x"
                          },
                          "value": {
                            "type": "Literal",
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
                            "value": 23,
                            "raw": "23"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse trailing comma following binding property list', () => {
        expect(parseScript(`const { x: y, } = { x: 23 };`, {
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
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
                      "properties": [
                        {
                          "type": "Property",
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
                          "method": false,
                          "shorthand": false,
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
                            "name": "x"
                          },
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
                            "name": "y"
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 18,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 18
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 20,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 20
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
                            "name": "x"
                          },
                          "value": {
                            "type": "Literal",
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
                            "value": 23,
                            "raw": "23"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binding specified via property name, identifier, and initializer', () => {
        expect(parseScript(`const { x: y = 33 } = { };`, {
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
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
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 19,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 19
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 17,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 17
                            }
                          },
                          "method": false,
                          "shorthand": false,
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
                            "name": "x"
                          },
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 11,
                            "end": 17,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 11
                              },
                              "end": {
                                "line": 1,
                                "column": 17
                              }
                            },
                            "left": {
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
                              "name": "y"
                            },
                            "right": {
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
                              "value": 33,
                              "raw": "33"
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 22,
                      "end": 25,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 22
                        },
                        "end": {
                          "line": 1,
                          "column": 25
                        }
                      },
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object binding pattern with "nested" array binding pattern', () => {
        expect(parseScript(`const { w: [x, y, z] = [4, 5, 6] } = { w: [7, undefined, ] };`, {
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 60,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 60
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 32,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 32
                            }
                          },
                          "method": false,
                          "shorthand": false,
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
                            "name": "w"
                          },
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 11,
                            "end": 32,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 11
                              },
                              "end": {
                                "line": 1,
                                "column": 32
                              }
                            },
                            "left": {
                              "type": "ArrayPattern",
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
                                },
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
                                  "name": "y"
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
                                  "name": "z"
                                }
                              ]
                            },
                            "right": {
                              "type": "ArrayExpression",
                              "start": 23,
                              "end": 32,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 23
                                },
                                "end": {
                                  "line": 1,
                                  "column": 32
                                }
                              },
                              "elements": [
                                {
                                  "type": "Literal",
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
                                  "value": 4,
                                  "raw": "4"
                                },
                                {
                                  "type": "Literal",
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
                                  "value": 5,
                                  "raw": "5"
                                },
                                {
                                  "type": "Literal",
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
                                  "value": 6,
                                  "raw": "6"
                                }
                              ]
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 37,
                      "end": 60,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 37
                        },
                        "end": {
                          "line": 1,
                          "column": 60
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 39,
                          "end": 58,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 39
                            },
                            "end": {
                              "line": 1,
                              "column": 58
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
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
                            },
                            "name": "w"
                          },
                          "value": {
                            "type": "ArrayExpression",
                            "start": 42,
                            "end": 58,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 42
                              },
                              "end": {
                                "line": 1,
                                "column": 58
                              }
                            },
                            "elements": [
                              {
                                "type": "Literal",
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
                                "value": 7,
                                "raw": "7"
                              },
                              {
                                "type": "Identifier",
                                "start": 46,
                                "end": 55,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 46
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 55
                                  }
                                },
                                "name": "undefined"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse object binding pattern with "nested" array binding pattern taking the `null` value ', () => {
        expect(parseScript(`const { w: [x, y, z] = [4, 5, 6] } = { w: null };`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 49,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 49
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 49,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 49
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 48,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 48
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 34,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 34
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 32,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 32
                            }
                          },
                          "method": false,
                          "shorthand": false,
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
                            "name": "w"
                          },
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 11,
                            "end": 32,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 11
                              },
                              "end": {
                                "line": 1,
                                "column": 32
                              }
                            },
                            "left": {
                              "type": "ArrayPattern",
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
                                },
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
                                  "name": "y"
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
                                  "name": "z"
                                }
                              ]
                            },
                            "right": {
                              "type": "ArrayExpression",
                              "start": 23,
                              "end": 32,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 23
                                },
                                "end": {
                                  "line": 1,
                                  "column": 32
                                }
                              },
                              "elements": [
                                {
                                  "type": "Literal",
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
                                  "value": 4,
                                  "raw": "4"
                                },
                                {
                                  "type": "Literal",
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
                                  "value": 5,
                                  "raw": "5"
                                },
                                {
                                  "type": "Literal",
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
                                  "value": 6,
                                  "raw": "6"
                                }
                              ]
                            }
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 37,
                      "end": 48,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 37
                        },
                        "end": {
                          "line": 1,
                          "column": 48
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 39,
                          "end": 46,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 39
                            },
                            "end": {
                              "line": 1,
                              "column": 46
                            }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
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
                            },
                            "name": "w"
                          },
                          "value": {
                            "type": "Literal",
                            "start": 42,
                            "end": 46,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 42
                              },
                              "end": {
                                "line": 1,
                                "column": 46
                              }
                            },
                            "value": null,
                            "raw": "null"
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse trailing comma following binding property list ', () => {
        expect(parseScript(`const { x: [y], } = { x: [45] };`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 32
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 32,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 32
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 31,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 14,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
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
                            "name": "x"
                          },
                          "value": {
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
                                "name": "y"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
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
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 22,
                          "end": 29,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 22
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
                            "name": "x"
                          },
                          "value": {
                            "type": "ArrayExpression",
                            "start": 25,
                            "end": 29,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 25
                              },
                              "end": {
                                "line": 1,
                                "column": 29
                              }
                            },
                            "elements": [
                              {
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
                                "value": 45,
                                "raw": "45"
                              }
                            ]
                          },
                          "kind": "init"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse singleNameBinding assigns name to "anonymous" generator functions', () => {
        expect(parseScript(`const { gen = function* () {}, xGen = function* x() {} } = {};`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "VariableDeclaration",
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
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 61,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 61
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 56,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 56
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 29,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 29
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
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
                            "name": "gen"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 8,
                            "end": 29,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 29
                              }
                            },
                            "left": {
                              "type": "Identifier",
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
                              "name": "gen"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 14,
                              "end": 29,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 14
                                },
                                "end": {
                                  "line": 1,
                                  "column": 29
                                }
                              },
                              "id": null,
                              "generator": true,
                              "expression": false,
                              "async": false,
                              "params": [],
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
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 31,
                          "end": 54,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 31
                            },
                            "end": {
                              "line": 1,
                              "column": 54
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 31,
                            "end": 35,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 31
                              },
                              "end": {
                                "line": 1,
                                "column": 35
                              }
                            },
                            "name": "xGen"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 31,
                            "end": 54,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 31
                              },
                              "end": {
                                "line": 1,
                                "column": 54
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 31,
                              "end": 35,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 31
                                },
                                "end": {
                                  "line": 1,
                                  "column": 35
                                }
                              },
                              "name": "xGen"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 38,
                              "end": 54,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 38
                                },
                                "end": {
                                  "line": 1,
                                  "column": 54
                                }
                              },
                              "id": {
                                "type": "Identifier",
                                "start": 48,
                                "end": 49,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 48
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 49
                                  }
                                },
                                "name": "x"
                              },
                              "generator": true,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 52,
                                "end": 54,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 52
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 54
                                  }
                                },
                                "body": []
                              }
                            }
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 59,
                      "end": 61,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 59
                        },
                        "end": {
                          "line": 1,
                          "column": 61
                        }
                      },
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse singleNameBinding assigns name to "anonymous" functions', () => {
        expect(parseScript(`const { fn = function () {}, xFn = function x() {} } = {};`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 58,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 58
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 58,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 58
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 57,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 57
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 52,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 52
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
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
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
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
                            "name": "fn"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
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
                            "left": {
                              "type": "Identifier",
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
                              "name": "fn"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 13,
                              "end": 27,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 13
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
                              "params": [],
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
                        },
                        {
                          "type": "Property",
                          "start": 29,
                          "end": 50,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 29
                            },
                            "end": {
                              "line": 1,
                              "column": 50
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 29,
                            "end": 32,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 29
                              },
                              "end": {
                                "line": 1,
                                "column": 32
                              }
                            },
                            "name": "xFn"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 29,
                            "end": 50,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 29
                              },
                              "end": {
                                "line": 1,
                                "column": 50
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 29,
                              "end": 32,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 29
                                },
                                "end": {
                                  "line": 1,
                                  "column": 32
                                }
                              },
                              "name": "xFn"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 35,
                              "end": 50,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 35
                                },
                                "end": {
                                  "line": 1,
                                  "column": 50
                                }
                              },
                              "id": {
                                "type": "Identifier",
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
                                "name": "x"
                              },
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
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
                                },
                                "body": []
                              }
                            }
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 55,
                      "end": 57,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 55
                        },
                        "end": {
                          "line": 1,
                          "column": 57
                        }
                      },
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse singleNameBinding assigns `name` to "anonymous" functions "through" cover grammar', () => {
        expect(parseScript(`const { cover = (function () {}), xCover = (0, function() {})  } = {};`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 70,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 70
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 70,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 70
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 69,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 69
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 64,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 64
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 32,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 32
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
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
                            "name": "cover"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 8,
                            "end": 32,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 32
                              }
                            },
                            "left": {
                              "type": "Identifier",
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
                              "name": "cover"
                            },
                            "right": {
                              "type": "FunctionExpression",
                              "start": 17,
                              "end": 31,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 17
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
                              "params": [],
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
                            }
                          }
                        },
                        {
                          "type": "Property",
                          "start": 34,
                          "end": 61,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 34
                            },
                            "end": {
                              "line": 1,
                              "column": 61
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
                            "start": 34,
                            "end": 40,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 34
                              },
                              "end": {
                                "line": 1,
                                "column": 40
                              }
                            },
                            "name": "xCover"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 34,
                            "end": 61,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 34
                              },
                              "end": {
                                "line": 1,
                                "column": 61
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 34,
                              "end": 40,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 34
                                },
                                "end": {
                                  "line": 1,
                                  "column": 40
                                }
                              },
                              "name": "xCover"
                            },
                            "right": {
                              "type": "SequenceExpression",
                              "start": 44,
                              "end": 60,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 44
                                },
                                "end": {
                                  "line": 1,
                                  "column": 60
                                }
                              },
                              "expressions": [
                                {
                                  "type": "Literal",
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
                                  "value": 0,
                                  "raw": "0"
                                },
                                {
                                  "type": "FunctionExpression",
                                  "start": 47,
                                  "end": 60,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 47
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 60
                                    }
                                  },
                                  "id": null,
                                  "generator": false,
                                  "expression": false,
                                  "async": false,
                                  "params": [],
                                  "body": {
                                    "type": "BlockStatement",
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
                                    },
                                    "body": []
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
                      "start": 67,
                      "end": 69,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 67
                        },
                        "end": {
                          "line": 1,
                          "column": 69
                        }
                      },
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse singleNameBinding assigns `name` to arrow functions', () => {
        expect(parseScript(`const { arrow = () => {} } = {};`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 32,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 32
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 32,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 32
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 31,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
                      "start": 6,
                      "end": 26,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 26
                        }
                      },
                      "properties": [
                        {
                          "type": "Property",
                          "start": 8,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 8
                            },
                            "end": {
                              "line": 1,
                              "column": 24
                            }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                            "type": "Identifier",
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
                            "name": "arrow"
                          },
                          "kind": "init",
                          "value": {
                            "type": "AssignmentPattern",
                            "start": 8,
                            "end": 24,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 8
                              },
                              "end": {
                                "line": 1,
                                "column": 24
                              }
                            },
                            "left": {
                              "type": "Identifier",
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
                              "name": "arrow"
                            },
                            "right": {
                              "type": "ArrowFunctionExpression",
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
                              "id": null,
                              "generator": false,
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
                        }
                      ]
                    },
                    "init": {
                      "type": "ObjectExpression",
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
                      "properties": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse empty object binding pattern', () => {
        expect(parseScript(`const {} = obj;`, {
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
                    "start": 6,
                    "end": 14,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 14
                      }
                    },
                    "id": {
                      "type": "ObjectPattern",
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
                      "properties": []
                    },
                    "init": {
                      "type": "Identifier",
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
                      "name": "obj"
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse lone rest element', () => {
        expect(parseScript(`const [...x] = [1, 2, 3];`, {
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
                    "start": 6,
                    "end": 24,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 24
                      }
                    },
                    "id": {
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
                          "type": "RestElement",
                          "start": 7,
                          "end": 11,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 11
                            }
                          },
                          "argument": {
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
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 15,
                      "end": 24,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 15
                        },
                        "end": {
                          "line": 1,
                          "column": 24
                        }
                      },
                      "elements": [
                        {
                          "type": "Literal",
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
                          "value": 1,
                          "raw": "1"
                        },
                        {
                          "type": "Literal",
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
                          "value": 2,
                          "raw": "2"
                        },
                        {
                          "type": "Literal",
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
                          "value": 3,
                          "raw": "3"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse rest element following elision elements', () => {
        expect(parseScript(`const [ , , ...x] = [1, 2, 3, 4, 5]`, {
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
                "type": "VariableDeclaration",
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
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 35,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 35
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "elements": [
                        null,
                        null,
                        {
                          "type": "RestElement",
                          "start": 12,
                          "end": 16,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 12
                            },
                            "end": {
                              "line": 1,
                              "column": 16
                            }
                          },
                          "argument": {
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
                    "init": {
                      "type": "ArrayExpression",
                      "start": 20,
                      "end": 35,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 20
                        },
                        "end": {
                          "line": 1,
                          "column": 35
                        }
                      },
                      "elements": [
                        {
                          "type": "Literal",
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
                          "value": 1,
                          "raw": "1"
                        },
                        {
                          "type": "Literal",
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
                          "value": 2,
                          "raw": "2"
                        },
                        {
                          "type": "Literal",
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
                          "value": 3,
                          "raw": "3"
                        },
                        {
                          "type": "Literal",
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
                          "value": 4,
                          "raw": "4"
                        },
                        {
                          "type": "Literal",
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
                          "value": 5,
                          "raw": "5"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse rest element containing a rest element', () => {
        expect(parseScript(`const [...[...x]] = [1, 2, 3];`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 30,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 30
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 30,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 30
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "elements": [
                        {
                          "type": "RestElement",
                          "start": 7,
                          "end": 16,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 16
                            }
                          },
                          "argument": {
                            "type": "ArrayPattern",
                            "start": 10,
                            "end": 16,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 10
                              },
                              "end": {
                                "line": 1,
                                "column": 16
                              }
                            },
                            "elements": [
                              {
                                "type": "RestElement",
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
                                },
                                "argument": {
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
                            ]
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
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
                      "elements": [
                        {
                          "type": "Literal",
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
                          "value": 1,
                          "raw": "1"
                        },
                        {
                          "type": "Literal",
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
                          "value": 2,
                          "raw": "2"
                        },
                        {
                          "type": "Literal",
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
                          "value": 3,
                          "raw": "3"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse destructuring initializer with a "hole"', () => {
        expect(parseScript(`const [x = 23] = [,];`, {
            ranges: true,
            raw: true,
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
                    "start": 6,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 14,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 14
                        }
                      },
                      "elements": [
                        {
                          "type": "AssignmentPattern",
                          "start": 7,
                          "end": 13,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 13
                            }
                          },
                          "left": {
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
                            "name": "x"
                          },
                          "right": {
                            "type": "Literal",
                            "start": 11,
                            "end": 13,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 11
                              },
                              "end": {
                                "line": 1,
                                "column": 13
                              }
                            },
                            "value": 23,
                            "raw": "23"
                          }
                        }
                      ]
                    },
                    "init": {
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
                        null
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse singleNameBinding does assign name to "anonymous" functions "through" cover grammar', () => {
        expect(parseScript(`const [cover = (function () {}), xCover = (0, function() {})] = [];`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 67,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 67
              }
            },
            "body": [
              {
                "type": "VariableDeclaration",
                "start": 0,
                "end": 67,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 67
                  }
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 66,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 66
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 61,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 61
                        }
                      },
                      "elements": [
                        {
                          "type": "AssignmentPattern",
                          "start": 7,
                          "end": 31,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 31
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 7,
                            "end": 12,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 7
                              },
                              "end": {
                                "line": 1,
                                "column": 12
                              }
                            },
                            "name": "cover"
                          },
                          "right": {
                            "type": "FunctionExpression",
                            "start": 16,
                            "end": 30,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 16
                              },
                              "end": {
                                "line": 1,
                                "column": 30
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 28,
                              "end": 30,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 28
                                },
                                "end": {
                                  "line": 1,
                                  "column": 30
                                }
                              },
                              "body": []
                            }
                          }
                        },
                        {
                          "type": "AssignmentPattern",
                          "start": 33,
                          "end": 60,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 33
                            },
                            "end": {
                              "line": 1,
                              "column": 60
                            }
                          },
                          "left": {
                            "type": "Identifier",
                            "start": 33,
                            "end": 39,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 33
                              },
                              "end": {
                                "line": 1,
                                "column": 39
                              }
                            },
                            "name": "xCover"
                          },
                          "right": {
                            "type": "SequenceExpression",
                            "start": 43,
                            "end": 59,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 43
                              },
                              "end": {
                                "line": 1,
                                "column": 59
                              }
                            },
                            "expressions": [
                              {
                                "type": "Literal",
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
                                "value": 0,
                                "raw": "0"
                              },
                              {
                                "type": "FunctionExpression",
                                "start": 46,
                                "end": 59,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 46
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 59
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 57,
                                  "end": 59,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 57
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 59
                                    }
                                  },
                                  "body": []
                                }
                              }
                            ]
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 64,
                      "end": 66,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 64
                        },
                        "end": {
                          "line": 1,
                          "column": 66
                        }
                      },
                      "elements": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse nested array destructuring with a null value', () => {
        expect(parseScript(`const [[x]] = [null];`, {
            ranges: true,
            raw: true,
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
                    "start": 6,
                    "end": 20,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 20
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 11,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 11
                        }
                      },
                      "elements": [
                        {
                          "type": "ArrayPattern",
                          "start": 7,
                          "end": 10,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 10
                            }
                          },
                          "elements": [
                            {
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
                              "name": "x"
                            }
                          ]
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
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
                          "type": "Literal",
                          "start": 15,
                          "end": 19,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 15
                            },
                            "end": {
                              "line": 1,
                              "column": 19
                            }
                          },
                          "value": null,
                          "raw": "null"
                        }
                      ]
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binding element with array binding pattern and initializer', () => {
        expect(parseScript(`const [[] = function() { return function*() { }();; }()] = [];`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            },
            "body": [
              {
                "type": "VariableDeclaration",
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
                },
                "declarations": [
                  {
                    "type": "VariableDeclarator",
                    "start": 6,
                    "end": 61,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 61
                      }
                    },
                    "id": {
                      "type": "ArrayPattern",
                      "start": 6,
                      "end": 56,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 56
                        }
                      },
                      "elements": [
                        {
                          "type": "AssignmentPattern",
                          "start": 7,
                          "end": 55,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 7
                            },
                            "end": {
                              "line": 1,
                              "column": 55
                            }
                          },
                          "left": {
                            "type": "ArrayPattern",
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
                            "elements": []
                          },
                          "right": {
                            "type": "CallExpression",
                            "start": 12,
                            "end": 55,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 12
                              },
                              "end": {
                                "line": 1,
                                "column": 55
                              }
                            },
                            "callee": {
                              "type": "FunctionExpression",
                              "start": 12,
                              "end": 53,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 12
                                },
                                "end": {
                                  "line": 1,
                                  "column": 53
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 23,
                                "end": 53,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 23
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 53
                                  }
                                },
                                "body": [
                                  {
                                    "type": "ReturnStatement",
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
                                    },
                                    "argument": {
                                      "type": "CallExpression",
                                      "start": 32,
                                      "end": 49,
                                      "loc": {
                                        "start": {
                                          "line": 1,
                                          "column": 32
                                        },
                                        "end": {
                                          "line": 1,
                                          "column": 49
                                        }
                                      },
                                      "callee": {
                                        "type": "FunctionExpression",
                                        "start": 32,
                                        "end": 47,
                                        "loc": {
                                          "start": {
                                            "line": 1,
                                            "column": 32
                                          },
                                          "end": {
                                            "line": 1,
                                            "column": 47
                                          }
                                        },
                                        "id": null,
                                        "generator": true,
                                        "expression": false,
                                        "async": false,
                                        "params": [],
                                        "body": {
                                          "type": "BlockStatement",
                                          "start": 44,
                                          "end": 47,
                                          "loc": {
                                            "start": {
                                              "line": 1,
                                              "column": 44
                                            },
                                            "end": {
                                              "line": 1,
                                              "column": 47
                                            }
                                          },
                                          "body": []
                                        }
                                      },
                                      "arguments": []
                                    }
                                  },
                                  {
                                    "type": "EmptyStatement",
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
                                  }
                                ]
                              }
                            },
                            "arguments": []
                          }
                        }
                      ]
                    },
                    "init": {
                      "type": "ArrayExpression",
                      "start": 59,
                      "end": 61,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 59
                        },
                        "end": {
                          "line": 1,
                          "column": 61
                        }
                      },
                      "elements": []
                    }
                  }
                ],
                "kind": "const"
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse const in block statement', () => {
        expect(parseScript(`{ const x = 42 }`, {
            ranges: true,
            raw: true,
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
                "type": "BlockStatement",
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
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 8
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "id": {
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
                          "name": "x"
                        },
                        "init": {
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
                          "value": 42,
                          "raw": "42"
                        }
                      }
                    ],
                    "kind": "const"
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse binding as specified via property name and identifier', () => {
        expect(parseScript(`{ const x = 14, y = 3, z = 1977 }`, {
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
                "type": "BlockStatement",
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
                    "type": "VariableDeclaration",
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
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
                        "start": 8,
                        "end": 14,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 8
                          },
                          "end": {
                            "line": 1,
                            "column": 14
                          }
                        },
                        "id": {
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
                          "name": "x"
                        },
                        "init": {
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
                          "value": 14,
                          "raw": "14"
                        }
                      },
                      {
                        "type": "VariableDeclarator",
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
                        "id": {
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
                          "name": "y"
                        },
                        "init": {
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
                          "value": 3,
                          "raw": "3"
                        }
                      },
                      {
                        "type": "VariableDeclarator",
                        "start": 23,
                        "end": 31,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 23
                          },
                          "end": {
                            "line": 1,
                            "column": 31
                          }
                        },
                        "id": {
                          "type": "Identifier",
                          "start": 23,
                          "end": 24,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 23
                            },
                            "end": {
                              "line": 1,
                              "column": 24
                            }
                          },
                          "name": "z"
                        },
                        "init": {
                          "type": "Literal",
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
                          "value": 1977,
                          "raw": "1977"
                        }
                      }
                    ],
                    "kind": "const"
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

});