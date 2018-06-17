import * as t from 'assert';
import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';

describe('Statements - Block', () => {

  describe('Failure', () => {

    fail('y={x;};', Context.Empty, {
        source: 'y={x;};',
    });

    fail('do{};while()', Context.Empty, {
        source: 'do{};while()',
    });

    fail('if{};else{}', Context.Empty, {
        source: 'if{};else{}',
    });

    fail('try{};catch{};finally{}', Context.Empty, {
        source: 'try{};catch{};finally{}',
    });

    fail('try{};catch(){}', Context.Empty, {
        source: 'try{};catch(){}',
    });
});

describe('Pass', () => {

  pass(`{ a(); bt(); }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `{ a(); bt(); }`,
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
              type: 'BlockStatement',
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
                      expression: {
                          type: 'CallExpression',
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
                          callee: {
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
                          arguments: []
                      }
                  },
                  {
                      type: 'ExpressionStatement',
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
                      expression: {
                          type: 'CallExpression',
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
                          callee: {
                              type: 'Identifier',
                              start: 7,
                              end: 9,
                              loc: {
                                  start: {
                                      line: 1,
                                      column: 7
                                  },
                                  end: {
                                      line: 1,
                                      column: 9
                                  }
                              },
                              name: 'bt'
                          },
                          arguments: []
                      }
                  }
              ]
          }],
          sourceType: 'script'
      }
  });


    pass('{ var {foo=3} = {}; };', Context.Empty, {
        source: '{ var {foo=3} = {}; };',
        expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "VariableDeclaration",
                            "kind": "var",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "ObjectExpression",
                                        "properties": []
                                    },
                                    "id": {
                                        "type": "ObjectPattern",
                                        "properties": [
                                            {
                                                "type": "Property",
                                                "kind": "init",
                                                "key": {
                                                    "type": "Identifier",
                                                    "name": "foo"
                                                },
                                                "computed": false,
                                                "value": {
                                                    "type": "AssignmentPattern",
                                                    "left": {
                                                        "type": "Identifier",
                                                        "name": "foo"
                                                    },
                                                    "right": {
                                                        "type": "Literal",
                                                        "value": 3
                                                    }
                                                },
                                                "method": false,
                                                "shorthand": true
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "EmptyStatement"
                }
            ]
        }
    });

    pass('{ function foo() {}; };', Context.Empty, {
        source: '{ function foo() {}; };',
        expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "FunctionDeclaration",
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "async": false,
                            "generator": false,
                            "expression": false,
                            "id": {
                                "type": "Identifier",
                                "name": "foo"
                            }
                        },
                        {
                            "type": "EmptyStatement"
                        }
                    ]
                },
                {
                    "type": "EmptyStatement"
                }
            ]
        }
    });

    pass('{ async function foo() {}; };', Context.Empty, {
        source: '{ async function foo() {}; };',
        expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "FunctionDeclaration",
                            "params": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": []
                            },
                            "async": true,
                            "generator": false,
                            "expression": false,
                            "id": {
                                "type": "Identifier",
                                "name": "foo"
                            }
                        },
                        {
                            "type": "EmptyStatement"
                        }
                    ]
                },
                {
                    "type": "EmptyStatement"
                }
            ]
        }
    });

    pass('{ var foo = 0; }', Context.Empty, {
        source: '{ var foo = 0; }',
        expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "VariableDeclaration",
                            "kind": "var",
                            "declarations": [
                                {
                                    "type": "VariableDeclarator",
                                    "init": {
                                        "type": "Literal",
                                        "value": 0
                                    },
                                    "id": {
                                        "type": "Identifier",
                                        "name": "foo"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });

    pass(`{ var foo = 0; }`, Context.Empty, {
      source: `{ var foo = 0; }`,
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "VariableDeclaration",
                        "kind": "var",
                        "declarations": [
                            {
                                "type": "VariableDeclarator",
                                "init": {
                                    "type": "Literal",
                                    "value": 0
                                },
                                "id": {
                                    "type": "Identifier",
                                    "name": "foo"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
    });

    pass('{ a(); bt(); }', Context.Empty, {
        source: '{ a(); bt(); }',
        expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "a"
                                },
                                "arguments": []
                            }
                        },
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "bt"
                                },
                                "arguments": []
                            }
                        }
                    ]
                }
            ]
        }
    });

    pass(`{ function foo() {}; };`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `{ function foo() {}; };`,
      expected: {
          type: 'Program',
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
          },
          body: [
            {
              type: 'BlockStatement',
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
              },
              body: [
                {
                  type: 'FunctionDeclaration',
                  start: 2,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  },
                  id: {
                    type: 'Identifier',
                    start: 11,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    },
                    name: 'foo'
                  },
                  generator: false,
                  expression: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    start: 17,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    },
                    body: []
                  }
                },
                {
                  type: 'EmptyStatement',
                  start: 19,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                }
              ]
            },
            {
              type: 'EmptyStatement',
              start: 22,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 22
                },
                end: {
                  line: 1,
                  column: 23
                }
              }
            }
          ],
          sourceType: 'script'
        }
    });

    pass(`{ async function foo() {}; };`, Context.Empty, {
      source: `{ async function foo() {}; };`,
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "FunctionDeclaration",
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        },
                        "params": [],
                        "async": true,
                        "generator": false,
                        "expression": false,
                        "id": {
                            "type": "Identifier",
                            "name": "foo"
                        }
                    },
                    {
                        "type": "EmptyStatement"
                    }
                ]
            },
            {
                "type": "EmptyStatement"
            }
        ]
    }
    });
  });
});
