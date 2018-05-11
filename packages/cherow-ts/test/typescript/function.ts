import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Functions', () => {

  const validSyntax = [
      'function f(x: any): x is boolean {}',
      '(function(x: any): x is boolean {})',
  ];

  for (const arg of validSyntax) {

      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parse(`${arg}`, undefined, Context.Empty);
          });
      });
  }

  pass('function f(x: any): x is boolean {}', Context.Empty, {
  source: 'function f(x: any): x is boolean {}',
  expected: {
      'body': [
        {
          'async': false,
          'body': {
            'body': [],
            'type': 'BlockStatement'
          },
          'expression': false,
          'generator': false,
          'id': {
            'name': 'f',
            "optional": false,
            'type': 'Identifier',
            'typeAnnotation': null,
          },
          'params': [
           {
              'name': 'x',
              "optional": false,
              'type': 'Identifier',
              'typeAnnotation': {
                'type': 'TypeAnnotation',
                'typeAnnotation': {
                  'type': 'TSAnyKeyword'
                }
              }
            }
          ],
          'returnType': {
            'parameterName': {
              'name': 'x',
              'type': 'Identifier',
            },
            'type': 'TSTypePredicate',
            'typeAnnotation': {
              'type': 'TypeAnnotation',
              'typeAnnotation': {
                'type': 'TSBooleanKeyword',
              }
            }
         },
          'type': 'FunctionDeclaration',
          'typeParameters': null,
        }
      ],
      'sourceType': 'script',
      'type': 'Program',
    }
});


pass('const f = function<T>(x?: T): T {};', Context.Empty, {
  source: 'const f = function<T>(x?: T): T {};',
  expected: {
      "body": [
        {
          "declarations": [
            {
              "id": {
                "name": "f",
                "optional": false,
               "type": "Identifier",
                "typeAnnotation": null,
              },
              "init": {
                "async": false,
                "body": {
                  "body": [],
                  "type": "BlockStatement"
               },
                "expression": false,
                "generator": false,
               "id": null,
                "params": [
                  {
                    "name": "x",
                    "optional": true,
                    "type": "Identifier",
                    "typeAnnotation": {
                     "type": "TypeAnnotation",
                      "typeAnnotation": {
                        "type": "TSTypeReference",
                        "typeName": {
                          "name": "T",
                          "type": "Identifier",
                        },
                        "typeParameters": [],
                      }
                    }
                  }
                ],
                "returnType": {
                 "type": "TypeAnnotation",
                  "typeAnnotation": {
                    "type": "TSTypeReference",
                    "typeName": {
                      "name": "T",
                      "type": "Identifier",
                    },
                    "typeParameters": [],
                  }
                },
                "type": "FunctionExpression",
                "typeParameters": {
                  "params": [
                   {
                      "constraint": null,
                      "default": null,
                      "name": "T",
                      "type": "TSTypeParameter",
                    },
                  ],
                  "type": "TSTypeParameterDeclaration",
                },
              },
              "type": "VariableDeclarator",
            },
          ],
          "declared": false,
         "kind": "const",
          "type": "VariableDeclaration",
        },
      ],
      "sourceType": "script",
      "type": "Program"
    }
});

pass('function f(x?: string) {}', Context.Empty, {
  source: 'function f(x?: string) {}',
  expected: {
      "body": [
        {
         "async": false,
          "body": {
           "body": [],
            "type": "BlockStatement"
          },
          "expression": false,
          "generator": false,
          "id": {
            "name": "f",
            "optional": false,
            "type": "Identifier",
            "typeAnnotation": null,
         },
          "params": [
            {
              "name": "x",
              "optional": true,
              "type": "Identifier",
              "typeAnnotation": {
                "type": "TypeAnnotation",
                "typeAnnotation": {
                  "type": "TSStringKeyword"
                }
              }
            }
          ],
          "returnType": null,
          "type": "FunctionDeclaration",
          "typeParameters": null,
       }
      ],
      "sourceType": "script",
      "type": "Program"
    }
});

pass('function f<T>(x?: T): T {}', Context.Empty, {
source: 'function f<T>(x?: T): T {}',
expected: {
    "body": [
      {
        "async": false,
        "body": {
          "body": [],
         "type": "BlockStatement"
        },
        "expression": false,
        "generator": false,
        "id": {
          "name": "f",
          "optional": false,
          "type": "Identifier",
          "typeAnnotation": null,
       },
        "params": [
          {
            "name": "x",
            "optional": true,
            "type": "Identifier",
            "typeAnnotation": {
              "type": "TypeAnnotation",
              "typeAnnotation": {
                "type": "TSTypeReference",
                "typeName": {
                  "name": "T",
                  "type": "Identifier",
                },
                "typeParameters": [],
              }
            }
         }
        ],
        "returnType": {
          "type": "TypeAnnotation",
          "typeAnnotation": {
            "type": "TSTypeReference",
            "typeName": {
              "name": "T",
              "type": "Identifier"
           },
            "typeParameters": []
          }
        },
        "type": "FunctionDeclaration",
        "typeParameters": {
          "params": [
            {
              "constraint": null,
              "default": null,
              "name": "T",
              "type": "TSTypeParameter",
            },
          ],
          "type": "TSTypeParameterDeclaration",
        }
      }
    ],
    "sourceType": "script",
    "type": "Program"
  }
});
});
