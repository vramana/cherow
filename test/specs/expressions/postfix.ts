import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('Espressions - Postfix', () => {

    it('should parse "x++"', () => {
        expect(parseScript('x++', {
            locations: true,
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
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
            "body": [
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "UpdateExpression",
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
                  "operator": "++",
                  "prefix": false,
                  "argument": {
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "x--"', () => {
        expect(parseScript('x--', {
            locations: true,
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
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
            "body": [
              {
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "UpdateExpression",
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
                  "operator": "--",
                  "prefix": false,
                  "argument": {
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
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "eval++"', () => {
        expect(parseScript('eval++')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "++",
                        "argument": {
                            "type": "Identifier",
                            "name": "eval"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "eval--"', () => {
        expect(parseScript('eval--')).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UpdateExpression",
                        "operator": "--",
                        "argument": {
                            "type": "Identifier",
                            "name": "eval"
                        },
                        "prefix": false
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "arguments++"', () => {
        expect(parseScript('arguments++', {
          locations: true,
          raw: true,
          ranges: true
      })).to.eql({
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "UpdateExpression",
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
              "operator": "++",
              "prefix": false,
              "argument": {
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
                "name": "arguments"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });

    it('should parse "arguments--"', () => {
        expect(parseScript('arguments--', {
          locations: true,
          raw: true,
          ranges: true
      })).to.eql({
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
            "type": "ExpressionStatement",
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
            "expression": {
              "type": "UpdateExpression",
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
              "operator": "--",
              "prefix": false,
              "argument": {
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
                "name": "arguments"
              }
            }
          }
        ],
        "sourceType": "script"
      });
    });
});
