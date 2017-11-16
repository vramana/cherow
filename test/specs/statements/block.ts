import { fail, pass } from '../utils/test-utils';

describe('Statement - Block', () => {
  
      fail('BlockStatement exist inside of expression', 'y={__func;}();');
  
      fail('BlockStatement exist inside of expression', 'y={x;};');
      
      fail('labelled let inside BlockStatement', `{
        L: let
        [a] = 0;
    }`);

      pass('should parse "{ foo }"', `{ foo }`, {
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
          "body": [{
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
              "body": [{
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
              }]
          }],
          "sourceType": "script"
      });
  
      pass('should parse "{ doThis(); doThat(); }"', `{ doThis(); doThat(); }`, {
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
          "body": [{
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
              "body": [{
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
          }],
          "sourceType": "script"
      });
  
      pass('should parse "{}"', `{}`, {
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
          "body": [{
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
          }],
          "sourceType": "script"
      });
  });