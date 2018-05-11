import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Type alias', () => {

  const validSyntax = [
      'type:foo', // type as identifier - valid JS syntax
      'type T = number;',
      'function f<  T    >() {}',
      'type T<U extends object = { x: number }> = Array<U>;',
    //  'export type T = number;',
      'type T<U> = U;',
    //  'declare type T = number;'
  ];

  for (const arg of validSyntax) {

      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parse(`${arg}`, undefined, Context.Empty);
          });
      });
  }

  pass('type T = number;', Context.Empty, {
    source: 'type T = number;',
    expected: {
        'body': [
          {
            'id': {
              'name': 'T',
              'type': 'Identifier',
              "typeAnnotation": null
            },
            'type': 'TSTypeAliasDeclaration',
            'typeAnnotation': {
              'type': 'TSNumberKeyword',
           },
            'typeParameters': null,
          },
        ],
        'sourceType': 'script',
        'type': 'Program'
      }
});

  pass('type T<U> = U;', Context.Empty, {
  source: 'type T<U> = U;',
  expected: {
      'body': [
        {
          'id': {
            'name': 'T',
            'type': 'Identifier',
            "typeAnnotation": null
          },
          'type': 'TSTypeAliasDeclaration',
          'typeAnnotation': {
            'type': 'TSTypeReference',
            'typeName': {
              'name': 'U',
              'type': 'Identifier',
              "typeAnnotation": null
            },
            'typeParameters': [],
          },
          'typeParameters': {
            'params': [
              {
                'constraint': null,
                'default': null,
                'name': 'U',
                'type': 'TSTypeParameter',
              },
            ],
            'type': 'TSTypeParameterDeclaration',
          }
        }
      ],
      'sourceType': 'script',
      'type': 'Program'
    }
});

  pass('type T<U extends object = { x: number }> = Array<U>;', Context.Empty, {
  source: 'type T<U extends object = { x: number }> = Array<U>;',
  expected: {
      "body": [
        {
         "id": {
            "name": "T",
            "type": "Identifier",
            "typeAnnotation": null
          },
          "type": "TSTypeAliasDeclaration",
          "typeAnnotation": {
            "type": "TSTypeReference",
            "typeName": {
              "name": "Array",
              "type": "Identifier",
              "typeAnnotation": null
            },
            "typeParameters": {
             "params": [
                {
                  "type": "TSTypeReference",
                  "typeName": {
                    "name": "U",
                    "type": "Identifier",
                    "typeAnnotation": null
                  },
                  "typeParameters": [],
                }
              ],
              "type": "TypeParameterInstantiation"
            }
          },
          "typeParameters": {
            "params": [
              {
                "constraint": {
                  "type": "TSObjectKeyword"
                },
                "default": {
                  "members": [
                    {
                      "computed": false,
                      "key": {
                        "name": "x",
                        "type": "Identifier",
                      },
                      "type": "TSPropertySignature",
                      "typeAnnotation": {
                        "type": "TypeAnnotation",
                        "typeAnnotation": {
                          "type": "TSNumberKeyword"
                        }
                      }
                    }
                  ],
                  "type": "TSTypeLiteral"
                },
                "name": "U",
                "type": "TSTypeParameter"
              }
            ],
            "type": "TSTypeParameterDeclaration"
          }
        }
      ],
      "sourceType": "script",
      "type": "Program"
    }
});

});
