import {  pass, fail} from '../utils';

describe('Statements - Switch', () => {
  
      describe('Redeclaration', () => {
  
          fail(`switch (0) { case 1: const f = 0; default: async function f() {} }`, {
              source: 'switch (0) { case 1: const f = 0; default: async function f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: const f = 0; default: async function* f() {} }`, {
              source: 'switch (0) { case 1: const f = 0; default: async function* f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: const f = 0; default: class f {}; }`, {
              source: 'switch (0) { case 1: const f = 0; default: class f {}; }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: const f = 0; default: const f = 0; }`, {
              source: 'switch (0) { case 1: const f = 0; default: const f = 0; }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: const f = 0; default: function f() {} }`, {
              source: 'switch (0) { case 1: const f = 0; default: function f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: const f = 0; default: function* f() {} }`, {
              source: 'switch (0) { case 1: const f = 0; default: function* f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: const f = 0; default: let f; }`, {
              source: 'switch (0) { case 1: const f = 0; default: let f; }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: const f = 0; default: var f; }`, {
              source: 'switch (0) { case 1: const f = 0; default: var f; }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function f() {} default: async function f() {} }`, {
              source: 'switch (0) { case 1: function f() {} default: async function f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function f() {} default: async function* f() {} }`, {
              source: 'switch (0) { case 1: function f() {} default: async function* f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function f() {} default: const f = 0; }`, {
              source: 'switch (0) { case 1: function f() {} default: const f = 0; }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function f() {} default: function f() {} }`, {
              source: 'switch (0) { case 1: function f() {} default: function f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function f() {} default: function* f() {} }`, {
              source: 'switch (0) { case 1: function f() {} default: function* f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function f() {} default: let f; }`, {
              source: 'switch (0) { case 1: function f() {} default: let f; }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          // fail(`switch (0) { case 1: function f() {} default: var f; }`, {
             //  source: 'switch (0) { case 1: function f() {} default: var f; }',
              // loc: true,
              // ranges: true,
              // raw: true
          // });
  
          fail(`switch (0) { case 1: function* f() {} default: async function f() {} }`, {
              source: 'switch (0) { case 1: function* f() {} default: async function f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function* f() {} default: async function* f() {} }`, {
              source: 'switch (0) { case 1: function* f() {} default: async function* f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function* f() {} default: class f {}; }`, {
              source: 'switch (0) { case 1: function* f() {} default: class f {}; }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function* f() {} default: const f = 0; }`, {
              source: 'switch (0) { case 1: function* f() {} default: const f = 0; }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function* f() {} default: function f() {} }`, {
              source: 'switch (0) { case 1: function* f() {} default: function f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function* f() {} default: function* f() {} }`, {
              source: 'switch (0) { case 1: function* f() {} default: function* f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: function* f() {} default: let f; }`, {
              source: 'switch (0) { case 1: function* f() {} default: let f; }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          // fail(`switch (0) { case 1: function* f() {} default: var f; }`, {
             //  source: 'switch (0) { case 1: function* f() {} default: var f; }',
              // loc: true,
              // ranges: true,
              // raw: true
          // });
  
          fail(`switch (0) { case 1: async function f() {} default: async function f() {} }`, {
              source: 'switch (0) { case 1: async function f() {} default: async function f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: async function f() {} default: async function* f() {} }`, {
              source: 'switch (0) { case 1: async function f() {} default: async function* f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: async function f() {} default: const f = 0; }`, {
              source: 'switch (0) { case 1: async function f() {} default: const f = 0; }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: async function f() {} default: function f() {} }`, {
              source: 'switch (0) { case 1: async function f() {} default: function f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: async function f() {} default: function* f() {} }`, {
              source: 'switch (0) { case 1: async function f() {} default: function* f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: async function f() {} default: let f; }`, {
              source: 'switch (0) { case 1: async function f() {} default: let f; }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: async function* f() {} default: async function f() {} }`, {
              source: 'switch (0) { case 1: async function* f() {} default: async function f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: async function* f() {} default: function f() {} }`, {
              source: 'switch (0) { case 1: async function* f() {} default: function f() {} }',
              loc: true,
              ranges: true,
              raw: true
          });
  
          fail(`switch (0) { case 1: async function* f() {} default: let f; }`, {
              source: 'switch (0) { case 1: async function* f() {} default: let f; }',
              loc: true,
              ranges: true,
              raw: true
          });
      });
  
      pass(`switch (x) {}`, {
          source: 'switch (x) {}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
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
                  "type": "SwitchStatement",
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
                  "discriminant": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 9,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 8
                          },
                          "end": {
                              "line": 1,
                              "column": 9
                          }
                      },
                      "name": "x"
                  },
                  "cases": []
              }],
              "sourceType": "script"
          }
      });
  
      pass(`switch(a){case 1:}`, {
          source: 'switch(a){case 1:}',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 18,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 18
                  }
              },
              "body": [{
                  "type": "SwitchStatement",
                  "start": 0,
                  "end": 18,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 18
                      }
                  },
                  "discriminant": {
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
                      "name": "a"
                  },
                  "cases": [{
                      "type": "SwitchCase",
                      "start": 10,
                      "end": 17,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 10
                          },
                          "end": {
                              "line": 1,
                              "column": 17
                          }
                      },
                      "consequent": [],
                      "test": {
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
                  }]
              }],
              "sourceType": "script"
          }
      });
  
      pass(`switch (answer) { case 0: hi(); break; }`, {
          source: 'switch (answer) { case 0: hi(); break; }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 40,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 40
                  }
              },
              "body": [{
                  "type": "SwitchStatement",
                  "start": 0,
                  "end": 40,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 40
                      }
                  },
                  "discriminant": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 8
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      },
                      "name": "answer"
                  },
                  "cases": [{
                      "type": "SwitchCase",
                      "start": 18,
                      "end": 38,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 18
                          },
                          "end": {
                              "line": 1,
                              "column": 38
                          }
                      },
                      "consequent": [{
                              "type": "ExpressionStatement",
                              "start": 26,
                              "end": 31,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 26
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 31
                                  }
                              },
                              "expression": {
                                  "type": "CallExpression",
                                  "start": 26,
                                  "end": 30,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 26
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 30
                                      }
                                  },
                                  "callee": {
                                      "type": "Identifier",
                                      "start": 26,
                                      "end": 28,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 26
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 28
                                          }
                                      },
                                      "name": "hi"
                                  },
                                  "arguments": []
                              }
                          },
                          {
                              "type": "BreakStatement",
                              "start": 32,
                              "end": 38,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 32
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 38
                                  }
                              },
                              "label": null
                          }
                      ],
                      "test": {
                          "type": "Literal",
                          "start": 23,
                          "end": 24,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 23
                              },
                              "end": {
                                  "line": 1,
                                  "column": 24
                              }
                          },
                          "value": 0,
                          "raw": "0"
                      }
                  }]
              }],
              "sourceType": "script"
          }
      });
  
      pass(`switch (answer) { case 0: let a; } switch (answer) { case 0: let a; }`, {
          source: 'switch (answer) { case 0: let a; } switch (answer) { case 0: let a; }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 69,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 69
                  }
              },
              "body": [{
                      "type": "SwitchStatement",
                      "start": 0,
                      "end": 34,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 34
                          }
                      },
                      "discriminant": {
                          "type": "Identifier",
                          "start": 8,
                          "end": 14,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 8
                              },
                              "end": {
                                  "line": 1,
                                  "column": 14
                              }
                          },
                          "name": "answer"
                      },
                      "cases": [{
                          "type": "SwitchCase",
                          "start": 18,
                          "end": 32,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 18
                              },
                              "end": {
                                  "line": 1,
                                  "column": 32
                              }
                          },
                          "consequent": [{
                              "type": "VariableDeclaration",
                              "start": 26,
                              "end": 32,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 26
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 32
                                  }
                              },
                              "declarations": [{
                                  "type": "VariableDeclarator",
                                  "start": 30,
                                  "end": 31,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 30
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 31
                                      }
                                  },
                                  "id": {
                                      "type": "Identifier",
                                      "start": 30,
                                      "end": 31,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 30
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 31
                                          }
                                      },
                                      "name": "a"
                                  },
                                  "init": null
                              }],
                              "kind": "let"
                          }],
                          "test": {
                              "type": "Literal",
                              "start": 23,
                              "end": 24,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 23
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 24
                                  }
                              },
                              "value": 0,
                              "raw": "0"
                          }
                      }]
                  },
                  {
                      "type": "SwitchStatement",
                      "start": 35,
                      "end": 69,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 35
                          },
                          "end": {
                              "line": 1,
                              "column": 69
                          }
                      },
                      "discriminant": {
                          "type": "Identifier",
                          "start": 43,
                          "end": 49,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 43
                              },
                              "end": {
                                  "line": 1,
                                  "column": 49
                              }
                          },
                          "name": "answer"
                      },
                      "cases": [{
                          "type": "SwitchCase",
                          "start": 53,
                          "end": 67,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 53
                              },
                              "end": {
                                  "line": 1,
                                  "column": 67
                              }
                          },
                          "consequent": [{
                              "type": "VariableDeclaration",
                              "start": 61,
                              "end": 67,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 61
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 67
                                  }
                              },
                              "declarations": [{
                                  "type": "VariableDeclarator",
                                  "start": 65,
                                  "end": 66,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 65
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 66
                                      }
                                  },
                                  "id": {
                                      "type": "Identifier",
                                      "start": 65,
                                      "end": 66,
                                      "loc": {
                                          "start": {
                                              "line": 1,
                                              "column": 65
                                          },
                                          "end": {
                                              "line": 1,
                                              "column": 66
                                          }
                                      },
                                      "name": "a"
                                  },
                                  "init": null
                              }],
                              "kind": "let"
                          }],
                          "test": {
                              "type": "Literal",
                              "start": 58,
                              "end": 59,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 58
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 59
                                  }
                              },
                              "value": 0,
                              "raw": "0"
                          }
                      }]
                  }
              ],
              "sourceType": "script"
          }
      });
  
      pass(`switch (answer) { case 0: let a; }`, {
          source: 'switch (answer) { case 0: let a; }',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "start": 0,
              "end": 34,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 34
                  }
              },
              "body": [{
                  "type": "SwitchStatement",
                  "start": 0,
                  "end": 34,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 0
                      },
                      "end": {
                          "line": 1,
                          "column": 34
                      }
                  },
                  "discriminant": {
                      "type": "Identifier",
                      "start": 8,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 8
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      },
                      "name": "answer"
                  },
                  "cases": [{
                      "type": "SwitchCase",
                      "start": 18,
                      "end": 32,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 18
                          },
                          "end": {
                              "line": 1,
                              "column": 32
                          }
                      },
                      "consequent": [{
                          "type": "VariableDeclaration",
                          "start": 26,
                          "end": 32,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 26
                              },
                              "end": {
                                  "line": 1,
                                  "column": 32
                              }
                          },
                          "declarations": [{
                              "type": "VariableDeclarator",
                              "start": 30,
                              "end": 31,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 30
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 31
                                  }
                              },
                              "id": {
                                  "type": "Identifier",
                                  "start": 30,
                                  "end": 31,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 30
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 31
                                      }
                                  },
                                  "name": "a"
                              },
                              "init": null
                          }],
                          "kind": "let"
                      }],
                      "test": {
                          "type": "Literal",
                          "start": 23,
                          "end": 24,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 23
                              },
                              "end": {
                                  "line": 1,
                                  "column": 24
                              }
                          },
                          "value": 0,
                          "raw": "0"
                      }
                  }]
              }],
              "sourceType": "script"
          }
      });
  });