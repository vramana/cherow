import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect; 

describe('Espressions - bitwise not', () => {

    it('should parse "~false"', () => {
        expect(parseScript('~false', { 
            raw: true 
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "UnaryExpression",
                        "operator": "~",
                        "argument": {
                            "type": "Literal",
                            "value": false,
                            "raw": "false"
                        },
                        "prefix": true
                    }
                }
            ],
            "sourceType": "script"
        });
    });

    it('should parse "~2147483647"', () => {
        expect(parseScript('~2147483647')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "~",
                    "argument": {
                        "type": "Literal",
                        "value": 2147483647
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "~4294967295"', () => {
        expect(parseScript('~4294967295')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "~",
                    "argument": {
                        "type": "Literal",
                        "value": 4294967295
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "~(function(){return 1}) === -1"', () => {
        expect(parseScript('~(function(){return 1}) === -1')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "BinaryExpression",
                    "operator": "===",
                    "left": {
                        "type": "UnaryExpression",
                        "operator": "~",
                        "argument": {
                            "type": "FunctionExpression",
                            "id": null,
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [{
                                    "type": "ReturnStatement",
                                    "argument": {
                                        "type": "Literal",
                                        "value": 1
                                    }
                                }]
                            },
                            "generator": false,
                            "expression": false,
                            "async": false
                        },
                        "prefix": true
                    },
                    "right": {
                        "type": "UnaryExpression",
                        "operator": "-",
                        "argument": {
                            "type": "Literal",
                            "value": 1
                        },
                        "prefix": true
                    }
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "~1.2345"', () => {
        expect(parseScript('~1.2345')).to.eql({
            "type": "Program",
            "body": [{
                "type": "ExpressionStatement",
                "expression": {
                    "type": "UnaryExpression",
                    "operator": "~",
                    "argument": {
                        "type": "Literal",
                        "value": 1.2345
                    },
                    "prefix": true
                }
            }],
            "sourceType": "script"
        });
    });

    it('should parse "~-5.4321"', () => {
        expect(parseScript('~-5.4321', {
            locations: true,
            ranges: true,
            raw: true
        })).to.eql({
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
                  "type": "UnaryExpression",
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
                  "operator": "~",
                  "prefix": true,
                  "argument": {
                    "type": "UnaryExpression",
                    "start": 1,
                    "end": 8,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 1
                      },
                      "end": {
                        "line": 1,
                        "column": 8
                      }
                    },
                    "operator": "-",
                    "prefix": true,
                    "argument": {
                      "type": "Literal",
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
                      "value": 5.4321,
                      "raw": "5.4321"
                    }
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse "~({})"', () => {
        expect(parseScript('~({})', {
            locations: true,
            ranges: true,
            raw: true
        })).to.eql({
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
                "type": "ExpressionStatement",
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
                "expression": {
                  "type": "UnaryExpression",
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
                  "operator": "~",
                  "prefix": true,
                  "argument": {
                    "type": "ObjectExpression",
                    "start": 2,
                    "end": 4,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 2
                      },
                      "end": {
                        "line": 1,
                        "column": 4
                      }
                    },
                    "properties": []
                  }
                }
              }
            ],
            "sourceType": "script"
          });
    });

});