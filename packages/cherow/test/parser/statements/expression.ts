import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Statements - Expressions', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['x, y', 'x, y', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'SequenceExpression',
                'expressions': [
                    {
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
                    {
                        'type': 'Identifier',
                        'name': 'y',
                        'start': 3,
                        'end': 4,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 3
                            },
                            'end': {
                                'line': 1,
                                'column': 4
                            }
                        }
                    }
                ],
                'start': 0,
                'end': 4,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 0
                    },
                    'end': {
                        'line': 1,
                        'column': 4
                    }
                }
            },
            'start': 0,
            'end': 4,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 4
                }
            }
        }
    ],
    'start': 0,
    'end': 4,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 4
        }
    }
}]
];

pass('Statements - Expressions (pass)', valids);

});
