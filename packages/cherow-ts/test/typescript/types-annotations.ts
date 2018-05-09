import { pass } from '../test-utils';
import { Context } from 'cherow';
import * as t from 'assert';
import { parse } from '../../src/parser/parser';

describe('Types', () => {

  const validSyntax = [
      'function extend<T, U>(first: T, second: U): T & U { }',
      //      'const f: <T extends {+readonly [K in keyof T]-? : T[Exclude<null, K>] extends infer Function ? keyof K & T | Extract<never, typeof f> : ReturnType<typeof f>}>() => InstanceType<typeof Object>;',
      'let arr: number[][];',
      'let x: 0;',
      'let x: keyof T;',
      'let x: typeof y.z;',
      'let obj: { x: number };',
      'let x: T;',
      'let y: unique symbol;',
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
      'var nameNumber: [string, number];',
      'let a: any;',
      'let b: boolean;',
      'let ne: never;',
      'let nul: null;',
      'let num: number;',
      'let o: object;',
      'let st: string;',
      'let foo: symbol;',
      'let u: undefined;',
      'let v: void;',
      'let x: -1;',
      'let x: T[K];',
      'let precedence1: number | string & boolean;',
      'let precedence2: number & string | boolean;',
      'let x: T;',
      'let x: Array<number>;',
      'let x: T[K];',
      'let x: false;',
      'let x: true;',
      'let map: { [P in string]: number; };',
      'let map: { readonly [P in string]?: number; };',
      'let x: "foo";',
      'let x: 0;',
      'let union: number | null | undefined;',
      'var numVal:number = otherNumVal;',
      'var numVal:number;',
      'var a: {numVal: number; [indexer: string]: number};',
      'var a: {numVal: number; strVal: string}',
      'var a: {subObj: {strVal: string}}',
      'var a: {param1: number; param2: string}',
      'var a: {param1: number; param2?: string}',
      'var a: { [a: number]: string; [b: number]: string; };',
      'var a: {add(x:number, ...y:Array<string>): void}',
      'var a: { id<T>(x: T): T; }',
      'var a:Array<number> = [1, 2, 3]',
      'var [x]: Array<string> = [ "hello" ];',
      //'var a: Map<string, Array<string> >',
      'var x: typeof Y = Y;',
      'var x: typeof Y | number = Y;',
      'var a: | 1 | 2, b: & 3 & 4',
      'var a: Promise<bool>[]',
      'var a: { [a: number]: string; [b: number]: string; };',
      'var foo = bar ? (foo) : number;',
      '((...rest: Array<number>) => rest)',
      'var a:(...rest:Array<number>) => number',
      '({f: function <T>() {}})',
      'var a: {param1?: number; param2: string; param3: string;}',
      'var identity: <T>(x: T, ...y:T[]) => T'
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
          'body': [{
              'declarations': [{
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
              }, ],
              'kind': 'let',
              'type': 'VariableDeclaration',
          }, ],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('let a: any;', Context.Empty, {
      source: 'let a: any;',
      expected: {
          'body': [{
              'declarations': [{
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
              }, ],
              'kind': 'let',
              'type': 'VariableDeclaration',
          }, ],
          'sourceType': 'script',
          'type': 'Program',
      }
  });

  pass('let intersection: number & string;', Context.Empty, {
      source: 'let intersection: number & string;',
      expected: {
          'body': [{
              'declarations': [{
                  'id': {
                      'name': 'intersection',
                      'type': 'Identifier',
                      'typeAnnotation': {
                          'type': 'TypeAnnotation',
                          'typeAnnotation': {
                              'type': 'TSIntersectionType',
                              'types': [{
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
              }, ],
              'kind': 'let',
              'type': 'VariableDeclaration',
          }, ],
          'sourceType': 'script',
          'type': 'Program',
      },
  });

  pass('let x: T;', Context.Empty, {
      source: 'let x: T;',
      expected: {
          'body': [{
              'declarations': [{
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
              }, ],
              'kind': 'let',
              'type': 'VariableDeclaration',
          }, ],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('let arr: number[][];', Context.Empty, {
      source: 'let arr: number[][];',
      expected: {
          'body': [{
              'declarations': [{
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
              }],
              'kind': 'let',
              'type': 'VariableDeclaration',
          }, ],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('simple let + identifier', Context.Empty, {
      source: 'let arr',
      expected: {
          'body': [{
              'declarations': [{
                  'id': {
                      'name': 'arr',
                      'type': 'Identifier',
                      typeAnnotation: null,
                  },
                  'init': null,
                  'type': 'VariableDeclarator',
              }, ],
              'kind': 'let',
              'type': 'VariableDeclaration',
          }, ],
          'sourceType': 'script',
          'type': 'Program',
      }
  });

  pass('var a: {numVal: number; strVal: string}', Context.Empty, {
      source: 'var a: {numVal: number; strVal: string}',
      expected: {
          'body': [{
              'declarations': [{
                  'id': {
                      'name': 'a',
                      'type': 'Identifier',
                      'typeAnnotation': {
                          'type': 'TypeAnnotation',
                          'typeAnnotation': {
                              'members': [{
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
              }],
              'kind': 'var',
              'type': 'VariableDeclaration'
          }],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('let f: <T>(a: T) => T;', Context.Empty, {
      source: 'let f: <T>(a: T) => T;',
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
                              }],
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
                                      'name': 'b',
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
                                      'name': 'c',
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
          'body': [{
              'declarations': [{
                  'id': {
                      'name': 'x',
                      'type': 'Identifier',
                      'typeAnnotation': {
                          'type': 'TypeAnnotation',
                          'typeAnnotation': {
                              'type': 'TSTypeReference',
                              'typeName': {
                                  'name': 'Array',
                                  'type': 'Identifier',
                              },
                              'typeParameters': {
                                  'params': [{
                                      'parameters': [],
                                      'type': 'TSFunctionType',
                                      'typeAnnotation': {
                                          'type': 'TypeAnnotation',
                                          'typeAnnotation': {
                                              'type': 'TSVoidKeyword',
                                          },
                                      },
                                      'typeParameters': []
                                  }],
                                  'type': 'TypeParameterInstantiation'
                              }
                          }
                      }
                  },
                  'init': null,
                  'type': 'VariableDeclarator'
              }],
              'kind': 'let',
              'type': 'VariableDeclaration'
          }],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('let f: (this: number) => void;', Context.Empty, {
      source: 'let f: (a: number, /*b?: number,*/ ...c: number[]) => void;',
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
                                              'type': 'TSNumberKeyword',
                                          }
                                      }
                                  },
                                  {
                                      'argument': {
                                          'name': 'c',
                                          'type': 'Identifier',
                                          'typeAnnotation': {
                                              'type': 'TypeAnnotation',
                                              'typeAnnotation': {
                                                  'elementType': {
                                                      'type': 'TSNumberKeyword',
                                                  },
                                                  'type': 'TSArrayType',
                                              }
                                          }
                                      },
                                      'type': 'RestElement'
                                  }
                              ],
                              'type': 'TSFunctionType',
                              'typeAnnotation': {
                                  'type': 'TypeAnnotation',
                                  'typeAnnotation': {
                                      'type': 'TSVoidKeyword',
                                  }
                              },
                              'typeParameters': []
                          }
                      }
                  },
                  'init': null,
                  'type': 'VariableDeclarator',
              }, ],
              'kind': 'let',
              'type': 'VariableDeclaration',
          }, ],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('var nameNumber: [string, number];', Context.Empty, {
      source: 'var nameNumber: [string, number];',
      expected: {
          'body': [{
              'declarations': [{
                  'id': {
                      'name': 'nameNumber',
                      'type': 'Identifier',
                      'typeAnnotation': {
                          'type': 'TypeAnnotation',
                          'typeAnnotation': {
                              'elementTypes': [{
                                      'type': 'TSStringKeyword',
                                  },
                                  {
                                      'type': 'TSNumberKeyword',
                                  }
                              ],
                              'type': 'TSTupleType',
                          }
                      }
                  },
                  'init': null,
                  'type': 'VariableDeclarator'
              }],
              'kind': 'var',
              'type': 'VariableDeclaration'
          }],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('let x: typeof y.z;', Context.Empty, {
      source: 'let x: typeof y.z;',
      expected: {
          'body': [{
              'declarations': [{
                  'id': {
                      'name': 'x',
                      'type': 'Identifier',
                      'typeAnnotation': {
                          'type': 'TypeAnnotation',
                          'typeAnnotation': {
                              'exprName': {
                                  'left': {
                                      'name': 'y',
                                      'type': 'Identifier',
                                  },
                                  'right': {
                                      'name': 'z',
                                      'type': 'Identifier',
                                  },
                                  'type': 'TSQualifiedName',
                              },
                              'type': 'TSTypeQuery',
                          }
                      }
                  },
                  'init': null,
                  'type': 'VariableDeclarator',
              }, ],
              'kind': 'let',
              'type': 'VariableDeclaration',
          }, ],
          'sourceType': 'script',
          'type': 'Program',
      }
  });

  pass('var a: { id<T>(x: T): T; }', Context.Empty, {
      source: 'var a: { id<T>(x: T): T; }',
      expected: {
          'body': [{
              'declarations': [{
                  'id': {
                      'name': 'a',
                      'type': 'Identifier',
                      'typeAnnotation': {
                          'type': 'TypeAnnotation',
                          'typeAnnotation': {
                              'members': [{
                                  'readonly': false,
                                  'type': 'TSMethodSignature',
                              }, ],
                              'type': 'TSTypeLiteral'
                          }
                      }
                  },
                  'init': null,
                  'type': 'VariableDeclarator'
              }, ],
              'kind': 'var',
              'type': 'VariableDeclaration'
          }, ],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('let y: unique symbol;', Context.Empty, {
      source: 'let y: unique symbol;',
      expected: {
          'body': [{
              'declarations': [{
                  'id': {
                      'name': 'y',
                      'type': 'Identifier',
                      'typeAnnotation': {
                          'type': 'TypeAnnotation',
                          'typeAnnotation': {
                              'operator': 'unique',
                              'type': 'TSTypeOperator',
                              'typeAnnotation': {
                                  'type': 'TSSymbolKeyword'
                              },
                          }
                      },
                  },
                  'init': null,
                  'type': 'VariableDeclarator',
              }, ],
              'kind': 'let',
              'type': 'VariableDeclaration',
          }, ],
          'sourceType': 'script',
          'type': 'Program',
      }
  });

  pass('var [x]: Array<string> = [ "hello" ];', Context.Empty, {
      source: 'var [x]: Array<string> = [ "hello" ];',
      expected: {
          'body': [{
              'declarations': [{
                  'id': {
                      'elements': [{
                          'name': 'x',
                          'type': 'Identifier',
                          'typeAnnotation': null,
                      }],
                      'type': 'ArrayPattern',
                      'typeAnnotation': {
                          'type': 'TypeAnnotation',
                          'typeAnnotation': {
                              'type': 'TSTypeReference',
                              'typeName': {
                                  'name': 'Array',
                                  'type': 'Identifier',
                              },
                              'typeParameters': {
                                  'params': [{
                                      'type': 'TSStringKeyword',
                                  }],
                                  'type': 'TypeParameterInstantiation',
                              }
                          }
                      }
                  },
                  'init': {
                      'elements': [{
                          'type': 'Literal',
                          'value': 'hello',
                      }],
                      'type': 'ArrayExpression',
                  },
                  'type': 'VariableDeclarator'
              }],
              'kind': 'var',
              'type': 'VariableDeclaration',
          }, ],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('function extend<T, U>() {}  ', Context.Empty, {
      source: 'function extend<T, U>() {}',
      expected: {
          'body': [{
              'async': false,
              'body': {
                  'body': [],
                  'type': 'BlockStatement',
              },
              'expression': false,
              'generator': false,
              'id': {
                  'name': 'extend',
                  'type': 'Identifier',
                  'typeAnnotation': null,
              },
              'params': [],
              'type': 'FunctionDeclaration',
              'returnType': null,
              'typeParameters': {
                  'params': [{
                          'constraint': null,
                          'default': null,
                          'name': 'T',
                          'type': 'TSTypeParameter',
                      },
                      {
                          'constraint': null,
                          'default': null,
                          'name': 'T',
                          'type': 'TSTypeParameter',
                      },
                      {
                          'constraint': null,
                          'default': null,
                          'name': 'U',
                          'type': 'TSTypeParameter',
                      },
                  ],
                  'type': 'TSTypeParameterDeclaration',
              }
          }],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('function extend<T, U>(first: T, second: U) {}  ', Context.Empty, {
      source: 'function extend<T, U>(first: T, second: U) {}',
      expected: {
          'body': [{
              'async': false,
              'body': {
                  'body': [],
                  'type': 'BlockStatement',
              },
              'expression': false,
              'generator': false,
              'id': {
                  'name': 'extend',
                  'type': 'Identifier',
                  'typeAnnotation': null,
              },
              'params': [{
                      'name': 'first',
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
                          }
                      }
                  },
                  {
                      'name': 'second',
                      'type': 'Identifier',
                      'typeAnnotation': {
                          'type': 'TypeAnnotation',
                          'typeAnnotation': {
                              'type': 'TSTypeReference',
                              'typeName': {
                                  'name': 'U',
                                  'type': 'Identifier',
                              },
                              'typeParameters': [],
                          }
                      }
                  }
              ],
              'type': 'FunctionDeclaration',
              'returnType': null,
              'typeParameters': {
                  'params': [{
                          'constraint': null,
                          'default': null,
                          'name': 'T',
                          'type': 'TSTypeParameter',
                      },
                      {
                          'constraint': null,
                          'default': null,
                          'name': 'T',
                          'type': 'TSTypeParameter',
                      },
                      {
                          'constraint': null,
                          'default': null,
                          'name': 'U',
                          'type': 'TSTypeParameter',
                      }
                  ],
                  'type': 'TSTypeParameterDeclaration',
              }
          }],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('function extend<T, U>(first: T, second: U) {}  ', Context.Empty, {
      source: 'function foo(): string {}',
      expected: {
          'body': [{
              'async': false,
              'body': {
                  'body': [],
                  'type': 'BlockStatement',
              },
              'expression': false,
              'generator': false,
              'id': {
                  'name': 'foo',
                  'type': 'Identifier',
                  'typeAnnotation': null,
              },
              'params': [],
              'returnType': {
                  'type': 'TypeAnnotation',
                  'typeAnnotation': {
                      'type': 'TSStringKeyword',
                  }
              },
              'type': 'FunctionDeclaration',
              'typeParameters': null,
          }, ],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('({f: function <T>() {}})', Context.Empty, {
      source: '({f: function <T>() {}})',
      expected: {
          'body': [{
              'expression': {
                  'properties': [{
                      'computed': false,
                      'key': {
                          'name': 'f',
                          'type': 'Identifier',
                      },
                      'kind': 'init',
                      'method': false,
                      'shorthand': false,
                      'type': 'Property',
                      'value': {
                          'async': false,
                          'body': {
                              'body': [],
                              'type': 'BlockStatement',
                          },
                          'expression': false,
                          'generator': false,
                          'id': null,
                          'params': [],
                          'typeParameters': {
                              'params': [{
                                  'constraint': null,
                                  'default': null,
                                  'name': 'T',
                                  'type': 'TSTypeParameter'
                              }, ],
                              'type': 'TSTypeParameterDeclaration',
                          },
                          'returnType': null,
                          'type': 'FunctionExpression',
                      }
                  }],
                  'type': 'ObjectExpression',
              },
              'type': 'ExpressionStatement',
          }],
          'sourceType': 'script',
          'type': 'Program'
      }
  });

  pass('function extend<T, U>(first: T, second: U): T & U { }', Context.Empty, {
    source: 'function extend<T, U>(first: T, second: U): T & U { }',
    expected: {
        'body': [
          {
            'async': false,
            'body': {
              'body': [],
              'type': 'BlockStatement',
            },
            'expression': false,
            'generator': false,
           'id': {
              'name': 'extend',
              'type': 'Identifier',
              'typeAnnotation': null,
            },
            'params': [
              {
                'name': 'first',
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
                'name': 'second',
                'type': 'Identifier',
                'typeAnnotation': {
                  'type': 'TypeAnnotation',
                 'typeAnnotation': {
                    'type': 'TSTypeReference',
                    'typeName': {
                      'name': 'U',
                      'type': 'Identifier',
                   },
                    'typeParameters': []
                  }
                }
              }
            ],
            'returnType': {
              'type': 'TypeAnnotation',
              'typeAnnotation': {
               'type': 'TSIntersectionType',
                'types': [
                  {
                    'type': 'TSTypeReference',
                    'typeName': {
                      'name': 'T',
                      'type': 'Identifier',
                    },
                    'typeParameters': [],
                  },
                 {
                    'type': 'TSTypeReference',
                    'typeName': {
                     'name': 'U',
                      'type': 'Identifier',
                    },
                    'typeParameters': [],
                  }
                ]
              }
            },
            'type': 'FunctionDeclaration',
            'typeParameters': {
              'params': [
                {
                  'constraint': null,
                  'default': null,
                  'name': 'T',
                  'type': 'TSTypeParameter',
                },
                {
                  'constraint': null,
                  'default': null,
                  'name': 'T',
                  'type': 'TSTypeParameter',
                },
                {
                  'constraint': null,
                  'default': null,
                  'name': 'U',
                  'type': 'TSTypeParameter',
                }
             ],
              'type': 'TSTypeParameterDeclaration'
            }
          }
        ],
        'sourceType': 'script',
        'type': 'Program'
      }
});
});
