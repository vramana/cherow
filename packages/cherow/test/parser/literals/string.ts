import * as t from 'assert';
import { pass, fail } from '../../test-utils';
import { Context } from '../../../src/common';

describe('Literals - Failure', () => {

  describe('Pass', () => {
  fail('"\\uAAA"', Context.Empty, {
    source: '"\\uAAA"',
  });
});

describe('Pass', () => {

  pass(`"abc"`, Context.Empty, {
      source: '"abc"',
      expected: {
          "body": [
            {
              "directive": "abc",
             "expression": {
                "type": "Literal",
                "value": "abc",
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
  });
    });

    pass(`"\\б"`, Context.Empty, {
      source: '"\\б"',
      expected: {
          "body": [
            {
              "directive": "\\б",
             "expression": {
                "type": "Literal",
                "value": "б",
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });

    pass(`"\\б"`, Context.Empty, {
      source: '"\\б"',
      expected: {
          "body": [
            {
              "directive": "\\б",
             "expression": {
                "type": "Literal",
                "value": "б",
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });

    pass(`"\\u0435"`, Context.Empty, {
      source: '"\\n\\r\\t\\v\\b\\f"',
      expected: {
          "body": [
            {
              "directive": "\\n\\r\\t\\v\\b\\f",
             "expression": {
                "type": "Literal",
                "value": "\n\r\t\u000b\b\f",
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });

    pass(`"\\u0435"`, Context.Empty, {
      source: '"\\n\\r\\t\\v\\b\\f"',
      expected: {
          "body": [
            {
              "directive": "\\n\\r\\t\\v\\b\\f",
             "expression": {
                "type": "Literal",
                "value": "\n\r\t\u000b\b\f",
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });

    pass(`"Hello\\nworld"`, Context.Empty, {
      source: '"Hello\\nworld"',
      expected:
      {
        "body": [
          {
            "directive": "Hello\\nworld",
            "expression": {
             "type": "Literal",
              "value": "Hello\nworld",
            },
            "type": "ExpressionStatement",
          },
        ],
        "sourceType": "script",
        "type": "Program"
      }
    });

    pass(`"\\u0435"`,  Context.Empty, {
      source: '"\\u0435"',
      expected: {
          "body": [
            {
              "directive": "\\u0435",
             "expression": {
                "type": "Literal",
                value: 'е',
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });

    pass(`"\\u180E"`,  Context.Empty, {
      source: '"\\u180E"',
      expected: {
          "body": [
            {
              "directive": "\\u180E",
             "expression": {
                "type": "Literal",
                value: '᠎',
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });

    pass(`"\\7"`,  Context.Empty, {
      source: '"\\7"',
      expected: {
          "body": [
            {
              "directive": "\\7",
             "expression": {
                "type": "Literal",
                value: '\u0007',
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });

    pass('"Hello\\012World"',  Context.Empty, {
      source: '"Hello\\012World"',
      expected: {
          "body": [
            {
              "directive": "Hello\\012World",
             "expression": {
                "type": "Literal",
                value: 'Hello\nWorld',
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });

    pass('"Hello\\412World"',  Context.OptionsRaw, {
      source: '"Hello\\412World"',
      expected: {
          "body": [
            {
              "directive": "Hello\\412World",
             "expression": {
                "type": "Literal",
                "raw": "\"Hello\\412World\"",
                value: 'Hello!2World',
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });


    pass('"Hello\\1World"',  Context.OptionsRaw, {
      source: '"Hello\\1World"',
      expected: {
          "body": [
            {
              directive: 'Hello\\1World',
             "expression": {
                "type": "Literal",
                "raw": "\"Hello\\1World\"",
                value: 'Hello\u0001World',
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });

    pass(`"\\xff"`, Context.OptionsRaw, {
      source: `"\\xff"`,
      expected: {
          "body": [
            {
              directive: '\\xff',
             "expression": {
                "type": "Literal",
                "raw": "\"\\xff\"",
                value: 'ÿ',
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });

  /*  pass('"\\u{11000}"', Context.OptionsRaw, {
      source: '"\\u{11000}"',
      expected: {
          "body": [
            {
              directive: '\\u{11000}',
             "expression": {
               "type": "Literal",
                value: '𑀀',
              },
              "type": "ExpressionStatement",
            },
          ],
          "sourceType": "script",
         "type": "Program",
        }
    });*/

  });
