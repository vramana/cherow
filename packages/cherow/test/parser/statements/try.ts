import * as t from 'assert';
import { pass } from '../../test-utils';
import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser';
describe('Statements - Try', () => {

  describe('Statements - Try', () => {

    const invalidSyntax: any = [
      'try { }',
      'try { } foo();',
      'try { } catch (e) foo();',
      'try { } finally foo();',
      `try{}
      catch(){`,
      `try{}
        catch(){
        finally{}`,
        `try{}
        catch({
        finally{}`,
        `catch(){}
        finally{}`,
        `try{
        }
        finally(e){}`,
        `try
        {
          try
          {
          }
        }
        catch(e1){}
        catch(e2){}`,
        `try { throw []; } catch ([...[ x ] = []]) {}`,
        `try { throw []; } catch ([...x = []]) {}`,
        `try { throw [1, 2, 3]; } catch ([...{ x }, y]) {}`,
        `try { throw [1, 2, 3]; } catch ([...[x], y]) { }`

  ];

  for (const arg of invalidSyntax) {
      it(`${arg}`, () => {
          t.throws(() => {
              parseSource(`${arg}`, undefined, Context.Empty);
          });
      });

      it(`${arg}`, () => {
          t.throws(() => {
              parseSource(`${arg}`, undefined, Context.Strict | Context.Module);
          });
      });
  }


  });

  describe('Pass', () => {

    pass('try {} finally {}', Context.OptionsLoc | Context.OptionsRanges, {
        source: 'try {} finally {}',
        expected: {
          "type": "Program",
          "sourceType": "script",
          "body": [
              {
                  "type": "TryStatement",
                  "block": {
                      "type": "BlockStatement",
                      "body": [],
                      "start": 4,
                      "end": 6,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 6
                          }
                      }
                  },
                  "handler": null,
                  "finalizer": {
                      "type": "BlockStatement",
                      "body": [],
                      "start": 15,
                      "end": 17,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 15
                          },
                          "end": {
                              "line": 1,
                              "column": 17
                          }
                      }
                  },
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
          ],
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

    pass('try {} catch(e) {} finally {}', Context.Empty, {
        source: 'try {} catch(e) {} finally {}',
        expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "e"
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": {
                        "type": "BlockStatement",
                        "body": []
                    }
                }
            ]
        }
    });

    pass('try { throw null; } catch (f) {if (false) ; else function f() { return 123; }}', Context.OptionsLoc | Context.OptionsRanges, {
      source: 'try { throw null; } catch (f) {if (false) ; else function f() { return 123; }}',
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ThrowStatement",
                            "argument": {
                                "type": "Literal",
                                "value": null,
                                "start": 12,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "start": 6,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        }
                    ],
                    "start": 4,
                    "end": 19,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 19
                        }
                    }
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "Identifier",
                        "name": "f",
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
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "IfStatement",
                                "test": {
                                    "type": "Literal",
                                    "value": false,
                                    "start": 35,
                                    "end": 40,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 35
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 40
                                        }
                                    }
                                },
                                "consequent": {
                                    "type": "EmptyStatement",
                                    "start": 42,
                                    "end": 43,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 42
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 43
                                        }
                                    }
                                },
                                "alternate": {
                                    "type": "FunctionDeclaration",
                                    "params": [],
                                    "body": {
                                        "type": "BlockStatement",
                                        "body": [
                                            {
                                                "type": "ReturnStatement",
                                                "argument": {
                                                    "type": "Literal",
                                                    "value": 123,
                                                    "start": 71,
                                                    "end": 74,
                                                    "loc": {
                                                        "start": {
                                                            "line": 1,
                                                            "column": 71
                                                        },
                                                        "end": {
                                                            "line": 1,
                                                            "column": 74
                                                        }
                                                    }
                                                },
                                                "start": 64,
                                                "end": 75,
                                                "loc": {
                                                    "start": {
                                                        "line": 1,
                                                        "column": 64
                                                    },
                                                    "end": {
                                                        "line": 1,
                                                        "column": 75
                                                    }
                                                }
                                            }
                                        ],
                                        "start": 62,
                                        "end": 77,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 62
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 77
                                            }
                                        }
                                    },
                                    "async": false,
                                    "generator": false,
                                    "expression": false,
                                    "id": {
                                        "type": "Identifier",
                                        "name": "f",
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
                                        }
                                    },
                                    "start": 49,
                                    "end": 77,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 49
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 77
                                        }
                                    }
                                },
                                "start": 31,
                                "end": 77,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 31
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 77
                                    }
                                }
                            }
                        ],
                        "start": 30,
                        "end": 78,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 30
                            },
                            "end": {
                                "line": 1,
                                "column": 78
                            }
                        }
                    },
                    "start": 20,
                    "end": 78,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 20
                        },
                        "end": {
                            "line": 1,
                            "column": 78
                        }
                    }
                },
                "finalizer": null,
                "start": 0,
                "end": 78,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 78
                    }
                }
            }
        ],
        "start": 0,
        "end": 78,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 78
            }
        }
    }
    });

    pass('try { throw {}; } catch ({ arrow = () => {} }) {}', Context.OptionsLoc | Context.OptionsRanges, {
      source: 'try { throw {}; } catch ({ arrow = () => {} }) {}',
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ThrowStatement",
                            "argument": {
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
                            "start": 6,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        }
                    ],
                    "start": 4,
                    "end": 17,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 17
                        }
                    }
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "ObjectPattern",
                        "properties": [
                            {
                                "type": "Property",
                                "kind": "init",
                                "key": {
                                    "type": "Identifier",
                                    "name": "arrow",
                                    "start": 27,
                                    "end": 32,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 32
                                        }
                                    }
                                },
                                "computed": false,
                                "value": {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "arrow",
                                        "start": 27,
                                        "end": 32,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 27
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 32
                                            }
                                        }
                                    },
                                    "right": {
                                        "type": "ArrowFunctionExpression",
                                        "body": {
                                            "type": "BlockStatement",
                                            "body": [],
                                            "start": 41,
                                            "end": 43,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 41
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 43
                                                }
                                            }
                                        },
                                        "params": [],
                                        "id": null,
                                        "async": false,
                                        "generator": false,
                                        "expression": false,
                                        "start": 35,
                                        "end": 43,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 35
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 43
                                            }
                                        }
                                    },
                                    "start": 27,
                                    "end": 43,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 27
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 43
                                        }
                                    }
                                },
                                "method": false,
                                "shorthand": true,
                                "start": 27,
                                "end": 43,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 27
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 43
                                    }
                                }
                            }
                        ],
                        "start": 25,
                        "end": 45,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 25
                            },
                            "end": {
                                "line": 1,
                                "column": 45
                            }
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 47,
                        "end": 49,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 47
                            },
                            "end": {
                                "line": 1,
                                "column": 49
                            }
                        }
                    },
                    "start": 18,
                    "end": 49,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 18
                        },
                        "end": {
                            "line": 1,
                            "column": 49
                        }
                    }
                },
                "finalizer": null,
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
                }
            }
        ],
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
        }
    }
    });

    pass('try { throw null; } catch ({}) {}', Context.OptionsLoc | Context.OptionsRanges, {
      source: 'try { throw null; } catch ({}) {}',
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ThrowStatement",
                            "argument": {
                                "type": "Literal",
                                "value": null,
                                "start": 12,
                                "end": 16,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 12
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 16
                                    }
                                }
                            },
                            "start": 6,
                            "end": 17,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 17
                                }
                            }
                        }
                    ],
                    "start": 4,
                    "end": 19,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 19
                        }
                    }
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "ObjectPattern",
                        "properties": [],
                        "start": 27,
                        "end": 29,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 27
                            },
                            "end": {
                                "line": 1,
                                "column": 29
                            }
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 31,
                        "end": 33,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 31
                            },
                            "end": {
                                "line": 1,
                                "column": 33
                            }
                        }
                    },
                    "start": 20,
                    "end": 33,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 20
                        },
                        "end": {
                            "line": 1,
                            "column": 33
                        }
                    }
                },
                "finalizer": null,
                "start": 0,
                "end": 33,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 33
                    }
                }
            }
        ],
        "start": 0,
        "end": 33,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 33
            }
        }
    }
    });

    pass('try { throw [1, 2, 3]; } catch ([...x]) {}', Context.OptionsLoc | Context.OptionsRanges, {
      source: 'try { throw [1, 2, 3]; } catch ([...x]) {}',
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ThrowStatement",
                            "argument": {
                                "type": "ArrayExpression",
                                "elements": [
                                    {
                                        "type": "Literal",
                                        "value": 1,
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
                                        }
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 2,
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
                                        }
                                    },
                                    {
                                        "type": "Literal",
                                        "value": 3,
                                        "start": 19,
                                        "end": 20,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 19
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 20
                                            }
                                        }
                                    }
                                ],
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
                                }
                            },
                            "start": 6,
                            "end": 22,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 22
                                }
                            }
                        }
                    ],
                    "start": 4,
                    "end": 24,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 24
                        }
                    }
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "ArrayPattern",
                        "elements": [
                            {
                                "type": "RestElement",
                                "argument": {
                                    "type": "Identifier",
                                    "name": "x",
                                    "start": 36,
                                    "end": 37,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 36
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 37
                                        }
                                    }
                                },
                                "start": 33,
                                "end": 37,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 33
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 37
                                    }
                                }
                            }
                        ],
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
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 40,
                        "end": 42,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 40
                            },
                            "end": {
                                "line": 1,
                                "column": 42
                            }
                        }
                    },
                    "start": 25,
                    "end": 42,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 25
                        },
                        "end": {
                            "line": 1,
                            "column": 42
                        }
                    }
                },
                "finalizer": null,
                "start": 0,
                "end": 42,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 42
                    }
                }
            }
        ],
        "start": 0,
        "end": 42,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 42
            }
        }
    }
    });

    pass('try { } catch (e) { say(e) }', Context.OptionsLoc | Context.OptionsRanges, {
      source: 'try { } catch (e) { say(e) }',
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 4,
                    "end": 7,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "Identifier",
                        "name": "e",
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
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "say",
                                        "start": 20,
                                        "end": 23,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 20
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 23
                                            }
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "Identifier",
                                            "name": "e",
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
                                        }
                                    ],
                                    "start": 20,
                                    "end": 26,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 20
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 26
                                        }
                                    }
                                },
                                "start": 20,
                                "end": 26,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 20
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 26
                                    }
                                }
                            }
                        ],
                        "start": 18,
                        "end": 28,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 18
                            },
                            "end": {
                                "line": 1,
                                "column": 28
                            }
                        }
                    },
                    "start": 8,
                    "end": 28,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 8
                        },
                        "end": {
                            "line": 1,
                            "column": 28
                        }
                    }
                },
                "finalizer": null,
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

    pass('try { doThat(); } catch (e) { say(e) }', Context.OptionsLoc | Context.OptionsRanges, {
      source: 'try { doThat(); } catch (e) { say(e) }',
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "doThat",
                                    "start": 6,
                                    "end": 12,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 6
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 12
                                        }
                                    }
                                },
                                "arguments": [],
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
                            },
                            "start": 6,
                            "end": 15,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 6
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        }
                    ],
                    "start": 4,
                    "end": 17,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 17
                        }
                    }
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "Identifier",
                        "name": "e",
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
                        }
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "CallExpression",
                                    "callee": {
                                        "type": "Identifier",
                                        "name": "say",
                                        "start": 30,
                                        "end": 33,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 30
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 33
                                            }
                                        }
                                    },
                                    "arguments": [
                                        {
                                            "type": "Identifier",
                                            "name": "e",
                                            "start": 34,
                                            "end": 35,
                                            "loc": {
                                                "start": {
                                                    "line": 1,
                                                    "column": 34
                                                },
                                                "end": {
                                                    "line": 1,
                                                    "column": 35
                                                }
                                            }
                                        }
                                    ],
                                    "start": 30,
                                    "end": 36,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 30
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 36
                                        }
                                    }
                                },
                                "start": 30,
                                "end": 36,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 30
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 36
                                    }
                                }
                            }
                        ],
                        "start": 28,
                        "end": 38,
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 28
                            },
                            "end": {
                                "line": 1,
                                "column": 38
                            }
                        }
                    },
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
                    }
                },
                "finalizer": null,
                "start": 0,
                "end": 38,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 38
                    }
                }
            }
        ],
        "start": 0,
        "end": 38,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 38
            }
        }
    }
    });

    pass('try { } finally { get_rid_of_esprima(stuff) }', Context.OptionsLoc | Context.OptionsRanges, {
      source: 'try { } finally { get_rid_of_esprima(stuff) }',
      expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": [],
                    "start": 4,
                    "end": 7,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 4
                        },
                        "end": {
                            "line": 1,
                            "column": 7
                        }
                    }
                },
                "handler": null,
                "finalizer": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "CallExpression",
                                "callee": {
                                    "type": "Identifier",
                                    "name": "get_rid_of_esprima",
                                    "start": 18,
                                    "end": 36,
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 18
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 36
                                        }
                                    }
                                },
                                "arguments": [
                                    {
                                        "type": "Identifier",
                                        "name": "stuff",
                                        "start": 37,
                                        "end": 42,
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 37
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 42
                                            }
                                        }
                                    }
                                ],
                                "start": 18,
                                "end": 43,
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 18
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 43
                                    }
                                }
                            },
                            "start": 18,
                            "end": 43,
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 18
                                },
                                "end": {
                                    "line": 1,
                                    "column": 43
                                }
                            }
                        }
                    ],
                    "start": 16,
                    "end": 45,
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 16
                        },
                        "end": {
                            "line": 1,
                            "column": 45
                        }
                    }
                },
                "start": 0,
                "end": 45,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 45
                    }
                }
            }
        ],
        "start": 0,
        "end": 45,
        "loc": {
            "start": {
                "line": 1,
                "column": 0
            },
            "end": {
                "line": 1,
                "column": 45
            }
        }
    }
    });

    pass('try { } catch (eval) { }', Context.OptionsLoc | Context.OptionsRanges, {
        source: 'try { } catch (eval) { }',
        expected: {
          "type": "Program",
          "sourceType": "script",
          "body": [
              {
                  "type": "TryStatement",
                  "block": {
                      "type": "BlockStatement",
                      "body": [],
                      "start": 4,
                      "end": 7,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 4
                          },
                          "end": {
                              "line": 1,
                              "column": 7
                          }
                      }
                  },
                  "handler": {
                      "type": "CatchClause",
                      "param": {
                          "type": "Identifier",
                          "name": "eval",
                          "start": 15,
                          "end": 19,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 15
                              },
                              "end": {
                                  "line": 1,
                                  "column": 19
                              }
                          }
                      },
                      "body": {
                          "type": "BlockStatement",
                          "body": [],
                          "start": 21,
                          "end": 24,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 21
                              },
                              "end": {
                                  "line": 1,
                                  "column": 24
                              }
                          }
                      },
                      "start": 8,
                      "end": 24,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 8
                          },
                          "end": {
                              "line": 1,
                              "column": 24
                          }
                      }
                  },
                  "finalizer": null,
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
                  }
              }
          ],
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
          }
      }
    });

    pass('try {} catch(e){}', Context.Empty, {
        source: 'try {} catch(e){}',
        expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "Identifier",
                            "name": "e"
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }
            ]
        }
    });
