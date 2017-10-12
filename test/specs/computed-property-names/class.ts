import { parseScript, parseModule } from '../../../src/cherow';
import * as chai from 'chai';

const expect = chai.expect;

describe('CPN - Class', () => {
  
    it('should parse getter', () => {
        expect(parseScript(`class C {
            get ['a']() {
              return 'A';
            }
          }`, {
            ranges: true,
            raw: true
        })).to.eql({
            "type": "Program",
            "start": 0,
            "end": 87,
            "body": [
              {
                "type": "ClassDeclaration",
                "start": 0,
                "end": 87,
                "id": {
                  "type": "Identifier",
                  "start": 6,
                  "end": 7,
                  "name": "C"
                },
                "superClass": null,
                "body": {
                  "type": "ClassBody",
                  "start": 8,
                  "end": 87,
                  "body": [
                    {
                      "type": "MethodDefinition",
                      "start": 22,
                      "end": 75,
                      "computed": true,
                      "key": {
                        "type": "Literal",
                        "start": 27,
                        "end": 30,
                        "value": "a",
                        "raw": "'a'"
                      },
                      "static": false,
                      "kind": "get",
                      "value": {
                        "type": "FunctionExpression",
                        "start": 31,
                        "end": 75,
                        "id": null,
                        "generator": false,
                        "expression": false,
                        "async": false,
                        "params": [],
                        "body": {
                          "type": "BlockStatement",
                          "start": 34,
                          "end": 75,
                          "body": [
                            {
                              "type": "ReturnStatement",
                              "start": 50,
                              "end": 61,
                              "argument": {
                                "type": "Literal",
                                "start": 57,
                                "end": 60,
                                "value": "A",
                                "raw": "'A'"
                              }
                            }
                          ]
                        }
                      }
                    }
                  ]
                }
              }
            ],
            "sourceType": "script"
          });
    });

    it('should parse setter', () => {
        expect(parseScript(`class C {
            set ['a'](_) {
            }
          }`, {
            ranges: true,
            raw: true,
            locations: true
        })).to.eql({
          "type": "Program",
          "start": 0,
          "end": 62,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 11
            }
          },
          "body": [
            {
              "type": "ClassDeclaration",
              "start": 0,
              "end": 62,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 4,
                  "column": 11
                }
              },
              "id": {
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
                "name": "C"
              },
              "superClass": null,
              "body": {
                "type": "ClassBody",
                "start": 8,
                "end": 62,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 8
                  },
                  "end": {
                    "line": 4,
                    "column": 11
                  }
                },
                "body": [
                  {
                    "type": "MethodDefinition",
                    "start": 22,
                    "end": 50,
                    "loc": {
                      "start": {
                        "line": 2,
                        "column": 12
                      },
                      "end": {
                        "line": 3,
                        "column": 13
                      }
                    },
                    "computed": true,
                    "key": {
                      "type": "Literal",
                      "start": 27,
                      "end": 30,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 17
                        },
                        "end": {
                          "line": 2,
                          "column": 20
                        }
                      },
                      "value": "a",
                      "raw": "'a'"
                    },
                    "static": false,
                    "kind": "set",
                    "value": {
                      "type": "FunctionExpression",
                      "start": 31,
                      "end": 50,
                      "loc": {
                        "start": {
                          "line": 2,
                          "column": 21
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
                          "start": 32,
                          "end": 33,
                          "loc": {
                            "start": {
                              "line": 2,
                              "column": 22
                            },
                            "end": {
                              "line": 2,
                              "column": 23
                            }
                          },
                          "name": "_"
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "start": 35,
                        "end": 50,
                        "loc": {
                          "start": {
                            "line": 2,
                            "column": 25
                          },
                          "end": {
                            "line": 3,
                            "column": 13
                          }
                        },
                        "body": []
                      }
                    }
                  }
                ]
              }
            }
          ],
          "sourceType": "script"
        });
    });

});