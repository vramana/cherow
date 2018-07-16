import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Object literal', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['const descKeywordTable = { implements: 16484 /* ImplementsKeyword */, }', 'const descKeywordTable = { implements: 16484 /* ImplementsKeyword */, }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'VariableDeclaration',
            'kind': 'const',
            'declarations': [
                {
                    'type': 'VariableDeclarator',
                    'init': {
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'implements',
                                    'start': 27,
                                    'end': 37,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 27
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 37
                                        }
                                    }
                                },
                                'value': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 16484,
                                    'start': 39,
                                    'end': 44,
                                    'loc': {
                                        'start': {
                                            'line': 1,
                                            'column': 39
                                        },
                                        'end': {
                                            'line': 1,
                                            'column': 44
                                        }
                                    }
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 27,
                                'end': 44,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 27
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 44
                                    }
                                }
                            }
                        ],
                        'start': 25,
                        'end': 71,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 25
                            },
                            'end': {
                                'line': 1,
                                'column': 71
                            }
                        }
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'descKeywordTable',
                        'start': 6,
                        'end': 22,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 6
                            },
                            'end': {
                                'line': 1,
                                'column': 22
                            }
                        }
                    },
                    'start': 6,
                    'end': 71,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 6
                        },
                        'end': {
                            'line': 1,
                            'column': 71
                        }
                    }
                }
            ],
            'start': 0,
            'end': 71,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 71
                }
            }
        }
    ],
    'start': 0,
    'end': 71,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 71
        }
    }
}],
  ['({ default: obj })', '({ default: obj })', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
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
                            'name': 'default',
                            'start': 3,
                            'end': 10,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 3
                                },
                                'end': {
                                    'line': 1,
                                    'column': 10
                                }
                            }
                        },
                        'value': {
                            'type': 'Identifier',
                            'name': 'obj',
                            'start': 12,
                            'end': 15,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 12
                                },
                                'end': {
                                    'line': 1,
                                    'column': 15
                                }
                            }
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false,
                        'start': 3,
                        'end': 15,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 3
                            },
                            'end': {
                                'line': 1,
                                'column': 15
                            }
                        }
                    }
                ],
                'start': 1,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 1
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            },
            'start': 0,
            'end': 18,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 18
                }
            }
        }
    ],
    'start': 0,
    'end': 18,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 18
        }
    }
}],
  ['({*[a](){}})', '({*[a](){}})', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
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
                            'name': 'a',
                            'start': 4,
                            'end': 5
                        },
                        'value': {
                            'type': 'FunctionExpression',
                            'params': [],
                            'body': {
                                'type': 'BlockStatement',
                                'body': [],
                                'start': 8,
                                'end': 10
                            },
                            'async': false,
                            'generator': true,
                            'expression': false,
                            'id': null,
                            'start': 6,
                            'end': 10
                        },
                        'kind': 'init',
                        'computed': true,
                        'method': true,
                        'shorthand': false,
                        'start': 2,
                        'end': 10
                    }
                ],
                'start': 1,
                'end': 11
            },
            'start': 0,
            'end': 12
        }
    ],
    'start': 0,
    'end': 12
}],
  ['({foo: typeof /x/});', '({foo: typeof /x/});', Context.OptionsRanges, {
      'body': [
        {
          'end': 20,
          'expression': {
            'end': 18,
            'properties': [
              {
               'computed': false,
                'end': 17,
                'key': {
                  'end': 5,
                  'name': 'foo',
                  'start': 2,
                  'type': 'Identifier',
                },
                'kind': 'init',
                'method': false,
                'shorthand': false,
                'start': 2,
                'type': 'Property',
                'value': {
                  'argument': {
                    'end': 17,
                    'regex': {
                      'flags': '',
                     'pattern': 'x',
                    },
                    'start': 14,
                    'type': 'Literal',
                    'value': /x/,
                  },
                  'end': 17,
                  'operator': 'typeof',
                  'prefix': true,
                  'start': 7,
                  'type': 'UnaryExpression',
                },
              },
            ],
            'start': 1,
            'type': 'ObjectExpression',
          },
          'start': 0,
          'type': 'ExpressionStatement',
        },
      ],
      'end': 20,
      'sourceType': 'script',
      'start': 0,
      'type': 'Program',
    }],
  ['foo = {[a]:b=x}', 'foo = {[a]:b=x}', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'operator': '=',
                'right': {
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 8,
                                'end': 9
                            },
                            'value': {
                                'type': 'AssignmentExpression',
                                'left': {
                                    'type': 'Identifier',
                                    'name': 'b',
                                    'start': 11,
                                    'end': 12
                                },
                                'operator': '=',
                                'right': {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 13,
                                    'end': 14
                                },
                                'start': 11,
                                'end': 14
                            },
                            'kind': 'init',
                            'computed': true,
                            'method': false,
                            'shorthand': false,
                            'start': 7,
                            'end': 14
                        }
                    ],
                    'start': 6,
                    'end': 15
                },
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
  ['foo = {set [a](x){}}', 'foo = {set [a](x){}}', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'operator': '=',
                'right': {
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 12,
                                'end': 13
                            },
                            'value': {
                                'type': 'FunctionExpression',
                                'params': [
                                    {
                                        'type': 'Identifier',
                                        'name': 'x',
                                        'start': 15,
                                        'end': 16
                                    }
                                ],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
                                    'start': 17,
                                    'end': 19
                                },
                                'async': false,
                                'generator': false,
                                'expression': false,
                                'id': null,
                                'start': 14,
                                'end': 19
                            },
                            'kind': 'set',
                            'computed': false,
                            'method': false,
                            'shorthand': false,
                            'start': 7,
                            'end': 19
                        }
                    ],
                    'start': 6,
                    'end': 20
                },
                'start': 0,
                'end': 20
            },
            'start': 0,
            'end': 20
        }
    ],
    'start': 0,
    'end': 20
}],
  ['foo = {async a(){}}', 'foo = {async a(){}}', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'operator': '=',
                'right': {
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 13,
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
                                'async': true,
                                'generator': false,
                                'expression': false,
                                'id': null,
                                'start': 14,
                                'end': 18
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': true,
                            'shorthand': false,
                            'start': 7,
                            'end': 18
                        }
                    ],
                    'start': 6,
                    'end': 19
                },
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
  ['foo = {async *a(){}}', 'foo = {async *a(){}}', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'operator': '=',
                'right': {
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 14,
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
                                'async': true,
                                'generator': true,
                                'expression': false,
                                'id': null,
                                'start': 15,
                                'end': 19
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': true,
                            'shorthand': false,
                            'start': 7,
                            'end': 19
                        }
                    ],
                    'start': 6,
                    'end': 20
                },
                'start': 0,
                'end': 20
            },
            'start': 0,
            'end': 20
        }
    ],
    'start': 0,
    'end': 20
}],
  ['foo = {get [a](){}}', 'foo = {get [a](){}}', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'operator': '=',
                'right': {
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 12,
                                'end': 13
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
                                'generator': false,
                                'expression': false,
                                'id': null,
                                'start': 14,
                                'end': 18
                            },
                            'kind': 'get',
                            'computed': false,
                            'method': false,
                            'shorthand': false,
                            'start': 7,
                            'end': 18
                        }
                    ],
                    'start': 6,
                    'end': 19
                },
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
  ['foo = {get a(){}}', 'foo = {get a(){}}', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'operator': '=',
                'right': {
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 11,
                                'end': 12
                            },
                            'value': {
                                'type': 'FunctionExpression',
                                'params': [],
                                'body': {
                                    'type': 'BlockStatement',
                                    'body': [],
                                    'start': 14,
                                    'end': 16
                                },
                                'async': false,
                                'generator': false,
                                'expression': false,
                                'id': null,
                                'start': 12,
                                'end': 16
                            },
                            'kind': 'get',
                            'computed': false,
                            'method': false,
                            'shorthand': false,
                            'start': 7,
                            'end': 16
                        }
                    ],
                    'start': 6,
                    'end': 17
                },
                'start': 0,
                'end': 17
            },
            'start': 0,
            'end': 17
        }
    ],
    'start': 0,
    'end': 17
}],
  ['foo = {async [a](){}}', 'foo = {async [a](){}}', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'operator': '=',
                'right': {
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 14,
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
                                'async': true,
                                'generator': false,
                                'expression': false,
                                'id': null,
                                'start': 16,
                                'end': 20
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': true,
                            'shorthand': false,
                            'start': 7,
                            'end': 20
                        }
                    ],
                    'start': 6,
                    'end': 21
                },
                'start': 0,
                'end': 21
            },
            'start': 0,
            'end': 21
        }
    ],
    'start': 0,
    'end': 21
}],
  ['foo = { async }', 'foo = { async }', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'operator': '=',
                'right': {
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'async',
                                'start': 8,
                                'end': 13
                            },
                            'value': {
                                'type': 'Identifier',
                                'name': 'async',
                                'start': 8,
                                'end': 13
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': false,
                            'shorthand': true,
                            'start': 8,
                            'end': 13
                        }
                    ],
                    'start': 6,
                    'end': 15
                },
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
  ['foo = { async: bar }', 'foo = { async: bar }', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'operator': '=',
                'right': {
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'async',
                                'start': 8,
                                'end': 13
                            },
                            'value': {
                                'type': 'Identifier',
                                'name': 'bar',
                                'start': 15,
                                'end': 18
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': false,
                            'shorthand': false,
                            'start': 8,
                            'end': 18
                        }
                    ],
                    'start': 6,
                    'end': 20
                },
                'start': 0,
                'end': 20
            },
            'start': 0,
            'end': 20
        }
    ],
    'start': 0,
    'end': 20
}],
  ['foo = { aync, get, set }', 'foo = { aync, get, set }', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'operator': '=',
                'right': {
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'aync',
                                'start': 8,
                                'end': 12
                            },
                            'value': {
                                'type': 'Identifier',
                                'name': 'aync',
                                'start': 8,
                                'end': 12
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': false,
                            'shorthand': true,
                            'start': 8,
                            'end': 12
                        },
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'get',
                                'start': 14,
                                'end': 17
                            },
                            'value': {
                                'type': 'Identifier',
                                'name': 'get',
                                'start': 14,
                                'end': 17
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': false,
                            'shorthand': true,
                            'start': 14,
                            'end': 17
                        },
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'set',
                                'start': 19,
                                'end': 22
                            },
                            'value': {
                                'type': 'Identifier',
                                'name': 'set',
                                'start': 19,
                                'end': 22
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': false,
                            'shorthand': true,
                            'start': 19,
                            'end': 22
                        }
                    ],
                    'start': 6,
                    'end': 24
                },
                'start': 0,
                'end': 24
            },
            'start': 0,
            'end': 24
        }
    ],
    'start': 0,
    'end': 24
}],
  ['foo = { a, b, c }', 'foo = { a, b, c }', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'AssignmentExpression',
                'left': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'operator': '=',
                'right': {
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 8,
                                'end': 9
                            },
                            'value': {
                                'type': 'Identifier',
                                'name': 'a',
                                'start': 8,
                                'end': 9
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': false,
                            'shorthand': true,
                            'start': 8,
                            'end': 9
                        },
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'b',
                                'start': 11,
                                'end': 12
                            },
                            'value': {
                                'type': 'Identifier',
                                'name': 'b',
                                'start': 11,
                                'end': 12
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': false,
                            'shorthand': true,
                            'start': 11,
                            'end': 12
                        },
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'c',
                                'start': 14,
                                'end': 15
                            },
                            'value': {
                                'type': 'Identifier',
                                'name': 'c',
                                'start': 14,
                                'end': 15
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': false,
                            'shorthand': true,
                            'start': 14,
                            'end': 15
                        }
                    ],
                    'start': 6,
                    'end': 17
                },
                'start': 0,
                'end': 17
            },
            'start': 0,
            'end': 17
        }
    ],
    'start': 0,
    'end': 17
}],
  ['({*a() {}});', '({*a() {}});', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
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
                            'name': 'a',
                            'start': 3,
                            'end': 4
                        },
                        'value': {
                            'type': 'FunctionExpression',
                            'params': [],
                            'body': {
                                'type': 'BlockStatement',
                                'body': [],
                                'start': 7,
                                'end': 9
                            },
                            'async': false,
                            'generator': true,
                            'expression': false,
                            'id': null,
                            'start': 4,
                            'end': 9
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': true,
                        'shorthand': false,
                        'start': 2,
                        'end': 9
                    }
                ],
                'start': 1,
                'end': 10
            },
            'start': 0,
            'end': 12
        }
    ],
    'start': 0,
    'end': 12
}],
  ['foo({a});', 'foo({a});', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'arguments': [
                    {
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'a',
                                    'start': 5,
                                    'end': 6
                                },
                                'value': {
                                    'type': 'Identifier',
                                    'name': 'a',
                                    'start': 5,
                                    'end': 6
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': true,
                                'start': 5,
                                'end': 6
                            }
                        ],
                        'start': 4,
                        'end': 7
                    }
                ],
                'start': 0,
                'end': 8
            },
            'start': 0,
            'end': 9
        }
    ],
    'start': 0,
    'end': 9
}],
['foo({async});', 'foo({async});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'async',
                                  'start': 5,
                                  'end': 10
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'async',
                                  'start': 5,
                                  'end': 10
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': true,
                              'start': 5,
                              'end': 10
                          }
                      ],
                      'start': 4,
                      'end': 11
                  }
              ],
              'start': 0,
              'end': 12
          },
          'start': 0,
          'end': 13
      }
  ],
  'start': 0,
  'end': 13
}],
['foo({get} = x);', 'foo({get} = x);', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'AssignmentExpression',
                      'left': {
                          'type': 'ObjectPattern',
                          'properties': [
                              {
                                  'type': 'Property',
                                  'key': {
                                      'type': 'Identifier',
                                      'name': 'get',
                                      'start': 5,
                                      'end': 8
                                  },
                                  'value': {
                                      'type': 'Identifier',
                                      'name': 'get',
                                      'start': 5,
                                      'end': 8
                                  },
                                  'kind': 'init',
                                  'computed': false,
                                  'method': false,
                                  'shorthand': true,
                                  'start': 5,
                                  'end': 8
                              }
                          ],
                          'start': 4,
                          'end': 9
                      },
                      'operator': '=',
                      'right': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 12,
                          'end': 13
                      },
                      'start': 4,
                      'end': 13
                  }
              ],
              'start': 0,
              'end': 14
          },
          'start': 0,
          'end': 15
      }
  ],
  'start': 0,
  'end': 15
}],
['foo({async} = x);', 'foo({async} = x);', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 0,
                    'end': 3
                },
                'arguments': [
                    {
                        'type': 'AssignmentExpression',
                        'left': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'async',
                                        'start': 5,
                                        'end': 10
                                    },
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'async',
                                        'start': 5,
                                        'end': 10
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': true,
                                    'start': 5,
                                    'end': 10
                                }
                            ],
                            'start': 4,
                            'end': 11
                        },
                        'operator': '=',
                        'right': {
                            'type': 'Identifier',
                            'name': 'x',
                            'start': 14,
                            'end': 15
                        },
                        'start': 4,
                        'end': 15
                    }
                ],
                'start': 0,
                'end': 16
            },
            'start': 0,
            'end': 17
        }
    ],
    'start': 0,
    'end': 17
}],
['foo({a:b});', 'foo({a:b});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 5,
                                  'end': 6
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 7,
                                  'end': 8
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 5,
                              'end': 8
                          }
                      ],
                      'start': 4,
                      'end': 9
                  }
              ],
              'start': 0,
              'end': 10
          },
          'start': 0,
          'end': 11
      }
  ],
  'start': 0,
  'end': 11
}],
['foo({get:b});', 'foo({get:b});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'get',
                                  'start': 5,
                                  'end': 8
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 9,
                                  'end': 10
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 5,
                              'end': 10
                          }
                      ],
                      'start': 4,
                      'end': 11
                  }
              ],
              'start': 0,
              'end': 12
          },
          'start': 0,
          'end': 13
      }
  ],
  'start': 0,
  'end': 13
}],
['foo({async:b});', 'foo({async:b});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'async',
                                  'start': 5,
                                  'end': 10
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 11,
                                  'end': 12
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 5,
                              'end': 12
                          }
                      ],
                      'start': 4,
                      'end': 13
                  }
              ],
              'start': 0,
              'end': 14
          },
          'start': 0,
          'end': 15
      }
  ],
  'start': 0,
  'end': 15
}],
['foo({a, b} = x);', 'foo({a, b} = x);', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'AssignmentExpression',
                      'left': {
                          'type': 'ObjectPattern',
                          'properties': [
                              {
                                  'type': 'Property',
                                  'key': {
                                      'type': 'Identifier',
                                      'name': 'a',
                                      'start': 5,
                                      'end': 6
                                  },
                                  'value': {
                                      'type': 'Identifier',
                                      'name': 'a',
                                      'start': 5,
                                      'end': 6
                                  },
                                  'kind': 'init',
                                  'computed': false,
                                  'method': false,
                                  'shorthand': true,
                                  'start': 5,
                                  'end': 6
                              },
                              {
                                  'type': 'Property',
                                  'key': {
                                      'type': 'Identifier',
                                      'name': 'b',
                                      'start': 8,
                                      'end': 9
                                  },
                                  'value': {
                                      'type': 'Identifier',
                                      'name': 'b',
                                      'start': 8,
                                      'end': 9
                                  },
                                  'kind': 'init',
                                  'computed': false,
                                  'method': false,
                                  'shorthand': true,
                                  'start': 8,
                                  'end': 9
                              }
                          ],
                          'start': 4,
                          'end': 10
                      },
                      'operator': '=',
                      'right': {
                          'type': 'Identifier',
                          'name': 'x',
                          'start': 13,
                          'end': 14
                      },
                      'start': 4,
                      'end': 14
                  }
              ],
              'start': 0,
              'end': 15
          },
          'start': 0,
          'end': 16
      }
  ],
  'start': 0,
  'end': 16
}],
['foo({a:b, c:d});', 'foo({a:b, c:d});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 5,
                                  'end': 6
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 7,
                                  'end': 8
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 5,
                              'end': 8
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'c',
                                  'start': 10,
                                  'end': 11
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'd',
                                  'start': 12,
                                  'end': 13
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 10,
                              'end': 13
                          }
                      ],
                      'start': 4,
                      'end': 14
                  }
              ],
              'start': 0,
              'end': 15
          },
          'start': 0,
          'end': 16
      }
  ],
  'start': 0,
  'end': 16
}],
['foo({15:b});', 'foo({15:b});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 15,
                                  'start': 5,
                                  'end': 7
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 8,
                                  'end': 9
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 5,
                              'end': 9
                          }
                      ],
                      'start': 4,
                      'end': 10
                  }
              ],
              'start': 0,
              'end': 11
          },
          'start': 0,
          'end': 12
      }
  ],
  'start': 0,
  'end': 12
}],
// ['foo({.9:a, 0x84:b, 0b1:c, 0o27:d, 1e234:e});', 'foo({.9:a, 0x84:b, 0b1:c, 0o27:d, 1e234:e});', Context.OptionsRanges, {}],
['foo({[a]:b});', 'foo({[a]:b});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 6,
                                  'end': 7
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 9,
                                  'end': 10
                              },
                              'kind': 'init',
                              'computed': true,
                              'method': false,
                              'shorthand': false,
                              'start': 5,
                              'end': 10
                          }
                      ],
                      'start': 4,
                      'end': 11
                  }
              ],
              'start': 0,
              'end': 12
          },
          'start': 0,
          'end': 13
      }
  ],
  'start': 0,
  'end': 13
}],