/*
    pass('try {} catch(e, f){}', Context.Empty, {
        source: 'try {} catch(e, f){}',
        expected: {
              "body": [
                {
                  "block": {
                    "body": [],
                    "type": "BlockStatement",
                  },
                  "finalizer": null,
                  "handler": {
                    "body": {
                      "body": [
                       {
                          "expression": undefined,
                          "type": "ExpressionStatement",
                        },
                        {
                          "expression": {
                            "name": "f",
                            "type": "Identifier",
                          },
                          "type": "ExpressionStatement",
                        },
                        {
                          "expression": undefined,
                          "type": "ExpressionStatement",
                        },
                        {
                          "expression": undefined,
                          "type": "ExpressionStatement",
                        },
                      ],
                      "type": "BlockStatement",
                    },
                    "param": {
                      "name": "e",
                      "type": "Identifier",
                    },
                    "type": "CatchClause",
                  },
                  "type": "TryStatement",
                },
              ],
              "sourceType": "script",
              "type": "Program"
            }
    }, function(errMsg: string) {
        //t.equal(errMsg, 'Unexpected token ,');
    });   */

    pass('try {} catch({e}){}', Context.Empty, {
        source: 'try {} catch({e}){}',
        expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "e"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "Identifier",
                                        "name": "e"
                                    },
                                    "method": false,
                                    "shorthand": true
                                }
                            ]
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }
            ]
        }
    });

    pass('try {} catch([e]){}', Context.Empty, {
        source: 'try {} catch([e]){}',
        expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "Identifier",
                                    "name": "e"
                                }
                            ]
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }
            ]
        }
    });
