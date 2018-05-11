import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Functions', () => {

  describe('Failue', () => {
      const inValidSyntax = [
          'function f([]?, {}) {}',
      ];

      for (const arg of inValidSyntax) {

          it(`${arg}`, () => {
              t.throws(() => {
                  parse(`${arg}`, undefined, Context.Empty);
              });
          });
      }
  });

  describe('Pass', () => {
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

      pass('function f(a?, {}) {}', Context.Strict | Context.Module, {
          source: 'function f(a?, {}) {}',
          expected: {
              "body": [{
                  "async": false,
                  "body": {
                      "body": [],
                      "type": "BlockStatement",
                  },
                  "declared": false,
                  "expression": false,
                  "generator": false,
                  "id": {
                      "name": "f",
                      "optional": false,
                      "type": "Identifier",
                      "typeAnnotation": null,
                  },
                  "params": [{
                          "name": "a",
                          "optional": true,
                          "type": "Identifier",
                          "typeAnnotation": null,
                      },
                      {
                          "properties": [],
                          "type": "ObjectPattern"
                      }
                  ],
                  "returnType": null,
                  "type": "FunctionDeclaration",
                  "typeParameters": null,
              }, ],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('export function f(x: string): string;', Context.Strict | Context.Module, {
          source: 'export function f(x: string): string;',
          expected: {
              "body": [{
                  "declaration": {
                      "async": false,
                      "body": null,
                      "declared": false,
                      "expression": false,
                      "generator": false,
                      "id": {
                          "name": "f",
                          "optional": false,
                          "type": "Identifier",
                          "typeAnnotation": null,
                      },
                      "params": [{
                          "name": "x",
                          "optional": false,
                          "type": "Identifier",
                          "typeAnnotation": {
                              "type": "TypeAnnotation",
                              "typeAnnotation": {
                                  "type": "TSStringKeyword",
                              },
                          },
                      }, ],
                      "returnType": {
                          "type": "TypeAnnotation",
                          "typeAnnotation": {
                              "type": "TSStringKeyword"
                          },
                      },
                      "type": "FunctionDeclaration",
                      "typeParameters": null,
                  },
                  "source": null,
                  "specifiers": [],
                  "type": "ExportNamedDeclaration"
              }, ],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('export function f(x: number): number', Context.Strict | Context.Module, {
          source: 'export function f(x: number): number',
          expected: {
              "body": [{
                  "declaration": {
                      "async": false,
                      "body": null,
                      "declared": false,
                      "expression": false,
                      "generator": false,
                      "id": {
                          "name": "f",
                          "optional": false,
                          "type": "Identifier",
                          "typeAnnotation": null,
                      },
                      "params": [{
                          "name": "x",
                          "optional": false,
                          "type": "Identifier",
                          "typeAnnotation": {
                              "type": "TypeAnnotation",
                              "typeAnnotation": {
                                  "type": "TSNumberKeyword",
                              }
                          }
                      }],
                      "returnType": {
                          "type": "TypeAnnotation",
                          "typeAnnotation": {
                              "type": "TSNumberKeyword"
                          }
                      },
                      "type": "FunctionDeclaration",
                      "typeParameters": null,
                  },
                  "source": null,
                  "specifiers": [],
                  "type": "ExportNamedDeclaration",
              }, ],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('function f(x: any): x is boolean {}', Context.Empty, {
          source: 'function f(x: any): x is boolean {}',
          expected: {
              'body': [{
                  'async': false,
                  'body': {
                      'body': [],
                      'type': 'BlockStatement'
                  },
                  'expression': false,
                  'generator': false,
                  "declared": false,
                  'id': {
                      'name': 'f',
                      "optional": false,
                      'type': 'Identifier',
                      'typeAnnotation': null,
                  },
                  'params': [{
                      'name': 'x',
                      "optional": false,
                      'type': 'Identifier',
                      'typeAnnotation': {
                          'type': 'TypeAnnotation',
                          'typeAnnotation': {
                              'type': 'TSAnyKeyword'
                          }
                      }
                  }],
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
              }],
              'sourceType': 'script',
              'type': 'Program',
          }
      });


      pass('const f = function<T>(x?: T): T {};', Context.Empty, {
          source: 'const f = function<T>(x?: T): T {};',
          expected: {
              "body": [{
                  "declarations": [{
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
                          "params": [{
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
                          }],
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
                              "params": [{
                                  "constraint": null,
                                  "default": null,
                                  "name": "T",
                                  "type": "TSTypeParameter",
                              }, ],
                              "type": "TSTypeParameterDeclaration",
                          },
                      },
                      "type": "VariableDeclarator",
                  }, ],
                  "declared": false,
                  "kind": "const",
                  "type": "VariableDeclaration",
              }, ],
              "sourceType": "script",
              "type": "Program"
          }
      });

      pass('function f(x?: string) {}', Context.Empty, {
          source: 'function f(x?: string) {}',
          expected: {
              "body": [{
                  "async": false,
                  "body": {
                      "body": [],
                      "type": "BlockStatement"
                  },
                  "expression": false,
                  "generator": false,
                  "declared": false,
                  "id": {
                      "name": "f",
                      "optional": false,
                      "type": "Identifier",
                      "typeAnnotation": null,
                  },
                  "params": [{
                      "name": "x",
                      "optional": true,
                      "type": "Identifier",
                      "typeAnnotation": {
                          "type": "TypeAnnotation",
                          "typeAnnotation": {
                              "type": "TSStringKeyword"
                          }
                      }
                  }],
                  "returnType": null,
                  "type": "FunctionDeclaration",
                  "typeParameters": null,
              }],
              "sourceType": "script",
              "type": "Program"
          }
      });

      pass('function f<T>(x?: T): T {}', Context.Empty, {
          source: 'function f<T>(x?: T): T {}',
          expected: {
              "body": [{
                  "async": false,
                  "body": {
                      "body": [],
                      "type": "BlockStatement"
                  },
                  "expression": false,
                  "generator": false,
                  "declared": false,
                  "id": {
                      "name": "f",
                      "optional": false,
                      "type": "Identifier",
                      "typeAnnotation": null,
                  },
                  "params": [{
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
                  }],
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
                      "params": [{
                          "constraint": null,
                          "default": null,
                          "name": "T",
                          "type": "TSTypeParameter",
                      }, ],
                      "type": "TSTypeParameterDeclaration",
                  }
              }],
              "sourceType": "script",
              "type": "Program"
          }
      });

      pass('export default function(x?: number): void;', Context.Strict | Context.Module, {
          source: 'export default function(x?: number): void;',
          expected: {
              "body": [{
                  "declaration": {
                      "async": false,
                      "body": null,
                      "declared": false,
                      "expression": false,
                      "generator": false,
                      "id": null,
                      "params": [{
                          "name": "x",
                          "optional": true,
                          "type": "Identifier",
                          "typeAnnotation": {
                              "type": "TypeAnnotation",
                              "typeAnnotation": {
                                  "type": "TSNumberKeyword",
                              }
                          }
                      }],
                      "returnType": {
                          "type": "TypeAnnotation",
                          "typeAnnotation": {
                              "type": "TSVoidKeyword",
                          },
                      },
                      "type": "FunctionDeclaration",
                      "typeParameters": null,
                  },
                  "type": "ExportDefaultDeclaration"
              }, ],
              "sourceType": "module",
              "type": "Program"
          }
      });

      pass('declare function f<T>(): T;', Context.Empty, {
          source: 'declare function f<T>(): T;',
          expected: {
              "body": [{
                  "async": false,
                  "body": null,
                  "declared": true,
                  "expression": false,
                  "generator": false,
                  "id": {
                      "name": "f",
                      "optional": false,
                      "type": "Identifier",
                      "typeAnnotation": null,
                  },
                  "params": [],
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
                  "type": "DeclareFunction",
                  "typeParameters": {
                      "params": [{
                          "constraint": null,
                          "default": null,
                          "name": "T",
                          "type": "TSTypeParameter"
                      }],
                      "type": "TSTypeParameterDeclaration",
                  }
              }],
              "sourceType": "script",
              "type": "Program"
          }
      });

      pass('declare function f(): void;', Context.Empty, {
          source: 'declare function f(): void;',
          expected: {
              "body": [{
                  "async": false,
                  "body": null,
                  "expression": false,
                  "declared": true,
                  "generator": false,
                  "id": {
                      "name": "f",
                      "optional": false,
                      "type": "Identifier",
                      "typeAnnotation": null,
                  },
                  "params": [],
                  "returnType": {
                      "type": "TypeAnnotation",
                      "typeAnnotation": {
                          "type": "TSVoidKeyword",
                      }
                  },
                  "type": "DeclareFunction",
                  "typeParameters": null,
              }],
              "sourceType": "script",
              "type": "Program"
          }
      });
  });
});
