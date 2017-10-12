import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Destructuring - Rest', () => {

    it('should parse "[...a] = [1, 2, 3];"', () => {
        expect(parseScript('[...a] = [1, 2, 3];', {
            ranges: true,
            locations: true,
            raw: true
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
                "type": "AssignmentExpression",
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
                "operator": "=",
                "left": {
                  "type": "ArrayPattern",
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
                  "elements": [
                    {
                      "type": "RestElement",
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
                      "argument": {
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
                        "name": "a"
                      }
                    }
                  ]
                },
                "right": {
                  "type": "ArrayExpression",
                  "start": 9,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 9
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    }
                  },
                  "elements": [
                    {
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
                    },
                    {
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
                      "value": 2,
                      "raw": "2"
                    },
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
                      "value": 3,
                      "raw": "3"
                    }
                  ]
                }
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse "[,,, ...d] = [1, 2, 3]"', () => {
        expect(parseScript('[,,, ...d] = [1, 2, 3]', {
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
                  "type": "ArrayPattern",
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
                  "elements": [
                    null,
                    null,
                    null,
                    {
                      "type": "RestElement",
                      "start": 5,
                      "end": 9,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 5
                        },
                        "end": {
                          "line": 1,
                          "column": 9
                        }
                      },
                      "argument": {
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
                        "name": "d"
                      }
                    }
                  ]
                },
                "right": {
                  "type": "ArrayExpression",
                  "start": 13,
                  "end": 22,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 22
                    }
                  },
                  "elements": [
                    {
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
                    },
                    {
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
                      "value": 2,
                      "raw": "2"
                    },
                    {
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
                  ]
                }
              }
            }
          ],
          "sourceType": "script"
        });
    });

    it('should parse "[b, ...c] = [1, 2, 3]"', () => {
        expect(parseScript('[b, ...c] = [1, 2, 3]', {
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
              "type": "ExpressionStatement",
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
              "expression": {
                "type": "AssignmentExpression",
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
                "operator": "=",
                "left": {
                  "type": "ArrayPattern",
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
                  "elements": [
                    {
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
                      "name": "b"
                    },
                    {
                      "type": "RestElement",
                      "start": 4,
                      "end": 8,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 4
                        },
                        "end": {
                          "line": 1,
                          "column": 8
                        }
                      },
                      "argument": {
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
                        "name": "c"
                      }
                    }
                  ]
                },
                "right": {
                  "type": "ArrayExpression",
                  "start": 12,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 12
                    },
                    "end": {
                      "line": 1,
                      "column": 21
                    }
                  },
                  "elements": [
                    {
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
                    },
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
                      "value": 2,
                      "raw": "2"
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
                      "value": 3,
                      "raw": "3"
                    }
                  ]
                }
              }
            }
          ],
          "sourceType": "script"
        });
    });
});