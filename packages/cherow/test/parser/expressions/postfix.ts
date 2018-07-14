import { Context } from '../../../src/common';
import { pass } from '../../test-utils';

describe('Expressions - Postfix', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [

  ['x--', 'x--', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'UpdateExpression',
                'argument': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 0,
                    'end': 1,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 1
                        }
                    }
                },
                'operator': '--',
                'prefix': false,
                'start': 0,
                'end': 3,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 3
                    }
                }
            },
            'start': 0,
            'end': 3,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 3
                }
            }
        }
    ],
    'start': 0,
    'end': 3,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 3
        }
    }
}],
  ['x++', 'x++',  Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'UpdateExpression',
                'argument': {
                    'type': 'Identifier',
                    'name': 'x',
                    'start': 0,
                    'end': 1,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 0
                        },
                        'end': {
                            'line': 1,
                            'column': 1
                        }
                    }
                },
                'operator': '++',
                'prefix': false,
                'start': 0,
                'end': 3,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 3
                    }
                }
            },
            'start': 0,
            'end': 3,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 3
                }
            }
        }
    ],
    'start': 0,
    'end': 3,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 3
        }
    }
}]
];

pass('Expressions - Postfix (pass)', valids);

});