['foo({[a]:b, [15]:d});', 'foo({[a]:b, [15]:d});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'a',
                                  'start': 6,
                                  'end': 7
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 9,
                                  'end': 10
                              },
                              'kind': 'init',
                              'computed': true,
                              'method': false,
                              'shorthand': false,
                              'start': 5,
                              'end': 10
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 15,
                                  'start': 13,
                                  'end': 15
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'd',
                                  'start': 17,
                                  'end': 18
                              },
                              'kind': 'init',
                              'computed': true,
                              'method': false,
                              'shorthand': false,
                              'start': 12,
                              'end': 18
                          }
                      ],
                      'start': 4,
                      'end': 19
                  }
              ],
              'start': 0,
              'end': 20
          },
          'start': 0,
          'end': 21
      }
  ],
  'start': 0,
  'end': 21
}],
 ['foo({foo(){}});', 'foo({foo(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 5,
                                  'end': 8
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 10,
                                      'end': 12
                                  },
                                  'async': false,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 8,
                                  'end': 12
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 5,
                              'end': 12
                          }
                      ],
                      'start': 4,
                      'end': 13
                  }
              ],
              'start': 0,
              'end': 14
          },
          'start': 0,
          'end': 15
      }
  ],
  'start': 0,
  'end': 15
}],
 ['foo({"foo"(){}});', 'foo({"foo"(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 'foo',
                                  'start': 5,
                                  'end': 10
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 12,
                                      'end': 14
                                  },
                                  'async': false,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 10,
                                  'end': 14
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 5,
                              'end': 14
                          }
                      ],
                      'start': 4,
                      'end': 15
                  }
              ],
              'start': 0,
              'end': 16
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
 ['foo({async get(){}});', 'foo({async get(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'get',
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
                                  'async': true,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 14,
                                  'end': 18
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 5,
                              'end': 18
                          }
                      ],
                      'start': 4,
                      'end': 19
                  }
              ],
              'start': 0,
              'end': 20
          },
          'start': 0,
          'end': 21
      }
  ],
  'start': 0,
  'end': 21
}],
 ['foo({async async(){}});', 'foo({async async(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'async',
                                  'start': 11,
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
                                  'async': true,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 16,
                                  'end': 20
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 5,
                              'end': 20
                          }
                      ],
                      'start': 4,
                      'end': 21
                  }
              ],
              'start': 0,
              'end': 22
          },
          'start': 0,
          'end': 23
      }
  ],
  'start': 0,
  'end': 23
}],
 ['wrap({async "foo"(){}});', 'wrap({async "foo"(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 'foo',
                                  'start': 12,
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
                                  'async': true,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 17,
                                  'end': 21
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 21
                          }
                      ],
                      'start': 5,
                      'end': 22
                  }
              ],
              'start': 0,
              'end': 23
          },
          'start': 0,
          'end': 24
      }
  ],
  'start': 0,
  'end': 24
}],
 ['wrap({async 100(){}});', 'wrap({async 100(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 100,
                                  'start': 12,
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
                                  'async': true,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 15,
                                  'end': 19
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 19
                          }
                      ],
                      'start': 5,
                      'end': 20
                  }
              ],
              'start': 0,
              'end': 21
          },
          'start': 0,
          'end': 22
      }
  ],
  'start': 0,
  'end': 22
}],
 ['wrap({async [foo](){}});', 'wrap({async [foo](){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
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
                                      'start': 19,
                                      'end': 21
                                  },
                                  'async': true,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 17,
                                  'end': 21
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 21
                          }
                      ],
                      'start': 5,
                      'end': 22
                  }
              ],
              'start': 0,
              'end': 23
          },
          'start': 0,
          'end': 24
      }
  ],
  'start': 0,
  'end': 24
}],
 ['wrap({async foo(){}, async bar(){}});', 'wrap({async foo(){}, async bar(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
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
                                      'start': 17,
                                      'end': 19
                                  },
                                  'async': true,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 15,
                                  'end': 19
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 19
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 27,
                                  'end': 30
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 32,
                                      'end': 34
                                  },
                                  'async': true,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 30,
                                  'end': 34
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 21,
                              'end': 34
                          }
                      ],
                      'start': 5,
                      'end': 35
                  }
              ],
              'start': 0,
              'end': 36
          },
          'start': 0,
          'end': 37
      }
  ],
  'start': 0,
  'end': 37
}],
 ['wrap({async foo(){}, bar(){}});', 'wrap({async foo(){}, bar(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
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
                                      'start': 17,
                                      'end': 19
                                  },
                                  'async': true,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 15,
                                  'end': 19
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 19
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 21,
                                  'end': 24
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 26,
                                      'end': 28
                                  },
                                  'async': false,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 24,
                                  'end': 28
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 21,
                              'end': 28
                          }
                      ],
                      'start': 5,
                      'end': 29
                  }
              ],
              'start': 0,
              'end': 30
          },
          'start': 0,
          'end': 31
      }
  ],
  'start': 0,
  'end': 31
}],
 ['wrap({*foo(){}});', 'wrap({*foo(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 7,
                                  'end': 10
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 12,
                                      'end': 14
                                  },
                                  'async': false,
                                  'generator': true,
                                  'expression': false,
                                  'id': null,
                                  'start': 10,
                                  'end': 14
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 14
                          }
                      ],
                      'start': 5,
                      'end': 15
                  }
              ],
              'start': 0,
              'end': 16
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
 ['wrap({*get(){}});', 'wrap({*get(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'get',
                                  'start': 7,
                                  'end': 10
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 12,
                                      'end': 14
                                  },
                                  'async': false,
                                  'generator': true,
                                  'expression': false,
                                  'id': null,
                                  'start': 10,
                                  'end': 14
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 14
                          }
                      ],
                      'start': 5,
                      'end': 15
                  }
              ],
              'start': 0,
              'end': 16
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
 ['wrap({*async(){}});', 'wrap({*async(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'async',
                                  'start': 7,
                                  'end': 12
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 14,
                                      'end': 16
                                  },
                                  'async': false,
                                  'generator': true,
                                  'expression': false,
                                  'id': null,
                                  'start': 12,
                                  'end': 16
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 16
                          }
                      ],
                      'start': 5,
                      'end': 17
                  }
              ],
              'start': 0,
              'end': 18
          },
          'start': 0,
          'end': 19
      }
  ],
  'start': 0,
  'end': 19
}],
 ['wrap({*"foo"(){}});', 'wrap({*"foo"(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 'foo',
                                  'start': 7,
                                  'end': 12
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 14,
                                      'end': 16
                                  },
                                  'async': false,
                                  'generator': true,
                                  'expression': false,
                                  'id': null,
                                  'start': 12,
                                  'end': 16
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 16
                          }
                      ],
                      'start': 5,
                      'end': 17
                  }
              ],
              'start': 0,
              'end': 18
          },
          'start': 0,
          'end': 19
      }
  ],
  'start': 0,
  'end': 19
}],
['wrap({*123(){}});', 'wrap({*123(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 123,
                                  'start': 7,
                                  'end': 10
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 12,
                                      'end': 14
                                  },
                                  'async': false,
                                  'generator': true,
                                  'expression': false,
                                  'id': null,
                                  'start': 10,
                                  'end': 14
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 14
                          }
                      ],
                      'start': 5,
                      'end': 15
                  }
              ],
              'start': 0,
              'end': 16
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
 ['fkleuver({*[foo](){}});', 'fkleuver({*[foo](){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'fkleuver',
                  'start': 0,
                  'end': 8
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
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
                              'kind': 'init',
                              'computed': true,
                              'method': true,
                              'shorthand': false,
                              'start': 10,
                              'end': 20
                          }
                      ],
                      'start': 9,
                      'end': 21
                  }
              ],
              'start': 0,
              'end': 22
          },
          'start': 0,
          'end': 23
      }
  ],
  'start': 0,
  'end': 23
}],
 ['wrap({* foo(){},*bar(){}});', 'wrap({* foo(){},*bar(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 8,
                                  'end': 11
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 13,
                                      'end': 15
                                  },
                                  'async': false,
                                  'generator': true,
                                  'expression': false,
                                  'id': null,
                                  'start': 11,
                                  'end': 15
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 15
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'bar',
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
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 16,
                              'end': 24
                          }
                      ],
                      'start': 5,
                      'end': 25
                  }
              ],
              'start': 0,
              'end': 26
          },
          'start': 0,
          'end': 27
      }
  ],
  'start': 0,
  'end': 27
}],
['wrap({1:b, 0:d});', 'wrap({1:b, 0:d});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 1,
                                  'start': 6,
                                  'end': 7
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 8,
                                  'end': 9
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 6,
                              'end': 9
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 0,
                                  'start': 11,
                                  'end': 12
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'd',
                                  'start': 13,
                                  'end': 14
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 11,
                              'end': 14
                          }
                      ],
                      'start': 5,
                      'end': 15
                  }
              ],
              'start': 0,
              'end': 16
          },
          'start': 0,
          'end': 17
      }
  ],
  'start': 0,
  'end': 17
}],
['wrap({* foo(){}, bar(){}});', 'wrap({* foo(){}, bar(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 8,
                                  'end': 11
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 13,
                                      'end': 15
                                  },
                                  'async': false,
                                  'generator': true,
                                  'expression': false,
                                  'id': null,
                                  'start': 11,
                                  'end': 15
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 15
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'bar',
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
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 20,
                                  'end': 24
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 17,
                              'end': 24
                          }
                      ],
                      'start': 5,
                      'end': 25
                  }
              ],
              'start': 0,
              'end': 26
          },
          'start': 0,
          'end': 27
      }
  ],
  'start': 0,
  'end': 27
}],
['wrap({get foo(){}});', 'wrap({get foo(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
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
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 13,
                                  'end': 17
                              },
                              'kind': 'get',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 6,
                              'end': 17
                          }
                      ],
                      'start': 5,
                      'end': 18
                  }
              ],
              'start': 0,
              'end': 19
          },
          'start': 0,
          'end': 20
      }
  ],
  'start': 0,
  'end': 20
}],
['wrap({get get(){}});', 'wrap({get get(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'get',
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
                              'kind': 'get',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 6,
                              'end': 17
                          }
                      ],
                      'start': 5,
                      'end': 18
                  }
              ],
              'start': 0,
              'end': 19
          },
          'start': 0,
          'end': 20
      }
  ],
  'start': 0,
  'end': 20
}],
['wrap({get foo(){}, get bar(){}});', 'wrap({get foo(){}, get bar(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
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
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 13,
                                  'end': 17
                              },
                              'kind': 'get',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 6,
                              'end': 17
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 23,
                                  'end': 26
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
                              'kind': 'get',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 19,
                              'end': 30
                          }
                      ],
                      'start': 5,
                      'end': 31
                  }
              ],
              'start': 0,
              'end': 32
          },
          'start': 0,
          'end': 33
      }
  ],
  'start': 0,
  'end': 33
}],
['wrap({get foo(){}, bar(){}});', 'wrap({get foo(){}, bar(){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
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
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 13,
                                  'end': 17
                              },
                              'kind': 'get',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 6,
                              'end': 17
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 19,
                                  'end': 22
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 24,
                                      'end': 26
                                  },
                                  'async': false,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 22,
                                  'end': 26
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': true,
                              'shorthand': false,
                              'start': 19,
                              'end': 26
                          }
                      ],
                      'start': 5,
                      'end': 27
                  }
              ],
              'start': 0,
              'end': 28
          },
          'start': 0,
          'end': 29
      }
  ],
  'start': 0,
  'end': 29
}],
['wrap({get [foo](){}});', 'wrap({get [foo](){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
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
                                      'start': 17,
                                      'end': 19
                                  },
                                  'async': false,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 15,
                                  'end': 19
                              },
                              'kind': 'get',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 6,
                              'end': 19
                          }
                      ],
                      'start': 5,
                      'end': 20
                  }
              ],
              'start': 0,
              'end': 21
          },
          'start': 0,
          'end': 22
      }
  ],
  'start': 0,
  'end': 22
}],
['wrap({get [foo](){}, get [bar](){}});', 'wrap({get [foo](){}, get [bar](){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
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
                                      'start': 17,
                                      'end': 19
                                  },
                                  'async': false,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 15,
                                  'end': 19
                              },
                              'kind': 'get',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 6,
                              'end': 19
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 26,
                                  'end': 29
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 32,
                                      'end': 34
                                  },
                                  'async': false,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 30,
                                  'end': 34
                              },
                              'kind': 'get',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 21,
                              'end': 34
                          }
                      ],
                      'start': 5,
                      'end': 35
                  }
              ],
              'start': 0,
              'end': 36
          },
          'start': 0,
          'end': 37
      }
  ],
  'start': 0,
  'end': 37
}],
 ['wrap({set [foo](c){}, [bar](){}});', 'wrap({set [foo](c){}, [bar](){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 11,
                                  'end': 14
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [
                                      {
                                          'type': 'Identifier',
                                          'name': 'c',
                                          'start': 16,
                                          'end': 17
                                      }
                                  ],
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
                                  'start': 15,
                                  'end': 20
                              },
                              'kind': 'set',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 6,
                              'end': 20
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 23,
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
                                  'async': false,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 27,
                                  'end': 31
                              },
                              'kind': 'init',
                              'computed': true,
                              'method': true,
                              'shorthand': false,
                              'start': 22,
                              'end': 31
                          }
                      ],
                      'start': 5,
                      'end': 32
                  }
              ],
              'start': 0,
              'end': 33
          },
          'start': 0,
          'end': 34
      }
  ],
  'start': 0,
  'end': 34
}],
 ['wrap({[foo](){}, set [bar](e){}});', 'wrap({[foo](){}, set [bar](e){}});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'wrap',
                  'start': 0,
                  'end': 4
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'foo',
                                  'start': 7,
                                  'end': 10
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [],
                                  'body': {
                                      'type': 'BlockStatement',
                                      'body': [],
                                      'start': 13,
                                      'end': 15
                                  },
                                  'async': false,
                                  'generator': false,
                                  'expression': false,
                                  'id': null,
                                  'start': 11,
                                  'end': 15
                              },
                              'kind': 'init',
                              'computed': true,
                              'method': true,
                              'shorthand': false,
                              'start': 6,
                              'end': 15
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Identifier',
                                  'name': 'bar',
                                  'start': 22,
                                  'end': 25
                              },
                              'value': {
                                  'type': 'FunctionExpression',
                                  'params': [
                                      {
                                          'type': 'Identifier',
                                          'name': 'e',
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
                              'kind': 'set',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 17,
                              'end': 31
                          }
                      ],
                      'start': 5,
                      'end': 32
                  }
              ],
              'start': 0,
              'end': 33
          },
          'start': 0,
          'end': 34
      }
  ],
  'start': 0,
  'end': 34
}],
['foo({"a":b});', 'foo({"a":b});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 'a',
                                  'start': 5,
                                  'end': 8
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 9,
                                  'end': 10
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 5,
                              'end': 10
                          }
                      ],
                      'start': 4,
                      'end': 11
                  }
              ],
              'start': 0,
              'end': 12
          },
          'start': 0,
          'end': 13
      }
  ],
  'start': 0,
  'end': 13
}],
['foo({"a":b, "c":d});', 'foo({"a":b, "c":d});', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'CallExpression',
              'callee': {
                  'type': 'Identifier',
                  'name': 'foo',
                  'start': 0,
                  'end': 3
              },
              'arguments': [
                  {
                      'type': 'ObjectExpression',
                      'properties': [
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 'a',
                                  'start': 5,
                                  'end': 8
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'b',
                                  'start': 9,
                                  'end': 10
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 5,
                              'end': 10
                          },
                          {
                              'type': 'Property',
                              'key': {
                                  'type': 'Literal',
                                  raw: null,
                                  'value': 'c',
                                  'start': 12,
                                  'end': 15
                              },
                              'value': {
                                  'type': 'Identifier',
                                  'name': 'd',
                                  'start': 16,
                                  'end': 17
                              },
                              'kind': 'init',
                              'computed': false,
                              'method': false,
                              'shorthand': false,
                              'start': 12,
                              'end': 17
                          }
                      ],
                      'start': 4,
                      'end': 18
                  }
              ],
              'start': 0,
              'end': 19
          },
          'start': 0,
          'end': 20
      }
  ],
  'start': 0,
  'end': 20
}],
/*['foo({a});', 'foo({a});', Context.OptionsRanges, {}],
['foo({a});', 'foo({a});', Context.OptionsRanges, {}],
['foo({a});', 'foo({a});', Context.OptionsRanges, {}],*/
  ['({ get foo() {} })', '({ get foo() {} })', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
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
                            'name': 'foo'
                        },
                        'value': {
                            'type': 'FunctionExpression',
                            'params': [],
                            'body': {
                                'type': 'BlockStatement',
                                'body': []
                            },
                            'async': false,
                            'generator': false,
                            'expression': false,
                            'id': null
                        },
                        'kind': 'get',
                        'computed': false,
                        'method': false,
                        'shorthand': false
                    }
                ]
            }
        }
    ]
}],
  ['({ async foo() {} })', '({ async foo() {} })', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
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
                            'name': 'foo'
                        },
                        'value': {
                            'type': 'FunctionExpression',
                            'params': [],
                            'body': {
                                'type': 'BlockStatement',
                                'body': []
                            },
                            'async': true,
                            'generator': false,
                            'expression': false,
                            'id': null
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': true,
                        'shorthand': false
                    }
                ]
            }
        }
    ]
}],
  ['({ foo() {} })', '({ foo() {} })', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
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
                            'name': 'foo'
                        },
                        'value': {
                            'type': 'FunctionExpression',
                            'params': [],
                            'body': {
                                'type': 'BlockStatement',
                                'body': []
                            },
                            'async': false,
                            'generator': false,
                            'expression': false,
                            'id': null
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': true,
                        'shorthand': false
                    }
                ]
            }
        }
    ]
}],
  ['({a: b})', '({a: b})', Context.Empty, {
    'type': 'Program',
    'sourceType': 'script',
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
                            'name': 'a'
                        },
                        'value': {
                            'type': 'Identifier',
                            'name': 'b'
                        },
                        'kind': 'init',
                        'computed': false,
                        'method': false,
                        'shorthand': false
                    }
                ]
            }
        }
    ]
}],
['({"foo":bar})', '({"foo":bar})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ObjectExpression',
              'properties': [
                  {
                      'type': 'Property',
                      'key': {
                          'type': 'Literal',
                          raw: null,
                          'value': 'foo',
                          'start': 2,
                          'end': 7
                      },
                      'value': {
                          'type': 'Identifier',
                          'name': 'bar',
                          'start': 8,
                          'end': 11
                      },
                      'kind': 'init',
                      'computed': false,
                      'method': false,
                      'shorthand': false,
                      'start': 2,
                      'end': 11
                  }
              ],
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
['({1:b})', '({1:b})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
  'body': [
      {
          'type': 'ExpressionStatement',
          'expression': {
              'type': 'ObjectExpression',
              'properties': [
                  {
                      'type': 'Property',
                      'key': {
                          'type': 'Literal',
                          raw: null,
                          'value': 1,
                          'start': 2,
                          'end': 3
                      },
                      'value': {
                          'type': 'Identifier',
                          'name': 'b',
                          'start': 4,
                          'end': 5
                      },
                      'kind': 'init',
                      'computed': false,
                      'method': false,
                      'shorthand': false,
                      'start': 2,
                      'end': 5
                  }
              ],
              'start': 1,
              'end': 6
          },
          'start': 0,
          'end': 7
      }
  ],
  'start': 0,
  'end': 7
}],
['({a, b, c})', '({a, b, c})', Context.OptionsRanges, {
  'type': 'Program',
  'sourceType': 'script',
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
                          'name': 'a',
                          'start': 2,
                          'end': 3
                      },
                      'value': {
                          'type': 'Identifier',
                          'name': 'a',
                          'start': 2,
                          'end': 3
                      },
                      'kind': 'init',
                      'computed': false,
                      'method': false,
                      'shorthand': true,
                      'start': 2,
                      'end': 3
                  },
                  {
                      'type': 'Property',
                      'key': {
                          'type': 'Identifier',
                          'name': 'b',
                          'start': 5,
                          'end': 6
                      },
                      'value': {
                          'type': 'Identifier',
                          'name': 'b',
                          'start': 5,
                          'end': 6
                      },
                      'kind': 'init',
                      'computed': false,
                      'method': false,
                      'shorthand': true,
                      'start': 5,
                      'end': 6
                  },
                  {
                      'type': 'Property',
                      'key': {
                          'type': 'Identifier',
                          'name': 'c',
                          'start': 8,
                          'end': 9
                      },
                      'value': {
                          'type': 'Identifier',
                          'name': 'c',
                          'start': 8,
                          'end': 9
                      },
                      'kind': 'init',
                      'computed': false,
                      'method': false,
                      'shorthand': true,
                      'start': 8,
                      'end': 9
                  }
              ],
              'start': 1,
              'end': 10
          },
          'start': 0,
          'end': 11
      }
  ],
  'start': 0,
  'end': 11
}],
];

pass('Expressions - Group (pass)', valids);

});
