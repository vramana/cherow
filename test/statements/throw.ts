import { pass, fail } from '../utils';

describe('Statements - Throw', () => {
  
      pass(`throw x;`, {
          source: 'throw x;',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
            "type": "Program",
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
            "body": [
              {
                "type": "ThrowStatement",
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
                "argument": {
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
                  "name": "x"
                }
              }
            ],
            "sourceType": "script"
          }
      });
  
      pass(`throw x * y`, {
          source: 'throw x * y',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
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
                "type": "ThrowStatement",
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
                "argument": {
                  "type": "BinaryExpression",
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
                  "left": {
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
                    "name": "x"
                  },
                  "operator": "*",
                  "right": {
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
                  }
                }
              }
            ],
            "sourceType": "script"
          }
      });
    });