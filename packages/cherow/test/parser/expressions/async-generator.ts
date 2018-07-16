import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Async generator function', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['(async function* h([...[,]]) { })', '(async function* h([...[,]]) { })', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [
                    {
                        'type': 'ArrayPattern',
                        'elements': [
                            {
                                'type': 'RestElement',
                                'argument': {
                                    'type': 'ArrayPattern',
                                    'elements': [
                                        null
                                    ],
                                    'start': 23,
                                    'end': 26
                                },
                                'start': 20,
                                'end': 26
                            }
                        ],
                        'start': 19,
                        'end': 27
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 29,
                    'end': 32
                },
                'async': true,
                'generator': true,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'h',
                    'start': 17,
                    'end': 18
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
  ['(async function* h([fn = function () {}, xFn = function x() {}] = []) { })', '(async function* h([fn = function () {}, xFn = function x() {}] = []) { })', Context.OptionsRanges, {
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
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'Identifier',
                                        'name': 'fn',
                                        'start': 20,
                                        'end': 22
                                    },
                                    'right': {
                                        'type': 'FunctionExpression',
                                        'params': [],
                                        'body': {
                                            'type': 'BlockStatement',
                                            'body': [],
                                            'start': 37,
                                            'end': 39
                                        },
                                        'async': false,
                                        'generator': false,
                                        'expression': false,
                                        'id': null,
                                        'start': 25,
                                        'end': 39
                                    },
                                    'start': 20,
                                    'end': 39
                                },
                                {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'Identifier',
                                        'name': 'xFn',
                                        'start': 41,
                                        'end': 44
                                    },
                                    'right': {
                                        'type': 'FunctionExpression',
                                        'params': [],
                                        'body': {
                                            'type': 'BlockStatement',
                                            'body': [],
                                            'start': 60,
                                            'end': 62
                                        },
                                        'async': false,
                                        'generator': false,
                                        'expression': false,
                                        'id': {
                                            'type': 'Identifier',
                                            'name': 'x',
                                            'start': 56,
                                            'end': 57
                                        },
                                        'start': 47,
                                        'end': 62
                                    },
                                    'start': 41,
                                    'end': 62
                                }
                            ],
                            'start': 19,
                            'end': 63
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': [],
                            'start': 66,
                            'end': 68
                        },
                        'start': 19,
                        'end': 68
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 70,
                    'end': 73
                },
                'async': true,
                'generator': true,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'h',
                    'start': 17,
                    'end': 18
                },
                'start': 1,
                'end': 73
            },
            'start': 0,
            'end': 74
        }
    ],
    'start': 0,
    'end': 74
}],
  ['(async function* h([x] = []) { })', '(async function* h([x] = []) { })', Context.OptionsRanges, {
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
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 20,
                                    'end': 21
                                }
                            ],
                            'start': 19,
                            'end': 22
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': [],
                            'start': 25,
                            'end': 27
                        },
                        'start': 19,
                        'end': 27
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 29,
                    'end': 32
                },
                'async': true,
                'generator': true,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'h',
                    'start': 17,
                    'end': 18
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
  ['(async function* h({} = null) { })', '(async function* h({} = null) { })', Context.OptionsRanges, {
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
                            'type': 'ObjectPattern',
                            'properties': [],
                            'start': 19,
                            'end': 21
                        },
                        'right': {
                            'type': 'Literal',
                            'value': null,
                            'start': 24,
                            'end': 28
                        },
                        'start': 19,
                        'end': 28
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 30,
                    'end': 33
                },
                'async': true,
                'generator': true,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'h',
                    'start': 17,
                    'end': 18
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
  ['(async function* h({ x, }) { })', '(async function* h({ x, }) { })', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [
                    {
                        'type': 'ObjectPattern',
                        'properties': [
                            {
                                'type': 'Property',
                                'kind': 'init',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 21,
                                    'end': 22
                                },
                                'computed': false,
                                'value': {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 21,
                                    'end': 22
                                },
                                'method': false,
                                'shorthand': true,
                                'start': 21,
                                'end': 22
                            }
                        ],
                        'start': 19,
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
                'generator': true,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'h',
                    'start': 17,
                    'end': 18
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
  ['(async function* h({ w: [x, y, z] = [4, 5, 6] }) { })', '(async function* h({ w: [x, y, z] = [4, 5, 6] }) { })', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [
                    {
                        'type': 'ObjectPattern',
                        'properties': [
                            {
                                'type': 'Property',
                                'kind': 'init',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'w',
                                    'start': 21,
                                    'end': 22
                                },
                                'computed': false,
                                'value': {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'ArrayPattern',
                                        'elements': [
                                            {
                                                'type': 'Identifier',
                                                'name': 'x',
                                                'start': 25,
                                                'end': 26
                                            },
                                            {
                                                'type': 'Identifier',
                                                'name': 'y',
                                                'start': 28,
                                                'end': 29
                                            },
                                            {
                                                'type': 'Identifier',
                                                'name': 'z',
                                                'start': 31,
                                                'end': 32
                                            }
                                        ],
                                        'start': 24,
                                        'end': 33
                                    },
                                    'right': {
                                        'type': 'ArrayExpression',
                                        'elements': [
                                            {
                                                'type': 'Literal',
                                                raw: null,
                                                'value': 4,
                                                'start': 37,
                                                'end': 38
                                            },
                                            {
                                                'type': 'Literal',
                                                raw: null,
                                                'value': 5,
                                                'start': 40,
                                                'end': 41
                                            },
                                            {
                                                'type': 'Literal',
                                                raw: null,
                                                'value': 6,
                                                'start': 43,
                                                'end': 44
                                            }
                                        ],
                                        'start': 36,
                                        'end': 45
                                    },
                                    'start': 24,
                                    'end': 45
                                },
                                'method': false,
                                'shorthand': false,
                                'start': 21,
                                'end': 45
                            }
                        ],
                        'start': 19,
                        'end': 47
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 49,
                    'end': 52
                },
                'async': true,
                'generator': true,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'h',
                    'start': 17,
                    'end': 18
                },
                'start': 1,
                'end': 52
            },
            'start': 0,
            'end': 53
        }
    ],
    'start': 0,
    'end': 53
}],
  ['(async function*([...[...x]]) {})', '(async function*([...[...x]]) {})', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [
                    {
                        'type': 'ArrayPattern',
                        'elements': [
                            {
                                'type': 'RestElement',
                                'argument': {
                                    'type': 'ArrayPattern',
                                    'elements': [
                                        {
                                            'type': 'RestElement',
                                            'argument': {
                                                'type': 'Identifier',
                                                'name': 'x',
                                                'start': 25,
                                                'end': 26
                                            },
                                            'start': 22,
                                            'end': 26
                                        }
                                    ],
                                    'start': 21,
                                    'end': 27
                                },
                                'start': 18,
                                'end': 27
                            }
                        ],
                        'start': 17,
                        'end': 28
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 30,
                    'end': 32
                },
                'async': true,
                'generator': true,
                'expression': false,
                'id': null,
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
  ['(async function*({ x, }) { })', '(async function*({ x, }) { })', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [
                    {
                        'type': 'ObjectPattern',
                        'properties': [
                            {
                                'type': 'Property',
                                'kind': 'init',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 19,
                                    'end': 20
                                },
                                'computed': false,
                                'value': {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 19,
                                    'end': 20
                                },
                                'method': false,
                                'shorthand': true,
                                'start': 19,
                                'end': 20
                            }
                        ],
                        'start': 17,
                        'end': 23
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 25,
                    'end': 28
                },
                'async': true,
                'generator': true,
                'expression': false,
                'id': null,
                'start': 1,
                'end': 28
            },
            'start': 0,
            'end': 29
        }
    ],
    'start': 0,
    'end': 29
}],
  ['(async function*({ x: y = 33 }) { })', '(async function*({ x: y = 33 }) { })', Context.OptionsRanges, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'FunctionExpression',
                'params': [
                    {
                        'type': 'ObjectPattern',
                        'properties': [
                            {
                                'type': 'Property',
                                'kind': 'init',
                                'key': {
                                    'type': 'Identifier',
                                    'name': 'x',
                                    'start': 19,
                                    'end': 20
                                },
                                'computed': false,
                                'value': {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'Identifier',
                                        'name': 'y',
                                        'start': 22,
                                        'end': 23
                                    },
                                    'right': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 33,
                                        'start': 26,
                                        'end': 28
                                    },
                                    'start': 22,
                                    'end': 28
                                },
                                'method': false,
                                'shorthand': false,
                                'start': 19,
                                'end': 28
                            }
                        ],
                        'start': 17,
                        'end': 30
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 32,
                    'end': 35
                },
                'async': true,
                'generator': true,
                'expression': false,
                'id': null,
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
  ['(async function *foo() { }.prototype)', '(async function *foo() { }.prototype)', Context.OptionsRanges, {
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
                        'start': 23,
                        'end': 26
                    },
                    'async': true,
                    'generator': true,
                    'expression': false,
                    'id': {
                        'type': 'Identifier',
                        'name': 'foo',
                        'start': 17,
                        'end': 20
                    },
                    'start': 1,
                    'end': 26
                },
                'computed': false,
                'property': {
                    'type': 'Identifier',
                    'name': 'prototype',
                    'start': 27,
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
  ['(async function *gpig(a, b) {})', '(async function *gpig(a, b) {})', Context.OptionsRanges, {
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
                        'start': 22,
                        'end': 23
                    },
                    {
                        'type': 'Identifier',
                        'name': 'b',
                        'start': 25,
                        'end': 26
                    }
                ],
                'body': {
                    'type': 'BlockStatement',
                    'body': [],
                    'start': 28,
                    'end': 30
                },
                'async': true,
                'generator': true,
                'expression': false,
                'id': {
                    'type': 'Identifier',
                    'name': 'gpig',
                    'start': 17,
                    'end': 21
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
}]
];

pass('Expressions - Async generator function (pass)', valids);

});
