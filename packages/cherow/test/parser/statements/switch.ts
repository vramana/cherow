import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';

describe('Statements - Switch', () => {

  fail('switch(foo) { default: {} default: bar }', Context.Empty, {
    source: 'switch(foo) { default: {} default: bar }',
    expected: {}
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
