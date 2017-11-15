import { n, pass, fail } from '../utils/test-utils';

describe('Destructuring - Parenthesized', () => {
  
      fail('([a]) = 0', '([a]) = 0');
      fail('({a}) = {}', '({a}) = {}');
      fail('([a]) = []', '([a]) = []');
      fail('var {(a)} = 0', 'var {(a)} = 0');
      fail('var [(a)] = 0', 'var [(a)] = 0');
      fail('([a]) = 0', '([a]) = 0');
      fail('({(a)} = 0)', '({(a)} = 0)');
      fail('(a, (b)) => 42', '(a, (b)) => 42');
      fail('({a, b}) = {a: 1, b: 2};', '({a, b}) = {a: 1, b: 2};');
      fail('({a, b}) = {a: 1, b:2};', '({a, b}) = {a: 1, b:2};');
      fail('{a:(b = 0)} = 1', '{a:(b = 0)} = 1');
      fail('{b} = b;', '{b} = b;');
      fail('([b]) = b;', '([b]) = b;');
      fail('([{constructor(){}}] = b);', '([{constructor(){}}] = b);');
  
      pass('should parse "({b} = b);"', `({b} = b);`, {
          "type": "Program",
          "start": 0,
          "end": 10,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 10
              }
          },
          "body": [{
              "type": "ExpressionStatement",
              "start": 0,
              "end": 10,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 10
                  }
              },
              "expression": {
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 4,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 1
                          },
                          "end": {
                              "line": 1,
                              "column": 4
                          }
                      },
                      "properties": [{
                          "type": "Property",
                          "start": 2,
                          "end": 3,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 2
                              },
                              "end": {
                                  "line": 1,
                                  "column": 3
                              }
                          },
                          "method": false,
                          "shorthand": true,
                          "computed": false,
                          "key": {
                              "type": "Identifier",
                              "start": 2,
                              "end": 3,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 2
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 3
                                  }
                              },
                              "name": "b"
                          },
                          "kind": "init",
                          "value": {
                              "type": "Identifier",
                              "start": 2,
                              "end": 3,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 2
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 3
                                  }
                              },
                              "name": "b"
                          }
                      }]
                  },
                  "right": {
                      "type": "Identifier",
                      "start": 7,
                      "end": 8,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 7
                          },
                          "end": {
                              "line": 1,
                              "column": 8
                          }
                      },
                      "name": "b"
                  }
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "({a, b} = {a: 1, b: 2});"', `({a, b} = {a: 1, b: 2});`, {
          "type": "Program",
          "start": 0,
          "end": 24,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 24
              }
          },
          "body": [{
              "type": "ExpressionStatement",
              "start": 0,
              "end": 24,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 24
                  }
              },
              "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 22,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 1
                      },
                      "end": {
                          "line": 1,
                          "column": 22
                      }
                  },
                  "operator": "=",
                  "left": {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 7,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 1
                          },
                          "end": {
                              "line": 1,
                              "column": 7
                          }
                      },
                      "properties": [{
                              "type": "Property",
                              "start": 2,
                              "end": 3,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 2
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 3
                                  }
                              },
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
                                  "type": "Identifier",
                                  "start": 2,
                                  "end": 3,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 2
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 3
                                      }
                                  },
                                  "name": "a"
                              },
                              "kind": "init",
                              "value": {
                                  "type": "Identifier",
                                  "start": 2,
                                  "end": 3,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 2
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 3
                                      }
                                  },
                                  "name": "a"
                              }
                          },
                          {
                              "type": "Property",
                              "start": 5,
                              "end": 6,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 5
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 6
                                  }
                              },
                              "method": false,
                              "shorthand": true,
                              "computed": false,
                              "key": {
                                  "type": "Identifier",
                                  "start": 5,
                                  "end": 6,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 5
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 6
                                      }
                                  },
                                  "name": "b"
                              },
                              "kind": "init",
                              "value": {
                                  "type": "Identifier",
                                  "start": 5,
                                  "end": 6,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 5
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 6
                                      }
                                  },
                                  "name": "b"
                              }
                          }
                      ]
                  },
                  "right": {
                      "type": "ObjectExpression",
                      "start": 10,
                      "end": 22,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 10
                          },
                          "end": {
                              "line": 1,
                              "column": 22
                          }
                      },
                      "properties": [{
                              "type": "Property",
                              "start": 11,
                              "end": 15,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 11
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 15
                                  }
                              },
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                  "type": "Identifier",
                                  "start": 11,
                                  "end": 12,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 11
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 12
                                      }
                                  },
                                  "name": "a"
                              },
                              "value": {
                                  "type": "Literal",
                                  "start": 14,
                                  "end": 15,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 14
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 15
                                      }
                                  },
                                  "value": 1,
                                  "raw": "1"
                              },
                              "kind": "init"
                          },
                          {
                              "type": "Property",
                              "start": 17,
                              "end": 21,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 17
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 21
                                  }
                              },
                              "method": false,
                              "shorthand": false,
                              "computed": false,
                              "key": {
                                  "type": "Identifier",
                                  "start": 17,
                                  "end": 18,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 17
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 18
                                      }
                                  },
                                  "name": "b"
                              },
                              "value": {
                                  "type": "Literal",
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
                                  "value": 2,
                                  "raw": "2"
                              },
                              "kind": "init"
                          }
                      ]
                  }
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "[a, b] = [1, 2] "', `[a, b] = [1, 2] `, {
          "type": "Program",
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
          "body": [{
              "type": "ExpressionStatement",
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
              "expression": {
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                      "type": "ArrayPattern",
                      "start": 0,
                      "end": 6,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 6
                          }
                      },
                      "elements": [{
                              "type": "Identifier",
                              "start": 1,
                              "end": 2,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 1
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 2
                                  }
                              },
                              "name": "a"
                          },
                          {
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
                              "name": "b"
                          }
                      ]
                  },
                  "right": {
                      "type": "ArrayExpression",
                      "start": 9,
                      "end": 15,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 9
                          },
                          "end": {
                              "line": 1,
                              "column": 15
                          }
                      },
                      "elements": [{
                              "type": "Literal",
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
                              "value": 1,
                              "raw": "1"
                          },
                          {
                              "type": "Literal",
                              "start": 13,
                              "end": 14,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 13
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 14
                                  }
                              },
                              "value": 2,
                              "raw": "2"
                          }
                      ]
                  }
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "[(a) = 0] = 1"', `[(a) = 0] = 1`, {
          "type": "Program",
          "start": 0,
          "end": 13,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 13
              }
          },
          "body": [{
              "type": "ExpressionStatement",
              "start": 0,
              "end": 13,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 13
                  }
              },
              "expression": {
                  "type": "AssignmentExpression",
                  "start": 0,
                  "end": 13,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 13
                      }
                  },
                  "operator": "=",
                  "left": {
                      "type": "ArrayPattern",
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
                      "elements": [{
                          "type": "AssignmentPattern",
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
                          "left": {
                              "type": "Identifier",
                              "start": 2,
                              "end": 3,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 2
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 3
                                  }
                              },
                              "name": "a"
                          },
                          "right": {
                              "type": "Literal",
                              "start": 7,
                              "end": 8,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 7
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 8
                                  }
                              },
                              "value": 0,
                              "raw": "0"
                          }
                      }]
                  },
                  "right": {
                      "type": "Literal",
                      "start": 12,
                      "end": 13,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 12
                          },
                          "end": {
                              "line": 1,
                              "column": 13
                          }
                      },
                      "value": 1,
                      "raw": "1"
                  }
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "[(a.b)] = 0"', `[(a.b)] = 0`, {
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
          "body": [{
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
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                      "type": "ArrayPattern",
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
                      "elements": [{
                          "type": "MemberExpression",
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
                          "object": {
                              "type": "Identifier",
                              "start": 2,
                              "end": 3,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 2
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 3
                                  }
                              },
                              "name": "a"
                          },
                          "property": {
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
                              "name": "b"
                          },
                          "computed": false
                      }]
                  },
                  "right": {
                      "type": "Literal",
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
                      "value": 0,
                      "raw": "0"
                  }
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "[a = (b = c)] = 0"', `[a = (b = c)] = 0`, {
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
          "body": [{
              "type": "ExpressionStatement",
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
              "expression": {
                  "type": "AssignmentExpression",
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
                  "operator": "=",
                  "left": {
                      "type": "ArrayPattern",
                      "start": 0,
                      "end": 13,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 13
                          }
                      },
                      "elements": [{
                          "type": "AssignmentPattern",
                          "start": 1,
                          "end": 12,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 1
                              },
                              "end": {
                                  "line": 1,
                                  "column": 12
                              }
                          },
                          "left": {
                              "type": "Identifier",
                              "start": 1,
                              "end": 2,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 1
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 2
                                  }
                              },
                              "name": "a"
                          },
                          "right": {
                              "type": "AssignmentExpression",
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
                              "operator": "=",
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
                                  "name": "b"
                              },
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
                                  "name": "c"
                              }
                          }
                      }]
                  },
                  "right": {
                      "type": "Literal",
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
                      "value": 0,
                      "raw": "0"
                  }
              }
          }],
          "sourceType": "script"
      });
  
  
      pass('should parse "[(a = 0)]"', `[(a = 0)]`, {
          "type": "Program",
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
          "body": [{
              "type": "ExpressionStatement",
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
              "expression": {
                  "type": "ArrayExpression",
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
                  "elements": [{
                      "type": "AssignmentExpression",
                      "start": 2,
                      "end": 7,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 2
                          },
                          "end": {
                              "line": 1,
                              "column": 7
                          }
                      },
                      "operator": "=",
                      "left": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 2
                              },
                              "end": {
                                  "line": 1,
                                  "column": 3
                              }
                          },
                          "name": "a"
                      },
                      "right": {
                          "type": "Literal",
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
                          "value": 0,
                          "raw": "0"
                      }
                  }]
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "({a:(b)} = 0)"', `({a:(b)} = 0)`, {
          "type": "Program",
          "start": 0,
          "end": 13,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 13
              }
          },
          "body": [{
              "type": "ExpressionStatement",
              "start": 0,
              "end": 13,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 13
                  }
              },
              "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 12,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 1
                      },
                      "end": {
                          "line": 1,
                          "column": 12
                      }
                  },
                  "operator": "=",
                  "left": {
                      "type": "ObjectPattern",
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
                      "properties": [{
                          "type": "Property",
                          "start": 2,
                          "end": 7,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 2
                              },
                              "end": {
                                  "line": 1,
                                  "column": 7
                              }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                              "type": "Identifier",
                              "start": 2,
                              "end": 3,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 2
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 3
                                  }
                              },
                              "name": "a"
                          },
                          "value": {
                              "type": "Identifier",
                              "start": 5,
                              "end": 6,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 5
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 6
                                  }
                              },
                              "name": "b"
                          },
                          "kind": "init"
                      }]
                  },
                  "right": {
                      "type": "Literal",
                      "start": 11,
                      "end": 12,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 11
                          },
                          "end": {
                              "line": 1,
                              "column": 12
                          }
                      },
                      "value": 0,
                      "raw": "0"
                  }
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "({a:(b) = 0} = 1)"', `({a:(b) = 0} = 1)`, {
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
          "body": [{
              "type": "ExpressionStatement",
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
              "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 16,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 1
                      },
                      "end": {
                          "line": 1,
                          "column": 16
                      }
                  },
                  "operator": "=",
                  "left": {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 12,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 1
                          },
                          "end": {
                              "line": 1,
                              "column": 12
                          }
                      },
                      "properties": [{
                          "type": "Property",
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
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                              "type": "Identifier",
                              "start": 2,
                              "end": 3,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 2
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 3
                                  }
                              },
                              "name": "a"
                          },
                          "value": {
                              "type": "AssignmentPattern",
                              "start": 4,
                              "end": 11,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 4
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 11
                                  }
                              },
                              "left": {
                                  "type": "Identifier",
                                  "start": 5,
                                  "end": 6,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 5
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 6
                                      }
                                  },
                                  "name": "b"
                              },
                              "right": {
                                  "type": "Literal",
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
                                  "value": 0,
                                  "raw": "0"
                              }
                          },
                          "kind": "init"
                      }]
                  },
                  "right": {
                      "type": "Literal",
                      "start": 15,
                      "end": 16,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 15
                          },
                          "end": {
                              "line": 1,
                              "column": 16
                          }
                      },
                      "value": 1,
                      "raw": "1"
                  }
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "({a:(b.c)} = 0)"', `({a:(b.c)} = 0)`, {
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
              "type": "ExpressionStatement",
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
              "expression": {
                  "type": "AssignmentExpression",
                  "start": 1,
                  "end": 14,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 1
                      },
                      "end": {
                          "line": 1,
                          "column": 14
                      }
                  },
                  "operator": "=",
                  "left": {
                      "type": "ObjectPattern",
                      "start": 1,
                      "end": 10,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 1
                          },
                          "end": {
                              "line": 1,
                              "column": 10
                          }
                      },
                      "properties": [{
                          "type": "Property",
                          "start": 2,
                          "end": 9,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 2
                              },
                              "end": {
                                  "line": 1,
                                  "column": 9
                              }
                          },
                          "method": false,
                          "shorthand": false,
                          "computed": false,
                          "key": {
                              "type": "Identifier",
                              "start": 2,
                              "end": 3,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 2
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 3
                                  }
                              },
                              "name": "a"
                          },
                          "value": {
                              "type": "MemberExpression",
                              "start": 5,
                              "end": 8,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 5
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 8
                                  }
                              },
                              "object": {
                                  "type": "Identifier",
                                  "start": 5,
                                  "end": 6,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 5
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 6
                                      }
                                  },
                                  "name": "b"
                              },
                              "property": {
                                  "type": "Identifier",
                                  "start": 7,
                                  "end": 8,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 7
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 8
                                      }
                                  },
                                  "name": "c"
                              },
                              "computed": false
                          },
                          "kind": "init"
                      }]
                  },
                  "right": {
                      "type": "Literal",
                      "start": 13,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 13
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      },
                      "value": 0,
                      "raw": "0"
                  }
              }
          }],
          "sourceType": "script"
      });
  
      pass('should parse "({a:(b = 0)})"', `({a:(b = 0)})`, {
          "type": "Program",
          "start": 0,
          "end": 13,
          "loc": {
              "start": {
                  "line": 1,
                  "column": 0
              },
              "end": {
                  "line": 1,
                  "column": 13
              }
          },
          "body": [{
              "type": "ExpressionStatement",
              "start": 0,
              "end": 13,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 13
                  }
              },
              "expression": {
                  "type": "ObjectExpression",
                  "start": 1,
                  "end": 12,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 1
                      },
                      "end": {
                          "line": 1,
                          "column": 12
                      }
                  },
                  "properties": [{
                      "type": "Property",
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
                      "method": false,
                      "shorthand": false,
                      "computed": false,
                      "key": {
                          "type": "Identifier",
                          "start": 2,
                          "end": 3,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 2
                              },
                              "end": {
                                  "line": 1,
                                  "column": 3
                              }
                          },
                          "name": "a"
                      },
                      "value": {
                          "type": "AssignmentExpression",
                          "start": 5,
                          "end": 10,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 5
                              },
                              "end": {
                                  "line": 1,
                                  "column": 10
                              }
                          },
                          "operator": "=",
                          "left": {
                              "type": "Identifier",
                              "start": 5,
                              "end": 6,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 5
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 6
                                  }
                              },
                              "name": "b"
                          },
                          "right": {
                              "type": "Literal",
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
                              "value": 0,
                              "raw": "0"
                          }
                      },
                      "kind": "init"
                  }]
              }
          }],
          "sourceType": "script"
      });
  });