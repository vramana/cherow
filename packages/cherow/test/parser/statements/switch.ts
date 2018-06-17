import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';
import { parseSource } from '../../../src/parser/parser'
import * as t from 'assert';

describe('Statements - Switch', () => {

  describe('Failure', () => {


    const invalidSyntax = [
      `switch() {case 0: }`,
      'switch(value);',
      'switch { case a:}',
      'switch(a) { default: default: }',
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

 fail('switch (c) { default: default: }', Context.Empty, {
      source: 'switch (c) { default: default: }',
  });
    fail(`duplicate default`, Context.Empty, {
      source: `function SwitchTest(value){
        var result = 0;
        switch(value) {
          case 0:
            result += 2;
          default:
            result += 32;
            break;
          default:
            result += 32;
            break;
        }
        return result;
      }`
  });

    fail('()?c:d=>{}=>{}', Context.Empty, {
          source: '()?c:d=>{}=>{}',
      });
  });

  describe('Pass', () => {

    pass(`switch(a){case 1:}`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
      source: `switch(a){case 1:}`,
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
        body: [
          {
            type: 'SwitchStatement',
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
            discriminant: {
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
            cases: [
              {
                type: 'SwitchCase',
                start: 10,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                },
                consequent: [],
                test: {
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
                  value: 1,
                  raw: '1'
                }
              }
            ]
          }
        ],
        sourceType: 'script'
      }
  });

  pass(`switch (answer) { case 0: hi(); continue; }`, Context.OptionsRanges | Context.OptionsLoc | Context.OptionsRaw, {
    source: `switch (answer) { case 0: hi(); continue; }`,
    expected: {
      "type": "Program",
      "sourceType": "script",
      "body": [
          {
              "type": "SwitchStatement",
              "discriminant": {
                  "type": "Identifier",
                  "name": "answer",
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
                  }
              },
              "cases": [
                  {
                      "type": "SwitchCase",
                      "test": {
                          "type": "Literal",
                          "value": 0,
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
                          "raw": "0"
                      },
                      "consequent": [
                          {
                              "type": "ExpressionStatement",
                              "expression": {
                                  "type": "CallExpression",
                                  "callee": {
                                      "type": "Identifier",
                                      "name": "hi",
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
                                      }
                                  },
                                  "arguments": [],
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
                                  }
                              },
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
                              }
                          },
                          {
                              "type": "ContinueStatement",
                              "label": null,
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
                          }
                      ],
                      "start": 18,
                      "end": 41,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 18
                          },
                          "end": {
                              "line": 1,
                              "column": 41
                          }
                      }
                  }
              ],
              "start": 0,
              "end": 43,
              "loc": {
                  "start": {
                      "line": 1,
                      "column": 0
                  },
                  "end": {
                      "line": 1,
                      "column": 43
                  }
              }
          }
      ],
      "start": 0,
      "end": 43,
      "loc": {
          "start": {
              "line": 1,
              "column": 0
          },
          "end": {
              "line": 1,
              "column": 43
          }
      }
  }
  });


  pass('switch(fkleuver) { default: {} }', Context.OptionsRanges | Context.OptionsLoc, {
      source: 'switch(fkleuver) { default: {} }',
      expected: {
          "type": "Program",
          "sourceType": "script",
          "body": [{
              "type": "SwitchStatement",
              "discriminant": {
                  "type": "Identifier",
                  "name": "fkleuver",
                  "start": 7,
                  "end": 15,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 7
                      },
                      "end": {
                          "line": 1,
                          "column": 15
                      }
                  }
              },
              "cases": [{
                  "type": "SwitchCase",
                  "test": null,
                  "consequent": [{
                      "type": "BlockStatement",
                      "body": [],
                      "start": 28,
                      "end": 30,
                      "loc": {
                          "start": {
                              "line": 1,
                              "column": 28
                          },
                          "end": {
                              "line": 1,
                              "column": 30
                          }
                      }
                  }],
                  "start": 19,
                  "end": 30,
                  "loc": {
                      "start": {
                          "line": 1,
                          "column": 19
                      },
                      "end": {
                          "line": 1,
                          "column": 30
                      }
                  }
              }],
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
              }
          }],
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
          }
      }
  });
  pass('switch (A) {default: B;}', Context.Empty, {
      source: 'switch (A) {default: B;}',
      expected: {
          "type": "Program",
          "sourceType": "script",
          "body": [{
              "type": "SwitchStatement",
              "discriminant": {
                  "type": "Identifier",
                  "name": "A"
              },
              "cases": [{
                  "type": "SwitchCase",
                  "test": null,
                  "consequent": [{
                      "type": "ExpressionStatement",
                      "expression": {
                          "type": "Identifier",
                          "name": "B"
                      }
                  }]
              }]
          }]
      }
  });


});
});
