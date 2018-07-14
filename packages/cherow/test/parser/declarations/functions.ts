import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Functions', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['function f(){}\n/foo/', 'function f(){}\n/foo/', Context.OptionsRanges | Context.OptionsLoc, {
      "body": [
        {
          "async": false,
          "body": {
            "body": [],
            "end": 14,
            "loc": {
              "end": {
                "column": 14,
                "line": 1,
              },
              "start": {
                "column": 12,
                "line": 1,
              },
            },
            "start": 12,
            "type": "BlockStatement",
          },
          "end": 14,
          "expression": false,
          "generator": false,
          "id": {
            "end": 10,
            "loc": {
              "end": {
                "column": 10,
                "line": 1,
              },
              "start": {
                "column": 9,
                "line": 1,
              }
            },
            "name": "f",
            "start": 9,
            "type": "Identifier",
          },
          "loc": {
            "end": {
              "column": 14,
              "line": 1,
            },
            "start": {
              "column": 0,
              "line": 1,
            }
          },
          "params": [],
          "start": 0,
          "type": "FunctionDeclaration",
        },
       {
          "end": 20,
          "expression": {
            "end": 20,
            "loc": {
              "end": {
                "column": 1,
                "line": 2,
             },
              "start": {
                "column": 0,
                "line": 2,
              }
            },
            "regex": {
              "flags": "",
              "pattern": "foo",
            },
            "start": 15,
            "type": "Literal",
            "value": /foo/,
          },
          "loc": {
            "end": {
              "column": 1,
              "line": 2,
            },
            "start": {
             "column": 0,
              "line": 2,
            }
          },
         "start": 15,
          "type": "ExpressionStatement",
        },
      ],
      "end": 20,
      "loc": {
        "end": {
          "column": 1,
          "line": 2,
        },
        "start": {
          "column": 0,
          "line": 1,
        },
      },
      "sourceType": "script",
      "start": 0,
      "type": "Program",
    }],
  ['function foo(bar) {}', 'function foo(bar) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'Identifier',
                    'name': 'bar',
                    'start': 13,
                    'end': 16,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 13
                        },
                        'end': {
                            'line': 1,
                            'column': 16
                        }
                    }
                }
            ],
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 18,
                'end': 20,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 18
                    },
                    'end': {
                        'line': 1,
                        'column': 20
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 9,
                'end': 12,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 12
                    }
                }
            },
            'start': 0,
            'end': 20,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 20
                }
            }
        }
    ],
    'start': 0,
    'end': 20,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 20
        }
    }
}]
];

pass('Declarations - Functions (pass)', valids);

});
