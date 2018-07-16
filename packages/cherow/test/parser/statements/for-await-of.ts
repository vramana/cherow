import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - For await of', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  [`async function f() { for await (a of []); }`, `async function f() { for await (a of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'Identifier',
                            'name': 'a'
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await (a.b of []); }`, `async function f() { for await (a.b of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'MemberExpression',
                            'object': {
                                'type': 'Identifier',
                                'name': 'a'
                            },
                            'computed': false,
                            'property': {
                                'type': 'Identifier',
                                'name': 'b'
                            }
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await ([a] of []); }`, `async function f() { for await ([a] of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'Identifier',
                                    'name': 'a'
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await ([a = 1] of []); }`, `async function f() { for await ([a = 1] of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'Identifier',
                                        'name': 'a'
                                    },
                                    'right': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 1
                                    }
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await ([a = 1, ...b] of []); }`, `async function f() { for await ([a = 1, ...b] of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'ArrayPattern',
                            'elements': [
                                {
                                    'type': 'AssignmentPattern',
                                    'left': {
                                        'type': 'Identifier',
                                        'name': 'a'
                                    },
                                    'right': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 1
                                    }
                                },
                                {
                                    'type': 'RestElement',
                                    'argument': {
                                        'type': 'Identifier',
                                        'name': 'b'
                                    }
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await ({a} of []); }`, `async function f() { for await ({a} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'a'
                                    },
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'a'
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': true
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await ({a: a} of []); }`, `async function f() { for await ({a: a} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'a'
                                    },
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'a'
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await ({'a': a} of []); }`, `async function f() { for await ({'a': a} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 'a'
                                    },
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'a'
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await ({[Symbol.iterator]: a} of []); }`, `async function f() { for await ({[Symbol.iterator]: a} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'MemberExpression',
                                        'object': {
                                            'type': 'Identifier',
                                            'name': 'Symbol'
                                        },
                                        'computed': false,
                                        'property': {
                                            'type': 'Identifier',
                                            'name': 'iterator'
                                        }
                                    },
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'a'
                                    },
                                    'kind': 'init',
                                    'computed': true,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await ({0: a} of []); }`, `async function f() { for await ({0: a} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 0
                                    },
                                    'value': {
                                        'type': 'Identifier',
                                        'name': 'a'
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await ({a = 1} of []); }`, `async function f() { for await ({a = 1} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'a'
                                    },
                                    'value': {
                                        'type': 'AssignmentPattern',
                                        'left': {
                                            'type': 'Identifier',
                                            'name': 'a'
                                        },
                                        'right': {
                                            'type': 'Literal',
                                            raw: null,
                                            'value': 1
                                        }
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': true
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await ({a: a = 1} of []); }`, `async function f() { for await ({a: a = 1} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Identifier',
                                        'name': 'a'
                                    },
                                    'value': {
                                        'type': 'AssignmentPattern',
                                        'left': {
                                            'type': 'Identifier',
                                            'name': 'a'
                                        },
                                        'right': {
                                            'type': 'Literal',
                                            raw: null,
                                            'value': 1
                                        }
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await ({'a': a = 1} of []); }`, `async function f() { for await ({'a': a = 1} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'ObjectPattern',
                            'properties': [
                                {
                                    'type': 'Property',
                                    'key': {
                                        'type': 'Literal',
                                        raw: null,
                                        'value': 'a'
                                    },
                                    'value': {
                                        'type': 'AssignmentPattern',
                                        'left': {
                                            'type': 'Identifier',
                                            'name': 'a'
                                        },
                                        'right': {
                                            'type': 'Literal',
                                            raw: null,
                                            'value': 1
                                        }
                                    },
                                    'kind': 'init',
                                    'computed': false,
                                    'method': false,
                                    'shorthand': false
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await (var {0: a} of []); }`, `async function f() { for await (var {0: a} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'VariableDeclaration',
                            'kind': 'var',
                            'declarations': [
                                {
                                    'type': 'VariableDeclarator',
                                    'init': null,
                                    'id': {
                                        'type': 'ObjectPattern',
                                        'properties': [
                                            {
                                                'type': 'Property',
                                                'kind': 'init',
                                                'key': {
                                                    'type': 'Literal',
                                                    raw: null,
                                                    'value': 0
                                                },
                                                'computed': false,
                                                'value': {
                                                    'type': 'Identifier',
                                                    'name': 'a'
                                                },
                                                'method': false,
                                                'shorthand': false
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await (var {a: a = 1} of []); }`, `async function f() { for await (var {a: a = 1} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'VariableDeclaration',
                            'kind': 'var',
                            'declarations': [
                                {
                                    'type': 'VariableDeclarator',
                                    'init': null,
                                    'id': {
                                        'type': 'ObjectPattern',
                                        'properties': [
                                            {
                                                'type': 'Property',
                                                'kind': 'init',
                                                'key': {
                                                    'type': 'Identifier',
                                                    'name': 'a'
                                                },
                                                'computed': false,
                                                'value': {
                                                    'type': 'AssignmentPattern',
                                                    'left': {
                                                        'type': 'Identifier',
                                                        'name': 'a'
                                                    },
                                                    'right': {
                                                        'type': 'Literal',
                                                        raw: null,
                                                        'value': 1
                                                    }
                                                },
                                                'method': false,
                                                'shorthand': false
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await (var {'a': a = 1} of []); }`, `async function f() { for await (var {'a': a = 1} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'VariableDeclaration',
                            'kind': 'var',
                            'declarations': [
                                {
                                    'type': 'VariableDeclarator',
                                    'init': null,
                                    'id': {
                                        'type': 'ObjectPattern',
                                        'properties': [
                                            {
                                                'type': 'Property',
                                                'kind': 'init',
                                                'key': {
                                                    'type': 'Literal',
                                                    raw: null,
                                                    'value': 'a'
                                                },
                                                'computed': false,
                                                'value': {
                                                    'type': 'AssignmentPattern',
                                                    'left': {
                                                        'type': 'Identifier',
                                                        'name': 'a'
                                                    },
                                                    'right': {
                                                        'type': 'Literal',
                                                        raw: null,
                                                        'value': 1
                                                    }
                                                },
                                                'method': false,
                                                'shorthand': false
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],
  [`async function f() { for await (const {'a': a} of []); }`, `async function f() { for await (const {'a': a} of []); }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'EmptyStatement'
                        },
                        'left': {
                            'type': 'VariableDeclaration',
                            'kind': 'const',
                            'declarations': [
                                {
                                    'type': 'VariableDeclarator',
                                    'init': null,
                                    'id': {
                                        'type': 'ObjectPattern',
                                        'properties': [
                                            {
                                                'type': 'Property',
                                                'kind': 'init',
                                                'key': {
                                                    'type': 'Literal',
                                                    raw: null,
                                                    'value': 'a'
                                                },
                                                'computed': false,
                                                'value': {
                                                    'type': 'Identifier',
                                                    'name': 'a'
                                                },
                                                'method': false,
                                                'shorthand': false
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    }
                ]
            },
            'async': true,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}],

  [`async function* f() {
    for await (var x of []) let // ASI
    {}
  }`, `async function* f() {
    for await (var x of []) let // ASI
    {}
  }`, Context.Empty, {
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
                        'type': 'ForOfStatement',
                        'body': {
                            'type': 'ExpressionStatement',
                            'expression': {
                                'type': 'Identifier',
                                'name': 'let'
                            }
                        },
                        'left': {
                            'type': 'VariableDeclaration',
                            'kind': 'var',
                            'declarations': [
                                {
                                    'type': 'VariableDeclarator',
                                    'init': null,
                                    'id': {
                                        'type': 'Identifier',
                                        'name': 'x'
                                    }
                                }
                            ]
                        },
                        'right': {
                            'type': 'ArrayExpression',
                            'elements': []
                        },
                        'await': true
                    },
                    {
                        'type': 'BlockStatement',
                        'body': []
                    }
                ]
            },
            'async': true,
            'generator': true,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'f'
            }
        }
    ]
}]
];

const invalids: Array < [string, string, Context, any] > = [
  [`async function * f() { for await (const a, b of []) { } }`, `async function * f() { for await (const a, b of []) { } }`, Context.Empty, {}],
  [`async function * f() { for await (var [a] = 0 in null) { } }`, `async function * f() { for await (var [a] = 0 in null) { } }`, Context.Empty, {}],
  [`async function * f() { for await (var a = 0 in null) { } }`, `async function * f() { for await (var a = 0 in null) { } }`, Context.Empty, {}],
  [`async function * f() { for await (const [a = 1] = 1 of []) { } }`, `async function * f() { for await (const [a = 1] = 1 of []) { } }`, Context.Empty, {}],
  [`async function * f() { for await (const {a} = 1 of []) { } }`, `async function * f() { for await (const {a} = 1 of []) { } }`, Context.Empty, {}],
  [`async function * f() { for await (const {a: a} = 1 of []) { } }`, `async function * f() { for await (const {a: a} = 1 of []) { } }`, Context.Empty, {}],
  [`async function * f() { for await (const {[Symbol.iterator]: a} = 1 of []) { } }`, `async function * f() { for await (const {[Symbol.iterator]: a} = 1 of []) { } }`,
  Context.Empty, {}],
  [`async function * f() { for await (const {a = 1}, b of []) { } }`, `async function * f() { for await (const {a = 1}, b of []) { } }`, Context.Empty, {}],
  [`async function * f() { for await (const {\'a\': a = 1}, b of []) { } }`, `async function * f() { for await (const {\'a\': a = 1}, b of []) { } }`, Context.Empty, {}],
  [`async function * f() { for await (let [...{ x }, y] of [[1, 2, 3]]) { } }`, `async function * f() { for await (let [...{ x }, y] of [[1, 2, 3]]) { } }`, Context.Empty, {}],
  [`async function * f() { for await (var [...x = []] of [[]]) { } }`, `async function * f() { for await (var [...x = []] of [[]]) { } }`, Context.Empty, {}],
  [`async function * f() { for await ([[(x, y)]] of [[[]]) { } }`, `async function * f() { for await ([[(x, y)]] of [[[]]) { } }`, Context.Empty, {}],
  [`async function * f() { for await (let [...x, y] of [[1, 2, 3]]) { } }`, `async function * f() { for await (let [...x, y] of [[1, 2, 3]]) { } }`, Context.Empty, {}],
  [`async function * f() { for await (let [...[ x ] = []] of (async function*() {yield* [[]];})()) { } }`, `async function * f() { for await (let [...[ x ] = []] of (async function*() {yield* [[]];})()) { } }`, Context.Empty, {}],
  [`async function * f() { for await (let a = 1 of []) { } }`, `async function * f() { for await (let a = 1 of []) { } }`, Context.Empty, {}],
  [`async function * f() { for await (var {a = 1} = 1 of []) { } }`, `async function * f() { for await (var {a = 1} = 1 of []) { } }`, Context.Empty, {}],
  [`async function * f() { for await (var {[Symbol.iterator]: a}, b of []) { } }`, `async function * f() { for await (var {[Symbol.iterator]: a}, b of []) { } }`, Context.Empty, {}],
  [`async function * f() { for await (var a, b of []) { } }`, `async function * f() { for await (var a, b of []) { } }`, Context.Empty, {}],
  [`async function * f() { for await ({a: 1} of []) { } }`, `async function * f() { for await ({a: 1} of []) { } }`, Context.Empty, {}],
  [`async function * f() { for await (a = 1 of [) { } }`, `async function * f() { for await (a = 1 of [) { } }`, Context.Empty, {}],
  [`async function * f() { for await(var [a] = 0 in null) { } }`, `async function * f() { for await (var [a] = 0 in null) { } }`, Context.Empty, {}],
];
fail('Statements - For await of (pass)', invalids);
pass('Statements - For await of (pass)', valids);

});
