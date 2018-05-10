import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Export', () => {

  const validSyntax = [
    'export declare interface I {}',
    'export declare type T = number;',
    // 'export declare module M {}',
    'export namespace N {}',
    'export declare namespace N {}',
];

for (const arg of validSyntax) {

    it(`${arg}`, () => {
        t.doesNotThrow(() => {
            parse(`${arg}`, undefined, Context.Strict | Context.Module);
        });
    });
}

pass('export declare interface I {}', Context.Strict | Context.Module, {
  source: 'export declare interface I {}',
  expected: {
      "body": [
        {
          "declaration": {
            "declaration": {
             "body": {
                "body": [],
                "type": "TSInterfaceBody",
              },
              "extends": null,
             "id": {
                "name": "I",
                "type": "Identifier",
              },
              "type": "TSInterfaceDeclaration",
              "typeParameters": null,
            },
            "declare": true,
           "source": null,
            "specifiers": [],
            "type": "ExportNamedDeclaration",
          },
          "source": null,
          "specifiers": [],
          "type": "ExportNamedDeclaration",
        },
      ],
      "sourceType": "module",
      "type": "Program"
    }
});

  pass('export declare class C {}', Context.Strict | Context.Module, {
    source: 'export declare class C {}',
    expected: {
        "body": [
          {
            "declaration": {
              "declaration": {
                "body": {
                  "body": [],
                  "type": "ClassBody"
                },
                "id": {
                  "name": "C",
                  "type": "Identifier",
                 "typeAnnotation": null,
                },
                "superClass": null,
                "type": "ClassDeclaration"
              },
              "declare": true,
              "source": null,
             "specifiers": [],
              "type": "ExportNamedDeclaration"
            },
            "source": null,
            "specifiers": [],
            "type": "ExportNamedDeclaration"
          }
        ],
       "sourceType": "module",
        "type": "Program"
      }
  });

  pass('export declare const x: number;', Context.Strict | Context.Module, {
    source: 'export declare var x: number;',
    expected: {
        "body": [
          {
            "declaration": {
             "declaration": {
                "declarations": [
                 {
                    "id": {
                      "name": "x",
                      "type": "Identifier",
                      "typeAnnotation": {
                       "type": "TypeAnnotation",
                        "typeAnnotation": {
                          "type": "TSNumberKeyword"
                        }
                      }
                    },
                    "init": null,
                    "type": "VariableDeclarator"
                  }
                ],
                "kind": "var",
                "type": "VariableDeclaration",
              },
              "declare": true,
              "source": null,
              "specifiers": [],
              "type": "ExportNamedDeclaration"
            },
            "source": null,
            "specifiers": [],
            "type": "ExportNamedDeclaration"
          }
       ],
        "sourceType": "module",
        "type": "Program"
      }
  });

  pass('export namespace N {}', Context.Strict | Context.Module, {
    source: 'export namespace N {}',
    expected: {
        "body": [
          {
            "declaration": {
              "body": {
                "body": [],
                "type": "TSModuleBlock"
              },
              "id": {
                "name": "N",
               "type": "Identifier"
              },
              "type": "TSModuleDeclaration "
            },
            "source": null,
            "specifiers": [],
            "type": "ExportNamedDeclaration"
          },
        ],
        "sourceType": "module",
        "type": "Program"
      }
  });

  pass('export = f;', Context.Strict | Context.Module, {
    source: 'export = f;',
    expected: {
        "body": [
          {
            "expression": {
              "name": "f",
              "type": "Identifier",
            },
            "type": "TsExportAssignment "
          }
        ],
        "sourceType": "module",
        "type": "Program"
      }
  });

  pass('export as namespace A;', Context.Strict | Context.Module, {
    source: 'export as namespace A;',
    expected: {
        "body": [
          {
            "id": {
              "name": "A",
              "type": "Identifier"
            },
            "type": "TSNamespaceExportDeclaration"
          },
        ],
        "sourceType": "module",
        "type": "Program"
      }
});
});
