import { pass, fail } from '../test-utils';

describe('Destructuring - Assignment', () => {

  describe('Array binding', () => {

      fail(`[v] += ary`, {
          source: '[v] += ary',
          line: 1,
      });

      fail(`[x] += 0`, {
          source: '[x] += 0',
          line: 1
      });

      fail(`[, x, ...y,] = 0`, {
          source: '[, x, ...y,] = 0',
          line: 1
      });

      fail(`[...x, ...y] = 0`, {
          source: '[...x, ...y] = 0',
          line: 1
      });
      /*
                fail(`[(a = 0)] = 1`, {
                  source: '[(a = 0)] = 1',
                  line: 1
                });*/

      fail(`[...x, y] = 0`, {
          source: '[...x, y] = 0',
          line: 1
      });

      fail(`[0,{a=0}] = 0`, {
          source: '[0,{a=0}] = 0',
          line: 1
      });

      fail(`[{a=0},{b=0},0] = 0`, {
          source: '[{a=0},{b=0},0] = 0',
          line: 1
      });
      /*
              fail(`[{a=0},...0]`, {
                  source: '[{a=0},...0]',
                  line: 1
              });*/

      fail(`[...0,a]=0`, {
          source: '[...0,a]=0',
          line: 1
      });

      fail(`[...0,{a=0}]=0`, {
          source: '[...0,{a=0}]=0',
          line: 1
      });

      fail(`[...0,...{a=0}]=0`, {
          source: '[...0,...{a=0}]=0',
          line: 1
      });
      /*
            fail(`[...{a=0},]`, {
                source: '[...{a=0},]',
                line: 1
            });

            fail(`[...{a=0},]=0`, {
                source: '[...{a=0},]=0',
                line: 1
            });*/

      fail(`[0] = 0`, {
          source: '[0] = 0',
          line: 1
      });
      /*
            fail(`[a, ...b, {c=0}]`, {
                source: '[a, ...b, {c=0}]',
                line: 1
            });*/

      fail(`{a = [...b, c]} = 0`, {
          source: '{a = [...b, c]} = 0',
          line: 1
      });

      fail(`[a, ...(b = c)] = 0`, {
          source: '[a, ...(b = c)] = 0',
          line: 1
      });

      pass(`const [a] = [];`, {
          source: 'const [a] = [];',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "sourceType": "script",
              "body": [{
                  "type": "VariableDeclaration",
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "ArrayExpression",
                          "elements": [],
                          "start": 12,
                          "end": 14,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 12
                              },
                              "end": {
                                  "line": 1,
                                  "column": 14
                              }
                          }
                      },
                      "id": {
                          "type": "ArrayPattern",
                          "elements": [{
                              "type": "Identifier",
                              "name": "a",
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
                              }
                          }],
                          "start": 6,
                          "end": 9,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 6
                              },
                              "end": {
                                  "line": 1,
                                  "column": 9
                              }
                          }
                      },
                      "start": 6,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 6
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      }
                  }],
                  "kind": "const",
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
                  }
              }],
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
              }
          }
      });

      pass(`[x] = 0`, {
          source: '[x] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 7,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 7
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 7,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 7
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 7,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 7
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 3,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 3
                              }
                          },
                          elements: [{
                              type: 'Identifier',
                              start: 1,
                              end: 2,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 2
                                  }
                              },
                              name: 'x'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 6,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 6
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[x,] = 0`, {
          source: '[x,] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 8,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 8
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 8,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 8
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 8,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 8
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 4,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 4
                              }
                          },
                          elements: [{
                              type: 'Identifier',
                              start: 1,
                              end: 2,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 2
                                  }
                              },
                              name: 'x'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 7,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 7
                              },
                              end: {
                                  line: 1,
                                  column: 8
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[x,,] = 0`, {
          source: '[x,,] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 9,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 9
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 9,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 9
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 9,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 9
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 5,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 5
                              }
                          },
                          elements: [{
                                  type: 'Identifier',
                                  start: 1,
                                  end: 2,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 2
                                      }
                                  },
                                  name: 'x'
                              },
                              null
                          ]
                      },
                      right: {
                          type: 'Literal',
                          start: 8,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[x, {y = 1}] = [0, {}];`, {
          source: '[x, {y = 1}] = [0, {}];',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              body: [{
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'AssignmentExpression',
                      left: {
                          type: 'ArrayPattern',
                          elements: [{
                                  type: 'Identifier',
                                  name: 'x',
                                  start: 1,
                                  end: 2,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 2
                                      }
                                  }
                              },
                              {
                                  type: 'ObjectPattern',
                                  properties: [{
                                      type: 'Property',
                                      key: {
                                          type: 'Identifier',
                                          name: 'y',
                                          start: 5,
                                          end: 6,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 5
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 6
                                              }
                                          }
                                      },
                                      value: {
                                          type: 'AssignmentPattern',
                                          left: {
                                              type: 'Identifier',
                                              name: 'y',
                                              start: 5,
                                              end: 6,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 5
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 6
                                                  }
                                              }
                                          },
                                          right: {
                                              type: 'Literal',
                                              value: 1,
                                              start: 9,
                                              end: 10,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 9
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 10
                                                  }
                                              },
                                              raw: '1'
                                          },
                                          start: 5,
                                          end: 10,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 5
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 10
                                              }
                                          }
                                      },
                                      kind: 'init',
                                      computed: false,
                                      method: false,
                                      shorthand: true,
                                      start: 5,
                                      end: 10,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 5
                                          },
                                          end: {
                                              line: 1,
                                              column: 10
                                          }
                                      }
                                  }],
                                  start: 4,
                                  end: 11,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 11
                                      }
                                  }
                              }
                          ],
                          start: 0,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          }
                      },
                      operator: '=',
                      right: {
                          type: 'ArrayExpression',
                          elements: [{
                                  type: 'Literal',
                                  value: 0,
                                  start: 16,
                                  end: 17,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 16
                                      },
                                      end: {
                                          line: 1,
                                          column: 17
                                      }
                                  },
                                  raw: '0'
                              },
                              {
                                  type: 'ObjectExpression',
                                  properties: [],
                                  start: 19,
                                  end: 21,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 19
                                      },
                                      end: {
                                          line: 1,
                                          column: 21
                                      }
                                  }
                              }
                          ],
                          start: 15,
                          end: 22,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 15
                              },
                              end: {
                                  line: 1,
                                  column: 22
                              }
                          }
                      },
                      start: 0,
                      end: 22,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 22
                          }
                      }
                  },
                  start: 0,
                  end: 23,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 23
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 23,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 23
                  }
              }
          }
      });

      pass(`[a, {b: {c = 1}}] = arr`, {
          source: '[a, {b: {c = 1}}] = arr',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              body: [{
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'AssignmentExpression',
                      left: {
                          type: 'ArrayPattern',
                          elements: [{
                                  type: 'Identifier',
                                  name: 'a',
                                  start: 1,
                                  end: 2,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 2
                                      }
                                  }
                              },
                              {
                                  type: 'ObjectPattern',
                                  properties: [{
                                      type: 'Property',
                                      key: {
                                          type: 'Identifier',
                                          name: 'b',
                                          start: 5,
                                          end: 6,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 5
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 6
                                              }
                                          }
                                      },
                                      value: {
                                          type: 'ObjectPattern',
                                          properties: [{
                                              type: 'Property',
                                              key: {
                                                  type: 'Identifier',
                                                  name: 'c',
                                                  start: 9,
                                                  end: 10,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 9
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 10
                                                      }
                                                  }
                                              },
                                              value: {
                                                  type: 'AssignmentPattern',
                                                  left: {
                                                      type: 'Identifier',
                                                      name: 'c',
                                                      start: 9,
                                                      end: 10,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 9
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 10
                                                          }
                                                      }
                                                  },
                                                  right: {
                                                      type: 'Literal',
                                                      value: 1,
                                                      start: 13,
                                                      end: 14,
                                                      loc: {
                                                          start: {
                                                              line: 1,
                                                              column: 13
                                                          },
                                                          end: {
                                                              line: 1,
                                                              column: 14
                                                          }
                                                      },
                                                      raw: '1'
                                                  },
                                                  start: 9,
                                                  end: 14,
                                                  loc: {
                                                      start: {
                                                          line: 1,
                                                          column: 9
                                                      },
                                                      end: {
                                                          line: 1,
                                                          column: 14
                                                      }
                                                  }
                                              },
                                              kind: 'init',
                                              computed: false,
                                              method: false,
                                              shorthand: true,
                                              start: 9,
                                              end: 14,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 9
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 14
                                                  }
                                              }
                                          }],
                                          start: 8,
                                          end: 15,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 8
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 15
                                              }
                                          }
                                      },
                                      kind: 'init',
                                      computed: false,
                                      method: false,
                                      shorthand: false,
                                      start: 5,
                                      end: 15,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 5
                                          },
                                          end: {
                                              line: 1,
                                              column: 15
                                          }
                                      }
                                  }],
                                  start: 4,
                                  end: 16,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 16
                                      }
                                  }
                              }
                          ],
                          start: 0,
                          end: 17,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 17
                              }
                          }
                      },
                      operator: '=',
                      right: {
                          type: 'Identifier',
                          name: 'arr',
                          start: 20,
                          end: 23,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 20
                              },
                              end: {
                                  line: 1,
                                  column: 23
                              }
                          }
                      },
                      start: 0,
                      end: 23,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 23
                          }
                      }
                  },
                  start: 0,
                  end: 23,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 23
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 23,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 23
                  }
              }
          }
      });

      pass(`[[x]] = 0`, {
          source: '[[x]] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 9,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 9
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 9,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 9
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 9,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 9
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 5,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 5
                              }
                          },
                          elements: [{
                              type: 'ArrayPattern',
                              start: 1,
                              end: 4,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 4
                                  }
                              },
                              elements: [{
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              }]
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 8,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[x, y, ...z] = 0`, {
          source: '[x, y, ...z] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 16,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 16
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 16,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 16
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          elements: [{
                                  type: 'Identifier',
                                  start: 1,
                                  end: 2,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 2
                                      }
                                  },
                                  name: 'x'
                              },
                              {
                                  type: 'Identifier',
                                  start: 4,
                                  end: 5,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 5
                                      }
                                  },
                                  name: 'y'
                              },
                              {
                                  type: 'RestElement',
                                  start: 7,
                                  end: 11,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 7
                                      },
                                      end: {
                                          line: 1,
                                          column: 11
                                      }
                                  },
                                  argument: {
                                      type: 'Identifier',
                                      start: 10,
                                      end: 11,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 10
                                          },
                                          end: {
                                              line: 1,
                                              column: 11
                                          }
                                      },
                                      name: 'z'
                                  }
                              }
                          ]
                      },
                      right: {
                          type: 'Literal',
                          start: 15,
                          end: 16,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 15
                              },
                              end: {
                                  line: 1,
                                  column: 16
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[, x,,] = 0`, {
          source: '[, x,,] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 11,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 11
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 11,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 11
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          elements: [
                              null,
                              {
                                  type: 'Identifier',
                                  start: 3,
                                  end: 4,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 3
                                      },
                                      end: {
                                          line: 1,
                                          column: 4
                                      }
                                  },
                                  name: 'x'
                              },
                              null
                          ]
                      },
                      right: {
                          type: 'Literal',
                          start: 10,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[...[x]] = 0`, {
          source: '[...[x]] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 12,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 12
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 12
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 8
                              }
                          },
                          elements: [{
                              type: 'RestElement',
                              start: 1,
                              end: 7,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 7
                                  }
                              },
                              argument: {
                                  type: 'ArrayPattern',
                                  start: 4,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  },
                                  elements: [{
                                      type: 'Identifier',
                                      start: 5,
                                      end: 6,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 5
                                          },
                                          end: {
                                              line: 1,
                                              column: 6
                                          }
                                      },
                                      name: 'x'
                                  }]
                              }
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 11,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[x, x] = 0`, {
          source: '[x, x] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 10,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 10
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 10,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 10
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 10,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 10
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          },
                          elements: [{
                                  type: 'Identifier',
                                  start: 1,
                                  end: 2,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 2
                                      }
                                  },
                                  name: 'x'
                              },
                              {
                                  type: 'Identifier',
                                  start: 4,
                                  end: 5,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 5
                                      }
                                  },
                                  name: 'x'
                              }
                          ]
                      },
                      right: {
                          type: 'Literal',
                          start: 9,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[x, ...x] = 0`, {
          source: '[x, ...x] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 13,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 13
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 13,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 13
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 13,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 13
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          elements: [{
                                  type: 'Identifier',
                                  start: 1,
                                  end: 2,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 2
                                      }
                                  },
                                  name: 'x'
                              },
                              {
                                  type: 'RestElement',
                                  start: 4,
                                  end: 8,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 8
                                      }
                                  },
                                  argument: {
                                      type: 'Identifier',
                                      start: 7,
                                      end: 8,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 7
                                          },
                                          end: {
                                              line: 1,
                                              column: 8
                                          }
                                      },
                                      name: 'x'
                                  }
                              }
                          ]
                      },
                      right: {
                          type: 'Literal',
                          start: 12,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 12
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[x.a=a] = b`, {
          source: '[x.a=a] = b',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 11,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 11
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 11,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 11
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          elements: [{
                              type: 'AssignmentPattern',
                              start: 1,
                              end: 6,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 6
                                  }
                              },
                              left: {
                                  type: 'MemberExpression',
                                  start: 1,
                                  end: 4,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 4
                                      }
                                  },
                                  object: {
                                      type: 'Identifier',
                                      start: 1,
                                      end: 2,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 1
                                          },
                                          end: {
                                              line: 1,
                                              column: 2
                                          }
                                      },
                                      name: 'x'
                                  },
                                  property: {
                                      type: 'Identifier',
                                      start: 3,
                                      end: 4,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 3
                                          },
                                          end: {
                                              line: 1,
                                              column: 4
                                          }
                                      },
                                      name: 'a'
                                  },
                                  computed: false
                              },
                              right: {
                                  type: 'Identifier',
                                  start: 5,
                                  end: 6,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 5
                                      },
                                      end: {
                                          line: 1,
                                          column: 6
                                      }
                                  },
                                  name: 'a'
                              }
                          }]
                      },
                      right: {
                          type: 'Identifier',
                          start: 10,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          name: 'b'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[x[a]=a] = b`, {
          source: '[x[a]=a] = b',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 12,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 12
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 12
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 8
                              }
                          },
                          elements: [{
                              type: 'AssignmentPattern',
                              start: 1,
                              end: 7,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 7
                                  }
                              },
                              left: {
                                  type: 'MemberExpression',
                                  start: 1,
                                  end: 5,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 5
                                      }
                                  },
                                  object: {
                                      type: 'Identifier',
                                      start: 1,
                                      end: 2,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 1
                                          },
                                          end: {
                                              line: 1,
                                              column: 2
                                          }
                                      },
                                      name: 'x'
                                  },
                                  property: {
                                      type: 'Identifier',
                                      start: 3,
                                      end: 4,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 3
                                          },
                                          end: {
                                              line: 1,
                                              column: 4
                                          }
                                      },
                                      name: 'a'
                                  },
                                  computed: true
                              },
                              right: {
                                  type: 'Identifier',
                                  start: 6,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 6
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  },
                                  name: 'a'
                              }
                          }]
                      },
                      right: {
                          type: 'Identifier',
                          start: 11,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          name: 'b'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[...[...a[x]]] = b`, {
          source: '[...[...a[x]]] = b',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 18,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 18
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 18,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 18
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 18,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 18
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 14,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 14
                              }
                          },
                          elements: [{
                              type: 'RestElement',
                              start: 1,
                              end: 13,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 1
                                  },
                                  end: {
                                      line: 1,
                                      column: 13
                                  }
                              },
                              argument: {
                                  type: 'ArrayPattern',
                                  start: 4,
                                  end: 13,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 13
                                      }
                                  },
                                  elements: [{
                                      type: 'RestElement',
                                      start: 5,
                                      end: 12,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 5
                                          },
                                          end: {
                                              line: 1,
                                              column: 12
                                          }
                                      },
                                      argument: {
                                          type: 'MemberExpression',
                                          start: 8,
                                          end: 12,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 8
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 12
                                              }
                                          },
                                          object: {
                                              type: 'Identifier',
                                              start: 8,
                                              end: 9,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 8
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 9
                                                  }
                                              },
                                              name: 'a'
                                          },
                                          property: {
                                              type: 'Identifier',
                                              start: 10,
                                              end: 11,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 10
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 11
                                                  }
                                              },
                                              name: 'x'
                                          },
                                          computed: true
                                      }
                                  }]
                              }
                          }]
                      },
                      right: {
                          type: 'Identifier',
                          start: 17,
                          end: 18,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 17
                              },
                              end: {
                                  line: 1,
                                  column: 18
                              }
                          },
                          name: 'b'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[] = 0`, {
          source: '[] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 6,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 6
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 6,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 6
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 6,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 6
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 2,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 2
                              }
                          },
                          elements: []
                      },
                      right: {
                          type: 'Literal',
                          start: 5,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 5
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[{a=0},{a=0}] = 0`, {
          source: '[{a=0},{a=0}] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 17,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 17
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 17,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 17
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          elements: [{
                                  type: 'ObjectPattern',
                                  start: 1,
                                  end: 6,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 6
                                      }
                                  },
                                  properties: [{
                                      type: 'Property',
                                      start: 2,
                                      end: 5,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 5
                                          }
                                      },
                                      method: false,
                                      shorthand: true,
                                      computed: false,
                                      key: {
                                          type: 'Identifier',
                                          start: 2,
                                          end: 3,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 2
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 3
                                              }
                                          },
                                          name: 'a'
                                      },
                                      kind: 'init',
                                      value: {
                                          type: 'AssignmentPattern',
                                          start: 2,
                                          end: 5,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 2
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 5
                                              }
                                          },
                                          left: {
                                              type: 'Identifier',
                                              start: 2,
                                              end: 3,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 2
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 3
                                                  }
                                              },
                                              name: 'a'
                                          },
                                          right: {
                                              type: 'Literal',
                                              start: 4,
                                              end: 5,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 4
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 5
                                                  }
                                              },
                                              value: 0,
                                              raw: '0'
                                          }
                                      }
                                  }]
                              },
                              {
                                  type: 'ObjectPattern',
                                  start: 7,
                                  end: 12,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 7
                                      },
                                      end: {
                                          line: 1,
                                          column: 12
                                      }
                                  },
                                  properties: [{
                                      type: 'Property',
                                      start: 8,
                                      end: 11,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 8
                                          },
                                          end: {
                                              line: 1,
                                              column: 11
                                          }
                                      },
                                      method: false,
                                      shorthand: true,
                                      computed: false,
                                      key: {
                                          type: 'Identifier',
                                          start: 8,
                                          end: 9,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 8
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 9
                                              }
                                          },
                                          name: 'a'
                                      },
                                      kind: 'init',
                                      value: {
                                          type: 'AssignmentPattern',
                                          start: 8,
                                          end: 11,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 8
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 11
                                              }
                                          },
                                          left: {
                                              type: 'Identifier',
                                              start: 8,
                                              end: 9,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 8
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 9
                                                  }
                                              },
                                              name: 'a'
                                          },
                                          right: {
                                              type: 'Literal',
                                              start: 10,
                                              end: 11,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 10
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 11
                                                  }
                                              },
                                              value: 0,
                                              raw: '0'
                                          }
                                      }
                                  }]
                              }
                          ]
                      },
                      right: {
                          type: 'Literal',
                          start: 16,
                          end: 17,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 16
                              },
                              end: {
                                  line: 1,
                                  column: 17
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`[{a=0}, ...b] = 0`, {
          source: '[{a=0}, ...b] = 0',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 17,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 17
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 17,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 17
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 0,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 0
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ArrayPattern',
                          start: 0,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 0
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          elements: [{
                                  type: 'ObjectPattern',
                                  start: 1,
                                  end: 6,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 1
                                      },
                                      end: {
                                          line: 1,
                                          column: 6
                                      }
                                  },
                                  properties: [{
                                      type: 'Property',
                                      start: 2,
                                      end: 5,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 5
                                          }
                                      },
                                      method: false,
                                      shorthand: true,
                                      computed: false,
                                      key: {
                                          type: 'Identifier',
                                          start: 2,
                                          end: 3,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 2
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 3
                                              }
                                          },
                                          name: 'a'
                                      },
                                      kind: 'init',
                                      value: {
                                          type: 'AssignmentPattern',
                                          start: 2,
                                          end: 5,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 2
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 5
                                              }
                                          },
                                          left: {
                                              type: 'Identifier',
                                              start: 2,
                                              end: 3,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 2
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 3
                                                  }
                                              },
                                              name: 'a'
                                          },
                                          right: {
                                              type: 'Literal',
                                              start: 4,
                                              end: 5,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 4
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 5
                                                  }
                                              },
                                              value: 0,
                                              raw: '0'
                                          }
                                      }
                                  }]
                              },
                              {
                                  type: 'RestElement',
                                  start: 8,
                                  end: 12,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 8
                                      },
                                      end: {
                                          line: 1,
                                          column: 12
                                      }
                                  },
                                  argument: {
                                      type: 'Identifier',
                                      start: 11,
                                      end: 12,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 11
                                          },
                                          end: {
                                              line: 1,
                                              column: 12
                                          }
                                      },
                                      name: 'b'
                                  }
                              }
                          ]
                      },
                      right: {
                          type: 'Literal',
                          start: 16,
                          end: 17,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 16
                              },
                              end: {
                                  line: 1,
                                  column: 17
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

  });

  describe('Object binding', () => {

      pass(`({x} = 0)`, {
          source: '({x} = 0)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 9,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 9
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 9,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 9
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 8,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 8
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 4,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 4
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 3,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 3
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              },
                              kind: 'init',
                              value: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              }
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 7,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 7
                              },
                              end: {
                                  line: 1,
                                  column: 8
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({x,} = 0)`, {
          source: '({x,} = 0)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 10,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 10
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 10,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 10
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 9,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 9
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 5,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 5
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 3,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 3
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              },
                              kind: 'init',
                              value: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              }
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 8,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 8
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({x,y} = 0)`, {
          source: '({x,y} = 0)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 11,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 11
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 11,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 11
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 10,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 10
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          },
                          properties: [{
                                  type: 'Property',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
                                      type: 'Identifier',
                                      start: 2,
                                      end: 3,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 3
                                          }
                                      },
                                      name: 'x'
                                  },
                                  kind: 'init',
                                  value: {
                                      type: 'Identifier',
                                      start: 2,
                                      end: 3,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 3
                                          }
                                      },
                                      name: 'x'
                                  }
                              },
                              {
                                  type: 'Property',
                                  start: 4,
                                  end: 5,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 5
                                      }
                                  },
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
                                      type: 'Identifier',
                                      start: 4,
                                      end: 5,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 4
                                          },
                                          end: {
                                              line: 1,
                                              column: 5
                                          }
                                      },
                                      name: 'y'
                                  },
                                  kind: 'init',
                                  value: {
                                      type: 'Identifier',
                                      start: 4,
                                      end: 5,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 4
                                          },
                                          end: {
                                              line: 1,
                                              column: 5
                                          }
                                      },
                                      name: 'y'
                                  }
                              }
                          ]
                      },
                      right: {
                          type: 'Literal',
                          start: 9,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({x,y,} = 0)`, {
          source: '({x,y,} = 0)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 12,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 12
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 12
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          properties: [{
                                  type: 'Property',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
                                      type: 'Identifier',
                                      start: 2,
                                      end: 3,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 3
                                          }
                                      },
                                      name: 'x'
                                  },
                                  kind: 'init',
                                  value: {
                                      type: 'Identifier',
                                      start: 2,
                                      end: 3,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 3
                                          }
                                      },
                                      name: 'x'
                                  }
                              },
                              {
                                  type: 'Property',
                                  start: 4,
                                  end: 5,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 5
                                      }
                                  },
                                  method: false,
                                  shorthand: true,
                                  computed: false,
                                  key: {
                                      type: 'Identifier',
                                      start: 4,
                                      end: 5,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 4
                                          },
                                          end: {
                                              line: 1,
                                              column: 5
                                          }
                                      },
                                      name: 'y'
                                  },
                                  kind: 'init',
                                  value: {
                                      type: 'Identifier',
                                      start: 4,
                                      end: 5,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 4
                                          },
                                          end: {
                                              line: 1,
                                              column: 5
                                          }
                                      },
                                      name: 'y'
                                  }
                              }
                          ]
                      },
                      right: {
                          type: 'Literal',
                          start: 10,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({[a]: a} = 1)`, {
          source: '({[a]: a} = 1)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 14
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 14,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 14
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 13,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 13
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 8,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 8
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: true,
                              key: {
                                  type: 'Identifier',
                                  start: 3,
                                  end: 4,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 3
                                      },
                                      end: {
                                          line: 1,
                                          column: 4
                                      }
                                  },
                                  name: 'a'
                              },
                              value: {
                                  type: 'Identifier',
                                  start: 7,
                                  end: 8,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 7
                                      },
                                      end: {
                                          line: 1,
                                          column: 8
                                      }
                                  },
                                  name: 'a'
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 12,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 12
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({x = 0} = 1)`, {
          source: '({x = 0} = 1)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 13,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 13
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 13,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 13
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 8
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 7,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 7
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              },
                              kind: 'init',
                              value: {
                                  type: 'AssignmentPattern',
                                  start: 2,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  },
                                  left: {
                                      type: 'Identifier',
                                      start: 2,
                                      end: 3,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 3
                                          }
                                      },
                                      name: 'x'
                                  },
                                  right: {
                                      type: 'Literal',
                                      start: 6,
                                      end: 7,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 6
                                          },
                                          end: {
                                              line: 1,
                                              column: 7
                                          }
                                      },
                                      value: 0,
                                      raw: '0'
                                  }
                              }
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 11,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({x = 0,} = 1)`, {
          source: '({x = 0,} = 1)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 14
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 14,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 14
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 13,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 13
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 7,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 7
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              },
                              kind: 'init',
                              value: {
                                  type: 'AssignmentPattern',
                                  start: 2,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  },
                                  left: {
                                      type: 'Identifier',
                                      start: 2,
                                      end: 3,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 3
                                          }
                                      },
                                      name: 'x'
                                  },
                                  right: {
                                      type: 'Literal',
                                      start: 6,
                                      end: 7,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 6
                                          },
                                          end: {
                                              line: 1,
                                              column: 7
                                          }
                                      },
                                      value: 0,
                                      raw: '0'
                                  }
                              }
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 12,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 12
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({x: y} = 0)`, {
          source: '({x: y} = 0)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 12,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 12
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 12
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 6,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 6
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              },
                              value: {
                                  type: 'Identifier',
                                  start: 5,
                                  end: 6,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 5
                                      },
                                      end: {
                                          line: 1,
                                          column: 6
                                      }
                                  },
                                  name: 'y'
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 10,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({x: y,} = 0)`, {
          source: '({x: y,} = 0)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 13,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 13
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 13,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 13
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 8
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 6,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 6
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              },
                              value: {
                                  type: 'Identifier',
                                  start: 5,
                                  end: 6,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 5
                                      },
                                      end: {
                                          line: 1,
                                          column: 6
                                      }
                                  },
                                  name: 'y'
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 11,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({var: x} = 0)`, {
          source: '({var: x} = 0)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 14
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 14,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 14
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 13,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 13
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 8,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 8
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 5,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 5
                                      }
                                  },
                                  name: 'var'
                              },
                              value: {
                                  type: 'Identifier',
                                  start: 7,
                                  end: 8,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 7
                                      },
                                      end: {
                                          line: 1,
                                          column: 8
                                      }
                                  },
                                  name: 'x'
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 12,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 12
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({"x": y} = 0)`, {
          source: '({"x": y} = 0)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 14
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 14,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 14
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 13,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 13
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 9,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 9
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 8,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 8
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Literal',
                                  start: 2,
                                  end: 5,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 5
                                      }
                                  },
                                  value: 'x',
                                  raw: '"x"'
                              },
                              value: {
                                  type: 'Identifier',
                                  start: 7,
                                  end: 8,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 7
                                      },
                                      end: {
                                          line: 1,
                                          column: 8
                                      }
                                  },
                                  name: 'y'
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 12,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 12
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({0: y} = 0)`, {
          source: '({0: y} = 0)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 12,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 12
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 12
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 11,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 11
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 7,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 7
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 6,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 6
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Literal',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  value: 0,
                                  raw: '0'
                              },
                              value: {
                                  type: 'Identifier',
                                  start: 5,
                                  end: 6,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 5
                                      },
                                      end: {
                                          line: 1,
                                          column: 6
                                      }
                                  },
                                  name: 'y'
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 10,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 10
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({0: x, 1: x} = 0)`, {
          source: '({0: x, 1: x} = 0)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 18,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 18
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 18,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 18
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          properties: [{
                                  type: 'Property',
                                  start: 2,
                                  end: 6,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 6
                                      }
                                  },
                                  method: false,
                                  shorthand: false,
                                  computed: false,
                                  key: {
                                      type: 'Literal',
                                      start: 2,
                                      end: 3,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 3
                                          }
                                      },
                                      value: 0,
                                      raw: '0'
                                  },
                                  value: {
                                      type: 'Identifier',
                                      start: 5,
                                      end: 6,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 5
                                          },
                                          end: {
                                              line: 1,
                                              column: 6
                                          }
                                      },
                                      name: 'x'
                                  },
                                  kind: 'init'
                              },
                              {
                                  type: 'Property',
                                  start: 8,
                                  end: 12,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 8
                                      },
                                      end: {
                                          line: 1,
                                          column: 12
                                      }
                                  },
                                  method: false,
                                  shorthand: false,
                                  computed: false,
                                  key: {
                                      type: 'Literal',
                                      start: 8,
                                      end: 9,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 8
                                          },
                                          end: {
                                              line: 1,
                                              column: 9
                                          }
                                      },
                                      value: 1,
                                      raw: '1'
                                  },
                                  value: {
                                      type: 'Identifier',
                                      start: 11,
                                      end: 12,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 11
                                          },
                                          end: {
                                              line: 1,
                                              column: 12
                                          }
                                      },
                                      name: 'x'
                                  },
                                  kind: 'init'
                              }
                          ]
                      },
                      right: {
                          type: 'Literal',
                          start: 16,
                          end: 17,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 16
                              },
                              end: {
                                  line: 1,
                                  column: 17
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({x: y = 0} = 1)`, {
          source: '({x: y = 0} = 1)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 16,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 16
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 16,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 16
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 15,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 15
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 11,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 11
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 10,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 10
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              },
                              value: {
                                  type: 'AssignmentPattern',
                                  start: 5,
                                  end: 10,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 5
                                      },
                                      end: {
                                          line: 1,
                                          column: 10
                                      }
                                  },
                                  left: {
                                      type: 'Identifier',
                                      start: 5,
                                      end: 6,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 5
                                          },
                                          end: {
                                              line: 1,
                                              column: 6
                                          }
                                      },
                                      name: 'y'
                                  },
                                  right: {
                                      type: 'Literal',
                                      start: 9,
                                      end: 10,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 9
                                          },
                                          end: {
                                              line: 1,
                                              column: 10
                                          }
                                      },
                                      value: 0,
                                      raw: '0'
                                  }
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 14,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 14
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({x: y = z = 0} = 1)`, {
          source: '({x: y = z = 0} = 1)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 20,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 20
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 20,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 20
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 19,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 19
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 14,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 14
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              },
                              value: {
                                  type: 'AssignmentPattern',
                                  start: 5,
                                  end: 14,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 5
                                      },
                                      end: {
                                          line: 1,
                                          column: 14
                                      }
                                  },
                                  left: {
                                      type: 'Identifier',
                                      start: 5,
                                      end: 6,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 5
                                          },
                                          end: {
                                              line: 1,
                                              column: 6
                                          }
                                      },
                                      name: 'y'
                                  },
                                  right: {
                                      type: 'AssignmentExpression',
                                      start: 9,
                                      end: 14,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 9
                                          },
                                          end: {
                                              line: 1,
                                              column: 14
                                          }
                                      },
                                      operator: '=',
                                      left: {
                                          type: 'Identifier',
                                          start: 9,
                                          end: 10,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 9
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 10
                                              }
                                          },
                                          name: 'z'
                                      },
                                      right: {
                                          type: 'Literal',
                                          start: 13,
                                          end: 14,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 13
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 14
                                              }
                                          },
                                          value: 0,
                                          raw: '0'
                                      }
                                  }
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 18,
                          end: 19,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 18
                              },
                              end: {
                                  line: 1,
                                  column: 19
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({x: [y] = 0} = 1)`, {
          source: '({x: [y] = 0} = 1)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 18,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 18
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 18,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 18
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 17,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 17
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 13,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 13
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 12,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 12
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'x'
                              },
                              value: {
                                  type: 'AssignmentPattern',
                                  start: 5,
                                  end: 12,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 5
                                      },
                                      end: {
                                          line: 1,
                                          column: 12
                                      }
                                  },
                                  left: {
                                      type: 'ArrayPattern',
                                      start: 5,
                                      end: 8,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 5
                                          },
                                          end: {
                                              line: 1,
                                              column: 8
                                          }
                                      },
                                      elements: [{
                                          type: 'Identifier',
                                          start: 6,
                                          end: 7,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 6
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 7
                                              }
                                          },
                                          name: 'y'
                                      }]
                                  },
                                  right: {
                                      type: 'Literal',
                                      start: 11,
                                      end: 12,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 11
                                          },
                                          end: {
                                              line: 1,
                                              column: 12
                                          }
                                      },
                                      value: 0,
                                      raw: '0'
                                  }
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 16,
                          end: 17,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 16
                              },
                              end: {
                                  line: 1,
                                  column: 17
                              }
                          },
                          value: 1,
                          raw: '1'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({a:let} = 0);`, {
          source: '({a:let} = 0);',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 14
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 14,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 14
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 8
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 7,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 7
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'a'
                              },
                              value: {
                                  type: 'Identifier',
                                  start: 4,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  },
                                  name: 'let'
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 11,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({let} = 0);`, {
          source: '({let} = 0);',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 12,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 12
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 12,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 12
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 10,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 10
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 6,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 6
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 5,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 5
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 5,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 5
                                      }
                                  },
                                  name: 'let'
                              },
                              kind: 'init',
                              value: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 5,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 5
                                      }
                                  },
                                  name: 'let'
                              }
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 9,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 9
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({a:yield} = 0);`, {
          source: '({a:yield} = 0);',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 16,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 16
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 16,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 16
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 9,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 9
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'a'
                              },
                              value: {
                                  type: 'Identifier',
                                  start: 4,
                                  end: 9,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 9
                                      }
                                  },
                                  name: 'yield'
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 13,
                          end: 14,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 13
                              },
                              end: {
                                  line: 1,
                                  column: 14
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({a:async} = 0);`, {
          source: '({a:async} = 0);',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 16,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 16
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 16,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 16
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 14,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 14
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 10,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 10
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 9,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 9
                                  }
                              },
                              method: false,
                              shorthand: false,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 3,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 3
                                      }
                                  },
                                  name: 'a'
                              },
                              value: {
                                  type: 'Identifier',
                                  start: 4,
                                  end: 9,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 4
                                      },
                                      end: {
                                          line: 1,
                                          column: 9
                                      }
                                  },
                                  name: 'async'
                              },
                              kind: 'init'
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 13,
                          end: 14,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 13
                              },
                              end: {
                                  line: 1,
                                  column: 14
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({yield} = 0);`, {
          source: '({yield} = 0);',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 14,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 14
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 14,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 14
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 12,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 12
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 8,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 8
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 7,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 7
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  },
                                  name: 'yield'
                              },
                              kind: 'init',
                              value: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  },
                                  name: 'yield'
                              }
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 11,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 11
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({yield = 0} = 0);`, {
          source: '({yield = 0} = 0);',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              start: 0,
              end: 18,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 18
                  }
              },
              body: [{
                  type: 'ExpressionStatement',
                  start: 0,
                  end: 18,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 18
                      }
                  },
                  expression: {
                      type: 'AssignmentExpression',
                      start: 1,
                      end: 16,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 16
                          }
                      },
                      operator: '=',
                      left: {
                          type: 'ObjectPattern',
                          start: 1,
                          end: 12,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 12
                              }
                          },
                          properties: [{
                              type: 'Property',
                              start: 2,
                              end: 11,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 2
                                  },
                                  end: {
                                      line: 1,
                                      column: 11
                                  }
                              },
                              method: false,
                              shorthand: true,
                              computed: false,
                              key: {
                                  type: 'Identifier',
                                  start: 2,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  },
                                  name: 'yield'
                              },
                              kind: 'init',
                              value: {
                                  type: 'AssignmentPattern',
                                  start: 2,
                                  end: 11,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 11
                                      }
                                  },
                                  left: {
                                      type: 'Identifier',
                                      start: 2,
                                      end: 7,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 7
                                          }
                                      },
                                      name: 'yield'
                                  },
                                  right: {
                                      type: 'Literal',
                                      start: 10,
                                      end: 11,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 10
                                          },
                                          end: {
                                              line: 1,
                                              column: 11
                                          }
                                      },
                                      value: 0,
                                      raw: '0'
                                  }
                              }
                          }]
                      },
                      right: {
                          type: 'Literal',
                          start: 15,
                          end: 16,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 15
                              },
                              end: {
                                  line: 1,
                                  column: 16
                              }
                          },
                          value: 0,
                          raw: '0'
                      }
                  }
              }],
              sourceType: 'script'
          }
      });

      pass(`({x = 1, y = 2} = {});`, {
          source: '({x = 1, y = 2} = {});',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              body: [{
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'AssignmentExpression',
                      left: {
                          type: 'ObjectPattern',
                          properties: [{
                                  type: 'Property',
                                  key: {
                                      type: 'Identifier',
                                      name: 'x',
                                      start: 2,
                                      end: 3,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 3
                                          }
                                      }
                                  },
                                  value: {
                                      type: 'AssignmentPattern',
                                      left: {
                                          type: 'Identifier',
                                          name: 'x',
                                          start: 2,
                                          end: 3,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 2
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 3
                                              }
                                          }
                                      },
                                      right: {
                                          type: 'Literal',
                                          value: 1,
                                          start: 6,
                                          end: 7,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 6
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 7
                                              }
                                          },
                                          raw: '1'
                                      },
                                      start: 2,
                                      end: 7,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 7
                                          }
                                      }
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: true,
                                  start: 2,
                                  end: 7,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 7
                                      }
                                  }
                              },
                              {
                                  type: 'Property',
                                  key: {
                                      type: 'Identifier',
                                      name: 'y',
                                      start: 9,
                                      end: 10,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 9
                                          },
                                          end: {
                                              line: 1,
                                              column: 10
                                          }
                                      }
                                  },
                                  value: {
                                      type: 'AssignmentPattern',
                                      left: {
                                          type: 'Identifier',
                                          name: 'y',
                                          start: 9,
                                          end: 10,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 9
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 10
                                              }
                                          }
                                      },
                                      right: {
                                          type: 'Literal',
                                          value: 2,
                                          start: 13,
                                          end: 14,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 13
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 14
                                              }
                                          },
                                          raw: '2'
                                      },
                                      start: 9,
                                      end: 14,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 9
                                          },
                                          end: {
                                              line: 1,
                                              column: 14
                                          }
                                      }
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: true,
                                  start: 9,
                                  end: 14,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 9
                                      },
                                      end: {
                                          line: 1,
                                          column: 14
                                      }
                                  }
                              }
                          ],
                          start: 1,
                          end: 15,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 15
                              }
                          }
                      },
                      operator: '=',
                      right: {
                          type: 'ObjectExpression',
                          properties: [],
                          start: 18,
                          end: 20,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 18
                              },
                              end: {
                                  line: 1,
                                  column: 20
                              }
                          }
                      },
                      start: 1,
                      end: 20,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 20
                          }
                      }
                  },
                  start: 0,
                  end: 22,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 22
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 22,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 22
                  }
              }
          }
      });

      pass(`({d=0,f:h().a} = 0)`, {
          source: '({d=0,f:h().a} = 0)',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              type: 'Program',
              body: [{
                  type: 'ExpressionStatement',
                  expression: {
                      type: 'AssignmentExpression',
                      left: {
                          type: 'ObjectPattern',
                          properties: [{
                                  type: 'Property',
                                  key: {
                                      type: 'Identifier',
                                      name: 'd',
                                      start: 2,
                                      end: 3,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 3
                                          }
                                      }
                                  },
                                  value: {
                                      type: 'AssignmentPattern',
                                      left: {
                                          type: 'Identifier',
                                          name: 'd',
                                          start: 2,
                                          end: 3,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 2
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 3
                                              }
                                          }
                                      },
                                      right: {
                                          type: 'Literal',
                                          value: 0,
                                          start: 4,
                                          end: 5,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 4
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 5
                                              }
                                          },
                                          raw: '0'
                                      },
                                      start: 2,
                                      end: 5,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 2
                                          },
                                          end: {
                                              line: 1,
                                              column: 5
                                          }
                                      }
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: true,
                                  start: 2,
                                  end: 5,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 2
                                      },
                                      end: {
                                          line: 1,
                                          column: 5
                                      }
                                  }
                              },
                              {
                                  type: 'Property',
                                  key: {
                                      type: 'Identifier',
                                      name: 'f',
                                      start: 6,
                                      end: 7,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 6
                                          },
                                          end: {
                                              line: 1,
                                              column: 7
                                          }
                                      }
                                  },
                                  value: {
                                      type: 'MemberExpression',
                                      object: {
                                          type: 'CallExpression',
                                          callee: {
                                              type: 'Identifier',
                                              name: 'h',
                                              start: 8,
                                              end: 9,
                                              loc: {
                                                  start: {
                                                      line: 1,
                                                      column: 8
                                                  },
                                                  end: {
                                                      line: 1,
                                                      column: 9
                                                  }
                                              }
                                          },
                                          arguments: [],
                                          start: 8,
                                          end: 11,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 8
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 11
                                              }
                                          }
                                      },
                                      computed: false,
                                      property: {
                                          type: 'Identifier',
                                          name: 'a',
                                          start: 12,
                                          end: 13,
                                          loc: {
                                              start: {
                                                  line: 1,
                                                  column: 12
                                              },
                                              end: {
                                                  line: 1,
                                                  column: 13
                                              }
                                          }
                                      },
                                      start: 8,
                                      end: 13,
                                      loc: {
                                          start: {
                                              line: 1,
                                              column: 8
                                          },
                                          end: {
                                              line: 1,
                                              column: 13
                                          }
                                      }
                                  },
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: false,
                                  start: 6,
                                  end: 13,
                                  loc: {
                                      start: {
                                          line: 1,
                                          column: 6
                                      },
                                      end: {
                                          line: 1,
                                          column: 13
                                      }
                                  }
                              }
                          ],
                          start: 1,
                          end: 14,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 1
                              },
                              end: {
                                  line: 1,
                                  column: 14
                              }
                          }
                      },
                      operator: '=',
                      right: {
                          type: 'Literal',
                          value: 0,
                          start: 17,
                          end: 18,
                          loc: {
                              start: {
                                  line: 1,
                                  column: 17
                              },
                              end: {
                                  line: 1,
                                  column: 18
                              }
                          },
                          raw: '0'
                      },
                      start: 1,
                      end: 18,
                      loc: {
                          start: {
                              line: 1,
                              column: 1
                          },
                          end: {
                              line: 1,
                              column: 18
                          }
                      }
                  },
                  start: 0,
                  end: 19,
                  loc: {
                      start: {
                          line: 1,
                          column: 0
                      },
                      end: {
                          line: 1,
                          column: 19
                      }
                  }
              }],
              sourceType: 'script',
              start: 0,
              end: 19,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: 1,
                      column: 19
                  }
              }
          }
      });


      pass(`let {a:b} = {};`, {
          source: 'let {a:b} = {};',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "sourceType": "script",
              "body": [{
                  "type": "VariableDeclaration",
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "ObjectExpression",
                          "properties": [],
                          "start": 12,
                          "end": 14,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 12
                              },
                              "end": {
                                  "line": 1,
                                  "column": 14
                              }
                          }
                      },
                      "id": {
                          "type": "ObjectPattern",
                          "properties": [{
                              "type": "Property",
                              "kind": "init",
                              "key": {
                                  "type": "Identifier",
                                  "name": "a",
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
                                  }
                              },
                              "computed": false,
                              "value": {
                                  "type": "Identifier",
                                  "name": "b",
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
                                  }
                              },
                              "method": false,
                              "shorthand": false,
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
                              }
                          }],
                          "start": 4,
                          "end": 9,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 4
                              },
                              "end": {
                                  "line": 1,
                                  "column": 9
                              }
                          }
                      },
                      "start": 4,
                      "end": 14,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 14
                          }
                      }
                  }],
                  "kind": "let",
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
                  }
              }],
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
              }
          }
      });


      pass(`const {a:b} = {};`, {
          source: 'const {a:b} = {};',
          loc: true,
          ranges: true,
          raw: true,
          expected: {
              "type": "Program",
              "sourceType": "script",
              "body": [{
                  "type": "VariableDeclaration",
                  "declarations": [{
                      "type": "VariableDeclarator",
                      "init": {
                          "type": "ObjectExpression",
                          "properties": [],
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
                          }
                      },
                      "id": {
                          "type": "ObjectPattern",
                          "properties": [{
                              "type": "Property",
                              "kind": "init",
                              "key": {
                                  "type": "Identifier",
                                  "name": "a",
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
                                  }
                              },
                              "computed": false,
                              "value": {
                                  "type": "Identifier",
                                  "name": "b",
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
                                  }
                              },
                              "method": false,
                              "shorthand": false,
                              "start": 7,
                              "end": 10,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 7
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 10
                                  }
                              }
                          }],
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
                          }
                      },
                      "start": 6,
                      "end": 16,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 6
                          },
                          "end": {
                              "line": 1,
                              "column": 16
                          }
                      }
                  }],
                  "kind": "const",
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
                  }
              }],
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
              }
          }
      });


      fail(`"use strict"; 0, { eval } = {};`, {
          source: '"use strict"; 0, { eval } = {};',
          line: 1,
      });

      fail(`({a} += 0);`, {
          source: '({a} += 0);',
          line: 1,
      });

      fail(`({a,,} = 0)`, {
          source: '({a,,} = 0)',
          line: 1,
      });

      fail(`({,a,} = 0)`, {
          source: '({,a,} = 0)',
          line: 1,
      });

      fail(`({a,,a} = 0)`, {
          source: '({a,,a} = 0)',
          line: 1,
      });

      fail(`({function} = 0)`, {
          source: '({function} = 0)',
          line: 1,
      });

      fail(`({a:function} = 0)`, {
          source: '({a:function} = 0)',
          line: 1,
      });

      fail(`({a:for} = 0)`, {
          source: '({a:for} = 0)',
          line: 1,
      });

      fail(`({"a"} = 0)`, {
          source: '({"a"} = 0)',
          line: 1,
      });

      fail(`({var} = 0)`, {
          source: '({var} = 0)',
          line: 1,
      });

      fail(`({a.b} = 0)`, {
          source: '({a.b} = 0)',
          line: 1,
      });

      fail(`({0} = 0)`, {
          source: '({0} = 0)',
          line: 1,
      });

      fail(`({a} += 0);`, {
          source: '({a} += 0);',
          line: 1,
      });
  });
});