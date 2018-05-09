import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Interface', () => {

  const validSyntax = [
    'interface I { new (x: number): void; }',
      //'interface I<T extends object = { x: number }> {}',
      'interface I { [s: string]: number; }',
  ];

  for (const arg of validSyntax) {

      it(`${arg}`, () => {
          t.doesNotThrow(() => {
              parse(`${arg}`, undefined, Context.Empty);
          });
      });
  }

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
