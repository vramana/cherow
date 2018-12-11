import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Spread array', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['[, , ...a]', '[, , ...a]', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    null,
                    null,
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 8,
                            'end': 9,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 8
                                },
                                'end': {
                                    'line': 1,
                                    'column': 9
                                }
                            }
                        },
                        'start': 5,
                        'end': 9,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 5
                            },
                            'end': {
                                'line': 1,
                                'column': 9
                            }
                        }
                    }
                ],
                'start': 0,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
            'start': 0,
            'end': 10,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 10
                }
            }
        }
    ],
    'start': 0,
    'end': 10,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 10
        }
    }
}],
  ['[...a, ,]', '[...a, ,]',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'ArrayExpression',
                'elements': [
                    {
                        'type': 'SpreadElement',
                        'argument': {
                            'type': 'Identifier',
                            'name': 'a',
                            'start': 4,
                            'end': 5,
                            'loc': {
                                'start': {
                                    'line': 1,
                                    'column': 4
                                },
                                'end': {
                                    'line': 1,
                                    'column': 5
                                }
                            }
                        },
                        'start': 1,
                        'end': 5,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 1
                            },
                            'end': {
                                'line': 1,
                                'column': 5
                            }
                        }
                    },
                    null
                ],
                'start': 0,
                'end': 9,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 9
                    }
                }
            },
            'start': 0,
            'end': 9,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 9
                }
            }
        }
    ],
    'start': 0,
    'end': 9,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 9
        }
    }
}]
];

pass('Expressions - Spread array (pass)', valids);

});
