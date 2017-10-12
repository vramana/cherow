import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Arrow regression', () => {
 

    it('should parse complex #1', () => {
        expect(parseScript(`async () => {}
        () => {}
        async b => {}
        async b => {}
        async () => {}
        async () => {}
        () => {}
        a => {}
        a => {}
        async () => {}
        () => {}
        a => {}
        async () => {}
        () => {}
        async () => {}
        a => {}
        async () => {}
        async () => {}
        () => {}`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 368,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 19,
              "column": 16
            }
          },
          "body": [
            {
              "type": "ExpressionStatement",
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
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
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
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 23,
              "end": 31,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 8
                },
                "end": {
                  "line": 2,
                  "column": 16
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 23,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 2,
                    "column": 16
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
                      "line": 2,
                      "column": 14
                    },
                    "end": {
                      "line": 2,
                      "column": 16
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 40,
              "end": 53,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 8
                },
                "end": {
                  "line": 3,
                  "column": 21
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 40,
                "end": 53,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 8
                  },
                  "end": {
                    "line": 3,
                    "column": 21
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 46,
                    "end": 47,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 14
                      },
                      "end": {
                        "line": 3,
                        "column": 15
                      }
                    },
                    "name": "b"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 51,
                  "end": 53,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 19
                    },
                    "end": {
                      "line": 3,
                      "column": 21
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 62,
              "end": 75,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 8
                },
                "end": {
                  "line": 4,
                  "column": 21
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 62,
                "end": 75,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 8
                  },
                  "end": {
                    "line": 4,
                    "column": 21
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 68,
                    "end": 69,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 14
                      },
                      "end": {
                        "line": 4,
                        "column": 15
                      }
                    },
                    "name": "b"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 73,
                  "end": 75,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 19
                    },
                    "end": {
                      "line": 4,
                      "column": 21
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 84,
              "end": 98,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 8
                },
                "end": {
                  "line": 5,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 84,
                "end": 98,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 8
                  },
                  "end": {
                    "line": 5,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 96,
                  "end": 98,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 20
                    },
                    "end": {
                      "line": 5,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 107,
              "end": 121,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 8
                },
                "end": {
                  "line": 6,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 107,
                "end": 121,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 8
                  },
                  "end": {
                    "line": 6,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 119,
                  "end": 121,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 20
                    },
                    "end": {
                      "line": 6,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 130,
              "end": 138,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 8
                },
                "end": {
                  "line": 7,
                  "column": 16
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 130,
                "end": 138,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 8
                  },
                  "end": {
                    "line": 7,
                    "column": 16
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 136,
                  "end": 138,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 14
                    },
                    "end": {
                      "line": 7,
                      "column": 16
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 147,
              "end": 154,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 8
                },
                "end": {
                  "line": 8,
                  "column": 15
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 147,
                "end": 154,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 8
                  },
                  "end": {
                    "line": 8,
                    "column": 15
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 147,
                    "end": 148,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 8
                      },
                      "end": {
                        "line": 8,
                        "column": 9
                      }
                    },
                    "name": "a"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 152,
                  "end": 154,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 13
                    },
                    "end": {
                      "line": 8,
                      "column": 15
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 163,
              "end": 170,
              "loc": {
                "start": {
                  "line": 9,
                  "column": 8
                },
                "end": {
                  "line": 9,
                  "column": 15
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 163,
                "end": 170,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 8
                  },
                  "end": {
                    "line": 9,
                    "column": 15
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 163,
                    "end": 164,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 8
                      },
                      "end": {
                        "line": 9,
                        "column": 9
                      }
                    },
                    "name": "a"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 168,
                  "end": 170,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 13
                    },
                    "end": {
                      "line": 9,
                      "column": 15
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 179,
              "end": 193,
              "loc": {
                "start": {
                  "line": 10,
                  "column": 8
                },
                "end": {
                  "line": 10,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 179,
                "end": 193,
                "loc": {
                  "start": {
                    "line": 10,
                    "column": 8
                  },
                  "end": {
                    "line": 10,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 191,
                  "end": 193,
                  "loc": {
                    "start": {
                      "line": 10,
                      "column": 20
                    },
                    "end": {
                      "line": 10,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 202,
              "end": 210,
              "loc": {
                "start": {
                  "line": 11,
                  "column": 8
                },
                "end": {
                  "line": 11,
                  "column": 16
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 202,
                "end": 210,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 8
                  },
                  "end": {
                    "line": 11,
                    "column": 16
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 208,
                  "end": 210,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 14
                    },
                    "end": {
                      "line": 11,
                      "column": 16
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 219,
              "end": 226,
              "loc": {
                "start": {
                  "line": 12,
                  "column": 8
                },
                "end": {
                  "line": 12,
                  "column": 15
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 219,
                "end": 226,
                "loc": {
                  "start": {
                    "line": 12,
                    "column": 8
                  },
                  "end": {
                    "line": 12,
                    "column": 15
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 219,
                    "end": 220,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 8
                      },
                      "end": {
                        "line": 12,
                        "column": 9
                      }
                    },
                    "name": "a"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 224,
                  "end": 226,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 13
                    },
                    "end": {
                      "line": 12,
                      "column": 15
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 235,
              "end": 249,
              "loc": {
                "start": {
                  "line": 13,
                  "column": 8
                },
                "end": {
                  "line": 13,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 235,
                "end": 249,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 8
                  },
                  "end": {
                    "line": 13,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 247,
                  "end": 249,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 20
                    },
                    "end": {
                      "line": 13,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 258,
              "end": 266,
              "loc": {
                "start": {
                  "line": 14,
                  "column": 8
                },
                "end": {
                  "line": 14,
                  "column": 16
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 258,
                "end": 266,
                "loc": {
                  "start": {
                    "line": 14,
                    "column": 8
                  },
                  "end": {
                    "line": 14,
                    "column": 16
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 264,
                  "end": 266,
                  "loc": {
                    "start": {
                      "line": 14,
                      "column": 14
                    },
                    "end": {
                      "line": 14,
                      "column": 16
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 275,
              "end": 289,
              "loc": {
                "start": {
                  "line": 15,
                  "column": 8
                },
                "end": {
                  "line": 15,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 275,
                "end": 289,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 8
                  },
                  "end": {
                    "line": 15,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 287,
                  "end": 289,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 20
                    },
                    "end": {
                      "line": 15,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 298,
              "end": 305,
              "loc": {
                "start": {
                  "line": 16,
                  "column": 8
                },
                "end": {
                  "line": 16,
                  "column": 15
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 298,
                "end": 305,
                "loc": {
                  "start": {
                    "line": 16,
                    "column": 8
                  },
                  "end": {
                    "line": 16,
                    "column": 15
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 298,
                    "end": 299,
                    "loc": {
                      "start": {
                        "line": 16,
                        "column": 8
                      },
                      "end": {
                        "line": 16,
                        "column": 9
                      }
                    },
                    "name": "a"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 303,
                  "end": 305,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 13
                    },
                    "end": {
                      "line": 16,
                      "column": 15
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 314,
              "end": 328,
              "loc": {
                "start": {
                  "line": 17,
                  "column": 8
                },
                "end": {
                  "line": 17,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 314,
                "end": 328,
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 8
                  },
                  "end": {
                    "line": 17,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 326,
                  "end": 328,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 20
                    },
                    "end": {
                      "line": 17,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 337,
              "end": 351,
              "loc": {
                "start": {
                  "line": 18,
                  "column": 8
                },
                "end": {
                  "line": 18,
                  "column": 22
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 337,
                "end": 351,
                "loc": {
                  "start": {
                    "line": 18,
                    "column": 8
                  },
                  "end": {
                    "line": 18,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": true,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 349,
                  "end": 351,
                  "loc": {
                    "start": {
                      "line": 18,
                      "column": 20
                    },
                    "end": {
                      "line": 18,
                      "column": 22
                    }
                  },
                  "body": []
                }
              }
            },
            {
              "type": "ExpressionStatement",
              "start": 360,
              "end": 368,
              "loc": {
                "start": {
                  "line": 19,
                  "column": 8
                },
                "end": {
                  "line": 19,
                  "column": 16
                }
              },
              "expression": {
                "type": "ArrowFunctionExpression",
                "start": 360,
                "end": 368,
                "loc": {
                  "start": {
                    "line": 19,
                    "column": 8
                  },
                  "end": {
                    "line": 19,
                    "column": 16
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 366,
                  "end": 368,
                  "loc": {
                    "start": {
                      "line": 19,
                      "column": 14
                    },
                    "end": {
                      "line": 19,
                      "column": 16
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

    it('should parse complex #2', () => {
        expect(parseScript(`() => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        a => {}
        a => {}
        async () => {}
        () => {}
        async b => {}
        async b => {}
        () => {}
        () => {}
        () => {}
        () => {}
        a => {}
        async () => {}
        () => {}
        async () => {}
        a => {}
        async () => {}
        async () => {}
        a => {}
        () => {}
        async a => {}
        async () => {}`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 491,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 26,
                "column": 22
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "ArrowFunctionExpression",
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
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
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
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 17,
                "end": 25,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 2,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 17,
                  "end": 25,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 2,
                      "column": 16
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
                    "end": 25,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 14
                      },
                      "end": {
                        "line": 2,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 34,
                "end": 48,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 8
                  },
                  "end": {
                    "line": 3,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 34,
                  "end": 48,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 8
                    },
                    "end": {
                      "line": 3,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 46,
                    "end": 48,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 20
                      },
                      "end": {
                        "line": 3,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 57,
                "end": 71,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 8
                  },
                  "end": {
                    "line": 4,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 57,
                  "end": 71,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 8
                    },
                    "end": {
                      "line": 4,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 69,
                    "end": 71,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 20
                      },
                      "end": {
                        "line": 4,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 80,
                "end": 88,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 8
                  },
                  "end": {
                    "line": 5,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 80,
                  "end": 88,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 8
                    },
                    "end": {
                      "line": 5,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 86,
                    "end": 88,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 14
                      },
                      "end": {
                        "line": 5,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 97,
                "end": 104,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 8
                  },
                  "end": {
                    "line": 6,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 97,
                  "end": 104,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 8
                    },
                    "end": {
                      "line": 6,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 97,
                      "end": 98,
                      "loc": {
                        "start": {
                          "line": 6,
                          "column": 8
                        },
                        "end": {
                          "line": 6,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 102,
                    "end": 104,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 13
                      },
                      "end": {
                        "line": 6,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 113,
                "end": 120,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 8
                  },
                  "end": {
                    "line": 7,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 113,
                  "end": 120,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 8
                    },
                    "end": {
                      "line": 7,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 113,
                      "end": 114,
                      "loc": {
                        "start": {
                          "line": 7,
                          "column": 8
                        },
                        "end": {
                          "line": 7,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 118,
                    "end": 120,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 13
                      },
                      "end": {
                        "line": 7,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 129,
                "end": 143,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 8
                  },
                  "end": {
                    "line": 8,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 129,
                  "end": 143,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 8
                    },
                    "end": {
                      "line": 8,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 141,
                    "end": 143,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 20
                      },
                      "end": {
                        "line": 8,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 152,
                "end": 160,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 8
                  },
                  "end": {
                    "line": 9,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 152,
                  "end": 160,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 8
                    },
                    "end": {
                      "line": 9,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 158,
                    "end": 160,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 14
                      },
                      "end": {
                        "line": 9,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 169,
                "end": 182,
                "loc": {
                  "start": {
                    "line": 10,
                    "column": 8
                  },
                  "end": {
                    "line": 10,
                    "column": 21
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 169,
                  "end": 182,
                  "loc": {
                    "start": {
                      "line": 10,
                      "column": 8
                    },
                    "end": {
                      "line": 10,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 175,
                      "end": 176,
                      "loc": {
                        "start": {
                          "line": 10,
                          "column": 14
                        },
                        "end": {
                          "line": 10,
                          "column": 15
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 180,
                    "end": 182,
                    "loc": {
                      "start": {
                        "line": 10,
                        "column": 19
                      },
                      "end": {
                        "line": 10,
                        "column": 21
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 191,
                "end": 204,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 8
                  },
                  "end": {
                    "line": 11,
                    "column": 21
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 191,
                  "end": 204,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 8
                    },
                    "end": {
                      "line": 11,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 197,
                      "end": 198,
                      "loc": {
                        "start": {
                          "line": 11,
                          "column": 14
                        },
                        "end": {
                          "line": 11,
                          "column": 15
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 202,
                    "end": 204,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 19
                      },
                      "end": {
                        "line": 11,
                        "column": 21
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 213,
                "end": 221,
                "loc": {
                  "start": {
                    "line": 12,
                    "column": 8
                  },
                  "end": {
                    "line": 12,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 213,
                  "end": 221,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 8
                    },
                    "end": {
                      "line": 12,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 219,
                    "end": 221,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 14
                      },
                      "end": {
                        "line": 12,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 230,
                "end": 238,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 8
                  },
                  "end": {
                    "line": 13,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 230,
                  "end": 238,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 8
                    },
                    "end": {
                      "line": 13,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 236,
                    "end": 238,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 14
                      },
                      "end": {
                        "line": 13,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 247,
                "end": 255,
                "loc": {
                  "start": {
                    "line": 14,
                    "column": 8
                  },
                  "end": {
                    "line": 14,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 247,
                  "end": 255,
                  "loc": {
                    "start": {
                      "line": 14,
                      "column": 8
                    },
                    "end": {
                      "line": 14,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 253,
                    "end": 255,
                    "loc": {
                      "start": {
                        "line": 14,
                        "column": 14
                      },
                      "end": {
                        "line": 14,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 264,
                "end": 272,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 8
                  },
                  "end": {
                    "line": 15,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 264,
                  "end": 272,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 8
                    },
                    "end": {
                      "line": 15,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 270,
                    "end": 272,
                    "loc": {
                      "start": {
                        "line": 15,
                        "column": 14
                      },
                      "end": {
                        "line": 15,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 281,
                "end": 288,
                "loc": {
                  "start": {
                    "line": 16,
                    "column": 8
                  },
                  "end": {
                    "line": 16,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 281,
                  "end": 288,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 8
                    },
                    "end": {
                      "line": 16,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 281,
                      "end": 282,
                      "loc": {
                        "start": {
                          "line": 16,
                          "column": 8
                        },
                        "end": {
                          "line": 16,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 286,
                    "end": 288,
                    "loc": {
                      "start": {
                        "line": 16,
                        "column": 13
                      },
                      "end": {
                        "line": 16,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 297,
                "end": 311,
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 8
                  },
                  "end": {
                    "line": 17,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 297,
                  "end": 311,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 8
                    },
                    "end": {
                      "line": 17,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 309,
                    "end": 311,
                    "loc": {
                      "start": {
                        "line": 17,
                        "column": 20
                      },
                      "end": {
                        "line": 17,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 320,
                "end": 328,
                "loc": {
                  "start": {
                    "line": 18,
                    "column": 8
                  },
                  "end": {
                    "line": 18,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 320,
                  "end": 328,
                  "loc": {
                    "start": {
                      "line": 18,
                      "column": 8
                    },
                    "end": {
                      "line": 18,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 326,
                    "end": 328,
                    "loc": {
                      "start": {
                        "line": 18,
                        "column": 14
                      },
                      "end": {
                        "line": 18,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 337,
                "end": 351,
                "loc": {
                  "start": {
                    "line": 19,
                    "column": 8
                  },
                  "end": {
                    "line": 19,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 337,
                  "end": 351,
                  "loc": {
                    "start": {
                      "line": 19,
                      "column": 8
                    },
                    "end": {
                      "line": 19,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 349,
                    "end": 351,
                    "loc": {
                      "start": {
                        "line": 19,
                        "column": 20
                      },
                      "end": {
                        "line": 19,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 360,
                "end": 367,
                "loc": {
                  "start": {
                    "line": 20,
                    "column": 8
                  },
                  "end": {
                    "line": 20,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 360,
                  "end": 367,
                  "loc": {
                    "start": {
                      "line": 20,
                      "column": 8
                    },
                    "end": {
                      "line": 20,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 360,
                      "end": 361,
                      "loc": {
                        "start": {
                          "line": 20,
                          "column": 8
                        },
                        "end": {
                          "line": 20,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 365,
                    "end": 367,
                    "loc": {
                      "start": {
                        "line": 20,
                        "column": 13
                      },
                      "end": {
                        "line": 20,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 376,
                "end": 390,
                "loc": {
                  "start": {
                    "line": 21,
                    "column": 8
                  },
                  "end": {
                    "line": 21,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 376,
                  "end": 390,
                  "loc": {
                    "start": {
                      "line": 21,
                      "column": 8
                    },
                    "end": {
                      "line": 21,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 388,
                    "end": 390,
                    "loc": {
                      "start": {
                        "line": 21,
                        "column": 20
                      },
                      "end": {
                        "line": 21,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 399,
                "end": 413,
                "loc": {
                  "start": {
                    "line": 22,
                    "column": 8
                  },
                  "end": {
                    "line": 22,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 399,
                  "end": 413,
                  "loc": {
                    "start": {
                      "line": 22,
                      "column": 8
                    },
                    "end": {
                      "line": 22,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 411,
                    "end": 413,
                    "loc": {
                      "start": {
                        "line": 22,
                        "column": 20
                      },
                      "end": {
                        "line": 22,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 422,
                "end": 429,
                "loc": {
                  "start": {
                    "line": 23,
                    "column": 8
                  },
                  "end": {
                    "line": 23,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 422,
                  "end": 429,
                  "loc": {
                    "start": {
                      "line": 23,
                      "column": 8
                    },
                    "end": {
                      "line": 23,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 422,
                      "end": 423,
                      "loc": {
                        "start": {
                          "line": 23,
                          "column": 8
                        },
                        "end": {
                          "line": 23,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 427,
                    "end": 429,
                    "loc": {
                      "start": {
                        "line": 23,
                        "column": 13
                      },
                      "end": {
                        "line": 23,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 438,
                "end": 446,
                "loc": {
                  "start": {
                    "line": 24,
                    "column": 8
                  },
                  "end": {
                    "line": 24,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 438,
                  "end": 446,
                  "loc": {
                    "start": {
                      "line": 24,
                      "column": 8
                    },
                    "end": {
                      "line": 24,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 444,
                    "end": 446,
                    "loc": {
                      "start": {
                        "line": 24,
                        "column": 14
                      },
                      "end": {
                        "line": 24,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 455,
                "end": 468,
                "loc": {
                  "start": {
                    "line": 25,
                    "column": 8
                  },
                  "end": {
                    "line": 25,
                    "column": 21
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 455,
                  "end": 468,
                  "loc": {
                    "start": {
                      "line": 25,
                      "column": 8
                    },
                    "end": {
                      "line": 25,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 461,
                      "end": 462,
                      "loc": {
                        "start": {
                          "line": 25,
                          "column": 14
                        },
                        "end": {
                          "line": 25,
                          "column": 15
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 466,
                    "end": 468,
                    "loc": {
                      "start": {
                        "line": 25,
                        "column": 19
                      },
                      "end": {
                        "line": 25,
                        "column": 21
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 477,
                "end": 491,
                "loc": {
                  "start": {
                    "line": 26,
                    "column": 8
                  },
                  "end": {
                    "line": 26,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 477,
                  "end": 491,
                  "loc": {
                    "start": {
                      "line": 26,
                      "column": 8
                    },
                    "end": {
                      "line": 26,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 489,
                    "end": 491,
                    "loc": {
                      "start": {
                        "line": 26,
                        "column": 20
                      },
                      "end": {
                        "line": 26,
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


    it('should parse complex #3', () => {
        expect(parseScript(`a => a => a => async a => a`, {
            ranges: true,
            locations: true,
            raw: true
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
                  "expression": true,
                  "async": false,
                  "params": [
                    {
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
                  ],
                  "body": {
                    "type": "ArrowFunctionExpression",
                    "start": 5,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 5
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
                      {
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
                        "name": "a"
                      }
                    ],
                    "body": {
                      "type": "ArrowFunctionExpression",
                      "start": 10,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
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
                        }
                      ],
                      "body": {
                        "type": "ArrowFunctionExpression",
                        "start": 15,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 15
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": true,
                        "params": [
                          {
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
                            "name": "a"
                          }
                        ],
                        "body": {
                          "type": "Identifier",
                          "start": 26,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 26
                            },
                            "end": {
                              "line": 1,
                              "column": 27
                            }
                          },
                          "name": "a"
                        }
                      }
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });


    it('should parse complex #4', () => {
        expect(parseScript(`a => a => a => async a => a
        async a => a
        a => a => a => async a => a
        async () => {}
        async a => a`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 128,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 20
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
                  "expression": true,
                  "async": false,
                  "params": [
                    {
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
                  ],
                  "body": {
                    "type": "ArrowFunctionExpression",
                    "start": 5,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 5
                      },
                      "end": {
                        "line": 1,
                        "column": 27
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
                      {
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
                        "name": "a"
                      }
                    ],
                    "body": {
                      "type": "ArrowFunctionExpression",
                      "start": 10,
                      "end": 27,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 27
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
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
                        }
                      ],
                      "body": {
                        "type": "ArrowFunctionExpression",
                        "start": 15,
                        "end": 27,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 15
                          },
                          "end": {
                            "line": 1,
                            "column": 27
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": true,
                        "params": [
                          {
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
                            "name": "a"
                          }
                        ],
                        "body": {
                          "type": "Identifier",
                          "start": 26,
                          "end": 27,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 26
                            },
                            "end": {
                              "line": 1,
                              "column": 27
                            }
                          },
                          "name": "a"
                        }
                      }
                    }
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 36,
                "end": 48,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 2,
                    "column": 20
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 36,
                  "end": 48,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 2,
                      "column": 20
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 42,
                      "end": 43,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 14
                        },
                        "end": {
                          "line": 2,
                          "column": 15
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 47,
                    "end": 48,
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
                    "name": "a"
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 57,
                "end": 84,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 8
                  },
                  "end": {
                    "line": 3,
                    "column": 35
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 57,
                  "end": 84,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 8
                    },
                    "end": {
                      "line": 3,
                      "column": 35
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 57,
                      "end": 58,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 8
                        },
                        "end": {
                          "line": 3,
                          "column": 9
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "ArrowFunctionExpression",
                    "start": 62,
                    "end": 84,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 13
                      },
                      "end": {
                        "line": 3,
                        "column": 35
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 62,
                        "end": 63,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 13
                          },
                          "end": {
                            "line": 3,
                            "column": 14
                          }
                        },
                        "name": "a"
                      }
                    ],
                    "body": {
                      "type": "ArrowFunctionExpression",
                      "start": 67,
                      "end": 84,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 18
                        },
                        "end": {
                          "line": 3,
                          "column": 35
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 67,
                          "end": 68,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 18
                            },
                            "end": {
                              "line": 3,
                              "column": 19
                            }
                          },
                          "name": "a"
                        }
                      ],
                      "body": {
                        "type": "ArrowFunctionExpression",
                        "start": 72,
                        "end": 84,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 23
                          },
                          "end": {
                            "line": 3,
                            "column": 35
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": true,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 78,
                            "end": 79,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 29
                              },
                              "end": {
                                "line": 3,
                                "column": 30
                              }
                            },
                            "name": "a"
                          }
                        ],
                        "body": {
                          "type": "Identifier",
                          "start": 83,
                          "end": 84,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 34
                            },
                            "end": {
                              "line": 3,
                              "column": 35
                            }
                          },
                          "name": "a"
                        }
                      }
                    }
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 93,
                "end": 107,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 8
                  },
                  "end": {
                    "line": 4,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 93,
                  "end": 107,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 8
                    },
                    "end": {
                      "line": 4,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 105,
                    "end": 107,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 20
                      },
                      "end": {
                        "line": 4,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 116,
                "end": 128,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 8
                  },
                  "end": {
                    "line": 5,
                    "column": 20
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 116,
                  "end": 128,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 8
                    },
                    "end": {
                      "line": 5,
                      "column": 20
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 122,
                      "end": 123,
                      "loc": {
                        "start": {
                          "line": 5,
                          "column": 14
                        },
                        "end": {
                          "line": 5,
                          "column": 15
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "Identifier",
                    "start": 127,
                    "end": 128,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 19
                      },
                      "end": {
                        "line": 5,
                        "column": 20
                      }
                    },
                    "name": "a"
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse complex #5', () => {
        expect(parseScript(`() => {}
        () => {}
        () => {}
        () => {}
        () => {}
        () => {}
        () => {}
        async b => {}
        async b => {}
        async b => {}
        async () => {}
        async () => {}
        async () => {}
        async () => {}
        async () => {}
        () => {}
        async () => {}
        () => {}
        async () => {}
        () => {}
        a => {}
        a => {}
        async () => {}
        () => {}
        a => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        async () => {}
        a => {}
        async () => {}
        async () => {}
        () => {}`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
  "type": "Program",
  "start": 0,
  "end": 658,
  "loc": {
    "start": {
      "line": 1,
      "column": 0
    },
    "end": {
      "line": 34,
      "column": 16
    }
  },
  "body": [
    {
      "type": "ExpressionStatement",
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
      "expression": {
        "type": "ArrowFunctionExpression",
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
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
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
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 17,
      "end": 25,
      "loc": {
        "start": {
          "line": 2,
          "column": 8
        },
        "end": {
          "line": 2,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 17,
        "end": 25,
        "loc": {
          "start": {
            "line": 2,
            "column": 8
          },
          "end": {
            "line": 2,
            "column": 16
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
          "end": 25,
          "loc": {
            "start": {
              "line": 2,
              "column": 14
            },
            "end": {
              "line": 2,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 34,
      "end": 42,
      "loc": {
        "start": {
          "line": 3,
          "column": 8
        },
        "end": {
          "line": 3,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 34,
        "end": 42,
        "loc": {
          "start": {
            "line": 3,
            "column": 8
          },
          "end": {
            "line": 3,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 40,
          "end": 42,
          "loc": {
            "start": {
              "line": 3,
              "column": 14
            },
            "end": {
              "line": 3,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 51,
      "end": 59,
      "loc": {
        "start": {
          "line": 4,
          "column": 8
        },
        "end": {
          "line": 4,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 51,
        "end": 59,
        "loc": {
          "start": {
            "line": 4,
            "column": 8
          },
          "end": {
            "line": 4,
            "column": 16
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
              "line": 4,
              "column": 14
            },
            "end": {
              "line": 4,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 68,
      "end": 76,
      "loc": {
        "start": {
          "line": 5,
          "column": 8
        },
        "end": {
          "line": 5,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 68,
        "end": 76,
        "loc": {
          "start": {
            "line": 5,
            "column": 8
          },
          "end": {
            "line": 5,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 74,
          "end": 76,
          "loc": {
            "start": {
              "line": 5,
              "column": 14
            },
            "end": {
              "line": 5,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 85,
      "end": 93,
      "loc": {
        "start": {
          "line": 6,
          "column": 8
        },
        "end": {
          "line": 6,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 85,
        "end": 93,
        "loc": {
          "start": {
            "line": 6,
            "column": 8
          },
          "end": {
            "line": 6,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 91,
          "end": 93,
          "loc": {
            "start": {
              "line": 6,
              "column": 14
            },
            "end": {
              "line": 6,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 102,
      "end": 110,
      "loc": {
        "start": {
          "line": 7,
          "column": 8
        },
        "end": {
          "line": 7,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 102,
        "end": 110,
        "loc": {
          "start": {
            "line": 7,
            "column": 8
          },
          "end": {
            "line": 7,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 108,
          "end": 110,
          "loc": {
            "start": {
              "line": 7,
              "column": 14
            },
            "end": {
              "line": 7,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 119,
      "end": 132,
      "loc": {
        "start": {
          "line": 8,
          "column": 8
        },
        "end": {
          "line": 8,
          "column": 21
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 119,
        "end": 132,
        "loc": {
          "start": {
            "line": 8,
            "column": 8
          },
          "end": {
            "line": 8,
            "column": 21
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [
          {
            "type": "Identifier",
            "start": 125,
            "end": 126,
            "loc": {
              "start": {
                "line": 8,
                "column": 14
              },
              "end": {
                "line": 8,
                "column": 15
              }
            },
            "name": "b"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 130,
          "end": 132,
          "loc": {
            "start": {
              "line": 8,
              "column": 19
            },
            "end": {
              "line": 8,
              "column": 21
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 141,
      "end": 154,
      "loc": {
        "start": {
          "line": 9,
          "column": 8
        },
        "end": {
          "line": 9,
          "column": 21
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 141,
        "end": 154,
        "loc": {
          "start": {
            "line": 9,
            "column": 8
          },
          "end": {
            "line": 9,
            "column": 21
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [
          {
            "type": "Identifier",
            "start": 147,
            "end": 148,
            "loc": {
              "start": {
                "line": 9,
                "column": 14
              },
              "end": {
                "line": 9,
                "column": 15
              }
            },
            "name": "b"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 152,
          "end": 154,
          "loc": {
            "start": {
              "line": 9,
              "column": 19
            },
            "end": {
              "line": 9,
              "column": 21
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 163,
      "end": 176,
      "loc": {
        "start": {
          "line": 10,
          "column": 8
        },
        "end": {
          "line": 10,
          "column": 21
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 163,
        "end": 176,
        "loc": {
          "start": {
            "line": 10,
            "column": 8
          },
          "end": {
            "line": 10,
            "column": 21
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [
          {
            "type": "Identifier",
            "start": 169,
            "end": 170,
            "loc": {
              "start": {
                "line": 10,
                "column": 14
              },
              "end": {
                "line": 10,
                "column": 15
              }
            },
            "name": "b"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 174,
          "end": 176,
          "loc": {
            "start": {
              "line": 10,
              "column": 19
            },
            "end": {
              "line": 10,
              "column": 21
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 185,
      "end": 199,
      "loc": {
        "start": {
          "line": 11,
          "column": 8
        },
        "end": {
          "line": 11,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 185,
        "end": 199,
        "loc": {
          "start": {
            "line": 11,
            "column": 8
          },
          "end": {
            "line": 11,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 197,
          "end": 199,
          "loc": {
            "start": {
              "line": 11,
              "column": 20
            },
            "end": {
              "line": 11,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 208,
      "end": 222,
      "loc": {
        "start": {
          "line": 12,
          "column": 8
        },
        "end": {
          "line": 12,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 208,
        "end": 222,
        "loc": {
          "start": {
            "line": 12,
            "column": 8
          },
          "end": {
            "line": 12,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 220,
          "end": 222,
          "loc": {
            "start": {
              "line": 12,
              "column": 20
            },
            "end": {
              "line": 12,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 231,
      "end": 245,
      "loc": {
        "start": {
          "line": 13,
          "column": 8
        },
        "end": {
          "line": 13,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 231,
        "end": 245,
        "loc": {
          "start": {
            "line": 13,
            "column": 8
          },
          "end": {
            "line": 13,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 243,
          "end": 245,
          "loc": {
            "start": {
              "line": 13,
              "column": 20
            },
            "end": {
              "line": 13,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 254,
      "end": 268,
      "loc": {
        "start": {
          "line": 14,
          "column": 8
        },
        "end": {
          "line": 14,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 254,
        "end": 268,
        "loc": {
          "start": {
            "line": 14,
            "column": 8
          },
          "end": {
            "line": 14,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 266,
          "end": 268,
          "loc": {
            "start": {
              "line": 14,
              "column": 20
            },
            "end": {
              "line": 14,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 277,
      "end": 291,
      "loc": {
        "start": {
          "line": 15,
          "column": 8
        },
        "end": {
          "line": 15,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 277,
        "end": 291,
        "loc": {
          "start": {
            "line": 15,
            "column": 8
          },
          "end": {
            "line": 15,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 289,
          "end": 291,
          "loc": {
            "start": {
              "line": 15,
              "column": 20
            },
            "end": {
              "line": 15,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 300,
      "end": 308,
      "loc": {
        "start": {
          "line": 16,
          "column": 8
        },
        "end": {
          "line": 16,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 300,
        "end": 308,
        "loc": {
          "start": {
            "line": 16,
            "column": 8
          },
          "end": {
            "line": 16,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 306,
          "end": 308,
          "loc": {
            "start": {
              "line": 16,
              "column": 14
            },
            "end": {
              "line": 16,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 317,
      "end": 331,
      "loc": {
        "start": {
          "line": 17,
          "column": 8
        },
        "end": {
          "line": 17,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 317,
        "end": 331,
        "loc": {
          "start": {
            "line": 17,
            "column": 8
          },
          "end": {
            "line": 17,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 329,
          "end": 331,
          "loc": {
            "start": {
              "line": 17,
              "column": 20
            },
            "end": {
              "line": 17,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 340,
      "end": 348,
      "loc": {
        "start": {
          "line": 18,
          "column": 8
        },
        "end": {
          "line": 18,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 340,
        "end": 348,
        "loc": {
          "start": {
            "line": 18,
            "column": 8
          },
          "end": {
            "line": 18,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 346,
          "end": 348,
          "loc": {
            "start": {
              "line": 18,
              "column": 14
            },
            "end": {
              "line": 18,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 357,
      "end": 371,
      "loc": {
        "start": {
          "line": 19,
          "column": 8
        },
        "end": {
          "line": 19,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 357,
        "end": 371,
        "loc": {
          "start": {
            "line": 19,
            "column": 8
          },
          "end": {
            "line": 19,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 369,
          "end": 371,
          "loc": {
            "start": {
              "line": 19,
              "column": 20
            },
            "end": {
              "line": 19,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 380,
      "end": 388,
      "loc": {
        "start": {
          "line": 20,
          "column": 8
        },
        "end": {
          "line": 20,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 380,
        "end": 388,
        "loc": {
          "start": {
            "line": 20,
            "column": 8
          },
          "end": {
            "line": 20,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 386,
          "end": 388,
          "loc": {
            "start": {
              "line": 20,
              "column": 14
            },
            "end": {
              "line": 20,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 397,
      "end": 404,
      "loc": {
        "start": {
          "line": 21,
          "column": 8
        },
        "end": {
          "line": 21,
          "column": 15
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 397,
        "end": 404,
        "loc": {
          "start": {
            "line": 21,
            "column": 8
          },
          "end": {
            "line": 21,
            "column": 15
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "Identifier",
            "start": 397,
            "end": 398,
            "loc": {
              "start": {
                "line": 21,
                "column": 8
              },
              "end": {
                "line": 21,
                "column": 9
              }
            },
            "name": "a"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 402,
          "end": 404,
          "loc": {
            "start": {
              "line": 21,
              "column": 13
            },
            "end": {
              "line": 21,
              "column": 15
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 413,
      "end": 420,
      "loc": {
        "start": {
          "line": 22,
          "column": 8
        },
        "end": {
          "line": 22,
          "column": 15
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 413,
        "end": 420,
        "loc": {
          "start": {
            "line": 22,
            "column": 8
          },
          "end": {
            "line": 22,
            "column": 15
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "Identifier",
            "start": 413,
            "end": 414,
            "loc": {
              "start": {
                "line": 22,
                "column": 8
              },
              "end": {
                "line": 22,
                "column": 9
              }
            },
            "name": "a"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 418,
          "end": 420,
          "loc": {
            "start": {
              "line": 22,
              "column": 13
            },
            "end": {
              "line": 22,
              "column": 15
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 429,
      "end": 443,
      "loc": {
        "start": {
          "line": 23,
          "column": 8
        },
        "end": {
          "line": 23,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 429,
        "end": 443,
        "loc": {
          "start": {
            "line": 23,
            "column": 8
          },
          "end": {
            "line": 23,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 441,
          "end": 443,
          "loc": {
            "start": {
              "line": 23,
              "column": 20
            },
            "end": {
              "line": 23,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 452,
      "end": 460,
      "loc": {
        "start": {
          "line": 24,
          "column": 8
        },
        "end": {
          "line": 24,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 452,
        "end": 460,
        "loc": {
          "start": {
            "line": 24,
            "column": 8
          },
          "end": {
            "line": 24,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 458,
          "end": 460,
          "loc": {
            "start": {
              "line": 24,
              "column": 14
            },
            "end": {
              "line": 24,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 469,
      "end": 476,
      "loc": {
        "start": {
          "line": 25,
          "column": 8
        },
        "end": {
          "line": 25,
          "column": 15
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 469,
        "end": 476,
        "loc": {
          "start": {
            "line": 25,
            "column": 8
          },
          "end": {
            "line": 25,
            "column": 15
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "Identifier",
            "start": 469,
            "end": 470,
            "loc": {
              "start": {
                "line": 25,
                "column": 8
              },
              "end": {
                "line": 25,
                "column": 9
              }
            },
            "name": "a"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 474,
          "end": 476,
          "loc": {
            "start": {
              "line": 25,
              "column": 13
            },
            "end": {
              "line": 25,
              "column": 15
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 485,
      "end": 493,
      "loc": {
        "start": {
          "line": 26,
          "column": 8
        },
        "end": {
          "line": 26,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 485,
        "end": 493,
        "loc": {
          "start": {
            "line": 26,
            "column": 8
          },
          "end": {
            "line": 26,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 491,
          "end": 493,
          "loc": {
            "start": {
              "line": 26,
              "column": 14
            },
            "end": {
              "line": 26,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 502,
      "end": 516,
      "loc": {
        "start": {
          "line": 27,
          "column": 8
        },
        "end": {
          "line": 27,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 502,
        "end": 516,
        "loc": {
          "start": {
            "line": 27,
            "column": 8
          },
          "end": {
            "line": 27,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 514,
          "end": 516,
          "loc": {
            "start": {
              "line": 27,
              "column": 20
            },
            "end": {
              "line": 27,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 525,
      "end": 539,
      "loc": {
        "start": {
          "line": 28,
          "column": 8
        },
        "end": {
          "line": 28,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 525,
        "end": 539,
        "loc": {
          "start": {
            "line": 28,
            "column": 8
          },
          "end": {
            "line": 28,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 537,
          "end": 539,
          "loc": {
            "start": {
              "line": 28,
              "column": 20
            },
            "end": {
              "line": 28,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 548,
      "end": 556,
      "loc": {
        "start": {
          "line": 29,
          "column": 8
        },
        "end": {
          "line": 29,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 548,
        "end": 556,
        "loc": {
          "start": {
            "line": 29,
            "column": 8
          },
          "end": {
            "line": 29,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 554,
          "end": 556,
          "loc": {
            "start": {
              "line": 29,
              "column": 14
            },
            "end": {
              "line": 29,
              "column": 16
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 565,
      "end": 579,
      "loc": {
        "start": {
          "line": 30,
          "column": 8
        },
        "end": {
          "line": 30,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 565,
        "end": 579,
        "loc": {
          "start": {
            "line": 30,
            "column": 8
          },
          "end": {
            "line": 30,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 577,
          "end": 579,
          "loc": {
            "start": {
              "line": 30,
              "column": 20
            },
            "end": {
              "line": 30,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 588,
      "end": 595,
      "loc": {
        "start": {
          "line": 31,
          "column": 8
        },
        "end": {
          "line": 31,
          "column": 15
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 588,
        "end": 595,
        "loc": {
          "start": {
            "line": 31,
            "column": 8
          },
          "end": {
            "line": 31,
            "column": 15
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [
          {
            "type": "Identifier",
            "start": 588,
            "end": 589,
            "loc": {
              "start": {
                "line": 31,
                "column": 8
              },
              "end": {
                "line": 31,
                "column": 9
              }
            },
            "name": "a"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "start": 593,
          "end": 595,
          "loc": {
            "start": {
              "line": 31,
              "column": 13
            },
            "end": {
              "line": 31,
              "column": 15
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 604,
      "end": 618,
      "loc": {
        "start": {
          "line": 32,
          "column": 8
        },
        "end": {
          "line": 32,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 604,
        "end": 618,
        "loc": {
          "start": {
            "line": 32,
            "column": 8
          },
          "end": {
            "line": 32,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 616,
          "end": 618,
          "loc": {
            "start": {
              "line": 32,
              "column": 20
            },
            "end": {
              "line": 32,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 627,
      "end": 641,
      "loc": {
        "start": {
          "line": 33,
          "column": 8
        },
        "end": {
          "line": 33,
          "column": 22
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 627,
        "end": 641,
        "loc": {
          "start": {
            "line": 33,
            "column": 8
          },
          "end": {
            "line": 33,
            "column": 22
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": true,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 639,
          "end": 641,
          "loc": {
            "start": {
              "line": 33,
              "column": 20
            },
            "end": {
              "line": 33,
              "column": 22
            }
          },
          "body": []
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 650,
      "end": 658,
      "loc": {
        "start": {
          "line": 34,
          "column": 8
        },
        "end": {
          "line": 34,
          "column": 16
        }
      },
      "expression": {
        "type": "ArrowFunctionExpression",
        "start": 650,
        "end": 658,
        "loc": {
          "start": {
            "line": 34,
            "column": 8
          },
          "end": {
            "line": 34,
            "column": 16
          }
        },
        "id": null,
        "generator": false,
        "expression": false,
        "async": false,
        "params": [],
        "body": {
          "type": "BlockStatement",
          "start": 656,
          "end": 658,
          "loc": {
            "start": {
              "line": 34,
              "column": 14
            },
            "end": {
              "line": 34,
              "column": 16
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

      it('should parse complex #6', () => {
        expect(parseScript(`async () => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        
        async () => {}
        () => {}
        async b => {}
        async () => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        async () => {}
        () => {}
        async () => {}
        async () => {}
        () => {}
        b => {}
        () => {}
        async b => {}
        async () => {}
        async () => {}
        () => {}
        
        async () => {}
        () => {}
        
        async () => {}
        () => {}
        async () => {}
        a
        async () => {}
        () => {}`, {
            ranges: true,
            locations: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 740,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 39,
                "column": 16
              }
            },
            "body": [
              {
                "type": "ExpressionStatement",
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
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
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
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 23,
                "end": 31,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 8
                  },
                  "end": {
                    "line": 2,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 23,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 2,
                      "column": 16
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
                        "line": 2,
                        "column": 14
                      },
                      "end": {
                        "line": 2,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 40,
                "end": 54,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 8
                  },
                  "end": {
                    "line": 3,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 40,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 8
                    },
                    "end": {
                      "line": 3,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 52,
                    "end": 54,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 20
                      },
                      "end": {
                        "line": 3,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 63,
                "end": 77,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 8
                  },
                  "end": {
                    "line": 4,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 63,
                  "end": 77,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 8
                    },
                    "end": {
                      "line": 4,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 75,
                    "end": 77,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 20
                      },
                      "end": {
                        "line": 4,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 86,
                "end": 94,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 8
                  },
                  "end": {
                    "line": 5,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 86,
                  "end": 94,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 8
                    },
                    "end": {
                      "line": 5,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 92,
                    "end": 94,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 14
                      },
                      "end": {
                        "line": 5,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 103,
                "end": 111,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 8
                  },
                  "end": {
                    "line": 6,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 103,
                  "end": 111,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 8
                    },
                    "end": {
                      "line": 6,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 109,
                    "end": 111,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 14
                      },
                      "end": {
                        "line": 6,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 120,
                "end": 134,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 8
                  },
                  "end": {
                    "line": 7,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 120,
                  "end": 134,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 8
                    },
                    "end": {
                      "line": 7,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 132,
                    "end": 134,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 20
                      },
                      "end": {
                        "line": 7,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 143,
                "end": 157,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 8
                  },
                  "end": {
                    "line": 8,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 143,
                  "end": 157,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 8
                    },
                    "end": {
                      "line": 8,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 155,
                    "end": 157,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 20
                      },
                      "end": {
                        "line": 8,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 166,
                "end": 174,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 8
                  },
                  "end": {
                    "line": 9,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 166,
                  "end": 174,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 8
                    },
                    "end": {
                      "line": 9,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 172,
                    "end": 174,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 14
                      },
                      "end": {
                        "line": 9,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 192,
                "end": 206,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 8
                  },
                  "end": {
                    "line": 11,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 192,
                  "end": 206,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 8
                    },
                    "end": {
                      "line": 11,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 204,
                    "end": 206,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 20
                      },
                      "end": {
                        "line": 11,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 215,
                "end": 223,
                "loc": {
                  "start": {
                    "line": 12,
                    "column": 8
                  },
                  "end": {
                    "line": 12,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 215,
                  "end": 223,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 8
                    },
                    "end": {
                      "line": 12,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 221,
                    "end": 223,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 14
                      },
                      "end": {
                        "line": 12,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 232,
                "end": 245,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 8
                  },
                  "end": {
                    "line": 13,
                    "column": 21
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 232,
                  "end": 245,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 8
                    },
                    "end": {
                      "line": 13,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 238,
                      "end": 239,
                      "loc": {
                        "start": {
                          "line": 13,
                          "column": 14
                        },
                        "end": {
                          "line": 13,
                          "column": 15
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 243,
                    "end": 245,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 19
                      },
                      "end": {
                        "line": 13,
                        "column": 21
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 254,
                "end": 268,
                "loc": {
                  "start": {
                    "line": 14,
                    "column": 8
                  },
                  "end": {
                    "line": 14,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 254,
                  "end": 268,
                  "loc": {
                    "start": {
                      "line": 14,
                      "column": 8
                    },
                    "end": {
                      "line": 14,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 266,
                    "end": 268,
                    "loc": {
                      "start": {
                        "line": 14,
                        "column": 20
                      },
                      "end": {
                        "line": 14,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 277,
                "end": 285,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 8
                  },
                  "end": {
                    "line": 15,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 277,
                  "end": 285,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 8
                    },
                    "end": {
                      "line": 15,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 283,
                    "end": 285,
                    "loc": {
                      "start": {
                        "line": 15,
                        "column": 14
                      },
                      "end": {
                        "line": 15,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 294,
                "end": 308,
                "loc": {
                  "start": {
                    "line": 16,
                    "column": 8
                  },
                  "end": {
                    "line": 16,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 294,
                  "end": 308,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 8
                    },
                    "end": {
                      "line": 16,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 306,
                    "end": 308,
                    "loc": {
                      "start": {
                        "line": 16,
                        "column": 20
                      },
                      "end": {
                        "line": 16,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 317,
                "end": 331,
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 8
                  },
                  "end": {
                    "line": 17,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 317,
                  "end": 331,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 8
                    },
                    "end": {
                      "line": 17,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 329,
                    "end": 331,
                    "loc": {
                      "start": {
                        "line": 17,
                        "column": 20
                      },
                      "end": {
                        "line": 17,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 340,
                "end": 348,
                "loc": {
                  "start": {
                    "line": 18,
                    "column": 8
                  },
                  "end": {
                    "line": 18,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 340,
                  "end": 348,
                  "loc": {
                    "start": {
                      "line": 18,
                      "column": 8
                    },
                    "end": {
                      "line": 18,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 346,
                    "end": 348,
                    "loc": {
                      "start": {
                        "line": 18,
                        "column": 14
                      },
                      "end": {
                        "line": 18,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 357,
                "end": 371,
                "loc": {
                  "start": {
                    "line": 19,
                    "column": 8
                  },
                  "end": {
                    "line": 19,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 357,
                  "end": 371,
                  "loc": {
                    "start": {
                      "line": 19,
                      "column": 8
                    },
                    "end": {
                      "line": 19,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 369,
                    "end": 371,
                    "loc": {
                      "start": {
                        "line": 19,
                        "column": 20
                      },
                      "end": {
                        "line": 19,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 380,
                "end": 388,
                "loc": {
                  "start": {
                    "line": 20,
                    "column": 8
                  },
                  "end": {
                    "line": 20,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 380,
                  "end": 388,
                  "loc": {
                    "start": {
                      "line": 20,
                      "column": 8
                    },
                    "end": {
                      "line": 20,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 386,
                    "end": 388,
                    "loc": {
                      "start": {
                        "line": 20,
                        "column": 14
                      },
                      "end": {
                        "line": 20,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 397,
                "end": 411,
                "loc": {
                  "start": {
                    "line": 21,
                    "column": 8
                  },
                  "end": {
                    "line": 21,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 397,
                  "end": 411,
                  "loc": {
                    "start": {
                      "line": 21,
                      "column": 8
                    },
                    "end": {
                      "line": 21,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 409,
                    "end": 411,
                    "loc": {
                      "start": {
                        "line": 21,
                        "column": 20
                      },
                      "end": {
                        "line": 21,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 420,
                "end": 434,
                "loc": {
                  "start": {
                    "line": 22,
                    "column": 8
                  },
                  "end": {
                    "line": 22,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 420,
                  "end": 434,
                  "loc": {
                    "start": {
                      "line": 22,
                      "column": 8
                    },
                    "end": {
                      "line": 22,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 432,
                    "end": 434,
                    "loc": {
                      "start": {
                        "line": 22,
                        "column": 20
                      },
                      "end": {
                        "line": 22,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 443,
                "end": 451,
                "loc": {
                  "start": {
                    "line": 23,
                    "column": 8
                  },
                  "end": {
                    "line": 23,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 443,
                  "end": 451,
                  "loc": {
                    "start": {
                      "line": 23,
                      "column": 8
                    },
                    "end": {
                      "line": 23,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 449,
                    "end": 451,
                    "loc": {
                      "start": {
                        "line": 23,
                        "column": 14
                      },
                      "end": {
                        "line": 23,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 460,
                "end": 467,
                "loc": {
                  "start": {
                    "line": 24,
                    "column": 8
                  },
                  "end": {
                    "line": 24,
                    "column": 15
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 460,
                  "end": 467,
                  "loc": {
                    "start": {
                      "line": 24,
                      "column": 8
                    },
                    "end": {
                      "line": 24,
                      "column": 15
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 460,
                      "end": 461,
                      "loc": {
                        "start": {
                          "line": 24,
                          "column": 8
                        },
                        "end": {
                          "line": 24,
                          "column": 9
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 465,
                    "end": 467,
                    "loc": {
                      "start": {
                        "line": 24,
                        "column": 13
                      },
                      "end": {
                        "line": 24,
                        "column": 15
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 476,
                "end": 484,
                "loc": {
                  "start": {
                    "line": 25,
                    "column": 8
                  },
                  "end": {
                    "line": 25,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 476,
                  "end": 484,
                  "loc": {
                    "start": {
                      "line": 25,
                      "column": 8
                    },
                    "end": {
                      "line": 25,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 482,
                    "end": 484,
                    "loc": {
                      "start": {
                        "line": 25,
                        "column": 14
                      },
                      "end": {
                        "line": 25,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 493,
                "end": 506,
                "loc": {
                  "start": {
                    "line": 26,
                    "column": 8
                  },
                  "end": {
                    "line": 26,
                    "column": 21
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 493,
                  "end": 506,
                  "loc": {
                    "start": {
                      "line": 26,
                      "column": 8
                    },
                    "end": {
                      "line": 26,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 499,
                      "end": 500,
                      "loc": {
                        "start": {
                          "line": 26,
                          "column": 14
                        },
                        "end": {
                          "line": 26,
                          "column": 15
                        }
                      },
                      "name": "b"
                    }
                  ],
                  "body": {
                    "type": "BlockStatement",
                    "start": 504,
                    "end": 506,
                    "loc": {
                      "start": {
                        "line": 26,
                        "column": 19
                      },
                      "end": {
                        "line": 26,
                        "column": 21
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 515,
                "end": 529,
                "loc": {
                  "start": {
                    "line": 27,
                    "column": 8
                  },
                  "end": {
                    "line": 27,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 515,
                  "end": 529,
                  "loc": {
                    "start": {
                      "line": 27,
                      "column": 8
                    },
                    "end": {
                      "line": 27,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 527,
                    "end": 529,
                    "loc": {
                      "start": {
                        "line": 27,
                        "column": 20
                      },
                      "end": {
                        "line": 27,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 538,
                "end": 552,
                "loc": {
                  "start": {
                    "line": 28,
                    "column": 8
                  },
                  "end": {
                    "line": 28,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 538,
                  "end": 552,
                  "loc": {
                    "start": {
                      "line": 28,
                      "column": 8
                    },
                    "end": {
                      "line": 28,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 550,
                    "end": 552,
                    "loc": {
                      "start": {
                        "line": 28,
                        "column": 20
                      },
                      "end": {
                        "line": 28,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 561,
                "end": 569,
                "loc": {
                  "start": {
                    "line": 29,
                    "column": 8
                  },
                  "end": {
                    "line": 29,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 561,
                  "end": 569,
                  "loc": {
                    "start": {
                      "line": 29,
                      "column": 8
                    },
                    "end": {
                      "line": 29,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 567,
                    "end": 569,
                    "loc": {
                      "start": {
                        "line": 29,
                        "column": 14
                      },
                      "end": {
                        "line": 29,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 587,
                "end": 601,
                "loc": {
                  "start": {
                    "line": 31,
                    "column": 8
                  },
                  "end": {
                    "line": 31,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 587,
                  "end": 601,
                  "loc": {
                    "start": {
                      "line": 31,
                      "column": 8
                    },
                    "end": {
                      "line": 31,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 599,
                    "end": 601,
                    "loc": {
                      "start": {
                        "line": 31,
                        "column": 20
                      },
                      "end": {
                        "line": 31,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 610,
                "end": 618,
                "loc": {
                  "start": {
                    "line": 32,
                    "column": 8
                  },
                  "end": {
                    "line": 32,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 610,
                  "end": 618,
                  "loc": {
                    "start": {
                      "line": 32,
                      "column": 8
                    },
                    "end": {
                      "line": 32,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 616,
                    "end": 618,
                    "loc": {
                      "start": {
                        "line": 32,
                        "column": 14
                      },
                      "end": {
                        "line": 32,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 636,
                "end": 650,
                "loc": {
                  "start": {
                    "line": 34,
                    "column": 8
                  },
                  "end": {
                    "line": 34,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 636,
                  "end": 650,
                  "loc": {
                    "start": {
                      "line": 34,
                      "column": 8
                    },
                    "end": {
                      "line": 34,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 648,
                    "end": 650,
                    "loc": {
                      "start": {
                        "line": 34,
                        "column": 20
                      },
                      "end": {
                        "line": 34,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 659,
                "end": 667,
                "loc": {
                  "start": {
                    "line": 35,
                    "column": 8
                  },
                  "end": {
                    "line": 35,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 659,
                  "end": 667,
                  "loc": {
                    "start": {
                      "line": 35,
                      "column": 8
                    },
                    "end": {
                      "line": 35,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 665,
                    "end": 667,
                    "loc": {
                      "start": {
                        "line": 35,
                        "column": 14
                      },
                      "end": {
                        "line": 35,
                        "column": 16
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 676,
                "end": 690,
                "loc": {
                  "start": {
                    "line": 36,
                    "column": 8
                  },
                  "end": {
                    "line": 36,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 676,
                  "end": 690,
                  "loc": {
                    "start": {
                      "line": 36,
                      "column": 8
                    },
                    "end": {
                      "line": 36,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 688,
                    "end": 690,
                    "loc": {
                      "start": {
                        "line": 36,
                        "column": 20
                      },
                      "end": {
                        "line": 36,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 699,
                "end": 700,
                "loc": {
                  "start": {
                    "line": 37,
                    "column": 8
                  },
                  "end": {
                    "line": 37,
                    "column": 9
                  }
                },
                "expression": {
                  "type": "Identifier",
                  "start": 699,
                  "end": 700,
                  "loc": {
                    "start": {
                      "line": 37,
                      "column": 8
                    },
                    "end": {
                      "line": 37,
                      "column": 9
                    }
                  },
                  "name": "a"
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 709,
                "end": 723,
                "loc": {
                  "start": {
                    "line": 38,
                    "column": 8
                  },
                  "end": {
                    "line": 38,
                    "column": 22
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 709,
                  "end": 723,
                  "loc": {
                    "start": {
                      "line": 38,
                      "column": 8
                    },
                    "end": {
                      "line": 38,
                      "column": 22
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": true,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 721,
                    "end": 723,
                    "loc": {
                      "start": {
                        "line": 38,
                        "column": 20
                      },
                      "end": {
                        "line": 38,
                        "column": 22
                      }
                    },
                    "body": []
                  }
                }
              },
              {
                "type": "ExpressionStatement",
                "start": 732,
                "end": 740,
                "loc": {
                  "start": {
                    "line": 39,
                    "column": 8
                  },
                  "end": {
                    "line": 39,
                    "column": 16
                  }
                },
                "expression": {
                  "type": "ArrowFunctionExpression",
                  "start": 732,
                  "end": 740,
                  "loc": {
                    "start": {
                      "line": 39,
                      "column": 8
                    },
                    "end": {
                      "line": 39,
                      "column": 16
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 738,
                    "end": 740,
                    "loc": {
                      "start": {
                        "line": 39,
                        "column": 14
                      },
                      "end": {
                        "line": 39,
                        "column": 16
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


    it('should parse complex #7', () => {
      expect(parseScript(`async ()
      a(b, c)
       b => {}
      c => 123
c => 123
      a(b, c)
a(b, c => 123)`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 90,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 14
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "CallExpression",
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
              "callee": {
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
                "name": "async"
              },
              "arguments": []
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 15,
            "end": 22,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 13
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 15,
              "end": 22,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 13
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 15,
                "end": 16,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 6
                  },
                  "end": {
                    "line": 2,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 17,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 2,
                      "column": 9
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "Identifier",
                  "start": 20,
                  "end": 21,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 11
                    },
                    "end": {
                      "line": 2,
                      "column": 12
                    }
                  },
                  "name": "c"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 30,
            "end": 37,
            "loc": {
              "start": {
                "line": 3,
                "column": 7
              },
              "end": {
                "line": 3,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 30,
              "end": 37,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 7
                },
                "end": {
                  "line": 3,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 30,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 7
                    },
                    "end": {
                      "line": 3,
                      "column": 8
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 35,
                "end": 37,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 12
                  },
                  "end": {
                    "line": 3,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 44,
            "end": 52,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 4,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 44,
              "end": 52,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 4,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 44,
                  "end": 45,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 6
                    },
                    "end": {
                      "line": 4,
                      "column": 7
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "Literal",
                "start": 49,
                "end": 52,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 11
                  },
                  "end": {
                    "line": 4,
                    "column": 14
                  }
                },
                "value": 123,
                "raw": "123"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 53,
            "end": 61,
            "loc": {
              "start": {
                "line": 5,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 8
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 53,
              "end": 61,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 0
                },
                "end": {
                  "line": 5,
                  "column": 8
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 53,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 0
                    },
                    "end": {
                      "line": 5,
                      "column": 1
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "Literal",
                "start": 58,
                "end": 61,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 5
                  },
                  "end": {
                    "line": 5,
                    "column": 8
                  }
                },
                "value": 123,
                "raw": "123"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 68,
            "end": 75,
            "loc": {
              "start": {
                "line": 6,
                "column": 6
              },
              "end": {
                "line": 6,
                "column": 13
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 68,
              "end": 75,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 6
                },
                "end": {
                  "line": 6,
                  "column": 13
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 68,
                "end": 69,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 6
                  },
                  "end": {
                    "line": 6,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 70,
                  "end": 71,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 8
                    },
                    "end": {
                      "line": 6,
                      "column": 9
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "Identifier",
                  "start": 73,
                  "end": 74,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 11
                    },
                    "end": {
                      "line": 6,
                      "column": 12
                    }
                  },
                  "name": "c"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 76,
            "end": 90,
            "loc": {
              "start": {
                "line": 7,
                "column": 0
              },
              "end": {
                "line": 7,
                "column": 14
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 76,
              "end": 90,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 0
                },
                "end": {
                  "line": 7,
                  "column": 14
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 76,
                "end": 77,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 0
                  },
                  "end": {
                    "line": 7,
                    "column": 1
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 78,
                  "end": 79,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 2
                    },
                    "end": {
                      "line": 7,
                      "column": 3
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "ArrowFunctionExpression",
                  "start": 81,
                  "end": 89,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 5
                    },
                    "end": {
                      "line": 7,
                      "column": 13
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 81,
                      "end": 82,
                      "loc": {
                        "start": {
                          "line": 7,
                          "column": 5
                        },
                        "end": {
                          "line": 7,
                          "column": 6
                        }
                      },
                      "name": "c"
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 86,
                    "end": 89,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 10
                      },
                      "end": {
                        "line": 7,
                        "column": 13
                      }
                    },
                    "value": 123,
                    "raw": "123"
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex #8', () => {
      expect(parseScript(`async ((a => a.b()))
      a (a, b, c)
            a(b, c)
      foo = (async) => 123
             b => {}
             (a => a.b(yield))
            c => 123
      foo = (c) => 123
            a(b, (a => a.b((a => a.b()))))
      (a => a.b())
      foo = (foo = (c) => 123) => 123
      a(b, c => 123)
      async (a => b())`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 325,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 22
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 20,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 20
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 0,
              "end": 20,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 20
                }
              },
              "callee": {
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
                "name": "async"
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "start": 8,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
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
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
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
                    "callee": {
                      "type": "MemberExpression",
                      "start": 13,
                      "end": 16,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 16
                        }
                      },
                      "object": {
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
                      "property": {
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
                        "name": "b"
                      },
                      "computed": false
                    },
                    "arguments": []
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 27,
            "end": 38,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 17
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 27,
              "end": 38,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 17
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 27,
                "end": 28,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 6
                  },
                  "end": {
                    "line": 2,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 30,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 9
                    },
                    "end": {
                      "line": 2,
                      "column": 10
                    }
                  },
                  "name": "a"
                },
                {
                  "type": "Identifier",
                  "start": 33,
                  "end": 34,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 12
                    },
                    "end": {
                      "line": 2,
                      "column": 13
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "Identifier",
                  "start": 36,
                  "end": 37,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 15
                    },
                    "end": {
                      "line": 2,
                      "column": 16
                    }
                  },
                  "name": "c"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 51,
            "end": 58,
            "loc": {
              "start": {
                "line": 3,
                "column": 12
              },
              "end": {
                "line": 3,
                "column": 19
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 51,
              "end": 58,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 12
                },
                "end": {
                  "line": 3,
                  "column": 19
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 51,
                "end": 52,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 12
                  },
                  "end": {
                    "line": 3,
                    "column": 13
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 53,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 14
                    },
                    "end": {
                      "line": 3,
                      "column": 15
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "Identifier",
                  "start": 56,
                  "end": 57,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 17
                    },
                    "end": {
                      "line": 3,
                      "column": 18
                    }
                  },
                  "name": "c"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 65,
            "end": 85,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 4,
                "column": 26
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 65,
              "end": 85,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 4,
                  "column": 26
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 65,
                "end": 68,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 6
                  },
                  "end": {
                    "line": 4,
                    "column": 9
                  }
                },
                "name": "foo"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 71,
                "end": 85,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 12
                  },
                  "end": {
                    "line": 4,
                    "column": 26
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 72,
                    "end": 77,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 13
                      },
                      "end": {
                        "line": 4,
                        "column": 18
                      }
                    },
                    "name": "async"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 82,
                  "end": 85,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 23
                    },
                    "end": {
                      "line": 4,
                      "column": 26
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 99,
            "end": 106,
            "loc": {
              "start": {
                "line": 5,
                "column": 13
              },
              "end": {
                "line": 5,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 99,
              "end": 106,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 13
                },
                "end": {
                  "line": 5,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 99,
                  "end": 100,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 13
                    },
                    "end": {
                      "line": 5,
                      "column": 14
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 104,
                "end": 106,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 18
                  },
                  "end": {
                    "line": 5,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 120,
            "end": 137,
            "loc": {
              "start": {
                "line": 6,
                "column": 13
              },
              "end": {
                "line": 6,
                "column": 30
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 121,
              "end": 136,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 14
                },
                "end": {
                  "line": 6,
                  "column": 29
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 121,
                  "end": 122,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 14
                    },
                    "end": {
                      "line": 6,
                      "column": 15
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "CallExpression",
                "start": 126,
                "end": 136,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 19
                  },
                  "end": {
                    "line": 6,
                    "column": 29
                  }
                },
                "callee": {
                  "type": "MemberExpression",
                  "start": 126,
                  "end": 129,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 19
                    },
                    "end": {
                      "line": 6,
                      "column": 22
                    }
                  },
                  "object": {
                    "type": "Identifier",
                    "start": 126,
                    "end": 127,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 19
                      },
                      "end": {
                        "line": 6,
                        "column": 20
                      }
                    },
                    "name": "a"
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 128,
                    "end": 129,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 21
                      },
                      "end": {
                        "line": 6,
                        "column": 22
                      }
                    },
                    "name": "b"
                  },
                  "computed": false
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 130,
                    "end": 135,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 23
                      },
                      "end": {
                        "line": 6,
                        "column": 28
                      }
                    },
                    "name": "yield"
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 150,
            "end": 158,
            "loc": {
              "start": {
                "line": 7,
                "column": 12
              },
              "end": {
                "line": 7,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 150,
              "end": 158,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 12
                },
                "end": {
                  "line": 7,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 150,
                  "end": 151,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 12
                    },
                    "end": {
                      "line": 7,
                      "column": 13
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "Literal",
                "start": 155,
                "end": 158,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 17
                  },
                  "end": {
                    "line": 7,
                    "column": 20
                  }
                },
                "value": 123,
                "raw": "123"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 165,
            "end": 181,
            "loc": {
              "start": {
                "line": 8,
                "column": 6
              },
              "end": {
                "line": 8,
                "column": 22
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 165,
              "end": 181,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 6
                },
                "end": {
                  "line": 8,
                  "column": 22
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 165,
                "end": 168,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 6
                  },
                  "end": {
                    "line": 8,
                    "column": 9
                  }
                },
                "name": "foo"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 171,
                "end": 181,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 12
                  },
                  "end": {
                    "line": 8,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 172,
                    "end": 173,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 13
                      },
                      "end": {
                        "line": 8,
                        "column": 14
                      }
                    },
                    "name": "c"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 178,
                  "end": 181,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 19
                    },
                    "end": {
                      "line": 8,
                      "column": 22
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 194,
            "end": 243,
            "loc": {
              "start": {
                "line": 9,
                "column": 12
              },
              "end": {
                "line": 10,
                "column": 18
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 194,
              "end": 243,
              "loc": {
                "start": {
                  "line": 9,
                  "column": 12
                },
                "end": {
                  "line": 10,
                  "column": 18
                }
              },
              "callee": {
                "type": "CallExpression",
                "start": 194,
                "end": 224,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 12
                  },
                  "end": {
                    "line": 9,
                    "column": 42
                  }
                },
                "callee": {
                  "type": "Identifier",
                  "start": 194,
                  "end": 195,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 12
                    },
                    "end": {
                      "line": 9,
                      "column": 13
                    }
                  },
                  "name": "a"
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 196,
                    "end": 197,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 14
                      },
                      "end": {
                        "line": 9,
                        "column": 15
                      }
                    },
                    "name": "b"
                  },
                  {
                    "type": "ArrowFunctionExpression",
                    "start": 200,
                    "end": 222,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 18
                      },
                      "end": {
                        "line": 9,
                        "column": 40
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 200,
                        "end": 201,
                        "loc": {
                          "start": {
                            "line": 9,
                            "column": 18
                          },
                          "end": {
                            "line": 9,
                            "column": 19
                          }
                        },
                        "name": "a"
                      }
                    ],
                    "body": {
                      "type": "CallExpression",
                      "start": 205,
                      "end": 222,
                      "loc": {
                        "start": {
                          "line": 9,
                          "column": 23
                        },
                        "end": {
                          "line": 9,
                          "column": 40
                        }
                      },
                      "callee": {
                        "type": "MemberExpression",
                        "start": 205,
                        "end": 208,
                        "loc": {
                          "start": {
                            "line": 9,
                            "column": 23
                          },
                          "end": {
                            "line": 9,
                            "column": 26
                          }
                        },
                        "object": {
                          "type": "Identifier",
                          "start": 205,
                          "end": 206,
                          "loc": {
                            "start": {
                              "line": 9,
                              "column": 23
                            },
                            "end": {
                              "line": 9,
                              "column": 24
                            }
                          },
                          "name": "a"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 207,
                          "end": 208,
                          "loc": {
                            "start": {
                              "line": 9,
                              "column": 25
                            },
                            "end": {
                              "line": 9,
                              "column": 26
                            }
                          },
                          "name": "b"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 210,
                          "end": 220,
                          "loc": {
                            "start": {
                              "line": 9,
                              "column": 28
                            },
                            "end": {
                              "line": 9,
                              "column": 38
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 210,
                              "end": 211,
                              "loc": {
                                "start": {
                                  "line": 9,
                                  "column": 28
                                },
                                "end": {
                                  "line": 9,
                                  "column": 29
                                }
                              },
                              "name": "a"
                            }
                          ],
                          "body": {
                            "type": "CallExpression",
                            "start": 215,
                            "end": 220,
                            "loc": {
                              "start": {
                                "line": 9,
                                "column": 33
                              },
                              "end": {
                                "line": 9,
                                "column": 38
                              }
                            },
                            "callee": {
                              "type": "MemberExpression",
                              "start": 215,
                              "end": 218,
                              "loc": {
                                "start": {
                                  "line": 9,
                                  "column": 33
                                },
                                "end": {
                                  "line": 9,
                                  "column": 36
                                }
                              },
                              "object": {
                                "type": "Identifier",
                                "start": 215,
                                "end": 216,
                                "loc": {
                                  "start": {
                                    "line": 9,
                                    "column": 33
                                  },
                                  "end": {
                                    "line": 9,
                                    "column": 34
                                  }
                                },
                                "name": "a"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 217,
                                "end": 218,
                                "loc": {
                                  "start": {
                                    "line": 9,
                                    "column": 35
                                  },
                                  "end": {
                                    "line": 9,
                                    "column": 36
                                  }
                                },
                                "name": "b"
                              },
                              "computed": false
                            },
                            "arguments": []
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "start": 232,
                  "end": 242,
                  "loc": {
                    "start": {
                      "line": 10,
                      "column": 7
                    },
                    "end": {
                      "line": 10,
                      "column": 17
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 232,
                      "end": 233,
                      "loc": {
                        "start": {
                          "line": 10,
                          "column": 7
                        },
                        "end": {
                          "line": 10,
                          "column": 8
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 237,
                    "end": 242,
                    "loc": {
                      "start": {
                        "line": 10,
                        "column": 12
                      },
                      "end": {
                        "line": 10,
                        "column": 17
                      }
                    },
                    "callee": {
                      "type": "MemberExpression",
                      "start": 237,
                      "end": 240,
                      "loc": {
                        "start": {
                          "line": 10,
                          "column": 12
                        },
                        "end": {
                          "line": 10,
                          "column": 15
                        }
                      },
                      "object": {
                        "type": "Identifier",
                        "start": 237,
                        "end": 238,
                        "loc": {
                          "start": {
                            "line": 10,
                            "column": 12
                          },
                          "end": {
                            "line": 10,
                            "column": 13
                          }
                        },
                        "name": "a"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 239,
                        "end": 240,
                        "loc": {
                          "start": {
                            "line": 10,
                            "column": 14
                          },
                          "end": {
                            "line": 10,
                            "column": 15
                          }
                        },
                        "name": "b"
                      },
                      "computed": false
                    },
                    "arguments": []
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 250,
            "end": 281,
            "loc": {
              "start": {
                "line": 11,
                "column": 6
              },
              "end": {
                "line": 11,
                "column": 37
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 250,
              "end": 281,
              "loc": {
                "start": {
                  "line": 11,
                  "column": 6
                },
                "end": {
                  "line": 11,
                  "column": 37
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 250,
                "end": 253,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 6
                  },
                  "end": {
                    "line": 11,
                    "column": 9
                  }
                },
                "name": "foo"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 256,
                "end": 281,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 12
                  },
                  "end": {
                    "line": 11,
                    "column": 37
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 257,
                    "end": 273,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 13
                      },
                      "end": {
                        "line": 11,
                        "column": 29
                      }
                    },
                    "left": {
                      "type": "Identifier",
                      "start": 257,
                      "end": 260,
                      "loc": {
                        "start": {
                          "line": 11,
                          "column": 13
                        },
                        "end": {
                          "line": 11,
                          "column": 16
                        }
                      },
                      "name": "foo"
                    },
                    "right": {
                      "type": "ArrowFunctionExpression",
                      "start": 263,
                      "end": 273,
                      "loc": {
                        "start": {
                          "line": 11,
                          "column": 19
                        },
                        "end": {
                          "line": 11,
                          "column": 29
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 264,
                          "end": 265,
                          "loc": {
                            "start": {
                              "line": 11,
                              "column": 20
                            },
                            "end": {
                              "line": 11,
                              "column": 21
                            }
                          },
                          "name": "c"
                        }
                      ],
                      "body": {
                        "type": "Literal",
                        "start": 270,
                        "end": 273,
                        "loc": {
                          "start": {
                            "line": 11,
                            "column": 26
                          },
                          "end": {
                            "line": 11,
                            "column": 29
                          }
                        },
                        "value": 123,
                        "raw": "123"
                      }
                    }
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 278,
                  "end": 281,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 34
                    },
                    "end": {
                      "line": 11,
                      "column": 37
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 288,
            "end": 302,
            "loc": {
              "start": {
                "line": 12,
                "column": 6
              },
              "end": {
                "line": 12,
                "column": 20
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 288,
              "end": 302,
              "loc": {
                "start": {
                  "line": 12,
                  "column": 6
                },
                "end": {
                  "line": 12,
                  "column": 20
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 288,
                "end": 289,
                "loc": {
                  "start": {
                    "line": 12,
                    "column": 6
                  },
                  "end": {
                    "line": 12,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 290,
                  "end": 291,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 8
                    },
                    "end": {
                      "line": 12,
                      "column": 9
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "ArrowFunctionExpression",
                  "start": 293,
                  "end": 301,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 11
                    },
                    "end": {
                      "line": 12,
                      "column": 19
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 293,
                      "end": 294,
                      "loc": {
                        "start": {
                          "line": 12,
                          "column": 11
                        },
                        "end": {
                          "line": 12,
                          "column": 12
                        }
                      },
                      "name": "c"
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 298,
                    "end": 301,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 16
                      },
                      "end": {
                        "line": 12,
                        "column": 19
                      }
                    },
                    "value": 123,
                    "raw": "123"
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 309,
            "end": 325,
            "loc": {
              "start": {
                "line": 13,
                "column": 6
              },
              "end": {
                "line": 13,
                "column": 22
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 309,
              "end": 325,
              "loc": {
                "start": {
                  "line": 13,
                  "column": 6
                },
                "end": {
                  "line": 13,
                  "column": 22
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 309,
                "end": 314,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 6
                  },
                  "end": {
                    "line": 13,
                    "column": 11
                  }
                },
                "name": "async"
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "start": 316,
                  "end": 324,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 13
                    },
                    "end": {
                      "line": 13,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 316,
                      "end": 317,
                      "loc": {
                        "start": {
                          "line": 13,
                          "column": 13
                        },
                        "end": {
                          "line": 13,
                          "column": 14
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 321,
                    "end": 324,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 18
                      },
                      "end": {
                        "line": 13,
                        "column": 21
                      }
                    },
                    "callee": {
                      "type": "Identifier",
                      "start": 321,
                      "end": 322,
                      "loc": {
                        "start": {
                          "line": 13,
                          "column": 18
                        },
                        "end": {
                          "line": 13,
                          "column": 19
                        }
                      },
                      "name": "b"
                    },
                    "arguments": []
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex #9', () => {
      expect(parseScript(`async ((a => a.b()))
      a (a, b, c)
            a(b, c)
      foo = (async) => 123
async (c) => c => 123
b => { a => a.b() }
             (a => a.b(yield))
            c => 123
      foo = (c) => 123
async (c) => c => 123
a(b, c)
async (c) => c => 123
            a(b, (a => a.b((a => a.b()))))
      (a => a.b(a => a.b(a => a.b(a => a.b()))))
      foo = (foo = (c) => 123) => 123
      a(b, c => 123)
      async c => c => 123
async c => c => 123
async c => c => 123
      a(b, c => 123)
      async (a => b())
a (a => b())
cherow(1,2,3)`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 542,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 13
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 0,
            "end": 20,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 20
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 0,
              "end": 20,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 20
                }
              },
              "callee": {
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
                "name": "async"
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "start": 8,
                  "end": 18,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 8
                    },
                    "end": {
                      "line": 1,
                      "column": 18
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
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
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
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
                    "callee": {
                      "type": "MemberExpression",
                      "start": 13,
                      "end": 16,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 16
                        }
                      },
                      "object": {
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
                      "property": {
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
                        "name": "b"
                      },
                      "computed": false
                    },
                    "arguments": []
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 27,
            "end": 38,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 17
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 27,
              "end": 38,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 17
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 27,
                "end": 28,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 6
                  },
                  "end": {
                    "line": 2,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 30,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 9
                    },
                    "end": {
                      "line": 2,
                      "column": 10
                    }
                  },
                  "name": "a"
                },
                {
                  "type": "Identifier",
                  "start": 33,
                  "end": 34,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 12
                    },
                    "end": {
                      "line": 2,
                      "column": 13
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "Identifier",
                  "start": 36,
                  "end": 37,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 15
                    },
                    "end": {
                      "line": 2,
                      "column": 16
                    }
                  },
                  "name": "c"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 51,
            "end": 58,
            "loc": {
              "start": {
                "line": 3,
                "column": 12
              },
              "end": {
                "line": 3,
                "column": 19
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 51,
              "end": 58,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 12
                },
                "end": {
                  "line": 3,
                  "column": 19
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 51,
                "end": 52,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 12
                  },
                  "end": {
                    "line": 3,
                    "column": 13
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 53,
                  "end": 54,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 14
                    },
                    "end": {
                      "line": 3,
                      "column": 15
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "Identifier",
                  "start": 56,
                  "end": 57,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 17
                    },
                    "end": {
                      "line": 3,
                      "column": 18
                    }
                  },
                  "name": "c"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 65,
            "end": 85,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 4,
                "column": 26
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 65,
              "end": 85,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 4,
                  "column": 26
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 65,
                "end": 68,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 6
                  },
                  "end": {
                    "line": 4,
                    "column": 9
                  }
                },
                "name": "foo"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 71,
                "end": 85,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 12
                  },
                  "end": {
                    "line": 4,
                    "column": 26
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 72,
                    "end": 77,
                    "loc": {
                      "start": {
                        "line": 4,
                        "column": 13
                      },
                      "end": {
                        "line": 4,
                        "column": 18
                      }
                    },
                    "name": "async"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 82,
                  "end": 85,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 23
                    },
                    "end": {
                      "line": 4,
                      "column": 26
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 86,
            "end": 107,
            "loc": {
              "start": {
                "line": 5,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 21
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 86,
              "end": 107,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 0
                },
                "end": {
                  "line": 5,
                  "column": 21
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 93,
                  "end": 94,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 7
                    },
                    "end": {
                      "line": 5,
                      "column": 8
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "ArrowFunctionExpression",
                "start": 99,
                "end": 107,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 13
                  },
                  "end": {
                    "line": 5,
                    "column": 21
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 99,
                    "end": 100,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 13
                      },
                      "end": {
                        "line": 5,
                        "column": 14
                      }
                    },
                    "name": "c"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 104,
                  "end": 107,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 18
                    },
                    "end": {
                      "line": 5,
                      "column": 21
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 108,
            "end": 127,
            "loc": {
              "start": {
                "line": 6,
                "column": 0
              },
              "end": {
                "line": 6,
                "column": 19
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 108,
              "end": 127,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 0
                },
                "end": {
                  "line": 6,
                  "column": 19
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 108,
                  "end": 109,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 0
                    },
                    "end": {
                      "line": 6,
                      "column": 1
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 113,
                "end": 127,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 5
                  },
                  "end": {
                    "line": 6,
                    "column": 19
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 115,
                    "end": 125,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 7
                      },
                      "end": {
                        "line": 6,
                        "column": 17
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 115,
                      "end": 125,
                      "loc": {
                        "start": {
                          "line": 6,
                          "column": 7
                        },
                        "end": {
                          "line": 6,
                          "column": 17
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 115,
                          "end": 116,
                          "loc": {
                            "start": {
                              "line": 6,
                              "column": 7
                            },
                            "end": {
                              "line": 6,
                              "column": 8
                            }
                          },
                          "name": "a"
                        }
                      ],
                      "body": {
                        "type": "CallExpression",
                        "start": 120,
                        "end": 125,
                        "loc": {
                          "start": {
                            "line": 6,
                            "column": 12
                          },
                          "end": {
                            "line": 6,
                            "column": 17
                          }
                        },
                        "callee": {
                          "type": "MemberExpression",
                          "start": 120,
                          "end": 123,
                          "loc": {
                            "start": {
                              "line": 6,
                              "column": 12
                            },
                            "end": {
                              "line": 6,
                              "column": 15
                            }
                          },
                          "object": {
                            "type": "Identifier",
                            "start": 120,
                            "end": 121,
                            "loc": {
                              "start": {
                                "line": 6,
                                "column": 12
                              },
                              "end": {
                                "line": 6,
                                "column": 13
                              }
                            },
                            "name": "a"
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 122,
                            "end": 123,
                            "loc": {
                              "start": {
                                "line": 6,
                                "column": 14
                              },
                              "end": {
                                "line": 6,
                                "column": 15
                              }
                            },
                            "name": "b"
                          },
                          "computed": false
                        },
                        "arguments": []
                      }
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 141,
            "end": 158,
            "loc": {
              "start": {
                "line": 7,
                "column": 13
              },
              "end": {
                "line": 7,
                "column": 30
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 142,
              "end": 157,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 14
                },
                "end": {
                  "line": 7,
                  "column": 29
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 142,
                  "end": 143,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 14
                    },
                    "end": {
                      "line": 7,
                      "column": 15
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "CallExpression",
                "start": 147,
                "end": 157,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 19
                  },
                  "end": {
                    "line": 7,
                    "column": 29
                  }
                },
                "callee": {
                  "type": "MemberExpression",
                  "start": 147,
                  "end": 150,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 19
                    },
                    "end": {
                      "line": 7,
                      "column": 22
                    }
                  },
                  "object": {
                    "type": "Identifier",
                    "start": 147,
                    "end": 148,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 19
                      },
                      "end": {
                        "line": 7,
                        "column": 20
                      }
                    },
                    "name": "a"
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 149,
                    "end": 150,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 21
                      },
                      "end": {
                        "line": 7,
                        "column": 22
                      }
                    },
                    "name": "b"
                  },
                  "computed": false
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 151,
                    "end": 156,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 23
                      },
                      "end": {
                        "line": 7,
                        "column": 28
                      }
                    },
                    "name": "yield"
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 171,
            "end": 179,
            "loc": {
              "start": {
                "line": 8,
                "column": 12
              },
              "end": {
                "line": 8,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 171,
              "end": 179,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 12
                },
                "end": {
                  "line": 8,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 171,
                  "end": 172,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 12
                    },
                    "end": {
                      "line": 8,
                      "column": 13
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "Literal",
                "start": 176,
                "end": 179,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 17
                  },
                  "end": {
                    "line": 8,
                    "column": 20
                  }
                },
                "value": 123,
                "raw": "123"
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 186,
            "end": 202,
            "loc": {
              "start": {
                "line": 9,
                "column": 6
              },
              "end": {
                "line": 9,
                "column": 22
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 186,
              "end": 202,
              "loc": {
                "start": {
                  "line": 9,
                  "column": 6
                },
                "end": {
                  "line": 9,
                  "column": 22
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 186,
                "end": 189,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 6
                  },
                  "end": {
                    "line": 9,
                    "column": 9
                  }
                },
                "name": "foo"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 192,
                "end": 202,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 12
                  },
                  "end": {
                    "line": 9,
                    "column": 22
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 193,
                    "end": 194,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 13
                      },
                      "end": {
                        "line": 9,
                        "column": 14
                      }
                    },
                    "name": "c"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 199,
                  "end": 202,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 19
                    },
                    "end": {
                      "line": 9,
                      "column": 22
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 203,
            "end": 224,
            "loc": {
              "start": {
                "line": 10,
                "column": 0
              },
              "end": {
                "line": 10,
                "column": 21
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 203,
              "end": 224,
              "loc": {
                "start": {
                  "line": 10,
                  "column": 0
                },
                "end": {
                  "line": 10,
                  "column": 21
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 210,
                  "end": 211,
                  "loc": {
                    "start": {
                      "line": 10,
                      "column": 7
                    },
                    "end": {
                      "line": 10,
                      "column": 8
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "ArrowFunctionExpression",
                "start": 216,
                "end": 224,
                "loc": {
                  "start": {
                    "line": 10,
                    "column": 13
                  },
                  "end": {
                    "line": 10,
                    "column": 21
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 216,
                    "end": 217,
                    "loc": {
                      "start": {
                        "line": 10,
                        "column": 13
                      },
                      "end": {
                        "line": 10,
                        "column": 14
                      }
                    },
                    "name": "c"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 221,
                  "end": 224,
                  "loc": {
                    "start": {
                      "line": 10,
                      "column": 18
                    },
                    "end": {
                      "line": 10,
                      "column": 21
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 225,
            "end": 232,
            "loc": {
              "start": {
                "line": 11,
                "column": 0
              },
              "end": {
                "line": 11,
                "column": 7
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 225,
              "end": 232,
              "loc": {
                "start": {
                  "line": 11,
                  "column": 0
                },
                "end": {
                  "line": 11,
                  "column": 7
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 225,
                "end": 226,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 0
                  },
                  "end": {
                    "line": 11,
                    "column": 1
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 227,
                  "end": 228,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 2
                    },
                    "end": {
                      "line": 11,
                      "column": 3
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "Identifier",
                  "start": 230,
                  "end": 231,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 5
                    },
                    "end": {
                      "line": 11,
                      "column": 6
                    }
                  },
                  "name": "c"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 233,
            "end": 254,
            "loc": {
              "start": {
                "line": 12,
                "column": 0
              },
              "end": {
                "line": 12,
                "column": 21
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 233,
              "end": 254,
              "loc": {
                "start": {
                  "line": 12,
                  "column": 0
                },
                "end": {
                  "line": 12,
                  "column": 21
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 240,
                  "end": 241,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 7
                    },
                    "end": {
                      "line": 12,
                      "column": 8
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "ArrowFunctionExpression",
                "start": 246,
                "end": 254,
                "loc": {
                  "start": {
                    "line": 12,
                    "column": 13
                  },
                  "end": {
                    "line": 12,
                    "column": 21
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 246,
                    "end": 247,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 13
                      },
                      "end": {
                        "line": 12,
                        "column": 14
                      }
                    },
                    "name": "c"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 251,
                  "end": 254,
                  "loc": {
                    "start": {
                      "line": 12,
                      "column": 18
                    },
                    "end": {
                      "line": 12,
                      "column": 21
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 267,
            "end": 346,
            "loc": {
              "start": {
                "line": 13,
                "column": 12
              },
              "end": {
                "line": 14,
                "column": 48
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 267,
              "end": 346,
              "loc": {
                "start": {
                  "line": 13,
                  "column": 12
                },
                "end": {
                  "line": 14,
                  "column": 48
                }
              },
              "callee": {
                "type": "CallExpression",
                "start": 267,
                "end": 297,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 12
                  },
                  "end": {
                    "line": 13,
                    "column": 42
                  }
                },
                "callee": {
                  "type": "Identifier",
                  "start": 267,
                  "end": 268,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 12
                    },
                    "end": {
                      "line": 13,
                      "column": 13
                    }
                  },
                  "name": "a"
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 269,
                    "end": 270,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 14
                      },
                      "end": {
                        "line": 13,
                        "column": 15
                      }
                    },
                    "name": "b"
                  },
                  {
                    "type": "ArrowFunctionExpression",
                    "start": 273,
                    "end": 295,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 18
                      },
                      "end": {
                        "line": 13,
                        "column": 40
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": true,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 273,
                        "end": 274,
                        "loc": {
                          "start": {
                            "line": 13,
                            "column": 18
                          },
                          "end": {
                            "line": 13,
                            "column": 19
                          }
                        },
                        "name": "a"
                      }
                    ],
                    "body": {
                      "type": "CallExpression",
                      "start": 278,
                      "end": 295,
                      "loc": {
                        "start": {
                          "line": 13,
                          "column": 23
                        },
                        "end": {
                          "line": 13,
                          "column": 40
                        }
                      },
                      "callee": {
                        "type": "MemberExpression",
                        "start": 278,
                        "end": 281,
                        "loc": {
                          "start": {
                            "line": 13,
                            "column": 23
                          },
                          "end": {
                            "line": 13,
                            "column": 26
                          }
                        },
                        "object": {
                          "type": "Identifier",
                          "start": 278,
                          "end": 279,
                          "loc": {
                            "start": {
                              "line": 13,
                              "column": 23
                            },
                            "end": {
                              "line": 13,
                              "column": 24
                            }
                          },
                          "name": "a"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 280,
                          "end": 281,
                          "loc": {
                            "start": {
                              "line": 13,
                              "column": 25
                            },
                            "end": {
                              "line": 13,
                              "column": 26
                            }
                          },
                          "name": "b"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 283,
                          "end": 293,
                          "loc": {
                            "start": {
                              "line": 13,
                              "column": 28
                            },
                            "end": {
                              "line": 13,
                              "column": 38
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 283,
                              "end": 284,
                              "loc": {
                                "start": {
                                  "line": 13,
                                  "column": 28
                                },
                                "end": {
                                  "line": 13,
                                  "column": 29
                                }
                              },
                              "name": "a"
                            }
                          ],
                          "body": {
                            "type": "CallExpression",
                            "start": 288,
                            "end": 293,
                            "loc": {
                              "start": {
                                "line": 13,
                                "column": 33
                              },
                              "end": {
                                "line": 13,
                                "column": 38
                              }
                            },
                            "callee": {
                              "type": "MemberExpression",
                              "start": 288,
                              "end": 291,
                              "loc": {
                                "start": {
                                  "line": 13,
                                  "column": 33
                                },
                                "end": {
                                  "line": 13,
                                  "column": 36
                                }
                              },
                              "object": {
                                "type": "Identifier",
                                "start": 288,
                                "end": 289,
                                "loc": {
                                  "start": {
                                    "line": 13,
                                    "column": 33
                                  },
                                  "end": {
                                    "line": 13,
                                    "column": 34
                                  }
                                },
                                "name": "a"
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 290,
                                "end": 291,
                                "loc": {
                                  "start": {
                                    "line": 13,
                                    "column": 35
                                  },
                                  "end": {
                                    "line": 13,
                                    "column": 36
                                  }
                                },
                                "name": "b"
                              },
                              "computed": false
                            },
                            "arguments": []
                          }
                        }
                      ]
                    }
                  }
                ]
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "start": 305,
                  "end": 345,
                  "loc": {
                    "start": {
                      "line": 14,
                      "column": 7
                    },
                    "end": {
                      "line": 14,
                      "column": 47
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 305,
                      "end": 306,
                      "loc": {
                        "start": {
                          "line": 14,
                          "column": 7
                        },
                        "end": {
                          "line": 14,
                          "column": 8
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 310,
                    "end": 345,
                    "loc": {
                      "start": {
                        "line": 14,
                        "column": 12
                      },
                      "end": {
                        "line": 14,
                        "column": 47
                      }
                    },
                    "callee": {
                      "type": "MemberExpression",
                      "start": 310,
                      "end": 313,
                      "loc": {
                        "start": {
                          "line": 14,
                          "column": 12
                        },
                        "end": {
                          "line": 14,
                          "column": 15
                        }
                      },
                      "object": {
                        "type": "Identifier",
                        "start": 310,
                        "end": 311,
                        "loc": {
                          "start": {
                            "line": 14,
                            "column": 12
                          },
                          "end": {
                            "line": 14,
                            "column": 13
                          }
                        },
                        "name": "a"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 312,
                        "end": 313,
                        "loc": {
                          "start": {
                            "line": 14,
                            "column": 14
                          },
                          "end": {
                            "line": 14,
                            "column": 15
                          }
                        },
                        "name": "b"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "ArrowFunctionExpression",
                        "start": 314,
                        "end": 344,
                        "loc": {
                          "start": {
                            "line": 14,
                            "column": 16
                          },
                          "end": {
                            "line": 14,
                            "column": 46
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": true,
                        "async": false,
                        "params": [
                          {
                            "type": "Identifier",
                            "start": 314,
                            "end": 315,
                            "loc": {
                              "start": {
                                "line": 14,
                                "column": 16
                              },
                              "end": {
                                "line": 14,
                                "column": 17
                              }
                            },
                            "name": "a"
                          }
                        ],
                        "body": {
                          "type": "CallExpression",
                          "start": 319,
                          "end": 344,
                          "loc": {
                            "start": {
                              "line": 14,
                              "column": 21
                            },
                            "end": {
                              "line": 14,
                              "column": 46
                            }
                          },
                          "callee": {
                            "type": "MemberExpression",
                            "start": 319,
                            "end": 322,
                            "loc": {
                              "start": {
                                "line": 14,
                                "column": 21
                              },
                              "end": {
                                "line": 14,
                                "column": 24
                              }
                            },
                            "object": {
                              "type": "Identifier",
                              "start": 319,
                              "end": 320,
                              "loc": {
                                "start": {
                                  "line": 14,
                                  "column": 21
                                },
                                "end": {
                                  "line": 14,
                                  "column": 22
                                }
                              },
                              "name": "a"
                            },
                            "property": {
                              "type": "Identifier",
                              "start": 321,
                              "end": 322,
                              "loc": {
                                "start": {
                                  "line": 14,
                                  "column": 23
                                },
                                "end": {
                                  "line": 14,
                                  "column": 24
                                }
                              },
                              "name": "b"
                            },
                            "computed": false
                          },
                          "arguments": [
                            {
                              "type": "ArrowFunctionExpression",
                              "start": 323,
                              "end": 343,
                              "loc": {
                                "start": {
                                  "line": 14,
                                  "column": 25
                                },
                                "end": {
                                  "line": 14,
                                  "column": 45
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": true,
                              "async": false,
                              "params": [
                                {
                                  "type": "Identifier",
                                  "start": 323,
                                  "end": 324,
                                  "loc": {
                                    "start": {
                                      "line": 14,
                                      "column": 25
                                    },
                                    "end": {
                                      "line": 14,
                                      "column": 26
                                    }
                                  },
                                  "name": "a"
                                }
                              ],
                              "body": {
                                "type": "CallExpression",
                                "start": 328,
                                "end": 343,
                                "loc": {
                                  "start": {
                                    "line": 14,
                                    "column": 30
                                  },
                                  "end": {
                                    "line": 14,
                                    "column": 45
                                  }
                                },
                                "callee": {
                                  "type": "MemberExpression",
                                  "start": 328,
                                  "end": 331,
                                  "loc": {
                                    "start": {
                                      "line": 14,
                                      "column": 30
                                    },
                                    "end": {
                                      "line": 14,
                                      "column": 33
                                    }
                                  },
                                  "object": {
                                    "type": "Identifier",
                                    "start": 328,
                                    "end": 329,
                                    "loc": {
                                      "start": {
                                        "line": 14,
                                        "column": 30
                                      },
                                      "end": {
                                        "line": 14,
                                        "column": 31
                                      }
                                    },
                                    "name": "a"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 330,
                                    "end": 331,
                                    "loc": {
                                      "start": {
                                        "line": 14,
                                        "column": 32
                                      },
                                      "end": {
                                        "line": 14,
                                        "column": 33
                                      }
                                    },
                                    "name": "b"
                                  },
                                  "computed": false
                                },
                                "arguments": [
                                  {
                                    "type": "ArrowFunctionExpression",
                                    "start": 332,
                                    "end": 342,
                                    "loc": {
                                      "start": {
                                        "line": 14,
                                        "column": 34
                                      },
                                      "end": {
                                        "line": 14,
                                        "column": 44
                                      }
                                    },
                                    "id": null,
                                    "generator": false,
                                    "expression": true,
                                    "async": false,
                                    "params": [
                                      {
                                        "type": "Identifier",
                                        "start": 332,
                                        "end": 333,
                                        "loc": {
                                          "start": {
                                            "line": 14,
                                            "column": 34
                                          },
                                          "end": {
                                            "line": 14,
                                            "column": 35
                                          }
                                        },
                                        "name": "a"
                                      }
                                    ],
                                    "body": {
                                      "type": "CallExpression",
                                      "start": 337,
                                      "end": 342,
                                      "loc": {
                                        "start": {
                                          "line": 14,
                                          "column": 39
                                        },
                                        "end": {
                                          "line": 14,
                                          "column": 44
                                        }
                                      },
                                      "callee": {
                                        "type": "MemberExpression",
                                        "start": 337,
                                        "end": 340,
                                        "loc": {
                                          "start": {
                                            "line": 14,
                                            "column": 39
                                          },
                                          "end": {
                                            "line": 14,
                                            "column": 42
                                          }
                                        },
                                        "object": {
                                          "type": "Identifier",
                                          "start": 337,
                                          "end": 338,
                                          "loc": {
                                            "start": {
                                              "line": 14,
                                              "column": 39
                                            },
                                            "end": {
                                              "line": 14,
                                              "column": 40
                                            }
                                          },
                                          "name": "a"
                                        },
                                        "property": {
                                          "type": "Identifier",
                                          "start": 339,
                                          "end": 340,
                                          "loc": {
                                            "start": {
                                              "line": 14,
                                              "column": 41
                                            },
                                            "end": {
                                              "line": 14,
                                              "column": 42
                                            }
                                          },
                                          "name": "b"
                                        },
                                        "computed": false
                                      },
                                      "arguments": []
                                    }
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 353,
            "end": 384,
            "loc": {
              "start": {
                "line": 15,
                "column": 6
              },
              "end": {
                "line": 15,
                "column": 37
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 353,
              "end": 384,
              "loc": {
                "start": {
                  "line": 15,
                  "column": 6
                },
                "end": {
                  "line": 15,
                  "column": 37
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 353,
                "end": 356,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 6
                  },
                  "end": {
                    "line": 15,
                    "column": 9
                  }
                },
                "name": "foo"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 359,
                "end": 384,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 12
                  },
                  "end": {
                    "line": 15,
                    "column": 37
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "AssignmentPattern",
                    "start": 360,
                    "end": 376,
                    "loc": {
                      "start": {
                        "line": 15,
                        "column": 13
                      },
                      "end": {
                        "line": 15,
                        "column": 29
                      }
                    },
                    "left": {
                      "type": "Identifier",
                      "start": 360,
                      "end": 363,
                      "loc": {
                        "start": {
                          "line": 15,
                          "column": 13
                        },
                        "end": {
                          "line": 15,
                          "column": 16
                        }
                      },
                      "name": "foo"
                    },
                    "right": {
                      "type": "ArrowFunctionExpression",
                      "start": 366,
                      "end": 376,
                      "loc": {
                        "start": {
                          "line": 15,
                          "column": 19
                        },
                        "end": {
                          "line": 15,
                          "column": 29
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 367,
                          "end": 368,
                          "loc": {
                            "start": {
                              "line": 15,
                              "column": 20
                            },
                            "end": {
                              "line": 15,
                              "column": 21
                            }
                          },
                          "name": "c"
                        }
                      ],
                      "body": {
                        "type": "Literal",
                        "start": 373,
                        "end": 376,
                        "loc": {
                          "start": {
                            "line": 15,
                            "column": 26
                          },
                          "end": {
                            "line": 15,
                            "column": 29
                          }
                        },
                        "value": 123,
                        "raw": "123"
                      }
                    }
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 381,
                  "end": 384,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 34
                    },
                    "end": {
                      "line": 15,
                      "column": 37
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 391,
            "end": 405,
            "loc": {
              "start": {
                "line": 16,
                "column": 6
              },
              "end": {
                "line": 16,
                "column": 20
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 391,
              "end": 405,
              "loc": {
                "start": {
                  "line": 16,
                  "column": 6
                },
                "end": {
                  "line": 16,
                  "column": 20
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 391,
                "end": 392,
                "loc": {
                  "start": {
                    "line": 16,
                    "column": 6
                  },
                  "end": {
                    "line": 16,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 393,
                  "end": 394,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 8
                    },
                    "end": {
                      "line": 16,
                      "column": 9
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "ArrowFunctionExpression",
                  "start": 396,
                  "end": 404,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 11
                    },
                    "end": {
                      "line": 16,
                      "column": 19
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 396,
                      "end": 397,
                      "loc": {
                        "start": {
                          "line": 16,
                          "column": 11
                        },
                        "end": {
                          "line": 16,
                          "column": 12
                        }
                      },
                      "name": "c"
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 401,
                    "end": 404,
                    "loc": {
                      "start": {
                        "line": 16,
                        "column": 16
                      },
                      "end": {
                        "line": 16,
                        "column": 19
                      }
                    },
                    "value": 123,
                    "raw": "123"
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 412,
            "end": 431,
            "loc": {
              "start": {
                "line": 17,
                "column": 6
              },
              "end": {
                "line": 17,
                "column": 25
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 412,
              "end": 431,
              "loc": {
                "start": {
                  "line": 17,
                  "column": 6
                },
                "end": {
                  "line": 17,
                  "column": 25
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 418,
                  "end": 419,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 12
                    },
                    "end": {
                      "line": 17,
                      "column": 13
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "ArrowFunctionExpression",
                "start": 423,
                "end": 431,
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 17
                  },
                  "end": {
                    "line": 17,
                    "column": 25
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 423,
                    "end": 424,
                    "loc": {
                      "start": {
                        "line": 17,
                        "column": 17
                      },
                      "end": {
                        "line": 17,
                        "column": 18
                      }
                    },
                    "name": "c"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 428,
                  "end": 431,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 22
                    },
                    "end": {
                      "line": 17,
                      "column": 25
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 432,
            "end": 451,
            "loc": {
              "start": {
                "line": 18,
                "column": 0
              },
              "end": {
                "line": 18,
                "column": 19
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 432,
              "end": 451,
              "loc": {
                "start": {
                  "line": 18,
                  "column": 0
                },
                "end": {
                  "line": 18,
                  "column": 19
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 438,
                  "end": 439,
                  "loc": {
                    "start": {
                      "line": 18,
                      "column": 6
                    },
                    "end": {
                      "line": 18,
                      "column": 7
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "ArrowFunctionExpression",
                "start": 443,
                "end": 451,
                "loc": {
                  "start": {
                    "line": 18,
                    "column": 11
                  },
                  "end": {
                    "line": 18,
                    "column": 19
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 443,
                    "end": 444,
                    "loc": {
                      "start": {
                        "line": 18,
                        "column": 11
                      },
                      "end": {
                        "line": 18,
                        "column": 12
                      }
                    },
                    "name": "c"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 448,
                  "end": 451,
                  "loc": {
                    "start": {
                      "line": 18,
                      "column": 16
                    },
                    "end": {
                      "line": 18,
                      "column": 19
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 452,
            "end": 471,
            "loc": {
              "start": {
                "line": 19,
                "column": 0
              },
              "end": {
                "line": 19,
                "column": 19
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 452,
              "end": 471,
              "loc": {
                "start": {
                  "line": 19,
                  "column": 0
                },
                "end": {
                  "line": 19,
                  "column": 19
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 458,
                  "end": 459,
                  "loc": {
                    "start": {
                      "line": 19,
                      "column": 6
                    },
                    "end": {
                      "line": 19,
                      "column": 7
                    }
                  },
                  "name": "c"
                }
              ],
              "body": {
                "type": "ArrowFunctionExpression",
                "start": 463,
                "end": 471,
                "loc": {
                  "start": {
                    "line": 19,
                    "column": 11
                  },
                  "end": {
                    "line": 19,
                    "column": 19
                  }
                },
                "id": null,
                "generator": false,
                "expression": true,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 463,
                    "end": 464,
                    "loc": {
                      "start": {
                        "line": 19,
                        "column": 11
                      },
                      "end": {
                        "line": 19,
                        "column": 12
                      }
                    },
                    "name": "c"
                  }
                ],
                "body": {
                  "type": "Literal",
                  "start": 468,
                  "end": 471,
                  "loc": {
                    "start": {
                      "line": 19,
                      "column": 16
                    },
                    "end": {
                      "line": 19,
                      "column": 19
                    }
                  },
                  "value": 123,
                  "raw": "123"
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 478,
            "end": 492,
            "loc": {
              "start": {
                "line": 20,
                "column": 6
              },
              "end": {
                "line": 20,
                "column": 20
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 478,
              "end": 492,
              "loc": {
                "start": {
                  "line": 20,
                  "column": 6
                },
                "end": {
                  "line": 20,
                  "column": 20
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 478,
                "end": 479,
                "loc": {
                  "start": {
                    "line": 20,
                    "column": 6
                  },
                  "end": {
                    "line": 20,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 480,
                  "end": 481,
                  "loc": {
                    "start": {
                      "line": 20,
                      "column": 8
                    },
                    "end": {
                      "line": 20,
                      "column": 9
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "ArrowFunctionExpression",
                  "start": 483,
                  "end": 491,
                  "loc": {
                    "start": {
                      "line": 20,
                      "column": 11
                    },
                    "end": {
                      "line": 20,
                      "column": 19
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 483,
                      "end": 484,
                      "loc": {
                        "start": {
                          "line": 20,
                          "column": 11
                        },
                        "end": {
                          "line": 20,
                          "column": 12
                        }
                      },
                      "name": "c"
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 488,
                    "end": 491,
                    "loc": {
                      "start": {
                        "line": 20,
                        "column": 16
                      },
                      "end": {
                        "line": 20,
                        "column": 19
                      }
                    },
                    "value": 123,
                    "raw": "123"
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 499,
            "end": 515,
            "loc": {
              "start": {
                "line": 21,
                "column": 6
              },
              "end": {
                "line": 21,
                "column": 22
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 499,
              "end": 515,
              "loc": {
                "start": {
                  "line": 21,
                  "column": 6
                },
                "end": {
                  "line": 21,
                  "column": 22
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 499,
                "end": 504,
                "loc": {
                  "start": {
                    "line": 21,
                    "column": 6
                  },
                  "end": {
                    "line": 21,
                    "column": 11
                  }
                },
                "name": "async"
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "start": 506,
                  "end": 514,
                  "loc": {
                    "start": {
                      "line": 21,
                      "column": 13
                    },
                    "end": {
                      "line": 21,
                      "column": 21
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 506,
                      "end": 507,
                      "loc": {
                        "start": {
                          "line": 21,
                          "column": 13
                        },
                        "end": {
                          "line": 21,
                          "column": 14
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 511,
                    "end": 514,
                    "loc": {
                      "start": {
                        "line": 21,
                        "column": 18
                      },
                      "end": {
                        "line": 21,
                        "column": 21
                      }
                    },
                    "callee": {
                      "type": "Identifier",
                      "start": 511,
                      "end": 512,
                      "loc": {
                        "start": {
                          "line": 21,
                          "column": 18
                        },
                        "end": {
                          "line": 21,
                          "column": 19
                        }
                      },
                      "name": "b"
                    },
                    "arguments": []
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 516,
            "end": 528,
            "loc": {
              "start": {
                "line": 22,
                "column": 0
              },
              "end": {
                "line": 22,
                "column": 12
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 516,
              "end": 528,
              "loc": {
                "start": {
                  "line": 22,
                  "column": 0
                },
                "end": {
                  "line": 22,
                  "column": 12
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 516,
                "end": 517,
                "loc": {
                  "start": {
                    "line": 22,
                    "column": 0
                  },
                  "end": {
                    "line": 22,
                    "column": 1
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "ArrowFunctionExpression",
                  "start": 519,
                  "end": 527,
                  "loc": {
                    "start": {
                      "line": 22,
                      "column": 3
                    },
                    "end": {
                      "line": 22,
                      "column": 11
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 519,
                      "end": 520,
                      "loc": {
                        "start": {
                          "line": 22,
                          "column": 3
                        },
                        "end": {
                          "line": 22,
                          "column": 4
                        }
                      },
                      "name": "a"
                    }
                  ],
                  "body": {
                    "type": "CallExpression",
                    "start": 524,
                    "end": 527,
                    "loc": {
                      "start": {
                        "line": 22,
                        "column": 8
                      },
                      "end": {
                        "line": 22,
                        "column": 11
                      }
                    },
                    "callee": {
                      "type": "Identifier",
                      "start": 524,
                      "end": 525,
                      "loc": {
                        "start": {
                          "line": 22,
                          "column": 8
                        },
                        "end": {
                          "line": 22,
                          "column": 9
                        }
                      },
                      "name": "b"
                    },
                    "arguments": []
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 529,
            "end": 542,
            "loc": {
              "start": {
                "line": 23,
                "column": 0
              },
              "end": {
                "line": 23,
                "column": 13
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 529,
              "end": 542,
              "loc": {
                "start": {
                  "line": 23,
                  "column": 0
                },
                "end": {
                  "line": 23,
                  "column": 13
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 529,
                "end": 535,
                "loc": {
                  "start": {
                    "line": 23,
                    "column": 0
                  },
                  "end": {
                    "line": 23,
                    "column": 6
                  }
                },
                "name": "cherow"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 536,
                  "end": 537,
                  "loc": {
                    "start": {
                      "line": 23,
                      "column": 7
                    },
                    "end": {
                      "line": 23,
                      "column": 8
                    }
                  },
                  "value": 1,
                  "raw": "1"
                },
                {
                  "type": "Literal",
                  "start": 538,
                  "end": 539,
                  "loc": {
                    "start": {
                      "line": 23,
                      "column": 9
                    },
                    "end": {
                      "line": 23,
                      "column": 10
                    }
                  },
                  "value": 2,
                  "raw": "2"
                },
                {
                  "type": "Literal",
                  "start": 540,
                  "end": 541,
                  "loc": {
                    "start": {
                      "line": 23,
                      "column": 11
                    },
                    "end": {
                      "line": 23,
                      "column": 12
                    }
                  },
                  "value": 3,
                  "raw": "3"
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex #10', () => {
      expect(parseScript(`async () => {}
      async () => {}`, {
          ranges: true,
          locations: true,
          raw: true
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
            "line": 2,
            "column": 20
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 21,
            "end": 35,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 21,
              "end": 35,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 33,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 18
                  },
                  "end": {
                    "line": 2,
                    "column": 20
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

    it('should parse complex #11', () => {
      expect(parseScript(`async () => {}
      () => {}`, {
          ranges: true,
          locations: true,
          raw: true
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
            "line": 2,
            "column": 14
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 21,
            "end": 29,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 21,
              "end": 29,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 27,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 12
                  },
                  "end": {
                    "line": 2,
                    "column": 14
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

    it('should parse complex #12', () => {
      expect(parseScript(`() => { () => {} }
      () => {}`, {
          ranges: true,
          locations: true,
          raw: true
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
            "line": 2,
            "column": 14
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
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 6,
                "end": 18,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 6
                  },
                  "end": {
                    "line": 1,
                    "column": 18
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "ArrowFunctionExpression",
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
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
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
          },
          {
            "type": "ExpressionStatement",
            "start": 25,
            "end": 33,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 25,
              "end": 33,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 31,
                "end": 33,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 12
                  },
                  "end": {
                    "line": 2,
                    "column": 14
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

    it('should parse complex #13', () => {
      expect(parseScript(`b => {}
      a(b, c => 123)`, {
          ranges: true,
          locations: true,
          raw: true
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
            "line": 2,
            "column": 20
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
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
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 14,
            "end": 28,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 20
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 14,
              "end": 28,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 20
                }
              },
              "callee": {
                "type": "Identifier",
                "start": 14,
                "end": 15,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 6
                  },
                  "end": {
                    "line": 2,
                    "column": 7
                  }
                },
                "name": "a"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 16,
                  "end": 17,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 8
                    },
                    "end": {
                      "line": 2,
                      "column": 9
                    }
                  },
                  "name": "b"
                },
                {
                  "type": "ArrowFunctionExpression",
                  "start": 19,
                  "end": 27,
                  "loc": {
                    "start": {
                      "line": 2,
                      "column": 11
                    },
                    "end": {
                      "line": 2,
                      "column": 19
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": true,
                  "async": false,
                  "params": [
                    {
                      "type": "Identifier",
                      "start": 19,
                      "end": 20,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 11
                        },
                        "end": {
                          "line": 2,
                          "column": 12
                        }
                      },
                      "name": "c"
                    }
                  ],
                  "body": {
                    "type": "Literal",
                    "start": 24,
                    "end": 27,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 16
                      },
                      "end": {
                        "line": 2,
                        "column": 19
                      }
                    },
                    "value": 123,
                    "raw": "123"
                  }
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });
  
    it('should parse complex #14', () => {
      expect(parseScript(`() => {}
      () => {}
      a => {}
      b => {}
      async b => {}
      async b => {}
      () => {}
      () => {}
      async cherow => a`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 145,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 23
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 15,
            "end": 23,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 15,
              "end": 23,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 12
                  },
                  "end": {
                    "line": 2,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 30,
            "end": 37,
            "loc": {
              "start": {
                "line": 3,
                "column": 6
              },
              "end": {
                "line": 3,
                "column": 13
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 30,
              "end": 37,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 6
                },
                "end": {
                  "line": 3,
                  "column": 13
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 30,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 6
                    },
                    "end": {
                      "line": 3,
                      "column": 7
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 35,
                "end": 37,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 11
                  },
                  "end": {
                    "line": 3,
                    "column": 13
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 44,
            "end": 51,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 4,
                "column": 13
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 44,
              "end": 51,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 4,
                  "column": 13
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 44,
                  "end": 45,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 6
                    },
                    "end": {
                      "line": 4,
                      "column": 7
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 49,
                "end": 51,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 11
                  },
                  "end": {
                    "line": 4,
                    "column": 13
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 58,
            "end": 71,
            "loc": {
              "start": {
                "line": 5,
                "column": 6
              },
              "end": {
                "line": 5,
                "column": 19
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 58,
              "end": 71,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 6
                },
                "end": {
                  "line": 5,
                  "column": 19
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 64,
                  "end": 65,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 12
                    },
                    "end": {
                      "line": 5,
                      "column": 13
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 69,
                "end": 71,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 17
                  },
                  "end": {
                    "line": 5,
                    "column": 19
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 78,
            "end": 91,
            "loc": {
              "start": {
                "line": 6,
                "column": 6
              },
              "end": {
                "line": 6,
                "column": 19
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 78,
              "end": 91,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 6
                },
                "end": {
                  "line": 6,
                  "column": 19
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 84,
                  "end": 85,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 12
                    },
                    "end": {
                      "line": 6,
                      "column": 13
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 89,
                "end": 91,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 17
                  },
                  "end": {
                    "line": 6,
                    "column": 19
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 98,
            "end": 106,
            "loc": {
              "start": {
                "line": 7,
                "column": 6
              },
              "end": {
                "line": 7,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 98,
              "end": 106,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 6
                },
                "end": {
                  "line": 7,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 104,
                "end": 106,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 12
                  },
                  "end": {
                    "line": 7,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 113,
            "end": 121,
            "loc": {
              "start": {
                "line": 8,
                "column": 6
              },
              "end": {
                "line": 8,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 113,
              "end": 121,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 6
                },
                "end": {
                  "line": 8,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 119,
                "end": 121,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 12
                  },
                  "end": {
                    "line": 8,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 128,
            "end": 145,
            "loc": {
              "start": {
                "line": 9,
                "column": 6
              },
              "end": {
                "line": 9,
                "column": 23
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 128,
              "end": 145,
              "loc": {
                "start": {
                  "line": 9,
                  "column": 6
                },
                "end": {
                  "line": 9,
                  "column": 23
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 134,
                  "end": 140,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 12
                    },
                    "end": {
                      "line": 9,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "Identifier",
                "start": 144,
                "end": 145,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 22
                  },
                  "end": {
                    "line": 9,
                    "column": 23
                  }
                },
                "name": "a"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex #15', () => {
      expect(parseScript(`() => {}
      () => {}
      a => {}
      b => {
      async cherow => cherow(a, b, c);
      }
      ((a, b) => { return a + b; })(1, 5), 6
      async b => {}
      async b => {}
      
      ((a, b) => { return a + b; })(1, 5), () => {
        async cherow => a
      }
      () => {
      }
      ((a, b))
	  a = () => {}
      () => {}
      async cherow => a`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 366,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 23
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 15,
            "end": 23,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 15,
              "end": 23,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 12
                  },
                  "end": {
                    "line": 2,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 30,
            "end": 37,
            "loc": {
              "start": {
                "line": 3,
                "column": 6
              },
              "end": {
                "line": 3,
                "column": 13
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 30,
              "end": 37,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 6
                },
                "end": {
                  "line": 3,
                  "column": 13
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 30,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 6
                    },
                    "end": {
                      "line": 3,
                      "column": 7
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 35,
                "end": 37,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 11
                  },
                  "end": {
                    "line": 3,
                    "column": 13
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 44,
            "end": 97,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 6,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 44,
              "end": 97,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 6,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 44,
                  "end": 45,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 6
                    },
                    "end": {
                      "line": 4,
                      "column": 7
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 49,
                "end": 97,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 11
                  },
                  "end": {
                    "line": 6,
                    "column": 7
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 57,
                    "end": 89,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 6
                      },
                      "end": {
                        "line": 5,
                        "column": 38
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 57,
                      "end": 88,
                      "loc": {
                        "start": {
                          "line": 5,
                          "column": 6
                        },
                        "end": {
                          "line": 5,
                          "column": 37
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 63,
                          "end": 69,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 12
                            },
                            "end": {
                              "line": 5,
                              "column": 18
                            }
                          },
                          "name": "cherow"
                        }
                      ],
                      "body": {
                        "type": "CallExpression",
                        "start": 73,
                        "end": 88,
                        "loc": {
                          "start": {
                            "line": 5,
                            "column": 22
                          },
                          "end": {
                            "line": 5,
                            "column": 37
                          }
                        },
                        "callee": {
                          "type": "Identifier",
                          "start": 73,
                          "end": 79,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 22
                            },
                            "end": {
                              "line": 5,
                              "column": 28
                            }
                          },
                          "name": "cherow"
                        },
                        "arguments": [
                          {
                            "type": "Identifier",
                            "start": 80,
                            "end": 81,
                            "loc": {
                              "start": {
                                "line": 5,
                                "column": 29
                              },
                              "end": {
                                "line": 5,
                                "column": 30
                              }
                            },
                            "name": "a"
                          },
                          {
                            "type": "Identifier",
                            "start": 83,
                            "end": 84,
                            "loc": {
                              "start": {
                                "line": 5,
                                "column": 32
                              },
                              "end": {
                                "line": 5,
                                "column": 33
                              }
                            },
                            "name": "b"
                          },
                          {
                            "type": "Identifier",
                            "start": 86,
                            "end": 87,
                            "loc": {
                              "start": {
                                "line": 5,
                                "column": 35
                              },
                              "end": {
                                "line": 5,
                                "column": 36
                              }
                            },
                            "name": "c"
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 104,
            "end": 142,
            "loc": {
              "start": {
                "line": 7,
                "column": 6
              },
              "end": {
                "line": 7,
                "column": 44
              }
            },
            "expression": {
              "type": "SequenceExpression",
              "start": 104,
              "end": 142,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 6
                },
                "end": {
                  "line": 7,
                  "column": 44
                }
              },
              "expressions": [
                {
                  "type": "CallExpression",
                  "start": 104,
                  "end": 139,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 6
                    },
                    "end": {
                      "line": 7,
                      "column": 41
                    }
                  },
                  "callee": {
                    "type": "ArrowFunctionExpression",
                    "start": 105,
                    "end": 132,
                    "loc": {
                      "start": {
                        "line": 7,
                        "column": 7
                      },
                      "end": {
                        "line": 7,
                        "column": 34
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 106,
                        "end": 107,
                        "loc": {
                          "start": {
                            "line": 7,
                            "column": 8
                          },
                          "end": {
                            "line": 7,
                            "column": 9
                          }
                        },
                        "name": "a"
                      },
                      {
                        "type": "Identifier",
                        "start": 109,
                        "end": 110,
                        "loc": {
                          "start": {
                            "line": 7,
                            "column": 11
                          },
                          "end": {
                            "line": 7,
                            "column": 12
                          }
                        },
                        "name": "b"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 115,
                      "end": 132,
                      "loc": {
                        "start": {
                          "line": 7,
                          "column": 17
                        },
                        "end": {
                          "line": 7,
                          "column": 34
                        }
                      },
                      "body": [
                        {
                          "type": "ReturnStatement",
                          "start": 117,
                          "end": 130,
                          "loc": {
                            "start": {
                              "line": 7,
                              "column": 19
                            },
                            "end": {
                              "line": 7,
                              "column": 32
                            }
                          },
                          "argument": {
                            "type": "BinaryExpression",
                            "start": 124,
                            "end": 129,
                            "loc": {
                              "start": {
                                "line": 7,
                                "column": 26
                              },
                              "end": {
                                "line": 7,
                                "column": 31
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 124,
                              "end": 125,
                              "loc": {
                                "start": {
                                  "line": 7,
                                  "column": 26
                                },
                                "end": {
                                  "line": 7,
                                  "column": 27
                                }
                              },
                              "name": "a"
                            },
                            "operator": "+",
                            "right": {
                              "type": "Identifier",
                              "start": 128,
                              "end": 129,
                              "loc": {
                                "start": {
                                  "line": 7,
                                  "column": 30
                                },
                                "end": {
                                  "line": 7,
                                  "column": 31
                                }
                              },
                              "name": "b"
                            }
                          }
                        }
                      ]
                    }
                  },
                  "arguments": [
                    {
                      "type": "Literal",
                      "start": 134,
                      "end": 135,
                      "loc": {
                        "start": {
                          "line": 7,
                          "column": 36
                        },
                        "end": {
                          "line": 7,
                          "column": 37
                        }
                      },
                      "value": 1,
                      "raw": "1"
                    },
                    {
                      "type": "Literal",
                      "start": 137,
                      "end": 138,
                      "loc": {
                        "start": {
                          "line": 7,
                          "column": 39
                        },
                        "end": {
                          "line": 7,
                          "column": 40
                        }
                      },
                      "value": 5,
                      "raw": "5"
                    }
                  ]
                },
                {
                  "type": "Literal",
                  "start": 141,
                  "end": 142,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 43
                    },
                    "end": {
                      "line": 7,
                      "column": 44
                    }
                  },
                  "value": 6,
                  "raw": "6"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 149,
            "end": 162,
            "loc": {
              "start": {
                "line": 8,
                "column": 6
              },
              "end": {
                "line": 8,
                "column": 19
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 149,
              "end": 162,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 6
                },
                "end": {
                  "line": 8,
                  "column": 19
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 155,
                  "end": 156,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 12
                    },
                    "end": {
                      "line": 8,
                      "column": 13
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 160,
                "end": 162,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 17
                  },
                  "end": {
                    "line": 8,
                    "column": 19
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 169,
            "end": 182,
            "loc": {
              "start": {
                "line": 9,
                "column": 6
              },
              "end": {
                "line": 9,
                "column": 19
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 169,
              "end": 182,
              "loc": {
                "start": {
                  "line": 9,
                  "column": 6
                },
                "end": {
                  "line": 9,
                  "column": 19
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 175,
                  "end": 176,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 12
                    },
                    "end": {
                      "line": 9,
                      "column": 13
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 180,
                "end": 182,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 17
                  },
                  "end": {
                    "line": 9,
                    "column": 19
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 196,
            "end": 274,
            "loc": {
              "start": {
                "line": 11,
                "column": 6
              },
              "end": {
                "line": 13,
                "column": 7
              }
            },
            "expression": {
              "type": "SequenceExpression",
              "start": 196,
              "end": 274,
              "loc": {
                "start": {
                  "line": 11,
                  "column": 6
                },
                "end": {
                  "line": 13,
                  "column": 7
                }
              },
              "expressions": [
                {
                  "type": "CallExpression",
                  "start": 196,
                  "end": 231,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 6
                    },
                    "end": {
                      "line": 11,
                      "column": 41
                    }
                  },
                  "callee": {
                    "type": "ArrowFunctionExpression",
                    "start": 197,
                    "end": 224,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 7
                      },
                      "end": {
                        "line": 11,
                        "column": 34
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 198,
                        "end": 199,
                        "loc": {
                          "start": {
                            "line": 11,
                            "column": 8
                          },
                          "end": {
                            "line": 11,
                            "column": 9
                          }
                        },
                        "name": "a"
                      },
                      {
                        "type": "Identifier",
                        "start": 201,
                        "end": 202,
                        "loc": {
                          "start": {
                            "line": 11,
                            "column": 11
                          },
                          "end": {
                            "line": 11,
                            "column": 12
                          }
                        },
                        "name": "b"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 207,
                      "end": 224,
                      "loc": {
                        "start": {
                          "line": 11,
                          "column": 17
                        },
                        "end": {
                          "line": 11,
                          "column": 34
                        }
                      },
                      "body": [
                        {
                          "type": "ReturnStatement",
                          "start": 209,
                          "end": 222,
                          "loc": {
                            "start": {
                              "line": 11,
                              "column": 19
                            },
                            "end": {
                              "line": 11,
                              "column": 32
                            }
                          },
                          "argument": {
                            "type": "BinaryExpression",
                            "start": 216,
                            "end": 221,
                            "loc": {
                              "start": {
                                "line": 11,
                                "column": 26
                              },
                              "end": {
                                "line": 11,
                                "column": 31
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 216,
                              "end": 217,
                              "loc": {
                                "start": {
                                  "line": 11,
                                  "column": 26
                                },
                                "end": {
                                  "line": 11,
                                  "column": 27
                                }
                              },
                              "name": "a"
                            },
                            "operator": "+",
                            "right": {
                              "type": "Identifier",
                              "start": 220,
                              "end": 221,
                              "loc": {
                                "start": {
                                  "line": 11,
                                  "column": 30
                                },
                                "end": {
                                  "line": 11,
                                  "column": 31
                                }
                              },
                              "name": "b"
                            }
                          }
                        }
                      ]
                    }
                  },
                  "arguments": [
                    {
                      "type": "Literal",
                      "start": 226,
                      "end": 227,
                      "loc": {
                        "start": {
                          "line": 11,
                          "column": 36
                        },
                        "end": {
                          "line": 11,
                          "column": 37
                        }
                      },
                      "value": 1,
                      "raw": "1"
                    },
                    {
                      "type": "Literal",
                      "start": 229,
                      "end": 230,
                      "loc": {
                        "start": {
                          "line": 11,
                          "column": 39
                        },
                        "end": {
                          "line": 11,
                          "column": 40
                        }
                      },
                      "value": 5,
                      "raw": "5"
                    }
                  ]
                },
                {
                  "type": "ArrowFunctionExpression",
                  "start": 233,
                  "end": 274,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 43
                    },
                    "end": {
                      "line": 13,
                      "column": 7
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 239,
                    "end": 274,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 49
                      },
                      "end": {
                        "line": 13,
                        "column": 7
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 249,
                        "end": 266,
                        "loc": {
                          "start": {
                            "line": 12,
                            "column": 8
                          },
                          "end": {
                            "line": 12,
                            "column": 25
                          }
                        },
                        "expression": {
                          "type": "ArrowFunctionExpression",
                          "start": 249,
                          "end": 266,
                          "loc": {
                            "start": {
                              "line": 12,
                              "column": 8
                            },
                            "end": {
                              "line": 12,
                              "column": 25
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": true,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 255,
                              "end": 261,
                              "loc": {
                                "start": {
                                  "line": 12,
                                  "column": 14
                                },
                                "end": {
                                  "line": 12,
                                  "column": 20
                                }
                              },
                              "name": "cherow"
                            }
                          ],
                          "body": {
                            "type": "Identifier",
                            "start": 265,
                            "end": 266,
                            "loc": {
                              "start": {
                                "line": 12,
                                "column": 24
                              },
                              "end": {
                                "line": 12,
                                "column": 25
                              }
                            },
                            "name": "a"
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 281,
            "end": 296,
            "loc": {
              "start": {
                "line": 14,
                "column": 6
              },
              "end": {
                "line": 15,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 281,
              "end": 296,
              "loc": {
                "start": {
                  "line": 14,
                  "column": 6
                },
                "end": {
                  "line": 15,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 287,
                "end": 296,
                "loc": {
                  "start": {
                    "line": 14,
                    "column": 12
                  },
                  "end": {
                    "line": 15,
                    "column": 7
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 303,
            "end": 311,
            "loc": {
              "start": {
                "line": 16,
                "column": 6
              },
              "end": {
                "line": 16,
                "column": 14
              }
            },
            "expression": {
              "type": "SequenceExpression",
              "start": 305,
              "end": 309,
              "loc": {
                "start": {
                  "line": 16,
                  "column": 8
                },
                "end": {
                  "line": 16,
                  "column": 12
                }
              },
              "expressions": [
                {
                  "type": "Identifier",
                  "start": 305,
                  "end": 306,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 8
                    },
                    "end": {
                      "line": 16,
                      "column": 9
                    }
                  },
                  "name": "a"
                },
                {
                  "type": "Identifier",
                  "start": 308,
                  "end": 309,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 11
                    },
                    "end": {
                      "line": 16,
                      "column": 12
                    }
                  },
                  "name": "b"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 315,
            "end": 327,
            "loc": {
              "start": {
                "line": 17,
                "column": 3
              },
              "end": {
                "line": 17,
                "column": 15
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 315,
              "end": 327,
              "loc": {
                "start": {
                  "line": 17,
                  "column": 3
                },
                "end": {
                  "line": 17,
                  "column": 15
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 315,
                "end": 316,
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 3
                  },
                  "end": {
                    "line": 17,
                    "column": 4
                  }
                },
                "name": "a"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 319,
                "end": 327,
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 7
                  },
                  "end": {
                    "line": 17,
                    "column": 15
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 325,
                  "end": 327,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 13
                    },
                    "end": {
                      "line": 17,
                      "column": 15
                    }
                  },
                  "body": []
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 334,
            "end": 342,
            "loc": {
              "start": {
                "line": 18,
                "column": 6
              },
              "end": {
                "line": 18,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 334,
              "end": 342,
              "loc": {
                "start": {
                  "line": 18,
                  "column": 6
                },
                "end": {
                  "line": 18,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 340,
                "end": 342,
                "loc": {
                  "start": {
                    "line": 18,
                    "column": 12
                  },
                  "end": {
                    "line": 18,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 349,
            "end": 366,
            "loc": {
              "start": {
                "line": 19,
                "column": 6
              },
              "end": {
                "line": 19,
                "column": 23
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 349,
              "end": 366,
              "loc": {
                "start": {
                  "line": 19,
                  "column": 6
                },
                "end": {
                  "line": 19,
                  "column": 23
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 355,
                  "end": 361,
                  "loc": {
                    "start": {
                      "line": 19,
                      "column": 12
                    },
                    "end": {
                      "line": 19,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "Identifier",
                "start": 365,
                "end": 366,
                "loc": {
                  "start": {
                    "line": 19,
                    "column": 22
                  },
                  "end": {
                    "line": 19,
                    "column": 23
                  }
                },
                "name": "a"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex #16', () => {
      expect(parseScript(`() => {}
      () => {}
      a => {}
      b => {
      async cherow => cherow(a, b, c);
      }
      () => {}
      () => {
        a = a.b.c(a,b)
        a = () => {
        async () => {}
        }
      }
      ((a, b) => { return a + b.d.e.a; })(1, 5), 6
      async b => {}
      async b => {}
      async a => {}
      ((a, b) => { return a + b; })(1, 5), () => {
        async cherow => a.b.c.d.e.f.g
      }
      () => {
        async a => {}
      }
      ((a, b))
	  a = () => {}
      () => {}
      async cherow => a
      (async cherow => a)(b)`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 561,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 28,
            "column": 28
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 15,
            "end": 23,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 15,
              "end": 23,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 12
                  },
                  "end": {
                    "line": 2,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 30,
            "end": 37,
            "loc": {
              "start": {
                "line": 3,
                "column": 6
              },
              "end": {
                "line": 3,
                "column": 13
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 30,
              "end": 37,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 6
                },
                "end": {
                  "line": 3,
                  "column": 13
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 30,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 6
                    },
                    "end": {
                      "line": 3,
                      "column": 7
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 35,
                "end": 37,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 11
                  },
                  "end": {
                    "line": 3,
                    "column": 13
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 44,
            "end": 97,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 6,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 44,
              "end": 97,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 6,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 44,
                  "end": 45,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 6
                    },
                    "end": {
                      "line": 4,
                      "column": 7
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 49,
                "end": 97,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 11
                  },
                  "end": {
                    "line": 6,
                    "column": 7
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 57,
                    "end": 89,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 6
                      },
                      "end": {
                        "line": 5,
                        "column": 38
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 57,
                      "end": 88,
                      "loc": {
                        "start": {
                          "line": 5,
                          "column": 6
                        },
                        "end": {
                          "line": 5,
                          "column": 37
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 63,
                          "end": 69,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 12
                            },
                            "end": {
                              "line": 5,
                              "column": 18
                            }
                          },
                          "name": "cherow"
                        }
                      ],
                      "body": {
                        "type": "CallExpression",
                        "start": 73,
                        "end": 88,
                        "loc": {
                          "start": {
                            "line": 5,
                            "column": 22
                          },
                          "end": {
                            "line": 5,
                            "column": 37
                          }
                        },
                        "callee": {
                          "type": "Identifier",
                          "start": 73,
                          "end": 79,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 22
                            },
                            "end": {
                              "line": 5,
                              "column": 28
                            }
                          },
                          "name": "cherow"
                        },
                        "arguments": [
                          {
                            "type": "Identifier",
                            "start": 80,
                            "end": 81,
                            "loc": {
                              "start": {
                                "line": 5,
                                "column": 29
                              },
                              "end": {
                                "line": 5,
                                "column": 30
                              }
                            },
                            "name": "a"
                          },
                          {
                            "type": "Identifier",
                            "start": 83,
                            "end": 84,
                            "loc": {
                              "start": {
                                "line": 5,
                                "column": 32
                              },
                              "end": {
                                "line": 5,
                                "column": 33
                              }
                            },
                            "name": "b"
                          },
                          {
                            "type": "Identifier",
                            "start": 86,
                            "end": 87,
                            "loc": {
                              "start": {
                                "line": 5,
                                "column": 35
                              },
                              "end": {
                                "line": 5,
                                "column": 36
                              }
                            },
                            "name": "c"
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 104,
            "end": 112,
            "loc": {
              "start": {
                "line": 7,
                "column": 6
              },
              "end": {
                "line": 7,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 104,
              "end": 112,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 6
                },
                "end": {
                  "line": 7,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 110,
                "end": 112,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 12
                  },
                  "end": {
                    "line": 7,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 119,
            "end": 210,
            "loc": {
              "start": {
                "line": 8,
                "column": 6
              },
              "end": {
                "line": 13,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 119,
              "end": 210,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 6
                },
                "end": {
                  "line": 13,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 125,
                "end": 210,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 12
                  },
                  "end": {
                    "line": 13,
                    "column": 7
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 135,
                    "end": 149,
                    "loc": {
                      "start": {
                        "line": 9,
                        "column": 8
                      },
                      "end": {
                        "line": 9,
                        "column": 22
                      }
                    },
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 135,
                      "end": 149,
                      "loc": {
                        "start": {
                          "line": 9,
                          "column": 8
                        },
                        "end": {
                          "line": 9,
                          "column": 22
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 135,
                        "end": 136,
                        "loc": {
                          "start": {
                            "line": 9,
                            "column": 8
                          },
                          "end": {
                            "line": 9,
                            "column": 9
                          }
                        },
                        "name": "a"
                      },
                      "right": {
                        "type": "CallExpression",
                        "start": 139,
                        "end": 149,
                        "loc": {
                          "start": {
                            "line": 9,
                            "column": 12
                          },
                          "end": {
                            "line": 9,
                            "column": 22
                          }
                        },
                        "callee": {
                          "type": "MemberExpression",
                          "start": 139,
                          "end": 144,
                          "loc": {
                            "start": {
                              "line": 9,
                              "column": 12
                            },
                            "end": {
                              "line": 9,
                              "column": 17
                            }
                          },
                          "object": {
                            "type": "MemberExpression",
                            "start": 139,
                            "end": 142,
                            "loc": {
                              "start": {
                                "line": 9,
                                "column": 12
                              },
                              "end": {
                                "line": 9,
                                "column": 15
                              }
                            },
                            "object": {
                              "type": "Identifier",
                              "start": 139,
                              "end": 140,
                              "loc": {
                                "start": {
                                  "line": 9,
                                  "column": 12
                                },
                                "end": {
                                  "line": 9,
                                  "column": 13
                                }
                              },
                              "name": "a"
                            },
                            "property": {
                              "type": "Identifier",
                              "start": 141,
                              "end": 142,
                              "loc": {
                                "start": {
                                  "line": 9,
                                  "column": 14
                                },
                                "end": {
                                  "line": 9,
                                  "column": 15
                                }
                              },
                              "name": "b"
                            },
                            "computed": false
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 143,
                            "end": 144,
                            "loc": {
                              "start": {
                                "line": 9,
                                "column": 16
                              },
                              "end": {
                                "line": 9,
                                "column": 17
                              }
                            },
                            "name": "c"
                          },
                          "computed": false
                        },
                        "arguments": [
                          {
                            "type": "Identifier",
                            "start": 145,
                            "end": 146,
                            "loc": {
                              "start": {
                                "line": 9,
                                "column": 18
                              },
                              "end": {
                                "line": 9,
                                "column": 19
                              }
                            },
                            "name": "a"
                          },
                          {
                            "type": "Identifier",
                            "start": 147,
                            "end": 148,
                            "loc": {
                              "start": {
                                "line": 9,
                                "column": 20
                              },
                              "end": {
                                "line": 9,
                                "column": 21
                              }
                            },
                            "name": "b"
                          }
                        ]
                      }
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 158,
                    "end": 202,
                    "loc": {
                      "start": {
                        "line": 10,
                        "column": 8
                      },
                      "end": {
                        "line": 12,
                        "column": 9
                      }
                    },
                    "expression": {
                      "type": "AssignmentExpression",
                      "start": 158,
                      "end": 202,
                      "loc": {
                        "start": {
                          "line": 10,
                          "column": 8
                        },
                        "end": {
                          "line": 12,
                          "column": 9
                        }
                      },
                      "operator": "=",
                      "left": {
                        "type": "Identifier",
                        "start": 158,
                        "end": 159,
                        "loc": {
                          "start": {
                            "line": 10,
                            "column": 8
                          },
                          "end": {
                            "line": 10,
                            "column": 9
                          }
                        },
                        "name": "a"
                      },
                      "right": {
                        "type": "ArrowFunctionExpression",
                        "start": 162,
                        "end": 202,
                        "loc": {
                          "start": {
                            "line": 10,
                            "column": 12
                          },
                          "end": {
                            "line": 12,
                            "column": 9
                          }
                        },
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 168,
                          "end": 202,
                          "loc": {
                            "start": {
                              "line": 10,
                              "column": 18
                            },
                            "end": {
                              "line": 12,
                              "column": 9
                            }
                          },
                          "body": [
                            {
                              "type": "ExpressionStatement",
                              "start": 178,
                              "end": 192,
                              "loc": {
                                "start": {
                                  "line": 11,
                                  "column": 8
                                },
                                "end": {
                                  "line": 11,
                                  "column": 22
                                }
                              },
                              "expression": {
                                "type": "ArrowFunctionExpression",
                                "start": 178,
                                "end": 192,
                                "loc": {
                                  "start": {
                                    "line": 11,
                                    "column": 8
                                  },
                                  "end": {
                                    "line": 11,
                                    "column": 22
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": true,
                                "params": [],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 190,
                                  "end": 192,
                                  "loc": {
                                    "start": {
                                      "line": 11,
                                      "column": 20
                                    },
                                    "end": {
                                      "line": 11,
                                      "column": 22
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
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 217,
            "end": 261,
            "loc": {
              "start": {
                "line": 14,
                "column": 6
              },
              "end": {
                "line": 14,
                "column": 50
              }
            },
            "expression": {
              "type": "SequenceExpression",
              "start": 217,
              "end": 261,
              "loc": {
                "start": {
                  "line": 14,
                  "column": 6
                },
                "end": {
                  "line": 14,
                  "column": 50
                }
              },
              "expressions": [
                {
                  "type": "CallExpression",
                  "start": 217,
                  "end": 258,
                  "loc": {
                    "start": {
                      "line": 14,
                      "column": 6
                    },
                    "end": {
                      "line": 14,
                      "column": 47
                    }
                  },
                  "callee": {
                    "type": "ArrowFunctionExpression",
                    "start": 218,
                    "end": 251,
                    "loc": {
                      "start": {
                        "line": 14,
                        "column": 7
                      },
                      "end": {
                        "line": 14,
                        "column": 40
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 219,
                        "end": 220,
                        "loc": {
                          "start": {
                            "line": 14,
                            "column": 8
                          },
                          "end": {
                            "line": 14,
                            "column": 9
                          }
                        },
                        "name": "a"
                      },
                      {
                        "type": "Identifier",
                        "start": 222,
                        "end": 223,
                        "loc": {
                          "start": {
                            "line": 14,
                            "column": 11
                          },
                          "end": {
                            "line": 14,
                            "column": 12
                          }
                        },
                        "name": "b"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 228,
                      "end": 251,
                      "loc": {
                        "start": {
                          "line": 14,
                          "column": 17
                        },
                        "end": {
                          "line": 14,
                          "column": 40
                        }
                      },
                      "body": [
                        {
                          "type": "ReturnStatement",
                          "start": 230,
                          "end": 249,
                          "loc": {
                            "start": {
                              "line": 14,
                              "column": 19
                            },
                            "end": {
                              "line": 14,
                              "column": 38
                            }
                          },
                          "argument": {
                            "type": "BinaryExpression",
                            "start": 237,
                            "end": 248,
                            "loc": {
                              "start": {
                                "line": 14,
                                "column": 26
                              },
                              "end": {
                                "line": 14,
                                "column": 37
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 237,
                              "end": 238,
                              "loc": {
                                "start": {
                                  "line": 14,
                                  "column": 26
                                },
                                "end": {
                                  "line": 14,
                                  "column": 27
                                }
                              },
                              "name": "a"
                            },
                            "operator": "+",
                            "right": {
                              "type": "MemberExpression",
                              "start": 241,
                              "end": 248,
                              "loc": {
                                "start": {
                                  "line": 14,
                                  "column": 30
                                },
                                "end": {
                                  "line": 14,
                                  "column": 37
                                }
                              },
                              "object": {
                                "type": "MemberExpression",
                                "start": 241,
                                "end": 246,
                                "loc": {
                                  "start": {
                                    "line": 14,
                                    "column": 30
                                  },
                                  "end": {
                                    "line": 14,
                                    "column": 35
                                  }
                                },
                                "object": {
                                  "type": "MemberExpression",
                                  "start": 241,
                                  "end": 244,
                                  "loc": {
                                    "start": {
                                      "line": 14,
                                      "column": 30
                                    },
                                    "end": {
                                      "line": 14,
                                      "column": 33
                                    }
                                  },
                                  "object": {
                                    "type": "Identifier",
                                    "start": 241,
                                    "end": 242,
                                    "loc": {
                                      "start": {
                                        "line": 14,
                                        "column": 30
                                      },
                                      "end": {
                                        "line": 14,
                                        "column": 31
                                      }
                                    },
                                    "name": "b"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 243,
                                    "end": 244,
                                    "loc": {
                                      "start": {
                                        "line": 14,
                                        "column": 32
                                      },
                                      "end": {
                                        "line": 14,
                                        "column": 33
                                      }
                                    },
                                    "name": "d"
                                  },
                                  "computed": false
                                },
                                "property": {
                                  "type": "Identifier",
                                  "start": 245,
                                  "end": 246,
                                  "loc": {
                                    "start": {
                                      "line": 14,
                                      "column": 34
                                    },
                                    "end": {
                                      "line": 14,
                                      "column": 35
                                    }
                                  },
                                  "name": "e"
                                },
                                "computed": false
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 247,
                                "end": 248,
                                "loc": {
                                  "start": {
                                    "line": 14,
                                    "column": 36
                                  },
                                  "end": {
                                    "line": 14,
                                    "column": 37
                                  }
                                },
                                "name": "a"
                              },
                              "computed": false
                            }
                          }
                        }
                      ]
                    }
                  },
                  "arguments": [
                    {
                      "type": "Literal",
                      "start": 253,
                      "end": 254,
                      "loc": {
                        "start": {
                          "line": 14,
                          "column": 42
                        },
                        "end": {
                          "line": 14,
                          "column": 43
                        }
                      },
                      "value": 1,
                      "raw": "1"
                    },
                    {
                      "type": "Literal",
                      "start": 256,
                      "end": 257,
                      "loc": {
                        "start": {
                          "line": 14,
                          "column": 45
                        },
                        "end": {
                          "line": 14,
                          "column": 46
                        }
                      },
                      "value": 5,
                      "raw": "5"
                    }
                  ]
                },
                {
                  "type": "Literal",
                  "start": 260,
                  "end": 261,
                  "loc": {
                    "start": {
                      "line": 14,
                      "column": 49
                    },
                    "end": {
                      "line": 14,
                      "column": 50
                    }
                  },
                  "value": 6,
                  "raw": "6"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 268,
            "end": 281,
            "loc": {
              "start": {
                "line": 15,
                "column": 6
              },
              "end": {
                "line": 15,
                "column": 19
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 268,
              "end": 281,
              "loc": {
                "start": {
                  "line": 15,
                  "column": 6
                },
                "end": {
                  "line": 15,
                  "column": 19
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 274,
                  "end": 275,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 12
                    },
                    "end": {
                      "line": 15,
                      "column": 13
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 279,
                "end": 281,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 17
                  },
                  "end": {
                    "line": 15,
                    "column": 19
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 288,
            "end": 301,
            "loc": {
              "start": {
                "line": 16,
                "column": 6
              },
              "end": {
                "line": 16,
                "column": 19
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 288,
              "end": 301,
              "loc": {
                "start": {
                  "line": 16,
                  "column": 6
                },
                "end": {
                  "line": 16,
                  "column": 19
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 294,
                  "end": 295,
                  "loc": {
                    "start": {
                      "line": 16,
                      "column": 12
                    },
                    "end": {
                      "line": 16,
                      "column": 13
                    }
                  },
                  "name": "b"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 299,
                "end": 301,
                "loc": {
                  "start": {
                    "line": 16,
                    "column": 17
                  },
                  "end": {
                    "line": 16,
                    "column": 19
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 308,
            "end": 321,
            "loc": {
              "start": {
                "line": 17,
                "column": 6
              },
              "end": {
                "line": 17,
                "column": 19
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 308,
              "end": 321,
              "loc": {
                "start": {
                  "line": 17,
                  "column": 6
                },
                "end": {
                  "line": 17,
                  "column": 19
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 314,
                  "end": 315,
                  "loc": {
                    "start": {
                      "line": 17,
                      "column": 12
                    },
                    "end": {
                      "line": 17,
                      "column": 13
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 319,
                "end": 321,
                "loc": {
                  "start": {
                    "line": 17,
                    "column": 17
                  },
                  "end": {
                    "line": 17,
                    "column": 19
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 328,
            "end": 418,
            "loc": {
              "start": {
                "line": 18,
                "column": 6
              },
              "end": {
                "line": 20,
                "column": 7
              }
            },
            "expression": {
              "type": "SequenceExpression",
              "start": 328,
              "end": 418,
              "loc": {
                "start": {
                  "line": 18,
                  "column": 6
                },
                "end": {
                  "line": 20,
                  "column": 7
                }
              },
              "expressions": [
                {
                  "type": "CallExpression",
                  "start": 328,
                  "end": 363,
                  "loc": {
                    "start": {
                      "line": 18,
                      "column": 6
                    },
                    "end": {
                      "line": 18,
                      "column": 41
                    }
                  },
                  "callee": {
                    "type": "ArrowFunctionExpression",
                    "start": 329,
                    "end": 356,
                    "loc": {
                      "start": {
                        "line": 18,
                        "column": 7
                      },
                      "end": {
                        "line": 18,
                        "column": 34
                      }
                    },
                    "id": null,
                    "generator": false,
                    "expression": false,
                    "async": false,
                    "params": [
                      {
                        "type": "Identifier",
                        "start": 330,
                        "end": 331,
                        "loc": {
                          "start": {
                            "line": 18,
                            "column": 8
                          },
                          "end": {
                            "line": 18,
                            "column": 9
                          }
                        },
                        "name": "a"
                      },
                      {
                        "type": "Identifier",
                        "start": 333,
                        "end": 334,
                        "loc": {
                          "start": {
                            "line": 18,
                            "column": 11
                          },
                          "end": {
                            "line": 18,
                            "column": 12
                          }
                        },
                        "name": "b"
                      }
                    ],
                    "body": {
                      "type": "BlockStatement",
                      "start": 339,
                      "end": 356,
                      "loc": {
                        "start": {
                          "line": 18,
                          "column": 17
                        },
                        "end": {
                          "line": 18,
                          "column": 34
                        }
                      },
                      "body": [
                        {
                          "type": "ReturnStatement",
                          "start": 341,
                          "end": 354,
                          "loc": {
                            "start": {
                              "line": 18,
                              "column": 19
                            },
                            "end": {
                              "line": 18,
                              "column": 32
                            }
                          },
                          "argument": {
                            "type": "BinaryExpression",
                            "start": 348,
                            "end": 353,
                            "loc": {
                              "start": {
                                "line": 18,
                                "column": 26
                              },
                              "end": {
                                "line": 18,
                                "column": 31
                              }
                            },
                            "left": {
                              "type": "Identifier",
                              "start": 348,
                              "end": 349,
                              "loc": {
                                "start": {
                                  "line": 18,
                                  "column": 26
                                },
                                "end": {
                                  "line": 18,
                                  "column": 27
                                }
                              },
                              "name": "a"
                            },
                            "operator": "+",
                            "right": {
                              "type": "Identifier",
                              "start": 352,
                              "end": 353,
                              "loc": {
                                "start": {
                                  "line": 18,
                                  "column": 30
                                },
                                "end": {
                                  "line": 18,
                                  "column": 31
                                }
                              },
                              "name": "b"
                            }
                          }
                        }
                      ]
                    }
                  },
                  "arguments": [
                    {
                      "type": "Literal",
                      "start": 358,
                      "end": 359,
                      "loc": {
                        "start": {
                          "line": 18,
                          "column": 36
                        },
                        "end": {
                          "line": 18,
                          "column": 37
                        }
                      },
                      "value": 1,
                      "raw": "1"
                    },
                    {
                      "type": "Literal",
                      "start": 361,
                      "end": 362,
                      "loc": {
                        "start": {
                          "line": 18,
                          "column": 39
                        },
                        "end": {
                          "line": 18,
                          "column": 40
                        }
                      },
                      "value": 5,
                      "raw": "5"
                    }
                  ]
                },
                {
                  "type": "ArrowFunctionExpression",
                  "start": 365,
                  "end": 418,
                  "loc": {
                    "start": {
                      "line": 18,
                      "column": 43
                    },
                    "end": {
                      "line": 20,
                      "column": 7
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 371,
                    "end": 418,
                    "loc": {
                      "start": {
                        "line": 18,
                        "column": 49
                      },
                      "end": {
                        "line": 20,
                        "column": 7
                      }
                    },
                    "body": [
                      {
                        "type": "ExpressionStatement",
                        "start": 381,
                        "end": 410,
                        "loc": {
                          "start": {
                            "line": 19,
                            "column": 8
                          },
                          "end": {
                            "line": 19,
                            "column": 37
                          }
                        },
                        "expression": {
                          "type": "ArrowFunctionExpression",
                          "start": 381,
                          "end": 410,
                          "loc": {
                            "start": {
                              "line": 19,
                              "column": 8
                            },
                            "end": {
                              "line": 19,
                              "column": 37
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": true,
                          "async": true,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 387,
                              "end": 393,
                              "loc": {
                                "start": {
                                  "line": 19,
                                  "column": 14
                                },
                                "end": {
                                  "line": 19,
                                  "column": 20
                                }
                              },
                              "name": "cherow"
                            }
                          ],
                          "body": {
                            "type": "MemberExpression",
                            "start": 397,
                            "end": 410,
                            "loc": {
                              "start": {
                                "line": 19,
                                "column": 24
                              },
                              "end": {
                                "line": 19,
                                "column": 37
                              }
                            },
                            "object": {
                              "type": "MemberExpression",
                              "start": 397,
                              "end": 408,
                              "loc": {
                                "start": {
                                  "line": 19,
                                  "column": 24
                                },
                                "end": {
                                  "line": 19,
                                  "column": 35
                                }
                              },
                              "object": {
                                "type": "MemberExpression",
                                "start": 397,
                                "end": 406,
                                "loc": {
                                  "start": {
                                    "line": 19,
                                    "column": 24
                                  },
                                  "end": {
                                    "line": 19,
                                    "column": 33
                                  }
                                },
                                "object": {
                                  "type": "MemberExpression",
                                  "start": 397,
                                  "end": 404,
                                  "loc": {
                                    "start": {
                                      "line": 19,
                                      "column": 24
                                    },
                                    "end": {
                                      "line": 19,
                                      "column": 31
                                    }
                                  },
                                  "object": {
                                    "type": "MemberExpression",
                                    "start": 397,
                                    "end": 402,
                                    "loc": {
                                      "start": {
                                        "line": 19,
                                        "column": 24
                                      },
                                      "end": {
                                        "line": 19,
                                        "column": 29
                                      }
                                    },
                                    "object": {
                                      "type": "MemberExpression",
                                      "start": 397,
                                      "end": 400,
                                      "loc": {
                                        "start": {
                                          "line": 19,
                                          "column": 24
                                        },
                                        "end": {
                                          "line": 19,
                                          "column": 27
                                        }
                                      },
                                      "object": {
                                        "type": "Identifier",
                                        "start": 397,
                                        "end": 398,
                                        "loc": {
                                          "start": {
                                            "line": 19,
                                            "column": 24
                                          },
                                          "end": {
                                            "line": 19,
                                            "column": 25
                                          }
                                        },
                                        "name": "a"
                                      },
                                      "property": {
                                        "type": "Identifier",
                                        "start": 399,
                                        "end": 400,
                                        "loc": {
                                          "start": {
                                            "line": 19,
                                            "column": 26
                                          },
                                          "end": {
                                            "line": 19,
                                            "column": 27
                                          }
                                        },
                                        "name": "b"
                                      },
                                      "computed": false
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "start": 401,
                                      "end": 402,
                                      "loc": {
                                        "start": {
                                          "line": 19,
                                          "column": 28
                                        },
                                        "end": {
                                          "line": 19,
                                          "column": 29
                                        }
                                      },
                                      "name": "c"
                                    },
                                    "computed": false
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 403,
                                    "end": 404,
                                    "loc": {
                                      "start": {
                                        "line": 19,
                                        "column": 30
                                      },
                                      "end": {
                                        "line": 19,
                                        "column": 31
                                      }
                                    },
                                    "name": "d"
                                  },
                                  "computed": false
                                },
                                "property": {
                                  "type": "Identifier",
                                  "start": 405,
                                  "end": 406,
                                  "loc": {
                                    "start": {
                                      "line": 19,
                                      "column": 32
                                    },
                                    "end": {
                                      "line": 19,
                                      "column": 33
                                    }
                                  },
                                  "name": "e"
                                },
                                "computed": false
                              },
                              "property": {
                                "type": "Identifier",
                                "start": 407,
                                "end": 408,
                                "loc": {
                                  "start": {
                                    "line": 19,
                                    "column": 34
                                  },
                                  "end": {
                                    "line": 19,
                                    "column": 35
                                  }
                                },
                                "name": "f"
                              },
                              "computed": false
                            },
                            "property": {
                              "type": "Identifier",
                              "start": 409,
                              "end": 410,
                              "loc": {
                                "start": {
                                  "line": 19,
                                  "column": 36
                                },
                                "end": {
                                  "line": 19,
                                  "column": 37
                                }
                              },
                              "name": "g"
                            },
                            "computed": false
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 425,
            "end": 462,
            "loc": {
              "start": {
                "line": 21,
                "column": 6
              },
              "end": {
                "line": 23,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 425,
              "end": 462,
              "loc": {
                "start": {
                  "line": 21,
                  "column": 6
                },
                "end": {
                  "line": 23,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 431,
                "end": 462,
                "loc": {
                  "start": {
                    "line": 21,
                    "column": 12
                  },
                  "end": {
                    "line": 23,
                    "column": 7
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 441,
                    "end": 454,
                    "loc": {
                      "start": {
                        "line": 22,
                        "column": 8
                      },
                      "end": {
                        "line": 22,
                        "column": 21
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 441,
                      "end": 454,
                      "loc": {
                        "start": {
                          "line": 22,
                          "column": 8
                        },
                        "end": {
                          "line": 22,
                          "column": 21
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 447,
                          "end": 448,
                          "loc": {
                            "start": {
                              "line": 22,
                              "column": 14
                            },
                            "end": {
                              "line": 22,
                              "column": 15
                            }
                          },
                          "name": "a"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 452,
                        "end": 454,
                        "loc": {
                          "start": {
                            "line": 22,
                            "column": 19
                          },
                          "end": {
                            "line": 22,
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
          },
          {
            "type": "ExpressionStatement",
            "start": 469,
            "end": 477,
            "loc": {
              "start": {
                "line": 24,
                "column": 6
              },
              "end": {
                "line": 24,
                "column": 14
              }
            },
            "expression": {
              "type": "SequenceExpression",
              "start": 471,
              "end": 475,
              "loc": {
                "start": {
                  "line": 24,
                  "column": 8
                },
                "end": {
                  "line": 24,
                  "column": 12
                }
              },
              "expressions": [
                {
                  "type": "Identifier",
                  "start": 471,
                  "end": 472,
                  "loc": {
                    "start": {
                      "line": 24,
                      "column": 8
                    },
                    "end": {
                      "line": 24,
                      "column": 9
                    }
                  },
                  "name": "a"
                },
                {
                  "type": "Identifier",
                  "start": 474,
                  "end": 475,
                  "loc": {
                    "start": {
                      "line": 24,
                      "column": 11
                    },
                    "end": {
                      "line": 24,
                      "column": 12
                    }
                  },
                  "name": "b"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 481,
            "end": 493,
            "loc": {
              "start": {
                "line": 25,
                "column": 3
              },
              "end": {
                "line": 25,
                "column": 15
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 481,
              "end": 493,
              "loc": {
                "start": {
                  "line": 25,
                  "column": 3
                },
                "end": {
                  "line": 25,
                  "column": 15
                }
              },
              "operator": "=",
              "left": {
                "type": "Identifier",
                "start": 481,
                "end": 482,
                "loc": {
                  "start": {
                    "line": 25,
                    "column": 3
                  },
                  "end": {
                    "line": 25,
                    "column": 4
                  }
                },
                "name": "a"
              },
              "right": {
                "type": "ArrowFunctionExpression",
                "start": 485,
                "end": 493,
                "loc": {
                  "start": {
                    "line": 25,
                    "column": 7
                  },
                  "end": {
                    "line": 25,
                    "column": 15
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [],
                "body": {
                  "type": "BlockStatement",
                  "start": 491,
                  "end": 493,
                  "loc": {
                    "start": {
                      "line": 25,
                      "column": 13
                    },
                    "end": {
                      "line": 25,
                      "column": 15
                    }
                  },
                  "body": []
                }
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 500,
            "end": 508,
            "loc": {
              "start": {
                "line": 26,
                "column": 6
              },
              "end": {
                "line": 26,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 500,
              "end": 508,
              "loc": {
                "start": {
                  "line": 26,
                  "column": 6
                },
                "end": {
                  "line": 26,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 506,
                "end": 508,
                "loc": {
                  "start": {
                    "line": 26,
                    "column": 12
                  },
                  "end": {
                    "line": 26,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 515,
            "end": 561,
            "loc": {
              "start": {
                "line": 27,
                "column": 6
              },
              "end": {
                "line": 28,
                "column": 28
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 515,
              "end": 561,
              "loc": {
                "start": {
                  "line": 27,
                  "column": 6
                },
                "end": {
                  "line": 28,
                  "column": 28
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 521,
                  "end": 527,
                  "loc": {
                    "start": {
                      "line": 27,
                      "column": 12
                    },
                    "end": {
                      "line": 27,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "CallExpression",
                "start": 531,
                "end": 561,
                "loc": {
                  "start": {
                    "line": 27,
                    "column": 22
                  },
                  "end": {
                    "line": 28,
                    "column": 28
                  }
                },
                "callee": {
                  "type": "CallExpression",
                  "start": 531,
                  "end": 558,
                  "loc": {
                    "start": {
                      "line": 27,
                      "column": 22
                    },
                    "end": {
                      "line": 28,
                      "column": 25
                    }
                  },
                  "callee": {
                    "type": "Identifier",
                    "start": 531,
                    "end": 532,
                    "loc": {
                      "start": {
                        "line": 27,
                        "column": 22
                      },
                      "end": {
                        "line": 27,
                        "column": 23
                      }
                    },
                    "name": "a"
                  },
                  "arguments": [
                    {
                      "type": "ArrowFunctionExpression",
                      "start": 540,
                      "end": 557,
                      "loc": {
                        "start": {
                          "line": 28,
                          "column": 7
                        },
                        "end": {
                          "line": 28,
                          "column": 24
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": true,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 546,
                          "end": 552,
                          "loc": {
                            "start": {
                              "line": 28,
                              "column": 13
                            },
                            "end": {
                              "line": 28,
                              "column": 19
                            }
                          },
                          "name": "cherow"
                        }
                      ],
                      "body": {
                        "type": "Identifier",
                        "start": 556,
                        "end": 557,
                        "loc": {
                          "start": {
                            "line": 28,
                            "column": 23
                          },
                          "end": {
                            "line": 28,
                            "column": 24
                          }
                        },
                        "name": "a"
                      }
                    }
                  ]
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 559,
                    "end": 560,
                    "loc": {
                      "start": {
                        "line": 28,
                        "column": 26
                      },
                      "end": {
                        "line": 28,
                        "column": 27
                      }
                    },
                    "name": "b"
                  }
                ]
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex #17', () => {
      expect(parseScript(`() => {}
      () => {}
       cherow => a.b()()()((b => {})())()()()()(a,b)
      a => {}
         cherow => a.b()()()((b => {})())()()()()(a,b)`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 145,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 54
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 15,
            "end": 23,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 15,
              "end": 23,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 12
                  },
                  "end": {
                    "line": 2,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 31,
            "end": 76,
            "loc": {
              "start": {
                "line": 3,
                "column": 7
              },
              "end": {
                "line": 3,
                "column": 52
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 31,
              "end": 76,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 7
                },
                "end": {
                  "line": 3,
                  "column": 52
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 31,
                  "end": 37,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 7
                    },
                    "end": {
                      "line": 3,
                      "column": 13
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "CallExpression",
                "start": 41,
                "end": 76,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 17
                  },
                  "end": {
                    "line": 3,
                    "column": 52
                  }
                },
                "callee": {
                  "type": "CallExpression",
                  "start": 41,
                  "end": 71,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 17
                    },
                    "end": {
                      "line": 3,
                      "column": 47
                    }
                  },
                  "callee": {
                    "type": "CallExpression",
                    "start": 41,
                    "end": 69,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 17
                      },
                      "end": {
                        "line": 3,
                        "column": 45
                      }
                    },
                    "callee": {
                      "type": "CallExpression",
                      "start": 41,
                      "end": 67,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 17
                        },
                        "end": {
                          "line": 3,
                          "column": 43
                        }
                      },
                      "callee": {
                        "type": "CallExpression",
                        "start": 41,
                        "end": 65,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 17
                          },
                          "end": {
                            "line": 3,
                            "column": 41
                          }
                        },
                        "callee": {
                          "type": "CallExpression",
                          "start": 41,
                          "end": 63,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 17
                            },
                            "end": {
                              "line": 3,
                              "column": 39
                            }
                          },
                          "callee": {
                            "type": "CallExpression",
                            "start": 41,
                            "end": 50,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 17
                              },
                              "end": {
                                "line": 3,
                                "column": 26
                              }
                            },
                            "callee": {
                              "type": "CallExpression",
                              "start": 41,
                              "end": 48,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 17
                                },
                                "end": {
                                  "line": 3,
                                  "column": 24
                                }
                              },
                              "callee": {
                                "type": "CallExpression",
                                "start": 41,
                                "end": 46,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 17
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 22
                                  }
                                },
                                "callee": {
                                  "type": "MemberExpression",
                                  "start": 41,
                                  "end": 44,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 17
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 20
                                    }
                                  },
                                  "object": {
                                    "type": "Identifier",
                                    "start": 41,
                                    "end": 42,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 17
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 18
                                      }
                                    },
                                    "name": "a"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 43,
                                    "end": 44,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 19
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 20
                                      }
                                    },
                                    "name": "b"
                                  },
                                  "computed": false
                                },
                                "arguments": []
                              },
                              "arguments": []
                            },
                            "arguments": []
                          },
                          "arguments": [
                            {
                              "type": "CallExpression",
                              "start": 51,
                              "end": 62,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 27
                                },
                                "end": {
                                  "line": 3,
                                  "column": 38
                                }
                              },
                              "callee": {
                                "type": "ArrowFunctionExpression",
                                "start": 52,
                                "end": 59,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 28
                                  },
                                  "end": {
                                    "line": 3,
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
                                    "start": 52,
                                    "end": 53,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 28
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 29
                                      }
                                    },
                                    "name": "b"
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 57,
                                  "end": 59,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 33
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 35
                                    }
                                  },
                                  "body": []
                                }
                              },
                              "arguments": []
                            }
                          ]
                        },
                        "arguments": []
                      },
                      "arguments": []
                    },
                    "arguments": []
                  },
                  "arguments": []
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 72,
                    "end": 73,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 48
                      },
                      "end": {
                        "line": 3,
                        "column": 49
                      }
                    },
                    "name": "a"
                  },
                  {
                    "type": "Identifier",
                    "start": 74,
                    "end": 75,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 50
                      },
                      "end": {
                        "line": 3,
                        "column": 51
                      }
                    },
                    "name": "b"
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 83,
            "end": 90,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 4,
                "column": 13
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 83,
              "end": 90,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 4,
                  "column": 13
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 83,
                  "end": 84,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 6
                    },
                    "end": {
                      "line": 4,
                      "column": 7
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 88,
                "end": 90,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 11
                  },
                  "end": {
                    "line": 4,
                    "column": 13
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 100,
            "end": 145,
            "loc": {
              "start": {
                "line": 5,
                "column": 9
              },
              "end": {
                "line": 5,
                "column": 54
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 100,
              "end": 145,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 9
                },
                "end": {
                  "line": 5,
                  "column": 54
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 100,
                  "end": 106,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 9
                    },
                    "end": {
                      "line": 5,
                      "column": 15
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "CallExpression",
                "start": 110,
                "end": 145,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 19
                  },
                  "end": {
                    "line": 5,
                    "column": 54
                  }
                },
                "callee": {
                  "type": "CallExpression",
                  "start": 110,
                  "end": 140,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 19
                    },
                    "end": {
                      "line": 5,
                      "column": 49
                    }
                  },
                  "callee": {
                    "type": "CallExpression",
                    "start": 110,
                    "end": 138,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 19
                      },
                      "end": {
                        "line": 5,
                        "column": 47
                      }
                    },
                    "callee": {
                      "type": "CallExpression",
                      "start": 110,
                      "end": 136,
                      "loc": {
                        "start": {
                          "line": 5,
                          "column": 19
                        },
                        "end": {
                          "line": 5,
                          "column": 45
                        }
                      },
                      "callee": {
                        "type": "CallExpression",
                        "start": 110,
                        "end": 134,
                        "loc": {
                          "start": {
                            "line": 5,
                            "column": 19
                          },
                          "end": {
                            "line": 5,
                            "column": 43
                          }
                        },
                        "callee": {
                          "type": "CallExpression",
                          "start": 110,
                          "end": 132,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 19
                            },
                            "end": {
                              "line": 5,
                              "column": 41
                            }
                          },
                          "callee": {
                            "type": "CallExpression",
                            "start": 110,
                            "end": 119,
                            "loc": {
                              "start": {
                                "line": 5,
                                "column": 19
                              },
                              "end": {
                                "line": 5,
                                "column": 28
                              }
                            },
                            "callee": {
                              "type": "CallExpression",
                              "start": 110,
                              "end": 117,
                              "loc": {
                                "start": {
                                  "line": 5,
                                  "column": 19
                                },
                                "end": {
                                  "line": 5,
                                  "column": 26
                                }
                              },
                              "callee": {
                                "type": "CallExpression",
                                "start": 110,
                                "end": 115,
                                "loc": {
                                  "start": {
                                    "line": 5,
                                    "column": 19
                                  },
                                  "end": {
                                    "line": 5,
                                    "column": 24
                                  }
                                },
                                "callee": {
                                  "type": "MemberExpression",
                                  "start": 110,
                                  "end": 113,
                                  "loc": {
                                    "start": {
                                      "line": 5,
                                      "column": 19
                                    },
                                    "end": {
                                      "line": 5,
                                      "column": 22
                                    }
                                  },
                                  "object": {
                                    "type": "Identifier",
                                    "start": 110,
                                    "end": 111,
                                    "loc": {
                                      "start": {
                                        "line": 5,
                                        "column": 19
                                      },
                                      "end": {
                                        "line": 5,
                                        "column": 20
                                      }
                                    },
                                    "name": "a"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 112,
                                    "end": 113,
                                    "loc": {
                                      "start": {
                                        "line": 5,
                                        "column": 21
                                      },
                                      "end": {
                                        "line": 5,
                                        "column": 22
                                      }
                                    },
                                    "name": "b"
                                  },
                                  "computed": false
                                },
                                "arguments": []
                              },
                              "arguments": []
                            },
                            "arguments": []
                          },
                          "arguments": [
                            {
                              "type": "CallExpression",
                              "start": 120,
                              "end": 131,
                              "loc": {
                                "start": {
                                  "line": 5,
                                  "column": 29
                                },
                                "end": {
                                  "line": 5,
                                  "column": 40
                                }
                              },
                              "callee": {
                                "type": "ArrowFunctionExpression",
                                "start": 121,
                                "end": 128,
                                "loc": {
                                  "start": {
                                    "line": 5,
                                    "column": 30
                                  },
                                  "end": {
                                    "line": 5,
                                    "column": 37
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [
                                  {
                                    "type": "Identifier",
                                    "start": 121,
                                    "end": 122,
                                    "loc": {
                                      "start": {
                                        "line": 5,
                                        "column": 30
                                      },
                                      "end": {
                                        "line": 5,
                                        "column": 31
                                      }
                                    },
                                    "name": "b"
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 126,
                                  "end": 128,
                                  "loc": {
                                    "start": {
                                      "line": 5,
                                      "column": 35
                                    },
                                    "end": {
                                      "line": 5,
                                      "column": 37
                                    }
                                  },
                                  "body": []
                                }
                              },
                              "arguments": []
                            }
                          ]
                        },
                        "arguments": []
                      },
                      "arguments": []
                    },
                    "arguments": []
                  },
                  "arguments": []
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 141,
                    "end": 142,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 50
                      },
                      "end": {
                        "line": 5,
                        "column": 51
                      }
                    },
                    "name": "a"
                  },
                  {
                    "type": "Identifier",
                    "start": 143,
                    "end": 144,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 52
                      },
                      "end": {
                        "line": 5,
                        "column": 53
                      }
                    },
                    "name": "b"
                  }
                ]
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex #17', () => {
      expect(parseScript(`() => {}
      () => {}
       cherow => a.b()()()((b => {})())()()()()(a,b)
      a => {
       return f.call(b, a => {
       return f.call(b, a);
      });
      }`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 166,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 7
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 15,
            "end": 23,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 15,
              "end": 23,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 12
                  },
                  "end": {
                    "line": 2,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 31,
            "end": 76,
            "loc": {
              "start": {
                "line": 3,
                "column": 7
              },
              "end": {
                "line": 3,
                "column": 52
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 31,
              "end": 76,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 7
                },
                "end": {
                  "line": 3,
                  "column": 52
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 31,
                  "end": 37,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 7
                    },
                    "end": {
                      "line": 3,
                      "column": 13
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "CallExpression",
                "start": 41,
                "end": 76,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 17
                  },
                  "end": {
                    "line": 3,
                    "column": 52
                  }
                },
                "callee": {
                  "type": "CallExpression",
                  "start": 41,
                  "end": 71,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 17
                    },
                    "end": {
                      "line": 3,
                      "column": 47
                    }
                  },
                  "callee": {
                    "type": "CallExpression",
                    "start": 41,
                    "end": 69,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 17
                      },
                      "end": {
                        "line": 3,
                        "column": 45
                      }
                    },
                    "callee": {
                      "type": "CallExpression",
                      "start": 41,
                      "end": 67,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 17
                        },
                        "end": {
                          "line": 3,
                          "column": 43
                        }
                      },
                      "callee": {
                        "type": "CallExpression",
                        "start": 41,
                        "end": 65,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 17
                          },
                          "end": {
                            "line": 3,
                            "column": 41
                          }
                        },
                        "callee": {
                          "type": "CallExpression",
                          "start": 41,
                          "end": 63,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 17
                            },
                            "end": {
                              "line": 3,
                              "column": 39
                            }
                          },
                          "callee": {
                            "type": "CallExpression",
                            "start": 41,
                            "end": 50,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 17
                              },
                              "end": {
                                "line": 3,
                                "column": 26
                              }
                            },
                            "callee": {
                              "type": "CallExpression",
                              "start": 41,
                              "end": 48,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 17
                                },
                                "end": {
                                  "line": 3,
                                  "column": 24
                                }
                              },
                              "callee": {
                                "type": "CallExpression",
                                "start": 41,
                                "end": 46,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 17
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 22
                                  }
                                },
                                "callee": {
                                  "type": "MemberExpression",
                                  "start": 41,
                                  "end": 44,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 17
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 20
                                    }
                                  },
                                  "object": {
                                    "type": "Identifier",
                                    "start": 41,
                                    "end": 42,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 17
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 18
                                      }
                                    },
                                    "name": "a"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 43,
                                    "end": 44,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 19
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 20
                                      }
                                    },
                                    "name": "b"
                                  },
                                  "computed": false
                                },
                                "arguments": []
                              },
                              "arguments": []
                            },
                            "arguments": []
                          },
                          "arguments": [
                            {
                              "type": "CallExpression",
                              "start": 51,
                              "end": 62,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 27
                                },
                                "end": {
                                  "line": 3,
                                  "column": 38
                                }
                              },
                              "callee": {
                                "type": "ArrowFunctionExpression",
                                "start": 52,
                                "end": 59,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 28
                                  },
                                  "end": {
                                    "line": 3,
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
                                    "start": 52,
                                    "end": 53,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 28
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 29
                                      }
                                    },
                                    "name": "b"
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 57,
                                  "end": 59,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 33
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 35
                                    }
                                  },
                                  "body": []
                                }
                              },
                              "arguments": []
                            }
                          ]
                        },
                        "arguments": []
                      },
                      "arguments": []
                    },
                    "arguments": []
                  },
                  "arguments": []
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 72,
                    "end": 73,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 48
                      },
                      "end": {
                        "line": 3,
                        "column": 49
                      }
                    },
                    "name": "a"
                  },
                  {
                    "type": "Identifier",
                    "start": 74,
                    "end": 75,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 50
                      },
                      "end": {
                        "line": 3,
                        "column": 51
                      }
                    },
                    "name": "b"
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 83,
            "end": 166,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 8,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 83,
              "end": 166,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 8,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 83,
                  "end": 84,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 6
                    },
                    "end": {
                      "line": 4,
                      "column": 7
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 88,
                "end": 166,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 11
                  },
                  "end": {
                    "line": 8,
                    "column": 7
                  }
                },
                "body": [
                  {
                    "type": "ReturnStatement",
                    "start": 97,
                    "end": 158,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 7
                      },
                      "end": {
                        "line": 7,
                        "column": 9
                      }
                    },
                    "argument": {
                      "type": "CallExpression",
                      "start": 104,
                      "end": 157,
                      "loc": {
                        "start": {
                          "line": 5,
                          "column": 14
                        },
                        "end": {
                          "line": 7,
                          "column": 8
                        }
                      },
                      "callee": {
                        "type": "MemberExpression",
                        "start": 104,
                        "end": 110,
                        "loc": {
                          "start": {
                            "line": 5,
                            "column": 14
                          },
                          "end": {
                            "line": 5,
                            "column": 20
                          }
                        },
                        "object": {
                          "type": "Identifier",
                          "start": 104,
                          "end": 105,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 14
                            },
                            "end": {
                              "line": 5,
                              "column": 15
                            }
                          },
                          "name": "f"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 106,
                          "end": 110,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 16
                            },
                            "end": {
                              "line": 5,
                              "column": 20
                            }
                          },
                          "name": "call"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "Identifier",
                          "start": 111,
                          "end": 112,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 21
                            },
                            "end": {
                              "line": 5,
                              "column": 22
                            }
                          },
                          "name": "b"
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 114,
                          "end": 156,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 24
                            },
                            "end": {
                              "line": 7,
                              "column": 7
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 114,
                              "end": 115,
                              "loc": {
                                "start": {
                                  "line": 5,
                                  "column": 24
                                },
                                "end": {
                                  "line": 5,
                                  "column": 25
                                }
                              },
                              "name": "a"
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 119,
                            "end": 156,
                            "loc": {
                              "start": {
                                "line": 5,
                                "column": 29
                              },
                              "end": {
                                "line": 7,
                                "column": 7
                              }
                            },
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 128,
                                "end": 148,
                                "loc": {
                                  "start": {
                                    "line": 6,
                                    "column": 7
                                  },
                                  "end": {
                                    "line": 6,
                                    "column": 27
                                  }
                                },
                                "argument": {
                                  "type": "CallExpression",
                                  "start": 135,
                                  "end": 147,
                                  "loc": {
                                    "start": {
                                      "line": 6,
                                      "column": 14
                                    },
                                    "end": {
                                      "line": 6,
                                      "column": 26
                                    }
                                  },
                                  "callee": {
                                    "type": "MemberExpression",
                                    "start": 135,
                                    "end": 141,
                                    "loc": {
                                      "start": {
                                        "line": 6,
                                        "column": 14
                                      },
                                      "end": {
                                        "line": 6,
                                        "column": 20
                                      }
                                    },
                                    "object": {
                                      "type": "Identifier",
                                      "start": 135,
                                      "end": 136,
                                      "loc": {
                                        "start": {
                                          "line": 6,
                                          "column": 14
                                        },
                                        "end": {
                                          "line": 6,
                                          "column": 15
                                        }
                                      },
                                      "name": "f"
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "start": 137,
                                      "end": 141,
                                      "loc": {
                                        "start": {
                                          "line": 6,
                                          "column": 16
                                        },
                                        "end": {
                                          "line": 6,
                                          "column": 20
                                        }
                                      },
                                      "name": "call"
                                    },
                                    "computed": false
                                  },
                                  "arguments": [
                                    {
                                      "type": "Identifier",
                                      "start": 142,
                                      "end": 143,
                                      "loc": {
                                        "start": {
                                          "line": 6,
                                          "column": 21
                                        },
                                        "end": {
                                          "line": 6,
                                          "column": 22
                                        }
                                      },
                                      "name": "b"
                                    },
                                    {
                                      "type": "Identifier",
                                      "start": 145,
                                      "end": 146,
                                      "loc": {
                                        "start": {
                                          "line": 6,
                                          "column": 24
                                        },
                                        "end": {
                                          "line": 6,
                                          "column": 25
                                        }
                                      },
                                      "name": "a"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
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

 

    it('should parse complex #17', () => {
      expect(parseScript(`() => {}
      async () => {}
            () => {}
            async () => {}
            () => {}
             cherow => a.b()()()((b => {})())()()()()(a,b)
            a => {
             return f.call(b, a => {
             return f.call(b, a);
            });
            }
            
            (a => {})()`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 314,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 23
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 15,
            "end": 29,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 15,
              "end": 29,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 27,
                "end": 29,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 18
                  },
                  "end": {
                    "line": 2,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 42,
            "end": 50,
            "loc": {
              "start": {
                "line": 3,
                "column": 12
              },
              "end": {
                "line": 3,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 42,
              "end": 50,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 12
                },
                "end": {
                  "line": 3,
                  "column": 20
                }
              },
              "id": null,
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
                    "line": 3,
                    "column": 18
                  },
                  "end": {
                    "line": 3,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 63,
            "end": 77,
            "loc": {
              "start": {
                "line": 4,
                "column": 12
              },
              "end": {
                "line": 4,
                "column": 26
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 63,
              "end": 77,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 12
                },
                "end": {
                  "line": 4,
                  "column": 26
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 75,
                "end": 77,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 24
                  },
                  "end": {
                    "line": 4,
                    "column": 26
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 90,
            "end": 98,
            "loc": {
              "start": {
                "line": 5,
                "column": 12
              },
              "end": {
                "line": 5,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 90,
              "end": 98,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 12
                },
                "end": {
                  "line": 5,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 96,
                "end": 98,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 18
                  },
                  "end": {
                    "line": 5,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 112,
            "end": 157,
            "loc": {
              "start": {
                "line": 6,
                "column": 13
              },
              "end": {
                "line": 6,
                "column": 58
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 112,
              "end": 157,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 13
                },
                "end": {
                  "line": 6,
                  "column": 58
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 112,
                  "end": 118,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 13
                    },
                    "end": {
                      "line": 6,
                      "column": 19
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "CallExpression",
                "start": 122,
                "end": 157,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 23
                  },
                  "end": {
                    "line": 6,
                    "column": 58
                  }
                },
                "callee": {
                  "type": "CallExpression",
                  "start": 122,
                  "end": 152,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 23
                    },
                    "end": {
                      "line": 6,
                      "column": 53
                    }
                  },
                  "callee": {
                    "type": "CallExpression",
                    "start": 122,
                    "end": 150,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 23
                      },
                      "end": {
                        "line": 6,
                        "column": 51
                      }
                    },
                    "callee": {
                      "type": "CallExpression",
                      "start": 122,
                      "end": 148,
                      "loc": {
                        "start": {
                          "line": 6,
                          "column": 23
                        },
                        "end": {
                          "line": 6,
                          "column": 49
                        }
                      },
                      "callee": {
                        "type": "CallExpression",
                        "start": 122,
                        "end": 146,
                        "loc": {
                          "start": {
                            "line": 6,
                            "column": 23
                          },
                          "end": {
                            "line": 6,
                            "column": 47
                          }
                        },
                        "callee": {
                          "type": "CallExpression",
                          "start": 122,
                          "end": 144,
                          "loc": {
                            "start": {
                              "line": 6,
                              "column": 23
                            },
                            "end": {
                              "line": 6,
                              "column": 45
                            }
                          },
                          "callee": {
                            "type": "CallExpression",
                            "start": 122,
                            "end": 131,
                            "loc": {
                              "start": {
                                "line": 6,
                                "column": 23
                              },
                              "end": {
                                "line": 6,
                                "column": 32
                              }
                            },
                            "callee": {
                              "type": "CallExpression",
                              "start": 122,
                              "end": 129,
                              "loc": {
                                "start": {
                                  "line": 6,
                                  "column": 23
                                },
                                "end": {
                                  "line": 6,
                                  "column": 30
                                }
                              },
                              "callee": {
                                "type": "CallExpression",
                                "start": 122,
                                "end": 127,
                                "loc": {
                                  "start": {
                                    "line": 6,
                                    "column": 23
                                  },
                                  "end": {
                                    "line": 6,
                                    "column": 28
                                  }
                                },
                                "callee": {
                                  "type": "MemberExpression",
                                  "start": 122,
                                  "end": 125,
                                  "loc": {
                                    "start": {
                                      "line": 6,
                                      "column": 23
                                    },
                                    "end": {
                                      "line": 6,
                                      "column": 26
                                    }
                                  },
                                  "object": {
                                    "type": "Identifier",
                                    "start": 122,
                                    "end": 123,
                                    "loc": {
                                      "start": {
                                        "line": 6,
                                        "column": 23
                                      },
                                      "end": {
                                        "line": 6,
                                        "column": 24
                                      }
                                    },
                                    "name": "a"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 124,
                                    "end": 125,
                                    "loc": {
                                      "start": {
                                        "line": 6,
                                        "column": 25
                                      },
                                      "end": {
                                        "line": 6,
                                        "column": 26
                                      }
                                    },
                                    "name": "b"
                                  },
                                  "computed": false
                                },
                                "arguments": []
                              },
                              "arguments": []
                            },
                            "arguments": []
                          },
                          "arguments": [
                            {
                              "type": "CallExpression",
                              "start": 132,
                              "end": 143,
                              "loc": {
                                "start": {
                                  "line": 6,
                                  "column": 33
                                },
                                "end": {
                                  "line": 6,
                                  "column": 44
                                }
                              },
                              "callee": {
                                "type": "ArrowFunctionExpression",
                                "start": 133,
                                "end": 140,
                                "loc": {
                                  "start": {
                                    "line": 6,
                                    "column": 34
                                  },
                                  "end": {
                                    "line": 6,
                                    "column": 41
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [
                                  {
                                    "type": "Identifier",
                                    "start": 133,
                                    "end": 134,
                                    "loc": {
                                      "start": {
                                        "line": 6,
                                        "column": 34
                                      },
                                      "end": {
                                        "line": 6,
                                        "column": 35
                                      }
                                    },
                                    "name": "b"
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 138,
                                  "end": 140,
                                  "loc": {
                                    "start": {
                                      "line": 6,
                                      "column": 39
                                    },
                                    "end": {
                                      "line": 6,
                                      "column": 41
                                    }
                                  },
                                  "body": []
                                }
                              },
                              "arguments": []
                            }
                          ]
                        },
                        "arguments": []
                      },
                      "arguments": []
                    },
                    "arguments": []
                  },
                  "arguments": []
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 153,
                    "end": 154,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 54
                      },
                      "end": {
                        "line": 6,
                        "column": 55
                      }
                    },
                    "name": "a"
                  },
                  {
                    "type": "Identifier",
                    "start": 155,
                    "end": 156,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 56
                      },
                      "end": {
                        "line": 6,
                        "column": 57
                      }
                    },
                    "name": "b"
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 170,
            "end": 277,
            "loc": {
              "start": {
                "line": 7,
                "column": 12
              },
              "end": {
                "line": 11,
                "column": 13
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 170,
              "end": 277,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 12
                },
                "end": {
                  "line": 11,
                  "column": 13
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 170,
                  "end": 171,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 12
                    },
                    "end": {
                      "line": 7,
                      "column": 13
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 175,
                "end": 277,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 17
                  },
                  "end": {
                    "line": 11,
                    "column": 13
                  }
                },
                "body": [
                  {
                    "type": "ReturnStatement",
                    "start": 190,
                    "end": 263,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 13
                      },
                      "end": {
                        "line": 10,
                        "column": 15
                      }
                    },
                    "argument": {
                      "type": "CallExpression",
                      "start": 197,
                      "end": 262,
                      "loc": {
                        "start": {
                          "line": 8,
                          "column": 20
                        },
                        "end": {
                          "line": 10,
                          "column": 14
                        }
                      },
                      "callee": {
                        "type": "MemberExpression",
                        "start": 197,
                        "end": 203,
                        "loc": {
                          "start": {
                            "line": 8,
                            "column": 20
                          },
                          "end": {
                            "line": 8,
                            "column": 26
                          }
                        },
                        "object": {
                          "type": "Identifier",
                          "start": 197,
                          "end": 198,
                          "loc": {
                            "start": {
                              "line": 8,
                              "column": 20
                            },
                            "end": {
                              "line": 8,
                              "column": 21
                            }
                          },
                          "name": "f"
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 199,
                          "end": 203,
                          "loc": {
                            "start": {
                              "line": 8,
                              "column": 22
                            },
                            "end": {
                              "line": 8,
                              "column": 26
                            }
                          },
                          "name": "call"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "Identifier",
                          "start": 204,
                          "end": 205,
                          "loc": {
                            "start": {
                              "line": 8,
                              "column": 27
                            },
                            "end": {
                              "line": 8,
                              "column": 28
                            }
                          },
                          "name": "b"
                        },
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 207,
                          "end": 261,
                          "loc": {
                            "start": {
                              "line": 8,
                              "column": 30
                            },
                            "end": {
                              "line": 10,
                              "column": 13
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 207,
                              "end": 208,
                              "loc": {
                                "start": {
                                  "line": 8,
                                  "column": 30
                                },
                                "end": {
                                  "line": 8,
                                  "column": 31
                                }
                              },
                              "name": "a"
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 212,
                            "end": 261,
                            "loc": {
                              "start": {
                                "line": 8,
                                "column": 35
                              },
                              "end": {
                                "line": 10,
                                "column": 13
                              }
                            },
                            "body": [
                              {
                                "type": "ReturnStatement",
                                "start": 227,
                                "end": 247,
                                "loc": {
                                  "start": {
                                    "line": 9,
                                    "column": 13
                                  },
                                  "end": {
                                    "line": 9,
                                    "column": 33
                                  }
                                },
                                "argument": {
                                  "type": "CallExpression",
                                  "start": 234,
                                  "end": 246,
                                  "loc": {
                                    "start": {
                                      "line": 9,
                                      "column": 20
                                    },
                                    "end": {
                                      "line": 9,
                                      "column": 32
                                    }
                                  },
                                  "callee": {
                                    "type": "MemberExpression",
                                    "start": 234,
                                    "end": 240,
                                    "loc": {
                                      "start": {
                                        "line": 9,
                                        "column": 20
                                      },
                                      "end": {
                                        "line": 9,
                                        "column": 26
                                      }
                                    },
                                    "object": {
                                      "type": "Identifier",
                                      "start": 234,
                                      "end": 235,
                                      "loc": {
                                        "start": {
                                          "line": 9,
                                          "column": 20
                                        },
                                        "end": {
                                          "line": 9,
                                          "column": 21
                                        }
                                      },
                                      "name": "f"
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "start": 236,
                                      "end": 240,
                                      "loc": {
                                        "start": {
                                          "line": 9,
                                          "column": 22
                                        },
                                        "end": {
                                          "line": 9,
                                          "column": 26
                                        }
                                      },
                                      "name": "call"
                                    },
                                    "computed": false
                                  },
                                  "arguments": [
                                    {
                                      "type": "Identifier",
                                      "start": 241,
                                      "end": 242,
                                      "loc": {
                                        "start": {
                                          "line": 9,
                                          "column": 27
                                        },
                                        "end": {
                                          "line": 9,
                                          "column": 28
                                        }
                                      },
                                      "name": "b"
                                    },
                                    {
                                      "type": "Identifier",
                                      "start": 244,
                                      "end": 245,
                                      "loc": {
                                        "start": {
                                          "line": 9,
                                          "column": 30
                                        },
                                        "end": {
                                          "line": 9,
                                          "column": 31
                                        }
                                      },
                                      "name": "a"
                                    }
                                  ]
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 303,
            "end": 314,
            "loc": {
              "start": {
                "line": 13,
                "column": 12
              },
              "end": {
                "line": 13,
                "column": 23
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 303,
              "end": 314,
              "loc": {
                "start": {
                  "line": 13,
                  "column": 12
                },
                "end": {
                  "line": 13,
                  "column": 23
                }
              },
              "callee": {
                "type": "ArrowFunctionExpression",
                "start": 304,
                "end": 311,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 13
                  },
                  "end": {
                    "line": 13,
                    "column": 20
                  }
                },
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
                "params": [
                  {
                    "type": "Identifier",
                    "start": 304,
                    "end": 305,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 13
                      },
                      "end": {
                        "line": 13,
                        "column": 14
                      }
                    },
                    "name": "a"
                  }
                ],
                "body": {
                  "type": "BlockStatement",
                  "start": 309,
                  "end": 311,
                  "loc": {
                    "start": {
                      "line": 13,
                      "column": 18
                    },
                    "end": {
                      "line": 13,
                      "column": 20
                    }
                  },
                  "body": []
                }
              },
              "arguments": []
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex #18', () => {
      expect(parseScript(`async () => {}
      async () => {}
      async () => {}
      async () => {}
      async () => {}
      async cherow => {}
      async cherow => {}
      async cherow => {}
      async cherow => {}
      async cherow => {}
      () => {}
      () => {}
      () => {}
      () => {}
      (() => {})().abc.call("Hello")`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 320,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 36
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 21,
            "end": 35,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 21,
              "end": 35,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 33,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 18
                  },
                  "end": {
                    "line": 2,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 42,
            "end": 56,
            "loc": {
              "start": {
                "line": 3,
                "column": 6
              },
              "end": {
                "line": 3,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 42,
              "end": 56,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 6
                },
                "end": {
                  "line": 3,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 54,
                "end": 56,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 18
                  },
                  "end": {
                    "line": 3,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 63,
            "end": 77,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 4,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 63,
              "end": 77,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 4,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 75,
                "end": 77,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 18
                  },
                  "end": {
                    "line": 4,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 84,
            "end": 98,
            "loc": {
              "start": {
                "line": 5,
                "column": 6
              },
              "end": {
                "line": 5,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 84,
              "end": 98,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 6
                },
                "end": {
                  "line": 5,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 96,
                "end": 98,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 18
                  },
                  "end": {
                    "line": 5,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 105,
            "end": 123,
            "loc": {
              "start": {
                "line": 6,
                "column": 6
              },
              "end": {
                "line": 6,
                "column": 24
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 105,
              "end": 123,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 6
                },
                "end": {
                  "line": 6,
                  "column": 24
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 111,
                  "end": 117,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 12
                    },
                    "end": {
                      "line": 6,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 121,
                "end": 123,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 22
                  },
                  "end": {
                    "line": 6,
                    "column": 24
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 130,
            "end": 148,
            "loc": {
              "start": {
                "line": 7,
                "column": 6
              },
              "end": {
                "line": 7,
                "column": 24
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 130,
              "end": 148,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 6
                },
                "end": {
                  "line": 7,
                  "column": 24
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 136,
                  "end": 142,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 12
                    },
                    "end": {
                      "line": 7,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 146,
                "end": 148,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 22
                  },
                  "end": {
                    "line": 7,
                    "column": 24
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 155,
            "end": 173,
            "loc": {
              "start": {
                "line": 8,
                "column": 6
              },
              "end": {
                "line": 8,
                "column": 24
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 155,
              "end": 173,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 6
                },
                "end": {
                  "line": 8,
                  "column": 24
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 161,
                  "end": 167,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 12
                    },
                    "end": {
                      "line": 8,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 171,
                "end": 173,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 22
                  },
                  "end": {
                    "line": 8,
                    "column": 24
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 180,
            "end": 198,
            "loc": {
              "start": {
                "line": 9,
                "column": 6
              },
              "end": {
                "line": 9,
                "column": 24
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 180,
              "end": 198,
              "loc": {
                "start": {
                  "line": 9,
                  "column": 6
                },
                "end": {
                  "line": 9,
                  "column": 24
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 186,
                  "end": 192,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 12
                    },
                    "end": {
                      "line": 9,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 196,
                "end": 198,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 22
                  },
                  "end": {
                    "line": 9,
                    "column": 24
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 205,
            "end": 223,
            "loc": {
              "start": {
                "line": 10,
                "column": 6
              },
              "end": {
                "line": 10,
                "column": 24
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 205,
              "end": 223,
              "loc": {
                "start": {
                  "line": 10,
                  "column": 6
                },
                "end": {
                  "line": 10,
                  "column": 24
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 211,
                  "end": 217,
                  "loc": {
                    "start": {
                      "line": 10,
                      "column": 12
                    },
                    "end": {
                      "line": 10,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 221,
                "end": 223,
                "loc": {
                  "start": {
                    "line": 10,
                    "column": 22
                  },
                  "end": {
                    "line": 10,
                    "column": 24
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 230,
            "end": 238,
            "loc": {
              "start": {
                "line": 11,
                "column": 6
              },
              "end": {
                "line": 11,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 230,
              "end": 238,
              "loc": {
                "start": {
                  "line": 11,
                  "column": 6
                },
                "end": {
                  "line": 11,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 236,
                "end": 238,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 12
                  },
                  "end": {
                    "line": 11,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 245,
            "end": 253,
            "loc": {
              "start": {
                "line": 12,
                "column": 6
              },
              "end": {
                "line": 12,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 245,
              "end": 253,
              "loc": {
                "start": {
                  "line": 12,
                  "column": 6
                },
                "end": {
                  "line": 12,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 251,
                "end": 253,
                "loc": {
                  "start": {
                    "line": 12,
                    "column": 12
                  },
                  "end": {
                    "line": 12,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 260,
            "end": 268,
            "loc": {
              "start": {
                "line": 13,
                "column": 6
              },
              "end": {
                "line": 13,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 260,
              "end": 268,
              "loc": {
                "start": {
                  "line": 13,
                  "column": 6
                },
                "end": {
                  "line": 13,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 266,
                "end": 268,
                "loc": {
                  "start": {
                    "line": 13,
                    "column": 12
                  },
                  "end": {
                    "line": 13,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 275,
            "end": 283,
            "loc": {
              "start": {
                "line": 14,
                "column": 6
              },
              "end": {
                "line": 14,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 275,
              "end": 283,
              "loc": {
                "start": {
                  "line": 14,
                  "column": 6
                },
                "end": {
                  "line": 14,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 281,
                "end": 283,
                "loc": {
                  "start": {
                    "line": 14,
                    "column": 12
                  },
                  "end": {
                    "line": 14,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 290,
            "end": 320,
            "loc": {
              "start": {
                "line": 15,
                "column": 6
              },
              "end": {
                "line": 15,
                "column": 36
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 290,
              "end": 320,
              "loc": {
                "start": {
                  "line": 15,
                  "column": 6
                },
                "end": {
                  "line": 15,
                  "column": 36
                }
              },
              "callee": {
                "type": "MemberExpression",
                "start": 290,
                "end": 311,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 6
                  },
                  "end": {
                    "line": 15,
                    "column": 27
                  }
                },
                "object": {
                  "type": "MemberExpression",
                  "start": 290,
                  "end": 306,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 6
                    },
                    "end": {
                      "line": 15,
                      "column": 22
                    }
                  },
                  "object": {
                    "type": "CallExpression",
                    "start": 290,
                    "end": 302,
                    "loc": {
                      "start": {
                        "line": 15,
                        "column": 6
                      },
                      "end": {
                        "line": 15,
                        "column": 18
                      }
                    },
                    "callee": {
                      "type": "ArrowFunctionExpression",
                      "start": 291,
                      "end": 299,
                      "loc": {
                        "start": {
                          "line": 15,
                          "column": 7
                        },
                        "end": {
                          "line": 15,
                          "column": 15
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 297,
                        "end": 299,
                        "loc": {
                          "start": {
                            "line": 15,
                            "column": 13
                          },
                          "end": {
                            "line": 15,
                            "column": 15
                          }
                        },
                        "body": []
                      }
                    },
                    "arguments": []
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 303,
                    "end": 306,
                    "loc": {
                      "start": {
                        "line": 15,
                        "column": 19
                      },
                      "end": {
                        "line": 15,
                        "column": 22
                      }
                    },
                    "name": "abc"
                  },
                  "computed": false
                },
                "property": {
                  "type": "Identifier",
                  "start": 307,
                  "end": 311,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 23
                    },
                    "end": {
                      "line": 15,
                      "column": 27
                    }
                  },
                  "name": "call"
                },
                "computed": false
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 312,
                  "end": 319,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 28
                    },
                    "end": {
                      "line": 15,
                      "column": 35
                    }
                  },
                  "value": "Hello",
                  "raw": "\"Hello\""
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex #19', () => {
      expect(parseScript(`async () => {}
      async () => {}
      async () => {}
      async () => {}
      async () => {}
      async cherow => {}
      async cherow => {}
      async cherow => {}
      async cherow => {
      async cherow => {}
      async cherow => {}
      async cherow => {}
      async cherow => {}
      }
      async cherow => {}
      () => {
        (() => {})().abc.call("Hello")
        (() => {})().abc.call("Hello")
        (() => {})().abc.call("Hello")
      }
      () => {}
      () => {}
      () => {}
      (() => {})().abc.call("Hello")`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 551,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 36
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 21,
            "end": 35,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 21,
              "end": 35,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 33,
                "end": 35,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 18
                  },
                  "end": {
                    "line": 2,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 42,
            "end": 56,
            "loc": {
              "start": {
                "line": 3,
                "column": 6
              },
              "end": {
                "line": 3,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 42,
              "end": 56,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 6
                },
                "end": {
                  "line": 3,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 54,
                "end": 56,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 18
                  },
                  "end": {
                    "line": 3,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 63,
            "end": 77,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 4,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 63,
              "end": 77,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 4,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 75,
                "end": 77,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 18
                  },
                  "end": {
                    "line": 4,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 84,
            "end": 98,
            "loc": {
              "start": {
                "line": 5,
                "column": 6
              },
              "end": {
                "line": 5,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 84,
              "end": 98,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 6
                },
                "end": {
                  "line": 5,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 96,
                "end": 98,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 18
                  },
                  "end": {
                    "line": 5,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 105,
            "end": 123,
            "loc": {
              "start": {
                "line": 6,
                "column": 6
              },
              "end": {
                "line": 6,
                "column": 24
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 105,
              "end": 123,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 6
                },
                "end": {
                  "line": 6,
                  "column": 24
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 111,
                  "end": 117,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 12
                    },
                    "end": {
                      "line": 6,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 121,
                "end": 123,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 22
                  },
                  "end": {
                    "line": 6,
                    "column": 24
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 130,
            "end": 148,
            "loc": {
              "start": {
                "line": 7,
                "column": 6
              },
              "end": {
                "line": 7,
                "column": 24
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 130,
              "end": 148,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 6
                },
                "end": {
                  "line": 7,
                  "column": 24
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 136,
                  "end": 142,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 12
                    },
                    "end": {
                      "line": 7,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 146,
                "end": 148,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 22
                  },
                  "end": {
                    "line": 7,
                    "column": 24
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 155,
            "end": 173,
            "loc": {
              "start": {
                "line": 8,
                "column": 6
              },
              "end": {
                "line": 8,
                "column": 24
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 155,
              "end": 173,
              "loc": {
                "start": {
                  "line": 8,
                  "column": 6
                },
                "end": {
                  "line": 8,
                  "column": 24
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 161,
                  "end": 167,
                  "loc": {
                    "start": {
                      "line": 8,
                      "column": 12
                    },
                    "end": {
                      "line": 8,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 171,
                "end": 173,
                "loc": {
                  "start": {
                    "line": 8,
                    "column": 22
                  },
                  "end": {
                    "line": 8,
                    "column": 24
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 180,
            "end": 305,
            "loc": {
              "start": {
                "line": 9,
                "column": 6
              },
              "end": {
                "line": 14,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 180,
              "end": 305,
              "loc": {
                "start": {
                  "line": 9,
                  "column": 6
                },
                "end": {
                  "line": 14,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 186,
                  "end": 192,
                  "loc": {
                    "start": {
                      "line": 9,
                      "column": 12
                    },
                    "end": {
                      "line": 9,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 196,
                "end": 305,
                "loc": {
                  "start": {
                    "line": 9,
                    "column": 22
                  },
                  "end": {
                    "line": 14,
                    "column": 7
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 204,
                    "end": 222,
                    "loc": {
                      "start": {
                        "line": 10,
                        "column": 6
                      },
                      "end": {
                        "line": 10,
                        "column": 24
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 204,
                      "end": 222,
                      "loc": {
                        "start": {
                          "line": 10,
                          "column": 6
                        },
                        "end": {
                          "line": 10,
                          "column": 24
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 210,
                          "end": 216,
                          "loc": {
                            "start": {
                              "line": 10,
                              "column": 12
                            },
                            "end": {
                              "line": 10,
                              "column": 18
                            }
                          },
                          "name": "cherow"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 220,
                        "end": 222,
                        "loc": {
                          "start": {
                            "line": 10,
                            "column": 22
                          },
                          "end": {
                            "line": 10,
                            "column": 24
                          }
                        },
                        "body": []
                      }
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 229,
                    "end": 247,
                    "loc": {
                      "start": {
                        "line": 11,
                        "column": 6
                      },
                      "end": {
                        "line": 11,
                        "column": 24
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 229,
                      "end": 247,
                      "loc": {
                        "start": {
                          "line": 11,
                          "column": 6
                        },
                        "end": {
                          "line": 11,
                          "column": 24
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 235,
                          "end": 241,
                          "loc": {
                            "start": {
                              "line": 11,
                              "column": 12
                            },
                            "end": {
                              "line": 11,
                              "column": 18
                            }
                          },
                          "name": "cherow"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 245,
                        "end": 247,
                        "loc": {
                          "start": {
                            "line": 11,
                            "column": 22
                          },
                          "end": {
                            "line": 11,
                            "column": 24
                          }
                        },
                        "body": []
                      }
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 254,
                    "end": 272,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 6
                      },
                      "end": {
                        "line": 12,
                        "column": 24
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 254,
                      "end": 272,
                      "loc": {
                        "start": {
                          "line": 12,
                          "column": 6
                        },
                        "end": {
                          "line": 12,
                          "column": 24
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 260,
                          "end": 266,
                          "loc": {
                            "start": {
                              "line": 12,
                              "column": 12
                            },
                            "end": {
                              "line": 12,
                              "column": 18
                            }
                          },
                          "name": "cherow"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 270,
                        "end": 272,
                        "loc": {
                          "start": {
                            "line": 12,
                            "column": 22
                          },
                          "end": {
                            "line": 12,
                            "column": 24
                          }
                        },
                        "body": []
                      }
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 279,
                    "end": 297,
                    "loc": {
                      "start": {
                        "line": 13,
                        "column": 6
                      },
                      "end": {
                        "line": 13,
                        "column": 24
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 279,
                      "end": 297,
                      "loc": {
                        "start": {
                          "line": 13,
                          "column": 6
                        },
                        "end": {
                          "line": 13,
                          "column": 24
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": true,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 285,
                          "end": 291,
                          "loc": {
                            "start": {
                              "line": 13,
                              "column": 12
                            },
                            "end": {
                              "line": 13,
                              "column": 18
                            }
                          },
                          "name": "cherow"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 295,
                        "end": 297,
                        "loc": {
                          "start": {
                            "line": 13,
                            "column": 22
                          },
                          "end": {
                            "line": 13,
                            "column": 24
                          }
                        },
                        "body": []
                      }
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 312,
            "end": 330,
            "loc": {
              "start": {
                "line": 15,
                "column": 6
              },
              "end": {
                "line": 15,
                "column": 24
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 312,
              "end": 330,
              "loc": {
                "start": {
                  "line": 15,
                  "column": 6
                },
                "end": {
                  "line": 15,
                  "column": 24
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [
                {
                  "type": "Identifier",
                  "start": 318,
                  "end": 324,
                  "loc": {
                    "start": {
                      "line": 15,
                      "column": 12
                    },
                    "end": {
                      "line": 15,
                      "column": 18
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 328,
                "end": 330,
                "loc": {
                  "start": {
                    "line": 15,
                    "column": 22
                  },
                  "end": {
                    "line": 15,
                    "column": 24
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 337,
            "end": 469,
            "loc": {
              "start": {
                "line": 16,
                "column": 6
              },
              "end": {
                "line": 20,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 337,
              "end": 469,
              "loc": {
                "start": {
                  "line": 16,
                  "column": 6
                },
                "end": {
                  "line": 20,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 343,
                "end": 469,
                "loc": {
                  "start": {
                    "line": 16,
                    "column": 12
                  },
                  "end": {
                    "line": 20,
                    "column": 7
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 353,
                    "end": 461,
                    "loc": {
                      "start": {
                        "line": 17,
                        "column": 8
                      },
                      "end": {
                        "line": 19,
                        "column": 38
                      }
                    },
                    "expression": {
                      "type": "CallExpression",
                      "start": 353,
                      "end": 461,
                      "loc": {
                        "start": {
                          "line": 17,
                          "column": 8
                        },
                        "end": {
                          "line": 19,
                          "column": 38
                        }
                      },
                      "callee": {
                        "type": "MemberExpression",
                        "start": 353,
                        "end": 452,
                        "loc": {
                          "start": {
                            "line": 17,
                            "column": 8
                          },
                          "end": {
                            "line": 19,
                            "column": 29
                          }
                        },
                        "object": {
                          "type": "MemberExpression",
                          "start": 353,
                          "end": 447,
                          "loc": {
                            "start": {
                              "line": 17,
                              "column": 8
                            },
                            "end": {
                              "line": 19,
                              "column": 24
                            }
                          },
                          "object": {
                            "type": "CallExpression",
                            "start": 353,
                            "end": 443,
                            "loc": {
                              "start": {
                                "line": 17,
                                "column": 8
                              },
                              "end": {
                                "line": 19,
                                "column": 20
                              }
                            },
                            "callee": {
                              "type": "CallExpression",
                              "start": 353,
                              "end": 441,
                              "loc": {
                                "start": {
                                  "line": 17,
                                  "column": 8
                                },
                                "end": {
                                  "line": 19,
                                  "column": 18
                                }
                              },
                              "callee": {
                                "type": "CallExpression",
                                "start": 353,
                                "end": 422,
                                "loc": {
                                  "start": {
                                    "line": 17,
                                    "column": 8
                                  },
                                  "end": {
                                    "line": 18,
                                    "column": 38
                                  }
                                },
                                "callee": {
                                  "type": "MemberExpression",
                                  "start": 353,
                                  "end": 413,
                                  "loc": {
                                    "start": {
                                      "line": 17,
                                      "column": 8
                                    },
                                    "end": {
                                      "line": 18,
                                      "column": 29
                                    }
                                  },
                                  "object": {
                                    "type": "MemberExpression",
                                    "start": 353,
                                    "end": 408,
                                    "loc": {
                                      "start": {
                                        "line": 17,
                                        "column": 8
                                      },
                                      "end": {
                                        "line": 18,
                                        "column": 24
                                      }
                                    },
                                    "object": {
                                      "type": "CallExpression",
                                      "start": 353,
                                      "end": 404,
                                      "loc": {
                                        "start": {
                                          "line": 17,
                                          "column": 8
                                        },
                                        "end": {
                                          "line": 18,
                                          "column": 20
                                        }
                                      },
                                      "callee": {
                                        "type": "CallExpression",
                                        "start": 353,
                                        "end": 402,
                                        "loc": {
                                          "start": {
                                            "line": 17,
                                            "column": 8
                                          },
                                          "end": {
                                            "line": 18,
                                            "column": 18
                                          }
                                        },
                                        "callee": {
                                          "type": "CallExpression",
                                          "start": 353,
                                          "end": 383,
                                          "loc": {
                                            "start": {
                                              "line": 17,
                                              "column": 8
                                            },
                                            "end": {
                                              "line": 17,
                                              "column": 38
                                            }
                                          },
                                          "callee": {
                                            "type": "MemberExpression",
                                            "start": 353,
                                            "end": 374,
                                            "loc": {
                                              "start": {
                                                "line": 17,
                                                "column": 8
                                              },
                                              "end": {
                                                "line": 17,
                                                "column": 29
                                              }
                                            },
                                            "object": {
                                              "type": "MemberExpression",
                                              "start": 353,
                                              "end": 369,
                                              "loc": {
                                                "start": {
                                                  "line": 17,
                                                  "column": 8
                                                },
                                                "end": {
                                                  "line": 17,
                                                  "column": 24
                                                }
                                              },
                                              "object": {
                                                "type": "CallExpression",
                                                "start": 353,
                                                "end": 365,
                                                "loc": {
                                                  "start": {
                                                    "line": 17,
                                                    "column": 8
                                                  },
                                                  "end": {
                                                    "line": 17,
                                                    "column": 20
                                                  }
                                                },
                                                "callee": {
                                                  "type": "ArrowFunctionExpression",
                                                  "start": 354,
                                                  "end": 362,
                                                  "loc": {
                                                    "start": {
                                                      "line": 17,
                                                      "column": 9
                                                    },
                                                    "end": {
                                                      "line": 17,
                                                      "column": 17
                                                    }
                                                  },
                                                  "id": null,
                                                  "generator": false,
                                                  "expression": false,
                                                  "async": false,
                                                  "params": [],
                                                  "body": {
                                                    "type": "BlockStatement",
                                                    "start": 360,
                                                    "end": 362,
                                                    "loc": {
                                                      "start": {
                                                        "line": 17,
                                                        "column": 15
                                                      },
                                                      "end": {
                                                        "line": 17,
                                                        "column": 17
                                                      }
                                                    },
                                                    "body": []
                                                  }
                                                },
                                                "arguments": []
                                              },
                                              "property": {
                                                "type": "Identifier",
                                                "start": 366,
                                                "end": 369,
                                                "loc": {
                                                  "start": {
                                                    "line": 17,
                                                    "column": 21
                                                  },
                                                  "end": {
                                                    "line": 17,
                                                    "column": 24
                                                  }
                                                },
                                                "name": "abc"
                                              },
                                              "computed": false
                                            },
                                            "property": {
                                              "type": "Identifier",
                                              "start": 370,
                                              "end": 374,
                                              "loc": {
                                                "start": {
                                                  "line": 17,
                                                  "column": 25
                                                },
                                                "end": {
                                                  "line": 17,
                                                  "column": 29
                                                }
                                              },
                                              "name": "call"
                                            },
                                            "computed": false
                                          },
                                          "arguments": [
                                            {
                                              "type": "Literal",
                                              "start": 375,
                                              "end": 382,
                                              "loc": {
                                                "start": {
                                                  "line": 17,
                                                  "column": 30
                                                },
                                                "end": {
                                                  "line": 17,
                                                  "column": 37
                                                }
                                              },
                                              "value": "Hello",
                                              "raw": "\"Hello\""
                                            }
                                          ]
                                        },
                                        "arguments": [
                                          {
                                            "type": "ArrowFunctionExpression",
                                            "start": 393,
                                            "end": 401,
                                            "loc": {
                                              "start": {
                                                "line": 18,
                                                "column": 9
                                              },
                                              "end": {
                                                "line": 18,
                                                "column": 17
                                              }
                                            },
                                            "id": null,
                                            "generator": false,
                                            "expression": false,
                                            "async": false,
                                            "params": [],
                                            "body": {
                                              "type": "BlockStatement",
                                              "start": 399,
                                              "end": 401,
                                              "loc": {
                                                "start": {
                                                  "line": 18,
                                                  "column": 15
                                                },
                                                "end": {
                                                  "line": 18,
                                                  "column": 17
                                                }
                                              },
                                              "body": []
                                            }
                                          }
                                        ]
                                      },
                                      "arguments": []
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "start": 405,
                                      "end": 408,
                                      "loc": {
                                        "start": {
                                          "line": 18,
                                          "column": 21
                                        },
                                        "end": {
                                          "line": 18,
                                          "column": 24
                                        }
                                      },
                                      "name": "abc"
                                    },
                                    "computed": false
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 409,
                                    "end": 413,
                                    "loc": {
                                      "start": {
                                        "line": 18,
                                        "column": 25
                                      },
                                      "end": {
                                        "line": 18,
                                        "column": 29
                                      }
                                    },
                                    "name": "call"
                                  },
                                  "computed": false
                                },
                                "arguments": [
                                  {
                                    "type": "Literal",
                                    "start": 414,
                                    "end": 421,
                                    "loc": {
                                      "start": {
                                        "line": 18,
                                        "column": 30
                                      },
                                      "end": {
                                        "line": 18,
                                        "column": 37
                                      }
                                    },
                                    "value": "Hello",
                                    "raw": "\"Hello\""
                                  }
                                ]
                              },
                              "arguments": [
                                {
                                  "type": "ArrowFunctionExpression",
                                  "start": 432,
                                  "end": 440,
                                  "loc": {
                                    "start": {
                                      "line": 19,
                                      "column": 9
                                    },
                                    "end": {
                                      "line": 19,
                                      "column": 17
                                    }
                                  },
                                  "id": null,
                                  "generator": false,
                                  "expression": false,
                                  "async": false,
                                  "params": [],
                                  "body": {
                                    "type": "BlockStatement",
                                    "start": 438,
                                    "end": 440,
                                    "loc": {
                                      "start": {
                                        "line": 19,
                                        "column": 15
                                      },
                                      "end": {
                                        "line": 19,
                                        "column": 17
                                      }
                                    },
                                    "body": []
                                  }
                                }
                              ]
                            },
                            "arguments": []
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 444,
                            "end": 447,
                            "loc": {
                              "start": {
                                "line": 19,
                                "column": 21
                              },
                              "end": {
                                "line": 19,
                                "column": 24
                              }
                            },
                            "name": "abc"
                          },
                          "computed": false
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 448,
                          "end": 452,
                          "loc": {
                            "start": {
                              "line": 19,
                              "column": 25
                            },
                            "end": {
                              "line": 19,
                              "column": 29
                            }
                          },
                          "name": "call"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "Literal",
                          "start": 453,
                          "end": 460,
                          "loc": {
                            "start": {
                              "line": 19,
                              "column": 30
                            },
                            "end": {
                              "line": 19,
                              "column": 37
                            }
                          },
                          "value": "Hello",
                          "raw": "\"Hello\""
                        }
                      ]
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 476,
            "end": 484,
            "loc": {
              "start": {
                "line": 21,
                "column": 6
              },
              "end": {
                "line": 21,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 476,
              "end": 484,
              "loc": {
                "start": {
                  "line": 21,
                  "column": 6
                },
                "end": {
                  "line": 21,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 482,
                "end": 484,
                "loc": {
                  "start": {
                    "line": 21,
                    "column": 12
                  },
                  "end": {
                    "line": 21,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 491,
            "end": 499,
            "loc": {
              "start": {
                "line": 22,
                "column": 6
              },
              "end": {
                "line": 22,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 491,
              "end": 499,
              "loc": {
                "start": {
                  "line": 22,
                  "column": 6
                },
                "end": {
                  "line": 22,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 497,
                "end": 499,
                "loc": {
                  "start": {
                    "line": 22,
                    "column": 12
                  },
                  "end": {
                    "line": 22,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 506,
            "end": 514,
            "loc": {
              "start": {
                "line": 23,
                "column": 6
              },
              "end": {
                "line": 23,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 506,
              "end": 514,
              "loc": {
                "start": {
                  "line": 23,
                  "column": 6
                },
                "end": {
                  "line": 23,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 512,
                "end": 514,
                "loc": {
                  "start": {
                    "line": 23,
                    "column": 12
                  },
                  "end": {
                    "line": 23,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 521,
            "end": 551,
            "loc": {
              "start": {
                "line": 24,
                "column": 6
              },
              "end": {
                "line": 24,
                "column": 36
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 521,
              "end": 551,
              "loc": {
                "start": {
                  "line": 24,
                  "column": 6
                },
                "end": {
                  "line": 24,
                  "column": 36
                }
              },
              "callee": {
                "type": "MemberExpression",
                "start": 521,
                "end": 542,
                "loc": {
                  "start": {
                    "line": 24,
                    "column": 6
                  },
                  "end": {
                    "line": 24,
                    "column": 27
                  }
                },
                "object": {
                  "type": "MemberExpression",
                  "start": 521,
                  "end": 537,
                  "loc": {
                    "start": {
                      "line": 24,
                      "column": 6
                    },
                    "end": {
                      "line": 24,
                      "column": 22
                    }
                  },
                  "object": {
                    "type": "CallExpression",
                    "start": 521,
                    "end": 533,
                    "loc": {
                      "start": {
                        "line": 24,
                        "column": 6
                      },
                      "end": {
                        "line": 24,
                        "column": 18
                      }
                    },
                    "callee": {
                      "type": "ArrowFunctionExpression",
                      "start": 522,
                      "end": 530,
                      "loc": {
                        "start": {
                          "line": 24,
                          "column": 7
                        },
                        "end": {
                          "line": 24,
                          "column": 15
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 528,
                        "end": 530,
                        "loc": {
                          "start": {
                            "line": 24,
                            "column": 13
                          },
                          "end": {
                            "line": 24,
                            "column": 15
                          }
                        },
                        "body": []
                      }
                    },
                    "arguments": []
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 534,
                    "end": 537,
                    "loc": {
                      "start": {
                        "line": 24,
                        "column": 19
                      },
                      "end": {
                        "line": 24,
                        "column": 22
                      }
                    },
                    "name": "abc"
                  },
                  "computed": false
                },
                "property": {
                  "type": "Identifier",
                  "start": 538,
                  "end": 542,
                  "loc": {
                    "start": {
                      "line": 24,
                      "column": 23
                    },
                    "end": {
                      "line": 24,
                      "column": 27
                    }
                  },
                  "name": "call"
                },
                "computed": false
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 543,
                  "end": 550,
                  "loc": {
                    "start": {
                      "line": 24,
                      "column": 28
                    },
                    "end": {
                      "line": 24,
                      "column": 35
                    }
                  },
                  "value": "Hello",
                  "raw": "\"Hello\""
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse complex #19', () => {
      expect(parseScript(`a.b.c = (() => {})
      async () => {}
      async () => {}
      async () => {}
      async () => {}
      a.b.c = (() => {})( (() => {})().abc.call("Hello"))
       cherow => {
      (() => {})().abc.call("Hello")
      }
      cherow => {}
       cherow => {
       cherow => {
       cherow => {}
      }
      (a)(b).c.d.e(
        a => {
        (a) => {
        (a)(b).c.d.e()
        }
        }
      )
      }
      a => {
      b => {}
       cherow => {}
       cherow => {
       (() => {
        (() => {})().abc.call("Hello")
       })().abc.call("Hello")
      }
       cherow => {}
      }
       cherow => {}
      () => {
        (() => {})().abc.call("Hello")
        (() => {})().abc.call("Hello")
        (() => {})().abc.call("Hello")
      }
      () => {}
      () => {}
      () => {}
      (() => {})().abc.call("Hello")`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 848,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 42,
            "column": 36
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
                "type": "MemberExpression",
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
                "object": {
                  "type": "MemberExpression",
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
                  "object": {
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
                  },
                  "property": {
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
                    "name": "b"
                  },
                  "computed": false
                },
                "property": {
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
                  "name": "c"
                },
                "computed": false
              },
              "right": {
                "type": "ArrowFunctionExpression",
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
                "id": null,
                "generator": false,
                "expression": false,
                "async": false,
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
          },
          {
            "type": "ExpressionStatement",
            "start": 25,
            "end": 39,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 25,
              "end": 39,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 37,
                "end": 39,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 18
                  },
                  "end": {
                    "line": 2,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 46,
            "end": 60,
            "loc": {
              "start": {
                "line": 3,
                "column": 6
              },
              "end": {
                "line": 3,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 46,
              "end": 60,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 6
                },
                "end": {
                  "line": 3,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 58,
                "end": 60,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 18
                  },
                  "end": {
                    "line": 3,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 67,
            "end": 81,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 4,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 67,
              "end": 81,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 4,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 79,
                "end": 81,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 18
                  },
                  "end": {
                    "line": 4,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 88,
            "end": 102,
            "loc": {
              "start": {
                "line": 5,
                "column": 6
              },
              "end": {
                "line": 5,
                "column": 20
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 88,
              "end": 102,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 6
                },
                "end": {
                  "line": 5,
                  "column": 20
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": true,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 100,
                "end": 102,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 18
                  },
                  "end": {
                    "line": 5,
                    "column": 20
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 109,
            "end": 160,
            "loc": {
              "start": {
                "line": 6,
                "column": 6
              },
              "end": {
                "line": 6,
                "column": 57
              }
            },
            "expression": {
              "type": "AssignmentExpression",
              "start": 109,
              "end": 160,
              "loc": {
                "start": {
                  "line": 6,
                  "column": 6
                },
                "end": {
                  "line": 6,
                  "column": 57
                }
              },
              "operator": "=",
              "left": {
                "type": "MemberExpression",
                "start": 109,
                "end": 114,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 6
                  },
                  "end": {
                    "line": 6,
                    "column": 11
                  }
                },
                "object": {
                  "type": "MemberExpression",
                  "start": 109,
                  "end": 112,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 6
                    },
                    "end": {
                      "line": 6,
                      "column": 9
                    }
                  },
                  "object": {
                    "type": "Identifier",
                    "start": 109,
                    "end": 110,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 6
                      },
                      "end": {
                        "line": 6,
                        "column": 7
                      }
                    },
                    "name": "a"
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 111,
                    "end": 112,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 8
                      },
                      "end": {
                        "line": 6,
                        "column": 9
                      }
                    },
                    "name": "b"
                  },
                  "computed": false
                },
                "property": {
                  "type": "Identifier",
                  "start": 113,
                  "end": 114,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 10
                    },
                    "end": {
                      "line": 6,
                      "column": 11
                    }
                  },
                  "name": "c"
                },
                "computed": false
              },
              "right": {
                "type": "CallExpression",
                "start": 117,
                "end": 160,
                "loc": {
                  "start": {
                    "line": 6,
                    "column": 14
                  },
                  "end": {
                    "line": 6,
                    "column": 57
                  }
                },
                "callee": {
                  "type": "ArrowFunctionExpression",
                  "start": 118,
                  "end": 126,
                  "loc": {
                    "start": {
                      "line": 6,
                      "column": 15
                    },
                    "end": {
                      "line": 6,
                      "column": 23
                    }
                  },
                  "id": null,
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                    "type": "BlockStatement",
                    "start": 124,
                    "end": 126,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 21
                      },
                      "end": {
                        "line": 6,
                        "column": 23
                      }
                    },
                    "body": []
                  }
                },
                "arguments": [
                  {
                    "type": "CallExpression",
                    "start": 129,
                    "end": 159,
                    "loc": {
                      "start": {
                        "line": 6,
                        "column": 26
                      },
                      "end": {
                        "line": 6,
                        "column": 56
                      }
                    },
                    "callee": {
                      "type": "MemberExpression",
                      "start": 129,
                      "end": 150,
                      "loc": {
                        "start": {
                          "line": 6,
                          "column": 26
                        },
                        "end": {
                          "line": 6,
                          "column": 47
                        }
                      },
                      "object": {
                        "type": "MemberExpression",
                        "start": 129,
                        "end": 145,
                        "loc": {
                          "start": {
                            "line": 6,
                            "column": 26
                          },
                          "end": {
                            "line": 6,
                            "column": 42
                          }
                        },
                        "object": {
                          "type": "CallExpression",
                          "start": 129,
                          "end": 141,
                          "loc": {
                            "start": {
                              "line": 6,
                              "column": 26
                            },
                            "end": {
                              "line": 6,
                              "column": 38
                            }
                          },
                          "callee": {
                            "type": "ArrowFunctionExpression",
                            "start": 130,
                            "end": 138,
                            "loc": {
                              "start": {
                                "line": 6,
                                "column": 27
                              },
                              "end": {
                                "line": 6,
                                "column": 35
                              }
                            },
                            "id": null,
                            "generator": false,
                            "expression": false,
                            "async": false,
                            "params": [],
                            "body": {
                              "type": "BlockStatement",
                              "start": 136,
                              "end": 138,
                              "loc": {
                                "start": {
                                  "line": 6,
                                  "column": 33
                                },
                                "end": {
                                  "line": 6,
                                  "column": 35
                                }
                              },
                              "body": []
                            }
                          },
                          "arguments": []
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 142,
                          "end": 145,
                          "loc": {
                            "start": {
                              "line": 6,
                              "column": 39
                            },
                            "end": {
                              "line": 6,
                              "column": 42
                            }
                          },
                          "name": "abc"
                        },
                        "computed": false
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 146,
                        "end": 150,
                        "loc": {
                          "start": {
                            "line": 6,
                            "column": 43
                          },
                          "end": {
                            "line": 6,
                            "column": 47
                          }
                        },
                        "name": "call"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "Literal",
                        "start": 151,
                        "end": 158,
                        "loc": {
                          "start": {
                            "line": 6,
                            "column": 48
                          },
                          "end": {
                            "line": 6,
                            "column": 55
                          }
                        },
                        "value": "Hello",
                        "raw": "\"Hello\""
                      }
                    ]
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 168,
            "end": 224,
            "loc": {
              "start": {
                "line": 7,
                "column": 7
              },
              "end": {
                "line": 9,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 168,
              "end": 224,
              "loc": {
                "start": {
                  "line": 7,
                  "column": 7
                },
                "end": {
                  "line": 9,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 168,
                  "end": 174,
                  "loc": {
                    "start": {
                      "line": 7,
                      "column": 7
                    },
                    "end": {
                      "line": 7,
                      "column": 13
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 178,
                "end": 224,
                "loc": {
                  "start": {
                    "line": 7,
                    "column": 17
                  },
                  "end": {
                    "line": 9,
                    "column": 7
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 186,
                    "end": 216,
                    "loc": {
                      "start": {
                        "line": 8,
                        "column": 6
                      },
                      "end": {
                        "line": 8,
                        "column": 36
                      }
                    },
                    "expression": {
                      "type": "CallExpression",
                      "start": 186,
                      "end": 216,
                      "loc": {
                        "start": {
                          "line": 8,
                          "column": 6
                        },
                        "end": {
                          "line": 8,
                          "column": 36
                        }
                      },
                      "callee": {
                        "type": "MemberExpression",
                        "start": 186,
                        "end": 207,
                        "loc": {
                          "start": {
                            "line": 8,
                            "column": 6
                          },
                          "end": {
                            "line": 8,
                            "column": 27
                          }
                        },
                        "object": {
                          "type": "MemberExpression",
                          "start": 186,
                          "end": 202,
                          "loc": {
                            "start": {
                              "line": 8,
                              "column": 6
                            },
                            "end": {
                              "line": 8,
                              "column": 22
                            }
                          },
                          "object": {
                            "type": "CallExpression",
                            "start": 186,
                            "end": 198,
                            "loc": {
                              "start": {
                                "line": 8,
                                "column": 6
                              },
                              "end": {
                                "line": 8,
                                "column": 18
                              }
                            },
                            "callee": {
                              "type": "ArrowFunctionExpression",
                              "start": 187,
                              "end": 195,
                              "loc": {
                                "start": {
                                  "line": 8,
                                  "column": 7
                                },
                                "end": {
                                  "line": 8,
                                  "column": 15
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                "type": "BlockStatement",
                                "start": 193,
                                "end": 195,
                                "loc": {
                                  "start": {
                                    "line": 8,
                                    "column": 13
                                  },
                                  "end": {
                                    "line": 8,
                                    "column": 15
                                  }
                                },
                                "body": []
                              }
                            },
                            "arguments": []
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 199,
                            "end": 202,
                            "loc": {
                              "start": {
                                "line": 8,
                                "column": 19
                              },
                              "end": {
                                "line": 8,
                                "column": 22
                              }
                            },
                            "name": "abc"
                          },
                          "computed": false
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 203,
                          "end": 207,
                          "loc": {
                            "start": {
                              "line": 8,
                              "column": 23
                            },
                            "end": {
                              "line": 8,
                              "column": 27
                            }
                          },
                          "name": "call"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "Literal",
                          "start": 208,
                          "end": 215,
                          "loc": {
                            "start": {
                              "line": 8,
                              "column": 28
                            },
                            "end": {
                              "line": 8,
                              "column": 35
                            }
                          },
                          "value": "Hello",
                          "raw": "\"Hello\""
                        }
                      ]
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 231,
            "end": 243,
            "loc": {
              "start": {
                "line": 10,
                "column": 6
              },
              "end": {
                "line": 10,
                "column": 18
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 231,
              "end": 243,
              "loc": {
                "start": {
                  "line": 10,
                  "column": 6
                },
                "end": {
                  "line": 10,
                  "column": 18
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 231,
                  "end": 237,
                  "loc": {
                    "start": {
                      "line": 10,
                      "column": 6
                    },
                    "end": {
                      "line": 10,
                      "column": 12
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 241,
                "end": 243,
                "loc": {
                  "start": {
                    "line": 10,
                    "column": 16
                  },
                  "end": {
                    "line": 10,
                    "column": 18
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 251,
            "end": 420,
            "loc": {
              "start": {
                "line": 11,
                "column": 7
              },
              "end": {
                "line": 22,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 251,
              "end": 420,
              "loc": {
                "start": {
                  "line": 11,
                  "column": 7
                },
                "end": {
                  "line": 22,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 251,
                  "end": 257,
                  "loc": {
                    "start": {
                      "line": 11,
                      "column": 7
                    },
                    "end": {
                      "line": 11,
                      "column": 13
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 261,
                "end": 420,
                "loc": {
                  "start": {
                    "line": 11,
                    "column": 17
                  },
                  "end": {
                    "line": 22,
                    "column": 7
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 270,
                    "end": 309,
                    "loc": {
                      "start": {
                        "line": 12,
                        "column": 7
                      },
                      "end": {
                        "line": 14,
                        "column": 7
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 270,
                      "end": 309,
                      "loc": {
                        "start": {
                          "line": 12,
                          "column": 7
                        },
                        "end": {
                          "line": 14,
                          "column": 7
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 270,
                          "end": 276,
                          "loc": {
                            "start": {
                              "line": 12,
                              "column": 7
                            },
                            "end": {
                              "line": 12,
                              "column": 13
                            }
                          },
                          "name": "cherow"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 280,
                        "end": 309,
                        "loc": {
                          "start": {
                            "line": 12,
                            "column": 17
                          },
                          "end": {
                            "line": 14,
                            "column": 7
                          }
                        },
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 289,
                            "end": 301,
                            "loc": {
                              "start": {
                                "line": 13,
                                "column": 7
                              },
                              "end": {
                                "line": 13,
                                "column": 19
                              }
                            },
                            "expression": {
                              "type": "ArrowFunctionExpression",
                              "start": 289,
                              "end": 301,
                              "loc": {
                                "start": {
                                  "line": 13,
                                  "column": 7
                                },
                                "end": {
                                  "line": 13,
                                  "column": 19
                                }
                              },
                              "id": null,
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [
                                {
                                  "type": "Identifier",
                                  "start": 289,
                                  "end": 295,
                                  "loc": {
                                    "start": {
                                      "line": 13,
                                      "column": 7
                                    },
                                    "end": {
                                      "line": 13,
                                      "column": 13
                                    }
                                  },
                                  "name": "cherow"
                                }
                              ],
                              "body": {
                                "type": "BlockStatement",
                                "start": 299,
                                "end": 301,
                                "loc": {
                                  "start": {
                                    "line": 13,
                                    "column": 17
                                  },
                                  "end": {
                                    "line": 13,
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
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 316,
                    "end": 412,
                    "loc": {
                      "start": {
                        "line": 15,
                        "column": 6
                      },
                      "end": {
                        "line": 21,
                        "column": 7
                      }
                    },
                    "expression": {
                      "type": "CallExpression",
                      "start": 316,
                      "end": 412,
                      "loc": {
                        "start": {
                          "line": 15,
                          "column": 6
                        },
                        "end": {
                          "line": 21,
                          "column": 7
                        }
                      },
                      "callee": {
                        "type": "MemberExpression",
                        "start": 316,
                        "end": 328,
                        "loc": {
                          "start": {
                            "line": 15,
                            "column": 6
                          },
                          "end": {
                            "line": 15,
                            "column": 18
                          }
                        },
                        "object": {
                          "type": "MemberExpression",
                          "start": 316,
                          "end": 326,
                          "loc": {
                            "start": {
                              "line": 15,
                              "column": 6
                            },
                            "end": {
                              "line": 15,
                              "column": 16
                            }
                          },
                          "object": {
                            "type": "MemberExpression",
                            "start": 316,
                            "end": 324,
                            "loc": {
                              "start": {
                                "line": 15,
                                "column": 6
                              },
                              "end": {
                                "line": 15,
                                "column": 14
                              }
                            },
                            "object": {
                              "type": "CallExpression",
                              "start": 316,
                              "end": 322,
                              "loc": {
                                "start": {
                                  "line": 15,
                                  "column": 6
                                },
                                "end": {
                                  "line": 15,
                                  "column": 12
                                }
                              },
                              "callee": {
                                "type": "Identifier",
                                "start": 317,
                                "end": 318,
                                "loc": {
                                  "start": {
                                    "line": 15,
                                    "column": 7
                                  },
                                  "end": {
                                    "line": 15,
                                    "column": 8
                                  }
                                },
                                "name": "a"
                              },
                              "arguments": [
                                {
                                  "type": "Identifier",
                                  "start": 320,
                                  "end": 321,
                                  "loc": {
                                    "start": {
                                      "line": 15,
                                      "column": 10
                                    },
                                    "end": {
                                      "line": 15,
                                      "column": 11
                                    }
                                  },
                                  "name": "b"
                                }
                              ]
                            },
                            "property": {
                              "type": "Identifier",
                              "start": 323,
                              "end": 324,
                              "loc": {
                                "start": {
                                  "line": 15,
                                  "column": 13
                                },
                                "end": {
                                  "line": 15,
                                  "column": 14
                                }
                              },
                              "name": "c"
                            },
                            "computed": false
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 325,
                            "end": 326,
                            "loc": {
                              "start": {
                                "line": 15,
                                "column": 15
                              },
                              "end": {
                                "line": 15,
                                "column": 16
                              }
                            },
                            "name": "d"
                          },
                          "computed": false
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 327,
                          "end": 328,
                          "loc": {
                            "start": {
                              "line": 15,
                              "column": 17
                            },
                            "end": {
                              "line": 15,
                              "column": 18
                            }
                          },
                          "name": "e"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "ArrowFunctionExpression",
                          "start": 338,
                          "end": 404,
                          "loc": {
                            "start": {
                              "line": 16,
                              "column": 8
                            },
                            "end": {
                              "line": 20,
                              "column": 9
                            }
                          },
                          "id": null,
                          "generator": false,
                          "expression": false,
                          "async": false,
                          "params": [
                            {
                              "type": "Identifier",
                              "start": 338,
                              "end": 339,
                              "loc": {
                                "start": {
                                  "line": 16,
                                  "column": 8
                                },
                                "end": {
                                  "line": 16,
                                  "column": 9
                                }
                              },
                              "name": "a"
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "start": 343,
                            "end": 404,
                            "loc": {
                              "start": {
                                "line": 16,
                                "column": 13
                              },
                              "end": {
                                "line": 20,
                                "column": 9
                              }
                            },
                            "body": [
                              {
                                "type": "ExpressionStatement",
                                "start": 353,
                                "end": 394,
                                "loc": {
                                  "start": {
                                    "line": 17,
                                    "column": 8
                                  },
                                  "end": {
                                    "line": 19,
                                    "column": 9
                                  }
                                },
                                "expression": {
                                  "type": "ArrowFunctionExpression",
                                  "start": 353,
                                  "end": 394,
                                  "loc": {
                                    "start": {
                                      "line": 17,
                                      "column": 8
                                    },
                                    "end": {
                                      "line": 19,
                                      "column": 9
                                    }
                                  },
                                  "id": null,
                                  "generator": false,
                                  "expression": false,
                                  "async": false,
                                  "params": [
                                    {
                                      "type": "Identifier",
                                      "start": 354,
                                      "end": 355,
                                      "loc": {
                                        "start": {
                                          "line": 17,
                                          "column": 9
                                        },
                                        "end": {
                                          "line": 17,
                                          "column": 10
                                        }
                                      },
                                      "name": "a"
                                    }
                                  ],
                                  "body": {
                                    "type": "BlockStatement",
                                    "start": 360,
                                    "end": 394,
                                    "loc": {
                                      "start": {
                                        "line": 17,
                                        "column": 15
                                      },
                                      "end": {
                                        "line": 19,
                                        "column": 9
                                      }
                                    },
                                    "body": [
                                      {
                                        "type": "ExpressionStatement",
                                        "start": 370,
                                        "end": 384,
                                        "loc": {
                                          "start": {
                                            "line": 18,
                                            "column": 8
                                          },
                                          "end": {
                                            "line": 18,
                                            "column": 22
                                          }
                                        },
                                        "expression": {
                                          "type": "CallExpression",
                                          "start": 370,
                                          "end": 384,
                                          "loc": {
                                            "start": {
                                              "line": 18,
                                              "column": 8
                                            },
                                            "end": {
                                              "line": 18,
                                              "column": 22
                                            }
                                          },
                                          "callee": {
                                            "type": "MemberExpression",
                                            "start": 370,
                                            "end": 382,
                                            "loc": {
                                              "start": {
                                                "line": 18,
                                                "column": 8
                                              },
                                              "end": {
                                                "line": 18,
                                                "column": 20
                                              }
                                            },
                                            "object": {
                                              "type": "MemberExpression",
                                              "start": 370,
                                              "end": 380,
                                              "loc": {
                                                "start": {
                                                  "line": 18,
                                                  "column": 8
                                                },
                                                "end": {
                                                  "line": 18,
                                                  "column": 18
                                                }
                                              },
                                              "object": {
                                                "type": "MemberExpression",
                                                "start": 370,
                                                "end": 378,
                                                "loc": {
                                                  "start": {
                                                    "line": 18,
                                                    "column": 8
                                                  },
                                                  "end": {
                                                    "line": 18,
                                                    "column": 16
                                                  }
                                                },
                                                "object": {
                                                  "type": "CallExpression",
                                                  "start": 370,
                                                  "end": 376,
                                                  "loc": {
                                                    "start": {
                                                      "line": 18,
                                                      "column": 8
                                                    },
                                                    "end": {
                                                      "line": 18,
                                                      "column": 14
                                                    }
                                                  },
                                                  "callee": {
                                                    "type": "Identifier",
                                                    "start": 371,
                                                    "end": 372,
                                                    "loc": {
                                                      "start": {
                                                        "line": 18,
                                                        "column": 9
                                                      },
                                                      "end": {
                                                        "line": 18,
                                                        "column": 10
                                                      }
                                                    },
                                                    "name": "a"
                                                  },
                                                  "arguments": [
                                                    {
                                                      "type": "Identifier",
                                                      "start": 374,
                                                      "end": 375,
                                                      "loc": {
                                                        "start": {
                                                          "line": 18,
                                                          "column": 12
                                                        },
                                                        "end": {
                                                          "line": 18,
                                                          "column": 13
                                                        }
                                                      },
                                                      "name": "b"
                                                    }
                                                  ]
                                                },
                                                "property": {
                                                  "type": "Identifier",
                                                  "start": 377,
                                                  "end": 378,
                                                  "loc": {
                                                    "start": {
                                                      "line": 18,
                                                      "column": 15
                                                    },
                                                    "end": {
                                                      "line": 18,
                                                      "column": 16
                                                    }
                                                  },
                                                  "name": "c"
                                                },
                                                "computed": false
                                              },
                                              "property": {
                                                "type": "Identifier",
                                                "start": 379,
                                                "end": 380,
                                                "loc": {
                                                  "start": {
                                                    "line": 18,
                                                    "column": 17
                                                  },
                                                  "end": {
                                                    "line": 18,
                                                    "column": 18
                                                  }
                                                },
                                                "name": "d"
                                              },
                                              "computed": false
                                            },
                                            "property": {
                                              "type": "Identifier",
                                              "start": 381,
                                              "end": 382,
                                              "loc": {
                                                "start": {
                                                  "line": 18,
                                                  "column": 19
                                                },
                                                "end": {
                                                  "line": 18,
                                                  "column": 20
                                                }
                                              },
                                              "name": "e"
                                            },
                                            "computed": false
                                          },
                                          "arguments": []
                                        }
                                      }
                                    ]
                                  }
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 427,
            "end": 607,
            "loc": {
              "start": {
                "line": 23,
                "column": 6
              },
              "end": {
                "line": 32,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 427,
              "end": 607,
              "loc": {
                "start": {
                  "line": 23,
                  "column": 6
                },
                "end": {
                  "line": 32,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 427,
                  "end": 428,
                  "loc": {
                    "start": {
                      "line": 23,
                      "column": 6
                    },
                    "end": {
                      "line": 23,
                      "column": 7
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 432,
                "end": 607,
                "loc": {
                  "start": {
                    "line": 23,
                    "column": 11
                  },
                  "end": {
                    "line": 32,
                    "column": 7
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 440,
                    "end": 447,
                    "loc": {
                      "start": {
                        "line": 24,
                        "column": 6
                      },
                      "end": {
                        "line": 24,
                        "column": 13
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 440,
                      "end": 447,
                      "loc": {
                        "start": {
                          "line": 24,
                          "column": 6
                        },
                        "end": {
                          "line": 24,
                          "column": 13
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 440,
                          "end": 441,
                          "loc": {
                            "start": {
                              "line": 24,
                              "column": 6
                            },
                            "end": {
                              "line": 24,
                              "column": 7
                            }
                          },
                          "name": "b"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 445,
                        "end": 447,
                        "loc": {
                          "start": {
                            "line": 24,
                            "column": 11
                          },
                          "end": {
                            "line": 24,
                            "column": 13
                          }
                        },
                        "body": []
                      }
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 455,
                    "end": 467,
                    "loc": {
                      "start": {
                        "line": 25,
                        "column": 7
                      },
                      "end": {
                        "line": 25,
                        "column": 19
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 455,
                      "end": 467,
                      "loc": {
                        "start": {
                          "line": 25,
                          "column": 7
                        },
                        "end": {
                          "line": 25,
                          "column": 19
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 455,
                          "end": 461,
                          "loc": {
                            "start": {
                              "line": 25,
                              "column": 7
                            },
                            "end": {
                              "line": 25,
                              "column": 13
                            }
                          },
                          "name": "cherow"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 465,
                        "end": 467,
                        "loc": {
                          "start": {
                            "line": 25,
                            "column": 17
                          },
                          "end": {
                            "line": 25,
                            "column": 19
                          }
                        },
                        "body": []
                      }
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 475,
                    "end": 579,
                    "loc": {
                      "start": {
                        "line": 26,
                        "column": 7
                      },
                      "end": {
                        "line": 30,
                        "column": 7
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 475,
                      "end": 579,
                      "loc": {
                        "start": {
                          "line": 26,
                          "column": 7
                        },
                        "end": {
                          "line": 30,
                          "column": 7
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 475,
                          "end": 481,
                          "loc": {
                            "start": {
                              "line": 26,
                              "column": 7
                            },
                            "end": {
                              "line": 26,
                              "column": 13
                            }
                          },
                          "name": "cherow"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 485,
                        "end": 579,
                        "loc": {
                          "start": {
                            "line": 26,
                            "column": 17
                          },
                          "end": {
                            "line": 30,
                            "column": 7
                          }
                        },
                        "body": [
                          {
                            "type": "ExpressionStatement",
                            "start": 494,
                            "end": 571,
                            "loc": {
                              "start": {
                                "line": 27,
                                "column": 7
                              },
                              "end": {
                                "line": 29,
                                "column": 29
                              }
                            },
                            "expression": {
                              "type": "CallExpression",
                              "start": 494,
                              "end": 571,
                              "loc": {
                                "start": {
                                  "line": 27,
                                  "column": 7
                                },
                                "end": {
                                  "line": 29,
                                  "column": 29
                                }
                              },
                              "callee": {
                                "type": "MemberExpression",
                                "start": 494,
                                "end": 562,
                                "loc": {
                                  "start": {
                                    "line": 27,
                                    "column": 7
                                  },
                                  "end": {
                                    "line": 29,
                                    "column": 20
                                  }
                                },
                                "object": {
                                  "type": "MemberExpression",
                                  "start": 494,
                                  "end": 557,
                                  "loc": {
                                    "start": {
                                      "line": 27,
                                      "column": 7
                                    },
                                    "end": {
                                      "line": 29,
                                      "column": 15
                                    }
                                  },
                                  "object": {
                                    "type": "CallExpression",
                                    "start": 494,
                                    "end": 553,
                                    "loc": {
                                      "start": {
                                        "line": 27,
                                        "column": 7
                                      },
                                      "end": {
                                        "line": 29,
                                        "column": 11
                                      }
                                    },
                                    "callee": {
                                      "type": "ArrowFunctionExpression",
                                      "start": 495,
                                      "end": 550,
                                      "loc": {
                                        "start": {
                                          "line": 27,
                                          "column": 8
                                        },
                                        "end": {
                                          "line": 29,
                                          "column": 8
                                        }
                                      },
                                      "id": null,
                                      "generator": false,
                                      "expression": false,
                                      "async": false,
                                      "params": [],
                                      "body": {
                                        "type": "BlockStatement",
                                        "start": 501,
                                        "end": 550,
                                        "loc": {
                                          "start": {
                                            "line": 27,
                                            "column": 14
                                          },
                                          "end": {
                                            "line": 29,
                                            "column": 8
                                          }
                                        },
                                        "body": [
                                          {
                                            "type": "ExpressionStatement",
                                            "start": 511,
                                            "end": 541,
                                            "loc": {
                                              "start": {
                                                "line": 28,
                                                "column": 8
                                              },
                                              "end": {
                                                "line": 28,
                                                "column": 38
                                              }
                                            },
                                            "expression": {
                                              "type": "CallExpression",
                                              "start": 511,
                                              "end": 541,
                                              "loc": {
                                                "start": {
                                                  "line": 28,
                                                  "column": 8
                                                },
                                                "end": {
                                                  "line": 28,
                                                  "column": 38
                                                }
                                              },
                                              "callee": {
                                                "type": "MemberExpression",
                                                "start": 511,
                                                "end": 532,
                                                "loc": {
                                                  "start": {
                                                    "line": 28,
                                                    "column": 8
                                                  },
                                                  "end": {
                                                    "line": 28,
                                                    "column": 29
                                                  }
                                                },
                                                "object": {
                                                  "type": "MemberExpression",
                                                  "start": 511,
                                                  "end": 527,
                                                  "loc": {
                                                    "start": {
                                                      "line": 28,
                                                      "column": 8
                                                    },
                                                    "end": {
                                                      "line": 28,
                                                      "column": 24
                                                    }
                                                  },
                                                  "object": {
                                                    "type": "CallExpression",
                                                    "start": 511,
                                                    "end": 523,
                                                    "loc": {
                                                      "start": {
                                                        "line": 28,
                                                        "column": 8
                                                      },
                                                      "end": {
                                                        "line": 28,
                                                        "column": 20
                                                      }
                                                    },
                                                    "callee": {
                                                      "type": "ArrowFunctionExpression",
                                                      "start": 512,
                                                      "end": 520,
                                                      "loc": {
                                                        "start": {
                                                          "line": 28,
                                                          "column": 9
                                                        },
                                                        "end": {
                                                          "line": 28,
                                                          "column": 17
                                                        }
                                                      },
                                                      "id": null,
                                                      "generator": false,
                                                      "expression": false,
                                                      "async": false,
                                                      "params": [],
                                                      "body": {
                                                        "type": "BlockStatement",
                                                        "start": 518,
                                                        "end": 520,
                                                        "loc": {
                                                          "start": {
                                                            "line": 28,
                                                            "column": 15
                                                          },
                                                          "end": {
                                                            "line": 28,
                                                            "column": 17
                                                          }
                                                        },
                                                        "body": []
                                                      }
                                                    },
                                                    "arguments": []
                                                  },
                                                  "property": {
                                                    "type": "Identifier",
                                                    "start": 524,
                                                    "end": 527,
                                                    "loc": {
                                                      "start": {
                                                        "line": 28,
                                                        "column": 21
                                                      },
                                                      "end": {
                                                        "line": 28,
                                                        "column": 24
                                                      }
                                                    },
                                                    "name": "abc"
                                                  },
                                                  "computed": false
                                                },
                                                "property": {
                                                  "type": "Identifier",
                                                  "start": 528,
                                                  "end": 532,
                                                  "loc": {
                                                    "start": {
                                                      "line": 28,
                                                      "column": 25
                                                    },
                                                    "end": {
                                                      "line": 28,
                                                      "column": 29
                                                    }
                                                  },
                                                  "name": "call"
                                                },
                                                "computed": false
                                              },
                                              "arguments": [
                                                {
                                                  "type": "Literal",
                                                  "start": 533,
                                                  "end": 540,
                                                  "loc": {
                                                    "start": {
                                                      "line": 28,
                                                      "column": 30
                                                    },
                                                    "end": {
                                                      "line": 28,
                                                      "column": 37
                                                    }
                                                  },
                                                  "value": "Hello",
                                                  "raw": "\"Hello\""
                                                }
                                              ]
                                            }
                                          }
                                        ]
                                      }
                                    },
                                    "arguments": []
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 554,
                                    "end": 557,
                                    "loc": {
                                      "start": {
                                        "line": 29,
                                        "column": 12
                                      },
                                      "end": {
                                        "line": 29,
                                        "column": 15
                                      }
                                    },
                                    "name": "abc"
                                  },
                                  "computed": false
                                },
                                "property": {
                                  "type": "Identifier",
                                  "start": 558,
                                  "end": 562,
                                  "loc": {
                                    "start": {
                                      "line": 29,
                                      "column": 16
                                    },
                                    "end": {
                                      "line": 29,
                                      "column": 20
                                    }
                                  },
                                  "name": "call"
                                },
                                "computed": false
                              },
                              "arguments": [
                                {
                                  "type": "Literal",
                                  "start": 563,
                                  "end": 570,
                                  "loc": {
                                    "start": {
                                      "line": 29,
                                      "column": 21
                                    },
                                    "end": {
                                      "line": 29,
                                      "column": 28
                                    }
                                  },
                                  "value": "Hello",
                                  "raw": "\"Hello\""
                                }
                              ]
                            }
                          }
                        ]
                      }
                    }
                  },
                  {
                    "type": "ExpressionStatement",
                    "start": 587,
                    "end": 599,
                    "loc": {
                      "start": {
                        "line": 31,
                        "column": 7
                      },
                      "end": {
                        "line": 31,
                        "column": 19
                      }
                    },
                    "expression": {
                      "type": "ArrowFunctionExpression",
                      "start": 587,
                      "end": 599,
                      "loc": {
                        "start": {
                          "line": 31,
                          "column": 7
                        },
                        "end": {
                          "line": 31,
                          "column": 19
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [
                        {
                          "type": "Identifier",
                          "start": 587,
                          "end": 593,
                          "loc": {
                            "start": {
                              "line": 31,
                              "column": 7
                            },
                            "end": {
                              "line": 31,
                              "column": 13
                            }
                          },
                          "name": "cherow"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 597,
                        "end": 599,
                        "loc": {
                          "start": {
                            "line": 31,
                            "column": 17
                          },
                          "end": {
                            "line": 31,
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
          },
          {
            "type": "ExpressionStatement",
            "start": 615,
            "end": 627,
            "loc": {
              "start": {
                "line": 33,
                "column": 7
              },
              "end": {
                "line": 33,
                "column": 19
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 615,
              "end": 627,
              "loc": {
                "start": {
                  "line": 33,
                  "column": 7
                },
                "end": {
                  "line": 33,
                  "column": 19
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 615,
                  "end": 621,
                  "loc": {
                    "start": {
                      "line": 33,
                      "column": 7
                    },
                    "end": {
                      "line": 33,
                      "column": 13
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 625,
                "end": 627,
                "loc": {
                  "start": {
                    "line": 33,
                    "column": 17
                  },
                  "end": {
                    "line": 33,
                    "column": 19
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 634,
            "end": 766,
            "loc": {
              "start": {
                "line": 34,
                "column": 6
              },
              "end": {
                "line": 38,
                "column": 7
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 634,
              "end": 766,
              "loc": {
                "start": {
                  "line": 34,
                  "column": 6
                },
                "end": {
                  "line": 38,
                  "column": 7
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 640,
                "end": 766,
                "loc": {
                  "start": {
                    "line": 34,
                    "column": 12
                  },
                  "end": {
                    "line": 38,
                    "column": 7
                  }
                },
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "start": 650,
                    "end": 758,
                    "loc": {
                      "start": {
                        "line": 35,
                        "column": 8
                      },
                      "end": {
                        "line": 37,
                        "column": 38
                      }
                    },
                    "expression": {
                      "type": "CallExpression",
                      "start": 650,
                      "end": 758,
                      "loc": {
                        "start": {
                          "line": 35,
                          "column": 8
                        },
                        "end": {
                          "line": 37,
                          "column": 38
                        }
                      },
                      "callee": {
                        "type": "MemberExpression",
                        "start": 650,
                        "end": 749,
                        "loc": {
                          "start": {
                            "line": 35,
                            "column": 8
                          },
                          "end": {
                            "line": 37,
                            "column": 29
                          }
                        },
                        "object": {
                          "type": "MemberExpression",
                          "start": 650,
                          "end": 744,
                          "loc": {
                            "start": {
                              "line": 35,
                              "column": 8
                            },
                            "end": {
                              "line": 37,
                              "column": 24
                            }
                          },
                          "object": {
                            "type": "CallExpression",
                            "start": 650,
                            "end": 740,
                            "loc": {
                              "start": {
                                "line": 35,
                                "column": 8
                              },
                              "end": {
                                "line": 37,
                                "column": 20
                              }
                            },
                            "callee": {
                              "type": "CallExpression",
                              "start": 650,
                              "end": 738,
                              "loc": {
                                "start": {
                                  "line": 35,
                                  "column": 8
                                },
                                "end": {
                                  "line": 37,
                                  "column": 18
                                }
                              },
                              "callee": {
                                "type": "CallExpression",
                                "start": 650,
                                "end": 719,
                                "loc": {
                                  "start": {
                                    "line": 35,
                                    "column": 8
                                  },
                                  "end": {
                                    "line": 36,
                                    "column": 38
                                  }
                                },
                                "callee": {
                                  "type": "MemberExpression",
                                  "start": 650,
                                  "end": 710,
                                  "loc": {
                                    "start": {
                                      "line": 35,
                                      "column": 8
                                    },
                                    "end": {
                                      "line": 36,
                                      "column": 29
                                    }
                                  },
                                  "object": {
                                    "type": "MemberExpression",
                                    "start": 650,
                                    "end": 705,
                                    "loc": {
                                      "start": {
                                        "line": 35,
                                        "column": 8
                                      },
                                      "end": {
                                        "line": 36,
                                        "column": 24
                                      }
                                    },
                                    "object": {
                                      "type": "CallExpression",
                                      "start": 650,
                                      "end": 701,
                                      "loc": {
                                        "start": {
                                          "line": 35,
                                          "column": 8
                                        },
                                        "end": {
                                          "line": 36,
                                          "column": 20
                                        }
                                      },
                                      "callee": {
                                        "type": "CallExpression",
                                        "start": 650,
                                        "end": 699,
                                        "loc": {
                                          "start": {
                                            "line": 35,
                                            "column": 8
                                          },
                                          "end": {
                                            "line": 36,
                                            "column": 18
                                          }
                                        },
                                        "callee": {
                                          "type": "CallExpression",
                                          "start": 650,
                                          "end": 680,
                                          "loc": {
                                            "start": {
                                              "line": 35,
                                              "column": 8
                                            },
                                            "end": {
                                              "line": 35,
                                              "column": 38
                                            }
                                          },
                                          "callee": {
                                            "type": "MemberExpression",
                                            "start": 650,
                                            "end": 671,
                                            "loc": {
                                              "start": {
                                                "line": 35,
                                                "column": 8
                                              },
                                              "end": {
                                                "line": 35,
                                                "column": 29
                                              }
                                            },
                                            "object": {
                                              "type": "MemberExpression",
                                              "start": 650,
                                              "end": 666,
                                              "loc": {
                                                "start": {
                                                  "line": 35,
                                                  "column": 8
                                                },
                                                "end": {
                                                  "line": 35,
                                                  "column": 24
                                                }
                                              },
                                              "object": {
                                                "type": "CallExpression",
                                                "start": 650,
                                                "end": 662,
                                                "loc": {
                                                  "start": {
                                                    "line": 35,
                                                    "column": 8
                                                  },
                                                  "end": {
                                                    "line": 35,
                                                    "column": 20
                                                  }
                                                },
                                                "callee": {
                                                  "type": "ArrowFunctionExpression",
                                                  "start": 651,
                                                  "end": 659,
                                                  "loc": {
                                                    "start": {
                                                      "line": 35,
                                                      "column": 9
                                                    },
                                                    "end": {
                                                      "line": 35,
                                                      "column": 17
                                                    }
                                                  },
                                                  "id": null,
                                                  "generator": false,
                                                  "expression": false,
                                                  "async": false,
                                                  "params": [],
                                                  "body": {
                                                    "type": "BlockStatement",
                                                    "start": 657,
                                                    "end": 659,
                                                    "loc": {
                                                      "start": {
                                                        "line": 35,
                                                        "column": 15
                                                      },
                                                      "end": {
                                                        "line": 35,
                                                        "column": 17
                                                      }
                                                    },
                                                    "body": []
                                                  }
                                                },
                                                "arguments": []
                                              },
                                              "property": {
                                                "type": "Identifier",
                                                "start": 663,
                                                "end": 666,
                                                "loc": {
                                                  "start": {
                                                    "line": 35,
                                                    "column": 21
                                                  },
                                                  "end": {
                                                    "line": 35,
                                                    "column": 24
                                                  }
                                                },
                                                "name": "abc"
                                              },
                                              "computed": false
                                            },
                                            "property": {
                                              "type": "Identifier",
                                              "start": 667,
                                              "end": 671,
                                              "loc": {
                                                "start": {
                                                  "line": 35,
                                                  "column": 25
                                                },
                                                "end": {
                                                  "line": 35,
                                                  "column": 29
                                                }
                                              },
                                              "name": "call"
                                            },
                                            "computed": false
                                          },
                                          "arguments": [
                                            {
                                              "type": "Literal",
                                              "start": 672,
                                              "end": 679,
                                              "loc": {
                                                "start": {
                                                  "line": 35,
                                                  "column": 30
                                                },
                                                "end": {
                                                  "line": 35,
                                                  "column": 37
                                                }
                                              },
                                              "value": "Hello",
                                              "raw": "\"Hello\""
                                            }
                                          ]
                                        },
                                        "arguments": [
                                          {
                                            "type": "ArrowFunctionExpression",
                                            "start": 690,
                                            "end": 698,
                                            "loc": {
                                              "start": {
                                                "line": 36,
                                                "column": 9
                                              },
                                              "end": {
                                                "line": 36,
                                                "column": 17
                                              }
                                            },
                                            "id": null,
                                            "generator": false,
                                            "expression": false,
                                            "async": false,
                                            "params": [],
                                            "body": {
                                              "type": "BlockStatement",
                                              "start": 696,
                                              "end": 698,
                                              "loc": {
                                                "start": {
                                                  "line": 36,
                                                  "column": 15
                                                },
                                                "end": {
                                                  "line": 36,
                                                  "column": 17
                                                }
                                              },
                                              "body": []
                                            }
                                          }
                                        ]
                                      },
                                      "arguments": []
                                    },
                                    "property": {
                                      "type": "Identifier",
                                      "start": 702,
                                      "end": 705,
                                      "loc": {
                                        "start": {
                                          "line": 36,
                                          "column": 21
                                        },
                                        "end": {
                                          "line": 36,
                                          "column": 24
                                        }
                                      },
                                      "name": "abc"
                                    },
                                    "computed": false
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 706,
                                    "end": 710,
                                    "loc": {
                                      "start": {
                                        "line": 36,
                                        "column": 25
                                      },
                                      "end": {
                                        "line": 36,
                                        "column": 29
                                      }
                                    },
                                    "name": "call"
                                  },
                                  "computed": false
                                },
                                "arguments": [
                                  {
                                    "type": "Literal",
                                    "start": 711,
                                    "end": 718,
                                    "loc": {
                                      "start": {
                                        "line": 36,
                                        "column": 30
                                      },
                                      "end": {
                                        "line": 36,
                                        "column": 37
                                      }
                                    },
                                    "value": "Hello",
                                    "raw": "\"Hello\""
                                  }
                                ]
                              },
                              "arguments": [
                                {
                                  "type": "ArrowFunctionExpression",
                                  "start": 729,
                                  "end": 737,
                                  "loc": {
                                    "start": {
                                      "line": 37,
                                      "column": 9
                                    },
                                    "end": {
                                      "line": 37,
                                      "column": 17
                                    }
                                  },
                                  "id": null,
                                  "generator": false,
                                  "expression": false,
                                  "async": false,
                                  "params": [],
                                  "body": {
                                    "type": "BlockStatement",
                                    "start": 735,
                                    "end": 737,
                                    "loc": {
                                      "start": {
                                        "line": 37,
                                        "column": 15
                                      },
                                      "end": {
                                        "line": 37,
                                        "column": 17
                                      }
                                    },
                                    "body": []
                                  }
                                }
                              ]
                            },
                            "arguments": []
                          },
                          "property": {
                            "type": "Identifier",
                            "start": 741,
                            "end": 744,
                            "loc": {
                              "start": {
                                "line": 37,
                                "column": 21
                              },
                              "end": {
                                "line": 37,
                                "column": 24
                              }
                            },
                            "name": "abc"
                          },
                          "computed": false
                        },
                        "property": {
                          "type": "Identifier",
                          "start": 745,
                          "end": 749,
                          "loc": {
                            "start": {
                              "line": 37,
                              "column": 25
                            },
                            "end": {
                              "line": 37,
                              "column": 29
                            }
                          },
                          "name": "call"
                        },
                        "computed": false
                      },
                      "arguments": [
                        {
                          "type": "Literal",
                          "start": 750,
                          "end": 757,
                          "loc": {
                            "start": {
                              "line": 37,
                              "column": 30
                            },
                            "end": {
                              "line": 37,
                              "column": 37
                            }
                          },
                          "value": "Hello",
                          "raw": "\"Hello\""
                        }
                      ]
                    }
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 773,
            "end": 781,
            "loc": {
              "start": {
                "line": 39,
                "column": 6
              },
              "end": {
                "line": 39,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 773,
              "end": 781,
              "loc": {
                "start": {
                  "line": 39,
                  "column": 6
                },
                "end": {
                  "line": 39,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 779,
                "end": 781,
                "loc": {
                  "start": {
                    "line": 39,
                    "column": 12
                  },
                  "end": {
                    "line": 39,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 788,
            "end": 796,
            "loc": {
              "start": {
                "line": 40,
                "column": 6
              },
              "end": {
                "line": 40,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 788,
              "end": 796,
              "loc": {
                "start": {
                  "line": 40,
                  "column": 6
                },
                "end": {
                  "line": 40,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 794,
                "end": 796,
                "loc": {
                  "start": {
                    "line": 40,
                    "column": 12
                  },
                  "end": {
                    "line": 40,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 803,
            "end": 811,
            "loc": {
              "start": {
                "line": 41,
                "column": 6
              },
              "end": {
                "line": 41,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 803,
              "end": 811,
              "loc": {
                "start": {
                  "line": 41,
                  "column": 6
                },
                "end": {
                  "line": 41,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 809,
                "end": 811,
                "loc": {
                  "start": {
                    "line": 41,
                    "column": 12
                  },
                  "end": {
                    "line": 41,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 818,
            "end": 848,
            "loc": {
              "start": {
                "line": 42,
                "column": 6
              },
              "end": {
                "line": 42,
                "column": 36
              }
            },
            "expression": {
              "type": "CallExpression",
              "start": 818,
              "end": 848,
              "loc": {
                "start": {
                  "line": 42,
                  "column": 6
                },
                "end": {
                  "line": 42,
                  "column": 36
                }
              },
              "callee": {
                "type": "MemberExpression",
                "start": 818,
                "end": 839,
                "loc": {
                  "start": {
                    "line": 42,
                    "column": 6
                  },
                  "end": {
                    "line": 42,
                    "column": 27
                  }
                },
                "object": {
                  "type": "MemberExpression",
                  "start": 818,
                  "end": 834,
                  "loc": {
                    "start": {
                      "line": 42,
                      "column": 6
                    },
                    "end": {
                      "line": 42,
                      "column": 22
                    }
                  },
                  "object": {
                    "type": "CallExpression",
                    "start": 818,
                    "end": 830,
                    "loc": {
                      "start": {
                        "line": 42,
                        "column": 6
                      },
                      "end": {
                        "line": 42,
                        "column": 18
                      }
                    },
                    "callee": {
                      "type": "ArrowFunctionExpression",
                      "start": 819,
                      "end": 827,
                      "loc": {
                        "start": {
                          "line": 42,
                          "column": 7
                        },
                        "end": {
                          "line": 42,
                          "column": 15
                        }
                      },
                      "id": null,
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                        "type": "BlockStatement",
                        "start": 825,
                        "end": 827,
                        "loc": {
                          "start": {
                            "line": 42,
                            "column": 13
                          },
                          "end": {
                            "line": 42,
                            "column": 15
                          }
                        },
                        "body": []
                      }
                    },
                    "arguments": []
                  },
                  "property": {
                    "type": "Identifier",
                    "start": 831,
                    "end": 834,
                    "loc": {
                      "start": {
                        "line": 42,
                        "column": 19
                      },
                      "end": {
                        "line": 42,
                        "column": 22
                      }
                    },
                    "name": "abc"
                  },
                  "computed": false
                },
                "property": {
                  "type": "Identifier",
                  "start": 835,
                  "end": 839,
                  "loc": {
                    "start": {
                      "line": 42,
                      "column": 23
                    },
                    "end": {
                      "line": 42,
                      "column": 27
                    }
                  },
                  "name": "call"
                },
                "computed": false
              },
              "arguments": [
                {
                  "type": "Literal",
                  "start": 840,
                  "end": 847,
                  "loc": {
                    "start": {
                      "line": 42,
                      "column": 28
                    },
                    "end": {
                      "line": 42,
                      "column": 35
                    }
                  },
                  "value": "Hello",
                  "raw": "\"Hello\""
                }
              ]
            }
          }
        ],
        "sourceType": "script"
      });
    });


    it('should parse complex #21', () => {
      expect(parseScript(`() => {}
      () => {}
       cherow => a.b()()()((b => {})())()()()()(a,b)
      a => {}
         cherow => a.b()()()((b => {})())()()()()(a,b)`, {
          ranges: true,
          locations: true,
          raw: true
      })).to.eql({
        "type": "Program",
        "start": 0,
        "end": 145,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 54
          }
        },
        "body": [
          {
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "ArrowFunctionExpression",
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
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
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
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 15,
            "end": 23,
            "loc": {
              "start": {
                "line": 2,
                "column": 6
              },
              "end": {
                "line": 2,
                "column": 14
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 15,
              "end": 23,
              "loc": {
                "start": {
                  "line": 2,
                  "column": 6
                },
                "end": {
                  "line": 2,
                  "column": 14
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [],
              "body": {
                "type": "BlockStatement",
                "start": 21,
                "end": 23,
                "loc": {
                  "start": {
                    "line": 2,
                    "column": 12
                  },
                  "end": {
                    "line": 2,
                    "column": 14
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 31,
            "end": 76,
            "loc": {
              "start": {
                "line": 3,
                "column": 7
              },
              "end": {
                "line": 3,
                "column": 52
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 31,
              "end": 76,
              "loc": {
                "start": {
                  "line": 3,
                  "column": 7
                },
                "end": {
                  "line": 3,
                  "column": 52
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 31,
                  "end": 37,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 7
                    },
                    "end": {
                      "line": 3,
                      "column": 13
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "CallExpression",
                "start": 41,
                "end": 76,
                "loc": {
                  "start": {
                    "line": 3,
                    "column": 17
                  },
                  "end": {
                    "line": 3,
                    "column": 52
                  }
                },
                "callee": {
                  "type": "CallExpression",
                  "start": 41,
                  "end": 71,
                  "loc": {
                    "start": {
                      "line": 3,
                      "column": 17
                    },
                    "end": {
                      "line": 3,
                      "column": 47
                    }
                  },
                  "callee": {
                    "type": "CallExpression",
                    "start": 41,
                    "end": 69,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 17
                      },
                      "end": {
                        "line": 3,
                        "column": 45
                      }
                    },
                    "callee": {
                      "type": "CallExpression",
                      "start": 41,
                      "end": 67,
                      "loc": {
                        "start": {
                          "line": 3,
                          "column": 17
                        },
                        "end": {
                          "line": 3,
                          "column": 43
                        }
                      },
                      "callee": {
                        "type": "CallExpression",
                        "start": 41,
                        "end": 65,
                        "loc": {
                          "start": {
                            "line": 3,
                            "column": 17
                          },
                          "end": {
                            "line": 3,
                            "column": 41
                          }
                        },
                        "callee": {
                          "type": "CallExpression",
                          "start": 41,
                          "end": 63,
                          "loc": {
                            "start": {
                              "line": 3,
                              "column": 17
                            },
                            "end": {
                              "line": 3,
                              "column": 39
                            }
                          },
                          "callee": {
                            "type": "CallExpression",
                            "start": 41,
                            "end": 50,
                            "loc": {
                              "start": {
                                "line": 3,
                                "column": 17
                              },
                              "end": {
                                "line": 3,
                                "column": 26
                              }
                            },
                            "callee": {
                              "type": "CallExpression",
                              "start": 41,
                              "end": 48,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 17
                                },
                                "end": {
                                  "line": 3,
                                  "column": 24
                                }
                              },
                              "callee": {
                                "type": "CallExpression",
                                "start": 41,
                                "end": 46,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 17
                                  },
                                  "end": {
                                    "line": 3,
                                    "column": 22
                                  }
                                },
                                "callee": {
                                  "type": "MemberExpression",
                                  "start": 41,
                                  "end": 44,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 17
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 20
                                    }
                                  },
                                  "object": {
                                    "type": "Identifier",
                                    "start": 41,
                                    "end": 42,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 17
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 18
                                      }
                                    },
                                    "name": "a"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 43,
                                    "end": 44,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 19
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 20
                                      }
                                    },
                                    "name": "b"
                                  },
                                  "computed": false
                                },
                                "arguments": []
                              },
                              "arguments": []
                            },
                            "arguments": []
                          },
                          "arguments": [
                            {
                              "type": "CallExpression",
                              "start": 51,
                              "end": 62,
                              "loc": {
                                "start": {
                                  "line": 3,
                                  "column": 27
                                },
                                "end": {
                                  "line": 3,
                                  "column": 38
                                }
                              },
                              "callee": {
                                "type": "ArrowFunctionExpression",
                                "start": 52,
                                "end": 59,
                                "loc": {
                                  "start": {
                                    "line": 3,
                                    "column": 28
                                  },
                                  "end": {
                                    "line": 3,
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
                                    "start": 52,
                                    "end": 53,
                                    "loc": {
                                      "start": {
                                        "line": 3,
                                        "column": 28
                                      },
                                      "end": {
                                        "line": 3,
                                        "column": 29
                                      }
                                    },
                                    "name": "b"
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 57,
                                  "end": 59,
                                  "loc": {
                                    "start": {
                                      "line": 3,
                                      "column": 33
                                    },
                                    "end": {
                                      "line": 3,
                                      "column": 35
                                    }
                                  },
                                  "body": []
                                }
                              },
                              "arguments": []
                            }
                          ]
                        },
                        "arguments": []
                      },
                      "arguments": []
                    },
                    "arguments": []
                  },
                  "arguments": []
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 72,
                    "end": 73,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 48
                      },
                      "end": {
                        "line": 3,
                        "column": 49
                      }
                    },
                    "name": "a"
                  },
                  {
                    "type": "Identifier",
                    "start": 74,
                    "end": 75,
                    "loc": {
                      "start": {
                        "line": 3,
                        "column": 50
                      },
                      "end": {
                        "line": 3,
                        "column": 51
                      }
                    },
                    "name": "b"
                  }
                ]
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 83,
            "end": 90,
            "loc": {
              "start": {
                "line": 4,
                "column": 6
              },
              "end": {
                "line": 4,
                "column": 13
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 83,
              "end": 90,
              "loc": {
                "start": {
                  "line": 4,
                  "column": 6
                },
                "end": {
                  "line": 4,
                  "column": 13
                }
              },
              "id": null,
              "generator": false,
              "expression": false,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 83,
                  "end": 84,
                  "loc": {
                    "start": {
                      "line": 4,
                      "column": 6
                    },
                    "end": {
                      "line": 4,
                      "column": 7
                    }
                  },
                  "name": "a"
                }
              ],
              "body": {
                "type": "BlockStatement",
                "start": 88,
                "end": 90,
                "loc": {
                  "start": {
                    "line": 4,
                    "column": 11
                  },
                  "end": {
                    "line": 4,
                    "column": 13
                  }
                },
                "body": []
              }
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 100,
            "end": 145,
            "loc": {
              "start": {
                "line": 5,
                "column": 9
              },
              "end": {
                "line": 5,
                "column": 54
              }
            },
            "expression": {
              "type": "ArrowFunctionExpression",
              "start": 100,
              "end": 145,
              "loc": {
                "start": {
                  "line": 5,
                  "column": 9
                },
                "end": {
                  "line": 5,
                  "column": 54
                }
              },
              "id": null,
              "generator": false,
              "expression": true,
              "async": false,
              "params": [
                {
                  "type": "Identifier",
                  "start": 100,
                  "end": 106,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 9
                    },
                    "end": {
                      "line": 5,
                      "column": 15
                    }
                  },
                  "name": "cherow"
                }
              ],
              "body": {
                "type": "CallExpression",
                "start": 110,
                "end": 145,
                "loc": {
                  "start": {
                    "line": 5,
                    "column": 19
                  },
                  "end": {
                    "line": 5,
                    "column": 54
                  }
                },
                "callee": {
                  "type": "CallExpression",
                  "start": 110,
                  "end": 140,
                  "loc": {
                    "start": {
                      "line": 5,
                      "column": 19
                    },
                    "end": {
                      "line": 5,
                      "column": 49
                    }
                  },
                  "callee": {
                    "type": "CallExpression",
                    "start": 110,
                    "end": 138,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 19
                      },
                      "end": {
                        "line": 5,
                        "column": 47
                      }
                    },
                    "callee": {
                      "type": "CallExpression",
                      "start": 110,
                      "end": 136,
                      "loc": {
                        "start": {
                          "line": 5,
                          "column": 19
                        },
                        "end": {
                          "line": 5,
                          "column": 45
                        }
                      },
                      "callee": {
                        "type": "CallExpression",
                        "start": 110,
                        "end": 134,
                        "loc": {
                          "start": {
                            "line": 5,
                            "column": 19
                          },
                          "end": {
                            "line": 5,
                            "column": 43
                          }
                        },
                        "callee": {
                          "type": "CallExpression",
                          "start": 110,
                          "end": 132,
                          "loc": {
                            "start": {
                              "line": 5,
                              "column": 19
                            },
                            "end": {
                              "line": 5,
                              "column": 41
                            }
                          },
                          "callee": {
                            "type": "CallExpression",
                            "start": 110,
                            "end": 119,
                            "loc": {
                              "start": {
                                "line": 5,
                                "column": 19
                              },
                              "end": {
                                "line": 5,
                                "column": 28
                              }
                            },
                            "callee": {
                              "type": "CallExpression",
                              "start": 110,
                              "end": 117,
                              "loc": {
                                "start": {
                                  "line": 5,
                                  "column": 19
                                },
                                "end": {
                                  "line": 5,
                                  "column": 26
                                }
                              },
                              "callee": {
                                "type": "CallExpression",
                                "start": 110,
                                "end": 115,
                                "loc": {
                                  "start": {
                                    "line": 5,
                                    "column": 19
                                  },
                                  "end": {
                                    "line": 5,
                                    "column": 24
                                  }
                                },
                                "callee": {
                                  "type": "MemberExpression",
                                  "start": 110,
                                  "end": 113,
                                  "loc": {
                                    "start": {
                                      "line": 5,
                                      "column": 19
                                    },
                                    "end": {
                                      "line": 5,
                                      "column": 22
                                    }
                                  },
                                  "object": {
                                    "type": "Identifier",
                                    "start": 110,
                                    "end": 111,
                                    "loc": {
                                      "start": {
                                        "line": 5,
                                        "column": 19
                                      },
                                      "end": {
                                        "line": 5,
                                        "column": 20
                                      }
                                    },
                                    "name": "a"
                                  },
                                  "property": {
                                    "type": "Identifier",
                                    "start": 112,
                                    "end": 113,
                                    "loc": {
                                      "start": {
                                        "line": 5,
                                        "column": 21
                                      },
                                      "end": {
                                        "line": 5,
                                        "column": 22
                                      }
                                    },
                                    "name": "b"
                                  },
                                  "computed": false
                                },
                                "arguments": []
                              },
                              "arguments": []
                            },
                            "arguments": []
                          },
                          "arguments": [
                            {
                              "type": "CallExpression",
                              "start": 120,
                              "end": 131,
                              "loc": {
                                "start": {
                                  "line": 5,
                                  "column": 29
                                },
                                "end": {
                                  "line": 5,
                                  "column": 40
                                }
                              },
                              "callee": {
                                "type": "ArrowFunctionExpression",
                                "start": 121,
                                "end": 128,
                                "loc": {
                                  "start": {
                                    "line": 5,
                                    "column": 30
                                  },
                                  "end": {
                                    "line": 5,
                                    "column": 37
                                  }
                                },
                                "id": null,
                                "generator": false,
                                "expression": false,
                                "async": false,
                                "params": [
                                  {
                                    "type": "Identifier",
                                    "start": 121,
                                    "end": 122,
                                    "loc": {
                                      "start": {
                                        "line": 5,
                                        "column": 30
                                      },
                                      "end": {
                                        "line": 5,
                                        "column": 31
                                      }
                                    },
                                    "name": "b"
                                  }
                                ],
                                "body": {
                                  "type": "BlockStatement",
                                  "start": 126,
                                  "end": 128,
                                  "loc": {
                                    "start": {
                                      "line": 5,
                                      "column": 35
                                    },
                                    "end": {
                                      "line": 5,
                                      "column": 37
                                    }
                                  },
                                  "body": []
                                }
                              },
                              "arguments": []
                            }
                          ]
                        },
                        "arguments": []
                      },
                      "arguments": []
                    },
                    "arguments": []
                  },
                  "arguments": []
                },
                "arguments": [
                  {
                    "type": "Identifier",
                    "start": 141,
                    "end": 142,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 50
                      },
                      "end": {
                        "line": 5,
                        "column": 51
                      }
                    },
                    "name": "a"
                  },
                  {
                    "type": "Identifier",
                    "start": 143,
                    "end": 144,
                    "loc": {
                      "start": {
                        "line": 5,
                        "column": 52
                      },
                      "end": {
                        "line": 5,
                        "column": 53
                      }
                    },
                    "name": "b"
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