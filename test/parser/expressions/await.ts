import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Await', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['(async function f(){ await foo })', '(async function f(){ await foo })', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [],
                'body': {
                    'type': 'BlockStatement',
                    'body': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'AwaitExpression',
                                'argument': {
                                    'type': 'Identifier',
                                    'name': 'foo',
                                    'start': 27,
                                    'end': 30
                                },
                                'start': 21,
                                'end': 30
                            },
                            'start': 21,
                            'end': 30
                        }
                    ],
                    'start': 19,
                    'end': 32
                },
                'async': true,
                'generator': false,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 16,
                    'end': 17
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
['(async function f(){ await await foo })', '(async function f(){ await await foo })', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'FunctionExpression',
              'params': [],
              'body': {
                  'type': 'BlockStatement',
                  'body': [
                      {
                          'type': 'ExpressionStatement',
                          'expression': {
                              'type': 'AwaitExpression',
                              'argument': {
                                  'type': 'AwaitExpression',
                                  'argument': {
                                      'type': 'Identifier',
                                      'name': 'foo',
                                      'start': 33,
                                      'end': 36
                                  },
                                  'start': 27,
                                  'end': 36
                              },
                              'start': 21,
                              'end': 36
                          },
                          'start': 21,
                          'end': 36
                      }
                  ],
                  'start': 19,
                  'end': 38
              },
              'async': true,
              'generator': false,
              'expression': false,
              'id': {
                  'type': 'Identifier',
                  'name': 'f',
                  'start': 16,
                  'end': 17
              },
              'start': 1,
              'end': 38
          },
          'start': 0,
          'end': 39
      }
  ],
  'start': 0,
  'end': 39
}],
['await()', 'await()', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'await',
                  'start': 0,
                  'end': 5
              },
              'arguments': [],
              'start': 0,
              'end': 7
          },
          'start': 0,
          'end': 7
      }
  ],
  'start': 0,
  'end': 7
}],
['await[x]', 'await[x]', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'MemberExpression',
              'object': {
                  'type': 'Identifier',
                  'name': 'await',
                  'start': 0,
                  'end': 5
              },
              'computed': true,
              'property': {
                  'type': 'Identifier',
                  'name': 'x',
                  'start': 6,
                  'end': 7
              },
              'start': 0,
              'end': 7
          },
          'start': 0,
          'end': 8
      }
  ],
  'start': 0,
  'end': 8
}],
['await = 16', 'await = 16', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'AssignmentExpression',
              'left': {
                  'type': 'Identifier',
                  'name': 'await',
                  'start': 0,
                  'end': 5
              },
              'operator': '=',
              'right': {
                  'type': 'Literal',
                  raw: null,
                  'value': 16,
                  'start': 8,
                  'end': 10
              },
              'start': 0,
              'end': 10
          },
          'start': 0,
          'end': 10
      }
  ],
  'start': 0,
  'end': 10
}],
['(function call(foo=await){})', '(function call(foo=await){})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'FunctionExpression',
              'params': [
                  {
                      'type': 'AssignmentPattern',
                      'left': {
                          'type': 'Identifier',
                          'name': 'foo',
                          'start': 15,
                          'end': 18
                      },
                      'right': {
                          'type': 'Identifier',
                          'name': 'await',
                          'start': 19,
                          'end': 24
                      },
                      'start': 15,
                      'end': 24
                  }
              ],
              'body': {
                  'type': 'BlockStatement',
                  'body': [],
                  'start': 25,
                  'end': 27
              },
              'async': false,
              'generator': false,
              'expression': false,
              'id': {
                  'type': 'Identifier',
                  'name': 'call',
                  'start': 10,
                  'end': 14
              },
              'start': 1,
              'end': 27
          },
          'start': 0,
          'end': 28
      }
  ],
  'start': 0,
  'end': 28
}],
['(await())', '(await())', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'await',
                  'start': 1,
                  'end': 6
              },
              'arguments': [],
              'start': 1,
              'end': 8
          },
          'start': 0,
          'end': 9
      }
  ],
  'start': 0,
  'end': 9
}],
['y = async x => await x', 'y = async x => await x', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'AssignmentExpression',
              'left': {
                  'type': 'Identifier',
                  'name': 'y',
                  'start': 0,
                  'end': 1
              },
              'operator': '=',
              'right': {
                  'type': 'ArrowFunctionExpression',
                  'body': {
                      'type': 'AwaitExpression',
                      'argument': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 21,
                          'end': 22
                      },
                      'start': 15,
                      'end': 22
                  },
                  'params': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 10,
                          'end': 11
                      }
                  ],
                  'id': null,
                  'async': true,
                  'generator': false,
                  'expression': true,
                  'start': 4,
                  'end': 22
              },
              'start': 0,
              'end': 22
          },
          'start': 0,
          'end': 22
      }
  ],
  'start': 0,
  'end': 22
}],
['y = async x => { await x }', 'y = async x => { await x }', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'AssignmentExpression',
              'left': {
                  'type': 'Identifier',
                  'name': 'y',
                  'start': 0,
                  'end': 1
              },
              'operator': '=',
              'right': {
                  'type': 'ArrowFunctionExpression',
                  'body': {
                      'type': 'BlockStatement',
                      'body': [
                          {
                              'type': 'ExpressionStatement',
                              'expression': {
                                  'type': 'AwaitExpression',
                                  'argument': {
                                      'type': 'Identifier',
                                      'name': 'x',
                                      'start': 23,
                                      'end': 24
                                  },
                                  'start': 17,
                                  'end': 24
                              },
                              'start': 17,
                              'end': 24
                          }
                      ],
                      'start': 15,
                      'end': 26
                  },
                  'params': [
                      {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 10,
                          'end': 11
                      }
                  ],
                  'id': null,
                  'async': true,
                  'generator': false,
                  'expression': false,
                  'start': 4,
                  'end': 26
              },
              'start': 0,
              'end': 26
          },
          'start': 0,
          'end': 26
      }
  ],
  'start': 0,
  'end': 26
}],
['async function f(){ await foo\n/foo/g }', 'async function f(){ await foo\n/foo/g }', Context.OptionsRanges, {
    'body': [
      {
        'async': true,
        'body': {
         'body': [
            {
              'end': 29,
              'expression': {
                'argument': {
                  'end': 29,
                  'name': 'foo',
                  'start': 26,
                  'type': 'Identifier',
                },
                'end': 29,
                'start': 20,
                'type': 'AwaitExpression',
              },
              'start': 20,
              'type': 'ExpressionStatement',
            },
            {
              'end': 36,
              'expression': {
               'end': 36,
                'regex': {
                  'flags': 'g',
                  'pattern': 'foo',
                },
                'start': 30,
                'type': 'Literal',
                'value': /foo/g,
              },
              'start': 30,
              'type': 'ExpressionStatement',
            },
          ],
          'end': 38,
          'start': 18,
          'type': 'BlockStatement',
        },
        'end': 38,
        'expression': false,
        'generator': false,
        'id': {
          'end': 16,
          'name': 'f',
          'start': 15,
         'type': 'Identifier',
       },
        'params': [],
        'start': 0,
       'type': 'FunctionDeclaration',
      },
    ],
    'end': 38,
    'sourceType': 'script',
    'start': 0,
    'type': 'Program',
  }],
  ['e = [await]', 'e = [await]', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'e',
                    'start': 0,
                    'end': 1
                },
                'operator': '=',
                'right': {
                    'type': 'ArrayExpression',
                    'elements': [
                        {
                            'type': 'Identifier',
                            'name': 'await',
                            'start': 5,
                            'end': 10
                        }
                    ],
                    'start': 4,
                    'end': 11
                },
                'start': 0,
                'end': 11
            },
            'start': 0,
            'end': 11
        }
    ],
    'start': 0,
    'end': 11
}],
   ['(function* foo(await) { yield await; })', '(function* foo(await) { yield await })', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [
                    {
                        'type': 'Identifier',
                        'name': 'await',
                        'start': 15,
                        'end': 20
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [
                        {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'YieldExpression',
                                'argument': {
                                    'type': 'Identifier',
                                    'name': 'await',
                                    'start': 30,
                                    'end': 35
                                },
                                'delegate': false,
                                'start': 24,
                                'end': 35
                            },
                            'start': 24,
                            'end': 35
                        }
                    ],
                    'start': 22,
                    'end': 37
                },
                'async': false,
                'generator': true,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 11,
                    'end': 14
                },
                'start': 1,
                'end': 37
            },
            'start': 0,
            'end': 38
        }
    ],
    'start': 0,
    'end': 38
}],
   ['async () => await x', 'async () => await x', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrowFunctionExpression',
                'body': {
                    'type': 'AwaitExpression',
                    'argument': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 18,
                        'end': 19
                    },
                    'start': 12,
                    'end': 19
                },
                'params': [],
                'id': null,
                'async': true,
                'generator': false,
                'expression': true,
                'start': 0,
                'end': 19
            },
            'start': 0,
            'end': 19
        }
    ],
    'start': 0,
    'end': 19
}],
['async function f(){ await await foo; }', 'async function f(){ await await foo; }', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'FunctionDeclaration',
          'params': [],
          'body': {
              'type': 'BlockStatement',
              'body': [
                  {
                      'type': 'ExpressionStatement',
                      'expression': {
                          'type': 'AwaitExpression',
                          'argument': {
                              'type': 'AwaitExpression',
                              'argument': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 32,
                                  'end': 35
                              },
                              'start': 26,
                              'end': 35
                          },
                          'start': 20,
                          'end': 35
                      },
                      'start': 20,
                      'end': 36
                  }
              ],
              'start': 18,
              'end': 38
          },
          'async': true,
          'generator': false,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'f',
              'start': 15,
              'end': 16
          },
          'start': 0,
          'end': 38
      }
  ],
  'start': 0,
  'end': 38
}],
['call(await.foo)', 'call(await.foo)', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'call',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'MemberExpression',
                      'object': {
                          'type': 'Identifier',
                          'name': 'await',
                          'start': 5,
                          'end': 10
                      },
                      'computed': false,
                      'property': {
                          'type': 'Identifier',
                          'name': 'foo',
                          'start': 11,
                          'end': 14
                      },
                      'start': 5,
                      'end': 14
                  }
              ],
              'start': 0,
              'end': 15
          },
          'start': 0,
          'end': 15
      }
  ],
  'start': 0,
  'end': 15
}],
['function call(await){}', 'function call(await){}', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'FunctionDeclaration',
          'params': [
              {
                  'type': 'Identifier',
                  'name': 'await',
                  'start': 14,
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
          'id': {
              'type': 'Identifier',
              'name': 'call',
              'start': 9,
              'end': 13
          },
          'start': 0,
          'end': 22
      }
  ],
  'start': 0,
  'end': 22
}],
['function call(foo=await){}', 'function call(foo=await){}', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'FunctionDeclaration',
          'params': [
              {
                  'type': 'AssignmentPattern',
                  'left': {
                      'type': 'Identifier',
                      'name': 'foo',
                      'start': 14,
                      'end': 17
                  },
                  'right': {
                      'type': 'Identifier',
                      'name': 'await',
                      'start': 18,
                      'end': 23
                  },
                  'start': 14,
                  'end': 23
              }
          ],
          'body': {
              'type': 'BlockStatement',
              'body': [],
              'start': 24,
              'end': 26
          },
          'async': false,
          'generator': false,
          'expression': false,
          'id': {
              'type': 'Identifier',
              'name': 'call',
              'start': 9,
              'end': 13
          },
          'start': 0,
          'end': 26
      }
  ],
  'start': 0,
  'end': 26
}],
['let y = async x => await x', 'let y = async x => await x', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'let',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'ArrowFunctionExpression',
                      'body': {
                          'type': 'AwaitExpression',
                          'argument': {
                              'type': 'Identifier',
                              'name': 'x',
                              'start': 25,
                              'end': 26
                          },
                          'start': 19,
                          'end': 26
                      },
                      'params': [
                          {
                              'type': 'Identifier',
                              'name': 'x',
                              'start': 14,
                              'end': 15
                          }
                      ],
                      'id': null,
                      'async': true,
                      'generator': false,
                      'expression': true,
                      'start': 8,
                      'end': 26
                  },
                  'id': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 4,
                      'end': 5
                  },
                  'start': 4,
                  'end': 26
              }
          ],
          'start': 0,
          'end': 26
      }
  ],
  'start': 0,
  'end': 26
}],
['let y = async x => { await x; }', 'let y = async x => { await x; }', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'VariableDeclaration',
          'kind': 'let',
          'declarations': [
              {
                  'type': 'VariableDeclarator',
                  'init': {
                      'type': 'ArrowFunctionExpression',
                      'body': {
                          'type': 'BlockStatement',
                          'body': [
                              {
                                  'type': 'ExpressionStatement',
                                  'expression': {
                                      'type': 'AwaitExpression',
                                      'argument': {
                                          'type': 'Identifier',
                                          'name': 'x',
                                          'start': 27,
                                          'end': 28
                                      },
                                      'start': 21,
                                      'end': 28
                                  },
                                  'start': 21,
                                  'end': 29
                              }
                          ],
                          'start': 19,
                          'end': 31
                      },
                      'params': [
                          {
                              'type': 'Identifier',
                              'name': 'x',
                              'start': 14,
                              'end': 15
                          }
                      ],
                      'id': null,
                      'async': true,
                      'generator': false,
                      'expression': false,
                      'start': 8,
                      'end': 31
                  },
                  'id': {
                      'type': 'Identifier',
                      'name': 'y',
                      'start': 4,
                      'end': 5
                  },
                  'start': 4,
                  'end': 31
              }
          ],
          'start': 0,
          'end': 31
      }
  ],
  'start': 0,
  'end': 31
}],
['async function f(){ await foo\n/foo/ }', 'async function f(){ await foo\n/foo/ }', Context.OptionsRanges, {
    'body': [
      {
        'async': true,
        'body': {
          'body': [
            {
              'end': 29,
              'expression': {
                'argument': {
                  'end': 29,
                  'name': 'foo',
                  'start': 26,
                  'type': 'Identifier',
                },
                'end': 29,
                'start': 20,
                'type': 'AwaitExpression',
              },
              'start': 20,
              'type': 'ExpressionStatement',
            },
            {
              'end': 35,
              'expression': {
                'end': 35,
                'regex': {
                  'flags': '',
                  'pattern': 'foo',
                },
                'start': 30,
                'type': 'Literal',
                'value': /foo/,
             },
              'start': 30,
              'type': 'ExpressionStatement',
            },
          ],
          'end': 37,
          'start': 18,
          'type': 'BlockStatement',
        },
       'end': 37,
        'expression': false,
        'generator': false,
        'id': {
          'end': 16,
          'name': 'f',
          'start': 15,
          'type': 'Identifier',
        },
        'params': [],
        'start': 0,
        'type': 'FunctionDeclaration',
      },
    ],
   'end': 37,
    'sourceType': 'script',
    'start': 0,
    'type': 'Program',
  }],
/*['async () => await x', 'async () => await x', Context.OptionsRanges, {}],
['async () => await x', 'async () => await x', Context.OptionsRanges, {}],
['async () => await x', 'async () => await x', Context.OptionsRanges, {}],
['async () => await x', 'async () => await x', Context.OptionsRanges, {}],
['async () => await x', 'async () => await x', Context.OptionsRanges, {}],
['async () => await x', 'async () => await x', Context.OptionsRanges, {}],
['async () => await x', 'async () => await x', Context.OptionsRanges, {}],
['async () => await x', 'async () => await x', Context.OptionsRanges, {}],
['async () => await x', 'async () => await x', Context.OptionsRanges, {}],
['async () => await x', 'async () => await x', Context.OptionsRanges, {}],*/
];

pass('Expressions - Await (pass)', valids);

});
