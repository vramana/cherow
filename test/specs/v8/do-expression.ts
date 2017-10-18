import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('V8 - Do expression', () => {

    it('should parse conditional', () => {
        expect(parseScript("`\x1b[2m[${count}]\x1b[22m ${a || '<empty>'} => ${b || '<empty>'}`", {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
              "body": [
                {
                  "declarations": [
                    {
                      "end": 116,
                      "id": {
                        "end": 5,
                        "name": "x",
                        "start": 4,
                        "type": "Identifier"
                      },
                      "init": {
                        "body": {
                          "body": [
                           {
                              "alternate": {
                                "alternate": {
                                  "body": [
                                    {
                                      "end": 102,
                                      "expression": {
                                       "arguments": [],
                                        "callee": {
                                          "end": 100,
                                          "name": "h",
                                        "start": 99,
                                          "type": "Identifier"
                                        },
                                       "end": 102,
                                        "start": 99,
                                        "type": "CallExpression"
                                      },
                                      "start": 99,
                                      "type": "ExpressionStatement"
                                    }
                                  ],
                                  "end": 104,
                                  "start": 97,
                                  "type": "BlockStatement"
                                },
                                "consequent": {
                                  "body": [
                                    {
                                      "end": 77,
                                      "expression": {
                                        "arguments": [],
                                        "callee": {
                                          "end": 75,
                                         "name": "g",
                                          "start": 74,
                                          "type": "Identifier"
                                        },
                                        "end": 77,
                                        "start": 74,
                                        "type": "CallExpression",
                                      },
                                      "start": 74,
                                      "type": "ExpressionStatement"
                                    }
                                  ],
                                  "end": 79,
                                  "start": 72,
                                  "type": "BlockStatement",
                                },
                                "end": 104,
                               "start": 61,
                                "test": {
                                  "arguments": [],
                                  "callee": {
                                    "end": 68,
                                    "name": "bar",
                                    "start": 65,
                                    "type": "Identifier",
                                  },
                                  "end": 70,
                                  "start": 65,
                                  "type": "CallExpression",
                                },
                                "type": "IfStatement",
                              },
                              "consequent": {
                                "body": [
                                  {
                                    "end": 41,
                                    "expression": {
                                      "arguments": [],
                                      "callee": {
                                        "end": 39,
                                        "name": "f",
                                        "start": 38,
                                        "type": "Identifier",
                                      },
                                      "end": 41,
                                      "start": 38,
                                      "type": "CallExpression"
                                    },
                                    "start": 38,
                                    "type": "ExpressionStatement"
                                  }
                                ],
                                "end": 43,
                                "start": 36,
                                "type": "BlockStatement"
                              },
                              "end": 104,
                              "start": 25,
                              "test": {
                                "arguments": [],
                                "callee": {
                                  "end": 32,
                                  "name": "foo",
                                  "start": 29,
                                  "type": "Identifier"
                                },
                                "end": 34,
                                "start": 29,
                                "type": "CallExpression"
                              },
                             "type": "IfStatement",
                            },
                          ],
                          "end": 116,
                          "start": 11,
                          "type": "BlockStatement",
                        },
                        "end": 116,
                        "start": 8,
                        "type": "DoExpression",
                      },
                     "start": 4,
                      "type": "VariableDeclarator",
                    },
                  ],
                  "end": 117,
                  "kind": "let",
                  "start": 0,
                  "type": "VariableDeclaration",
                },
              ],
              "end": 117,
             "sourceType": "script",
              "start": 0,
              "type": "Program",
            });
    });

    it('should parse scoping variable', () => {
        expect(parseScript(`let x = do {
            let tmp = f();
            tmp * tmp + 1
          };`, {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "DoExpression",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "VariableDeclaration",
                                            "declarations": [
                                                {
                                                    "type": "VariableDeclarator",
                                                    "init": {
                                                        "type": "CallExpression",
                                                        "arguments": [],
                                                        "callee": {
                                                            "type": "Identifier",
                                                            "name": "f",
                                                            "start": 35,
                                                            "end": 36
                                                        },
                                                        "start": 35,
                                                        "end": 38
                                                    },
                                                    "id": {
                                                        "type": "Identifier",
                                                        "name": "tmp",
                                                        "start": 29,
                                                        "end": 32
                                                    },
                                                    "start": 29,
                                                    "end": 38
                                                }
                                            ],
                                            "kind": "let",
                                            "start": 25,
                                            "end": 39
                                        },
                                        {
                                            "type": "ExpressionStatement",
                                            "expression": {
                                                "type": "BinaryExpression",
                                                "left": {
                                                    "type": "BinaryExpression",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "tmp",
                                                        "start": 52,
                                                        "end": 55
                                                    },
                                                    "right": {
                                                        "type": "Identifier",
                                                        "name": "tmp",
                                                        "start": 58,
                                                        "end": 61
                                                    },
                                                    "operator": "*",
                                                    "start": 52,
                                                    "end": 61
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "value": 1,
                                                    "start": 64,
                                                    "end": 65,
                                                    "raw": "1"
                                                },
                                                "operator": "+",
                                                "start": 52,
                                                "end": 65
                                            },
                                            "start": 52,
                                            "end": 65
                                        }
                                    ],
                                    "start": 11,
                                    "end": 77
                                },
                                "start": 8,
                                "end": 77
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 4,
                                "end": 5
                            },
                            "start": 4,
                            "end": 77
                        }
                    ],
                    "kind": "let",
                    "start": 0,
                    "end": 78
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 78
        });
    });

    it('should parse complex', () => {
        expect(parseScript(`let x = 100;
        let y = 20;
        
        let a = do {
          if(x > 10) {
            if(y > 20) {
              'big x, big y';
            } else {
              'big x, small y';
            }
          } else {
            if(y > 10) {
              'small x, big y';
            } else {
              'small x, small y';
            }
          }
        };`, {
            ranges: true,
            raw: true,
            v8: true
        })).to.eql({
            "type": "Program",
            "body": [
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 100,
                                "start": 8,
                                "end": 11,
                                "raw": "100"
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 4,
                                "end": 5
                            },
                            "start": 4,
                            "end": 11
                        }
                    ],
                    "kind": "let",
                    "start": 0,
                    "end": 12
                },
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "Literal",
                                "value": 20,
                                "start": 29,
                                "end": 31,
                                "raw": "20"
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "y",
                                "start": 25,
                                "end": 26
                            },
                            "start": 25,
                            "end": 31
                        }
                    ],
                    "kind": "let",
                    "start": 21,
                    "end": 32
                },
                {
                    "type": "VariableDeclaration",
                    "declarations": [
                        {
                            "type": "VariableDeclarator",
                            "init": {
                                "type": "DoExpression",
                                "body": {
                                    "type": "BlockStatement",
                                    "body": [
                                        {
                                            "type": "IfStatement",
                                            "test": {
                                                "type": "BinaryExpression",
                                                "left": {
                                                    "type": "Identifier",
                                                    "name": "x",
                                                    "start": 76,
                                                    "end": 77
                                                },
                                                "right": {
                                                    "type": "Literal",
                                                    "value": 10,
                                                    "start": 80,
                                                    "end": 82,
                                                    "raw": "10"
                                                },
                                                "operator": ">",
                                                "start": 76,
                                                "end": 82
                                            },
                                            "alternate": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "IfStatement",
                                                        "test": {
                                                            "type": "BinaryExpression",
                                                            "left": {
                                                                "type": "Identifier",
                                                                "name": "y",
                                                                "start": 242,
                                                                "end": 243
                                                            },
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 10,
                                                                "start": 246,
                                                                "end": 248,
                                                                "raw": "10"
                                                            },
                                                            "operator": ">",
                                                            "start": 242,
                                                            "end": 248
                                                        },
                                                        "alternate": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ExpressionStatement",
                                                                    "expression": {
                                                                        "type": "Literal",
                                                                        "value": "small x, small y",
                                                                        "start": 319,
                                                                        "end": 337,
                                                                        "raw": "'small x, small y'"
                                                                    },
                                                                    "start": 319,
                                                                    "end": 338
                                                                }
                                                            ],
                                                            "start": 303,
                                                            "end": 352
                                                        },
                                                        "consequent": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ExpressionStatement",
                                                                    "expression": {
                                                                        "type": "Literal",
                                                                        "value": "small x, big y",
                                                                        "start": 266,
                                                                        "end": 282,
                                                                        "raw": "'small x, big y'"
                                                                    },
                                                                    "start": 266,
                                                                    "end": 283
                                                                }
                                                            ],
                                                            "start": 250,
                                                            "end": 297
                                                        },
                                                        "start": 239,
                                                        "end": 352
                                                    }
                                                ],
                                                "start": 225,
                                                "end": 364
                                            },
                                            "consequent": {
                                                "type": "BlockStatement",
                                                "body": [
                                                    {
                                                        "type": "IfStatement",
                                                        "test": {
                                                            "type": "BinaryExpression",
                                                            "left": {
                                                                "type": "Identifier",
                                                                "name": "y",
                                                                "start": 101,
                                                                "end": 102
                                                            },
                                                            "right": {
                                                                "type": "Literal",
                                                                "value": 20,
                                                                "start": 105,
                                                                "end": 107,
                                                                "raw": "20"
                                                            },
                                                            "operator": ">",
                                                            "start": 101,
                                                            "end": 107
                                                        },
                                                        "alternate": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ExpressionStatement",
                                                                    "expression": {
                                                                        "type": "Literal",
                                                                        "value": "big x, small y",
                                                                        "start": 176,
                                                                        "end": 192,
                                                                        "raw": "'big x, small y'"
                                                                    },
                                                                    "start": 176,
                                                                    "end": 193
                                                                }
                                                            ],
                                                            "start": 160,
                                                            "end": 207
                                                        },
                                                        "consequent": {
                                                            "type": "BlockStatement",
                                                            "body": [
                                                                {
                                                                    "type": "ExpressionStatement",
                                                                    "expression": {
                                                                        "type": "Literal",
                                                                        "value": "big x, big y",
                                                                        "start": 125,
                                                                        "end": 139,
                                                                        "raw": "'big x, big y'"
                                                                    },
                                                                    "start": 125,
                                                                    "end": 140
                                                                }
                                                            ],
                                                            "start": 109,
                                                            "end": 154
                                                        },
                                                        "start": 98,
                                                        "end": 207
                                                    }
                                                ],
                                                "start": 84,
                                                "end": 219
                                            },
                                            "start": 73,
                                            "end": 364
                                        }
                                    ],
                                    "start": 61,
                                    "end": 374
                                },
                                "start": 58,
                                "end": 374
                            },
                            "id": {
                                "type": "Identifier",
                                "name": "a",
                                "start": 54,
                                "end": 55
                            },
                            "start": 54,
                            "end": 374
                        }
                    ],
                    "kind": "let",
                    "start": 50,
                    "end": 375
                }
            ],
            "sourceType": "script",
            "start": 0,
            "end": 375
        });
    });

});