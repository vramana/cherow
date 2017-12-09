import { pass, fail } from '../utils';

describe('Declarations - Generator', () => {
  
      pass(`function* a(){}`, {
          source: 'function* a(){}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 15,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 15
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 15,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 15
                      }
                  },
                  "id": {
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
                      "name": "a"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 15,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 15
                          }
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          }
      });
  
      pass(`function* a(){yield a}`, {
          source: 'function* a(){yield a}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 22,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 22
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 22,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 22
                      }
                  },
                  "id": {
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
                      "name": "a"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 22,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 22
                          }
                      },
                      "body": [{
                          "type": "ExpressionStatement",
                          "start": 14,
                          "end": 21,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 14
                              },
                              "end": {
                                  "line": 1,
                                  "column": 21
                              }
                          },
                          "expression": {
                              "type": "YieldExpression",
                              "start": 14,
                              "end": 21,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 14
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 21
                                  }
                              },
                              "delegate": false,
                              "argument": {
                                  "type": "Identifier",
                                  "start": 20,
                                  "end": 21,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 20
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 21
                                      }
                                  },
                                  "name": "a"
                              }
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          }
      });
  
      pass(`function* yield(){}`, {
          source: 'function* yield(){}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 19,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 19
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 19,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 19
                      }
                  },
                  "id": {
                      "type": "Identifier",
                      "start": 10,
                      "end": 15,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 10
                          },
                          "end": {
                              "line": 1,
                              "column": 15
                          }
                      },
                      "name": "yield"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 17,
                      "end": 19,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 17
                          },
                          "end": {
                              "line": 1,
                              "column": 19
                          }
                      },
                      "body": []
                  }
              }],
              "sourceType": "script"
          }
      });
  
      pass(`function* a(){({[yield]:a}=0)}`, {
          source: 'function* a(){({[yield]:a}=0)}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "body": [{
                  "type": "FunctionDeclaration",
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [{
                          "type": "ExpressionStatement",
                          "expression": {
                              "type": "AssignmentExpression",
                              "left": {
                                  "type": "ObjectPattern",
                                  "properties": [{
                                      "type": "Property",
                                      "key": {
                                          "type": "YieldExpression",
                                          "argument": null,
                                          "delegate": false,
                                          "start": 17,
                                          "end": 22,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 17
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 22
                                              }
                                          }
                                      },
                                      "value": {
                                          "type": "Identifier",
                                          "name": "a",
                                          "start": 24,
                                          "end": 25,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 24
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 25
                                              }
                                          }
                                      },
                                      "kind": "init",
                                      "computed": true,
                                      "method": false,
                                      "shorthand": false,
                                      "start": 16,
                                      "end": 25,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 16
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 25
                                          }
                                      }
                                  }],
                                  "start": 15,
                                  "end": 26,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 15
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 26
                                      }
                                  }
                              },
                              "operator": "=",
                              "right": {
                                  "type": "Literal",
                                  "value": 0,
                                  "start": 27,
                                  "end": 28,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 27
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 28
                                      }
                                  },
                                  "raw": "0"
                              },
                              "start": 15,
                              "end": 28,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 28
                                  }
                              }
                          },
                          "start": 14,
                          "end": 29,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 14
                              },
                              "end": {
                                  "line": 1,
                                  "column": 29
                              }
                          }
                      }],
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
                      }
                  },
                  "async": false,
                  "generator": true,
                  "expression": false,
                  "id": {
                      "type": "Identifier",
                      "name": "a",
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
                      }
                  },
                  "start": 0,
                  "end": 30,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 30
                      }
                  }
              }],
              "sourceType": "script",
              "start": 0,
              "end": 30,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 30
                  }
              }
          }
      });
  
      pass(`function* a() {} function a() {}`, {
          source: 'function* a() {} function a() {}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 32,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 32
                  }
              },
              "body": [{
                      "type": "FunctionDeclaration",
                      "start": 0,
                      "end": 16,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 16
                          }
                      },
                      "id": {
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
                          "name": "a"
                      },
                      "generator": true,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "start": 14,
                          "end": 16,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 14
                              },
                              "end": {
                                  "line": 1,
                                  "column": 16
                              }
                          },
                          "body": []
                      }
                  },
                  {
                      "type": "FunctionDeclaration",
                      "start": 17,
                      "end": 32,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 17
                          },
                          "end": {
                              "line": 1,
                              "column": 32
                          }
                      },
                      "id": {
                          "type": "Identifier",
                          "start": 26,
                          "end": 27,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 26
                              },
                              "end": {
                                  "line": 1,
                                  "column": 27
                              }
                          },
                          "name": "a"
                      },
                      "generator": false,
                      "expression": false,
                      "async": false,
                      "params": [],
                      "body": {
                          "type": "BlockStatement",
                          "start": 30,
                          "end": 32,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 30
                              },
                              "end": {
                                  "line": 1,
                                  "column": 32
                              }
                          },
                          "body": []
                      }
                  }
              ],
              "sourceType": "script"
          }
      });
  
      pass(`function a() { function* a() {} function a() {} }`, {
          source: 'function a() { function* a() {} function a() {} }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 49,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 49
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 49,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 49
                      }
                  },
                  "id": {
                      "type": "Identifier",
                      "start": 9,
                      "end": 10,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 10
                          }
                      },
                      "name": "a"
                  },
                  "generator": false,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 49,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 49
                          }
                      },
                      "body": [{
                              "type": "FunctionDeclaration",
                              "start": 15,
                              "end": 31,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 15
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 31
                                  }
                              },
                              "id": {
                                  "type": "Identifier",
                                  "start": 25,
                                  "end": 26,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 25
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 26
                                      }
                                  },
                                  "name": "a"
                              },
                              "generator": true,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                  "type": "BlockStatement",
                                  "start": 29,
                                  "end": 31,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 29
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 31
                                      }
                                  },
                                  "body": []
                              }
                          },
                          {
                              "type": "FunctionDeclaration",
                              "start": 32,
                              "end": 47,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 32
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 47
                                  }
                              },
                              "id": {
                                  "type": "Identifier",
                                  "start": 41,
                                  "end": 42,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 41
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 42
                                      }
                                  },
                                  "name": "a"
                              },
                              "generator": false,
                              "expression": false,
                              "async": false,
                              "params": [],
                              "body": {
                                  "type": "BlockStatement",
                                  "start": 45,
                                  "end": 47,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 45
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 47
                                      }
                                  },
                                  "body": []
                              }
                          }
                      ]
                  }
              }],
              "sourceType": "script"
          }
      });
      
      pass(`function* a(){({yield:a}=0)}`, {
        source: 'function* a(){({yield:a}=0)}',
        loc: true,
        ranges: true,
        raw: true,
        expected: {
          "type": "Program",
          "body": [
              {
                  "type": "FunctionDeclaration",
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "body": [
                          {
                              "type": "ExpressionStatement",
                              "expression": {
                                  "type": "AssignmentExpression",
                                  "left": {
                                      "type": "ObjectPattern",
                                      "properties": [
                                          {
                                              "type": "Property",
                                              "key": {
                                                  "type": "Identifier",
                                                  "name": "yield",
                                                  "start": 16,
                                                  "end": 21,
                                                  "loc": {
                                                      "start": {
                                                          "line": 1,
                                                          "column": 16
                                                      },
                                                      "end": {
                                                          "line": 1,
                                                          "column": 21
                                                      }
                                                  }
                                              },
                                              "value": {
                                                  "type": "Identifier",
                                                  "name": "a",
                                                  "start": 22,
                                                  "end": 23,
                                                  "loc": {
                                                      "start": {
                                                          "line": 1,
                                                          "column": 22
                                                      },
                                                      "end": {
                                                          "line": 1,
                                                          "column": 23
                                                      }
                                                  }
                                              },
                                              "kind": "init",
                                              "computed": false,
                                              "method": false,
                                              "shorthand": false,
                                              "start": 16,
                                              "end": 23,
                                              "loc": {
                                                  "start": {
                                                      "line": 1,
                                                      "column": 16
                                                  },
                                                  "end": {
                                                      "line": 1,
                                                      "column": 23
                                                  }
                                              }
                                          }
                                      ],
                                      "start": 15,
                                      "end": 24,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 15
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 24
                                          }
                                      }
                                  },
                                  "operator": "=",
                                  "right": {
                                      "type": "Literal",
                                      "value": 0,
                                      "start": 25,
                                      "end": 26,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 25
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 26
                                          }
                                      },
                                      "raw": "0"
                                  },
                                  "start": 15,
                                  "end": 26,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 15
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 26
                                      }
                                  }
                              },
                              "start": 14,
                              "end": 27,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 14
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 27
                                  }
                              }
                          }
                      ],
                      "start": 13,
                      "end": 28,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 28
                          }
                      }
                  },
                  "async": false,
                  "generator": true,
                  "expression": false,
                  "id": {
                      "type": "Identifier",
                      "name": "a",
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
                      }
                  },
                  "start": 0,
                  "end": 28,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 28
                      }
                  }
              }
          ],
          "sourceType": "script",
          "start": 0,
          "end": 28,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 28
              }
          }
      }
      });

      pass(`function* a(){yield}`, {
          source: 'function* a(){yield}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 20,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 20
                  }
              },
              "body": [{
                  "type": "FunctionDeclaration",
                  "start": 0,
                  "end": 20,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 20
                      }
                  },
                  "id": {
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
                      "name": "a"
                  },
                  "generator": true,
                  "expression": false,
                  "async": false,
                  "params": [],
                  "body": {
                      "type": "BlockStatement",
                      "start": 13,
                      "end": 20,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 20
                          }
                      },
                      "body": [{
                          "type": "ExpressionStatement",
                          "start": 14,
                          "end": 19,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 14
                              },
                              "end": {
                                  "line": 1,
                                  "column": 19
                              }
                          },
                          "expression": {
                              "type": "YieldExpression",
                              "start": 14,
                              "end": 19,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 14
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 19
                                  }
                              },
                              "delegate": false,
                              "argument": null
                          }
                      }]
                  }
              }],
              "sourceType": "script"
          }
      });
  
      fail(`function*g(yield){}`, {
          source: 'function*g(yield){}',
      });
  
      fail(`function*g({yield}){}`, {
          source: 'function*g({yield}){}',
      });
  
      fail(`function*g([yield]){}`, {
          source: 'function*g([yield]){}',
      });
  
      fail(`function*g({a: yield}){}`, {
          source: 'function*g({a: yield}){}',
      });
  
      fail(`function*g(yield = 0){}`, {
          source: 'function*g(yield = 0){}',
      });
  
      fail(`function*g(){ var yield = 1; }`, {
          source: 'function*g(){ var yield = 1; }',
      });
  
      fail(`function*g(){ function yield(){}; }`, {
          source: 'function*g(){ function yield(){}; }',
      });
  
      fail(`function*g() { var yield; }`, {
          source: 'function*g() { var yield; }',
      });
  
      fail(`function*g() { let yield; }`, {
          source: 'function*g() { let yield; }',
      });
  
      fail(`function*g() { try {} catch (yield) {} }`, {
          source: 'function*g() { try {} catch (yield) {} }',
      });
  
      fail(`function*g() { ({yield}); }`, {
          source: 'function*g() { ({yield}); }',
      });
      fail(`function*g() { ({yield} = 0); }`, {
          source: 'function*g() { ({yield} = 0); }',
      });
  
      fail(`function*g() { var {yield} = 0; }`, {
          source: 'function*g() { var {yield} = 0; }',
      });
  
      fail(`function*g() { for ({yield} in 0); }`, {
          source: 'function*g() { for ({yield} in 0); }',
      });
  
      fail(`function*g() { ({yield = 0}); }`, {
          source: 'function*g() { ({yield = 0}); }',
      });
  
      fail(`function*g() { ({yield = 0} = 0); }`, {
          source: 'function*g() { ({yield = 0} = 0); }',
      });
  
      fail(`function*g() { var {yield = 0} = 0; }`, {
          source: 'function*g() { var {yield = 0} = 0; }',
      });
  
      fail(`function*g() { for ({yield = 0} in 0); }`, {
          source: 'function*g() { for ({yield = 0} in 0); }',
      });
  
      fail(`label: function* a(){}`, {
          source: 'label: function* a(){}',
      });
  
      fail(`function*g(){ var yield; }`, {
          source: 'function*g(){ var yield; }',
      });
  
      fail(`function*g() { ({yield = 0} = 0); }`, {
          source: 'function*g() { ({yield = 0} = 0); }',
      });
  
      fail(`function*g() { var {yield = 0} = 0; }`, {
          source: 'function*g() { var {yield = 0} = 0; }',
      });
  
      fail(`function*g() { for ({yield = 0} in 0); }`, {
          source: 'function*g() { for ({yield = 0} in 0); }',
      });
  
  });