import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Class', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['(class {})', '(class {})', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ClassExpression',
                'id': null,
                'superClass': null,
                'body': {
                    'type': 'ClassBody',
                    'body': [],
                    'start': 7,
                    'end': 9
                },
                'start': 1,
                'end': 9
            },
            'start': 0,
            'end': 10
        }
    ],
    'start': 0,
    'end': 10
}],
    ['(class foo{})', '(class foo{})', Context.OptionsRanges, {
      'type': 'Program',
      'sourceType': 'script',
      'body': [
          {
              'type': 'ExpressionStatement',
              'expression': {
                  'type': 'ClassExpression',
                  'id': {
                      'type': 'Identifier',
                      'name': 'foo',
                      'start': 7,
                      'end': 10
                  },
                  'superClass': null,
                  'body': {
                      'type': 'ClassBody',
                      'body': [],
                      'start': 10,
                      'end': 12
                  },
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
   ['class x{}\n/foo/', 'class x{}\n/foo/', Context.OptionsRanges, {
      'body': [
        {
          'body': {
            'body': [],
            'end': 9,
            'start': 7,
            'type': 'ClassBody',
          },
          'end': 9,
          'id': {
            'end': 7,
            'name': 'x',
            'start': 6,
            'type': 'Identifier',
          },
          'start': 0,
          'superClass': null,
          'type': 'ClassDeclaration',
        },
        {
          'end': 15,
          'expression': {
            'end': 15,
            'regex': {
              'flags': '',
              'pattern': 'foo',
            },
            'start': 10,
            'type': 'Literal',
            'value': /foo/,
          },
          'start': 10,
          'type': 'ExpressionStatement',
        },
      ],
      'end': 15,
      'sourceType': 'script',
      'start': 0,
      'type': 'Program',
    }],
   ['class A extends gPig {}', '(class A extends gPig {})', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ClassExpression',
                'id': {
                    'type': 'Identifier',
                    'name': 'A',
                    'start': 7,
                    'end': 8
                },
                'superClass': {
                    'type': 'Identifier',
                    'name': 'gPig',
                    'start': 17,
                    'end': 21
                },
                'body': {
                    'type': 'ClassBody',
                    'body': [],
                    'start': 22,
                    'end': 24
                },
                'start': 1,
                'end': 24
            },
            'start': 0,
            'end': 25
        }
    ],
    'start': 0,
    'end': 25
}],
['(class foo { bar() {}})', '(class foo { bar() {}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 7,
                  'end': 10
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'bar',
                              'start': 13,
                              'end': 16
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 19,
                                  'end': 21
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 16,
                              'end': 21
                          },
                          'start': 13,
                          'end': 21
                      }
                  ],
                  'start': 11,
                  'end': 22
              },
              'start': 1,
              'end': 22
          },
          'start': 0,
          'end': 23
      }
  ],
  'start': 0,
  'end': 23
}],
['(class A {;})', '(class A {;})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [],
                  'start': 9,
                  'end': 12
              },
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
['(class A {; ;; ;})', '(class A {; ;; ;})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [],
                  'start': 9,
                  'end': 17
              },
              'start': 1,
              'end': 17
          },
          'start': 0,
          'end': 18
      }
  ],
  'start': 0,
  'end': 18
}],
['(class A extends foo() {})', '(class A extends foo() {})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': {
                  'type': 'CallExpression',
                  'callee': {
                      'type': 'Identifier',
                      'name': 'foo',
                      'start': 17,
                      'end': 20
                  },
                  'arguments': [],
                  'start': 1,
                  'end': 22
              },
              'body': {
                  'type': 'ClassBody',
                  'body': [],
                  'start': 23,
                  'end': 25
              },
              'start': 1,
              'end': 25
          },
          'start': 0,
          'end': 26
      }
  ],
  'start': 0,
  'end': 26
}],
['(class A {static a(){}})', '(class A {static a(){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': true,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'a',
                              'start': 17,
                              'end': 18
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 20,
                                  'end': 22
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 18,
                              'end': 22
                          },
                          'start': 10,
                          'end': 22
                      }
                  ],
                  'start': 9,
                  'end': 23
              },
              'start': 1,
              'end': 23
          },
          'start': 0,
          'end': 24
      }
  ],
  'start': 0,
  'end': 24
}],
['(class A {constructor(){}})', '(class A {constructor(){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'constructor',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'constructor',
                              'start': 10,
                              'end': 21
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 23,
                                  'end': 25
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 21,
                              'end': 25
                          },
                          'start': 10,
                          'end': 25
                      }
                  ],
                  'start': 9,
                  'end': 26
              },
              'start': 1,
              'end': 26
          },
          'start': 0,
          'end': 27
      }
  ],
  'start': 0,
  'end': 27
}],
['(class A {static constructor(){}})', '(class A {static constructor(){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': true,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'constructor',
                              'start': 17,
                              'end': 28
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 30,
                                  'end': 32
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 28,
                              'end': 32
                          },
                          'start': 10,
                          'end': 32
                      }
                  ],
                  'start': 9,
                  'end': 33
              },
              'start': 1,
              'end': 33
          },
          'start': 0,
          'end': 34
      }
  ],
  'start': 0,
  'end': 34
}],
['(class A {async foo(){}})', '(class A {async foo(){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 16,
                              'end': 19
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 21,
                                  'end': 23
                              },
                              'async': true,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 19,
                              'end': 23
                          },
                          'start': 10,
                          'end': 23
                      }
                  ],
                  'start': 9,
                  'end': 24
              },
              'start': 1,
              'end': 24
          },
          'start': 0,
          'end': 25
      }
  ],
  'start': 0,
  'end': 25
}],
['(class A {*foo(){}})', '(class A {*foo(){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 11,
                              'end': 14
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 16,
                                  'end': 18
                              },
                              'async': false,
                              'generator': true,
                              'expression': false,
                              'id': null,
                              'start': 14,
                              'end': 18
                          },
                          'start': 10,
                          'end': 18
                      }
                  ],
                  'start': 9,
                  'end': 19
              },
              'start': 1,
              'end': 19
          },
          'start': 0,
          'end': 20
      }
  ],
  'start': 0,
  'end': 20
}],
['class A {get foo(){}}', 'class A {get foo(){}}', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ClassDeclaration',
          'id': {
              'type': 'Identifier',
              'name': 'A',
              'start': 6,
              'end': 7
          },
          'superClass': null,
          'body': {
              'type': 'ClassBody',
              'body': [
                  {
                      'type': 'MethodDefinition',
                      'kind': 'get',
                      'static': false,
                      'computed': false,
                      'key': {
                          'type': 'Identifier',
                          'name': 'foo',
                          'start': 13,
                          'end': 16
                      },
                      'value': {
                          'type': 'FunctionExpression',
                          'params': [],
                          'body': {
                              'type': 'BlockStatement',
                              'body': [],
                              'start': 18,
                              'end': 20
                          },
                          'async': false,
                          'generator': false,
                          'expression': false,
                          'id': null,
                          'start': 16,
                          'end': 20
                      },
                      'start': 9,
                      'end': 20
                  }
              ],
              'start': 8,
              'end': 21
          },
          'start': 0,
          'end': 21
      }
  ],
  'start': 0,
  'end': 21
}],
['(class A {get set(){}})', '(class A {get set(){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'get',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'set',
                              'start': 14,
                              'end': 17
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 19,
                                  'end': 21
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 17,
                              'end': 21
                          },
                          'start': 10,
                          'end': 21
                      }
                  ],
                  'start': 9,
                  'end': 22
              },
              'start': 1,
              'end': 22
          },
          'start': 0,
          'end': 23
      }
  ],
  'start': 0,
  'end': 23
}],
['class A {static get foo(){}}', 'class A {static get foo(){}}', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ClassDeclaration',
          'id': {
              'type': 'Identifier',
              'name': 'A',
              'start': 6,
              'end': 7
          },
          'superClass': null,
          'body': {
              'type': 'ClassBody',
              'body': [
                  {
                      'type': 'MethodDefinition',
                      'kind': 'get',
                      'static': true,
                      'computed': false,
                      'key': {
                          'type': 'Identifier',
                          'name': 'foo',
                          'start': 20,
                          'end': 23
                      },
                      'value': {
                          'type': 'FunctionExpression',
                          'params': [],
                          'body': {
                              'type': 'BlockStatement',
                              'body': [],
                              'start': 25,
                              'end': 27
                          },
                          'async': false,
                          'generator': false,
                          'expression': false,
                          'id': null,
                          'start': 23,
                          'end': 27
                      },
                      'start': 9,
                      'end': 27
                  }
              ],
              'start': 8,
              'end': 28
          },
          'start': 0,
          'end': 28
      }
  ],
  'start': 0,
  'end': 28
}],
['class A {set foo(x){}}', 'class A {set foo(x){}}', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ClassDeclaration',
          'id': {
              'type': 'Identifier',
              'name': 'A',
              'start': 6,
              'end': 7
          },
          'superClass': null,
          'body': {
              'type': 'ClassBody',
              'body': [
                  {
                      'type': 'MethodDefinition',
                      'kind': 'set',
                      'static': false,
                      'computed': false,
                      'key': {
                          'type': 'Identifier',
                          'name': 'foo',
                          'start': 13,
                          'end': 16
                      },
                      'value': {
                          'type': 'FunctionExpression',
                          'params': [
                              {
                                  'type': 'Identifier',
                                  'name': 'x',
                                  'start': 17,
                                  'end': 18
                              }
                          ],
                          'body': {
                              'type': 'BlockStatement',
                              'body': [],
                              'start': 19,
                              'end': 21
                          },
                          'async': false,
                          'generator': false,
                          'expression': false,
                          'id': null,
                          'start': 16,
                          'end': 21
                      },
                      'start': 9,
                      'end': 21
                  }
              ],
              'start': 8,
              'end': 22
          },
          'start': 0,
          'end': 22
      }
  ],
  'start': 0,
  'end': 22
}],
['(class A {set get(x){}})', '(class A {set get(x){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'set',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'get',
                              'start': 14,
                              'end': 17
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 18,
                                      'end': 19
                                  }
                              ],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 20,
                                  'end': 22
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 17,
                              'end': 22
                          },
                          'start': 10,
                          'end': 22
                      }
                  ],
                  'start': 9,
                  'end': 23
              },
              'start': 1,
              'end': 23
          },
          'start': 0,
          'end': 24
      }
  ],
  'start': 0,
  'end': 24
}],
['(class A {set(){} get(){} async(){}})', '(class A {set(){} get(){} async(){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'set',
                              'start': 10,
                              'end': 13
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 15,
                                  'end': 17
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 13,
                              'end': 17
                          },
                          'start': 10,
                          'end': 17
                      },
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'get',
                              'start': 18,
                              'end': 21
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 23,
                                  'end': 25
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 21,
                              'end': 25
                          },
                          'start': 18,
                          'end': 25
                      },
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'async',
                              'start': 26,
                              'end': 31
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 33,
                                  'end': 35
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 31,
                              'end': 35
                          },
                          'start': 26,
                          'end': 35
                      }
                  ],
                  'start': 9,
                  'end': 36
              },
              'start': 1,
              'end': 36
          },
          'start': 0,
          'end': 37
      }
  ],
  'start': 0,
  'end': 37
}],
 ['(class A {async [foo](){}})', '(class A {async [foo](){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': true,
                          'key': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 17,
                              'end': 20
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 23,
                                  'end': 25
                              },
                              'async': true,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 21,
                              'end': 25
                          },
                          'start': 10,
                          'end': 25
                      }
                  ],
                  'start': 9,
                  'end': 26
              },
              'start': 1,
              'end': 26
          },
          'start': 0,
          'end': 27
      }
  ],
  'start': 0,
  'end': 27
}],
 ['(class A {*[foo](){}})', '(class A {*[foo](){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': true,
                          'key': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 12,
                              'end': 15
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 18,
                                  'end': 20
                              },
                              'async': false,
                              'generator': true,
                              'expression': false,
                              'id': null,
                              'start': 16,
                              'end': 20
                          },
                          'start': 10,
                          'end': 20
                      }
                  ],
                  'start': 9,
                  'end': 21
              },
              'start': 1,
              'end': 21
          },
          'start': 0,
          'end': 22
      }
  ],
  'start': 0,
  'end': 22
}],
['(class A {get [foo](){}})', '(class A {get [foo](){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'get',
                          'static': false,
                          'computed': true,
                          'key': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 15,
                              'end': 18
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 21,
                                  'end': 23
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 19,
                              'end': 23
                          },
                          'start': 10,
                          'end': 23
                      }
                  ],
                  'start': 9,
                  'end': 24
              },
              'start': 1,
              'end': 24
          },
          'start': 0,
          'end': 25
      }
  ],
  'start': 0,
  'end': 25
}],
['(class A {static get [foo](){}})', '(class A {static get [foo](){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'get',
                          'static': true,
                          'computed': true,
                          'key': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 22,
                              'end': 25
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 28,
                                  'end': 30
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 26,
                              'end': 30
                          },
                          'start': 10,
                          'end': 30
                      }
                  ],
                  'start': 9,
                  'end': 31
              },
              'start': 1,
              'end': 31
          },
          'start': 0,
          'end': 32
      }
  ],
  'start': 0,
  'end': 32
}],
 ['(class A {static set [foo](x){}})', '(class A {static set [foo](x){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'set',
                          'static': true,
                          'computed': true,
                          'key': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 22,
                              'end': 25
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 27,
                                      'end': 28
                                  }
                              ],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 29,
                                  'end': 31
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 26,
                              'end': 31
                          },
                          'start': 10,
                          'end': 31
                      }
                  ],
                  'start': 9,
                  'end': 32
              },
              'start': 1,
              'end': 32
          },
          'start': 0,
          'end': 33
      }
  ],
  'start': 0,
  'end': 33
}],
  ['(class x { get [y](){}})', '(class x { get [y](){}})', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ClassExpression',
                'id': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 7,
                    'end': 8
                },
                'superClass': null,
                'body': {
                    'type': 'ClassBody',
                    'body': [
                        {
                            'type': 'MethodDefinition',
                            'kind': 'get',
                            'static': false,
                            'computed': true,
                            'key': {
                                'type': 'Identifier',
                                'name': 'y',
                                'start': 16,
                                'end': 17
                            },
                            'value': {
                                'type': 'FunctionExpression',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
                                    'start': 20,
                                    'end': 22
                                },
                                'async': false,
                                'generator': false,
                                'expression': false,
                                'id': null,
                                'start': 18,
                                'end': 22
                            },
                            'start': 11,
                            'end': 22
                        }
                    ],
                    'start': 9,
                    'end': 23
                },
                'start': 1,
                'end': 23
            },
            'start': 0,
            'end': 24
        }
    ],
    'start': 0,
    'end': 24
}],
  ['(class x {static *[y](){}})', '(class x {static *[y](){}})', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ClassExpression',
                'id': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 7,
                    'end': 8
                },
                'superClass': null,
                'body': {
                    'type': 'ClassBody',
                    'body': [
                        {
                            'type': 'MethodDefinition',
                            'kind': 'method',
                            'static': true,
                            'computed': true,
                            'key': {
                                'type': 'Identifier',
                                'name': 'y',
                                'start': 19,
                                'end': 20
                            },
                            'value': {
                                'type': 'FunctionExpression',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
                                    'start': 23,
                                    'end': 25
                                },
                                'async': false,
                                'generator': true,
                                'expression': false,
                                'id': null,
                                'start': 21,
                                'end': 25
                            },
                            'start': 10,
                            'end': 25
                        }
                    ],
                    'start': 9,
                    'end': 26
                },
                'start': 1,
                'end': 26
            },
            'start': 0,
            'end': 27
        }
    ],
    'start': 0,
    'end': 27
}],
  ['(class x { static async [y](){}})', '(class x { static async [y](){}})', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ClassExpression',
                'id': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 7,
                    'end': 8
                },
                'superClass': null,
                'body': {
                    'type': 'ClassBody',
                    'body': [
                        {
                            'type': 'MethodDefinition',
                            'kind': 'method',
                            'static': true,
                            'computed': true,
                            'key': {
                                'type': 'Identifier',
                                'name': 'y',
                                'start': 25,
                                'end': 26
                            },
                            'value': {
                                'type': 'FunctionExpression',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
                                    'start': 29,
                                    'end': 31
                                },
                                'async': true,
                                'generator': false,
                                'expression': false,
                                'id': null,
                                'start': 27,
                                'end': 31
                            },
                            'start': 11,
                            'end': 31
                        }
                    ],
                    'start': 9,
                    'end': 32
                },
                'start': 1,
                'end': 32
            },
            'start': 0,
            'end': 33
        }
    ],
    'start': 0,
    'end': 33
}],
  ['(class x { async [y](){}})', '(class x { async [y](){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': true,
                          'key': {
                              'type': 'Identifier',
                              'name': 'y',
                              'start': 18,
                              'end': 19
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 22,
                                  'end': 24
                              },
                              'async': true,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 20,
                              'end': 24
                          },
                          'start': 11,
                          'end': 24
                      }
                  ],
                  'start': 9,
                  'end': 25
              },
              'start': 1,
              'end': 25
          },
          'start': 0,
          'end': 26
      }
  ],
  'start': 0,
  'end': 26
}],
['(class A {set [foo](x){}})', '(class A {set [foo](x){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'A',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'set',
                          'static': false,
                          'computed': true,
                          'key': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 15,
                              'end': 18
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 20,
                                      'end': 21
                                  }
                              ],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 22,
                                  'end': 24
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 19,
                              'end': 24
                          },
                          'start': 10,
                          'end': 24
                      }
                  ],
                  'start': 9,
                  'end': 25
              },
              'start': 1,
              'end': 25
          },
          'start': 0,
          'end': 26
      }
  ],
  'start': 0,
  'end': 26
}],
['(class x { static set [y](z){}})', '(class x { static set [y](z){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'set',
                          'static': true,
                          'computed': true,
                          'key': {
                              'type': 'Identifier',
                              'name': 'y',
                              'start': 23,
                              'end': 24
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [
                                  {
                                      'type': 'Identifier',
                                      'name': 'z',
                                      'start': 26,
                                      'end': 27
                                  }
                              ],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 28,
                                  'end': 30
                              },
                              'async': false,
                              'generator': false,
                              'expression': false,
                              'id': null,
                              'start': 25,
                              'end': 30
                          },
                          'start': 11,
                          'end': 30
                      }
                  ],
                  'start': 9,
                  'end': 31
              },
              'start': 1,
              'end': 31
          },
          'start': 0,
          'end': 32
      }
  ],
  'start': 0,
  'end': 32
}],
['(class x{*foo(){}})', '(class x{*foo(){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 10,
                              'end': 13
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 15,
                                  'end': 17
                              },
                              'async': false,
                              'generator': true,
                              'expression': false,
                              'id': null,
                              'start': 13,
                              'end': 17
                          },
                          'start': 9,
                          'end': 17
                      }
                  ],
                  'start': 8,
                  'end': 18
              },
              'start': 1,
              'end': 18
          },
          'start': 0,
          'end': 19
      }
  ],
  'start': 0,
  'end': 19
}],
['(class x{*[x](){}})', '(class x{*[x](){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': true,
                          'key': {
                              'type': 'Identifier',
                              'name': 'x',
                              'start': 11,
                              'end': 12
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 15,
                                  'end': 17
                              },
                              'async': false,
                              'generator': true,
                              'expression': false,
                              'id': null,
                              'start': 13,
                              'end': 17
                          },
                          'start': 9,
                          'end': 17
                      }
                  ],
                  'start': 8,
                  'end': 18
              },
              'start': 1,
              'end': 18
          },
          'start': 0,
          'end': 19
      }
  ],
  'start': 0,
  'end': 19
}],
['(class x{*"foo"(){}})', '(class x{*"foo"(){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Literal',
                              raw: null,
                              'value': 'foo',
                              'start': 10,
                              'end': 15
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 17,
                                  'end': 19
                              },
                              'async': false,
                              'generator': true,
                              'expression': false,
                              'id': null,
                              'start': 15,
                              'end': 19
                          },
                          'start': 9,
                          'end': 19
                      }
                  ],
                  'start': 8,
                  'end': 20
              },
              'start': 1,
              'end': 20
          },
          'start': 0,
          'end': 21
      }
  ],
  'start': 0,
  'end': 21
}],
['(class x{static *foo(){}})', '(class x{static *foo(){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': true,
                          'computed': false,
                          'key': {
                              'type': 'Identifier',
                              'name': 'foo',
                              'start': 17,
                              'end': 20
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 22,
                                  'end': 24
                              },
                              'async': false,
                              'generator': true,
                              'expression': false,
                              'id': null,
                              'start': 20,
                              'end': 24
                          },
                          'start': 9,
                          'end': 24
                      }
                  ],
                  'start': 8,
                  'end': 25
              },
              'start': 1,
              'end': 25
          },
          'start': 0,
          'end': 26
      }
  ],
  'start': 0,
  'end': 26
}],
['(class x{static *[x](){}})', '(class x{static *[x](){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': true,
                          'computed': true,
                          'key': {
                              'type': 'Identifier',
                              'name': 'x',
                              'start': 18,
                              'end': 19
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 22,
                                  'end': 24
                              },
                              'async': false,
                              'generator': true,
                              'expression': false,
                              'id': null,
                              'start': 20,
                              'end': 24
                          },
                          'start': 9,
                          'end': 24
                      }
                  ],
                  'start': 8,
                  'end': 25
              },
              'start': 1,
              'end': 25
          },
          'start': 0,
          'end': 26
      }
  ],
  'start': 0,
  'end': 26
}],
['(class x{*555(){}})', '(class x{*555(){}})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ClassExpression',
              'id': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 7,
                  'end': 8
              },
              'superClass': null,
              'body': {
                  'type': 'ClassBody',
                  'body': [
                      {
                          'type': 'MethodDefinition',
                          'kind': 'method',
                          'static': false,
                          'computed': false,
                          'key': {
                              'type': 'Literal',
                              raw: null,
                              'value': 555,
                              'start': 10,
                              'end': 13
                          },
                          'value': {
                              'type': 'FunctionExpression',
                              'params': [],
                              'body': {
                                  'type': 'BlockStatement',
                                  'body': [],
                                  'start': 15,
                                  'end': 17
                              },
                              'async': false,
                              'generator': true,
                              'expression': false,
                              'id': null,
                              'start': 13,
                              'end': 17
                          },
                          'start': 9,
                          'end': 17
                      }
                  ],
                  'start': 8,
                  'end': 18
              },
              'start': 1,
              'end': 18
          },
          'start': 0,
          'end': 19
      }
  ],
  'start': 0,
  'end': 19
}],
];

pass('Expressions - Class (pass)', valids);

});
