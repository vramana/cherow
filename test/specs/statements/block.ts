import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Statement - Block', () => {

    it('should fail if BlockStatement exist inside of expression', () => {
        expect(() => { parseScript(`y={__func;}();`)}).to.throw();
    });

    it('should fail if BlockStatement exist inside of expression', () => {
        expect(() => { parseScript(`y={x;};`)}).to.throw();
    });
    
    it('should parse "{ throw error/* Multiline\nComment */error; }"', () => {
      expect(parseScript('{ throw error/* Multiline\nComment */error; }', {
          raw: true
      })).to.eql({
            "body": [
              {
                "body": [
                 {
                    "argument": {
                      "name": "error",
                      "type": "Identifier",
                    },
                    "type": "ThrowStatement"
                  },
                  {
                    "expression": {
                      "name": "error",
                      "type": "Identifier",
                    },
                    "type": "ExpressionStatement"
                  }
                ],
                "type": "BlockStatement"
              }
           ],
            "sourceType": "script",
            "type": "Program"
          });
  });
  
    it('should parse "{ foo }"', () => {
        expect(parseScript(`{ foo }`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
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
            "body": [
              {
                "type": "BlockStatement",
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
                "body": [
                  {
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "Identifier",
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
                      "name": "foo"
                    }
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "{ doThis(); doThat(); }"', () => {
        expect(parseScript(`{ doThis(); doThat(); }`, {
            raw: true,
            ranges: true,
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
                "type": "BlockStatement",
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
                    "start": 2,
                    "end": 11,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 2
                      },
                      "end": {
                        "line": 1,
                        "column": 11
                      }
                    },
                    "expression": {
                      "type": "CallExpression",
                      "start": 2,
                      "end": 10,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 2
                        },
                        "end": {
                          "line": 1,
                          "column": 10
                        }
                      },
                      "callee": {
                        "type": "Identifier",
                        "start": 2,
                        "end": 8,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 2
                          },
                          "end": {
                            "line": 1,
                            "column": 8
                          }
                        },
                        "name": "doThis"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "type": "ExpressionStatement",
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
                    "expression": {
                      "type": "CallExpression",
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
                      "callee": {
                        "type": "Identifier",
                        "start": 12,
                        "end": 18,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 12
                          },
                          "end": {
                            "line": 1,
                            "column": 18
                          }
                        },
                        "name": "doThat"
                      },
                      "arguments": []
                    }
                  }
                ]
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "{}"', () => {
        expect(parseScript(`{}`, {
            raw: true,
            ranges: true,
            locations: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 2,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 2
              }
            },
            "body": [
              {
                "type": "BlockStatement",
                "start": 0,
                "end": 2,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 2
                  }
                },
                "body": []
              }
            ],
            "sourceType": "script"
          });
    });
});