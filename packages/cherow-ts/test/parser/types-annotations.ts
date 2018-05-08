import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Types', () => {

    const validSyntax = [
      'var args: any[]',
      'var num: number = 123;',
      'var num: number;',
      'var bool: boolean;',
      'var boolArray: boolean[];',
      'var boolArray: boolean[];',
      'var foo: boolArray = [true, false];',
      'var foo: boolArray[1] = true;',
      'var foo: boolArray = [true, false];',
      'var foo: boolArray = [false, false];',
      'var power: any;',
      'var num: number;',
      'var foo: void',
      'var items: T[]',
      'var command: string[]|string',
      'first: T, second: U',
      'var x = extend({ a: "hello" }, { b: 42 });',
      // 'var nameNumber: [string, number];',
      'let a: any;',
      'let b: boolean;',
      'let ne: never;',
      'let nul: null;',
      'let num: number;',
      'let o: object;',
      'let st: string;',
      'let sy: symbol;',
      'let u: undefined;',
      'let v: void;',
      'let x: -1;',
      'let precedence1: number | string & boolean;',
      'let precedence2: number & string | boolean;',
      'let x: T;',
      'let x: Array<number>;',
      'let x: T[K];',
      'let x: false;',
      'let x: true;',
      //'type T = ({});',
      'let map: { [P in string]: number; };',
      'let map: { readonly [P in string]?: number; };',
      'let x: "foo";',
      'let x: 0;',
      'let union: number | null | undefined;',
      'var numVal:number = otherNumVal;',
      'var numVal:number;',
      'var a: {numVal: number; [indexer: string]: number};',
      'var a: {numVal: number; strVal: string}',
    ];

    for (const arg of validSyntax) {

        it(`${arg}`, () => {
            t.doesNotThrow(() => {
                parse(`${arg}`, undefined, Context.Empty);
            });
        });
    }

    pass('let a: true;', Context.Empty, {
      source: 'let a: true;',
      expected: {
          'body': [
            {
              'declarations': [
                {
                  'id': {
                    'name': 'a',
                    'type': 'Identifier',
                    'typeAnnotation': {
                      'type': 'TypeAnnotation',
                      'typeAnnotation': {
                       'literal': {
                          'type': 'Literal',
                          'value': true,
                        },
                        'type': 'TSLiteralType'
                      },
                   },
                  },
                  'init': null,
                  'type': 'VariableDeclarator',
                },
              ],
              'kind': 'let',
              'type': 'VariableDeclaration',
            },
          ],
          'sourceType': 'script',
          'type': 'Program'
        }
    });

    pass('let a: any;', Context.Empty, {
    source: 'let a: any;',
    expected: {
        'body': [
          {
            'declarations': [
              {
                'id': {
                  'name': 'a',
                  'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'type': 'TSAnyKeyword',
                    },
                  },
                },
                'init': null,
                'type': 'VariableDeclarator',
              },
            ],
            'kind': 'let',
            'type': 'VariableDeclaration',
          },
        ],
        'sourceType': 'script',
        'type': 'Program',
      }
  });

    pass('let intersection: number & string;', Context.Empty, {
    source: 'let intersection: number & string;',
    expected: {
        'body': [
          {
            'declarations': [
             {
                'id': {
                  'name': 'intersection',
                  'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'type': 'TSIntersectionType',
                      'types': [
                        {
                          'type': 'TSNumberKeyword',
                        },
                        {
                          'type': 'TSStringKeyword'
                        }
                      ]
                    }
                  }
                },
                'init': null,
                'type': 'VariableDeclarator'
              },
            ],
            'kind': 'let',
            'type': 'VariableDeclaration',
          },
        ],
        'sourceType': 'script',
        'type': 'Program',
      },
  });

    pass('let x: T;', Context.Empty, {
    source: 'let x: T;',
    expected: {
        'body': [
          {
            'declarations': [
              {
                'id': {
                  'name': 'x',
                  'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'type': 'TSTypeReference',
                      'typeName': {
                        'name': 'T',
                        'type': 'Identifier',
                      },
                      'typeParameters': []
                    },
                  },
                },
                'init': null,
                'type': 'VariableDeclarator',
              },
           ],
            'kind': 'let',
            'type': 'VariableDeclaration',
          },
        ],
        'sourceType': 'script',
        'type': 'Program'
      }
  });

    pass('let arr: number[][];', Context.Empty, {
    source: 'let arr: number[][];',
    expected: {
        'body': [
          {
            'declarations': [
              {
                'id': {
                  'name': 'arr',
                  'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'elementType': {
                        'elementType': {
                          'type': 'TSNumberKeyword',
                        },
                        'type': 'TSArrayType',
                      },
                      'type': 'TSArrayType',
                    }
                  }
                },
                'init': null,
                'type': 'VariableDeclarator',
              }
            ],
            'kind': 'let',
           'type': 'VariableDeclaration',
          },
        ],
        'sourceType': 'script',
        'type': 'Program'
      }
  });

    pass('simple let + identifier', Context.Empty, {
    source: 'let arr',
    expected: {
        'body': [
          {
            'declarations': [
              {
               'id': {
                  'name': 'arr',
                  'type': 'Identifier',
                  typeAnnotation: null,
                },
                'init': null,
                'type': 'VariableDeclarator',
              },
            ],
            'kind': 'let',
            'type': 'VariableDeclaration',
          },
        ],
        'sourceType': 'script',
        'type': 'Program',
      }
  });

    pass('var a: {numVal: number; strVal: string}', Context.Empty, {
    source: 'var a: {numVal: number; strVal: string}',
    expected: {
        'body': [
          {
            'declarations': [
              {
                'id': {
                  'name': 'a',
                  'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'members': [
                        {
                          'readonly': false,
                          'type': 'TSPropertySignature',
                          'typeAnnotation': {
                            'type': 'TypeAnnotation',
                            'typeAnnotation': {
                              'type': 'TSNumberKeyword',
                            }
                          }
                        },
                        {
                          'readonly': false,
                          'type': 'TSPropertySignature',
                          'typeAnnotation': {
                            'type': 'TypeAnnotation',
                            'typeAnnotation': {
                              'type': 'TSStringKeyword',
                            }
                          }
                        }
                      ],
                      'type': 'TSTypeLiteral',
                    }
                  }
                },
                'init': null,
                'type': 'VariableDeclarator'
              }
            ],
            'kind': 'var',
            'type': 'VariableDeclaration'
          }
        ],
        'sourceType': 'script',
        'type': 'Program'
      }
  });

    pass('let f: <T>(a: T) => T;', Context.Empty, {
    source: 'let f: <T>(a: T) => T;',
    expected: {
        'body': [
          {
            'declarations': [
              {
                'id': {
                  'name': 'f',
                  'type': 'Identifier',
                  'typeAnnotation': {
                    'type': 'TypeAnnotation',
                    'typeAnnotation': {
                      'parameters': [
                        {
                          'name': 'a',
                          'type': 'Identifier',
                          'typeAnnotation': {
                            'type': 'TypeAnnotation',
                            'typeAnnotation': {
                              'type': 'TSTypeReference',
                              'typeName': {
                                'name': 'T',
                                'type': 'Identifier',
                              },
                              'typeParameters': [],
                            }
                          }
                        }
                      ],
                      'type': 'TSFunctionType',
                      'typeAnnotation': {
                        'type': 'TypeAnnotation',
                        'typeAnnotation': {
                          'type': 'TSTypeReference',
                          'typeName': {
                            'name': 'T',
                            'type': 'Identifier',
                          },
                          'typeParameters': [],
                        },
                      },
                     'typeParameters': {
                        'params': [
                          {
                            'constraint': null,
                            'default': null,
                            'name': 'T',
                            'type': 'TSTypeParameter',
                          },
                        ],
                        'type': 'TSTypeParameterDeclaration'
                      }
                    }
                  }
                },
                'init': null,
                'type': 'VariableDeclarator'
              }
            ],
            'kind': 'let',
            'type': 'VariableDeclaration'
          },
        ],
        'sourceType': 'script',
        'type': 'Program'
      }
  });

  pass('let f: <T>(a: T, b: T, c: T) => T;', Context.Empty, {
    source: 'let f: <T>(a: T, b: T, c: T) => T;',
    expected: {
        'body': [{
            'declarations': [{
                'id': {
                    'name': 'f',
                    'type': 'Identifier',
                    'typeAnnotation': {
                        'type': 'TypeAnnotation',
                        'typeAnnotation': {
                            'parameters': [{
                                    'name': 'a',
                                    'type': 'Identifier',
                                    'typeAnnotation': {
                                        'type': 'TypeAnnotation',
                                        'typeAnnotation': {
                                            'type': 'TSTypeReference',
                                            'typeName': {
                                                'name': 'T',
                                                'type': 'Identifier',
                                            },
                                            'typeParameters': [],
                                        }
                                    }
                                },
                                {
                                    "name": "b",
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
                                },
                                {
                                    "name": "c",
                                    "type": "Identifier",
                                    "typeAnnotation": {
                                        "type": "TypeAnnotation",
                                        "typeAnnotation": {
                                            "type": "TSTypeReference",
                                            "typeName": {
                                                "name": "T",
                                                "type": "Identifier",
                                            },
                                            "typeParameters": []
                                        }
                                    }
                                }
                            ],
                            'type': 'TSFunctionType',
                            'typeAnnotation': {
                                'type': 'TypeAnnotation',
                                'typeAnnotation': {
                                    'type': 'TSTypeReference',
                                    'typeName': {
                                        'name': 'T',
                                        'type': 'Identifier',
                                    },
                                    'typeParameters': [],
                                },
                            },
                            'typeParameters': {
                                'params': [{
                                    'constraint': null,
                                    'default': null,
                                    'name': 'T',
                                    'type': 'TSTypeParameter',
                                }, ],
                                'type': 'TSTypeParameterDeclaration'
                            }
                        }
                    }
                },
                'init': null,
                'type': 'VariableDeclarator'
            }],
            'kind': 'let',
            'type': 'VariableDeclaration'
        }, ],
        'sourceType': 'script',
        'type': 'Program'
    }
});

