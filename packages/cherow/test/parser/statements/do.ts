import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Do while', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['do foo; while (bar);', 'do foo; while (bar);', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'DoWhileStatement',
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'Identifier',
                    'name': 'foo',
                    'start': 3,
                    'end': 6,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 3
                        },
                        'end': {
                            'line': 1,
                            'column': 6
                        }
                    }
                },
                'start': 3,
                'end': 7,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 3
                    },
                    'end': {
                        'line': 1,
                        'column': 7
                    }
                }
            },
            'test': {
                'type': 'Identifier',
                'name': 'bar',
                'start': 15,
                'end': 18,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 15
                    },
                    'end': {
                        'line': 1,
                        'column': 18
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

pass('Declarations - Do while (pass)', valids);

});
