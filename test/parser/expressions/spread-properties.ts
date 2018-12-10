import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Spread properties', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['let xyab = { x: 1, ...a, y: 2, ...b, ...a };', 'let xyab = { x: 1, ...a, y: 2, ...b, ...a };', Context.OptionsRanges, {
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
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 13,
                                    'end': 14
                                },
                                'value': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 1,
                                    'start': 16,
                                    'end': 17
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 13,
                                'end': 17
                            },
                            {
                                'type': 'SpreadElement',
                                'argument': {
                                    'type': 'Identifier',
                                    'name': 'a',
                                    'start': 22,
                                    'end': 23
                                },
                                'start': 19,
                                'end': 23
                            },
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'y',
                                    'start': 25,
                                    'end': 26
                                },
                                'value': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 2,
                                    'start': 28,
                                    'end': 29
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 25,
                                'end': 29
                            },
                            {
                                'type': 'SpreadElement',
                                'argument': {
                                    'type': 'Identifier',
                                    'name': 'b',
                                    'start': 34,
                                    'end': 35
                                },
                                'start': 31,
                                'end': 35
                            },
                            {
                                'type': 'SpreadElement',
                                'argument': {
                                    'type': 'Identifier',
                                    'name': 'a',
                                    'start': 40,
                                    'end': 41
                                },
                                'start': 37,
                                'end': 41
                            }
                        ],
                        'start': 11,
                        'end': 43
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'xyab',
                        'start': 4,
                        'end': 8
                    },
                    'start': 4,
                    'end': 43
                }
            ],
            'start': 0,
            'end': 44
        }
    ],
    'start': 0,
    'end': 44
}],
  ['let x = { ...y, get z() {} };', 'let x = { ...y, get z() {} };', Context.OptionsRanges, {
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
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'SpreadElement',
                                'argument': {
                                    'type': 'Identifier',
                                    'name': 'y',
                                    'start': 13,
                                    'end': 14
                                },
                                'start': 10,
                                'end': 14
                            },
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'z',
                                    'start': 20,
                                    'end': 21
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
                                    'start': 21,
                                    'end': 26
                                },
                                'kind': 'get',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 16,
                                'end': 26
                            }
                        ],
                        'start': 8,
                        'end': 28
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'x',
                        'start': 4,
                        'end': 5
                    },
                    'start': 4,
                    'end': 28
                }
            ],
            'start': 0,
            'end': 29
        }
    ],
    'start': 0,
    'end': 29
}],
  ['x = { ...y, z: 1};', 'x = { ...y, z: 1};', Context.OptionsRanges, {
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
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'SpreadElement',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'y',
                                'start': 9,
                                'end': 10
                            },
                            'start': 6,
                            'end': 10
                        },
                        {
                            'type': 'Property',
                            'key': {
                                'type': 'Identifier',
                                'name': 'z',
                                'start': 12,
                                'end': 13
                            },
                            'value': {
                                'type': 'Literal',
                                raw: null,
                                'value': 1,
                                'start': 15,
                                'end': 16
                            },
                            'kind': 'init',
                            'computed': false,
                            'method': false,
                            'shorthand': false,
                            'start': 12,
                            'end': 16
                        }
                    ],
                    'start': 4,
                    'end': 17
                },
                'start': 0,
                'end': 17
            },
            'start': 0,
            'end': 18
        }
    ],
    'start': 0,
    'end': 18
}],
  ['x = { ...y }', 'x = { ...y }', Context.OptionsRanges, {
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
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'SpreadElement',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'y',
                                'start': 9,
                                'end': 10
                            },
                            'start': 6,
                            'end': 10
                        }
                    ],
                    'start': 4,
                    'end': 12
                },
                'start': 0,
                'end': 12
            },
            'start': 0,
            'end': 12
        }
    ],
    'start': 0,
    'end': 12
}],
  ['x = { ...y, ...{ get z() {} } };', 'x = { ...y, ...{ get z() {} } };', Context.OptionsRanges, {
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
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'SpreadElement',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'y',
                                'start': 9,
                                'end': 10
                            },
                            'start': 6,
                            'end': 10
                        },
                        {
                            'type': 'SpreadElement',
                            'argument': {
                                'type': 'ObjectExpression',
                                'properties': [
                                    {
                                        'type': 'Property',
                                        'key': {
                                            'type': 'Identifier',
                                            'name': 'z',
                                            'start': 21,
                                            'end': 22
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
                                            'start': 22,
                                            'end': 27
                                        },
                                        'kind': 'get',
                                        'computed': false,
                                        'method': false,
                                        'shorthand': false,
                                        'start': 17,
                                        'end': 27
                                    }
                                ],
                                'start': 15,
                                'end': 29
                            },
                            'start': 12,
                            'end': 29
                        }
                    ],
                    'start': 4,
                    'end': 31
                },
                'start': 0,
                'end': 31
            },
            'start': 0,
            'end': 32
        }
    ],
    'start': 0,
    'end': 32
}],
  ['x = { ...undefined, ...null };', 'x = { ...undefined, ...null };', Context.OptionsRanges, {
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
                    'type': 'ObjectExpression',
                    'properties': [
                        {
                            'type': 'SpreadElement',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'undefined',
                                'start': 9,
                                'end': 18
                            },
                            'start': 6,
                            'end': 18
                        },
                        {
                            'type': 'SpreadElement',
                            'argument': {
                                'type': 'Literal',
                                'value': null,
                                'start': 23,
                                'end': 27
                            },
                            'start': 20,
                            'end': 27
                        }
                    ],
                    'start': 4,
                    'end': 29
                },
                'start': 0,
                'end': 29
            },
            'start': 0,
            'end': 30
        }
    ],
    'start': 0,
    'end': 30
}],
  ['let aa = { x: 1, y: 2, ...a };', 'let aa = { x: 1, y: 2, ...a };', Context.OptionsRanges, {
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
                        'type': 'ObjectExpression',
                        'properties': [
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 11,
                                    'end': 12
                                },
                                'value': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 1,
                                    'start': 14,
                                    'end': 15
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 11,
                                'end': 15
                            },
                            {
                                'type': 'Property',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'y',
                                    'start': 17,
                                    'end': 18
                                },
                                'value': {
                                    'type': 'Literal',
                                    raw: null,
                                    'value': 2,
                                    'start': 20,
                                    'end': 21
                                },
                                'kind': 'init',
                                'computed': false,
                                'method': false,
                                'shorthand': false,
                                'start': 17,
                                'end': 21
                            },
                            {
                                'type': 'SpreadElement',
                                'argument': {
                                    'type': 'Identifier',
                                    'name': 'a',
                                    'start': 26,
                                    'end': 27
                                },
                                'start': 23,
                                'end': 27
                            }
                        ],
                        'start': 9,
                        'end': 29
                    },
                    'id': {
                        'type': 'Identifier',
                        'name': 'aa',
                        'start': 4,
                        'end': 6
                    },
                    'start': 4,
                    'end': 29
                }
            ],
            'start': 0,
            'end': 30
        }
    ],
    'start': 0,
    'end': 30
}]
];

pass('Expressions - Spread properties (pass)', valids);

});
