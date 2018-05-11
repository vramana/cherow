import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Export', () => {

  describe('Failure', () => {
      const inValidSyntax = [
          'export = B: any;',
      ]

      for (const arg of inValidSyntax) {

          it(`${arg}`, () => {
              t.throws(() => {
                  parse(`${arg}`, undefined, Context.Strict | Context.Module);
              });
          });
      }
  });
  describe('Pass', () => {

      const validSyntax = [
          'export = B;',
          'export declare interface I {}',
          'export declare type T = number;',
          'export declare module M {}',
          'export declare namespace N {}',
          'export type T = number;',
          'export enum E {}',
          'export interface D {}',
          'export module E {}',
          //'export abstract class A {}',
          'export namespace F {}',
          'export type G = typeof foo;',
          'export interface I {}',
      ];

      for (const arg of validSyntax) {

          it(`${arg}`, () => {
              t.doesNotThrow(() => {
                  parse(`${arg}`, undefined, Context.Strict | Context.Module);
              });
          });
      }


      pass(`namespace Bar {
export interface I {
    a: string;
    b: number;
}
}`, Context.Strict | Context.Module, {
          source: `namespace Bar {
  export interface I {
      a: string;
      b: number;
  }
}`,
          expected: {
              "body": [{
                  "body": {
                      "body": [{
                          "declaration": {
                              "declaration": {
                                  "body": {
                                      "body": [{
                                              "computed": false,
                                              "key": {
                                                  "name": "a",
                                                  "type": "Identifier",
                                              },
                                              "type": "TSPropertySignature",
                                              "typeAnnotation": {
                                                  "type": "TypeAnnotation",
                                                  "typeAnnotation": {
                                                      "type": "TSStringKeyword"
                                                  }
                                              }
                                          },
                                          {
                                              "computed": false,
                                              "key": {
                                                  "name": "b",
                                                  "type": "Identifier",
                                              },
                                              "type": "TSPropertySignature",
                                              "typeAnnotation": {
                                                  "type": "TypeAnnotation",
                                                  "typeAnnotation": {
                                                      "type": "TSNumberKeyword",
                                                  }
                                              }
                                          }
                                      ],
                                      "type": "TSInterfaceBody",
                                  },
                                  "extends": null,
                                  "id": {
                                      "name": "I",
                                      "type": "Identifier"
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
                          "type": "ExportNamedDeclaration"
                      }],
                      "type": "TSModuleBlock",
                  },
                  "id": {
                      "name": "Bar",
                      "type": "Identifier",
                  },
                  "type": "TSModuleDeclaration ",
              }, ],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('export type T = number;', Context.Strict | Context.Module, {
          source: 'export type T = number;',
          expected: {
              "body": [{
                  "declaration": {
                      "id": {
                          "name": "T",
                          "type": "Identifier",
                      },
                      "type": "TSTypeAliasDeclaration",
                      "typeAnnotation": {
                          "type": "TSNumberKeyword",
                      },
                      "typeParameters": null,
                  },
                  "source": null,
                  "specifiers": [],
                  "type": "ExportNamedDeclaration"
              }],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('export declare module M {}', Context.Strict | Context.Module, {
          source: 'export declare module M {}',
          expected: {
              "body": [{
                  "declaration": {
                      "declaration": {
                          "body": {
                              "body": [],
                              "type": "TSModuleBlock"
                          },
                          "id": {
                              "name": "M",
                              "type": "Identifier",
                          },
                          "type": "TSModuleDeclaration ",
                      },
                      "declare": true,
                      "source": null,
                      "specifiers": [],
                      "type": "ExportNamedDeclaration",
                  },
                  "source": null,
                  "specifiers": [],
                  "type": "ExportNamedDeclaration"
              }],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('export declare namespace N {}', Context.Strict | Context.Module, {
          source: 'export declare namespace N {}',
          expected: {
              "body": [{
                  "declaration": {
                      "declaration": {
                          "body": {
                              "body": [],
                              "type": "TSModuleBlock",
                          },
                          "id": {
                              "name": "N",
                              "type": "Identifier",
                          },
                          "type": "TSModuleDeclaration ",
                      },
                      "declare": true,
                      "source": null,
                      "specifiers": [],
                      "type": "ExportNamedDeclaration",
                  },
                  "source": null,
                  "specifiers": [],
                  "type": "ExportNamedDeclaration"
              }],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('export declare interface I {}', Context.Strict | Context.Module, {
          source: 'export declare interface I {}',
          expected: {
              "body": [{
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
              }, ],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('export declare class C {}', Context.Strict | Context.Module, {
          source: 'export declare class C {}',
          expected: {
              "body": [{
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
              }],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('export declare const x: number;', Context.Strict | Context.Module, {
          source: 'export declare var x: number;',
          expected: {
              "body": [{
                  "declaration": {
                      "declaration": {
                          "declarations": [{
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
                          }],
                          "kind": "var",
                          "declared": true,
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
              }],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('export namespace N {}', Context.Strict | Context.Module, {
          source: 'export namespace N {}',
          expected: {
              "body": [{
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
              }, ],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('export = f;', Context.Strict | Context.Module, {
          source: 'export = f;',
          expected: {
              "body": [{
                  "expression": {
                      "name": "f",
                      "type": "Identifier",
                  },
                  "type": "TsExportAssignment "
              }],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('export as namespace A;', Context.Strict | Context.Module, {
          source: 'export as namespace A;',
          expected: {
              "body": [{
                  "id": {
                      "name": "A",
                      "type": "Identifier"
                  },
                  "type": "TSNamespaceExportDeclaration"
              }, ],
              "sourceType": "module",
              "type": "Program"
          }
      });
  });
});
