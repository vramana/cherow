import { pass, fail } from '../utils';

describe('Declarations - Lexical', () => {
   
        pass(`let a`, {
            source: 'let a',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
                "type": "Program",
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
                "body": [
                  {
                    "type": "VariableDeclaration",
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
                    "declarations": [
                      {
                        "type": "VariableDeclarator",
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
                        "id": {
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
                        },
                        "init": null
                      }
                    ],
                    "kind": "let"
                  }
                ],
                "sourceType": "script"
              }
        });

        pass(`while(true) var a`, {
            source: 'while(true) var a',
            loc: true,
            ranges: true,
            raw: true,
            expected: {
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
                    "type": "WhileStatement",
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
                    "test": {
                      "type": "Literal",
                      "start": 6,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 6
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "value": true,
                      "raw": "true"
                    },
                    "body": {
                      "type": "VariableDeclaration",
                      "start": 12,
                      "end": 17,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 12
                        },
                        "end": {
                          "line": 1,
                          "column": 17
                        }
                      },
                      "declarations": [
                        {
                          "type": "VariableDeclarator",
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
                            "name": "a"
                          },
                          "init": null
                        }
                      ],
                      "kind": "var"
                    }
                  }
                ],
                "sourceType": "script"
              }
        });

        fail(`while(true) let a`, {
            source: 'while(true) let a',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`while(true) const a`, {
            source: 'while(true) const a',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`with(true) let a`, {
            source: 'with(true) let a',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`with(true) class a {}`, {
            source: 'with(true) class a {}',
            loc: true,
            ranges: true,
            raw: true
        });

        fail(`a: let a`, {
            source: 'a: let a',
            loc: true,
            ranges: true,
            raw: true
        });
});