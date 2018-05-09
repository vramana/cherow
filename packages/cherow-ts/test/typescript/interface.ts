import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Interface', () => {

  const validSyntax = [
    'interface I { new (x: number): void; }',
      //'interface I<T extends object = { x: number }> {}',
      'interface I { [s: string]: number; }',
      'interface I extends X.Y<Z> {}',
      //'interface I { x; y: number; z?: number; }',
      'interface I { y: number; z?: number; }',
      'interface I { catch(): void; }'
  ];

  for (const arg of validSyntax) {

      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parse(`${arg}`, undefined, Context.Empty);
          });
      });
  }

  pass('interface I { catch(): void; }', Context.Empty, {
    source: 'interface I { catch(): void; }',
    expected: {
        "body": [
          {
            "body": {
              "body": [
                {
                 "computed": false,
                 "key": {
                    "name": "catch",
                    "type": "Identifier",
                  },
                  "parameters": [],
                  "readonly": false,
                  "type": "TSMethodSignature",
                  "typeAnnotation": {
                    "type": "TypeAnnotation",
                    "typeAnnotation": {
                      "type": "TSVoidKeyword",
                    }
                  }
                }
              ],
              "type": "TSInterfaceBody",
            },
            "extends": null,
            "id": {
              "name": "I",
              "type": "Identifier",
            },
            "type": "TSInterfaceDeclaration",
            "typeParameters": null,
          }
        ],
        "sourceType": "script",
        "type": "Program"
      }
  });

  pass('interface I extends X.Y<Z> {}', Context.Empty, {
    source: 'interface I extends X.Y<Z> {}',
    expected: {
        "body": [
          {
            "body": {
              "body": [],
              "type": "TSInterfaceBody",
            },
            "extends": [
              {
                "expression": {
                  "left": {
                   "name": "X",
                    "type": "Identifier",
                  },
                  "right": {
                    "name": "Y",
                    "type": "Identifier",
                  },
                  "type": "TSQualifiedName",
                },
                "type": "TSExpressionWithTypeArguments",
               "typeParameters": {
                  "params": [
                    {
                      "type": "TSTypeReference",
                      "typeName": {
                        "name": "Z",
                        "type": "Identifier"
                      },
                      "typeParameters": [],
                    },
                  ],
                  "type": "TypeParameterInstantiation"
                }
              }
            ],
            "id": {
              "name": "I",
              "type": "Identifier",
            },
            "type": "TSInterfaceDeclaration",
            "typeParameters": null,
          }
        ],
        "sourceType": "script",
        "type": "Program"
      }
  });

  pass('interface I { new (x: number): void; }', Context.Empty, {
  source: 'interface I { new (x: number): void; }',
  expected: {
      "body": [
        {
          "body": {
           "body": [
              {
                "parameters": [
                  {
                    "name": "x",
                    "type": "Identifier",
                    "typeAnnotation": {
                      "type": "TypeAnnotation",
                      "typeAnnotation": {
                        "type": "TSNumberKeyword",
                      }
                    }
                  }
                ],
                "type": "TSConstructSignatureDeclaration",
                "typeAnnotation": {
                                "type": "TypeAnnotation",
                                "typeAnnotation": {
                                  "type": "TSVoidKeyword"
                                }
                              }
              }
            ],
            "type": "TSInterfaceBody"
          },
          "extends": null,
          "id": {
            "name": "I",
            "type": "Identifier",
          },
          "type": "TSInterfaceDeclaration",
          "typeParameters": null,
        }
      ],
      "sourceType": "script",
      "type": "Program"
    }
});

pass('interface I { (x: number): void; }', Context.Empty, {
  source: 'interface I { (x: number): void; }',
  expected: {
      "body": [
        {
          "body": {
            "body": [
              {
                "parameters": [
                  {
                    "name": "x",
                    "type": "Identifier",
                    "typeAnnotation": {
                      "type": "TypeAnnotation",
                      "typeAnnotation": {
                        "type": "TSNumberKeyword",
                      }
                   }
                  }
                ],
                "type": "TSConstructSignatureDeclaration",
                "typeAnnotation": {
                  "type": "TypeAnnotation",
                  "typeAnnotation": {
                    "type": "TSVoidKeyword",
                  }
                }
              }
            ],
           "type": "TSInterfaceBody",
          },
          "extends": null,
          "id": {
            "name": "I",
            "type": "Identifier",
          },
          "type": "TSInterfaceDeclaration",
          "typeParameters": null,
        }
      ],
      "sourceType": "script",
      "type": "Program"
    }
});
});
