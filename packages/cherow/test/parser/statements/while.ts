import * as t from 'assert';
import { pass } from '../../test-utils';
import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser'
describe('Statements - While', () => {

  describe('Failure', () => {

    const invalidSyntax = [
        `while 1 break;`,
        'while 0 break;',
        `while 'hood' break;`,
        `while (false) async function* g() {}`,
        `while (false) label1: label2: function f() {}`,
        'while (false) function f() {}',
        'while (false) function* g() {}',
        'while (false) class C {}',
        'while (false) let x = 1;',
        'while (false) async function f() {}',
        'while 0 break;',
        'while true break;',
        'while "hood" break;',
        'while ( false ) Label: continue Label;',
        `while '' break;`,
        `while() {}`,
    ];

    for (const arg of invalidSyntax) {
        it(`${arg}`, () => {
            t.throws(() => {
                parseSource(`${arg}`, undefined, Context.Empty);
            });
        });
    }
  });

  describe('Failure', () => {
       pass('while(function a(){return 1;}()){ break }', Context.OptionsLoc | Context.OptionsRanges, {
            source: 'while(function a(){return 1;}()){ break }',
            expected: {
              "type": "Program",
              "sourceType": "script",
              "body": [
                  {
                      "type": "WhileStatement",
                      "test": {
                          "type": "CallExpression",
                          "callee": {
                              "type": "FunctionExpression",
                              "params": [],
                              "body": {
                                  "type": "BlockStatement",
                                  "body": [
                                      {
                                          "type": "ReturnStatement",
                                          "argument": {
                                              "type": "Literal",
                                              "value": 1,
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
                                              }
                                          },
                                          "start": 19,
                                          "end": 28,
                                          "loc": {
                                              "start": {
                                                  "line": 1,
                                                  "column": 19
                                              },
                                              "end": {
                                                  "line": 1,
                                                  "column": 28
                                              }
                                          }
                                      }
                                  ],
                                  "start": 18,
                                  "end": 29,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 18
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 29
                                      }
                                  }
                              },
                              "async": false,
                              "generator": false,
                              "expression": false,
                              "id": {
                                  "type": "Identifier",
                                  "name": "a",
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
                              "start": 6,
                              "end": 29,
                              "loc": {
                                  "start": {
                                      "line": 1,
                                      "column": 6
                                  },
                                  "end": {
                                      "line": 1,
                                      "column": 29
                                  }
                              }
                          },
                          "arguments": [],
                          "start": 6,
                          "end": 31,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 6
                              },
                              "end": {
                                  "line": 1,
                                  "column": 31
                              }
                          }
                      },
                      "body": {
                          "type": "BlockStatement",
                          "body": [
                              {
                                  "type": "BreakStatement",
                                  "label": null,
                                  "start": 34,
                                  "end": 39,
                                  "loc": {
                                      "start": {
                                          "line": 1,
                                          "column": 34
                                      },
                                      "end": {
                                          "line": 1,
                                          "column": 39
                                      }
                                  }
                              }
                          ],
                          "start": 32,
                          "end": 41,
                          "loc": {
                              "start": {
                                  "line": 1,
                                  "column": 32
                              },
                              "end": {
                                  "line": 1,
                                  "column": 41
                              }
                          }
                      },
                      "start": 0,
                      "end": 41,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 0
                          },
                          "end": {
                              "line": 1,
                              "column": 41
                          }
                      }
                  }
              ],
              "start": 0,
              "end": 41,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 41
                  }
              }
          }
       });
    });
});
