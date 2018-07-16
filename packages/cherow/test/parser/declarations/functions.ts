import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Functions', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['function* f() {}', 'function* f() {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "FunctionDeclaration",
            "params": [],
            "body": {
                "type": "BlockStatement",
                "body": [],
                "start": 14,
                "end": 16,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 14
                    },
                    "end": {
                        "line": 1,
                        "column": 16
                    }
                }
            },
            "async": false,
            "generator": true,
            "expression": false,
            "id": {
                "type": "Identifier",
                "name": "f",
                "start": 10,
                "end": 11,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 10
                    },
                    "end": {
                        "line": 1,
                        "column": 11
                    }
                }
            },
            "start": 0,
            "end": 16,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 16
                }
            }
        }
    ],
    "start": 0,
    "end": 16,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 16
        }
    }
}],

  ['function f() {}', 'function f() {}', Context.OptionsRanges | Context.OptionsLoc, {
    "type": "Program",
    "sourceType": "script",
    "body": [
        {
            "type": "FunctionDeclaration",
            "params": [],
            "body": {
                "type": "BlockStatement",
                "body": [],
                "start": 13,
                "end": 15,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 13
                    },
                    "end": {
                        "line": 1,
                        "column": 15
                    }
                }
            },
            "async": false,
            "generator": false,
            "expression": false,
            "id": {
                "type": "Identifier",
                "name": "f",
                "start": 9,
                "end": 10,
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 9
                    },
                    "end": {
                        "line": 1,
                        "column": 10
                    }
                }
            },
            "start": 0,
            "end": 15,
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 15
                }
            }
        }
    ],
    "start": 0,
    "end": 15,
    "loc": {
        "start": {
            "line": 1,
            "column": 0
        },
        "end": {
            "line": 1,
            "column": 15
        }
    }
}],
  ['function identity($) {return $;}', 'function identity($) {return $;}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'Identifier',
                    'name': '$',
                    'start': 18,
                    'end': 19,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 18
                        },
                        'end': {
                            'line': 1,
                            'column': 19
                        }
                    }
                }
            ],
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ReturnStatement',
                        'argument': {
                            'type': 'Identifier',
                            'name': '$',
                            'start': 29,
                            'end': 30,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 29
                                },
                                'end': {
                                    'line': 1,
                                    'column': 30
                                }
                            }
                        },
                        'start': 22,
                        'end': 31,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 22
                            },
                            'end': {
                                'line': 1,
                                'column': 31
                            }
                        }
                    }
                ],
                'start': 21,
                'end': 32,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 21
                    },
                    'end': {
                        'line': 1,
                        'column': 32
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'identity',
                'start': 9,
                'end': 17,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 17
                    }
                }
            },
            'start': 0,
            'end': 32,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 32
                }
            }
        }
    ],
    'start': 0,
    'end': 32,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 32
        }
    }
}],

  ['function valueFn(value) {return function valueRef() {return value;};}', 'function valueFn(value) {return function valueRef() {return value;};}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'Identifier',
                    'name': 'value',
                    'start': 17,
                    'end': 22,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 17
                        },
                        'end': {
                            'line': 1,
                            'column': 22
                        }
                    }
                }
            ],
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ReturnStatement',
                        'argument': {
                            'type': 'FunctionExpression',
                            'params': [],
                            'body': {
                                'type': 'BlockStatement',
                                'body': [
                                    {
                                        'type': 'ReturnStatement',
                                        'argument': {
                                            'type': 'Identifier',
                                            'name': 'value',
                                            'start': 60,
                                            'end': 65,
                                            'loc': {
                                                'start': {
                                                    'line': 1,
                                                    'column': 60
                                                },
                                                'end': {
                                                    'line': 1,
                                                    'column': 65
                                                }
                                            }
                                        },
                                        'start': 53,
                                        'end': 66,
                                        'loc': {
                                            'start': {
                                                'line': 1,
                                                'column': 53
                                            },
                                            'end': {
                                                'line': 1,
                                                'column': 66
                                            }
                                        }
                                    }
                                ],
                                'start': 52,
                                'end': 67,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 52
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 67
                                    }
                                }
                            },
                            'async': false,
                            'generator': false,
                            'expression': false,
                            'id': {
                                'type': 'Identifier',
                                'name': 'valueRef',
                                'start': 41,
                                'end': 49,
                                'loc': {
                                    'start': {
                                        'line': 1,
                                        'column': 41
                                    },
                                    'end': {
                                        'line': 1,
                                        'column': 49
                                    }
                                }
                            },
                            'start': 32,
                            'end': 67,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 32
                                },
                                'end': {
                                    'line': 1,
                                    'column': 67
                                }
                            }
                        },
                        'start': 25,
                        'end': 68,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 25
                            },
                            'end': {
                                'line': 1,
                                'column': 68
                            }
                        }
                    }
                ],
                'start': 24,
                'end': 69,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 24
                    },
                    'end': {
                        'line': 1,
                        'column': 69
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'valueFn',
                'start': 9,
                'end': 16,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 16
                    }
                }
            },
            'start': 0,
            'end': 69,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 69
                }
            }
        }
    ],
    'start': 0,
    'end': 69,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 69
        }
    }
}],
  ['function foo(bar) {}', 'function foo(bar) {}', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'FunctionDeclaration',
            'params': [
                {
                    'type': 'Identifier',
                    'name': 'bar',
                    'start': 13,
                    'end': 16,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 13
                        },
                        'end': {
                            'line': 1,
                            'column': 16
                        }
                    }
                }
            ],
            'body': {
                'type': 'BlockStatement',
                'body': [],
                'start': 18,
                'end': 20,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 18
                    },
                    'end': {
                        'line': 1,
                        'column': 20
                    }
                }
            },
            'async': false,
            'generator': false,
            'expression': false,
            'id': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 9,
                'end': 12,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 9
                    },
                    'end': {
                        'line': 1,
                        'column': 12
                    }
                }
            },
            'start': 0,
            'end': 20,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 20
                }
            }
        }
    ],
    'start': 0,
    'end': 20,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 20
        }
    }
}]
];

pass('Declarations - Functions (pass)', valids);

});
