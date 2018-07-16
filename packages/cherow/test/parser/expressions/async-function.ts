import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Async function', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['(async function foo(a, b = 39,) { })', '(async function foo(a, b = 39,) { })', Context.OptionsRanges, {
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
                        'name': 'a',
                        'start': 20,
                        'end': 21
                    },
                    {
                        'type': 'AssignmentPattern',
                        'left': {
                            'type': 'Identifier',
                            'name': 'b',
                            'start': 23,
                            'end': 24
                        },
                        'right': {
                            'type': 'Literal',
                            raw: null,
                            'value': 39,
                            'start': 27,
                            'end': 29
                        },
                        'start': 23,
                        'end': 29
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 32,
                    'end': 35
                },
                'async': true,
                'generator': false,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 16,
                    'end': 19
                },
                'start': 1,
                'end': 35
            },
            'start': 0,
            'end': 36
        }
    ],
    'start': 0,
    'end': 36
}],
  ['(async function foo(_ = (function() {}())) { })', '(async function foo(_ = (function() {}())) { })', Context.OptionsRanges, {
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
                            'name': '_',
                            'start': 20,
                            'end': 21
                        },
                        'right': {
                            'type': 'CallExpression',
                            'callee': {
                                'type': 'FunctionExpression',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
                                    'start': 36,
                                    'end': 38
                                },
                                'async': false,
                                'generator': false,
                                'expression': false,
                                'id': null,
                                'start': 25,
                                'end': 38
                            },
                            'arguments': [],
                            'start': 25,
                            'end': 40
                        },
                        'start': 20,
                        'end': 41
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 43,
                    'end': 46
                },
                'async': true,
                'generator': false,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 16,
                    'end': 19
                },
                'start': 1,
                'end': 46
            },
            'start': 0,
            'end': 47
        }
    ],
    'start': 0,
    'end': 47
}],
  ['(async function foo(x = x) { })', '(async function foo(x = x) { })', Context.OptionsRanges, {
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
                            'name': 'x',
                            'start': 20,
                            'end': 21
                        },
                        'right': {
                            'type': 'Identifier',
                            'name': 'x',
                            'start': 24,
                            'end': 25
                        },
                        'start': 20,
                        'end': 25
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 27,
                    'end': 30
                },
                'async': true,
                'generator': false,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 16,
                    'end': 19
                },
                'start': 1,
                'end': 30
            },
            'start': 0,
            'end': 31
        }
    ],
    'start': 0,
    'end': 31
}],
  ['x = async function(a) { await a }', 'x = async function(a) { await a }', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 0,
                    'end': 1
                },
                'operator': '=',
                'right': {
                    'type': 'FunctionExpression',
                    'params': [
                        {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 19,
                            'end': 20
                        }
                    ],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [
                            {
                                'type': 'ExpressionStatement',
                                'expression': {
                                    'type': 'AwaitExpression',
                                    'argument': {
                                        'type': 'Identifier',
                                        'name': 'a',
                                        'start': 30,
                                        'end': 31
                                    },
                                    'start': 24,
                                    'end': 31
                                },
                                'start': 24,
                                'end': 31
                            }
                        ],
                        'start': 22,
                        'end': 33
                    },
                    'async': true,
                    'generator': false,
                    'expression': false,
                    'id': null,
                    'start': 4,
                    'end': 33
                },
                'start': 0,
                'end': 33
            },
            'start': 0,
            'end': 33
        }
    ],
    'start': 0,
    'end': 33
}],
  ['async function foo(a = async () => await b) {}', 'async function foo(a = async () => await b) {}', Context.OptionsRanges, {
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
                        'name': 'a',
                        'start': 19,
                        'end': 20
                    },
                    'right': {
                        'type': 'ArrowFunctionExpression',
                        'body': {
                            'type': 'AwaitExpression',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'b',
                                'start': 41,
                                'end': 42
                            },
                            'start': 35,
                            'end': 42
                        },
                        'params': [],
                        'id': null,
                        'async': true,
                        'generator': false,
                        'expression': true,
                        'start': 23,
                        'end': 42
                    },
                    'start': 19,
                    'end': 42
                }
            ],
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 44,
                'end': 46
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 15,
                'end': 18
            },
            'start': 0,
            'end': 46
        }
    ],
    'start': 0,
    'end': 46
}],
  ['f(async function(x) { await x })', 'f(async function(x) { await x })', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 0,
                    'end': 1
                },
                'arguments': [
                    {
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
                            'body': [
                                {
                                    'type': 'ExpressionStatement',
                                    'expression': {
                                        'type': 'AwaitExpression',
                                        'argument': {
                                            'type': 'Identifier',
                                            'name': 'x',
                                            'start': 28,
                                            'end': 29
                                        },
                                        'start': 22,
                                        'end': 29
                                    },
                                    'start': 22,
                                    'end': 29
                                }
                            ],
                            'start': 20,
                            'end': 31
                        },
                        'async': true,
                        'generator': false,
                        'expression': false,
                        'id': null,
                        'start': 2,
                        'end': 31
                    }
                ],
                'start': 0,
                'end': 32
            },
            'start': 0,
            'end': 32
        }
    ],
    'start': 0,
    'end': 32
}],
  ['async function foo(a = class {async bar() { await b }}) {}', 'async function foo(a = class {async bar() { await b }}) {}', Context.OptionsRanges, {
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
                        'name': 'a',
                        'start': 19,
                        'end': 20
                    },
                    'right': {
                        'type': 'ClassExpression',
                        'id': null,
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
                                        'start': 36,
                                        'end': 39
                                    },
                                    'value': {
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
                                                            'name': 'b',
                                                            'start': 50,
                                                            'end': 51
                                                        },
                                                        'start': 44,
                                                        'end': 51
                                                    },
                                                    'start': 44,
                                                    'end': 51
                                                }
                                            ],
                                            'start': 42,
                                            'end': 53
                                        },
                                        'async': true,
                                        'generator': false,
                                        'expression': false,
                                        'id': null,
                                        'start': 39,
                                        'end': 53
                                    },
                                    'start': 30,
                                    'end': 53
                                }
                            ],
                            'start': 29,
                            'end': 54
                        },
                        'start': 23,
                        'end': 54
                    },
                    'start': 19,
                    'end': 54
                }
            ],
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 56,
                'end': 58
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 15,
                'end': 18
            },
            'start': 0,
            'end': 58
        }
    ],
    'start': 0,
    'end': 58
}],
  ['(function f() { ({ async [yield]() {} }); })', '(function f() { ({ async [yield]() {} }); })', Context.OptionsRanges, {
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
                                'type': 'ObjectExpression',
                                'properties': [
                                    {
                                        'type': 'Property',
                                        'key': {
                                            'type': 'Identifier',
                                            'name': 'yield',
                                            'start': 26,
                                            'end': 31
                                        },
                                        'value': {
                                            'type': 'FunctionExpression',
                                            'params': [],
                                            'body': {
                                                'type': 'BlockStatement',
                                                'body': [],
                                                'start': 35,
                                                'end': 37
                                            },
                                            'async': true,
                                            'generator': false,
                                            'expression': false,
                                            'id': null,
                                            'start': 32,
                                            'end': 37
                                        },
                                        'kind': 'init',
                                        'computed': false,
                                        'method': true,
                                        'shorthand': false,
                                        'start': 19,
                                        'end': 37
                                    }
                                ],
                                'start': 17,
                                'end': 39
                            },
                            'start': 16,
                            'end': 41
                        }
                    ],
                    'start': 14,
                    'end': 43
                },
                'async': false,
                'generator': false,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 10,
                    'end': 11
                },
                'start': 1,
                'end': 43
            },
            'start': 0,
            'end': 44
        }
    ],
    'start': 0,
    'end': 44
}],
  ['(async function foo() { }.prototype)', '(async function foo() { }.prototype)', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'MemberExpression',
                'object': {
                    'type': 'FunctionExpression',
                    'params': [],
                    'body': {
                        'type': 'BlockStatement',
                        'body': [],
                        'start': 22,
                        'end': 25
                    },
                    'async': true,
                    'generator': false,
                    'expression': false,
                    'id': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 16,
                        'end': 19
                    },
                    'start': 1,
                    'end': 25
                },
                'computed': false,
                'property': {
                    'type': 'Identifier',
                    'name': 'prototype',
                    'start': 26,
                    'end': 35
                },
                'start': 1,
                'end': 35
            },
            'start': 0,
            'end': 36
        }
    ],
    'start': 0,
    'end': 36
}],
  ['f(async function(x) { await x })', 'f(async function(x) { await x })', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 0,
                    'end': 1
                },
                'arguments': [
                    {
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
                            'body': [
                                {
                                    'type': 'ExpressionStatement',
                                    'expression': {
                                        'type': 'AwaitExpression',
                                        'argument': {
                                            'type': 'Identifier',
                                            'name': 'x',
                                            'start': 28,
                                            'end': 29
                                        },
                                        'start': 22,
                                        'end': 29
                                    },
                                    'start': 22,
                                    'end': 29
                                }
                            ],
                            'start': 20,
                            'end': 31
                        },
                        'async': true,
                        'generator': false,
                        'expression': false,
                        'id': null,
                        'start': 2,
                        'end': 31
                    }
                ],
                'start': 0,
                'end': 32
            },
            'start': 0,
            'end': 32
        }
    ],
    'start': 0,
    'end': 32
}],
  ['f(b, async function(b) { await b }, c)', 'f(b, async function(b) { await b }, c)', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'f',
                    'start': 0,
                    'end': 1
                },
                'arguments': [
                    {
                        'type': 'Identifier',
                        'name': 'b',
                        'start': 2,
                        'end': 3
                    },
                    {
                        'type': 'FunctionExpression',
                        'params': [
                            {
                                'type': 'Identifier',
                                'name': 'b',
                                'start': 20,
                                'end': 21
                            }
                        ],
                        'body': {
                            'type': 'BlockStatement',
                            'body': [
                                {
                                    'type': 'ExpressionStatement',
                                    'expression': {
                                        'type': 'AwaitExpression',
                                        'argument': {
                                            'type': 'Identifier',
                                            'name': 'b',
                                            'start': 31,
                                            'end': 32
                                        },
                                        'start': 25,
                                        'end': 32
                                    },
                                    'start': 25,
                                    'end': 32
                                }
                            ],
                            'start': 23,
                            'end': 34
                        },
                        'async': true,
                        'generator': false,
                        'expression': false,
                        'id': null,
                        'start': 5,
                        'end': 34
                    },
                    {
                        'type': 'Identifier',
                        'name': 'c',
                        'start': 36,
                        'end': 37
                    }
                ],
                'start': 0,
                'end': 38
            },
            'start': 0,
            'end': 38
        }
    ],
    'start': 0,
    'end': 38
}],
  ['(async function gpig(a, b) {})', '(async function gpig(a, b) {})', Context.OptionsRanges, {
    'type': 'Program',
    'start': 0,
    'end': 30,
    'body': [
      {
        'type': 'ExpressionStatement',
        'start': 0,
        'end': 30,
        'expression': {
          'type': 'FunctionExpression',
          'start': 1,
          'end': 29,
          'id': {
            'type': 'Identifier',
            'start': 16,
            'end': 20,
            'name': 'gpig'
          },
          'generator': false,
          'expression': false,
          'async': true,
          'params': [
            {
              'type': 'Identifier',
              'start': 21,
              'end': 22,
              'name': 'a'
            },
            {
              'type': 'Identifier',
              'start': 24,
              'end': 25,
              'name': 'b'
            }
          ],
          'body': {
            'type': 'BlockStatement',
            'start': 27,
            'end': 29,
            'body': []
          }
        }
      }
    ],
    'sourceType': 'script'
  }],
  ['(async function gpig() {})', '(async function gpig() {})', Context.OptionsRanges, {
    'type': 'Program',
    'start': 0,
    'end': 26,
    'body': [
      {
        'type': 'ExpressionStatement',
        'start': 0,
        'end': 26,
        'expression': {
          'type': 'FunctionExpression',
          'start': 1,
          'end': 25,
          'id': {
            'type': 'Identifier',
            'start': 16,
            'end': 20,
            'name': 'gpig'
          },
          'generator': false,
          'expression': false,
          'async': true,
          'params': [],
          'body': {
            'type': 'BlockStatement',
            'start': 23,
            'end': 25,
            'body': []
          }
        }
      }
    ],
    'sourceType': 'script'
  }]
];

pass('Expressions - Async function (pass)', valids);

});