/*
    pass('try {} catch({e}=x){}', Context.Empty, {
        source: 'try {} catch({e}=x){}',
        expected: {
              "body": [
              {
                  "block": {
                    "body": [],
                    "type": "BlockStatement",
                  },
                 "finalizer": null,
                  "handler": {
                    "body": {
                      "body": [
                        {
                          "expression": undefined,
                          "type": "ExpressionStatement"
                        },
                        {
                          "expression": {
                            "name": "x",
                            "type": "Identifier",
                          },
                          "type": "ExpressionStatement",
                        },
                        {
                          "expression": undefined,
                         "type": "ExpressionStatement"
                        },
                        {
                          "expression": undefined,
                          "type": "ExpressionStatement",
                        },
                      ],
                      "type": "BlockStatement",
                   },
                    "param": {
                      "properties": [
                        {
                          "computed": false,
                          "key": {
                           "name": "e",
                            "type": "Identifier",
                          },
                          "kind": "init",
                          "method": false,
                          "shorthand": true,
                          "type": "Property",
                          "value": {
                            "name": "e",
                            "type": "Identifier",
                          }
                        }
                      ],
                      "type": "ObjectPattern"
                    },
                    "type": "CatchClause"
                  },
                  "type": "TryStatement"
                }
              ],
              "sourceType": "script",
              "type": "Program"
            }
    }, function() {
        // Multiple error messages
        // 1 - Catch clause parameter does not support default values
        // 2 - Unexpected token =
    });
*/
    pass('try {} catch({e=x}){}', Context.Empty, {
        source: 'try {} catch({e=x}){}',
        expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "ObjectPattern",
                            "properties": [
                                {
                                    "type": "Property",
                                    "kind": "init",
                                    "key": {
                                        "type": "Identifier",
                                        "name": "e"
                                    },
                                    "computed": false,
                                    "value": {
                                        "type": "AssignmentPattern",
                                        "left": {
                                            "type": "Identifier",
                                            "name": "e"
                                        },
                                        "right": {
                                            "type": "Identifier",
                                            "name": "x"
                                        }
                                    },
                                    "method": false,
                                    "shorthand": true
                                }
                            ]
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }
            ]
        }
    });

    pass('try {} catch([e=x]){}', Context.Empty, {
        source: 'try {} catch([e=x]){}',
        expected: {
            "type": "Program",
            "sourceType": "script",
            "body": [
                {
                    "type": "TryStatement",
                    "block": {
                        "type": "BlockStatement",
                        "body": []
                    },
                    "handler": {
                        "type": "CatchClause",
                        "param": {
                            "type": "ArrayPattern",
                            "elements": [
                                {
                                    "type": "AssignmentPattern",
                                    "left": {
                                        "type": "Identifier",
                                        "name": "e"
                                    },
                                    "right": {
                                        "type": "Identifier",
                                        "name": "x"
                                    }
                                }
                            ]
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": []
                        }
                    },
                    "finalizer": null
                }
            ]
        }
    });

    pass('try {} catch(e) {}', Context.Empty, {
    source: 'try {} catch(e) {}',
    expected: {
        "type": "Program",
        "sourceType": "script",
        "body": [
            {
                "type": "TryStatement",
                "block": {
                    "type": "BlockStatement",
                    "body": []
                },
                "handler": {
                    "type": "CatchClause",
                    "param": {
                        "type": "Identifier",
                        "name": "e"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    }
                },
                "finalizer": null
            }
        ]
    },
});
});
});
