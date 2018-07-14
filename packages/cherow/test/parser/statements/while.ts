import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - While', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['with (foo) bar;', 'with (foo) bar;', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WithStatement',
            'object': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 6,
                'end': 9,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 6
                    },
                    'end': {
                        'line': 1,
                        'column': 9
                    }
                }
            },
            'body': {
                'type': 'ExpressionStatement',
                'expression': {
                    'type': 'Identifier',
                    'name': 'bar',
                    'start': 11,
                    'end': 14,
                    'loc': {
                        'start': {
                            'line': 1,
                            'column': 11
                        },
                        'end': {
                            'line': 1,
                            'column': 14
                        }
                    }
                },
                'start': 11,
                'end': 15,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 11
                    },
                    'end': {
                        'line': 1,
                        'column': 15
                    }
                }
            },
            'start': 0,
            'end': 15,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 15
                }
            }
        }
    ],
    'start': 0,
    'end': 15,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 15
        }
    }
}],

];

pass('Declarations - While (pass)', valids);

});
