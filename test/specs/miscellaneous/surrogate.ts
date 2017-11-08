import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Miscellaneous - Surrogate pair', () => {

it('should parse "var _\\u{1EE03}"', () => {
    expect(parseScript(`var _\\u{1EE03}`, {
        ranges: true,
        raw: true,
        locations: true,
    })).to.eql({
          "body": [
            {
              "declarations": [
                {
                  "end": 14,
                  "id": {
                   "end": 14,
                    "loc": {
                      "end": {
                        "column": 14,
                        "line": 1,
                      },
                      "start": {
                        "column": 4,
                        "line": 1,
                     },
                    },
                    "name": "_𞸃",
                    "start": 4,
                    "type": "Identifier",
                  },
                  "init": null,
                  "loc": {
                    "end": {
                      "column": 14,
                      "line": 1,
                    },
                    "start": {
                      "column": 4,
                      "line": 1,
                    }
                 },
                  "start": 4,
                  "type": "VariableDeclarator",
                },
              ],
              "end": 14,
              "kind": "var",
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
              "start": 0,
              "type": "VariableDeclaration",
            },
         ],
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
         "sourceType": "script",
          "start": 0,
          "type": "Program"
        });
});

it('should parse "var \\u{1EE0A}\\u{1EE0B}"', () => {
    expect(parseScript(`var \\u{1EE0A}\\u{1EE0B}`, {
        ranges: true,
        raw: true,
        locations: true,
    })).to.eql({
          "body": [
            {
              "declarations": [
                {
                  "end": 22,
                 "id": {
                    "end": 22,
                    "loc": {
                      "end": {
                        "column": 22,
                        "line": 1,
                      },
                      "start": {
                        "column": 4,
                        "line": 1,
                      },
                    },
                    "name": "𞸊𞸋",
                    "start": 4,
                    "type": "Identifier",
                  },
                  "init": null,
                  "loc": {
                    "end": {
                      "column": 22,
                      "line": 1,
                    },
                    "start": {
                      "column": 4,
                      "line": 1,
                    }
                  },
                  "start": 4,
                  "type": "VariableDeclarator",
                },
              ],
              "end": 22,
             "kind": "var",
              "loc": {
                "end": {
                  "column": 22,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "start": 0,
              "type": "VariableDeclaration",
            },
         ],
          "end": 22,
          "loc": {
            "end": {
              "column": 22,
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
});

it('should parse "var \\u{1EE06}_$"', () => {
    expect(parseScript(`var \\u{1EE06}_$`, {
        ranges: true,
        raw: true,
        locations: true,
    })).to.eql({
          "body": [
            {
              "declarations": [
                {
                  "end": 15,
                  "id": {
                    "end": 15,
                    "loc": {
                      "end": {
                        "column": 15,
                        "line": 1,
                     },
                      "start": {
                        "column": 4,
                        "line": 1,
                      }
                    },
                    "name": "𞸆_$",
                    "start": 4,
                    "type": "Identifier",
                  },
                  "init": null,
                  "loc": {
                    "end": {
                      "column": 15,
                      "line": 1,
                   },
                    "start": {
                      "column": 4,
                      "line": 1,
                    }
                  },
                  "start": 4,
                  "type": "VariableDeclarator",
                },
              ],
              "end": 15,
              "kind": "var",
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
              "start": 0,
              "type": "VariableDeclaration",
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
            }
          },
          "sourceType": "script",
          "start": 0,
          "type": "Program"
        });
});

it('should parse "var 𞸀"', () => {
    expect(parseScript(`var 𞸀`, {
        ranges: true,
        raw: true,
        locations: true,
    })).to.eql({
          "body": [
            {
              "declarations": [
                {
                 "end": 6,
                  "id": {
                    "end": 6,
                    "loc": {
                      "end": {
                        "column": 6,
                       "line": 1,
                      },
                     "start": {
                        "column": 4,
                        "line": 1,
                      },
                    },
                    "name": "𞸀",
                    "start": 4,
                    "type": "Identifier",
                  },
                  "init": null,
                  "loc": {
                    "end": {
                      "column": 6,
                      "line": 1,
                    },
                    "start": {
                      "column": 4,
                      "line": 1,
                    }
                  },
                  "start": 4,
                  "type": "VariableDeclarator",
                }
              ],
              "end": 6,
              "kind": "var",
              "loc": {
                "end": {
                  "column": 6,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                },
              },
              "start": 0,
              "type": "VariableDeclaration",
            },
          ],
          "end": 6,
          "loc": {
            "end": {
              "column": 6,
              "line": 1,
            },
            "start": {
              "column": 0,
              "line": 1,
            }
          },
          "sourceType": "script",
          "start": 0,
          "type": "Program",
        });
});

it('should fail on invalid empty arrow', () => {
    expect(() => {
        parseScript('var \\uD83B\\uDE00');
    }).to.throw();
});

it('should fail on invalid empty arrow', () => {
    expect(() => {
        parseScript('var 🀒');
    }).to.throw();
});

it('should fail on invalid empty arrow', () => {
    expect(() => {
        parseScript('var source = "\\uD800!";');
    }).to.not.throw();
});

it('should parse math dal part', () => {
    expect(parseScript(`var _𞸃`, {
        ranges: true,
        raw: true,
        locations: true,
    })).to.eql({
          "body": [
            {
              "declarations": [
                {
                  "end": 7,
                "id": {
                    "end": 7,
                    "loc": {
                      "end": {
                       "column": 7,
                        "line": 1,
                      },
                      "start": {
                        "column": 4,
                        "line": 1,
                      }
                    },
                    "name": "_𞸃",
                    "start": 4,
                    "type": "Identifier",
                  },
                  "init": null,
                  "loc": {
                    "end": {
                      "column": 7,
                      "line": 1,
                    },
                   "start": {
                      "column": 4,
                      "line": 1,
                    }
                  },
                  "start": 4,
                  "type": "VariableDeclarator",
                }
              ],
              "end": 7,
              "kind": "var",
              "loc": {
                "end": {
                  "column": 7,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "start": 0,
              "type": "VariableDeclaration",
            }
          ],
          "end": 7,
          "loc": {
            "end": {
              "column": 7,
              "line": 1,
            },
            "start": {
              "column": 0,
              "line": 1,
            }
          },
          "sourceType": "script",
          "start": 0,
          "type": "Program",
        });
});

it('should parse math kaf lam', () => {
    expect(parseScript(`var 𞸊𞸋`, {
        ranges: true,
        raw: true,
        locations: true,
    })).to.eql({
          "body": [
           {
              "declarations": [
                {
                  "end": 8,
                  "id": {
                    "end": 8,
                    "loc": {
                      "end": {
                        "column": 8,
                        "line": 1,
                      },
                      "start": {
                       "column": 4,
                        "line": 1,
                      },
                    },
                    "name": "𞸊𞸋",
                    "start": 4,
                    "type": "Identifier",
                  },
                  "init": null,
                  "loc": {
                    "end": {
                      "column": 8,
                      "line": 1,
                    },
                    "start": {
                     "column": 4,
                      "line": 1,
                    }
                  },
                  "start": 4,
                 "type": "VariableDeclarator",
                }
              ],
              "end": 8,
              "kind": "var",
              "loc": {
                "end": {
                  "column": 8,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "start": 0,
              "type": "VariableDeclaration",
            }
          ],
          "end": 8,
          "loc": {
            "end": {
              "column": 8,
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
});

it('should parse math zain start', () => {
    expect(parseScript('var 𞸆_$', {
        ranges: true,
        raw: true,
        locations: true,
    })).to.eql({
          "body": [
            {
              "declarations": [
                {
                  "end": 8,
                  "id": {
                    "end": 8,
                    "loc": {
                      "end": {
                        "column": 8,
                        "line": 1,
                      },
                      "start": {
                        "column": 4,
                        "line": 1,
                      }
                    },
                    "name": "𞸆_$",
                   "start": 4,
                    "type": "Identifier",
                  },
                  "init": null,
                  "loc": {
                    "end": {
                      "column": 8,
                      "line": 1,
                    },
                    "start": {
                      "column": 4,
                      "line": 1,
                    }
                  },
                  "start": 4,
                  "type": "VariableDeclarator",
               }
              ],
              "end": 8,
              "kind": "var",
              "loc": {
                "end": {
                  "column": 8,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1,
                }
              },
              "start": 0,
              "type": "VariableDeclaration",
            }
          ],
          "end": 8,
          "loc": {
            "end": {
              "column": 8,
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
});

    it('should parse "var \\u{1EE00}"', () => {
        expect(parseScript(`var \\u{1EE00}`, {
            ranges: true,
            raw: true,
            locations: true,
        })).to.eql({
              "body": [
                {
                  "declarations": [
                    {
                      "end": 13,
                     "id": {
                        "end": 13,
                        "loc": {
                          "end": {
                            "column": 13,
                            "line": 1,
                          },
                          "start": {
                            "column": 4,
                            "line": 1,
                          }
                        },
                        "name": "𞸀",
                        "start": 4,
                        "type": "Identifier",
                      },
                      "init": null,
                      "loc": {
                        "end": {
                          "column": 13,
                          "line": 1,
                        },
                        "start": {
                          "column": 4,
                         "line": 1,
                        },
                     },
                      "start": 4,
                      "type": "VariableDeclarator",
                    },
                  ],
                  "end": 13,
                  "kind": "var",
                  "loc": {
                    "end": {
                      "column": 13,
                      "line": 1,
                    },
                    "start": {
                      "column": 0,
                      "line": 1,
                    }
                  },
                 "start": 0,
                  "type": "VariableDeclaration",
                }
              ],
              "end": 13,
              "loc": {
                "end": {
                  "column": 13,
                  "line": 1,
                },
                "start": {
                  "column": 0,
                  "line": 1
               },
              },
              "sourceType": "script",
              "start": 0,
              "type": "Program"
            });
    });
});