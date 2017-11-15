import { fail, pass } from '../utils/test-utils';

describe('Miscellaneous - Unicode', () => {

    fail('no digits', '\\u{}');
    fail('out of range', '\\u{125400}');

    pass('"T\\u203F = []"', '"T\\u203F = []";', {
          "body": [
            {
              "directive": "T\\u203F = []",
              "end": 15,
              "expression": {
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
                "raw": "\"T\\u203F = []\"",
                "start": 0,
                "type": "Literal",
                "value": "T‿ = []",
              },
              "loc": {
                "end": {
                  "column": 15,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
              "start": 0,
              "type": "ExpressionStatement",
           },
          ],
         "end": 15,
          "loc": {
            "end": {
              "column": 15,
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

    pass('"T\\u200C"', '"T\\u200C";', {
          "body": [
            {
             "directive": "T\\u200C",
              "end": 10,
              "expression": {
                "end": 9,
                "loc": {
                  "end": {
                    "column": 9,
                    "line": 1,
                  },
                  "start": {
                    "column": 0,
                    "line": 1,
                  }
                },
                "raw": "\"T\\u200C\"",
                "start": 0,
                "type": "Literal",
                "value": "T‌",
              },
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
              "start": 0,
              "type": "ExpressionStatement",
            },
          ],
         "end": 10,
          "loc": {
            "end": {
              "column": 10,
              "line": 1,
            },
            "start": {
              "column": 0,
              "line": 1,
            }
         },
          "sourceType": "script",
          "start": 0,
          "type": "Program"
        });

    pass('"T\\u203F = []"', '"T\\u203F = []";', {
          "body": [
            {
              "directive": "T\\u203F = []",
              "end": 15,
             "expression": {
                "end": 14,
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
                "raw": "\"T\\u203F = []\"",
                "start": 0,
                "type": "Literal",
                "value": "T‿ = []",
             },
              "loc": {
                "end": {
                  "column": 15,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
              "start": 0,
              "type": "ExpressionStatement",
            }
         ],
          "end": 15,
          "loc": {
            "end": {
              "column": 15,
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

    pass('"\\u2163\\u2161"', '"\\u2163\\u2161";', {
          "body": [
            {
              "directive": "\\u2163\\u2161",
              "end": 15,
              "expression": {
                "end": 14,
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
                "raw": "\"\\u2163\\u2161\"",
                "start": 0,
                "type": "Literal",
                "value": "ⅣⅡ",
              },
              "loc": {
                "end": {
                  "column": 15,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
              "start": 0,
              "type": "ExpressionStatement",
            },
          ],
          "end": 15,
          "loc": {
            "end": {
              "column": 15,
              "line": 1,
            },
            "start": {
              "column": 0,
              "line": 1,
           }
          },
          "sourceType": "script",
          "start": 0,
          "type": "Program"
        });
    
    pass('should parse "\\u2163\\u2161\\u200A; \\u2009"', '"\\u2163\\u2161\\u200A; \\u2009"', {
          "body": [
            {
              "directive": "\\u2163\\u2161\\u200A; \\u2009",
              "end": 28,
              "expression": {
                "end": 28,
                "loc": {
                 "end": {
                    "column": 28,
                   "line": 1,
                  },
                  "start": {
                   "column": 0,
                    "line": 1,
                  }
                },
                "raw": "\"\\u2163\\u2161\\u200A; \\u2009\"",
                "start": 0,
                "type": "Literal",
                "value": "ⅣⅡ ;  ",
              },
              "loc": {
                "end": {
                  "column": 28,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "start": 0,
              "type": "ExpressionStatement",
            },
          ],
          "end": 28,
          "loc": {
            "end": {
              "column": 28,
              "line": 1,
            },
            "start": {
              "column": 0,
              "line": 1,
            }
          },
         "sourceType": "script",
          "start": 0,
          "type": "Program"
        });
        
    pass('should parse "var source = "\\u{00000000034}";"', 'var source = "\\u{00000000034}";', {
        "type": "Program",
        "start": 0,
        "end": 31,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 31
          }
        },
        "body": [
          {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 31,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 31
              }
            },
            "declarations": [
              {
                "type": "VariableDeclarator",
                "start": 4,
                "end": 30,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 4
                  },
                  "end": {
                    "line": 1,
                    "column": 30
                  }
                },
                "id": {
                  "type": "Identifier",
                  "start": 4,
                  "end": 10,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 4
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  },
                  "name": "source"
                },
                "init": {
                  "type": "Literal",
                  "start": 13,
                  "end": 30,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 13
                    },
                    "end": {
                      "line": 1,
                      "column": 30
                    }
                  },
                  "value": "4",
                  "raw": "\"\\u{00000000034}\""
                }
              }
            ],
            "kind": "var"
          }
        ],
        "sourceType": "script"
      });
   
    pass('should parse "\\u{20BB7}\\u{91CE}\\u{5BB6}"', '"\\u{20BB7}\\u{91CE}\\u{5BB6}"', {
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
            "directive": "\\u{20BB7}\\u{91CE}\\u{5BB6}",
            "expression": {
              "type": "Literal",
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
              "value": "𠮷野家",
              "raw": "\"\\u{20BB7}\\u{91CE}\\u{5BB6}\""
            }
          }
        ],
        "sourceType": "script"
      });

    pass('should parse "\\u{1EE00}"', '\\u{1EE00}', {
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
              "type": "Identifier",
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
              "name": "𞸀"
            }
          }
        ],
        "sourceType": "script"
      });
});