pass('let x: Array<() => void>;', Context.Empty, {
  source: 'let x: Array<() => void>;',
  expected: {
      "body": [
        {
          "declarations": [
            {
              "id": {
                "name": "x",
                "type": "Identifier",
                "typeAnnotation": {
                  "type": "TypeAnnotation",
                  "typeAnnotation": {
                    "type": "TSTypeReference",
                    "typeName": {
                      "name": "Array",
                      "type": "Identifier",
                    },
                    "typeParameters": {
                      "params": [
                        {
                          "parameters": [],
                          "type": "TSFunctionType",
                          "typeAnnotation": {
                            "type": "TypeAnnotation",
                            "typeAnnotation": {
                              "type": "TSVoidKeyword",
                            },
                          },
                          "typeParameters": []
                        }
                      ],
                      "type": "TypeParameterInstantiation"
                    }
                  }
                }
              },
              "init": null,
              "type": "VariableDeclarator"
            }
          ],
          "kind": "let",
          "type": "VariableDeclaration"
        }
     ],
      "sourceType": "script",
      "type": "Program"
    }
});

pass('let f: (this: number) => void;', Context.Empty, {
  source: 'let f: (a: number, /*b?: number,*/ ...c: number[]) => void;',
  expected: {
      "body": [
        {
          "declarations": [
            {
              "id": {
               "name": "f",
                "type": "Identifier",
                "typeAnnotation": {
                  "type": "TypeAnnotation",
                  "typeAnnotation": {
                    "parameters": [
                      {
                        "name": "a",
                        "type": "Identifier",
                        "typeAnnotation": {
                          "type": "TypeAnnotation",
                          "typeAnnotation": {
                            "type": "TSNumberKeyword",
                          }
                        }
                      },
                     {
                        "argument": {
                          "name": "c",
                          "type": "Identifier",
                          "typeAnnotation": {
                            "type": "TypeAnnotation",
                            "typeAnnotation": {
                             "elementType": {
                                "type": "TSNumberKeyword",
                              },
                              "type": "TSArrayType",
                            }
                          }
                        },
                        "type": "RestElement"
                      }
                    ],
                    "type": "TSFunctionType",
                    "typeAnnotation": {
                      "type": "TypeAnnotation",
                      "typeAnnotation": {
                        "type": "TSVoidKeyword",
                      }
                    },
                    "typeParameters": []
                  }
                }
             },
              "init": null,
              "type": "VariableDeclarator",
            },
          ],
          "kind": "let",
          "type": "VariableDeclaration",
        },
      ],
      "sourceType": "script",
      "type": "Program"
    }
});

});
