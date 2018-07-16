import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - This', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['import("./module.js")', 'import("./module.js")', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Import',
                    'start': 0,
                    'end': 6
                },
                'arguments': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': './module.js',
                        'start': 7,
                        'end': 20
                    }
                ],
                'start': 0,
                'end': 21
            },
            'start': 0,
            'end': 21
        }
    ],
    'start': 0,
    'end': 21
}],
  ['import(x).then()', 'import(x).then()', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'MemberExpression',
                    'object': {
                        'type': 'CallExpression',
                        'callee': {
                            'type': 'Import',
                            'start': 0,
                            'end': 6
                        },
                        'arguments': [
                            {
                                'type': 'Identifier',
                                'name': 'x',
                                'start': 7,
                                'end': 8
                            }
                        ],
                        'start': 0,
                        'end': 9
                    },
                    'computed': false,
                    'property': {
                        'type': 'Identifier',
                        'name': 'then',
                        'start': 10,
                        'end': 14
                    },
                    'start': 0,
                    'end': 14
                },
                'arguments': [],
                'start': 0,
                'end': 16
            },
            'start': 0,
            'end': 16
        }
    ],
    'start': 0,
    'end': 16
}],
  ['x = import(x)', 'x = import(x)', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 0,
                    'end': 1
                },
                'operator': '=',
                'right': {
                    'type': 'CallExpression',
                    'callee': {
                        'type': 'Import',
                        'start': 4,
                        'end': 10
                    },
                    'arguments': [
                        {
                            'type': 'Identifier',
                            'name': 'x',
                            'start': 11,
                            'end': 12
                        }
                    ],
                    'start': 4,
                    'end': 13
                },
                'start': 0,
                'end': 13
            },
            'start': 0,
            'end': 13
        }
    ],
    'start': 0,
    'end': 13
}],
  ['(import(y=x))', '(import(y=x))', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Import',
                    'start': 1,
                    'end': 7
                },
                'arguments': [
                    {
                        'type': 'AssignmentExpression',
                        'left': {
                            'type': 'Identifier',
                            'name': 'y',
                            'start': 8,
                            'end': 9
                        },
                        'operator': '=',
                        'right': {
                            'type': 'Identifier',
                            'name': 'x',
                            'start': 10,
                            'end': 11
                        },
                        'start': 8,
                        'end': 11
                    }
                ],
                'start': 1,
                'end': 12
            },
            'start': 0,
            'end': 13
        }
    ],
    'start': 0,
    'end': 13
}],
  ['import(1)', 'import(1)', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Import',
                    'start': 0,
                    'end': 6
                },
                'arguments': [
                    {
                        'type': 'Literal',
                        raw: null,
                        'value': 1,
                        'start': 7,
                        'end': 8
                    }
                ],
                'start': 0,
                'end': 9
            },
            'start': 0,
            'end': 9
        }
    ],
    'start': 0,
    'end': 9
}],
[`
class C {
  f () {
    import('./page.js');
  }
}
`, `
class C {
  f () {
    import('./page.js');
  }
}
`, Context.OptionsRanges | Context.OptionsNext, {
    "body": [
      {
        "body": {
          "body": [
            {
              "computed": false,
              "end": 48,
              "key": {
                "end": 14,
                "name": "f",
                "start": 13,
                "type": "Identifier"
              },
              "kind": "method",
              "start": 13,
              "static": false,
              "type": "MethodDefinition",
              "value": {
                "async": false,
                "body": {
                  "body": [
                    {
                      "end": 44,
                      "expression": {
                        "arguments": [
                          {
                            "end": 42,
                            "raw": null,
                            "start": 31,
                            "type": "Literal",
                            "value": "./page.js",
                          },
                        ],
                        "callee": {
                          "end": 30,
                          "start": 24,
                          "type": "Import"
                        },
                        "end": 43,
                        "start": 24,
                        "type": "CallExpression",
                      },
                      "start": 24,
                      "type": "ExpressionStatement"
                    }
                 ],
                  "end": 48,
                  "start": 18,
                  "type": "BlockStatement",
                },
                "end": 48,
                "expression": false,
                "generator": false,
                "id": null,
                "params": [],
                "start": 15,
                "type": "FunctionExpression",
              }
            }
          ],
          "end": 50,
          "start": 9,
          "type": "ClassBody",
        },
        "end": 50,
        "id": {
          "end": 8,
          "name": "C",
          "start": 7,
          "type": "Identifier",
        },
        "start": 1,
        "superClass": null,
        "type": "ClassDeclaration"
     }
    ],
    "end": 51,
    "sourceType": "script",
    "start": 0,
    "type": "Program"
  }],
];

pass('Expressions - This (pass)', valids);

});
