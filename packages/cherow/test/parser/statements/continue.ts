import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';

describe('Expressions - Continue', () => {

  // valid tests
const valids: Array < [string, string, Context, any] > = [
  ['while (foo) { continue; }', 'while (foo) { continue; }', Context.OptionsRanges | Context.OptionsLoc, {
    'type': 'Program',
    'sourceType': 'script',
    'body': [
        {
            'type': 'WhileStatement',
            'test': {
                'type': 'Identifier',
                'name': 'foo',
                'start': 7,
                'end': 10,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 7
                    },
                    'end': {
                        'line': 1,
                        'column': 10
                    }
                }
            },
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'ContinueStatement',
                        'label': null,
                        'start': 14,
                        'end': 23,
                        'loc': {
                            'start': {
                                'line': 1,
                                'column': 14
                            },
                            'end': {
                                'line': 1,
                                'column': 23
                            }
                        }
                    }
                ],
                'start': 12,
                'end': 25,
                'loc': {
                    'start': {
                        'line': 1,
                        'column': 12
                    },
                    'end': {
                        'line': 1,
                        'column': 25
                    }
                }
            },
            'start': 0,
            'end': 25,
            'loc': {
                'start': {
                    'line': 1,
                    'column': 0
                },
                'end': {
                    'line': 1,
                    'column': 25
                }
            }
        }
    ],
    'start': 0,
    'end': 25,
    'loc': {
        'start': {
            'line': 1,
            'column': 0
        },
        'end': {
            'line': 1,
            'column': 25
        }
    }
}]
];

pass('Declarations - Continue (pass)', valids);

});
